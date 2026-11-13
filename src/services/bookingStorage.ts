import { supabase, databaseError } from './supabase';
export const formatDateKey = (d: Date) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
export interface SlotInfo { time: string; available: boolean; reason?: string }
export async function getBarberSlotsForDate(barberId: string, date: string, serviceId: string): Promise<SlotInfo[]> {
  const { data, error } = await supabase.rpc('apex_available_slots', { p_barber: barberId, p_day: date, p_service: serviceId });
  if (error) throw new Error(databaseError(error));
  return (data ?? []) as SlotInfo[];
}
