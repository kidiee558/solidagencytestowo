import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Menu, X, Monitor, ShoppingCart, Search, Share2, 
  TrendingUp, Camera, CheckCircle2, ArrowRight, ChevronDown,
  Zap, Target, BarChart3, Users, Globe
} from 'lucide-react';

const servicesData = [
  {
    id: 'www',
    title: 'Strategiczne Strony WWW',
    description: 'Twoja cyfrowa wizytówka to nie koszt, to inwestycja. Budujemy strony, które nie tylko zachwycają designem, ale przede wszystkim zamieniają odwiedzających w lojalnych klientów.',
    icon: <Monitor className="w-8 h-8" />,
    items: [
      { name: 'Strona Wizytówka (One Page)', desc: 'Idealna dla lokalnych firm usługowych. Skupiona na konkretnym celu: szybki kontakt, mapa dojazdu i profesjonalna prezentacja oferty.', price: 'od 2 500 PLN' },
      { name: 'Rozbudowane Serwisy Firmowe', desc: 'Wielostronicowe witryny dla firm, które potrzebują edukować klienta. Zawierają blogi, systemy rezerwacji, katalogi usług i zaawansowane formularze.', price: 'od 6 000 PLN' },
      { name: 'Landing Page Sprzedażowy', desc: 'Strona stworzona pod konkretną kampanię reklamową (Google/Meta). Maksymalne nastawienie na jeden cel: sprzedaż produktu lub pozyskanie leada.', price: 'od 2 000 PLN' },
    ]
  },
  {
    id: 'ecommerce',
    title: 'Sklepy Internetowe E-commerce',
    description: 'Tworzymy maszyny do sprzedaży. Integrujemy płatności, kurierów i systemy magazynowe, abyś Ty mógł skupić się na rozwoju biznesu.',
    icon: <ShoppingCart className="w-8 h-8" />,
    items: [
      { name: 'E-sklep Start', desc: 'Szybki i intuicyjny sklep oparty na sprawdzonych silnikach. Idealny na początek przygody z handlem online.', price: 'od 5 000 PLN' },
      { name: 'E-sklep Pro', desc: 'Zaawansowana platforma dla wymagających. Obsługa tysięcy produktów, automatyzacja procesów sprzedażowych i dedykowany design.', price: 'od 12 000 PLN' },
    ]
  },
  {
    id: 'google-ads',
    title: 'Kampanie Google Ads',
    description: 'Bądź tam, gdzie klienci Cię szukają. Wykorzystujemy pełen potencjał wyszukiwarki Google, aby dostarczać Ci gotowych do zakupu klientów.',
    icon: <Search className="w-8 h-8" />,
    items: [
      { name: 'Kompleksowa Strategia', desc: 'Dobór słów kluczowych i budżetu tak, aby każda złotówka zarabiała.', price: 'od 1 500 PLN + budżet' },
      { name: 'Kampanie Produktowe (PLA)', desc: 'Zdjęcie i cena Twojego produktu bezpośrednio w wynikach wyszukiwania.', price: 'od 1 500 PLN + budżet' },
      { name: 'Display i Remarketing', desc: 'Banery graficzne, które „śledzą” klienta i przypominają mu o niedokończonym zakupie.', price: 'od 1 500 PLN + budżet' },
    ]
  },
  {
    id: 'meta-ads',
    title: 'Kampanie Meta Ads',
    description: 'Docieramy do ludzi na podstawie ich zainteresowań i zachowań. Budujemy potrzebę posiadania Twojego produktu.',
    icon: <Share2 className="w-8 h-8" />,
    items: [
      { name: 'Lead Generation', desc: 'Pozyskiwanie danych kontaktowych bezpośrednio przez Facebooka.', price: 'od 1 500 PLN + budżet' },
      { name: 'Sprzedaż z Katalogu', desc: 'Automatyczne wyświetlanie produktów ze sklepu osobom, które je oglądały.', price: 'od 1 500 PLN + budżet' },
      { name: 'Komunikacja i Kreacje', desc: 'Tworzymy posty i grafiki, które zatrzymują kciuk podczas scrollowania.', price: 'od 1 500 PLN + budżet' },
    ]
  },
  {
    id: 'seo',
    title: 'SEO & Content Marketing',
    description: 'Zadbamy o to, aby Google kochało Twoją stronę. Budujemy Twoją pozycję eksperta w branży.',
    icon: <TrendingUp className="w-8 h-8" />,
    items: [
      { name: 'Pozycjonowanie Stron i Sklepów', desc: 'Optymalizacja techniczna, dzięki której znajdziesz się na pierwszej stronie wyników.', price: 'od 1 500 PLN' },
      { name: 'SXO (Search Experience Optimization)', desc: 'Łączymy SEO z użytecznością – tak, aby ruch na stronie kończył się zakupem.', price: 'od 2 000 PLN' },
      { name: 'Content SEO', desc: 'Pisanie artykułów i opisów produktów, które sprzedają i pozycjonują jednocześnie.', price: 'od 1 000 PLN' },
    ]
  },
  {
    id: 'content',
    title: 'Content Wizualny',
    description: 'Dobre reklamy potrzebują dobrego obrazu. Robimy materiały, które klikają i sprzedają.',
    icon: <Camera className="w-8 h-8" />,
    items: [
      { name: 'Produkcja Rolki/TikTok', desc: 'Dynamiczne, krótkie formy wideo zmontowane pod aktualne trendy.', price: 'od 1 000 PLN' },
      { name: 'Sesje Produktowe', desc: 'Zdjęcia i filmy, które pokazują Twój produkt z najlepszej strony.', price: 'od 1 500 PLN' },
      { name: 'Materiały do Reklam', desc: 'Specjalne kreacje wideo nastawione na wysoką klikalność (CTR).', price: 'od 1 000 PLN' },
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

function Navbar() {
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
            <button className={`rounded-full px-6 py-2.5 transition-colors ${isScrolled ? 'bg-white/20 text-white hover:bg-white/30' : 'bg-white text-[#26255B] hover:bg-slate-100'}`}>Kontakt</button>
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
  return (
    <div className="relative w-full max-w-[220px] sm:max-w-[260px] mx-auto lg:ml-auto lg:mr-0 lg:translate-x-12 xl:translate-x-20" style={{ perspective: '2000px' }}>
      <motion.div 
        initial={{ rotateY: -25, rotateX: 12, scale: 0.8, opacity: 0 }}
        animate={{ rotateY: -15, rotateX: 8, scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Sleek Integrated Phone Frame (No protruding buttons) */}
        <div className="relative bg-[#050505] rounded-[2.8rem] border-[10px] border-[#121212] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden aspect-[9/19.5] z-10 ring-1 ring-white/10">
          {/* Screen Content (Video) */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
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
        <div className="absolute -inset-16 bg-blue-600/15 blur-[100px] -z-10 rounded-full"></div>
      </motion.div>
    </div>
  );
}

function HeroContent() {
  return (
    <div className="relative min-h-[calc(100svh+24px)] sm:min-h-[calc(100svh+40px)] flex flex-col lg:flex-row items-start lg:items-center pt-32 lg:pt-0 pb-24 lg:pb-0 overflow-hidden z-0">
      <div className="w-full px-4 sm:px-6 lg:px-24 xl:px-40 relative z-20 flex flex-col flex-grow">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-24 items-center flex-grow">
          <div className="text-left lg:col-span-7 xl:col-span-6 w-full">
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
              <span className="text-[#FFB901] text-[20px] xs:text-[24px] sm:text-3xl lg:text-4xl xl:text-5xl sm:whitespace-nowrap tracking-tight font-extrabold [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">Zacznij sprzedawać w 24h.</span>
              <span className="text-white text-[20px] xs:text-[24px] sm:text-3xl lg:text-4xl xl:text-5xl sm:whitespace-nowrap tracking-tight font-extrabold [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">Bez czekania tygodniami.</span>
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-white mb-8 lg:mb-12 leading-relaxed max-w-2xl font-semibold [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
              Tworzymy unikalne strony internetowe, dochodowe sklepy e-commerce oraz skuteczne kampanie reklamowe Google & Meta Ads. Budujemy Twoją przewagę, gdy inni wciąż planują spotkania.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16 lg:mb-0">
              <button className="bg-[#FFB901] hover:bg-[#FFB901]/90 text-[#14133A] rounded-full px-6 py-3 sm:px-8 sm:py-4 font-bold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-[#FFB901]/20 w-fit">
                Wycena w 30min <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 text-white rounded-full px-6 py-3 sm:px-8 sm:py-4 font-bold transition-all flex items-center justify-center gap-2 text-sm sm:text-base w-fit">
                Zobacz ofertę
              </button>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end pt-8 lg:pt-0 mt-auto lg:mt-0 w-full"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
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
        <HeroContent />
      </div>
    </section>
  );
}

function AboutUs() {
  return (
    <section className="relative py-32 bg-white z-10" id="o-nas">
      {/* Removed Bottom Transition */}

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-12 leading-tight tracking-tight text-slate-900 flex flex-col gap-2">
          <span className="md:whitespace-nowrap">U Twojej konkurencji telefon ciągle dzwoni.</span>
          <span className="md:whitespace-nowrap">A Ty wciąż tylko „planujesz”?</span>
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-10 font-medium">
            Prawda jest brutalna: klient, który nie znajdzie Cię w 15 sekund, zostawi pieniądze u kogoś innego. Tam, gdzie agencje tygodniami „analizują strategię”, my oddajemy Ci <strong className="font-bold">gotowe narzędzie w 24 godziny</strong>.
          </p>
          <p className="text-xl md:text-2xl text-slate-700 leading-relaxed mb-6 font-medium">
            Bez zbędnych maili i pośredników – masz bezpośredni numer do wykonawcy i święty spokój. Twoja strona <strong className="font-bold">od pierwszego dnia</strong> robi to, za co zapłaciłeś: ściąga ludzi, którzy realnie zostawiają u Ciebie pieniądze.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function ExpertiseSection() {
  return (
    <section className="py-24 bg-white relative" id="ekspertyza">
      <BackgroundPattern />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-3 block">Nasza Ekspertyza</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Rozwiązania, które skalują biznes</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {servicesData.map((service, index) => (
            <motion.div 
              key={service.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                {service.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
              </div>
              <div className="text-lg sm:text-xl font-bold text-blue-600 flex-shrink-0 md:text-right mt-2 md:mt-0">
                {service.id === 'www' ? 'Strony od 1000 PLN' : service.id === 'ecommerce' ? 'Sklepy od 2500 PLN' : 'Zapytaj o wycenę'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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
              <div className="text-4xl sm:text-6xl font-bold text-blue-500 mb-4 sm:mb-8 opacity-30">0{i + 1}</div>
              <h4 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">{step.title}</h4>
              <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FreeProjectOffer() {
  return (
    <section className="py-24 bg-white relative">
      <BackgroundPattern />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-blue-600 rounded-[2rem] sm:rounded-[40px] p-8 sm:p-12 md:p-20 text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Darmowy projekt poglądowy</h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Chcesz zobaczyć, jak może wyglądać Twoja nowa strona lub sklep? Przygotujemy dla Ciebie niezobowiązujący projekt poglądowy zupełnie za darmo!
          </p>
          <button className="bg-white text-blue-600 rounded-full px-8 sm:px-10 py-3 sm:py-4 font-bold text-base sm:text-lg hover:bg-blue-50 transition-colors">
            Zamawiam darmowy projekt
          </button>
        </div>
      </div>
    </section>
  );
}

function ValueProps() {
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
            <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-3 block">Dlaczego Solid Agency?</span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
              Współpraca, która <span className="text-blue-600">się opłaca.</span>
            </h2>
            <p className="text-xl text-slate-600 mb-10">
              Nie sprzedajemy pustych obietnic. Dostarczamy konkretne rozwiązania, które mają jeden cel: zwiększyć Twoje zyski.
            </p>
            <button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 sm:px-10 py-4 sm:py-5 font-semibold transition-colors text-base sm:text-lg">
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
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
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
          <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-3 block">FAQ</span>
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

function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[2rem] sm:rounded-[40px] p-8 sm:p-10 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 tracking-tight">Gotowy, żeby zamknąć więcej transakcji?</h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-12 max-w-2xl mx-auto">
              30 minut, zero zobowiązań. Pokażemy Ci, gdzie tracisz klientów i co zmienić, żeby sprzedawać więcej.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 sm:px-12 py-4 sm:py-5 font-bold text-base sm:text-lg transition-colors inline-flex items-center gap-2 shadow-lg shadow-blue-600/20">
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
          <a href="#" className="hover:text-blue-600 transition-colors">Polityka prywatności</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Regulamin</a>
          <span>© 2026 Solid Agency</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="relative bg-[#f8fafc] font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main className="relative">
        <div className="sticky bottom-0 w-full min-h-[calc(100svh+24px)] sm:min-h-[calc(100svh+40px)] z-0 overflow-hidden">
          <Hero />
        </div>
        <div className="relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.15)] rounded-t-3xl sm:rounded-t-[3rem] -mt-6 sm:-mt-10">
          <AboutUs />
          <ExpertiseSection />
          <ProcessSection />
          <FreeProjectOffer />
          <ValueProps />
          <FAQ />
          <CTA />
          <Footer />
        </div>
      </main>
    </div>
  );
}
