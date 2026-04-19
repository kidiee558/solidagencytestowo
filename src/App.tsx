import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from './contexts/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { 
  X,
  ArrowRight, ChevronDown,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const StartProjectPage = lazy(() => import('./components/StartProjectPage').then(module => ({ default: module.StartProjectPage })));
const OurWorksPage = lazy(() => import('./components/OurWorksPage').then(module => ({ default: module.OurWorksPage })));
const WebsitesOfferPage = lazy(() => import('./components/WebsitesOfferPage').then(module => ({ default: module.WebsitesOfferPage })));
const OnePageOfferPage = lazy(() => import('./components/OnePageOfferPage').then(module => ({ default: module.OnePageOfferPage })));
const EcommerceOfferPage = lazy(() => import('./components/EcommerceOfferPage').then(module => ({ default: module.EcommerceOfferPage })));
const AdsOfferPage = lazy(() => import('./components/AdsOfferPage').then(module => ({ default: module.AdsOfferPage })));
const SeoOfferPage = lazy(() => import('./components/SeoOfferPage').then(module => ({ default: module.SeoOfferPage })));
const PoradnikPage = lazy(() => import('./components/PoradnikPage').then(module => ({ default: module.PoradnikPage })));
const ArticlePage = lazy(() => import('./components/ArticlePage').then(module => ({ default: module.ArticlePage })));
const AboutPage = lazy(() => import('./components/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./components/ContactPage').then(module => ({ default: module.ContactPage })));

const PageLoader = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-[999]">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </motion.div>
  </div>
);

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
            <img 
              src="https://github.com/kidiee558/solidagencytestowo/blob/main/logosolidagency.webp?raw=true" 
              alt={lang === 'PL' ? "Solid Agency - Agencja Interaktywna Lublin" : "Solid Agency - Interactive Marketing Agency"}
              className="h-10 sm:h-12 w-auto max-w-[120px] sm:max-w-none cursor-pointer object-contain"
              onClick={onHomeClick}
              referrerPolicy="no-referrer"
            />
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
                      <img src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/rakieta.png" alt="Rocket" className="max-h-full max-w-full object-contain filter drop-shadow-lg" />
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
                      <img src="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/telefon%20getintouch.png" alt="Phone" className="max-h-full max-w-full object-contain filter drop-shadow-xl" />
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
        />
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
              <video 
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

const getProjectsData = (lang: 'PL' | 'ENG') => [
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
    videoUrl: 'https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/Wideo1.mp4',
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
                      <video 
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
               <img 
                src={imageUrl} 
                alt="System Skalowania Solid Agency Full" 
                className="max-w-none w-auto h-auto min-w-full cursor-default"
                referrerPolicy="no-referrer"
                onClick={(e) => e.stopPropagation()}
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
      bg: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/box1.png',
      onClick: onWebsitesClick
    },
    { 
      title: lang === 'PL' ? <>Sklepy<br />e-commerce</> : <>E-commerce<br />stores</>, 
      desc: lang === 'PL' ? 'Pełen wymiar handlu. Od wydajnych e-sklepów po potężne systemy sprzedażowe i prezentację produktów w 3D.' : 'Full dimension of commerce. From efficient e-stores to powerful sales systems and 3D product presentation.',
      bg: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/box2.jpg',
      onClick: onEcommerceClick
    },
    { 
      title: lang === 'PL' ? <>Kampanie Ads<br />(Google & Meta)</> : <>Ads Campaigns<br />(Google & Meta)</>, 
      desc: lang === 'PL' ? 'Precyzyjny zasięg. Od lokalnych kampanii po globalne strategie sprzedażowe z pełną analityką.' : 'Precise reach. From local campaigns to global sales strategies with full analytics.',
      bg: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/box3.jpg',
      onClick: onAdsClick
    },
    { 
      title: lang === 'PL' ? <>Pozycjonowanie<br />SEO</> : <>SEO<br />Optimization</>, 
      desc: lang === 'PL' ? 'Trwałe zasięgi. Od lokalnej optymalizacji po globalną dominację w wynikach wyszukiwania.' : 'Lasting reach. From local optimization to global dominance in search results.',
      bg: 'https://raw.githubusercontent.com/kidiee558/solidagencytestowo/main/box2.jpg',
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
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
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
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
      
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title={modalTitle} subtitle={modalSubtitle} />
    </div>
  );
}