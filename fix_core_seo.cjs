const fs = require('fs');

const path = 'src/utils/coreSeoCopy.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '  "/": {',
  `  "/bangladesh": {
    title: "Bangladesh Travel Guides, Flights & Visas from Dhaka | URAL",
    description: "Plan travel from Dhaka with BDT flight guidance, visa checklists for Bangladeshi passport holders, destination itineraries and practical trip-budget guides."
  },
  "/": {`
);

fs.writeFileSync(path, content);
