import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function StartProjectPage({ onBack, initialStep = 1, onStepChange }: { onBack: () => void, initialStep?: number, onStepChange?: (step: number) => void }) {
  const { lang } = useLanguage();
  const [step, setStep] = useState(initialStep);

  React.useEffect(() => {
    if (onStepChange) {
      onStepChange(step);
    }
  }, [step, onStepChange]);

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  const services = lang === 'PL' ? [
    "Strona internetowa",
    "Sklep e-commerce",
    "Kampanie Ads",
    "Pozycjonowanie SEO"
  ] : [
    "Website",
    "E-commerce store",
    "Ads Campaigns",
    "SEO Optimization"
  ];

  const getDetailsOptions = () => {
    switch (selectedService) {
      case "Strona internetowa":
      case "Website":
        return lang === 'PL' ? [
          "Strona wizytówka",
          "Strona dla firmy",
          "Rozbudowany serwis",
          "Dedykowany projekt"
        ] : [
          "Business card website",
          "Company website",
          "Extensive service",
          "Dedicated project"
        ];
      case "Sklep e-commerce":
      case "E-commerce store":
        return lang === 'PL' ? [
          "Mały/Średni sklep",
          "Rozbudowany sklep",
          "Premium & B2B",
          "Dedykowana platforma"
        ] : [
          "Small/Medium store",
          "Extensive store",
          "Premium & B2B",
          "Dedicated platform"
        ];
      case "Kampanie Ads":
      case "Ads Campaigns":
        return lang === 'PL' ? [
          "Google Ads",
          "Meta Ads",
          "TikTok/LinkedIn etc.",
          "Kompleksowa usługa"
        ] : [
          "Google Ads",
          "Meta Ads",
          "TikTok/LinkedIn etc.",
          "Comprehensive service"
        ];
      case "Pozycjonowanie SEO":
      case "SEO Optimization":
        return lang === 'PL' ? [
          "Audyt SEO",
          "Lokalne SEO",
          "Ogólnopolskie SEO",
          "SEO dla e-commerce"
        ] : [
          "SEO Audit",
          "Local SEO",
          "National SEO",
          "SEO for e-commerce"
        ];
      default:
        return services;
    }
  };

  const details = getDetailsOptions();

  const budgets = lang === 'PL' ? [
    "do 2500 PLN",
    "2500 - 5000 PLN",
    "5000 - 10 000 PLN",
    "Powyżej 10 000 PLN"
  ] : [
    "up to 2500 PLN",
    "2500 - 5000 PLN",
    "5000 - 10 000 PLN",
    "Above 10 000 PLN"
  ];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: selectedService,
          detail: selectedDetail,
          budget: selectedBudget,
        }),
      });
      if (response.ok) {
        handleNext();
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to send email');
    }
  };

  const handleBack = () => {
    if (step === 1) {
      onBack();
    } else {
      setStep(prev => prev - 1);
    }
  };

  return (
    <div className="init-step relative z-40 flex flex-col items-center justify-center bg-black text-white overflow-hidden min-h-screen">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60"
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/t%C5%82o.mp4"
        />
      </div>

      {/* Navigation Controls */}
      {step > 1 && step < 5 && (
        <div className="absolute top-24 left-2 right-2 px-2 md:top-32 md:left-24 md:right-24 z-20 flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-4">
            {step === 4 && <LanguageSwitcher className="hidden sm:flex" />}
            <div
              className="text-white font-humane"
              style={{
                fontSize: 'clamp(3rem, 1rem + 5vw, 6rem)',
                lineHeight: '.75',
                fontFamily: 'Humane, sans-serif',
                fontWeight: 900
              }}
            >
              {step === 2 ? '01' : step === 3 ? '02' : '03'}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="init-step init-step__inner flex flex-col items-center w-full"
            >
              <h2 
                className="mb-[.625rem] text-center uppercase"
                style={{
                  fontSize: 'clamp(.75rem, .6910377358rem + .1886792453vw, .875rem)',
                  fontFamily: 'Geist Mono, monospace',
                  fontWeight: 300,
                  letterSpacing: '.2em'
                }}
              >
                {lang === 'PL' ? 'ZACZYNAJMY' : 'LET\'S START'}
              </h2>
              <h3 
                className="mb-12 text-center"
                style={{
                  fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 300,
                  lineHeight: 1.2
                }}
              >
                {lang === 'PL' ? 'Z czym możemy Ci pomóc?' : 'How can we help you?'}
              </h3>
              
              <div className="options">
                {services.map((service) => (
                  <button
                    key={service}
                    onClick={() => {
                      setSelectedService(service);
                      setSelectedDetail(null);
                    }}
                    className={`px-6 text-sm sm:text-base whitespace-nowrap ${selectedService === service ? 'bg-white text-black' : 'bg-transparent text-white hover:bg-white/10'}`}
                    style={{
                      border: '2px solid rgba(255, 255, 255, .2509803922)',
                      height: '3.625rem',
                      width: '100%',
                      maxWidth: '220px',
                      margin: '0 auto',
                      borderRadius: '60px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all .2s linear'
                    }}
                  >
                    {service}
                  </button>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: selectedService ? 1 : 0, y: selectedService ? 0 : 10 }}
                  onClick={handleNext}
                  className={`continue-btn px-10 py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-gray-200 ${!selectedService ? 'pointer-events-none' : ''}`}
                  style={{
                    borderRadius: '60px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all .2s linear',
                    height: '3.625rem',
                    width: '220px',
                    margin: '0 auto'
                  }}
                >
                  {lang === 'PL' ? 'Kontynuuj' : 'Continue'}
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="init-step init-step__inner flex flex-col items-center w-full"
            >
              <h2 
                className="mb-[.625rem] text-center uppercase"
                style={{
                  fontSize: 'clamp(.75rem, .6910377358rem + .1886792453vw, .875rem)',
                  fontFamily: 'Geist Mono, monospace',
                  fontWeight: 300,
                  letterSpacing: '.2em'
                }}
              >
                {lang === 'PL' ? 'POWIEDZ COŚ WIĘCEJ' : 'TELL US MORE'}
              </h2>
              <h3 
                className="mb-12 text-center"
                style={{
                  fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 300,
                  lineHeight: 1.2
                }}
              >
                {lang === 'PL' ? 'Jakiej dokładnie usługi szukasz?' : 'What exact service are you looking for?'}
              </h3>
              
              <div className="options">
                {details.map((detail) => (
                  <button
                    key={detail}
                    onClick={() => setSelectedDetail(detail)}
                    className={`px-6 text-sm sm:text-base whitespace-nowrap ${selectedDetail === detail ? 'bg-white text-black' : 'bg-transparent text-white hover:bg-white/10'}`}
                    style={{
                      border: '2px solid rgba(255, 255, 255, .2509803922)',
                      height: '3.625rem',
                      width: '100%',
                      maxWidth: '220px',
                      margin: '0 auto',
                      borderRadius: '60px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all .2s linear'
                    }}
                  >
                    {detail}
                  </button>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: selectedDetail ? 1 : 0, y: selectedDetail ? 0 : 10 }}
                  onClick={handleNext}
                  className={`continue-btn px-10 py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-gray-200 ${!selectedDetail ? 'pointer-events-none' : ''}`}
                  style={{
                    borderRadius: '60px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all .2s linear',
                    height: '3.625rem',
                    width: '220px',
                    margin: '0 auto'
                  }}
                >
                  {lang === 'PL' ? 'Kontynuuj' : 'Continue'}
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="init-step init-step__inner flex flex-col items-center w-full"
            >
              <h2 
                className="mb-[.625rem] text-center uppercase"
                style={{
                  fontSize: 'clamp(.75rem, .6910377358rem + .1886792453vw, .875rem)',
                  fontFamily: 'Geist Mono, monospace',
                  fontWeight: 300,
                  letterSpacing: '.2em'
                }}
              >
                {lang === 'PL' ? 'BUDŻET NA PROJEKT' : 'PROJECT BUDGET'}
              </h2>
              <h3 
                className="mb-12 text-center"
                style={{
                  fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 300,
                  lineHeight: 1.2
                }}
              >
                {lang === 'PL' ? 'Jaki budżet jesteś w stanie przeznaczyć na swój projekt?' : 'What budget are you able to allocate for your project?'}
              </h3>
              
              <div className="options">
                {budgets.map((budget) => (
                  <button
                    key={budget}
                    onClick={() => setSelectedBudget(budget)}
                    className={`px-6 text-sm sm:text-base whitespace-nowrap ${selectedBudget === budget ? 'bg-white text-black' : 'bg-transparent text-white hover:bg-white/10'}`}
                    style={{
                      border: '2px solid rgba(255, 255, 255, .2509803922)',
                      height: '3.625rem',
                      width: '100%',
                      maxWidth: '220px',
                      margin: '0 auto',
                      borderRadius: '60px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all .2s linear'
                    }}
                  >
                    {budget}
                  </button>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: selectedBudget ? 1 : 0, y: selectedBudget ? 0 : 10 }}
                  onClick={handleNext}
                  className={`continue-btn px-10 py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-gray-200 ${!selectedBudget ? 'pointer-events-none' : ''}`}
                  style={{
                    borderRadius: '60px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all .2s linear',
                    height: '3.625rem',
                    width: '220px',
                    margin: '0 auto'
                  }}
                >
                  {lang === 'PL' ? 'Kontynuuj' : 'Continue'}
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="init-step init-step__inner flex flex-col items-center justify-center w-full h-full last-contact pt-0 md:pt-0"
            >
              <div className="title flex flex-col items-center">
                <p 
                  className="mb-[.625rem] text-center uppercase"
                  style={{
                    fontSize: 'clamp(.75rem, .6910377358rem + .1886792453vw, .875rem)',
                    fontFamily: 'Geist Mono, monospace',
                    fontWeight: 300,
                    letterSpacing: '.2em'
                  }}
                >
                  {lang === 'PL' ? 'PRAWIE GOTOWE' : 'ALMOST READY'}
                </p>
                <h2 
                  className="mb-12 text-center"
                  style={{
                    fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
                    fontFamily: 'Inter Tight, sans-serif',
                    fontWeight: 300,
                    lineHeight: 1.2,
                    maxWidth: '12.25em'
                  }}
                >
                  {lang === 'PL' ? 'Jak możemy się z Tobą skontaktować?' : 'How can we contact you?'}
                </h2>
              </div>
              
              <div className="form w-full max-w-md flex flex-col gap-4">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'PL' ? "IMIĘ" : "NAME"} 
                  className="w-full bg-transparent border-b border-white/30 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === 'PL' ? "E-MAIL" : "E-MAIL"} 
                  className="w-full bg-transparent border-b border-white/30 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
                />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={lang === 'PL' ? "NUMER TELEFONU" : "PHONE NUMBER"} 
                  className="w-full bg-transparent border-b border-white/30 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors mb-6"
                />
                
                <button
                  onClick={(e) => { e.preventDefault(); handleSubmit(); }}
                  className="submit-btn font-bold uppercase tracking-wider rounded-full"
                  style={{
                    height: '4rem',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    columnGap: '.625rem',
                    background: '#cbc3e5',
                    color: '#000',
                    cursor: 'pointer',
                    transition: 'all .2s linear',
                    marginInline: 'auto'
                  }}
                >
                  {lang === 'PL' ? 'DALEJ' : 'NEXT'}
                </button>

                <div className="mt-2 text-center flex flex-col gap-0">
                  <p className="text-white/60 text-sm font-inter-tight">{lang === 'PL' ? 'Lub skontaktuj się bezpośrednio:' : 'Or contact us directly:'}</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-4">
                    <a href="tel:+48796103087" className="text-white font-bold text-lg hover:text-[#cbc3e5] transition-colors">+48 796 103 087</a>
                    <a href="mailto:solidagencypl@gmail.com" className="text-white font-bold hover:text-[#cbc3e5] transition-colors">solidagencypl@gmail.com</a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <div className="bg-[#4ade80] text-black p-12 rounded-3xl flex flex-col items-center justify-center text-center max-w-md w-full shadow-2xl">
                <h2 
                  className="text-3xl font-bold mb-4"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {lang === 'PL' ? 'GOTOWE!' : 'DONE!'}
                </h2>
                <p 
                  className="text-lg font-normal"
                  style={{ fontFamily: 'Geist Mono, monospace' }}
                >
                  {lang === 'PL' ? 'Odezwiemy się wkrótce.' : 'We will be in touch soon.'}
                </p>
                
                <button
                  onClick={onBack}
                  className="mt-8 px-8 py-3 bg-black text-white rounded-full font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {lang === 'PL' ? 'Wróć do strony głównej' : 'Back to home page'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
