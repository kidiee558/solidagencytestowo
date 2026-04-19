import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export function FreeProjectOffer() {
  const { lang } = useLanguage();
  return (
    <section className="pt-0 pb-32 bg-white overflow-hidden">
      <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
        <h2 
          className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold text-black leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full"
          style={{ paddingTop: 'calc(0.04em + 10px)' }}
        >
          <span className="sm:hidden flex flex-col items-end text-right w-full">
            {lang === 'PL' ? (
              <span>FIRMY</span>
            ) : (
              <span>BUSINESSES</span>
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
                <span className="text-right">{lang === 'PL' ? 'FIRMY' : 'BUSINESSES'}</span>
            </span>
          </span>
        </h2>
      </div>
    </section>
  );
}
