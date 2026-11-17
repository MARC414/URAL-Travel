/**
 * The few /visa-assistance strings the app shell needs on every page: the
 * address, the menu label and the SEO title. Kept apart from
 * visaAssistanceCopy.ts so the copy stays in the route chunk and out of the
 * eager bundle. Import nothing here.
 */
export const VISA_ASSISTANCE_PATH = "/visa-assistance";

export const VISA_ASSISTANCE_META = {
  en: {
    seoTitle: "Visa Application Assistance Through eVisas | URAL",
    seoDescription:
      "What eVisas.com is, how its paid application assistance works, what it costs on top of the government fee, and exactly where URAL's role ends. URAL informs and refers; it does not process visas.",
    breadcrumb: "Visa assistance",
    navLabel: "Visa Assistance",
    navSub: "Paid application help through eVisas",
  },
  bn: {
    seoTitle: "eVisas-এর মাধ্যমে ভিসা আবেদনে সহায়তা | URAL",
    seoDescription:
      "eVisas.com কী, তার পেইড আবেদন-সহায়তা কীভাবে কাজ করে, সরকারি ফি-র ওপর বাড়তি খরচ কত, এবং URAL-এর ভূমিকা ঠিক কোথায় শেষ। URAL তথ্য দেয় ও রেফার করে, ভিসা প্রক্রিয়া করে না।",
    breadcrumb: "ভিসা সহায়তা",
    navLabel: "ভিসা সহায়তা",
    navSub: "eVisas-এর পেইড আবেদন সহায়তা",
  },
} as const;