import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import useEmblaCarousel from 'embla-carousel-react';

export function AboutPage({ onContactClick, onPoradnikClick, onArticleClick, onStartProjectClick, onAskAwayClick }: { onContactClick?: () => void, onPoradnikClick?: () => void, onArticleClick?: (id: string) => void, onStartProjectClick?: () => void, onAskAwayClick?: () => void }) {
  const { lang, t } = useLanguage();

  return (
    <div className="w-full bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden z-0">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
            src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/t%C5%82o.mp4"
          />
        </div>
        <div className="absolute inset-0 bg-black/40 z-[1]"></div>
        <div className="relative z-[2]">
          <div className="min-h-screen flex flex-col justify-center pt-32 pb-8 sm:pb-8 lg:pb-12 xl:pb-16" style={{ minHeight: '100dvh' }}>
            <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-10 lg:px-16 relative z-20 flex flex-col items-start">
              <div className="flex flex-col items-start flex-grow w-full">
                <div className="text-left w-full">
                  <div className="flex flex-col items-start w-full">
                    <h1 
                      className="font-bold text-white tracking-tight leading-[1.1] flex flex-col gap-1 lg:gap-2 w-full"
                      aria-label="SOLID AGENCY"
                    >
                      <span className="flex flex-col items-center justify-center w-full" aria-hidden="true">
                        <div 
                          className="text-[clamp(7.5rem,22vw,32rem)] sm:text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold text-white leading-[0.75] uppercase tracking-[0.005em] text-center w-full relative"
                          style={{ marginBottom: 'calc(-0.04em + 10px)' }}
                        >
                          <span className="whitespace-nowrap flex justify-center w-full">SOLID AGENCY</span>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center w-full mt-2 sm:mt-4">
                          <div 
                            className="font-inter-tight text-slate-400 uppercase break-words text-center relative"
                            style={{ 
                              fontSize: 'clamp(0.45rem, 0.35rem + 0.5vw, 1em)',
                              letterSpacing: '0.1em',
                              fontWeight: '300'
                            }}
                          >
                            LUBLIN / WORLDWIDE - EST. 2018
                          </div>
                        </div>
                      </span>
                    </h1>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="font-inter-tight text-slate-300 text-center mx-auto mt-10 sm:mt-16 max-w-[800px]"
                      style={{ 
                        fontSize: 'clamp(1rem, 0.9rem + 1.2vw, 2rem)',
                        lineHeight: '1.4',
                        fontWeight: '300'
                      }}
                    >
                      {lang === 'PL' 
                        ? 'Utytułowane studio cyfrowe. Specjalizujemy się w zaawansowanej budowie stron i sklepów, projektowaniu najwyższej jakości interfejsów, precyzyjnej strategii oraz niezawodnym wsparciu technicznym.' 
                        : 'An award-winning digital studio. We specialize in advanced website and e-commerce development, premium interface design, precise strategy, and reliable technical support.'}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-24 sm:py-32 lg:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 px-6 lg:px-[6.25rem] gap-8 lg:gap-0 max-w-[1920px] mx-auto">
          <div className="text-white w-full lg:max-w-[10.8125em]" style={{
            fontWeight: 300,
            fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
            fontFamily: 'Inter Tight, sans-serif',
            lineHeight: 1.2
          }}>
            {lang === 'PL' ? 'Dostarczamy systemy, które wyznaczają najwyższy standard w Twojej branży.' : 'We deliver systems that set the highest standard in your industry.'}
          </div>
          <div className="text-white lg:col-start-2 lg:row-start-2 lg:ml-auto w-full lg:max-w-[27.5em]" style={{
            fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)',
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: '.02em'
          }}>
            <p className="mb-4">
              {lang === 'PL' ? 'Przeszliśmy przez ponad 200 wdrożeń w Europie i Stanach Zjednoczonych, co pozwoliło nam opanować proces budowania systemów, gdzie każdy detal techniczny bezpośrednio wspiera realizację Twoich celów biznesowych.' : 'We have completed over 200 implementations across Europe and the United States, which allowed us to master the process of building systems where every technical detail directly supports the achievement of your business goals.'}
            </p>
            <p>
              {lang === 'PL' ? 'Nie ograniczamy się do samego postawienia witryny. Wykorzystujemy własny system skalowania, który wyciska maksimum z kampanii w Google oraz na platformach Meta. Każdy wdrożony przez nas serwis przechodzi rygorystyczną optymalizację pod wyszukiwarki, żebyś nie musiał przepłacać za ruch, który powinieneś mieć za darmo.' : 'We do not limit ourselves to merely setting up a website. We use our proprietary scaling system that squeezes the maximum out of campaigns on Google and Meta platforms. Every service we implement undergoes rigorous SEO optimization so you do not have to overpay for traffic you should get for free.'}
            </p>
          </div>
        </div>
      </section>

      <section className="pt-32 pb-0 bg-black overflow-hidden">
        <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
          <h2 
            className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold text-white leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full"
            style={{ marginBottom: 'calc(-0.04em + 10px)' }}
          >
            {lang === 'PL' ? (
              <span className="whitespace-nowrap">STAWIAMY</span>
            ) : (
              <span className="whitespace-nowrap">WE FOCUS</span>
            )}
          </h2>
        </div>
      </section>

      <section className="pt-0 pb-32 bg-white overflow-hidden">
        <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
          <h2 
            className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold text-black leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full"
            style={{ paddingTop: 'calc(0.04em + 10px)' }}
          >
            <span className="sm:hidden flex flex-col items-end text-right w-full">
              {lang === 'PL' ? (
                <span>NA WYNIK</span>
              ) : (
                <span>ON RESULTS</span>
              )}
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
                }}>200+</span>
                <span className="mt-2 text-left" style={{
                  fontSize: '.75rem',
                  fontFamily: 'Geist Mono, monospace',
                  fontWeight: 300,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  lineHeight: 1.5,
                  maxWidth: '280px'
                }}>{lang === 'PL' ? 'Zrealizowanych projektów w różnych branżach na całym świecie.' : 'Completed projects in various industries worldwide.'}</span>
              </div>
            </span>
            <span className="hidden sm:flex flex-col w-full">
              <span className="flex justify-between items-center w-full">
                <div className="text-left flex flex-col">
                    <span style={{
                      fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
                      fontFamily: 'Inter Tight, sans-serif',
                      fontWeight: 700,
                      lineHeight: 1.2,
                      textTransform: 'none',
                      letterSpacing: 'normal'
                    }}>200+</span>
                    <span className="mt-2" style={{
                      fontSize: '.75rem',
                      fontFamily: 'Geist Mono, monospace',
                      fontWeight: 300,
                      letterSpacing: '.2em',
                      textTransform: 'uppercase',
                      maxWidth: '280px',
                      lineHeight: 1.5
                    }}>{lang === 'PL' ? 'Zrealizowanych projektów w różnych branżach na całym świecie.' : 'Completed projects in various industries worldwide.'}</span>
                  </div>
                  <span className="text-right">{lang === 'PL' ? 'NA WYNIK' : 'ON RESULTS'}</span>
              </span>
            </span>
          </h2>
        </div>
      </section>

      <TestimonialsSection />

      {/* New informational section */}
      <section className="py-24 sm:py-32 bg-white text-black px-6 lg:px-[6.25rem] max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
          <div className="text-black w-full lg:max-w-[10.8125em]" style={{
            fontWeight: 300,
            fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
            fontFamily: 'Inter Tight, sans-serif',
            lineHeight: 1.2
          }}>
            {lang === 'PL' ? 'Twoja marka nie znosi kompromisów. My też.' : 'Your brand does not tolerate compromises. Neither do we.'}
          </div>
          <div className="text-black lg:col-start-2 lg:row-start-2 lg:ml-auto w-full lg:max-w-[27.5em]" style={{
            fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)',
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: '.02em',
            paddingTop: '0' 
          }}>
            <p>
              {lang === 'PL' 
                ? 'Odcinamy się od masowej produkcji stron opartych na powtarzalnych szablonach. Solid Agency to manufaktura cyfrowa. Każda linia kodu, każdy model 3D i każda strategia reklamowa są projektowane od zera pod konkretną tożsamość biznesową. Dostarczamy rozwiązania dla tych, którzy nie chcą być kolejną kopią w Google, ale chcą dyktować warunki w swojej niszy.' 
                : 'We distance ourselves from mass-production websites based on repetitive templates. Solid Agency is a digital manufactory. Every line of code, every 3D model, and every advertising strategy are designed from scratch for a specific business identity. We provide solutions for those who do not want to be just another copy on Google, but want to dictate terms in their niche.'}
            </p>
          </div>
        </div>
      </section>

      {/* 1:1 EXACT COPY OF LATEST NEWS SECTION */}
      <section className="latest-news py-24 bg-white relative overflow-hidden" id="latest-news">
        <AboutLatestNews onArticleClick={onArticleClick} onPoradnikClick={onPoradnikClick} />
      </section>

      {/* 1:1 EXACT COPY OF CONTACT SECTION */}
      <section className="min-h-screen bg-white text-black flex flex-col items-center justify-between p-6 relative overflow-hidden">
        {/* Spacer for top since no navbar */}
        <div className="h-20 w-full"></div>

        {/* Curved Text Container */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden -translate-y-20 sm:translate-y-0">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible scale-[1.4] sm:scale-100">
            <path id="curve-bottom" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
            <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <motion.textPath 
                xlinkHref="#curve-bottom" 
                animate={{ startOffset: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-[100px] sm:text-[150px] font-black text-black uppercase tracking-[0.01em] fill-black font-bebas"
              >
                {lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
          <span className="text-black/60 text-sm tracking-widest uppercase">{t('nav.contact')}</span>
          <h2 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">{lang === 'PL' ? 'Gotów, by stworzyć coś niepowtarzalnego?' : 'Ready to create something unique?'}</h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={onStartProjectClick || onContactClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}</button>
            <button onClick={onAskAwayClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}</button>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full flex justify-between items-end z-20 pb-4">
          <div className="text-sm">
            <p className="font-bold">POLAND</p>
            <p className="text-black/60">{lang === 'PL' ? 'Lubelskie, Lublin - Tutaj jesteśmy. Działamy na całym świecie.' : 'Lubelskie, Lublin - We are here. We operate worldwide.'}</p>
          </div>
          <div className="w-32"></div> {/* Spacer to maintain layout balance */}
        </footer>
      </section>
    </div>
  );
}

function AboutLatestNews({ onArticleClick, onPoradnikClick }: { onArticleClick?: (id: string) => void, onPoradnikClick?: () => void }) {
  const { lang } = useLanguage();
  const viewportRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      setContainerWidth(entries[0].contentRect.width);
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const cardsPerRow = containerWidth > 1200 ? 4 : containerWidth > 900 ? 3 : containerWidth > 600 ? 2 : 1;

  const scroll = (direction: 'left' | 'right') => {
    if (viewportRef.current) {
      const container = viewportRef.current;
      const firstSlide = container.querySelector('.slider-news__slide') as HTMLElement;
      if (firstSlide) {
        const slideWidth = firstSlide.offsetWidth;
        const gap = parseFloat(getComputedStyle(container.firstElementChild!).columnGap || '16');
        const scrollAmount = slideWidth + gap;
        
        container.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };

  const news = [
    {
      id: "ux-design",
      title: lang === 'PL' ? "UX Design: Jak zatrzymać klienta na stronie?" : "UX Design: How to keep a customer on the site?",
      image: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-UXdesign.png?raw=true",
      link: "#",
    },
    {
      id: "architektura-strony",
      title: lang === 'PL' ? "Architektura strony: Praktyczny poradnik dla SEO" : "Website architecture: A practical guide for SEO",
      image: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-seo.png?raw=true",
      link: "#",
    },
    {
      id: "google-meta-ads",
      title: lang === 'PL' ? "Google Ads czy Meta Ads? Gdzie Twoja firma powinna wydać pierwszy budżet?" : "Google Ads or Meta Ads? Where should your company spend its first budget?",
      image: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-ads.png?raw=true",
      link: "#",
    },
    {
      id: "rebranding",
      title: lang === 'PL' ? "Rebranding strony: Kiedy odświeżenie wyglądu to za mało?" : "Website rebranding: When refreshing the look is not enough?",
      image: "https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/informacje-rebranding.png",
      link: "#",
    }
  ];

  return (
    <div className="w-full relative z-10">
      <div className="px-4 sm:px-6 lg:px-24 xl:px-40">
        <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-black mb-12 tracking-tight leading-[0.9] sm:leading-tight">
          {lang === 'PL' ? (
            'Poradnik Marketingowy: Jak Skalować Biznes przez SEO, Google Ads & Meta Ads i UX'
          ) : (
            'Marketing Guide: How to Scale Your Business through SEO, Google Ads & Meta Ads and UX'
          )}
        </h2>
      </div>
      
      <div ref={containerRef} className="slider-news" style={{ 
        maxWidth: '100%', 
        margin: 'auto', 
        '--slide-height': '24.375rem', 
        '--slide-spacing': '1rem', 
        '--slide-size': '100%'
      } as React.CSSProperties}>
        <div ref={viewportRef} className="slider-news__viewport snap-x snap-mandatory scrollbar-hide w-full" style={{ overflowX: 'auto' }}>
          <div className="slider-news__container flex items-start touch-pan-y pl-4 sm:pl-6 lg:pl-24 xl:pl-40 pr-4 sm:pr-6 lg:pr-24 xl:pr-40" style={{ gap: '1rem' }}>
            {news.map((item, idx) => (
              <div key={idx} className="slider-news__slide min-w-0 snap-center pb-4" style={{ flex: `0 0 ${cardsPerRow > 1 ? (100 / cardsPerRow - ((cardsPerRow - 1) * 1) / cardsPerRow) : 85}%` }}>
                <a href={item.link} onClick={(e) => { e.preventDefault(); onArticleClick && onArticleClick(item.id); }} className="news-card block rounded-[20px] overflow-hidden flex flex-col bg-[#000] text-[#fff] border border-[rgba(255,255,255,0.25)] h-[24.375rem] select-none group relative">
                  <div className="overflow-hidden h-[12.5rem] min-h-[12.5rem] w-full z-[1]">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="news-card__content p-[2.25rem] pb-0 flex flex-col justify-between h-full">
                    <h3 
                      className="font-inter-tight font-normal tracking-[0.005em] line-clamp-3"
                      style={{ 
                        fontSize: 'clamp(.875rem, .5801886792rem + .9433962264vw, 1.5rem)', 
                        fontWeight: 300,
                        letterSpacing: '.005em',
                        fontFamily: 'var(--font-inter-tight)',
                        lineHeight: 1
                      }}
                    >
                      {item.title}
                    </h3>
                    <div className="mb-[1.875rem]">
                      <span className="news-card__btn text-white underline cursor-pointer hover:opacity-70 transition-opacity" style={{ 
                        fontSize: 'clamp(.875rem, .8160377358rem + .1886792453vw, 1rem)',
                        fontFamily: 'Inter Tight, sans-serif',
                        fontWeight: 300,
                        lineHeight: 1.4,
                        letterSpacing: '.02em'
                      }}>
                        {lang === 'PL' ? 'Czytaj więcej' : 'Read more'}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4 sm:px-6 lg:px-24 xl:px-40 mt-12">
        <div className="flex gap-4 w-full sm:w-auto justify-center sm:justify-start">
          <button aria-label="Przewiń poradniki w lewo" onClick={() => scroll('left')} className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors">
            <ChevronLeft className="w-6 h-6 text-black" strokeWidth={1.5} />
          </button>
          <button aria-label="Przewiń poradniki w prawo" onClick={() => scroll('right')} className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors">
            <ChevronRight className="w-6 h-6 text-black" strokeWidth={1.5} />
          </button>
        </div>
        <div className="hidden sm:block flex-1 h-[1px] bg-black/10"></div>
        <button onClick={onPoradnikClick} className="flex items-center justify-center gap-2 text-black font-medium hover:opacity-70 transition-opacity whitespace-nowrap underline underline-offset-4 sm:no-underline w-full sm:w-auto">
          {lang === 'PL' ? 'Zobacz nasz poradnik' : 'See our guide'} <ArrowRight className="w-5 h-5 shrink-0" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const testimonials = [
    { text: lang === 'PL' ? "Głównym celem było wycięcie spamu i automatyzacja ofertowania. Po wdrożeniu rozwiązań od Solid Agency dostajemy gotowe leady B2B. Odpadło nam ręczne przepisywanie danych i odbieranie telefonów od przypadkowych osób. System filtruje zapytania, a my zajmujemy się tylko domykaniem sprzedaży. Oszczędność czasu jest kolosalna." : "The main goal was to eliminate spam and automate quoting. After implementing Solid Agency's solutions, we receive ready-to-convert B2B leads. We no longer have to manually handle data and pointless calls. The system filters what's important. The time savings are colossal.", author: "CHIEF OPERATING OFFICER", company: "Logistics & Distribution" },
    { text: lang === 'PL' ? "W końcu mamy profesjonalną stronę - klienci nas znajdują i widzą aktualne menu. Wszystko śmiga na telefonach, co w gastro jest kluczowe. Od startu strony mamy o wiele więcej ludzi w lokalu. Tego potrzebowaliśmy, dziękujemy!" : "Finally, we have a professional website that helps clients find us and see our up-to-date menus. Everything works instantly on phones, which is crucial in the restaurant industry. Since launching the site, we have noticeably more new people in the restaurant. Thanks for the help!", author: "MARKETING & OPERATIONS", company: "PLAN Streetfood" },
    { text: lang === 'PL' ? "Since the launch, our sales numbers have shifted completely. The new site and ads are finally hitting the right audience, and the volume of serious inquiries is the highest we've ever seen. Our inventory is visible where it matters, and the traffic is actually converting into showroom visits. No fluff, just a massive boost in leads. They delivered exactly what we needed to grow." : "Since the launch, our sales numbers have shifted completely. The new site and ads are finally hitting the right audience, and the volume of serious inquiries is the highest we've ever seen. Our inventory is visible where it matters, and the traffic is actually converting into showroom visits. No fluff, just a massive boost in leads. They delivered exactly what we needed to grow.", author: "TECHNICAL DIRECTOR", company: "Automotive Group" },
    { text: lang === 'PL' ? "Wine is a restricted category for ads, which meant we had to get creative. The content strategy they developed built us a genuine audience of enthusiasts. Organic search now drives the majority of our revenue and we've built real brand equity in a category where most players are just competing on price." : "Wine is a restricted category for ads, which meant we had to get creative. The content strategy they developed built us a genuine audience of enthusiasts. Organic search now drives the majority of our revenue and we've built real brand equity in a category where most players are just competing on price.", author: "FOUNDER", company: "CrateAndPour Wines" },
    { text: lang === 'PL' ? "Wcześniej miałem może dwa zapytania o auta na tydzień, teraz codziennie wpada coś konkretnego. Dzięki nowej stronie i ogarnięciu SEO telefon nie przestaje dzwonić. Inwestycja spłaciła się po pierwszym sprowadzonym aucie. Jak ktoś szuka konkretów, a nie bajek, to trafił pod dobry adres. Dzięki za pomoc jeszcze raz :)" : "Previously I had maybe two inquiries about cars a week, now something concrete falls in every day. After changing the site and handling SEO, the phone doesn't stop ringing. The investment paid off after the first imported car. If someone is looking for specifics, not fairy tales, they have come to the right place. Thanks for the help again :)", author: "FOUNDER", company: "MorytzAuto" },
  ];

  const colors = [
    'bg-[#E6E6FA]', // lavender
    'bg-[#D8BFD8]', // thistle
    'bg-[#CFC0E8]', // lavender
    'bg-[#D1C4E9]', // deep purple light
    'bg-[#E1BEE7]', // soft purple
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    
    if (mediaQuery.matches) {
       gsap.set(cardsRef.current, {
           x: 0, 
           rotate: (index) => (index - 2) * 5,
           transformOrigin: "bottom center"
       });
    }
  }, []);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      const w = window.innerWidth;
      // Zmniejszamy spread, aby karty nie "rozjeżdżały się" za bardzo
      const spread = w > 1600 ? 340 : w > 1300 ? 280 : 220; 
      gsap.to(cardsRef.current, {
        x: (index) => (index - 2) * spread,
        y: (index) => Math.abs(index - 2) * 5 - 5,
        rotate: (index) => (index - 2) * 0.5,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto"
      });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      gsap.to(cardsRef.current, {
        x: 0,
        y: 0,
        rotate: (index) => (index - 2) * 5,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto"
      });
    }
  };

  return (
    <section 
      className="py-24 lg:py-48 bg-white overflow-hidden border-t border-black/10 transition-colors"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-[6.25rem]">
        
        <div className="flex flex-col lg:hidden w-full">
          <div className="mb-12">
            <h2 className="text-black font-inter-tight font-medium text-[clamp(2.5rem,4vw,4rem)] leading-[1.1] mb-2 tracking-tight">
              {lang === 'PL' ? 'Zaufali nam liderzy' : 'Trusted by leaders'}
            </h2>
            <p className="text-black/60 font-inter-tight text-lg max-w-sm">
              {lang === 'PL' ? 'Zobacz co mówią klienci o współpracy z naszym zespołem.' : 'See what clients say about working with our team.'}
            </p>
          </div>
          
          <div className="overflow-hidden w-[100vw] relative left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex touch-pan-y" style={{ marginLeft: '-1rem' }}>
              {testimonials.map((test, index) => (
                <div 
                  key={index}
                  className="flex-[0_0_92%] min-w-0 pl-12 sm:flex-[0_0_80%]"
                >
                  <div className={`w-full h-[400px] rounded-[2rem] p-6 flex flex-col justify-between shadow-xl shadow-black/5 ${colors[index]}`}>
                    <div className="mb-0">
                      <svg className="w-6 h-6 opacity-20 mb-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-black/80 font-light leading-[1.25] font-inter-tight text-[1rem]">
                        {test.text}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-black/10 min-h-[60px] flex flex-col justify-center">
                      <h4 className="text-black font-semibold text-sm font-inter-tight tracking-tight">{test.author}</h4>
                      <span className="text-black/60 text-[0.7rem] font-medium tracking-tight uppercase block mt-0.5 leading-tight">{test.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-8 justify-center">
            <button onClick={scrollPrev} className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors text-black shrink-0">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button onClick={scrollNext} className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors text-black shrink-0">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-col items-center justify-center min-h-[700px]">
          
          <div className="w-full text-center mb-16 relative z-10">
            <h2 className="text-black font-inter-tight font-medium text-[clamp(3rem,5vw,5rem)] leading-[1.1] mb-6 tracking-tight">
              {lang === 'PL' ? 'Zaufali nam liderzy' : 'Trusted by leaders'}
            </h2>
            <p className="text-black/60 font-inter-tight text-xl max-w-lg mx-auto">
              {lang === 'PL' ? 'Zobacz co mówią klienci o współpracy z naszym zespołem.' : 'See what clients say about working with our team.'}
            </p>
          </div>

          <div className="w-full flex justify-center items-center">
            <div 
              ref={containerRef}
              className="relative flex items-center justify-center w-[360px] h-[520px]"
            >
              {testimonials.map((test, index) => (
                <div 
                  key={index}
                  ref={(el) => cardsRef.current[index] = el}
                  className={`absolute w-[360px] h-[520px] rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl shadow-black/5 ${colors[index]}`}
                  style={{ zIndex: index, transformOrigin: 'center center' }}
                >
                  <div className="mb-0">
                    <svg className="w-10 h-10 opacity-20 mb-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-black/80 font-medium leading-[1.4] font-inter-tight text-[1.1rem]">
                      {test.text}
                    </p>
                  </div>
                  <div className="mt-4 pt-6 border-t border-black/10 min-h-[100px] flex flex-col justify-center">
                    <h4 className="text-black font-semibold text-lg font-inter-tight tracking-tight">{test.author}</h4>
                    <span className="text-black/60 text-xs font-medium tracking-tight uppercase block mt-1 leading-tight">{test.company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
