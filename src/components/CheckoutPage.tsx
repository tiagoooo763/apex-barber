import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import {
  ShieldCheck,
  QrCode,
  CreditCard,
  Banknote,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Scissors,
  ArrowLeft,
  Copy,
  Check,
  Lock,
  Sparkles,
  Share2,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { BookingState, PaymentMethodType, Appointment } from '../types';
import { PAYMENT_CONFIG } from '../data/config';
import { COMPANY_INFO } from '../data/company';
import { saveStoredAppointment } from '../services/bookingStorage';

interface CheckoutPageProps {
  booking: BookingState;
  onGoHome: () => void;
  onNewBooking?: () => void;
}

export const CheckoutPage: FC<CheckoutPageProps> = ({
  booking,
  onGoHome
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  // Credit card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardInstallments, setCardInstallments] = useState('1');

  // Customer form inputs
  const [customerName, setCustomerName] = useState(booking.customerName || '');
  const [customerPhone, setCustomerPhone] = useState(booking.customerPhone || '');
  const [customerEmail, setCustomerEmail] = useState(booking.customerEmail || '');

  const totalAmount = booking.plan
    ? booking.plan.priceMonthly
    : booking.service
    ? booking.service.price
    : 0;

  const pixCodeSample = `00020126580014BR.GOV.BCB.PIX0114+55${PAYMENT_CONFIG.PIX.CHAVE_PIX}5204000053039865405${totalAmount.toFixed(2)}5802BR5915${PAYMENT_CONFIG.PIX.BENEFICIARIO}6015${PAYMENT_CONFIG.PIX.CIDADE}62070503***6304`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCodeSample);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
    val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(val);
  };

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 2) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setCardExpiry(val);
  };

  const handleConfirmOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const newApp: Appointment = {
        id: `APEX-${Date.now().toString().slice(-6)}`,
        barberId: booking.barber?.id || 'barbeiro-alexandre',
        barberName: booking.barber?.name || 'Alexandre Mendes',
        serviceId: booking.service?.id || (booking.plan ? booking.plan.id : 'corte-visagista'),
        serviceName: booking.service?.name || (booking.plan ? `Assinatura: ${booking.plan.name}` : 'Atendimento Apex'),
        servicePrice: totalAmount,
        serviceDuration: booking.service?.durationMinutes || 45,
        date: booking.date || new Date().toISOString().split('T')[0],
        time: booking.time || '14:00',
        customerName: customerName || 'Cliente Apex',
        customerPhone: customerPhone || '(38) 99747-5522',
        customerEmail: customerEmail || '',
        notes: booking.notes || '',
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'barbershop' ? 'pay_on_arrival' : 'paid',
        totalAmount: totalAmount,
        createdAt: new Date().toISOString(),
        planId: booking.plan?.id,
        planName: booking.plan?.name
      };

      saveStoredAppointment(newApp);
      setConfirmedAppointment(newApp);
      setIsProcessing(false);
      setIsSuccess(true);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const getGoogleCalendarUrl = () => {
    if (!confirmedAppointment) return '#';
    const dateParts = confirmedAppointment.date.split('-');
    const timeParts = confirmedAppointment.time.split(':');
    const start = new Date(
      Number(dateParts[0]),
      Number(dateParts[1]) - 1,
      Number(dateParts[2]),
      Number(timeParts[0] || 14),
      Number(timeParts[1] || 0)
    );
    const end = new Date(start.getTime() + (confirmedAppointment.serviceDuration || 45) * 60000);

    const formatCalDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const title = encodeURIComponent(`Apex Barber - ${confirmedAppointment.serviceName}`);
    const details = encodeURIComponent(
      `Agendamento confirmado com ${confirmedAppointment.barberName}.\nLocal: ${COMPANY_INFO.address.full}\nTelefone: ${COMPANY_INFO.phone.display}`
    );
    const location = encodeURIComponent(COMPANY_INFO.address.full);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatCalDate(start)}/${formatCalDate(end)}&details=${details}&location=${location}`;
  };

  const getWhatsAppReceiptUrl = () => {
    if (!confirmedAppointment) return '#';
    const msg = `*COMPROVANTE DE AGENDAMENTO - APEX BARBER*\n\n` +
      `👤 *Cliente:* ${confirmedAppointment.customerName}\n` +
      `✂️ *Serviço:* ${confirmedAppointment.serviceName}\n` +
      `💈 *Barbeiro:* ${confirmedAppointment.barberName}\n` +
      `📅 *Data:* ${confirmedAppointment.date}\n` +
      `⏰ *Horário:* ${confirmedAppointment.time}\n` +
      `💰 *Valor:* R$ ${confirmedAppointment.totalAmount.toFixed(2).replace('.', ',')}\n` +
      `💳 *Pagamento:* ${
        confirmedAppointment.paymentMethod === 'pix'
          ? 'PIX'
          : confirmedAppointment.paymentMethod === 'credit_card'
          ? 'Cartão de Crédito'
          : 'Pagar na Barbearia'
      }\n` +
      `📍 *Local:* ${COMPANY_INFO.address.full}\n\n` +
      `_Aguardamos você na Apex Barber!_`;

    return COMPANY_INFO.whatsapp.getUrl(msg);
  };

  if (isSuccess && confirmedAppointment) {
    return (
      <div className="min-h-screen pt-28 pb-20 bg-[#f8f9fa] text-zinc-900 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full rounded-2xl bg-white border-2 border-[#d4af37]/60 p-6 sm:p-10 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#d4af37] via-[#09090b] to-[#d4af37]" />

          <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#b48316] flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-xs uppercase font-black tracking-widest text-[#b48316] block mb-1">
            Reserva Confirmada com Sucesso
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-black uppercase text-[#09090b] mb-2">
            AGENDAMENTO CONFIRMADO
          </h2>
          <p className="text-sm text-zinc-600 max-w-md mx-auto mb-8 font-medium">
            Seu horário foi reservado com sucesso na Apex Barber. Enviamos os detalhes de confirmação.
          </p>

          <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-6 text-left space-y-3.5 mb-8">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
              <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Código da Reserva</span>
              <span className="font-mono text-xs font-black text-[#b48316]">{confirmedAppointment.id}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-600 flex items-center gap-2 font-medium">
                <Scissors className="w-3.5 h-3.5 text-[#b48316]" />
                <span>Serviço / Plano:</span>
              </span>
              <strong className="text-[#09090b] font-bold">{confirmedAppointment.serviceName}</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-600 flex items-center gap-2 font-medium">
                <User className="w-3.5 h-3.5 text-[#b48316]" />
                <span>Profissional:</span>
              </span>
              <strong className="text-[#09090b] font-bold">{confirmedAppointment.barberName}</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-600 flex items-center gap-2 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#b48316]" />
                <span>Data:</span>
              </span>
              <strong className="text-[#09090b] font-bold">{confirmedAppointment.date}</strong>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-600 flex items-center gap-2 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#b48316]" />
                <span>Horário:</span>
              </span>
              <strong className="text-[#09090b] font-bold">{confirmedAppointment.time}</strong>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-200">
              <span className="text-zinc-600 font-medium">Forma de Pagamento:</span>
              <span className="text-xs font-bold text-[#09090b] uppercase">
                {confirmedAppointment.paymentMethod === 'pix'
                  ? 'PIX (Aprovado)'
                  : confirmedAppointment.paymentMethod === 'credit_card'
                  ? 'Cartão de Crédito'
                  : 'Pagar na Barbearia'}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
              <span className="text-xs font-bold text-[#09090b] uppercase">Valor Total:</span>
              <span className="text-xl font-black text-[#b48316]">
                R$ {confirmedAppointment.totalAmount.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-[#09090b] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#b48316]" />
              <span>Adicionar ao Google Agenda</span>
            </a>

            <a
              href={getWhatsAppReceiptUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Share2 className="w-4 h-4" />
              <span>Enviar para WhatsApp</span>
            </a>
          </div>

          <button
            onClick={onGoHome}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#09090b] hover:bg-[#18181b] text-white font-extrabold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg border border-[#d4af37]"
          >
            VOLTAR PARA O INÍCIO
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#f8f9fa] text-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onGoHome}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-[#b48316] mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Início</span>
        </button>

        {PAYMENT_CONFIG.IS_DEMO_MODE && (
          <div className="mb-8 p-4 rounded-xl bg-white border border-[#d4af37] flex items-start gap-3 text-xs shadow-sm">
            <AlertTriangle className="w-4 h-4 text-[#b48316] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-[#09090b] font-bold block">
                Ambiente de Demonstração / Checkout Integrado
              </strong>
              <p className="text-zinc-600">
                O sistema está operando em modo de demonstração seguro. Você pode simular pagamentos via PIX instantâneo, Cartão de Crédito ou selecionar pagamento na chegada na barbearia.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: ORDER SUMMARY */}
          <div className="lg:col-span-5 rounded-2xl bg-white border border-zinc-200 p-6 sm:p-8 space-y-6 lg:sticky lg:top-24 shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#b48316] block mb-1">
                Checkout Apex
              </span>
              <h2 className="font-serif-luxury text-2xl font-black uppercase text-[#09090b]">
                Resumo do Pedido
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#09090b] font-display">
                    {booking.plan ? booking.plan.name : booking.service?.name || 'Serviço Selecionado'}
                  </h3>
                  <span className="text-xs text-[#b48316] font-semibold">
                    {booking.plan ? 'Plano Mensal Recorrente' : `${booking.service?.durationMinutes || 45} minutos`}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#b48316] font-bold">R$</span>
                  <span className="text-xl font-black text-[#09090b] ml-0.5">
                    {totalAmount.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {!booking.plan && booking.barber && (
                <div className="pt-3 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-600">
                  <span>Barbeiro Visagista:</span>
                  <strong className="text-[#09090b]">{booking.barber.name}</strong>
                </div>
              )}

              {booking.date && (
                <div className="flex items-center justify-between text-xs text-zinc-600">
                  <span>Data:</span>
                  <strong className="text-[#09090b]">{booking.date}</strong>
                </div>
              )}

              {booking.time && (
                <div className="flex items-center justify-between text-xs text-zinc-600">
                  <span>Horário:</span>
                  <strong className="text-[#09090b]">{booking.time}</strong>
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="text-[#09090b] font-semibold">R$ {totalAmount.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Taxa de Agendamento</span>
                <span className="text-[#25D366] font-bold">Grátis</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#09090b] pt-3 border-t border-zinc-200">
                <span>Total a Pagar</span>
                <span className="text-2xl font-black text-[#b48316]">
                  R$ {totalAmount.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 space-y-1">
              <strong className="text-[#09090b] block font-display">Local do Atendimento:</strong>
              <p>{COMPANY_INFO.address.full}</p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-6 text-[11px] text-zinc-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#b48316]" />
                <span>Pagamento Seguro</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#b48316]" />
                <span>Dados Protegidos</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CLIENT DATA & PAYMENT METHOD */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl bg-white border border-zinc-200 p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-[#b48316]" />
                <h3 className="text-base font-bold uppercase tracking-wider text-[#09090b] font-display">
                  1. Dados do Cliente
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 text-[#09090b] placeholder-zinc-400 text-xs focus:outline-none focus:border-[#09090b]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    WhatsApp / Telefone *
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="(38) 99747-5522"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 text-[#09090b] placeholder-zinc-400 text-xs focus:outline-none focus:border-[#09090b]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-zinc-700 block mb-1">
                    E-mail para confirmação
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 text-[#09090b] placeholder-zinc-400 text-xs focus:outline-none focus:border-[#09090b]"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-[#b48316]" />
                <h3 className="text-base font-bold uppercase tracking-wider text-[#09090b] font-display">
                  2. Forma de Pagamento
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3.5 sm:p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    paymentMethod === 'pix'
                      ? 'bg-zinc-50 border-2 border-[#09090b] text-[#09090b] shadow-md ring-1 ring-[#09090b]'
                      : 'bg-white border-zinc-200 hover:border-zinc-400 text-zinc-600'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#25D366] mb-1.5" />
                  <span className="text-xs font-bold uppercase tracking-wider block text-[#09090b]">PIX</span>
                  <span className="text-[10px] text-[#25D366] font-semibold">Aprovação Imediata</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-3.5 sm:p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    paymentMethod === 'credit_card'
                      ? 'bg-zinc-50 border-2 border-[#09090b] text-[#09090b] shadow-md ring-1 ring-[#09090b]'
                      : 'bg-white border-zinc-200 hover:border-zinc-400 text-zinc-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#b48316] mb-1.5" />
                  <span className="text-xs font-bold uppercase tracking-wider block text-[#09090b]">Cartão</span>
                  <span className="text-[10px] text-zinc-500 font-medium">Até 3x</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('barbershop')}
                  className={`p-3.5 sm:p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    paymentMethod === 'barbershop'
                      ? 'bg-zinc-50 border-2 border-[#09090b] text-[#09090b] shadow-md ring-1 ring-[#09090b]'
                      : 'bg-white border-zinc-200 hover:border-zinc-400 text-zinc-600'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#b48316] mb-1.5" />
                  <span className="text-xs font-bold uppercase tracking-wider block text-[#09090b]">Na Barbearia</span>
                  <span className="text-[10px] text-zinc-500 font-medium">Presencial</span>
                </button>
              </div>

              {paymentMethod === 'pix' && (
                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-4 animate-in fade-in">
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    <div className="p-3 bg-white border border-zinc-200 rounded-xl shadow-md shrink-0">
                      <svg
                        className="w-32 h-32 text-black"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                      >
                        <rect width="100" height="100" fill="#fff" />
                        <rect x="10" y="10" width="25" height="25" fill="#000" />
                        <rect x="15" y="15" width="15" height="15" fill="#fff" />
                        <rect x="65" y="10" width="25" height="25" fill="#000" />
                        <rect x="70" y="15" width="15" height="15" fill="#fff" />
                        <rect x="10" y="65" width="25" height="25" fill="#000" />
                        <rect x="15" y="70" width="15" height="15" fill="#fff" />
                        <rect x="45" y="15" width="10" height="10" fill="#000" />
                        <rect x="45" y="45" width="10" height="10" fill="#000" />
                        <rect x="15" y="45" width="10" height="10" fill="#000" />
                        <rect x="75" y="45" width="10" height="10" fill="#000" />
                        <rect x="45" y="75" width="10" height="10" fill="#000" />
                        <rect x="65" y="65" width="25" height="25" fill="#000" />
                        <rect x="70" y="70" width="15" height="15" fill="#fff" />
                      </svg>
                    </div>

                    <div className="space-y-2 text-xs flex-1 text-center sm:text-left">
                      <span className="text-[#25D366] font-bold uppercase tracking-wider block">
                        Pague com PIX Copia e Cola
                      </span>
                      <p className="text-zinc-600 leading-relaxed">
                        Abra o app do seu banco, escolha a opção PIX Copia e Cola e conclua o pagamento de <strong className="text-[#09090b]">R$ {totalAmount.toFixed(2).replace('.', ',')}</strong>.
                      </p>
                      <p className="text-[11px] text-zinc-500 font-medium">
                        Beneficiário: {PAYMENT_CONFIG.PIX.BENEFICIARIO}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={pixCodeSample}
                      className="w-full px-3 py-2.5 rounded-lg bg-white border border-zinc-300 text-[11px] font-mono text-zinc-700 truncate"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="px-4 py-2.5 rounded-lg bg-[#09090b] hover:bg-[#18181b] text-white text-xs font-bold uppercase flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                    >
                      {copiedPix ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#25D366]" />
                          <span className="text-[#25D366]">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === 'credit_card' && (
                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-4 animate-in fade-in">
                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-300 text-[#09090b] placeholder-zinc-400 text-xs font-mono focus:outline-none focus:border-[#09090b]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Nome Impresso no Cartão
                    </label>
                    <input
                      type="text"
                      placeholder="NOME COMO NO CARTÃO"
                      value={cardHolder}
                      onChange={e => setCardHolder(e.target.value.toUpperCase())}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-300 text-[#09090b] placeholder-zinc-400 text-xs uppercase focus:outline-none focus:border-[#09090b]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        Validade
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-300 text-[#09090b] placeholder-zinc-400 text-xs font-mono focus:outline-none focus:border-[#09090b]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-700 block mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-300 text-[#09090b] placeholder-zinc-400 text-xs font-mono focus:outline-none focus:border-[#09090b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 block mb-1">
                      Parcelamento
                    </label>
                    <select
                      value={cardInstallments}
                      onChange={e => setCardInstallments(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-300 text-[#09090b] text-xs focus:outline-none focus:border-[#09090b]"
                    >
                      <option value="1">1x de R$ {totalAmount.toFixed(2).replace('.', ',')} (Sem juros)</option>
                      <option value="2">2x de R$ {(totalAmount / 2).toFixed(2).replace('.', ',')} (Sem juros)</option>
                      <option value="3">3x de R$ {(totalAmount / 3).toFixed(2).replace('.', ',')} (Sem juros)</option>
                    </select>
                  </div>
                </div>
              )}

              {paymentMethod === 'barbershop' && (
                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2 text-xs text-zinc-600 animate-in fade-in">
                  <div className="flex items-center gap-2 text-[#09090b] font-bold mb-1">
                    <Banknote className="w-4 h-4 text-[#b48316]" />
                    <span>Pagamento Direto na Barbearia</span>
                  </div>
                  <p>
                    Seu horário será reservado agora. Você realiza o pagamento em dinheiro, cartão ou PIX diretamente na recepção da Apex Barber ao término do atendimento.
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleConfirmOrder}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-[#09090b] hover:bg-[#18181b] text-white font-extrabold text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-xl active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 border border-[#d4af37]"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processando Agendamento...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <span>Confirmar Agendamento</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
