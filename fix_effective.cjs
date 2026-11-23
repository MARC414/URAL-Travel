const fs = require('fs');

const tpwPath = 'src/components/TravelpayoutsWidget.tsx';
let tpwContent = fs.readFileSync(tpwPath, 'utf8');

tpwContent = tpwContent.replace(/effectiveOrigin\.code/g, "(effectiveOrigin?.code || '')");
tpwContent = tpwContent.replace(/effectiveDest\.code/g, "(effectiveDest?.code || '')");

fs.writeFileSync(tpwPath, tpwContent);
