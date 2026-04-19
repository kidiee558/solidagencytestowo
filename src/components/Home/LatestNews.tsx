import React from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function LatestNews({ onPoradnikClick, onArticleClick }: { onPoradnikClick: () => void, onArticleClick: (id: string) => void }) {
  const { lang } = useLanguage();
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  React.useEffect(() => {
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
      bgColor: "#2B2B2B"
    },
    {
      id: "architektura-strony",
      title: lang === 'PL' ? "Architektura strony: Praktyczny poradnik dla SEO" : "Website architecture: A practical guide for SEO",
      image: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-seo.png?raw=true",
      link: "#",
      bgColor: "#2B2B2B"
    },
    {
      id: "google-meta-ads",
      title: lang === 'PL' ? "Google Ads czy Meta Ads? Gdzie Twoja firma powinna wydać pierwszy budżet?" : "Google Ads or Meta Ads? Where should your company spend its first budget?",
      image: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-ads.png?raw=true",
      link: "#",
      bgColor: "#2B2B2B"
    },
    {
      id: "rebranding",
      title: lang === 'PL' ? "Rebranding strony: Kiedy odświeżenie wyglądu to za mało?" : "Website rebranding: When refreshing the look is not enough?",
      image: "https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/informacje-rebranding.png",
      link: "#",
      bgColor: "#2B2B2B",
      padding: "p-0"
    }
  ];

  return (
    <section className="latest-news py-24 bg-white relative overflow-hidden" id="latest-news">
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
          '--slide-size': '100%' // Default for mobile
        } as React.CSSProperties}>
          <div ref={viewportRef} className="slider-news__viewport snap-x snap-mandatory scrollbar-hide w-full" style={{ overflowX: 'auto' }}>
            <div className="slider-news__container flex items-start touch-pan-y pl-4 sm:pl-6 lg:pl-24 xl:pl-40 pr-4 sm:pr-6 lg:pr-24 xl:pr-40" style={{ gap: '1rem' }}>
              {news.map((item, idx) => (
                <div key={idx} className="slider-news__slide min-w-0 snap-center pb-4" style={{ flex: `0 0 ${cardsPerRow > 1 ? (100 / cardsPerRow - ((cardsPerRow - 1) * 1) / cardsPerRow) : 85}%` }}>
                  <a href={item.link} onClick={(e) => { e.preventDefault(); onArticleClick(item.id); }} className="news-card block rounded-[20px] overflow-hidden flex flex-col bg-[#000] text-[#fff] border border-[rgba(255,255,255,0.25)] h-[24.375rem] select-none group relative">
                    <div className="overflow-hidden h-[12.5rem] min-h-[12.5rem] w-full z-[1]">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
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
    </section>
  );
}
