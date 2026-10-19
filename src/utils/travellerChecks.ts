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
  elderlyAirline: { en: "Confirm the request, not just the code", bn: "কোড নয়, নিশ্চিত request দেখুন" },
  elderlyEquipment: { en: "Check the actual device and carrier approval", bn: "আসল device ও carrier approval যাচাই করুন" },
  elderlyHaram: { en: "Confirm the service point and level today", bn: "আজকের service point ও level নিশ্চিত করুন" },
  elderlyHotel: { en: "Confirm the door-to-door route", bn: "দরজা থেকে দরজা route নিশ্চিত করুন" },
  elderlyHealth: { en: "Keep clinical decisions with your clinician", bn: "Clinical সিদ্ধান্ত চিকিৎসকের সঙ্গে রাখুন" },
  ihramPoint: { en: "Confirm the route and the actual point", bn: "রুট ও আসল বিন্দু নিশ্চিত করুন" },
  ihramGarments: { en: "Prepare the garments before the boundary", bn: "সীমারেখার আগেই কাপড়ের প্রস্তুতি নিন" },
  ihramTransit: { en: "Confirm the connection, not the airport name", bn: "বিমানবন্দরের নাম নয়, সংযোগ নিশ্চিত করুন" },
  ihramMadinah: { en: "Confirm where the route meets the boundary", bn: "রুট কোথায় সীমারেখায় পৌঁছায় তা নিশ্চিত করুন" },
  ihramPersonal: { en: "Take personal rulings to a qualified scholar", bn: "ব্যক্তিগত রায় যোগ্য আলেমের কাছে নিন" },
  ramadanDeadline: { en: "Put the season cut-offs in your own calendar", bn: "সিজনের শেষ তারিখ নিজের ক্যালেন্ডারে লিখুন" },
  ramadanItikaf: { en: "Do not buy an I'tikaf place", bn: "ইতিকাফের জায়গা কিনবেন না" },
  ramadanAnnouncement: { en: "Wait for the Authority's own notice", bn: "কর্তৃপক্ষের নিজের বিজ্ঞপ্তির অপেক্ষা করুন" },
  ramadanBudget: { en: "Compare two dated quotes", bn: "তারিখসহ দুটি কোট তুলনা করুন" },
  ramadanRoute: { en: "Confirm visa, entry and permit before booking", bn: "বুকিংয়ের আগে ভিসা, প্রবেশ ও পারমিট নিশ্চিত করুন" },
  zamzamBox: { en: "Buy at the airport, carry it separately", bn: "বিমানবন্দরে কিনুন, আলাদাভাবে বহন করুন" },
  zamzamAirline: { en: "Confirm free or counted with your carrier", bn: "ফ্রি না গণনায়, ক্যারিয়ারের কাছে নিশ্চিত করুন" },
  datesAllowance: { en: "Personal use, not commercial quantity", bn: "ব্যক্তিগত ব্যবহার, বাণিজ্যিক পরিমাণ নয়" },
  goldDeclare: { en: "Weigh, count and declare", bn: "ওজন মাপুন, গুনুন, ঘোষণা দিন" },
  vatRefund: { en: "Keep it boxed or skip the refund", bn: "বাক্সেই রাখুন, নাহলে ফেরত বাদ দিন" },
} as const;

export function getTravellerCheck(paragraph: string) {
  const match = paragraph.trim().match(/^(Traveller check|যাত্রীর যাচাই) \((services|biometrics|registration|rawdah|network|visaEligibility|stopoverEligibility|stopoverPermits|hotelAccess|railBaggage|railTicket|flightConnection|flightBaggage|flightZamzam|womenVisa|womenAccess|womenRawdah|womenIhram|womenHealth|womenTaqsir|elderlyAirline|elderlyEquipment|elderlyHaram|elderlyHotel|elderlyHealth|ihramPoint|ihramGarments|ihramTransit|ihramMadinah|ihramPersonal|ramadanDeadline|ramadanItikaf|ramadanAnnouncement|ramadanBudget|ramadanRoute|zamzamBox|zamzamAirline|datesAllowance|goldDeclare|vatRefund)\):\s+([\s\S]+)$/);
  if (!match) return null;
  const key = match[2] as keyof typeof TITLES;
  const locale = match[1] === "Traveller check" ? "en" : "bn";
  return { key, locale, title: TITLES[key][locale], text: match[3].trim() };
}
