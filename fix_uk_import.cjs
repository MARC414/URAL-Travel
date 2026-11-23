const fs = require('fs');

const path = 'src/components/UkHubView.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'import { useLocale } from "../utils/localeProvider";\n',
  ''
);

fs.writeFileSync(path, content);
