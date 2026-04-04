import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, Check, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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

export function AdsOfferPage({ onBack, onContactClick, onAskAwayClick }: { onBack: () => void; onContactClick: () => void; onAskAwayClick: () => void }) {
  const { lang } = useLanguage();
  const offerScrollRef = useRef<HTMLDivElement>(null);

  const scrollOffer = (direction: 'left' | 'right') => {
    if (offerScrollRef.current) {
      const { scrollLeft, clientWidth } = offerScrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      offerScrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const boxes = lang === 'PL' ? [
    { 
      title: <>Kampanie Google Ads<br />(Search & Shopping)</>, 
      desc: 'Precyzyjne dotarcie do klientów, którzy szukają Twoich produktów lub usług w wyszukiwarce Google.',
      points: [
        'Dobór słów kluczowych',
        'Kampanie produktowe (Merchant)',
        'Optymalizacja stawek (ROAS)',
        'Wykluczanie nietrafnych fraz',
        'Analityka konwersji',
        'Raporty miesięczne'
      ],
      bgColor: '#F3DEFF'
    },
    { 
      title: <>Kampanie Meta Ads<br />(Facebook & Instagram)</>, 
      desc: 'Budowanie świadomości i generowanie sprzedaży poprzez atrakcyjne reklamy w mediach społecznościowych.',
      points: [
        'Targetowanie behawioralne',
        'Reklamy wideo i karuzele',
        'Retargeting (Pixel Meta)',
        'Testy A/B kreacji',
        'Skalowanie budżetów',
        'Wsparcie przy grafikach'
      ],
      bgColor: '#F3DEFF'
    },
    { 
      title: <>Lejki Sprzedażowe<br />& Omnichannel</>, 
      desc: 'Połączone działania w wielu kanałach, które prowadzą klienta od pierwszego kontaktu do zakupu.',
      points: [
        'Strategia wielokanałowa',
        'Zaawansowany remarketing',
        'Analityka ścieżki klienta',
        'Optymalizacja LTV',
        'Integracja z CRM',
        'Ciągłe testy i poprawki'
      ],
      bgColor: '#F3DEFF'
    },
    { 
      title: <>Audyt & Strategia<br />Marketingowa</>, 
      desc: 'Dogłębna analiza Twoich obecnych działań i przygotowanie planu na skalowanie biznesu.',
      points: [
        'Analiza konkurencji',
        'Weryfikacja analityki',
        'Wskazanie wąskich gardeł',
        'Planowanie budżetów',
        'Dobór kanałów dotarcia',
        'Konsultacje 1-na-1'
      ],
      bgColor: '#F3DEFF'
    }
  ] : [
    { 
      title: <>Google Ads Campaigns<br />(Search & Shopping)</>, 
      desc: 'Precise targeting of customers who are looking for your products or services in the Google search engine.',
      points: [
        'Keyword selection',
        'Product campaigns (Merchant)',
        'Bid optimization (ROAS)',
        'Excluding irrelevant phrases',
        'Conversion analytics',
        'Monthly reports'
      ],
      bgColor: '#F3DEFF'
    },
    { 
      title: <>Meta Ads Campaigns<br />(Facebook & Instagram)</>, 
      desc: 'Building awareness and generating sales through attractive ads in social media.',
      points: [
        'Behavioral targeting',
        'Video and carousel ads',
        'Retargeting (Meta Pixel)',
        'A/B testing of creatives',
        'Budget scaling',
        'Support with graphics'
      ],
      bgColor: '#F3DEFF'
    },
    { 
      title: <>Sales Funnels<br />& Omnichannel</>, 
      desc: 'Combined activities in many channels that lead the customer from the first contact to purchase.',
      points: [
        'Multichannel strategy',
        'Advanced remarketing',
        'Customer path analytics',
        'LTV optimization',
        'CRM integration',
        'Continuous testing and corrections'
      ],
      bgColor: '#F3DEFF'
    },
    { 
      title: <>Audit & Marketing<br />Strategy</>, 
      desc: 'In-depth analysis of your current activities and preparation of a plan to scale your business.',
      points: [
        'Competition analysis',
        'Analytics verification',
        'Indicating bottlenecks',
        'Budget planning',
        'Selection of reach channels',
        '1-on-1 consultations'
      ],
      bgColor: '#F3DEFF'
    }
  ];

  const processStages = lang === 'PL' ? [
    {
      id: '01',
      title: 'Audyt & Analiza',
      paragraphs: [
        "Zaczynamy od sprawdzenia Twoich obecnych działań i analityki. Szukamy miejsc, gdzie tracisz budżet i identyfikujemy największe szanse na wzrost.",
        "Analizujemy konkurencję i ich strategie reklamowe, aby znaleźć Twoją przewagę.",
        "Efektem jest jasna strategia i dobór odpowiednich kanałów dotarcia."
      ]
    },
    {
      id: '02',
      title: 'Konfiguracja & Kreacja',
      paragraphs: [
        "Przygotowujemy strukturę kont reklamowych, wdrażamy kody śledzące (Pixel, GTM) i tworzymy atrakcyjne kreacje wizualne.",
        "Każda reklama jest projektowana tak, aby przyciągać wzrok i skłaniać do konkretnego działania.",
        "Ustawiamy zaawansowane grupy odbiorców oparte na Twoich danych i zainteresowaniach."
      ]
    },
    {
      id: '03',
      title: 'Start & Optymalizacja',
      paragraphs: [
        "Odpalamy kampanie i od pierwszej minuty monitorujemy ich wyniki. Nie zostawiamy reklam samym sobie – codziennie optymalizujemy stawki i wykluczamy nietrafne wyświetlenia.",
        "Testujemy różne warianty nagłówków, grafik i tekstów, aby znaleźć te najbardziej dochodowe."
      ]
    },
    {
      id: '04',
      title: 'Skalowanie & Raportowanie',
      paragraphs: [
        "Gdy znajdziemy zwycięskie kombinacje, zaczynamy skalować budżety, aby dostarczać Ci jeszcze więcej klientów przy zachowaniu rentowności.",
        "Otrzymujesz od nas przejrzyste raporty z konkretnymi wynikami: ile wydaliśmy i ile zarobiłeś.",
        "Stale szukamy nowych dróg rozwoju Twojego marketingu."
      ]
    }
  ] : [
    {
      id: '01',
      title: 'Audit & Analysis',
      paragraphs: [
        "We start by checking your current activities and analytics. We look for places where you lose your budget and identify the biggest opportunities for growth.",
        "We analyze the competition and their advertising strategies to find your advantage.",
        "The result is a clear strategy and the selection of appropriate reach channels."
      ]
    },
    {
      id: '02',
      title: 'Configuration & Creation',
      paragraphs: [
        "We prepare the structure of advertising accounts, implement tracking codes (Pixel, GTM) and create attractive visual creations.",
        "Each ad is designed to catch the eye and encourage specific action.",
        "We set up advanced audience groups based on your data and interests."
      ]
    },
    {
      id: '03',
      title: 'Start & Optimization',
      paragraphs: [
        "We launch campaigns and monitor their results from the first minute. We do not leave ads to themselves - we optimize bids every day and exclude irrelevant impressions.",
        "We test different variants of headlines, graphics and texts to find the most profitable ones."
      ]
    },
    {
      id: '04',
      title: 'Scaling & Reporting',
      paragraphs: [
        "When we find winning combinations, we start scaling budgets to provide you with even more customers while maintaining profitability.",
        "You receive clear reports from us with specific results: how much we spent and how much you earned.",
        "We are constantly looking for new ways to develop your marketing."
      ]
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = lang === 'PL' ? [
    {
      question: "Jaki budżet reklamowy jest potrzebny na start?",
      answer: "Budżet zależy od branży i konkurencji. Zazwyczaj rekomendujemy minimum 1500-2000 PLN miesięcznie na same kliknięcia, aby zebrać odpowiednią ilość danych do optymalizacji. Nasze wynagrodzenie jest ustalane oddzielnie."
    },
    {
      question: "Kiedy zobaczę pierwsze efekty kampanii?",
      answer: "W przypadku Google Ads efekty (ruch i zapytania) mogą pojawić się już w pierwszym dniu po uruchomieniu. Kampanie Meta Ads potrzebują zazwyczaj 2-3 dni na fazę uczenia się algorytmów."
    },
    {
      question: "Czy muszę mieć własne grafiki do reklam?",
      answer: "Nie jest to konieczne. W ramach współpracy możemy przygotować profesjonalne kreacje graficzne i wideo dopasowane do specyfiki danego kanału reklamowego."
    },
    {
      question: "Jak mierzycie skuteczność działań?",
      answer: "Skupiamy się na twardych danych: liczbie zapytań, sprzedaży w sklepie, koszcie pozyskania klienta (CPA) oraz zwrocie z inwestycji (ROAS). Wszystko widzisz w panelu analitycznym."
    }
  ] : [
    {
      question: "What advertising budget is needed to start?",
      answer: "The budget depends on the industry and competition. We usually recommend a minimum of 1500-2000 PLN per month for clicks alone to collect the right amount of data for optimization. Our remuneration is determined separately."
    },
    {
      question: "When will I see the first effects of the campaign?",
      answer: "In the case of Google Ads, the effects (traffic and inquiries) may appear on the first day after launch. Meta Ads campaigns usually need 2-3 days for the algorithm learning phase."
    },
    {
      question: "Do I need to have my own graphics for ads?",
      answer: "It is not necessary. As part of our cooperation, we can prepare professional graphic and video creations tailored to the specificity of a given advertising channel."
    },
    {
      question: "How do you measure the effectiveness of activities?",
      answer: "We focus on hard data: the number of inquiries, store sales, customer acquisition cost (CPA) and return on investment (ROAS). You see everything in the analytical panel."
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

      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pt-40 lg:pt-48 pb-16 lg:pb-12 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <h1 
            className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,24rem)] font-humane font-black text-white leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full"
            style={{ marginBottom: 'calc(-0.04em + 10px)' }}
          >
            {/* Mobile subtext */}
            <div 
              className="sm:hidden text-white text-left"
              style={{ 
                marginBottom: '3.125rem',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '8px',
                fontSize: '.8125rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: '11.5em',
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 400,
                letterSpacing: '-.01em',
                lineHeight: '1.2',
                textTransform: 'none',
                whiteSpace: 'normal',
                zIndex: 10
              }}
            >
              {lang === 'PL' ? (
                <>Precyzyjne dotarcie. Stały zysk.<br />Skuteczne kampanie i pełna analityka.</>
              ) : (
                <>Precise reach. Steady profit.<br />Effective campaigns and full analytics.</>
              )}
            </div>

            <div className="flex flex-col items-start">
              <div className="flex flex-row items-end justify-start gap-8 lg:gap-16 flex-nowrap">
                <span className="whitespace-nowrap">{lang === 'PL' ? 'BUDŻETY,' : 'BUDGETS,'}<br className="sm:hidden" /><span className="hidden sm:inline"> </span>{lang === 'PL' ? 'KTÓRE' : 'THAT'}</span>
                
                {/* Desktop subtext - Visible on Large Screens next to "KTÓRE" */}
                <div 
                  className="hidden 2xl:block text-left mb-[0.5vw] flex-shrink-0 ml-12"
                  style={{ 
                    fontSize: 'clamp(0.4rem, 0.3rem + 0.6vw, 1.2rem)',
                    fontFamily: 'Inter Tight, sans-serif',
                    fontWeight: '300',
                    lineHeight: '1.2',
                    textTransform: 'none',
                    letterSpacing: '0.05em',
                    color: '#e2e8f0'
                  }}
                >
                  {lang === 'PL' ? (
                    <>Precyzyjne dotarcie. Stały zysk.<br />Skuteczne kampanie i pełna analityka.</>
                  ) : (
                    <>Precise reach. Steady profit.<br />Effective campaigns and full analytics.</>
                  )}
                </div>
              </div>
              
              <div className="flex flex-row items-center justify-start gap-8 flex-nowrap">
                <span className="whitespace-nowrap">{lang === 'PL' ? 'WRACAJĄ.' : 'RETURN.'}</span>
                
                {/* Tablet subtext - Visible on Medium Screens next to "WRACAJĄ" to avoid overlap */}
                <div 
                  className="hidden sm:block 2xl:hidden text-left flex-shrink-0 ml-4"
                  style={{ 
                    fontSize: 'clamp(0.4rem, 0.3rem + 0.6vw, 1.2rem)',
                    fontFamily: 'Inter Tight, sans-serif',
                    fontWeight: '300',
                    lineHeight: '1.2',
                    textTransform: 'none',
                    letterSpacing: '0.05em',
                    color: '#e2e8f0'
                  }}
                >
                  {lang === 'PL' ? (
                    <>Precyzyjne dotarcie. Stały zysk.<br />Skuteczne kampanie i pełna analityka.</>
                  ) : (
                    <>Precise reach. Steady profit.<br />Effective campaigns and full analytics.</>
                  )}
                </div>
              </div>
            </div>
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
              {lang === 'PL' ? 'Zaawansowane systemy reklamowe, które docierają do Twoich klientów dokładnie tam, gdzie spędzają czas.' : 'Advanced advertising systems that reach your customers exactly where they spend their time.'}
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
                {lang === 'PL' ? 'Nie przepalaj budżetu na przypadkowe działania. Tworzymy kampanie oparte na danych, które precyzyjnie trafiają w potrzeby Twoich odbiorców.' : 'Do not burn your budget on random activities. We create data-driven campaigns that precisely meet the needs of your audience.'}
              </p>
              <p>
                {lang === 'PL' ? 'Łączymy potencjał wyszukiwarki Google z zasięgami Facebooka i Instagrama, budując spójną strategię omnichannel, która domyka sprzedaż.' : 'We combine the potential of the Google search engine with the reach of Facebook and Instagram, building a coherent omnichannel strategy that closes sales.'}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative w-full py-24 z-10 bg-white text-black">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[100rem] mx-auto">
          <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-black mb-12 tracking-tight leading-[0.9] sm:leading-tight">
            {lang === 'PL' ? 'Zobacz naszą ofertę' : 'See our offer'}
          </h2>
        </div>
          
          <div 
            ref={offerScrollRef}
            className="flex flex-row flex-nowrap gap-4 lg:gap-6 mb-12 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-4 sm:pl-6 lg:pl-24 xl:pl-40"
          >
            {boxes.map((box, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-[85vw] sm:w-[500px] md:w-[600px] lg:w-[700px] snap-center relative rounded-3xl aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/9] overflow-hidden flex flex-col group transition-all duration-500 p-6 sm:p-10 lg:p-12"
                style={{ backgroundColor: box.bgColor }}
              >
                <div className="flex flex-col h-full justify-between items-start relative z-10">
                  <div className="w-full">
                    <h3 
                      className="text-black text-left mb-4 sm:mb-6"
                      style={{
                        fontWeight: 400,
                        fontSize: 'clamp(1.75rem, 8vw, 4.5rem)',
                        fontFamily: 'Inter Tight, sans-serif',
                        lineHeight: 0.9,
                        letterSpacing: '-0.04em'
                      }}
                    >
                      {box.title}
                    </h3>
                    <p 
                      className="text-black/80 text-left"
                      style={{
                        fontSize: 'clamp(0.9rem, 3.5vw, 1.35rem)',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        lineHeight: 1.3,
                        maxWidth: '95%'
                      }}
                    >
                      {box.desc}
                    </p>
                  </div>
                  <button 
                    onClick={onContactClick}
                    className="text-black text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] border-b-2 border-black/20 pb-1 hover:border-black transition-all w-fit mt-4 sm:mt-6 lg:mt-10"
                  >
                    {lang === 'PL' ? 'ZOBACZ OFERTĘ' : 'SEE OFFER'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-2 sm:mt-4 px-4">
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  const container = offerScrollRef.current;
                  if (container && container.children.length > 0) {
                    const firstChild = container.children[0] as HTMLElement;
                    const gap = window.innerWidth >= 1024 ? 24 : 16;
                    const scrollAmount = firstChild.offsetWidth + gap;
                    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                  }
                }} 
                className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-all duration-300 ease-out"
              >
                <ChevronLeft className="w-6 h-6 text-black" strokeWidth={1.5} />
              </button>
              <button 
                onClick={() => {
                  const container = offerScrollRef.current;
                  if (container && container.children.length > 0) {
                    const firstChild = container.children[0] as HTMLElement;
                    const gap = window.innerWidth >= 1024 ? 24 : 16;
                    const scrollAmount = firstChild.offsetWidth + gap;
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                  }
                }} 
                className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-all duration-300 ease-out"
              >
                <ChevronRight className="w-6 h-6 text-black" strokeWidth={1.5} />
              </button>
            </div>
          </div>
      </section>

      <section className="relative z-10 w-full bg-white text-black">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-[6.25rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 items-center">
            <h2 className="text-black font-normal leading-[1.2] max-w-[12em] font-inter-tight" style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)' }}>
              {lang === 'PL' ? 'Reklama to nie koszt, to inwestycja. Każda złotówka wydana na marketing musi pracować na Twój zysk.' : 'Advertising is not a cost, it is an investment. Every zloty spent on marketing must work for your profit.'}
            </h2>
            <div className="text-[#363636] lg:col-start-2 max-w-[27.5em] lg:ml-auto font-inter-tight font-light leading-[1.2] tracking-[.02em]" style={{ fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)' }}>
              {lang === 'PL' ? 'Skupiamy się na twardych wynikach. Nie interesują nas puste polubienia, ale realna sprzedaż i zapytania ofertowe. Dzięki ciągłej optymalizacji i testom, wyciskamy maksimum z każdego budżetu reklamowego.' : 'We focus on hard results. We are not interested in empty likes, but real sales and inquiries. Thanks to continuous optimization and testing, we squeeze the maximum out of every advertising budget.'}
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
                <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2 }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                <span className="mt-2 text-left" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 400, letterSpacing: '.2em', textTransform: 'uppercase', lineHeight: 1.5, maxWidth: '280px' }}>{lang === 'PL' ? 'Nasze kroki do stworzenia Twoich dochodowych kampanii.' : 'Our steps to create your profitable campaigns.'}</span>
              </div>
            </span>
            <span className="hidden sm:inline-grid text-left">
              <span className="col-start-1 row-start-1 flex flex-col w-full">
                <span className="text-left">{lang === 'PL' ? 'ZOBACZ' : 'SEE THE'}</span>
                <span className="flex justify-between items-center w-full">
                  <div className="text-left flex flex-col">
                    <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2 }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                    <span className="mt-2" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 400, letterSpacing: '.2em', textTransform: 'uppercase', maxWidth: '280px', lineHeight: 1.5 }}>{lang === 'PL' ? 'Nasze kroki do stworzenia Twoich dochodowych kampanii.' : 'Our steps to create your profitable campaigns.'}</span>
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

      <section className="bg-white py-[6.25rem] lg:py-[12.5rem]">
        <div className="mx-[1.875rem] flex flex-col lg:flex-row justify-between gap-12 lg:gap-[2rem]">
          <div className="lg:w-[480px]">
            <div className="lg:sticky lg:top-[100px] bg-[#e8f0fe] p-[1.5625rem] rounded-[20px] h-fit">
              <h2 className="text-[2.5rem] lg:text-[3.2rem] font-inter-tight font-normal leading-[1.05] mb-6 text-black">{lang === 'PL' ? 'Zacznij Skalować Swoją Sprzedaż' : 'Start Scaling Your Sales'}</h2>
              <p className="text-black/60 text-lg mb-10">{lang === 'PL' ? 'Twoje kampanie czekają na odpalenie.' : 'Your campaigns are waiting to be launched.'}</p>
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

      <section className="bg-black pt-5 pb-[6.25rem] lg:pb-[12.5rem] related-projects text-white">
        <div>
          <div className="flex flex-col items-start mb-5 px-6 lg:px-[1.875rem]">
            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-inter-tight font-normal text-white text-left leading-[0.9] sm:leading-tight">{lang === 'PL' ? 'Powiązane projekty' : 'Related projects'}</h2>
          </div>
          <div ref={scrollRef} className="slider-related-projects max-w-full m-auto flex overflow-x-auto gap-4 lg:gap-[1.5rem] pb-8 scrollbar-hide snap-x snap-mandatory pl-6 pr-0 lg:px-[1.875rem] scroll-pl-6 lg:scroll-px-[1.875rem]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 w-[88%] lg:w-[45%] aspect-square rounded-[20px] overflow-hidden snap-start relative group cursor-pointer">
                <ProjectImage src={`https://picsum.photos/seed/ads${i}/1200/1200`} alt={`Project ${i}`} />
                <div className="absolute bottom-8 left-8 z-20">
                  <p className="text-white text-sm font-medium uppercase tracking-wider mb-2 opacity-80">Marketing Ads</p>
                  <h3 className="text-white text-3xl font-inter-tight font-normal">Ads Campaign {i}</h3>
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
            <path id="curve-bottom-offer-ads" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
            <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <motion.textPath xlinkHref="#curve-bottom-offer-ads" animate={{ startOffset: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="text-[100px] sm:text-[150px] font-black text-white uppercase tracking-[0.01em] fill-white font-bebas">
                {lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
          <span className="text-white/60 text-sm tracking-widest uppercase">{lang === 'PL' ? 'KONTAKT' : 'CONTACT'}</span>
          <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">{lang === 'PL' ? 'Gotów, by odpalić swoje kampanie?' : 'Ready to launch your campaigns?'}</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={() => {}} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}</button>
            <button onClick={onAskAwayClick} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}</button>
          </div>
        </div>
        <footer className="w-full flex justify-between items-end z-20 pb-4">
          <div className="text-sm">
            <p className="font-bold">{lang === 'PL' ? 'POLAND' : 'POLAND'}</p>
            <p className="text-white/60">{lang === 'PL' ? 'Lubelskie, Lublin - Tutaj jesteśmy. Działamy na całym świecie.' : 'Lubelskie, Lublin - We are here. We operate worldwide.'}</p>
          </div>
          <div className="w-32"></div>
        </footer>
      </section>
    </div>
  );
}
