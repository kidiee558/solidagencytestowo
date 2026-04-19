import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getProjectsData } from '../../constants/projects';

export function LatestProjects({ onProjectClick }: { onProjectClick: (id: string) => void }) {
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
