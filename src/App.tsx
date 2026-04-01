import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { StartProjectPage } from './components/StartProjectPage';
import { WebsitesOfferPage } from './components/WebsitesOfferPage';
import { EcommerceOfferPage } from './components/EcommerceOfferPage';
import { AdsOfferPage } from './components/AdsOfferPage';
import { SeoOfferPage } from './components/SeoOfferPage';
import { PoradnikPage } from './components/PoradnikPage';
import { ArticlePage } from './components/ArticlePage';
import { 
  Menu, X, Monitor, ShoppingCart, Search, Share2, 
  TrendingUp, Camera, CheckCircle2, ArrowRight, ChevronDown,
  Zap, Target, BarChart3, Users, Globe, Phone, ChevronLeft, ChevronRight
} from 'lucide-react';

const GoogleAdsLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} id="Google-Ads-Logo--Streamline-Logos">
    <path stroke="currentColor" strokeLinejoin="round" d="M1.5 18a3 3 0 1 0 6 0 3 3 0 1 0 -6 0" strokeWidth="1"></path>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M10.501 2.401A3 3 0 0 0 9.402 6.5l7.5 13a3 3 0 0 0 5.197 -2.998l-7.5 -13a3 3 0 0 0 -4.098 -1.1Z" strokeWidth="1"></path>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m12 11.003 -4.9 8.496a3 3 0 0 1 -5.2 -2.998L9.394 3.514" strokeWidth="1"></path>
  </svg>
);

const MetaLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16.8 5C14.7 5 12.8 6.1 11.5 7.9 10.2 6.1 8.3 5 6.2 5 2.8 5 0 7.8 0 11.2s2.8 6.2 6.2 6.2c2.1 0 4-1.1 5.3-2.9 1.3 1.8 3.2 2.9 5.3 2.9 3.4 0 6.2-2.8 6.2-6.2S20.2 5 16.8 5zm0 10.4c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2 4.2 1.9 4.2 4.2-1.9 4.2-4.2 4.2zM6.2 15.4c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2 4.2 1.9 4.2 4.2-1.9 4.2-4.2 4.2z"/>
  </svg>
);

function ContactModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [selectedService, setSelectedService] = useState<string>("");
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);

  const services = [
    "strony internetowe",
    "sklepy internetowe",
    "google ads & meta ads",
    "optymalizacja SEO"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Blurred Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-[420px] max-h-[90vh] overflow-y-auto bg-[#1a1a1a] rounded-2xl shadow-2xl border border-white/10 flex flex-col scrollbar-hide"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[#1a1a1a] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_#B0B8C2_0%,_transparent_50%),radial-gradient(circle_at_80%_80%,_#B0B8C2_0%,_transparent_50%),radial-gradient(circle_at_50%_50%,_#B0B8C2_0%,_transparent_70%)] opacity-10 pointer-events-none"></div>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 backdrop-blur-sm text-white/50 hover:bg-white/10 hover:text-white transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative p-6 sm:p-8 z-10 flex flex-col gap-6">
              <div className="pr-8">
                <h2 className="text-2xl sm:text-3xl font-inter-tight font-medium text-white mb-2 tracking-tight">Wycena w 30 minut</h2>
                <p className="text-sm text-slate-400 font-inter-tight">Zostaw dane, a nasz ekspert skontaktuje się z Tobą.</p>
              </div>

              <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-inter-tight">Imię i Nazwisko</label>
                  <input 
                    type="text" 
                    placeholder="np. Jan Kowalski"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 focus:border-[#c9c0e8] focus:ring-1 focus:ring-[#c9c0e8] outline-none transition-all font-inter-tight text-sm text-white placeholder:text-slate-600"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-inter-tight">Adres email / Numer telefonu</label>
                  <input 
                    type="text" 
                    placeholder="np. jan@poczta.pl lub 791 000 000"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 focus:border-[#c9c0e8] focus:ring-1 focus:ring-[#c9c0e8] outline-none transition-all font-inter-tight text-sm text-white placeholder:text-slate-600"
                  />
                </div>

                <div className="relative flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-inter-tight">Usługa</label>
                  <button
                    type="button"
                    onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 focus:border-[#c9c0e8] text-left flex justify-between items-center transition-all font-inter-tight text-sm text-white"
                  >
                    <span className={selectedService ? "text-white" : "text-slate-600"}>
                      {selectedService || "Wybierz usługę..."}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''} text-slate-400`} />
                  </button>
                  
                  <AnimatePresence>
                    {isServiceDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute z-50 w-full top-[100%] mt-2 bg-[#222] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                      >
                        {services.map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => {
                              setSelectedService(service);
                              setIsServiceDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors text-sm font-inter-tight text-slate-300"
                          >
                            {service}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-inter-tight">Twoja wiadomość</label>
                  <textarea 
                    rows={4}
                    placeholder="Opisz krótko swój projekt..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 focus:border-[#c9c0e8] focus:ring-1 focus:ring-[#c9c0e8] outline-none transition-all font-inter-tight text-sm text-white placeholder:text-slate-600 resize-none"
                  />
                </div>

                <button className="w-full bg-[#c9c0e8] hover:bg-[#b8a1ff] text-black rounded-xl py-3.5 font-semibold transition-all shadow-lg flex items-center justify-center gap-2 mt-2 text-sm font-inter-tight">
                  <span>Wyślij zapytanie</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const servicesData = [
  {
    id: 'www',
    title: 'Strony internetowe WWW',
    description: 'Od prostych stron One-Page po skomplikowane projekty z unikalnym designem. Kodujemy od zera bez szablonów, budując zaufanie od pierwszego kliknięcia.',
    icon: <Monitor className="w-8 h-8" />,
    features: [
      'Strony wizytówki (One Page)',
      'Rozbudowane serwisy firmowe',
      'Landing Page sprzedażowe',
      'Optymalizacja pod konwersję'
    ]
  },
  {
    id: 'ecommerce',
    title: 'Sklepy E-commerce',
    description: 'Od szybkich sklepów po zaawansowane systemy e-commerce. Budujemy intuicyjne ścieżki zakupu, które zatrzymują klienta w koszyku aż do finalizacji zamówienia.',
    icon: <ShoppingCart className="w-8 h-8" />,
    features: [
      'Sklepy na WooCommerce / PrestaShop',
      'Integracje z Allegro i ERP',
      'Systemy płatności i wysyłek',
      'Analityka sprzedaży'
    ]
  },
  {
    id: 'google-ads',
    title: 'Reklamy Google',
    description: 'Zamiast przepalać budżet na przypadkowe frazy, skupiamy się na intencjach zakupowych. Sprawiamy, że Twoja oferta pojawia się dokładnie tam, gdzie klienci szukają konkretnych rozwiązań.',
    icon: <GoogleAdsLogo className="w-8 h-8" />,
    features: [
      'Kampanie w wyszukiwarce',
      'Kampanie produktowe (PLA)',
      'Remarketing dynamiczny',
      'Kampanie YouTube & Display'
    ]
  },
  {
    id: 'meta-ads',
    title: 'Reklamy Meta',
    description: 'Tworzymy reklamy, których nie da się pominąć – zatrzymują wzrok i zmuszają do działania. Zamieniamy przypadkowy scroll w konkretne zapytania i realny zysk Twojej marki.',
    icon: <MetaLogo className="w-8 h-8" />,
    features: [
      'Kampanie Facebook | Instagram',
      'Lead Generation',
      'Skalowanie sprzedaży',
      'Kreacje reklamowe wideo/graficzne'
    ]
  },
  {
    id: 'seo',
    title: 'Pozycjonowanie SEO',
    description: 'Zamiast płacić za każde kliknięcie, sprawiamy, że klienci sami trafiają na Twoją stronę. Budujemy trwały zasięg, który z każdym miesiącem obniża Twoje koszty marketingu.',
    icon: <Search className="w-8 h-8" />,
    features: [
      'Audyty techniczne SEO',
      'Link Building',
      'SEO lokalne i ogólnopolskie',
      'Optymalizacja treści (SXO)'
    ]
  },
  {
    id: 'strategy',
    title: 'Copywriting & Strategia',
    description: 'Łączymy mocny design z tekstami, które zapadają w pamięć. Projektujemy treści wybijające się z nudnego tła, budując Twój autorytet i realną przewagę nad konkurencją.',
    icon: <BarChart3 className="w-8 h-8" />,
    features: [
      'Teksty sprzedażowe (Copywriting)',
      'Strategie marketingowe 360°',
      'Content Marketing',
      'Analiza konkurencji i rynku'
    ]
  }
];

const packagesData = [
  {
    title: 'Pakiet "Szybki Start"',
    subtitle: 'Strona + Google Ads',
    desc: 'Idealny dla nowych firm, które chcą szybko zaistnieć w sieci i zacząć pozyskiwać pierwszych klientów.',
    price: 'od 3 500 PLN',
    features: ['Strona Wizytówka', 'Konfiguracja Google Ads', 'Szybki start (wdrożenie)', 'Analiza konkurencji']
  },
  {
    title: 'Pakiet "E-commerce Scale"',
    subtitle: 'Sklep + Meta Ads + Content',
    desc: 'Kompleksowe rozwiązanie dla sklepów, które chcą zwiększyć sprzedaż i zbudować rozpoznawalną markę.',
    price: 'od 8 500 PLN',
    features: ['Sklep Internetowy', 'Kampania Meta Ads', 'Zdjęcia produktów', 'Kompleksowe wdrożenie', 'Automatyzacja']
  },
  {
    title: 'Abonament "Full Growth"',
    subtitle: 'Zewnętrzny dział marketingu',
    desc: 'Stała opieka nad SEO, kampaniami Ads oraz regularna produkcja contentu. Twoja firma ma zewnętrzny dział marketingu.',
    price: 'Indywidualnie',
    features: ['Stała opieka SEO', 'Zarządzanie kampaniami Ads', 'Produkcja wideo', 'Dedykowany opiekun', 'Raportowanie']
  }
];

const BackgroundPattern = ({ color = "#3b82f6", opacity = 0.06 }: { color?: string, opacity?: number }) => (
  <div className="absolute inset-0 -z-10" style={{ 
    opacity,
    backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`, 
    backgroundSize: '40px 40px' 
  }}></div>
);

// Removed SkewedBackground

function Navbar({ onContactClick, onStartProjectClick, onOfferClick, isContactPage, onHomeClick, onPoradnikClick }: { onContactClick: () => void, onStartProjectClick?: () => void, onOfferClick?: (type?: string) => void, isContactPage?: boolean, onHomeClick: () => void, onPoradnikClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  
  const menuItems = [
    { name: 'STRONA GŁÓWNA', href: '#', onClick: onHomeClick },
    { name: 'O NAS', href: '#' },
    { 
      name: 'OFERTA', 
      href: '#',
      subItems: [
        { name: 'Strony Internetowe', type: 'websites-offer' },
        { name: 'Sklepy E-Commerce', type: 'ecommerce-offer' },
        { name: 'Kampanie Ads (Google & Meta)', type: 'ads-offer' },
        { name: 'Pozycjonowanie SEO', type: 'seo-offer' }
      ]
    },
    { name: 'NASZE PRACE', href: '#' },
    { name: 'NASZ PORADNIK', href: '#', onClick: onPoradnikClick }
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div 
        className={`w-full max-w-5xl transition-all duration-500 overflow-hidden ${
          isOpen 
            ? 'rounded-[2.5rem] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 p-6' 
            : 'rounded-[2rem] bg-[#050505]/60 backdrop-blur-md border border-white/10 py-3 px-6'
        }`}
      >
        {/* Navbar Header */}
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            {/* Logo and 10 Years removed as requested */}
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2">
            <div 
              className="flex items-center leading-none font-syne font-black text-sm sm:text-base tracking-tighter uppercase text-white whitespace-nowrap cursor-pointer"
              onClick={onHomeClick}
            >
              <span>S</span>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="mx-[1px] flex items-center"
              >
                <SimpleGlobe className="w-[0.85em] h-[0.85em]" />
              </motion.span>
              <span>LID&nbsp;AGENCY</span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span 
              className="hidden sm:block text-white font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase cursor-pointer hover:text-white/80 transition-colors" 
              onClick={onContactClick}
            >
              KONTAKT
            </span>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : (
                <div className="flex flex-col gap-[5px]">
                  <div className="w-[18px] sm:w-[22px] h-[1.5px] bg-white rounded-full"></div>
                  <div className="w-[18px] sm:w-[22px] h-[1.5px] bg-white rounded-full"></div>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Expanded Menu Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div>
                <div className="flex flex-col mt-4 sm:mt-8 mb-6 sm:mb-8 overflow-y-auto custom-scrollbar pr-2 h-[250px] sm:h-[420px]">
                  {menuItems.map((item) => (
                    <div key={item.name} className="border-b border-white/5 last:border-0">
                      <a 
                        href={item.href} 
                        className="text-2xl sm:text-5xl font-black text-white hover:text-[#8d32fc] transition-colors flex justify-between items-center py-2 sm:py-4 group"
                        onClick={(e) => {
                          if (item.subItems) {
                            e.preventDefault();
                            setIsServicesOpen(!isServicesOpen);
                          } else if (item.onClick) {
                            e.preventDefault();
                            item.onClick();
                            setIsOpen(false);
                          } else {
                            setIsOpen(false);
                          }
                        }}
                      >
                        <span className="tracking-tighter uppercase font-syne font-bold">{item.name}</span>
                        {item.subItems ? (
                          <motion.div animate={{ rotate: isServicesOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <ChevronDown className="w-5 h-5 sm:w-8 sm:h-8 opacity-40 group-hover:opacity-100 transition-all" />
                          </motion.div>
                        ) : (
                          <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 opacity-40 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                        )}
                      </a>
                      {item.subItems && (
                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-3 pb-4 pl-4 sm:pl-8">
                                {item.subItems.map(sub => (
                                  <a 
                                    key={typeof sub === 'string' ? sub : sub.name} 
                                    href="#" 
                                    className="text-lg sm:text-3xl font-bold text-slate-400 hover:text-white transition-colors py-1"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (typeof sub !== 'string' && onOfferClick) {
                                        // We need to handle specific offer clicks
                                        // But for now let's just close and use the type if we can
                                        // Actually, let's pass the type to onOfferClick if it's available
                                        if (onOfferClick) {
                                          onOfferClick(sub.type);
                                        }
                                      }
                                      setIsOpen(false);
                                    }}
                                  >
                                    {typeof sub === 'string' ? sub : sub.name}
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 pb-4">
                <button onClick={() => { onStartProjectClick ? onStartProjectClick() : onContactClick(); setIsOpen(false); }} className="bg-[#d1cce8] p-5 sm:p-10 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col justify-between h-36 sm:h-48 relative text-left group overflow-hidden flex-1">
                  <div className="relative z-10">
                    <span className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-1 sm:mb-2 block">KONTAKT</span>
                    <span className="text-2xl sm:text-5xl font-black text-slate-900 leading-none tracking-tighter uppercase font-bebas" style={{ letterSpacing: '0.1em' }}>WYSTARTUJMY Z<br/>PROJEKTEM</span>
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 w-20 h-20 sm:w-32 sm:h-32 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <img src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/rakieta.png" alt="Rocket" className="max-h-full max-w-full object-contain" />
                  </div>
                </button>

                <button onClick={() => { onContactClick(); setIsOpen(false); }} className="bg-white p-5 sm:p-10 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col justify-between h-36 sm:h-48 relative text-left group overflow-hidden flex-1">
                  <div className="relative z-10">
                    <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-1 sm:mb-2 block">KONTAKT</span>
                    <span className="text-2xl sm:text-5xl font-black text-slate-900 leading-none tracking-tighter uppercase font-bebas" style={{ letterSpacing: '0.1em' }}>HALO,<br/>ODEZWIJ SIĘ!</span>
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 w-20 h-20 sm:w-32 sm:h-32 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <img src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/telefon%20getintouch.png" alt="Phone" className="max-h-full max-w-full object-contain" />
                  </div>
                </button>
              </div>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}

const SimpleGlobe = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    {/* Vertical lines (longitudes) */}
    <ellipse cx="12" cy="12" rx="3.33" ry="10" />
    <ellipse cx="12" cy="12" rx="6.66" ry="10" />
    <line x1="12" y1="2" x2="12" y2="22" />
    {/* Horizontal lines (latitudes) */}
    <ellipse cx="12" cy="12" rx="10" ry="3.33" />
    <ellipse cx="12" cy="12" rx="10" ry="6.66" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);

function PhoneMockup() {
  const labels = [
    { text: 'Działamy globalnie' },
    { text: '500+ realizacji' },
    { text: 'Maksymalna konwersja' },
    { text: 'Start projektu w 24h' }
  ];

  return (
    <div className="relative w-full max-w-[220px] sm:max-w-[260px] mx-auto lg:ml-auto lg:mr-0 lg:translate-x-4 xl:translate-x-10 translate-x-4" style={{ perspective: '2000px' }}>
      <div 
        className="relative"
        style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-15deg) rotateX(8deg)' }}
      >
        {/* Sleek Integrated Phone Frame (No protruding buttons) */}
        <div className="relative bg-[#050505] rounded-[2.8rem] border-[10px] border-[#121212] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden aspect-[9/19.5] z-10 ring-1 ring-white/10">
          {/* Screen Content (Video) */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto"
            className="w-full h-full object-cover opacity-95"
            src="https://github.com/kidiee558/wideo-do-strony/raw/refs/heads/main/WIDEOTELEFON1.mp4"
          />
          
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full z-20"></div>
          
          {/* Screen Glare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none"></div>
          
          {/* Internal Button Indicators (Subtle) */}
          <div className="absolute left-0 top-24 w-[2px] h-10 bg-white/5 rounded-r-full"></div>
          <div className="absolute left-0 top-40 w-[2px] h-10 bg-white/5 rounded-r-full"></div>
          <div className="absolute right-0 top-32 w-[2px] h-16 bg-white/5 rounded-l-full"></div>
        </div>
        
        {/* Ambient Glow */}
        <div className="absolute -inset-16 bg-[#8d32fc]/15 blur-[100px] -z-10 rounded-full"></div>
      </div>

      {/* Floating Labels */}
      <div className="absolute left-0 bottom-1/4 space-y-1.5 sm:space-y-2 z-20">
        {labels.map((label, i) => (
          <div key={i} className="flex items-center gap-1.5 sm:gap-2 bg-white/80 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/20 whitespace-nowrap shadow-lg -translate-x-1/2">
            <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-[#8d32fc]" />
            <span className="text-[10px] sm:text-xs font-medium text-slate-900">{label.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroContent({ onContactClick, onOfferClick }: { onContactClick: () => void, onOfferClick?: () => void }) {
  return (
    <div className="relative min-h-[100vh] flex flex-col items-start justify-center pt-32 lg:pt-0 pb-16 lg:pb-12 overflow-hidden z-0">
      <div className="w-full px-4 sm:px-6 lg:px-24 xl:px-40 relative z-20 flex flex-col items-start">
        <div className="flex flex-col items-start flex-grow w-full">
          <div className="text-left w-full">
            <div className="flex flex-col items-start">
              <h1 className="font-bold text-white tracking-tight leading-[1.1] flex flex-col gap-1 lg:gap-2">
                <span className="flex flex-col items-start">
                  <div className="flex flex-row items-end gap-4 lg:gap-8">
                    <span className="inline-flex items-center text-[8vw] sm:text-[9vw] lg:text-[8vw] font-semibold font-syne whitespace-nowrap tracking-tighter [text-shadow:0_2px_4px_rgba(0,0,0,0.3)] leading-[0.9]">
                      S
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="mx-[0.02em] text-white flex items-center"
                      >
                        <SimpleGlobe className="w-[0.85em] h-[0.85em]" />
                      </motion.span>
                      LIDNY
                    </span>
                    
                    <div className="flex flex-col items-start text-left mb-[0.5vw] w-full max-w-[90vw] sm:max-w-none">
                      <div 
                        className="font-inter-tight text-slate-200 uppercase whitespace-nowrap"
                        style={{ 
                          fontSize: 'clamp(0.4rem, 0.3rem + 0.6vw, 1.2rem)',
                          letterSpacing: '0.05em',
                          fontWeight: '300',
                          lineHeight: '1.2'
                        }}
                      >
                        STRONY INTERNETOWE & SKLEPY INTERNETOWE / <br />
                        KAMPANIE GOOGLE ADS & META ADS
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start w-full">
                    <span className="text-[9.5vw] sm:text-[9vw] lg:text-[8vw] font-extrabold font-syne whitespace-nowrap tracking-tighter [text-shadow:0_2px_4px_rgba(0,0,0,0.3)] leading-[0.9]">
                      MARKETING.
                    </span>
                    <div 
                      className="font-inter-tight text-slate-400 uppercase mt-2 sm:mt-3 break-words"
                      style={{ 
                        fontSize: 'clamp(0.35rem, 0.25rem + 0.4vw, 0.8rem)',
                        letterSpacing: '0.1em',
                        fontWeight: '300'
                      }}
                    >
                      LUBLIN / WORLDWIDE - EST. 2018
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-6 w-full">
                    <div className="flex-1 max-w-[45ch]">
                      <div className="w-20 h-[1px] bg-white/30 mb-4" />
                      <div 
                        className="font-inter-tight text-slate-200 uppercase text-left break-words"
                        style={{ 
                          fontSize: 'clamp(0.6rem, 0.4rem + 0.8vw, 1.6rem)',
                          letterSpacing: '0.05em',
                          fontWeight: '300',
                          lineHeight: '1.2'
                        }}
                      >
                        Zaufaj ekspertom z Solid Agency. Wyskocz poza szereg oryginalnym designem, który zarabia.
                      </div>
                    </div>
                    <div className="flex justify-center md:justify-start gap-3 shrink-0">
                      <button 
                        onClick={onContactClick}
                        className="rounded-full border border-white/20 hover:bg-white/20 transition-colors px-6 h-[3rem] flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm"
                        style={{ backgroundColor: 'rgba(201, 192, 232, 0.2)' }}
                      >
                        WYCENA W 30MIN
                      </button>
                      <button 
                        onClick={() => onOfferClick?.()}
                        className="rounded-full border border-white/20 hover:bg-white/10 transition-colors px-6 h-[3rem] flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider"
                      >
                        OFERTA
                      </button>
                    </div>
                  </div>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero({ onContactClick, onOfferClick, children }: { onContactClick: () => void; onOfferClick?: () => void; children?: React.ReactNode }) {
  return (
    <section className="relative w-full overflow-hidden z-0">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/zaebistetlo.mp4"
        />
      </div>
      <div className="absolute inset-0 bg-black/40 z-[1]"></div>
      <div className="relative z-[2]">
        <HeroContent onContactClick={onContactClick} onOfferClick={onOfferClick} />
        {children}
      </div>
    </section>
  );
}

function AboutUs() {
  return (
    <section className="relative w-full pt-24 pb-32 lg:pt-16 overflow-hidden z-0" id="o-nas">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-[2] w-full px-4 sm:px-6 lg:px-24 xl:px-40"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
          {/* Left Side */}
          <div 
            className="font-inter-tight text-white max-w-[15em]"
            style={{ 
              lineHeight: '1', 
              fontWeight: '300',
              fontSize: 'clamp(1.75rem, 1.5rem + 2vw, 3.5rem)'
            }}
          >
            Unikalne strony internetowe i sklepy internetowe. Kampanie Google & Meta Ads, które skutecznie skalują Twój biznes.
          </div>

          {/* Right Side */}
          <div 
            className="font-inter-tight text-slate-200 lg:max-w-[14.375em]"
            style={{ 
              fontSize: 'clamp(1rem, .735915493rem + .8450704225vw, 1.75rem)',
              letterSpacing: '-.01em',
              fontWeight: '400'
            }}
          >
            <p className="mb-8">
              Zespół ekspertów budujący wysokiej klasy strony internetowe i platformy e-commerce dla firm z całego świata.
            </p>
            <p>
              Nasza praca łączy profesjonalny audyt UX, unikalne projektowanie UI i zaawansowany development, by wdrażać szybkie strony i dochodowe sklepy internetowe.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ExpertiseSection() {
  return (
    <div className="pt-24 lg:pt-12 pb-16 sm:pb-40 lg:pb-48 relative z-20 bg-black" id="ekspertyza">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Left Side - Video */}
          <div className="w-[calc(100%+2rem)] -mx-4 sm:w-full sm:mx-0 lg:w-[65%] -mt-24 sm:mt-0">
            <div 
              className="relative w-full overflow-hidden rounded-none sm:rounded-3xl"
              style={{ aspectRatio: '702/395' }}
            >
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
                src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/komputerhomepage.mp4"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-[35%] text-center lg:text-left px-4 sm:px-0">
            <h2 
              className="font-inter-tight text-white mb-8"
              style={{ 
                lineHeight: '1.2', 
                fontWeight: '300',
                fontSize: 'clamp(1.75rem, 1.5rem + 2vw, 3.5rem)'
              }}
            >
              Przyszłość Twojej marki w <span className="text-shimmer font-semibold inline-block">48 godzin.</span>
            </h2>
            <p 
              className="font-inter-tight text-slate-200 opacity-80"
              style={{ 
                fontSize: 'clamp(0.9rem, 0.7rem + 0.7vw, 1.5rem)',
                letterSpacing: '-.01em',
                fontWeight: '400',
                lineHeight: '1.4'
              }}
            >
              Nie używamy szablonów, używamy doświadczenia. Nasz system pracy pozwala na wdrożenie unikalnych rozwiązań w tempie nieosiągalnym przy standardowych procesach. Dajemy Ci 48-godzinny przeskok od pomysłu do działającego, luksusowego interfejsu.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-6 lg:justify-end justify-center">
              <p 
                className="font-inter-tight text-slate-400 lg:text-right"
                style={{ 
                  fontSize: 'clamp(0.8rem, 0.6rem + 0.5vw, 1.1rem)',
                  fontWeight: '400',
                  letterSpacing: '-.01em'
                }}
              >
                Nie wierzysz? Tak to robimy.
              </p>
              <button className="px-6 py-3 rounded-full border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-medium transition-all flex items-center gap-2 group text-sm sm:text-base">
                Zobacz proces
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CircleArrow = ({ direction }: { direction: 'right' | 'down' | 'left' }) => {
  const rotation = direction === 'right' ? 0 : direction === 'down' ? 90 : 180;
  
  return (
    <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-[#0a0a0a] border border-[#8d32fc]/40 rounded-full shadow-[0_0_10px_rgba(141,50,252,0.3)] z-20">
      <div style={{ transform: `rotate(${rotation}deg)` }}>
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-[#8d32fc]" />
      </div>
    </div>
  );
};

const projectsData = [
  {
    id: '01',
    location: 'USA',
    title: 'TAT2 SPIRITS',
    description: 'Redefining the Modern Cocktail Experience',
    bgImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '02',
    location: 'UK',
    title: 'NEXUS TECH',
    description: 'Next Generation Cloud Infrastructure',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '03',
    location: 'POLAND',
    title: 'LUMINA',
    description: 'E-commerce Platform for Luxury Lighting',
    bgImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '04',
    location: 'GERMANY',
    title: 'AURA MOBILITY',
    description: 'Urban Electric Vehicle Sharing App',
    bgImage: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  }
];

function LatestProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const newIndex = Math.round(latest * (projectsData.length - 1));
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    });
  }, [scrollYProgress, activeIndex]);

  const yTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const [mobileIndex, setMobileIndex] = useState(0);
  const nextMobile = () => setMobileIndex((i) => (i + 1) % projectsData.length);
  const prevMobile = () => setMobileIndex((i) => (i - 1 + projectsData.length) % projectsData.length);

  return (
    <>
      {/* Desktop View */}
      <div ref={containerRef} className="hidden md:block h-[400vh] relative bg-black">
        <div className="sticky top-0 h-screen flex w-full overflow-hidden">
          {/* Left Side - Text (35%) */}
          <div className="w-[35%] h-full bg-black flex flex-col justify-between p-8 lg:p-12 xl:p-16 relative border-r border-white/10 z-20">
            <div className="flex flex-col items-start pt-10">
              <div className="flex text-[clamp(10rem,14vw,18rem)] leading-none font-humane font-black text-white overflow-hidden relative" style={{ height: '1em' }}>
                <div className="flex items-center h-full">0</div>
                <motion.div style={{ y: yTranslate }} className="flex flex-col h-[400%]">
                  {projectsData.map((p, i) => (
                    <div key={i} className="flex items-center h-1/4">
                      {p.id.charAt(1)}
                    </div>
                  ))}
                </motion.div>
              </div>
              <div className="text-white text-[clamp(1.25rem,2vw,1.5rem)] mt-4 font-inter-tight">Ostatnie Projekty</div>
            </div>

            <div className="pb-10 xl:pb-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${activeIndex}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="flex flex-col gap-[clamp(0.5rem,1vw,1rem)]"
                >
                  <div className="text-white/60 text-[clamp(0.75rem,1vw,0.875rem)] tracking-widest uppercase font-bold">{projectsData[activeIndex].location}</div>
                  <h3 className="text-white text-[clamp(2.5rem,4vw,3.75rem)] font-inter-tight font-light leading-tight">{projectsData[activeIndex].title}</h3>
                  <p className="text-white/80 text-[clamp(1rem,1.5vw,1.25rem)]">{projectsData[activeIndex].description}</p>
                  <button className="mt-[clamp(1rem,2vw,2rem)] w-fit rounded-full border border-white/30 px-[clamp(1.5rem,2.5vw,2.5rem)] py-[clamp(0.75rem,1vw,1rem)] text-white hover:bg-white/10 transition-colors text-[clamp(0.875rem,1vw,1.125rem)]">
                    Zobacz projekt
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side - Images (65%) */}
          <div className="w-[65%] h-full relative overflow-hidden flex items-center justify-center">
            {/* Background Images */}
            <AnimatePresence mode="wait">
              <motion.img
                key={`bg-${activeIndex}`}
                src={projectsData[activeIndex].bgImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-black/80" />

            {/* Foreground Images Container */}
            <div className="w-[80%] h-screen relative z-10">
              <motion.div 
                className="w-full h-[400%] flex flex-col"
                style={{ y: yTranslate }}
              >
                {projectsData.map((p, i) => (
                  <div key={i} className="w-full h-1/4 flex items-center justify-center p-8">
                    <img src={p.fgImage} className="w-full h-auto max-h-[80vh] object-cover rounded-xl shadow-2xl" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-black text-white pt-6 pb-20 px-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h2 
              className="text-[clamp(7rem,22vw,12rem)] font-humane font-black text-white leading-[0.75] uppercase tracking-[0.005em] relative w-full pt-4 flex flex-col"
              style={{ marginBottom: '-10px' }}
            >
              <span className="text-left">OSTATNIE</span>
              <span className="text-right">PROJEKTY</span>
            </h2>
          </div>

          <div className="w-full aspect-[4/5] relative rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={`mob-img-${mobileIndex}`}
                src={projectsData[mobileIndex].fgImage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <div className="text-white/60 text-sm tracking-widest uppercase font-bold">{projectsData[mobileIndex].location}</div>
            <h3 className="text-4xl font-inter-tight font-light">{projectsData[mobileIndex].title}</h3>
            <p className="text-white/80 text-lg">{projectsData[mobileIndex].description}</p>
          </div>

          <div className="flex justify-end items-center gap-3 mt-2">
            <button className="rounded-full border border-white/30 px-6 py-2.5 text-white hover:bg-white/10 transition-colors text-sm font-medium">
              Zobacz projekt
            </button>
            <div className="flex gap-2">
              <button onClick={prevMobile} className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextMobile} className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function EightYearsSection() {
  return (
    <section className="pt-32 pb-0 bg-black overflow-hidden" id="o-nas-8-lat">
      <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
        <div 
          className="hidden sm:block text-white px-4 sm:px-0"
          style={{ 
            fontSize: 'clamp(1rem, .735915493rem + .8450704225vw, 1.75rem)',
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 400,
            letterSpacing: '-.01em',
            marginRight: 'auto',
            maxWidth: '15.625em',
            marginBottom: '6.25rem',
            position: 'relative',
            zIndex: 1
          }}
        >
          8 lat przesuwania granic, a to dopiero początek.
        </div>
        <h2 
          className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-black text-white leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full"
          style={{ marginBottom: 'calc(-0.04em + 10px)' }}
        >
          <div 
            className="sm:hidden text-white text-left"
            style={{ 
              marginBottom: '3.125rem',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '15px',
              fontSize: '.875rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: '13.75em',
              fontFamily: 'Inter Tight, sans-serif',
              fontWeight: 400,
              letterSpacing: '-.01em',
              lineHeight: '1.2',
              textTransform: 'none',
              whiteSpace: 'normal'
            }}
          >
            8 lat przesuwania granic, a to dopiero początek.
          </div>
          TWORZYMY<br className="sm:hidden" /><span className="hidden sm:inline"> </span>TO<br /><span className="whitespace-nowrap">OD ZERA...</span>
        </h2>
      </div>
    </section>
  );
}

function FreeProjectOffer({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section className="pt-0 pb-32 bg-white overflow-hidden">
      <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
        <h2 
          className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-black text-black leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full"
          style={{ paddingTop: 'calc(0.04em + 10px)' }}
        >
          <span className="sm:hidden flex flex-col items-end text-right w-full">
            <span>KREUJEMY<br />SUKCES.</span>
            <div className="flex flex-col items-start text-left w-[90%]" style={{
              bottom: 0,
              left: 'auto',
              right: 0,
              position: 'relative',
              marginLeft: 0,
              paddingTop: '2.3125rem'
            }}>
              <span style={{
                fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 700,
                lineHeight: 1.2,
                textTransform: 'none',
                letterSpacing: 'normal'
              }}>200+</span>
              <span className="mt-2 text-left" style={{
                fontSize: '.75rem',
                fontFamily: 'Geist Mono, monospace',
                fontWeight: 400,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                lineHeight: 1.5,
                maxWidth: '280px'
              }}>Zrealizowanych projektów w różnych branżach na całym świecie.</span>
            </div>
          </span>
          <span className="hidden sm:inline-grid text-left">
            <span className="invisible col-start-1 row-start-1 select-none whitespace-pre" aria-hidden="true">TWORZYMY TO</span>
            <span className="col-start-1 row-start-1 flex flex-col w-full">
              <span className="text-left">KREUJEMY</span>
              <span className="flex justify-between items-center w-full">
                <div className="text-left flex flex-col">
                  <span style={{
                    fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
                    fontFamily: 'Inter Tight, sans-serif',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    textTransform: 'none',
                    letterSpacing: 'normal'
                  }}>200+</span>
                  <span className="mt-2" style={{
                    fontSize: '.75rem',
                    fontFamily: 'Geist Mono, monospace',
                    fontWeight: 400,
                    letterSpacing: '.2em',
                    textTransform: 'uppercase',
                    maxWidth: '280px',
                    lineHeight: 1.5
                  }}>Zrealizowanych projektów w różnych branżach na całym świecie.</span>
                </div>
                <span className="text-right">SUKCES.</span>
              </span>
            </span>
          </span>
        </h2>
      </div>
    </section>
  );
}

function ValueProps() {
  return (
    <section className="bg-white py-5 lg:py-[1.25rem]">
      <div className="grid grid-cols-1 lg:grid-cols-2 px-6 lg:px-[6.25rem] gap-8 lg:gap-0">
        <div className="text-black w-full lg:max-w-[10.8125em]" style={{
          fontWeight: 400,
          fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
          fontFamily: 'Inter Tight, sans-serif',
          lineHeight: 1.2
        }}>
          Tworzymy cyfrowe doświadczenia, które budują prestiż i realnie zwiększają sprzedaż.
        </div>
        <div className="text-black lg:col-start-2 lg:row-start-2 lg:ml-auto w-full lg:max-w-[27.5em]" style={{
          fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)',
          fontFamily: 'Inter Tight, sans-serif',
          fontWeight: 300,
          lineHeight: 1.2,
          letterSpacing: '.02em'
        }}>
          <p className="mb-4">
            Za każdym projektem stoi prosty cel: tworzenie rozwiązań, które użytkownicy kochają, a firmy wykorzystują do wzrostu. Przez ostatnie 8 lat pomogliśmy ponad 200 klientom przekuć idee w nagradzane produkty i witryny, generujące konkretne zyski, w tym sześciocyfrowe przychody.
          </p>
          <p>
            Pracujemy z pełnym zaangażowaniem i dbałością o detale, pilnując najwyższej jakości na każdym etapie – od pierwszej rozmowy aż po finalne wdrożenie.
          </p>
        </div>
      </div>
    </section>
  );
}

function GlassBoxes({ 
  onWebsitesClick, 
  onEcommerceClick, 
  onAdsClick, 
  onSeoClick 
}: { 
  onWebsitesClick: () => void;
  onEcommerceClick: () => void;
  onAdsClick: () => void;
  onSeoClick: () => void;
}) {
  const boxes = [
    { 
      title: <>Strony<br />internetowe</>, 
      desc: 'Szybkie wdrażanie. Inteligentne skalowanie. Strony internetowe, które zarabiają.',
      bg: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/box1.png',
      onClick: onWebsitesClick
    },
    { 
      title: <>Sklepy<br />e-commerce</>, 
      desc: 'Maksymalna sprzedaż. Pełna automatyzacja. Systemy, które skalują Twój zysk.',
      bg: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/box2.jpg',
      onClick: onEcommerceClick
    },
    { 
      title: <>Kampanie Ads<br />(Google & Meta)</>, 
      desc: 'Analityka danych. Optymalizacja kosztów. Wyniki, które widać w portfelu.',
      bg: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/box3.jpg',
      onClick: onAdsClick
    },
    { 
      title: <>Pozycjonowanie<br />SEO</>, 
      desc: 'Trwała widoczność. Wysokie pozycje. Strategie, które budują dominację w Google.',
      bg: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/box2.jpg',
      onClick: onSeoClick
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="glass-boxes">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-black mb-12 tracking-tight leading-[0.9] sm:leading-tight">
          Zobacz naszą ofertę
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {boxes.map((box, idx) => (
            <div 
              key={idx} 
              className="relative rounded-[20px] w-full aspect-[358/430] overflow-hidden flex flex-col group shadow-xl transition-all duration-500 hover:-translate-y-2 bg-[#F3DEFF] @container"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${box.bg})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div 
                className="absolute inset-0 z-10"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  rowGap: '1.5625rem',
                  padding: '.875rem .875rem 3.75rem'
                }}
              >
                <h3 
                  className="text-black text-left"
                  style={{
                    fontWeight: 400,
                    fontSize: 'clamp(1.6rem, 11cqw, 2.6rem)',
                    fontFamily: 'Inter Tight, sans-serif',
                    lineHeight: 1.1,
                    boxSizing: 'border-box',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {box.title}
                </h3>
                <p 
                  className="text-black text-left"
                  style={{
                    fontSize: 'clamp(1.125rem, 6cqi, 1.25rem)',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    lineHeight: 1.4
                  }}
                >
                  {box.desc}
                </p>
                <button 
                  onClick={box.onClick}
                  className="rounded-full border border-black/20 hover:bg-black/10 transition-colors px-6 h-[3rem] flex items-center justify-center text-black text-xs font-bold uppercase tracking-wider w-fit"
                >
                  ZOBACZ OFERTĘ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestNews({ onPoradnikClick, onArticleClick }: { onPoradnikClick: () => void, onArticleClick: () => void }) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 1024 ? window.innerWidth * 0.85 : 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const news = [
    {
      title: "UX Design: Jak zatrzymać klienta na stronie?",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
      link: "#"
    },
    {
      title: "Architektura strony: Praktyczny poradnik dla SEO",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
      link: "#"
    },
    {
      title: "Google Ads czy Meta Ads? Gdzie Twoja firma powinna wydać pierwszy budżet?",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
      link: "#"
    },
    {
      title: "Rebranding strony: Kiedy odświeżenie wyglądu to za mało?",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600&auto=format&fit=crop",
      link: "#"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="latest-news">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-black mb-12 tracking-tight">
          Nasze Informacje
        </h2>
        
        <div ref={scrollContainerRef} className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 lg:gap-6 mb-12 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {news.map((item, idx) => (
            <a key={idx} href={item.link} onClick={(e) => { e.preventDefault(); onArticleClick(); }} className="bg-[#0a0a0a] rounded-3xl overflow-hidden flex flex-col aspect-[3/4] group cursor-pointer no-underline min-w-[85vw] sm:min-w-[400px] lg:min-w-0 snap-center">
              <div className="h-1/2 w-full overflow-hidden bg-zinc-900 relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="h-1/2 p-5 lg:p-6 flex flex-col justify-between">
                <h3 className="text-white text-lg lg:text-xl font-inter-tight leading-[1.3] font-light">
                  {item.title}
                </h3>
                <div className="mt-4">
                  <span className="rounded-full border border-white/20 group-hover:bg-white/10 transition-colors px-6 h-[3rem] flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider w-fit">
                    Czytaj więcej
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="flex gap-4">
            <button onClick={() => scroll('left')} className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors">
              <ChevronLeft className="w-6 h-6 text-black" strokeWidth={1.5} />
            </button>
            <button onClick={() => scroll('right')} className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors">
              <ChevronRight className="w-6 h-6 text-black" strokeWidth={1.5} />
            </button>
          </div>
          <div className="hidden sm:block flex-1 h-[1px] bg-black/10"></div>
          <button onClick={onPoradnikClick} className="flex items-center gap-2 text-black font-medium hover:opacity-70 transition-opacity whitespace-nowrap underline underline-offset-4 sm:no-underline">
            Zobacz nasz poradnik <ArrowRight className="w-5 h-5 shrink-0" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ onStartProjectClick, onContactClick }: { onStartProjectClick: () => void, onContactClick: () => void }) {
  const text = "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ ";
  
  return (
    <section className="min-h-screen bg-white text-black flex flex-col items-center justify-between p-6 relative overflow-hidden">
      {/* Spacer for top since no navbar */}
      <div className="h-20 w-full"></div>

      {/* Curved Text Container */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden -translate-y-20 sm:translate-y-0">
        <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible scale-[1.4] sm:scale-100">
          <path id="curve-bottom" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
          <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
            <motion.textPath 
              xlinkHref="#curve-bottom" 
              animate={{ startOffset: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-[100px] sm:text-[150px] font-black text-black uppercase tracking-[0.01em] fill-black font-bebas"
            >
              {text}
            </motion.textPath>
          </text>
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
        <span className="text-black/60 text-sm tracking-widest uppercase">KONTAKT</span>
        <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">Gotów, by stworzyć coś niepowtarzalnego?</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button onClick={onStartProjectClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">Wystartuj teraz</button>
          <button onClick={onContactClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">Pytaj śmiało!</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full flex justify-between items-end z-20 pb-4">
        <div className="text-sm">
          <p className="font-bold">POLAND</p>
          <p className="text-black/60">Lubelskie, Lublin - Tutaj jesteśmy. Działamy na całym świecie.</p>
        </div>
        <div className="w-32"></div> {/* Spacer to maintain layout balance */}
      </footer>
    </section>
  );
}

// ... (existing imports)

const ContactPage = ({ onBack }: { onBack: () => void }) => {
  const text = "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ ";
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-between p-6 relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/zaebistetlo.mp4"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Navbar */}
      <Navbar onContactClick={onBack} isContactPage={true} onHomeClick={onBack} onPoradnikClick={() => {}} />

      {/* Curved Text Container */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden -translate-y-20 sm:translate-y-0">
        <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible scale-[1.4] sm:scale-100">
          <path id="curve" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
          <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
            <motion.textPath 
              xlinkHref="#curve" 
              animate={{ startOffset: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-[100px] sm:text-[150px] font-black text-white uppercase tracking-[0.01em] fill-white font-bebas"
            >
              {text}
            </motion.textPath>
          </text>
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 w-full max-w-2xl translate-y-10 sm:translate-y-0">
        <span className="text-white/60 text-sm tracking-widest uppercase mb-4">KONTAKT</span>
        <h1 className="text-3xl sm:text-5xl font-inter-tight font-normal leading-tight text-center mb-8">Gotów, by stworzyć coś niepowtarzalnego?</h1>
        
        <form className="w-full max-w-[460px] mx-auto bg-[#1a1a1a]/90 backdrop-blur-xl p-6 sm:p-10 rounded-2xl border border-white/10 flex flex-col gap-5 shadow-2xl font-inter-tight">
          <div className="flex flex-col items-start gap-1.5">
            <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">Imię i nazwisko</label>
            <input 
              type="text" 
              placeholder="Jan Kowalski" 
              className="w-full bg-[#2a2a2a] border border-white/5 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#C9C0E8]/50 focus:ring-1 focus:ring-[#C9C0E8]/50 transition-all text-sm"
            />
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">Adres e-mail</label>
            <input 
              type="email" 
              placeholder="jan@przyklad.pl" 
              className="w-full bg-[#2a2a2a] border border-white/5 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#C9C0E8]/50 focus:ring-1 focus:ring-[#C9C0E8]/50 transition-all text-sm"
            />
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <label className="text-xs font-semibold text-white/40 uppercase tracking-wider ml-1">Twoja wiadomość</label>
            <textarea 
              placeholder="Opisz swój projekt..." 
              rows={5}
              className="w-full bg-[#2a2a2a] border border-white/5 rounded-xl px-5 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#C9C0E8]/50 focus:ring-1 focus:ring-[#C9C0E8]/50 transition-all resize-none text-sm"
            ></textarea>
          </div>
          
          <button 
            type="submit"
            className="w-full rounded-xl transition-all px-8 h-[3.5rem] flex items-center justify-center text-slate-900 text-sm font-bold uppercase tracking-wider group mt-2 hover:bg-[#b8a1ff]"
            style={{ backgroundColor: '#C9C0E8' }}
          >
            Wyślij
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="w-full flex justify-between items-end z-20 pb-4">
        <div className="text-sm">
          <p className="font-bold">POLAND</p>
          <p className="text-white/60">Lubelskie, Lublin - Tutaj jesteśmy. Działamy na całym świecie.</p>
        </div>
        <div className="w-32"></div> {/* Spacer to maintain layout balance */}
      </footer>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'contact' | 'start-project' | 'websites-offer' | 'ecommerce-offer' | 'ads-offer' | 'seo-offer' | 'poradnik' | 'article'>('home');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleNavigate = (view: typeof currentView) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleOfferClick = (type?: string) => {
    if (type) {
      setCurrentView(type as any);
      window.scrollTo(0, 0);
      return;
    }
    
    if (currentView !== 'home') {
      setCurrentView('home');
      // Wait for re-render
      setTimeout(() => {
        const element = document.getElementById('glass-boxes');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById('glass-boxes');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  return (
    <div className="relative bg-[#f8fafc] font-sans text-slate-900 selection:bg-[#8d32fc]/20 selection:text-[#8d32fc]">
      <Navbar 
        onContactClick={handleContactClick} 
        onStartProjectClick={() => handleNavigate('start-project')} 
        onHomeClick={() => handleNavigate('home')}
        onOfferClick={handleOfferClick}
        onPoradnikClick={() => handleNavigate('poradnik')}
      />
      {currentView === 'home' && (
        <main className="relative">
          <div className="w-full z-0 overflow-hidden">
            <Hero 
              onContactClick={handleContactClick}
              onOfferClick={handleOfferClick}
            >
              <AboutUs />
            </Hero>
          </div>
          <div className="relative z-10">
            <div className="relative z-10 bg-black overflow-hidden">
              <ExpertiseSection />
            </div>
            <LatestProjects />
            <EightYearsSection />
            <FreeProjectOffer onContactClick={handleContactClick} />
            <ValueProps />
            <GlassBoxes 
              onWebsitesClick={() => handleNavigate('websites-offer')} 
              onEcommerceClick={() => handleNavigate('ecommerce-offer')}
              onAdsClick={() => handleNavigate('ads-offer')}
              onSeoClick={() => handleNavigate('seo-offer')}
            />
            <LatestNews onPoradnikClick={() => handleNavigate('poradnik')} onArticleClick={() => handleNavigate('article')} />
            <ContactSection 
              onStartProjectClick={() => handleNavigate('start-project')} 
              onContactClick={handleContactClick} 
            />
          </div>
        </main>
      )}
      {currentView === 'contact' && (
        <ContactPage onBack={() => handleNavigate('home')} />
      )}
      {currentView === 'start-project' && (
        <StartProjectPage onBack={() => handleNavigate('home')} />
      )}
      {currentView === 'websites-offer' && (
        <WebsitesOfferPage onBack={() => handleNavigate('home')} onContactClick={handleContactClick} />
      )}
      {currentView === 'ecommerce-offer' && (
        <EcommerceOfferPage onBack={() => handleNavigate('home')} onContactClick={handleContactClick} />
      )}
      {currentView === 'ads-offer' && (
        <AdsOfferPage onBack={() => handleNavigate('home')} onContactClick={handleContactClick} />
      )}
      {currentView === 'seo-offer' && (
        <SeoOfferPage onBack={() => handleNavigate('home')} onContactClick={handleContactClick} />
      )}
      {currentView === 'poradnik' && (
        <>
          <Navbar 
            onContactClick={handleContactClick} 
            onStartProjectClick={() => handleNavigate('start-project')} 
            onHomeClick={() => handleNavigate('home')}
            onOfferClick={handleOfferClick}
            onPoradnikClick={() => handleNavigate('poradnik')}
            isContactPage={true}
          />
          <PoradnikPage onBack={() => handleNavigate('home')} onArticleClick={() => handleNavigate('article')} />
        </>
      )}
      {currentView === 'article' && (
        <>
          <Navbar 
            onContactClick={handleContactClick} 
            onStartProjectClick={() => handleNavigate('start-project')} 
            onHomeClick={() => handleNavigate('home')}
            onOfferClick={handleOfferClick}
            onPoradnikClick={() => handleNavigate('poradnik')}
            isContactPage={true}
          />
          <ArticlePage onContactClick={handleContactClick} />
        </>
      )}
      
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}