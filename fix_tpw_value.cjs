const fs = require('fs');

const tpwPath = 'src/components/TravelpayoutsWidget.tsx';
let tpwContent = fs.readFileSync(tpwPath, 'utf8');

tpwContent = tpwContent.replace(
  "`${originInfo?.flag || '✈️'} ${originInfo?.city || ''} (${originInfo?.code || ''})`",
  "originInfo ? `${originInfo.flag || '✈️'} ${originInfo.city} (${originInfo.code})` : ''"
);

fs.writeFileSync(tpwPath, tpwContent);
