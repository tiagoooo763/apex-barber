import type { FC } from 'react';
import { Star, MapPin, UserCheck, Scissors } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export const InfoBar: FC = () => {
  return (
    <section className="relative z-20 border-y border-zinc-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-zinc-200">
          {/* Info 1: Google Rating */}
          <div className="flex items-center justify-center gap-3.5 pt-4 md:pt-0">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#b48316] shrink-0 shadow-sm">
              <Star className="w-5 h-5 fill-[#d4af37]" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-bold text-[#09090b] leading-none">5,0</span>
                <span className="text-xs text-[#d4af37] font-semibold">★★★★★</span>
              </div>
              <p className="text-xs text-[#52525b] mt-0.5 font-medium">
                {COMPANY_INFO.googleReviews.totalCount} avaliações no Google
              </p>
            </div>
          </div>

          {/* Info 2: Location */}
          <div className="flex items-center justify-center gap-3.5 pt-4 md:pt-0">
            <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[#09090b] shrink-0 shadow-sm">
              <MapPin className="w-5 h-5 text-[#b48316]" />
            </div>
            <div className="text-left">
              <span className="text-sm sm:text-base font-bold text-[#09090b] leading-tight block">
                Nova Porteirinha - MG
              </span>
              <p className="text-xs text-[#52525b] mt-0.5 font-medium">
                Av. Castelo Branco, 127
              </p>
            </div>
          </div>

          {/* Info 3: Personalized Service */}
          <div className="flex items-center justify-center gap-3.5 pt-4 md:pt-0">
            <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[#09090b] shrink-0 shadow-sm">
              <UserCheck className="w-5 h-5 text-[#b48316]" />
            </div>
            <div className="text-left">
              <span className="text-sm sm:text-base font-bold text-[#09090b] leading-tight block">
                Atendimento Personalizado
              </span>
              <p className="text-xs text-[#52525b] mt-0.5 font-medium">
                Consultoria Visagista
              </p>
            </div>
          </div>

          {/* Info 4: Specialized Barbers */}
          <div className="flex items-center justify-center gap-3.5 pt-4 md:pt-0">
            <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[#09090b] shrink-0 shadow-sm">
              <Scissors className="w-5 h-5 text-[#b48316]" />
            </div>
            <div className="text-left">
              <span className="text-sm sm:text-base font-bold text-[#09090b] leading-tight block">
                Barbeiros Especializados
              </span>
              <p className="text-xs text-[#52525b] mt-0.5 font-medium">
                Técnica & Excelência
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
