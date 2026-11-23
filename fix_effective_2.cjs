const fs = require('fs');

const tpwPath = 'src/components/TravelpayoutsWidget.tsx';
let tpwContent = fs.readFileSync(tpwPath, 'utf8');

tpwContent = tpwContent.replace(/effectiveOrigin\.name/g, "effectiveOrigin?.name");
tpwContent = tpwContent.replace(/effectiveDest\.name/g, "effectiveDest?.name");

tpwContent = tpwContent.replace(/effectiveOrigin\.city/g, "effectiveOrigin?.city");
tpwContent = tpwContent.replace(/effectiveDest\.city/g, "effectiveDest?.city");

fs.writeFileSync(tpwPath, tpwContent);
