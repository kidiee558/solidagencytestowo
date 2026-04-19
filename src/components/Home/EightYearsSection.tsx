import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export function EightYearsSection() {
  const { lang } = useLanguage();
  return (
    <section className="pt-32 pb-0 bg-black overflow-hidden" id="o-nas-8-lat">
      <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
        <div 
          className="text-white px-4 sm:px-0"
          style={{ 
            fontSize: 'clamp(1rem, .735915493rem + .8450704225vw, 1.75rem)',
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 300,
            letterSpacing: '-.01em',
            marginRight: 'auto',
            maxWidth: '15.625em',
            marginBottom: 'clamp(3.125rem, 5vw, 6.25rem)',
            position: 'relative',
            zIndex: 1
          }}
        >
          {lang === 'PL' ? '8 lat przesuwania granic, a to dopiero początek.' : '8 years of pushing boundaries, and this is just the beginning.'}
        </div>
        <h2 
          className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold text-white leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full"
          style={{ marginBottom: 'calc(-0.04em + 10px)' }}
        >
          {lang === 'PL' ? (
            <span className="whitespace-nowrap">SKALUJEMY</span>
          ) : (
            <span className="whitespace-nowrap">WE SCALE</span>
          )}
        </h2>
      </div>
    </section>
  );
}
