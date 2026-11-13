# Apex Barber — integração com Supabase

## Banco e administrador

1. No projeto Supabase `nwzfggakthfefzzxiwla`, crie em **Authentication → Users → Add user** o usuário `mendoncat831@gmail.com`. Defina uma senha diretamente no Supabase e marque o e-mail como confirmado.
2. No **SQL Editor**, execute `apex-integracao.sql`. Ele complementa o primeiro SQL já executado; não repita o primeiro arquivo. Se ocorrer erro, a transação não aplica alterações parciais. A versão entregue pode ser executada novamente.
3. O site local foi editado na pasta **APEX barber** da sua Área de Trabalho. A URL e a chave pública do Supabase estão em `.env`. Nenhuma senha nem chave secreta foi adicionada.
4. Abra `/admin` no site e entre com seu e-mail e senha. Não existe cadastro público de administrador.

## O que mudou

- Reservas e horários saem do armazenamento local e passam a usar Supabase.
- Disponibilidade considera duração, expediente, dias do profissional e sobreposição. O banco confirma novamente a disponibilidade ao reservar.
- O preço da reserva vem do catálogo do banco. O visitante não aprova pagamentos nem consulta dados de outros clientes.
- O checkout reserva para pagar na barbearia. PIX e cartão online simulados foram removidos; contratar um gateway real é uma etapa separada. Planos mensais são encaminhados à equipe pelo WhatsApp.
- O administrador vê faturamento, atendimentos concluídos, ticket médio, clientes pagantes, serviços, gráfico e ranking, com filtros de hoje, 7, 10 e 30 dias.
- Na agenda, o administrador conclui, confirma recebimentos e cancela reservas ainda agendadas. Há registro manual de atendimentos concluídos.
- Dados são recarregados ao entrar, após alterações e pelo botão Atualizar. Não há assinatura de atualizações em tempo real.
- Uma reserva futura só pode ser concluída depois do horário agendado. Receber duas vezes o mesmo atendimento não duplica o pagamento.

## Publicar na Vercel

As alterações locais ainda precisam de uma nova implantação no projeto Vercel existente. Não crie outra barbearia nem outro banco.

No projeto da Vercel, configure para Production e Preview:

```env
VITE_SUPABASE_URL=https://nwzfggakthfefzzxiwla.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_G2xH99920xo-aRZ5O4asQQ_S4UhOnP8
```

Envie as alterações pelo fluxo usado no Antigravity/GitHub/Vercel e execute um novo deploy. Variáveis `VITE_` são incorporadas durante o build; somente alterar a variável sem refazer o deploy não atualiza o site.

Depois da publicação, o painel estará em `https://apex-barber-4fzn.vercel.app/admin`. A rota já é atendida pelo rewrite da Vercel. Esse endereço não comprova que a nova versão já está publicada.

Para executar localmente: `npm install` e `npm run dev`. Se o OneDrive ou um servidor aberto bloquear arquivos de `node_modules`, feche o servidor antigo antes de reinstalar. O código-fonte e o backup da versão anterior foram preservados.

## Definição dos indicadores

- Recebimentos: pagamentos com status `received`, pela data de recebimento.
- Atendimentos: status `completed`, pela data de conclusão.
- Ticket médio: total recebido / quantidade de atendimentos distintos com recebimento no período.
- Cliente mais pagante: soma dos recebimentos do cliente no período; clientes são identificados pelo telefone com DDD.
- Datas usam `America/Sao_Paulo`. As janelas anteriores têm a mesma quantidade de dias; hoje compara com o dia anterior inteiro.

O fluxo atual aceita pagamento integral, sem interface de estorno ou pagamento parcial. Estornos, cobrança recorrente, comissões e despesas não foram implementados. Há limites básicos de reservas por telefone e por hora; eles não verificam a identidade do telefone e não substituem CAPTCHA/antifraude em cenários de abuso.

## Validação

O SQL foi executado em um PostgreSQL local de testes com papéis equivalentes: criação e reexecução, acesso anônimo bloqueado, isolamento entre usuários, sobreposição de horários, reserva e recebimento idempotentes, cancelamento e bloqueio de conclusão futura.

Os cálculos foram testados para fronteiras de data em Brasília, pagamentos divididos, estornos, cancelamentos e ausência de dados. Os testes locais não substituem um teste final autenticado no seu projeto real após executar a migração e publicar o site.
