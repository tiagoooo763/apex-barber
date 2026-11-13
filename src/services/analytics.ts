export interface AppointmentRow {
  id: string; client_id: string; service_id: string; scheduled_at: string; completed_at: string | null;
  agreed_price_cents: number; status: string; barber_code: string | null; notes: string | null;
  clients: { name: string; phone: string | null }; services: { name: string };
  payments: { amount_cents: number; status: string }[];
}
export interface PaymentRow {
  id: string; appointment_id: string; amount_cents: number; paid_at: string; status: string;
  appointments: { client_id: string; clients: { name: string }; services: { name: string } };
}
export const currency = (cents: number) => (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const dateKey = (date: string | Date) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(date));
export const shiftDay = (day: string, n: number) => { const d = new Date(day + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
export const shortDate = (day: string) => day.slice(8) + '/' + day.slice(5, 7);
export function summarize(appointments: AppointmentRow[], payments: PaymentRow[], start: string, end: string) {
  const within = (value: string) => { const day = dateKey(value); return day >= start && day <= end; };
  const paid = payments.filter(p => p.status === 'received' && within(p.paid_at));
  const revenue = paid.reduce((s, p) => s + p.amount_cents, 0);
  const paidCount = new Set(paid.map(p => p.appointment_id)).size;
  const completed = appointments.filter(a => a.status === 'completed' && a.completed_at && within(a.completed_at)).length;
  const clients = new Map<string, { id: string; name: string; total: number; visits: Set<string> }>();
  const services = new Map<string, number>();
  for (const p of paid) {
    const a = p.appointments;
    const client = clients.get(a.client_id) ?? { id: a.client_id, name: a.clients.name, total: 0, visits: new Set<string>() };
    client.total += p.amount_cents; client.visits.add(p.appointment_id); clients.set(a.client_id, client);
    services.set(a.services.name, (services.get(a.services.name) ?? 0) + p.amount_cents);
  }
  return { revenue, paidCount, ticket: paidCount ? revenue / paidCount : 0, completed,
    clients: [...clients.values()].sort((a, b) => b.total - a.total),
    services: [...services.entries()].sort((a, b) => b[1] - a[1]), paid };
}
