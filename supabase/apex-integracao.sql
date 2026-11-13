-- Execute DEPOIS do primeiro SQL, no SQL Editor do Supabase.
-- Antes: Authentication > Users > Add user, email mendoncat831@gmail.com.
-- Defina a senha no Supabase e confirme o email. Nunca coloque a senha neste SQL.
begin;
create table if not exists public.apex_settings (
  singleton boolean primary key default true check(singleton),
  owner_id uuid not null references auth.users(id)
);
alter table public.apex_settings enable row level security;
revoke all on public.apex_settings from anon, authenticated;
do $$ declare admin_id uuid; begin
  select id into admin_id from auth.users where lower(email)='mendoncat831@gmail.com';
  if admin_id is null then raise exception 'Crie primeiro o usuário mendoncat831@gmail.com em Authentication > Users > Add user.'; end if;
  if exists(select 1 from public.apex_settings where owner_id<>admin_id) then raise exception 'Já existe outro administrador configurado. Nenhuma mudança foi feita.'; end if;
  insert into public.apex_settings(singleton,owner_id) values(true,admin_id) on conflict(singleton) do nothing;
end $$;
alter table public.services add column if not exists code text;
create unique index if not exists apex_service_code on public.services(owner_id,code);
alter table public.clients add column if not exists email text;
create unique index if not exists apex_client_phone on public.clients(owner_id,phone) where phone is not null;
alter table public.appointments add column if not exists barber_code text;
alter table public.appointments add column if not exists ends_at timestamptz;
alter table public.appointments add column if not exists notes text;
alter table public.appointments add column if not exists request_id uuid;
create unique index if not exists apex_booking_request on public.appointments(request_id);
create index if not exists apex_barber_schedule on public.appointments(owner_id,barber_code,scheduled_at);
insert into public.services(owner_id,code,name,price_cents,duration_minutes)
select cfg.owner_id,v.code,v.name,v.price,v.duration from public.apex_settings cfg cross join (values
('corte-visagista','Corte Visagista Apex',6000,45),
('corte-masculino','Corte Masculino Tradicional / Fade',4500,35),
('barba-alinhada','Barba & Modelagem Alinhada',3500,30),
('combo-corte-barba','Combo Apex: Corte + Barba',7500,65),
('acabamento-pezinho','Acabamento & Pezinho',2500,20),
('barboterapia-spa','Barboterapia Relaxante',5000,40),
('sobrancelha-masculina','Design de Sobrancelha Masculina',2000,15)
) v(code,name,price,duration) on conflict(owner_id,code) do nothing;

-- Todas as mutações da agenda e dos pagamentos passam pelas funções abaixo.
revoke insert,update,delete on public.appointments,public.payments from authenticated;

create or replace function public.apex_is_admin() returns boolean language sql stable security definer set search_path='' as $$
  select exists(select 1 from public.apex_settings where owner_id=(select auth.uid()));
$$;
revoke all on function public.apex_is_admin() from public,anon;
grant execute on function public.apex_is_admin() to authenticated;

-- Disponibilidade pública: somente horários, sem nomes, contatos ou valores de clientes.
create or replace function public.apex_available_slots(p_barber text,p_day date,p_service text)
returns table("time" text, available boolean, reason text) language plpgsql stable security definer set search_path='' as $$
declare own uuid; dur integer; dow integer; start_at timestamptz; close_at timestamptz; t text;
begin
  select owner_id into own from public.apex_settings;
  if own is null then raise exception 'A agenda ainda não foi configurada. Fale com a barbearia.'; end if;
  select duration_minutes into dur from public.services where owner_id=own and code=p_service and active;
  if dur is null or p_barber is null or p_barber not in ('barbeiro-alexandre','barbeiro-lucas','barbeiro-mateus','barbeiro-gabriel') then raise exception 'Serviço ou profissional inválido.'; end if;
  if p_day is null or p_day < (now() at time zone 'America/Sao_Paulo')::date or p_day > (now() at time zone 'America/Sao_Paulo')::date+60 then raise exception 'Escolha uma data nos próximos 60 dias.'; end if;
  dow:=extract(dow from p_day);
  close_at:=(p_day + case when dow in (1,6) then '19:30'::time else '20:00'::time end) at time zone 'America/Sao_Paulo';
  foreach t in array array['08:30','09:15','10:00','10:45','11:30','13:30','14:15','15:00','15:45','16:30','17:15','18:00','18:45','19:30'] loop
    start_at := (p_day+t::time) at time zone 'America/Sao_Paulo';
    "time":=t; available:=false;
    if dow=0 or (dow=1 and p_barber='barbeiro-gabriel') then reason:='Profissional não atende neste dia';
    elsif dow=1 and t::time<'09:00'::time then reason:='Fora do horário de funcionamento';
    elsif start_at<=now() then reason:='Horário encerrado';
    elsif start_at+make_interval(mins=>dur)>close_at or (t::time<'13:30'::time and t::time+make_interval(mins=>dur)>'12:30'::time) then reason:='Duração ultrapassa o expediente';
    elsif exists(select 1 from public.appointments a where a.owner_id=own and a.barber_code=p_barber and a.status in ('scheduled','completed') and a.scheduled_at<start_at+make_interval(mins=>dur) and coalesce(a.ends_at,a.scheduled_at+interval '65 minutes')>start_at) then reason:='Horário reservado';
    else available:=true; reason:=null; end if;
    return next;
  end loop;
end $$;
revoke all on function public.apex_available_slots(text,date,text) from public;
grant execute on function public.apex_available_slots(text,date,text) to anon,authenticated;

-- Reserva atômica, preço definido no banco, sem aprovação de pagamento pelo visitante.
create or replace function public.apex_book(p_service text,p_barber text,p_day date,p_time text,p_name text,p_phone text,p_email text,p_notes text,p_request uuid,p_website text default '')
returns jsonb language plpgsql security definer set search_path='' as $$
declare own uuid; svc public.services; cid uuid; aid uuid; start_at timestamptz; old public.appointments; clean_phone text;
begin
  if coalesce(p_website,'')<>'' then raise exception 'Não foi possível registrar a reserva.'; end if;
  if p_request is null or p_name is null or length(trim(p_name)) not between 2 and 80 or length(coalesce(p_email,''))>254 or length(coalesce(p_notes,''))>1000 then raise exception 'Confira os dados do cliente.'; end if;
  clean_phone:=regexp_replace(coalesce(p_phone,''),'\D','','g');
  if length(clean_phone) not in (10,11) then raise exception 'Informe o WhatsApp com DDD.'; end if;
  select owner_id into own from public.apex_settings;
  if own is null then raise exception 'A agenda ainda não foi configurada.'; end if;
  -- Serializa reservas para garantir limites e impedir dupla ocupação.
  perform pg_advisory_xact_lock(hashtextextended(own::text,0));
  select * into old from public.appointments where request_id=p_request;
  if found then return jsonb_build_object('id',old.id,'amount_cents',old.agreed_price_cents); end if;
  if (select count(*) from public.appointments where owner_id=own and created_at>now()-interval '1 hour')>=60 then raise exception 'Muitas solicitações. Fale com a barbearia para agendar.'; end if;
  if (select count(*) from public.appointments a join public.clients c on c.id=a.client_id where a.owner_id=own and c.phone=clean_phone and a.status='scheduled' and a.scheduled_at>now())>=3 then raise exception 'Você já tem três reservas pendentes. Fale com a barbearia.'; end if;
  if not exists(select 1 from public.apex_available_slots(p_barber,p_day,p_service) s where s.time=p_time and s.available) then raise exception 'Esse horário não está disponível. Volte e escolha outro horário.'; end if;
  select * into strict svc from public.services where owner_id=own and code=p_service and active;
  start_at:=(p_day+p_time::time) at time zone 'America/Sao_Paulo';
  -- Um visitante não pode alterar o cadastro de outra pessoa.
  insert into public.clients(owner_id,name,phone,email) values(own,trim(p_name),clean_phone,nullif(trim(p_email),'')) on conflict(owner_id,phone) where phone is not null do nothing;
  select id into cid from public.clients where owner_id=own and phone=clean_phone;
  insert into public.appointments(owner_id,client_id,service_id,scheduled_at,ends_at,barber_code,agreed_price_cents,notes,request_id)
  values(own,cid,svc.id,start_at,start_at+make_interval(mins=>svc.duration_minutes),p_barber,svc.price_cents,concat('Nome informado: ',trim(p_name),E'\n',left(coalesce(p_notes,''),1000)),p_request) returning id into aid;
  return jsonb_build_object('id',aid,'amount_cents',svc.price_cents);
end $$;
revoke all on function public.apex_book(text,text,date,text,text,text,text,text,uuid,text) from public;
grant execute on function public.apex_book(text,text,date,text,text,text,text,text,uuid,text) to anon,authenticated;

-- Operações administrativas com verificação de dono no servidor.
create or replace function public.apex_finish(p_id uuid,p_paid boolean,p_method text default 'pix') returns void language plpgsql security definer set search_path='' as $$
declare a public.appointments; received bigint;
begin
  if not public.apex_is_admin() then raise exception 'Acesso restrito ao administrador.'; end if;
  if p_method is null or p_method not in ('pix','cash','card','other') then raise exception 'Forma de pagamento inválida.'; end if;
  select * into a from public.appointments where id=p_id and owner_id=auth.uid() for update;
  if not found then raise exception 'Atendimento não encontrado.'; end if;
  if a.status not in ('scheduled','completed') then raise exception 'O atendimento foi cancelado ou marcado como falta.'; end if;
  if a.scheduled_at>now() then raise exception 'Não é possível concluir um atendimento futuro.'; end if;
  update public.appointments set status='completed',completed_at=coalesce(completed_at,now()) where id=a.id;
  if p_paid then
    select coalesce(sum(amount_cents),0) into received from public.payments where appointment_id=a.id and status='received';
    if received<a.agreed_price_cents then insert into public.payments(owner_id,appointment_id,amount_cents,method) values(a.owner_id,a.id,a.agreed_price_cents-received,p_method); end if;
  end if;
end $$;
create or replace function public.apex_cancel(p_id uuid) returns void language plpgsql security definer set search_path='' as $$
begin
  if not public.apex_is_admin() then raise exception 'Acesso restrito ao administrador.'; end if;
  perform 1 from public.appointments where id=p_id and owner_id=auth.uid() and status='scheduled' for update;
  if not found then raise exception 'Só é possível cancelar um atendimento agendado.'; end if;
  if exists(select 1 from public.payments where appointment_id=p_id and status='received') then raise exception 'O atendimento possui recebimentos; confira o estorno primeiro.'; end if;
  update public.appointments set status='cancelled' where id=p_id;
end $$;
create or replace function public.apex_record(p_service text,p_name text,p_phone text,p_at timestamptz,p_paid boolean,p_method text,p_request uuid)
returns uuid language plpgsql security definer set search_path='' as $$
declare svc public.services; cid uuid; aid uuid; own uuid:=auth.uid(); clean_phone text;
begin
  if not public.apex_is_admin() then raise exception 'Acesso restrito ao administrador.'; end if;
  if p_request is null or p_at is null or p_at>now() or p_name is null or length(trim(p_name)) not between 2 and 80 or p_method is null or p_method not in ('pix','cash','card','other') then raise exception 'Confira os dados e a data do atendimento.'; end if;
  clean_phone:=regexp_replace(coalesce(p_phone,''),'\D','','g');
  if length(clean_phone) not in (10,11) then raise exception 'Informe o WhatsApp com DDD.'; end if;
  perform pg_advisory_xact_lock(hashtextextended(own::text,0));
  select id into aid from public.appointments where request_id=p_request and owner_id=own;
  if found then return aid; end if;
  select * into svc from public.services where owner_id=own and code=p_service and active;
  if not found then raise exception 'Serviço não encontrado.'; end if;
  insert into public.clients(owner_id,name,phone) values(own,trim(p_name),clean_phone) on conflict(owner_id,phone) where phone is not null do nothing;
  select id into cid from public.clients where owner_id=own and phone=clean_phone;
  insert into public.appointments(owner_id,client_id,service_id,scheduled_at,ends_at,completed_at,status,agreed_price_cents,notes,request_id)
  values(own,cid,svc.id,p_at,p_at+make_interval(mins=>svc.duration_minutes),p_at,'completed',svc.price_cents,'Registro manual pelo administrador',p_request) returning id into aid;
  if p_paid and svc.price_cents>0 then insert into public.payments(owner_id,appointment_id,amount_cents,method,paid_at) values(own,aid,svc.price_cents,p_method,p_at); end if;
  return aid;
end $$;
revoke all on function public.apex_finish(uuid,boolean,text),public.apex_cancel(uuid),public.apex_record(text,text,text,timestamptz,boolean,text,uuid) from public,anon;
grant execute on function public.apex_finish(uuid,boolean,text),public.apex_cancel(uuid),public.apex_record(text,text,text,timestamptz,boolean,text,uuid) to authenticated;
commit;
