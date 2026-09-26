import type { Review } from '../types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Matheus Henrique',
    rating: 5,
    comment: 'Mano, gostei demais de cortar o cabelo aí no seu salão. O atendimento é diferenciado e o corte ficou no padrão máximo!',
    date: 'Há 2 semanas',
    serviceUsed: 'Corte Visagista',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Carlos Eduardo',
    rating: 5,
    comment: 'Você muito boa a experiência..do cuidado com o cliente ao serviço feito. Ambiente muito agradável, recomendo demais para quem é de Nova Porteirinha e região.',
    date: 'Há 1 mês',
    serviceUsed: 'Combo Corte + Barba',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Rodrigo Silveira',
    rating: 5,
    comment: 'Ótimo profissional e muito feliz com o resultado. A consultoria visagista acertou em cheio no corte que combina com meu formato de rosto.',
    date: 'Há 3 semanas',
    serviceUsed: 'Corte Visagista + Barba',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Felipe Santos',
    rating: 5,
    comment: 'A melhor barbearia de Nova Porteirinha sem dúvidas. Pontualidade britânica, café top e corte impecável. Sou cliente fiel.',
    date: 'Há 1 mês',
    serviceUsed: 'Plano Apex Premium',
    verified: true
  },
  {
    id: 'rev-5',
    author: 'Bruno Albuquerque',
    rating: 5,
    comment: 'A toalha quente e a barboterapia são sensacionais. Vale cada centavo pela qualidade e pelo respeito ao horário agendado.',
    date: 'Há 2 meses',
    serviceUsed: 'Barboterapia & Barba',
    verified: true
  },
  {
    id: 'rev-6',
    author: 'Lucas Medeiros',
    rating: 5,
    comment: 'Atendimento de alto nível! O degradê mais limpo da região. Parabéns a toda a equipe da Apex.',
    date: 'Há 2 meses',
    serviceUsed: 'Corte Masculino Fade',
    verified: true
  }
];
