import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export function ContactSection({ onStartProjectClick, onAskAwayClick }: { onStartProjectClick: () => void, onAskAwayClick: () => void }) {
  const { lang, t } = useLanguage();
  const text = lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US ";
  
  return (
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
              className="text-[100px] sm:text-[150px] font-bold text-black uppercase tracking-[0.01em] fill-black font-bebas"
            >
              {text}
            </motion.textPath>
          </text>
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
        <span className="text-black/60 text-sm tracking-widest uppercase">{t('nav.contact')}</span>
        <h2 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">{lang === 'PL' ? 'Gotów, by stworzyć coś niepowtarzalnego?' : 'Ready to create something unique?'}</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button onClick={onStartProjectClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}</button>
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
  );
}
