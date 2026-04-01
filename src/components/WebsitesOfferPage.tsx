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

export function WebsitesOfferPage({ onBack, onContactClick }: { onBack: () => void; onContactClick: () => void }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const boxes = [
    { 
      title: <>Strona One-Page<br />& Wizytówki</>, 
      desc: 'Szybka witryna One-Page zorientowana na natychmiastową konwersję i profesjonalny start w sieci.',
      points: [
        'Budowa pod konwersję (Leady)',
        'Pełna responsywność (PC/Mobile)',
        'Optymalizacja SEO',
        'Certyfikat bezpieczeństwa SSL',
        'Integracja z wizytówką Google',
        'Szybki start i prosta obsługa'
      ],
      investment: 'OD 1200 PLN',
      time: '24-48H',
      bgColor: '#F3DEFF'
    },
    { 
      title: <>Rozbudowana<br />strona firmowa</>, 
      desc: 'Pełny serwis ofertowy budujący zaufanie i widoczność na lokalne frazy kluczowe w wyszukiwarce.',
      points: [
        'Samodzielna edycja treści (CMS)',
        'Skuteczne pozycjonowanie w Google',
        'Dowolna liczba podstron ofertowych',
        'Automatyczne zbieranie zapytań',
        'Lejki sprzedażowe pod usługi',
        'Skalowalna struktura pod rozwój'
      ],
      investment: '3100 PLN',
      time: 'DO 7 DNI',
      bgColor: '#F3DEFF'
    },
    { 
      title: <>Strony<br />korporacyjne</>, 
      desc: 'Prestiżowy wizerunek dla liderów rynku. Najwyższa szybkość działania i unikalna architektura informacji.',
      points: [
        'Pancerny kod (Standardy OWASP)',
        'Ranking 100/100 w Google Speed',
        'Ekspansja na rynki zagraniczne',
        'Pełna synchronizacja z CRM/ERP',
        'Wsparcie techniczne 24/7',
        'Infrastruktura pod wysoki ruch'
      ],
      investment: 'OD 4800 PLN',
      time: 'DO 21 DNI',
      bgColor: '#F3DEFF'
    },
    { 
      title: <>Profesjonalne<br />systemy dedykowane</>, 
      desc: 'Dedykowane aplikacje i systemy bez ograniczeń technicznych. Automatyzacje dopasowane do Twoich procesów.',
      points: [
        'Pełna swoboda funkcji',
        'Niestandardowa logika biznesowa',
        'Automatyzacja obiegu danych',
        'Złożone panele analityczne',
        'Brak ograniczeń systemów CMS',
        'Skalowalność pod obciążeniem'
      ],
      investment: 'INDYWIDUALNA',
      time: 'INDYWIDUALNA',
      bgColor: '#F3DEFF'
    }
  ];

  const processStages = [
    {
      id: '01',
      title: 'Strategia & Planowanie',
      paragraphs: [
        "Od początku łączymy nasze działania z Twoimi celami biznesowymi i wymaganiami technicznymi. Badamy, jak zachowują się Twoi klienci i co robi konkurencja, aby wyznaczyć jasny kierunek.",
        "Efektem jest dokładny plan pracy, który określa zakres projektu i sposób, w jaki strona ma na siebie zarabiać.",
        "Dzięki temu masz pewność, że wdrożenie przyniesie mierzalne zyski."
      ]
    },
    {
      id: '02',
      title: 'Projektowanie UX/UI',
      paragraphs: [
        "Na bazie strategii tworzymy makiety i wygląd strony idealnie dopasowane do Twojej marki i planów rozwoju. Każdy element projektujemy od zera – unikamy gotowych szablonów i krótkotrwałych trendów, które za chwilę mogą być nieaktualne.",
        "Skupiamy się na tym, jak realnie zachowują się użytkownicy, aby ułatwić im zakup lub kontakt.",
        "Wspólnie dopracowujemy każdy detal, aż uzyskamy produkt gotowy do skutecznego działania i rozwoju."
      ]
    },
    {
      id: '03',
      title: 'Realizacja',
      paragraphs: [
        "Zatwierdzone projekty zamieniamy w czysty i łatwy w obsłudze kod, który będzie sprawnie działał przez lata. Część wizualną budujemy precyzyjnie, dbając o szybkość działania i wygodę na telefonach oraz komputerach.",
        "Od strony technicznej wdrażamy stabilny system do zarządzania treścią (CMS) i solidne fundamenty, które pozwolą Ci w przyszłości łatwo rozwijać ofertę i prowadzić marketing."
      ]
    },
    {
      id: '04',
      title: 'Start & Rozwój',
      paragraphs: [
        "Zajmujemy się całym procesem uruchomienia strony tak, aby odbyło się to bez żadnych przerw w jej działaniu.",
        "Po starcie dbamy o bezpieczeństwo, szybkość i stałe wsparcie techniczne.",
        "Działamy jako Twój partner na lata – analizujemy dane i wprowadzamy poprawki, które mają na celu stały wzrost Twoich dochodów."
      ]
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Dlaczego warto zainwestować w projekt indywidualny zamiast szablonu?",
      answer: "Indywidualny projekt to brak ograniczeń technicznych i unikalność, której nie daje szablon używany przez tysiące innych firm. Strona \"szyta na miarę\" jest szybsza, bezpieczniejsza i lepiej dostosowana do Twoich konkretnych procesów sprzedażowych. To narzędzie pracy, które rośnie wraz z Twoją firmą."
    },
    {
      question: "Ile kosztuje stworzenie profesjonalnej strony internetowej?",
      answer: "Cena zależy od stopnia skomplikowania projektu, liczby podstron oraz wymaganych funkcji technicznych. Każda nasza realizacja jest wyceniana indywidualnie, ponieważ tworzymy rozwiązania od zera, a nie na gotowych szablonach. Przygotowujemy ofertę tak, aby inwestycja zwróciła się poprzez skuteczną sprzedaż i pozyskiwanie klientów."
    },
    {
      question: "Ile trwa proces budowy strony od projektu do uruchomienia?",
      answer: "Standardowy proces zajmuje zazwyczaj od kilku godzin do kilku tygodni. Czas ten obejmuje fazę planowania, projektowania graficznego (UX/UI), kodowania oraz testów. Dokładny harmonogram dostarczamy na samym początku współpracy, abyś mógł zaplanować swoje działania marketingowe z wyprzedzeniem."
    },
    {
      question: "Czy nowa strona będzie widoczna w wyszukiwarce Google?",
      answer: "Tak. Każdą stronę budujemy zgodnie z aktualnymi wytycznymi SEO. Dbamy o czysty kod, szybkość ładowania oraz odpowiednią strukturę nagłówków i treści. To solidny fundament, który ułatwia robotom Google indeksowanie witryny i pozwala skutecznie walczyć o wysokie pozycje w wynikach wyszukiwania."
    },
    {
      question: "Czy otrzymam dostęp do edycji treści na stronie?",
      answer: "Oczywiście. Po zakończeniu prac otrzymasz dostęp do intuicyjnego panelu zarządzania (CMS). Dzięki niemu samodzielnie i bez wiedzy technicznej zmienisz teksty, dodasz nowe zdjęcia czy wpisy na blogu. Przed oddaniem projektu przeprowadzamy krótkie szkolenie, aby obsługa strony była dla Ciebie w pełni zrozumiała."
    },
    {
      question: "Co się stanie, jeśli po starcie strony będę potrzebować zmian?",
      answer: "Zapewniamy pełną opiekę powdrożeniową. Możesz liczyć na nasze wsparcie techniczne oraz stały rozwój witryny. Jako Twój partner biznesowy analizujemy, jak użytkownicy korzystają ze strony i na tej podstawie proponujemy optymalizacje, które jeszcze bardziej zwiększą jej skuteczność."
    },
    {
      question: "Czy zajmujecie się także hostingiem i domeną?",
      answer: "Pomagamy w całym procesie technicznym. Doradzamy przy wyborze szybkiego serwera i rejestracji domeny, a następnie konfigurujemy wszystko tak, aby strona działała bezawaryjnie. Możemy przejąć pełne zarządzanie infrastrukturą, abyś Ty mógł skupić się wyłącznie na prowadzeniu biznesu."
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
      {/* Background Video - Changed to absolute so it scrolls away */}
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

      {/* Navigation Controls */}
      <div className="fixed top-8 left-4 md:top-12 md:left-12 z-50">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pt-20 lg:pt-0 pb-16 lg:pb-12 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
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
          <h1 
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
          </h1>
          
          <div 
            className="font-inter-tight text-slate-200 uppercase text-left break-words max-w-[45ch] mt-10 px-4 sm:px-0 sm:text-center sm:mx-auto"
            style={{ 
              fontSize: 'clamp(0.6rem, 0.4rem + 0.8vw, 1.6rem)',
              letterSpacing: '0.05em',
              fontWeight: '300',
              lineHeight: '1.2'
            }}
          >
            Szybkie wdrażanie. Inteligentne skalowanie.<br />
            Strony internetowe, które zarabiają.
          </div>
        </motion.div>
      </div>

      {/* Section 2: Text content over video */}
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
              Wysokiej klasy strony internetowe budujące profesjonalny wizerunek, który wyróżnia Cię na tle konkurencji.
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
                Proces łączy estetyczny wygląd, szybkość działania i niezawodną technologię, by wdrażać unikalne strony internetowe, które budują zaufanie i pozwalają Twojej działalności stabilnie rosnąć.
              </p>
              <p>
                Zapewniamy pełne wsparcie techniczne i optymalizację pod kątem wyszukiwarek, co przekłada się na wysoką widoczność w sieci oraz realne zainteresowanie ofertą ze strony nowych klientów.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 3: White, Four Boxes */}
      <section className="relative w-full py-24 z-10 bg-white text-black">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-black mb-12 tracking-tight leading-[0.9] sm:leading-tight">
            Zobacz naszą ofertę
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center">
            {boxes.map((box, idx) => (
              <div 
                key={idx} 
                className="relative rounded-[20px] w-full max-w-[400px] aspect-[400/560] overflow-hidden flex flex-col group shadow-xl transition-all duration-500"
                style={{ backgroundColor: box.bgColor, containerType: 'inline-size' }}
              >
                <div 
                  className="absolute inset-0 z-10 p-6 flex flex-col justify-start h-full"
                >
                  <h3 
                    className="text-black text-left mb-3"
                    style={{
                      fontWeight: 500,
                      fontSize: 'clamp(1.1rem, 9cqi, 2rem)',
                      fontFamily: 'Inter Tight, sans-serif',
                      lineHeight: 1.1,
                      boxSizing: 'border-box',
                      whiteSpace: idx === 3 ? 'nowrap' : 'normal'
                    }}
                  >
                    {box.title}
                  </h3>
                  <div 
                    className="text-black text-left mb-4"
                    style={{
                      fontSize: 'clamp(0.8rem, 4.5cqi, 1.1rem)',
                      fontFamily: 'Inter Tight, sans-serif',
                      fontWeight: 400,
                      lineHeight: 1.3,
                      letterSpacing: '-.01em'
                    }}
                  >
                    {box.desc}
                  </div>
                  <div className="flex flex-col gap-y-1.5 mb-2">
                    {box.points.map((point, i) => (
                      <div key={i} className="text-[clamp(0.7rem,4cqi,0.95rem)] text-black/80 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        {point}
                      </div>
                    ))}
                    <div className="mt-2" style={{
                      fontSize: 'clamp(0.9rem, 4.5cqi, 1.1rem)',
                      fontFamily: 'Inter Tight, sans-serif',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      lineHeight: 1.1,
                      textTransform: 'uppercase',
                      color: 'black'
                    }}>
                      <p>CENA: {box.investment}</p>
                      {box.time && <p>REALIZACJA: {box.time}</p>}
                    </div>
                  </div>
                  <div className="pt-2 flex flex-col gap-4">
                    <button 
                      onClick={onContactClick}
                      className="rounded-full border border-black/20 hover:bg-black/10 transition-colors px-6 h-[3rem] flex items-center justify-center text-black text-xs font-bold uppercase tracking-wider w-fit"
                    >
                      ZOBACZ OFERTĘ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Strategy content */}
      <section className="relative z-10 w-full bg-white text-black">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-[6.25rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 items-center">
            <h2 
              className="text-black font-normal leading-[1.2] max-w-[12em] font-inter-tight"
              style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)' }}
            >
              Przestajemy zgadywać, co zadziała. Analizujemy zachowania użytkowników, aby wyeliminować bariery, które powstrzymują ich przed kontaktem z Tobą.
            </h2>
            <div 
              className="text-[#363636] lg:col-start-2 max-w-[27.5em] lg:ml-auto font-inter-tight font-light leading-[1.2] tracking-[.02em]"
              style={{ fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)' }}
            >
              Od prostych wizytówek po rozbudowane serwisy i systemy – działamy jako Twój stały partner w sieci. Dzięki unikalnym projektom, łatwej obsłudze i przemyślanej ścieżce klienta, dostarczamy szybkie wdrożenia oraz konkretne wyniki, które realnie rozwijają Twój biznes i budują mocny fundament pod Twój stały wzrost w internecie.
            </div>
          </div>
        </div>
      </section>

      {/* Section 4.5: ZOBACZ PROCES */}
      <section className="relative z-10 pt-0 pb-32 bg-white">
        <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
          <h2 
            className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-black text-black leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full"
            style={{ paddingTop: 'calc(0.04em + 10px)' }}
          >
            <span className="sm:hidden flex flex-col items-end text-right w-full">
              <span>ZOBACZ<br />PROCES.</span>
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
                }}>4 kluczowe etapy</span>
                <span className="mt-2 text-left" style={{
                  fontSize: '.75rem',
                  fontFamily: 'Geist Mono, monospace',
                  fontWeight: 400,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  lineHeight: 1.5,
                  maxWidth: '280px'
                }}>Nasze kroki do stworzenia Twojego prestiżowego serwisu.</span>
              </div>
            </span>
            <span className="hidden sm:inline-grid text-left">
              <span className="invisible col-start-1 row-start-1 select-none whitespace-pre" aria-hidden="true">TWORZYMY TO</span>
              <span className="col-start-1 row-start-1 flex flex-col w-full">
                <span className="text-left">ZOBACZ</span>
                <span className="flex justify-between items-center w-full">
                  <div className="text-left flex flex-col">
                    <span style={{
                      fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
                      fontFamily: 'Inter Tight, sans-serif',
                      fontWeight: 700,
                      lineHeight: 1.2,
                      textTransform: 'none',
                      letterSpacing: 'normal'
                    }}>4 kluczowe etapy</span>
                    <span className="mt-2" style={{
                      fontSize: '.75rem',
                      fontFamily: 'Geist Mono, monospace',
                      fontWeight: 400,
                      letterSpacing: '.2em',
                      textTransform: 'uppercase',
                      maxWidth: '280px',
                      lineHeight: 1.5
                    }}>Nasze kroki do stworzenia Twojego prestiżowego serwisu.</span>
                  </div>
                  <span className="text-right">PROCES.</span>
                </span>
              </span>
            </span>
          </h2>
        </div>
      </section>

      {/* Section 5: Process Stages (Stacking Cards) */}
      <section className="relative w-full bg-white text-black z-10">
        {processStages.map((stage, index) => (
          <div 
            key={stage.id} 
            className="sticky top-[72px] h-[calc(100vh-72px)] w-full bg-white flex flex-col"
            style={{ zIndex: 20 + index }}
          >
            <div className="max-w-[100rem] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex flex-col">
              {/* Top Line - The only separator */}
              <div className="w-full h-[1px] bg-black/10" />
              
              <div className="flex-1 flex flex-col justify-center py-12 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <h2 className="text-[clamp(3rem,10vw,8rem)] font-bold font-inter-tight leading-none tracking-tighter">
                    {stage.title}
                  </h2>
                  
                  <div className="space-y-8 max-w-[35em] lg:ml-auto">
                    {stage.paragraphs.map((p, i) => (
                      <p key={i} className="text-[clamp(1rem,1.2vw,1.375rem)] font-inter-tight font-light leading-relaxed text-[#363636]">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-auto flex items-end justify-between pb-8">
                  <span className="text-sm font-mono text-black/40">{stage.id}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Section 6: Technologies */}
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

      {/* FAQ Section */}
      <section className="bg-white py-[6.25rem] lg:py-[12.5rem]">
        <div className="mx-[1.875rem] flex flex-col lg:flex-row justify-between gap-12 lg:gap-[2rem]">
          {/* Sticky Left Box */}
          <div className="lg:w-[480px]">
            <div className="lg:sticky lg:top-[100px] bg-[#F3DEFF] p-[1.5625rem] rounded-[20px] h-fit">
              <h2 className="text-[2.5rem] lg:text-[3.2rem] font-inter-tight font-normal leading-[1.05] mb-6 text-black">
                Szukasz Pewnego Partnera Technicznego?
              </h2>
              <p className="text-black/60 text-lg mb-10">
                Zbudujmy Coś, Co Działa Idealnie.
              </p>
              <button 
                onClick={onContactClick}
                className="bg-white/20 hover:bg-white/30 text-black px-8 py-4 rounded-full transition-colors text-sm font-medium border border-black/10"
              >
                Pytaj śmiało!
              </button>
            </div>
          </div>

          {/* Accordion Right Side */}
          <div className="flex-1">
            <div className="flex flex-col">
              {faqItems.map((item, index) => (
                <div key={index} className="border-t border-[#d9d9d9] last:border-b">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full py-8 flex justify-between items-center text-left group"
                  >
                    <span className="text-xl lg:text-2xl font-inter-tight font-normal text-black pr-8">
                      {item.question}
                    </span>
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 flex items-center justify-center relative">
                        <motion.div 
                          animate={{ rotate: openIndex === index ? 90 : 0 }}
                          className="absolute w-4 h-[1px] bg-black"
                        />
                        <motion.div 
                          animate={{ rotate: openIndex === index ? 0 : 90 }}
                          className="absolute w-4 h-[1px] bg-black"
                        />
                      </div>
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 text-black/60 text-lg leading-relaxed max-w-[800px]">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      <section className="bg-black pt-5 pb-[6.25rem] lg:pb-[12.5rem] related-projects text-white">
        <div>
          <div className="flex flex-col items-start mb-5 px-6 lg:px-[1.875rem]">
            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-inter-tight font-normal text-white text-left leading-[0.9] sm:leading-tight">
              Powiązane projekty
            </h2>
          </div>
          <div 
            ref={scrollRef}
            className="slider-related-projects max-w-full m-auto flex overflow-x-auto gap-4 lg:gap-[1.5rem] pb-8 scrollbar-hide snap-x snap-mandatory pl-6 pr-0 lg:px-[1.875rem] scroll-pl-6 lg:scroll-px-[1.875rem]"
          >
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="flex-shrink-0 w-[88%] lg:w-[45%] aspect-square rounded-[20px] overflow-hidden snap-start relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                <ProjectImage 
                  src={`https://picsum.photos/seed/project${i}/1200/1200`}
                  alt={`Project ${i}`}
                />
                <div className="absolute bottom-8 left-8 z-20">
                  <p className="text-white text-sm font-medium uppercase tracking-wider mb-2 opacity-80">
                    Case Study
                  </p>
                  <h3 className="text-white text-3xl font-inter-tight font-normal">
                    Project Name {i}
                  </h3>
                </div>
              </div>
            ))}
            {/* Spacer to allow the last item to have some breathing room on the right when scrolled */}
            <div className="flex-shrink-0 w-6 lg:hidden" />
          </div>
          
          {/* Navigation Arrows - Moved below and centered */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={() => scroll('left')}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Duplicated Contact Section */}
      <section className="min-h-screen bg-black text-white flex flex-col items-center justify-between p-6 relative overflow-hidden">
        {/* Spacer for top since no navbar */}
        <div className="h-20 w-full"></div>

        {/* Curved Text Container */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden -translate-y-20 sm:translate-y-0">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible scale-[1.4] sm:scale-100">
            <path id="curve-bottom-offer" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
            <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <motion.textPath 
                xlinkHref="#curve-bottom-offer" 
                animate={{ startOffset: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-[100px] sm:text-[150px] font-black text-white uppercase tracking-[0.01em] fill-white font-bebas"
              >
                {"SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
          <span className="text-white/60 text-sm tracking-widest uppercase">KONTAKT</span>
          <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">Gotów, by stworzyć coś niepowtarzalnego?</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={() => {}} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">Wystartuj teraz</button>
            <button onClick={onContactClick} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">Pytaj śmiało!</button>
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
      </section>
    </div>
  );
}
