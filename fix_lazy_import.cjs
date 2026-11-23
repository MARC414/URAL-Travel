const fs = require('fs');

const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// The BangladeshHubView should be lazy loaded like other views to not break eager chunk sizes
content = content.replace(
  'import BangladeshHubView from "./components/BangladeshHubView";',
  'const BangladeshHubView = React.lazy(() => import("./components/BangladeshHubView"));'
);

content = content.replace(
  '{section === "bangladesh" && <BangladeshHubView />}',
  '{section === "bangladesh" && (\n          <React.Suspense fallback={<div className="min-h-[44vh]" aria-hidden="true" />}>\n            <BangladeshHubView />\n          </React.Suspense>\n        )}'
);

fs.writeFileSync(path, content);
