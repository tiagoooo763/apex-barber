import type { FC } from 'react';
import { Calendar, ChevronDown, Sparkles, Star } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface HeroProps {
  onOpenBooking: () => void;
  onScrollToServices: () => void;
}

export const Hero: FC<HeroProps> = ({
  onOpenBooking,
  onScrollToServices
}) => {
  return (
    <section id="hero" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-white via-[#fcfcfd] to-[#f4f4f6]">
      {/* Background Subtle Luxury Accents */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#d4af37]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-20 right-10 w-96 h-96 bg-zinc-200/50 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Decorative filigree linework borders */}
      <div className="absolute top-24 left-8 right-8 hidden lg:flex items-center justify-between pointer-events-none opacity-25">
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent to-[#d4af37]" />
        <div className="flex gap-2 text-[#d4af37]">
          <Star className="w-3 h-3 fill-[#d4af37]" />
          <Star className="w-3 h-3 fill-[#d4af37]" />
          <Star className="w-3 h-3 fill-[#d4af37]" />
        </div>
        <div className="h-[1px] w-48 bg-gradient-to-l from-transparent to-[#d4af37]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Official Apex Emblem Badge */}
        <div className="relative mb-6 group">
          <div className="w-24 sm:w-28 md:w-32 aspect-square rounded-2xl overflow-hidden bg-white p-1.5 shadow-xl border-2 border-[#d4af37]/60 flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-105">
            <img
              src="/apex-logo-emblem.png"
              alt="Apex Barber Emblema Oficial"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#09090b] text-[#d4af37] text-[10px] font-black uppercase tracking-widest border border-[#d4af37]/60 shadow-md">
            Visagismo
          </div>
        </div>

        {/* Location Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#d4af37]/40 text-[#b48316] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Nova Porteirinha – MG</span>
        </div>

        {/* Brand Main Title (Secondary Color: Black) */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-black tracking-widest text-[#09090b] uppercase drop-shadow-sm">
          APEX BARBER
        </h1>

        {/* Subtitle / Visagista with Gold Filigree Divider (Tertiary: Gold) */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 my-2 sm:my-3">
          <span className="h-[1.5px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <h2 className="text-xs sm:text-sm md:text-base tracking-[0.35em] text-[#b48316] uppercase font-bold">
            {COMPANY_INFO.tagline}
          </h2>
          <span className="h-[1.5px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>

        {/* Slogan Quote */}
        <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#27272a] max-w-2xl font-semibold mt-2 mb-3">
          "{COMPANY_INFO.slogan}"
        </p>

        {/* Secondary Description */}
        <p className="text-sm sm:text-base md:text-lg text-[#52525b] max-w-xl font-normal leading-relaxed mb-8 sm:mb-10">
          {COMPANY_INFO.heroSubtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-md bg-[#09090b] hover:bg-[#18181b] text-white font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-3 group border border-[#d4af37]"
          >
            <Calendar className="w-4 h-4 text-[#d4af37] transition-transform duration-300 group-hover:scale-110" />
            <span className="text-[#f4f4f5]">AGENDAR HORÁRIO</span>
          </button>

          <button
            onClick={onScrollToServices}
            className="w-full sm:w-auto px-8 py-4 rounded-md bg-white hover:bg-zinc-50 text-[#09090b] border border-zinc-300 hover:border-[#d4af37] font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
          >
            CONHECER SERVIÇOS
          </button>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={onScrollToServices}
          aria-label="Rolar para os serviços"
          className="mt-12 sm:mt-14 text-zinc-400 hover:text-[#b48316] transition-colors flex flex-col items-center gap-1.5 cursor-pointer group"
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold opacity-80 group-hover:opacity-100">
            Explorar
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#b48316]" />
        </button>
      </div>
    </section>
  );
};
