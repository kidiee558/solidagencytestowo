const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// The original tag was `<video ... />`. 
// The regex `(<video[^>]*t%C5%82o\.mp4[^>]*)(?![^>]*poster)>` matched `/>` and changed it to `poster="..." >` leaving it unclosed!
// It should be `/>`.

code = code.replace(/poster="https:\/\/github\.com\/kidiee558\/solidagencytestowo\/raw\/refs\/heads\/main\/HomepageZdjecieWTle\.webp">/g, 'poster="https://github.com/kidiee558/solidagencytestowo/raw/refs/heads/main/HomepageZdjecieWTle.webp" />');

fs.writeFileSync('src/App.tsx', code);
