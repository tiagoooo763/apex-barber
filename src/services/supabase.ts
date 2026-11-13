import { createClient } from '@supabase/supabase-js';
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const supabase = createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } });
export function databaseError(error: { message: string; code?: string }): string {
  if (['PGRST202', '42703', '42P01'].includes(error.code ?? '')) return 'A configuração do banco ainda não foi concluída. Execute o SQL de integração da Apex no Supabase.';
  if (error.message.includes('Failed to fetch')) return 'Não foi possível conectar. Verifique sua internet e tente novamente.';
  if (error.code === 'P0001') return error.message;
  return 'Não foi possível concluir a operação. Tente novamente ou fale com a barbearia.';
}
