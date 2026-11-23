const fs = require('fs');

const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// The BangladeshHubView was not imported at the top of App.tsx
if (!content.includes('import BangladeshHubView from "./components/BangladeshHubView";')) {
    content = content.replace(
      'import PageFooter from "./components/PageFooter";',
      'import PageFooter from "./components/PageFooter";\nimport BangladeshHubView from "./components/BangladeshHubView";'
    );
    fs.writeFileSync(path, content);
}
