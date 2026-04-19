import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const OurWorksPage = ({ onBack, onStartProjectClick, onAskAwayClick, initialProjectId }: { 
  onBack: () => void, 
  onStartProjectClick: () => void, 
  onAskAwayClick: () => void,
  initialProjectId?: string
}) => {
  const { lang, t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<typeof categories[0] | null>(null);

  useEffect(() => {
    if (initialProjectId) {
      const project = categories.find(c => c.id === initialProjectId);
      if (project) {
        setSelectedProject(project);
        window.scrollTo(0, 0);
      }
    } else {
      setSelectedProject(null);
    }
  }, [initialProjectId]);

  interface Project {
    id: string;
    title: string;
    image: string;
    videoUrl?: string;
    additionalImages: string[];
  }

  const categories: Project[] = [
    {
      id: 'plan-streetfood',
      title: lang === 'PL' ? 'System prezentacji marki PLAN - Streetfood' : 'PLAN - Streetfood Brand Presentation System',
      image: 'https://github.com/kidiee558/solidagencytestowo/blob/main/Strona4.webp?raw=true',
      videoUrl: 'https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/Wideo5.mp4',
      additionalImages: [
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Strona4.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/plan%20zdjecia/plan1.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/plan%20zdjecia/plan2.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/plan%20zdjecia/plan3.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/plan%20zdjecia/plan4.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/plan%20zdjecia/plan5.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/plan%20zdjecia/plan6.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/plan%20zdjecia/plan7.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/plan%20zdjecia/plan8.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/plan%20zdjecia/plan9.webp?raw=true'
      ]
    },
    {
      id: 'medycyna-estetyczna',
      title: lang === 'PL' ? 'Rozbudowana strona dla kliniki medycyny estetyczna' : 'Extended Website for Aesthetic Medicine Clinic',
      image: 'https://github.com/kidiee558/solidagencytestowo/blob/main/Strona1.webp?raw=true',
      videoUrl: 'https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/Wideo1.mp4',
      additionalImages: [
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Strona1.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Rozbudowana%20Strona%20firmowa%20zdj%C4%99cia/rozbudowanastronafirmowa1.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Rozbudowana%20Strona%20firmowa%20zdj%C4%99cia/rozbudowanastronafirmowa2.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Rozbudowana%20Strona%20firmowa%20zdj%C4%99cia/rozbudowanastronafirmowa3.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Rozbudowana%20Strona%20firmowa%20zdj%C4%99cia/rozbudowanastronafirmowa4.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Rozbudowana%20Strona%20firmowa%20zdj%C4%99cia/rozbudowanastronafirmowa5.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Rozbudowana%20Strona%20firmowa%20zdj%C4%99cia/rozbudowanastronafirmowa6.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Rozbudowana%20Strona%20firmowa%20zdj%C4%99cia/rozbudowanastronafirmowa7.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Rozbudowana%20Strona%20firmowa%20zdj%C4%99cia/rozbudowanastronafirmowa8.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Rozbudowana%20Strona%20firmowa%20zdj%C4%99cia/rozbudowanastronafirmowa9.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Rozbudowana%20Strona%20firmowa%20zdj%C4%99cia/rozbudowanastronafirmowa10.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Rozbudowana%20Strona%20firmowa%20zdj%C4%99cia/rozbudowanastronafirmowa11.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Rozbudowana%20Strona%20firmowa%20zdj%C4%99cia/rozbudowanastronafirmowa12.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Rozbudowana%20Strona%20firmowa%20zdj%C4%99cia/rozbudowanastronafirmowa13.webp?raw=true'
      ]
    },
    {
      id: 'dynamika-3d',
      title: lang === 'PL' ? 'Dynamika produktu w środowisku 3D' : 'Product Dynamics in 3D Environment',
      image: 'https://github.com/kidiee558/solidagencytestowo/blob/main/Strona6.webp?raw=true',
      videoUrl: 'https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/Wizualizacja3D.mp4',
      additionalImages: [
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Strona6.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Wizualizacja3D%20zdj%C4%99cia/Strona1.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Wizualizacja3D%20zdj%C4%99cia/Strona2.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Wizualizacja3D%20zdj%C4%99cia/Strona3.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Wizualizacja3D%20zdj%C4%99cia/Strona4.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Wizualizacja3D%20zdj%C4%99cia/Strona5.webp?raw=true'
      ]
    },
    {
      id: 'producent-drinkow',
      title: lang === 'PL' ? 'Dedykowany system dla producenta drinków' : 'Dedicated System for Beverage Manufacturer',
      image: 'https://github.com/kidiee558/solidagencytestowo/blob/main/Strona2.webp?raw=true',
      videoUrl: 'https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/Wideo4.mp4',
      additionalImages: [
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Strona2.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Dedykowany%20system%20zdj%C4%99cia/projekt1.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Dedykowany%20system%20zdj%C4%99cia/projekt2.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Dedykowany%20system%20zdj%C4%99cia/projekt3.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Dedykowany%20system%20zdj%C4%99cia/projekt4.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Dedykowany%20system%20zdj%C4%99cia/projekt5.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Dedykowany%20system%20zdj%C4%99cia/projekt6.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Dedykowany%20system%20zdj%C4%99cia/projekt7.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Dedykowany%20system%20zdj%C4%99cia/projekt8.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Dedykowany%20system%20zdj%C4%99cia/projekt9.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Dedykowany%20system%20zdj%C4%99cia/projekt10.webp?raw=true'
      ]
    },
    {
      id: 'wizytowka-rozbudowana',
      title: lang === 'PL' ? 'Przykładowa rozbudowana wizytówka' : 'Sample Extended Business Card',
      image: 'https://github.com/kidiee558/solidagencytestowo/blob/main/Strona3.webp?raw=true',
      additionalImages: [
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Strona3.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/rozbudowana%20wizytowka%20zdjecia/wizytowka1.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/rozbudowana%20wizytowka%20zdjecia/wizytowka2.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/rozbudowana%20wizytowka%20zdjecia/wizytowka3.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/rozbudowana%20wizytowka%20zdjecia/wizytowka4.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/rozbudowana%20wizytowka%20zdjecia/wizytowka5.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/rozbudowana%20wizytowka%20zdjecia/wizytowka6.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/rozbudowana%20wizytowka%20zdjecia/wizytowka7.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/rozbudowana%20wizytowka%20zdjecia/wizytowka8.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/rozbudowana%20wizytowka%20zdjecia/wizytowka9.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/rozbudowana%20wizytowka%20zdjecia/wizytowka10.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/rozbudowana%20wizytowka%20zdjecia/wizytowka11.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/rozbudowana%20wizytowka%20zdjecia/wizytowka12.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/rozbudowana%20wizytowka%20zdjecia/wizytowka13.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/rozbudowana%20wizytowka%20zdjecia/wizytowka14.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/rozbudowana%20wizytowka%20zdjecia/wizytowka15.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/rozbudowana%20wizytowka%20zdjecia/wizytowka16.webp?raw=true'
      ]
    },
    {
      id: 'fairline-targa',
      title: lang === 'PL' ? 'Fairline Targa 45 GT – Immersyjny System UX' : 'Fairline Targa 45 GT – Immersive UX System',
      image: 'https://github.com/kidiee558/solidagencytestowo/blob/main/Strona5.webp?raw=true',
      videoUrl: 'https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/Wideo2.mp4',
      additionalImages: [
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Strona5.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Immersyjny%20system%20UX%20zdj%C4%99cia/Strona1.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Immersyjny%20system%20UX%20zdj%C4%99cia/Strona2.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Immersyjny%20system%20UX%20zdj%C4%99cia/Strona3.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Immersyjny%20system%20UX%20zdj%C4%99cia/Strona4.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Immersyjny%20system%20UX%20zdj%C4%99cia/Strona5.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Immersyjny%20system%20UX%20zdj%C4%99cia/Strona6.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Immersyjny%20system%20UX%20zdj%C4%99cia/Strona7.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Immersyjny%20system%20UX%20zdj%C4%99cia/Strona8.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Immersyjny%20system%20UX%20zdj%C4%99cia/Strona9.webp?raw=true',
        'https://github.com/kidiee558/solidagencytestowo/blob/main/Immersyjny%20system%20UX%20zdj%C4%99cia/Strona10.webp?raw=true'
      ]
    }
  ];

  if (selectedProject) {
    return (
      <div className="min-h-screen bg-[#050505] text-white pt-20">
        <button 
          onClick={() => { setSelectedProject(null); window.scrollTo(0, 0); }}
          className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors mb-12 ml-6 lg:ml-[6.25rem] mt-6"
        >
          <ArrowLeft className="w-6 h-6 text-white" strokeWidth={1.5} />
        </button>

        <div className="px-6 lg:px-[6.25rem] mb-12">
          <h2 className="text-white text-[clamp(1.5rem,3vw,2.5rem)] font-inter-tight font-normal tracking-tight text-center max-w-4xl mx-auto">
            {selectedProject.title}
          </h2>
        </div>

        <div className="w-full px-6 lg:px-[6.25rem] pb-32">
          <div className="grid grid-cols-1 gap-8 lg:max-w-[85%] mx-auto">
            {selectedProject.additionalImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <img 
                  src={img} 
                  alt={`${selectedProject.title} detail ${i + 1}`} 
                  className="w-full h-auto object-contain rounded-2xl border border-white/5 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-24 flex justify-center">
            <button 
              onClick={() => { setSelectedProject(null); window.scrollTo(0, 0); }}
              className="rounded-full border border-white/20 hover:bg-white/5 transition-colors px-12 h-16 flex items-center justify-center text-lg font-medium gap-3"
            >
              <ArrowLeft className="w-5 h-5" />
              {lang === 'PL' ? 'Powrót do listy' : 'Back to list'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-20">
      <button 
        onClick={onBack}
        className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/5 transition-colors mb-12 ml-6 lg:ml-[6.25rem] mt-6"
      >
        <ArrowLeft className="w-6 h-6 text-white" strokeWidth={1.5} />
      </button>

      <div className="w-full px-6 lg:px-[6.25rem] mb-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-32">
        <div className="text-white w-full lg:max-w-[16em]" style={{
          fontWeight: 300,
          fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
          fontFamily: 'Inter Tight, sans-serif',
          lineHeight: 1.1
        }}>
          {lang === 'PL' 
            ? 'Zestawienie 6 projektów zrealizowanych w ciągu ostatniego miesiąca.' 
            : 'A summary of 6 projects completed within the last month.'}
        </div>
        <div className="text-white w-full lg:ml-auto" style={{
          maxWidth: '550px',
          fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)',
          fontFamily: 'Inter Tight, sans-serif',
          fontWeight: 300,
          lineHeight: 1.5,
          letterSpacing: '.02em'
        }}>
          <p>
            {lang === 'PL' 
              ? 'Pokazujemy aktualne realizacje, abyś mógł ocenić standard naszych prac w czasie rzeczywistym. Nie bazujemy na projektach sprzed lat – działamy tu i teraz, dostosowując każdą witrynę do dzisiejszych wymagań rynku i algorytmów. To zestawienie potwierdza naszą gotowość do podjęcia kolejnych, wymagających wyzwań.' 
              : 'We show current projects so you can evaluate the standard of our work in real time. We don\'t rely on projects from years ago – we act here and now, adapting every website to today\'s market requirements and algorithms. This summary confirms our readiness to take on further demanding challenges.'}
          </p>
        </div>
      </div>

      {categories.map((cat, idx) => (
        <div key={idx} className="w-full px-6 lg:px-[6.25rem] mb-32">
          <div className="w-full mb-8">
            {cat.videoUrl ? (
              <video 
                src={cat.videoUrl} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full aspect-video object-cover rounded-3xl" 
              />
            ) : cat.image && (
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full aspect-video object-cover rounded-3xl" 
                referrerPolicy="no-referrer" 
              />
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <h3 className="text-white text-[clamp(1.5rem,2.5vw,2.25rem)] font-inter-tight font-normal leading-tight">
              {cat.title}
            </h3>
            <button 
              onClick={() => { setSelectedProject(cat); window.scrollTo(0, 0); }}
              className="rounded-full border border-white/20 hover:bg-white/5 transition-colors px-8 h-12 flex items-center justify-center text-sm font-medium whitespace-nowrap gap-2"
            >
              {lang === 'PL' ? 'Zobacz zdjęcia' : 'See photos'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      <section className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-between p-6 relative overflow-hidden">
        {/* Spacer for top to match homepage */}
        <div className="h-20 w-full"></div>

        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden -translate-y-20 sm:translate-y-0">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible scale-[1.4] sm:scale-100">
            <path id="curve-ourworks" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
            <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <motion.textPath 
                xlinkHref="#curve-ourworks" 
                animate={{ startOffset: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-[100px] sm:text-[150px] font-bold text-white uppercase tracking-[0.01em] fill-white font-bebas"
              >
                {lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 w-full max-w-2xl translate-y-20 sm:translate-y-0">
          <span className="text-white/60 text-sm tracking-widest uppercase mb-4">{t('nav.contact')}</span>
          <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none text-center mt-[1.25rem] mb-[2.5rem]">{lang === 'PL' ? 'Gotów, by stworzyć coś niepowtarzalnego?' : 'Ready to create something unique?'}</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={onStartProjectClick} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}</button>
            <button onClick={onAskAwayClick} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}</button>
          </div>
        </div>

        <footer className="w-full flex justify-between items-end z-20 pb-4">
          <div className="text-sm">
            <p className="font-bold">POLAND</p>
            <p className="text-white/60">{lang === 'PL' ? 'Lubelskie, Lublin - Tutaj jesteśmy. Działamy na całym świecie.' : 'Lubelskie, Lublin - We are here. We operate worldwide.'}</p>
          </div>
          <div className="w-32"></div>
        </footer>
      </section>
    </div>
  );
};