import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { MessageCircle, Calendar } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface FloatingActionsProps {
  onOpenBooking: () => void;
  showMobileBar?: boolean;
}

export const FloatingActions: FC<FloatingActionsProps> = ({
  onOpenBooking,
  showMobileBar = true
}) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating WhatsApp Action (Desktop & Tablet & Mobile) */}
      <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-40 flex items-center gap-3">
        {showNotification && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-800 text-xs shadow-xl animate-in fade-in slide-in-from-right-3 duration-300">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span className="font-semibold">Fale conosco no WhatsApp</span>
            <button
              onClick={() => setShowNotification(false)}
              className="text-zinc-400 hover:text-zinc-800 ml-1 text-xs"
            >
              ×
            </button>
          </div>
        )}

        <a
          href={COMPANY_INFO.whatsapp.getUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl shadow-black/15 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
        >
          <MessageCircle className="w-7 h-7 transition-transform group-hover:rotate-6" />
        </a>
      </div>

      {/* Fixed Sticky Mobile Bottom Action Bar */}
      {showMobileBar && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-4 py-3 flex items-center gap-3 shadow-lg">
          <a
            href={COMPANY_INFO.whatsapp.getUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 rounded-lg bg-zinc-100 border border-zinc-300 text-[#25D366] font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="flex-[2] py-2.5 rounded-lg bg-[#09090b] text-[#d4af37] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 shadow-md border border-[#d4af37]"
          >
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>Agendar Horário</span>
          </button>
        </div>
      )}
    </>
  );
};
