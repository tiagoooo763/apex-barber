import { useState } from 'react';
import type { FC } from 'react';
import { Check, Crown, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { PLANS } from '../data/plans';
import type { Plan } from '../types';

interface PlansSectionProps {
  onSelectPlan: (plan: Plan) => void;
}

export const PlansSection: FC<PlansSectionProps> = ({
  onSelectPlan
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  return (
    <section id="planos" className="py-24 bg-[#faf8f5] relative border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#d4af37]/50 text-[#b48316] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Assinaturas Exclusivas</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-[#09090b] uppercase mb-4">
            PLANOS APEX
          </h2>

          <p className="text-base sm:text-lg text-[#52525b] font-normal leading-relaxed">
            Para quem não abre mão de estar sempre no seu melhor. Mantenha o visual impecável com valores fixos e prioridade total na agenda.
          </p>

          {/* Interactive Billing Frequency Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-zinc-200/80 border border-zinc-300">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#09090b] text-[#d4af37] shadow-md'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'quarterly'
                  ? 'bg-[#09090b] text-[#d4af37] shadow-md'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <span>Trimestral</span>
              <span className="text-[10px] bg-[#d4af37] text-[#09090b] px-1.5 py-0.2 rounded-full font-black">
                -10%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map(plan => {
            const rawMonthlyPrice = plan.priceMonthly;
            const effectivePrice = billingCycle === 'quarterly' ? rawMonthlyPrice * 0.9 : rawMonthlyPrice;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative bg-white ${
                  plan.popular
                    ? 'border-2 border-[#d4af37] shadow-2xl shadow-[#d4af37]/20 -translate-y-2'
                    : 'border border-zinc-200 hover:border-[#d4af37]/70 hover:shadow-xl'
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
                      {effectivePrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xs text-[#71717a] ml-1 font-semibold">
                      /mês {billingCycle === 'quarterly' && '(cobrado a cada 3 meses)'}
                    </span>
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
                <div className="space-y-3">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-4 rounded-md font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                      plan.popular
                        ? 'bg-[#09090b] hover:bg-[#18181b] text-white shadow-lg border border-[#d4af37] btn-shimmer'
                        : 'bg-zinc-100 hover:bg-[#09090b] text-[#09090b] hover:text-white border border-zinc-300 hover:border-[#09090b]'
                    }`}
                  >
                    <span>Assinar {plan.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#b48316]" />
                    <span>Sem fidelidade · Cancele quando quiser</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
