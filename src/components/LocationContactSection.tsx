import type { FC } from 'react';
import { MapPin, Phone, MessageCircle, Navigation, Clock } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { InstagramIcon } from './icons/InstagramIcon';

export const LocationContactSection: FC = () => {
  return (
    <section id="contato" className="py-24 bg-[#f8f9fa] relative border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#d4af37]/40 text-[#b48316] text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Localização & Atendimento</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-[#09090b] uppercase mb-4">
            VENHA PARA A APEX
          </h2>

          <p className="text-base sm:text-lg text-[#52525b] font-normal leading-relaxed">
            Estamos preparados para receber você em um espaço sofisticado e climatizado em Nova Porteirinha - MG.
          </p>
        </div>

        {/* Contact and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Contact Cards and Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Address Box */}
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-[#d4af37]/40 flex items-center justify-center text-[#b48316] shrink-0 mt-1 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#09090b] uppercase tracking-wider font-display">
                    Endereço
                  </h3>
                  <p className="text-sm text-[#18181b] mt-1 font-semibold">
                    {COMPANY_INFO.address.street}
                  </p>
                  <p className="text-xs text-[#52525b] mt-0.5">
                    {COMPANY_INFO.address.city} – {COMPANY_INFO.address.state}
                  </p>
                  <p className="text-xs text-[#71717a] mt-0.5">
                    CEP: {COMPANY_INFO.address.zip}
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Hours Box */}
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[#b48316] shrink-0 mt-1 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <h3 className="text-sm font-bold text-[#09090b] uppercase tracking-wider font-display mb-2">
                    Horário de Funcionamento
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    {COMPANY_INFO.hours.map((h, i) => (
                      <div key={i} className="flex items-center justify-between text-[#52525b]">
                        <span>{h.days}:</span>
                        <span className="text-[#09090b] font-bold">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Como Chegar */}
              <a
                href={COMPANY_INFO.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white hover:bg-[#09090b] text-[#09090b] hover:text-white border border-zinc-300 hover:border-[#09090b] transition-all duration-200 flex flex-col items-center justify-center text-center shadow-sm group"
              >
                <Navigation className="w-5 h-5 text-[#b48316] group-hover:text-[#d4af37] mb-1.5 transition-colors" />
                <span className="text-xs font-bold uppercase tracking-wider">Como Chegar</span>
                <span className="text-[10px] text-[#71717a] group-hover:text-zinc-300">Google Maps</span>
              </a>

              {/* Instagram */}
              <a
                href={COMPANY_INFO.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white hover:bg-[#09090b] text-[#09090b] hover:text-white border border-zinc-300 hover:border-[#09090b] transition-all duration-200 flex flex-col items-center justify-center text-center shadow-sm group"
              >
                <InstagramIcon className="w-5 h-5 text-[#b48316] group-hover:text-[#d4af37] mb-1.5 transition-colors" />
                <span className="text-xs font-bold uppercase tracking-wider">Instagram</span>
                <span className="text-[10px] text-[#71717a] group-hover:text-zinc-300">{COMPANY_INFO.instagram.handle}</span>
              </a>

              {/* Ligar */}
              <a
                href={`tel:${COMPANY_INFO.phone.raw}`}
                className="p-4 rounded-xl bg-white hover:bg-[#09090b] text-[#09090b] hover:text-white border border-zinc-300 hover:border-[#09090b] transition-all duration-200 flex flex-col items-center justify-center text-center shadow-sm group"
              >
                <Phone className="w-5 h-5 text-[#b48316] group-hover:text-[#d4af37] mb-1.5 transition-colors" />
                <span className="text-xs font-bold uppercase tracking-wider">Ligar</span>
                <span className="text-[10px] text-[#71717a] group-hover:text-zinc-300">{COMPANY_INFO.phone.display}</span>
              </a>

              {/* WhatsApp */}
              <a
                href={COMPANY_INFO.whatsapp.getUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all duration-200 flex flex-col items-center justify-center text-center shadow-md group"
              >
                <MessageCircle className="w-5 h-5 text-white mb-1.5 transition-colors" />
                <span className="text-xs font-bold uppercase tracking-wider">WhatsApp</span>
                <span className="text-[10px] text-white/90">Mensagem Direta</span>
              </a>
            </div>
          </div>

          {/* Right Column: Map Embed */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-md min-h-[380px] flex flex-col relative">
            <iframe
              title="Localização Apex Barber Nova Porteirinha"
              src="https://maps.google.com/maps?q=Av.+Castelo+Branco,+127,+Nova+Porteirinha+-+MG&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[380px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Overlay link button */}
            <div className="absolute bottom-4 right-4 z-10">
              <a
                href={COMPANY_INFO.maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#09090b] border border-[#d4af37]/60 text-xs font-bold text-[#d4af37] hover:bg-black transition-all flex items-center gap-2 shadow-lg"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Abrir Rota no GPS</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
