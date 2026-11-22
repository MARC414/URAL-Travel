const fs = require('fs');

const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '    } else if (root === "flights" && segs.length <= 2) {',
  `    } else if (root === "bangladesh" && segs.length === 1) {\n      section = "bangladesh";\n      isLanding = true;\n    } else if (root === "flights" && segs.length <= 2) {`
);

fs.writeFileSync(path, content);
