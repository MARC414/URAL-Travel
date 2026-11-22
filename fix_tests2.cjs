const fs = require('fs');

const path = 'scripts/verify-build.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '        bnHtml.includes(\'hreflang="bn"\') &&\n        bnHtml.includes(\'hreflang="en"\')',
  '        enHtml.includes(\'hreflang="bn"\') &&\n        bnHtml.includes(\'hreflang="en"\')'
);

// Look for remaining hreflang checks in verify build
console.log(content.match(/hreflang="bn-bd"/g));

fs.writeFileSync(path, content);
