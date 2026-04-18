import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function PoradnikPage({ onArticleClick }: { onArticleClick: (id: string) => void }) {
  const { lang } = useLanguage();
  const articles = [
    { 
      id: 'ux-design', 
      date: '15.03.2026', 
      title: lang === 'PL' ? 'UX Design: Strategia zatrzymywania użytkownika i optymalizacji zysku' : 'UX Design: User retention strategy and profit optimization', 
      description: lang === 'PL' ? 'User Experience (UX) Design to proces tworzenia produktów, które dostarczają użytkownikom istotnych i trafnych doświadczeń. Obejmuje on projektowanie całego procesu nabywania i integracji produktu, w tym aspektów brandingu, designu, użyteczności i funkcji.' : 'User Experience (UX) Design is the process of creating products that provide meaningful and relevant experiences to users. This involves the design of the entire process of acquiring and integrating the product, including aspects of branding, design, usability and function.', 
      image: 'https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-UXdesign.png?raw=true', 
      bgColor: '#2B2B2B' 
    },
    { 
      id: 'architektura-strony', 
      date: '20.03.2026', 
      title: lang === 'PL' ? 'Architektura strony: Kompletny przewodnik po budowie wydajnego systemu sprzedaży' : 'Website architecture: A complete guide to building an efficient sales system', 
      description: lang === 'PL' ? 'Architektura strony internetowej to strategiczny fundament, na którym opiera się cały sukces w sieci. To znacznie więcej niż tylko układ menu czy rozmieszczenie przycisków.' : 'Website architecture is the strategic foundation on which all online success is built. It is much more than just the menu layout or the placement of buttons.', 
      image: 'https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-seo.png?raw=true', 
      bgColor: '#2B2B2B' 
    },
    { 
      id: 'google-meta-ads', 
      date: '25.03.2026', 
      title: lang === 'PL' ? 'Google Ads czy Meta Ads? Gdzie Twoja firma powinna wydać pierwszy budżet?' : 'Google Ads or Meta Ads? Where should your company spend its first budget?', 
      description: lang === 'PL' ? 'Większość osób myśli, że reklama w internecie to po prostu „płacenie za to, żeby nas widzieli”. W rzeczywistości to precyzyjna maszyna do kupowania uwagi konkretnych ludzi.' : 'Most people think that advertising on the internet is simply "paying to be seen". In reality, it is a precise machine for buying the attention of specific people.', 
      image: 'https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-ads.png?raw=true', 
      bgColor: '#2B2B2B' 
    },
    { 
      id: 'rebranding', 
      date: '01.04.2026', 
      title: lang === 'PL' ? 'Rebranding strony: Kiedy odświeżenie wyglądu to za mało?' : 'Website rebranding: When refreshing the look is not enough?', 
      description: lang === 'PL' ? 'W świecie cyfrowym, który pędzi do przodu, Twoja strona internetowa starzeje się szybciej niż jakikolwiek inny element biznesu. Prawdziwy rebranding to nie pudrowanie rzeczywistości – to głęboka, strategiczna operacja na wizerunku i technologii.' : 'In a digital world that is rushing forward, your website ages faster than any other element of business. True rebranding is not powdering reality - it is a deep, strategic operation on image and technology.', 
      image: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/informacje-rebranding.png', 
      bgColor: '#2B2B2B', 
      padding: 'p-0' 
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-screen w-full overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/t%C5%82o.mp4"
        />
        <div className="absolute inset-0 bg-black/40 z-[1]"></div>
        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-4 sm:px-8 w-full max-w-[1920px] mx-auto">
          <div className="flex flex-col items-start w-full justify-center">
            <div className="text-center w-full">
              <div className="flex flex-col items-center w-full">
                <h1 
                  className="font-bold text-white tracking-tight leading-[1.1] flex flex-col gap-1 lg:gap-2 w-full"
                  aria-label={lang === 'PL' ? "NASZ PORADNIK" : "OUR GUIDE"}
                >
                  <span className="flex flex-col items-center w-full" aria-hidden="true">
                    {/* Mobile Layout (Stacked & Centered) */}
                    <div className="flex sm:hidden flex-col w-full items-center -mt-2">
                      <div 
                        className="text-[clamp(7.5rem,22vw,32rem)] font-humane font-black text-white leading-[0.75] uppercase tracking-[0.005em] relative text-center w-full"
                        style={{ marginBottom: 'calc(-0.04em + 10px)' }}
                      >
                        <span className="whitespace-nowrap">{lang === 'PL' ? 'NASZ' : 'OUR'}</span>
                      </div>
                      <div 
                        className="text-[clamp(7.5rem,22vw,32rem)] font-humane font-black text-white leading-[0.75] uppercase tracking-[0.005em] relative text-center w-full"
                        style={{ paddingTop: 'calc(0.04em + 10px)' }}
                      >
                        <span className="whitespace-nowrap">{lang === 'PL' ? 'PORADNIK' : 'GUIDE'}</span>
                      </div>
                    </div>

                    {/* PC Layout (One Line) */}
                    <div className="hidden sm:flex flex-row justify-center items-center w-full">
                      <div 
                        className="text-[clamp(7.5rem,22vw,32rem)] sm:text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-black text-white leading-[0.75] uppercase tracking-[0.005em] relative whitespace-nowrap"
                      >
                        {lang === 'PL' ? 'NASZ PORADNIK' : 'OUR GUIDE'}
                      </div>
                    </div>

                    {/* Description (Centered on both) */}
                    <div className="flex flex-col items-center gap-6 pb-4 sm:pb-[2vw] w-full mt-8 sm:mt-12 lg:mt-16">
                      <div className="w-full flex flex-col items-center">
                        <div className="w-20 h-[1px] bg-white/30 mb-4" />
                        <div 
                          className="font-inter-tight text-slate-200 uppercase text-center break-words max-w-[45ch]"
                          style={{ 
                            fontSize: 'clamp(0.6rem, 0.4rem + 0.8vw, 1.6rem)',
                            letterSpacing: '0.05em',
                            fontWeight: '300',
                            lineHeight: '1.2'
                          }}
                        >
                          {lang === 'PL' ? 'Wiedza, trendy i wskazówki ze świata web designu, e-commerce i marketingu.' : 'Knowledge, trends and tips from the world of web design, e-commerce and marketing.'}
                        </div>
                      </div>
                    </div>
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="articles__wrapper" style={{
        position: 'relative',
        paddingInline: '1.875rem',
        paddingBlock: '10.625rem',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '5.625rem'
      }}>
        {articles.map((article, index) => (
          <div key={index} className="flex flex-col lg:flex-row items-start w-full border-b border-white/10 pb-12 last:border-0 gap-8 lg:gap-16">
            <div className={`w-full lg:w-5/12 shrink-0 overflow-hidden rounded-3xl flex items-center justify-center ${(article as any).padding || 'p-8'}`} style={{ backgroundColor: (article as any).bgColor || '#2B2B2B' }}>
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full aspect-[4/3] object-contain hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="w-full lg:w-7/12 flex flex-col items-start">
              <div style={{
                width: '100%',
                textAlign: 'left',
                fontSize: 'clamp(.75rem, .6910377358rem + .1886792453vw, .875rem)',
                fontFamily: 'Geist Mono, monospace',
                fontWeight: 400,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                paddingBottom: '1.25rem'
              }}>
                {article.date}
              </div>
              <h2 style={{
                fontWeight: 300,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                marginBottom: '1.25rem',
                maxWidth: '13.75em',
                lineHeight: 1.3,
                fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
                fontFamily: 'Inter Tight, sans-serif'
              }}>
                {article.title}
              </h2>
              <p style={{
                textTransform: 'none',
                fontWeight: 300,
                lineHeight: 1.6,
                maxWidth: '32.5em',
                paddingBottom: '1.25rem',
                fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)',
                fontFamily: 'Inter Tight, sans-serif',
                letterSpacing: '.02em'
              }}>
                {article.description}
              </p>
              <button onClick={() => onArticleClick(article.id)} style={{
                height: '4rem',
                minWidth: '15rem',
                border: '1px solid rgba(255, 255, 255, .2509803922)',
                borderRadius: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                width: 'fit-content',
                fontSize: 'clamp(.875rem, .7570754717rem + .3773584906vw, 1.125rem)',
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 400,
                lineHeight: 1.4,
                letterSpacing: '.02em',
                backgroundColor: 'transparent',
                color: 'white'
              }} className="hover:bg-white hover:text-black transition-colors">
                {lang === 'PL' ? 'Czytaj więcej' : 'Read more'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
