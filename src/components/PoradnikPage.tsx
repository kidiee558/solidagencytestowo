import React from 'react';
import { ArrowRight } from 'lucide-react';

export function PoradnikPage({ onBack, onArticleClick }: { onBack: () => void, onArticleClick: () => void }) {
  const articles = [
    { date: '01.04.2026', title: 'Jak zwiększyć konwersję na stronie?', description: 'Poznaj skuteczne techniki optymalizacji, które zamienią odwiedzających w klientów i zwiększą Twoje zyski w krótkim czasie.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' },
    { date: '25.03.2026', title: 'Google Ads czy Meta Ads?', description: 'Dowiedz się, który kanał reklamy będzie lepszy dla Twojego biznesu w 2026 roku. Porównujemy koszty, zasięgi i skuteczność obu platform.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop' },
    { date: '12.03.2026', title: 'Trendy w Web Designie na 2026', description: 'Odkryj najnowsze trendy w projektowaniu interfejsów użytkownika. Od minimalizmu po zaawansowane animacje 3D, które przyciągają wzrok.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop' },
    { date: '28.02.2026', title: 'Sekrety skutecznego pozycjonowania SEO', description: 'Zbuduj trwały ruch organiczny dzięki naszym sprawdzonym metodom. Jak dobierać słowa kluczowe i budować wartościowy profil linków.', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop' }
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
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/zaebistetlo.mp4"
        />
        <div className="absolute inset-0 bg-black/40 z-[1]"></div>
        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-syne font-bold text-white tracking-tighter mb-6">NASZ PORADNIK</h1>
          <p className="text-slate-300 font-inter-tight text-lg md:text-xl max-w-2xl text-center px-4">
            Wiedza, trendy i wskazówki ze świata web designu, e-commerce i marketingu.
          </p>
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
            <div className="w-full lg:w-5/12 shrink-0 overflow-hidden rounded-3xl">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
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
              <button onClick={onArticleClick} style={{
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
                Czytaj więcej
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
