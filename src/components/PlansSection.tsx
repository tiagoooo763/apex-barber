import type { FC } from 'react';
import { Check, Crown, Sparkles, ArrowRight } from 'lucide-react';
import { PLANS } from '../data/plans';
import type { Plan } from '../types';

interface PlansSectionProps {
  onSelectPlan: (plan: Plan) => void;
}

export const PlansSection: FC<PlansSectionProps> = ({
  onSelectPlan
}) => {
  return (
    <section id="planos" className="py-24 bg-[#f8f9fa] relative border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#d4af37]/40 text-[#b48316] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Assinaturas Exclusivas</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-[#09090b] uppercase mb-4">
            PLANOS APEX
          </h2>

          <p className="text-base sm:text-lg text-[#52525b] font-normal leading-relaxed">
            Para quem não abre mão de estar sempre no seu melhor. Mantenha o visual impecável com valores fixos e prioridade no atendimento.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map(plan => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative bg-white ${
                plan.popular
                  ? 'border-2 border-[#d4af37] shadow-xl shadow-[#d4af37]/15 -translate-y-2'
                  : 'border border-zinc-200 hover:border-[#d4af37] hover:shadow-lg'
              }`}
            >
              {/* Most Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className={`px-4 py-1 rounded-full text-[11px] font-black tracking-wider uppercase inline-flex items-center gap-1.5 shadow-md ${
                    plan.popular
                      ? 'bg-[#09090b] text-[#d4af37] border border-[#d4af37]'
                      : 'bg-zinc-100 text-[#09090b] border border-zinc-300'
                  }`}>
                    {plan.popular && <Sparkles className="w-3 h-3 text-[#d4af37]" />}
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div>
                <h3 className="text-2xl font-black text-[#09090b] font-display mt-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-[#71717a] mt-1 mb-6 font-medium">
                  {plan.subtitle}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-1 py-4 border-y border-zinc-100 my-4">
                  <span className="text-xs text-[#b48316] font-bold">R$</span>
                  <span className="text-4xl font-black text-[#09090b] tracking-tight">
                    {plan.priceMonthly.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-xs text-[#71717a] ml-1 font-semibold">/mês</span>
                </div>

                <p className="text-xs text-[#52525b] leading-relaxed mb-6 font-medium">
                  {plan.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#3f3f46]">
                      <div className="w-4 h-4 rounded-full bg-[#d4af37]/20 text-[#b48316] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 font-bold" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Action */}
              <button
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-4 rounded-md font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                  plan.popular
                    ? 'bg-[#09090b] hover:bg-[#18181b] text-white shadow-lg border border-[#d4af37]'
                    : 'bg-zinc-100 hover:bg-[#09090b] text-[#09090b] hover:text-white border border-zinc-300 hover:border-[#09090b]'
                }`}
              >
                <span>Assinar {plan.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
              </button>
            </div>
          ))}
        </div>

        {/* Clarification Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#71717a] font-medium">
            * Sem carência. Cancele ou altere seu plano quando desejar direto com a barbearia.
          </p>
        </div>
      </div>
    </section>
  );
};
