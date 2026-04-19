import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export const ContactPage = ({ onStartProjectClick, onAskAwayClick }: { onStartProjectClick: () => void, onAskAwayClick: () => void }) => {
  const { lang, t } = useLanguage();
  const text = lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US ";
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-between p-6 relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/t%C5%82o.mp4"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Curved Text Container */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden -translate-y-20 sm:translate-y-0">
        <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible scale-[1.4] sm:scale-100">
          <path id="curve" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
          <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
            <motion.textPath 
              xlinkHref="#curve" 
              animate={{ startOffset: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-[100px] sm:text-[150px] font-bold text-white uppercase tracking-[0.01em] fill-white font-bebas"
            >
              {text}
            </motion.textPath>
          </text>
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 w-full max-w-2xl translate-y-20 sm:translate-y-0">
        <span className="text-white/60 text-sm tracking-widest uppercase mb-4">{t('nav.contact')}</span>
        <h2 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none text-center mt-[1.25rem] mb-[2.5rem]">{lang === 'PL' ? 'Gotów, by stworzyć coś niepowtarzalnego?' : 'Ready to create something unique?'}</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button onClick={onStartProjectClick} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}</button>
          <button onClick={onAskAwayClick} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full flex justify-between items-end z-20 pb-4">
        <div className="text-sm">
          <p className="font-bold">POLAND</p>
          <p className="text-white/60">{lang === 'PL' ? 'Lubelskie, Lublin - Tutaj jesteśmy. Działamy na całym świecie.' : 'Lubelskie, Lublin - We are here. We operate worldwide.'}</p>
        </div>
        <div className="w-32"></div> {/* Spacer to maintain layout balance */}
      </footer>
    </div>
  );
};
