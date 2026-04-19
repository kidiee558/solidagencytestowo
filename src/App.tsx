import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './contexts/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { 
  X,
  ArrowRight, ChevronDown
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

// Home Sections
const ExpertiseSection = lazy(() => import('./components/Home/ExpertiseSection').then(module => ({ default: module.ExpertiseSection })));
const LatestProjects = lazy(() => import('./components/Home/LatestProjects').then(module => ({ default: module.LatestProjects })));
const EightYearsSection = lazy(() => import('./components/Home/EightYearsSection').then(module => ({ default: module.EightYearsSection })));
const FreeProjectOffer = lazy(() => import('./components/Home/FreeProjectOffer').then(module => ({ default: module.FreeProjectOffer })));
const ValueProps = lazy(() => import('./components/Home/ValueProps').then(module => ({ default: module.ValueProps })));
const SystemScalingImage = lazy(() => import('./components/Home/SystemScalingImage').then(module => ({ default: module.SystemScalingImage })));
const GlassBoxes = lazy(() => import('./components/Home/GlassBoxes').then(module => ({ default: module.GlassBoxes })));
const LatestNews = lazy(() => import('./components/Home/LatestNews').then(module => ({ default: module.LatestNews })));
const ContactSection = lazy(() => import('./components/Home/ContactSection').then(module => ({ default: module.ContactSection })));

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
            <Suspense fallback={<div className="h-40 bg-black" />}>
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
            </Suspense>
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