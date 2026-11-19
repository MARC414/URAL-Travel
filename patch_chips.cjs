const fs = require('fs');

const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '{ label: isBn ? "লন্ডন গাইড" : "London Guide", path: "/destinations/london-guide" },',
  '{ label: isBn ? "লন্ডন গাইড" : "London Guide", path: "/destinations/london-guide" },\n                        { label: isBn ? "কাশ্মীর" : "Kashmir", path: "/destinations/kashmir-guide" },'
);

fs.writeFileSync(path, content);
