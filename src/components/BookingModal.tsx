import { useState, useEffect, useMemo } from 'react';
import type { FC, ChangeEvent } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Check,
  Calendar as CalendarIcon,
  User,
  Scissors,
  Phone,
  Mail,
  FileText,
  AlertCircle
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { BARBERS } from '../data/barbers';
import type { Service, Barber, BookingState } from '../types';
import { getBarberSlotsForDate, formatDateKey } from '../services/bookingStorage';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: Service | null;
  initialBarber?: Barber | null;
  onProceedToCheckout: (booking: BookingState) => void;
}

export const BookingModal: FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = null,
  initialBarber = null,
  onProceedToCheckout
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [selectedService, setSelectedService] = useState<Service | null>(initialService);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(initialBarber);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  const [slots, setSlots] = useState<{ time: string; available: boolean; reason?: string }[]>([]);

  const upcomingDates = useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const isSunday = d.getDay() === 0;
      const key = formatDateKey(d);
      
      const dayOfWeek = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
      const dayOfMonth = d.getDate();
      const monthName = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');

      list.push({
        date: d,
        key,
        dayOfWeek: dayOfWeek.toUpperCase(),
        dayOfMonth,
        monthName: monthName.toUpperCase(),
        isSunday,
        isToday: i === 0
      });
    }
    return list;
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (initialService) {
        setSelectedService(initialService);
      }
      if (initialBarber) {
        setSelectedBarber(initialBarber);
      }

      const defaultDate = upcomingDates[0].isSunday ? upcomingDates[1].key : upcomingDates[0].key;
      if (!selectedDate) {
        setSelectedDate(defaultDate);
      }

      if (initialService && initialBarber) {
        setCurrentStep(3);
      } else if (initialService) {
        setCurrentStep(2);
      } else if (initialBarber) {
        setCurrentStep(1);
      } else {
        setCurrentStep(1);
      }
    }
  }, [isOpen, initialService, initialBarber, upcomingDates, selectedDate]);

  useEffect(() => {
    if (selectedBarber && selectedDate) {
      const availableSlots = getBarberSlotsForDate(selectedBarber.id, selectedDate);
      setSlots(availableSlots);
      if (selectedTime) {
        const slot = availableSlots.find(s => s.time === selectedTime);
        if (!slot || !slot.available) {
          setSelectedTime('');
        }
      }
    }
  }, [selectedBarber, selectedDate, selectedTime]);

  if (!isOpen) return null;

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    if (val.length > 6) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    } else if (val.length > 0) {
      val = `(${val}`;
    }
    setCustomerPhone(val);
  };

  const handleNextStep = () => {
    setValidationError('');
    if (currentStep === 1) {
      if (!selectedService) {
        setValidationError('Por favor, selecione um serviço para continuar.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedBarber) {
        setValidationError('Por favor, selecione um barbeiro para continuar.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!selectedDate) {
        setValidationError('Por favor, selecione uma data.');
        return;
      }
      if (!selectedTime) {
        setValidationError('Por favor, selecione um horário disponível.');
        return;
      }
      setCurrentStep(4);
    } else if (currentStep === 4) {
      if (!customerName.trim()) {
        setValidationError('Por favor, informe seu nome completo.');
        return;
      }
      if (!customerPhone.trim() || customerPhone.length < 14) {
        setValidationError('Por favor, informe um número de WhatsApp válido.');
        return;
      }

      const bookingData: BookingState = {
        service: selectedService,
        barber: selectedBarber,
        date: selectedDate,
        time: selectedTime,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim(),
        notes: customerNotes.trim(),
        plan: null
      };

      onProceedToCheckout(bookingData);
    }
  };

  const handlePrevStep = () => {
    setValidationError('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepTitles = [
    'Escolha o Serviço',
    'Escolha o Barbeiro',
    'Data & Horário',
    'Seus Dados'
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Agendamento Apex Barber"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white text-zinc-900 border border-zinc-200 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl relative my-auto overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 flex items-center justify-between bg-[#fafafa]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-[#d4af37] flex items-center justify-center text-[#d4af37] shadow-sm">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#b48316] font-black block">
                Agendamento Online
              </span>
              <h3 className="font-serif-luxury text-lg sm:text-xl font-black text-[#09090b] uppercase">
                {stepTitles[currentStep - 1]}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar agendamento"
            className="w-9 h-9 rounded-full bg-zinc-200 hover:bg-zinc-300 text-zinc-700 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="px-6 pt-4 pb-2 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between text-xs">
          {[1, 2, 3, 4].map(step => (
            <div key={step} className="flex items-center gap-2 flex-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] transition-colors ${
                  step < currentStep
                    ? 'bg-[#09090b] text-[#d4af37]'
                    : step === currentStep
                    ? 'bg-[#d4af37] text-black ring-2 ring-black'
                    : 'bg-zinc-200 text-zinc-500'
                }`}
              >
                {step < currentStep ? <Check className="w-3.5 h-3.5" /> : step}
              </div>
              <span
                className={`hidden sm:inline text-[11px] font-bold ${
                  step === currentStep ? 'text-[#09090b]' : 'text-zinc-400'
                }`}
              >
                {stepTitles[step - 1]}
              </span>
              {step < 4 && <div className="flex-1 h-[1px] bg-zinc-200 mx-2 hidden sm:block" />}
            </div>
          ))}
        </div>

        {/* Validation Alert */}
        {validationError && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span className="font-medium">{validationError}</span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-grow bg-white">
          {/* STEP 1: CHOOSE SERVICE */}
          {currentStep === 1 && (
            <div className="space-y-3">
              <p className="text-xs text-zinc-500 mb-2 font-medium">
                Selecione o serviço que deseja realizar na Apex Barber:
              </p>
              <div className="grid grid-cols-1 gap-3">
                {SERVICES.map(service => {
                  const isSelected = selectedService?.id === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service);
                        setValidationError('');
                      }}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border flex items-center justify-between ${
                        isSelected
                          ? 'bg-zinc-50 border-2 border-[#d4af37] shadow-md ring-1 ring-[#d4af37]'
                          : 'bg-white border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50/50'
                      }`}
                    >
                      <div className="space-y-1 pr-4">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-[#09090b] font-display">
                            {service.name}
                          </h4>
                          {service.popular && (
                            <span className="px-2 py-0.5 rounded text-[9px] bg-[#d4af37]/20 text-[#b48316] font-bold uppercase">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-600 line-clamp-1">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium">
                          <Clock className="w-3 h-3 text-[#b48316]" />
                          <span>{service.durationMinutes} minutos</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs text-[#b48316] font-bold">R$</span>
                        <span className="text-lg font-black text-[#09090b] ml-0.5">
                          {service.price.toFixed(2).replace('.', ',')}
                        </span>
                        <div className="mt-1 flex justify-end">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#09090b] border-[#09090b] text-[#d4af37]'
                                : 'border-zinc-300'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE BARBER */}
          {currentStep === 2 && (
            <div className="space-y-3">
              <p className="text-xs text-zinc-500 mb-2 font-medium">
                Escolha o barbeiro de sua preferência para o atendimento:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BARBERS.map(barber => {
                  const isSelected = selectedBarber?.id === barber.id;
                  return (
                    <div
                      key={barber.id}
                      onClick={() => {
                        setSelectedBarber(barber);
                        setValidationError('');
                      }}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border flex items-center gap-3.5 ${
                        isSelected
                          ? 'bg-zinc-50 border-2 border-[#d4af37] shadow-md ring-1 ring-[#d4af37]'
                          : 'bg-white border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50/50'
                      }`}
                    >
                      <img
                        src={barber.photo}
                        alt={barber.name}
                        className="w-14 h-14 rounded-full object-cover border border-zinc-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#09090b] truncate font-display">
                          {barber.name}
                        </h4>
                        <p className="text-[11px] text-[#b48316] font-bold truncate">
                          {barber.specialty}
                        </p>
                        <span className="text-[10px] text-zinc-500 font-semibold block mt-0.5">
                          ★ {barber.rating.toFixed(1)} ({barber.reviewsCount} avaliações)
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-[#09090b] border-[#09090b] text-[#d4af37]'
                            : 'border-zinc-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME */}
          {currentStep === 3 && (
            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <label className="text-xs font-bold text-[#09090b] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#b48316]" />
                  <span>Selecione o Dia</span>
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {upcomingDates.map(d => {
                    const isSelected = selectedDate === d.key;
                    if (d.isSunday) {
                      return (
                        <div
                          key={d.key}
                          className="min-w-[68px] p-2.5 rounded-xl bg-zinc-100 border border-zinc-200 opacity-50 text-center cursor-not-allowed shrink-0"
                        >
                          <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                            {d.dayOfWeek}
                          </span>
                          <span className="text-base font-bold text-zinc-400 block my-0.5">
                            {d.dayOfMonth}
                          </span>
                          <span className="text-[9px] text-zinc-400 uppercase font-semibold">Fechado</span>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={d.key}
                        onClick={() => {
                          setSelectedDate(d.key);
                          setValidationError('');
                        }}
                        className={`min-w-[68px] p-2.5 rounded-xl border text-center transition-all cursor-pointer shrink-0 ${
                          isSelected
                            ? 'bg-[#09090b] border-[#09090b] text-white shadow-md font-bold'
                            : 'bg-white border-zinc-300 hover:border-zinc-500 text-zinc-800'
                        }`}
                      >
                        <span className={`text-[10px] uppercase font-bold block ${isSelected ? 'text-[#d4af37]' : 'text-zinc-500'}`}>
                          {d.isToday ? 'Hoje' : d.dayOfWeek}
                        </span>
                        <span className="text-lg font-black block my-0.5">
                          {d.dayOfMonth}
                        </span>
                        <span className={`text-[9px] uppercase font-semibold ${isSelected ? 'text-zinc-300' : 'text-zinc-500'}`}>
                          {d.monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Selection */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold text-[#09090b] uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#b48316]" />
                    <span>Horários Disponíveis</span>
                  </label>
                  <span className="text-[11px] text-zinc-600 font-medium">
                    Barbeiro: <strong className="text-[#09090b]">{selectedBarber?.name}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                  {slots.map(slot => {
                    const isSelected = selectedTime === slot.time;
                    if (!slot.available) {
                      return (
                        <div
                          key={slot.time}
                          title={slot.reason || 'Indisponível'}
                          className="p-3 rounded-lg bg-zinc-100 border border-zinc-200 text-center text-xs text-zinc-400 cursor-not-allowed opacity-60 line-through font-medium"
                        >
                          {slot.time}
                        </div>
                      );
                    }

                    return (
                      <button
                        key={slot.time}
                        onClick={() => {
                          setSelectedTime(slot.time);
                          setValidationError('');
                        }}
                        className={`p-3 rounded-lg border text-center text-xs font-bold tracking-wider transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#09090b] border-[#09090b] text-[#d4af37] shadow-md scale-105'
                            : 'bg-white border-zinc-300 hover:border-[#b48316] text-[#09090b]'
                        }`}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-4 mt-3 text-[11px] text-zinc-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-[#09090b]" />
                    <span>Selecionado</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-white border border-zinc-300" />
                    <span>Disponível</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-zinc-100 border border-zinc-200 opacity-60 line-through" />
                    <span>Ocupado</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CLIENT DETAILS */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <p className="text-xs text-zinc-600 font-medium">
                Informe seus dados de contato para confirmar o agendamento e receber o lembrete via WhatsApp:
              </p>

              <div>
                <label className="text-xs font-bold text-[#09090b] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#b48316]" />
                  <span>Nome Completo *</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: João da Silva"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 text-[#09090b] placeholder-zinc-400 text-sm focus:outline-none focus:border-[#09090b]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#09090b] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#b48316]" />
                  <span>WhatsApp / Telefone *</span>
                </label>
                <input
                  type="tel"
                  placeholder="(38) 99999-9999"
                  value={customerPhone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 text-[#09090b] placeholder-zinc-400 text-sm focus:outline-none focus:border-[#09090b]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#09090b] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#b48316]" />
                  <span>E-mail (Opcional)</span>
                </label>
                <input
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 text-[#09090b] placeholder-zinc-400 text-sm focus:outline-none focus:border-[#09090b]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#09090b] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#b48316]" />
                  <span>Observação / Preferência (Opcional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Gostaria de alinhar a barba com toalha quente..."
                  value={customerNotes}
                  onChange={e => setCustomerNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 text-[#09090b] placeholder-zinc-400 text-sm focus:outline-none focus:border-[#09090b] resize-none"
                />
              </div>

              {/* Order Summary Recap */}
              <div className="p-4 rounded-xl bg-[#fafafa] border border-zinc-300 text-xs space-y-2">
                <div className="flex justify-between text-zinc-600">
                  <span>Serviço:</span>
                  <span className="text-[#09090b] font-bold">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Profissional:</span>
                  <span className="text-[#09090b] font-bold">{selectedBarber?.name}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Data & Horário:</span>
                  <span className="text-[#09090b] font-bold">{selectedDate} às {selectedTime}</span>
                </div>
                <div className="flex justify-between text-zinc-700 pt-1 border-t border-zinc-200 font-medium">
                  <span className="font-bold text-[#09090b]">Total:</span>
                  <span className="text-base font-black text-[#b48316]">
                    R$ {selectedService?.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 sm:p-6 border-t border-zinc-200 bg-[#fafafa] flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              onClick={handlePrevStep}
              className="px-4 py-2.5 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNextStep}
            className="px-6 py-3 rounded-lg bg-[#09090b] hover:bg-[#18181b] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ml-auto border border-[#d4af37]"
          >
            <span>{currentStep === 4 ? 'Avançar para Checkout' : 'Próxima Etapa'}</span>
            <ChevronRight className="w-4 h-4 text-[#d4af37]" />
          </button>
        </div>
      </div>
    </div>
  );
};
