import type { Barber } from '../types';

export const BARBERS: Barber[] = [
  {
    id: 'barbeiro-alexandre',
    name: 'Alexandre Mendes',
    title: 'Master Barber & Visagista',
    role: 'Especialista em Visagismo & Cortes Clássicos',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    specialty: 'Visagismo Facial & Cortes Personalizados',
    bio: 'Mais de 8 anos de experiência em alta barbearia. Focado em harmonização estética masculina, consultoria de imagem e cortes milimétricos com tesoura.',
    rating: 5.0,
    reviewsCount: 37,
    experienceYears: 8,
    badge: 'Master Visagista',
    instagram: 'apexbarberofc',
    availableDays: [1, 2, 3, 4, 5, 6]
  },
  {
    id: 'barbeiro-lucas',
    name: 'Lucas Ferreira',
    title: 'Barber Stylist',
    role: 'Especialista em Fade, Degradê & Freestyle',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    specialty: 'Degradê Skin Fade & Tendências Urbanas',
    bio: 'Especialista nos fades mais limpos e transições suaves. Domínio de navalha afiada, riscos cirúrgicos e técnicas contemporâneas de acabamento.',
    rating: 5.0,
    reviewsCount: 29,
    experienceYears: 5,
    badge: 'Fade Specialist',
    instagram: 'apexbarberofc',
    availableDays: [1, 2, 3, 4, 5, 6]
  },
  {
    id: 'barbeiro-mateus',
    name: 'Mateus Rocha',
    title: 'Barber & Barboterapeuta',
    role: 'Especialista em Barba Tradicional & Barboterapia',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
    specialty: 'Barboterapia & Alinhamento de Barba',
    bio: 'Mestre no cuidado com a barba, toalha quente e alinhamento anatômico. Proporciona uma experiência de relaxamento e precisão inigualável.',
    rating: 4.9,
    reviewsCount: 24,
    experienceYears: 6,
    badge: 'Barber & Spa',
    instagram: 'apexbarberofc',
    availableDays: [1, 2, 3, 4, 5, 6]
  },
  {
    id: 'barbeiro-gabriel',
    name: 'Gabriel Costa',
    title: 'Executive Barber',
    role: 'Especialista em Cortes Executivos & Tesoura',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    specialty: 'Cortes Clássicos, Scissor Work & Penteados',
    bio: 'Perfeccionista no trabalho de tesoura e finalização de penteados formais e executivos. Atenção meticulosa aos detalhes e perfil de cada cliente.',
    rating: 5.0,
    reviewsCount: 18,
    experienceYears: 4,
    badge: 'Cortes Clássicos',
    instagram: 'apexbarberofc',
    availableDays: [2, 3, 4, 5, 6]
  }
];

export const getBarberById = (id: string): Barber | undefined => {
  return BARBERS.find(barber => barber.id === id);
};
