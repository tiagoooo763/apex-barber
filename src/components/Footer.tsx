import type { FC } from 'react';
import { Phone, MessageCircle, MapPin, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { InstagramIcon } from './icons/InstagramIcon';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: FC<FooterProps> = ({
  onNavigate,
  onOpenBooking
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#09090b] text-zinc-400 pt-16 pb-12 border-t border-[#d4af37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800">
          {/* Brand Col with Official Emblem */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white border border-[#d4af37] p-1 flex items-center justify-center shrink-0 shadow-sm">
                <img
                  src="/apex-logo-emblem.png"
                  alt="Apex Barber Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif-luxury text-xl font-bold tracking-widest text-white block">
                  APEX BARBER
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#d4af37] uppercase font-bold block">
                  Barbeiro Visagista
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Dedicação absoluta à imagem e ao estilo do homem moderno em Nova Porteirinha e região norte de Minas Gerais.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_INFO.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Apex Barber"
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 hover:border-[#d4af37] hover:text-[#d4af37] text-white flex items-center justify-center transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.whatsapp.getUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Apex Barber"
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 hover:border-[#25D366] hover:text-[#25D366] text-white flex items-center justify-center transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${COMPANY_INFO.phone.raw}`}
                aria-label="Telefone Apex Barber"
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 hover:border-[#d4af37] hover:text-[#d4af37] text-white flex items-center justify-center transition-all"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-display">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer text-left"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('servicos')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer text-left"
                >
                  Serviços
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('barbeiros')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer text-left"
                >
                  Barbeiros & Time
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('planos')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer text-left"
                >
                  Planos Mensais
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experiencia')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer text-left"
                >
                  Sobre a Experiência
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contato')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer text-left"
                >
                  Contato & Localização
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest font-display">
              Atendimento
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Av. Castelo Branco, 127 – Nova Porteirinha - MG, 39525-000</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone.raw}`} className="hover:text-white">
                  {COMPANY_INFO.phone.display}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <InstagramIcon className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href={COMPANY_INFO.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {COMPANY_INFO.instagram.handle}
                </a>
              </li>
            </ul>
          </div>

          {/* Action Col */}
          <div className="lg:col-span-2 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest font-display mb-2">
                Agendamento
              </h4>
              <p className="text-[11px] text-zinc-400 mb-4">
                Garanta seu horário com nossos barbeiros visagistas.
              </p>
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 rounded-md bg-[#d4af37] hover:bg-[#b8860b] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md"
              >
                Agendar Agora
              </button>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#d4af37] transition-colors cursor-pointer self-start"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Voltar ao topo</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 Apex Barber. Todos os direitos reservados.</p>
          <p className="text-[11px] text-[#d4af37]">
            Nova Porteirinha – MG | Barbeiro Visagista
          </p>
        </div>
      </div>
    </footer>
  );
};
