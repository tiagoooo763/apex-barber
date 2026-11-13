import { useState } from 'react';
import type { FC } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'O que é o Visagismo e como ele valoriza minha imagem?',
    answer: 'O visagismo é a ciência e a arte de harmonizar a estética visual com a personalidade e a estrutura óssea de cada homem. Nossos barbeiros visagistas analisam o formato do seu crânio, linha da mandíbula, formato do rosto e proporções para criar um corte e alinhamento de barba sob medida, realçando seus pontos fortes e transmitindo confiança.'
  },
  {
    id: 'faq-2',
    question: 'Preciso agendar horário ou posso ir direto à barbearia?',
    answer: 'Recomendamos fortemente o agendamento prévio online aqui pelo site ou pelo WhatsApp. Trabalhamos com respeito rigoroso aos horários para que você não perca tempo em filas de espera e tenha a atenção exclusiva do profissional durante todo o procedimento.'
  },
  {
    id: 'faq-3',
    question: 'Como funcionam os Planos Mensais da Apex Barber?',
    answer: 'Os Planos Apex Essencial, Premium e Black VIP são assinaturas mensais sem carência. Com eles, você tem direito a cortes e cuidados de barba recorrentes, além de prioridade na reserva de horários e descontos exclusivos em cosméticos masculinos. Você pode cancelar ou alterar seu plano a qualquer momento.'
  },
  {
    id: 'faq-4',
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos PIX (com aprovação imediata), Cartão de Crédito (com parcelamento em até 3x sem juros) ou pagamento presencial direto na recepção ao término do seu atendimento (dinheiro ou cartão).'
  },
  {
    id: 'faq-5',
    question: 'Posso escolher com qual barbeiro serei atendido?',
    answer: 'Sim! Nosso sistema permite que você escolha diretamente qualquer um dos nossos barbeiros especialistas (Alexandre, Lucas, Mateus ou Gabriel). Cada um possui suas especialidades em visagismo, degradê e barboterapia.'
  },
  {
    id: 'faq-6',
    question: 'Onde a barbearia está localizada em Nova Porteirinha - MG?',
    answer: `Estamos na ${COMPANY_INFO.address.street}, em Nova Porteirinha - MG (CEP ${COMPANY_INFO.address.zip}). Um espaço moderno, climatizado, com poltronas ergonômicas e café expresso para receber você.`
  }
];

export const FaqSection: FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-white relative border-b border-zinc-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-[#d4af37]/40 text-[#b48316] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Tire Suas Dúvidas</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-[#09090b] uppercase mb-4">
            PERGUNTAS FREQUENTES
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            Tudo o que você precisa saber sobre o atendimento, visagismo e funcionamento da Apex Barber.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map(faq => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-zinc-50 border-[#d4af37] shadow-md'
                    : 'bg-white border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#09090b] text-[#d4af37]' : 'bg-zinc-100 text-zinc-500'
                    }`}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="font-display font-bold text-sm sm:text-base text-[#09090b]">
                      {faq.question}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#09090b] text-[#d4af37]' : 'bg-zinc-100 text-zinc-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-200/60 pt-4 animate-in fade-in duration-200 font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
