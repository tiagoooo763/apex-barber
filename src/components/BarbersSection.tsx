import type { FC } from 'react';
import { Star, Award, Calendar, User } from 'lucide-react';
import { BARBERS } from '../data/barbers';
import type { Barber } from '../types';

interface BarbersSectionProps {
  onSelectBarber: (barber: Barber) => void;
}

export const BarbersSection: FC<BarbersSectionProps> = ({
  onSelectBarber
}) => {
  return (
    <section id="barbeiros" className="py-24 bg-white relative border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-[#d4af37]/40 text-[#b48316] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <User className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Mestres da Navalha & Visagismo</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-[#09090b] uppercase mb-4">
            NOSSO TIME
          </h2>

          <p className="text-base sm:text-lg text-[#52525b] font-normal leading-relaxed">
            Escolha o profissional que combina com o seu estilo. Cada especialista traz técnicas exclusivas e atenção minuciosa.
          </p>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {BARBERS.map(barber => (
            <div
              key={barber.id}
              className="group rounded-2xl bg-[#fafafa] border border-zinc-200 hover:border-[#d4af37] transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-xl"
            >
              {/* Photo with gradient overlay and badge */}
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
                <img
                  src={barber.photo}
                  alt={barber.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                {/* Badge if present */}
                {barber.badge && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#09090b] text-[#d4af37] text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 border border-[#d4af37]/50">
                    <Award className="w-3 h-3" />
                    <span>{barber.badge}</span>
                  </div>
                )}

                {/* Experience counter */}
                <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded bg-black/80 text-[10px] text-white backdrop-blur-sm font-semibold">
                  {barber.experienceYears}+ anos de experiência
                </div>
              </div>

              {/* Barber Details */}
              <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                <div>
                  <h3 className="text-xl font-black text-[#09090b] group-hover:text-[#b48316] transition-colors font-display mb-1">
                    {barber.name}
                  </h3>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-2.5">
                    <div className="flex text-[#d4af37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37]" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#09090b] ml-1">{barber.rating.toFixed(1)}</span>
                    <span className="text-[10px] text-[#71717a]">({barber.reviewsCount})</span>
                  </div>

                  {/* Specialty */}
                  <p className="text-xs font-bold text-[#b48316] uppercase tracking-wider mb-2">
                    {barber.specialty}
                  </p>

                  {/* Bio */}
                  <p className="text-xs text-[#52525b] leading-relaxed mb-6 line-clamp-3">
                    {barber.bio}
                  </p>
                </div>

                {/* Direct CTA */}
                <button
                  onClick={() => onSelectBarber(barber)}
                  className="w-full py-3 rounded-md bg-[#09090b] hover:bg-[#18181b] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-[#d4af37]/40 hover:border-[#d4af37] flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Agendar com este Barbeiro</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
