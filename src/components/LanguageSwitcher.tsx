import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { lang, setLang } = useLanguage();
  return (
    <div className={`flex items-center gap-2 bg-[#050505]/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 pointer-events-auto ${className}`}>
      <button 
        onClick={() => setLang('PL')}
        className={`text-xs font-bold transition-colors ${lang === 'PL' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
      >
        PL
      </button>
      <span className="text-white/30 text-xs">/</span>
      <button 
        onClick={() => setLang('ENG')}
        className={`text-xs font-bold transition-colors ${lang === 'ENG' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
      >
        ENG
      </button>
    </div>
  );
};
