import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'PL' | 'ENG';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<string, Record<Language, string>> = {
  // Navbar
  'nav.home': { PL: 'STRONA GŁÓWNA', ENG: 'HOME' },
  'nav.about': { PL: 'O NAS', ENG: 'ABOUT US' },
  'nav.offer': { PL: 'OFERTA', ENG: 'SERVICES' },
  'nav.work': { PL: 'NASZE PRACE', ENG: 'OUR WORK' },
  'nav.guide': { PL: 'NASZ PORADNIK', ENG: 'OUR GUIDE' },
  'nav.contact': { PL: 'KONTAKT', ENG: 'CONTACT' },
  'nav.start_project': { PL: 'WYSTARTUJMY Z PROJEKTEM', ENG: 'START A PROJECT' },
  'nav.say_hello': { PL: 'HALO, ODEZWIJ SIĘ!', ENG: 'SAY HELLO!' },
  'nav.services.websites': { PL: 'Strony Internetowe', ENG: 'Websites' },
  'nav.services.ecommerce': { PL: 'Sklepy E-Commerce', ENG: 'E-Commerce Stores' },
  'nav.services.ads': { PL: 'Kampanie Ads (Google & Meta)', ENG: 'Ads Campaigns (Google & Meta)' },
  'nav.services.seo': { PL: 'Pozycjonowanie SEO', ENG: 'SEO Optimization' },

  // Hero
  'hero.we_create': { PL: 'Tworzymy marki, które', ENG: 'We create brands that' },
  'hero.earn': { PL: 'Zarabiają', ENG: 'Make Profit' },
  'hero.leave_behind': { PL: 'Zostawiają w tyle', ENG: 'Leave Behind' },
  'hero.competition': { PL: 'Konkurencję', ENG: 'The Competition' },
  'hero.subtitle': { PL: 'Nie robimy po prostu ładnych stron. Budujemy cyfrowe maszyny, które bezlitośnie konwertują ruch w realny zysk dla Twojej firmy.', ENG: 'We don\'t just make pretty websites. We build digital machines that ruthlessly convert traffic into real profit for your business.' },
  'hero.start_project': { PL: 'Rozpocznij projekt', ENG: 'Start a project' },
  'hero.our_services': { PL: 'Nasze usługi', ENG: 'Our services' },
  'hero.trusted': { PL: 'Zaufali nam', ENG: 'Trusted by' },

  // Services
  'services.title': { PL: 'CO MOŻEMY DLA CIEBIE ZROBIĆ?', ENG: 'WHAT CAN WE DO FOR YOU?' },
  'services.subtitle': { PL: 'Kompleksowe rozwiązania', ENG: 'Comprehensive solutions' },
  'services.desc': { PL: 'Nie jesteśmy kolejną agencją, która tylko "robi strony". Dostarczamy kompletne ekosystemy sprzedażowe, które od pierwszego dnia pracują na Twój zysk.', ENG: 'We are not just another agency that "makes websites". We deliver complete sales ecosystems that work for your profit from day one.' },
  'services.learn_more': { PL: 'Dowiedz się więcej', ENG: 'Learn more' },

  // Packages
  'packages.title': { PL: 'GOTOWE ROZWIĄZANIA', ENG: 'READY SOLUTIONS' },
  'packages.subtitle': { PL: 'Wybierz pakiet dla siebie', ENG: 'Choose your package' },
  'packages.desc': { PL: 'Przejrzyste pakiety dostosowane do etapu rozwoju Twojej firmy. Bez ukrytych kosztów, z jasnym celem: maksymalizacja Twojego zysku.', ENG: 'Transparent packages tailored to your company\'s development stage. No hidden costs, with a clear goal: maximizing your profit.' },
  'packages.from': { PL: 'od', ENG: 'from' },
  'packages.individual': { PL: 'Indywidualnie', ENG: 'Individually' },
  'packages.choose': { PL: 'Wybieram ten pakiet', ENG: 'Choose this package' },

  // Contact Modal
  'contact.title': { PL: 'Wycena w 30 minut', ENG: 'Quote in 30 minutes' },
  'contact.subtitle': { PL: 'Zostaw dane, a nasz ekspert skontaktuje się z Tobą.', ENG: 'Leave your details and our expert will contact you.' },
  'contact.name': { PL: 'Imię i Nazwisko', ENG: 'Full Name' },
  'contact.name_placeholder': { PL: 'np. Jan Kowalski', ENG: 'e.g. John Doe' },
  'contact.contact_info': { PL: 'Adres email / Numer telefonu', ENG: 'Email / Phone number' },
  'contact.contact_placeholder': { PL: 'np. jan@poczta.pl lub 791 000 000', ENG: 'e.g. john@email.com or +44 7700 900000' },
  'contact.service': { PL: 'Usługa', ENG: 'Service' },
  'contact.service_placeholder': { PL: 'Wybierz usługę...', ENG: 'Choose a service...' },
  'contact.message': { PL: 'Twoja wiadomość', ENG: 'Your message' },
  'contact.message_placeholder': { PL: 'Opisz krótko swój projekt...', ENG: 'Briefly describe your project...' },
  'contact.send': { PL: 'Wyślij zapytanie', ENG: 'Send inquiry' },

  // Start Project Page
  'start.step1.title': { PL: 'ZACZYNAJMY', ENG: 'LET\'S START' },
  'start.step1.subtitle': { PL: 'Z czym możemy Ci pomóc?', ENG: 'How can we help you?' },
  'start.step2.title': { PL: 'SZCZEGÓŁY', ENG: 'DETAILS' },
  'start.step2.subtitle': { PL: 'Jakiej dokładnie usługi szukasz?', ENG: 'What exact service are you looking for?' },
  'start.step3.title': { PL: 'BUDŻET NA PROJEKT', ENG: 'PROJECT BUDGET' },
  'start.step3.subtitle': { PL: 'Jaki budżet jesteś w stanie przeznaczyć na swój projekt?', ENG: 'What budget can you allocate for your project?' },
  'start.step4.title': { PL: 'PRAWIE GOTOWE', ENG: 'ALMOST DONE' },
  'start.step4.subtitle': { PL: 'Jak możemy się z Tobą skontaktować?', ENG: 'How can we contact you?' },
  'start.step4.name': { PL: 'IMIĘ', ENG: 'NAME' },
  'start.step4.email': { PL: 'E-MAIL', ENG: 'E-MAIL' },
  'start.step4.phone': { PL: 'NUMER TELEFONU', ENG: 'PHONE NUMBER' },
  'start.step4.next': { PL: 'DALEJ', ENG: 'NEXT' },
  'start.step5.done': { PL: 'GOTOWE!', ENG: 'DONE!' },
  'start.step5.desc': { PL: 'Odezwiemy się wkrótce.', ENG: 'We will contact you shortly.' },
  'start.step5.back': { PL: 'Wróć do strony głównej', ENG: 'Back to home page' },
  'start.continue': { PL: 'Kontynuuj', ENG: 'Continue' },

  // Footer
  'footer.ready': { PL: 'Gotowy na', ENG: 'Ready for' },
  'footer.growth': { PL: 'wzrost?', ENG: 'growth?' },
  'footer.desc': { PL: 'Zostaw konkurencję w tyle. Zbudujmy razem coś wielkiego.', ENG: 'Leave the competition behind. Let\'s build something great together.' },
  'footer.start': { PL: 'Rozpocznij projekt', ENG: 'Start a project' },
  'footer.contact_us': { PL: 'Skontaktuj się z nami', ENG: 'Contact us' },
  'footer.services': { PL: 'Usługi', ENG: 'Services' },
  'footer.company': { PL: 'Firma', ENG: 'Company' },
  'footer.about': { PL: 'O nas', ENG: 'About us' },
  'footer.portfolio': { PL: 'Portfolio', ENG: 'Portfolio' },
  'footer.careers': { PL: 'Kariera', ENG: 'Careers' },
  'footer.contact': { PL: 'Kontakt', ENG: 'Contact' },
  'footer.legal': { PL: 'Informacje prawne', ENG: 'Legal' },
  'footer.privacy': { PL: 'Polityka prywatności', ENG: 'Privacy Policy' },
  'footer.terms': { PL: 'Regulamin', ENG: 'Terms of Service' },
  'footer.cookies': { PL: 'Polityka Cookies', ENG: 'Cookies Policy' },
  'footer.rights': { PL: 'Wszelkie prawa zastrzeżone.', ENG: 'All rights reserved.' },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('PL');

  const t = (key: string): string => {
    if (translations[key] && translations[key][lang]) {
      return translations[key][lang];
    }
    return key; // Fallback to key if translation missing
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
