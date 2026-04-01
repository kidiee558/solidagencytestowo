import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, Check, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

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
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export function EcommerceOfferPage({ onBack, onContactClick }: { onBack: () => void; onContactClick: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const boxes = [
    { 
      title: <>Prosty Sklep<br />& Landing Page</>, 
      desc: 'Szybkie wdrożenie sprzedażowe dla marek z wąskim asortymentem, stawiających na przejrzysty design i wysoką konwersję.',
      points: [
        'Budowa pod wysoką konwersję',
        'Błyskawiczna ścieżka zakupowa',
        'Pełna responsywność i optymalizacja (PC/Mobile)',
        'Integracja szybkich płatności',
        'Automatyczne powiadomienia i potwierdzenia',
        'Konfiguracja analityki i śledzenia sprzedaży'
      ],
      investment: 'OD 1500 PLN',
      time: 'DO 5 DNI',
      bgColor: '#F3DEFF'
    },
    { 
      title: <>Profesjonalny<br />sklep internetowy</>, 
      desc: 'Kompletne rozwiązanie e-commerce dla firm chcących profesjonalnie i samodzielnie zarządzać sprzedażą wielu produktów.',
      points: [
        'System zarządzania treścią (CMS)',
        'Pełna konfiguracja wysyłek i kurierów',
        'Automatyzacja płatności i fakturowania',
        'Zaawansowane filtrowanie produktów',
        'Optymalizacja SEO pod wyszukiwarki',
        'Panel administratora do obsługi zamówień'
      ],
      investment: 'OD 3400 PLN',
      time: 'DO 10 DNI',
      bgColor: '#F3DEFF'
    },
    { 
      title: <>Sklepy<br />Premium & B2B</>, 
      desc: 'Zaawansowane platformy sprzedażowe z dedykowanymi funkcjami dla dużych marek oraz systemów hurtowych.',
      points: [
        'Dedykowany projekt UI/UX',
        'Integracja z systemami zewnętrznymi (ERP)',
        'Obsługa wielu walut i wersji językowych',
        'Zaawansowane systemy rabatowe/lojalnościowe',
        'Optymalizacja pod bardzo duży ruch',
        'Pełna zgodność z RODO i standardami bezpieczeństwa'
      ],
      investment: 'OD 5500 PLN',
      time: 'DO 21 DNI',
      bgColor: '#F3DEFF'
    },
    { 
      title: <>Dedykowany system<br />E-Commerce</>, 
      desc: 'Systemy budowane od zera pod unikalne modele biznesowe, wymagające niestandardowej logiki i pełnej skalowalności.',
      points: [
        'Pełna swoboda funkcji i modułów',
        'Dedykowane konfiguratory produktów 3D/2D',
        'Złożone integracje z zewnętrznymi API',
        'Wielojęzyczność i wielowalutowość bez ograniczeń',
        'Brak ograniczeń gotowych platform (SaaS)',
        'Skalowalność pod rosnące obciążenie'
      ],
      investment: 'INDYWIDUALNA',
      time: 'INDYWIDUALNA',
      bgColor: '#F3DEFF'
    }
  ];

  const processStages = [
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
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
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
      answer: "Standardem w naszych projektach jest podejście Mobile-First. Projektujemy interfejs pod kątem użytkowników smartfonów, zapewniając błyskawiczne ładowanie i wygodną ścieżkę zakupu \"pod kciuk\", co bezpośrednio przekłada się na wyższą sprzedaż w Twoim sklepie."
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
      answer: "Prosty sklep (Landing Page) oddajemy do 5 dni roboczych. Bardziej rozbudowane systemy e-commerce wymagają od 10 do 21 dni. Dokładny termin otrzymasz w specyfikacji przed startem – szanujemy Twój czas i nie pozwalamy na niekontrolowane opóźnienia."
    },
    {
      question: "Czy oferujecie wsparcie techniczne po uruchomieniu sklepu?",
      answer: "Działający sklep to dopiero początek. Zapewniamy pełną opiekę powdrożeniową oraz gwarancję techniczną na wykonany system. Jeśli pojawią się jakiekolwiek pytania lub będziesz chciał rozbudować sklep o nowe funkcje, jesteśmy do Twojej dyspozycji. Nie zostawiamy Cię samego z technologią – dbamy o to, aby Twój biznes działał stabilnie i bez przerw w sprzedaży."
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
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/zaebistetlo.mp4"
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

      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pt-20 lg:pt-0 pb-16 lg:pb-12 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <h1 className="font-bold text-white tracking-tight leading-[1.1] flex flex-col gap-1 lg:gap-2">
            <span className="flex flex-col items-start">
              <span className="inline-flex items-center text-[8vw] sm:text-[9vw] lg:text-[8vw] font-semibold font-syne whitespace-nowrap tracking-tighter [text-shadow:0_2px_4px_rgba(0,0,0,0.3)] leading-[0.9]">
                SKLEPY I SYSTEMY
              </span>
              
              <div className="flex flex-col items-start w-full">
                <span className="text-[7.5vw] sm:text-[7vw] lg:text-[6vw] font-extrabold font-syne whitespace-nowrap tracking-tighter [text-shadow:0_2px_4px_rgba(0,0,0,0.3)] leading-[0.9]">
                  E-COMMERCE.
                </span>
                
                <div 
                  className="font-inter-tight text-slate-200 uppercase text-left break-words max-w-[45ch] mt-10"
                  style={{ 
                    fontSize: 'clamp(0.6rem, 0.4rem + 0.8vw, 1.6rem)',
                    letterSpacing: '0.05em',
                    fontWeight: '300',
                    lineHeight: '1.2'
                  }}
                >
                  Sprzedawaj więcej. Skaluj szybciej.<br />
                  E-commerce, który napędza Twój biznes.
                </div>
              </div>
            </span>
          </h1>
        </motion.div>
      </div>

      <section className="relative w-full py-24 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8"
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
              Nowoczesne platformy sprzedażowe zorientowane na konwersję i doskonałe doświadczenie klienta.
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
                Budujemy sklepy internetowe, które nie tylko ładnie wyglądają, ale przede wszystkim skutecznie sprzedają. Łączymy zaawansowaną analitykę z intuicyjnym designem.
              </p>
              <p>
                Twoi klienci zasługują na szybki i bezpieczny proces zakupowy. My dostarczamy technologię, która to umożliwia, pozwalając Ci skupić się na rozwoju oferty.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative w-full py-24 z-10 bg-white text-black">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-black mb-12 tracking-tight leading-[0.9] sm:leading-tight">
            Zobacz naszą ofertę
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center">
            {boxes.map((box, idx) => (
                <div 
                  key={idx} 
                  className="rounded-[20px] w-full max-w-[400px] flex flex-col shadow-xl transition-all duration-500"
                  style={{ backgroundColor: box.bgColor }}
                >
                  <div className="p-8 flex flex-col h-full">
                    <h3 className="text-black text-left mb-3" style={{ fontWeight: 500, fontSize: 'clamp(1.1rem, 9cqi, 2rem)', fontFamily: 'Inter Tight, sans-serif', lineHeight: 1.1 }}>
                      {box.title}
                    </h3>
                    <div className="text-black text-left mb-6 flex-grow" style={{ fontSize: 'clamp(0.8rem, 4.5cqi, 1.1rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 400, lineHeight: 1.3, letterSpacing: '-.01em' }}>
                      {box.desc}
                    </div>
                    <div className="flex flex-col gap-y-3 mb-8">
                      {box.points.map((point, i) => (
                        <div key={i} className="text-[clamp(0.7rem,4cqi,0.95rem)] text-black/80 flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                          {point}
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto" style={{ fontSize: 'clamp(0.9rem, 4.5cqi, 1.1rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 800, letterSpacing: '0.08em', lineHeight: 1.1, textTransform: 'uppercase', color: 'black' }}>
                      <p className="mb-1">CENA: {box.investment}</p>
                      {box.time && <p>REALIZACJA: {box.time}</p>}
                      <button onClick={onContactClick} className="mt-6 rounded-full border border-black/20 hover:bg-black/10 transition-colors px-6 h-[3rem] flex items-center justify-center text-black text-xs font-bold uppercase tracking-wider w-fit">
                        ZOBACZ OFERTĘ
                      </button>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 w-full bg-white text-black">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-[6.25rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 items-center">
            <h2 className="text-black font-normal leading-[1.2] max-w-[12em] font-inter-tight" style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)' }}>
              Sklep to nie tylko katalog produktów. To Twoje najważniejsze narzędzie sprzedażowe, które musi budować zaufanie od pierwszej sekundy.
            </h2>
            <div className="text-[#363636] lg:col-start-2 max-w-[27.5em] lg:ml-auto font-inter-tight font-light leading-[1.2] tracking-[.02em]" style={{ fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)' }}>
              Od prostych sklepów typu One-Product po rozbudowane platformy B2B – dostarczamy rozwiązania, które realnie zwiększają Twoje przychody. Dbamy o każdy etap ścieżki klienta, od wejścia na stronę po finalizację płatności.
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 pt-0 pb-32 bg-white">
        <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
          <h2 className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-black text-black leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full">
            <span className="sm:hidden flex flex-col items-end text-right w-full">
              <span>ZOBACZ<br />PROCES.</span>
              <div className="flex flex-col items-start text-left w-[90%]" style={{ position: 'relative', paddingTop: '2.3125rem' }}>
                <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2 }}>4 kluczowe etapy</span>
                <span className="mt-2 text-left" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 400, letterSpacing: '.2em', textTransform: 'uppercase', lineHeight: 1.5, maxWidth: '280px' }}>Nasze kroki do stworzenia Twojego dochodowego e-commerce.</span>
              </div>
            </span>
            <span className="hidden sm:inline-grid text-left">
              <span className="col-start-1 row-start-1 flex flex-col w-full">
                <span className="text-left">ZOBACZ</span>
                <span className="flex justify-between items-center w-full">
                  <div className="text-left flex flex-col">
                    <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2 }}>4 kluczowe etapy</span>
                    <span className="mt-2" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 400, letterSpacing: '.2em', textTransform: 'uppercase', maxWidth: '280px', lineHeight: 1.5 }}>Nasze kroki do stworzenia Twojego dochodowego e-commerce.</span>
                  </div>
                  <span className="text-right">PROCES.</span>
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

      <section className="bg-white py-[6.25rem] lg:py-[12.5rem]">
        <div className="mx-[1.875rem] flex flex-col lg:flex-row justify-between gap-12 lg:gap-[2rem]">
          <div className="lg:w-[480px]">
            <div className="lg:sticky lg:top-[100px] bg-[#c9c0e8] p-[1.5625rem] rounded-[20px] h-fit">
              <h2 className="text-[2.5rem] lg:text-[3.2rem] font-inter-tight font-normal leading-[1.05] mb-6 text-black">Zacznij Sprzedawać Online Profesjonalnie</h2>
              <p className="text-black/60 text-lg mb-10">Twój sukces w e-commerce zaczyna się tutaj.</p>
              <button onClick={onContactClick} className="bg-white/20 hover:bg-white/30 text-black px-8 py-4 rounded-full transition-colors text-sm font-medium border border-black/10">Pytaj śmiało!</button>
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

      <section className="bg-black pt-5 pb-[6.25rem] lg:pb-[12.5rem] related-projects text-white">
        <div>
          <div className="flex flex-col items-start mb-5 px-6 lg:px-[1.875rem]">
            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-inter-tight font-normal text-white text-left leading-[0.9] sm:leading-tight">Powiązane projekty</h2>
          </div>
          <div ref={scrollRef} className="slider-related-projects max-w-full m-auto flex overflow-x-auto gap-4 lg:gap-[1.5rem] pb-8 scrollbar-hide snap-x snap-mandatory pl-6 pr-0 lg:px-[1.875rem] scroll-pl-6 lg:scroll-px-[1.875rem]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 w-[88%] lg:w-[45%] aspect-square rounded-[20px] overflow-hidden snap-start relative group cursor-pointer">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                <ProjectImage src={`https://picsum.photos/seed/ecom${i}/1200/1200`} alt={`Project ${i}`} />
                <div className="absolute bottom-8 left-8 z-20">
                  <p className="text-white text-sm font-medium uppercase tracking-wider mb-2 opacity-80">E-commerce</p>
                  <h3 className="text-white text-3xl font-inter-tight font-normal">Shop Project {i}</h3>
                </div>
              </div>
            ))}
            <div className="flex-shrink-0 w-6 lg:hidden" />
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={() => scroll('left')} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"><ChevronLeft className="w-6 h-6 text-white" /></button>
            <button onClick={() => scroll('right')} className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"><ChevronRight className="w-6 h-6 text-white" /></button>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-black text-white flex flex-col items-center justify-between p-6 relative overflow-hidden">
        <div className="h-20 w-full"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden -translate-y-20 sm:translate-y-0">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible scale-[1.4] sm:scale-100">
            <path id="curve-bottom-offer-ecom" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
            <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <motion.textPath xlinkHref="#curve-bottom-offer-ecom" animate={{ startOffset: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="text-[100px] sm:text-[150px] font-black text-white uppercase tracking-[0.01em] fill-white font-bebas">
                {"SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
          <span className="text-white/60 text-sm tracking-widest uppercase">KONTAKT</span>
          <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">Gotów, by podbić rynek e-commerce?</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={() => {}} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">Wystartuj teraz</button>
            <button onClick={onContactClick} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">Pytaj śmiało!</button>
          </div>
        </div>
        <footer className="w-full flex justify-between items-end z-20 pb-4">
          <div className="text-sm">
            <p className="font-bold">POLAND</p>
            <p className="text-white/60">Lubelskie, Lublin - Tutaj jesteśmy. Działamy na całym świecie.</p>
          </div>
          <div className="w-32"></div>
        </footer>
      </section>
    </div>
  );
}
