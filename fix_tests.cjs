const fs = require('fs');

const path = 'scripts/verify-build.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '      londonEnHtml.includes(\'hreflang="bn-bd"\') &&\n      londonBnHtml.includes(\'hreflang="en-bd"\') &&',
  '      londonEnHtml.includes(\'hreflang="bn"\') &&\n      londonBnHtml.includes(\'hreflang="en"\') &&'
);

content = content.replace(
  '          enHtml.includes(\'hreflang="bn-bd"\') &&\n          bnHtml.includes(\'hreflang="en-bd"\')',
  '          enHtml.includes(\'hreflang="bn"\') &&\n          bnHtml.includes(\'hreflang="en"\')'
);

fs.writeFileSync(path, content);
