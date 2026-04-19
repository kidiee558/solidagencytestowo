import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function SystemScalingImage() {
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
            loading="lazy"
            decoding="async"
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
