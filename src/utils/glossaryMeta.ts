/**
 * The few /glossary strings the app shell needs on every page: the address,
 * the menu label and the SEO title. Kept apart from glossaryCopy.ts and the
 * term data so both stay in the route chunk and out of the eager bundle
 * (verify:build holds that bundle to a size budget). Import nothing here.
 */
export const GLOSSARY_PATH = "/glossary";

export const GLOSSARY_META = {
  en: {
    seoTitle: "Hajj, Umrah, Visa & Flight Terms Explained | URAL",
    seoDescription:
      "Plain meanings of Hajj, Umrah, visa, banking and flight terms, in English and Bengali. Each term links to a URAL guide and to the official source.",
    breadcrumb: "Glossary",
    navLabel: "Travel & Umrah Glossary",
    navSub: "Hajj, visa, banking & flight terms",
  },
  bn: {
    seoTitle: "হজ, ওমরাহ, ভিসা ও ফ্লাইটের শব্দকোষ | URAL",
    seoDescription:
      "হজ, ওমরাহ, ভিসা, ব্যাংকিং ও ফ্লাইটের শব্দগুলোর সহজ অর্থ, বাংলা ও ইংরেজি নামসহ। প্রতিটি শব্দের সঙ্গে URAL গাইড ও অফিসিয়াল সূত্রের লিংক আছে।",
    breadcrumb: "শব্দকোষ",
    navLabel: "ভ্রমণ ও ওমরাহ শব্দকোষ",
    navSub: "হজ, ভিসা, ব্যাংকিং ও ফ্লাইটের শব্দ",
  },
} as const;
