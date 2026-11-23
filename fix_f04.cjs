const fs = require('fs');

const tpwPath = 'src/components/TravelpayoutsWidget.tsx';
let tpwContent = fs.readFileSync(tpwPath, 'utf8');

// 1. Change findAirportInfo to return null when empty
tpwContent = tpwContent.replace(
  'if (!codeOrQuery) return AIRPORTS_DIRECTORY[0];',
  'if (!codeOrQuery) return null;'
);

// 2. Change TravelpayoutsWidget default props
tpwContent = tpwContent.replace(
  "defaultOrigin = 'DAC',",
  "defaultOrigin = '',"
);

// 3. Fix preferredCurrencyForOrigin invocation
tpwContent = tpwContent.replace(
  "const [currency, setCurrency] = useState<\"BDT\" | \"USD\" | \"EUR\" | \"GBP\" | \"SAR\" | \"AED\">(() => preferredCurrencyForOrigin(defaultOrigin));",
  "const [currency, setCurrency] = useState<\"BDT\" | \"USD\" | \"EUR\" | \"GBP\" | \"SAR\" | \"AED\">(() => preferredCurrencyForOrigin(defaultOrigin || 'DAC'));"
);

tpwContent = tpwContent.replace(
  "setCurrency(preferredCurrencyForOrigin(originInfo.code));",
  "setCurrency(preferredCurrencyForOrigin(originInfo?.code || ''));"
);

tpwContent = tpwContent.replace(
  "}, [originInfo.code]);",
  "}, [originInfo?.code]);"
);

// 4. Fix originInfo properties usage
tpwContent = tpwContent.replace(
  "originInfo.flag || '✈️'",
  "originInfo?.flag || '✈️'"
);
tpwContent = tpwContent.replace(
  "originInfo.city",
  "originInfo?.city || ''"
);
tpwContent = tpwContent.replace(
  "originInfo.code",
  "originInfo?.code || ''"
);
// replace multiple times
tpwContent = tpwContent.replace(/originInfo\.city/g, "originInfo?.city");
tpwContent = tpwContent.replace(/originInfo\.code/g, "originInfo?.code");

fs.writeFileSync(tpwPath, tpwContent);

const toolsPath = 'src/components/InteractiveTools.tsx';
let toolsContent = fs.readFileSync(toolsPath, 'utf8');

toolsContent = toolsContent.replace(
  'const [inquiryOrigin, setInquiryOrigin] = useState("DAC");',
  'const [inquiryOrigin, setInquiryOrigin] = useState("");'
);

fs.writeFileSync(toolsPath, toolsContent);
