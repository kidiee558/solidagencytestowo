import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

export function ExpertiseSection() {
  const { lang } = useLanguage();
  return (
    <div className="pt-24 lg:pt-12 pb-16 sm:pb-40 lg:pb-48 relative z-20 bg-black" id="ekspertyza">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Left Side - Video */}
          <div className="w-[calc(100%+2rem)] -mx-4 sm:w-full sm:mx-0 lg:w-[65%] -mt-24 sm:mt-0">
            <div 
              className="relative w-full overflow-hidden rounded-none sm:rounded-3xl"
              style={{ aspectRatio: '702/395' }}
            >
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
                src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/homepagewideo.mp4"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-[35%] text-center lg:text-left px-4 sm:px-0">
            <h2 
              className="font-inter-tight text-white mb-8"
              style={{ 
                lineHeight: '1.05', 
                fontWeight: '300',
                fontSize: 'clamp(1.75rem, 1.5rem + 2vw, 3.5rem)'
              }}
            >
              {lang === 'PL' ? (
                <><span className="text-shimmer font-bold inline-block">Inwestuj w wynik,</span> zamiast samej obecności.</>
              ) : (
                <><span className="text-shimmer font-bold inline-block">Invest in results,</span> instead of just presence.</>
              )}
            </h2>
            <p 
              className="font-inter-tight text-slate-200 opacity-80"
              style={{ 
                fontSize: 'clamp(0.9rem, 0.7rem + 0.7vw, 1.5rem)',
                letterSpacing: '-.01em',
                fontWeight: '300',
                lineHeight: '1.4'
              }}
            >
              {lang === 'PL' ? (
                 <>Estetyka premium to w naszym wydaniu inżynieria konwersji. Budujemy <strong className="text-white">najwydajniejsze strony w Polsce</strong>, co potwierdza nasza witryna - osiągając <strong className="text-white">4x 100% w audycie Google Lighthouse</strong>. Eliminujemy błędy typowe dla standardowych wdrożeń, dostarczając produkt <strong className="text-white">bezkonkurencyjny</strong> pod kątem SEO i szybkości.</>
              ) : (
                 <>Premium aesthetics in our edition is conversion engineering. We build <strong className="text-white">the most efficient websites in Poland</strong>, which is confirmed by our site - achieving <strong className="text-white">4x 100% in the Google Lighthouse audit</strong>. We eliminate errors typical of standard implementations, providing a product that is <strong className="text-white">unrivaled</strong> in terms of SEO and speed.</>
              )}
            </p>

            {/* Lighthouse Scores */}
            <div className="flex justify-center gap-4 mt-8">
              {[
                { label: lang === 'PL' ? 'Wydajność' : 'Performance', value: '100%' },
                { label: lang === 'PL' ? 'Dostępność' : 'Accessibility', value: '100%' },
                { label: lang === 'PL' ? 'Standardy' : 'Standards', value: '100%' },
                { label: 'SEO', value: '100%' },
              ].map((score, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-400 font-bold bg-black shadow-lg shadow-emerald-900/20">
                    {score.value}
                  </div>
                  <span className="text-[11px] sm:text-xs text-slate-300 uppercase font-mono font-normal tracking-wide">{score.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-6">
              <div 
                className="font-inter-tight text-slate-100 text-center font-normal"
                style={{ 
                  fontSize: 'clamp(0.9rem, 0.7rem + 0.6vw, 1.2rem)',
                  letterSpacing: '-.01em',
                  maxWidth: '500px'
                }}
              >
                {lang === 'PL' ? 'Nie wierzysz? Przetestuj naszą stronę samemu i porównaj nasz wynik z dowolną inną agencją.' : 'Don\'t believe it? Test our site yourself and compare our result with any other agency.'}
              </div>
              <a 
                href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fais-dev-dt5oyxh6uafxaejn4s7zdl-23907734367.europe-west2.run.app%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full border border-white/30 hover:border-white/50 bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center gap-2 group text-sm sm:text-base shadow-lg shadow-white/5"
              >
                {lang === 'PL' ? 'Google PageSpeed Insights' : 'Google PageSpeed Insights'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
