const fs = require('fs');

const file = 'src/data/blogContent.ts';
let content = fs.readFileSync(file, 'utf8');

// dual-currency endorsement -> /glossary
content = content.replace(
  /as the cluster's endorsement guide explains/,
  'as the cluster\'s [endorsement](/glossary#passport-endorsement) guide explains'
);
content = content.replace(
  /ask for the travel entitlement to be recorded/,
  'ask for the [travel entitlement](/glossary#travel-quota) to be recorded'
);
content = content.replace(
  /NID\*\* to your bank's foreign-exchange desk/,
  'NID** to your [RFCD](/glossary#rfcd)-holding bank\'s foreign-exchange desk'
);

// e-Passport guide -> /resources + /glossary
content = content.replace(
  /official \*\*2026 Department of Immigration & Passports \(epassport\.gov\.bd\)\*\*/,
  'official **2026 [Department of Immigration & Passports (epassport.gov.bd)](/resources#identification)**'
);
content = content.replace(
  /valid or expired Bangladeshi \*\*MRP or e-Passport\*\*/,
  'valid or expired Bangladeshi **[MRP](/glossary#mrp) or [e-Passport](/glossary#e-passport)**'
);

// Thailand eVisa -> /visa-assistance + /resources + /glossary
content = content.replace(
  /official \*\*e-Visa portal \(thaievisa\.go\.th\)\*\*/,
  'official **[e-Visa portal (thaievisa.go.th)](/resources#thailand)**'
);
content = content.replace(
  /lists financial evidence of at least \*\*THB 20,000\*\*/,
  'lists [financial evidence](/glossary#financial-evidence) of at least **THB 20,000**'
);
content = content.replace(
  /Tourist Visa \(\*\*TR\*\*\) with a 3-month/,
  'Tourist Visa (**[TR](/glossary#tourist-visa)**) with a 3-month'
);
content = content.replace(
  /A balance alone does not guarantee approval\./,
  'A balance alone does not guarantee approval. For paid help filing your documents, see our [visa application assistance](/visa-assistance) guide.'
);

// flight delay/compensation -> /glossary
content = content.replace(
  /is 1,519 Special Drawing Rights \(SDR\) per passenger/,
  'is 1,519 [Special Drawing Rights (SDR)](/glossary#special-drawing-rights) per passenger'
);
content = content.replace(
  /European Regulation EC 261\/2004 \(EU Flights\):\*\*\n  Applies/,
  'European Regulation EC 261/2004 (EU Flights):**\n  [EC 261](/glossary#ec261) applies'
);
content = content.replace(
  /The duty of care may still apply/,
  'The [duty of care](/glossary#duty-of-care) may still apply'
);

fs.writeFileSync(file, content);
console.log('patched EN safely');
