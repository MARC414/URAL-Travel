const fs = require('fs');

const path = 'scripts/prerender.ts';
let content = fs.readFileSync(path, 'utf8');

// Add /uk to buildAllRoutes array
content = content.replace(
  '    { routePath: "/bangladesh" }',
  '    { routePath: "/bangladesh" },\n    { routePath: "/uk" }'
);

// Add hreflang condition for UK
content = content.replace(
  'const localeTag = r.locale === "bn" ? "bn" : r.routePath.startsWith("/bangladesh") ? "en-BD" : "en";',
  'const localeTag = r.locale === "bn" ? "bn" : r.routePath.startsWith("/bangladesh") ? "en-BD" : r.routePath.startsWith("/uk") ? "en-GB" : "en";'
);
content = content.replace(
  'const localeOgp = r.locale === "bn" ? "bn_BD" : r.routePath.startsWith("/bangladesh") ? "en_BD" : "en_US";',
  'const localeOgp = r.locale === "bn" ? "bn_BD" : r.routePath.startsWith("/bangladesh") ? "en_BD" : r.routePath.startsWith("/uk") ? "en_GB" : "en_US";'
);

// Fix hreflang emission
content = content.replace(
  '        ? r.routePath.startsWith("/bangladesh")\n          ? `\\n    <xhtml:link rel="alternate" hreflang="en-BD" href="${escapeXml(r.enUrl)}" />`',
  '        ? r.routePath.startsWith("/uk")\n          ? `\\n    <xhtml:link rel="alternate" hreflang="en-GB" href="${escapeXml(r.enUrl)}" />`\n          : r.routePath.startsWith("/bangladesh")\n          ? `\\n    <xhtml:link rel="alternate" hreflang="en-BD" href="${escapeXml(r.enUrl)}" />`'
);

content = content.replace(
  '        /<link rel="alternate" hreflang="en" href="[^"]*" \\/>/,\n        r.routePath.startsWith("/bangladesh")\n          ? `<link rel="alternate" hreflang="en-BD" href="${escapeHtml(englishUrl)}" />`',
  '        /<link rel="alternate" hreflang="en" href="[^"]*" \\/>/,\n        r.routePath.startsWith("/uk")\n          ? `<link rel="alternate" hreflang="en-GB" href="${escapeHtml(englishUrl)}" />`\n          : r.routePath.startsWith("/bangladesh")\n          ? `<link rel="alternate" hreflang="en-BD" href="${escapeHtml(englishUrl)}" />`'
);

fs.writeFileSync(path, content);
