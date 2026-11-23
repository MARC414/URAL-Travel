const fs = require('fs');

const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add to SectionType
content = content.replace(
  'type SectionType = "bangladesh" | "home"',
  'type SectionType = "uk" | "bangladesh" | "home"'
);

// 2. Add lazy import
content = content.replace(
  'const BangladeshHubView = React.lazy(() => import("./components/BangladeshHubView"));',
  'const BangladeshHubView = React.lazy(() => import("./components/BangladeshHubView"));\nconst UkHubView = React.lazy(() => import("./components/UkHubView"));'
);

// 3. Add to routing logic
content = content.replace(
  '    } else if (root === "bangladesh" && segs.length === 1) {\n      section = "bangladesh";\n      isLanding = true;',
  '    } else if (root === "uk" && segs.length === 1) {\n      section = "uk";\n      isLanding = true;\n    } else if (root === "bangladesh" && segs.length === 1) {\n      section = "bangladesh";\n      isLanding = true;'
);

// 4. Mount the component
content = content.replace(
  '        {/* -------------------------------------------------------------\n            🇧🇩 VIEW 01b: BANGLADESH HUB\n        ------------------------------------------------------------- */}',
  '        {/* -------------------------------------------------------------\n            🇬🇧 VIEW 01c: UK HUB\n        ------------------------------------------------------------- */}\n        {section === "uk" && (\n          <React.Suspense fallback={<div className="min-h-[44vh]" aria-hidden="true" />}>\n            <UkHubView />\n          </React.Suspense>\n        )}\n\n        {/* -------------------------------------------------------------\n            🇧🇩 VIEW 01b: BANGLADESH HUB\n        ------------------------------------------------------------- */}'
);

fs.writeFileSync(path, content);
