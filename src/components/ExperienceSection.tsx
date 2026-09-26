import type { FC } from 'react';
import { Eye, UserCheck, Sparkles, Crosshair, Coffee } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface ExperienceSectionProps {
  onOpenBooking: () => void;
}

export const ExperienceSection: FC<ExperienceSectionProps> = ({
  onOpenBooking
}) => {
  const differentials = [
    {
      icon: Eye,
      title: 'VISAGISMO FACIAL',
      description: 'Análise detalhada do formato de crânio, linhas de expressão e barba para realçar o que há de melhor nos seus traços.'
    },
    {
      icon: UserCheck,
      title: 'ATENDIMENTO PERSONALIZADO',
      description: 'Sem pressa e sem linhas de montagem. Cada cliente tem seu momento exclusivo com diagnóstico e consultoria.'
    },
    {
      icon: Sparkles,
      title: 'TÉCNICA AVANÇADA',
      description: 'Constante atualização com tendências mundiais de barbearia, fade suave e trabalho refinado em tesoura.'
    },
    {
      icon: Crosshair,
      title: 'PRECISÃO NOS DETALHES',
      description: 'Acabamentos cirúrgicos na lâmina, simetria de barba e alinhamento milimétrico que dura muito mais tempo.'
    },
    {
      icon: Coffee,
      title: 'AMBIENTE MODERNO',
      description: 'Climatização premium, som ambiente sofisticado, poltronas ergonômicas e aquele café expresso especial.'
    }
  ];

  return (
    <section id="experiencia" className="py-24 bg-[#f8f9fa] relative border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Editorial Image & Quote */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-zinc-200 shadow-xl aspect-[4/5] bg-zinc-100">
              <img
                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=85"
                alt="Experiência Apex Barber"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Gold Quote Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-white/95 border border-[#d4af37]/60 shadow-lg backdrop-blur-md">
                <span className="text-[10px] font-black text-[#b48316] uppercase tracking-widest block mb-1">
                  Filosofia Apex
                </span>
                <p className="text-xs sm:text-sm text-[#09090b] italic font-serif font-medium">
                  "Estilo não é apenas o que você veste, mas como você se apresenta ao mundo."
                </p>
              </div>
            </div>

            <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#d4af37] rounded-tl-xl pointer-events-none" />
          </div>

          {/* Right Column: Editorial Text & Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#d4af37]/40 text-[#b48316] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
                <span>Conceito & Identidade</span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-[#09090b] uppercase leading-tight">
                MAIS QUE UM CORTE.
              </h2>

              <p className="text-base sm:text-lg text-[#27272a] font-normal leading-relaxed mt-4">
                Na Apex Barber, cada atendimento é pensado para valorizar a identidade de cada cliente. Unimos técnica, visagismo e atenção aos detalhes para entregar um resultado que combina com você.
              </p>

              <p className="text-sm text-[#52525b] leading-relaxed mt-3">
                {COMPANY_INFO.about}
              </p>
            </div>

            {/* 5 Differentials List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {differentials.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-zinc-200 hover:border-[#d4af37] transition-all duration-200 shadow-sm group hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 group-hover:border-[#d4af37] flex items-center justify-center text-[#b48316] shrink-0 transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-[#09090b] uppercase tracking-wider font-display">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#52525b] leading-relaxed pl-1">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA action */}
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-md bg-[#09090b] hover:bg-[#18181b] text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer shadow-lg border border-[#d4af37]"
              >
                Viver a Experiência Apex
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
