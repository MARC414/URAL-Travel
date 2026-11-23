const fs = require('fs');
const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'type SectionType = "home"',
  'type SectionType = "bangladesh" | "home"'
);

fs.writeFileSync(path, content);
