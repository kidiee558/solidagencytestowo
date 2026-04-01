import React from 'react';
import { motion } from 'motion/react';

function DarkContactSection({ onContactClick }: { onContactClick: () => void }) {
  const text = "SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ SKONTAKTUJ SIĘ ";
  
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
              className="text-[100px] sm:text-[150px] font-black uppercase tracking-[0.01em] fill-white/10 font-bebas"
            >
              {text}
            </motion.textPath>
          </text>
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center mt-auto mb-auto px-6 translate-y-20 sm:translate-y-0">
        <span className="text-white/60 text-sm tracking-widest uppercase">KONTAKT</span>
        <h1 className="text-[1.5rem] sm:text-5xl font-inter-tight font-normal leading-none max-w-2xl text-center mt-[1.25rem] mb-[2.5rem]">Gotów, by stworzyć coś niepowtarzalnego?</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">Wystartuj teraz</button>
          <button onClick={onContactClick} className="rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto min-w-[12.5rem] h-[3.625rem] flex items-center justify-center">Pytaj śmiało!</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full flex justify-between items-end z-20 pb-4">
        <div className="text-sm">
          <p className="font-bold">POLAND</p>
          <p className="text-white/60">Lubelskie, Lublin - Tutaj jesteśmy. Działamy na całym świecie.</p>
        </div>
        <div className="w-32"></div> {/* Spacer to maintain layout balance */}
      </footer>
    </section>
  );
}

function RelatedPosts() {
  const posts = [
    {
      title: "Website Development vs Web Application Development",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
      link: "#"
    },
    {
      title: "Website Security Essentials: A Practical 10-Point Guide",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
      link: "#"
    },
    {
      title: "Website Architecture: A Practical Guide for SEO and UX",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
      link: "#"
    },
    {
      title: "Website Redesign Checklist: Step-by-Step Guide",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600&auto=format&fit=crop",
      link: "#"
    }
  ];

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
          Powiązane artykuły
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {posts.map((item, idx) => (
            <a key={idx} href={item.link} className="bg-[#0a0a0a] rounded-3xl overflow-hidden flex flex-col aspect-[4/5] group cursor-pointer no-underline border border-white/10 hover:border-white/20 transition-colors">
              <div className="h-[55%] w-full overflow-hidden bg-zinc-900 relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="h-[45%] p-5 lg:p-6 flex flex-col justify-between">
                <h3 className="text-white text-lg lg:text-xl font-inter-tight leading-[1.3] font-light">
                  {item.title}
                </h3>
                <div className="mt-4">
                  <span className="text-white text-sm font-medium underline underline-offset-4 group-hover:text-white/80 transition-colors">
                    Czytaj więcej
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

export function ArticlePage({ onContactClick }: { onContactClick: () => void }) {
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
          PORADNIK
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 mb-12 font-inter-tight">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" alt="Author" className="w-full h-full object-cover" />
            </div>
            <span><strong className="text-white">Autorzy:</strong> Solid Agency</span>
          </div>
          <span><strong className="text-white">Data publikacji:</strong> 15.03.2026</span>
          <span><strong className="text-white">Ostatnia aktualizacja:</strong> 15.03.2026</span>
        </div>

        <h1 className="text-[clamp(3rem,8vw,8rem)] leading-[0.85] font-bebas-neue text-center uppercase tracking-tight mb-16 max-w-[90%]">
          WHAT IS WEB DEVELOPMENT? DEFINITION, TYPES, AND HOW IT WORKS
        </h1>

        <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop" 
            alt="Article cover" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="article-content max-w-[100rem] mx-auto lg:grid lg:grid-cols-[1fr_0.5fr] flex flex-col" style={{
        gap: '6.625rem',
        paddingBottom: '1.25rem',
        paddingInline: '1.875rem'
      }}>
        <div className="article-body font-inter-tight text-lg text-gray-300 space-y-8">
          <p className="text-xl text-white leading-relaxed">
            Web development is the work of building, shipping, and maintaining websites and web applications that run over the internet or intranet. It covers everything from planning and user interface engineering to server logic, databases, APIs, performance, security, and accessibility. In practice, that means turning ideas into fast, accessible, conversion focused digital products that users can trust and enjoy.
          </p>
          <p>
            If you are new to the field, it helps to see how the process fits together and how front end, back end, and full stack developers collaborate to deliver results. Ready to move forward? Keep reading for the process, types, and FAQs.
          </p>

          <h2 className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight">How web development works: from idea to deployment</h2>
          <p>
            Most professional projects follow a predictable path. You start with discovery to clarify goals, users, and success metrics, then map information architecture and wireframes. UI/UX design turns those into interactive prototypes that guide development. Front end developers implement layouts with HTML, CSS, and JavaScript, while back end developers build server APIs, data models, and integrations. Automated tests, code reviews, and accessibility checks keep quality high. Continuous integration assembles and verifies changes, then deployment pipelines push to production. After launch, monitoring, analytics, and iterative improvements keep the site secure, fast, and aligned with business goals.
          </p>

          <h2 className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight">Types of web development</h2>
          <p>
            There are several main areas of specialization within web development. Front-end developers focus on the user interface and experience, using HTML, CSS, and JavaScript to build what users see and interact with. Back-end developers work on the server-side logic, databases, and APIs that power the application behind the scenes. Full-stack developers have expertise in both areas, allowing them to build end-to-end solutions.
          </p>

          <h2 className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight">Front end development</h2>
          <p>
            Front end development (also called client-side development) is the practice of producing HTML, CSS and JavaScript for a website or Web Application so that a user can see and interact with them directly. The challenge associated with front end development is that the tools and techniques used to create the front end of a website change constantly and so the developer needs to constantly be aware of how the field is developing.
          </p>
          <p>
            The objective of designing a site is to ensure that when the users open up the site they see the information in a format that is easy to read and relevant. This is further complicated by the fact that users now use a large variety of devices with varying screen sizes and resolutions thus forcing the designer to take into consideration these aspects when designing the site.
          </p>

          <h2 className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight">Back end development</h2>
          <p>
            Back-end development refers to the server-side of an application and everything that communicates between the database and the browser. Back-end Development refers to the server side of development where you are primarily focused on how the site works. Making updates and changes in addition to monitoring functionality of the site will be your primary responsibility.
          </p>
          <p>
            This type of web development usually consists of three parts: a server, an application, and a database. Code written by back end developers is what communicates the database information to the browser. Anything you can't see easily with the eye such as databases and servers is the work of a back end developer. Back end developers are usually called programmers or web developers.
          </p>

          <h2 className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight">Full stack development</h2>
          <p>
            Full stack development encompasses both the front end and back end portions of web application development. A full stack developer has the ability to design complete web applications and websites. They work on the frontend, backend, database and debugging of web applications or websites.
          </p>
          <p>
            Being a full-stack developer doesn't mean that you have necessarily mastered everything required to work with the front-end or back-end, but it means that you are able to work on both sides and understand what is going on when building an application.
          </p>

          <h2 className="text-4xl text-white font-medium mt-16 mb-8 tracking-tight">The importance of performance and security</h2>
          <p>
            In today's digital landscape, a website's performance and security are just as critical as its design and functionality. Users expect pages to load in milliseconds, and search engines like Google penalize slow-loading sites. Performance optimization involves techniques like minifying code, optimizing images, leveraging browser caching, and using Content Delivery Networks (CDNs).
          </p>
          <p>
            Security is equally paramount. Web developers must protect applications from common vulnerabilities such as Cross-Site Scripting (XSS), SQL Injection, and Cross-Site Request Forgery (CSRF). Implementing HTTPS, secure authentication mechanisms, and regular security audits are essential practices to safeguard user data and maintain trust.
          </p>
        </div>

        <div className="details lg:sticky lg:top-32 h-fit flex flex-col gap-6">
          <div className="border border-white/20 rounded-[20px] p-8 bg-black">
            <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">Spis treści</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">How web development works: from id...</li>
              <li className="hover:text-white cursor-pointer transition-colors">Types of web development</li>
              <li className="text-white border-l-2 border-[#c8b6ff] pl-4 -ml-[18px]">Front end development</li>
              <li className="hover:text-white cursor-pointer transition-colors">Back end development</li>
            </ul>
            <button className="mt-8 text-white underline underline-offset-4 text-sm font-medium hover:text-gray-300 transition-colors">Pokaż więcej</button>
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
            <div className="w-16 h-16 text-black/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m2 12 20 0" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h3 className="text-4xl font-inter-tight tracking-tight leading-tight">
              Zamieńmy Twoje pomysły w rezultaty.
            </h3>
            <button 
              onClick={onContactClick}
              className="bg-[#c8b6ff] text-black px-8 py-4 rounded-full font-medium w-full hover:bg-[#b8a1ff] transition-colors"
            >
              Skontaktuj się z nami
            </button>
          </div>
        </div>
      </div>

      <RelatedPosts />
      <DarkContactSection onContactClick={onContactClick} />
    </div>
  );
}
