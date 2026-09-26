import type { Service } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'corte-visagista',
    name: 'Corte Visagista Apex',
    description: 'Análise morfológica e visagista completa para alinhar o corte perfeito com o formato do seu rosto, proporções e estilo de vida.',
    durationMinutes: 45,
    price: 60.00,
    category: 'visagismo',
    tag: 'Especialidade da Casa',
    popular: true,
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'corte-masculino',
    name: 'Corte Masculino Tradicional / Fade',
    description: 'Corte personalizado de acordo com o estilo e formato do rosto. Acabamento fino com máquina e tesoura.',
    durationMinutes: 35,
    price: 45.00,
    category: 'cabelo',
    tag: 'Mais Pedido',
    popular: true,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'barba-alinhada',
    name: 'Barba & Modelagem Alinhada',
    description: 'Modelagem e alinhamento milimétrico da barba, com toalha quente aromática, hidratação e pós-barba refrescante.',
    durationMinutes: 30,
    price: 35.00,
    category: 'barba',
    tag: 'Cuidado & Relaxamento',
    popular: false,
    image: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'combo-corte-barba',
    name: 'Combo Apex: Corte + Barba',
    description: 'A experiência completa para cabelo e barba. Diagnóstico visual, corte refinado, barboterapia com toalha quente e finalização com pomada premium.',
    durationMinutes: 65,
    price: 75.00,
    category: 'combo',
    tag: 'Experiência Completa',
    popular: true,
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'acabamento-pezinho',
    name: 'Acabamento & Pezinho',
    description: 'Finalização e detalhes na navalha para manter o corte impecável entre as manutenções.',
    durationMinutes: 20,
    price: 25.00,
    category: 'cabelo',
    tag: 'Manutenção Rápida',
    popular: false,
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'barboterapia-spa',
    name: 'Barboterapia Relaxante',
    description: 'Protocolo de relaxamento profundo com esfoliação facial, vapor de ozônio, toalha quente, óleos essenciais e massagem facial relaxante.',
    durationMinutes: 40,
    price: 50.00,
    category: 'barba',
    tag: 'Spa Masculino',
    popular: false,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sobrancelha-masculina',
    name: 'Design de Sobrancelha Masculina',
    description: 'Limpeza natural respeitando o arqueamento masculino para valorizar o olhar de forma discreta e elegante.',
    durationMinutes: 15,
    price: 20.00,
    category: 'tratamento',
    tag: 'Express',
    popular: false,
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80'
  }
];

export const getServiceById = (id: string): Service | undefined => {
  return SERVICES.find(service => service.id === id);
};
