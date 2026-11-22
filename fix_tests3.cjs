const fs = require('fs');

const path = 'scripts/verify-build.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '!html.includes(`hreflang="bn-bd" href="${pair.bnUrl}"`) ||',
  '!html.includes(`hreflang="bn" href="${pair.bnUrl}"`) ||'
);
content = content.replace(
  '!html.includes(`hreflang="en-bd" href="${pair.enUrl}"`)',
  '!html.includes(`hreflang="en" href="${pair.enUrl}"`)'
);

fs.writeFileSync(path, content);
