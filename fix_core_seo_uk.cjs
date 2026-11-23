const fs = require('fs');

const path = 'src/utils/coreSeoCopy.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '  "/bangladesh": {',
  `  "/uk": {
    title: "UK Travel Hub & Intelligence | URAL",
    description: "Travel intelligence for the UK market: DIY Umrah preparation, ATOL checks, and UK261 flight disruption guides."
  },
  "/bangladesh": {`
);

fs.writeFileSync(path, content);
