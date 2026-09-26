import type { Plan } from '../types';

export const PLANS: Plan[] = [
  {
    id: 'plano-apex-essencial',
    name: 'Apex Essencial',
    subtitle: 'Manutenção periódica para o homem moderno',
    priceMonthly: 89.90,
    description: 'Ideal para manter o corte de cabelo sempre alinhado, sem preocupações com filas ou valores avulsos.',
    features: [
      '2 Cortes de Cabelo por mês',
      'Acabamento de pezinho ilimitado',
      'Agendamento prioritário no app/site',
      '10% de desconto em produtos da barbearia',
      'Café expresso ou cerveja gelada de cortesia'
    ],
    badge: 'Essencial',
    popular: false
  },
  {
    id: 'plano-apex-premium',
    name: 'Apex Premium',
    subtitle: 'O combo ideal de cabelo e barba em dia',
    priceMonthly: 149.90,
    description: 'Para o homem que exige estar impecável em todas as reuniões e compromissos importantes da semana.',
    features: [
      'Cortes de cabelo ilimitados no mês',
      '2 Cuidados completos de Barba com toalha quente',
      'Análise Visagista inclusa',
      'Prioridade máxima na escolha de horários e barbeiros',
      '15% de desconto em produtos e cosméticos',
      'Bebida premium inclusa a cada atendimento'
    ],
    badge: 'Mais Recomendado',
    popular: true
  },
  {
    id: 'plano-apex-black-vip',
    name: 'Apex Black VIP',
    subtitle: 'Experiência exclusiva e cuidado sem limites',
    priceMonthly: 219.90,
    description: 'Acesso VIP irrestrito com todos os serviços, barboterapia e mimos exclusivos da barbearia.',
    features: [
      'Cortes de Cabelo ILIMITADOS',
      'Barba e Barboterapia ILIMITADAS',
      'Design de sobrancelha e esfoliação inclusos',
      'Horários reservados e flexíveis (inclusive encaixes)',
      '20% de desconto em todos os produtos',
      'Atendimento com Barbeiro Master Visagista',
      'Acesso ao lounge VIP exclusivo'
    ],
    badge: 'Clube Exclusivo',
    popular: false
  }
];

export const getPlanById = (id: string): Plan | undefined => {
  return PLANS.find(plan => plan.id === id);
};
