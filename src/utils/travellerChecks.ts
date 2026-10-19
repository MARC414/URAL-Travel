/** Plain-text, locale-specific callouts. Kept in the body so source and visible copy cannot diverge. */
const TITLES = {
  visaEligibility: { en: "Before paying: confirm your visa route", bn: "টাকা দেওয়ার আগে নিজের ভিসার পথ যাচাই করুন" },
  stopoverEligibility: { en: "Confirm your airline eligibility before payment", bn: "টাকা দেওয়ার আগে airline-এর যোগ্যতা নিশ্চিত করুন" },
  stopoverPermits: { en: "Check appointments and your departure window", bn: "Appointment ও departure window মিলিয়ে নিন" },
  womenVisa: { en: "Check civil eligibility and religious advice separately", bn: "Civil eligibility ও ধর্মীয় advice আলাদা যাচাই করুন" },
  womenAccess: { en: "Confirm the actual prayer and hotel route", bn: "আসল prayer ও hotel route নিশ্চিত করুন" },
  womenRawdah: { en: "Check the women’s booking and care arrangements", bn: "নারীদের booking ও care arrangement যাচাই করুন" },
  womenIhram: { en: "Resolve personal Ihram questions before entering it", bn: "Ihram-এর আগে ব্যক্তিগত প্রশ্ন মিটিয়ে নিন" },
  womenHealth: { en: "Seek private religious and clinical advice", bn: "ব্যক্তিগত ধর্মীয় ও clinical advice নিন" },
  womenTaqsir: { en: "Confirm the method and a suitable private place", bn: "পদ্ধতি ও উপযুক্ত private place নিশ্চিত করুন" },
  flightConnection: { en: "Confirm the actual connection before payment", bn: "Payment-এর আগে আসল connection নিশ্চিত করুন" },
  flightBaggage: { en: "Check every ticket and actual bag", bn: "প্রতিটি ticket ও আসল bag যাচাই করুন" },
  flightZamzam: { en: "Confirm Zamzam acceptance for the full journey", bn: "পুরো journey-তে Zamzam acceptance নিশ্চিত করুন" },
  hotelAccess: { en: "Confirm the room and full access route", bn: "Room ও পুরো access route নিশ্চিত করুন" },
  railBaggage: { en: "Check each passenger’s actual bags", bn: "প্রতিটি passenger-এর আসল bag মিলিয়ে নিন" },
  railTicket: { en: "Read the selected ticket and transfer terms", bn: "নির্বাচিত ticket ও transfer-এর terms পড়ুন" },
  services: { en: "Before you continue", bn: "এগোনোর আগে যাচাই করুন" },
  biometrics: { en: "Check your own biometric request", bn: "নিজের বায়োমেট্রিকের নির্দেশনা যাচাই করুন" },
  registration: { en: "Check the current registration screen", bn: "বর্তমান নিবন্ধন স্ক্রিন যাচাই করুন" },
  rawdah: { en: "Check your actual Rawdah booking", bn: "নিজের Rawdah বুকিং যাচাই করুন" },
  network: { en: "Check access on your phone and network", bn: "নিজের ফোন ও নেটওয়ার্কে প্রবেশ যাচাই করুন" },
} as const;

export function getTravellerCheck(paragraph: string) {
  const match = paragraph.trim().match(/^(Traveller check|যাত্রীর যাচাই) \((services|biometrics|registration|rawdah|network|visaEligibility|stopoverEligibility|stopoverPermits|hotelAccess|railBaggage|railTicket|flightConnection|flightBaggage|flightZamzam|womenVisa|womenAccess|womenRawdah|womenIhram|womenHealth|womenTaqsir)\):\s+([\s\S]+)$/);
  if (!match) return null;
  const key = match[2] as keyof typeof TITLES;
  const locale = match[1] === "Traveller check" ? "en" : "bn";
  return { key, locale, title: TITLES[key][locale], text: match[3].trim() };
}
