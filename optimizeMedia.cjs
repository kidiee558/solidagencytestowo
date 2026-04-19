const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. VIDEOS - add preload="none"
code = code.replace(/<video(?![^>]*preload)/g, '<video preload="none"');

// Posters: Apply HomepageZdjecieWTle.webp as a poster for the background video "tło.mp4"
code = code.replace(/(<video[^>]*t%C5%82o\.mp4[^>]*)(?![^>]*poster)>/g, '$1 poster="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/HomepageZdjecieWTle.webp">');

// 2. IMAGES - loading attribute (first 3 eager, rest lazy)
let imgIndex = 0;
code = code.replace(/<img(?![^>]*loading)/g, (match) => {
  imgIndex++;
  if (imgIndex <= 3) {
    return '<img loading="eager"';
  }
  return '<img loading="lazy"';
});

// 3. IMAGES - Dimensions to prevent CLS
code = code.replace(/<img([^>]+)>/g, (match, attrs) => {
   if (attrs.includes('width=')) return match;

   let w = "1920";
   let h = "1080";

   if (attrs.includes('logosolidagency')) {
       w = "600"; h = "200";
   } else if (attrs.includes('rakieta.png') || attrs.includes('telefon getintouch')) {
       w = "500"; h = "500";
   } else if (attrs.includes('aspect-[4/3]')) {
       w = "800"; h = "600";
   } else if (attrs.includes('coverImage') || attrs.includes('item.image') || attrs.includes('fgImage')) {
       w = "1920"; h = "1080"; // Default to 16:9 for banners/portfolio items
   }

   // Inject just before the closing tag, checking if it ends with "/>" or ">"
   if (attrs.endsWith('/')) {
        return `<img${attrs.slice(0, -1)} width="${w}" height="${h}" />`;
   }
   return `<img${attrs} width="${w}" height="${h}">`;
});

fs.writeFileSync('src/App.tsx', code);
