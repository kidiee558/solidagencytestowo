import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

export function OnePageOfferPage({ onBack, onContactClick, onAskAwayClick, onStartProjectClick }: { onBack: () => void; onContactClick: () => void; onAskAwayClick: () => void; onStartProjectClick?: () => void }) {
  const { lang } = useLanguage();
  const offerScrollRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const boxes = lang === 'PL' ? [
    { 
      title: <>Wizytówka<br />Cyfrowa</>, 
      desc: 'Twoje najważniejsze informacje w jednym miejscu. Idealne rozwiązanie dla małych firm i profesjonalistów.',
      points: [
        'Przejrzysta prezentacja oferty',
        'Szybki kontakt (Click-to-call)',
        'Mapa dojazdu Google Maps',
        'Pełna responsywność mobilna',
        'Integracja z social media',
        'Niskie koszty utrzymania'
      ],
      bgColor: '#E2F0D9'
    },
    { 
      title: <>Landing Page<br />Sprzedażowy</>, 
      desc: 'Strona skoncentrowana na jednym celu – konwersji. Idealna pod kampanie reklamowe Google Ads i Meta Ads.',
      points: [
        'Architektura zorientowana na cel',
        'Perswazyjne teksty (Copywriting)',
        'Szybki czas ładowania',
        'Analityka zachowań użytkowników',
        'Testy A/B dla lepszych wyników',
        'Integracja z systemami CRM'
      ],
      bgColor: '#E2F0D9'
    },
    { 
      title: <>Portfolio<br />& Personal Brand</>, 
      desc: 'Wyróżnij się w sieci unikalnym designem. Pokaż swoje projekty i buduj markę osobistą od pierwszego wrażenia.',
      points: [
        'Unikalna oprawa graficzna',
        'Interaktywna galeria projektów',
        'Sekcja opinii i rekomendacji',
        'Blog lub aktualności',
        'Formularz kontaktowy',
        'Optymalizacja pod wizerunek'
      ],
      bgColor: '#E2F0D9'
    },
    { 
      title: <>Strona<br />Eventowa</>, 
      desc: 'Wszystko o Twoim wydarzeniu w pigułce. Rejestracja, agenda i najważniejsze informacje w nowoczesnej formie.',
      points: [
        'Licznik czasu do wydarzenia',
        'System rejestracji uczestników',
        'Interaktywna agenda',
        'Sekcja prelegentów',
        'Integracja z płatnościami',
        'Powiadomienia dla zapisanych'
      ],
      bgColor: '#E2F0D9'
    }
  ] : [
    { 
      title: <>Digital<br />Business Card</>, 
      desc: 'Your most important information in one place. The perfect solution for small businesses and professionals.',
      points: [
        'Clear presentation of the offer',
        'Quick contact (Click-to-call)',
        'Google Maps integration',
        'Full mobile responsiveness',
        'Social media integration',
        'Low maintenance costs'
      ],
      bgColor: '#E2F0D9'
    },
    { 
      title: <>Sales<br />Landing Page</>, 
      desc: 'A page focused on one goal – conversion. Ideal for Google Ads and Meta Ads advertising campaigns.',
      points: [
        'Goal-oriented architecture',
        'Persuasive texts (Copywriting)',
        'Fast loading time',
        'User behavior analytics',
        'A/B testing for better results',
        'Integration with CRM systems'
      ],
      bgColor: '#E2F0D9'
    },
    { 
      title: <>Portfolio<br />& Personal Brand</>, 
      desc: 'Stand out online with a unique design. Show your projects and build a personal brand from the first impression.',
      points: [
        'Unique graphic setting',
        'Interactive project gallery',
        'Reviews and recommendations section',
        'Blog or news',
        'Contact form',
        'Image optimization'
      ],
      bgColor: '#E2F0D9'
    },
    { 
      title: <>Event<br />Page</>, 
      desc: 'Everything about your event in a nutshell. Registration, agenda, and the most important information in a modern form.',
      points: [
        'Event countdown timer',
        'Participant registration system',
        'Interactive agenda',
        'Speakers section',
        'Payment integration',
        'Notifications for subscribers'
      ],
      bgColor: '#E2F0D9'
    }
  ];

  const processSteps = lang === 'PL' ? [
    {
      id: '01',
      title: 'Strategia i Cel',
      paragraphs: [
        "Zaczynamy od zrozumienia, co Twoja strona ma osiągnąć. Czy to ma być szybki kontakt, zapis na newsletter, czy sprzedaż konkretnego produktu? Definiujemy główny cel (Call to Action), który będzie prowadził użytkownika przez całą stronę.",
        "Analizujemy Twoją grupę docelową, aby dopasować język korzyści i design, który wzbudzi zaufanie od pierwszej sekundy."
      ]
    },
    {
      id: '02',
      title: 'Projektowanie UX/UI',
      paragraphs: [
        "Tworzymy projekt, który jest nie tylko ładny, ale przede wszystkim skuteczny. W stronach typu One-Page kluczowa jest hierarchia informacji – najważniejsze rzeczy muszą być widoczne od razu.",
        "Dbamy o to, aby nawigacja była intuicyjna, a strona wyglądała perfekcyjnie na każdym urządzeniu mobilnym."
      ]
    },
    {
      id: '03',
      title: 'Szybkie Wdrożenie',
      paragraphs: [
        "Kodujemy stronę z naciskiem na szybkość ładowania. W dzisiejszym świecie każda sekunda oczekiwania to stracony klient. Używamy nowoczesnych technologii, które gwarantują płynność działania.",
        "Integrujemy niezbędne narzędzia: analitykę, formularze kontaktowe, mapy czy media społecznościowe."
      ]
    },
    {
      id: '04',
      title: 'Optymalizacja i Start',
      paragraphs: [
        "Przed uruchomieniem testujemy stronę pod kątem błędów i wydajności. Optymalizujemy ją pod kątem SEO, aby była łatwiej odnajdywana w wyszukiwarce.",
        "Po starcie nie zostawiamy Cię samego – monitorujemy wyniki i pomagamy w dalszym rozwoju Twojej obecności w sieci."
      ]
    }
  ] : [
    {
      id: '01',
      title: 'Strategy and Goal',
      paragraphs: [
        "We start by understanding what your page is supposed to achieve. Is it supposed to be quick contact, a newsletter signup, or the sale of a specific product? We define the main goal (Call to Action) that will guide the user through the entire page.",
        "We analyze your target group to match the language of benefits and design that will inspire trust from the first second."
      ]
    },
    {
      id: '02',
      title: 'UX/UI Design',
      paragraphs: [
        "We create a design that is not only pretty but above all effective. In One-Page sites, the hierarchy of information is key – the most important things must be visible immediately.",
        "We make sure that navigation is intuitive and the page looks perfect on every mobile device."
      ]
    },
    {
      id: '03',
      title: 'Fast Implementation',
      paragraphs: [
        "We code the page with an emphasis on loading speed. In today's world, every second of waiting is a lost customer. We use modern technologies that guarantee smooth operation.",
        "We integrate necessary tools: analytics, contact forms, maps, or social media."
      ]
    },
    {
      id: '04',
      title: 'Optimization and Launch',
      paragraphs: [
        "Before launching, we test the page for errors and performance. We optimize it for SEO so that it is easier to find in the search engine.",
        "After the launch, we don't leave you alone – we monitor the results and help in the further development of your online presence."
      ]
    }
  ];

  const faqItems = lang === 'PL' ? [
    {
      question: "Czy strona One-Page wystarczy dla mojej firmy?",
      answer: "Dla wielu firm, zwłaszcza usługowych lub startujących w sieci, One-Page jest idealnym rozwiązaniem. Pozwala na szybkie i konkretne przedstawienie oferty bez rozpraszania użytkownika zbędnymi podstronami. Jeśli Twoja oferta jest skoncentrowana, One-Page często konwertuje lepiej niż rozbudowany serwis."
    },
    {
      question: "Jak długo trwa stworzenie takiej strony?",
      answer: "Dzięki uproszczonej strukturze, strony One-Page i wizytówki tworzymy bardzo szybko – zazwyczaj od kilku dni do dwóch tygodni. To najszybsza droga do profesjonalnej obecności w internecie."
    },
    {
      question: "Czy One-Page można pozycjonować w Google?",
      answer: "Tak, choć strategia różni się od rozbudowanych serwisów. Skupiamy się na najważniejszych frazach kluczowych dla Twojej działalności. Dobrze zoptymalizowany One-Page może z powodzeniem walczyć o wysokie pozycje na lokalne zapytania."
    },
    {
      question: "Co jeśli w przyszłości będę chciał rozbudować stronę?",
      answer: "Nasze strony budujemy w sposób skalowalny. One-Page może być świetnym fundamentem, do którego w przyszłości dołożymy kolejne podstrony, bloga czy sklep, gdy Twoja firma zacznie potrzebować więcej miejsca."
    }
  ] : [
    {
      question: "Is a One-Page site enough for my company?",
      answer: "For many companies, especially service-based ones or those starting online, a One-Page site is the perfect solution. It allows for a quick and specific presentation of the offer without distracting the user with unnecessary subpages. If your offer is focused, a One-Page often converts better than an extensive service."
    },
    {
      question: "How long does it take to create such a site?",
      answer: "Thanks to the simplified structure, we create One-Page sites and business cards very quickly – usually from a few days to two weeks. It is the fastest route to a professional online presence."
    },
    {
      question: "Can a One-Page site be positioned in Google?",
      answer: "Yes, although the strategy differs from extensive services. We focus on the most important keywords for your business. A well-optimized One-Page can successfully fight for high positions for local queries."
    },
    {
      question: "What if I want to expand the site in the future?",
      answer: "We build our sites in a scalable way. A One-Page can be a great foundation to which we will add more subpages, a blog, or a store in the future when your company starts needing more space."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const scrollOffer = (direction: 'left' | 'right') => {
    if (offerScrollRef.current) {
      const { scrollLeft, clientWidth } = offerScrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      offerScrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-40 bg-black text-white min-h-screen">
      {/* Background Video */}
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
            <div className="flex flex-col items-start">
              <div className="flex flex-row items-end justify-start gap-8 lg:gap-16 flex-nowrap">
                <span className="whitespace-nowrap">{lang === 'PL' ? 'ONE-PAGE,' : 'ONE-PAGE,'}<br className="sm:hidden" /><span className="hidden sm:inline"> </span>{lang === 'PL' ? 'KTÓRE' : 'THAT'}</span>
                
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
                    <>Szybki start. Konkretny cel.<br />Maksymalna konwersja od zaraz.</>
                  ) : (
                    <>Fast start. Specific goal.<br />Maximum conversion right away.</>
                  )}
                </div>
              </div>
              
              <div className="flex flex-row items-center justify-start gap-8 flex-nowrap">
                <span className="whitespace-nowrap">{lang === 'PL' ? 'KONWERTUJĄ.' : 'CONVERT.'}</span>
              </div>
            </div>
          </h1>
        </motion.div>
      </div>

      {/* Section 2: Text content */}
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
              {lang === 'PL' ? 'Proste rozwiązania, które przynoszą realne rezultaty Twojej firmie.' : 'Simple solutions that bring real results to your company.'}
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
                {lang === 'PL' ? 'Strony typu One-Page oraz wizytówki internetowe to najskuteczniejszy sposób na szybkie zaistnienie w sieci. Skupiamy się na tym, co najważniejsze: jasnym przekazie, profesjonalnym wizerunku i ułatwieniu klientowi kontaktu z Tobą.' : 'One-Page sites and online business cards are the most effective way to quickly exist on the web. We focus on what is most important: a clear message, a professional image, and making it easier for the customer to contact you.'}
              </p>
              <p>
                {lang === 'PL' ? 'Bez zbędnych rozpraszaczy, bez skomplikowanej nawigacji. Tylko czysta esencja Twojej oferty podana w nowoczesnej i responsywnej formie.' : 'No unnecessary distractions, no complicated navigation. Only the pure essence of your offer presented in a modern and responsive form.'}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 3: Boxes */}
      <section className="relative w-full py-24 z-10 bg-white text-black">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[100rem] mx-auto">
          <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-black mb-12 tracking-tight leading-[0.9] sm:leading-tight">
            {lang === 'PL' ? 'Nasze rozwiązania' : 'Our solutions'}
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
              onClick={() => scrollOffer('left')}
              className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scrollOffer('right')}
              className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 4: Process */}
      <section className="relative w-full py-24 z-10 bg-black text-white">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-white mb-16 tracking-tight leading-[0.9] sm:leading-tight">
            {lang === 'PL' ? 'Jak działamy?' : 'How we work?'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-24 lg:gap-y-24">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-start">
                <span className="text-[#E2F0D9] font-inter-tight text-xl mb-4">{step.id}</span>
                <h3 className="text-3xl font-inter-tight font-normal mb-6">{step.title}</h3>
                {step.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-slate-400 font-inter text-lg leading-relaxed mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: FAQ */}
      <section className="relative w-full py-24 z-10 bg-white text-black">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-black mb-16 tracking-tight leading-[0.9] sm:leading-tight">
            {lang === 'PL' ? 'Częste pytania' : 'Common questions'}
          </h2>
          
          <div className="max-w-4xl">
            {faqItems.map((item, idx) => (
              <div key={idx} className="border-b border-black/10">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full py-8 flex justify-between items-center text-left group"
                >
                  <h3 className="text-xl sm:text-2xl font-inter-tight font-normal group-hover:translate-x-2 transition-transform duration-300">{item.question}</h3>
                  <Plus className={`w-6 h-6 transition-transform duration-300 ${openIndex === idx ? 'rotate-45' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-slate-600 text-lg leading-relaxed max-w-3xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen bg-black text-white flex flex-col items-center justify-between p-6 relative overflow-hidden">
        <div className="h-20 w-full"></div>

        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden -translate-y-20 sm:translate-y-0">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible scale-[1.4] sm:scale-100">
            <path id="curve-onepage-contact" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
            <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <motion.textPath 
                xlinkHref="#curve-onepage-contact" 
                animate={{ startOffset: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-[100px] sm:text-[150px] font-black text-white uppercase tracking-[0.01em] fill-white font-bebas"
              >
                {lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
          <span className="text-white/60 text-sm tracking-widest uppercase">{lang === 'PL' ? 'KONTAKT' : 'CONTACT'}</span>
          <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">{lang === 'PL' ? 'Gotów, by stworzyć coś niepowtarzalnego?' : 'Ready to create something unique?'}</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={onStartProjectClick || onContactClick} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}</button>
            <button onClick={onAskAwayClick} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}</button>
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
