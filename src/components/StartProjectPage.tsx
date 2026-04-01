import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft } from 'lucide-react';

export function StartProjectPage({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  const services = [
    "Strona internetowa",
    "Sklep e-commerce",
    "Kampanie Ads",
    "Pozycjonowanie SEO"
  ];

  const details = [
    "Strona internetowa",
    "Sklep e-commerce",
    "Kampanie Ads",
    "Pozycjonowanie SEO"
  ];

  const budgets = [
    "do 2500 PLN",
    "2500 - 5000 PLN",
    "5000 - 10 000 PLN",
    "Powyżej 10 000 PLN"
  ];

  const handleNext = () => {
    setStep(prev => prev + 1);
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
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/zaebistetlo.mp4"
        />
      </div>

      {/* Navigation Controls */}
      {step > 1 && (
        <div className="absolute top-24 left-2 right-2 px-2 md:top-32 md:left-24 md:right-24 z-20 flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
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
                  fontWeight: 400,
                  letterSpacing: '.2em'
                }}
              >
                ZACZYNAJMY
              </h2>
              <h3 
                className="mb-12 text-center"
                style={{
                  fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 400,
                  lineHeight: 1.2
                }}
              >
                Z czym możemy Ci pomóc?
              </h3>
              
              <div className="options">
                {services.map((service) => (
                  <button
                    key={service}
                    onClick={() => setSelectedService(service)}
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
                  Kontynuuj
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
                  fontWeight: 400,
                  letterSpacing: '.2em'
                }}
              >
                POWIEDZ COŚ WIĘCEJ
              </h2>
              <h3 
                className="mb-12 text-center"
                style={{
                  fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 400,
                  lineHeight: 1.2
                }}
              >
                Jakiej dokładnie usługi szukasz?
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
                  Kontynuuj
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
                  fontWeight: 400,
                  letterSpacing: '.2em'
                }}
              >
                BUDŻET NA PROJEKT
              </h2>
              <h3 
                className="mb-12 text-center"
                style={{
                  fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 400,
                  lineHeight: 1.2
                }}
              >
                Jaki budżet jesteś w stanie przeznaczyć na swój projekt?
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
                  onClick={() => {
                    onBack();
                  }}
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
                  Kontynuuj
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
