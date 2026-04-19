import React, { useState, useRef, useEffect} from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from './contexts/LanguageContext';
import { 
  X,
  ArrowRight, ChevronDown,
  ChevronLeft, ChevronRight
, ArrowLeft, Plus
} from 'lucide-react';
import gsap from 'gsap';
import useEmblaCarousel from 'embla-carousel-react';



function ContactModal({ isOpen, onClose, title, subtitle }: { isOpen: boolean, onClose: () => void, title?: string, subtitle?: string }) {
  const { lang } = useLanguage();
  const [selectedService, setSelectedService] = useState<string>("");
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = lang === 'PL' ? [
    "strony internetowe",
    "sklepy internetowe",
    "google ads & meta ads",
    "optymalizacja SEO"
  ] : [
    "websites",
    "e-commerce stores",
    "google ads & meta ads",
    "SEO optimization"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email: contactInfo.includes('@') ? contactInfo : undefined,
          phone: !contactInfo.includes('@') ? contactInfo : undefined,
          service: selectedService,
          message,
        }),
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert(lang === 'PL' ? 'Nie udało się wysłać wiadomości.' : 'Failed to send message.');
      }
    } catch (error) {
      console.error(error);
      alert(lang === 'PL' ? 'Nie udało się wysłać wiadomości.' : 'Failed to send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsSubmitted(false);
        setName("");
        setContactInfo("");
        setMessage("");
        setSelectedService("");
      }, 300);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Blurred Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-[420px] max-h-[90vh] overflow-y-auto bg-[#1a1a1a] rounded-2xl shadow-2xl border border-white/10 flex flex-col scrollbar-hide"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[#1a1a1a] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_#B0B8C2_0%,_transparent_50%),radial-gradient(circle_at_80%_80%,_#B0B8C2_0%,_transparent_50%),radial-gradient(circle_at_50%_50%,_#B0B8C2_0%,_transparent_70%)] opacity-10 pointer-events-none"></div>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 backdrop-blur-sm text-white/50 hover:bg-white/10 hover:text-white transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative p-6 sm:p-8 z-10 flex flex-col gap-6">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center w-full h-full py-8"
                >
                  <div className="bg-[#4ade80] text-black p-8 rounded-3xl flex flex-col items-center justify-center text-center w-full shadow-2xl">
                    <h2 
                      className="text-2xl font-bold mb-3"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {lang === 'PL' ? 'GOTOWE!' : 'DONE!'}
                    </h2>
                    <p 
                      className="text-sm font-normal"
                      style={{ fontFamily: 'Geist Mono, monospace' }}
                    >
                      {lang === 'PL' ? 'Odezwiemy się wkrótce.' : 'We will be in touch soon.'}
                    </p>
                    
                    <button
                      onClick={onClose}
                      className="mt-6 px-6 py-2.5 bg-black text-white rounded-full font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors text-sm"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {lang === 'PL' ? 'Zamknij' : 'Close'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="pr-8">
                    <h2 className="text-2xl sm:text-3xl font-inter-tight font-normal text-white mb-2 tracking-tight">
                      {title || (lang === 'PL' ? 'Wycena w 30 minut' : 'Quote in 30 minutes')}
                    </h2>
                    <p className="text-sm text-slate-400 font-inter-tight">
                      {subtitle || (lang === 'PL' ? 'Zostaw dane, a nasz ekspert skontaktuje się z Tobą.' : 'Leave your details and our expert will contact you.')}
                    </p>
                  </div>

                  <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider font-inter-tight">{lang === 'PL' ? 'Imię i Nazwisko' : 'Full Name'}</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder={lang === 'PL' ? "np. Jan Kowalski" : "e.g. John Doe"}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 focus:border-[#c9c0e8] focus:ring-1 focus:ring-[#c9c0e8] outline-none transition-all font-inter-tight text-sm text-white placeholder:text-slate-600"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider font-inter-tight">{lang === 'PL' ? 'Adres email / Numer telefonu' : 'Email address / Phone number'}</label>
                      <input 
                        type="text" 
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        required
                        placeholder={lang === 'PL' ? "np. jan@poczta.pl lub 791 000 000" : "e.g. john@email.com or 555 000 000"}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 focus:border-[#c9c0e8] focus:ring-1 focus:ring-[#c9c0e8] outline-none transition-all font-inter-tight text-sm text-white placeholder:text-slate-600"
                      />
                    </div>

                    <div className="relative flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider font-inter-tight">{lang === 'PL' ? 'Usługa' : 'Service'}</label>
                      <button
                        type="button"
                        onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 focus:border-[#c9c0e8] text-left flex justify-between items-center transition-all font-inter-tight text-sm text-white"
                      >
                        <span className={selectedService ? "text-white" : "text-slate-600"}>
                          {selectedService || (lang === 'PL' ? "Wybierz usługę..." : "Select service...")}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''} text-slate-400`} />
                      </button>
                      
                      <AnimatePresence>
                        {isServiceDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="absolute z-50 w-full top-[100%] mt-2 bg-[#222] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                          >
                            {services.map((service) => (
                              <button
                                key={service}
                                type="button"
                                onClick={() => {
                                  setSelectedService(service);
                                  setIsServiceDropdownOpen(false);
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors text-sm font-inter-tight text-slate-300"
                              >
                                {service}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider font-inter-tight">{lang === 'PL' ? 'Twoja wiadomość' : 'Your message'}</label>
                      <textarea 
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={lang === 'PL' ? "Opisz krótko swój projekt..." : "Briefly describe your project..."}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 focus:border-[#c9c0e8] focus:ring-1 focus:ring-[#c9c0e8] outline-none transition-all font-inter-tight text-sm text-white placeholder:text-slate-600 resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#c9c0e8] hover:bg-[#b8a1ff] text-black rounded-xl py-3.5 font-bold transition-all shadow-lg flex items-center justify-center gap-2 mt-2 text-sm font-inter-tight disabled:opacity-70"
                    >
                      <span>{isSubmitting ? (lang === 'PL' ? 'Wysyłanie...' : 'Sending...') : (lang === 'PL' ? 'Wyślij zapytanie' : 'Send inquiry')}</span>
                      {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Removed SkewedBackground

function Navbar({ 
  onContactClick, 
  onStartProjectClick, 
  onOfferClick, 
  onHomeClick, 
  onPoradnikClick, 
  onAboutClick, 
  onWorkClick,
  isStartProject,
  startProjectStep
}: { 
  onContactClick: () => void, 
  onStartProjectClick?: () => void, 
  onOfferClick?: (type?: string) => void, 
  onHomeClick: () => void, 
  onPoradnikClick: () => void, 
  onAboutClick?: () => void, 
  onWorkClick?: () => void,
  isStartProject?: boolean,
  startProjectStep?: number
}) {
  console.log('Navbar render', { isStartProject, startProjectStep });
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { t, lang } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const menuItems = [
    { name: t('nav.home'), href: '#', onClick: onHomeClick },
    { name: t('nav.about'), href: '#', onClick: onAboutClick },
    { 
      name: t('nav.offer'), 
      href: '#',
      onClick: () => onOfferClick?.(),
      subItems: [
        { name: t('nav.services.websites'), type: 'websites-offer' },
        { name: t('nav.services.ecommerce'), type: 'ecommerce-offer' },
        { name: t('nav.services.ads'), type: 'ads-offer' },
        { name: t('nav.services.seo'), type: 'seo-offer' }
      ]
    },
    { name: t('nav.work'), href: '#', onClick: onWorkClick },
    { name: t('nav.guide'), href: '#', onClick: onPoradnikClick }
  ];

  return (
    <nav className={`fixed top-6 left-0 w-full z-50 px-2 sm:px-4 pointer-events-none flex flex-col ${isStartProject ? 'items-start' : 'items-end'} xl:block`}>
      <div className="w-full flex justify-center relative">
        <motion.div 
          className={`w-full max-w-5xl pointer-events-auto transition-all duration-500 overflow-hidden ${
            isOpen 
              ? 'rounded-[2rem] sm:rounded-[2.5rem] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 p-4 sm:p-6' 
              : 'rounded-[2rem] bg-[#050505]/60 backdrop-blur-md border border-white/10 py-3 px-6'
          }`}
        >
        {/* Navbar Header */}
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-3 min-w-0 shrink">
            <img loading="eager" 
              src="https://github.com/kidiee558/solidagencytestowo/blob/main/logosolidagency.webp?raw=true" 
              alt={lang === 'PL' ? "Solid Agency - Agencja Interaktywna Lublin" : "Solid Agency - Interactive Marketing Agency"}
              className="h-10 sm:h-12 w-auto max-w-[120px] sm:max-w-none cursor-pointer object-contain"
              onClick={onHomeClick}
              referrerPolicy="no-referrer"
             width="600" height="200" />
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span 
              className="hidden sm:block text-white font-bold text-[10px] sm:text-xs tracking-[0.2em] uppercase cursor-pointer hover:text-white/80 transition-colors" 
              onClick={onContactClick}
            >
              {t('nav.contact')}
            </span>
            <button 
              aria-label="Otwórz menu nawigacji"
              onClick={() => setIsOpen(!isOpen)} 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : (
                <div className="flex flex-col gap-[5px]">
                  <div className="w-[18px] sm:w-[22px] h-[1.5px] bg-white rounded-full"></div>
                  <div className="w-[18px] sm:w-[22px] h-[1.5px] bg-white rounded-full"></div>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Expanded Menu Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div>
                <div className="flex flex-col mt-4 sm:mt-8 mb-6 sm:mb-8 overflow-y-auto overscroll-contain custom-scrollbar pr-2 h-[250px] sm:h-[420px]">
                  {menuItems.map((item) => (
                    <div key={item.name} className="border-b border-white/5 last:border-0">
                      <a 
                        href={item.href} 
                        className="text-2xl sm:text-5xl font-bold text-white hover:text-[#8d32fc] transition-colors flex justify-between items-center py-2 sm:py-4 group"
                        onClick={(e) => {
                          if (item.subItems) {
                            e.preventDefault();
                            setIsServicesOpen(!isServicesOpen);
                          } else if (item.onClick) {
                            e.preventDefault();
                            item.onClick();
                            setIsOpen(false);
                          } else {
                            setIsOpen(false);
                          }
                        }}
                      >
                        <span className="tracking-tighter uppercase font-syne font-bold">{item.name}</span>
                        {item.subItems ? (
                          <motion.div animate={{ rotate: isServicesOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <ChevronDown className="w-5 h-5 sm:w-8 sm:h-8 opacity-40 group-hover:opacity-100 transition-all" />
                          </motion.div>
                        ) : (
                          <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 opacity-40 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                        )}
                      </a>
                      {item.subItems && (
                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-3 pb-4 pl-4 sm:pl-8">
                                {item.subItems.map(sub => (
                                  <a 
                                    key={typeof sub === 'string' ? sub : sub.name} 
                                    href="#" 
                                    className="text-lg sm:text-3xl font-inter-tight font-normal text-slate-400 hover:text-white transition-colors py-1"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (typeof sub !== 'string' && onOfferClick) {
                                        // We need to handle specific offer clicks
                                        // But for now let's just close and use the type if we can
                                        // Actually, let's pass the type to onOfferClick if it's available
                                        if (onOfferClick) {
                                          onOfferClick(sub.type);
                                        }
                                      }
                                      setIsOpen(false);
                                    }}
                                  >
                                    {typeof sub === 'string' ? sub : sub.name}
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 pb-4 pt-2 sm:pt-0">
                  <button onClick={() => { onStartProjectClick ? onStartProjectClick() : onContactClick(); setIsOpen(false); }} className="bg-[#d1cce8] p-5 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-between h-32 sm:h-52 relative text-left group overflow-hidden flex-1 border border-black/5 shadow-inner">
                    <div className="relative z-10 w-[75%]">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1 block opacity-80" style={{ fontFamily: 'var(--font-humane)' }}>{t('nav.contact')}</span>
                      {/* Mobile version (one line) */}
                      <span 
                        className="sm:hidden font-bold text-[#1a1a2e] uppercase font-humane block whitespace-nowrap"
                        style={{ 
                          fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
                          lineHeight: '0.85', 
                          letterSpacing: '0.01em',
                          paddingTop: '0.15rem'
                        }}
                      >
                        {t('nav.start_project')}
                      </span>
                      {/* PC version (with line break) */}
                      <span 
                        className="hidden sm:block font-bold text-[#1a1a2e] uppercase font-humane"
                        style={{ 
                          fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', 
                          lineHeight: '0.9', 
                          letterSpacing: '0.01em',
                          paddingTop: '0.25rem'
                        }}
                        dangerouslySetInnerHTML={{ __html: t('nav.start_project').replace(' Z ', ' Z<br/>') }}
                      ></span>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-[2%] sm:right-2 w-20 h-20 sm:w-36 sm:h-36 flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                      <img loading="eager" src="/rakieta.png" alt="Rocket" className="max-h-full max-w-full object-contain filter drop-shadow-lg"  width="500" height="500" />
                    </div>
                  </button>

                  <button onClick={() => { onContactClick(); setIsOpen(false); }} className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-between h-32 sm:h-52 relative text-left group overflow-hidden flex-1 border border-black/5 shadow-lg">
                    <div className="relative z-10 w-[75%]">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block opacity-80" style={{ fontFamily: 'var(--font-humane)' }}>{t('nav.contact')}</span>
                      {/* Mobile version (one line) */}
                      <span 
                        className="sm:hidden font-bold text-[#1a1a2e] uppercase font-humane block whitespace-nowrap"
                        style={{ 
                          fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
                          lineHeight: '0.85', 
                          letterSpacing: '0.01em',
                          paddingTop: '0.15rem'
                        }}
                      >
                        {t('nav.say_hello')}
                      </span>
                      {/* PC version (with line break) */}
                      <span 
                        className="hidden sm:block font-bold text-[#1a1a2e] uppercase font-humane"
                        style={{ 
                          fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', 
                          lineHeight: '0.9', 
                          letterSpacing: '0.01em',
                          paddingTop: '0.2rem'
                        }}
                        dangerouslySetInnerHTML={{ __html: t('nav.say_hello').replace(', ', ',<br/>') }}
                      ></span>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-[2%] sm:right-2 w-20 h-20 sm:w-36 sm:h-36 flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                      <img loading="eager" src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/telefon%20getintouch.png" alt="Phone" className="max-h-full max-w-full object-contain filter drop-shadow-xl"  width="1920" height="1080" />
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
        
        {/* Desktop Language Switcher */}
        {!isStartProject && (
          <div className={`hidden xl:block absolute ${isStartProject ? 'left-0' : 'right-0'} top-3`}>
            <LanguageSwitcher />
          </div>
        )}
      </div>
      {/* Mobile Language Switcher */}
      {!isStartProject && (
        <div className={`xl:hidden ${isStartProject ? 'fixed bottom-10 left-1/2 -translate-x-1/2' : 'mt-4'} ${isOpen ? 'hidden' : ''}`}>
          <LanguageSwitcher />
        </div>
      )}
    </nav>
  );
}

function HeroContent({ onContactClick }: { onContactClick: () => void }) {
  const { lang } = useLanguage();
  return (
    <div className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 lg:pt-28 xl:pt-32 pb-16 lg:pb-12 z-20">
      <div className="w-full px-4 sm:px-6 lg:px-24 xl:px-40 flex flex-col items-start">
        
        {/* ========================================================= */}
        {/* WRAPPER GŁÓWNY Z RELATIVE DLA PRECYZJI CO DO PIKSELA */}
        {/* ========================================================= */}
        <div className="w-full relative z-30">
          
          {/* JEDEN NAGŁÓWEK H1 NA CAŁĄ SEKCJĘ HERO */}
          <h1 className="w-full grid grid-cols-[auto_1fr] tracking-[0.005em] text-white uppercase leading-[0.75] gap-x-[1vw] sm:gap-x-[1vw] xl:gap-x-[0.5vw]">
            
            {/* Słowo 1: GÓRA (SOLIDNY) - lewa strona gridu */}
            <div 
              className="col-span-1 flex flex-col justify-end text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold whitespace-nowrap text-left mb-[2vw] sm:mb-[0.5vw]"
            >
              {lang === 'PL' ? 'SOLIDNY' : 'SOLID'}
            </div>

            {/* Usługi - Zawsze po prawej stronie od SOLIDNY w tej samej linii */}
            <div className="col-span-1 flex flex-col justify-end pb-[5.5vw] sm:pb-[3.5vw] lg:pb-[3.2vw] xl:pb-[3vw] font-inter-tight text-white/90 normal-case whitespace-nowrap text-left text-[1.8vw] sm:text-[1.3vw] lg:text-[1vw] xl:text-[0.85vw] leading-[1.4] font-normal min-w-0">
              {lang === 'PL' ? (
                <>Strony Internetowe & Sklepy Internetowe / <br />Kampanie Google Ads & Meta Ads / <br />Pozycjonowanie SEO / Lublin</>
              ) : (
                <>Websites & E-commerce Stores / <br />Google Ads & Meta Campaigns / <br />SEO Positioning / Lublin</>
              )}
            </div>

            {/* Słowo 2: DÓŁ (MARKETING) - Kolumna na całą szerokość z wyrównaniem do prawej */}
            <div className="col-span-2 text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold whitespace-nowrap text-right flex justify-end items-end w-full relative">
              {lang === 'PL' ? 'MARKETING' : 'MARKETING'}
            </div>
          </h1>

          {/* ========================================================= */}
          {/* DESKTOP (PC/Tablet) - IDEALNE POZYCJONOWANIE ABSOLUTNE   */}
          {/* ========================================================= */}
          <div className="hidden sm:block absolute top-0 left-0 w-full h-full pointer-events-none">
            
            {/* Lewa strona (Guziki) przyklejona do absolutnego DOŁU wyrazu MARKETING i LEWEJ krawędzi */}
            <div className="absolute bottom-[1vw] lg:bottom-[2vw] xl:bottom-[2.5vw] left-0 flex flex-col items-start gap-[clamp(8px,1.5vw,24px)] w-full max-w-[45ch] pointer-events-auto">
              <div className="w-full">
                <div className="w-[clamp(40px,5vw,100px)] h-[1px] bg-white/30 mb-[clamp(8px,1vw,16px)]" />
                <h2 
                  className="font-inter-tight text-slate-200 uppercase text-left break-words text-[clamp(8px,0.8vw,14px)]"
                  style={{ letterSpacing: '0.05em', fontWeight: '300', lineHeight: '1.4' }}
                >
                  {lang === 'PL' ? 'MECHANIZM SKALOWANIA. STRONY PREMIUM.' : 'SCALING MECHANISM. PREMIUM WEBSITES.'}
                </h2>
              </div>
              <div className="flex justify-start gap-[clamp(8px,1vw,16px)] mt-[clamp(8px,1vw,16px)]">
                <button aria-label="Zamów bezpłatną wycenę w 30 minut" onClick={onContactClick} className="rounded-full border border-white/20 hover:bg-white/40 transition-colors px-[clamp(16px,2vw,32px)] h-[clamp(28px,3.5vw,48px)] flex items-center justify-center text-white text-[clamp(8px,0.7vw,12px)] font-bold uppercase tracking-widest backdrop-blur-sm whitespace-nowrap" style={{ backgroundColor: 'rgba(201, 192, 232, 0.15)' }}>
                  {lang === 'PL' ? 'WYCENA W 30 MIN' : 'QUOTE IN 30 MIN'}
                </button>
                <button aria-label="Poznaj naszą pełną ofertę" onClick={() => {
                  const element = document.getElementById('glass-boxes');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }} className="rounded-full border border-white/20 hover:bg-white/10 transition-colors px-[clamp(16px,2vw,32px)] h-[clamp(28px,3.5vw,48px)] flex items-center justify-center text-white text-[clamp(8px,0.7vw,12px)] font-bold uppercase tracking-widest whitespace-nowrap">
                  {lang === 'PL' ? 'OFERTA' : 'OFFER'}
                </button>
              </div>
            </div>

            {/* Prawa strona (Lublin) przyklejona IDEALNIE na dół pod napis MARKETING z dosłownie milimetrowym odstępem */}
            <div className="absolute top-[100%] right-0 mt-[-0.5vw] lg:mt-[-1.5vw] xl:mt-[-2vw] text-white/40 text-[clamp(9px,0.8vw,12px)] font-mono uppercase tracking-[0.2em] text-right pointer-events-auto">
              {lang === 'PL' ? 'LUBLIN / WORLDWIDE - EST. 2018' : 'LUBLIN / WORLDWIDE - EST. 2018'}
            </div>
            
          </div>
        </div>

        {/* ========================================================= */}
        {/* MOBILE ONLY (Telefon) - IDEALNY STARY UKŁAD KOLUMNOWY    */}
        {/* ========================================================= */}
        <div className="w-full flex sm:hidden flex-col relative z-30 mt-[-4vw]">
          
          {/* Napis "LUBLIN" pod MARKETING na telefonie */}
          <div className="text-white/40 text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-right mt-2 mb-8">
            {lang === 'PL' ? 'LUBLIN / WORLDWIDE - EST. 2018' : 'LUBLIN / WORLDWIDE - EST. 2018'}
          </div>

          {/* Autorski system + Przyciski (na telefonie pod spodem) */}
          <div className="flex flex-col items-start gap-4 w-full">
            <div className="w-[100px] h-[1px] bg-white/30 mb-2" />
            <h2 
              className="font-inter-tight text-slate-200 uppercase text-left break-words text-[11px] max-w-[45ch]"
              style={{ letterSpacing: '0.05em', fontWeight: '400', lineHeight: '1.4' }}
            >
              {lang === 'PL' ? 'MECHANIZM SKALOWANIA. STRONY PREMIUM.' : 'SCALING MECHANISM. PREMIUM WEBSITES.'}
            </h2>
            
            <div className="flex justify-center gap-4 mt-4 mb-4 w-full">
              <button aria-label="Zamów bezpłatną wycenę w 30 minut" onClick={onContactClick} className="rounded-full border border-white/20 hover:bg-white/40 transition-colors px-6 h-[40px] flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm whitespace-nowrap" style={{ backgroundColor: 'rgba(201, 192, 232, 0.15)' }}>
                {lang === 'PL' ? 'WYCENA W 30 MIN' : 'QUOTE IN 30 MIN'}
              </button>
              <button aria-label="Poznaj naszą pełną ofertę" onClick={() => {
                const element = document.getElementById('glass-boxes');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }} className="rounded-full border border-white/20 hover:bg-white/10 transition-colors px-6 h-[40px] flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                {lang === 'PL' ? 'OFERTA' : 'OFFER'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function Hero({ onContactClick, children }: { onContactClick: () => void; children?: React.ReactNode }) {
  const posterUrl = 'https://github.com/kidiee558/solidagencytestowo/blob/main/HomepageZdjecieWTle.webp?raw=true';

  return (
    <section 
      id="home" 
      className="relative w-full overflow-hidden z-0 bg-black"
      style={{ backgroundImage: `url('${posterUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="none"
          poster={posterUrl}
          className="w-full h-full object-cover"
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/t%C5%82o.mp4"
        poster="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/HomepageZdjecieWTle.webp" />
      </div>
      <div className="absolute inset-0 bg-black/40 z-[1]"></div>
      <div className="relative z-[2]">
        <HeroContent onContactClick={onContactClick} />
        {children}
      </div>
    </section>
  );
}

function AboutUs() {
  const { lang } = useLanguage();
  return (
    <section className="relative w-full pt-24 pb-32 lg:pt-16 overflow-hidden z-0" id="o-nas">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-[2] w-full px-4 sm:px-6 lg:px-24 xl:px-40"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
          {/* Left Side */}
          <h2 
            className="font-inter-tight text-white max-w-[15em]"
            style={{ 
              lineHeight: '1', 
              fontWeight: '300',
              fontSize: 'clamp(1.75rem, 1.5rem + 2vw, 3.5rem)'
            }}
          >
            {lang === 'PL' ? 'Projektujemy dochodowe strony internetowe i wdrażamy autorskie systemy, które skutecznie skalują sprzedaż Twojej firmy.' : 'We design profitable websites and implement proprietary systems that effectively scale your company\'s sales.'}
          </h2>

          {/* Right Side */}
          <div 
            className="font-inter-tight text-slate-200 lg:max-w-[35em] lg:ml-12"
            style={{ 
              fontSize: 'clamp(1rem, .735915493rem + .8450704225vw, 1.75rem)',
              letterSpacing: '-.01em',
              fontWeight: '300'
            }}
          >
            <p className="mb-8">
              {lang === 'PL' ? 'Masz możliwość wdrożenia naszego autorskiego systemu sprzedaży, który rozwinie Twoją firmę w 90 dni, lub wybrania konkretnych narzędzi z naszej oferty.' : 'You have the opportunity to implement our proprietary sales system that will develop your company in 90 days, or choose specific tools from our offer.'}
            </p>
            <p>
              {lang === 'PL' ? 'Realizujemy kampanie Google Ads & Meta Ads oraz pozycjonowanie SEO, domykając całość zaawansowaną architekturą stron i sklepów. Ty decydujesz o tempie wzrostu.' : 'We implement Google Ads & Meta Ads campaigns and SEO positioning, closing the whole with advanced architecture of websites and stores. You decide the pace of growth.'}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ExpertiseSection() {
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
              <video preload="none" 
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

var getProjectsData = (lang: 'PL' | 'ENG') => [
  {
    id: '01',
    location: 'PORTFOLIO',
    title: lang === 'PL' ? 'Dynamika produktu w środowisku 3D' : 'Product Dynamics in 3D Environment',
    description: lang === 'PL' ? 'Zaawansowana wizualizacja produktowa High-End' : 'Advanced High-End Product Visualization',
    altText: lang === 'PL' 
        ? 'Wizualizacja 3D produktu dla branży technologicznej | Solid Agency' 
        : '3D product visualization for the tech industry | Solid Agency',
    bgImage: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/Wizualizacja3D.mp4',
  },
  {
    id: '02',
    location: 'PORTFOLIO',
    title: lang === 'PL' ? 'Strona dla kliniki medycyny estetycznej' : 'Aesthetic medicine clinic website',
    description: lang === 'PL' ? 'Przykład rozbudowanej strony dla kliniki estetycznej.' : 'Example of an extended website for an aesthetic clinic.',
    altText: lang === 'PL' 
        ? 'Strona internetowa dla kliniki medycyny estetycznej | Solid Agency' 
        : 'Website design for an aesthetic medicine clinic | Solid Agency',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    videoUrl: '/Wideo1.webm',
  },
  {
    id: '03',
    location: 'PORTFOLIO',
    title: lang === 'PL' ? 'Immersyjny system UX' : 'Immersive UX System',
    description: lang === 'PL' ? 'Immersyjne doświadczenie użytkownika oparte na animacji.' : 'Immersive user experience based on animation.',
    altText: lang === 'PL' 
        ? 'System UX dla nowoczesnej strony technologicznej | Solid Agency' 
        : 'UX system for a modern tech website | Solid Agency',
    bgImage: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/Wideo2.mp4',
  },
  {
    id: '04',
    location: 'PORTFOLIO',
    title: lang === 'PL' ? 'Interaktywna strona produktowa' : 'Interactive product website',
    description: lang === 'PL' ? 'Interaktywna witryna produktowa dla producenta drinków.' : 'Interactive product website for a beverage manufacturer.',
    altText: lang === 'PL' 
        ? 'Strona internetowa dla producenta napojów | Solid Agency' 
        : 'Website design for a beverage manufacturer | Solid Agency',
    bgImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/Wideo4.mp4',
  },
  {
    id: '05',
    location: 'PORTFOLIO',
    title: lang === 'PL' ? 'System prezentacji marki' : 'Brand Presentation System',
    description: lang === 'PL' ? 'Dynamiczna prezentacja systemu dla PLAN - StreetFood.' : 'Dynamic presentation of the system for PLAN - StreetFood.',
    altText: lang === 'PL' 
        ? 'Strona internetowa dla lokalu gastronomicznego | Solid Agency' 
        : 'Website design for a restaurant | Solid Agency',
    bgImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/Wideo5.mp4',
  }
];

function LatestProjects({ onProjectClick }: { onProjectClick: (id: string) => void }) {
  const { lang } = useLanguage();
  const projectsData = getProjectsData(lang);
  
  const projectMapping: Record<string, string> = {
    '01': 'dynamika-3d',
    '02': 'medycyna-estetyczna',
    '03': 'fairline-targa',
    '04': 'producent-drinkow',
    '05': 'plan-streetfood'
  };

  const handleProjectClick = (id: string) => {
    const mappedId = projectMapping[id];
    if (mappedId) {
      onProjectClick(mappedId);
    }
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const newIndex = Math.round(latest * (projectsData.length - 1));
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    });
  }, [scrollYProgress, activeIndex, projectsData.length]);

  const yTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  const [mobileIndex, setMobileIndex] = useState(0);
  const nextMobile = () => setMobileIndex((i) => (i + 1) % projectsData.length);
  const prevMobile = () => setMobileIndex((i) => (i - 1 + projectsData.length) % projectsData.length);

  return (
    <div id="portfolio" className="relative">
      {/* Desktop View */}
      <div ref={containerRef} className="hidden md:block h-[500vh] relative bg-black">
        <div className="sticky top-0 h-screen flex w-full overflow-hidden">
          {/* Left Side - Text (35%) */}
          <div className="w-[35%] h-full bg-black flex flex-col justify-between p-8 lg:p-12 xl:p-16 relative border-r border-white/10 z-20">
            <div className="flex flex-col items-start pt-10 flex-grow">
              <div className="flex text-[clamp(10rem,14vw,18rem)] leading-none font-humane font-bold text-white overflow-hidden relative" style={{ height: '1em' }}>
                <div className="flex items-center h-full">0</div>
                <motion.div style={{ y: yTranslate }} className="flex flex-col h-[500%]">
                  {projectsData.map((p, i) => (
                    <div key={i} className="flex items-center h-1/5">
                      {p.id.charAt(1)}
                    </div>
                  ))}
                </motion.div>
              </div>
              <h2 className="text-white text-[clamp(1.25rem,2vw,1.5rem)] mt-4 font-inter-tight">{lang === 'PL' ? 'Ostatnie realizacje' : 'Latest Projects'}</h2>
              
              <div className="mt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`info-${activeIndex}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex flex-col gap-[clamp(0.5rem,1vw,1rem)]"
                  >
                    <div className="text-white/60 text-[clamp(0.75rem,1vw,0.875rem)] tracking-widest uppercase font-bold">{projectsData[activeIndex].location}</div>
                    <h3 className="text-white text-[clamp(2.5rem,4vw,3.75rem)] font-inter-tight font-normal leading-none">{projectsData[activeIndex].title}</h3>
                    <p className="text-white/80 text-[clamp(1rem,1.5vw,1.25rem)] leading-none">{projectsData[activeIndex].description}</p>
                    <button 
                      onClick={() => handleProjectClick(projectsData[activeIndex].id)}
                      className="mt-[clamp(1rem,2vw,2rem)] w-fit rounded-full border border-white/30 px-[clamp(1.5rem,2.5vw,2.5rem)] py-[clamp(0.75rem,1vw,1rem)] text-white hover:bg-white/10 transition-colors text-[clamp(0.875rem,1vw,1.125rem)]"
                    >
                      {lang === 'PL' ? 'Zobacz projekt' : 'View project'}
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Side - Images (65%) */}
          <div className="w-[65%] h-full relative overflow-hidden flex items-center justify-center bg-black">
            {/* Foreground Images Container */}
            <div className="w-[80%] h-screen relative z-10">
              <motion.div 
                className="w-full h-[400%] flex flex-col absolute top-[10vh]"
                style={{ y: yTranslate }}
              >
                {projectsData.map((p, i) => (
                  <div key={i} className="w-full h-1/5 flex items-center justify-center p-4">
                    {p.videoUrl ? (
                      <video preload="none" 
                        src={p.videoUrl}
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className={`w-full object-cover rounded-xl shadow-2xl h-auto max-h-[75vh]`}
                      />
                    ) : (
                      <img 
                        src={p.fgImage} 
                        className={`w-full object-cover rounded-xl shadow-2xl h-auto max-h-[75vh]`}
                        alt={p.altText}
                        width="1000"
                        height="600"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-black text-white pt-6 pb-20 px-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h2 
              className="text-[clamp(7rem,22vw,12rem)] font-humane font-bold text-white leading-[0.75] uppercase tracking-[0.005em] relative w-full pt-4 flex flex-col"
              style={{ marginBottom: '-10px' }}
            >
              <span className="text-left">{lang === 'PL' ? 'OSTATNIE' : 'LATEST'}</span>
              <span className="text-right">{lang === 'PL' ? 'PROJEKTY' : 'PROJECTS'}</span>
            </h2>
          </div>

          <div className="w-[92%] mx-auto aspect-[16/10] relative rounded-2xl overflow-hidden shadow-xl">
            <AnimatePresence mode="wait">
              {projectsData[mobileIndex].videoUrl ? (
                <motion.video
                  key={`mob-vid-${mobileIndex}`}
                  src={projectsData[mobileIndex].videoUrl}
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <motion.img
                  key={`mob-img-${mobileIndex}`}
                  src={projectsData[mobileIndex].fgImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt={projectsData[mobileIndex].altText}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <div className="text-white/60 text-sm tracking-widest uppercase font-bold">{projectsData[mobileIndex].location}</div>
            <h3 className="text-4xl font-inter-tight font-normal leading-none">{projectsData[mobileIndex].title}</h3>
            <div className="min-h-[3.5rem]">
              <p className="text-white/80 text-lg leading-none">{projectsData[mobileIndex].description}</p>
            </div>
          </div>

          <div className="flex justify-end items-center gap-3 mt-2">
            <button 
              onClick={() => handleProjectClick(projectsData[mobileIndex].id)}
              className="rounded-full border border-white/30 px-6 py-2.5 text-white hover:bg-white/10 transition-colors text-sm font-medium"
            >
              {lang === 'PL' ? 'Zobacz projekt' : 'View project'}
            </button>
            <div className="flex gap-2">
              <button aria-label="Zobacz poprzedni projekt" onClick={prevMobile} className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button aria-label="Zobacz następny projekt" onClick={nextMobile} className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors">
                <ChevronRight className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EightYearsSection() {
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

function FreeProjectOffer() {
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

function ValueProps() {
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

function SystemScalingImage() {
  const [isZoomed, setIsZoomed] = useState(false);
  const imageUrl = "https://github.com/kidiee558/solidagencytestowo/blob/main/SystemSkalowania.webp?raw=true";
  const { lang } = useLanguage();

  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isZoomed]);

  return (
    <>
      <section className="bg-white pb-12 lg:pb-24 px-6 lg:px-[6.25rem]">
        <div 
          className="max-w-[1400px] mx-auto cursor-zoom-in lg:cursor-default"
          onClick={() => {
            if (window.innerWidth < 1024) {
              setIsZoomed(true);
            }
          }}
        >
          <img 
            src={imageUrl} 
            alt={lang === 'PL' ? "Projektowanie infrastruktury sprzedaży i automatyzacja lejka konwersji" : "Sales infrastructure design and conversion funnel automation"}
            className="w-full h-auto block"
            referrerPolicy="no-referrer"
            width="1400"
            height="800"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>

      <AnimatePresence>
        {isZoomed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[40] bg-black/95 flex items-center justify-center cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <button 
              className="absolute top-32 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-[10000] md:top-6"
              onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="w-full h-full overflow-auto flex items-start justify-center p-4 pt-40 md:pt-4">
               <img loading="lazy" 
                src={imageUrl} 
                alt="System Skalowania Solid Agency Full" 
                className="max-w-none w-auto h-auto min-w-full cursor-default"
                referrerPolicy="no-referrer"
                onClick={(e) => e.stopPropagation()}
                width="1920" height="1080"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function GlassBoxes({ 
  onWebsitesClick, 
  onEcommerceClick, 
  onAdsClick, 
  onSeoClick 
}: { 
  onWebsitesClick: () => void;
  onEcommerceClick: () => void;
  onAdsClick: () => void;
  onSeoClick: () => void;
}) {
  const { lang } = useLanguage();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const boxes = [
    { 
      title: lang === 'PL' ? <>Strony<br />internetowe</> : <>Websites</>, 
      desc: lang === 'PL' ? 'Pełna skala rozwiązań. Od szybkich wizytówek po zaawansowane doświadczenia 3D i systemy korporacyjne.' : 'Full scale of solutions. From quick business cards to advanced 3D experiences and corporate systems.',
      onClick: onWebsitesClick
    },
    { 
      title: lang === 'PL' ? <>Sklepy<br />e-commerce</> : <>E-commerce<br />stores</>, 
      desc: lang === 'PL' ? 'Pełen wymiar handlu. Od wydajnych e-sklepów po potężne systemy sprzedażowe i prezentację produktów w 3D.' : 'Full dimension of commerce. From efficient e-stores to powerful sales systems and 3D product presentation.',
      onClick: onEcommerceClick
    },
    { 
      title: lang === 'PL' ? <>Kampanie Ads<br />(Google & Meta)</> : <>Ads Campaigns<br />(Google & Meta)</>, 
      desc: lang === 'PL' ? 'Precyzyjny zasięg. Od lokalnych kampanii po globalne strategie sprzedażowe z pełną analityką.' : 'Precise reach. From local campaigns to global sales strategies with full analytics.',
      onClick: onAdsClick
    },
    { 
      title: lang === 'PL' ? <>Pozycjonowanie<br />SEO</> : <>SEO<br />Optimization</>, 
      desc: lang === 'PL' ? 'Trwałe zasięgi. Od lokalnej optymalizacji po globalną dominację w wynikach wyszukiwania.' : 'Lasting reach. From local optimization to global dominance in search results.',
      onClick: onSeoClick
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="glass-boxes">
        <div className="px-4 sm:px-6 lg:px-24 xl:px-40 relative z-10">
          <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-black mb-12 tracking-tight leading-[0.9] sm:leading-tight">
            {lang === 'PL' ? 'Zobacz naszą ofertę' : 'See our offer'}
          </h2>
        </div>
        <div 
          ref={scrollRef}
          className="flex flex-row flex-nowrap gap-4 lg:gap-6 mb-12 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-4 sm:pl-6 lg:pl-24 xl:pl-40"
        >
          {boxes.map((box, idx) => (
            <div 
              key={idx} 
              onClick={box.onClick}
              className="cursor-pointer flex-shrink-0 w-[85vw] sm:w-[500px] md:w-[600px] lg:w-[700px] snap-center relative rounded-3xl aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/9] overflow-hidden flex flex-col group transition-all duration-500 bg-[#D9D2E9] p-6 sm:p-10 lg:p-12"
            >
              <div className="flex flex-col h-full justify-between items-start relative z-10">
                <div className="w-full">
                  <h3 
                    className="text-black text-left mb-4 sm:mb-6"
                    style={{
                      fontWeight: 300,
                      fontSize: 'clamp(1.75rem, 8vw, 4.5rem)',
                      fontFamily: 'Inter Tight, sans-serif',
                      lineHeight: 0.9,
                      letterSpacing: '-0.04em'
                    }}
                  >
                    {box.title}
                  </h3>
                  <p 
                    className="text-black/80 text-left"
                    style={{
                      fontSize: 'clamp(0.9rem, 3.5vw, 1.35rem)',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 300,
                      lineHeight: 1.3,
                      maxWidth: '95%'
                    }}
                  >
                    {box.desc}
                  </p>
                </div>
                <button 
                  onClick={box.onClick}
                  className="text-black text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] border-b-2 border-black/20 pb-1 group-hover:border-black transition-all w-fit mt-4 sm:mt-6 lg:mt-10"
                >
                  {lang === 'PL' ? 'ZOBACZ OFERTĘ' : 'SEE OFFER'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-2 sm:mt-4">
          <div className="flex gap-4">
            <button aria-label="Przewiń ofertę w lewo" onClick={() => {
                const container = scrollRef.current;
                if (container && container.children.length > 0) {
                  const firstChild = container.children[0] as HTMLElement;
                  const gap = window.innerWidth >= 1024 ? 24 : 16;
                  const scrollAmount = firstChild.offsetWidth + gap;
                  container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
              }} className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-all duration-300 ease-out"
            >
              <ChevronLeft className="w-6 h-6 text-black" strokeWidth={1.5} />
            </button>
            <button aria-label="Przewiń ofertę w prawo" onClick={() => {
                const container = scrollRef.current;
                if (container && container.children.length > 0) {
                  const firstChild = container.children[0] as HTMLElement;
                  const gap = window.innerWidth >= 1024 ? 24 : 16;
                  const scrollAmount = firstChild.offsetWidth + gap;
                  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
              }} className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-all duration-300 ease-out"
            >
              <ChevronRight className="w-6 h-6 text-black" strokeWidth={1.5} />
            </button>
          </div>
        </div>
    </section>
  );
}

function LatestNews({ onPoradnikClick, onArticleClick }: { onPoradnikClick: () => void, onArticleClick: (id: string) => void }) {
  const { lang } = useLanguage();
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  React.useEffect(() => {
    const observer = new ResizeObserver(entries => {
      setContainerWidth(entries[0].contentRect.width);
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const cardsPerRow = containerWidth > 1200 ? 4 : containerWidth > 900 ? 3 : containerWidth > 600 ? 2 : 1;

  const scroll = (direction: 'left' | 'right') => {
    if (viewportRef.current) {
      const container = viewportRef.current;
      const firstSlide = container.querySelector('.slider-news__slide') as HTMLElement;
      if (firstSlide) {
        const slideWidth = firstSlide.offsetWidth;
        const gap = parseFloat(getComputedStyle(container.firstElementChild!).columnGap || '16');
        const scrollAmount = slideWidth + gap;
        
        container.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };

  const news = [
    {
      id: "ux-design",
      title: lang === 'PL' ? "UX Design: Jak zatrzymać klienta na stronie?" : "UX Design: How to keep a customer on the site?",
      image: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-UXdesign.png?raw=true",
      link: "#",
      bgColor: "#2B2B2B"
    },
    {
      id: "architektura-strony",
      title: lang === 'PL' ? "Architektura strony: Praktyczny poradnik dla SEO" : "Website architecture: A practical guide for SEO",
      image: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-seo.png?raw=true",
      link: "#",
      bgColor: "#2B2B2B"
    },
    {
      id: "google-meta-ads",
      title: lang === 'PL' ? "Google Ads czy Meta Ads? Gdzie Twoja firma powinna wydać pierwszy budżet?" : "Google Ads or Meta Ads? Where should your company spend its first budget?",
      image: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-ads.png?raw=true",
      link: "#",
      bgColor: "#2B2B2B"
    },
    {
      id: "rebranding",
      title: lang === 'PL' ? "Rebranding strony: Kiedy odświeżenie wyglądu to za mało?" : "Website rebranding: When refreshing the look is not enough?",
      image: "https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/informacje-rebranding.png",
      link: "#",
      bgColor: "#2B2B2B",
      padding: "p-0"
    }
  ];

  return (
    <section className="latest-news py-24 bg-white relative overflow-hidden" id="latest-news">
      <div className="w-full relative z-10">
        <div className="px-4 sm:px-6 lg:px-24 xl:px-40">
          <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-black mb-12 tracking-tight leading-[0.9] sm:leading-tight">
            {lang === 'PL' ? (
              'Poradnik Marketingowy: Jak Skalować Biznes przez SEO, Google Ads & Meta Ads i UX'
            ) : (
              'Marketing Guide: How to Scale Your Business through SEO, Google Ads & Meta Ads and UX'
            )}
          </h2>
        </div>
        
        <div ref={containerRef} className="slider-news" style={{ 
          maxWidth: '100%', 
          margin: 'auto', 
          '--slide-height': '24.375rem', 
          '--slide-spacing': '1rem', 
          '--slide-size': '100%' // Default for mobile
        } as React.CSSProperties}>
          <div ref={viewportRef} className="slider-news__viewport snap-x snap-mandatory scrollbar-hide w-full" style={{ overflowX: 'auto' }}>
            <div className="slider-news__container flex items-start touch-pan-y pl-4 sm:pl-6 lg:pl-24 xl:pl-40 pr-4 sm:pr-6 lg:pr-24 xl:pr-40" style={{ gap: '1rem' }}>
              {news.map((item, idx) => (
                <div key={idx} className="slider-news__slide min-w-0 snap-center pb-4" style={{ flex: `0 0 ${cardsPerRow > 1 ? (100 / cardsPerRow - ((cardsPerRow - 1) * 1) / cardsPerRow) : 85}%` }}>
                  <a href={item.link} onClick={(e) => { e.preventDefault(); onArticleClick(item.id); }} className="news-card block rounded-[20px] overflow-hidden flex flex-col bg-[#000] text-[#fff] border border-[rgba(255,255,255,0.25)] h-[24.375rem] select-none group relative">
                    <div className="overflow-hidden h-[12.5rem] min-h-[12.5rem] w-full z-[1]">
                      <img loading="lazy" 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                       width="1920" height="1080" />
                    </div>
                    <div className="news-card__content p-[2.25rem] pb-0 flex flex-col justify-between h-full">
                      <h3 
                        className="font-inter-tight font-normal tracking-[0.005em] line-clamp-3"
                        style={{ 
                          fontSize: 'clamp(.875rem, .5801886792rem + .9433962264vw, 1.5rem)', 
                          fontWeight: 300,
                          letterSpacing: '.005em',
                          fontFamily: 'var(--font-inter-tight)',
                          lineHeight: 1
                        }}
                      >
                        {item.title}
                      </h3>
                      <div className="mb-[1.875rem]">
                        <span className="news-card__btn text-white underline cursor-pointer hover:opacity-70 transition-opacity" style={{ 
                          fontSize: 'clamp(.875rem, .8160377358rem + .1886792453vw, 1rem)',
                          fontFamily: 'Inter Tight, sans-serif',
                          fontWeight: 300,
                          lineHeight: 1.4,
                          letterSpacing: '.02em'
                        }}>
                          {lang === 'PL' ? 'Czytaj więcej' : 'Read more'}
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4 sm:px-6 lg:px-24 xl:px-40 mt-12">
          <div className="flex gap-4 w-full sm:w-auto justify-center sm:justify-start">
            <button aria-label="Przewiń poradniki w lewo" onClick={() => scroll('left')} className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors">
              <ChevronLeft className="w-6 h-6 text-black" strokeWidth={1.5} />
            </button>
            <button aria-label="Przewiń poradniki w prawo" onClick={() => scroll('right')} className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors">
              <ChevronRight className="w-6 h-6 text-black" strokeWidth={1.5} />
            </button>
          </div>
          <div className="hidden sm:block flex-1 h-[1px] bg-black/10"></div>
          <button onClick={onPoradnikClick} className="flex items-center justify-center gap-2 text-black font-medium hover:opacity-70 transition-opacity whitespace-nowrap underline underline-offset-4 sm:no-underline w-full sm:w-auto">
            {lang === 'PL' ? 'Zobacz nasz poradnik' : 'See our guide'} <ArrowRight className="w-5 h-5 shrink-0" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ onStartProjectClick, onAskAwayClick }: { onStartProjectClick: () => void, onAskAwayClick: () => void }) {
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

// ... (existing imports)

// Contact page code removed and moved to src/components/ContactPage.tsx


/* --- From AboutPage.tsx --- */

function AboutPage({ onContactClick, onPoradnikClick, onArticleClick, onStartProjectClick, onAskAwayClick }: { onContactClick?: () => void, onPoradnikClick?: () => void, onArticleClick?: (id: string) => void, onStartProjectClick?: () => void, onAskAwayClick?: () => void }) {
  const { lang, t } = useLanguage();

  return (
    <div className="w-full bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden z-0">
        <div className="absolute inset-0 z-0">
          <video preload="none" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
            src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/t%C5%82o.mp4"
          poster="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/HomepageZdjecieWTle.webp" />
        </div>
        <div className="absolute inset-0 bg-black/40 z-[1]"></div>
        <div className="relative z-[2]">
          <div className="min-h-screen flex flex-col justify-center pt-32 pb-8 sm:pb-8 lg:pb-12 xl:pb-16" style={{ minHeight: '100dvh' }}>
            <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-10 lg:px-16 relative z-20 flex flex-col items-start">
              <div className="flex flex-col items-start flex-grow w-full">
                <div className="text-left w-full">
                  <div className="flex flex-col items-start w-full">
                    <h1 
                      className="font-bold text-white tracking-tight leading-[1.1] flex flex-col gap-1 lg:gap-2 w-full"
                      aria-label="SOLID AGENCY"
                    >
                      <span className="flex flex-col items-center justify-center w-full" aria-hidden="true">
                        <div 
                          className="text-[clamp(7.5rem,22vw,32rem)] sm:text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold text-white leading-[0.75] uppercase tracking-[0.005em] text-center w-full relative"
                          style={{ marginBottom: 'calc(-0.04em + 10px)' }}
                        >
                          <span className="whitespace-nowrap flex justify-center w-full">SOLID AGENCY</span>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center w-full mt-2 sm:mt-4">
                          <div 
                            className="font-inter-tight text-slate-400 uppercase break-words text-center relative"
                            style={{ 
                              fontSize: 'clamp(0.45rem, 0.35rem + 0.5vw, 1em)',
                              letterSpacing: '0.1em',
                              fontWeight: '300'
                            }}
                          >
                            LUBLIN / WORLDWIDE - EST. 2018
                          </div>
                        </div>
                      </span>
                    </h1>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="font-inter-tight text-slate-300 text-center mx-auto mt-10 sm:mt-16 max-w-[800px]"
                      style={{ 
                        fontSize: 'clamp(1rem, 0.9rem + 1.2vw, 2rem)',
                        lineHeight: '1.4',
                        fontWeight: '300'
                      }}
                    >
                      {lang === 'PL' 
                        ? 'Utytułowane studio cyfrowe. Specjalizujemy się w zaawansowanej budowie stron i sklepów, projektowaniu najwyższej jakości interfejsów, precyzyjnej strategii oraz niezawodnym wsparciu technicznym.' 
                        : 'An award-winning digital studio. We specialize in advanced website and e-commerce development, premium interface design, precise strategy, and reliable technical support.'}
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-24 sm:py-32 lg:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 px-6 lg:px-[6.25rem] gap-8 lg:gap-0 max-w-[1920px] mx-auto">
          <div className="text-white w-full lg:max-w-[10.8125em]" style={{
            fontWeight: 300,
            fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
            fontFamily: 'Inter Tight, sans-serif',
            lineHeight: 1.2
          }}>
            {lang === 'PL' ? 'Dostarczamy systemy, które wyznaczają najwyższy standard w Twojej branży.' : 'We deliver systems that set the highest standard in your industry.'}
          </div>
          <div className="text-white lg:col-start-2 lg:row-start-2 lg:ml-auto w-full lg:max-w-[27.5em]" style={{
            fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)',
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: '.02em'
          }}>
            <p className="mb-4">
              {lang === 'PL' ? 'Przeszliśmy przez ponad 200 wdrożeń w Europie i Stanach Zjednoczonych, co pozwoliło nam opanować proces budowania systemów, gdzie każdy detal techniczny bezpośrednio wspiera realizację Twoich celów biznesowych.' : 'We have completed over 200 implementations across Europe and the United States, which allowed us to master the process of building systems where every technical detail directly supports the achievement of your business goals.'}
            </p>
            <p>
              {lang === 'PL' ? 'Nie ograniczamy się do samego postawienia witryny. Wykorzystujemy własny system skalowania, który wyciska maksimum z kampanii w Google oraz na platformach Meta. Każdy wdrożony przez nas serwis przechodzi rygorystyczną optymalizację pod wyszukiwarki, żebyś nie musiał przepłacać za ruch, który powinieneś mieć za darmo.' : 'We do not limit ourselves to merely setting up a website. We use our proprietary scaling system that squeezes the maximum out of campaigns on Google and Meta platforms. Every service we implement undergoes rigorous SEO optimization so you do not have to overpay for traffic you should get for free.'}
            </p>
          </div>
        </div>
      </section>

      <section className="pt-32 pb-0 bg-black overflow-hidden">
        <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
          <h2 
            className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold text-white leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full"
            style={{ marginBottom: 'calc(-0.04em + 10px)' }}
          >
            {lang === 'PL' ? (
              <span className="whitespace-nowrap">STAWIAMY</span>
            ) : (
              <span className="whitespace-nowrap">WE FOCUS</span>
            )}
          </h2>
        </div>
      </section>

      <section className="pt-0 pb-32 bg-white overflow-hidden">
        <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
          <h2 
            className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold text-black leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full"
            style={{ paddingTop: 'calc(0.04em + 10px)' }}
          >
            <span className="sm:hidden flex flex-col items-end text-right w-full">
              {lang === 'PL' ? (
                <span>NA WYNIK</span>
              ) : (
                <span>ON RESULTS</span>
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
                  <span className="text-right">{lang === 'PL' ? 'NA WYNIK' : 'ON RESULTS'}</span>
              </span>
            </span>
          </h2>
        </div>
      </section>

      <TestimonialsSection />

      {/* New informational section */}
      <section className="py-24 sm:py-32 bg-white text-black px-6 lg:px-[6.25rem] max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
          <div className="text-black w-full lg:max-w-[10.8125em]" style={{
            fontWeight: 300,
            fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
            fontFamily: 'Inter Tight, sans-serif',
            lineHeight: 1.2
          }}>
            {lang === 'PL' ? 'Twoja marka nie znosi kompromisów. My też.' : 'Your brand does not tolerate compromises. Neither do we.'}
          </div>
          <div className="text-black lg:col-start-2 lg:row-start-2 lg:ml-auto w-full lg:max-w-[27.5em]" style={{
            fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)',
            fontFamily: 'Inter Tight, sans-serif',
            fontWeight: 300,
            lineHeight: 1.2,
            letterSpacing: '.02em',
            paddingTop: '0' 
          }}>
            <p>
              {lang === 'PL' 
                ? 'Odcinamy się od masowej produkcji stron opartych na powtarzalnych szablonach. Solid Agency to manufaktura cyfrowa. Każda linia kodu, każdy model 3D i każda strategia reklamowa są projektowane od zera pod konkretną tożsamość biznesową. Dostarczamy rozwiązania dla tych, którzy nie chcą być kolejną kopią w Google, ale chcą dyktować warunki w swojej niszy.' 
                : 'We distance ourselves from mass-production websites based on repetitive templates. Solid Agency is a digital manufactory. Every line of code, every 3D model, and every advertising strategy are designed from scratch for a specific business identity. We provide solutions for those who do not want to be just another copy on Google, but want to dictate terms in their niche.'}
            </p>
          </div>
        </div>
      </section>

      {/* 1:1 EXACT COPY OF LATEST NEWS SECTION */}
      <section className="latest-news py-24 bg-white relative overflow-hidden" id="latest-news">
        <AboutLatestNews onArticleClick={onArticleClick} onPoradnikClick={onPoradnikClick} />
      </section>

      {/* 1:1 EXACT COPY OF CONTACT SECTION */}
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
                className="text-[100px] sm:text-[150px] font-black text-black uppercase tracking-[0.01em] fill-black font-bebas"
              >
                {lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
          <span className="text-black/60 text-sm tracking-widest uppercase">{t('nav.contact')}</span>
          <h2 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">{lang === 'PL' ? 'Gotów, by stworzyć coś niepowtarzalnego?' : 'Ready to create something unique?'}</h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={onStartProjectClick || onContactClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}</button>
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
    </div>
  );
}

function AboutLatestNews({ onArticleClick, onPoradnikClick }: { onArticleClick?: (id: string) => void, onPoradnikClick?: () => void }) {
  const { lang } = useLanguage();
  const viewportRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      setContainerWidth(entries[0].contentRect.width);
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const cardsPerRow = containerWidth > 1200 ? 4 : containerWidth > 900 ? 3 : containerWidth > 600 ? 2 : 1;

  const scroll = (direction: 'left' | 'right') => {
    if (viewportRef.current) {
      const container = viewportRef.current;
      const firstSlide = container.querySelector('.slider-news__slide') as HTMLElement;
      if (firstSlide) {
        const slideWidth = firstSlide.offsetWidth;
        const gap = parseFloat(getComputedStyle(container.firstElementChild!).columnGap || '16');
        const scrollAmount = slideWidth + gap;
        
        container.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };

  const news = [
    {
      id: "ux-design",
      title: lang === 'PL' ? "UX Design: Jak zatrzymać klienta na stronie?" : "UX Design: How to keep a customer on the site?",
      image: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-UXdesign.png?raw=true",
      link: "#",
    },
    {
      id: "architektura-strony",
      title: lang === 'PL' ? "Architektura strony: Praktyczny poradnik dla SEO" : "Website architecture: A practical guide for SEO",
      image: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-seo.png?raw=true",
      link: "#",
    },
    {
      id: "google-meta-ads",
      title: lang === 'PL' ? "Google Ads czy Meta Ads? Gdzie Twoja firma powinna wydać pierwszy budżet?" : "Google Ads or Meta Ads? Where should your company spend its first budget?",
      image: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-ads.png?raw=true",
      link: "#",
    },
    {
      id: "rebranding",
      title: lang === 'PL' ? "Rebranding strony: Kiedy odświeżenie wyglądu to za mało?" : "Website rebranding: When refreshing the look is not enough?",
      image: "https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/informacje-rebranding.png",
      link: "#",
    }
  ];

  return (
    <div className="w-full relative z-10">
      <div className="px-4 sm:px-6 lg:px-24 xl:px-40">
        <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-black mb-12 tracking-tight leading-[0.9] sm:leading-tight">
          {lang === 'PL' ? (
            'Poradnik Marketingowy: Jak Skalować Biznes przez SEO, Google Ads & Meta Ads i UX'
          ) : (
            'Marketing Guide: How to Scale Your Business through SEO, Google Ads & Meta Ads and UX'
          )}
        </h2>
      </div>
      
      <div ref={containerRef} className="slider-news" style={{ 
        maxWidth: '100%', 
        margin: 'auto', 
        '--slide-height': '24.375rem', 
        '--slide-spacing': '1rem', 
        '--slide-size': '100%'
      } as React.CSSProperties}>
        <div ref={viewportRef} className="slider-news__viewport snap-x snap-mandatory scrollbar-hide w-full" style={{ overflowX: 'auto' }}>
          <div className="slider-news__container flex items-start touch-pan-y pl-4 sm:pl-6 lg:pl-24 xl:pl-40 pr-4 sm:pr-6 lg:pr-24 xl:pr-40" style={{ gap: '1rem' }}>
            {news.map((item, idx) => (
              <div key={idx} className="slider-news__slide min-w-0 snap-center pb-4" style={{ flex: `0 0 ${cardsPerRow > 1 ? (100 / cardsPerRow - ((cardsPerRow - 1) * 1) / cardsPerRow) : 85}%` }}>
                <a href={item.link} onClick={(e) => { e.preventDefault(); onArticleClick && onArticleClick(item.id); }} className="news-card block rounded-[20px] overflow-hidden flex flex-col bg-[#000] text-[#fff] border border-[rgba(255,255,255,0.25)] h-[24.375rem] select-none group relative">
                  <div className="overflow-hidden h-[12.5rem] min-h-[12.5rem] w-full z-[1]">
                    <img loading="lazy" 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                     width="1920" height="1080" />
                  </div>
                  <div className="news-card__content p-[2.25rem] pb-0 flex flex-col justify-between h-full">
                    <h3 
                      className="font-inter-tight font-normal tracking-[0.005em] line-clamp-3"
                      style={{ 
                        fontSize: 'clamp(.875rem, .5801886792rem + .9433962264vw, 1.5rem)', 
                        fontWeight: 300,
                        letterSpacing: '.005em',
                        fontFamily: 'var(--font-inter-tight)',
                        lineHeight: 1
                      }}
                    >
                      {item.title}
                    </h3>
                    <div className="mb-[1.875rem]">
                      <span className="news-card__btn text-white underline cursor-pointer hover:opacity-70 transition-opacity" style={{ 
                        fontSize: 'clamp(.875rem, .8160377358rem + .1886792453vw, 1rem)',
                        fontFamily: 'Inter Tight, sans-serif',
                        fontWeight: 300,
                        lineHeight: 1.4,
                        letterSpacing: '.02em'
                      }}>
                        {lang === 'PL' ? 'Czytaj więcej' : 'Read more'}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-4 sm:px-6 lg:px-24 xl:px-40 mt-12">
        <div className="flex gap-4 w-full sm:w-auto justify-center sm:justify-start">
          <button aria-label="Przewiń poradniki w lewo" onClick={() => scroll('left')} className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors">
            <ChevronLeft className="w-6 h-6 text-black" strokeWidth={1.5} />
          </button>
          <button aria-label="Przewiń poradniki w prawo" onClick={() => scroll('right')} className="w-14 h-14 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors">
            <ChevronRight className="w-6 h-6 text-black" strokeWidth={1.5} />
          </button>
        </div>
        <div className="hidden sm:block flex-1 h-[1px] bg-black/10"></div>
        <button onClick={onPoradnikClick} className="flex items-center justify-center gap-2 text-black font-medium hover:opacity-70 transition-opacity whitespace-nowrap underline underline-offset-4 sm:no-underline w-full sm:w-auto">
          {lang === 'PL' ? 'Zobacz nasz poradnik' : 'See our guide'} <ArrowRight className="w-5 h-5 shrink-0" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const testimonials = [
    { text: lang === 'PL' ? "Głównym celem było wycięcie spamu i automatyzacja ofertowania. Po wdrożeniu rozwiązań od Solid Agency dostajemy gotowe leady B2B. Odpadło nam ręczne przepisywanie danych i odbieranie telefonów od przypadkowych osób. System filtruje zapytania, a my zajmujemy się tylko domykaniem sprzedaży. Oszczędność czasu jest kolosalna." : "The main goal was to eliminate spam and automate quoting. After implementing Solid Agency's solutions, we receive ready-to-convert B2B leads. We no longer have to manually handle data and pointless calls. The system filters what's important. The time savings are colossal.", author: "CHIEF OPERATING OFFICER", company: "Logistics & Distribution" },
    { text: lang === 'PL' ? "W końcu mamy profesjonalną stronę - klienci nas znajdują i widzą aktualne menu. Wszystko śmiga na telefonach, co w gastro jest kluczowe. Od startu strony mamy o wiele więcej ludzi w lokalu. Tego potrzebowaliśmy, dziękujemy!" : "Finally, we have a professional website that helps clients find us and see our up-to-date menus. Everything works instantly on phones, which is crucial in the restaurant industry. Since launching the site, we have noticeably more new people in the restaurant. Thanks for the help!", author: "MARKETING & OPERATIONS", company: "PLAN Streetfood" },
    { text: lang === 'PL' ? "Since the launch, our sales numbers have shifted completely. The new site and ads are finally hitting the right audience, and the volume of serious inquiries is the highest we've ever seen. Our inventory is visible where it matters, and the traffic is actually converting into showroom visits. No fluff, just a massive boost in leads. They delivered exactly what we needed to grow." : "Since the launch, our sales numbers have shifted completely. The new site and ads are finally hitting the right audience, and the volume of serious inquiries is the highest we've ever seen. Our inventory is visible where it matters, and the traffic is actually converting into showroom visits. No fluff, just a massive boost in leads. They delivered exactly what we needed to grow.", author: "TECHNICAL DIRECTOR", company: "Automotive Group" },
    { text: lang === 'PL' ? "Wine is a restricted category for ads, which meant we had to get creative. The content strategy they developed built us a genuine audience of enthusiasts. Organic search now drives the majority of our revenue and we've built real brand equity in a category where most players are just competing on price." : "Wine is a restricted category for ads, which meant we had to get creative. The content strategy they developed built us a genuine audience of enthusiasts. Organic search now drives the majority of our revenue and we've built real brand equity in a category where most players are just competing on price.", author: "FOUNDER", company: "CrateAndPour Wines" },
    { text: lang === 'PL' ? "Wcześniej miałem może dwa zapytania o auta na tydzień, teraz codziennie wpada coś konkretnego. Dzięki nowej stronie i ogarnięciu SEO telefon nie przestaje dzwonić. Inwestycja spłaciła się po pierwszym sprowadzonym aucie. Jak ktoś szuka konkretów, a nie bajek, to trafił pod dobry adres. Dzięki za pomoc jeszcze raz :)" : "Previously I had maybe two inquiries about cars a week, now something concrete falls in every day. After changing the site and handling SEO, the phone doesn't stop ringing. The investment paid off after the first imported car. If someone is looking for specifics, not fairy tales, they have come to the right place. Thanks for the help again :)", author: "FOUNDER", company: "MorytzAuto" },
  ];

  const colors = [
    'bg-[#E6E6FA]', // lavender
    'bg-[#D8BFD8]', // thistle
    'bg-[#CFC0E8]', // lavender
    'bg-[#D1C4E9]', // deep purple light
    'bg-[#E1BEE7]', // soft purple
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    
    if (mediaQuery.matches) {
       gsap.set(cardsRef.current, {
           x: 0, 
           rotate: (index) => (index - 2) * 5,
           transformOrigin: "bottom center"
       });
    }
  }, []);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) {
      const w = window.innerWidth;
      // Zmniejszamy spread, aby karty nie "rozjeżdżały się" za bardzo
      const spread = w > 1600 ? 340 : w > 1300 ? 280 : 220; 
      gsap.to(cardsRef.current, {
        x: (index) => (index - 2) * spread,
        y: (index) => Math.abs(index - 2) * 5 - 5,
        rotate: (index) => (index - 2) * 0.5,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto"
      });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      gsap.to(cardsRef.current, {
        x: 0,
        y: 0,
        rotate: (index) => (index - 2) * 5,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto"
      });
    }
  };

  return (
    <section 
      className="py-24 lg:py-48 bg-white overflow-hidden border-t border-black/10 transition-colors"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-[6.25rem]">
        
        <div className="flex flex-col lg:hidden w-full">
          <div className="mb-12">
            <h2 className="text-black font-inter-tight font-medium text-[clamp(2.5rem,4vw,4rem)] leading-[1.1] mb-2 tracking-tight">
              {lang === 'PL' ? 'Zaufali nam liderzy' : 'Trusted by leaders'}
            </h2>
            <p className="text-black/60 font-inter-tight text-lg max-w-sm">
              {lang === 'PL' ? 'Zobacz co mówią klienci o współpracy z naszym zespołem.' : 'See what clients say about working with our team.'}
            </p>
          </div>
          
          <div className="overflow-hidden w-[100vw] relative left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex touch-pan-y" style={{ marginLeft: '-1rem' }}>
              {testimonials.map((test, index) => (
                <div 
                  key={index}
                  className="flex-[0_0_92%] min-w-0 pl-12 sm:flex-[0_0_80%]"
                >
                  <div className={`w-full h-[400px] rounded-[2rem] p-6 flex flex-col justify-between shadow-xl shadow-black/5 ${colors[index]}`}>
                    <div className="mb-0">
                      <svg className="w-6 h-6 opacity-20 mb-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-black/80 font-light leading-[1.25] font-inter-tight text-[1rem]">
                        {test.text}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-black/10 min-h-[60px] flex flex-col justify-center">
                      <h4 className="text-black font-semibold text-sm font-inter-tight tracking-tight">{test.author}</h4>
                      <span className="text-black/60 text-[0.7rem] font-medium tracking-tight uppercase block mt-0.5 leading-tight">{test.company}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-8 justify-center">
            <button onClick={scrollPrev} className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors text-black shrink-0">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button onClick={scrollNext} className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors text-black shrink-0">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-col items-center justify-center min-h-[700px]">
          
          <div className="w-full text-center mb-16 relative z-10">
            <h2 className="text-black font-inter-tight font-medium text-[clamp(3rem,5vw,5rem)] leading-[1.1] mb-6 tracking-tight">
              {lang === 'PL' ? 'Zaufali nam liderzy' : 'Trusted by leaders'}
            </h2>
            <p className="text-black/60 font-inter-tight text-xl max-w-lg mx-auto">
              {lang === 'PL' ? 'Zobacz co mówią klienci o współpracy z naszym zespołem.' : 'See what clients say about working with our team.'}
            </p>
          </div>

          <div className="w-full flex justify-center items-center">
            <div 
              ref={containerRef}
              className="relative flex items-center justify-center w-[360px] h-[520px]"
            >
              {testimonials.map((test, index) => (
                <div 
                  key={index}
                  ref={(el) => cardsRef.current[index] = el}
                  className={`absolute w-[360px] h-[520px] rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl shadow-black/5 ${colors[index]}`}
                  style={{ zIndex: index, transformOrigin: 'center center' }}
                >
                  <div className="mb-0">
                    <svg className="w-10 h-10 opacity-20 mb-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-black/80 font-medium leading-[1.4] font-inter-tight text-[1.1rem]">
                      {test.text}
                    </p>
                  </div>
                  <div className="mt-4 pt-6 border-t border-black/10 min-h-[100px] flex flex-col justify-center">
                    <h4 className="text-black font-semibold text-lg font-inter-tight tracking-tight">{test.author}</h4>
                    <span className="text-black/60 text-xs font-medium tracking-tight uppercase block mt-1 leading-tight">{test.company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* --- From AdsOfferPage.tsx --- */

const getAdsProjectsData = (lang: 'PL' | 'ENG') => {
  const base = getProjectsData(lang);
  const overrides = lang === 'PL' ? [
    { title: 'Kampanie Google Ads', description: 'Usługa dla firm, które chcą być widoczne dokładnie wtedy, gdy klient szuka ich usług w wyszukiwarce. Ustawiamy reklamy na konkretne słowa kluczowe, aby Twoja oferta pojawiała się na samej górze wyników przed konkurencją. Pilnujemy, aby budżet nie uciekał na przypadkowe kliknięcia, tylko sprowadzał osoby zdecydowane na wybór Twojej firmy. To najprostsza metoda na pozyskanie ruchu, który natychmiast przekłada się na realne zapytania i zwrot z inwestycji.', deliveryTime: 'Start w 48 godzin' },
    { title: 'Kampanie Meta Ads', description: 'Reklamy na Facebooku i Instagramie, które docierają do odbiorców na podstawie ich zachowań i potrzeb. Tworzymy przekazy wizualne, które zatrzymują użytkownika podczas przeglądania aplikacji i budują chęć skorzystania z Twojej oferty. System pozwala nam precyzyjnie przypominać o usługach osobom, które już wcześniej odwiedziły Twoją stronę, ale nie podjęły decyzji. Dzięki temu nie tracisz kontaktu z potencjalnym klientem i systematycznie zwiększasz zasięgi marki.', deliveryTime: 'Start w 48 godzin' },
    { title: 'Lejki Sprzedażowe & Omnichannel', description: 'Budujemy system komunikacji, który łączy reklamy, e-maile i stronę w jedną, logiczną drogę klienta. Zamiast liczyć na pojedynczy strzał, prowadzimy użytkownika przez kolejne etapy znajomości z marką aż do sfinalizowania transakcji. Każdy kanał wymienia się informacjami, dzięki czemu klient otrzymuje spójne komunikaty niezależnie od tego, gdzie nas widzi. To rozwiązanie wyciska maksimum z każdego wejścia na stronę i buduje bazę lojalnych, powracających klientów.', deliveryTime: 'Start do 7 dni', buttonText: { PL: 'Omów strategię', ENG: 'Discuss strategy' } },
    { title: 'Audyt & Strategia Marketingowa', description: 'Analizujemy Twoje obecne reklamy oraz stronę, aby wskazać miejsca, w których tracisz szanse na pozyskanie klienta. Na tej podstawie dostajesz konkretny plan działania z wyliczonymi budżetami i wybranymi kanałami, które najlepiej sprawdzą się w Twojej branży. Badamy ruch w witrynie i sprawdzamy, co robi konkurencja, żeby zaproponować lepsze i skuteczniejsze rozwiązania. To fundament Twojego biznesu, który daje Ci pewność, że marketing jest zaplanowany.', deliveryTime: 'Czas realizacji do 7 dni', buttonText: { PL: 'Bezpłatna konsultacja', ENG: 'Free consultation' } }
  ] : [
    { title: 'Google Ads Campaigns', description: 'A service for companies that want to be visible exactly when a customer is looking for their services in the search engine. We set up ads for specific keywords so that your offer appears at the very top of the results before the competition. We make sure that the budget does not escape on random clicks, but brings people determined to choose your company. This is the simplest method to acquire traffic that immediately translates into real inquiries and return on investment.', deliveryTime: 'Start in 48 hours' },
    { title: 'Meta Ads Campaigns', description: 'Ads on Facebook and Instagram that reach audiences based on their behaviors and needs. We create visual messages that stop the user while browsing the app and build a desire to use your offer. The system allows us to precisely remind people about services who have previously visited your site but have not made a decision. Thanks to this, you do not lose contact with a potential customer and systematically increase brand reach.', deliveryTime: 'Start in 48 hours' },
    { title: 'Sales Funnels & Omnichannel', description: 'We build a communication system that combines ads, emails, and the website into one logical customer journey. Instead of counting on a single shot, we guide the user through successive stages of getting to know the brand until the transaction is finalized. Each channel exchanges information, so the customer receives consistent messages regardless of where they see us. This solution squeezes the maximum out of every site visit and builds a base of loyal, returning customers.', deliveryTime: 'Start up to 7 days', buttonText: { PL: 'Omów strategię', ENG: 'Discuss strategy' } },
    { title: 'Audit & Marketing Strategy', description: 'We analyze your current ads and website to identify places where you are losing opportunities to acquire a customer. Based on this, you get a specific action plan with calculated budgets and selected channels that will work best in your industry. We examine site traffic and check what the competition is doing to propose better and more effective solutions. This is the foundation of your business, giving you the certainty that marketing is planned.', deliveryTime: 'Delivery up to 7 days', buttonText: { PL: 'Bezpłatna konsultacja', ENG: 'Free consultation' } }
  ];
  return base.map((p, i) => ({ ...p, ...overrides[i] }));
};

function AdsOfferPage({ onBack, onContactClick, onAskAwayClick, onStartProjectClick }: { onBack: () => void; onContactClick: () => void; onAskAwayClick: () => void; onStartProjectClick?: () => void }) {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const processStages = lang === 'PL' ? [
    {
      id: '01',
      title: 'Audyt & Analiza',
      paragraphs: [
        "Zaczynamy od sprawdzenia Twoich obecnych działań i analityki. Szukamy miejsc, gdzie tracisz budżet i identyfikujemy największe szanse na wzrost.",
        "Analizujemy konkurencję i ich strategie reklamowe, aby znaleźć Twoją przewagę.",
        "Efektem jest jasna strategia i dobór odpowiednich kanałów dotarcia."
      ]
    },
    {
      id: '02',
      title: 'Konfiguracja & Kreacja',
      paragraphs: [
        "Przygotowujemy strukturę kont reklamowych, wdrażamy kody śledzące (Pixel, GTM) i tworzymy atrakcyjne kreacje wizualne.",
        "Każda reklama jest projektowana tak, aby przyciągać wzrok i skłaniać do konkretnego działania.",
        "Ustawiamy zaawansowane grupy odbiorców oparte na Twoich danych i zainteresowaniach."
      ]
    },
    {
      id: '03',
      title: 'Start & Optymalizacja',
      paragraphs: [
        "Odpalamy kampanie i od pierwszej minuty monitorujemy ich wyniki. Nie zostawiamy reklam samym sobie – codziennie optymalizujemy stawki i wykluczamy nietrafne wyświetlenia.",
        "Testujemy różne warianty nagłówków, grafik i tekstów, aby znaleźć te najbardziej dochodowe."
      ]
    },
    {
      id: '04',
      title: 'Skalowanie & Raportowanie',
      paragraphs: [
        "Gdy znajdziemy zwycięskie kombinacje, zaczynamy skalować budżety, aby dostarczać Ci jeszcze więcej klientów przy zachowaniu rentowności.",
        "Otrzymujesz od nas przejrzyste raporty z konkretnymi wynikami: ile wydaliśmy i ile zarobiłeś.",
        "Stale szukamy nowych dróg rozwoju Twojego marketingu."
      ]
    }
  ] : [
    {
      id: '01',
      title: 'Audit & Analysis',
      paragraphs: [
        "We start by checking your current activities and analytics. We look for places where you lose your budget and identify the biggest opportunities for growth.",
        "We analyze the competition and their advertising strategies to find your advantage.",
        "The result is a clear strategy and the selection of appropriate reach channels."
      ]
    },
    {
      id: '02',
      title: 'Configuration & Creation',
      paragraphs: [
        "We prepare the structure of advertising accounts, implement tracking codes (Pixel, GTM) and create attractive visual creations.",
        "Each ad is designed to catch the eye and encourage specific action.",
        "We set up advanced audience groups based on your data and interests."
      ]
    },
    {
      id: '03',
      title: 'Start & Optimization',
      paragraphs: [
        "We launch campaigns and monitor their results from the first minute. We do not leave ads to themselves - we optimize bids every day and exclude irrelevant impressions.",
        "We test different variants of headlines, graphics and texts to find the most profitable ones."
      ]
    },
    {
      id: '04',
      title: 'Scaling & Reporting',
      paragraphs: [
        "When we find winning combinations, we start scaling budgets to provide you with even more customers while maintaining profitability.",
        "You receive clear reports from us with specific results: how much we spent and how much you earned.",
        "We are constantly looking for new ways to develop your marketing."
      ]
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = lang === 'PL' ? [
    {
      question: "Jaki budżet reklamowy jest potrzebny na start?",
      answer: "Dobór budżetu zależy od branży oraz skali działań, jednak rekomendujemy kwoty, które pozwolą na zebranie odpowiedniej ilości danych do optymalizacji. Na etapie bezpłatnej wyceny przygotowujemy estymację, wskazując realne progi wejścia dla Twojego biznesu."
    },
    {
      question: "Kiedy zobaczę pierwsze efekty kampanii?",
      answer: "Reklamy w wyszukiwarce oraz mediach społecznościowych zaczynają wyświetlać się niemal natychmiast po zatwierdzeniu przez system. Pierwsze wiarygodne dane analityczne i spływające zapytania pojawiają się zazwyczaj w ciągu pierwszych kilku dni od startu."
    },
    {
      question: "Czy muszę mieć własne grafiki do reklam?",
      answer: "Nie jest to konieczne – w ramach kompleksowej obsługi tworzymy skuteczne przekazy wizualne, które zatrzymują użytkownika i budują chęć skorzystania z oferty. Jeśli dysponujesz własnymi materiałami, analizujemy je pod kątem zgodności ze standardami danej platformy."
    },
    {
      question: "Jak mierzycie skuteczność prowadzonych działań?",
      answer: "Skupiamy się na twardych danych: liczbie leadów, transakcji oraz zwrocie z inwestycji (ROI). Każda kampania jest w pełni oomiarowana, co pozwala nam precyzyjnie wskazać, które słowa kluczowe lub kreacje generują realny zysk."
    },
    {
      question: "Czym różni się strategia Google Ads od Meta Ads?",
      answer: "Google Ads trafia do osób, które aktywnie szukają konkretnej usługi, natomiast Meta Ads buduje potrzebę u klienta na podstawie jego zachowań i zainteresowań. Łączymy obie platformy w strategię omnichannel, aby domykać sprzedaż na różnych etapach ścieżki zakupowej."
    },
    {
      question: "Czy mogę samodzielnie edytować kampanię w trakcie jej trwania?",
      answer: "Zalecamy pozostawienie optymalizacji w rękach specjalistów, ponieważ nagłe zmiany mogą przerwać proces uczenia się algorytmów. Wszystkie modyfikacje wprowadzamy na podstawie bieżącej analityki, aby utrzymać stały wzrost wyników."
    },
    {
      question: "Co dzieje się, gdy klient wejdzie na stronę, ale nie dokona zakupu?",
      answer: "Wykorzystujemy systemy remarketingu, które pozwalają nam precyzyjnie przypominać o Twoich usługach osobom, które już wcześniej odwiedziły stronę. Dzięki temu nie tracisz kontaktu z potencjalnym klientem i systematycznie zwiększasz szanse na konwersję."
    }
  ] : [
    {
      question: "What advertising budget is needed to start?",
      answer: "The choice of budget depends on the industry and the scale of activities, however, we recommend amounts that will allow collecting the right amount of data for optimization. At the free valuation stage, we prepare an estimation, indicating realistic entry thresholds for your business."
    },
    {
      question: "When will I see the first effects of the campaign?",
      answer: "Search engine and social media ads start displaying almost immediately after system approval. The first reliable analytical data and incoming inquiries usually appear within the first few days of launch."
    },
    {
      question: "Do I need to have my own graphics for ads?",
      answer: "It is not necessary - as part of comprehensive service, we create effective visual messages that stop the user and build a desire to use the offer. If you have your own materials, we analyze them for compliance with the standards of a given platform."
    },
    {
      question: "How do you measure the effectiveness of activities?",
      answer: "We focus on hard data: the number of leads, transactions, and return on investment (ROI). Each campaign is fully measured, which allows us to precisely indicate which keywords or creatives generate real profit."
    },
    {
      question: "How does Google Ads strategy differ from Meta Ads?",
      answer: "Google Ads reaches people who are actively looking for a specific service, while Meta Ads builds a need in the customer based on their behavior and interests. We combine both platforms into an omnichannel strategy to close sales at various stages of the purchasing path."
    },
    {
      question: "Can I edit the campaign myself while it is running?",
      answer: "We recommend leaving optimization in the hands of specialists, as sudden changes can interrupt the algorithm learning process. We introduce all modifications based on current analytics to maintain a steady growth in results."
    },
    {
      question: "What happens when a customer visits the site but does not make a purchase?",
      answer: "We use remarketing systems that allow us to precisely remind people about your services who have previously visited the site. Thanks to this, you do not lose contact with a potential customer and systematically increase the chances of conversion."
    }
  ];

  return (
    <div className="relative z-40 bg-black text-white min-h-screen">
      <div className="absolute inset-0 z-0 h-[200vh] pointer-events-none overflow-hidden">
        <video preload="none" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60"
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/t%C5%82o.mp4"
        poster="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/HomepageZdjecieWTle.webp" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="fixed top-8 left-4 md:top-12 md:left-12 z-50">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pt-40 lg:pt-48 pb-16 lg:pb-12 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
            <div 
              className="font-inter-tight text-white max-w-[15em]"
              style={{ 
                lineHeight: '1', 
                fontWeight: '300',
                fontSize: 'clamp(1.75rem, 1.5rem + 2vw, 3.5rem)'
              }}
            >
              {lang === 'PL' ? 'Zaawansowane systemy reklamowe, które docierają do Twoich klientów dokładnie tam, gdzie spędzają czas.' : 'Advanced advertising systems that reach your customers exactly where they spend their time.'}
            </div>

            <div 
              className="font-inter-tight text-slate-300 lg:max-w-[35em]"
              style={{ 
                fontSize: 'clamp(1rem, .735915493rem + .8450704225vw, 1.75rem)',
                letterSpacing: '-.01em',
                fontWeight: '300'
              }}
            >
              <p className="mb-8">
                {lang === 'PL' ? 'Prowadzimy działania w Google i Meta Ads w oparciu o twarde dane, a nie przypuszczenia. Każda złotówka z Twojego budżetu jest optymalizowana pod kątem konwersji i realnego zwrotu z inwestycji.' : 'Do not burn your budget on random activities. We create data-driven campaigns that precisely meet the needs of your audience.'}
              </p>
              <p>
                {lang === 'PL' ? 'Tworzymy spójne strategie, które docierają do Twoich klientów dokładnie w momencie, gdy potrzebują Twoich usług. Nie obiecujemy zasięgów – dowozimy prawdziwe wyniki w panelu sprzedażowym.' : 'We combine the potential of the Google search engine with the reach of Facebook and Instagram, building a coherent omnichannel strategy that closes sales.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <ServicesGrid projectsData={getAdsProjectsData(lang)} onContactClick={onContactClick} />

      <section className="relative z-10 w-full bg-white text-black">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-[6.25rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 items-center">
            <h2 className="text-black font-normal leading-[1.2] max-w-[12em] font-inter-tight" style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)' }}>
              {lang === 'PL' ? 'Reklama to nie koszt, to inwestycja. Każda złotówka wydana na marketing musi pracować na Twój zysk.' : 'Advertising is not a cost, it is an investment. Every zloty spent on marketing must work for your profit.'}
            </h2>
            <div className="text-[#363636] lg:col-start-2 max-w-[27.5em] lg:ml-auto font-inter-tight font-normal leading-[1.2] tracking-[.02em]" style={{ fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)' }}>
              {lang === 'PL' ? 'Skupiamy się na twardych wynikach. Nie interesują nas puste polubienia, ale realna sprzedaż i zapytania ofertowe. Dzięki ciągłej optymalizacji i testom, wyciskamy maksimum z każdego budżetu reklamowego.' : 'We focus on hard results. We are not interested in empty likes, but real sales and inquiries. Thanks to continuous optimization and testing, we squeeze the maximum out of every advertising budget.'}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 pt-0 pb-32 bg-white">
        <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
          <h2 className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold text-black leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full">
            <span className="sm:hidden flex flex-col items-end text-right w-full">
              <span>{lang === 'PL' ? <><>ZOBACZ<br />PROCES.</></> : <><>SEE THE<br />PROCESS.</></>}</span>
              <div className="flex flex-col items-start text-left w-[90%]" style={{ position: 'relative', paddingTop: '2.3125rem' }}>
                <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2, textTransform: 'none', letterSpacing: 'normal' }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                <span className="mt-2 text-left" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 300, letterSpacing: '.2em', textTransform: 'uppercase', lineHeight: 1.5, maxWidth: '280px' }}>{lang === 'PL' ? 'Nasze kroki do stworzenia Twoich dochodowych kampanii.' : 'Our steps to create your profitable campaigns.'}</span>
              </div>
            </span>
            <span className="hidden sm:inline-grid text-left">
              <span className="invisible col-start-1 row-start-1 select-none whitespace-pre" aria-hidden="true">{lang === 'PL' ? 'TWORZYMY TO' : 'WE CREATE IT'}</span>
              <span className="col-start-1 row-start-1 flex flex-col w-full">
                <span className="text-left">{lang === 'PL' ? 'ZOBACZ' : 'SEE THE'}</span>
                <span className="flex justify-between items-center w-full">
                  <div className="text-left flex flex-col">
                    <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2, textTransform: 'none', letterSpacing: 'normal' }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                    <span className="mt-2" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 300, letterSpacing: '.2em', textTransform: 'uppercase', maxWidth: '280px', lineHeight: 1.5 }}>{lang === 'PL' ? 'Nasze kroki do stworzenia Twoich dochodowych kampanii.' : 'Our steps to create your profitable campaigns.'}</span>
                  </div>
                  <span className="text-right">{lang === 'PL' ? 'PROCES.' : 'PROCESS.'}</span>
                </span>
              </span>
            </span>
          </h2>
        </div>
      </section>

      <section className="relative w-full bg-white text-black z-10">
        {processStages.map((stage, index) => (
          <div key={stage.id} className="sticky top-[72px] h-[calc(100vh-72px)] w-full bg-white flex flex-col" style={{ zIndex: 20 + index }}>
            <div className="max-w-[100rem] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex flex-col">
              <div className="w-full h-[1px] bg-black/10" />
              <div className="flex-1 flex flex-col justify-center py-12 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <h2 className="text-[clamp(3rem,10vw,8rem)] font-bold font-inter-tight leading-none tracking-tighter">{stage.title}</h2>
                  <div className="space-y-8 max-w-[35em] lg:ml-auto">
                    {stage.paragraphs.map((p, i) => (
                      <p key={i} className="text-[clamp(1rem,1.2vw,1.375rem)] font-inter-tight font-normal leading-relaxed text-[#363636]">{p}</p>
                    ))}
                  </div>
                </div>
                <div className="mt-auto flex items-end justify-between pb-8">
                  <span className="text-sm font-mono text-black/40">{stage.id}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-white py-[6.25rem] lg:py-[12.5rem]">
        <div className="mx-[1.875rem] flex flex-col lg:flex-row justify-between gap-12 lg:gap-[2rem]">
          <div className="lg:w-[480px]">
            <div className="lg:sticky lg:top-[100px] bg-[#F3DEFF] p-[1.5625rem] rounded-[20px] h-fit">
              <h2 className="text-[2.5rem] lg:text-[3.2rem] font-inter-tight font-normal leading-[1.05] mb-6 text-black">{lang === 'PL' ? 'Zacznij skalować swoją sprzedaż' : 'Start Scaling Your Sales'}</h2>
              <p className="text-black/60 text-lg mb-10">{lang === 'PL' ? 'Maksymalizuj zyski z kampanii.' : 'Your campaigns are waiting to be launched.'}</p>
              <button onClick={onAskAwayClick} className="bg-white/20 hover:bg-white/30 text-black px-8 py-4 rounded-full transition-colors text-sm font-medium border border-black/10">{lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}</button>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              {faqItems.map((item, index) => (
                <div key={index} className="border-t border-[#d9d9d9] last:border-b">
                  <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full py-8 flex justify-between items-center text-left group">
                    <span className="text-xl lg:text-2xl font-inter-tight font-normal text-black pr-8">{item.question}</span>
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 flex items-center justify-center relative">
                        <motion.div animate={{ rotate: openIndex === index ? 90 : 0 }} className="absolute w-4 h-[1px] bg-black" />
                        <motion.div animate={{ rotate: openIndex === index ? 0 : 90 }} className="absolute w-4 h-[1px] bg-black" />
                      </div>
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                        <div className="pb-8 text-black/60 text-lg leading-relaxed max-w-[800px]">{item.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-white text-black flex flex-col items-center justify-between p-6 relative overflow-hidden">
        <div className="h-20 w-full"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden -translate-y-20 sm:translate-y-0">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible scale-[1.4] sm:scale-100">
            <path id="curve-bottom-offer-ads" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
            <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <motion.textPath xlinkHref="#curve-bottom-offer-ads" animate={{ startOffset: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="text-[100px] sm:text-[150px] font-bold text-black uppercase tracking-[0.01em] fill-black font-bebas">
                {lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
          <span className="text-black/60 text-sm tracking-widest uppercase">{lang === 'PL' ? 'KONTAKT' : 'CONTACT'}</span>
          <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">{lang === 'PL' ? 'Gotów, by odpalić swoje kampanie?' : 'Ready to launch your campaigns?'}</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={onStartProjectClick || onContactClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}</button>
            <button onClick={onAskAwayClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}</button>
          </div>
        </div>
        <footer className="w-full flex justify-between items-end z-20 pb-4">
          <div className="text-sm">
            <p className="font-bold">{lang === 'PL' ? 'POLAND' : 'POLAND'}</p>
            <p className="text-black/60">{lang === 'PL' ? 'Lubelskie, Lublin - Tutaj jesteśmy. Działamy na całym świecie.' : 'Lubelskie, Lublin - We are here. We operate worldwide.'}</p>
          </div>
          <div className="w-32"></div>
        </footer>
      </section>
    </div>
  );
}


/* --- From ArticlePage.tsx --- */

function DarkContactSection({ onContactClick, onAskAwayClick, onStartProjectClick }: { onContactClick: () => void, onAskAwayClick: () => void, onStartProjectClick?: () => void }) {
  const { lang } = useLanguage();
  const text = lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US ";
  
  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center justify-between p-6 relative overflow-hidden">
      {/* Spacer for top since no navbar */}
      <div className="h-20 w-full"></div>

      {/* Curved Text Container */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden -translate-y-20 sm:translate-y-0">
        <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible scale-[1.4] sm:scale-100">
          <path id="curve-bottom-dark" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
          <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
            <motion.textPath 
              xlinkHref="#curve-bottom-dark" 
              animate={{ startOffset: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-[100px] sm:text-[150px] font-bold uppercase tracking-[0.01em] fill-white/10 font-bebas"
            >
              {text}
            </motion.textPath>
          </text>
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
        <span className="text-white/60 text-sm tracking-widest uppercase">{lang === 'PL' ? 'KONTAKT' : 'CONTACT'}</span>
        <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">{lang === 'PL' ? 'Gotów, by stworzyć coś niepowtarzalnego?' : 'Ready to create something unique?'}</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button onClick={onStartProjectClick || onContactClick} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}</button>
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
    </section>
  );
}

function RelatedPosts({ currentArticleId, onArticleClick }: { currentArticleId: string, onArticleClick: (id: string) => void }) {
  const { lang } = useLanguage();
  const posts = [
    {
      id: "ux-design",
      title: lang === 'PL' ? "UX Design: Strategia zatrzymywania użytkownika i optymalizacji zysku" : "UX Design: User retention strategy and profit optimization",
      image: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-UXdesign.png?raw=true",
      link: "#"
    },
    {
      id: "architektura-strony",
      title: lang === 'PL' ? "Architektura strony: Kompletny przewodnik po budowie wydajnego systemu sprzedaży" : "Website architecture: A complete guide to building an efficient sales system",
      image: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-seo.png?raw=true",
      link: "#"
    },
    {
      id: "google-meta-ads",
      title: lang === 'PL' ? "Google Ads czy Meta Ads? Gdzie Twoja firma powinna wydać pierwszy budżet?" : "Google Ads or Meta Ads? Where should your company spend its first budget?",
      image: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-ads.png?raw=true",
      link: "#"
    },
    {
      id: "rebranding",
      title: lang === 'PL' ? "Rebranding strony: Kiedy odświeżenie wyglądu to za mało?" : "Website rebranding: When refreshing the look is not enough?",
      image: "https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/informacje-rebranding.png",
      link: "#"
    }
  ];

  const filteredPosts = posts.filter(post => post.id !== currentArticleId);

  return (
    <section className="latest-news" style={{
      position: 'relative',
      background: '#000',
      color: '#fff',
      paddingBlock: '9.125rem',
      paddingInline: '1.875rem',
      marginTop: '-20px'
    }}>
      <div className="max-w-[100rem] mx-auto">
        <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-white mb-12 tracking-tight">
          {lang === 'PL' ? 'Powiązane artykuły' : 'Related articles'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filteredPosts.map((item, idx) => (
            <a key={idx} href={item.link} onClick={(e) => { e.preventDefault(); onArticleClick(item.id); }} className="bg-[#0a0a0a] rounded-3xl overflow-hidden flex flex-col aspect-[4/5] group cursor-pointer no-underline border border-white/10 hover:border-white/20 transition-colors">
              <div className="h-[55%] w-full overflow-hidden bg-zinc-900 relative">
                <img loading="lazy" 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                 width="1920" height="1080" />
              </div>
              <div className="h-[45%] p-5 lg:p-6 flex flex-col justify-between">
                <h3 className="text-white text-lg lg:text-xl font-inter-tight leading-[1.3] font-light">
                  {item.title}
                </h3>
                <div className="mt-4">
                  <span className="text-white text-sm font-bold underline underline-offset-4 group-hover:text-white/80 transition-colors">
                    {lang === 'PL' ? 'Czytaj więcej' : 'Read more'}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticlePage({ onContactClick, onAskAwayClick, articleId = 'ux-design', onArticleClick, onStartProjectClick }: { onContactClick: () => void; onAskAwayClick: () => void; articleId?: string; onArticleClick?: (id: string) => void; onStartProjectClick?: () => void }) {
  const { lang } = useLanguage();
  const articles: Record<string, any> = {
    'ux-design': {
      title: lang === 'PL' ? "UX Design: Strategia zatrzymywania użytkownika i optymalizacji zysku" : "UX Design: User retention strategy and profit optimization",
      category: lang === 'PL' ? "PORADNIK" : "GUIDE",
      author: "Solid Agency",
      date: "15.03.2026",
      updateDate: "15.03.2026",
      coverImage: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-UXdesign.png?raw=true",
      toc: lang === 'PL' ? [
        { title: "Jak działa proces UX", id: "proces-ux" },
        { title: "Filary skutecznego UX Designu", id: "filary-ux" },
        { title: "Architektura Informacji", id: "architektura-informacji" },
        { title: "Psychologia koloru", id: "psychologia-koloru" },
        { title: "Badania użytkowników", id: "badania-uzytkownikow" }
      ] : [
        { title: "How the UX process works", id: "proces-ux" },
        { title: "Pillars of effective UX Design", id: "filary-ux" },
        { title: "Information Architecture", id: "architektura-informacji" },
        { title: "Color psychology", id: "psychologia-koloru" },
        { title: "User research", id: "badania-uzytkownikow" }
      ],
      content: lang === 'PL' ? (
        <>
          <p className="text-xl text-white leading-relaxed">
            User Experience (UX) Design to proces tworzenia produktów, które dostarczają użytkownikom istotnych i trafnych doświadczeń. Obejmuje on projektowanie całego procesu nabywania i integracji produktu, w tym aspektów brandingu, designu, użyteczności i funkcji. W świecie cyfrowym UX to różnica między stroną, którą użytkownik opuszcza po sekundzie, a systemem, który prowadzi go za rękę od pierwszego kliknięcia aż do finalizacji transakcji. To nie jest "rysowanie ładnych makiet" – to inżynieria zachowań ludzkich oparta na danych, psychologii i testach.
          </p>
          <p>
            Jeśli chcesz, aby Twoja platforma zarabiała, musisz zrozumieć, że design to nie tylko to, jak coś wygląda, ale przede wszystkim to, jak działa. Poniżej znajdziesz kompletny przewodnik po tym, jak projektujemy doświadczenia, które konwertują przypadkowych odwiedzających w lojalnych klientów.
          </p>

          <h2 id="proces-ux" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Jak działa proces UX: od psychologii do konwersji</h2>
          <p>
            Profesjonalny proces projektowania doświadczeń jest rygorystyczny i powtarzalny. Zaczyna się od Discovery & Research, gdzie analizujemy cele biznesowe, potrzeby użytkowników oraz słabe punkty konkurencji. Następnie przechodzimy do Strategii i Architektury Informacji, mapując ścieżki, którymi użytkownik porusza się po serwisie. Kolejnym krokiem jest tworzenie Wireframes (szkieletów), które skupiają się na hierarchii informacji bez rozpraszaczy wizualnych. Po testach użyteczności nakładana jest warstwa UI (User Interface), a gotowy prototyp trafia do deweloperów. Po wdrożeniu proces się nie kończy – analiza danych (Hotjar, Google Analytics) pozwala na ciągłą iterację i poprawianie wyników.
          </p>

          <h2 id="filary-ux" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Kluczowe filary skutecznego UX Designu</h2>
          <p>
            Wyróżniamy kilka krytycznych obszarów, które decydują o sukcesie produktu cyfrowego. Każdy z nich musi ze sobą współpracować, aby stworzyć pancerne i skuteczne doświadczenie użytkownika.
          </p>

          <h3 id="architektura-informacji" className="text-3xl text-white font-medium mt-12 mb-6 tracking-tight scroll-mt-32">Architektura Informacji i Nawigacja</h3>
          <p>
            Architektura informacji to sposób organizacji i strukturyzowania treści. Dobry UX sprawia, że użytkownik nie musi się zastanawiać, gdzie kliknąć. Nawigacja musi być intuicyjna, logiczna i przewidywalna. Stosujemy zasadę "trzech kliknięć" – jeśli dotarcie do celu zajmuje więcej czasu, tracisz klienta. Przejrzysta struktura to także fundament pod skuteczne SEO, ponieważ roboty Google lepiej indeksują logicznie zbudowane serwisy.
          </p>

          <h3 id="psychologia-koloru" className="text-3xl text-white font-medium mt-12 mb-6 tracking-tight scroll-mt-32">Psychologia koloru i hierarchia wizualna</h3>
          <p>
            To, gdzie użytkownik patrzy, nie jest dziełem przypadku. Poprzez odpowiednią hierarchię wizualną (wielkość fontów, kontrast, białe znaki) kierujemy wzrok klienta na przyciski CTA (Call to Action). Wykorzystujemy wzorce skanowania treści takie jak F-pattern czy Z-pattern, aby najważniejsze informacje o Twojej ofercie były widoczne w ułamku sekundy.
          </p>

          <h3 className="text-3xl text-white font-bold mt-12 mb-6 tracking-tight scroll-mt-32">Copywriting i UX Writing</h3>
          <p>
            Słowa na Twojej stronie to część interfejsu. UX Writing skupia się na tworzeniu krótkich, jasnych komunikatów, które pomagają użytkownikowi wykonać zadanie. Zamiast generycznego "Wyślij", stosujemy "Odbierz darmową wycenę". Precyzyjny język korzyści eliminuje niepewność i buduje zaufanie do marki.
          </p>

          <h3 id="badania-uzytkownikow" className="text-3xl text-white font-bold mt-12 mb-6 tracking-tight scroll-mt-32">Badania użytkowników i Testy Użyteczności</h3>
          <p>
            Nie zgadujemy – my wiemy. UX Design opiera się na dowodach. Przeprowadzamy testy z realnymi użytkownikami, aby wyłapać "wąskie gardła" na ścieżce zakupowej. Wykorzystujemy testy A/B, aby sprawdzić, który układ sekcji generuje większą sprzedaż. Dzięki temu każda zmiana na stronie jest inwestycją popartą liczbami, a nie subiektywnym odczuciem grafika.
          </p>

          <h3 className="text-3xl text-white font-bold mt-12 mb-6 tracking-tight">Projektowanie Responsywne i Mobile-First</h3>
          <p>
            W dobie dominacji urządzeń mobilnych, projektowanie zaczynamy od najmniejszych ekranów (Mobile-First). UX na smartfonie to walka o każdy milimetr powierzchni. Przyciski muszą być łatwe do kliknięcia kciukiem, a treści czytelne bez powiększania. Strona, która nie jest perfekcyjnie zoptymalizowana pod urządzenia mobilne, traci dziś ponad 60% potencjalnego ruchu.
          </p>

          <h3 className="text-3xl text-white font-bold mt-12 mb-6 tracking-tight">Znaczenie szybkości i dostępności (Accessibility)</h3>
          <p>
            UX to także wydajność techniczna. Jeśli strona ładuje się dłużej niż 3 sekundy, współczynnik odrzuceń (Bounce Rate) drastycznie rośnie. Optymalizacja szybkości to elementarna część doświadczenia użytkownika. Równie ważna jest dostępność – projektujemy tak, aby osoby z niepełnosprawnościami mogły bez problemu korzystać z serwisu. Standardy WCAG to nie tylko wymóg prawny w wielu branżach, ale także dowód na to, że Twój produkt jest SOLIDNY i przemyślany.
          </p>
        </>
      ) : (
        <>
          <p className="text-xl text-white leading-relaxed">
            User Experience (UX) Design is the process of creating products that provide users with meaningful and relevant experiences. It involves designing the entire process of acquiring and integrating the product, including aspects of branding, design, usability, and function. In the digital world, UX is the difference between a site that a user leaves after a second and a system that leads them by the hand from the first click to the finalization of the transaction. It's not "drawing pretty mockups" – it's human behavior engineering based on data, psychology, and testing.
          </p>
          <p>
            If you want your platform to earn, you must understand that design is not just how something looks, but primarily how it works. Below you will find a complete guide to how we design experiences that convert random visitors into loyal customers.
          </p>

          <h2 id="proces-ux" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">How the UX process works: from psychology to conversion</h2>
          <p>
            A professional experience design process is rigorous and repeatable. It starts with Discovery & Research, where we analyze business goals, user needs, and competitors' weak points. Then we move to Strategy and Information Architecture, mapping the paths the user takes through the site. The next step is creating Wireframes (skeletons), which focus on information hierarchy without visual distractors. After usability tests, a UI (User Interface) layer is applied, and a finished prototype goes to developers. The process doesn't end after implementation – data analysis (Hotjar, Google Analytics) allows for continuous iteration and improvement of results.
          </p>

          <h2 id="filary-ux" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Key pillars of effective UX Design</h2>
          <p>
            We distinguish several critical areas that decide the success of a digital product. Each must work together to create a solid and effective user experience.
          </p>

          <h3 id="architektura-informacji" className="text-3xl text-white font-medium mt-12 mb-6 tracking-tight scroll-mt-32">Information Architecture and Navigation</h3>
          <p>
            Information architecture is the way of organizing and structuring content. Good UX makes the user not have to wonder where to click. Navigation must be intuitive, logical, and predictable. We use the "three clicks" rule – if reaching the goal takes more time, you lose the customer. A clear structure is also the foundation for effective SEO, because Google robots better index logically built services.
          </p>

          <h3 id="psychologia-koloru" className="text-3xl text-white font-medium mt-12 mb-6 tracking-tight scroll-mt-32">Color psychology and visual hierarchy</h3>
          <p>
            Where the user looks is not a matter of chance. Through appropriate visual hierarchy (font size, contrast, white space) we direct the customer's gaze to CTA (Call to Action) buttons. We use content scanning patterns such as F-pattern or Z-pattern so that the most important information about your offer is visible in a fraction of a second.
          </p>

          <h3 className="text-3xl text-white font-medium mt-12 mb-6 tracking-tight scroll-mt-32">Copywriting and UX Writing</h3>
          <p>
            The words on your site are part of the interface. UX Writing focuses on creating short, clear messages that help the user perform a task. Instead of a generic "Send", we use "Get a free quote". Precise language of benefits eliminates uncertainty and builds trust in the brand.
          </p>

          <h3 id="badania-uzytkownikow" className="text-3xl text-white font-medium mt-12 mb-6 tracking-tight scroll-mt-32">User Research and Usability Testing</h3>
          <p>
            We don't guess – we know. UX Design is based on evidence. We conduct tests with real users to catch "bottlenecks" on the purchase path. We use A/B tests to check which section layout generates more sales. Thanks to this, every change on the site is an investment backed by numbers, not a subjective feeling of a graphic designer.
          </p>

          <h3 className="text-3xl text-white font-medium mt-12 mb-6 tracking-tight">Responsive Design and Mobile-First</h3>
          <p>
            In the era of mobile device dominance, we start design from the smallest screens (Mobile-First). UX on a smartphone is a fight for every millimeter of surface. Buttons must be easy to click with a thumb, and content readable without zooming. A site that is not perfectly optimized for mobile devices loses over 60% of potential traffic today.
          </p>

          <h3 className="text-3xl text-white font-medium mt-12 mb-6 tracking-tight">The importance of speed and accessibility</h3>
          <p>
            UX is also technical performance. If a site takes longer than 3 seconds to load, the bounce rate grows drastically. Speed optimization is an elementary part of the user experience. Equally important is accessibility – we design so that people with disabilities can use the service without problems. WCAG standards are not only a legal requirement in many industries, but also proof that your product is SOLID and well-thought-out.
          </p>
        </>
      )
    },
    'architektura-strony': {
      title: lang === 'PL' ? "Architektura strony: Kompletny przewodnik po budowie wydajnego systemu sprzedaży" : "Website architecture: A complete guide to building an efficient sales system",
      category: lang === 'PL' ? "PORADNIK" : "GUIDE",
      author: "Solid Agency",
      date: "20.03.2026",
      updateDate: "20.03.2026",
      coverImage: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-seo.png?raw=true",
      toc: lang === 'PL' ? [
        { title: "Strategiczne planowanie", id: "strategiczne-planowanie" },
        { title: "Płaska struktura a SEO", id: "plaska-struktura" },
        { title: "Siloing i autorytet", id: "siloing" },
        { title: "Linkowanie wewnętrzne", id: "linkowanie-wewnetrzne" },
        { title: "Techniczna doskonałość", id: "techniczna-doskonalosc" }
      ] : [
        { title: "Strategic planning", id: "strategiczne-planowanie" },
        { title: "Flat structure and SEO", id: "plaska-struktura" },
        { title: "Siloing and authority", id: "siloing" },
        { title: "Internal linking", id: "linkowanie-wewnetrzne" },
        { title: "Technical excellence", id: "techniczna-doskonalosc" }
      ],
      content: lang === 'PL' ? (
        <>
          <p className="text-xl text-white leading-relaxed">
            Architektura strony internetowej to strategiczny fundament, na którym opiera się cały sukces w sieci. To znacznie więcej niż tylko układ menu czy rozmieszczenie przycisków. To precyzyjnie zaprojektowany system naczyń połączonych, który ma jeden cel: sprawić, by użytkownik bez wysiłku dotarł do celu, a roboty Google uznały witrynę za niekwestionowany autorytet w branży. Budowanie strony bez przemyślanej architektury przypomina stawianie wieżowca bez planów konstrukcyjnych – można zainwestować w najdroższe materiały wykończeniowe i agresywną reklamę, ale budowla i tak runie pod ciężarem chaosu oraz błędów technicznych, które uniemożliwią jej naturalny wzrost w wyszukiwarkach.
          </p>
          <p>
            Prawdziwa wartość dobrze zaprojektowanej struktury objawia się w momencie, gdy przestajemy postrzegać stronę jako statyczną wizytówkę, a zaczynamy traktować ją jak inżynieryjny mechanizm do generowania zysku. Każda podstrona, każdy link i każdy adres URL musi mieć swoje uzasadnienie – zarówno dla człowieka, jak i dla algorytmu.
          </p>

          <h2 id="strategiczne-planowanie" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Strategiczne planowanie i psychologia nawigacji</h2>
          <p>
            Wszystko zaczyna się od mapowania intencji użytkownika. Zanim powstanie pierwszy szkielet strony, kluczowe jest zrozumienie, jak klienci szukają informacji i jakie problemy chcą rozwiązać. Architektura musi być lustrzanym odbiciem tego procesu. Strona główna pełni rolę centralnego węzła komunikacyjnego, z którego rozchodzą się główne arterie – kluczowe kategorie usług lub produktów. To tutaj stosuje się zasadę trzech kliknięć. Jest to bezwzględny standard wydajności: jeśli dotarcie do finalnego celu zajmuje użytkownikowi więcej niż trzy kroki, szansa na konwersję spada drastycznie.
          </p>
          <p id="plaska-struktura">
            Płaska struktura strony to nie tylko wygoda dla człowieka, to przede wszystkim klucz do efektywnego SEO. Google dysponuje tzw. Crawl Budget, czyli ograniczonym czasem na skanowanie witryny. Jeśli układ jest zagmatwany i zbyt głęboki, roboty marnują zasoby na błądzenie po mało istotnych zakładkach, zamiast indeksować najważniejsze oferty. Dobrze zaprojektowany system "popycha" moc rankingową ze strony głównej (zazwyczaj najsilniejszej) prosto do konkretnych produktów i usług, które mają realnie zarabiać.
          </p>

          <h2 id="siloing" className="text-4xl text-white font-bold mt-16 mb-8 tracking-tight scroll-mt-32">Siloing, czyli budowanie pancernego autorytetu tematycznego</h2>
          <p>
            Jednym z najbardziej zaawansowanych elementów architektury jest grupowanie tematyczne treści, znane jako Siloing. W dobie algorytmów opartych na sztucznej inteligencji, Google nie patrzy już tylko na pojedyncze słowa kluczowe, ale ocenia tzw. Topical Authority – czyli to, jak kompleksowo witryna wyczerpuje dany temat.
          </p>
          <p>
            Wyobraź sobie stronę jako bibliotekę podzieloną na wyraźne działy. Jeśli istnieje sekcja o systemach e-commerce, to wszystkie artykuły o płatnościach, logistyce i koszykach zakupowych powinny tworzyć spójny blok, który linkuje wewnątrz siebie. Dzięki temu wyszukiwarka dostaje jasny sygnał: „Ten serwis to kompletne źródło wiedzy o handlu elektronicznym”. Unikanie mieszania wątków z różnych "silosów" zapobiega rozmywaniu autorytetu domeny i pozwala na znacznie szybsze budowanie pozycji na trudne, wysokomarżowe frazy, których konkurencja nie jest w stanie przeskoczyć bez porządku w strukturze.
          </p>

          <h2 id="linkowanie-wewnetrzne" className="text-4xl text-white font-bold mt-16 mb-8 tracking-tight scroll-mt-32">Linkowanie wewnętrzne jako system zarządzania mocą SEO</h2>
          <p>
            Jeśli architektura jest szkieletem strony, to linkowanie wewnętrzne jest jej układem krwionośnym. Każdy link na stronie to kanał, którym płynie "moc" rankingowa. W inteligentnie zaprojektowanym systemie linki nie są przypadkowe. Wykorzystuje się linki kontekstowe wewnątrz opisów i artykułów, aby wskazać Google, które podstrony są priorytetowe pod kątem biznesowym.
          </p>
          <p>
            Kluczem jest tutaj optymalizacja anchor tekstów, czyli słów, pod którymi ukryty jest link. Zamiast bezużytecznych zwrotów typu „kliknij tutaj”, stosuje się konkretne frazy opisowe, które budują mapę semantyczną witryny. Dodatkowo, wdrożenie nawigacji pomocniczej, takiej jak Breadcrumbs (menu okruszkowe), tworzy naturalną strukturę powiązań. Ułatwia to użytkownikowi orientację w serwisie, a robotom Google pomaga zrozumieć hierarchię i relacje między poszczególnymi poziomami strony, co bezpośrednio przekłada się na lepszą indeksację treści.
          </p>

          <h2 id="techniczna-doskonalosc" className="text-4xl text-white font-bold mt-16 mb-8 tracking-tight scroll-mt-32">Techniczna doskonałość i optymalizacja Crawl Budget</h2>
          <p>
            Za kulisami czystej nawigacji kryje się techniczna warstwa architektury, która decyduje o szybkości indeksowania i stabilności strony. Każdy adres URL musi być "przyjazny" – krótki, czytelny i pozbawiony zbędnych parametrów. To bezpośrednio wpływa na klikalność w wynikach wyszukiwania, ponieważ użytkownicy chętniej wybierają linki, które jasno komunikują zawartość strony. Równie istotna jest eliminacja tzw. kanibalizacji słów kluczowych. To błąd polegający na tym, że dwie podstrony walczą o tę samą frazę, przez co żadna nie może przebić się do czołówki wyników.
          </p>
          <p>
            Dbałość o techniczne detale, takie jak poprawna mapa witryny (sitemap.xml) oraz precyzyjne instrukcje w pliku robots.txt, pozwala zarządzać tym, gdzie roboty wyszukiwarek powinny zaglądać najczęściej. Chroni to budżet indeksowania i skupia uwagę algorytmów na tych elementach strony, które mają największe znaczenie dla wzrostu sprzedaży i budowania wizerunku eksperta w danej branży.
          </p>

          <h2 className="text-4xl text-white font-bold mt-16 mb-8 tracking-tight">Skalowalność i odporność na zmiany rynkowe</h2>
          <p>
            Ostatnim filarem profesjonalnej architektury jest jej przyszłościowość. Biznes, który się nie rozwija, stoi w miejscu, dlatego struktura musi być gotowa na skalowanie. Niezależnie od tego, czy oferta powiększy się o kilka nowych usług, czy o tysiące produktów, system musi to udźwignąć bez konieczności kosztownej przebudowy całości. Modularne podejście pozwala na dopisywanie nowych gałęzi do istniejącego drzewa kategorii w sposób naturalny. Zapobiega to powstawaniu chaosu i pozwala zachować raz wypracowane pozycje w Google przez lata, niezależnie od rozbudowy serwisu.
          </p>
          <p>
            Inwestycja w architekturę to inwestycja w najwyższą możliwą wydajność marketingu cyfrowego. To system, który pracuje na sukces przez całą dobę, prowadząc klientów za rękę od pierwszego kontaktu z marką, aż do momentu finalizacji transakcji.
          </p>
        </>
      ) : (
        <>
          <p className="text-xl text-white leading-relaxed">
            Website architecture is a strategic foundation on which all success on the web rests. It is much more than just a menu layout or button placement. It is a precisely designed system of connected vessels that has one goal: to make the user reach the goal effortlessly, and for Google robots to recognize the site as an unquestionable authority in the industry. Building a site without a well-thought-out architecture is like putting up a skyscraper without construction plans – you can invest in the most expensive finishing materials and aggressive advertising, but the building will still collapse under the weight of chaos and technical errors that will prevent its natural growth in search engines.
          </p>
          <p>
            The true value of a well-designed structure reveals itself the moment we stop perceiving the site as a static business card and start treating it as an engineering mechanism for generating profit. Every subpage, every link, and every URL must have its justification – both for the human and for the algorithm.
          </p>

          <h2 id="strategiczne-planowanie" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Strategic planning and the psychology of navigation</h2>
          <p>
            It all starts with mapping user intent. Before the first site skeleton is created, it is key to understand how customers look for information and what problems they want to solve. Architecture must be a mirror reflection of this process. The home page serves as a central communication hub from which the main arteries branch out – key categories of services or products. This is where the three-click rule applies. It is an absolute performance standard: if reaching the final goal takes the user more than three steps, the chance of conversion drops drastically.
          </p>
          <p id="plaska-struktura">
            A flat site structure is not just a convenience for a human, it is primarily the key to effective SEO. Google has a so-called Crawl Budget, which is a limited time for scanning the site. If the layout is confusing and too deep, robots waste resources on wandering through insignificant tabs instead of indexing the most important offers. A well-designed system "pushes" ranking power from the home page (usually the strongest) straight to specific products and services that are meant to realistically earn.
          </p>

          <h2 id="siloing" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Siloing, or building solid topical authority</h2>
          <p>
            One of the most advanced elements of architecture is the thematic grouping of content, known as Siloing. In the era of algorithms based on artificial intelligence, Google no longer looks only at individual keywords but evaluates so-called Topical Authority – that is, how comprehensively the site exhausts a given topic.
          </p>
          <p>
            Imagine a site as a library divided into clear sections. If there is a section about e-commerce systems, then all articles about payments, logistics, and shopping carts should form a coherent block that links within itself. Thanks to this, the search engine gets a clear signal: "This service is a complete source of knowledge about electronic commerce." Avoiding mixing threads from different "silos" prevents the dilution of domain authority and allows for much faster building of positions on difficult, high-margin phrases that the competition cannot jump over without order in the structure.
          </p>

          <h2 id="linkowanie-wewnetrzne" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Internal linking as an SEO power management system</h2>
          <p>
            If architecture is the skeleton of the site, then internal linking is its circulatory system. Every link on the site is a channel through which ranking "power" flows. In an intelligently designed system, links are not accidental. Contextual links are used within descriptions and articles to indicate to Google which subpages are a priority from a business perspective.
          </p>
          <p>
            The key here is the optimization of anchor texts, i.e., the words under which the link is hidden. Instead of useless phrases like "click here", specific descriptive phrases are used that build the semantic map of the site. Additionally, the implementation of auxiliary navigation, such as Breadcrumbs, creates a natural structure of connections. This facilitates the user's orientation in the service, and helps Google robots understand the hierarchy and relationships between individual levels of the site, which directly translates into better content indexing.
          </p>

          <h2 id="techniczna-doskonalosc" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Technical excellence and Crawl Budget optimization</h2>
          <p>
            Behind the scenes of clean navigation lies the technical layer of architecture, which decides the speed of indexing and site stability. Every URL must be "friendly" – short, readable, and devoid of unnecessary parameters. This directly affects click-through rates in search results, as users are more likely to choose links that clearly communicate the site's content. Equally important is the elimination of so-called keyword cannibalization. This is an error where two subpages fight for the same phrase, so neither can break through to the top results.
          </p>
          <p>
            Attention to technical details, such as a correct sitemap (sitemap.xml) and precise instructions in the robots.txt file, allows managing where search engine robots should look most often. This protects the indexing budget and focuses the attention of algorithms on those elements of the site that are most important for sales growth and building an expert image in a given industry.
          </p>

          <h2 className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight">Scalability and resilience to market changes</h2>
          <p>
            The last pillar of professional architecture is its future-proofing. A business that does not develop stands still, so the structure must be ready for scaling. Regardless of whether the offer expands by a few new services or thousands of products, the system must handle it without the need for costly reconstruction of the whole. A modular approach allows for adding new branches to the existing category tree in a natural way. This prevents chaos and allows maintaining once-developed positions in Google for years, regardless of the expansion of the service.
          </p>
          <p>
            Investment in architecture is an investment in the highest possible efficiency of digital marketing. It is a system that works for success around the clock, leading customers by the hand from the first contact with the brand until the finalization of the transaction.
          </p>
        </>
      )
    },
    'google-meta-ads': {
      title: lang === 'PL' ? "Google Ads czy Meta Ads? Kompletny przewodnik po reklamach, które zarabiają" : "Google Ads or Meta Ads? A complete guide to ads that make money",
      category: lang === 'PL' ? "PORADNIK" : "GUIDE",
      author: "Solid Agency",
      date: "25.03.2026",
      updateDate: "25.03.2026",
      coverImage: "https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-ads.png?raw=true",
      toc: lang === 'PL' ? [
        { title: "Google Ads: Intencja", id: "google-ads" },
        { title: "Meta Ads: Pożądanie", id: "meta-ads" },
        { title: "Koszty i mierzalność", id: "koszty" },
        { title: "Strategia Retargetingu", id: "retargeting" },
        { title: "Od czego zacząć?", id: "podsumowanie" }
      ] : [
        { title: "Google Ads: Intention", id: "google-ads" },
        { title: "Meta Ads: Desire", id: "meta-ads" },
        { title: "Costs and measurability", id: "koszty" },
        { title: "Retargeting strategy", id: "retargeting" },
        { title: "Where to start?", id: "podsumowanie" }
      ],
      content: lang === 'PL' ? (
        <>
          <p className="text-xl text-white leading-relaxed">
            Większość osób myśli, że reklama w internecie to po prostu „płacenie za to, żeby nas widzieli”. W rzeczywistości to precyzyjna maszyna do kupowania uwagi konkretnych ludzi. Wybór między Google a Metą (czyli Facebookiem i Instagramem) to nie jest kwestia tego, co jest „modne”. To decyzja o tym, czy chcesz odpowiedzieć na gotową potrzebę klienta, czy tę potrzebę dopiero w nim obudzić.
          </p>
          <p>
            Jeśli chcesz przestać zgadywać i zacząć zarabiać na reklamach, musisz zrozumieć, jak te dwa systemy działają od środka.
          </p>

          <h2 id="google-ads" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Google Ads: Odpowiedź na konkretny problem</h2>
          <p>
            Google Ads (czyli reklamy w wyszukiwarce) to system oparty na intencji. Wyobraź sobie, że Google to wielka książka telefoniczna, do której ludzie zaglądają tylko wtedy, gdy czegoś potrzebują.
          </p>
          <p>
            Jak to działa w praktyce? Ktoś wpisuje w Google hasło: „ubezpieczenie samochodu online”. W tym ułamku sekundy system wie, że ten człowiek ma problem i szuka rozwiązania. Twoja reklama pojawia się na samej górze jako gotowa odpowiedź.
          </p>
          <p>
            Dlaczego to jest skuteczne? Nie musisz nikogo przekonywać do zakupu. Ten człowiek już chce kupić – on tylko wybiera, u kogo to zrobi. Płacisz za kliknięcie, czyli za to, że ktoś realnie wszedł na Twoją stronę, bo Twoja propozycja go zainteresowała.
          </p>
          <p>
            Dla kogo to rozwiązanie? Google Ads to strzał w dziesiątkę dla każdego, czyje usługi lub produkty są aktywnie wyszukiwane. Jeśli ludzie wpisują nazwy Twoich produktów w wyszukiwarkę, powinieneś tam być. To najkrótsza droga od zapytania do pieniędzy na koncie.
          </p>

          <h2 id="meta-ads" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Meta Ads: Budowanie pożądania i zainteresowania</h2>
          <p>
            Meta Ads (Facebook i Instagram) działają zupełnie inaczej. Tutaj nikt niczego nie wpisuje w wyszukiwarkę. Ludzie wchodzą na Facebooka, żeby odpocząć, zobaczyć co u znajomych albo po prostu „poscrollować” telefon w wolnej chwili. Twoja reklama pojawia się między zdjęciami znajomych.
          </p>
          <p>
            Jak to działa w praktyce? Meta wie o nas niemal wszystko: ile mamy lat, gdzie mieszkamy, co lubimy, a nawet czy planujemy remont albo ślub. Reklama wyświetla się osobie, która pasuje do Twojego profilu idealnego klienta, mimo że w tej chwili wcale o Tobie nie myśli.
          </p>
          <p>
            Dlaczego to jest skuteczne? Możesz dotrzeć do ludzi, którzy jeszcze nie wiedzą, że istniejesz, ale Twoja oferta idealnie pasuje do ich stylu życia. To tutaj buduje się rozpoznawalność i markę. Jeśli Twój produkt świetnie wygląda na zdjęciach albo rozwiązuje problem, o którym ludzie rzadko myślą (dopóki go nie zobaczą), Meta będzie Twoim najlepszym handlowcem.
          </p>
          <p>
            Dla kogo to rozwiązanie? Dla marek, które chcą być znane, sprzedają produkty „estetyczne” lub oferują coś zupełnie nowego, czego ludzie jeszcze nie potrafią nazwać i wyszukać w Google.
          </p>

          <h2 id="koszty" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Koszty i mierzalność: Gdzie płacisz mniej?</h2>
          <p>
            W Google Ads płacisz za konkretną potrzebę. Często koszt jednego kliknięcia jest wyższy, bo ten człowiek jest już „jedną nogą” w Twoim sklepie. W Meta Ads płacisz zazwyczaj za wyświetlenia. Kliknięcia są tu zazwyczaj tańsze, ale klient potrzebuje więcej czasu, żeby Ci zaufać i dokonać zakupu.
          </p>
          <p>
            Najważniejsze jest to, że oba systemy są w 100% mierzalne. Jeśli wydasz 100 zł, musisz wiedzieć, ile osób dzięki temu kupiło produkt. Bez odpowiedniego ustawienia analityki (specjalnych kodów śledzących na stronie), każda reklama to loteria.
          </p>

          <h2 id="retargeting" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Strategia idealna: Łączenie sił (Retargeting)</h2>
          <p>
            Największy błąd to wybieranie tylko jednej drogi. Najskuteczniejsze systemy działają tak:
          </p>
          <ul className="list-disc pl-6 space-y-4">
            <li>Google Ads ściąga na stronę kogoś, kto szukał konkretu.</li>
            <li>Ten ktoś ogląda stronę, ale nie kupuje (bo np. tramwaj przyjechał i musiał schować telefon).</li>
            <li>Wieczorem ta sama osoba wchodzi na Instagrama i widzi Twoją reklamę z dopiskiem: „Hej, widzieliśmy, że oglądałeś nasze produkty. Mamy dla Ciebie darmową dostawę!”.</li>
          </ul>
          <p>
            To się nazywa Retargeting. To najtańszy sposób na „domykanie” sprzedaży, bo kierujesz reklamę do kogoś, kto już Cię zna.
          </p>

          <h2 id="podsumowanie" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Podsumowanie: Od czego zacząć?</h2>
          <p>
            Jeśli Twój biznes rozwiązuje nagłe problemy lub oferuje produkty, o których ludzie wiedzą – zacznij od Google Ads. Jeśli Twój biznes opiera się na emocjach, wyglądzie i budowaniu świadomości – wybierz Meta Ads.
          </p>
          <p>
            Pamiętaj jednak o najważniejszym: reklama to tylko paliwo. Jeśli Twoja strona internetowa jest wolna, nieczytelna lub źle poukładana, to nawet najlepsza kampania na świecie będzie tylko przepalaniem budżetu. Systemy reklamowe działają najlepiej wtedy, gdy prowadzą klienta na profesjonalnie przygotowany grunt.
          </p>
        </>
      ) : (
        <>
          <p className="text-xl text-white leading-relaxed">
            Most people think that online advertising is simply "paying to be seen." In reality, it is a precision machine for buying the attention of specific people. The choice between Google and Meta (i.e., Facebook and Instagram) is not a matter of what is "trendy." It is a decision about whether you want to respond to a ready-made customer need or wake that need up in them.
          </p>
          <p>
            If you want to stop guessing and start making money on ads, you must understand how these two systems work from the inside.
          </p>

          <h2 id="google-ads" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Google Ads: Answer to a specific problem</h2>
          <p>
            Google Ads (i.e., search ads) is an intent-based system. Imagine that Google is a huge phone book that people look into only when they need something.
          </p>
          <p>
            How does it work in practice? Someone types into Google the phrase: "car insurance online." In that fraction of a second, the system knows that this person has a problem and is looking for a solution. Your ad appears at the very top as a ready answer.
          </p>
          <p>
            Why is it effective? You don't have to convince anyone to buy. This person already wants to buy – they are only choosing who to do it with. You pay for the click, i.e., for someone actually entering your site because your proposal interested them.
          </p>
          <p>
            Who is this solution for? Google Ads is a bullseye for anyone whose services or products are actively searched for. If people type the names of your products into the search engine, you should be there. It's the shortest path from a query to money in the account.
          </p>

          <h2 id="meta-ads" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Meta Ads: Building desire and interest</h2>
          <p>
            Meta Ads (Facebook and Instagram) work completely differently. Here, no one types anything into a search engine. People go on Facebook to rest, see what's up with friends, or just "scroll" the phone in their free time. Your ad appears between photos of friends.
          </p>
          <p>
            How does it work in practice? Meta knows almost everything about us: how old we are, where we live, what we like, and even if we plan a renovation or a wedding. The ad is displayed to a person who fits your ideal customer profile, even though they are not thinking about you at all at the moment.
          </p>
          <p>
            Why is it effective? You can reach people who don't know you exist yet, but your offer perfectly fits their lifestyle. This is where recognition and brand are built. If your product looks great in photos or solves a problem people rarely think about (until they see it), Meta will be your best salesperson.
          </p>
          <p>
            Who is this solution for? For brands that want to be known, sell "aesthetic" products, or offer something completely new that people don't yet know how to name and search for in Google.
          </p>

          <h2 id="koszty" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Costs and measurability: Where do you pay less?</h2>
          <p>
            In Google Ads, you pay for a specific need. Often the cost of one click is higher because this person is already "one foot" in your store. In Meta Ads, you usually pay for impressions. Clicks are usually cheaper here, but the customer needs more time to trust you and make a purchase.
          </p>
          <p>
            The most important thing is that both systems are 100% measurable. If you spend 100 PLN, you must know how many people bought the product as a result. Without proper analytics setup (special tracking codes on the site), every ad is a lottery.
          </p>

          <h2 id="retargeting" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Ideal strategy: Joining forces (Retargeting)</h2>
          <p>
            The biggest mistake is choosing only one path. The most effective systems work like this:
          </p>
          <ul className="list-disc pl-6 space-y-4">
            <li>Google Ads brings someone looking for a specific thing to the site.</li>
            <li>That person looks at the site but doesn't buy (e.g., because the tram arrived and they had to put the phone away).</li>
            <li>In the evening, the same person goes on Instagram and sees your ad with the note: "Hey, we saw you were looking at our products. We have free delivery for you!".</li>
          </ul>
          <p>
            This is called Retargeting. It's the cheapest way to "close" a sale because you direct the ad to someone who already knows you.
          </p>

          <h2 id="podsumowanie" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Summary: Where to start?</h2>
          <p>
            If your business solves sudden problems or offers products people know about – start with Google Ads. If your business is based on emotions, appearance, and building awareness – choose Meta Ads.
          </p>
          <p>
            But remember the most important thing: advertising is just fuel. If your website is slow, unreadable, or poorly organized, even the best campaign in the world will just be burning budget. Advertising systems work best when they lead the customer to professionally prepared ground.
          </p>
        </>
      )
    },
    'rebranding': {
      title: lang === 'PL' ? "Rebranding strony: Kiedy odświeżenie to za mało, by wygrywać?" : "Website rebranding: When refreshing is not enough to win?",
      category: lang === 'PL' ? "PORADNIK" : "GUIDE",
      author: "Solid Agency",
      date: "01.04.2026",
      updateDate: "01.04.2026",
      coverImage: "https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/informacje-rebranding.png",
      toc: lang === 'PL' ? [
        { title: "Lifting vs Rebranding", id: "lifting-vs-rebranding" },
        { title: "Kiedy budować nową markę?", id: "kiedy-budowac" },
        { title: "Narzędzie sprzedażowe", id: "narzedzie-sprzedazowe" },
        { title: "Rebranding a SEO", id: "rebranding-seo" },
        { title: "Skalowalność marki", id: "skalowalnosc" }
      ] : [
        { title: "Lifting vs Rebranding", id: "lifting-vs-rebranding" },
        { title: "When to build a new brand?", id: "kiedy-budowac" },
        { title: "Sales tool", id: "narzedzie-sprzedazowe" },
        { title: "Rebranding and SEO", id: "rebranding-seo" },
        { title: "Brand scalability", id: "skalowalnosc" }
      ],
      content: lang === 'PL' ? (
        <>
          <p className="text-xl text-white leading-relaxed">
            W świecie cyfrowym, który pędzi do przodu, Twoja strona internetowa starzeje się szybciej niż jakikolwiek inny element biznesu. Wielu właścicieli firm popełnia ten sam błąd: myślą, że rebranding to tylko zmiana logotypu, wybór modniejszych kolorów i wrzucenie kilku nowych zdjęć z banku twarzy. To błąd, który kosztuje tysiące złotych utraconych korzyści. Prawdziwy rebranding to nie pudrowanie rzeczywistości – to głęboka, strategiczna operacja na wizerunku i technologii, która ma jeden cel: sprawić, by Twoja firma była postrzegana jako lider, a nie jako relikt przeszłości.
          </p>
          <p>
            Jeśli Twoja strona przestała sprzedawać, mimo że ruch na niej wciąż jest duży, to znak, że fundamenty Twojej komunikacji spróchniały. Samo odświeżenie grafiki będzie jak pomalowanie zardzewiałego mostu – przez chwilę będzie ładnie, ale konstrukcja i tak nie udźwignie ciężaru nowoczesnego marketingu.
          </p>

          <h2 id="lifting-vs-rebranding" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Lifting vs Rebranding: Gdzie kończy się estetyka, a zaczyna strategia?</h2>
          <p>
            Musisz zrozumieć różnicę między kosmetyką a rewolucją. Lifting to działanie powierzchowne. Zmieniasz czcionki na nowocześniejsze, dodajesz lepsze ikony, odświeżasz baner główny. To rozwiązanie "ratunkowe", gdy Twoja marka jest silna, rozpoznawalna i wciąż trafia do właściwych ludzi, a jedynie wizualnie trąci myszką.
          </p>
          <p>
            Rebranding to proces znacznie głębszy. To moment, w którym zmieniasz DNA swojej obecności w sieci. Robimy go wtedy, gdy stara marka przestała pasować do tego, kim jesteś dzisiaj. Być może kiedyś sprzedawałeś tanio dla wszystkich, a dziś oferujesz usługi premium dla wybranych? Twoja stara strona, krzycząca o "niskich cenach", będzie teraz Twoim największym wrogiem, odstraszając klientów, którzy szukają jakości, a nie okazji. Rebranding to budowa nowego autorytetu od zera.
          </p>

          <h2 id="kiedy-budowac" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Kiedy powinieneś przestać łatać starą stronę i zbudować nową markę?</h2>
          <p>
            Istnieje kilka krytycznych momentów, w których "odświeżenie" po prostu nie zadziała:
          </p>
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Niska konwersja (Efekt "dziurawego wiadra"):</strong> Masz wejścia, inwestujesz w reklamy, ale nikt nie dzwoni. To oznacza, że Twój przekaz jest niejasny, oferta mało wiarygodna, a strona nie budzi zaufania. Żadna nowa grafika nie naprawi braku logiki w sprzedaży.</li>
            <li><strong>Ucieczka do konkurencji:</strong> Widzisz, że klienci wybierają firmy, które obiektywnie są słabsze od Ciebie, ale mają "pancerny", nowoczesny wizerunek. Ludzie kupują oczami i emocjami – jeśli Twoja strona wygląda na tanią, myślą, że Twoja usługa też taka jest.</li>
            <li><strong>Zmiana modelu biznesowego:</strong> Jeśli wprowadziłeś nowe usługi, wszedłeś na nowe rynki lub Twoja oferta stała się bardziej skomplikowana, stara struktura strony stanie się ciasna. Próba upchnięcia nowych treści w stare ramki stworzy chaos, w którym nikt się nie połapie.</li>
            <li><strong>Technologiczna ściana:</strong> Stara strona ładuje się wieki, nie działa poprawnie na smartfonach, a każda zmiana w tekście wymaga interwencji programisty. Tu rebranding wizualny łączy się z koniecznością wdrożenia nowego, wydajnego silnika.</li>
          </ul>

          <h2 id="narzedzie-sprzedazowe" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Rebranding jako Twoje najsilniejsze narzędzie sprzedażowe</h2>
          <p>
            Dobrze przeprowadzony rebranding to nowa obietnica, którą składasz rynkowi. W tym procesie wycinamy wszystko, co zbędne. Usuwamy nudne teksty "o nas" i zastępujemy je konkretnym językiem korzyści. Budujemy nową hierarchię informacji, która prowadzi klienta za rękę: od problemu, przez Twoje unikalne rozwiązanie, aż po dowody Twojej skuteczności (opinie, realizacje).
          </p>
          <p>
            To także szansa na zdefiniowanie Twojego Unique Value Proposition (UVP) – czyli tej jednej rzeczy, która sprawia, że konkurencja przestaje istnieć. Rebranding pozwala wyjść z cienia i pokazać światu: "Jesteśmy ekspertami, wiemy co robimy i warto nam zapłacić więcej".
          </p>

          <h2 id="rebranding-seo" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Operacja na żywym organizmie: Rebranding a SEO</h2>
          <p>
            Największą obawą przy rebrandingu jest utrata wypracowanych pozycji w Google. I słusznie – amatorska zmiana strony może zabić widoczność witryny z dnia na dzień. Profesjonalny proces rebrandingu to precyzyjna inżynieria. Musimy zadbać o to, by każda stara podstrona miała swój odpowiednik w nowym systemie (przekierowania 301), by teksty były zoptymalizowane pod słowa kluczowe, ale jednocześnie brzmiały ludzko, oraz by nowa struktura była czytelna dla robotów Google. Bez tej opieki technicznej, nowa, piękna strona będzie jak luksusowy sklep postawiony na środku pustyni – nikt go nie znajdzie.
          </p>

          <h2 id="skalowalnosc" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Skalowalność: Budowa marki, która nie ma sufitu</h2>
          <p>
            Rebranding to inwestycja w przyszłość. Projektujemy systemy tak, aby rosły razem z Twoim sukcesem. Dobra marka jest elastyczna – pozwala na dodawanie kolejnych usług, produktów i oddziałów bez psucia ogólnego wrażenia profesjonalizmu. To sygnał dla rynku, że Twoja firma gra teraz w wyższej lidze. Pozwala to na podniesienie cen bez strachu o utratę klientów, bo nowa jakość wizerunku uzasadnia wyższą marżę.
          </p>
          <p>
            Jeśli czujesz, że Twoja obecna strona internetowa to labirynt, którego wstydzisz się pokazać ważnemu kontrahentowi, to znaczy, że czas na zmiany minął dawno temu. Nie czekaj, aż konkurencja całkowicie odjedzie. Postaw na system, który udźwignie Twój biznes i zamieni przypadkowych odwiedzających w lojalnych partnerów.
          </p>
        </>
      ) : (
        <>
          <p className="text-xl text-white leading-relaxed">
            In the digital world, which is racing forward, your website ages faster than any other element of your business. Many business owners make the same mistake: they think rebranding is just changing the logo, choosing trendier colors, and throwing in a few new photos from a stock library. This is a mistake that costs thousands of dollars in lost benefits. Real rebranding is not sugarcoating reality – it is a deep, strategic operation on image and technology that has one goal: to make your company perceived as a leader, not as a relic of the past.
          </p>
          <p>
            If your site has stopped selling, even though traffic on it is still high, it's a sign that the foundations of your communication have rotted. Just refreshing the graphics will be like painting a rusty bridge – it will be pretty for a moment, but the construction still won't carry the weight of modern marketing.
          </p>

          <h2 id="lifting-vs-rebranding" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Lifting vs Rebranding: Where does aesthetics end and strategy begin?</h2>
          <p>
            You must understand the difference between cosmetics and revolution. Lifting is a superficial action. You change fonts to more modern ones, add better icons, refresh the main banner. This is a "rescue" solution when your brand is strong, recognizable, and still reaches the right people, and only looks a bit dated visually.
          </p>
          <p>
            Rebranding is a much deeper process. It's the moment you change the DNA of your online presence. We do it when the old brand has stopped fitting who you are today. Perhaps you once sold cheap for everyone, and today you offer premium services for the few? Your old site, screaming about "low prices", will now be your biggest enemy, deterring customers who are looking for quality, not a bargain. Rebranding is building a new authority from scratch.
          </p>

          <h2 id="kiedy-budowac" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">When should you stop patching the old site and build a new brand?</h2>
          <p>
            There are several critical moments when "refreshing" simply won't work:
          </p>
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Low conversion (The "leaky bucket" effect):</strong> You have entries, you invest in ads, but no one calls. This means your message is unclear, the offer is not very credible, and the site does not inspire trust. No new graphics will fix the lack of logic in sales.</li>
            <li><strong>Escape to competition:</strong> You see that customers choose companies that are objectively weaker than you but have a "solid", modern image. People buy with their eyes and emotions – if your site looks cheap, they think your service is too.</li>
            <li><strong>Change in business model:</strong> If you've introduced new services, entered new markets, or your offer has become more complicated, the old site structure will become tight. Trying to stuff new content into old frames will create chaos that no one will figure out.</li>
            <li><strong>Technological wall:</strong> The old site takes ages to load, doesn't work correctly on smartphones, and every change in text requires programmer intervention. Here, visual rebranding combines with the need to implement a new, efficient engine.</li>
          </ul>

          <h2 id="narzedzie-sprzedazowe" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Rebranding as your strongest sales tool</h2>
          <p>
            A well-conducted rebranding is a new promise you make to the market. In this process, we cut out everything unnecessary. We remove boring "about us" texts and replace them with a specific language of benefits. We build a new information hierarchy that leads the customer by the hand: from the problem, through your unique solution, to proof of your effectiveness (reviews, implementations).
          </p>
          <p>
            It's also a chance to define your Unique Value Proposition (UVP) – that one thing that makes the competition cease to exist. Rebranding allows you to step out of the shadows and show the world: "We are experts, we know what we do, and it's worth paying us more."
          </p>

          <h2 id="rebranding-seo" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Operation on a living organism: Rebranding and SEO</h2>
          <p>
            The biggest fear with rebranding is losing developed positions in Google. And rightly so – an amateur site change can kill site visibility overnight. A professional rebranding process is precision engineering. We must ensure that every old subpage has its equivalent in the new system (301 redirects), that texts are optimized for keywords but at the same time sound human, and that the new structure is readable for Google robots. Without this technical care, a new, beautiful site will be like a luxury store placed in the middle of a desert – no one will find it.
          </p>

          <h2 id="skalowalnosc" className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight scroll-mt-32">Scalability: Building a brand that has no ceiling</h2>
          <p>
            Rebranding is an investment in the future. We design systems to grow with your success. A good brand is flexible – it allows for adding more services, products, and branches without spoiling the overall impression of professionalism. It's a signal to the market that your company is now playing in a higher league. This allows for raising prices without fear of losing customers, because the new quality of image justifies a higher margin.
          </p>
          <p>
            If you feel that your current website is a labyrinth you're ashamed to show to an important contractor, it means the time for change passed long ago. Don't wait for the competition to completely pull away. Bet on a system that will carry your business and turn random visitors into loyal partners.
          </p>
        </>
      )
    }
  };

  const article = articles[articleId] || articles['ux-design'];

  return (
    <div className="min-h-screen bg-black text-white pt-32">
      <div className="hero-insights__inner max-w-[100rem] mx-auto" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '4.8125rem',
        paddingInline: '1.875rem'
      }}>
        <div className="bg-[#c8b6ff] text-black text-xs font-bold tracking-widest uppercase px-6 py-2 rounded-full mb-8">
          {article.category}
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 mb-12 font-inter-tight">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
              <img loading="lazy" src="https://github.com/kidiee558/solidagencytestowo/blob/main/logosolidagency.webp?raw=true" alt="Solid Agency Logo" className="w-full h-full object-contain"  width="600" height="200" />
            </div>
            <span><strong className="text-white">{lang === 'PL' ? 'Autorzy:' : 'Authors:'}</strong> {article.author}</span>
          </div>
          <span><strong className="text-white">{lang === 'PL' ? 'Data publikacji:' : 'Published:'}</strong> {article.date}</span>
          <span><strong className="text-white">{lang === 'PL' ? 'Ostatnia aktualizacja:' : 'Last updated:'}</strong> {article.updateDate}</span>
        </div>

        <h1 className="text-[clamp(4rem,12vw,14rem)] leading-[0.8] font-humane text-center uppercase tracking-[0.005em] font-[900] mb-16 max-w-[95%]">
          {article.title}
        </h1>

        <div className="w-full max-w-4xl flex justify-center items-center">
          <img loading="lazy" 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-auto max-h-[55vh] object-contain rounded-3xl"
           width="1920" height="1080" />
        </div>
      </div>

      <div className="article-content max-w-[100rem] mx-auto lg:grid lg:grid-cols-[1fr_0.5fr] flex flex-col" style={{
        gap: '6.625rem',
        paddingBottom: '1.25rem',
        paddingInline: '1.875rem'
      }}>
        <div className="article-body font-inter-tight text-lg text-gray-300 space-y-8">
          {article.content}
        </div>

        <div className="details lg:sticky lg:top-32 h-fit flex flex-col gap-6">
          <div className="border border-white/20 rounded-[20px] p-8 bg-black">
            <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">{lang === 'PL' ? 'Spis treści' : 'Table of contents'}</h3>
            <ul className="space-y-4 text-gray-400">
              {article.toc.map((item: { title: string, id: string }, i: number) => (
                <li key={i}>
                  <button 
                    onClick={() => {
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="hover:text-white cursor-pointer transition-colors text-left"
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="info-block" style={{
            background: '#fff',
            color: '#000',
            padding: '2.5rem',
            borderRadius: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: 'auto',
            gap: '2rem'
          }}>
            <div className="w-16 h-16">
              <img loading="lazy" 
                src="https://github.com/kidiee558/solidagencytestowo/blob/main/logosolidagency.webp?raw=true" 
                alt="Solid Agency Logo" 
                className="w-full h-full object-contain brightness-0" 
                referrerPolicy="no-referrer"
               width="600" height="200" />
            </div>
            <h3 className="text-4xl font-inter-tight tracking-tight leading-tight">
              {lang === 'PL' ? 'Zamieńmy Twoje pomysły w rezultaty.' : 'Let\'s turn your ideas into results.'}
            </h3>
            <button 
              onClick={onContactClick}
              className="bg-[#c8b6ff] text-black px-8 py-4 rounded-full font-bold w-full hover:bg-[#b8a1ff] transition-colors"
            >
              {lang === 'PL' ? 'Skontaktuj się z nami' : 'Contact us'}
            </button>
          </div>
        </div>
      </div>

      <RelatedPosts currentArticleId={articleId} onArticleClick={onArticleClick || (() => {})} />
      <DarkContactSection onContactClick={onContactClick} onAskAwayClick={onAskAwayClick} onStartProjectClick={onStartProjectClick} />
    </div>
  );
}


/* --- From ContactPage.tsx --- */

const ContactPage = ({ onStartProjectClick, onAskAwayClick }: { onStartProjectClick: () => void, onAskAwayClick: () => void }) => {
  const { lang, t } = useLanguage();
  const text = lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US ";
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-between p-6 relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video preload="none" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/t%C5%82o.mp4"
        poster="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/HomepageZdjecieWTle.webp" />
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


/* --- From EcommerceOfferPage.tsx --- */

const getEcommerceProjectsData = (lang: 'PL' | 'ENG') => {
  const base = getProjectsData(lang);
  const overrides = lang === 'PL' ? [
    { 
      title: 'Prosty Sklep & Landing Page', 
      description: 'Rozwiązanie dla marek, które chcą sprzedawać konkretne produkty bez rozbudowanej struktury. Składa się z przejrzystego układu, który eliminuje zbędne podstrony i skomplikowane menu. Całość oparta jest na lekkiej technologii, dzięki czemu strona ładuje się natychmiast nawet na słabych łączach. To narzędzie nastawione na maksymalną estetykę i szybką finalizację zamówienia przez klienta.', 
      deliveryTime: 'Czas realizacji do 7 dni',
      points: [
        'Czysty układ treści',
        'Brak zbędnych kroków',
        'Idealne dopasowanie mobilne'
      ]
    },
    { 
      title: 'Profesjonalny sklep internetowy', 
      description: 'Solidna platforma przygotowana do obsługi dużego asortymentu i tysięcy transakcji jednocześnie. Zawiera pełne integracje z płatnościami online, kurierami oraz systemami fakturującymi, którymi zarządzasz z jednego panelu. System projektujemy tak, aby wytrzymał nagłe skoki ruchu, zachowując stabilność i bezpieczeństwo danych. To kompletne zaplecze do codziennej sprzedaży i rozwoju Twojej marki.', 
      deliveryTime: 'Czas realizacji do 14 dni',
      points: [
        'Płynna obsługa zamówień',
        'Pełna automatyzacja płatności i wysyłek',
        'Szybki czas reakcji systemu'
      ]
    },
    { 
      title: 'Sklepy Premium & B2B', 
      description: 'System automatyzujący sprzedaż hurtową i obsługę kontrahentów biznesowych. Platforma automatycznie zarządza różnymi warunkami handlowymi, wyświetlając partnerom ich indywidualne ceny i rabaty od razu po zalogowaniu. Dzięki synchronizacji stanów magazynowych w czasie rzeczywistym, nie musisz ręcznie sprawdzać dostępności towarów ani wysyłać ofert w plikach. To narzędzie do zarządzania dużą skalą sprzedaży i logistyki.', 
      deliveryTime: 'Czas realizacji do 30 dni',
      points: [
        'Segmentacja warunków zakupu',
        'Zautomatyzowane stany magazynowe',
        'Szybkie formularze zbiorcze'
      ],
      buttonText: { PL: 'Omów wdrożenie', ENG: 'Discuss implementation' }
    },
    { 
      title: 'Dedykowany system E-Commerce', 
      description: 'Technologia budowana od podstaw dla projektów, które wymagają unikalnej logiki, nieobecnej w gotowych szablonach. Jeśli Twój model biznesowy potrzebuje niestandardowych funkcji lub specyficznej prezentacji produktu, tworzymy architekturę dopasowaną pod Twoje procesy. Otrzymujesz bezpieczny, niezależny system z możliwością dowolnej rozbudowy. To inwestycja w rozwiązanie, które nie stawia żadnych barier przy skalowaniu biznesu.', 
      deliveryTime: 'Czas realizacji ustalany indywidualnie',
      points: [
        'Funkcje na specjalne zamówienie',
        'Brak technicznych ograniczeń',
        'Maksymalne standardy ochrony'
      ],
      buttonText: { PL: 'Omów wdrożenie', ENG: 'Discuss implementation' }
    }
  ] : [
    { 
      title: 'Simple Store & Landing Page', 
      description: 'A solution for brands that want to sell specific products without an extensive structure. It consists of a clear layout that eliminates unnecessary subpages and complex menus. The whole is based on lightweight technology, thanks to which the page loads instantly even on weak connections. This is a tool focused on maximum aesthetics and quick finalization of the order by the customer.', 
      deliveryTime: 'Delivery up to 7 days',
      points: [
        'Clean content layout',
        'No unnecessary steps',
        'Perfect mobile fit'
      ]
    },
    { 
      title: 'Professional online store', 
      description: 'A solid platform prepared to handle a large assortment and thousands of transactions simultaneously. It includes full integrations with online payments, couriers and invoicing systems, which you manage from one panel. We design the system so that it can withstand sudden traffic spikes, maintaining stability and data security. This is a complete back-end for daily sales and the development of your brand.', 
      deliveryTime: 'Delivery up to 14 days',
      points: [
        'Smooth order handling',
        'Full payment and shipping automation',
        'Fast system response time'
      ]
    },
    { 
      title: 'Premium & B2B Stores', 
      description: 'A system automating wholesale and business contractor service. The platform automatically manages different commercial conditions, displaying to partners their individual prices and discounts immediately after logging in. Thanks to real-time inventory synchronization, you do not have to manually check the availability of goods or send offers in files. This is a tool for managing large-scale sales and logistics.', 
      deliveryTime: 'Delivery up to 30 days',
      points: [
        'Purchase condition segmentation',
        'Automated inventory levels',
        'Fast bulk forms'
      ],
      buttonText: { PL: 'Omów wdrożenie', ENG: 'Discuss implementation' }
    },
    { 
      title: 'Dedicated E-Commerce system', 
      description: 'Technology built from scratch for projects that require unique logic, absent in ready-made templates. If your business model needs custom functions or specific product presentation, we create an architecture tailored to your processes. You receive a secure, independent system with the possibility of any expansion. This is an investment in a solution that does not pose any barriers when scaling the business.', 
      deliveryTime: 'Delivery time set individually',
      points: [
        'Custom-made features',
        'No technical limitations',
        'Maximum protection standards'
      ],
      buttonText: { PL: 'Omów wdrożenie', ENG: 'Discuss implementation' }
    }
  ];
  return base.map((p, i) => ({ ...p, ...overrides[i] }));
};

function EcommerceOfferPage({ onBack, onContactClick, onAskAwayClick, onStartProjectClick }: { onBack: () => void; onContactClick: () => void; onAskAwayClick: () => void; onStartProjectClick?: () => void }) {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const processStages = lang === 'PL' ? [
    {
      id: '01',
      title: 'Strategia Sprzedaży',
      paragraphs: [
        "Analizujemy Twój produkt i grupę docelową, aby stworzyć ścieżkę zakupową, która nie stawia oporu. Badamy konkurencję i trendy rynkowe.",
        "Efektem jest makieta sklepu zorientowana na maksymalizację współczynnika konwersji (CR) i średniej wartości koszyka (AOV).",
        "Planujemy integracje z płatnościami i logistyką już na starcie."
      ]
    },
    {
      id: '02',
      title: 'Design & UX',
      paragraphs: [
        "Projektujemy interfejs, który buduje zaufanie i ułatwia zakupy. Każdy przycisk i element nawigacji ma swoje miejsce wynikające z psychologii sprzedaży.",
        "Tworzymy unikalny wygląd, który wyróżnia Twój sklep na tle masowych szablonów.",
        "Dbamy o perfekcyjne wyświetlanie na urządzeniach mobilnych, gdzie odbywa się większość zakupów."
      ]
    },
    {
      id: '03',
      title: 'Wdrożenie Techniczne',
      paragraphs: [
        "Kodujemy sklep dbając o najwyższą wydajność i bezpieczeństwo. Integrujemy niezbędne narzędzia: bramki płatności, systemy wysyłkowe, fakturowanie.",
        "Konfigurujemy panel zarządzania tak, abyś mógł łatwo dodawać produkty i obsługiwać zamówienia bez pomocy programisty."
      ]
    },
    {
      id: '04',
      title: 'Optymalizacja & Start',
      paragraphs: [
        "Przeprowadzamy rygorystyczne testy całego procesu zakupowego. Pomagamy w konfiguracji domeny i hostingu.",
        "Po starcie monitorujemy zachowania użytkowników i wprowadzamy poprawki zwiększające sprzedaż.",
        "Zapewniamy wsparcie techniczne i doradztwo w skalowaniu Twojego e-commerce."
      ]
    }
  ] : [
    {
      id: '01',
      title: 'Sales Strategy',
      paragraphs: [
        "We analyze your product and target group to create a shopping path that offers no resistance. We research the competition and market trends.",
        "The result is a store mockup focused on maximizing the conversion rate (CR) and average order value (AOV).",
        "We plan integrations with payments and logistics right from the start."
      ]
    },
    {
      id: '02',
      title: 'Design & UX',
      paragraphs: [
        "We design an interface that builds trust and makes shopping easier. Every button and navigation element has its place resulting from the psychology of sales.",
        "We create a unique look that makes your store stand out from mass templates.",
        "We ensure perfect display on mobile devices, where most purchases take place."
      ]
    },
    {
      id: '03',
      title: 'Technical Implementation',
      paragraphs: [
        "We code the store ensuring the highest performance and security. We integrate necessary tools: payment gateways, shipping systems, invoicing.",
        "We configure the management panel so that you can easily add products and handle orders without a programmer's help."
      ]
    },
    {
      id: '04',
      title: 'Optimization & Launch',
      paragraphs: [
        "We conduct rigorous tests of the entire purchasing process. We help with domain and hosting configuration.",
        "After launch, we monitor user behavior and introduce improvements to increase sales.",
        "We provide technical support and advice in scaling your e-commerce."
      ]
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = lang === 'PL' ? [
    {
      question: "Ile kosztuje utrzymanie sklepu po jego uruchomieniu?",
      answer: "Koszt utrzymania zależy od skali Twojego biznesu i generowanego ruchu. Dla mniejszych sklepów są to kwoty rzędu kilkuset złotych rocznie, podczas gdy systemy Premium wymagają wydajniejszych serwerów dedykowanych. Kluczowe jest jednak to, że u nas nie płacisz żadnych prowizji od sprzedaży ani stałych opłat za samo korzystanie z platformy (SaaS)."
    },
    {
      question: "Czy otrzymam szkolenie z obsługi panelu?",
      answer: "Tak. Po wdrożeniu przeprowadzamy szkolenie, podczas którego nauczysz się dodawać produkty, zarządzać stanami magazynowymi i obsługiwać zamówienia. Otrzymasz system, który będziesz kontrolować samodzielnie, bez konieczności płacenia programiście za każdą zmianę ceny czy tekstu."
    },
    {
      question: "Czy sklep będzie poprawnie wyświetlał się na telefonach?",
      answer: "Standardem w naszych projects jest podejście Mobile-First. Projektujemy interfejs pod kątem użytkowników smartfonów, zapewniając błyskawiczne ładowanie i wygodną ścieżkę zakupu \"pod kciuk\", co bezpośrednio przekłada się na wyższą sprzedaż w Twoim sklepie."
    },
    {
      question: "Jakie metody płatności i dostawy mogę oferować?",
      answer: "Wdrażamy wszystkie kluczowe rozwiązania: szybkie płatności (BLIK, PayU, Przelewy24, Apple Pay) oraz pełną automatyzację logistyki (InPost, DPD, DHL). Klient płaci w sekundę, a Ty generujesz etykietę nadawczą jednym kliknięciem bezpośrednio w panelu administratora."
    },
    {
      question: "Czy sklep jest zoptymalizowany pod wyszukiwarkę Google?",
      answer: "Każdy projekt przechodzi audyt techniczny SEO. Optymalizujemy kod, szybkość ładowania i strukturę nagłówków. Twój sklep otrzymuje solidny fundament techniczny, dzięki któremu łatwiej i taniej będzie Ci budować widoczność w wynikach wyszukiwania."
    },
    {
      question: "Ile trwa budowa sklepu od momentu rozpoczęcia prac?",
      answer: "Prosty sklep (Landing Page) oddajemy do 7 dni roboczych. Bardziej rozbudowane systemy e-commerce wymagają od 10 do 21 dni. Dokładny termin otrzymasz w specyfikacji przed startem – szanujemy Twój czas i nie pozwalamy na niekontrolowane opóźnienia."
    },
    {
      question: "Czy oferujecie wsparcie techniczne po uruchomieniu sklepu?",
      answer: "Działający sklep to dopiero początek. Zapewniamy pełną opiekę powdrożeniową oraz gwarancję techniczną na wykonany system. Jeśli pojawią się jakiekolwiek pytania lub będziesz chciał rozbudować sklep o nowe funkcje, jesteśmy do Twojej dyspozycji. Nie zostawiamy Cię samego z technologią – dbamy o to, aby Twój biznes działał stabilnie i bez przerw w sprzedaży."
    }
  ] : [
    {
      question: "How much does it cost to maintain the store after its launch?",
      answer: "The maintenance cost depends on the scale of your business and the generated traffic. For smaller stores, these are amounts of several hundred zlotys per year, while Premium systems require more efficient dedicated servers. The key thing, however, is that with us you do not pay any sales commissions or fixed fees for just using the platform (SaaS)."
    },
    {
      question: "Will I receive training on how to use the panel?",
      answer: "Yes. After implementation, we conduct training during which you will learn how to add products, manage inventory and handle orders. You will receive a system that you will control yourself, without having to pay a programmer for every price or text change."
    },
    {
      question: "Will the store display correctly on phones?",
      answer: "The Mobile-First approach is a standard in our projects. We design the interface for smartphone users, ensuring lightning-fast loading and a comfortable purchase path \"under the thumb\", which directly translates into higher sales in your store."
    },
    {
      question: "What payment and delivery methods can I offer?",
      answer: "We implement all key solutions: fast payments (BLIK, PayU, Przelewy24, Apple Pay) and full logistics automation (InPost, DPD, DHL). The customer pays in a second, and you generate a shipping label with one click directly in the administrator panel."
    },
    {
      question: "Is the store optimized for the Google search engine?",
      answer: "Each project undergoes a technical SEO audit. We optimize the code, loading speed and header structure. Your store receives a solid technical foundation, thanks to which it will be easier and cheaper for you to build visibility in search results."
    },
    {
      question: "How long does it take to build a store from the moment work begins?",
      answer: "We deliver a simple store (Landing Page) within 7 business days. More extensive e-commerce systems require from 10 to 21 days. You will receive the exact date in the specification before the start - we respect your time and do not allow uncontrolled delays."
    },
    {
      question: "Do you offer technical support after launching the store?",
      answer: "A working store is just the beginning. We provide full post-implementation care and a technical guarantee for the completed system. If any questions arise or you want to expand the store with new functions, we are at your disposal. We do not leave you alone with technology - we make sure that your business operates stably and without interruptions in sales."
    }
  ];

  return (
    <div className="relative z-40 bg-black text-white min-h-screen">
      <div className="absolute inset-0 z-0 h-[200vh] pointer-events-none overflow-hidden">
        <video preload="none" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60"
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/t%C5%82o.mp4"
        poster="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/HomepageZdjecieWTle.webp" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="fixed top-8 left-4 md:top-12 md:left-12 z-50">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pt-40 lg:pt-48 pb-16 lg:pb-12 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
            <div 
              className="font-inter-tight text-white max-w-[15em]"
              style={{ 
                lineHeight: '1', 
                fontWeight: '300',
                fontSize: 'clamp(1.75rem, 1.5rem + 2vw, 3.5rem)'
              }}
            >
              {lang === 'PL' ? 'Nowoczesne platformy sprzedażowe zorientowane na konwersję i doskonałe doświadczenie klienta.' : 'Modern sales platforms focused on conversion and excellent customer experience.'}
            </div>

            <div 
              className="font-inter-tight text-slate-300 lg:max-w-[35em]"
              style={{ 
                fontSize: 'clamp(1rem, .735915493rem + .8450704225vw, 1.75rem)',
                letterSpacing: '-.01em',
                fontWeight: '300'
              }}
            >
              <p className="mb-8">
                {lang === 'PL' ? 'Tworzymy sklepy gotowe na dużą skalę sprzedaży i skomplikowaną logistykę. Łączymy systemy płatności, magazyny oraz kurierów w jeden, sprawnie działający mechanizm zarządzany z jednego panelu.' : 'We build online stores that not only look nice, but above all sell effectively. We combine advanced analytics with intuitive design.'}
              </p>
              <p>
                {lang === 'PL' ? 'Projektujemy intuicyjne procesy zakupowe, które eliminują błędy i skracają czas potrzebny na złożenie zamówienia. Otrzymujesz bezpieczną platformę, która wytrzyma każdy nagły skok ruchu.' : 'Your customers deserve a fast and secure purchasing process. We provide the technology that makes it possible, allowing you to focus on developing your offer.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <ServicesGrid projectsData={getEcommerceProjectsData(lang)} onContactClick={onContactClick} />

      <section className="relative z-10 w-full bg-black text-center pt-0 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <h2 className="text-white font-inter-tight font-normal leading-[1.05] tracking-tight mb-8" style={{ fontSize: 'clamp(2.5rem, 3vw, 4rem)' }}>
            {lang === 'PL' ? 'Prezentacja produktów w wymiarze 3D' : '3D Product Presentation'}
          </h2>
          <p className="text-white/80 text-[1rem] sm:text-lg lg:text-xl font-inter-tight font-normal leading-relaxed max-w-4xl mx-auto mb-16 px-4">
            {lang === 'PL' 
              ? 'W świecie e-commerce statyczne zdjęcie to za mało. Projektujemy zaawansowane wizualizacje produktowe 3D i animacje CGI, które budują pozycję lidera i drastycznie zwiększają konwersję. Twoja oferta zasługuje na oprawę klasy High-End.' 
              : 'In the world of e-commerce, a static photo is not enough. We design advanced 3D product visualizations and CGI animations that build a leader\'s position and drastically increase conversion. Your offer deserves High-End class production.'}
          </p>
          <div className="w-full max-w-[1100px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/5">
            <video preload="none" 
              src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/Wizualizacja3D.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full aspect-video object-cover"
            />
          </div>
          <div className="mt-12 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContactClick}
              className="px-10 py-5 bg-white text-black font-inter-tight font-medium rounded-full hover:bg-white/90 transition-colors text-base sm:text-lg w-fit shadow-lg"
            >
              {lang === 'PL' ? 'Omów projekt' : 'Discuss project'}
            </motion.button>
          </div>
        </div>
      </section>

      <section className="relative z-10 w-full bg-white text-black">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-[6.25rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 items-center">
            <h2 className="text-black font-normal leading-[1.2] max-w-[12em] font-inter-tight" style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)' }}>
              {lang === 'PL' ? 'Sklep to nie tylko katalog produktów. To Twoje najważniejsze narzędzie sprzedażowe, które musi budować zaufanie od pierwszej sekundy.' : 'A store is not just a product catalog. It is your most important sales tool that must build trust from the first second.'}
            </h2>
            <div className="text-[#363636] lg:col-start-2 max-w-[27.5em] lg:ml-auto font-inter-tight font-normal leading-[1.2] tracking-[.02em]" style={{ fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)' }}>
              {lang === 'PL' ? 'Od prostych sklepów typu One-Product po rozbudowane platformy B2B – dostarczamy rozwiązania, które realnie zwiększają Twoje przychody. Dbamy o każdy etap ścieżki klienta, od wejścia na stronę po finalizację płatności.' : 'From simple One-Product stores to extensive B2B platforms - we provide solutions that realistically increase your revenues. We take care of every stage of the customer path, from entering the website to finalizing the payment.'}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 pt-0 pb-32 bg-white">
        <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
          <h2 className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold text-black leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full">
            <span className="sm:hidden flex flex-col items-end text-right w-full">
              <span>{lang === 'PL' ? <><>ZOBACZ<br />PROCES.</></> : <><>SEE THE<br />PROCESS.</></>}</span>
              <div className="flex flex-col items-start text-left w-[90%]" style={{ position: 'relative', paddingTop: '2.3125rem' }}>
                <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2, textTransform: 'none', letterSpacing: 'normal' }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                <span className="mt-2 text-left" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 300, letterSpacing: '.2em', textTransform: 'uppercase', lineHeight: 1.5, maxWidth: '280px' }}>{lang === 'PL' ? 'Nasze kroki do stworzenia Twojego dochodowego e-commerce.' : 'Our steps to create your profitable e-commerce.'}</span>
              </div>
            </span>
            <span className="hidden sm:inline-grid text-left">
              <span className="invisible col-start-1 row-start-1 select-none whitespace-pre" aria-hidden="true">{lang === 'PL' ? 'TWORZYMY TO' : 'WE CREATE IT'}</span>
              <span className="col-start-1 row-start-1 flex flex-col w-full">
                <span className="text-left">{lang === 'PL' ? 'ZOBACZ' : 'SEE THE'}</span>
                <span className="flex justify-between items-center w-full">
                  <div className="text-left flex flex-col">
                    <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2, textTransform: 'none', letterSpacing: 'normal' }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                    <span className="mt-2" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 300, letterSpacing: '.2em', textTransform: 'uppercase', maxWidth: '280px', lineHeight: 1.5 }}>{lang === 'PL' ? 'Nasze kroki do stworzenia Twojego dochodowego e-commerce.' : 'Our steps to create your profitable e-commerce.'}</span>
                  </div>
                  <span className="text-right">{lang === 'PL' ? 'PROCES.' : 'PROCESS.'}</span>
                </span>
              </span>
            </span>
          </h2>
        </div>
      </section>

      <section className="relative w-full bg-white text-black z-10">
        {processStages.map((stage, index) => (
          <div key={stage.id} className="sticky top-[72px] h-[calc(100vh-72px)] w-full bg-white flex flex-col" style={{ zIndex: 20 + index }}>
            <div className="max-w-[100rem] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex flex-col">
              <div className="w-full h-[1px] bg-black/10" />
              <div className="flex-1 flex flex-col justify-center py-12 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <h2 className="text-[clamp(3rem,10vw,8rem)] font-bold font-inter-tight leading-none tracking-tighter">{stage.title}</h2>
                  <div className="space-y-8 max-w-[35em] lg:ml-auto">
                    {stage.paragraphs.map((p, i) => (
                      <p key={i} className="text-[clamp(1rem,1.2vw,1.375rem)] font-inter-tight font-normal leading-relaxed text-[#363636]">{p}</p>
                    ))}
                  </div>
                </div>
                <div className="mt-auto flex items-end justify-between pb-8">
                  <span className="text-sm font-mono text-black/40">{stage.id}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="relative bg-white text-black -mt-[1px] pb-[3.75rem] z-10 overflow-hidden">
        <h2 
          className="font-inter-tight font-normal mb-12 mx-[1.875rem] text-black"
          style={{ 
            lineHeight: '1',
            fontSize: 'clamp(1.75rem, -4.0833333333rem + 7.7777777778vw, 5.25rem)',
            textTransform: 'none',
            letterSpacing: 'normal'
          }}
        >
          Technologie
        </h2>

        <div className="relative w-full">
          <motion.div 
            className="flex gap-4 px-[1.875rem]"
            animate={{ x: [0, -2448] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ width: 'max-content' }}
          >
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4">
                {[
                  { name: 'NEXT.JS', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Next.js</title>
                      <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"/>
                    </svg>
                  )},
                  { name: 'REACT', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>React</title>
                      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
                    </svg>
                  )},
                  { name: 'TAILWIND CSS', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Tailwind CSS</title>
                      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                    </svg>
                  )},
                  { name: 'FRAMER MOTION', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16" strokeWidth="2">
                      <path d="M12 12 4 4v16L20 4v16l-4 -4"></path>
                      <path d="m20 12 -8 8 -4 -4"></path>
                    </svg>
                  )},
                  { name: 'TYPESCRIPT', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>TypeScript</title>
                      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
                    </svg>
                  )},
                  { name: 'NODE.JS', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Node.js</title>
                      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
                    </svg>
                  )},
                  { name: 'VITE', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Vite</title>
                      <path d="M13.056 23.238a.57.57 0 0 1-1.02-.355v-5.202c0-.63-.512-1.143-1.144-1.143H5.148a.57.57 0 0 1-.464-.903l3.777-5.29c.54-.753 0-1.804-.93-1.804H.57a.574.574 0 0 1-.543-.746.6.6 0 0 1 .08-.157L5.008.78a.57.57 0 0 1 .467-.24h14.589a.57.57 0 0 1 .466.903l-3.778 5.29c-.54.755 0 1.806.93 1.806h5.745c.238 0 .424.138.513.322a.56.56 0 0 1-.063.603z"/>
                    </svg>
                  )},
                  { name: 'WEBGL', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>WebGL</title>
                      <path d="M3.489 10.164c-.565.548-.885 1.172-.885 1.835 0 2.167 3.415 3.921 7.631 3.921 2.339 0 4.437-.484 5.837-1.335-1.533 1.426-4.265 2.43-7.385 2.43C3.89 17.015 0 14.769 0 11.999s3.89-5.014 8.689-5.014c3.131.002 5.872 1.009 7.398 2.444-1.399-.856-3.504-1.351-5.852-1.351-2.506 0-4.73.621-6.121 1.579l.785 3.395.971-3.481h.737l.971 3.481.805-3.481h.805L7.953 14.11h-.717l-.991-3.566L5.24 14.11h-.714zm19.839 3.48h-.162v.424h-.142v-.424h-.164v-.122h.468zm.064-.122h.209l.095.364.096-.364H24v.546h-.133v-.415h-.002l-.113.415h-.109l-.115-.415h-.003v.415h-.133zm-5.699.515c-.2.084-.399.126-.601.126-.319 0-.608-.055-.863-.166q-.3825-.1665-.645-.459c-.175-.195-.311-.424-.404-.688-.093-.263-.14-.547-.14-.851 0-.313.047-.601.14-.869.093-.269.226-.502.402-.699.175-.2.39-.355.645-.468s.541-.171.863-.171c.215 0 .421.034.621.098.199.064.381.16.543.284s.295.279.399.463.169.395.193.632h-.874c-.055-.233-.159-.408-.315-.525-.155-.118-.343-.176-.567-.176-.207 0-.382.04-.526.12s-.262.187-.35.322a1.41 1.41 0 0 0-.196.459c-.039.171-.062.348-.062.532 0 .175.02.346.062.512.04.167.107.315.196.448.088.133.206.24.35.32s.319.119.526.119c.303 0 .539-.077.705-.23s.262-.375.29-.668h-.922v-.689h1.75v2.255h-.584l-.093-.472c-.162.21-.344.357-.543.441m2.708-4.14v3.395h2.033v.774h-2.949V9.897zm-9.204 1.585c.109.151.191.337.251.557.053.21.08.452.08.716v.047H9.372c.011.41.164.876.807.876.45 0 .703-.344.719-.537l.002-.042h.592l-.007.051c-.008.075-.051.222-.135.377-.049.086-.104.166-.166.239a1.3 1.3 0 0 1-.248.218c-.071.046-.158.1-.287.139-.148.047-.326.069-.543.069-.415 0-.763-.151-1.007-.434a1.43 1.43 0 0 1-.266-.482c-.06-.182-.091-.386-.091-.601 0-.485.12-.896.348-1.186.125-.158.278-.28.457-.362.191-.086.41-.131.654-.131.218 0 .413.043.581.127.165.082.304.202.415.359m-1.064.047c-.402 0-.741.357-.765.785h1.543c-.046-.528-.302-.785-.778-.785m4.373.388c.058.182.086.381.084.588 0 .19-.022.385-.064.563-.049.206-.122.39-.22.545-.11.178-.252.318-.419.415-.186.109-.408.164-.654.164-.228 0-.426-.057-.585-.173a.89.89 0 0 1-.198-.193v.282h-.561V9.983h.59v1.393c.093-.111.202-.2.324-.262.146-.078.313-.118.497-.12.199 0 .383.04.547.118.158.075.295.184.408.324.109.135.193.297.251.481m-.53.67c0-.2-.013-.459-.111-.672-.12-.26-.335-.384-.654-.384-.3 0-.506.135-.628.417-.084.195-.126.452-.126.785 0 .696.412.942.765.942.244 0 .435-.102.565-.303.125-.191.189-.462.189-.785"/>
                    </svg>
                  )},
                  { name: 'THREE.JS', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Three.js</title>
                      <path d="M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667a.268.268 0 0 0-.123-.035L6.38 1.715a.268.268 0 0 0-.144-.04L.456.01A.268.268 0 0 0 .38 0zm.374.654L5.71 2.08 1.99 5.664zM6.61 2.34l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.926-4.877-1.4zm6.28 1.538l4.878 1.404-3.662 3.53zm-.52.13l1.208 4.9-4.853-1.392zm6.3 1.534l4.947 1.424-3.715 3.574zm-.524.12l1.215 4.926-4.876-1.398zm-15.432.696l4.964 1.424-3.726 3.586zM8.047 8.15l4.877 1.4-3.66 3.527zm-.518.137l1.236 5.017-4.963-1.432zm6.274 1.535l4.965 1.425-3.73 3.586zm-.52.127l1.235 5.012-4.958-1.43zm-9.63 2.438l4.873 1.406-3.656 3.523zm5.854 1.687l4.863 1.403-3.648 3.51zm-.54.04l1.214 4.927-4.875-1.4zm-3.896 4.02l5.037 1.442-3.782 3.638z"/>
                    </svg>
                  )},
                  { name: 'BLENDER', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Blender</title>
                      <path d="M12.51 13.214c.046-.8.438-1.506 1.03-2.006a3.424 3.424 0 0 1 2.212-.79c.85 0 1.631.3 2.211.79.592.5.983 1.206 1.028 2.005.045.823-.285 1.586-.865 2.153a3.389 3.389 0 0 1-2.374.938 3.393 3.393 0 0 1-2.376-.938c-.58-.567-.91-1.33-.865-2.152M7.35 14.831c.006.314.106.922.256 1.398a7.372 7.372 0 0 0 1.593 2.757 8.227 8.227 0 0 0 2.787 2.001 8.947 8.947 0 0 0 3.66.76 8.964 8.964 0 0 0 3.657-.772 8.285 8.285 0 0 0 2.785-2.01 7.428 7.428 0 0 0 1.592-2.762 6.964 6.964 0 0 0 .25-3.074 7.123 7.123 0 0 0-1.016-2.779 7.764 7.764 0 0 0-1.852-2.043h.002L13.566 2.55l-.02-.015c-.492-.378-1.319-.376-1.86.002-.547.382-.609 1.015-.123 1.415l-.001.001 3.126 2.543-9.53.01h-.013c-.788.001-1.545.518-1.695 1.172-.154.665.38 1.217 1.2 1.22V8.9l4.83-.01-8.62 6.617-.034.025c-.813.622-1.075 1.658-.563 2.313.52.667 1.625.668 2.447.004L7.414 14s-.069.52-.063.831zm12.09 1.741c-.97.988-2.326 1.548-3.795 1.55-1.47.004-2.827-.552-3.797-1.538a4.51 4.51 0 0 1-1.036-1.622 4.282 4.282 0 0 1 .282-3.519 4.702 4.702 0 0 1 1.153-1.371c.942-.768 2.141-1.183 3.396-1.185 1.256-.002 2.455.41 3.398 1.175.48.391.87.854 1.152 1.367a4.28 4.28 0 0 1 .522 1.706 4.236 4.236 0 0 1-.239 1.811 4.54 4.54 0 0 1-1.035 1.626"/>
                    </svg>
                  )},
                  { name: 'GRAPHQL', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" className="w-16 h-16"><path fill="#777" fillRule="evenodd" d="m59 11.4 20.5 11.9c.6-.6 1.3-1.2 2-1.6 4.3-2.4 9.7-1 12.2 3.3 2.4 4.3 1 9.7-3.3 12.2q-1.05.6-2.4.9v23.7c.8.2 1.6.5 2.3.9 4.3 2.5 5.7 7.9 3.3 12.2s-7.9 5.7-12.2 3.3c-.8-.5-1.6-1.1-2.2-1.8L58.9 88.2c.3.9.5 1.9.4 2.8 0 4.9-4 8.9-8.9 8.9s-8.9-4-8.9-8.9c0-.9.1-1.7.4-2.5L21.4 76.6c-.6.6-1.3 1.1-2 1.6-4.3 2.4-9.7 1-12.2-3.3-2.4-4.3-1-9.7 3.3-12.2.7-.4 1.5-.7 2.3-.9V38.1q-1.2-.3-2.4-.9c-4.2-2.5-5.7-8-3.2-12.2 2.4-4.3 7.9-5.7 12.2-3.3.7.4 1.4 1 2 1.6l20.5-11.9c-.2-.8-.4-1.7-.4-2.5 0-4.9 4-8.9 8.9-8.9s8.9 4 8.9 8.9c0 .9-.1 1.7-.3 2.5m-2.2 3.7L77.4 27c-.3 1.1-.4 2.3-.3 3.5s.5 2.3 1.1 3.4c1.3 2.2 3.3 3.6 5.6 4.2v23.8c-.1 0-.2.1-.3.1L56.6 15.3c.1 0 .2-.1.2-.2m-12.5.2L17.4 61.9c-.1 0-.2-.1-.4-.1V38.1c2.3-.6 4.3-2 5.6-4.2.6-1 1-2.2 1.1-3.4s0-2.4-.3-3.5L44 15.1c.1.1.2.2.3.2m8.6 2.2L79.8 64c-.6.6-1.1 1.3-1.6 2-.4.7-.7 1.5-.9 2.3H23.6c-.2-.8-.5-1.6-.9-2.3s-1-1.4-1.6-2L48 17.5c.8.2 1.6.3 2.5.3q1.2 0 2.4-.3M57 85l20.5-11.8c-.1-.2-.1-.4-.2-.6H23.6c0 .1-.1.2-.1.3L44 84.8c.8-.9 1.8-1.5 2.9-2s2.3-.7 3.5-.7 2.5.3 3.6.8c1.2.4 2.2 1.2 3 2.1" clipRule="evenodd"/></svg>
                  )},
                  { name: 'TANSTACK QUERY', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" className="w-16 h-16"><g clipPath="url(#a)"><path fill="#000" d="M46.156.094c1.32-.173 2.712-.055 4.041-.055 4.924 0 9.759.765 14.47 2.213a51 51 0 0 1 16.555 8.696C87.28 15.715 92.3 21.968 95.52 28.984c6.027 13.13 5.983 29.04-.191 42.115-3.992 8.453-10.397 15.528-18.148 20.688-6.325 4.21-13.722 6.787-21.248 7.699-9.58 1.161-19.936-.536-28.548-4.951C11.22 86.246.228 69.564.01 51.28c-.041-3.525.013-7.07.711-10.561 1.137-5.685 3.118-11.18 6.095-16.168 3.219-5.396 7.377-10.158 12.357-13.997 5.84-4.502 12.627-7.74 19.814-9.388 1.736-.396 3.478-.616 5.23-.83l.553-.068q.693-.083 1.386-.174M29.432 83.212c-2.226.238-4.574.644-6.485 1.894.43.103.923 0 1.372 0 1.078-.002 2.166-.042 3.242.005a37.4 37.4 0 0 1 8.107 1.263c3.332.914 6.267 2.712 9.478 3.925 3.387 1.28 6.759 1.677 10.351 1.677 1.81 0 3.608-.006 5.363-.5-.916-.488-2.227-.396-3.242-.6-2.203-.44-4.368-.979-6.486-1.735-1.558-.556-3.06-1.242-4.555-1.943l-.96-.452c-1.387-.652-2.778-1.295-4.212-1.837-3.772-1.425-7.952-2.129-11.973-1.697m3.367-9.472c-4.411 0-8.874.777-12.845 2.779a19 19 0 0 0-2.744 1.703c-.264.195-.733.446-.83.785-.1.344.255.633.456.853.992-.53 1.936-1.09 2.993-1.49 6.837-2.598 15.126-2.054 21.95.328 3.403 1.187 6.538 2.964 9.852 4.357a44 44 0 0 0 11.474 3.085c4.696.611 10.05.116 14.342-2.003 1.509-.744 3.603-1.879 4.24-3.528-.787.07-1.496.407-2.244.64-1.19.37-2.395.683-3.617.928-4.143.83-8.549 1.001-12.721.248-3.932-.71-7.585-2.136-11.221-3.636l-.465-.192-.928-.385-.464-.192c-1.858-.77-3.723-1.53-5.63-2.195-3.703-1.293-7.673-2.085-11.598-2.085m7.733-67.77c-5.289 1.168-10.026 3.443-14.592 6.31-2.65 1.665-5.186 3.37-7.483 5.514-3.416 3.186-6.026 7.06-8.303 11.105-2.346 4.168-3.85 9.026-4.577 13.74-.713 4.624-.83 9.485-.014 14.114 1.022 5.786 2.965 11.215 6.035 16.237 1.031-.482 1.764-1.58 2.619-2.32 1.727-1.494 3.54-2.879 5.487-4.073.721-.443 1.462-.786 2.245-1.101.295-.119.779-.227.918-.552.22-.515-.188-1.412-.258-1.946-.3-1.527-.322-3.08-.284-4.622.11-4.488.949-9.039 2.545-13.24 1.204-3.165 3.042-6.039 5.22-8.618a40 40 0 0 1 2.335-2.498c.48-.478 1.074-.886 1.372-1.499-1.564.001-3.128.452-4.614.91-3.204.986-6.324 2.45-8.98 4.514-1.211.942-2.099 2.177-3.244 3.168-.352.304-.981.712-1.467.482-.734-.346-.62-1.79-.705-2.454-.323-2.552.644-5.781 1.873-7.994 1.973-3.552 5.62-6.585 9.904-6.479 1.85.046 3.469.689 5.238 1.108-.449-.637-1.05-1.101-1.622-1.623-1.4-1.28-2.932-2.449-4.614-3.333-.677-.355-1.406-.572-2.12-.833-.36-.131-.812-.312-.947-.711-.25-.74 1.081-1.425 1.57-1.737 1.891-1.205 4.21-2.197 6.485-2.253 3.557-.087 7.032 1.886 8.497 5.244.514 1.18.667 2.429.768 3.689l.018.236.027.355.008.118.018.237.018.237c1.117-.911 1.903-2.25 2.993-3.226 2.55-2.281 6.042-3.294 9.354-2.267 2.993.928 5.595 2.994 7.126 5.742.4.72 1.518 2.477.71 3.194-.631.56-1.433.123-2.1-.11-.504-.175-1.025-.287-1.549-.39l-.285-.056-.285-.056c-1.813-.364-3.921-.326-5.737-.007-1.175.207-2.322.625-3.492.798v.25c3.2.026 6.294 1.851 7.873 4.621.654 1.148.98 2.461 1.23 3.747.31 1.59.093 3.322-.342 4.871-.145.52-.41 1.4-1.03 1.52-.44.085-.813-.352-1.064-.647-.657-.773-1.282-1.507-2.053-2.175-1.95-1.687-4.013-3.244-6.11-4.745-1.115-.798-2.334-1.834-3.618-2.321.361.869.715 1.677.837 2.623.361 2.782-.804 5.401-2.552 7.494-.533.639-1.104 1.282-1.777 1.779-.279.205-.629.474-.997.416-1.157-.183-1.295-1.926-1.472-2.82-.6-3.025-.36-6.03.474-8.992-.742.375-1.278 1.198-1.743 1.873-1.024 1.485-1.913 3.056-2.55 4.746-2.538 6.735-2.514 14.623.774 21.107.367.724.924.627 1.648.627l.328-.002.328-.003c.656-.007 1.314-.01 1.963.077.337.045.805.005 1.072.253.32.297.149.808.075 1.174-.205 1.023-.274 1.953-.274 2.997 1.365-.211 1.744-2.4 2.228-3.497.548-1.243 1.106-2.487 1.613-3.747.25-.62.583-1.312.496-1.998-.099-.772-.656-1.59-1.045-2.249-.735-1.245-1.571-2.527-2.113-3.872-.433-1.075-.03-2.418 1.19-2.802.674-.212 1.392.204 1.83.69.92 1.02 1.512 2.539 2.18 3.736l5.202 9.368c.442.793.885 1.585 1.337 2.373.176.307.356.782.717.913.322.116.761-.05 1.082-.114.83-.166 1.66-.346 2.494-.496 1-.18 2.522-.147 3.242-.928-1.053-.333-2.27-.313-3.367-.238-.658.045-1.388.28-1.993-.104-.901-.572-1.5-1.894-2.05-2.78-1.36-2.184-2.64-4.402-3.94-6.62l-.208-.353-.419-.706a58 58 0 0 1-.617-1.065c-.155-.276-.386-.64-.163-.945.234-.32.744-.338 1.204-.339h.091c.18 0 .35 0 .487-.017 1.857-.245 3.74-.447 5.613-.447-.146-.507-.563-1.08-.43-1.623.299-1.215 2.047-1.595 2.86-.724.545.586.862 1.39 1.217 2.097.469.932 1.002 1.833 1.504 2.748.878 1.601 1.838 3.159 2.74 4.746q.113.197.23.392l.116.195c.39.65.782 1.306.992 2.036-3.137-.143-5.492-3.785-6.86-6.245-.109.394.069.746.21 1.124.295.786.647 1.535 1.09 2.249.633 1.018 1.36 2.067 2.317 2.806 1.7 1.312 3.941 1.32 5.986 1.18 1.312-.09 2.95-.688 4.24-.283 1.289.405 1.807 1.825 1.042 2.916-.573.818-1.338 1.126-2.288 1.25.672 1.442 1.553 2.78 2.192 4.246.265.61.543 1.546 1.18 1.868.425.215 1.033.015 1.491.006-.46-1.219-1.322-2.252-1.746-3.498 1.291.06 2.54.733 3.742 1.163 2.364.846 4.699 1.77 7.03 2.703l1.076.431c.96.384 1.924.764 2.869 1.182.346.153.824.51 1.206.29.312-.18.514-.607.706-.897.538-.811 1.025-1.653 1.508-2.498 1.932-3.384 3.35-7.091 4.296-10.867 3.123-12.453.444-26.194-7.06-36.597-2.885-3.997-6.51-7.453-10.51-10.314C65.696 6.18 52.57 3.31 40.531 5.97m20.453 62.103c-2.652.691-5.386 1.318-8.107 1.67.358 1.218 1.233 2.403 1.873 3.497.247.423.512.99 1 1.173.553.208 1.22-.129 1.742-.299-.242-.66-.648-1.254-.98-1.873-.137-.255-.349-.558-.236-.86.213-.574 1.1-.54 1.59-.64 1.293-.262 2.572-.59 3.866-.848.477-.096 1.14-.355 1.62-.195.358.12.575.415.779.724l.092.139c.122.184.247.365.404.506.523.473 1.305.545 1.97.674-.406-.912-1.08-1.71-1.511-2.623-.251-.531-.458-1.313-1.007-1.62-.758-.422-2.321.373-3.095.575m-16.712-6.074c-.125 1.583-.61 2.872-1.372 4.246.873.11 1.762.15 2.62.362.641.16 1.233.463 1.87.638-.34-.932-.972-1.763-1.462-2.623-.494-.869-.936-1.924-1.656-2.623"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>
                  )},
                  { name: 'AWS', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" className="w-16 h-16"><g clipPath="url(#a)"><path fill="#2e2e2e" d="M28.2 41.7c0 1.2.1 2.2.4 3 .3.7.6 1.5 1.1 2.4.2.3.2.5.2.8s-.2.7-.6 1l-2.1 1.4q-.45.3-.9.3c-.3 0-.7-.2-1-.5-.5-.5-.9-1-1.2-1.6s-.7-1.2-1-2c-2.6 3.1-5.9 4.6-9.8 4.6-2.8 0-5-.8-6.7-2.4C5 47.1 4.1 45 4.1 42.3q0-4.2 3-6.9c2-1.7 4.7-2.6 8.1-2.6 1.1 0 2.3.1 3.5.3s2.5.4 3.8.7v-2.4c0-2.5-.5-4.3-1.6-5.3q-1.65-1.5-5.4-1.5c-1.2 0-2.4.1-3.6.4s-2.4.7-3.6 1.1c-.5.2-.9.4-1.2.4-.2.1-.4.1-.5.1-.5 0-.7-.3-.7-1V24c0-.5.1-.9.2-1.2.2-.2.5-.5.9-.7q1.8-.9 4.2-1.5c1.6-.4 3.4-.6 5.2-.6q6 0 8.7 2.7c1.8 1.8 2.8 4.5 2.8 8.2zm-13.5 5.1c1.1 0 2.2-.2 3.4-.6s2.3-1.1 3.2-2.1c.5-.6.9-1.3 1.1-2.1s.3-1.8.3-2.9v-1.4c-1-.2-2-.4-3.1-.6-1.1-.1-2.1-.2-3.1-.2-2.2 0-3.9.4-5 1.3-1 .9-1.5 2.2-1.5 3.8s.4 2.7 1.2 3.5c.8.9 1.9 1.3 3.5 1.3m26.7 3.6c-.6 0-1-.1-1.3-.3s-.5-.7-.7-1.3L31.6 23c-.2-.7-.3-1.1-.3-1.3 0-.5.3-.8.8-.8h3.3c.6 0 1.1.1 1.3.3.3.2.5.7.7 1.3l5.6 22 5.2-22c.2-.7.4-1.1.6-1.3.3-.2.7-.3 1.3-.3h2.7c.6 0 1.1.1 1.3.3.3.2.5.7.6 1.3L60 44.8l5.8-22.3c.2-.7.4-1.1.7-1.3s.7-.3 1.3-.3h3.1c.5 0 .8.3.8.8 0 .2 0 .3-.1.5 0 .2-.1.5-.2.8l-8 25.7c-.2.7-.4 1.1-.7 1.3s-.7.3-1.3.3h-2.9c-.6 0-1.1-.1-1.3-.3-.3-.2-.5-.7-.6-1.3l-5.2-21.5-5.1 21.4c-.2.7-.4 1.1-.6 1.3-.3.2-.7.3-1.3.3h-3zm42.7.9c-1.7 0-3.5-.2-5.1-.6-1.7-.4-3-.8-3.8-1.3-.5-.3-.9-.6-1-.9s-.2-.6-.2-.9v-1.7c0-.7.3-1 .8-1 .2 0 .4 0 .6.1s.5.2.8.3c1.1.5 2.4.9 3.7 1.2s2.6.4 4 .4c2.1 0 3.7-.4 4.9-1.1s1.7-1.8 1.7-3.2c0-.9-.3-1.7-.9-2.3s-1.7-1.2-3.4-1.7l-4.8-1.5c-2.4-.8-4.2-1.9-5.3-3.4s-1.7-3.1-1.7-4.8c0-1.4.3-2.6.9-3.7q.9-1.65 2.4-2.7c1-.8 2.1-1.3 3.5-1.7q1.95-.6 4.2-.6c.7 0 1.5 0 2.2.1.8.1 1.5.2 2.2.4s1.3.3 1.9.5 1.1.4 1.4.6c.5.3.8.5 1 .8s.3.6.3 1.1v1.6c0 .7-.3 1.1-.8 1.1-.3 0-.7-.1-1.3-.4-1.9-.9-4-1.3-6.4-1.3-1.9 0-3.4.3-4.4.9s-1.6 1.6-1.6 3c0 .9.3 1.7 1 2.4.7.6 1.9 1.3 3.7 1.8l4.7 1.5c2.4.8 4.1 1.8 5.2 3.2 1 1.4 1.5 2.9 1.5 4.7q0 2.1-.9 3.9c-.6 1.1-1.4 2.1-2.4 2.9s-2.3 1.4-3.7 1.9c-1.6.1-3.2.4-4.9.4"/><path fill="#a7a7a7" fillRule="evenodd" d="M90.4 67.4c-10.9 8.1-26.8 12.4-40.5 12.4-19.2 0-36.4-7.1-49.5-18.9-1-.9-.1-2.2 1.1-1.5C15.6 67.6 33 72.5 51 72.5c12.1 0 25.5-2.5 37.7-7.7 1.9-.7 3.5 1.3 1.7 2.6" clipRule="evenodd"/><path fill="#a7a7a7" fillRule="evenodd" d="M95 62.2c-1.4-1.8-9.2-.9-12.8-.4-1.1.1-1.2-.8-.3-1.5 6.3-4.4 16.5-3.1 17.7-1.7 1.2 1.5-.3 11.8-6.2 16.7-.9.8-1.8.4-1.4-.6 1.4-3.3 4.4-10.7 3-12.5" clipRule="evenodd"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>
                  )}
                ].map((tech, i) => (
                  <div 
                    key={i} 
                    className="border border-[#d9d9d9] rounded-[12px] py-[1.25rem] flex flex-col items-center justify-center select-none w-[16rem]"
                    style={{ 
                      display: 'grid',
                      gridTemplateRows: '10rem auto',
                      height: '16rem'
                    }}
                  >
                    <div className="flex items-center justify-center">
                      {tech.icon}
                    </div>
                    <div className="text-[10px] font-medium tracking-[0.2em] text-black/40 text-center mt-4">
                      {tech.name}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-[6.25rem] lg:py-[12.5rem]">
        <div className="mx-[1.875rem] flex flex-col lg:flex-row justify-between gap-12 lg:gap-[2rem]">
          <div className="lg:w-[480px]">
            <div className="lg:sticky lg:top-[100px] bg-[#F3DEFF] p-[1.5625rem] rounded-[20px] h-fit">
              <h2 className="text-[2.5rem] lg:text-[3.2rem] font-inter-tight font-normal leading-[1.05] mb-6 text-black">{lang === 'PL' ? 'Rozkręć swoją sprzedaż już teraz' : 'Start Selling Online Professionally'}</h2>
              <p className="text-black/60 text-lg mb-10">{lang === 'PL' ? 'Twój sukces w e-commerce zaczyna się tutaj.' : 'Your e-commerce success starts here.'}</p>
              <button onClick={onAskAwayClick} className="bg-white/20 hover:bg-white/30 text-black px-8 py-4 rounded-full transition-colors text-sm font-medium border border-black/10">{lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}</button>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              {faqItems.map((item, index) => (
                <div key={index} className="border-t border-[#d9d9d9] last:border-b">
                  <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full py-8 flex justify-between items-center text-left group">
                    <span className="text-xl lg:text-2xl font-inter-tight font-normal text-black pr-8">{item.question}</span>
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 flex items-center justify-center relative">
                        <motion.div animate={{ rotate: openIndex === index ? 90 : 0 }} className="absolute w-4 h-[1px] bg-black" />
                        <motion.div animate={{ rotate: openIndex === index ? 0 : 90 }} className="absolute w-4 h-[1px] bg-black" />
                      </div>
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                        <div className="pb-8 text-black/60 text-lg leading-relaxed max-w-[800px]">{item.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-white text-black flex flex-col items-center justify-between p-6 relative overflow-hidden">
        <div className="h-20 w-full"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden -translate-y-20 sm:translate-y-0">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible scale-[1.4] sm:scale-100">
            <path id="curve-bottom-offer-ecom" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
            <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <motion.textPath xlinkHref="#curve-bottom-offer-ecom" animate={{ startOffset: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="text-[100px] sm:text-[150px] font-bold text-black uppercase tracking-[0.01em] fill-black font-bebas">
                {lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
          <span className="text-black/60 text-sm tracking-widest uppercase">{lang === 'PL' ? 'KONTAKT' : 'CONTACT'}</span>
          <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">{lang === 'PL' ? 'Gotów, by podbić rynek e-commerce?' : 'Ready to conquer the e-commerce market?'}</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={onStartProjectClick || onContactClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}</button>
            <button onClick={onAskAwayClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}</button>
          </div>
        </div>
        <footer className="w-full flex justify-between items-end z-20 pb-4">
          <div className="text-sm">
            <p className="font-bold">{lang === 'PL' ? 'POLAND' : 'POLAND'}</p>
            <p className="text-black/60">{lang === 'PL' ? 'Lubelskie, Lublin - Tutaj jesteśmy. Działamy na całym świecie.' : 'Lubelskie, Lublin - We are here. We operate worldwide.'}</p>
          </div>
          <div className="w-32"></div>
        </footer>
      </section>
    </div>
  );
}


/* --- From LanguageSwitcher.tsx --- */

const LanguageSwitcher = ({ className }: { className?: string }) => {
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


/* --- From OnePageOfferPage.tsx --- */

function OnePageOfferPage({ onBack, onContactClick, onAskAwayClick, onStartProjectClick }: { onBack: () => void; onContactClick: () => void; onAskAwayClick: () => void; onStartProjectClick?: () => void }) {
  const { lang } = useLanguage();
  const offerScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const boxes = lang === 'PL' ? [
    { 
      title: <>Wizytówka<br />Cyfrowa</>, 
      desc: 'Twoje najważniejsze informacje w jednym miejscu. Idealne rozwiązanie dla małych firm i profesjonalistów.',
      points: [
        'Przejrzysta prezentacja oferty',
        'Szybki kontakt (Click-to-call)',
        'Mapa dojazdu Google Maps',
        'Pełna responsywność mobilna',
        'Integracja z social media',
        'Niskie koszty utrzymania'
      ],
      bgColor: '#E2F0D9'
    },
    { 
      title: <>Landing Page<br />Sprzedażowy</>, 
      desc: 'Strona skoncentrowana na jednym celu – konwersji. Idealna pod kampanie reklamowe Google Ads i Meta Ads.',
      points: [
        'Architektura zorientowana na cel',
        'Perswazyjne teksty (Copywriting)',
        'Szybki czas ładowania',
        'Analityka zachowań użytkowników',
        'Testy A/B dla lepszych wyników',
        'Integracja z systemami CRM'
      ],
      bgColor: '#E2F0D9'
    },
    { 
      title: <>Portfolio<br />& Personal Brand</>, 
      desc: 'Wyróżnij się w sieci unikalnym designem. Pokaż swoje projekty i buduj markę osobistą od pierwszego wrażenia.',
      points: [
        'Unikalna oprawa graficzna',
        'Interaktywna galeria projektów',
        'Sekcja opinii i rekomendacji',
        'Blog lub aktualności',
        'Formularz kontaktowy',
        'Optymalizacja pod wizerunek'
      ],
      bgColor: '#E2F0D9'
    },
    { 
      title: <>Strona<br />Eventowa</>, 
      desc: 'Wszystko o Twoim wydarzeniu w pigułce. Rejestracja, agenda i najważniejsze informacje w nowoczesnej formie.',
      points: [
        'Licznik czasu do wydarzenia',
        'System rejestracji uczestników',
        'Interaktywna agenda',
        'Sekcja prelegentów',
        'Integracja z płatnościami',
        'Powiadomienia dla zapisanych'
      ],
      bgColor: '#E2F0D9'
    }
  ] : [
    { 
      title: <>Digital<br />Business Card</>, 
      desc: 'Your most important information in one place. The perfect solution for small businesses and professionals.',
      points: [
        'Clear presentation of the offer',
        'Quick contact (Click-to-call)',
        'Google Maps integration',
        'Full mobile responsiveness',
        'Social media integration',
        'Low maintenance costs'
      ],
      bgColor: '#E2F0D9'
    },
    { 
      title: <>Sales<br />Landing Page</>, 
      desc: 'A page focused on one goal – conversion. Ideal for Google Ads and Meta Ads advertising campaigns.',
      points: [
        'Goal-oriented architecture',
        'Persuasive texts (Copywriting)',
        'Fast loading time',
        'User behavior analytics',
        'A/B testing for better results',
        'Integration with CRM systems'
      ],
      bgColor: '#E2F0D9'
    },
    { 
      title: <>Portfolio<br />& Personal Brand</>, 
      desc: 'Stand out online with a unique design. Show your projects and build a personal brand from the first impression.',
      points: [
        'Unique graphic setting',
        'Interactive project gallery',
        'Reviews and recommendations section',
        'Blog or news',
        'Contact form',
        'Image optimization'
      ],
      bgColor: '#E2F0D9'
    },
    { 
      title: <>Event<br />Page</>, 
      desc: 'Everything about your event in a nutshell. Registration, agenda, and the most important information in a modern form.',
      points: [
        'Event countdown timer',
        'Participant registration system',
        'Interactive agenda',
        'Speakers section',
        'Payment integration',
        'Notifications for subscribers'
      ],
      bgColor: '#E2F0D9'
    }
  ];

  const processSteps = lang === 'PL' ? [
    {
      id: '01',
      title: 'Strategia i Cel',
      paragraphs: [
        "Zaczynamy od zrozumienia, co Twoja strona ma osiągnąć. Czy to ma być szybki kontakt, zapis na newsletter, czy sprzedaż konkretnego produktu? Definiujemy główny cel (Call to Action), który będzie prowadził użytkownika przez całą stronę.",
        "Analizujemy Twoją grupę docelową, aby dopasować język korzyści i design, który wzbudzi zaufanie od pierwszej sekundy."
      ]
    },
    {
      id: '02',
      title: 'Projektowanie UX/UI',
      paragraphs: [
        "Tworzymy projekt, który jest nie tylko ładny, ale przede wszystkim skuteczny. W stronach typu One-Page kluczowa jest hierarchia informacji – najważniejsze rzeczy muszą być widoczne od razu.",
        "Dbamy o to, aby nawigacja była intuicyjna, a strona wyglądała perfekcyjnie na każdym urządzeniu mobilnym."
      ]
    },
    {
      id: '03',
      title: 'Szybkie Wdrożenie',
      paragraphs: [
        "Kodujemy stronę z naciskiem na szybkość ładowania. W dzisiejszym świecie każda sekunda oczekiwania to stracony klient. Używamy nowoczesnych technologii, które gwarantują płynność działania.",
        "Integrujemy niezbędne narzędzia: analitykę, formularze kontaktowe, mapy czy media społecznościowe."
      ]
    },
    {
      id: '04',
      title: 'Optymalizacja i Start',
      paragraphs: [
        "Przed uruchomieniem testujemy stronę pod kątem błędów i wydajności. Optymalizujemy ją pod kątem SEO, aby była łatwiej odnajdywana w wyszukiwarce.",
        "Po starcie nie zostawiamy Cię samego – monitorujemy wyniki i pomagamy w dalszym rozwoju Twojej obecności w sieci."
      ]
    }
  ] : [
    {
      id: '01',
      title: 'Strategy and Goal',
      paragraphs: [
        "We start by understanding what your page is supposed to achieve. Is it supposed to be quick contact, a newsletter signup, or the sale of a specific product? We define the main goal (Call to Action) that will guide the user through the entire page.",
        "We analyze your target group to match the language of benefits and design that will inspire trust from the first second."
      ]
    },
    {
      id: '02',
      title: 'UX/UI Design',
      paragraphs: [
        "We create a design that is not only pretty but above all effective. In One-Page sites, the hierarchy of information is key – the most important things must be visible immediately.",
        "We make sure that navigation is intuitive and the page looks perfect on every mobile device."
      ]
    },
    {
      id: '03',
      title: 'Fast Implementation',
      paragraphs: [
        "We code the page with an emphasis on loading speed. In today's world, every second of waiting is a lost customer. We use modern technologies that guarantee smooth operation.",
        "We integrate necessary tools: analytics, contact forms, maps, or social media."
      ]
    },
    {
      id: '04',
      title: 'Optimization and Launch',
      paragraphs: [
        "Before launching, we test the page for errors and performance. We optimize it for SEO so that it is easier to find in the search engine.",
        "After the launch, we don't leave you alone – we monitor the results and help in the further development of your online presence."
      ]
    }
  ];

  const faqItems = lang === 'PL' ? [
    {
      question: "Czy strona One-Page wystarczy dla mojej firmy?",
      answer: "Dla wielu firm, zwłaszcza usługowych lub startujących w sieci, One-Page jest idealnym rozwiązaniem. Pozwala na szybkie i konkretne przedstawienie oferty bez rozpraszania użytkownika zbędnymi podstronami. Jeśli Twoja oferta jest skoncentrowana, One-Page często konwertuje lepiej niż rozbudowany serwis."
    },
    {
      question: "Jak długo trwa stworzenie takiej strony?",
      answer: "Dzięki uproszczonej strukturze, strony One-Page i wizytówki tworzymy bardzo szybko – zazwyczaj od kilku dni do dwóch tygodni. To najszybsza droga do profesjonalnej obecności w internecie."
    },
    {
      question: "Czy One-Page można pozycjonować w Google?",
      answer: "Tak, choć strategia różni się od rozbudowanych serwisów. Skupiamy się na najważniejszych frazach kluczowych dla Twojej działalności. Dobrze zoptymalizowany One-Page może z powodzeniem walczyć o wysokie pozycje na lokalne zapytania."
    },
    {
      question: "Co jeśli w przyszłości będę chciał rozbudować stronę?",
      answer: "Nasze strony budujemy w sposób skalowalny. One-Page może być świetnym fundamentem, do którego w przyszłości dołożymy kolejne podstrony, bloga czy sklep, gdy Twoja firma zacznie potrzebować więcej miejsca."
    }
  ] : [
    {
      question: "Is a One-Page site enough for my company?",
      answer: "For many companies, especially service-based ones or those starting online, a One-Page site is the perfect solution. It allows for a quick and specific presentation of the offer without distracting the user with unnecessary subpages. If your offer is focused, a One-Page often converts better than an extensive service."
    },
    {
      question: "How long does it take to create such a site?",
      answer: "Thanks to the simplified structure, we create One-Page sites and business cards very quickly – usually from a few days to two weeks. It is the fastest route to a professional online presence."
    },
    {
      question: "Can a One-Page site be positioned in Google?",
      answer: "Yes, although the strategy differs from extensive services. We focus on the most important keywords for your business. A well-optimized One-Page can successfully fight for high positions for local queries."
    },
    {
      question: "What if I want to expand the site in the future?",
      answer: "We build our sites in a scalable way. A One-Page can be a great foundation to which we will add more subpages, a blog, or a store in the future when your company starts needing more space."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const scrollOffer = (direction: 'left' | 'right') => {
    if (offerScrollRef.current) {
      const { scrollLeft, clientWidth } = offerScrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      offerScrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-40 bg-black text-white min-h-screen">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 h-[200vh] pointer-events-none overflow-hidden">
        <video preload="none" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60"
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/t%C5%82o.mp4"
        poster="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/HomepageZdjecieWTle.webp" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Navigation Controls */}
      <div className="fixed top-8 left-4 md:top-12 md:left-12 z-50">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pt-40 lg:pt-48 pb-16 lg:pb-12 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <h1 
            className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,24rem)] font-humane font-bold text-white leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full"
            style={{ marginBottom: 'calc(-0.04em + 10px)' }}
          >
            <div className="flex flex-col items-start">
              <div className="flex flex-row items-end justify-start gap-8 lg:gap-16 flex-nowrap">
                <span className="whitespace-nowrap">{lang === 'PL' ? 'ONE-PAGE,' : 'ONE-PAGE,'}<br className="sm:hidden" /><span className="hidden sm:inline"> </span>{lang === 'PL' ? 'KTÓRE' : 'THAT'}</span>
                
                <div 
                  className="hidden 2xl:block text-left mb-[0.5vw] flex-shrink-0 ml-12"
                  style={{ 
                    fontSize: 'clamp(0.4rem, 0.3rem + 0.6vw, 1.2rem)',
                    fontFamily: 'Inter Tight, sans-serif',
                    fontWeight: '300',
                    lineHeight: '1.2',
                    textTransform: 'none',
                    letterSpacing: '0.05em',
                    color: '#e2e8f0'
                  }}
                >
                  {lang === 'PL' ? (
                    <>Szybki start. Konkretny cel.<br />Maksymalna konwersja od zaraz.</>
                  ) : (
                    <>Fast start. Specific goal.<br />Maximum conversion right away.</>
                  )}
                </div>
              </div>
              
              <div className="flex flex-row items-center justify-start gap-8 flex-nowrap">
                <span className="whitespace-nowrap">{lang === 'PL' ? 'KONWERTUJĄ.' : 'CONVERT.'}</span>
              </div>
            </div>
          </h1>
        </motion.div>
      </div>

      {/* Section 2: Text content */}
      <section className="relative w-full py-24 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
            <div 
              className="font-inter-tight text-white max-w-[15em]"
              style={{ 
                lineHeight: '1', 
                fontWeight: '300',
                fontSize: 'clamp(1.75rem, 1.5rem + 2vw, 3.5rem)'
              }}
            >
              {lang === 'PL' ? 'Proste rozwiązania, które przynoszą realne rezultaty Twojej firmie.' : 'Simple solutions that bring real results to your company.'}
            </div>

            <div 
              className="font-inter-tight text-slate-300 lg:max-w-[35em]"
              style={{ 
                fontSize: 'clamp(1rem, .735915493rem + .8450704225vw, 1.75rem)',
                letterSpacing: '-.01em',
                fontWeight: '300'
              }}
            >
              <p className="mb-8">
                {lang === 'PL' ? 'Strony typu One-Page oraz wizytówki internetowe to najskuteczniejszy sposób na szybkie zaistnienie w sieci. Skupiamy się na tym, co najważniejsze: jasnym przekazie, profesjonalnym wizerunku i ułatwieniu klientowi kontaktu z Tobą.' : 'One-Page sites and online business cards are the most effective way to quickly exist on the web. We focus on what is most important: a clear message, a professional image, and making it easier for the customer to contact you.'}
              </p>
              <p>
                {lang === 'PL' ? 'Bez zbędnych rozpraszaczy, bez skomplikowanej nawigacji. Tylko czysta esencja Twojej oferty podana w nowoczesnej i responsywnej formie.' : 'No unnecessary distractions, no complicated navigation. Only the pure essence of your offer presented in a modern and responsive form.'}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 3: Boxes */}
      <section className="relative w-full py-24 z-10 bg-white text-black">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[100rem] mx-auto">
          <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-black mb-12 tracking-tight leading-[0.9] sm:leading-tight">
            {lang === 'PL' ? 'Nasze rozwiązania' : 'Our solutions'}
          </h2>
        </div>
          
        <div 
          ref={offerScrollRef}
          className="flex flex-row flex-nowrap gap-4 lg:gap-6 mb-12 pb-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-4 sm:pl-6 lg:pl-24 xl:pl-40"
        >
          {boxes.map((box, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 w-[85vw] sm:w-[500px] md:w-[600px] lg:w-[700px] snap-center relative rounded-3xl aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/9] overflow-hidden flex flex-col group transition-all duration-500 p-6 sm:p-10 lg:p-12"
              style={{ backgroundColor: box.bgColor }}
            >
              <div className="flex flex-col h-full justify-between items-start relative z-10">
                <div className="w-full">
                  <h3 
                    className="text-black text-left mb-4 sm:mb-6"
                    style={{
                      fontWeight: 300,
                      fontSize: 'clamp(1.75rem, 8vw, 4.5rem)',
                      fontFamily: 'Inter Tight, sans-serif',
                      lineHeight: 0.9,
                      letterSpacing: '-0.04em'
                    }}
                  >
                    {box.title}
                  </h3>
                  <p 
                    className="text-black/80 text-left"
                    style={{
                      fontSize: 'clamp(0.9rem, 3.5vw, 1.35rem)',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 300,
                      lineHeight: 1.3,
                      maxWidth: '95%'
                    }}
                  >
                    {box.desc}
                  </p>
                </div>
                <button 
                  onClick={onContactClick}
                  className="text-black text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] border-b-2 border-black/20 pb-1 hover:border-black transition-all w-fit mt-4 sm:mt-6 lg:mt-10"
                >
                  {lang === 'PL' ? 'ZOBACZ OFERTĘ' : 'SEE OFFER'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-2 sm:mt-4 px-4">
          <div className="flex gap-4">
            <button 
              onClick={() => scrollOffer('left')}
              className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scrollOffer('right')}
              className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Section 4: Process */}
      <section className="relative w-full py-24 z-10 bg-black text-white">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-white mb-16 tracking-tight leading-[0.9] sm:leading-tight">
            {lang === 'PL' ? 'Jak działamy?' : 'How we work?'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-24 lg:gap-y-24">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-start">
                <span className="text-[#E2F0D9] font-inter-tight text-xl mb-4">{step.id}</span>
                <h3 className="text-3xl font-inter-tight font-normal mb-6">{step.title}</h3>
                {step.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-slate-400 font-inter text-lg leading-relaxed mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: FAQ */}
      <section className="relative w-full py-24 z-10 bg-white text-black">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-inter-tight font-normal text-black mb-16 tracking-tight leading-[0.9] sm:leading-tight">
            {lang === 'PL' ? 'Częste pytania' : 'Common questions'}
          </h2>
          
          <div className="max-w-4xl">
            {faqItems.map((item, idx) => (
              <div key={idx} className="border-b border-black/10">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full py-8 flex justify-between items-center text-left group"
                >
                  <h3 className="text-xl sm:text-2xl font-inter-tight font-normal group-hover:translate-x-2 transition-transform duration-300">{item.question}</h3>
                  <Plus className={`w-6 h-6 transition-transform duration-300 ${openIndex === idx ? 'rotate-45' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-slate-600 text-lg leading-relaxed max-w-3xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen bg-black text-white flex flex-col items-center justify-between p-6 relative overflow-hidden">
        <div className="h-20 w-full"></div>

        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden -translate-y-20 sm:translate-y-0">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible scale-[1.4] sm:scale-100">
            <path id="curve-onepage-contact" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
            <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <motion.textPath 
                xlinkHref="#curve-onepage-contact" 
                animate={{ startOffset: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-[100px] sm:text-[150px] font-bold text-white uppercase tracking-[0.01em] fill-white font-bebas"
              >
                {lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
          <span className="text-white/60 text-sm tracking-widest uppercase">{lang === 'PL' ? 'KONTAKT' : 'CONTACT'}</span>
          <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">{lang === 'PL' ? 'Gotów, by stworzyć coś niepowtarzalnego?' : 'Ready to create something unique?'}</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={onStartProjectClick || onContactClick} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}</button>
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
}


/* --- From OurWorksPage.tsx --- */

const OurWorksPage = ({ onBack, onStartProjectClick, onAskAwayClick, initialProjectId }: { 
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
      videoUrl: '/Wideo1.webm',
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
                <img loading="lazy" 
                  src={img} 
                  alt={`${selectedProject.title} detail ${i + 1}`} 
                  className="w-full h-auto object-contain rounded-2xl border border-white/5 shadow-2xl"
                  referrerPolicy="no-referrer"
                 width="1920" height="1080" />
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
              <video preload="none" 
                src={cat.videoUrl} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full aspect-video object-cover rounded-3xl" 
              />
            ) : cat.image && (
              <img loading="lazy" 
                src={cat.image} 
                alt={cat.title} 
                className="w-full aspect-video object-cover rounded-3xl" 
                referrerPolicy="no-referrer" 
               width="1920" height="1080" />
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

/* --- From PoradnikPage.tsx --- */

function PoradnikPage({ onArticleClick }: { onArticleClick: (id: string) => void }) {
  const { lang } = useLanguage();
  const articles = [
    { 
      id: 'ux-design', 
      date: '15.03.2026', 
      title: lang === 'PL' ? 'UX Design: Strategia zatrzymywania użytkownika i optymalizacji zysku' : 'UX Design: User retention strategy and profit optimization', 
      description: lang === 'PL' ? 'User Experience (UX) Design to proces tworzenia produktów, które dostarczają użytkownikom istotnych i trafnych doświadczeń. Obejmuje on projektowanie całego procesu nabywania i integracji produktu, w tym aspektów brandingu, designu, użyteczności i funkcji.' : 'User Experience (UX) Design is the process of creating products that provide meaningful and relevant experiences to users. This involves the design of the entire process of acquiring and integrating the product, including aspects of branding, design, usability and function.', 
      image: 'https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-UXdesign.png?raw=true', 
      bgColor: '#2B2B2B' 
    },
    { 
      id: 'architektura-strony', 
      date: '20.03.2026', 
      title: lang === 'PL' ? 'Architektura strony: Kompletny przewodnik po budowie wydajnego systemu sprzedaży' : 'Website architecture: A complete guide to building an efficient sales system', 
      description: lang === 'PL' ? 'Architektura strony internetowej to strategiczny fundament, na którym opiera się cały sukces w sieci. To znacznie więcej niż tylko układ menu czy rozmieszczenie przycisków.' : 'Website architecture is the strategic foundation on which all online success is built. It is much more than just the menu layout or the placement of buttons.', 
      image: 'https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-seo.png?raw=true', 
      bgColor: '#2B2B2B' 
    },
    { 
      id: 'google-meta-ads', 
      date: '25.03.2026', 
      title: lang === 'PL' ? 'Google Ads czy Meta Ads? Gdzie Twoja firma powinna wydać pierwszy budżet?' : 'Google Ads or Meta Ads? Where should your company spend its first budget?', 
      description: lang === 'PL' ? 'Większość osób myśli, że reklama w internecie to po prostu „płacenie za to, żeby nas widzieli”. W rzeczywistości to precyzyjna maszyna do kupowania uwagi konkretnych ludzi.' : 'Most people think that advertising on the internet is simply "paying to be seen". In reality, it is a precise machine for buying the attention of specific people.', 
      image: 'https://github.com/kidiee558/solidagencytestowo/blob/main/informacje-ads.png?raw=true', 
      bgColor: '#2B2B2B' 
    },
    { 
      id: 'rebranding', 
      date: '01.04.2026', 
      title: lang === 'PL' ? 'Rebranding strony: Kiedy odświeżenie wyglądu to za mało?' : 'Website rebranding: When refreshing the look is not enough?', 
      description: lang === 'PL' ? 'W świecie cyfrowym, który pędzi do przodu, Twoja strona internetowa starzeje się szybciej niż jakikolwiek inny element biznesu. Prawdziwy rebranding to nie pudrowanie rzeczywistości – to głęboka, strategiczna operacja na wizerunku i technologii.' : 'In a digital world that is rushing forward, your website ages faster than any other element of business. True rebranding is not powdering reality - it is a deep, strategic operation on image and technology.', 
      image: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/informacje-rebranding.png', 
      bgColor: '#2B2B2B', 
      padding: 'p-0' 
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-screen w-full overflow-hidden">
        <video preload="none" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/t%C5%82o.mp4"
        poster="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/HomepageZdjecieWTle.webp" />
        <div className="absolute inset-0 bg-black/40 z-[1]"></div>
        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-4 sm:px-8 w-full max-w-[1920px] mx-auto">
          <div className="flex flex-col items-start w-full justify-center">
            <div className="text-center w-full">
              <div className="flex flex-col items-center w-full">
                <h1 
                  className="font-bold text-white tracking-tight leading-[1.1] flex flex-col gap-1 lg:gap-2 w-full"
                  aria-label={lang === 'PL' ? "NASZ PORADNIK" : "OUR GUIDE"}
                >
                  <span className="flex flex-col items-center w-full" aria-hidden="true">
                    {/* Mobile Layout (Stacked & Centered) */}
                    <div className="flex sm:hidden flex-col w-full items-center -mt-2">
                      <div 
                        className="text-[clamp(7.5rem,22vw,32rem)] font-humane font-bold text-white leading-[0.75] uppercase tracking-[0.005em] relative text-center w-full"
                        style={{ marginBottom: 'calc(-0.04em + 10px)' }}
                      >
                        <span className="whitespace-nowrap">{lang === 'PL' ? 'NASZ' : 'OUR'}</span>
                      </div>
                      <div 
                        className="text-[clamp(7.5rem,22vw,32rem)] font-humane font-bold text-white leading-[0.75] uppercase tracking-[0.005em] relative text-center w-full"
                        style={{ paddingTop: 'calc(0.04em + 10px)' }}
                      >
                        <span className="whitespace-nowrap">{lang === 'PL' ? 'PORADNIK' : 'GUIDE'}</span>
                      </div>
                    </div>

                    {/* PC Layout (One Line) */}
                    <div className="hidden sm:flex flex-row justify-center items-center w-full">
                      <div 
                        className="text-[clamp(7.5rem,22vw,32rem)] sm:text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold text-white leading-[0.75] uppercase tracking-[0.005em] relative whitespace-nowrap"
                      >
                        {lang === 'PL' ? 'NASZ PORADNIK' : 'OUR GUIDE'}
                      </div>
                    </div>

                    {/* Description (Centered on both) */}
                    <div className="flex flex-col items-center gap-6 pb-4 sm:pb-[2vw] w-full mt-8 sm:mt-12 lg:mt-16">
                      <div className="w-full flex flex-col items-center">
                        <div className="w-20 h-[1px] bg-white/30 mb-4" />
                        <div 
                          className="font-inter-tight text-slate-200 uppercase text-center break-words max-w-[45ch]"
                          style={{ 
                            fontSize: 'clamp(0.6rem, 0.4rem + 0.8vw, 1.6rem)',
                            letterSpacing: '0.05em',
                            fontWeight: '300',
                            lineHeight: '1.2'
                          }}
                        >
                          {lang === 'PL' ? 'Wiedza, trendy i wskazówki ze świata web designu, e-commerce i marketingu.' : 'Knowledge, trends and tips from the world of web design, e-commerce and marketing.'}
                        </div>
                      </div>
                    </div>
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="articles__wrapper" style={{
        position: 'relative',
        paddingInline: '1.875rem',
        paddingBlock: '10.625rem',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '5.625rem'
      }}>
        {articles.map((article, index) => (
          <div key={index} className="flex flex-col lg:flex-row items-start w-full border-b border-white/10 pb-12 last:border-0 gap-8 lg:gap-16">
            <div className={`w-full lg:w-5/12 shrink-0 overflow-hidden rounded-3xl flex items-center justify-center ${(article as any).padding || 'p-8'}`} style={{ backgroundColor: (article as any).bgColor || '#2B2B2B' }}>
              <img loading="lazy" 
                src={article.image} 
                alt={article.title} 
                className="w-full aspect-[4/3] object-contain hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
               width="800" height="600" />
            </div>
            
            <div className="w-full lg:w-7/12 flex flex-col items-start">
              <div style={{
                width: '100%',
                textAlign: 'left',
                fontSize: 'clamp(.75rem, .6910377358rem + .1886792453vw, .875rem)',
                fontFamily: 'Geist Mono, monospace',
                fontWeight: 300,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                paddingBottom: '1.25rem'
              }}>
                {article.date}
              </div>
              <h2 style={{
                fontWeight: 300,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                marginBottom: '1.25rem',
                maxWidth: '13.75em',
                lineHeight: 1.3,
                fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
                fontFamily: 'Inter Tight, sans-serif'
              }}>
                {article.title}
              </h2>
              <p style={{
                textTransform: 'none',
                fontWeight: 300,
                lineHeight: 1.6,
                maxWidth: '32.5em',
                paddingBottom: '1.25rem',
                fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)',
                fontFamily: 'Inter Tight, sans-serif',
                letterSpacing: '.02em'
              }}>
                {article.description}
              </p>
              <button onClick={() => onArticleClick(article.id)} style={{
                height: '4rem',
                minWidth: '15rem',
                border: '1px solid rgba(255, 255, 255, .2509803922)',
                borderRadius: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                width: 'fit-content',
                fontSize: 'clamp(.875rem, .7570754717rem + .3773584906vw, 1.125rem)',
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 300,
                lineHeight: 1.4,
                letterSpacing: '.02em',
                backgroundColor: 'transparent',
                color: 'white'
              }} className="hover:bg-white hover:text-black transition-colors">
                {lang === 'PL' ? 'Czytaj więcej' : 'Read more'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


/* --- From SeoOfferPage.tsx --- */

const getSeoProjectsData = (lang: 'PL' | 'ENG') => {
  const base = getProjectsData(lang);
  const overrides = lang === 'PL' ? [
    { title: 'Audyt SEO & Optymalizacja', description: 'Analizujemy kod i strukturę witryny, aby wyeliminować techniczne bariery blokujące roboty wyszukiwarek. Skupiamy się na poprawie szybkości ładowania, responsywności i poprawnej indeksacji wszystkich kluczowych sekcji serwisu. Wdrażamy optymalizację, która dostosowuje stronę do aktualnych standardów jakościowych. Dzięki temu witryna staje się stabilnym fundamentem pod dalsze działania marketingowe i jest lepiej oceniana przez algorytmy.', deliveryTime: 'Czas realizacji do 14 dni', buttonText: { PL: 'Zamów audyt', ENG: 'Order audit' } },
    { title: 'Pozycjonowanie Lokalne', description: 'Budujemy widoczność Twojej firmy w wynikach lokalnych oraz w Mapach Google. Dbamy o to, aby profil firmy był kompletny i wiarygodny dla użytkowników szukających usług w Twoim bezpośrednim sąsiedztwie. Skupiamy się na zapytaniach powiązanych z Twoją lokalizacją, co pomaga dotrzeć do osób realnie zainteresowanych ofertą w danym regionie. To uporządkowane działanie, które zwiększa szansę na bezpośredni kontakt klienta z Twoim biurem lub punktem.', deliveryTime: 'Pierwsze efekty po 30 dniach' },
    { title: 'SEO E-commerce & Content', description: 'Optymalizujemy strukturę sklepu tak, aby kategorie i produkty były łatwe do znalezienia zarówno dla użytkowników, jak i wyszukiwarek. Tworzymy merytoryczne treści, które odpowiadają na realne pytania klientów i pomagają im w wyborze produktu. Eliminujemy błędy techniczne typowe dla dużych platform sprzedażowych, takie jak duplikacja treści czy wolne działanie filtrów. Skupiamy się na dostarczaniu wartościowego ruchu, który ma potencjał sprzedażowy.', deliveryTime: 'Pierwsze efekty po 30 dniach' },
    { title: 'Zaawansowana Strategia SEO', description: 'Opracowujemy plan działań oparty na analizie Twojej branży i obecnej sytuacji domeny. Nie stosujemy ryzykownych metod – stawiamy na systematyczną budowę autorytetu marki poprzez techniczne wsparcie i bezpieczne linkowanie. Monitorujemy zmiany w algorytmach i na bieżąco dostosowujemy strategię, aby utrzymać stabilny rozwój widoczności. To profesjonalne podejście dla firm, które szukają przewidywalności i rzetelnie prowadzonego procesu SEO.', deliveryTime: 'Strategia długoterminowa', buttonText: { PL: 'Omów strategię', ENG: 'Discuss strategy' } }
  ] : [
    { title: 'SEO Audit & Optimization', description: 'We analyze the code and structure of the website to eliminate technical barriers blocking search engine robots. We focus on improving loading speed, responsiveness, and correct indexing of all key sections of the site. We implement optimization that adapts the site to current quality standards. Thanks to this, the website becomes a stable foundation for further marketing activities and is better evaluated by algorithms.', deliveryTime: 'Delivery up to 14 days', buttonText: { PL: 'Zamów audyt', ENG: 'Order audit' } },
    { title: 'Local Positioning', description: 'We build the visibility of your company in local results and in Google Maps. We make sure that the company profile is complete and credible for users looking for services in your immediate vicinity. We focus on queries related to your location, which helps reach people genuinely interested in the offer in a given region. This is an organized action that increases the chance of direct customer contact with your office or point.', deliveryTime: 'First effects after 30 days' },
    { title: 'E-commerce SEO & Content', description: 'We optimize the store structure so that categories and products are easy to find for both users and search engines. We create substantive content that answers real customer questions and helps them choose a product. We eliminate technical errors typical for large sales platforms, such as content duplication or slow filter operation. We focus on delivering valuable traffic that has sales potential.', deliveryTime: 'First effects after 30 days' },
    { title: 'Advanced SEO Strategy', description: 'We develop an action plan based on an analysis of your industry and the current situation of the domain. We do not use risky methods - we focus on systematically building brand authority through technical support and safe linking. We monitor changes in algorithms and adjust the strategy on an ongoing basis to maintain a stable development of visibility. This is a professional approach for companies looking for predictability and a reliably conducted SEO process.', deliveryTime: 'Long-term strategy', buttonText: { PL: 'Omów strategię', ENG: 'Discuss strategy' } }
  ];
  return base.map((p, i) => ({ ...p, ...overrides[i] }));
};

function SeoOfferPage({ onBack, onContactClick, onAskAwayClick, onStartProjectClick }: { onBack: () => void; onContactClick: () => void; onAskAwayClick: () => void; onStartProjectClick?: () => void }) {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const processStages = lang === 'PL' ? [
    {
      id: '01',
      title: 'Audyt & Strategia',
      paragraphs: [
        "Dogłębnie analizujemy Twoją witrynę pod kątem technicznym i treściowym. Sprawdzamy, na jakie frazy widoczna jest konkurencja i gdzie leży Twój potencjał.",
        "Efektem jest szczegółowy plan działań (Roadmap), który krok po kroku prowadzi do wyższych pozycji w Google.",
        "Dobieramy słowa kluczowe, które realnie przekładają się na zapytania i sprzedaż."
      ]
    },
    {
      id: '02',
      title: 'Optymalizacja On-Page',
      paragraphs: [
        "Wdrażamy zmiany techniczne: poprawiamy szybkość ładowania, strukturę nagłówków, meta tagi i linkowanie wewnętrzne.",
        "Optymalizujemy treści tak, aby były przyjazne zarówno dla robotów Google, jak i dla użytkowników.",
        "Dbamy o to, aby Twoja strona była w pełni zrozumiała dla algorytmów wyszukiwarki."
      ]
    },
    {
      id: '03',
      title: 'Content & Link Building',
      paragraphs: [
        "Tworzymy wartościowe treści, które budują Twój autorytet w branży. Pozyskujemy wysokiej jakości linki z zaufanych serwisów zewnętrznych.",
        "Działamy etycznie (White Hat SEO), dbając o długofalowe i stabilne wyniki Twojej domeny.",
        "Budujemy profil linkowy, który wzmacnia siłę Twojej strony w oczach Google."
      ]
    },
    {
      id: '04',
      title: 'Monitoring & Raportowanie',
      paragraphs: [
        "Stale monitorujemy pozycje Twoich słów kluczowych i ruch na stronie. Analizujemy dane i na ich podstawie wprowadzamy kolejne optymalizacje.",
        "Otrzymujesz od nas comiesięczne raporty, w których czarno na białym widzisz postępy i wzrost widoczności.",
        "SEO to proces – my dbamy o to, abyś zawsze był o krok przed konkurencją."
      ]
    }
  ] : [
    {
      id: '01',
      title: 'Audit & Strategy',
      paragraphs: [
        "We deeply analyze your site in terms of technical and content aspects. We check which phrases the competition is visible for and where your potential lies.",
        "The result is a detailed action plan (Roadmap) that leads step by step to higher positions in Google.",
        "We select keywords that realistically translate into inquiries and sales."
      ]
    },
    {
      id: '02',
      title: 'On-Page Optimization',
      paragraphs: [
        "We implement technical changes: we improve loading speed, heading structure, meta tags, and internal linking.",
        "We optimize content so that it is friendly to both Google robots and users.",
        "We make sure your site is fully understandable to search engine algorithms."
      ]
    },
    {
      id: '03',
      title: 'Content & Link Building',
      paragraphs: [
        "We create valuable content that builds your authority in the industry. We acquire high-quality links from trusted external services.",
        "We act ethically (White Hat SEO), taking care of the long-term and stable results of your domain.",
        "We build a link profile that strengthens your site's power in the eyes of Google."
      ]
    },
    {
      id: '04',
      title: 'Monitoring & Reporting',
      paragraphs: [
        "We constantly monitor your keyword positions and site traffic. We analyze data and implement further optimizations based on it.",
        "You receive monthly reports from us, in which you see progress and visibility growth in black and white.",
        "SEO is a process – we make sure you are always one step ahead of the competition."
      ]
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = lang === 'PL' ? [
    {
      question: "Jak długo trzeba czekać na pierwsze efekty SEO?",
      answer: "SEO to proces długofalowy. Pierwsze zmiany w indeksowaniu (po Audycie i Optymalizacji) zobaczysz już po 2-4 tygodniach. Jednak realny wzrost ruchu i pozycji, który przekłada się na sprzedaż, następuje zazwyczaj po 3-6 miesiącach regularnych działań. Wszystko zależy od konkurencyjności branży i historii Twojej domeny."
    },
    {
      question: "Czy gwarantujecie 1. miejsce w Google?",
      answer: "Nikt, kto działa etycznie, nie może dać 100% gwarancji na konkretną pozycję, ponieważ algorytmy Google zmieniają się codziennie. Gwarantujemy natomiast skuteczne wdrożenie strategii, która systematycznie podnosi widoczność strony, zwiększa autorytet domeny i realnie przybliża Cię do topowych wyników na najważniejsze frazy sprzedażowe."
    },
    {
      question: "Czym różni się SEO od Google Ads (płatnych reklam)?",
      answer: "Google Ads to natychmiastowa widoczność, ale płacisz za każde kliknięcie – gdy budżet się kończy, znikasz. SEO (Pozycjonowanie) to budowanie trwałego kapitału. Raz wypracowane wysokie pozycje generują darmowy, wartościowy ruch przez całą dobę, nawet jeśli na chwilę wstrzymasz działania."
    },
    {
      question: "Czy muszę stale płacić za SEO (abonament)?",
      answer: "Audyt techniczny jest jednorazowy, ale pozycjonowanie to ciągły wyścig. Twoja konkurencja nie śpi i stale publikuje nowe treści oraz zdobywa linki. Miesięczny abonament pozwala nam na stałe monitorowanie zmian, regularny Link Building i dostosowywanie strony do aktualizacji algorytmów Google, co chroni Cię przed spadkami."
    },
    {
      question: "Co jeśli moja strona jest zupełnie nowa?",
      answer: "Dla nowych stron kluczowy jest startowy Audyt & Optymalizacja. Nowe domeny potrzebują czasu na zdobycie zaufania Google (tzw. Sandbox). Zaczynamy od budowania solidnego fundamentu technicznego i bezpiecznego pozyskiwania linków, aby jak najszybciej wyprowadzić stronę z cienia konkurencji."
    },
    {
      question: "Skąd będę wiedzieć, że pozycjonowanie działa?",
      answer: "Co miesiąc otrzymasz od nas czytelny raport. Nie interesują nas puste wykresy – skupiamy się na realnych wskaźnikach: wzroście widoczności na kluczowe frazy, przyroście ruchu organicznego oraz (w pakiecie E-commerce) monitorowaniu Twoich zysków. Wszystkie dane pochodzą bezpośrednio z Google Search Console i narzędzi analitycznych."
    },
    {
      question: "Czy SEO w wersji Lokalnej wystarczy dla mojego biznesu?",
      answer: "Jeśli prowadzisz firmę usługową (np. salon, warsztat, biuro) i Twoimi klientami są mieszkańcy konkretnego miasta – tak. Skupiamy się wtedy na Optymalizacji Wizytówki Google i frazach lokalnych, co jest tańsze i daje szybszy zwrot z inwestycji niż walka o frazy ogólnopolskie."
    }
  ] : [
    {
      question: "How long do I have to wait for the first SEO effects?",
      answer: "SEO is a long-term process. You will see the first changes in indexing (after the Audit and Optimization) after 2-4 weeks. However, real growth in traffic and positions, which translates into sales, usually occurs after 3-6 months of regular activities. It all depends on the competitiveness of the industry and the history of your domain."
    },
    {
      question: "Do you guarantee 1st place in Google?",
      answer: "No one who acts ethically can give a 100% guarantee for a specific position, because Google algorithms change daily. We guarantee, however, the effective implementation of a strategy that systematically increases the visibility of the site, increases domain authority, and realistically brings you closer to top results for the most important sales phrases."
    },
    {
      question: "What is the difference between SEO and Google Ads (paid ads)?",
      answer: "Google Ads is immediate visibility, but you pay for every click – when the budget ends, you disappear. SEO (Positioning) is building lasting capital. Once developed, high positions generate free, valuable traffic around the clock, even if you pause activities for a while."
    },
    {
      question: "Do I have to pay for SEO constantly (subscription)?",
      answer: "A technical audit is one-time, but positioning is a constant race. Your competition doesn't sleep and constantly publishes new content and gains links. A monthly subscription allows us to constantly monitor changes, regular Link Building, and adapt the site to Google algorithm updates, which protects you from drops."
    },
    {
      question: "What if my site is completely new?",
      answer: "For new sites, the starting Audit & Optimization is key. New domains need time to gain Google's trust (so-called Sandbox). We start by building a solid technical foundation and safe link acquisition to bring the site out of the competition's shadow as quickly as possible."
    },
    {
      question: "How will I know that positioning works?",
      answer: "Every month you will receive a clear report from us. We are not interested in empty charts – we focus on real indicators: growth in visibility for key phrases, increase in organic traffic, and (in the E-commerce package) monitoring your profits. All data comes directly from Google Search Console and analytical tools."
    },
    {
      question: "Is Local SEO enough for my business?",
      answer: "If you run a service company (e.g., salon, workshop, office) and your customers are residents of a specific city – yes. We then focus on Google Business Profile Optimization and local phrases, which is cheaper and gives a faster return on investment than fighting for nationwide phrases."
    }
  ];

  return (
    <div className="relative z-40 bg-black text-white min-h-screen">
      <div className="absolute inset-0 z-0 h-[200vh] pointer-events-none overflow-hidden">
        <video preload="none" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60"
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/t%C5%82o.mp4"
        poster="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/HomepageZdjecieWTle.webp" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="fixed top-8 left-4 md:top-12 md:left-12 z-50">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pt-40 lg:pt-48 pb-16 lg:pb-12 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
            <div 
              className="font-inter-tight text-white max-w-[15em]"
              style={{ 
                lineHeight: '1', 
                fontWeight: '300',
                fontSize: 'clamp(1.75rem, 1.5rem + 2vw, 3.5rem)'
              }}
            >
              {lang === 'PL' ? 'Kompleksowe działania SEO, które wynoszą Twoją markę na szczyt wyników wyszukiwania.' : 'Comprehensive SEO activities that take your brand to the top of search results.'}
            </div>

            <div 
              className="font-inter-tight text-slate-300 lg:max-w-[35em]"
              style={{ 
                fontSize: 'clamp(1rem, .735915493rem + .8450704225vw, 1.75rem)',
                letterSpacing: '-.01em',
                fontWeight: '300'
              }}
            >
              <p className="mb-8">
                {lang === 'PL' ? 'Optymalizujemy strukturę i kod strony tak, aby była w pełni zrozumiała dla algorytmów Google. Skupiamy się na technicznych fundamentach i treściach, które budują trwały autorytet Twojej domeny.' : 'High positions in Google are not an accident. It is the result of precise technical optimization, valuable content, and a strong link profile.'}
              </p>
              <p>
                {lang === 'PL' ? 'Zamiast ryzykownych metod, stawiamy na stabilną widoczność na kluczowe dla Twojego biznesu frazy. To proces, który systematycznie zwiększa darmowy, wysokiej jakości ruch w Twoim serwisie.' : 'We help companies become leaders in their industry by delivering free, high-quality organic traffic that turns into loyal customers.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <ServicesGrid projectsData={getSeoProjectsData(lang)} onContactClick={onContactClick} />

      <section className="relative z-10 w-full bg-white text-black">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-[6.25rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 items-center">
            <h2 className="text-black font-normal leading-[1.2] max-w-[12em] font-inter-tight" style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)' }}>
              {lang === 'PL' ? 'SEO to maraton, nie sprint. Ale to maraton, który wygrywa się dzięki precyzyjnej strategii i konsekwencji.' : 'SEO is a marathon, not a sprint. But it\'s a marathon won through precise strategy and consistency.'}
            </h2>
            <div className="text-[#363636] lg:col-start-2 max-w-[27.5em] lg:ml-auto font-inter-tight font-normal leading-[1.2] tracking-[.02em]" style={{ fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)' }}>
              {lang === 'PL' ? 'Nie obiecujemy cudów z dnia na dzień. Obiecujemy rzetelną pracę nad Twoją widocznością, która z każdym miesiącem będzie przynosić coraz więcej wartościowych wejść na stronę. Budujemy Twój najcenniejszy zasób w internecie.' : 'We don\'t promise miracles overnight. We promise reliable work on your visibility, which will bring more and more valuable site visits every month. We build your most valuable asset on the internet.'}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 pt-0 pb-32 bg-white">
        <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
          <h2 className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold text-black leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full">
            <span className="sm:hidden flex flex-col items-end text-right w-full">
              <span>{lang === 'PL' ? <>ZOBACZ<br />PROCES.</> : <>SEE THE<br />PROCESS.</>}</span>
              <div className="flex flex-col items-start text-left w-[90%]" style={{ position: 'relative', paddingTop: '2.3125rem' }}>
                <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2, textTransform: 'none', letterSpacing: 'normal' }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                <span className="mt-2 text-left" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 300, letterSpacing: '.2em', textTransform: 'uppercase', lineHeight: 1.5, maxWidth: '280px' }}>{lang === 'PL' ? 'Nasze kroki do Twojej dominacji w wyszukiwarce.' : 'Our steps to your search engine dominance.'}</span>
              </div>
            </span>
            <span className="hidden sm:inline-grid text-left">
              <span className="invisible col-start-1 row-start-1 select-none whitespace-pre" aria-hidden="true">{lang === 'PL' ? 'TWORZYMY TO' : 'WE CREATE IT'}</span>
              <span className="col-start-1 row-start-1 flex flex-col w-full">
                <span className="text-left">{lang === 'PL' ? 'ZOBACZ' : 'SEE THE'}</span>
                <span className="flex justify-between items-center w-full">
                  <div className="text-left flex flex-col">
                    <span style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)', fontFamily: 'Inter Tight, sans-serif', fontWeight: 700, lineHeight: 1.2, textTransform: 'none', letterSpacing: 'normal' }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                    <span className="mt-2" style={{ fontSize: '.75rem', fontFamily: 'Geist Mono, monospace', fontWeight: 300, letterSpacing: '.2em', textTransform: 'uppercase', maxWidth: '280px', lineHeight: 1.5 }}>{lang === 'PL' ? 'Nasze kroki do Twojej dominacji w wyszukiwarce.' : 'Our steps to your search engine dominance.'}</span>
                  </div>
                  <span className="text-right">{lang === 'PL' ? 'PROCES.' : 'PROCESS.'}</span>
                </span>
              </span>
            </span>
          </h2>
        </div>
      </section>

      <section className="relative w-full bg-white text-black z-10">
        {processStages.map((stage, index) => (
          <div key={stage.id} className="sticky top-[72px] h-[calc(100vh-72px)] w-full bg-white flex flex-col" style={{ zIndex: 20 + index }}>
            <div className="max-w-[100rem] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex flex-col">
              <div className="w-full h-[1px] bg-black/10" />
              <div className="flex-1 flex flex-col justify-center py-12 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <h2 className="text-[clamp(3rem,10vw,8rem)] font-bold font-inter-tight leading-none tracking-tighter">{stage.title}</h2>
                  <div className="space-y-8 max-w-[35em] lg:ml-auto">
                    {stage.paragraphs.map((p, i) => (
                      <p key={i} className="text-[clamp(1rem,1.2vw,1.375rem)] font-inter-tight font-normal leading-relaxed text-[#363636]">{p}</p>
                    ))}
                  </div>
                </div>
                <div className="mt-auto flex items-end justify-between pb-8">
                  <span className="text-sm font-mono text-black/40">{stage.id}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-white py-[6.25rem] lg:py-[12.5rem]">
        <div className="mx-[1.875rem] flex flex-col lg:flex-row justify-between gap-12 lg:gap-[2rem]">
          <div className="lg:w-[480px]">
            <div className="lg:sticky lg:top-[100px] bg-[#F3DEFF] p-[1.5625rem] rounded-[20px] h-fit">
              <h2 className="text-[2.5rem] lg:text-[3.2rem] font-inter-tight font-normal leading-[1.05] mb-6 text-black">{lang === 'PL' ? 'Zbuduj trwałą widoczność w Google' : 'Build Lasting Visibility in Google'}</h2>
              <p className="text-black/60 text-lg mb-10">{lang === 'PL' ? 'Twoi klienci już Cię szukają. Pozwól im się znaleźć.' : 'Your customers are already looking for you. Let them find you.'}</p>
              <button onClick={onAskAwayClick} className="bg-white/20 hover:bg-white/30 text-black px-8 py-4 rounded-full transition-colors text-sm font-medium border border-black/10">{lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}</button>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              {faqItems.map((item, index) => (
                <div key={index} className="border-t border-[#d9d9d9] last:border-b">
                  <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full py-8 flex justify-between items-center text-left group">
                    <span className="text-xl lg:text-2xl font-inter-tight font-normal text-black pr-8">{item.question}</span>
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 flex items-center justify-center relative">
                        <motion.div animate={{ rotate: openIndex === index ? 90 : 0 }} className="absolute w-4 h-[1px] bg-black" />
                        <motion.div animate={{ rotate: openIndex === index ? 0 : 90 }} className="absolute w-4 h-[1px] bg-black" />
                      </div>
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                        <div className="pb-8 text-black/60 text-lg leading-relaxed max-w-[800px]">{item.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-white text-black flex flex-col items-center justify-between p-6 relative overflow-hidden">
        <div className="h-20 w-full"></div>
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden -translate-y-20 sm:translate-y-0">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible scale-[1.4] sm:scale-100">
            <path id="curve-bottom-offer-seo" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
            <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <motion.textPath xlinkHref="#curve-bottom-offer-seo" animate={{ startOffset: ["0%", "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="text-[100px] sm:text-[150px] font-bold text-black uppercase tracking-[0.01em] fill-black font-bebas">
                {lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "GET IN TOUCH GET IN TOUCH GET IN TOUCH GET IN TOUCH GET IN TOUCH GET IN TOUCH "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
          <span className="text-black/60 text-sm tracking-widest uppercase">{lang === 'PL' ? 'KONTAKT' : 'CONTACT'}</span>
          <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">
            {lang === 'PL' ? 'Gotów, by zwiększyć swoje zasięgi?' : 'Ready to dominate the search engine?'}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={onStartProjectClick || onContactClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">
              {lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}
            </button>
            <button onClick={onAskAwayClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">
              {lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}
            </button>
          </div>
        </div>
        <footer className="w-full flex justify-between items-end z-20 pb-4">
          <div className="text-sm">
            <p className="font-bold">POLAND</p>
            <p className="text-black/60">{lang === 'PL' ? 'Lubelskie, Lublin - Tutaj jesteśmy. Działamy na całym świecie.' : 'Lubelskie, Lublin - We are here. We operate worldwide.'}</p>
          </div>
          <div className="w-32"></div>
        </footer>
      </section>
    </div>
  );
}


/* --- From StartProjectPage.tsx --- */

function StartProjectPage({ onBack, initialStep = 1, onStepChange }: { onBack: () => void, initialStep?: number, onStepChange?: (step: number) => void }) {
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
        <video preload="none" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60"
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/t%C5%82o.mp4"
        poster="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/HomepageZdjecieWTle.webp" />
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


/* --- From WebsitesOfferPage.tsx --- */

interface ProjectData {
  id: string;
  deliveryTime: string;
  title: string;
  description: string;
  bgImage: string;
  fgImage: string;
  videoUrl?: string;
  points?: string[];
  buttonText?: { PL: string, ENG: string };
}

var getProjectsDataEcommerce = (lang: "PL" | "ENG"): ProjectData[] => [
  {
    id: '01',
    deliveryTime: lang === 'PL' ? 'Czas realizacji do 48 godzin' : 'Delivery up to 48 hours',
    title: lang === 'PL' ? 'Profesjonalne Wizytówki Biznesowe' : 'Professional Business Showcases',
    description: lang === 'PL' 
      ? 'Czysta forma. Skoncentrowane na estetyce i konwersji serwisy, które budują natychmiastowy autorytet. To najlepszy wybór dla specjalistów i firm, gdzie liczy się doskonałe pierwsze wrażenie oraz błyskawiczny kontakt z klientem. Skupiamy się na nowoczesnym designie, który od progu mówi o wysokiej jakości Twoich usług.' 
      : 'Pure form. Focused on aesthetics and conversion, websites that build immediate authority. This is the best choice for specialists and companies where a perfect first impression and instant contact with the client count. We focus on modern design that speaks of the high quality of your services right from the threshold.',
    bgImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/Wideo3.mp4',
  },
  {
    id: '02',
    deliveryTime: lang === 'PL' ? 'Czas realizacji do 7 dni' : 'Delivery up to 7 days',
    title: lang === 'PL' ? 'Rozbudowane Strony Firmowe' : 'Extensive Corporate Websites',
    description: lang === 'PL' 
      ? 'Twoja oferta w pełnej skali. Tworzymy rozbudowane serwisy dla firm, które muszą pomieścić szeroką ofertę i dziesiątki podstron bez utraty szybkości. To rozwiązanie premium, gdzie każdy detal techniczny wspiera Twój profesjonalizm i ułatwia klientowi podjęcie decyzji. Idealne, gdy potrzebujesz solidnej platformy, która rośnie razem z Twoją skalą i buduje trwałą przewagę na rynku.' 
      : 'Your offer at full scale. We create extensive websites for companies that need to accommodate a wide range of services and dozens of subpages without losing speed. This is a premium solution where every technical detail supports your professionalism and makes it easier for the client to make a decision. Ideal when you need a solid platform that grows with your scale and builds a lasting market advantage.',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    videoUrl: '/Wideo1.webm',
  },
  {
    id: '03',
    deliveryTime: lang === 'PL' ? 'Czas realizacji do 21 dni' : 'Delivery up to 21 days',
    title: lang === 'PL' ? 'Strony Interaktywne 3D' : 'Interactive 3D Websites',
    description: lang === 'PL' 
      ? 'Nowy wymiar interakcji. Tworzymy zaawansowane serwisy wykorzystujące grafikę 3D i animacje, które całkowicie angażują użytkownika. To propozycja dla marek premium i innowacyjnych projektów, które chcą wyznaczać standardy i zapaść w pamięć na długo. Łączymy artystyczną wizję z najnowszą technologią, tworząc cyfrowe doświadczenie obok którego nie da się przejść obojętnie.' 
      : 'A new dimension of interaction. We create advanced websites using 3D graphics and animations that fully engage the user. This is a proposition for premium brands and innovative projects that want to set standards and be remembered for a long time. We combine artistic vision with the latest technology, creating a digital experience that cannot be ignored.',
    bgImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/Wideo2.mp4',
  },
  {
    id: '04',
    deliveryTime: lang === 'PL' ? 'Czas realizacji ustalany indywidualnie' : 'Delivery time set individually',
    title: lang === 'PL' ? 'Dedykowane Portale & Systemy' : 'Dedicated Portals & Systems',
    description: lang === 'PL' 
      ? 'Zaawansowane portale i systemy internetowe zdolne obsłużyć masowy ruch i skomplikowane procesy biznesowe. To rozwiązanie dla projektów wymagających pełnej personalizacji, automatyzacji procesów, bezpiecznych baz danych oraz stabilnych integracji z zewnętrznymi narzędziami. W tej architekturze nie ma limitów co do funkcji czy stopnia rozbudowania – realizujemy każde, nawet najbardziej specyficzne wymaganie techniczne.' 
      : 'Advanced portals and web systems capable of handling mass traffic and complex business processes. This is a solution for projects requiring full personalization, process automation, secure databases, and stable integrations with external tools. In this architecture, there are no limits to functions or the degree of expansion - we implement every, even the most specific technical requirement.',
    bgImage: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2000&auto=format&fit=crop',
    fgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    videoUrl: 'https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/Wideo4.mp4',
  }
];

function LatestProjectsOffer({ projectsData, onContactClick, onProjectClick }: { projectsData: ProjectData[], onContactClick: () => void, onProjectClick?: (id: string) => void }) {
  const { lang } = useLanguage();

  return (
    <div id="portfolio-websites" className="relative z-20 bg-black text-white pt-32 sm:pt-48 lg:pt-64 pb-32 sm:pb-48 lg:pb-64 overflow-hidden">
      <div className="max-w-[110rem] mx-auto px-6 sm:px-12 lg:px-16 space-y-48 sm:space-y-64 lg:space-y-80">
        {projectsData.map((project, index) => {
          const isReversed = index % 2 !== 0;
          
          return (
            <div 
              key={project.id} 
              className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-24`}
            >
              {/* Text Side */}
              <div className="w-full lg:w-[40%] flex flex-col items-start">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col gap-4 sm:gap-6"
                >
                  <h3 className="text-white text-[clamp(2.5rem,4vw,5rem)] font-inter-tight font-normal leading-[1.05] tracking-tight">
                    {project.title}
                  </h3>
                  <div className="text-[#F3DEFF] text-xs sm:text-sm tracking-[0.2em] uppercase font-bold">
                    {project.deliveryTime}
                  </div>
                  <p className="text-white/60 text-lg sm:text-xl font-inter-tight font-normal leading-relaxed max-w-md">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onContactClick}
                      className="hidden lg:block px-8 py-4 bg-white text-black font-inter-tight font-medium rounded-full hover:bg-white/90 transition-colors text-sm sm:text-base w-fit"
                    >
                      {project.buttonText ? project.buttonText[lang] : (lang === 'PL' ? 'Wycena w 30 min' : 'Quote in 30 min')}
                    </motion.button>
                    <motion.button
                      onClick={() => onProjectClick && onProjectClick(project.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="hidden lg:block px-8 py-4 bg-white/10 text-white border border-white/20 font-inter-tight font-medium rounded-full hover:bg-white/20 transition-colors text-sm sm:text-base w-fit backdrop-blur-sm"
                    >
                      {lang === 'PL' ? 'Zobacz ten projekt' : 'See this project'}
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Image Side */}
              <div className="w-full lg:w-[60%] flex flex-col gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <div className="relative aspect-video overflow-hidden group rounded-3xl">
                    {project.videoUrl ? (
                      <video preload="none" 
                        src={project.videoUrl}
                        autoPlay 
                        loop={project.id !== '02'} 
                        muted 
                        playsInline 
                        className={`w-full h-full object-cover ${project.id === '02' ? 'scale-[1.05]' : ''}`}
                        onTimeUpdate={(e) => {
                          if (project.id === '02') {
                            const v = e.target as HTMLVideoElement;
                            if (v.duration && v.currentTime >= v.duration - 0.15) {
                              v.currentTime = 0;
                              v.play();
                            }
                          }
                        }}
                      />
                    ) : (
                      <img loading="lazy" 
                        src={project.fgImage} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-[2000ms]"
                       width="1920" height="1080" />
                    )}
                  </div>
                </motion.div>

                {/* Mobile Buttons */}
                <div className="lg:hidden flex flex-col gap-3 w-full">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onContactClick}
                    className="w-full px-8 py-4 bg-white text-black font-inter-tight font-medium rounded-full hover:bg-white/90 transition-colors text-sm sm:text-base"
                  >
                    {project.buttonText ? project.buttonText[lang] : (lang === 'PL' ? 'Wycena w 30 min' : 'Quote in 30 min')}
                  </motion.button>
                  <motion.button
                    onClick={() => onProjectClick && onProjectClick(project.id)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-white/10 text-white border border-white/20 font-inter-tight font-medium rounded-full hover:bg-white/20 transition-colors text-sm sm:text-base backdrop-blur-sm"
                  >
                    {lang === 'PL' ? 'Zobacz ten projekt' : 'See this project'}
                  </motion.button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

var ServicesGrid = function ({ projectsData, onContactClick }: { projectsData: ProjectData[], onContactClick: () => void }) {
  const { lang } = useLanguage();

  return (
    <div id="portfolio-services" className="relative z-20 bg-black text-white pt-24 sm:pt-32 lg:pt-48 pb-24 sm:pb-32 lg:pb-48 overflow-hidden">
      <div className="max-w-[110rem] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-20 sm:gap-y-24 lg:gap-y-32 gap-x-12 lg:gap-x-24">
          {projectsData.map((project) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4 sm:gap-6"
            >
              <h3 className="text-white text-[clamp(2.5rem,3vw,4rem)] font-inter-tight font-normal leading-[1.05] tracking-tight lg:min-h-[8rem] lg:flex lg:items-end">
                {project.title}
              </h3>
              <div className="text-[#F3DEFF] text-xs sm:text-sm tracking-[0.2em] uppercase font-bold lg:min-h-[3rem] lg:flex lg:items-center">
                {project.deliveryTime}
              </div>
              <p className="text-white/80 text-[1rem] sm:text-lg lg:text-xl font-inter-tight font-normal leading-relaxed lg:min-h-[12rem]">
                {project.description}
              </p>
              {project.points && (
                <ul className="flex flex-col gap-2 mt-2 flex-grow">
                  {project.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-white/60 text-[0.9rem] sm:text-base font-inter-tight font-normal">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F3DEFF]" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-4 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onContactClick}
                  className="px-8 py-4 bg-white text-black font-inter-tight font-medium rounded-full hover:bg-white/90 transition-colors text-sm sm:text-base w-fit"
                >
                  {project.buttonText ? project.buttonText[lang] : (lang === 'PL' ? 'Wycena w 30 min' : 'Quote in 30 min')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WebsitesOfferPage({ onBack, onContactClick, onAskAwayClick, onStartProjectClick, onProjectClick }: { onBack: () => void; onContactClick: () => void; onAskAwayClick: () => void; onStartProjectClick?: () => void; onProjectClick?: (id: string) => void }) {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const processStages = lang === 'PL' ? [
    {
      id: '01',
      title: 'Strategia & Planowanie',
      paragraphs: [
        "Od początku łączymy nasze działania z Twoimi celami biznesowymi i wymaganiami technicznymi. Badamy, jak zachowują się Twoi klienci i co robi konkurencja, aby wyznaczyć jasny kierunek.",
        "Efektem jest dokładny plan pracy, który określa zakres projektu i sposób, w jaki strona ma na siebie zarabiać.",
        "Dzięki temu masz pewność, że wdrożenie przyniesie mierzalne zyski."
      ]
    },
    {
      id: '02',
      title: 'Projektowanie UX/UI',
      paragraphs: [
        "Na bazie strategii tworzymy makiety i wygląd strony idealnie dopasowane do Twojej marki i planów rozwoju. Każdy element projektujemy od zera – unikamy gotowych szablonów i krótkotrwałych trendów, które za chwilę mogą być nieaktualne.",
        "Skupiamy się na tym, jak realnie zachowują się użytkownicy, aby ułatwić im zakup lub kontakt.",
        "Wspólnie dopracowujemy każdy detal, aż uzyskamy produkt gotowy do skutecznego działania i rozwoju."
      ]
    },
    {
      id: '03',
      title: 'Realizacja',
      paragraphs: [
        "Zatwierdzone projekty zamieniamy w czysty i łatwy w obsłudze kod, który będzie sprawnie działał przez lata. Część wizualną budujemy precyzyjnie, dbając o szybkość działania i wygodę na telefonach oraz komputerach.",
        "Od strony technicznej wdrażamy stabilny system do zarządzania treścią (CMS) i solidne fundamenty, które pozwolą Ci w przyszłości łatwo rozwijać ofertę i prowadzić marketing."
      ]
    },
    {
      id: '04',
      title: 'Start & Rozwój',
      paragraphs: [
        "Zajmujemy się całym procesem uruchomienia strony tak, aby odbyło się to bez żadnych przerw w jej działaniu.",
        "Po starcie dbamy o bezpieczeństwo, szybkość i stałe wsparcie techniczne.",
        "Działamy jako Twój partner na lata – analizujemy dane i wprowadzamy poprawki, które mają na celu stały wzrost Twoich dochodów."
      ]
    }
  ] : [
    {
      id: '01',
      title: 'Strategy & Planning',
      paragraphs: [
        "From the beginning, we connect our actions with your business goals and technical requirements. We research how your customers behave and what the competition is doing to set a clear direction.",
        "The result is a detailed work plan that defines the scope of the project and how the website is supposed to earn for itself.",
        "Thanks to this, you can be sure that the implementation will bring measurable profits."
      ]
    },
    {
      id: '02',
      title: 'UX/UI Design',
      paragraphs: [
        "Based on the strategy, we create mockups and the appearance of the website perfectly matched to your brand and development plans. We design every element from scratch – we avoid ready-made templates and short-term trends that may soon be outdated.",
        "We focus on how users actually behave to make it easier for them to purchase or contact.",
        "Together we refine every detail until we get a product ready for effective operation and development."
      ]
    },
    {
      id: '03',
      title: 'Implementation',
      paragraphs: [
        "We turn approved projects into clean and easy-to-use code that will work efficiently for years. We build the visual part precisely, ensuring speed and convenience on phones and computers.",
        "From the technical side, we implement a stable content management system (CMS) and solid foundations that will allow you to easily develop your offer and conduct marketing in the future."
      ]
    },
    {
      id: '04',
      title: 'Launch & Development',
      paragraphs: [
        "We handle the entire process of launching the website so that it takes place without any interruptions in its operation.",
        "After the launch, we take care of security, speed, and constant technical support.",
        "We act as your partner for years – we analyze data and introduce corrections aimed at the constant growth of your income."
      ]
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = lang === 'PL' ? [
    {
      question: "Dlaczego warto zainwestować w projekt indywidualny zamiast szablonu?",
      answer: "Indywidualny projekt to brak ograniczeń technicznych i unikalność, której nie daje szablon używany przez tysiące innych firm. Strona \"szyta na miarę\" jest szybsza, bezpieczniejsza i lepiej dostosowana do Twoich konkretnych procesów sprzedażowych. To narzędzie pracy, które rośnie wraz z Twoją firmą."
    },
    {
      question: "Ile kosztuje stworzenie profesjonalnej strony internetowej?",
      answer: "Cena zależy od stopnia skomplikowania projektu, liczby podstron oraz wymaganych funkcji technicznych. Każda nasza realizacja jest wyceniana indywidualnie, ponieważ tworzymy rozwiązania od zera, a nie na gotowych szablonach. Przygotowujemy ofertę tak, aby inwestycja zwróciła się poprzez skuteczną sprzedaż i pozyskiwanie klientów."
    },
    {
      question: "Ile trwa proces budowy strony od projektu do uruchomienia?",
      answer: "Standardowy proces zajmuje zazwyczaj od kilku godzin do kilku tygodni. Czas ten obejmuje fazę planowania, projektowania graficznego (UX/UI), kodowania oraz testów. Dokładny harmonogram dostarczamy na samym początku współpracy, abyś mógł zaplanować swoje działania marketingowe z wyprzedzeniem."
    },
    {
      question: "Czy nowa strona będzie widoczna w wyszukiwarce Google?",
      answer: "Tak. Każdą stronę budujemy zgodnie z aktualnymi wytycznymi SEO. Dbamy o czysty kod, szybkość ładowania oraz odpowiednią strukturę nagłówków i treści. To solidny fundament, który ułatwia robotom Google indeksowanie witryny i pozwala skutecznie walczyć o wysokie pozycje w wynikach wyszukiwania."
    },
    {
      question: "Czy otrzymam dostęp do edycji treści na stronie?",
      answer: "Oczywiście. Po zakończeniu prac otrzymasz dostęp do intuicyjnego panelu zarządzania (CMS). Dzięki niemu samodzielnie i bez wiedzy technicznej zmienisz teksty, dodasz nowe zdjęcia czy wpisy na blogu. Przed oddaniem projektu przeprowadzamy krótkie szkolenie, aby obsługa strony była dla Ciebie w pełni zrozumiała."
    },
    {
      question: "Co się stanie, jeśli po starcie strony będę potrzebować zmian?",
      answer: "Zapewniamy pełną opiekę powdrożeniową. Możesz liczyć na nasze wsparcie techniczne oraz stały rozwój witryny. Jako Twój partner biznesowy analizujemy, jak użytkownicy korzystają ze strony i na tej podstawie proponujemy optymalizacje, które jeszcze bardziej zwiększą jej skuteczność."
    },
    {
      question: "Czy zajmujecie się także hostingiem i domeną?",
      answer: "Pomagamy w całym procesie technicznym. Doradzamy przy wyborze szybkiego serwera i rejestracji domeny, a następnie konfigurujemy wszystko tak, aby strona działała bezawaryjnie. Możemy przejąć pełne zarządzanie infrastrukturą, abyś Ty mógł skupić się wyłącznie na prowadzeniu biznesu."
    }
  ] : [
    {
      question: "Why is it worth investing in an individual project instead of a template?",
      answer: "An individual project means no technical limitations and uniqueness that a template used by thousands of other companies does not provide. A \"tailor-made\" website is faster, safer, and better adapted to your specific sales processes. It is a working tool that grows with your company."
    },
    {
      question: "How much does it cost to create a professional website?",
      answer: "The price depends on the complexity of the project, the number of subpages, and the required technical functions. Each of our implementations is priced individually because we create solutions from scratch, not on ready-made templates. We prepare the offer so that the investment pays off through effective sales and customer acquisition."
    },
    {
      question: "How long does the process of building a website from design to launch take?",
      answer: "The standard process usually takes from a few hours to a few weeks. This time includes the planning phase, graphic design (UX/UI), coding, and testing. We provide a detailed schedule at the very beginning of cooperation so that you can plan your marketing activities in advance."
    },
    {
      question: "Will the new website be visible in the Google search engine?",
      answer: "Yes. We build every website in accordance with current SEO guidelines. We take care of clean code, loading speed, and appropriate structure of headings and content. It is a solid foundation that makes it easier for Google robots to index the site and allows you to effectively fight for high positions in search results."
    },
    {
      question: "Will I get access to edit content on the website?",
      answer: "Of course. After the work is completed, you will receive access to an intuitive management panel (CMS). Thanks to it, you can independently and without technical knowledge change texts, add new photos or blog posts. Before handing over the project, we conduct a short training so that operating the website is fully understandable to you."
    },
    {
      question: "What happens if I need changes after the website is launched?",
      answer: "We provide full post-implementation care. You can count on our technical support and continuous development of the site. As your business partner, we analyze how users use the website and on this basis we propose optimizations that will further increase its effectiveness."
    },
    {
      question: "Do you also handle hosting and domain?",
      answer: "We help in the entire technical process. We advise on choosing a fast server and registering a domain, and then we configure everything so that the website works flawlessly. We can take over full infrastructure management so you can focus solely on running your business."
    }
  ];

  return (
    <div className="relative z-40 bg-black text-white min-h-screen">
      {/* Background Video - Changed to absolute so it scrolls away */}
      <div className="absolute inset-0 z-0 h-[200vh] pointer-events-none overflow-hidden">
        <video preload="none" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60"
          src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/t%C5%82o.mp4"
        poster="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/HomepageZdjecieWTle.webp" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Navigation Controls */}
      <div className="fixed top-8 left-4 md:top-12 md:left-12 z-50">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pt-40 lg:pt-48 pb-16 lg:pb-12 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
            <div 
              className="font-inter-tight text-white max-w-[15em]"
              style={{ 
                lineHeight: '1', 
                fontWeight: '300',
                fontSize: 'clamp(1.75rem, 1.5rem + 2vw, 3.5rem)'
              }}
            >
              {lang === 'PL' ? 'Wysokiej klasy strony internetowe budujące profesjonalny wizerunek, który wyróżnia Cię na tle konkurencji.' : 'High-class websites building a professional image that makes you stand out from the competition.'}
            </div>

            <div 
              className="font-inter-tight text-slate-300 lg:max-w-[35em]"
              style={{ 
                fontSize: 'clamp(1rem, .735915493rem + .8450704225vw, 1.75rem)',
                letterSpacing: '-.01em',
                fontWeight: '300'
              }}
            >
              <p className="mb-8">
                {lang === 'PL' ? 'Tworzymy witryny od czystego kodu, eliminując ograniczenia gotowych szablonów i ciężkich wtyczek. Każdy element projektujemy z myślą o maksymalnej wydajności, co przekłada się na błyskawiczne działanie i bezbłędną prezentację Twojej marki na każdym urządzeniu.' : 'We create websites from clean code, eliminating the limitations of ready-made templates and heavy plugins. We design every element with maximum performance in mind, which translates into lightning-fast operation and flawless presentation of your brand on any device.'}
              </p>
              <p>
                {lang === 'PL' ? 'Nasze podejście gwarantuje pełną unikalność – otrzymujesz produkt szyty na miarę, którego architektura wyprzedza rynkowe standardy. To technologiczny fundament, który nie tylko wyróżnia Cię w sieci, ale jest w pełni przygotowany na nielimitowaną rozbudowę w przyszłości.' : 'Our approach guarantees full uniqueness - you receive a tailor-made product whose architecture is ahead of market standards. It is a technological foundation that not only distinguishes you on the web but is fully prepared for unlimited expansion in the future.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Section 3: Latest Projects */}
      <LatestProjectsOffer projectsData={getProjectsDataEcommerce(lang)} onContactClick={onContactClick} onProjectClick={onProjectClick} />

      {/* Section 4: Strategy content */}
      <section className="relative z-10 w-full bg-white text-black">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-[6.25rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 items-center">
            <h2 
              className="text-black font-normal leading-[1.2] max-w-[12em] font-inter-tight"
              style={{ fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)' }}
            >
              {lang === 'PL' ? 'Przestajemy zgadywać, co zadziała. Analizujemy zachowania użytkowników, aby wyeliminować bariery, które powstrzymują ich przed kontaktem z Tobą.' : 'We stop guessing what works. We analyze user behavior to eliminate barriers that prevent them from contacting you.'}
            </h2>
            <div 
              className="text-[#363636] lg:col-start-2 max-w-[27.5em] lg:ml-auto font-inter-tight font-normal leading-[1.2] tracking-[.02em]"
              style={{ fontSize: 'clamp(.875rem, -2.7275641026rem + 5.1282051282vw, 1.375rem)' }}
            >
              {lang === 'PL' ? 'Od prostych wizytówek po rozbudowane serwisy i systemy – działamy jako Twój stały partner w sieci. Dzięki unikalnym projektom, łatwej obsłudze i przemyślanej ścieżce klienta, dostarczamy szybkie wdrożenia oraz konkretne wyniki, które realnie rozwijają Twój biznes i budują mocny fundament pod Twój stały wzrost w internecie.' : 'From simple business cards to extensive services and systems – we act as your permanent partner on the web. Thanks to unique projects, easy operation and a well-thought-out customer path, we deliver quick implementations and concrete results that really develop your business and build a strong foundation for your constant growth on the Internet.'}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4.5: ZOBACZ PROCES */}
      <section id="process-section" className="relative z-10 pt-0 pb-32 bg-white">
        <div className="relative z-[2] w-full px-0 sm:px-6 lg:px-24 xl:px-40">
          <h2 
            className="text-[clamp(8.5rem,-2.6229508197rem+28.8524590164vw,32rem)] font-humane font-bold text-black leading-[0.75] uppercase tracking-[0.005em] relative text-left sm:text-center px-4 sm:px-0 w-full"
            style={{ paddingTop: 'calc(0.04em + 10px)' }}
          >
            <span className="sm:hidden flex flex-col items-end text-right w-full">
              <span>{lang === 'PL' ? <><>ZOBACZ<br />PROCES.</></> : <><>SEE THE<br />PROCESS.</></>}</span>
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
                }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                <span className="mt-2 text-left" style={{
                  fontSize: '.75rem',
                  fontFamily: 'Geist Mono, monospace',
                  fontWeight: 300,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  lineHeight: 1.5,
                  maxWidth: '280px'
                }}>{lang === 'PL' ? 'Nasze kroki do stworzenia Twojego prestiżowego serwisu.' : 'Our steps to create your prestigious service.'}</span>
              </div>
            </span>
            <span className="hidden sm:inline-grid text-left">
              <span className="invisible col-start-1 row-start-1 select-none whitespace-pre" aria-hidden="true">{lang === 'PL' ? 'TWORZYMY TO' : 'WE CREATE IT'}</span>
              <span className="col-start-1 row-start-1 flex flex-col w-full">
                <span className="text-left">{lang === 'PL' ? 'ZOBACZ' : 'SEE THE'}</span>
                <span className="flex justify-between items-center w-full">
                  <div className="text-left flex flex-col">
                    <span style={{
                      fontSize: 'clamp(1.5rem, -1.9375rem + 4.5833333333vw, 3.5625rem)',
                      fontFamily: 'Inter Tight, sans-serif',
                      fontWeight: 700,
                      lineHeight: 1.2,
                      textTransform: 'none',
                      letterSpacing: 'normal'
                    }}>{lang === 'PL' ? '4 kluczowe etapy' : '4 key stages'}</span>
                    <span className="mt-2" style={{
                      fontSize: '.75rem',
                      fontFamily: 'Geist Mono, monospace',
                      fontWeight: 300,
                      letterSpacing: '.2em',
                      textTransform: 'uppercase',
                      maxWidth: '280px',
                      lineHeight: 1.5
                    }}>{lang === 'PL' ? 'Nasze kroki do stworzenia Twojego prestiżowego serwisu.' : 'Our steps to create your prestigious service.'}</span>
                  </div>
                  <span className="text-right">{lang === 'PL' ? 'PROCES.' : 'PROCESS.'}</span>
                </span>
              </span>
            </span>
          </h2>
        </div>
      </section>

      {/* Section 5: Process Stages (Stacking Cards) */}
      <section className="relative w-full bg-white text-black z-10">
        {processStages.map((stage, index) => (
          <div 
            key={stage.id} 
            className="sticky top-[72px] h-[calc(100vh-72px)] w-full bg-white flex flex-col"
            style={{ zIndex: 20 + index }}
          >
            <div className="max-w-[100rem] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex flex-col">
              {/* Top Line - The only separator */}
              <div className="w-full h-[1px] bg-black/10" />
              
              <div className="flex-1 flex flex-col justify-center py-12 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <h2 className="text-[clamp(3rem,10vw,8rem)] font-bold font-inter-tight leading-none tracking-tighter">
                    {stage.title}
                  </h2>
                  
                  <div className="space-y-8 max-w-[35em] lg:ml-auto">
                    {stage.paragraphs.map((p, i) => (
                      <p key={i} className="text-[clamp(1rem,1.2vw,1.375rem)] font-inter-tight font-normal leading-relaxed text-[#363636]">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-auto flex items-end justify-between pb-8">
                  <span className="text-sm font-mono text-black/40">{stage.id}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Section 6: Technologies */}
      <section className="relative bg-white text-black -mt-[1px] pb-[3.75rem] z-10 overflow-hidden">
        <h2 
          className="font-inter-tight font-normal mb-12 mx-[1.875rem] text-black"
          style={{ 
            lineHeight: '1',
            fontSize: 'clamp(1.75rem, -4.0833333333rem + 7.7777777778vw, 5.25rem)',
            textTransform: 'none',
            letterSpacing: 'normal'
          }}
        >
          Technologie
        </h2>

        <div className="relative w-full">
          <motion.div 
            className="flex gap-4 px-[1.875rem]"
            animate={{ x: [0, -2448] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ width: 'max-content' }}
          >
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-4">
                {[
                  { name: 'NEXT.JS', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Next.js</title>
                      <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"/>
                    </svg>
                  )},
                  { name: 'REACT', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>React</title>
                      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
                    </svg>
                  )},
                  { name: 'TAILWIND CSS', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Tailwind CSS</title>
                      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                    </svg>
                  )},
                  { name: 'FRAMER MOTION', icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16" strokeWidth="2">
                      <path d="M12 12 4 4v16L20 4v16l-4 -4"></path>
                      <path d="m20 12 -8 8 -4 -4"></path>
                    </svg>
                  )},
                  { name: 'TYPESCRIPT', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>TypeScript</title>
                      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
                    </svg>
                  )},
                  { name: 'NODE.JS', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Node.js</title>
                      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
                    </svg>
                  )},
                  { name: 'VITE', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Vite</title>
                      <path d="M13.056 23.238a.57.57 0 0 1-1.02-.355v-5.202c0-.63-.512-1.143-1.144-1.143H5.148a.57.57 0 0 1-.464-.903l3.777-5.29c.54-.753 0-1.804-.93-1.804H.57a.574.574 0 0 1-.543-.746.6.6 0 0 1 .08-.157L5.008.78a.57.57 0 0 1 .467-.24h14.589a.57.57 0 0 1 .466.903l-3.778 5.29c-.54.755 0 1.806.93 1.806h5.745c.238 0 .424.138.513.322a.56.56 0 0 1-.063.603z"/>
                    </svg>
                  )},
                  { name: 'WEBGL', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>WebGL</title>
                      <path d="M3.489 10.164c-.565.548-.885 1.172-.885 1.835 0 2.167 3.415 3.921 7.631 3.921 2.339 0 4.437-.484 5.837-1.335-1.533 1.426-4.265 2.43-7.385 2.43C3.89 17.015 0 14.769 0 11.999s3.89-5.014 8.689-5.014c3.131.002 5.872 1.009 7.398 2.444-1.399-.856-3.504-1.351-5.852-1.351-2.506 0-4.73.621-6.121 1.579l.785 3.395.971-3.481h.737l.971 3.481.805-3.481h.805L7.953 14.11h-.717l-.991-3.566L5.24 14.11h-.714zm19.839 3.48h-.162v.424h-.142v-.424h-.164v-.122h.468zm.064-.122h.209l.095.364.096-.364H24v.546h-.133v-.415h-.002l-.113.415h-.109l-.115-.415h-.003v.415h-.133zm-5.699.515c-.2.084-.399.126-.601.126-.319 0-.608-.055-.863-.166q-.3825-.1665-.645-.459c-.175-.195-.311-.424-.404-.688-.093-.263-.14-.547-.14-.851 0-.313.047-.601.14-.869.093-.269.226-.502.402-.699.175-.2.39-.355.645-.468s.541-.171.863-.171c.215 0 .421.034.621.098.199.064.381.16.543.284s.295.279.399.463.169.395.193.632h-.874c-.055-.233-.159-.408-.315-.525-.155-.118-.343-.176-.567-.176-.207 0-.382.04-.526.12s-.262.187-.35.322a1.41 1.41 0 0 0-.196.459c-.039.171-.062.348-.062.532 0 .175.02.346.062.512.04.167.107.315.196.448.088.133.206.24.35.32s.319.119.526.119c.303 0 .539-.077.705-.23s.262-.375.29-.668h-.922v-.689h1.75v2.255h-.584l-.093-.472c-.162.21-.344.357-.543.441m2.708-4.14v3.395h2.033v.774h-2.949V9.897zm-9.204 1.585c.109.151.191.337.251.557.053.21.08.452.08.716v.047H9.372c.011.41.164.876.807.876.45 0 .703-.344.719-.537l.002-.042h.592l-.007.051c-.008.075-.051.222-.135.377-.049.086-.104.166-.166.239a1.3 1.3 0 0 1-.248.218c-.071.046-.158.1-.287.139-.148.047-.326.069-.543.069-.415 0-.763-.151-1.007-.434a1.43 1.43 0 0 1-.266-.482c-.06-.182-.091-.386-.091-.601 0-.485.12-.896.348-1.186.125-.158.278-.28.457-.362.191-.086.41-.131.654-.131.218 0 .413.043.581.127.165.082.304.202.415.359m-1.064.047c-.402 0-.741.357-.765.785h1.543c-.046-.528-.302-.785-.778-.785m4.373.388c.058.182.086.381.084.588 0 .19-.022.385-.064.563-.049.206-.122.39-.22.545-.11.178-.252.318-.419.415-.186.109-.408.164-.654.164-.228 0-.426-.057-.585-.173a.89.89 0 0 1-.198-.193v.282h-.561V9.983h.59v1.393c.093-.111.202-.2.324-.262.146-.078.313-.118.497-.12.199 0 .383.04.547.118.158.075.295.184.408.324.109.135.193.297.251.481m-.53.67c0-.2-.013-.459-.111-.672-.12-.26-.335-.384-.654-.384-.3 0-.506.135-.628.417-.084.195-.126.452-.126.785 0 .696.412.942.765.942.244 0 .435-.102.565-.303.125-.191.189-.462.189-.785"/>
                    </svg>
                  )},
                  { name: 'THREE.JS', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Three.js</title>
                      <path d="M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45l-5.784-1.667a.268.268 0 0 0-.123-.035L6.38 1.715a.268.268 0 0 0-.144-.04L.456.01A.268.268 0 0 0 .38 0zm.374.654L5.71 2.08 1.99 5.664zM6.61 2.34l4.864 1.4-3.65 3.515zm-.522.12l1.217 4.926-4.877-1.4zm6.28 1.538l4.878 1.404-3.662 3.53zm-.52.13l1.208 4.9-4.853-1.392zm6.3 1.534l4.947 1.424-3.715 3.574zm-.524.12l1.215 4.926-4.876-1.398zm-15.432.696l4.964 1.424-3.726 3.586zM8.047 8.15l4.877 1.4-3.66 3.527zm-.518.137l1.236 5.017-4.963-1.432zm6.274 1.535l4.965 1.425-3.73 3.586zm-.52.127l1.235 5.012-4.958-1.43zm-9.63 2.438l4.873 1.406-3.656 3.523zm5.854 1.687l4.863 1.403-3.648 3.51zm-.54.04l1.214 4.927-4.875-1.4zm-3.896 4.02l5.037 1.442-3.782 3.638z"/>
                    </svg>
                  )},
                  { name: 'BLENDER', icon: (
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="currentColor">
                      <title>Blender</title>
                      <path d="M12.51 13.214c.046-.8.438-1.506 1.03-2.006a3.424 3.424 0 0 1 2.212-.79c.85 0 1.631.3 2.211.79.592.5.983 1.206 1.028 2.005.045.823-.285 1.586-.865 2.153a3.389 3.389 0 0 1-2.374.938 3.393 3.393 0 0 1-2.376-.938c-.58-.567-.91-1.33-.865-2.152M7.35 14.831c.006.314.106.922.256 1.398a7.372 7.372 0 0 0 1.593 2.757 8.227 8.227 0 0 0 2.787 2.001 8.947 8.947 0 0 0 3.66.76 8.964 8.964 0 0 0 3.657-.772 8.285 8.285 0 0 0 2.785-2.01 7.428 7.428 0 0 0 1.592-2.762 6.964 6.964 0 0 0 .25-3.074 7.123 7.123 0 0 0-1.016-2.779 7.764 7.764 0 0 0-1.852-2.043h.002L13.566 2.55l-.02-.015c-.492-.378-1.319-.376-1.86.002-.547.382-.609 1.015-.123 1.415l-.001.001 3.126 2.543-9.53.01h-.013c-.788.001-1.545.518-1.695 1.172-.154.665.38 1.217 1.2 1.22V8.9l4.83-.01-8.62 6.617-.034.025c-.813.622-1.075 1.658-.563 2.313.52.667 1.625.668 2.447.004L7.414 14s-.069.52-.063.831zm12.09 1.741c-.97.988-2.326 1.548-3.795 1.55-1.47.004-2.827-.552-3.797-1.538a4.51 4.51 0 0 1-1.036-1.622 4.282 4.282 0 0 1 .282-3.519 4.702 4.702 0 0 1 1.153-1.371c.942-.768 2.141-1.183 3.396-1.185 1.256-.002 2.455.41 3.398 1.175.48.391.87.854 1.152 1.367a4.28 4.28 0 0 1 .522 1.706 4.236 4.236 0 0 1-.239 1.811 4.54 4.54 0 0 1-1.035 1.626"/>
                    </svg>
                  )}
                ].map((tech, i) => (
                  <div 
                    key={i} 
                    className="border border-[#d9d9d9] rounded-[12px] py-[1.25rem] flex flex-col items-center justify-center select-none w-[16rem]"
                    style={{ 
                      display: 'grid',
                      gridTemplateRows: '10rem auto',
                      height: '16rem'
                    }}
                  >
                    <div className="flex items-center justify-center">
                      {tech.icon}
                    </div>
                    <div className="text-[10px] font-medium tracking-[0.2em] text-black/40 text-center mt-4">
                      {tech.name}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-[6.25rem] lg:py-[12.5rem]">
        <div className="mx-[1.875rem] flex flex-col lg:flex-row justify-between gap-12 lg:gap-[2rem]">
          {/* Sticky Left Box */}
          <div className="lg:w-[480px]">
            <div className="lg:sticky lg:top-[100px] bg-[#F3DEFF] p-[1.5625rem] rounded-[20px] h-fit">
              <h2 className="text-[2.5rem] lg:text-[3.2rem] font-inter-tight font-normal leading-[1.05] mb-6 text-black">
                {lang === 'PL' ? 'Szukasz pewnego partnera technicznego?' : 'Looking for a reliable technical partner?'}
              </h2>
              <p className="text-black/60 text-lg mb-10">
                {lang === 'PL' ? 'Zbudujmy coś, co działa idealnie.' : 'Let\'s build something that works perfectly.'}
              </p>
              <button 
                onClick={onContactClick}
                className="bg-white/20 hover:bg-white/30 text-black px-8 py-4 rounded-full transition-colors text-sm font-medium border border-black/10"
              >
                {lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!'}
              </button>
            </div>
          </div>

          {/* Accordion Right Side */}
          <div className="flex-1">
            <div className="flex flex-col">
              {faqItems.map((item, index) => (
                <div key={index} className="border-t border-[#d9d9d9] last:border-b">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full py-8 flex justify-between items-center text-left group"
                  >
                    <span className="text-xl lg:text-2xl font-inter-tight font-normal text-black pr-8">
                      {item.question}
                    </span>
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 flex items-center justify-center relative">
                        <motion.div 
                          animate={{ rotate: openIndex === index ? 90 : 0 }}
                          className="absolute w-4 h-[1px] bg-black"
                        />
                        <motion.div 
                          animate={{ rotate: openIndex === index ? 0 : 90 }}
                          className="absolute w-4 h-[1px] bg-black"
                        />
                      </div>
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 text-black/60 text-lg leading-relaxed max-w-[800px]">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Duplicated Contact Section */}
      <section className="min-h-screen bg-white text-black flex flex-col items-center justify-between p-6 relative overflow-hidden">
        {/* Spacer for top since no navbar */}
        <div className="h-20 w-full"></div>

        {/* Curved Text Container */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden -translate-y-20 sm:translate-y-0">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible scale-[1.4] sm:scale-100">
            <path id="curve-bottom-offer" d="M -400, 750 Q 500, -400 1400, 750" fill="transparent" />
            <text style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
              <motion.textPath 
                xlinkHref="#curve-bottom-offer" 
                animate={{ startOffset: ["0%", "-50%"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-[100px] sm:text-[150px] font-bold text-black uppercase tracking-[0.01em] fill-black font-bebas"
              >
                {lang === 'PL' ? "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ " : "CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US CONTACT US "}
              </motion.textPath>
            </text>
          </svg>
        </div>
        
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
          <span className="text-black/60 text-sm tracking-widest uppercase">{lang === 'PL' ? 'KONTAKT' : 'CONTACT'}</span>
          <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">{lang === 'PL' ? 'Gotów, by stworzyć coś niepowtarzalnego?' : 'Ready to create something unique?'}</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button onClick={onStartProjectClick || onContactClick} className="rounded-full border border-black/20 hover:bg-black/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">{lang === 'PL' ? 'Wystartuj teraz' : 'Start now'}</button>
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
    </div>
  );
}


export default function App() {
  const { lang } = useLanguage();
  
  const [currentView, setCurrentView] = useState<'home' | 'contact' | 'start-project' | 'websites-offer' | 'onepage-offer' | 'ecommerce-offer' | 'ads-offer' | 'seo-offer' | 'poradnik' | 'article' | 'our-works' | 'about'>('home');
  const [startProjectStep, setStartProjectStep] = useState<number>(1);
  const [selectedArticleId, setSelectedArticleId] = useState<string>('ux-design');
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | undefined>();
  const [modalSubtitle, setModalSubtitle] = useState<string | undefined>();

  const handleNavigate = (view: typeof currentView) => {
    if (view === 'start-project' && currentView !== 'start-project') {
      // Reset step if navigating to start-project normally
      setStartProjectStep(1);
    }
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleArticleClick = (id: string) => {
    setSelectedArticleId(id);
    setCurrentView('article');
    window.scrollTo(0, 0);
  };

  const handleScrollTo = (id: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOfferClick = (type?: string) => {
    if (type) {
      setCurrentView(type as any);
      window.scrollTo(0, 0);
      return;
    }
    handleScrollTo('glass-boxes');
  };

  const handleContactClick = () => {
    setStartProjectStep(4);
    setCurrentView('start-project');
    window.scrollTo(0, 0);
  };

  const handleAskAwayClick = () => {
    handleOpenContactModal(
      lang === 'PL' ? 'Pytaj śmiało!' : 'Ask away!',
      lang === 'PL' ? 'Zadaj nam dowolne pytanie dotyczące Twojego projektu.' : 'Ask us any question about your project.'
    );
  };

  const handleOpenContactModal = (title?: string, subtitle?: string) => {
    setModalTitle(title);
    setModalSubtitle(subtitle);
    setIsContactModalOpen(true);
  };

  const handleProjectClick = (id: string) => {
    setSelectedProjectId(id);
    setCurrentView('our-works');
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative bg-[#f8fafc] font-sans text-slate-900 selection:bg-[#8d32fc]/20 selection:text-[#8d32fc]">
      <Navbar 
        onContactClick={handleContactClick} 
        onStartProjectClick={() => handleNavigate('start-project')} 
        onHomeClick={() => handleNavigate('home')}
        onOfferClick={handleOfferClick}
        onPoradnikClick={() => handleNavigate('poradnik')}
        onAboutClick={() => handleNavigate('about')}
        onWorkClick={() => { setSelectedProjectId(undefined); setCurrentView('our-works'); window.scrollTo(0, 0); }}
        isStartProject={currentView === 'start-project'}
        startProjectStep={startProjectStep}
      />
      {currentView === 'home' && (
        <main className="relative">
          <div className="w-full z-0 overflow-hidden">
            <Hero 
              onContactClick={() => handleOpenContactModal()}
            >
              <AboutUs />
            </Hero>
          </div>
          <div className="relative z-10">
            <div className="relative z-10 bg-black overflow-hidden">
              <ExpertiseSection />
            </div>
            <LatestProjects onProjectClick={handleProjectClick} />
            <EightYearsSection />
            <FreeProjectOffer />
            <ValueProps />
            <SystemScalingImage />
            <GlassBoxes 
              onWebsitesClick={() => handleNavigate('websites-offer')} 
              onEcommerceClick={() => handleNavigate('ecommerce-offer')}
              onAdsClick={() => handleNavigate('ads-offer')}
              onSeoClick={() => handleNavigate('seo-offer')}
            />
            <LatestNews onPoradnikClick={() => handleNavigate('poradnik')} onArticleClick={handleArticleClick} />
            <ContactSection 
              onStartProjectClick={() => handleNavigate('start-project')} 
              onAskAwayClick={handleAskAwayClick}
            />
          </div>
        </main>
      )}
      <>
        {currentView === 'our-works' && (
          <OurWorksPage 
            onBack={() => { setCurrentView('home'); setSelectedProjectId(undefined); window.scrollTo(0, 0); }} 
            onStartProjectClick={() => handleNavigate('start-project')} 
            onAskAwayClick={handleAskAwayClick}
            initialProjectId={selectedProjectId}
          />
        )}
        {currentView === 'contact' && (
          <ContactPage onStartProjectClick={() => handleNavigate('start-project')} onAskAwayClick={handleAskAwayClick} />
        )}
        {currentView === 'start-project' && (
          <StartProjectPage 
            onBack={() => handleNavigate('home')} 
            initialStep={startProjectStep}
            onStepChange={setStartProjectStep}
          />
        )}
        {currentView === 'websites-offer' && (
          <WebsitesOfferPage 
            onBack={() => handleNavigate('home')} 
            onContactClick={handleContactClick}
            onAskAwayClick={handleAskAwayClick} 
            onStartProjectClick={() => handleNavigate('start-project')}
            onProjectClick={(id) => {
              setSelectedProjectId(id);
              setCurrentView('our-works');
              window.scrollTo(0, 0);
            }}
          />
        )}
        {currentView === 'onepage-offer' && (
          <OnePageOfferPage onBack={() => handleNavigate('websites-offer')} onContactClick={handleContactClick} onAskAwayClick={handleAskAwayClick} onStartProjectClick={() => handleNavigate('start-project')} />
        )}
        {currentView === 'ecommerce-offer' && (
          <EcommerceOfferPage onBack={() => handleNavigate('home')} onContactClick={handleContactClick} onAskAwayClick={handleAskAwayClick} onStartProjectClick={() => handleNavigate('start-project')} />
        )}
        {currentView === 'ads-offer' && (
          <AdsOfferPage onBack={() => handleNavigate('home')} onContactClick={handleContactClick} onAskAwayClick={handleAskAwayClick} onStartProjectClick={() => handleNavigate('start-project')} />
        )}
        {currentView === 'seo-offer' && (
          <SeoOfferPage onBack={() => handleNavigate('home')} onContactClick={handleContactClick} onAskAwayClick={handleAskAwayClick} onStartProjectClick={() => handleNavigate('start-project')} />
        )}
        {currentView === 'poradnik' && (
          <PoradnikPage onArticleClick={handleArticleClick} />
        )}
        {currentView === 'article' && (
          <ArticlePage onContactClick={handleContactClick} onAskAwayClick={handleAskAwayClick} articleId={selectedArticleId} onArticleClick={handleArticleClick} onStartProjectClick={() => handleNavigate('start-project')} />
        )}
        {currentView === 'about' && (
          <AboutPage 
            onContactClick={handleContactClick}
            onStartProjectClick={() => handleNavigate('start-project')}
            onAskAwayClick={handleAskAwayClick}
            onPoradnikClick={() => handleNavigate('poradnik')}
            onArticleClick={handleArticleClick}
          />
        )}
      </>
      
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title={modalTitle} subtitle={modalSubtitle} />
    </div>
  );
}