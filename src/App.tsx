import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InfoBar } from './components/InfoBar';
import { ServicesSection } from './components/ServicesSection';
import { VisagismSimulator } from './components/VisagismSimulator';
import { BarbersSection } from './components/BarbersSection';
import { ExperienceSection } from './components/ExperienceSection';
import { PortfolioSection } from './components/PortfolioSection';
import { PlansSection } from './components/PlansSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { LocationContactSection } from './components/LocationContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { BookingModal } from './components/BookingModal';
import { CheckoutPage } from './components/CheckoutPage';
import { ToastContainer } from './components/Toast';
import type { ToastMessage } from './components/Toast';
import type { Service, Barber, Plan, BookingState } from './types';

export function App() {
  return window.location.pathname.startsWith('/admin') ? <AdminRedirect /> : <PublicApp />;
}

function AdminRedirect() {
  useEffect(() => {
    window.location.replace('https://barbdash.vercel.app');
  }, []);
  return <p>Abrindo BarbDash… <a href="https://barbdash.vercel.app">Entrar no painel</a></p>;
}

function PublicApp() {
  const [currentView, setCurrentView] = useState<'home' | 'checkout'>('home');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<Service | null>(null);
  const [preselectedBarber, setPreselectedBarber] = useState<Barber | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [checkoutBooking, setCheckoutBooking] = useState<BookingState>({
    service: null,
    barber: null,
    date: '',
    time: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    notes: '',
    plan: null
  });

  const addToast = useCallback((type: 'success' | 'info' | 'error', title: string, description?: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#checkout') {
        setCurrentView('checkout');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash === '#checkout') {
      setCurrentView('checkout');
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenBookingModal = (service?: Service | null, barber?: Barber | null) => {
    setPreselectedService(service || null);
    setPreselectedBarber(barber || null);
    setIsBookingOpen(true);
    if (service) {
      addToast('info', 'Serviço Selecionado', `${service.name} (R$ ${service.price.toFixed(2).replace('.', ',')})`);
    } else if (barber) {
      addToast('info', 'Barbeiro Escolhido', `${barber.name} (${barber.specialty})`);
    }
  };

  const handleCloseBookingModal = () => {
    setIsBookingOpen(false);
  };

  const handleProceedToCheckoutFromModal = (booking: BookingState) => {
    setCheckoutBooking(booking);
    setIsBookingOpen(false);
    setCurrentView('checkout');
    window.location.hash = '#checkout';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addToast('success', 'Horário Pré-selecionado!', 'Conclua a reserva com seus dados na página de checkout.');
  };

  const handleSelectPlan = (plan: Plan) => {
    setCheckoutBooking({
      service: null,
      barber: null,
      date: new Date().toISOString().split('T')[0],
      time: 'Assinatura Mensal',
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      notes: `Assinatura do plano ${plan.name}`,
      plan: plan
    });
    setCurrentView('checkout');
    window.location.hash = '#checkout';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addToast('success', `Plano ${plan.name}`, 'Preencha suas informações para ativar a assinatura.');
  };

  const handleGoHome = () => {
    setCurrentView('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentView !== 'home') {
      handleGoHome();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#18181b] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-[#09090b]">
      <Header
        onOpenBooking={() => handleOpenBookingModal()}
        onNavigate={handleNavigateSection}
        currentView={currentView}
        onGoHome={handleGoHome}
      />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {currentView === 'checkout' ? (
        <main className="flex-grow">
          <CheckoutPage
            booking={checkoutBooking}
            onGoHome={handleGoHome}
          />
        </main>
      ) : (
        <main className="flex-grow">
          <Hero
            onOpenBooking={() => handleOpenBookingModal()}
            onScrollToServices={() => handleNavigateSection('servicos')}
          />

          <InfoBar />

          <ServicesSection
            onSelectService={(service) => handleOpenBookingModal(service, null)}
            onScrollToPlans={() => handleNavigateSection('planos')}
          />

          {/* Simulador Visagista Apex */}
          <VisagismSimulator
            onSelectService={(service) => handleOpenBookingModal(service, null)}
          />

          <BarbersSection
            onSelectBarber={(barber) => handleOpenBookingModal(null, barber)}
          />

          <ExperienceSection
            onOpenBooking={() => handleOpenBookingModal()}
          />

          <PortfolioSection />

          <PlansSection
            onSelectPlan={handleSelectPlan}
          />

          <ReviewsSection />

          <FaqSection />

          <LocationContactSection />
        </main>
      )}

      <Footer
        onNavigate={handleNavigateSection}
        onOpenBooking={() => handleOpenBookingModal()}
      />

      <FloatingActions
        onOpenBooking={() => handleOpenBookingModal()}
        showMobileBar={currentView === 'home'}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBookingModal}
        initialService={preselectedService}
        initialBarber={preselectedBarber}
        onProceedToCheckout={handleProceedToCheckoutFromModal}
      />
    </div>
  );
}

export default App;
