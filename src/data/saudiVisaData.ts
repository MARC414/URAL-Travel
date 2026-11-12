import type { FAQ, VisaGuide } from "../types";

// Source review: 12 November 2026. These are different routes, not a personal
// eligibility decision. See visaOfficialSources.ts for the linked authorities.
const faqs: FAQ[] = [
  { question: "Can a Bangladeshi passport holder apply for a Saudi tourist eVisa?", answer: "On 12 November 2026 the standard nationality-only eVisa list at visa.visitsaudi.com did not include Bangladesh. However, Visit Saudi separately names Bangladesh for a tourist Package Visa through an approved tourism provider with a qualifying flight and hotel package. Other eligibility categories may apply; check the official eligibility tool and provider for your own case." },
  { question: "What is the Saudi Package Visa?", answer: "Visit Saudi describes an electronic tourist visa linked to a qualifying package purchased through a Ministry-approved tourism provider. Its published minimum includes a confirmed round-trip flight, a Ministry-licensed hotel rated at least four stars and a visa application; it also publishes minimum package spending. Check the current requirements, itemized total and refund conditions before paying. A package is not an approval guarantee." },
  { question: "Does a stopover visa require a US, UK, GCC or Schengen tourist visa?", answer: "Visit Saudi's stopover page describes an airline-linked transit route for qualifying Saudia or flynas bookings; it does not state that every applicant must hold one of those foreign tourist visas. A genuine onward itinerary, applicable travel documents and airline conditions still matter. Confirm your nationality, itinerary, required documents and charges in the operating airline's current booking flow before purchase." },
  { question: "Can a US, UK or Schengen visa or residence change my tourist visa options?", answer: "It may, under a separate tourist visa eligibility category—not automatically a stopover requirement. A Saudi Ministry of Hajj and Umrah guide describes a separate visa-on-arrival category for holders of valid US, UK or Schengen visas, but its detailed current conditions are not established here. Confirm the current rules, accepted evidence and any carrier restrictions with official Saudi channels and your airline; eligibility is not guaranteed." },
  { question: "Can I perform Umrah on a tourist or stopover visa?", answer: "The Saudi eVisa portal includes Umrah but excludes Hajj under the tourist visa. Visit Saudi also describes Umrah during an eligible stopover. Visa terms, Nusuk permits, seasonal restrictions and current health requirements still apply. Do not assume a tourist visa is a Hajj permit or that every traveller must purchase the same Umrah package." },
  { question: "What will my visa cost and how long will it take?", answer: "Costs and timing depend on the route and provider. For a stopover, Visit Saudi distinguishes the visa fee from application and medical insurance charges; a zero visa fee does not mean the whole transaction is free. For a Package Visa or consular application, request current itemized charges, inclusions, processing and refund terms. Do not assume approval or a fixed completion time." },
  { question: "What should I check before paying?", answer: "Check your own passport and intended travel purpose against current official eligibility guidance; verify any provider and read its itemized quote and refund terms. Package Visa and airline stopover routes can require bookings during the application, so check those conditions and the risk of non-refundable costs before paying. Visa issuance and entry are not guaranteed." },
];
const schema = {
  "@context": "https://schema.org",
  "@type": "GovernmentService",
  name: "Saudi visa services",
  serviceType: "Visa application",
  provider: { "@type": "GovernmentOrganization", name: "Saudi authorities" },
  areaServed: "Bangladesh",
};
export const SAUDI_VISA: VisaGuide = {
  id: "saudi-arabia-visa", country: "Saudi Arabia", requirementType: "Multiple routes — check eligibility",
  costBdt: "Fees and package costs differ by route. Check the official channel and an itemized provider quote, including any application and insurance charges, before paying.",
  processingTime: "Timing varies by route and application. Check the current channel and provider instructions; neither issuance nor entry is guaranteed.",
  quickAnswer: "Checked 12 November 2026: Bangladesh was not on Saudi Arabia's standard nationality-only eVisa list. Visit Saudi separately lists Bangladesh for a qualifying tourist Package Visa. A genuine airline stopover, consular or Umrah route, or another eligible visa/residence category may also be relevant. Check your own eligibility and current conditions before paying; visa issuance and entry are not guaranteed.",
  keyFacts: [
    { label: "Standard nationality list", value: "Bangladesh not listed when checked 12 November 2026" },
    { label: "Tourist Package Visa", value: "Bangladesh listed; qualifying package and provider conditions apply" },
    { label: "Stopover", value: "Airline-linked transit; up to 96 hours under published conditions" },
    { label: "Other categories", value: "Check consular, Umrah and qualifying visa/residence routes" },
    { label: "Fees and timing", value: "Route-specific; confirm current total and terms" },
  ],
  documentChecklist: [
    { category: "Check your route and eligibility", items: [
      "Check the standard nationality list at visa.visitsaudi.com and the Visit Saudi eligibility guidance for your own passport and circumstances.",
      "For a Package Visa, check the Ministry-approved provider, qualifying round-trip flight and licensed hotel requirements, current minimum package conditions and the visa application process.",
      "For a stopover, check the operating airline's actual booking flow, onward itinerary, destination-entry documents, passport rules, insurance and full charges.",
      "For consular, Umrah or visa/residence-based routes, confirm your specific document list and eligibility through the Saudi embassy or official channel; do not assume a foreign visa or residence automatically qualifies."
    ] },
    { category: "Before paying or departing", items: [
      "Get itemized prices, inclusions and cancellation/refund conditions from the relevant provider. Some applications require bookings before visa approval; understand that risk before paying.",
      "For Umrah, check current Nusuk permit instructions, seasonal restrictions and Saudi Ministry of Health requirements for your circumstances.",
      "Check the issued visa's validity, entry count, permitted stay and purpose; keep the approval and supporting documents available for airline and border checks."
    ] },
  ],
  stepByStep: [
    "Decide whether your real purpose is tourism, Umrah or a genuine onward stopover; Hajj has a separate process.",
    "Check the standard eVisa nationality list at visa.visitsaudi.com and any relevant visa or residence eligibility conditions.",
    "Compare the Ministry-approved Package Visa, airline stopover, embassy/consular or appropriate Umrah route where applicable. Confirm the current terms for your passport and itinerary.",
    "Ask the official channel or approved provider for the applicable documents, itemized costs, payment sequence, cancellation and refund terms before committing.",
    "Submit the application through the appropriate channel and follow any requests for supporting evidence. An application, itinerary or package quote is not an approval.",
    "For Umrah, verify current health rules and Nusuk permit and seasonal requirements. Check travel and visa conditions before making non-refundable commitments.",
    "After issuance, check the visa details and carry the documents required by your carrier and destination. Border authorities make the final entry decision."
  ],
  faqs,
  schemaMarkup: { type: "GovernmentService", description: "Saudi visa route guidance for Bangladeshi travellers", code: JSON.stringify(schema) },
};

export const SAUDI_VISA_BN: Partial<VisaGuide> = {
  requirementType: "একাধিক পথ — নিজের যোগ্যতা যাচাই করুন",
  costBdt: "ভিসার পথ ও সেবাদাতা অনুযায়ী খরচ আলাদা। অর্থ দেওয়ার আগে সরকারি চ্যানেল ও provider-এর কাছ থেকে application, insurance এবং অন্য চার্জসহ বর্তমান itemized quote নিন।",
  processingTime: "পথ ও আবেদনভেদে সময় বদলায়। সংশ্লিষ্ট চ্যানেলের বর্তমান নির্দেশনা দেখুন; ভিসা ইস্যু বা প্রবেশ নিশ্চিত নয়।",
  quickAnswer: "১২ নভেম্বর ২০২৬-এ যাচাইয়ে সৌদির সাধারণ nationality-based eVisa তালিকায় বাংলাদেশ ছিল না। তবে Visit Saudi যোগ্য tourist Package Visa-র জন্য বাংলাদেশকে আলাদাভাবে তালিকাভুক্ত করেছে। ভ্রমণের ধরন অনুযায়ী airline stopover, consular, Umrah বা অন্য visa/residence eligibility-ও প্রাসঙ্গিক হতে পারে। অর্থ দেওয়ার আগে নিজের যোগ্যতা ও বর্তমান শর্ত যাচাই করুন; ভিসা বা প্রবেশ নিশ্চিত নয়।",
  keyFacts: [
    { label: "সাধারণ nationality তালিকা", value: "১২ নভেম্বর ২০২৬-এর যাচাইয়ে বাংলাদেশ তালিকায় নেই" },
    { label: "Tourist Package Visa", value: "বাংলাদেশ তালিকাভুক্ত; যোগ্য package ও provider-এর শর্ত প্রযোজ্য" },
    { label: "Stopover", value: "Airline-সংশ্লিষ্ট transit; প্রকাশিত শর্তে সর্বোচ্চ ৯৬ ঘণ্টা" },
    { label: "অন্যান্য পথ", value: "Consular, Umrah এবং যোগ্য visa/residence-এর পথ যাচাই করুন" },
    { label: "ফি ও সময়", value: "পথভেদে আলাদা; বর্তমান মোট খরচ ও শর্ত নিশ্চিত করুন" },
  ],
  documentChecklist: [
    { category: "প্রথমে নিজের পথ ও যোগ্যতা যাচাই করুন", items: [
      "visa.visitsaudi.com-এ সাধারণ nationality তালিকা এবং Visit Saudi-তে নিজের পাসপোর্ট ও পরিস্থিতির eligibility দেখুন।",
      "Package Visa-র ক্ষেত্রে Ministry-approved provider, যোগ্য round-trip flight ও licensed hotel, বর্তমান minimum package শর্ত এবং আবেদনপদ্ধতি যাচাই করুন।",
      "Stopover-এর জন্য যে airline ফ্লাইট চালাবে তার booking flow-এ onward itinerary, পরবর্তী গন্তব্যে প্রবেশের নথি, passport, insurance ও মোট চার্জ যাচাই করুন।",
      "Consular, Umrah বা visa/residence-ভিত্তিক পথে সৌদি দূতাবাস বা সরকারি চ্যানেল থেকে আপনার জন্য প্রযোজ্য নথি ও যোগ্যতা নিশ্চিত করুন; বিদেশি visa বা residence থাকলেই যোগ্য ধরে নেবেন না।"
    ] },
    { category: "টাকা দেওয়া ও যাত্রার আগে", items: [
      "সেবাদাতার কাছ থেকে খরচের খাত, অন্তর্ভুক্ত সেবা এবং cancellation/refund শর্ত লিখিতভাবে নিন। কিছু আবেদনে ভিসা অনুমোদনের আগেই booking লাগে; টাকা দেওয়ার আগে ঝুঁকি বুঝুন।",
      "Umrah-র জন্য বর্তমান Nusuk permit, মৌসুমি বিধিনিষেধ এবং সৌদি স্বাস্থ্য মন্ত্রণালয়ের আপনার ক্ষেত্রে প্রযোজ্য শর্ত দেখুন।",
      "ভিসা ইস্যুর পর validity, entry count, permitted stay ও উদ্দেশ্য মিলিয়ে দেখুন; airline ও border check-এর জন্য অনুমোদন ও সহায়ক নথি সঙ্গে রাখুন।"
    ] },
  ],
  stepByStep: [
    "প্রথমে সফরের আসল উদ্দেশ্য ঠিক করুন: tourism, Umrah নাকি অন্য দেশে যাওয়ার পথে প্রকৃত stopover। Hajj-এর প্রক্রিয়া আলাদা।",
    "visa.visitsaudi.com-এ সাধারণ eVisa nationality তালিকা এবং আপনার ক্ষেত্রে প্রাসঙ্গিক visa বা residence-এর eligibility দেখুন।",
    "প্রযোজ্য হলে Ministry-approved Package Visa, airline stopover, embassy/consular বা Umrah পথ তুলনা করুন। নিজের পাসপোর্ট ও itinerary-র বর্তমান শর্ত নিশ্চিত করুন।",
    "অর্থ দেওয়ার আগে সংশ্লিষ্ট সরকারি চ্যানেল বা অনুমোদিত provider-এর কাছ থেকে প্রয়োজনীয় নথি, itemized খরচ, payment sequence এবং cancellation/refund শর্ত জেনে নিন।",
    "সঠিক চ্যানেলে আবেদন জমা দিয়ে অতিরিক্ত নথি চাওয়া হলে নির্দেশনা অনুসরণ করুন। আবেদন, itinerary বা package quote মানেই অনুমোদন নয়।",
    "Umrah করলে বর্তমান health, Nusuk permit ও মৌসুমি শর্ত যাচাই করুন। অফেরতযোগ্য খরচের আগে ভ্রমণ ও ভিসার শর্ত বুঝে নিন।",
    "ভিসা ইস্যুর পর তার তথ্য মিলিয়ে airline ও গন্তব্যের প্রয়োজনীয় নথি সঙ্গে রাখুন। প্রবেশের চূড়ান্ত সিদ্ধান্ত সীমান্ত কর্তৃপক্ষের।"
  ],
  faqs: [
    { question: "বাংলাদেশি পাসপোর্টে সৌদি tourist eVisa পাওয়া যায়?", answer: "১২ নভেম্বর ২০২৬-এ visa.visitsaudi.com-এর সাধারণ nationality-based তালিকায় বাংলাদেশ ছিল না। তবে Visit Saudi অনুমোদিত tourism provider-এর যোগ্য flight ও hotel package-এর সঙ্গে বাংলাদেশিদের tourist Package Visa-র কথা আলাদাভাবে বলেছে। অন্য eligibility category-ও প্রযোজ্য হতে পারে; নিজের পরিস্থিতি সরকারি টুল ও provider-এর কাছে যাচাই করুন।" },
    { question: "Saudi Package Visa কী?", answer: "Visit Saudi অনুযায়ী এটি Ministry-approved tourism provider থেকে যোগ্য package কেনার সঙ্গে যুক্ত electronic tourist visa। প্রকাশিত ন্যূনতম শর্তে নিশ্চিত round-trip flight, Ministry-licensed অন্তত চার তারকার hotel ও visa application আছে; package-এর minimum খরচও নির্ধারিত। টাকা দেওয়ার আগে বর্তমান শর্ত, মোট খরচ ও refund নীতি যাচাই করুন। Package মানেই অনুমোদন নিশ্চিত নয়।" },
    { question: "Stopover visa পেতে US, UK, GCC বা Schengen tourist visa কি বাধ্যতামূলক?", answer: "Visit Saudi যোগ্য Saudia বা flynas booking-এর সঙ্গে airline-linked transit পথের কথা বলে; প্রত্যেক আবেদনকারীর ওই বিদেশি tourist visa থাকতে হবে, এমন শর্ত সেখানে বলা নেই। প্রকৃত onward itinerary, প্রযোজ্য ভ্রমণ নথি ও airline-এর শর্ত গুরুত্বপূর্ণ। কেনার আগে নিজের nationality, itinerary, নথি ও চার্জ সংশ্লিষ্ট airline-এর বর্তমান booking flow-এ নিশ্চিত করুন।" },
    { question: "US, UK বা Schengen visa বা residence থাকলে tourist visa-র সুযোগ বদলায়?", answer: "আলাদা tourist visa eligibility category-তে সুযোগ থাকতে পারে; এটি সব stopover-এর বাধ্যতামূলক শর্ত নয়। Saudi Ministry of Hajj and Umrah-এর গাইডে বৈধ US, UK বা Schengen visa-ধারীদের জন্য আলাদা visa-on-arrival category-র কথা আছে, তবে তার সব বর্তমান শর্ত এখানে নিশ্চিত করা যায়নি। বর্তমান নিয়ম, গ্রহণযোগ্য প্রমাণ ও carrier restriction সরকারি চ্যানেল এবং airline-এর কাছে নিশ্চিত করুন; যোগ্যতা নিশ্চিত নয়।" },
    { question: "Tourist বা stopover visa দিয়ে Umrah করা যায়?", answer: "সৌদি eVisa portal tourist visa-য় Umrah অন্তর্ভুক্ত করে, তবে Hajj নয়। Visit Saudi যোগ্য stopover-এও Umrah-র কথা বলে। তবু visa terms, Nusuk permit, মৌসুমি বিধিনিষেধ ও বর্তমান স্বাস্থ্যবিধি প্রযোজ্য। Tourist visa-কে Hajj permit বা সবার জন্য একই Umrah package বাধ্যতামূলক ধরে নেবেন না।" },
    { question: "ভিসার খরচ ও সময় কত?", answer: "পথ ও provider অনুযায়ী খরচ এবং সময় বদলায়। Stopover-এ Visit Saudi visa fee থেকে application ও medical insurance charge আলাদা দেখায়; visa fee শূন্য হলেও পুরো লেনদেন বিনামূল্যে নয়। Package Visa বা consular আবেদনে বর্তমান itemized charge, অন্তর্ভুক্ত সেবা, সময় ও refund শর্ত জেনে নিন। অনুমোদন বা নির্দিষ্ট সময় ধরে নেবেন না।" },
    { question: "টাকা দেওয়ার আগে কী যাচাই করব?", answer: "নিজের পাসপোর্ট ও ভ্রমণের উদ্দেশ্য অনুযায়ী সরকারি eligibility দেখুন, provider যাচাই করুন এবং খাতভিত্তিক quote ও refund শর্ত পড়ুন। Package Visa বা airline stopover আবেদনে ভিসার আগেই booking লাগতে পারে; টাকা দেওয়ার আগে সেই শর্ত ও অফেরতযোগ্য খরচের ঝুঁকি বুঝুন। ভিসা ইস্যু বা প্রবেশ নিশ্চিত নয়।" },
  ],
};
