import type { Appointment } from '../types';

const STORAGE_KEY = 'apex_barber_appointments_v1';

export const BASE_TIME_SLOTS = [
  '08:30', '09:15', '10:00', '10:45', '11:30',
  '13:30', '14:15', '15:00', '15:45', '16:30',
  '17:15', '18:00', '18:45', '19:30'
];

export const formatDateKey = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getInitialSeedAppointments = (): Appointment[] => {
  const today = new Date();
  const todayStr = formatDateKey(today);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = formatDateKey(tomorrow);

  return [
    {
      id: 'mock-app-1',
      barberId: 'barbeiro-alexandre',
      barberName: 'Alexandre Mendes',
      serviceId: 'corte-visagista',
      serviceName: 'Corte Visagista Apex',
      servicePrice: 60.00,
      serviceDuration: 45,
      date: todayStr,
      time: '10:00',
      customerName: 'Gabriel Rezende',
      customerPhone: '(38) 99881-2233',
      customerEmail: 'gabriel@email.com',
      paymentMethod: 'pix',
      paymentStatus: 'paid',
      totalAmount: 60.00,
      createdAt: new Date().toISOString()
    },
    {
      id: 'mock-app-2',
      barberId: 'barbeiro-alexandre',
      barberName: 'Alexandre Mendes',
      serviceId: 'combo-corte-barba',
      serviceName: 'Combo Apex: Corte + Barba',
      servicePrice: 75.00,
      serviceDuration: 65,
      date: todayStr,
      time: '15:00',
      customerName: 'Renato Lima',
      customerPhone: '(38) 99123-4567',
      customerEmail: 'renato@email.com',
      paymentMethod: 'barbershop',
      paymentStatus: 'pay_on_arrival',
      totalAmount: 75.00,
      createdAt: new Date().toISOString()
    },
    {
      id: 'mock-app-3',
      barberId: 'barbeiro-lucas',
      barberName: 'Lucas Ferreira',
      serviceId: 'corte-masculino',
      serviceName: 'Corte Masculino Tradicional / Fade',
      servicePrice: 45.00,
      serviceDuration: 35,
      date: tomorrowStr,
      time: '14:15',
      customerName: 'Diego Miranda',
      customerPhone: '(38) 98877-6655',
      customerEmail: 'diego@email.com',
      paymentMethod: 'credit_card',
      paymentStatus: 'paid',
      totalAmount: 45.00,
      createdAt: new Date().toISOString()
    },
    {
      id: 'mock-app-4',
      barberId: 'barbeiro-mateus',
      barberName: 'Mateus Rocha',
      serviceId: 'barba-alinhada',
      serviceName: 'Barba & Modelagem Alinhada',
      servicePrice: 35.00,
      serviceDuration: 30,
      date: todayStr,
      time: '16:30',
      customerName: 'Marcos Vinicius',
      customerPhone: '(38) 99911-2244',
      customerEmail: 'marcos@email.com',
      paymentMethod: 'pix',
      paymentStatus: 'paid',
      totalAmount: 35.00,
      createdAt: new Date().toISOString()
    }
  ];
};

export const getStoredAppointments = (): Appointment[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = getInitialSeedAppointments();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return getInitialSeedAppointments();
  }
};

export const saveStoredAppointment = (appointment: Appointment): void => {
  try {
    const current = getStoredAppointments();
    const updated = [appointment, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving appointment:', err);
  }
};

export const isSlotAvailable = (barberId: string, date: string, time: string): boolean => {
  const appointments = getStoredAppointments();
  const collision = appointments.some(
    app => app.barberId === barberId && app.date === date && app.time === time
  );
  return !collision;
};

export interface SlotInfo {
  time: string;
  available: boolean;
  reason?: string;
}

export const getBarberSlotsForDate = (barberId: string, dateStr: string): SlotInfo[] => {
  const appointments = getStoredAppointments();
  const barberAppointments = appointments.filter(
    app => app.barberId === barberId && app.date === dateStr
  );
  const occupiedTimes = new Set(barberAppointments.map(app => app.time));

  const parsedDate = new Date(`${dateStr}T12:00:00`);
  if (parsedDate.getDay() === 0) {
    return BASE_TIME_SLOTS.map(time => ({
      time,
      available: false,
      reason: 'Fechado aos Domingos'
    }));
  }

  const now = new Date();
  const isToday = formatDateKey(now) === dateStr;

  return BASE_TIME_SLOTS.map(time => {
    const [hours, minutes] = time.split(':').map(Number);
    const isOccupied = occupiedTimes.has(time);

    let isPast = false;
    if (isToday) {
      const slotDate = new Date();
      slotDate.setHours(hours, minutes, 0, 0);
      if (slotDate <= now) {
        isPast = true;
      }
    }

    const available = !isOccupied && !isPast;
    let reason = undefined;
    if (isOccupied) reason = 'Horário já reservado';
    else if (isPast) reason = 'Horário encerrado';

    return {
      time,
      available,
      reason
    };
  });
};
