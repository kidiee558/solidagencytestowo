import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, Check, Plus, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
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

const getProjectsData = (lang: 'PL' | 'ENG') => [
  {
    id: '01',
    deliveryTime: lang === 'PL' ? 'Czas realizacji do 48 godzin' : 'Delivery within 48 hours',
    title: lang === 'PL' ? 'Profesjonalne Wizytówki Biznesowe' : 'Professional Business Showcases',
    description: lang === 'PL' 
      ? 'Czysta forma. Skoncentrowane na estetyce i konwersji serwisy, które budują natychmiastowy autorytet. To najlepszy wybór dla specjalistów i firm, gdzie liczy się doskonałe pierwsze wrażenie oraz błyskawiczny kontakt z klientem. Skupiamy się na nowoczesnym designie, który od progu mówi o wysokiej jakości Twoich usług.' 
      : 'Pure form. Aesthetic and conversion-focused websites that build immediate authority. The best choice for specialists and companies where a perfect first impression and instant client contact matter.',
    bgImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/StronaWizytowkaWideo.mp4?v=3',
  },
  {
    id: '02',
    deliveryTime: lang === 'PL' ? 'Czas realizacji do 7 dni' : 'Delivery within 7 days',
    title: lang === 'PL' ? 'Rozbudowane Strony Firmowe' : 'Extensive Corporate Websites',
    description: lang === 'PL' 
      ? 'Twoja oferta w pełnej skali. Tworzymy rozbudowane serwisy dla firm, które muszą pomieścić szeroką ofertę i dziesiątki podstron bez utraty szybkości. To rozwiązanie premium, gdzie każdy detal techniczny wspiera Twój profesjonalizm i ułatwia klientowi podjęcie decyzji. Idealne, gdy potrzebujesz solidnej platformy, która rośnie razem z Twoją skalą i buduje trwałą przewagę na rynku.' 
      : 'Your offer at full scale. We create extensive websites for companies that need to accommodate a wide range of services and dozens of subpages without losing speed. A premium solution where every technical detail supports your professionalism.',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '03',
    deliveryTime: lang === 'PL' ? 'Czas realizacji do 21 dni' : 'Delivery within 21 days',
    title: lang === 'PL' ? 'Strony Interaktywne 3D' : 'Interactive 3D Websites',
    description: lang === 'PL' 
      ? 'Nowy wymiar interakcji. Tworzymy zaawansowane serwisy wykorzystujące grafikę 3D i animacje, które całkowicie angażują użytkownika. To propozycja dla marek premium i innowacyjnych projektów, które chcą wyznaczać standardy i zapaść w pamięć na długo. Łączymy artystyczną wizję z najnowszą technologią, tworząc cyfrowe doświadczenie obok którego nie da się przejść obojętnie.' 
      : 'A new dimension of interaction. We create advanced websites using 3D graphics and animations that fully engage the user.',
    bgImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '04',
    deliveryTime: lang === 'PL' ? 'Czas realizacji ustalany indywidualnie' : 'Delivery time set individually',
    title: lang === 'PL' ? 'Dedykowane Portale & Systemy' : 'Dedicated Portals & Systems',
    description: lang === 'PL' 
      ? 'Zaawansowane portale i systemy internetowe zdolne obsłużyć masowy ruch i skomplikowane procesy biznesowe. To rozwiązanie dla projektów wymagających pełnej personalizacji, automatyzacji procesów, bezpiecznych baz danych oraz stabilnych integracji z zewnętrznymi narzędziami. W tej architekturze nie ma limitów co do funkcji czy stopnia rozbudowania – realizujemy każde, nawet najbardziej specyficzne wymaganie techniczne.' 
      : 'Advanced portals and web systems capable of handling mass traffic and complex business processes. A solution for projects requiring full personalization and automation.',
    bgImage: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
  }
];

function LatestProjects({ onContactClick }: { onContactClick: () => void }) {
  const { lang } = useLanguage();
  const projectsData = getProjectsData(lang);

  return (
    <div id="portfolio-websites" className="relative z-20 bg-black text-white pt-32 sm:pt-48 lg:pt-64 pb-32 sm:pb-48 lg:pb-64 overflow-hidden">
      <div className="max-w-[110rem] mx-auto px-6 sm:px-12 lg:px-16 space-y-48 sm:space-y-64 lg:space-y-80">
        {projectsData.map((project, index) => {
          const isReversed = index % 2 !== 0;
          
          return (
            <div 
              key={project.id} 
              className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-24`}
            >
              {/* Text Side */}
              <div className="w-full lg:w-[40%] flex flex-col items-start">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col gap-4 sm:gap-6"
                >
                  <h3 className="text-white text-[clamp(2.5rem,4vw,5rem)] font-inter-tight font-light leading-[1.05] tracking-tight">
                    {project.title}
                  </h3>
                  <div className="text-white/40 text-xs sm:text-sm tracking-[0.2em] uppercase font-bold">
                    {project.deliveryTime}
                  </div>
                  <p className="text-white/60 text-lg sm:text-xl font-inter-tight font-light leading-relaxed max-w-md">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onContactClick}
                      className="hidden lg:block px-8 py-4 bg-white text-black font-inter-tight font-medium rounded-full hover:bg-white/90 transition-colors text-sm sm:text-base w-fit"
                    >
                      {lang === 'PL' ? 'Wycena w 30 min' : 'Quote in 30 min'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="hidden lg:block px-8 py-4 bg-white/10 text-white border border-white/20 font-inter-tight font-medium rounded-full hover:bg-white/20 transition-colors text-sm sm:text-base w-fit backdrop-blur-sm"
                    >
                      {lang === 'PL' ? 'Zobacz zdjęcia' : 'See photos'}
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Image Side */}
              <div className="w-full lg:w-[60%] flex flex-col gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/8.5] overflow-hidden group rounded-3xl">
                    {project.videoUrl ? (
                      <video 
                        src={project.videoUrl}
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={project.fgImage} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-[2000ms]"
                      />
                    )}
                  </div>
                </motion.div>

                {/* Mobile Buttons */}
                <div className="lg:hidden flex flex-col gap-3 w-full">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onContactClick}
                    className="w-full px-8 py-4 bg-white text-black font-inter-tight font-medium rounded-full hover:bg-white/90 transition-colors text-sm sm:text-base"
                  >
                    {lang === 'PL' ? 'Wycena w 30 min' : 'Quote in 30 min'}
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-white/10 text-white border border-white/20 font-inter-tight font-medium rounded-full hover:bg-white/20 transition-colors text-sm sm:text-base backdrop-blur-sm"
                  >
                    {lang === 'PL' ? 'Zobacz zdjęcia' : 'See photos'}
                  </motion.button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function WebsitesOfferPage({ onBack, onContactClick, onAskAwayClick, onOnePageOfferClick }: { onBack: () => void; onContactClick: () => void; onAskAwayClick: () => void; onOnePageOfferClick: () => void }) {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const boxes = lang === 'PL' ? [
    { 
      id: 'onepage',
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
      bgColor: '#D9D2E9'
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
      bgColor: '#D9D2E9'
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
      bgColor: '#D9D2E9'
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
      bgColor: '#D9D2E9'
    }
  ] : [
    { 
      id: 'onepage',
      title: <>One-Page<br />& Business Cards</>, 
      desc: 'Fast One-Page website focused on immediate conversion and a professional start on the web.',
      points: [
        'Built for conversion (Leads)',
        'Full responsiveness (PC/Mobile)',
        'SEO Optimization',
        'SSL security certificate',
        'Google Business Profile integration',
        'Fast start and simple operation'
      ],
      bgColor: '#D9D2E9'
    },
    { 
      title: <>Extensive<br />company website</>, 
      desc: 'A full offer service building trust and visibility for local keywords in the search engine.',
      points: [
        'Independent content editing (CMS)',
        'Effective positioning in Google',
        'Any number of offer subpages',
        'Automatic inquiry collection',
        'Sales funnels for services',
        'Scalable structure for development'
      ],
      bgColor: '#D9D2E9'
    },
    { 
      title: <>Corporate<br />websites</>, 
      desc: 'Prestigious image for market leaders. Highest operating speed and unique information architecture.',
      points: [
        'Bulletproof code (OWASP Standards)',
        '100/100 ranking in Google Speed',
        'Expansion into foreign markets',
        'Full synchronization with CRM/ERP',
        '24/7 technical support',
        'Infrastructure for high traffic'
      ],
      bgColor: '#D9D2E9'
    },
    { 
      title: <>Professional<br />dedicated systems</>, 
      desc: 'Dedicated applications and systems without technical limitations. Automations tailored to your processes.',
      points: [
        'Full freedom of functions',
        'Custom business logic',
        'Data flow automation',
        'Complex analytical panels',
        'No CMS system limitations',
        'Scalability under load'
      ],
      bgColor: '#D9D2E9'
    }
  ];

  const processStages = lang === 'PL' ? [
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
  ] : [
    {
      id: '01',
      title: 'Strategy & Planning',
      paragraphs: [
        "From the beginning, we connect our actions with your business goals and technical requirements. We research how your customers behave and what the competition is doing to set a clear direction.",
        "The result is a detailed work plan that defines the scope of the project and how the website is supposed to earn for itself.",
        "Thanks to this, you can be sure that the implementation will bring measurable profits."
      ]
    },
    {
      id: '02',
      title: 'UX/UI Design',
      paragraphs: [
        "Based on the strategy, we create mockups and the appearance of the website perfectly matched to your brand and development plans. We design every element from scratch – we avoid ready-made templates and short-term trends that may soon be outdated.",
        "We focus on how users actually behave to make it easier for them to purchase or contact.",
        "Together we refine every detail until we get a product ready for effective operation and development."
      ]
    },
    {
      id: '03',
      title: 'Implementation',
      paragraphs: [
        "We turn approved projects into clean and easy-to-use code that will work efficiently for years. We build the visual part precisely, ensuring speed and convenience on phones and computers.",
        "From the technical side, we implement a stable content management system (CMS) and solid foundations that will allow you to easily develop your offer and conduct marketing in the future."
      ]
    },
    {
      id: '04',
      title: 'Launch & Development',
      paragraphs: [
        "We handle the entire process of launching the website so that it takes place without any interruptions in its operation.",
        "After the launch, we take care of security, speed, and constant technical support.",
        "We act as your partner for years – we analyze data and introduce corrections aimed at the constant growth of your income."
      ]
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = lang === 'PL' ? [
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
  ] : [
    {
      question: "Why is it worth investing in an individual project instead of a template?",
      answer: "An individual project means no technical limitations and uniqueness that a template used by thousands of other companies does not provide. A \"tailor-made\" website is faster, safer, and better adapted to your specific sales processes. It is a working tool that grows with your company."
    },
    {
      question: "How much does it cost to create a professional website?",
      answer: "The price depends on the complexity of the project, the number of subpages, and the required technical functions. Each of our implementations is priced individually because we create solutions from scratch, not on ready-made templates. We prepare the offer so that the investment pays off through effective sales and customer acquisition."
    },
    {
      question: "How long does the process of building a website from design to launch take?",
      answer: "The standard process usually takes from a few hours to a few weeks. This time includes the planning phase, graphic design (UX/UI), coding, and testing. We provide a detailed schedule at the very beginning of cooperation so that you can plan your marketing activities in advance."
    },
    {
      question: "Will the new website be visible in the Google search engine?",
      answer: "Yes. We build every website in accordance with current SEO guidelines. We take care of clean code, loading speed, and appropriate structure of headings and content. It is a solid foundation that makes it easier for Google robots to index the site and allows you to effectively fight for high positions in search results."
    },
    {
      question: "Will I get access to edit content on the website?",
      answer: "Of course. After the work is completed, you will receive access to an intuitive management panel (CMS). Thanks to it, you can independently and without technical knowledge change texts, add new photos or blog posts. Before handing over the project, we conduct a short training so that operating the website is fully understandable to you."
    },
    {
      question: "What happens if I need changes after the website is launched?",
      answer: "We provide full post-implementation care. You can count on our technical support and continuous development of the site. As your business partner, we analyze how users use the website and on this basis we propose optimizations that will further increase its effectiveness."
    },
    {
      question: "Do you also handle hosting and domain?",
      answer: "We help in the entire technical process. We advise on choosing a fast server and registering a domain, and then we configure everything so that the website works flawlessly. We can take over full infrastructure management so you can focus solely on running your business."
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const offerScrollRef = useRef<HTMLDivElement>(null);

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
                <>Szybki start. Przejrzysta struktura.<br />Responsywność i czysty, wydajny kod.</>
              ) : (
                <>Fast start. Clear structure.<br />Responsiveness and clean, efficient code.</>
              )}
            </div>

            <div className="flex flex-col items-start">
              <div className="flex flex-row items-end justify-start gap-8 lg:gap-16 flex-nowrap">
                <span className="whitespace-nowrap">{lang === 'PL' ? 'STRONY,' : 'WEBSITES,'}<br className="sm:hidden" /><span className="hidden sm:inline"> </span>{lang === 'PL' ? 'KTÓRE' : 'THAT'}</span>
                
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
                    <>Szybki start. Przejrzysta struktura.<br />Responsywność i czysty, wydajny kod.</>
                  ) : (
                    <>Fast start. Clear structure.<br />Responsiveness and clean, efficient code.</>
                  )}
                </div>
              </div>
              
              <div className="flex flex-row items-center justify-start gap-8 flex-nowrap">
                <span className="whitespace-nowrap">{lang === 'PL' ? 'ZARABIAJĄ.' : 'EARN.'}</span>
                
                {/* Tablet subtext - Visible on Medium Screens next to "ZARABIAJĄ" to avoid overlap */}
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
                    <>Szybki start. Przejrzysta struktura.<br />Responsywność i czysty, wydajny kod.</>
                  ) : (
                    <>Fast start. Clear structure.<br />Responsiveness and clean, efficient code.</>
                  )}
                </div>
              </div>
            </div>
          </h1>
        </motion.div>
      </div>

      {/* Section 2: Text content over video */}
      <section id="websites-second-section" className="relative w-full py-24 z-10">
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
              {lang === 'PL' ? 'Wysokiej klasy strony internetowe budujące profesjonalny wizerunek, który wyróżnia Cię na tle konkurencji.' : 'High-class websites building a professional image that makes you stand out from the competition.'}
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
                {lang === 'PL' ? 'Proces łączy estetyczny wygląd, szybkość działania i niezawodną technologię, by wdrażać unikalne strony internetowe, które budują zaufanie i pozwalają Twojej działalności stabilnie rosnąć.' : 'The process combines aesthetic appearance, speed of operation, and reliable technology to implement unique websites that build trust and allow your business to grow steadily.'}
              </p>
              <p>
                {lang === 'PL' ? 'Zapewniamy pełne wsparcie techniczne i optymalizację pod kątem wyszukiwarek, co przekłada się na wysoką widoczność w sieci oraz realne zainteresowanie ofertą ze strony nowych klientów.' : 'We provide full technical support and search engine optimization, which translates into high visibility on the web and real interest in the offer from new customers.'}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 3: Latest Projects */}
      <LatestProjects onContactClick={onContactClick} />

      {/* Section 4: Strategy content */}
      <section className="relative z-10 w-full bg-white text-black">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-[6.25rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 items-center">
            <h2 
              className="text-black font-normal leading-[1.2] max-w-[12em] font-inter-tight"
              style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)' }}
            >
              {lang === 'PL' ? 'Przestajemy zgadywać, co zadziała. Analizujemy zachowania użytkowników, aby wyeliminować bariery, które powstrzymują ich przed kontaktem z Tobą.' : 'We stop guessing what works. We analyze user behavior to eliminate barriers that prevent them from contacting you.'}
            </h2>
            <div 
              className="text-[#363636] lg:col-start-2 max-w-[27.5em] lg:ml-auto font-inter-tight font-light leading-[1.2] tracking-[.02em]"
              style={{ fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)' }}
            >
              {lang === 'PL' ? 'Od prostych wizytówek po rozbudowane serwisy i systemy – działamy jako Twój stały partner w sieci. Dzięki unikalnym projektom, łatwej obsłudze i przemyślanej ścieżce klienta, dostarczamy szybkie wdrożenia oraz konkretne wyniki, które realnie rozwijają Twój biznes i budują mocny fundament pod Twój stały wzrost w internecie.' : 'From simple business cards to extensive services and systems – we act as your permanent partner on the web. Thanks to unique projects, easy operation and a well-thought-out customer path, we deliver quick implementations and concrete results that really develop your business and build a strong foundation for your constant growth on the Internet.'}
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
              <span>{lang === 'PL' ? <><>ZOBACZ<br />PROCES.</></> : <><>SEE THE<br />PROCESS.</></>}</span>
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
                }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                <span className="mt-2 text-left" style={{
                  fontSize: '.75rem',
                  fontFamily: 'Geist Mono, monospace',
                  fontWeight: 400,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  lineHeight: 1.5,
                  maxWidth: '280px'
                }}>{lang === 'PL' ? 'Nasze kroki do stworzenia Twojego prestiżowego serwisu.' : 'Our steps to create your prestigious service.'}</span>
              </div>
            </span>
            <span className="hidden sm:inline-grid text-left">
              <span className="invisible col-start-1 row-start-1 select-none whitespace-pre" aria-hidden="true">{lang === 'PL' ? 'TWORZYMY TO' : 'WE CREATE IT'}</span>
              <span className="col-start-1 row-start-1 flex flex-col w-full">
                <span className="text-left">{lang === 'PL' ? 'ZOBACZ' : 'SEE THE'}</span>
                <span className="flex justify-between items-center w-full">
                  <div className="text-left flex flex-col">
                    <span style={{
                      fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
                      fontFamily: 'Inter Tight, sans-serif',
                      fontWeight: 700,
                      lineHeight: 1.2,
                      textTransform: 'none',
                      letterSpacing: 'normal'
                    }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                    <span className="mt-2" style={{
                      fontSize: '.75rem',
                      fontFamily: 'Geist Mono, monospace',
                      fontWeight: 400,
                      letterSpacing: '.2em',
                      textTransform: 'uppercase',
                      maxWidth: '280px',
                      lineHeight: 1.5
                    }}>{lang === 'PL' ? 'Nasze kroki do stworzenia Twojego prestiżowego serwisu.' : 'Our steps to create your prestigious service.'}</span>
                  </div>
                  <span className="text-right">{lang === 'PL' ? 'PROCES.' : 'PROCESS.'}</span>
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
                  )},
                  { name: 'BLENDER', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Blender</title>
                      <path d="M12.51 13.214c.046-.8.438-1.506 1.03-2.006a3.424 3.424 0 0 1 2.212-.79c.85 0 1.631.3 2.211.79.592.5.983 1.206 1.028 2.005.045.823-.285 1.586-.865 2.153a3.389 3.389 0 0 1-2.374.938 3.393 3.393 0 0 1-2.376-.938c-.58-.567-.91-1.33-.865-2.152M7.35 14.831c.006.314.106.922.256 1.398a7.372 7.372 0 0 0 1.593 2.757 8.227 8.227 0 0 0 2.787 2.001 8.947 8.947 0 0 0 3.66.76 8.964 8.964 0 0 0 3.657-.772 8.285 8.285 0 0 0 2.785-2.01 7.428 7.428 0 0 0 1.592-2.762 6.964 6.964 0 0 0 .25-3.074 7.123 7.123 0 0 0-1.016-2.779 7.764 7.764 0 0 0-1.852-2.043h.002L13.566 2.55l-.02-.015c-.492-.378-1.319-.376-1.86.002-.547.382-.609 1.015-.123 1.415l-.001.001 3.126 2.543-9.53.01h-.013c-.788.001-1.545.518-1.695 1.172-.154.665.38 1.217 1.2 1.22V8.9l4.83-.01-8.62 6.617-.034.025c-.813.622-1.075 1.658-.563 2.313.52.667 1.625.668 2.447.004L7.414 14s-.069.52-.063.831zm12.09 1.741c-.97.988-2.326 1.548-3.795 1.55-1.47.004-2.827-.552-3.797-1.538a4.51 4.51 0 0 1-1.036-1.622 4.282 4.282 0 0 1 .282-3.519 4.702 4.702 0 0 1 1.153-1.371c.942-.768 2.141-1.183 3.396-1.185 1.256-.002 2.455.41 3.398 1.175.48.391.87.854 1.152 1.367a4.28 4.28 0 0 1 .522 1.706 4.236 4.236 0 0 1-.239 1.811 4.54 4.54 0 0 1-1.035 1.626"/>
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
                {lang === 'PL' ? 'Szukasz Pewnego Partnera Technicznego?' : 'Looking for a Reliable Technical Partner?'}
              </h2>
              <p className="text-black/60 text-lg mb-10">
                {lang === 'PL' ? 'Zbudujmy Coś, Co Działa Idealnie.' : 'Let\'s Build Something That Works Perfectly.'}
              </p>
              <button 
                onClick={onContactClick}
                className="bg-white/20 hover:bg-white/30 text-black px-8 py-4 rounded-full transition-colors text-sm font-medium border border-black/10"
              >
                {lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}
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
              {lang === 'PL' ? 'Powiązane projekty' : 'Related projects'}
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
                {lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
          <span className="text-white/60 text-sm tracking-widest uppercase">{lang === 'PL' ? 'KONTAKT' : 'CONTACT'}</span>
          <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">{lang === 'PL' ? 'Gotów, by stworzyć coś niepowtarzalnego?' : 'Ready to create something unique?'}</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={() => {}} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}</button>
            <button onClick={onAskAwayClick} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}</button>
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
