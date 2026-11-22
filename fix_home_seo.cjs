const fs = require('fs');

const path = 'src/utils/coreSeoCopy.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'title: "Bangladesh Travel Guides, Flights & Visas from Dhaka | URAL",',
  'title: "Travel Intelligence: Global Flights, Hotels & eVisas | URAL",'
);

fs.writeFileSync(path, content);
