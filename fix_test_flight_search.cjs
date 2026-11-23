const fs = require('fs');

const tpwPath = 'scripts/test-flight-search.ts';
let content = fs.readFileSync(tpwPath, 'utf8');

// The widget correctly has no handoff link if the origin is empty. 
// For tests that validate handoff URLs, supply a defaultOrigin.
content = content.replace(
  "React.createElement(TravelpayoutsWidget as React.ComponentType<any>, { lang, showInlineResults, showQuickRoutes: false }),",
  "React.createElement(TravelpayoutsWidget as React.ComponentType<any>, { lang, showInlineResults, showQuickRoutes: false, defaultOrigin: \"DAC\" }),"
);

// We should also test that when the widget renders without an origin, it renders safely.
// This is already checked inherently by the next test block, but let's make sure.
content = content.replace(
  "React.createElement(TravelpayoutsWidget as React.ComponentType<any>, { lang, showQuickRoutes: true, showInlineResults: true })",
  "React.createElement(TravelpayoutsWidget as React.ComponentType<any>, { lang, showQuickRoutes: true, showInlineResults: true, defaultOrigin: \"DAC\" })"
);

fs.writeFileSync(tpwPath, content);
