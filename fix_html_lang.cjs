const fs = require('fs');

let prerender = fs.readFileSync('scripts/prerender.ts', 'utf8');

prerender = prerender.replace(
  'const localeTag = r.locale === "bn" ? "bn-BD" : "en-BD";',
  'const localeTag = r.locale === "bn" ? "bn" : "en";'
);

fs.writeFileSync('scripts/prerender.ts', prerender);
