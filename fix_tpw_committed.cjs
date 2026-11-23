const fs = require('fs');

const tpwPath = 'src/components/TravelpayoutsWidget.tsx';
let tpwContent = fs.readFileSync(tpwPath, 'utf8');

// 1. Add guard to executeSearch
tpwContent = tpwContent.replace(
  "const finalDest = resolveTypedPlaceIfAny(nextDest, destQuery, 'dest');",
  "const finalDest = resolveTypedPlaceIfAny(nextDest, destQuery, 'dest');\n\n    if (!finalOrigin || !finalDest) return;\n"
);

// 2. Safe access to committedQuery.origin and destination
tpwContent = tpwContent.replace(/committedQuery\.origin\.code/g, "committedQuery.origin?.code");
tpwContent = tpwContent.replace(/committedQuery\.origin\.city/g, "committedQuery.origin?.city");
tpwContent = tpwContent.replace(/committedQuery\.destination\.code/g, "committedQuery.destination?.code");
tpwContent = tpwContent.replace(/committedQuery\.destination\.city/g, "committedQuery.destination?.city");

// For committedQuery initial state, use DAC/KTM as a defensive fallback so it never crashes if rendered without executing
tpwContent = tpwContent.replace(
  "const [committedQuery, setCommittedQuery] = useState<CommittedQuery>(() => ({",
  "const [committedQuery, setCommittedQuery] = useState<CommittedQuery>(() => ({\n    // Safe defensive fallback for initial state even if origin is empty\n"
);
tpwContent = tpwContent.replace(
  "origin: findAirportInfo(defaultOrigin),",
  "origin: findAirportInfo(defaultOrigin) || findAirportInfo('DAC'),"
);
tpwContent = tpwContent.replace(
  "destination: findAirportInfo(defaultDestination),",
  "destination: findAirportInfo(defaultDestination) || findAirportInfo('KTM'),"
);

fs.writeFileSync(tpwPath, tpwContent);

