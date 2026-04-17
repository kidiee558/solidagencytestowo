import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, Check, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LatestProjects, getProjectsData, ServicesGrid } from './WebsitesOfferPage';

const getEcommerceProjectsData = (lang: 'PL' | 'ENG') => {
  const base = getProjectsData(lang);
  const overrides = lang === 'PL' ? [
    { 
      title: 'Prosty Sklep & Landing Page', 
      description: 'Rozwiązanie dla marek, które chcą sprzedawać konkretne produkty bez rozbudowanej struktury. Składa się z przejrzystego układu, który eliminuje zbędne podstrony i skomplikowane menu. Całość oparta jest na lekkiej technologii, dzięki czemu strona ładuje się natychmiast nawet na słabych łączach. To narzędzie nastawione na maksymalną estetykę i szybką finalizację zamówienia przez klienta.', 
      deliveryTime: 'Czas realizacji do 7 dni',
      points: [
        'Czysty układ treści',
        'Brak zbędnych kroków',
        'Idealne dopasowanie mobilne'
      ]
    },
    { 
      title: 'Profesjonalny sklep internetowy', 
      description: 'Solidna platforma przygotowana do obsługi dużego asortymentu i tysięcy transakcji jednocześnie. Zawiera pełne integracje z płatnościami online, kurierami oraz systemami fakturującymi, którymi zarządzasz z jednego panelu. System projektujemy tak, aby wytrzymał nagłe skoki ruchu, zachowując stabilność i bezpieczeństwo danych. To kompletne zaplecze do codziennej sprzedaży i rozwoju Twojej marki.', 
      deliveryTime: 'Czas realizacji do 14 dni',
      points: [
        'Płynna obsługa zamówień',
        'Pełna automatyzacja płatności i wysyłek',
        'Szybki czas reakcji systemu'
      ]
    },
    { 
      title: 'Sklepy Premium & B2B', 
      description: 'System automatyzujący sprzedaż hurtową i obsługę kontrahentów biznesowych. Platforma automatycznie zarządza różnymi warunkami handlowymi, wyświetlając partnerom ich indywidualne ceny i rabaty od razu po zalogowaniu. Dzięki synchronizacji stanów magazynowych w czasie rzeczywistym, nie musisz ręcznie sprawdzać dostępności towarów ani wysyłać ofert w plikach. To narzędzie do zarządzania dużą skalą sprzedaży i logistyki.', 
      deliveryTime: 'Czas realizacji do 30 dni',
      points: [
        'Segmentacja warunków zakupu',
        'Zautomatyzowane stany magazynowe',
        'Szybkie formularze zbiorcze'
      ],
      buttonText: { PL: 'Omów wdrożenie', ENG: 'Discuss implementation' }
    },
    { 
      title: 'Dedykowany system E-Commerce', 
      description: 'Technologia budowana od podstaw dla projektów, które wymagają unikalnej logiki, nieobecnej w gotowych szablonach. Jeśli Twój model biznesowy potrzebuje niestandardowych funkcji lub specyficznej prezentacji produktu, tworzymy architekturę dopasowaną pod Twoje procesy. Otrzymujesz bezpieczny, niezależny system z możliwością dowolnej rozbudowy. To inwestycja w rozwiązanie, które nie stawia żadnych barier przy skalowaniu biznesu.', 
      deliveryTime: 'Czas realizacji ustalany indywidualnie',
      points: [
        'Funkcje na specjalne zamówienie',
        'Brak technicznych ograniczeń',
        'Maksymalne standardy ochrony'
      ],
      buttonText: { PL: 'Omów wdrożenie', ENG: 'Discuss implementation' }
    }
  ] : [
    { 
      title: 'Simple Store & Landing Page', 
      description: 'A solution for brands that want to sell specific products without an extensive structure. It consists of a clear layout that eliminates unnecessary subpages and complex menus. The whole is based on lightweight technology, thanks to which the page loads instantly even on weak connections. This is a tool focused on maximum aesthetics and quick finalization of the order by the customer.', 
      deliveryTime: 'Delivery up to 7 days',
      points: [
        'Clean content layout',
        'No unnecessary steps',
        'Perfect mobile fit'
      ]
    },
    { 
      title: 'Professional online store', 
      description: 'A solid platform prepared to handle a large assortment and thousands of transactions simultaneously. It includes full integrations with online payments, couriers and invoicing systems, which you manage from one panel. We design the system so that it can withstand sudden traffic spikes, maintaining stability and data security. This is a complete back-end for daily sales and the development of your brand.', 
      deliveryTime: 'Delivery up to 14 days',
      points: [
        'Smooth order handling',
        'Full payment and shipping automation',
        'Fast system response time'
      ]
    },
    { 
      title: 'Premium & B2B Stores', 
      description: 'A system automating wholesale and business contractor service. The platform automatically manages different commercial conditions, displaying to partners their individual prices and discounts immediately after logging in. Thanks to real-time inventory synchronization, you do not have to manually check the availability of goods or send offers in files. This is a tool for managing large-scale sales and logistics.', 
      deliveryTime: 'Delivery up to 30 days',
      points: [
        'Purchase condition segmentation',
        'Automated inventory levels',
        'Fast bulk forms'
      ],
      buttonText: { PL: 'Omów wdrożenie', ENG: 'Discuss implementation' }
    },
    { 
      title: 'Dedicated E-Commerce system', 
      description: 'Technology built from scratch for projects that require unique logic, absent in ready-made templates. If your business model needs custom functions or specific product presentation, we create an architecture tailored to your processes. You receive a secure, independent system with the possibility of any expansion. This is an investment in a solution that does not pose any barriers when scaling the business.', 
      deliveryTime: 'Delivery time set individually',
      points: [
        'Custom-made features',
        'No technical limitations',
        'Maximum protection standards'
      ],
      buttonText: { PL: 'Omów wdrożenie', ENG: 'Discuss implementation' }
    }
  ];
  return base.map((p, i) => ({ ...p, ...overrides[i] }));
};

const SimpleGlobe = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <ellipse cx="12" cy="12" rx="3.33" ry="10" />
    <ellipse cx="12" cy="12" rx="6.66" ry="10" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <ellipse cx="12" cy="12" rx="10" ry="3.33" />
    <ellipse cx="12" cy="12" rx="10" ry="6.66" />
    <line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);

const ProjectImage = ({ src, alt }: { src: string, alt: string }) => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export function EcommerceOfferPage({ onBack, onContactClick, onAskAwayClick, onStartProjectClick }: { onBack: () => void; onContactClick: () => void; onAskAwayClick: () => void; onStartProjectClick?: () => void }) {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const processStages = lang === 'PL' ? [
    {
      id: '01',
      title: 'Strategia Sprzedaży',
      paragraphs: [
        "Analizujemy Twój produkt i grupę docelową, aby stworzyć ścieżkę zakupową, która nie stawia oporu. Badamy konkurencję i trendy rynkowe.",
        "Efektem jest makieta sklepu zorientowana na maksymalizację współczynnika konwersji (CR) i średniej wartości koszyka (AOV).",
        "Planujemy integracje z płatnościami i logistyką już na starcie."
      ]
    },
    {
      id: '02',
      title: 'Design & UX',
      paragraphs: [
        "Projektujemy interfejs, który buduje zaufanie i ułatwia zakupy. Każdy przycisk i element nawigacji ma swoje miejsce wynikające z psychologii sprzedaży.",
        "Tworzymy unikalny wygląd, który wyróżnia Twój sklep na tle masowych szablonów.",
        "Dbamy o perfekcyjne wyświetlanie na urządzeniach mobilnych, gdzie odbywa się większość zakupów."
      ]
    },
    {
      id: '03',
      title: 'Wdrożenie Techniczne',
      paragraphs: [
        "Kodujemy sklep dbając o najwyższą wydajność i bezpieczeństwo. Integrujemy niezbędne narzędzia: bramki płatności, systemy wysyłkowe, fakturowanie.",
        "Konfigurujemy panel zarządzania tak, abyś mógł łatwo dodawać produkty i obsługiwać zamówienia bez pomocy programisty."
      ]
    },
    {
      id: '04',
      title: 'Optymalizacja & Start',
      paragraphs: [
        "Przeprowadzamy rygorystyczne testy całego procesu zakupowego. Pomagamy w konfiguracji domeny i hostingu.",
        "Po starcie monitorujemy zachowania użytkowników i wprowadzamy poprawki zwiększające sprzedaż.",
        "Zapewniamy wsparcie techniczne i doradztwo w skalowaniu Twojego e-commerce."
      ]
    }
  ] : [
    {
      id: '01',
      title: 'Sales Strategy',
      paragraphs: [
        "We analyze your product and target group to create a shopping path that offers no resistance. We research the competition and market trends.",
        "The result is a store mockup focused on maximizing the conversion rate (CR) and average order value (AOV).",
        "We plan integrations with payments and logistics right from the start."
      ]
    },
    {
      id: '02',
      title: 'Design & UX',
      paragraphs: [
        "We design an interface that builds trust and makes shopping easier. Every button and navigation element has its place resulting from the psychology of sales.",
        "We create a unique look that makes your store stand out from mass templates.",
        "We ensure perfect display on mobile devices, where most purchases take place."
      ]
    },
    {
      id: '03',
      title: 'Technical Implementation',
      paragraphs: [
        "We code the store ensuring the highest performance and security. We integrate necessary tools: payment gateways, shipping systems, invoicing.",
        "We configure the management panel so that you can easily add products and handle orders without a programmer's help."
      ]
    },
    {
      id: '04',
      title: 'Optimization & Launch',
      paragraphs: [
        "We conduct rigorous tests of the entire purchasing process. We help with domain and hosting configuration.",
        "After launch, we monitor user behavior and introduce improvements to increase sales.",
        "We provide technical support and advice in scaling your e-commerce."
      ]
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = lang === 'PL' ? [
    {
      question: "Ile kosztuje utrzymanie sklepu po jego uruchomieniu?",
      answer: "Koszt utrzymania zależy od skali Twojego biznesu i generowanego ruchu. Dla mniejszych sklepów są to kwoty rzędu kilkuset złotych rocznie, podczas gdy systemy Premium wymagają wydajniejszych serwerów dedykowanych. Kluczowe jest jednak to, że u nas nie płacisz żadnych prowizji od sprzedaży ani stałych opłat za samo korzystanie z platformy (SaaS)."
    },
    {
      question: "Czy otrzymam szkolenie z obsługi panelu?",
      answer: "Tak. Po wdrożeniu przeprowadzamy szkolenie, podczas którego nauczysz się dodawać produkty, zarządzać stanami magazynowymi i obsługiwać zamówienia. Otrzymasz system, który będziesz kontrolować samodzielnie, bez konieczności płacenia programiście za każdą zmianę ceny czy tekstu."
    },
    {
      question: "Czy sklep będzie poprawnie wyświetlał się na telefonach?",
      answer: "Standardem w naszych projects jest podejście Mobile-First. Projektujemy interfejs pod kątem użytkowników smartfonów, zapewniając błyskawiczne ładowanie i wygodną ścieżkę zakupu \"pod kciuk\", co bezpośrednio przekłada się na wyższą sprzedaż w Twoim sklepie."
    },
    {
      question: "Jakie metody płatności i dostawy mogę oferować?",
      answer: "Wdrażamy wszystkie kluczowe rozwiązania: szybkie płatności (BLIK, PayU, Przelewy24, Apple Pay) oraz pełną automatyzację logistyki (InPost, DPD, DHL). Klient płaci w sekundę, a Ty generujesz etykietę nadawczą jednym kliknięciem bezpośrednio w panelu administratora."
    },
    {
      question: "Czy sklep jest zoptymalizowany pod wyszukiwarkę Google?",
      answer: "Każdy projekt przechodzi audyt techniczny SEO. Optymalizujemy kod, szybkość ładowania i strukturę nagłówków. Twój sklep otrzymuje solidny fundament techniczny, dzięki któremu łatwiej i taniej będzie Ci budować widoczność w wynikach wyszukiwania."
    },
    {
      question: "Ile trwa budowa sklepu od momentu rozpoczęcia prac?",
      answer: "Prosty sklep (Landing Page) oddajemy do 7 dni roboczych. Bardziej rozbudowane systemy e-commerce wymagają od 10 do 21 dni. Dokładny termin otrzymasz w specyfikacji przed startem – szanujemy Twój czas i nie pozwalamy na niekontrolowane opóźnienia."
    },
    {
      question: "Czy oferujecie wsparcie techniczne po uruchomieniu sklepu?",
      answer: "Działający sklep to dopiero początek. Zapewniamy pełną opiekę powdrożeniową oraz gwarancję techniczną na wykonany system. Jeśli pojawią się jakiekolwiek pytania lub będziesz chciał rozbudować sklep o nowe funkcje, jesteśmy do Twojej dyspozycji. Nie zostawiamy Cię samego z technologią – dbamy o to, aby Twój biznes działał stabilnie i bez przerw w sprzedaży."
    }
  ] : [
    {
      question: "How much does it cost to maintain the store after its launch?",
      answer: "The maintenance cost depends on the scale of your business and the generated traffic. For smaller stores, these are amounts of several hundred zlotys per year, while Premium systems require more efficient dedicated servers. The key thing, however, is that with us you do not pay any sales commissions or fixed fees for just using the platform (SaaS)."
    },
    {
      question: "Will I receive training on how to use the panel?",
      answer: "Yes. After implementation, we conduct training during which you will learn how to add products, manage inventory and handle orders. You will receive a system that you will control yourself, without having to pay a programmer for every price or text change."
    },
    {
      question: "Will the store display correctly on phones?",
      answer: "The Mobile-First approach is a standard in our projects. We design the interface for smartphone users, ensuring lightning-fast loading and a comfortable purchase path \"under the thumb\", which directly translates into higher sales in your store."
    },
    {
      question: "What payment and delivery methods can I offer?",
      answer: "We implement all key solutions: fast payments (BLIK, PayU, Przelewy24, Apple Pay) and full logistics automation (InPost, DPD, DHL). The customer pays in a second, and you generate a shipping label with one click directly in the administrator panel."
    },
    {
      question: "Is the store optimized for the Google search engine?",
      answer: "Each project undergoes a technical SEO audit. We optimize the code, loading speed and header structure. Your store receives a solid technical foundation, thanks to which it will be easier and cheaper for you to build visibility in search results."
    },
    {
      question: "How long does it take to build a store from the moment work begins?",
      answer: "We deliver a simple store (Landing Page) within 7 business days. More extensive e-commerce systems require from 10 to 21 days. You will receive the exact date in the specification before the start - we respect your time and do not allow uncontrolled delays."
    },
    {
      question: "Do you offer technical support after launching the store?",
      answer: "A working store is just the beginning. We provide full post-implementation care and a technical guarantee for the completed system. If any questions arise or you want to expand the store with new functions, we are at your disposal. We do not leave you alone with technology - we make sure that your business operates stably and without interruptions in sales."
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-40 bg-black text-white min-h-screen">
      <div className="absolute inset-0 z-0 h-[200vh] pointer-events-none overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60"
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/t%C5%82o.mp4"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="fixed top-8 left-4 md:top-12 md:left-12 z-50">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pt-40 lg:pt-48 pb-16 lg:pb-12 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
            <div 
              className="font-inter-tight text-white max-w-[15em]"
              style={{ 
                lineHeight: '1', 
                fontWeight: '300',
                fontSize: 'clamp(1.75rem, 1.5rem + 2vw, 3.5rem)'
              }}
            >
              {lang === 'PL' ? 'Nowoczesne platformy sprzedażowe zorientowane na konwersję i doskonałe doświadczenie klienta.' : 'Modern sales platforms focused on conversion and excellent customer experience.'}
            </div>

            <div 
              className="font-inter-tight text-slate-300 lg:max-w-[35em]"
              style={{ 
                fontSize: 'clamp(1rem, .735915493rem + .8450704225vw, 1.75rem)',
                letterSpacing: '-.01em',
                fontWeight: '400'
              }}
            >
              <p className="mb-8">
                {lang === 'PL' ? 'Tworzymy sklepy gotowe na dużą skalę sprzedaży i skomplikowaną logistykę. Łączymy systemy płatności, magazyny oraz kurierów w jeden, sprawnie działający mechanizm zarządzany z jednego panelu.' : 'We build online stores that not only look nice, but above all sell effectively. We combine advanced analytics with intuitive design.'}
              </p>
              <p>
                {lang === 'PL' ? 'Projektujemy intuicyjne procesy zakupowe, które eliminują błędy i skracają czas potrzebny na złożenie zamówienia. Otrzymujesz bezpieczną platformę, która wytrzyma każdy nagły skok ruchu.' : 'Your customers deserve a fast and secure purchasing process. We provide the technology that makes it possible, allowing you to focus on developing your offer.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <ServicesGrid projectsData={getEcommerceProjectsData(lang)} onContactClick={onContactClick} />

      <section className="relative z-10 w-full bg-white text-black">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-[6.25rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 items-center">
            <h2 className="text-black font-normal leading-[1.2] max-w-[12em] font-inter-tight" style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)' }}>
              {lang === 'PL' ? 'Sklep to nie tylko katalog produktów. To Twoje najważniejsze narzędzie sprzedażowe, które musi budować zaufanie od pierwszej sekundy.' : 'A store is not just a product catalog. It is your most important sales tool that must build trust from the first second.'}
            </h2>
            <div className="text-[#363636] lg:col-start-2 max-w-[27.5em] lg:ml-auto font-inter-tight font-light leading-[1.2] tracking-[.02em]" style={{ fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)' }}>
              {lang === 'PL' ? 'Od prostych sklepów typu One-Product po rozbudowane platformy B2B – dostarczamy rozwiązania, które realnie zwiększają Twoje przychody. Dbamy o każdy etap ścieżki klienta, od wejścia na stronę po finalizację płatności.' : 'From simple One-Product stores to extensive B2B platforms - we provide solutions that realistically increase your revenues. We take care of every stage of the customer path, from entering the website to finalizing the payment.'}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 pt-0 pb-32 bg-white">
        <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
          <h2 className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-black text-black leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full">
            <span className="sm:hidden flex flex-col items-end text-right w-full">
              <span>{lang === 'PL' ? <><>ZOBACZ<br />PROCES.</></> : <><>SEE THE<br />PROCESS.</></>}</span>
              <div className="flex flex-col items-start text-left w-[90%]" style={{ position: 'relative', paddingTop: '2.3125rem' }}>
                <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2, textTransform: 'none', letterSpacing: 'normal' }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                <span className="mt-2 text-left" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 400, letterSpacing: '.2em', textTransform: 'uppercase', lineHeight: 1.5, maxWidth: '280px' }}>{lang === 'PL' ? 'Nasze kroki do stworzenia Twojego dochodowego e-commerce.' : 'Our steps to create your profitable e-commerce.'}</span>
              </div>
            </span>
            <span className="hidden sm:inline-grid text-left">
              <span className="invisible col-start-1 row-start-1 select-none whitespace-pre" aria-hidden="true">{lang === 'PL' ? 'TWORZYMY TO' : 'WE CREATE IT'}</span>
              <span className="col-start-1 row-start-1 flex flex-col w-full">
                <span className="text-left">{lang === 'PL' ? 'ZOBACZ' : 'SEE THE'}</span>
                <span className="flex justify-between items-center w-full">
                  <div className="text-left flex flex-col">
                    <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2, textTransform: 'none', letterSpacing: 'normal' }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                    <span className="mt-2" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 400, letterSpacing: '.2em', textTransform: 'uppercase', maxWidth: '280px', lineHeight: 1.5 }}>{lang === 'PL' ? 'Nasze kroki do stworzenia Twojego dochodowego e-commerce.' : 'Our steps to create your profitable e-commerce.'}</span>
                  </div>
                  <span className="text-right">{lang === 'PL' ? 'PROCES.' : 'PROCESS.'}</span>
                </span>
              </span>
            </span>
          </h2>
        </div>
      </section>

      <section className="relative w-full bg-white text-black z-10">
        {processStages.map((stage, index) => (
          <div key={stage.id} className="sticky top-[72px] h-[calc(100vh-72px)] w-full bg-white flex flex-col" style={{ zIndex: 20 + index }}>
            <div className="max-w-[100rem] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex flex-col">
              <div className="w-full h-[1px] bg-black/10" />
              <div className="flex-1 flex flex-col justify-center py-12 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <h2 className="text-[clamp(3rem,10vw,8rem)] font-bold font-inter-tight leading-none tracking-tighter">{stage.title}</h2>
                  <div className="space-y-8 max-w-[35em] lg:ml-auto">
                    {stage.paragraphs.map((p, i) => (
                      <p key={i} className="text-[clamp(1rem,1.2vw,1.375rem)] font-inter-tight font-light leading-relaxed text-[#363636]">{p}</p>
                    ))}
                  </div>
                </div>
                <div className="mt-auto flex items-end justify-between pb-8">
                  <span className="text-sm font-mono text-black/40">{stage.id}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="relative bg-white text-black -mt-[1px] pb-[3.75rem] z-10 overflow-hidden">
        <h2 
          className="font-inter-tight font-normal mb-12 mx-[1.875rem] text-black"
          style={{ 
            lineHeight: '1',
            fontSize: 'clamp(1.75rem, -4.0833333333rem + 7.7777777778vw, 5.25rem)',
            textTransform: 'none',
            letterSpacing: 'normal'
          }}
        >
          Technologie
        </h2>

        <div className="relative w-full">
          <motion.div 
            className="flex gap-4 px-[1.875rem]"
            animate={{ x: [0, -2448] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ width: 'max-content' }}
          >
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4">
                {[
                  { name: 'NEXT.JS', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Next.js</title>
                      <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"/>
                    </svg>
                  )},
                  { name: 'REACT', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>React</title>
                      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
                    </svg>
                  )},
                  { name: 'TAILWIND CSS', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Tailwind CSS</title>
                      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                    </svg>
                  )},
                  { name: 'FRAMER MOTION', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16" strokeWidth="2">
                      <path d="M12 12 4 4v16L20 4v16l-4 -4"></path>
                      <path d="m20 12 -8 8 -4 -4"></path>
                    </svg>
                  )},
                  { name: 'TYPESCRIPT', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>TypeScript</title>
                      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
                    </svg>
                  )},
                  { name: 'NODE.JS', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Node.js</title>
                      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
                    </svg>
                  )},
                  { name: 'VITE', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Vite</title>
                      <path d="M13.056 23.238a.57.57 0 0 1-1.02-.355v-5.202c0-.63-.512-1.143-1.144-1.143H5.148a.57.57 0 0 1-.464-.903l3.777-5.29c.54-.753 0-1.804-.93-1.804H.57a.574.574 0 0 1-.543-.746.6.6 0 0 1 .08-.157L5.008.78a.57.57 0 0 1 .467-.24h14.589a.57.57 0 0 1 .466.903l-3.778 5.29c-.54.755 0 1.806.93 1.806h5.745c.238 0 .424.138.513.322a.56.56 0 0 1-.063.603z"/>
                    </svg>
                  )},
                  { name: 'WEBGL', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>WebGL</title>
                      <path d="M3.489 10.164c-.565.548-.885 1.172-.885 1.835 0 2.167 3.415 3.921 7.631 3.921 2.339 0 4.437-.484 5.837-1.335-1.533 1.426-4.265 2.43-7.385 2.43C3.89 17.015 0 14.769 0 11.999s3.89-5.014 8.689-5.014c3.131.002 5.872 1.009 7.398 2.444-1.399-.856-3.504-1.351-5.852-1.351-2.506 0-4.73.621-6.121 1.579l.785 3.395.971-3.481h.737l.971 3.481.805-3.481h.805L7.953 14.11h-.717l-.991-3.566L5.24 14.11h-.714zm19.839 3.48h-.162v.424h-.142v-.424h-.164v-.122h.468zm.064-.122h.209l.095.364.096-.364H24v.546h-.133v-.415h-.002l-.113.415h-.109l-.115-.415h-.003v.415h-.133zm-5.699.515c-.2.084-.399.126-.601.126-.319 0-.608-.055-.863-.166q-.3825-.1665-.645-.459c-.175-.195-.311-.424-.404-.688-.093-.263-.14-.547-.14-.851 0-.313.047-.601.14-.869.093-.269.226-.502.402-.699.175-.2.39-.355.645-.468s.541-.171.863-.171c.215 0 .421.034.621.098.199.064.381.16.543.284s.295.279.399.463.169.395.193.632h-.874c-.055-.233-.159-.408-.315-.525-.155-.118-.343-.176-.567-.176-.207 0-.382.04-.526.12s-.262.187-.35.322a1.41 1.41 0 0 0-.196.459c-.039.171-.062.348-.062.532 0 .175.02.346.062.512.04.167.107.315.196.448.088.133.206.24.35.32s.319.119.526.119c.303 0 .539-.077.705-.23s.262-.375.29-.668h-.922v-.689h1.75v2.255h-.584l-.093-.472c-.162.21-.344.357-.543.441m2.708-4.14v3.395h2.033v.774h-2.949V9.897zm-9.204 1.585c.109.151.191.337.251.557.053.21.08.452.08.716v.047H9.372c.011.41.164.876.807.876.45 0 .703-.344.719-.537l.002-.042h.592l-.007.051c-.008.075-.051.222-.135.377-.049.086-.104.166-.166.239a1.3 1.3 0 0 1-.248.218c-.071.046-.158.1-.287.139-.148.047-.326.069-.543.069-.415 0-.763-.151-1.007-.434a1.43 1.43 0 0 1-.266-.482c-.06-.182-.091-.386-.091-.601 0-.485.12-.896.348-1.186.125-.158.278-.28.457-.362.191-.086.41-.131.654-.131.218 0 .413.043.581.127.165.082.304.202.415.359m-1.064.047c-.402 0-.741.357-.765.785h1.543c-.046-.528-.302-.785-.778-.785m4.373.388c.058.182.086.381.084.588 0 .19-.022.385-.064.563-.049.206-.122.39-.22.545-.11.178-.252.318-.419.415-.186.109-.408.164-.654.164-.228 0-.426-.057-.585-.173a.89.89 0 0 1-.198-.193v.282h-.561V9.983h.59v1.393c.093-.111.202-.2.324-.262.146-.078.313-.118.497-.12.199 0 .383.04.547.118.158.075.295.184.408.324.109.135.193.297.251.481m-.53.67c0-.2-.013-.459-.111-.672-.12-.26-.335-.384-.654-.384-.3 0-.506.135-.628.417-.084.195-.126.452-.126.785 0 .696.412.942.765.942.244 0 .435-.102.565-.303.125-.191.189-.462.189-.785"/>
                    </svg>
                  )},
                  { name: 'THREE.JS', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Three.js</title>
                      <path d="M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667a.268.268 0 0 0-.123-.035L6.38 1.715a.268.268 0 0 0-.144-.04L.456.01A.268.268 0 0 0 .38 0zm.374.654L5.71 2.08 1.99 5.664zM6.61 2.34l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.926-4.877-1.4zm6.28 1.538l4.878 1.404-3.662 3.53zm-.52.13l1.208 4.9-4.853-1.392zm6.3 1.534l4.947 1.424-3.715 3.574zm-.524.12l1.215 4.926-4.876-1.398zm-15.432.696l4.964 1.424-3.726 3.586zM8.047 8.15l4.877 1.4-3.66 3.527zm-.518.137l1.236 5.017-4.963-1.432zm6.274 1.535l4.965 1.425-3.73 3.586zm-.52.127l1.235 5.012-4.958-1.43zm-9.63 2.438l4.873 1.406-3.656 3.523zm5.854 1.687l4.863 1.403-3.648 3.51zm-.54.04l1.214 4.927-4.875-1.4zm-3.896 4.02l5.037 1.442-3.782 3.638z"/>
                    </svg>
                  )},
                  { name: 'BLENDER', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Blender</title>
                      <path d="M12.51 13.214c.046-.8.438-1.506 1.03-2.006a3.424 3.424 0 0 1 2.212-.79c.85 0 1.631.3 2.211.79.592.5.983 1.206 1.028 2.005.045.823-.285 1.586-.865 2.153a3.389 3.389 0 0 1-2.374.938 3.393 3.393 0 0 1-2.376-.938c-.58-.567-.91-1.33-.865-2.152M7.35 14.831c.006.314.106.922.256 1.398a7.372 7.372 0 0 0 1.593 2.757 8.227 8.227 0 0 0 2.787 2.001 8.947 8.947 0 0 0 3.66.76 8.964 8.964 0 0 0 3.657-.772 8.285 8.285 0 0 0 2.785-2.01 7.428 7.428 0 0 0 1.592-2.762 6.964 6.964 0 0 0 .25-3.074 7.123 7.123 0 0 0-1.016-2.779 7.764 7.764 0 0 0-1.852-2.043h.002L13.566 2.55l-.02-.015c-.492-.378-1.319-.376-1.86.002-.547.382-.609 1.015-.123 1.415l-.001.001 3.126 2.543-9.53.01h-.013c-.788.001-1.545.518-1.695 1.172-.154.665.38 1.217 1.2 1.22V8.9l4.83-.01-8.62 6.617-.034.025c-.813.622-1.075 1.658-.563 2.313.52.667 1.625.668 2.447.004L7.414 14s-.069.52-.063.831zm12.09 1.741c-.97.988-2.326 1.548-3.795 1.55-1.47.004-2.827-.552-3.797-1.538a4.51 4.51 0 0 1-1.036-1.622 4.282 4.282 0 0 1 .282-3.519 4.702 4.702 0 0 1 1.153-1.371c.942-.768 2.141-1.183 3.396-1.185 1.256-.002 2.455.41 3.398 1.175.48.391.87.854 1.152 1.367a4.28 4.28 0 0 1 .522 1.706 4.236 4.236 0 0 1-.239 1.811 4.54 4.54 0 0 1-1.035 1.626"/>
                    </svg>
                  )},
                  { name: 'GRAPHQL', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" className="w-16 h-16"><path fill="#777" fillRule="evenodd" d="m59 11.4 20.5 11.9c.6-.6 1.3-1.2 2-1.6 4.3-2.4 9.7-1 12.2 3.3 2.4 4.3 1 9.7-3.3 12.2q-1.05.6-2.4.9v23.7c.8.2 1.6.5 2.3.9 4.3 2.5 5.7 7.9 3.3 12.2s-7.9 5.7-12.2 3.3c-.8-.5-1.6-1.1-2.2-1.8L58.9 88.2c.3.9.5 1.9.4 2.8 0 4.9-4 8.9-8.9 8.9s-8.9-4-8.9-8.9c0-.9.1-1.7.4-2.5L21.4 76.6c-.6.6-1.3 1.1-2 1.6-4.3 2.4-9.7 1-12.2-3.3-2.4-4.3-1-9.7 3.3-12.2.7-.4 1.5-.7 2.3-.9V38.1q-1.2-.3-2.4-.9c-4.2-2.5-5.7-8-3.2-12.2 2.4-4.3 7.9-5.7 12.2-3.3.7.4 1.4 1 2 1.6l20.5-11.9c-.2-.8-.4-1.7-.4-2.5 0-4.9 4-8.9 8.9-8.9s8.9 4 8.9 8.9c0 .9-.1 1.7-.3 2.5m-2.2 3.7L77.4 27c-.3 1.1-.4 2.3-.3 3.5s.5 2.3 1.1 3.4c1.3 2.2 3.3 3.6 5.6 4.2v23.8c-.1 0-.2.1-.3.1L56.6 15.3c.1 0 .2-.1.2-.2m-12.5.2L17.4 61.9c-.1 0-.2-.1-.4-.1V38.1c2.3-.6 4.3-2 5.6-4.2.6-1 1-2.2 1.1-3.4s0-2.4-.3-3.5L44 15.1c.1.1.2.2.3.2m8.6 2.2L79.8 64c-.6.6-1.1 1.3-1.6 2-.4.7-.7 1.5-.9 2.3H23.6c-.2-.8-.5-1.6-.9-2.3s-1-1.4-1.6-2L48 17.5c.8.2 1.6.3 2.5.3q1.2 0 2.4-.3M57 85l20.5-11.8c-.1-.2-.1-.4-.2-.6H23.6c0 .1-.1.2-.1.3L44 84.8c.8-.9 1.8-1.5 2.9-2s2.3-.7 3.5-.7 2.5.3 3.6.8c1.2.4 2.2 1.2 3 2.1" clipRule="evenodd"/></svg>
                  )},
                  { name: 'TANSTACK QUERY', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" className="w-16 h-16"><g clipPath="url(#a)"><path fill="#000" d="M46.156.094c1.32-.173 2.712-.055 4.041-.055 4.924 0 9.759.765 14.47 2.213a51 51 0 0 1 16.555 8.696C87.28 15.715 92.3 21.968 95.52 28.984c6.027 13.13 5.983 29.04-.191 42.115-3.992 8.453-10.397 15.528-18.148 20.688-6.325 4.21-13.722 6.787-21.248 7.699-9.58 1.161-19.936-.536-28.548-4.951C11.22 86.246.228 69.564.01 51.28c-.041-3.525.013-7.07.711-10.561 1.137-5.685 3.118-11.18 6.095-16.168 3.219-5.396 7.377-10.158 12.357-13.997 5.84-4.502 12.627-7.74 19.814-9.388 1.736-.396 3.478-.616 5.23-.83l.553-.068q.693-.083 1.386-.174M29.432 83.212c-2.226.238-4.574.644-6.485 1.894.43.103.923 0 1.372 0 1.078-.002 2.166-.042 3.242.005a37.4 37.4 0 0 1 8.107 1.263c3.332.914 6.267 2.712 9.478 3.925 3.387 1.28 6.759 1.677 10.351 1.677 1.81 0 3.608-.006 5.363-.5-.916-.488-2.227-.396-3.242-.6-2.203-.44-4.368-.979-6.486-1.735-1.558-.556-3.06-1.242-4.555-1.943l-.96-.452c-1.387-.652-2.778-1.295-4.212-1.837-3.772-1.425-7.952-2.129-11.973-1.697m3.367-9.472c-4.411 0-8.874.777-12.845 2.779a19 19 0 0 0-2.744 1.703c-.264.195-.733.446-.83.785-.1.344.255.633.456.853.992-.53 1.936-1.09 2.993-1.49 6.837-2.598 15.126-2.054 21.95.328 3.403 1.187 6.538 2.964 9.852 4.357a44 44 0 0 0 11.474 3.085c4.696.611 10.05.116 14.342-2.003 1.509-.744 3.603-1.879 4.24-3.528-.787.07-1.496.407-2.244.64-1.19.37-2.395.683-3.617.928-4.143.83-8.549 1.001-12.721.248-3.932-.71-7.585-2.136-11.221-3.636l-.465-.192-.928-.385-.464-.192c-1.858-.77-3.723-1.53-5.63-2.195-3.703-1.293-7.673-2.085-11.598-2.085m7.733-67.77c-5.289 1.168-10.026 3.443-14.592 6.31-2.65 1.665-5.186 3.37-7.483 5.514-3.416 3.186-6.026 7.06-8.303 11.105-2.346 4.168-3.85 9.026-4.577 13.74-.713 4.624-.83 9.485-.014 14.114 1.022 5.786 2.965 11.215 6.035 16.237 1.031-.482 1.764-1.58 2.619-2.32 1.727-1.494 3.54-2.879 5.487-4.073.721-.443 1.462-.786 2.245-1.101.295-.119.779-.227.918-.552.22-.515-.188-1.412-.258-1.946-.3-1.527-.322-3.08-.284-4.622.11-4.488.949-9.039 2.545-13.24 1.204-3.165 3.042-6.039 5.22-8.618a40 40 0 0 1 2.335-2.498c.48-.478 1.074-.886 1.372-1.499-1.564.001-3.128.452-4.614.91-3.204.986-6.324 2.45-8.98 4.514-1.211.942-2.099 2.177-3.244 3.168-.352.304-.981.712-1.467.482-.734-.346-.62-1.79-.705-2.454-.323-2.552.644-5.781 1.873-7.994 1.973-3.552 5.62-6.585 9.904-6.479 1.85.046 3.469.689 5.238 1.108-.449-.637-1.05-1.101-1.622-1.623-1.4-1.28-2.932-2.449-4.614-3.333-.677-.355-1.406-.572-2.12-.833-.36-.131-.812-.312-.947-.711-.25-.74 1.081-1.425 1.57-1.737 1.891-1.205 4.21-2.197 6.485-2.253 3.557-.087 7.032 1.886 8.497 5.244.514 1.18.667 2.429.768 3.689l.018.236.027.355.008.118.018.237.018.237c1.117-.911 1.903-2.25 2.993-3.226 2.55-2.281 6.042-3.294 9.354-2.267 2.993.928 5.595 2.994 7.126 5.742.4.72 1.518 2.477.71 3.194-.631.56-1.433.123-2.1-.11-.504-.175-1.025-.287-1.549-.39l-.285-.056-.285-.056c-1.813-.364-3.921-.326-5.737-.007-1.175.207-2.322.625-3.492.798v.25c3.2.026 6.294 1.851 7.873 4.621.654 1.148.98 2.461 1.23 3.747.31 1.59.093 3.322-.342 4.871-.145.52-.41 1.4-1.03 1.52-.44.085-.813-.352-1.064-.647-.657-.773-1.282-1.507-2.053-2.175-1.95-1.687-4.013-3.244-6.11-4.745-1.115-.798-2.334-1.834-3.618-2.321.361.869.715 1.677.837 2.623.361 2.782-.804 5.401-2.552 7.494-.533.639-1.104 1.282-1.777 1.779-.279.205-.629.474-.997.416-1.157-.183-1.295-1.926-1.472-2.82-.6-3.025-.36-6.03.474-8.992-.742.375-1.278 1.198-1.743 1.873-1.024 1.485-1.913 3.056-2.55 4.746-2.538 6.735-2.514 14.623.774 21.107.367.724.924.627 1.648.627l.328-.002.328-.003c.656-.007 1.314-.01 1.963.077.337.045.805.005 1.072.253.32.297.149.808.075 1.174-.205 1.023-.274 1.953-.274 2.997 1.365-.211 1.744-2.4 2.228-3.497.548-1.243 1.106-2.487 1.613-3.747.25-.62.583-1.312.496-1.998-.099-.772-.656-1.59-1.045-2.249-.735-1.245-1.571-2.527-2.113-3.872-.433-1.075-.03-2.418 1.19-2.802.674-.212 1.392.204 1.83.69.92 1.02 1.512 2.539 2.18 3.736l5.202 9.368c.442.793.885 1.585 1.337 2.373.176.307.356.782.717.913.322.116.761-.05 1.082-.114.83-.166 1.66-.346 2.494-.496 1-.18 2.522-.147 3.242-.928-1.053-.333-2.27-.313-3.367-.238-.658.045-1.388.28-1.993-.104-.901-.572-1.5-1.894-2.05-2.78-1.36-2.184-2.64-4.402-3.94-6.62l-.208-.353-.419-.706a58 58 0 0 1-.617-1.065c-.155-.276-.386-.64-.163-.945.234-.32.744-.338 1.204-.339h.091c.18 0 .35 0 .487-.017 1.857-.245 3.74-.447 5.613-.447-.146-.507-.563-1.08-.43-1.623.299-1.215 2.047-1.595 2.86-.724.545.586.862 1.39 1.217 2.097.469.932 1.002 1.833 1.504 2.748.878 1.601 1.838 3.159 2.74 4.746q.113.197.23.392l.116.195c.39.65.782 1.306.992 2.036-3.137-.143-5.492-3.785-6.86-6.245-.109.394.069.746.21 1.124.295.786.647 1.535 1.09 2.249.633 1.018 1.36 2.067 2.317 2.806 1.7 1.312 3.941 1.32 5.986 1.18 1.312-.09 2.95-.688 4.24-.283 1.289.405 1.807 1.825 1.042 2.916-.573.818-1.338 1.126-2.288 1.25.672 1.442 1.553 2.78 2.192 4.246.265.61.543 1.546 1.18 1.868.425.215 1.033.015 1.491.006-.46-1.219-1.322-2.252-1.746-3.498 1.291.06 2.54.733 3.742 1.163 2.364.846 4.699 1.77 7.03 2.703l1.076.431c.96.384 1.924.764 2.869 1.182.346.153.824.51 1.206.29.312-.18.514-.607.706-.897.538-.811 1.025-1.653 1.508-2.498 1.932-3.384 3.35-7.091 4.296-10.867 3.123-12.453.444-26.194-7.06-36.597-2.885-3.997-6.51-7.453-10.51-10.314C65.696 6.18 52.57 3.31 40.531 5.97m20.453 62.103c-2.652.691-5.386 1.318-8.107 1.67.358 1.218 1.233 2.403 1.873 3.497.247.423.512.99 1 1.173.553.208 1.22-.129 1.742-.299-.242-.66-.648-1.254-.98-1.873-.137-.255-.349-.558-.236-.86.213-.574 1.1-.54 1.59-.64 1.293-.262 2.572-.59 3.866-.848.477-.096 1.14-.355 1.62-.195.358.12.575.415.779.724l.092.139c.122.184.247.365.404.506.523.473 1.305.545 1.97.674-.406-.912-1.08-1.71-1.511-2.623-.251-.531-.458-1.313-1.007-1.62-.758-.422-2.321.373-3.095.575m-16.712-6.074c-.125 1.583-.61 2.872-1.372 4.246.873.11 1.762.15 2.62.362.641.16 1.233.463 1.87.638-.34-.932-.972-1.763-1.462-2.623-.494-.869-.936-1.924-1.656-2.623"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>
                  )},
                  { name: 'AWS', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" className="w-16 h-16"><g clipPath="url(#a)"><path fill="#2e2e2e" d="M28.2 41.7c0 1.2.1 2.2.4 3 .3.7.6 1.5 1.1 2.4.2.3.2.5.2.8s-.2.7-.6 1l-2.1 1.4q-.45.3-.9.3c-.3 0-.7-.2-1-.5-.5-.5-.9-1-1.2-1.6s-.7-1.2-1-2c-2.6 3.1-5.9 4.6-9.8 4.6-2.8 0-5-.8-6.7-2.4C5 47.1 4.1 45 4.1 42.3q0-4.2 3-6.9c2-1.7 4.7-2.6 8.1-2.6 1.1 0 2.3.1 3.5.3s2.5.4 3.8.7v-2.4c0-2.5-.5-4.3-1.6-5.3q-1.65-1.5-5.4-1.5c-1.2 0-2.4.1-3.6.4s-2.4.7-3.6 1.1c-.5.2-.9.4-1.2.4-.2.1-.4.1-.5.1-.5 0-.7-.3-.7-1V24c0-.5.1-.9.2-1.2.2-.2.5-.5.9-.7q1.8-.9 4.2-1.5c1.6-.4 3.4-.6 5.2-.6q6 0 8.7 2.7c1.8 1.8 2.8 4.5 2.8 8.2zm-13.5 5.1c1.1 0 2.2-.2 3.4-.6s2.3-1.1 3.2-2.1c.5-.6.9-1.3 1.1-2.1s.3-1.8.3-2.9v-1.4c-1-.2-2-.4-3.1-.6-1.1-.1-2.1-.2-3.1-.2-2.2 0-3.9.4-5 1.3-1 .9-1.5 2.2-1.5 3.8s.4 2.7 1.2 3.5c.8.9 1.9 1.3 3.5 1.3m26.7 3.6c-.6 0-1-.1-1.3-.3s-.5-.7-.7-1.3L31.6 23c-.2-.7-.3-1.1-.3-1.3 0-.5.3-.8.8-.8h3.3c.6 0 1.1.1 1.3.3.3.2.5.7.7 1.3l5.6 22 5.2-22c.2-.7.4-1.1.6-1.3.3-.2.7-.3 1.3-.3h2.7c.6 0 1.1.1 1.3.3.3.2.5.7.6 1.3L60 44.8l5.8-22.3c.2-.7.4-1.1.7-1.3s.7-.3 1.3-.3h3.1c.5 0 .8.3.8.8 0 .2 0 .3-.1.5 0 .2-.1.5-.2.8l-8 25.7c-.2.7-.4 1.1-.7 1.3s-.7.3-1.3.3h-2.9c-.6 0-1.1-.1-1.3-.3-.3-.2-.5-.7-.6-1.3l-5.2-21.5-5.1 21.4c-.2.7-.4 1.1-.6 1.3-.3.2-.7.3-1.3.3h-3zm42.7.9c-1.7 0-3.5-.2-5.1-.6-1.7-.4-3-.8-3.8-1.3-.5-.3-.9-.6-1-.9s-.2-.6-.2-.9v-1.7c0-.7.3-1 .8-1 .2 0 .4 0 .6.1s.5.2.8.3c1.1.5 2.4.9 3.7 1.2s2.6.4 4 .4c2.1 0 3.7-.4 4.9-1.1s1.7-1.8 1.7-3.2c0-.9-.3-1.7-.9-2.3s-1.7-1.2-3.4-1.7l-4.8-1.5c-2.4-.8-4.2-1.9-5.3-3.4s-1.7-3.1-1.7-4.8c0-1.4.3-2.6.9-3.7q.9-1.65 2.4-2.7c1-.8 2.1-1.3 3.5-1.7q1.95-.6 4.2-.6c.7 0 1.5 0 2.2.1.8.1 1.5.2 2.2.4s1.3.3 1.9.5 1.1.4 1.4.6c.5.3.8.5 1 .8s.3.6.3 1.1v1.6c0 .7-.3 1.1-.8 1.1-.3 0-.7-.1-1.3-.4-1.9-.9-4-1.3-6.4-1.3-1.9 0-3.4.3-4.4.9s-1.6 1.6-1.6 3c0 .9.3 1.7 1 2.4.7.6 1.9 1.3 3.7 1.8l4.7 1.5c2.4.8 4.1 1.8 5.2 3.2 1 1.4 1.5 2.9 1.5 4.7q0 2.1-.9 3.9c-.6 1.1-1.4 2.1-2.4 2.9s-2.3 1.4-3.7 1.9c-1.6.1-3.2.4-4.9.4"/><path fill="#a7a7a7" fill-rule="evenodd" d="M90.4 67.4c-10.9 8.1-26.8 12.4-40.5 12.4-19.2 0-36.4-7.1-49.5-18.9-1-.9-.1-2.2 1.1-1.5C15.6 67.6 33 72.5 51 72.5c12.1 0 25.5-2.5 37.7-7.7 1.9-.7 3.5 1.3 1.7 2.6" clip-rule="evenodd"/><path fill="#a7a7a7" fill-rule="evenodd" d="M95 62.2c-1.4-1.8-9.2-.9-12.8-.4-1.1.1-1.2-.8-.3-1.5 6.3-4.4 16.5-3.1 17.7-1.7 1.2 1.5-.3 11.8-6.2 16.7-.9.8-1.8.4-1.4-.6 1.4-3.3 4.4-10.7 3-12.5" clip-rule="evenodd"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>
                  )}
                ].map((tech, i) => (
                  <div 
                    key={i} 
                    className="border border-[#d9d9d9] rounded-[12px] py-[1.25rem] flex flex-col items-center justify-center select-none w-[16rem]"
                    style={{ 
                      display: 'grid',
                      gridTemplateRows: '10rem auto',
                      height: '16rem'
                    }}
                  >
                    <div className="flex items-center justify-center">
                      {tech.icon}
                    </div>
                    <div className="text-[10px] font-medium tracking-[0.2em] text-black/40 text-center mt-4">
                      {tech.name}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-[6.25rem] lg:py-[12.5rem]">
        <div className="mx-[1.875rem] flex flex-col lg:flex-row justify-between gap-12 lg:gap-[2rem]">
          <div className="lg:w-[480px]">
            <div className="lg:sticky lg:top-[100px] bg-[#F3DEFF] p-[1.5625rem] rounded-[20px] h-fit">
              <h2 className="text-[2.5rem] lg:text-[3.2rem] font-inter-tight font-normal leading-[1.05] mb-6 text-black">{lang === 'PL' ? 'Rozkręć swoją sprzedaż już teraz' : 'Start Selling Online Professionally'}</h2>
              <p className="text-black/60 text-lg mb-10">{lang === 'PL' ? 'Twój sukces w e-commerce zaczyna się tutaj.' : 'Your e-commerce success starts here.'}</p>
              <button onClick={onAskAwayClick} className="bg-white/20 hover:bg-white/30 text-black px-8 py-4 rounded-full transition-colors text-sm font-medium border border-black/10">{lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}</button>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              {faqItems.map((item, index) => (
                <div key={index} className="border-t border-[#d9d9d9] last:border-b">
                  <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full py-8 flex justify-between items-center text-left group">
                    <span className="text-xl lg:text-2xl font-inter-tight font-normal text-black pr-8">{item.question}</span>
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 flex items-center justify-center relative">
                        <motion.div animate={{ rotate: openIndex === index ? 90 : 0 }} className="absolute w-4 h-[1px] bg-black" />
                        <motion.div animate={{ rotate: openIndex === index ? 0 : 90 }} className="absolute w-4 h-[1px] bg-black" />
                      </div>
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                        <div className="pb-8 text-black/60 text-lg leading-relaxed max-w-[800px]">{item.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-white text-black flex flex-col items-center justify-between p-6 relative overflow-hidden">
        <div className="h-20 w-full"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden -translate-y-20 sm:translate-y-0">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible scale-[1.4] sm:scale-100">
            <path id="curve-bottom-offer-ecom" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
            <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <motion.textPath xlinkHref="#curve-bottom-offer-ecom" animate={{ startOffset: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="text-[100px] sm:text-[150px] font-black text-black uppercase tracking-[0.01em] fill-black font-bebas">
                {lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
          <span className="text-black/60 text-sm tracking-widest uppercase">{lang === 'PL' ? 'KONTAKT' : 'CONTACT'}</span>
          <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">{lang === 'PL' ? 'Gotów, by podbić rynek e-commerce?' : 'Ready to conquer the e-commerce market?'}</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={onStartProjectClick || onContactClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}</button>
            <button onClick={onAskAwayClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}</button>
          </div>
        </div>
        <footer className="w-full flex justify-between items-end z-20 pb-4">
          <div className="text-sm">
            <p className="font-bold">{lang === 'PL' ? 'POLAND' : 'POLAND'}</p>
            <p className="text-black/60">{lang === 'PL' ? 'Lubelskie, Lublin - Tutaj jesteśmy. Działamy na całym świecie.' : 'Lubelskie, Lublin - We are here. We operate worldwide.'}</p>
          </div>
          <div className="w-32"></div>
        </footer>
      </section>
    </div>
  );
}
