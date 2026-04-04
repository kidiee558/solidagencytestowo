import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, Check, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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

export function SeoOfferPage({ onBack, onContactClick, onAskAwayClick }: { onBack: () => void; onContactClick: () => void; onAskAwayClick: () => void }) {
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
      title: <>Audyt SEO<br />& Optymalizacja</>, 
      desc: 'Fundament widoczności. Naprawiamy błędy techniczne, które blokują Twoją stronę przed wysokimi pozycjami.',
      points: [
        'Analiza techniczna strony',
        'Optymalizacja szybkości ładowania',
        'Struktura nagłówków i treści',
        'Optymalizacja meta tagów',
        'Weryfikacja indeksowania',
        'Raport zaleceń wdrożeniowych'
      ],
      bgColor: '#F3DEFF'
    },
    { 
      title: <>Pozycjonowanie<br />Lokalne</>, 
      desc: 'Zdominuj wyniki wyszukiwania w swoim mieście. Idealne dla firm usługowych działających stacjonarnie.',
      points: [
        'Optymalizacja Wizytówki Google',
        'Dobór fraz kluczowych dla regionu',
        'Budowanie lokalnego autorytetu',
        'Strategia pozyskiwania opinii',
        'Monitoring pozycji w Twoim mieście',
        'Raporty z przyrostu nowych klientów'
      ],
      bgColor: '#F3DEFF'
    },
    { 
      title: <>SEO E-commerce<br />& Content Marketing</>, 
      desc: 'Zwiększ ruch organiczny w swoim sklepie. Tworzymy treści, które sprzedają i budują autorytet Twojej marki.',
      points: [
        'Dobór fraz o najwyższej konwersji',
        'Prowadzenie bloga firmowego',
        'Budowanie autorytetu (Digital PR)',
        'Pakiet tekstów sprzedażowych',
        'Przejmowanie ruchu konkurencji',
        'Raport zysków z kanału SEO'
      ],
      bgColor: '#F3DEFF'
    },
    { 
      title: <>Zaawansowana<br />Strategia SEO</>, 
      desc: 'Kompleksowe podejście dla dużych portali i wymagających branż. Skalowanie ruchu na szeroką skalę.',
      points: [
        'Analiza luk w treściach',
        'Zaawansowany Link Building',
        'Wsparcie techniczne SEO',
        'Analiza logów i wydajności serwera',
        'SEO międzynarodowe',
        'Dedykowany opiekun projektu'
      ],
      bgColor: '#F3DEFF'
    }
  ] : [
    { 
      title: <>SEO Audit<br />& Optimization</>, 
      desc: 'The foundation of visibility. We fix technical errors that block your website from high positions.',
      points: [
        'Technical analysis of the website',
        'Loading speed optimization',
        'Structure of headings and content',
        'Meta tags optimization',
        'Indexing verification',
        'Implementation recommendations report'
      ],
      bgColor: '#F3DEFF'
    },
    { 
      title: <>Local<br />Positioning</>, 
      desc: 'Dominate search results in your city. Perfect for service companies operating stationary.',
      points: [
        'Google Business Profile optimization',
        'Selection of key phrases for the region',
        'Building local authority',
        'Opinion acquisition strategy',
        'Position monitoring in your city',
        'Reports on the increase of new customers'
      ],
      bgColor: '#F3DEFF'
    },
    { 
      title: <>E-commerce SEO<br />& Content Marketing</>, 
      desc: 'Increase organic traffic in your store. We create content that sells and builds your brand authority.',
      points: [
        'Selection of phrases with the highest conversion',
        'Running a company blog',
        'Building authority (Digital PR)',
        'Sales texts package',
        'Taking over competitors traffic',
        'SEO channel profit report'
      ],
      bgColor: '#F3DEFF'
    },
    { 
      title: <>Advanced<br />SEO Strategy</>, 
      desc: 'A comprehensive approach for large portals and demanding industries. Scaling traffic on a large scale.',
      points: [
        'Content gap analysis',
        'Advanced Link Building',
        'SEO technical support',
        'Log and server performance analysis',
        'International SEO',
        'Dedicated project manager'
      ],
      bgColor: '#F3DEFF'
    }
  ];

  const processStages = lang === 'PL' ? [
    {
      id: '01',
      title: 'Audyt & Strategia',
      paragraphs: [
        "Dogłębnie analizujemy Twoją witrynę pod kątem technicznym i treściowym. Sprawdzamy, na jakie frazy widoczna jest konkurencja i gdzie leży Twój potencjał.",
        "Efektem jest szczegółowy plan działań (Roadmap), który krok po kroku prowadzi do wyższych pozycji w Google.",
        "Dobieramy słowa kluczowe, które realnie przekładają się na zapytania i sprzedaż."
      ]
    },
    {
      id: '02',
      title: 'Optymalizacja On-Page',
      paragraphs: [
        "Wdrażamy zmiany techniczne: poprawiamy szybkość ładowania, strukturę nagłówków, meta tagi i linkowanie wewnętrzne.",
        "Optymalizujemy treści tak, aby były przyjazne zarówno dla robotów Google, jak i dla użytkowników.",
        "Dbamy o to, aby Twoja strona była w pełni zrozumiała dla algorytmów wyszukiwarki."
      ]
    },
    {
      id: '03',
      title: 'Content & Link Building',
      paragraphs: [
        "Tworzymy wartościowe treści, które budują Twój autorytet w branży. Pozyskujemy wysokiej jakości linki z zaufanych serwisów zewnętrznych.",
        "Działamy etycznie (White Hat SEO), dbając o długofalowe i stabilne wyniki Twojej domeny.",
        "Budujemy profil linkowy, który wzmacnia siłę Twojej strony w oczach Google."
      ]
    },
    {
      id: '04',
      title: 'Monitoring & Raportowanie',
      paragraphs: [
        "Stale monitorujemy pozycje Twoich słów kluczowych i ruch na stronie. Analizujemy dane i na ich podstawie wprowadzamy kolejne optymalizacje.",
        "Otrzymujesz od nas comiesięczne raporty, w których czarno na białym widzisz postępy i wzrost widoczności.",
        "SEO to proces – my dbamy o to, abyś zawsze był o krok przed konkurencją."
      ]
    }
  ] : [
    {
      id: '01',
      title: 'Audit & Strategy',
      paragraphs: [
        "We deeply analyze your site in terms of technical and content aspects. We check which phrases the competition is visible for and where your potential lies.",
        "The result is a detailed action plan (Roadmap) that leads step by step to higher positions in Google.",
        "We select keywords that realistically translate into inquiries and sales."
      ]
    },
    {
      id: '02',
      title: 'On-Page Optimization',
      paragraphs: [
        "We implement technical changes: we improve loading speed, heading structure, meta tags, and internal linking.",
        "We optimize content so that it is friendly to both Google robots and users.",
        "We make sure your site is fully understandable to search engine algorithms."
      ]
    },
    {
      id: '03',
      title: 'Content & Link Building',
      paragraphs: [
        "We create valuable content that builds your authority in the industry. We acquire high-quality links from trusted external services.",
        "We act ethically (White Hat SEO), taking care of the long-term and stable results of your domain.",
        "We build a link profile that strengthens your site's power in the eyes of Google."
      ]
    },
    {
      id: '04',
      title: 'Monitoring & Reporting',
      paragraphs: [
        "We constantly monitor your keyword positions and site traffic. We analyze data and implement further optimizations based on it.",
        "You receive monthly reports from us, in which you see progress and visibility growth in black and white.",
        "SEO is a process – we make sure you are always one step ahead of the competition."
      ]
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = lang === 'PL' ? [
    {
      question: "Jak długo trzeba czekać na pierwsze efekty SEO?",
      answer: "SEO to proces długofalowy. Pierwsze zmiany w indeksowaniu (po Audycie i Optymalizacji) zobaczysz już po 2-4 tygodniach. Jednak realny wzrost ruchu i pozycji, który przekłada się na sprzedaż, następuje zazwyczaj po 3-6 miesiącach regularnych działań. Wszystko zależy od konkurencyjności branży i historii Twojej domeny."
    },
    {
      question: "Czy gwarantujecie 1. miejsce w Google?",
      answer: "Nikt, kto działa etycznie, nie może dać 100% gwarancji na konkretną pozycję, ponieważ algorytmy Google zmieniają się codziennie. Gwarantujemy natomiast skuteczne wdrożenie strategii, która systematycznie podnosi widoczność strony, zwiększa autorytet domeny i realnie przybliża Cię do topowych wyników na najważniejsze frazy sprzedażowe."
    },
    {
      question: "Czym różni się SEO od Google Ads (płatnych reklam)?",
      answer: "Google Ads to natychmiastowa widoczność, ale płacisz za każde kliknięcie – gdy budżet się kończy, znikasz. SEO (Pozycjonowanie) to budowanie trwałego kapitału. Raz wypracowane wysokie pozycje generują darmowy, wartościowy ruch przez całą dobę, nawet jeśli na chwilę wstrzymasz działania."
    },
    {
      question: "Czy muszę stale płacić za SEO (abonament)?",
      answer: "Audyt techniczny jest jednorazowy, ale pozycjonowanie to ciągły wyścig. Twoja konkurencja nie śpi i stale publikuje nowe treści oraz zdobywa linki. Miesięczny abonament pozwala nam na stałe monitorowanie zmian, regularny Link Building i dostosowywanie strony do aktualizacji algorytmów Google, co chroni Cię przed spadkami."
    },
    {
      question: "Co jeśli moja strona jest zupełnie nowa?",
      answer: "Dla nowych stron kluczowy jest startowy Audyt & Optymalizacja. Nowe domeny potrzebują czasu na zdobycie zaufania Google (tzw. Sandbox). Zaczynamy od budowania solidnego fundamentu technicznego i bezpiecznego pozyskiwania linków, aby jak najszybciej wyprowadzić stronę z cienia konkurencji."
    },
    {
      question: "Skąd będę wiedzieć, że pozycjonowanie działa?",
      answer: "Co miesiąc otrzymasz od nas czytelny raport. Nie interesują nas puste wykresy – skupiamy się na realnych wskaźnikach: wzroście widoczności na kluczowe frazy, przyroście ruchu organicznego oraz (w pakiecie E-commerce) monitorowaniu Twoich zysków. Wszystkie dane pochodzą bezpośrednio z Google Search Console i narzędzi analitycznych."
    },
    {
      question: "Czy SEO w wersji Lokalnej wystarczy dla mojego biznesu?",
      answer: "Jeśli prowadzisz firmę usługową (np. salon, warsztat, biuro) i Twoimi klientami są mieszkańcy konkretnego miasta – tak. Skupiamy się wtedy na Optymalizacji Wizytówki Google i frazach lokalnych, co jest tańsze i daje szybszy zwrot z inwestycji niż walka o frazy ogólnopolskie."
    }
  ] : [
    {
      question: "How long do I have to wait for the first SEO effects?",
      answer: "SEO is a long-term process. You will see the first changes in indexing (after the Audit and Optimization) after 2-4 weeks. However, real growth in traffic and positions, which translates into sales, usually occurs after 3-6 months of regular activities. It all depends on the competitiveness of the industry and the history of your domain."
    },
    {
      question: "Do you guarantee 1st place in Google?",
      answer: "No one who acts ethically can give a 100% guarantee for a specific position, because Google algorithms change daily. We guarantee, however, the effective implementation of a strategy that systematically increases the visibility of the site, increases domain authority, and realistically brings you closer to top results for the most important sales phrases."
    },
    {
      question: "What is the difference between SEO and Google Ads (paid ads)?",
      answer: "Google Ads is immediate visibility, but you pay for every click – when the budget ends, you disappear. SEO (Positioning) is building lasting capital. Once developed, high positions generate free, valuable traffic around the clock, even if you pause activities for a while."
    },
    {
      question: "Do I have to pay for SEO constantly (subscription)?",
      answer: "A technical audit is one-time, but positioning is a constant race. Your competition doesn't sleep and constantly publishes new content and gains links. A monthly subscription allows us to constantly monitor changes, regular Link Building, and adapt the site to Google algorithm updates, which protects you from drops."
    },
    {
      question: "What if my site is completely new?",
      answer: "For new sites, the starting Audit & Optimization is key. New domains need time to gain Google's trust (so-called Sandbox). We start by building a solid technical foundation and safe link acquisition to bring the site out of the competition's shadow as quickly as possible."
    },
    {
      question: "How will I know that positioning works?",
      answer: "Every month you will receive a clear report from us. We are not interested in empty charts – we focus on real indicators: growth in visibility for key phrases, increase in organic traffic, and (in the E-commerce package) monitoring your profits. All data comes directly from Google Search Console and analytical tools."
    },
    {
      question: "Is Local SEO enough for my business?",
      answer: "If you run a service company (e.g., salon, workshop, office) and your customers are residents of a specific city – yes. We then focus on Google Business Profile Optimization and local phrases, which is cheaper and gives a faster return on investment than fighting for nationwide phrases."
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
              {lang === 'PL' ? <>Naturalny ruch. Topowe frazy.<br />Trwała widoczność i autorytet.</> : <>Natural traffic. Top phrases.<br />Lasting visibility and authority.</>}
            </div>

            <div className="flex flex-col items-start">
              <div className="flex flex-row items-end justify-start gap-8 lg:gap-16 flex-nowrap">
                <span className="whitespace-nowrap">{lang === 'PL' ? <>POZYCJE,<br className="sm:hidden" /><span className="hidden sm:inline"> </span>KTÓRE</> : <>POSITIONS,<br className="sm:hidden" /><span className="hidden sm:inline"> </span>THAT</>}</span>
                
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
                  {lang === 'PL' ? <>Naturalny ruch. Topowe frazy.<br />Trwała widoczność i autorytet.</> : <>Natural traffic. Top phrases.<br />Lasting visibility and authority.</>}
                </div>
              </div>
              
              <div className="flex flex-row items-center justify-start gap-8 flex-nowrap">
                <span className="whitespace-nowrap">{lang === 'PL' ? 'DOMINUJĄ.' : 'DOMINATE.'}</span>
                
                {/* Tablet subtext - Visible on Medium Screens next to "DOMINUJĄ" to avoid overlap */}
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
                  {lang === 'PL' ? <>Naturalny ruch. Topowe frazy.<br />Trwała widoczność i autorytet.</> : <>Natural traffic. Top phrases.<br />Lasting visibility and authority.</>}
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
              {lang === 'PL' ? 'Kompleksowe działania SEO, które wynoszą Twoją markę na szczyt wyników wyszukiwania.' : 'Comprehensive SEO activities that take your brand to the top of search results.'}
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
                {lang === 'PL' ? 'Wysokie pozycje w Google to nie przypadek. To efekt precyzyjnej optymalizacji technicznej, wartościowej treści i silnego profilu linkowego.' : 'High positions in Google are not an accident. It is the result of precise technical optimization, valuable content, and a strong link profile.'}
              </p>
              <p>
                {lang === 'PL' ? 'Pomagamy firmom stać się liderami w swojej branży, dostarczając darmowy, wysokiej jakości ruch organiczny, który zamienia się w lojalnych klientów.' : 'We help companies become leaders in their industry by delivering free, high-quality organic traffic that turns into loyal customers.'}
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
              {lang === 'PL' ? 'SEO to maraton, nie sprint. Ale to maraton, który wygrywa się dzięki precyzyjnej strategii i konsekwencji.' : 'SEO is a marathon, not a sprint. But it\'s a marathon won through precise strategy and consistency.'}
            </h2>
            <div className="text-[#363636] lg:col-start-2 max-w-[27.5em] lg:ml-auto font-inter-tight font-light leading-[1.2] tracking-[.02em]" style={{ fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)' }}>
              {lang === 'PL' ? 'Nie obiecujemy cudów z dnia na dzień. Obiecujemy rzetelną pracę nad Twoją widocznością, która z każdym miesiącem będzie przynosić coraz więcej wartościowych wejść na stronę. Budujemy Twój najcenniejszy zasób w internecie.' : 'We don\'t promise miracles overnight. We promise reliable work on your visibility, which will bring more and more valuable site visits every month. We build your most valuable asset on the internet.'}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 pt-0 pb-32 bg-white">
        <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
          <h2 className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-black text-black leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full">
            <span className="sm:hidden flex flex-col items-end text-right w-full">
              <span>{lang === 'PL' ? <>ZOBACZ<br />PROCES.</> : <>SEE THE<br />PROCESS.</>}</span>
              <div className="flex flex-col items-start text-left w-[90%]" style={{ position: 'relative', paddingTop: '2.3125rem' }}>
                <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2 }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                <span className="mt-2 text-left" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 400, letterSpacing: '.2em', textTransform: 'uppercase', lineHeight: 1.5, maxWidth: '280px' }}>{lang === 'PL' ? 'Nasze kroki do Twojej dominacji w wyszukiwarce.' : 'Our steps to your search engine dominance.'}</span>
              </div>
            </span>
            <span className="hidden sm:inline-grid text-left">
              <span className="col-start-1 row-start-1 flex flex-col w-full">
                <span className="text-left">{lang === 'PL' ? 'ZOBACZ' : 'SEE THE'}</span>
                <span className="flex justify-between items-center w-full">
                  <div className="text-left flex flex-col">
                    <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2 }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                    <span className="mt-2" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 400, letterSpacing: '.2em', textTransform: 'uppercase', maxWidth: '280px', lineHeight: 1.5 }}>{lang === 'PL' ? 'Nasze kroki do Twojej dominacji w wyszukiwarce.' : 'Our steps to your search engine dominance.'}</span>
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
            <div className="lg:sticky lg:top-[100px] bg-[#F3DEFF] p-[1.5625rem] rounded-[20px] h-fit">
              <h2 className="text-[2.5rem] lg:text-[3.2rem] font-inter-tight font-normal leading-[1.05] mb-6 text-black">{lang === 'PL' ? 'Zbuduj Trwałą Widoczność w Google' : 'Build Lasting Visibility in Google'}</h2>
              <p className="text-black/60 text-lg mb-10">{lang === 'PL' ? 'Twoi klienci już Cię szukają. Pozwól im się znaleźć.' : 'Your customers are already looking for you. Let them find you.'}</p>
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
                <ProjectImage src={`https://picsum.photos/seed/seo${i}/1200/1200`} alt={`Project ${i}`} />
                <div className="absolute bottom-8 left-8 z-20">
                  <p className="text-white text-sm font-medium uppercase tracking-wider mb-2 opacity-80">SEO & Content</p>
                  <h3 className="text-white text-3xl font-inter-tight font-normal">SEO Case Study {i}</h3>
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
            <path id="curve-bottom-offer-seo" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
            <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <motion.textPath xlinkHref="#curve-bottom-offer-seo" animate={{ startOffset: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="text-[100px] sm:text-[150px] font-black text-white uppercase tracking-[0.01em] fill-white font-bebas">
                {lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "GET IN TOUCH GET IN TOUCH GET IN TOUCH GET IN TOUCH GET IN TOUCH GET IN TOUCH "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
          <span className="text-white/60 text-sm tracking-widest uppercase">{lang === 'PL' ? 'KONTAKT' : 'CONTACT'}</span>
          <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">
            {lang === 'PL' ? 'Gotów, by zdominować wyszukiwarkę?' : 'Ready to dominate the search engine?'}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={onContactClick} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">
              {lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}
            </button>
            <button onClick={onAskAwayClick} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">
              {lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}
            </button>
          </div>
        </div>
        <footer className="w-full flex justify-between items-end z-20 pb-4">
          <div className="text-sm">
            <p className="font-bold">POLAND</p>
            <p className="text-white/60">{lang === 'PL' ? 'Lubelskie, Lublin - Tutaj jesteśmy. Działamy na całym świecie.' : 'Lubelskie, Lublin - We are here. We operate worldwide.'}</p>
          </div>
          <div className="w-32"></div>
        </footer>
      </section>
    </div>
  );
}
