import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InfoBar } from './components/InfoBar';
import { ServicesSection } from './components/ServicesSection';
import { BarbersSection } from './components/BarbersSection';
import { ExperienceSection } from './components/ExperienceSection';
import { PortfolioSection } from './components/PortfolioSection';
import { PlansSection } from './components/PlansSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationContactSection } from './components/LocationContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { BookingModal } from './components/BookingModal';
import { CheckoutPage } from './components/CheckoutPage';
import type { Service, Barber, Plan, BookingState } from './types';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'checkout'>('home');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<Service | null>(null);
  const [preselectedBarber, setPreselectedBarber] = useState<Barber | null>(null);

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
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col font-sans">
      <Header
        onOpenBooking={() => handleOpenBookingModal()}
        onNavigate={handleNavigateSection}
        currentView={currentView}
        onGoHome={handleGoHome}
      />

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
