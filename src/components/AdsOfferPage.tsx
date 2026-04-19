import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getProjectsData, ServicesGrid } from './WebsitesOfferPage';

const getAdsProjectsData = (lang: 'PL' | 'ENG') => {
  const base = getProjectsData(lang);
  const overrides = lang === 'PL' ? [
    { title: 'Kampanie Google Ads', description: 'Usługa dla firm, które chcą być widoczne dokładnie wtedy, gdy klient szuka ich usług w wyszukiwarce. Ustawiamy reklamy na konkretne słowa kluczowe, aby Twoja oferta pojawiała się na samej górze wyników przed konkurencją. Pilnujemy, aby budżet nie uciekał na przypadkowe kliknięcia, tylko sprowadzał osoby zdecydowane na wybór Twojej firmy. To najprostsza metoda na pozyskanie ruchu, który natychmiast przekłada się na realne zapytania i zwrot z inwestycji.', deliveryTime: 'Start w 48 godzin' },
    { title: 'Kampanie Meta Ads', description: 'Reklamy na Facebooku i Instagramie, które docierają do odbiorców na podstawie ich zachowań i potrzeb. Tworzymy przekazy wizualne, które zatrzymują użytkownika podczas przeglądania aplikacji i budują chęć skorzystania z Twojej oferty. System pozwala nam precyzyjnie przypominać o usługach osobom, które już wcześniej odwiedziły Twoją stronę, ale nie podjęły decyzji. Dzięki temu nie tracisz kontaktu z potencjalnym klientem i systematycznie zwiększasz zasięgi marki.', deliveryTime: 'Start w 48 godzin' },
    { title: 'Lejki Sprzedażowe & Omnichannel', description: 'Budujemy system komunikacji, który łączy reklamy, e-maile i stronę w jedną, logiczną drogę klienta. Zamiast liczyć na pojedynczy strzał, prowadzimy użytkownika przez kolejne etapy znajomości z marką aż do sfinalizowania transakcji. Każdy kanał wymienia się informacjami, dzięki czemu klient otrzymuje spójne komunikaty niezależnie od tego, gdzie nas widzi. To rozwiązanie wyciska maksimum z każdego wejścia na stronę i buduje bazę lojalnych, powracających klientów.', deliveryTime: 'Start do 7 dni', buttonText: { PL: 'Omów strategię', ENG: 'Discuss strategy' } },
    { title: 'Audyt & Strategia Marketingowa', description: 'Analizujemy Twoje obecne reklamy oraz stronę, aby wskazać miejsca, w których tracisz szanse na pozyskanie klienta. Na tej podstawie dostajesz konkretny plan działania z wyliczonymi budżetami i wybranymi kanałami, które najlepiej sprawdzą się w Twojej branży. Badamy ruch w witrynie i sprawdzamy, co robi konkurencja, żeby zaproponować lepsze i skuteczniejsze rozwiązania. To fundament Twojego biznesu, który daje Ci pewność, że marketing jest zaplanowany.', deliveryTime: 'Czas realizacji do 7 dni', buttonText: { PL: 'Bezpłatna konsultacja', ENG: 'Free consultation' } }
  ] : [
    { title: 'Google Ads Campaigns', description: 'A service for companies that want to be visible exactly when a customer is looking for their services in the search engine. We set up ads for specific keywords so that your offer appears at the very top of the results before the competition. We make sure that the budget does not escape on random clicks, but brings people determined to choose your company. This is the simplest method to acquire traffic that immediately translates into real inquiries and return on investment.', deliveryTime: 'Start in 48 hours' },
    { title: 'Meta Ads Campaigns', description: 'Ads on Facebook and Instagram that reach audiences based on their behaviors and needs. We create visual messages that stop the user while browsing the app and build a desire to use your offer. The system allows us to precisely remind people about services who have previously visited your site but have not made a decision. Thanks to this, you do not lose contact with a potential customer and systematically increase brand reach.', deliveryTime: 'Start in 48 hours' },
    { title: 'Sales Funnels & Omnichannel', description: 'We build a communication system that combines ads, emails, and the website into one logical customer journey. Instead of counting on a single shot, we guide the user through successive stages of getting to know the brand until the transaction is finalized. Each channel exchanges information, so the customer receives consistent messages regardless of where they see us. This solution squeezes the maximum out of every site visit and builds a base of loyal, returning customers.', deliveryTime: 'Start up to 7 days', buttonText: { PL: 'Omów strategię', ENG: 'Discuss strategy' } },
    { title: 'Audit & Marketing Strategy', description: 'We analyze your current ads and website to identify places where you are losing opportunities to acquire a customer. Based on this, you get a specific action plan with calculated budgets and selected channels that will work best in your industry. We examine site traffic and check what the competition is doing to propose better and more effective solutions. This is the foundation of your business, giving you the certainty that marketing is planned.', deliveryTime: 'Delivery up to 7 days', buttonText: { PL: 'Bezpłatna konsultacja', ENG: 'Free consultation' } }
  ];
  return base.map((p, i) => ({ ...p, ...overrides[i] }));
};

export function AdsOfferPage({ onBack, onContactClick, onAskAwayClick, onStartProjectClick }: { onBack: () => void; onContactClick: () => void; onAskAwayClick: () => void; onStartProjectClick?: () => void }) {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      answer: "Dobór budżetu zależy od branży oraz skali działań, jednak rekomendujemy kwoty, które pozwolą na zebranie odpowiedniej ilości danych do optymalizacji. Na etapie bezpłatnej wyceny przygotowujemy estymację, wskazując realne progi wejścia dla Twojego biznesu."
    },
    {
      question: "Kiedy zobaczę pierwsze efekty kampanii?",
      answer: "Reklamy w wyszukiwarce oraz mediach społecznościowych zaczynają wyświetlać się niemal natychmiast po zatwierdzeniu przez system. Pierwsze wiarygodne dane analityczne i spływające zapytania pojawiają się zazwyczaj w ciągu pierwszych kilku dni od startu."
    },
    {
      question: "Czy muszę mieć własne grafiki do reklam?",
      answer: "Nie jest to konieczne – w ramach kompleksowej obsługi tworzymy skuteczne przekazy wizualne, które zatrzymują użytkownika i budują chęć skorzystania z oferty. Jeśli dysponujesz własnymi materiałami, analizujemy je pod kątem zgodności ze standardami danej platformy."
    },
    {
      question: "Jak mierzycie skuteczność prowadzonych działań?",
      answer: "Skupiamy się na twardych danych: liczbie leadów, transakcji oraz zwrocie z inwestycji (ROI). Każda kampania jest w pełni oomiarowana, co pozwala nam precyzyjnie wskazać, które słowa kluczowe lub kreacje generują realny zysk."
    },
    {
      question: "Czym różni się strategia Google Ads od Meta Ads?",
      answer: "Google Ads trafia do osób, które aktywnie szukają konkretnej usługi, natomiast Meta Ads buduje potrzebę u klienta na podstawie jego zachowań i zainteresowań. Łączymy obie platformy w strategię omnichannel, aby domykać sprzedaż na różnych etapach ścieżki zakupowej."
    },
    {
      question: "Czy mogę samodzielnie edytować kampanię w trakcie jej trwania?",
      answer: "Zalecamy pozostawienie optymalizacji w rękach specjalistów, ponieważ nagłe zmiany mogą przerwać proces uczenia się algorytmów. Wszystkie modyfikacje wprowadzamy na podstawie bieżącej analityki, aby utrzymać stały wzrost wyników."
    },
    {
      question: "Co dzieje się, gdy klient wejdzie na stronę, ale nie dokona zakupu?",
      answer: "Wykorzystujemy systemy remarketingu, które pozwalają nam precyzyjnie przypominać o Twoich usługach osobom, które już wcześniej odwiedziły stronę. Dzięki temu nie tracisz kontaktu z potencjalnym klientem i systematycznie zwiększasz szanse na konwersję."
    }
  ] : [
    {
      question: "What advertising budget is needed to start?",
      answer: "The choice of budget depends on the industry and the scale of activities, however, we recommend amounts that will allow collecting the right amount of data for optimization. At the free valuation stage, we prepare an estimation, indicating realistic entry thresholds for your business."
    },
    {
      question: "When will I see the first effects of the campaign?",
      answer: "Search engine and social media ads start displaying almost immediately after system approval. The first reliable analytical data and incoming inquiries usually appear within the first few days of launch."
    },
    {
      question: "Do I need to have my own graphics for ads?",
      answer: "It is not necessary - as part of comprehensive service, we create effective visual messages that stop the user and build a desire to use the offer. If you have your own materials, we analyze them for compliance with the standards of a given platform."
    },
    {
      question: "How do you measure the effectiveness of activities?",
      answer: "We focus on hard data: the number of leads, transactions, and return on investment (ROI). Each campaign is fully measured, which allows us to precisely indicate which keywords or creatives generate real profit."
    },
    {
      question: "How does Google Ads strategy differ from Meta Ads?",
      answer: "Google Ads reaches people who are actively looking for a specific service, while Meta Ads builds a need in the customer based on their behavior and interests. We combine both platforms into an omnichannel strategy to close sales at various stages of the purchasing path."
    },
    {
      question: "Can I edit the campaign myself while it is running?",
      answer: "We recommend leaving optimization in the hands of specialists, as sudden changes can interrupt the algorithm learning process. We introduce all modifications based on current analytics to maintain a steady growth in results."
    },
    {
      question: "What happens when a customer visits the site but does not make a purchase?",
      answer: "We use remarketing systems that allow us to precisely remind people about your services who have previously visited the site. Thanks to this, you do not lose contact with a potential customer and systematically increase the chances of conversion."
    }
  ];

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
              {lang === 'PL' ? 'Zaawansowane systemy reklamowe, które docierają do Twoich klientów dokładnie tam, gdzie spędzają czas.' : 'Advanced advertising systems that reach your customers exactly where they spend their time.'}
            </div>

            <div 
              className="font-inter-tight text-slate-300 lg:max-w-[35em]"
              style={{ 
                fontSize: 'clamp(1rem, .735915493rem + .8450704225vw, 1.75rem)',
                letterSpacing: '-.01em',
                fontWeight: '300'
              }}
            >
              <p className="mb-8">
                {lang === 'PL' ? 'Prowadzimy działania w Google i Meta Ads w oparciu o twarde dane, a nie przypuszczenia. Każda złotówka z Twojego budżetu jest optymalizowana pod kątem konwersji i realnego zwrotu z inwestycji.' : 'Do not burn your budget on random activities. We create data-driven campaigns that precisely meet the needs of your audience.'}
              </p>
              <p>
                {lang === 'PL' ? 'Tworzymy spójne strategie, które docierają do Twoich klientów dokładnie w momencie, gdy potrzebują Twoich usług. Nie obiecujemy zasięgów – dowozimy prawdziwe wyniki w panelu sprzedażowym.' : 'We combine the potential of the Google search engine with the reach of Facebook and Instagram, building a coherent omnichannel strategy that closes sales.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <ServicesGrid projectsData={getAdsProjectsData(lang)} onContactClick={onContactClick} />

      <section className="relative z-10 w-full bg-white text-black">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-[6.25rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 items-center">
            <h2 className="text-black font-normal leading-[1.2] max-w-[12em] font-inter-tight" style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)' }}>
              {lang === 'PL' ? 'Reklama to nie koszt, to inwestycja. Każda złotówka wydana na marketing musi pracować na Twój zysk.' : 'Advertising is not a cost, it is an investment. Every zloty spent on marketing must work for your profit.'}
            </h2>
            <div className="text-[#363636] lg:col-start-2 max-w-[27.5em] lg:ml-auto font-inter-tight font-normal leading-[1.2] tracking-[.02em]" style={{ fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)' }}>
              {lang === 'PL' ? 'Skupiamy się na twardych wynikach. Nie interesują nas puste polubienia, ale realna sprzedaż i zapytania ofertowe. Dzięki ciągłej optymalizacji i testom, wyciskamy maksimum z każdego budżetu reklamowego.' : 'We focus on hard results. We are not interested in empty likes, but real sales and inquiries. Thanks to continuous optimization and testing, we squeeze the maximum out of every advertising budget.'}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 pt-0 pb-32 bg-white">
        <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
          <h2 className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold text-black leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full">
            <span className="sm:hidden flex flex-col items-end text-right w-full">
              <span>{lang === 'PL' ? <><>ZOBACZ<br />PROCES.</></> : <><>SEE THE<br />PROCESS.</></>}</span>
              <div className="flex flex-col items-start text-left w-[90%]" style={{ position: 'relative', paddingTop: '2.3125rem' }}>
                <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2, textTransform: 'none', letterSpacing: 'normal' }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                <span className="mt-2 text-left" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 300, letterSpacing: '.2em', textTransform: 'uppercase', lineHeight: 1.5, maxWidth: '280px' }}>{lang === 'PL' ? 'Nasze kroki do stworzenia Twoich dochodowych kampanii.' : 'Our steps to create your profitable campaigns.'}</span>
              </div>
            </span>
            <span className="hidden sm:inline-grid text-left">
              <span className="invisible col-start-1 row-start-1 select-none whitespace-pre" aria-hidden="true">{lang === 'PL' ? 'TWORZYMY TO' : 'WE CREATE IT'}</span>
              <span className="col-start-1 row-start-1 flex flex-col w-full">
                <span className="text-left">{lang === 'PL' ? 'ZOBACZ' : 'SEE THE'}</span>
                <span className="flex justify-between items-center w-full">
                  <div className="text-left flex flex-col">
                    <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2, textTransform: 'none', letterSpacing: 'normal' }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                    <span className="mt-2" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 300, letterSpacing: '.2em', textTransform: 'uppercase', maxWidth: '280px', lineHeight: 1.5 }}>{lang === 'PL' ? 'Nasze kroki do stworzenia Twoich dochodowych kampanii.' : 'Our steps to create your profitable campaigns.'}</span>
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
                      <p key={i} className="text-[clamp(1rem,1.2vw,1.375rem)] font-inter-tight font-normal leading-relaxed text-[#363636]">{p}</p>
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
              <h2 className="text-[2.5rem] lg:text-[3.2rem] font-inter-tight font-normal leading-[1.05] mb-6 text-black">{lang === 'PL' ? 'Zacznij skalować swoją sprzedaż' : 'Start Scaling Your Sales'}</h2>
              <p className="text-black/60 text-lg mb-10">{lang === 'PL' ? 'Maksymalizuj zyski z kampanii.' : 'Your campaigns are waiting to be launched.'}</p>
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
            <path id="curve-bottom-offer-ads" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
            <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <motion.textPath xlinkHref="#curve-bottom-offer-ads" animate={{ startOffset: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="text-[100px] sm:text-[150px] font-bold text-black uppercase tracking-[0.01em] fill-black font-bebas">
                {lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
          <span className="text-black/60 text-sm tracking-widest uppercase">{lang === 'PL' ? 'KONTAKT' : 'CONTACT'}</span>
          <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">{lang === 'PL' ? 'Gotów, by odpalić swoje kampanie?' : 'Ready to launch your campaigns?'}</h1>
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
