import type { FC } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-2 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-white border border-[#d4af37]/50 shadow-xl shadow-black/10 transition-all duration-300 animate-in fade-in slide-in-from-top-3"
        >
          {toast.type === 'success' && (
            <div className="w-7 h-7 rounded-full bg-[#d4af37]/15 text-[#b48316] flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          )}
          {toast.type === 'info' && (
            <div className="w-7 h-7 rounded-full bg-zinc-100 text-[#09090b] flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
          )}
          {toast.type === 'error' && (
            <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-[#09090b] uppercase tracking-wider">
              {toast.title}
            </h5>
            {toast.description && (
              <p className="text-[11px] text-zinc-600 mt-0.5 leading-snug">
                {toast.description}
              </p>
            )}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer shrink-0 p-0.5"
            aria-label="Fechar notificação"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
