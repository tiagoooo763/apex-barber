import { useState } from 'react';
import type { FC } from 'react';
import { Clock, Scissors, Sparkles, Check } from 'lucide-react';
import { SERVICES } from '../data/services';
import type { Service } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: Service) => void;
  onScrollToPlans: () => void;
}

export const ServicesSection: FC<ServicesSectionProps> = ({
  onSelectService,
  onScrollToPlans
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos os Serviços' },
    { id: 'visagismo', label: 'Visagismo' },
    { id: 'cabelo', label: 'Cortes & Cabelo' },
    { id: 'barba', label: 'Barba & Spa' },
    { id: 'combo', label: 'Combos Especiais' }
  ];

  const filteredServices = activeFilter === 'todos'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeFilter);

  return (
    <section id="servicos" className="py-24 bg-[#f8f9fa] relative border-b border-zinc-200">
      {/* Background Subtle Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#d4af37]/40 text-[#b48316] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Scissors className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Menu de Serviços</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-[#09090b] uppercase mb-4">
            NOSSOS SERVIÇOS
          </h2>

          <p className="text-base sm:text-lg text-[#52525b] font-normal leading-relaxed">
            Serviços pensados para valorizar seu estilo e manter seu visual sempre impecável.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  activeFilter === cat.id
                    ? 'bg-[#09090b] text-[#d4af37] shadow-md border border-[#d4af37]/50'
                    : 'bg-white text-[#52525b] hover:text-[#09090b] border border-zinc-200 hover:border-zinc-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className={`group rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden bg-white border ${
                service.popular
                  ? 'border-[#d4af37] shadow-lg shadow-[#d4af37]/10'
                  : 'border-zinc-200 hover:border-[#d4af37] hover:shadow-xl'
              }`}
            >
              {/* Highlight Tag */}
              {service.tag && (
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#b48316] text-[10px] font-bold tracking-wider uppercase">
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    {service.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#71717a]">
                    <Clock className="w-3.5 h-3.5 text-[#b48316]" />
                    <span>{service.durationMinutes} min</span>
                  </div>
                </div>
              )}

              {/* Service Info */}
              <div>
                <h3 className="text-xl font-bold text-[#09090b] group-hover:text-[#b48316] transition-colors mb-2 font-display">
                  {service.name}
                </h3>
                <p className="text-sm text-[#52525b] leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between mt-auto">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#71717a] block font-semibold">
                    Investimento
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-[#b48316] font-bold">R$</span>
                    <span className="text-2xl font-black text-[#09090b] tracking-tight">
                      {service.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectService(service)}
                  className="px-5 py-2.5 rounded-md bg-[#09090b] hover:bg-[#18181b] text-[#f4f4f5] font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 cursor-pointer shadow-md border border-[#d4af37]/40 hover:border-[#d4af37]"
                >
                  Agendar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Plan Banner Inside Services */}
        <div className="mt-14 rounded-2xl bg-white border-2 border-[#d4af37]/40 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#b48316] font-bold block mb-1">
              Economize & Mantenha a Frequência
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-black text-[#09090b] uppercase">
              Prefere cuidar do visual o mês inteiro?
            </h3>
            <p className="text-sm text-[#52525b] mt-2 max-w-xl">
              Conheça os Planos Apex com cortes ilimitados, agendamento prioritário e benefícios exclusivos.
            </p>
          </div>

          <button
            onClick={onScrollToPlans}
            className="shrink-0 px-6 py-3.5 rounded-md bg-[#09090b] hover:bg-[#18181b] text-white font-bold text-xs tracking-wider uppercase transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-2 border border-[#d4af37]"
          >
            <span>Ver Planos Mensais</span>
            <Check className="w-4 h-4 text-[#d4af37]" />
          </button>
        </div>
      </div>
    </section>
  );
};
