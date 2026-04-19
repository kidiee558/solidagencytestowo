import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function GlassBoxes({ 
  onWebsitesClick, 
  onEcommerceClick, 
  onAdsClick, 
  onSeoClick 
}: { 
  onWebsitesClick: () => void;
  onEcommerceClick: () => void;
  onAdsClick: () => void;
  onSeoClick: () => void;
}) {
  const { lang } = useLanguage();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const boxes = [
    { 
      title: lang === 'PL' ? <>Strony<br />internetowe</> : <>Websites</>, 
      desc: lang === 'PL' ? 'Pełna skala rozwiązań. Od szybkich wizytówek po zaawansowane doświadczenia 3D i systemy korporacyjne.' : 'Full scale of solutions. From quick business cards to advanced 3D experiences and corporate systems.',
      bg: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/box1.png',
      onClick: onWebsitesClick
    },
    { 
      title: lang === 'PL' ? <>Sklepy<br />e-commerce</> : <>E-commerce<br />stores</>, 
      desc: lang === 'PL' ? 'Pełen wymiar handlu. Od wydajnych e-sklepów po potężne systemy sprzedażowe i prezentację produktów w 3D.' : 'Full dimension of commerce. From efficient e-stores to powerful sales systems and 3D product presentation.',
      bg: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/box2.jpg',
      onClick: onEcommerceClick
    },
    { 
      title: lang === 'PL' ? <>Kampanie Ads<br />(Google & Meta)</> : <>Ads Campaigns<br />(Google & Meta)</>, 
      desc: lang === 'PL' ? 'Precyzyjny zasięg. Od lokalnych kampanii po globalne strategie sprzedażowe z pełną analityką.' : 'Precise reach. From local campaigns to global sales strategies with full analytics.',
      bg: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/box3.jpg',
      onClick: onAdsClick
    },
    { 
      title: lang === 'PL' ? <>Pozycjonowanie<br />SEO</> : <>SEO<br />Optimization</>, 
      desc: lang === 'PL' ? 'Trwałe zasięgi. Od lokalnej optymalizacji po globalną dominację w wynikach wyszukiwania.' : 'Lasting reach. From local optimization to global dominance in search results.',
      bg: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/box2.jpg',
      onClick: onSeoClick
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="glass-boxes">
        <div className="px-4 sm:px-6 lg:px-24 xl:px-40 relative z-10">
          <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-black mb-12 tracking-tight leading-[0.9] sm:leading-tight">
            {lang === 'PL' ? 'Zobacz naszą ofertę' : 'See our offer'}
          </h2>
        </div>
        <div 
          ref={scrollRef}
          className="flex flex-row flex-nowrap gap-4 lg:gap-6 mb-12 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-4 sm:pl-6 lg:pl-24 xl:pl-40"
        >
          {boxes.map((box, idx) => (
            <div 
              key={idx} 
              onClick={box.onClick}
              className="cursor-pointer flex-shrink-0 w-[85vw] sm:w-[500px] md:w-[600px] lg:w-[700px] snap-center relative rounded-3xl aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/9] overflow-hidden flex flex-col group transition-all duration-500 bg-[#D9D2E9] p-6 sm:p-10 lg:p-12"
            >
              <div className="flex flex-col h-full justify-between items-start relative z-10">
                <div className="w-full">
                  <h3 
                    className="text-black text-left mb-4 sm:mb-6"
                    style={{
                      fontWeight: 300,
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
                      fontWeight: 300,
                      lineHeight: 1.3,
                      maxWidth: '95%'
                    }}
                  >
                    {box.desc}
                  </p>
                </div>
                <button 
                  onClick={box.onClick}
                  className="text-black text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] border-b-2 border-black/20 pb-1 group-hover:border-black transition-all w-fit mt-4 sm:mt-6 lg:mt-10"
                >
                  {lang === 'PL' ? 'ZOBACZ OFERTĘ' : 'SEE OFFER'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-2 sm:mt-4">
          <div className="flex gap-4">
            <button aria-label="Przewiń ofertę w lewo" onClick={() => {
                const container = scrollRef.current;
                if (container && container.children.length > 0) {
                  const firstChild = container.children[0] as HTMLElement;
                  const gap = window.innerWidth >= 1024 ? 24 : 16;
                  const scrollAmount = firstChild.offsetWidth + gap;
                  container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
              }} className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-all duration-300 ease-out"
            >
              <ChevronLeft className="w-6 h-6 text-black" strokeWidth={1.5} />
            </button>
            <button aria-label="Przewiń ofertę w prawo" onClick={() => {
                const container = scrollRef.current;
                if (container && container.children.length > 0) {
                  const firstChild = container.children[0] as HTMLElement;
                  const gap = window.innerWidth >= 1024 ? 24 : 16;
                  const scrollAmount = firstChild.offsetWidth + gap;
                  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
              }} className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-all duration-300 ease-out"
            >
              <ChevronRight className="w-6 h-6 text-black" strokeWidth={1.5} />
            </button>
          </div>
        </div>
    </section>
  );
}
