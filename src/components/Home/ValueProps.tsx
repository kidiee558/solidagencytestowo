import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export function ValueProps() {
  const { lang } = useLanguage();
  return (
    <section className="bg-white py-5 lg:py-[1.25rem]">
      <div className="grid grid-cols-1 lg:grid-cols-2 px-6 lg:px-[6.25rem] gap-8 lg:gap-0">
        <div className="text-black w-full lg:max-w-[10.8125em]" style={{
          fontWeight: 300,
          fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
          fontFamily: 'Inter Tight, sans-serif',
          lineHeight: 1.2
        }}>
          {lang === 'PL' ? 'Budujemy infrastrukturę, która zamienia kliknięcia w lojalnych klientów.' : 'We build infrastructure that turns clicks into loyal customers.'}
        </div>
        <div className="text-black lg:col-start-2 lg:row-start-2 lg:ml-auto w-full lg:max-w-[27.5em]" style={{
          fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)',
          fontFamily: 'Inter Tight, sans-serif',
          fontWeight: 300,
          lineHeight: 1.2,
          letterSpacing: '.02em'
        }}>
          <p className="mb-4">
            {lang === 'PL' ? 'To, co widzisz, to nie jest zwykły projekt graficzny. To precyzyjnie zaprojektowana architektura przepływu użytkownika, która eliminuje przypadkowość z Twojego marketingu.' : 'What you see is not just an ordinary graphic design. It is a precisely designed user flow architecture that eliminates randomness from your marketing.'}
          </p>
          <p>
            {lang === 'PL' ? 'Każdy element – od struktury strony, po zaawansowane śledzenie konwersji – został zoptymalizowany pod jeden cel: maksymalizację zwrotu z Twoich inwestycji.' : 'Every element – from the website structure to advanced conversion tracking – has been optimized for one goal: maximizing the return on your investments.'}
          </p>
        </div>
      </div>
    </section>
  );
}
