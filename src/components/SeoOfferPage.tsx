import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getProjectsData, ServicesGrid } from './WebsitesOfferPage';

const getSeoProjectsData = (lang: 'PL' | 'ENG') => {
  const base = getProjectsData(lang);
  const overrides = lang === 'PL' ? [
    { title: 'Audyt SEO & Optymalizacja', description: 'Analizujemy kod i strukturę witryny, aby wyeliminować techniczne bariery blokujące roboty wyszukiwarek. Skupiamy się na poprawie szybkości ładowania, responsywności i poprawnej indeksacji wszystkich kluczowych sekcji serwisu. Wdrażamy optymalizację, która dostosowuje stronę do aktualnych standardów jakościowych. Dzięki temu witryna staje się stabilnym fundamentem pod dalsze działania marketingowe i jest lepiej oceniana przez algorytmy.', deliveryTime: 'Czas realizacji do 14 dni', buttonText: { PL: 'Zamów audyt', ENG: 'Order audit' } },
    { title: 'Pozycjonowanie Lokalne', description: 'Budujemy widoczność Twojej firmy w wynikach lokalnych oraz w Mapach Google. Dbamy o to, aby profil firmy był kompletny i wiarygodny dla użytkowników szukających usług w Twoim bezpośrednim sąsiedztwie. Skupiamy się na zapytaniach powiązanych z Twoją lokalizacją, co pomaga dotrzeć do osób realnie zainteresowanych ofertą w danym regionie. To uporządkowane działanie, które zwiększa szansę na bezpośredni kontakt klienta z Twoim biurem lub punktem.', deliveryTime: 'Pierwsze efekty po 30 dniach' },
    { title: 'SEO E-commerce & Content', description: 'Optymalizujemy strukturę sklepu tak, aby kategorie i produkty były łatwe do znalezienia zarówno dla użytkowników, jak i wyszukiwarek. Tworzymy merytoryczne treści, które odpowiadają na realne pytania klientów i pomagają im w wyborze produktu. Eliminujemy błędy techniczne typowe dla dużych platform sprzedażowych, takie jak duplikacja treści czy wolne działanie filtrów. Skupiamy się na dostarczaniu wartościowego ruchu, który ma potencjał sprzedażowy.', deliveryTime: 'Pierwsze efekty po 30 dniach' },
    { title: 'Zaawansowana Strategia SEO', description: 'Opracowujemy plan działań oparty na analizie Twojej branży i obecnej sytuacji domeny. Nie stosujemy ryzykownych metod – stawiamy na systematyczną budowę autorytetu marki poprzez techniczne wsparcie i bezpieczne linkowanie. Monitorujemy zmiany w algorytmach i na bieżąco dostosowujemy strategię, aby utrzymać stabilny rozwój widoczności. To profesjonalne podejście dla firm, które szukają przewidywalności i rzetelnie prowadzonego procesu SEO.', deliveryTime: 'Strategia długoterminowa', buttonText: { PL: 'Omów strategię', ENG: 'Discuss strategy' } }
  ] : [
    { title: 'SEO Audit & Optimization', description: 'We analyze the code and structure of the website to eliminate technical barriers blocking search engine robots. We focus on improving loading speed, responsiveness, and correct indexing of all key sections of the site. We implement optimization that adapts the site to current quality standards. Thanks to this, the website becomes a stable foundation for further marketing activities and is better evaluated by algorithms.', deliveryTime: 'Delivery up to 14 days', buttonText: { PL: 'Zamów audyt', ENG: 'Order audit' } },
    { title: 'Local Positioning', description: 'We build the visibility of your company in local results and in Google Maps. We make sure that the company profile is complete and credible for users looking for services in your immediate vicinity. We focus on queries related to your location, which helps reach people genuinely interested in the offer in a given region. This is an organized action that increases the chance of direct customer contact with your office or point.', deliveryTime: 'First effects after 30 days' },
    { title: 'E-commerce SEO & Content', description: 'We optimize the store structure so that categories and products are easy to find for both users and search engines. We create substantive content that answers real customer questions and helps them choose a product. We eliminate technical errors typical for large sales platforms, such as content duplication or slow filter operation. We focus on delivering valuable traffic that has sales potential.', deliveryTime: 'First effects after 30 days' },
    { title: 'Advanced SEO Strategy', description: 'We develop an action plan based on an analysis of your industry and the current situation of the domain. We do not use risky methods - we focus on systematically building brand authority through technical support and safe linking. We monitor changes in algorithms and adjust the strategy on an ongoing basis to maintain a stable development of visibility. This is a professional approach for companies looking for predictability and a reliably conducted SEO process.', deliveryTime: 'Long-term strategy', buttonText: { PL: 'Omów strategię', ENG: 'Discuss strategy' } }
  ];
  return base.map((p, i) => ({ ...p, ...overrides[i] }));
};

export function SeoOfferPage({ onBack, onContactClick, onAskAwayClick, onStartProjectClick }: { onBack: () => void; onContactClick: () => void; onAskAwayClick: () => void; onStartProjectClick?: () => void }) {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              {lang === 'PL' ? 'Kompleksowe działania SEO, które wynoszą Twoją markę na szczyt wyników wyszukiwania.' : 'Comprehensive SEO activities that take your brand to the top of search results.'}
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
                {lang === 'PL' ? 'Optymalizujemy strukturę i kod strony tak, aby była w pełni zrozumiała dla algorytmów Google. Skupiamy się na technicznych fundamentach i treściach, które budują trwały autorytet Twojej domeny.' : 'High positions in Google are not an accident. It is the result of precise technical optimization, valuable content, and a strong link profile.'}
              </p>
              <p>
                {lang === 'PL' ? 'Zamiast ryzykownych metod, stawiamy na stabilną widoczność na kluczowe dla Twojego biznesu frazy. To proces, który systematycznie zwiększa darmowy, wysokiej jakości ruch w Twoim serwisie.' : 'We help companies become leaders in their industry by delivering free, high-quality organic traffic that turns into loyal customers.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <ServicesGrid projectsData={getSeoProjectsData(lang)} onContactClick={onContactClick} />

      <section className="relative z-10 w-full bg-white text-black">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-[6.25rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 items-center">
            <h2 className="text-black font-normal leading-[1.2] max-w-[12em] font-inter-tight" style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)' }}>
              {lang === 'PL' ? 'SEO to maraton, nie sprint. Ale to maraton, który wygrywa się dzięki precyzyjnej strategii i konsekwencji.' : 'SEO is a marathon, not a sprint. But it\'s a marathon won through precise strategy and consistency.'}
            </h2>
            <div className="text-[#363636] lg:col-start-2 max-w-[27.5em] lg:ml-auto font-inter-tight font-normal leading-[1.2] tracking-[.02em]" style={{ fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)' }}>
              {lang === 'PL' ? 'Nie obiecujemy cudów z dnia na dzień. Obiecujemy rzetelną pracę nad Twoją widocznością, która z każdym miesiącem będzie przynosić coraz więcej wartościowych wejść na stronę. Budujemy Twój najcenniejszy zasób w internecie.' : 'We don\'t promise miracles overnight. We promise reliable work on your visibility, which will bring more and more valuable site visits every month. We build your most valuable asset on the internet.'}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 pt-0 pb-32 bg-white">
        <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
          <h2 className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold text-black leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full">
            <span className="sm:hidden flex flex-col items-end text-right w-full">
              <span>{lang === 'PL' ? <>ZOBACZ<br />PROCES.</> : <>SEE THE<br />PROCESS.</>}</span>
              <div className="flex flex-col items-start text-left w-[90%]" style={{ position: 'relative', paddingTop: '2.3125rem' }}>
                <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2, textTransform: 'none', letterSpacing: 'normal' }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                <span className="mt-2 text-left" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 300, letterSpacing: '.2em', textTransform: 'uppercase', lineHeight: 1.5, maxWidth: '280px' }}>{lang === 'PL' ? 'Nasze kroki do Twojej dominacji w wyszukiwarce.' : 'Our steps to your search engine dominance.'}</span>
              </div>
            </span>
            <span className="hidden sm:inline-grid text-left">
              <span className="invisible col-start-1 row-start-1 select-none whitespace-pre" aria-hidden="true">{lang === 'PL' ? 'TWORZYMY TO' : 'WE CREATE IT'}</span>
              <span className="col-start-1 row-start-1 flex flex-col w-full">
                <span className="text-left">{lang === 'PL' ? 'ZOBACZ' : 'SEE THE'}</span>
                <span className="flex justify-between items-center w-full">
                  <div className="text-left flex flex-col">
                    <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2, textTransform: 'none', letterSpacing: 'normal' }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                    <span className="mt-2" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 300, letterSpacing: '.2em', textTransform: 'uppercase', maxWidth: '280px', lineHeight: 1.5 }}>{lang === 'PL' ? 'Nasze kroki do Twojej dominacji w wyszukiwarce.' : 'Our steps to your search engine dominance.'}</span>
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
              <h2 className="text-[2.5rem] lg:text-[3.2rem] font-inter-tight font-normal leading-[1.05] mb-6 text-black">{lang === 'PL' ? 'Zbuduj trwałą widoczność w Google' : 'Build Lasting Visibility in Google'}</h2>
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

      <section className="min-h-screen bg-white text-black flex flex-col items-center justify-between p-6 relative overflow-hidden">
        <div className="h-20 w-full"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden -translate-y-20 sm:translate-y-0">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible scale-[1.4] sm:scale-100">
            <path id="curve-bottom-offer-seo" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
            <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <motion.textPath xlinkHref="#curve-bottom-offer-seo" animate={{ startOffset: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="text-[100px] sm:text-[150px] font-bold text-black uppercase tracking-[0.01em] fill-black font-bebas">
                {lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "GET IN TOUCH GET IN TOUCH GET IN TOUCH GET IN TOUCH GET IN TOUCH GET IN TOUCH "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
          <span className="text-black/60 text-sm tracking-widest uppercase">{lang === 'PL' ? 'KONTAKT' : 'CONTACT'}</span>
          <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">
            {lang === 'PL' ? 'Gotów, by zwiększyć swoje zasięgi?' : 'Ready to dominate the search engine?'}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={onStartProjectClick || onContactClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">
              {lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}
            </button>
            <button onClick={onAskAwayClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">
              {lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}
            </button>
          </div>
        </div>
        <footer className="w-full flex justify-between items-end z-20 pb-4">
          <div className="text-sm">
            <p className="font-bold">POLAND</p>
            <p className="text-black/60">{lang === 'PL' ? 'Lubelskie, Lublin - Tutaj jesteśmy. Działamy na całym świecie.' : 'Lubelskie, Lublin - We are here. We operate worldwide.'}</p>
          </div>
          <div className="w-32"></div>
        </footer>
      </section>
    </div>
  );
}
