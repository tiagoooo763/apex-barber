export type PaymentMethodType = 'pix' | 'credit_card' | 'barbershop';

export interface Barber {
  id: string;
  name: string;
  title: string;
  role: string;
  photo: string;
  specialty: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  badge?: string;
  instagram?: string;
  availableDays?: number[]; // 0 = Sunday, 1 = Monday, etc.
}

export interface Service {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  category: 'cabelo' | 'barba' | 'combo' | 'visagismo' | 'tratamento';
  tag?: string;
  popular?: boolean;
  image?: string;
}

export interface Plan {
  id: string;
  name: string;
  subtitle: string;
  priceMonthly: number;
  description: string;
  features: string[];
  badge?: string;
  popular?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  serviceUsed?: string;
  verified: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'corte' | 'barba' | 'visagismo' | 'ambiente';
  image: string;
  description: string;
}

export interface Appointment {
  id: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'pending' | 'paid' | 'pay_on_arrival';
  totalAmount: number;
  createdAt: string;
  planId?: string;
  planName?: string;
}

export interface BookingState {
  service: Service | null;
  barber: Barber | null;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
  plan: Plan | null;
}
