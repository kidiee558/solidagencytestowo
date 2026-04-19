const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix the poster injection error: The regex matched the closing bracket `/>` and appended the poster wrong.
code = code.replace(/\/ poster=/g, 'poster=');

fs.writeFileSync('src/App.tsx', code);
