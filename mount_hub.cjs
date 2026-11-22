const fs = require('fs');

const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'import PageFooter from "./components/PageFooter";',
  'import PageFooter from "./components/PageFooter";\nimport BangladeshHubView from "./components/BangladeshHubView";'
);

content = content.replace(
  '        {/* -------------------------------------------------------------\n            🏠 VIEW 1: HOME PAGE (CONVERSION HUB)\n        ------------------------------------------------------------- */}',
  `        {/* -------------------------------------------------------------\n            🇧🇩 VIEW 01b: BANGLADESH HUB\n        ------------------------------------------------------------- */}\n        {section === "bangladesh" && <BangladeshHubView />}\n\n        {/* -------------------------------------------------------------\n            🏠 VIEW 1: HOME PAGE (CONVERSION HUB)\n        ------------------------------------------------------------- */}`
);

fs.writeFileSync(path, content);
