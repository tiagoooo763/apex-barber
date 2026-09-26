import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { InstagramIcon } from './icons/InstagramIcon';

interface HeaderProps {
  onOpenBooking: () => void;
  onNavigate: (sectionId: string) => void;
  currentView: 'home' | 'checkout';
  onGoHome: () => void;
}

export const Header: FC<HeaderProps> = ({
  onOpenBooking,
  onNavigate,
  currentView,
  onGoHome
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md py-3 shadow-md shadow-black/5 border-b border-zinc-200'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-zinc-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Emblem */}
        <button
          onClick={() => {
            onGoHome();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left group flex items-center gap-3 cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-[#d4af37]/50 shadow-sm flex items-center justify-center p-0.5 group-hover:border-[#d4af37] transition-all duration-300">
            <img
              src="/apex-logo-emblem.png"
              alt="Apex Barber Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="font-serif-luxury text-xl sm:text-2xl font-black tracking-widest text-[#09090b] block group-hover:text-[#b48316] transition-colors">
              APEX BARBER
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.25em] text-[#b48316] uppercase font-bold block">
              Barbeiro Visagista
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#27272a]">
          <button
            onClick={() => handleNavClick('hero')}
            className={`transition-colors cursor-pointer py-1 tracking-wider uppercase text-xs hover:text-[#b48316] ${
              currentView === 'home' ? 'text-[#09090b]' : ''
            }`}
          >
            Início
          </button>
          <button
            onClick={() => handleNavClick('servicos')}
            className="hover:text-[#b48316] transition-colors cursor-pointer py-1 tracking-wider uppercase text-xs"
          >
            Serviços
          </button>
          <button
            onClick={() => handleNavClick('barbeiros')}
            className="hover:text-[#b48316] transition-colors cursor-pointer py-1 tracking-wider uppercase text-xs"
          >
            Barbeiros
          </button>
          <button
            onClick={() => handleNavClick('planos')}
            className="hover:text-[#b48316] transition-colors cursor-pointer py-1 tracking-wider uppercase text-xs"
          >
            Planos
          </button>
          <button
            onClick={() => handleNavClick('experiencia')}
            className="hover:text-[#b48316] transition-colors cursor-pointer py-1 tracking-wider uppercase text-xs"
          >
            Sobre
          </button>
          <button
            onClick={() => handleNavClick('contato')}
            className="hover:text-[#b48316] transition-colors cursor-pointer py-1 tracking-wider uppercase text-xs"
          >
            Contato
          </button>
        </nav>

        {/* Desktop CTA Action */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={COMPANY_INFO.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Apex Barber"
            className="w-9 h-9 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[#27272a] hover:text-[#b48316] hover:border-[#d4af37] transition-all"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <button
            onClick={onOpenBooking}
            className="relative group overflow-hidden rounded-md px-5 py-2.5 bg-[#09090b] hover:bg-[#18181b] text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:shadow-black/10 active:scale-95 cursor-pointer flex items-center gap-2 border border-[#d4af37]/40"
          >
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>Agendar Horário</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="rounded-md px-3 py-1.5 bg-[#09090b] text-[#d4af37] font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 border border-[#d4af37]/40"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Agendar</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
            className="w-10 h-10 rounded-md bg-zinc-100 border border-zinc-300 flex items-center justify-center text-[#09090b] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 px-6 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 text-sm font-semibold">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left text-[#18181b] hover:text-[#b48316] py-2 border-b border-zinc-100 uppercase tracking-wider text-xs"
            >
              Início
            </button>
            <button
              onClick={() => handleNavClick('servicos')}
              className="text-left text-[#18181b] hover:text-[#b48316] py-2 border-b border-zinc-100 uppercase tracking-wider text-xs"
            >
              Serviços
            </button>
            <button
              onClick={() => handleNavClick('barbeiros')}
              className="text-left text-[#18181b] hover:text-[#b48316] py-2 border-b border-zinc-100 uppercase tracking-wider text-xs"
            >
              Barbeiros
            </button>
            <button
              onClick={() => handleNavClick('planos')}
              className="text-left text-[#18181b] hover:text-[#b48316] py-2 border-b border-zinc-100 uppercase tracking-wider text-xs"
            >
              Planos Mensais
            </button>
            <button
              onClick={() => handleNavClick('experiencia')}
              className="text-left text-[#18181b] hover:text-[#b48316] py-2 border-b border-zinc-100 uppercase tracking-wider text-xs"
            >
              Sobre a Experiência
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className="text-left text-[#18181b] hover:text-[#b48316] py-2 border-b border-zinc-100 uppercase tracking-wider text-xs"
            >
              Galeria & Trabalhos
            </button>
            <button
              onClick={() => handleNavClick('contato')}
              className="text-left text-[#18181b] hover:text-[#b48316] py-2 border-b border-zinc-100 uppercase tracking-wider text-xs"
            >
              Contato & Localização
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-[#09090b] text-[#d4af37] font-bold text-center rounded-md uppercase tracking-wider text-xs flex items-center justify-center gap-2 border border-[#d4af37]/40 shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              Agendar Horário Online
            </button>
            <a
              href={`tel:${COMPANY_INFO.phone.raw}`}
              className="w-full py-2.5 bg-zinc-100 border border-zinc-300 text-zinc-800 font-medium text-center rounded-md text-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#b48316]" />
              Ligar {COMPANY_INFO.phone.display}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
