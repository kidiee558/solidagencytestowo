import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
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

function Navbar({ onContactClick }: { onContactClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 flex justify-center ${isScrolled ? 'top-4 px-4' : 'top-0'}`}>
      <div className={`w-full transition-all duration-300 ${isScrolled ? 'max-w-5xl bg-[#26255B]/70 backdrop-blur-lg shadow-lg rounded-full px-6 border border-white/10' : 'max-w-7xl bg-transparent px-4 sm:px-6 lg:px-8'}`}>
        <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xl transition-colors ${isScrolled ? 'bg-white/20 text-white' : 'bg-white text-[#14133A]'}`}>S</div>
            <span className="font-bold text-xl tracking-tight text-white">Solid Agency</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">
            <a href="#o-nas" className="hover:text-white transition-colors">O nas</a>
            <a href="#ekspertyza" className="hover:text-white transition-colors">Ekspertyza</a>
            <a href="#proces" className="hover:text-white transition-colors">Proces</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <button 
              onClick={onContactClick}
              className={`rounded-full px-6 py-2.5 transition-colors ${isScrolled ? 'bg-[#8d32fc] text-white hover:bg-[#8d32fc]/90 shadow-lg shadow-[#8d32fc]/20' : 'bg-white text-[#26255B] hover:bg-slate-100'}`}
            >
              Kontakt
            </button>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
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
    { text: 'Nasze realizacje' },
    { text: '500+ projektów' },
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
    <div className="relative min-h-[calc(100svh+24px)] sm:min-h-[calc(100svh+40px)] flex flex-col lg:flex-row items-start lg:items-center pt-32 lg:pt-0 pb-32 lg:pb-24 overflow-hidden z-0">
      <div className="w-full px-4 sm:px-6 lg:px-24 xl:px-40 relative z-20 flex flex-col flex-grow">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-24 items-center flex-grow">
          <div className="text-left lg:col-span-7 xl:col-span-6 w-full lg:pl-12 xl:pl-20">
            <h1 className="font-bold text-white tracking-tight mb-6 lg:mb-8 leading-[1.1] flex flex-col gap-1 lg:gap-2">
              <span className="flex flex-col items-start">
                <span className="inline-flex items-center text-[32px] xs:text-[40px] sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-syne sm:whitespace-nowrap tracking-tighter [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
                  S
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="mx-[4px] text-white flex items-center"
                  >
                    <SimpleGlobe className="w-[0.85em] h-[0.85em]" />
                  </motion.span>
                  LIDNY
                </span>
                <span className="text-[32px] xs:text-[40px] sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-syne sm:whitespace-nowrap tracking-tighter [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
                  MARKETING.
                </span>
              </span>
              <span className="relative inline-block">
                <span className="absolute top-[0.5px] left-[0.5px] sm:top-[1px] sm:left-[1px] text-white text-[20px] xs:text-[24px] sm:text-3xl lg:text-4xl xl:text-5xl sm:whitespace-nowrap tracking-tight font-extrabold">Zacznij sprzedawać w 24h.</span>
                <span className="relative text-[#8d32fc] text-[20px] xs:text-[24px] sm:text-3xl lg:text-4xl xl:text-5xl sm:whitespace-nowrap tracking-tight font-extrabold">Zacznij sprzedawać w 24h.</span>
              </span>
              <span className="text-white text-[20px] xs:text-[24px] sm:text-3xl lg:text-4xl xl:text-5xl sm:whitespace-nowrap tracking-tight font-extrabold [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">Bez czekania tygodniami.</span>
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-white mb-8 lg:mb-12 leading-relaxed max-w-2xl font-semibold [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
              Tworzymy unikalne strony internetowe, dochodowe sklepy e-commerce oraz skuteczne kampanie reklamowe Google & Meta Ads. Budujemy Twoją przewagę, gdy inni wciąż planują spotkania.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16 lg:mb-0">
              <button 
                onClick={onContactClick}
                className="bg-[#8d32fc] hover:bg-[#8d32fc]/90 text-white rounded-full px-6 py-3 sm:px-8 sm:py-4 font-bold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-[#8d32fc]/20 w-fit"
              >
                Wycena w 30min <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 text-white rounded-full px-6 py-3 sm:px-8 sm:py-4 font-bold transition-all flex items-center justify-center gap-2 text-sm sm:text-base w-fit">
                Zobacz ofertę
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center lg:justify-end pt-8 lg:pt-0 mt-auto lg:mt-0 w-full">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section className="relative w-full min-h-[calc(100svh+24px)] sm:min-h-[calc(100svh+40px)] overflow-hidden z-0">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/Timeline%201.mov"
        />
      </div>
      <div className="absolute inset-0 bg-black/40 z-[1]"></div>
      <div className="relative z-[2] min-h-[calc(100svh+24px)] sm:min-h-[calc(100svh+40px)]">
        <HeroContent onContactClick={onContactClick} />
      </div>
    </section>
  );
}

function AboutUs() {
  return (
    <div className="relative py-32 z-20" id="o-nas">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full px-4 sm:px-6 lg:px-24 xl:px-40 relative z-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-7 text-left lg:pl-12 xl:pl-20">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-syne mb-8 leading-[1.2] tracking-tight text-slate-900">
              U Twojej konkurencji telefon ciągle dzwoni.<br />
              <span className="text-[#8d32fc]">A Ty wciąż tylko „planujesz”?</span>
            </h2>
            <div className="space-y-6">
              <p className="text-base md:text-lg text-slate-700 leading-relaxed font-medium font-sans">
                Prawda jest brutalna: klient, który nie znajdzie Cię w 15 sekund, zostawi pieniądze u kogoś innego. Tam, gdzie agencje tygodniami „analizują strategię”, my oddajemy Ci <strong className="font-bold text-slate-900">gotowe narzędzie w 24 godziny</strong>.
              </p>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed font-medium font-sans">
                Bez zbędnych maili i pośredników – masz bezpośredni numer do wykonawcy i święty spokój. Twoja strona <strong className="font-bold text-slate-900">od pierwszego dnia</strong> robi to, za co zapłaciłeś: ściąga ludzi, którzy realnie zostawiają u Ciebie pieniądze.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-start w-full">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-[480px] aspect-square rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)] group cursor-pointer isolate"
              style={{ maskImage: '-webkit-radial-gradient(white, black)' }}
            >
              {/* Background Image from GitHub */}
              <img 
                src="https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/StockCake-Reaching_New_Heights-3727933-medium%20(1).jpg" 
                alt="Reaching New Heights" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8d32fc]/20 via-transparent to-black/40 opacity-60"></div>

              {/* Glassmorphism Bar at the bottom (approx 40% height) */}
              <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-white/10 backdrop-blur-2xl border-t border-white/20 flex items-center justify-between px-8 md:px-10">
                <div className="flex items-center gap-4 text-white w-full group/btn">
                  <span className="text-sm md:text-base font-bold font-syne leading-tight flex-grow">
                    Zobacz, jak odpalimy Twój projekt w 24 godziny.
                  </span>
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30 group-hover/btn:bg-white/40 transition-all duration-300 group-hover/btn:scale-110">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ExpertiseSection() {
  return (
    <div className="py-24 relative z-20" id="ekspertyza">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-10 lg:px-16 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#8d32fc] font-bold text-xs tracking-widest uppercase mb-3 block font-syne">Nasza Ekspertyza</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight font-syne">
            Rozwiązania, które <span className="text-[#8d32fc] italic">skalują</span> biznes
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Kompleksowe wsparcie w każdym obszarze Twojej obecności w sieci.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service, index) => (
            <motion.div 
              key={service.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="group relative flex flex-col items-start p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 min-h-[360px] w-full"
            >
              {/* Header with Icon */}
              <div className="flex items-center gap-4 mb-6 w-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#8d32fc]/10 flex items-center justify-center text-[#8d32fc] group-hover:bg-[#8d32fc] group-hover:text-white transition-all duration-300 flex-shrink-0">
                  {React.cloneElement(service.icon as React.ReactElement, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 font-syne group-hover:text-[#8d32fc] transition-colors duration-300 tracking-tight leading-tight">
                    {service.title}
                  </h3>
                </div>
              </div>
              
              {/* Content */}
              <div className="w-full flex flex-col flex-grow">
                <p className="text-slate-500 text-[10px] sm:text-xs lg:text-sm leading-relaxed font-medium mb-6">
                  {service.description}
                </p>
                
                {/* Features - 2 Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-8 w-full">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8d32fc] flex-shrink-0" />
                      <span className="leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button & Price - Bottom Right on Desktop */}
                <div className="mt-auto w-full flex flex-col sm:flex-row items-center sm:justify-end gap-3">
                  {(service.id === 'www' || service.id === 'ecommerce') && (
                    <div className="w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold bg-[#8d32fc]/10 text-[#8d32fc] border border-[#8d32fc]/20 shadow-sm whitespace-nowrap">
                      {service.id === 'www' ? 'od 1 000 PLN' : 'od 2 500 PLN'}
                    </div>
                  )}
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#8d32fc]/10 backdrop-blur-md border border-[#8d32fc]/20 text-[#8d32fc] text-xs sm:text-sm font-bold hover:bg-[#8d32fc] hover:text-white transition-all duration-300 group/btn shadow-[0_8px_32px_rgba(141,50,252,0.1)]">
                    Zobacz ofertę
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProcessSection() {
  const steps = [
    { title: 'Analiza potrzeb', desc: 'Zaczynamy od zrozumienia Twojego biznesu i celów.' },
    { title: 'Strategia', desc: 'Tworzymy plan działania dopasowany do Twojej branży.' },
    { title: 'Wdrożenie', desc: 'Realizujemy projekt z dbałością o każdy detal.' },
    { title: 'Optymalizacja', desc: 'Monitorujemy wyniki i ciągle ulepszamy działania.' },
  ];

  return (
    <section className="py-24 bg-slate-950 text-white" id="proces">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Jak wygląda współpraca?</h2>
          <p className="text-xl text-slate-400">Przejrzysty proces, który gwarantuje sukces.</p>
        </div>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="sticky top-24 p-8 sm:p-16 border border-slate-800 rounded-[2rem] bg-slate-900 shadow-2xl" style={{ top: `${100 + i * 40}px` }}>
              <div className="text-4xl sm:text-6xl font-bold text-[#8d32fc] mb-4 sm:mb-8 opacity-30">0{i + 1}</div>
              <h4 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">{step.title}</h4>
              <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FreeProjectOffer({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section className="py-24 bg-white relative">
      <BackgroundPattern />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#8d32fc] rounded-[2rem] sm:rounded-[40px] p-8 sm:p-12 md:p-20 text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Darmowy projekt poglądowy</h2>
          <p className="text-lg sm:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Chcesz zobaczyć, jak może wyglądać Twoja nowa strona lub sklep? Przygotujemy dla Ciebie niezobowiązujący projekt poglądowy zupełnie za darmo!
          </p>
          <button 
            onClick={onContactClick}
            className="bg-[#14133A] text-white rounded-full px-8 sm:px-10 py-3 sm:py-4 font-bold text-base sm:text-lg hover:bg-slate-800 transition-colors"
          >
            Zamawiam darmowy projekt
          </button>
        </div>
      </div>
    </section>
  );
}

function ValueProps({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#8d32fc] font-semibold text-sm tracking-wider uppercase mb-3 block">Dlaczego Solid Agency?</span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
              Współpraca, która <span className="text-[#8d32fc]">się opłaca.</span>
            </h2>
            <p className="text-xl text-slate-600 mb-10">
              Nie sprzedajemy pustych obietnic. Dostarczamy konkretne rozwiązania, które mają jeden cel: zwiększyć Twoje zyski.
            </p>
            <button 
              onClick={onContactClick}
              className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 sm:px-10 py-4 sm:py-5 font-semibold transition-colors text-base sm:text-lg"
            >
              Porozmawiajmy o Twoim biznesie
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              { icon: <Users />, title: 'Rozmowa za darmo', desc: '30 minut, zero zobowiązań.' },
              { icon: <Zap />, title: 'Narzędzia, nie teoria', desc: 'Same konkrety, zero slajdów.' },
              { icon: <Target />, title: 'Bierzemy to na siebie', desc: 'Zajmujemy się techniczną stroną.' },
              { icon: <BarChart3 />, title: 'Nie pracujemy z każdym', desc: 'Wybieramy projekty z potencjałem.' }
            ].map((prop, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-[#8d32fc]/10 flex items-center justify-center text-[#8d32fc] mb-6">
                  {React.cloneElement(prop.icon as React.ReactElement, { className: 'w-6 h-6' })}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{prop.title}</h4>
                <p className="text-slate-600 text-sm">{prop.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: 'Jak długo trwa stworzenie strony WWW lub sklepu?', a: 'Czas realizacji zależy od stopnia skomplikowania projektu. Prosta strona wizytówka to zazwyczaj 2-3 tygodnie, natomiast rozbudowany sklep e-commerce może zająć od 4 do 8 tygodni.' },
    { q: 'Czy muszę podpisywać umowę długoterminową na reklamy?', a: 'Nie, wierzymy w efekty naszej pracy. Nasze umowy na obsługę kampanii Google Ads i Meta Ads mają zazwyczaj miesięczny okres wypowiedzenia.' },
    { q: 'Jakie materiały muszę dostarczyć przed startem?', a: 'Zazwyczaj prosimy o logo (najlepiej wektorowe), zdjęcia produktów/usług, dostęp do obecnych kont reklamowych (jeśli istnieją) oraz wypełnienie krótkiego briefu, który pomoże nam zrozumieć Twój biznes.' },
    { q: 'Czy pomagacie w pisaniu tekstów na stronę?', a: 'Tak! W ramach naszych usług SEO & Content Marketing tworzymy profesjonalne, sprzedażowe teksty, które są zoptymalizowane pod kątem wyszukiwarek.' },
    { q: 'Jak wygląda rozliczenie za kampanie reklamowe?', a: 'Rozliczenie składa się z dwóch części: naszej stałej opłaty za obsługę i optymalizację kampanii oraz budżetu reklamowego, który jest pobierany bezpośrednio przez Google lub Meta z Twojej karty.' }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-50" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#8d32fc] font-semibold text-sm tracking-wider uppercase mb-3 block">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Najczęstsze pytania</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <button 
                className="w-full px-8 py-6 text-left flex items-center justify-between font-bold text-slate-900 focus:outline-none text-lg"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                {faq.q}
                <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-slate-600 text-base leading-relaxed border-t border-slate-100 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[2rem] sm:rounded-[40px] p-8 sm:p-10 md:p-20 text-center text-white relative overflow-hidden">
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
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">Solid Agency</span>
        </div>
        
        <div className="flex items-center gap-8 text-sm text-slate-500 font-medium">
          <p>Agencja Marketingowa 360°</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-slate-500">
          <a href="#" className="hover:text-[#8d32fc] transition-colors">Polityka prywatności</a>
          <a href="#" className="hover:text-[#8d32fc] transition-colors">Regulamin</a>
          <span>© 2026 Solid Agency</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative bg-[#f8fafc] font-sans text-slate-900 selection:bg-[#8d32fc]/20 selection:text-[#8d32fc]">
      <Navbar onContactClick={() => setIsModalOpen(true)} />
      <main className="relative">
        <div className="w-full min-h-[calc(100svh+24px)] sm:min-h-[calc(100svh+40px)] z-0 overflow-hidden">
          <Hero onContactClick={() => setIsModalOpen(true)} />
        </div>
        <div className="relative z-10">
          <div className="relative z-10 rounded-t-[2.5rem] sm:rounded-t-[4rem] bg-white -mt-12 sm:-mt-20 overflow-hidden">
            {/* Dispersed Atmospheric Glow Background */}
            <div className="absolute inset-0 bg-white"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_#B0B8C2_0%,_transparent_50%),radial-gradient(circle_at_80%_80%,_#B0B8C2_0%,_transparent_50%),radial-gradient(circle_at_50%_50%,_#B0B8C2_0%,_transparent_70%)] opacity-70"></div>
            
            <AboutUs />
            <ExpertiseSection />
          </div>
          <ProcessSection />
          <FreeProjectOffer onContactClick={() => setIsModalOpen(true)} />
          <ValueProps onContactClick={() => setIsModalOpen(true)} />
          <FAQ />
          <CTA onContactClick={() => setIsModalOpen(true)} />
          <Footer />
        </div>
      </main>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
