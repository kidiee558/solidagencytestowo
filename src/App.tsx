import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Monitor, ShoppingCart, Search, Share2, 
  TrendingUp, Camera, CheckCircle2, ArrowRight, ChevronDown,
  Zap, Target, BarChart3, Users, Globe, Phone
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

function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-tr-[2.5rem] sm:rounded-tr-[4rem] rounded-bl-[2.5rem] sm:rounded-bl-[4rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-white"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_#B0B8C2_0%,_transparent_50%),radial-gradient(circle_at_80%_80%,_#B0B8C2_0%,_transparent_50%),radial-gradient(circle_at_50%_50%,_#B0B8C2_0%,_transparent_70%)] opacity-40"></div>

            <button 
              onClick={onClose}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-slate-100/80 backdrop-blur-sm text-slate-500 hover:bg-slate-200 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative p-6 sm:p-10 z-10">
              <div className="mb-6 sm:mb-8 pr-10 sm:pr-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 font-syne leading-tight">Wycena w 30 minut</h2>
                <p className="text-sm sm:text-base text-slate-500 font-medium">Zostaw swoje dane, a nasz ekspert skontaktuje się z Tobą w ekspresowym tempie.</p>
              </div>

              <form className="space-y-3 sm:space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[10px] sm:text-sm font-bold text-slate-700 mb-1 sm:mb-1.5 ml-1 uppercase tracking-wider">Imię i Nazwisko</label>
                  <input 
                    type="text" 
                    placeholder="np. Jan Kowalski"
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200 focus:border-[#8d32fc] focus:ring-2 focus:ring-[#8d32fc]/20 outline-none transition-all font-medium text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] sm:text-sm font-bold text-slate-700 mb-1 sm:mb-1.5 ml-1 uppercase tracking-wider">Twój Numer Telefonu</label>
                  <input 
                    type="tel" 
                    placeholder="+48 000 000 000"
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200 focus:border-[#8d32fc] focus:ring-2 focus:ring-[#8d32fc]/20 outline-none transition-all font-medium text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-sm font-bold text-slate-700 mb-1 sm:mb-1.5 ml-1 uppercase tracking-wider">Firma / Działalność / Link (opcjonalne)</label>
                  <input 
                    type="text" 
                    placeholder="np. Firma, branża lub link FB/Google"
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200 focus:border-[#8d32fc] focus:ring-2 focus:ring-[#8d32fc]/20 outline-none transition-all font-medium text-sm sm:text-base"
                  />
                </div>

                <div className="pt-2 sm:pt-4 pb-1 sm:pb-2">
                  <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#8d32fc]/10 border border-[#8d32fc]/20 flex items-center gap-3 sm:gap-4 backdrop-blur-sm">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl bg-[#8d32fc] flex items-center justify-center text-[#14133A] shrink-0">
                      <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-[8px] sm:text-[10px] font-bold text-[#8d32fc] uppercase tracking-widest">Nasz numer kontaktowy</p>
                      <p className="text-base sm:text-lg font-bold text-slate-900">+48 791 261 444</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#8d32fc] hover:bg-[#8d32fc]/90 text-white rounded-xl sm:rounded-2xl py-3 sm:py-4 font-bold transition-all shadow-lg shadow-[#8d32fc]/20 flex items-center justify-center gap-2 mt-2 sm:mt-4 text-sm sm:text-base">
                  Wyślij prośbę o wycenę <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
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

function Navbar({ onContactClick, isContactPage }: { onContactClick: () => void, isContactPage?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  
  const menuItems = [
    { name: 'HOME', href: '#' },
    { name: 'ABOUT', href: '#' },
    { 
      name: 'SERVICES', 
      href: '#',
      subItems: ['Strony internetowe', 'Sklepy internetowe', 'Kampanie Google/Meta Ads']
    },
    { name: 'OUR WORK', href: '#' },
    { name: 'INSIGHTS', href: '#' }
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
            <div className="flex items-center leading-none font-syne font-black text-sm sm:text-base tracking-tighter uppercase text-white whitespace-nowrap">
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
              Contact
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
                          } else {
                            setIsOpen(false);
                          }
                        }}
                      >
                        <span className="tracking-tighter uppercase">{item.name}</span>
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
                                    key={sub} 
                                    href="#" 
                                    className="text-lg sm:text-3xl font-bold text-slate-400 hover:text-white transition-colors py-1"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {sub}
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
                <button onClick={() => { onContactClick(); setIsOpen(false); }} className="bg-[#d1cce8] p-5 sm:p-10 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col justify-between h-36 sm:h-48 relative text-left group overflow-hidden flex-1">
                  <div className="relative z-10">
                    <span className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-1 sm:mb-2 block">CONTACT US</span>
                    <span className="text-2xl sm:text-5xl font-black text-slate-900 leading-none tracking-tighter uppercase font-bebas">START A<br/>PROJECT</span>
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 w-20 h-20 sm:w-32 sm:h-32 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <img src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/rakieta.png" alt="Rocket" className="max-h-full max-w-full object-contain" />
                  </div>
                </button>

                <button onClick={() => { onContactClick(); setIsOpen(false); }} className="bg-white p-5 sm:p-10 rounded-[1.5rem] sm:rounded-[2rem] flex flex-col justify-between h-36 sm:h-48 relative text-left group overflow-hidden flex-1">
                  <div className="relative z-10">
                    <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-1 sm:mb-2 block">CONTACT US</span>
                    <span className="text-2xl sm:text-5xl font-black text-slate-900 leading-none tracking-tighter uppercase font-bebas">GET IN<br/>TOUCH</span>
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

function HeroContent({ onContactClick }: { onContactClick: () => void }) {
  return (
    <div className="relative min-h-[90svh] sm:min-h-[95svh] flex flex-col items-start justify-center pt-32 lg:pt-0 pb-16 lg:pb-12 overflow-hidden z-0">
      <div className="w-full px-4 sm:px-6 lg:px-24 xl:px-40 relative z-20 flex flex-col items-start">
        <div className="flex flex-col items-start flex-grow w-full">
          <div className="text-left w-full">
            <div className="flex flex-col items-start">
              <h1 className="font-bold text-white tracking-tight leading-[1.1] flex flex-col gap-1 lg:gap-2">
                <span className="flex flex-col items-start">
                  <div className="flex flex-row items-end gap-4 lg:gap-8">
                    <span className="inline-flex items-center text-[8vw] sm:text-[9vw] lg:text-[8vw] font-semibold font-syne sm:whitespace-nowrap tracking-tighter [text-shadow:0_2px_4px_rgba(0,0,0,0.3)] leading-[0.9] ml-[-0.05em]">
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
                          fontSize: 'clamp(0.42rem, 0.32rem + 0.65vw, 1.3rem)',
                          letterSpacing: '0.05em',
                          fontWeight: '300',
                          lineHeight: '1.2'
                        }}
                      >
                        STRONY INTERNETOWE & SKLEPY INTERNETOWE /<br />
                        KAMPANIE GOOGLE ADS & META ADS
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start w-full">
                    <span className="text-[9vw] sm:text-[9vw] lg:text-[8vw] font-extrabold font-syne sm:whitespace-nowrap tracking-tighter [text-shadow:0_2px_4px_rgba(0,0,0,0.3)] leading-[0.9] max-w-full break-words ml-[-0.05em]">
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
                        onClick={onContactClick}
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

function Hero({ onContactClick, children }: { onContactClick: () => void; children?: React.ReactNode }) {
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
        <HeroContent onContactClick={onContactClick} />
        {children}
      </div>
    </section>
  );
}

function AboutUs() {
  return (
    <section className="relative w-full pt-8 pb-32 lg:pt-16 overflow-hidden z-0" id="o-nas">
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
    <div className="pt-24 lg:pt-12 pb-32 sm:pb-40 lg:pb-48 relative z-20 bg-black" id="ekspertyza">
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
              Nie używamy szablonów, używamy doświadczenia. Nasz system pracy pozwala na wdrożenie unikalnych rozwiązań w tempie nieosiągalnym przy standardowych procesach. Dajemy Ci 24-godzinny przeskok od pomysłu do działającego, luksusowego interfejsu.
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

function EightYearsSection() {
  return (
    <section className="pt-32 pb-32 lg:pb-12 bg-black overflow-hidden" id="o-nas-8-lat">
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
        <h2 className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-black text-white leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full">
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
    <section className="py-32 bg-white overflow-hidden">
      <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
        <h2 className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-black text-black leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full">
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

function GlassBoxes() {
  const boxes = [
    { 
      title: <>Strony<br />internetowe</>, 
      desc: 'Szybkie wdrażanie. Inteligentne skalowanie. Strony internetowe, które zarabiają.',
      bg: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/box1.png'
    },
    { 
      title: <>Sklepy<br />e-commerce</>, 
      desc: 'Maksymalna sprzedaż. Pełna automatyzacja. Systemy, które skalują Twój zysk.',
      bg: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/box2.jpg'
    },
    { 
      title: <>Kampanie Ads<br />(Google & Meta)</>, 
      desc: 'Analityka danych. Optymalizacja kosztów. Wyniki, które widać w portfelu.',
      bg: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/box3.jpg'
    },
    { 
      title: <>Pozycjonowanie<br />SEO</>, 
      desc: 'Trwała widoczność. Wysokie pozycje. Strategie, które budują dominację w Google.',
      bg: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/box2.jpg'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="glass-boxes">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {boxes.map((box, idx) => (
            <div 
              key={idx} 
              className="relative rounded-[20px] w-full aspect-[358/430] overflow-hidden flex flex-col group shadow-xl transition-all duration-500 hover:-translate-y-2 bg-slate-100 @container"
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
                    fontSize: 'clamp(.75rem, .6910377358rem + .1886792453vw, .875rem)',
                    fontFamily: 'Geist Mono, monospace',
                    fontWeight: 400,
                    letterSpacing: '.2em',
                    textTransform: 'uppercase'
                  }}
                >
                  {box.desc}
                </p>
                <span 
                  className="text-black text-left font-bold text-xs tracking-widest uppercase hover:text-[#8d32fc] hover:border-[#8d32fc] transition-colors cursor-pointer"
                  style={{
                    width: 'fit-content',
                    display: 'block',
                    paddingBottom: '2px',
                    borderBottom: '1px solid rgba(0, 0, 0, .5)'
                  }}
                >
                  ZOBACZ OFERTĘ
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 border border-white/10 rounded-[2rem] sm:rounded-[40px] p-8 sm:p-10 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 tracking-tight">Gotowy, żeby zamknąć więcej transakcji?</h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto">
              30 minut, zero zobowiązań. Pokażemy Ci, gdzie tracisz klientów i co zmienić, żeby sprzedawać więcej.
            </p>
            <button 
              onClick={onContactClick}
              className="bg-[#8d32fc] hover:bg-[#8d32fc]/90 text-white rounded-full px-8 sm:px-12 py-4 sm:py-5 font-bold text-base sm:text-lg transition-colors inline-flex items-center gap-2 shadow-lg shadow-[#8d32fc]/20"
            >
              Zarezerwuj darmową rozmowę <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-900 font-bold text-xl">
            S
          </div>
          <span className="font-bold text-xl text-white tracking-tight">Solid Agency</span>
        </div>
        
        <div className="flex items-center gap-8 text-sm text-slate-400 font-medium">
          <p>Agencja Marketingowa 360°</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-slate-400">
          <a href="#" className="hover:text-[#8d32fc] transition-colors">Polityka prywatności</a>
          <a href="#" className="hover:text-[#8d32fc] transition-colors">Regulamin</a>
          <span>© 2026 Solid Agency</span>
        </div>
      </div>
    </footer>
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
      <Navbar onContactClick={onBack} isContactPage={true} />

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
      <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
        <span className="text-white/60 text-sm tracking-widest uppercase">Contact us</span>
        <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">Are You Ready To Build Something Unforgettable?</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="rounded-full border border-white/20 hover:bg-white/10 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">Start a Project</button>
          <button className="rounded-full border border-white/20 hover:bg-white/10 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">Get in touch</button>
        </div>
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
  const [currentView, setCurrentView] = useState<'home' | 'contact'>('home');

  return (
    <div className="relative bg-[#f8fafc] font-sans text-slate-900 selection:bg-[#8d32fc]/20 selection:text-[#8d32fc]">
      {currentView === 'home' && (
        <>
          <Navbar onContactClick={() => setCurrentView('contact')} />
          <main className="relative">
            <div className="w-full z-0 overflow-hidden">
              <Hero onContactClick={() => setCurrentView('contact')}>
                <AboutUs />
              </Hero>
            </div>
            <div className="relative z-10">
              <div className="relative z-10 bg-black overflow-hidden">
                <ExpertiseSection />
              </div>
              <EightYearsSection />
              <FreeProjectOffer onContactClick={() => setCurrentView('contact')} />
              <ValueProps />
              <GlassBoxes />
              <CTA onContactClick={() => setCurrentView('contact')} />
              <Footer />
            </div>
          </main>
        </>
      )}
      {currentView === 'contact' && (
        <ContactPage onBack={() => setCurrentView('home')} />
      )}
    </div>
  );
}
