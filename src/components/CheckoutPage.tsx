import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowLeft, CheckCircle2, Scissors, ShieldCheck } from 'lucide-react';
import type { BookingState } from '../types';
import { supabase, databaseError } from '../services/supabase';
import { downloadCalendar, googleCalendarUrl } from '../services/calendar';
import { COMPANY_INFO } from '../data/company';

export function CheckoutPage({ booking, onGoHome }: { booking: BookingState; onGoHome: () => void; onNewBooking?: () => void }) {
  const [name, setName] = useState(booking.customerName);
  const [phone, setPhone] = useState(booking.customerPhone);
  const [email, setEmail] = useState(booking.customerEmail);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState<{ id: string; amount_cents: number } | null>(null);
  const requestId = useRef(crypto.randomUUID());
  const sending = useRef(false);
  const valid = booking.service && booking.barber && booking.date && booking.time && !booking.plan;
  async function confirm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!valid || sending.current) return;
    sending.current = true; setBusy(true); setError('');
    const { data, error } = await supabase.rpc('barber_book', {
      p_slug: 'apex-barber',
      p_service: booking.service!.id, p_staff: booking.barber!.id,
      p_day: booking.date, p_time: booking.time, p_name: name.trim(),
      p_phone: phone.replace(/\D/g, ''), p_email: email.trim(),
      p_request: requestId.current, p_website: new FormData(e.currentTarget).get('website') || '',
    });
    if (error) setError(databaseError(error));
    else setReceipt(data);
    sending.current = false; setBusy(false);
  }
  const calendarEvent = receipt && booking.service ? {id:receipt.id,title:booking.service.name+' — Apex Barber',start:booking.date+'T'+booking.time+':00-03:00',durationMinutes:booking.service.durationMinutes} : null;
  return <main className="min-h-screen bg-zinc-50 text-zinc-900 pt-32 pb-24 px-5"><div className="max-w-3xl mx-auto">
    <button onClick={onGoHome} className="flex items-center gap-2 mb-8 text-sm"><ArrowLeft size={16} /> Voltar ao site</button>
    <div className="bg-white border border-zinc-200 rounded-2xl p-7 sm:p-10 shadow-sm">
      {receipt ? <div className="text-center space-y-5"><CheckCircle2 className="mx-auto text-green-700" size={52}/><h1 className="text-3xl font-bold">Horário reservado!</h1><p>{booking.service?.name} com {booking.barber?.name}</p><p>{booking.date.split('-').reverse().join('/')} às {booking.time}</p><p className="text-sm text-zinc-600">Pagamento de {(receipt.amount_cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} na barbearia. Nenhum pagamento online foi cobrado.</p><div className="flex flex-wrap justify-center gap-3">{calendarEvent && <><button className="border border-zinc-400 px-4 py-3 rounded-lg" onClick={()=>downloadCalendar(calendarEvent)}>Calendário do iPhone / arquivo .ics</button><a className="border border-zinc-400 px-4 py-3 rounded-lg" href={googleCalendarUrl(calendarEvent)} target="_blank" rel="noopener noreferrer">Adicionar ao Google Agenda</a></>}</div><p className="text-sm text-zinc-600">Abra o calendário e confirme a inclusão. Os lembretes automáticos por e-mail ainda não estão ativos.</p><p className="text-xs break-all text-zinc-500">Reserva: {receipt.id}</p><a className="inline-block bg-zinc-900 text-white px-6 py-3 rounded-lg" href={COMPANY_INFO.whatsapp.getUrl(`Olá! Minha reserva na Apex é ${receipt.id}, em ${booking.date} às ${booking.time}.`)} target="_blank" rel="noopener noreferrer">Falar com a barbearia</a></div>
      : !valid ? <div className="space-y-5"><h1 className="text-2xl font-bold">{booking.plan ? 'Conheça seu plano Apex' : 'Selecione um horário primeiro'}</h1><p className="text-zinc-600">{booking.plan ? 'A contratação de planos é feita diretamente com a equipe. Fale com a barbearia para conhecer as condições.' : 'Volte ao site e escolha serviço, profissional e horário para continuar.'}</p>{booking.plan && <a className="inline-block bg-zinc-900 text-white px-6 py-3 rounded-lg" href={COMPANY_INFO.whatsapp.getUrl(`Olá! Tenho interesse no plano ${booking.plan.name}.`)} target="_blank" rel="noopener noreferrer">Consultar plano no WhatsApp</a>}</div>
      : <><p className="text-xs uppercase tracking-widest text-amber-700 font-bold">APEX BARBER / RESERVA</p><h1 className="text-3xl font-bold mt-3 mb-6">Confirme seu agendamento</h1><div className="bg-zinc-50 rounded-xl p-5 mb-7 space-y-2"><p className="flex gap-2 font-bold"><Scissors size={19}/>{booking.service?.name}</p><p>{booking.barber?.name} · {booking.date.split('-').reverse().join('/')} · {booking.time}</p><p className="font-bold">{booking.service?.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} · {booking.service?.durationMinutes} minutos</p></div>
      <form onSubmit={confirm} className="space-y-5"><label className="block text-sm">Seu nome<input required minLength={2} maxLength={80} autoComplete="name" value={name} onChange={e=>setName(e.target.value)} className="block w-full mt-2 border border-zinc-300 rounded-lg p-3"/></label><label className="block text-sm">WhatsApp com DDD<input required type="tel" autoComplete="tel" minLength={10} maxLength={20} value={phone} onChange={e=>setPhone(e.target.value)} className="block w-full mt-2 border border-zinc-300 rounded-lg p-3"/></label><label className="block text-sm">E-mail<input required type="email" autoComplete="email" maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} className="block w-full mt-2 border border-zinc-300 rounded-lg p-3"/></label><div aria-hidden="true" style={{position:'absolute',left:'-10000px'}}><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div><div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-sm flex gap-3"><ShieldCheck className="shrink-0" size={20}/><p>Reserve agora e pague na barbearia. A confirmação será exibida aqui após o registro do horário.</p></div>{error && <p role="alert" className="text-red-700 text-sm">{error}</p>}<button disabled={busy} className="w-full bg-zinc-900 text-white rounded-lg py-4 font-bold disabled:opacity-50">{busy?'Reservando...':'Confirmar reserva'}</button></form></>}
    </div></div></main>;
}

