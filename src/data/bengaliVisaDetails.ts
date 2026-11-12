import type { VisaGuide } from "../types";

/** Natural Bengali decision guidance; familiar application terms stay in English.
 * This localizes the existing guides, not a new verification of their rules. */
export const BENGALI_VISA_DETAILS: Record<string, Partial<VisaGuide>> = {
  "nepal-visa": {
    costBdt: "যোগ্য হলে প্রতি ক্যালেন্ডার বছরের প্রথম প্রবেশে SAARC gratis visa প্রযোজ্য হতে পারে। পরবর্তী সফর বা ভিন্ন মেয়াদের বর্তমান ফি Nepal Immigration-এ নিশ্চিত করুন।",
    processingTime: "Visa on Arrival সীমান্তে মূল্যায়ন হয়; অপেক্ষার সময় নিশ্চিত নয়।",
    quickAnswer: "বাংলাদেশি নাগরিকদের প্রতি ক্যালেন্ডার বছরের প্রথম প্রবেশে নেপালের ৩০ দিনের SAARC gratis Visa on Arrival প্রযোজ্য হতে পারে। পরে একই বছরে আবার গেলে বা বেশি দিন থাকতে চাইলে বর্তমান ফি ও শর্ত Nepal Immigration-এ দেখুন। আগমনের সময় ও চূড়ান্ত প্রবেশের সিদ্ধান্ত নিশ্চিত নয়।",
    keyFacts: [
      { label: "ভিসার ধরন", value: "Tourist Visa on Arrival" }, { label: "বছরের প্রথম প্রবেশ", value: "যোগ্য হলে SAARC gratis visa" },
      { label: "একই বছরে পরের সফর", value: "বর্তমান ফি সরকারি সূত্রে যাচাই করুন" }, { label: "ভিসা বছর", value: "ক্যালেন্ডার বছর; জানুয়ারিতে নতুন বছর শুরু" },
    ],
    documentChecklist: [{ category: "বিমানবন্দর বা সীমান্তে যা যাচাই করবেন", items: [
      "ভ্রমণের তারিখ থেকে অন্তত ছয় মাস বৈধ পাসপোর্ট—বর্তমান সরকারি ও airline শর্তও মিলিয়ে নিন।",
      "সাম্প্রতিক সাদা background-এর passport-size ছবি।",
      "Nepal Tourist Visa arrival form-এর print বা digital copy; আগে পূরণ করা সুবিধাজনক, না করলে আগমনে kiosk-এর ব্যবস্থা যাচাই করুন।",
      "নিশ্চিত return flight ticket।", "নেপালে থাকার hotel booking confirmation।",
    ] }],
    stepByStep: [
      "সময় বাঁচাতে চাইলে ফ্লাইটের আগে Nepal Tourist Visa arrival form অনলাইনে পূরণ করুন; এটি বাধ্যতামূলক নয়, আগমনের kiosk-এর বর্তমান ব্যবস্থা যাচাই করুন।",
      "Tribhuvan International Airport-এ পৌঁছে আগে form না করে থাকলে self-service kiosk-এ passport scan করে receipt নিন।",
      "Visa counter-এ SAARC যাত্রীদের সারির নির্দেশনা দেখুন এবং passport, ছবি ও form/receipt দিন।",
      "চলতি ক্যালেন্ডার বছরে প্রথম প্রবেশ হলে ৩০ দিনের gratis visa-র যোগ্যতা যাচাই করুন; পুনরায় প্রবেশ বা অন্য মেয়াদে বর্তমান ফি ও গ্রহণযোগ্য payment method নিশ্চিত করুন।",
      "Immigration-এর সিদ্ধান্ত ও passport stamp-এর পর luggage নিয়ে arrivals hall-এ যান।",
    ],
    faqs: [
      { question: "বাংলাদেশিদের নেপাল ভিসা কি বিনামূল্যে?", answer: "বর্তমান SAARC gratis নিয়মে যোগ্য বাংলাদেশি নাগরিকের ক্যালেন্ডার বছরের প্রথম প্রবেশে সর্বোচ্চ ৩০ দিনের visa বিনামূল্যে হতে পারে। একই বছরে আবার গেলে বা বেশি দিন থাকলে ভিন্ন ফি ও শর্ত প্রযোজ্য হতে পারে; Nepal Immigration-এ যাচাই করুন।" },
      { question: "একই বছরে দ্বিতীয়বার গেলে কী হবে?", answer: "প্রথম প্রবেশের gratis সুবিধা আবার প্রযোজ্য না-ও হতে পারে। ভ্রমণের আগে নেপালের সরকারি visa fee ও counter-এ কোন currency বা payment গ্রহণ করে তা নিশ্চিত করুন; পুরোনো ফি ধরে টাকা প্রস্তুত করবেন না।" },
      { question: "আকাশপথের বদলে স্থলসীমান্ত দিয়ে প্রবেশ করা যায়?", answer: "নেপালের নির্দিষ্ট স্থলসীমান্তে Visa on Arrival-এর ব্যবস্থা রয়েছে। নিজের নির্বাচিত crossing, যাত্রাপথ, খোলা থাকার সময় ও SAARC gratis সুবিধা সেই সীমান্তে প্রযোজ্য কি না সরকারি কর্তৃপক্ষের কাছে আগেই নিশ্চিত করুন।" },
      { question: "শিশুর জন্য আলাদা ভিসা লাগবে?", answer: "প্রতিটি যাত্রীর নিজস্ব ভ্রমণ নথি ও প্রবেশের শর্ত যাচাই করতে হবে। নেপালের শিশুদের জন্য ফি-ছাড়ের নিয়ম প্রযোজ্য হতে পারে; শিশুর বয়স ও সফর অনুযায়ী বর্তমান immigration নির্দেশনা দেখুন।" },
      { question: "ঢাকা থেকে উড়ার আগে Nepal e-Visa লাগবে?", answer: "এই গাইডে পর্যটকদের জন্য Visa on Arrival পথ বর্ণনা করা হয়েছে। Arrival form আগাম পূরণ করা ও আগাম visa approval এক জিনিস নয়। আপনার passport, ভ্রমণের উদ্দেশ্য ও airline-এর জন্য বর্তমান নির্দেশনা মিলিয়ে নিন।" },
      { question: "Gratis ভিসায় কত দিন থাকা যায়?", answer: "যোগ্য প্রথম প্রবেশের SAARC gratis পর্যটক ভিসা সর্বোচ্চ ৩০ দিনের হতে পারে। Passport-এ দেওয়া আসল permitted stay দেখুন; বেশি দিন থাকতে চাইলে মেয়াদ শেষের আগে Nepal Immigration-এর extension নিয়ম ও ফি যাচাই করুন।" },
      { question: "নেপালে থেকে tourist visa বাড়ানো যায়?", answer: "পর্যটক ভিসার extension-এর ব্যবস্থা Kathmandu বা Pokhara-র Department of Immigration-এ থাকতে পারে। মেয়াদ শেষের আগেই online form, প্রয়োজনীয় নথি, সর্বনিম্ন extension সময় ও বর্তমান ফি সরকারি অফিসে নিশ্চিত করুন; অনুমোদন ধরে নেবেন না।" },
      { question: "ভিসার সময় পেরিয়ে গেলে কী হতে পারে?", answer: "Overstay-এ ফি, জরিমানা, যাত্রায় বিলম্ব বা অন্যান্য প্রশাসনিক ব্যবস্থা হতে পারে। অঙ্ক ও ব্যবস্থা পরিস্থিতি অনুযায়ী বদলাতে পারে; মেয়াদ শেষের আগেই বৈধ extension বা প্রস্থানের ব্যবস্থা করুন এবং সমস্যায় Nepal Immigration-এর সঙ্গে যোগাযোগ করুন।" },
    ],
  },
  "thailand-visa": {
    keyFacts: [ { label: "আবেদনের পথ", value: "Official e-Visa portal: thaievisa.go.th" }, { label: "Visa on Arrival?", value: "বাংলাদেশি পর্যটকদের অগ্রিম visa প্রয়োজন" }, { label: "Tourist Visa (TR)", value: "Stay ও validity ইস্যু করা ভিসায় যাচাই করুন" }, { label: "Processing", value: "আবেদনভেদে ভিন্ন; সিদ্ধান্তের সময় নিশ্চিত নয়" } ],
    documentChecklist: [
      { category: "মূল নথি — thaievisa.go.th-এ upload", items: [
        "অন্তত ছয় মাস বৈধ ও দুটি ফাঁকা পৃষ্ঠাসহ passport-এর পরিষ্কার রঙিন scan; বর্তমান portal নির্দেশনা মিলিয়ে নিন।",
        "গত ছয় মাসে তোলা সাদা background-এর 35mm × 45mm digital ছবি; বর্তমান photo specification যাচাই করুন।",
        "নিশ্চিত return flight itinerary।", "পুরো সফরের accommodation booking-এর প্রমাণ।",
        "বর্তমান Dhaka mission checklist-এ চাওয়া financial evidence। ৩০ নভেম্বর ২০২২-এ হালনাগাদ Dhaka TR checklist-এ জনপ্রতি BDT 60,000 বা পরিবারে BDT 120,000, ছয় মাসের statement ও solvency certificate ছিল; সাধারণ Thai Tourist Visa পেজে THB 20,000-এর প্রমাণের কথা আছে। কোন বর্তমান শর্ত আপনার আবেদনে প্রযোজ্য portal-এ নিশ্চিত করুন।",
        "বর্তমান portal checklist-এ চাওয়া bank solvency, sponsor, পরিবারের সম্পর্ক বা অতিরিক্ত প্রমাণ।",
      ] },
      { category: "পেশা অনুযায়ী প্রমাণ — Dhaka jurisdiction", items: [
        "চাকরিজীবী: employer-এর No Objection Certificate (NOC) ও office ID/visiting card।",
        "ব্যবসায়ী: notarized Trade License, প্রয়োজনে English translation ও company pad-এ চিঠি।",
        "শিক্ষার্থী: বৈধ student ID ও প্রতিষ্ঠানের bonafide certificate।",
        "স্বামী-স্ত্রী একসঙ্গে গেলে: marriage certificate; passport-এ নামের পার্থক্য থাকলে notarization-এর নির্দেশনা দেখুন।",
      ] },
    ],
    stepByStep: [
      "Thailand-এর official e-Visa portal thaievisa.go.th-এ account খুলে আবেদনের জন্য Dhaka jurisdiction বেছে নিন।",
      "Tourist Visa (TR) বেছে ভ্রমণের তারিখ, passport এবং accommodation-এর তথ্য booking confirmation-এর সঙ্গে মিলিয়ে লিখুন।",
      "Passport bio-page, ছবি, return flight, থাকার প্রমাণ, বর্তমান Dhaka checklist-এর financial ও নিজের পেশার নথির পরিষ্কার scan upload করুন।",
      "Official portal ও Embassy notice-এ payment instruction ও অঙ্ক দেখুন। Government visa fee, bank/payment charge এবং ঐচ্ছিক agency service fee আলাদা; প্রতিটি অঙ্ক ও agency quote আগে নিশ্চিত করুন।",
      "Email বা portal-এ status দেখুন; অতিরিক্ত নথি চাইলে নির্দেশনা অনুসরণ করুন। সময় ও সিদ্ধান্ত নিশ্চিত নয়। অনুমোদন পেলে notice download করে check-in ও immigration-এর বর্তমান নির্দেশনা মেনে চলুন।",
    ],
  },
  "malaysia-visa": {
    costBdt: "malaysiavisa.imi.gov.my-তে বর্তমান সরকারি ফি দেখুন। Bank/payment charge ও কোনো agency service fee আলাদা; অর্থ দেওয়ার আগে provider-এর itemized quote নিন।",
    processingTime: "সরকারি portal-এ প্রকাশিত ২–৭ কর্মদিবস, সাপ্তাহিক ছুটি, সরকারি ছুটি ও query stage বাদে; ৬ নভেম্বর ২০২৬-এ যাচাই করা। বর্তমান নির্দেশনা দেখুন; সিদ্ধান্ত নিশ্চিত নয়।",
    keyFacts: [ { label: "Application", value: "Official online eVisa portal" }, { label: "Bank statement", value: "সর্বশেষ তিন মাস; বর্তমান checklist যাচাই করুন" }, { label: "Processing", value: "২–৭ কর্মদিবস; ৬ নভেম্বর ২০২৬-এ যাচাই" }, { label: "থাকার মেয়াদ", value: "ইস্যু করা visa ও সরকারি বর্তমান শর্ত দেখুন" } ],
    documentChecklist: [{ category: "Digital নথি", items: [
      "Passport-এর bio-data ও signature page-এর high-resolution scan।", "সাদা background-এর 3.5cm × 5cm studio passport photo; বর্তমান specification দেখুন।",
      "সর্বশেষ তিন মাসের bank statement; সরকারি checklist ও agent আরও কিছু চাইলে আগে নিশ্চিত করুন।", "Bank manager-এর solvency certificate; বর্তমান portal-এ প্রয়োজনীয়তা যাচাই করুন।", "নিশ্চিত return itinerary ও Malaysia-র hotel reservation voucher।",
    ] }],
    stepByStep: [
      "Official Malaysia eVisa portal malaysiavisa.imi.gov.my খুলুন অথবা অনুমোদিত agency ব্যবহার করলে তার পরিচয় যাচাই করুন।",
      "ছবি, passport bio-page, return itinerary এবং চাওয়া bank documents-এর পরিষ্কার scan দিন; সব তথ্য মিলিয়ে নিন।",
      "Official channel বা নির্বাচিত provider-এ উপলব্ধ payment method ও সম্পূর্ণ চার্জ যাচাই করে payment করুন।",
      "Email বা portal-এ status দেখুন; Additional Documents Resubmission চাইলে নির্দেশনা অনুযায়ী দিন।",
      "অনুমোদন পেলে বর্তমান নির্দেশনা অনুযায়ী eVisa download ও print করে passport-এর সঙ্গে রাখুন। Malaysia Digital Arrival Card আলাদা প্রক্রিয়া—বর্তমান নিয়মও যাচাই করুন।",
    ],
  },
  "dubai-visa": {
    costBdt: "Airline, অনুমোদিত agent বা GDRFA/ICP চ্যানেলে সরকারি ফি ও sponsor/agency charge আলাদা করে নিশ্চিত করুন। Visa type ও provider অনুযায়ী মোট অঙ্ক বদলায়।",
    processingTime: "সময় আবেদন ও চ্যানেলভেদে বদলায়। সংশ্লিষ্ট provider-এর বর্তমান ধারণা নিন; অনুমোদন বা নির্দিষ্ট সময় নিশ্চিত নয়।",
    quickAnswer: "বাংলাদেশি পর্যটকদের UAE প্রবেশের জন্য প্রযোজ্য ভিসাপথ আগেই যাচাই করতে হবে। Airline, hotel বা অনুমোদিত provider-এর মাধ্যমে আবেদন করলে sponsor ও সরকারি চ্যানেল নিশ্চিত করুন। সরকার ও provider-এর ফি আলাদা করে দেখুন; নথি, processing ও অনুমোদন নিশ্চিত নয়।",
    keyFacts: [ { label: "আবেদনপথ", value: "Sponsor-ভিত্তিক electronic visa; নিজের পথ যাচাই করুন" }, { label: "Processing", value: "Provider-এর বর্তমান নির্দেশনা দেখুন; নিশ্চিত নয়" }, { label: "ফি", value: "সরকারি ও agency charge আলাদা নিশ্চিত করুন" }, { label: "Approval", value: "কর্তৃপক্ষ applicant profile যাচাই করে" } ],
    documentChecklist: [{ category: "Electronic scan ও অন্যান্য নথি", items: [
      "অন্তত ছয় মাস বৈধ passport-এর bio-page-এর পরিষ্কার রঙিন scan; বর্তমান শর্ত মিলিয়ে নিন।",
      "সাদা background-এর passport photo; provider-এর বর্তমান size ও specification নিশ্চিত করুন।",
      "National ID (NID) বা birth certificate-এর scan, provider চাইলে।",
      "গত ছয় মাসের bank statement এবং সংশ্লিষ্ট sponsor/agency যে financial evidence চায় তা যাচাই করুন।",
      "নিশ্চিত return flight booking ও Dubai hotel voucher; বুকিংয়ের আগে provider-এর বর্তমান শর্ত ও refund ঝুঁকি জেনে নিন।",
    ] }],
    stepByStep: [
      "নিবন্ধিত airline, hotel বা অনুমোদিত outbound agency বেছে তার sponsor ও সরকারি GDRFA/ICP চ্যানেল যাচাই করুন।",
      "Provider-এর বর্তমান checklist অনুযায়ী passport bio-page, ছবি, থাকার ও return booking-এর পরিষ্কার scan দিন।",
      "Provider সংশ্লিষ্ট GDRFA বা ICP portal-এ আবেদন জমা দেওয়ার পদ্ধতি ও আপনার application reference নিশ্চিত করুন।",
      "Security review-এর অপেক্ষায় থাকুন; প্রক্রিয়াকরণের সময় ও approval নিশ্চিত নয়। অতিরিক্ত নথির নির্দেশনা অনুসরণ করুন।",
      "অনুমোদন পেলে eVisa-র তথ্য মিলিয়ে airline ও border-এর বর্তমান নির্দেশনা অনুযায়ী copy সঙ্গে রাখুন।",
    ],
  },
  "singapore-visa": {
    costBdt: "Government visa fee ও Authorized Visa Agent-এর service charge আলাদা। Provider-ভেদে মোট অঙ্ক বদলায়; payment-এর আগে itemized quote নিন।",
    processingTime: "প্রকাশিত ধারণা ৫–৭ কর্মদিবস; জমার দিন ও ছুটির হিসাবসহ বর্তমান নির্দেশনা অনুমোদিত চ্যানেলে নিশ্চিত করুন। সিদ্ধান্তের সময় নিশ্চিত নয়।",
    keyFacts: [ { label: "আবেদন জমা", value: "ঢাকার Authorized Visa Agent-এর বর্তমান চ্যানেল যাচাই করুন" }, { label: "ফি", value: "Government fee ও agent charge আলাদা নিশ্চিত করুন" }, { label: "Processing", value: "প্রকাশিত ৫–৭ কর্মদিবস; বর্তমান নির্দেশনা দেখুন" }, { label: "Arrival declaration", value: "SG Arrival Card আলাদা; বর্তমান ICA নির্দেশনা দেখুন" } ],
    documentChecklist: [
      { category: "মূল নথি — Authorized Visa Agent", items: [
        "আগমনের সময় অন্তত ছয় মাস বৈধ মূল passport এবং থাকলে পুরোনো passport; বর্তমান checklist দেখুন।",
        "পূরণ ও স্বাক্ষর করা Singapore Visa Application Form 14A।",
        "সাম্প্রতিক passport photo; agent/ICA-এর বর্তমান 35mm × 45mm ও অন্যান্য specification যাচাই করুন।",
        "প্রযোজ্য হলে Singapore Citizen বা Permanent Resident-এর Letter of Introduction (Form V39A); local contact না থাকলে অনুমোদিত agent-এর কাছে আপনার বিকল্প জেনে নিন।",
        "গত ছয় মাসের personal bank statement ও agent যে solvency/financial evidence চায় তা যাচাই করুন।",
        "নিশ্চিত return itinerary ও hotel booking-এর বিবরণ; non-refundable খরচের আগে agent-এর শর্ত বুঝুন।",
      ] },
      { category: "পেশা ও সফর অনুযায়ী সহায়ক নথি", items: [
        "চাকরিজীবী: company letterhead-এ NOC, সাম্প্রতিক pay slip ও office ID copy, প্রযোজ্য হলে।",
        "ব্যবসায়ী: নবায়ন করা Trade License, প্রয়োজনীয় notarized English translation, company cover letter ও visiting card।",
        "চিকিৎসার সফর: Singapore hospital-এর appointment confirmation, প্রযোজ্য হলে।",
        "পরিবার: marriage certificate/Nikahnama ও শিশুদের birth certificate, প্রযোজ্য হলে।",
      ] },
    ],
    stepByStep: [
      "Bank statement, পেশার নথি (NOC বা Trade License) ও বর্তমান specification অনুযায়ী ছবি প্রস্তুত করুন।",
      "Form V39A Letter of Introduction প্রয়োজন কি না যাচাই করুন; local contact না থাকলে Singapore-এর অনুমোদিত visa agent-এর কাছে আপনার বিকল্প জেনে নিন।",
      "Authorized agent-এর বর্তমান নির্দেশনা অনুযায়ী passport, স্বাক্ষরিত Form 14A ও সহায়ক নথি জমা দিন; সরাসরি submission-এর নিয়ম ICA/মিশনে নিশ্চিত করুন।",
      "Agent বা সরকারি চ্যানেলে বর্তমান processing নির্দেশনা ও status দেখুন। প্রকাশিত সময় অনুমোদন বা নির্দিষ্ট সিদ্ধান্তের নিশ্চয়তা নয়।",
      "অনুমোদনের পর visa document-এর জন্য ICA ও অনুমোদিত চ্যানেলের নির্দেশনা অনুসরণ করুন। Singapore-এ আগমনের দিনসহ আগের তিন দিনের মধ্যে free SG Arrival Card-এর বর্তমান নিয়ম আলাদাভাবে যাচাই করুন।",
    ],
  },
  "maldives-visa": {
    costBdt: "পর্যটক ভিসায় আগাম আবেদন প্রয়োজন কি না, বর্তমান ফি ও অনুমোদিত stay Maldives Immigration-এ নিশ্চিত করুন।",
    processingTime: "আগমনে immigration admissibility যাচাইয়ের পর tourist visa মূল্যায়ন হয়; প্রবেশ নিশ্চিত নয়।",
    quickAnswer: "Maldives Immigration অনুযায়ী tourist visa-র আগাম অনুমোদন লাগে না, তবে আগমনে প্রবেশের শর্ত পূরণ ও কর্মকর্তার সিদ্ধান্ত জরুরি। Return/onward ticket, নিবন্ধিত স্থানে prepaid booking, funds বা অনুমোদিত sponsorship এবং প্রত্যেক যাত্রীর free IMUGA declaration-এর বর্তমান নিয়ম যাচাই করুন।",
    keyFacts: [ { label: "Tourist visa", value: "আগমনে মূল্যায়ন; pre-approval লাগে না" }, { label: "Passport", value: "MRZ document ও অন্তত এক মাস মেয়াদ; অন্য কর্তৃপক্ষের শর্তও দেখুন" }, { label: "ভ্রমণ প্রস্তুতি", value: "Return/onward ticket ও নিবন্ধিত স্থানে prepaid stay" }, { label: "Traveller Declaration", value: "আগমনের আগে ৯৬ ঘণ্টার মধ্যে free IMUGA submission" } ],
    documentChecklist: [{ category: "সরকারি tourist-entry checklist — রওনা হওয়ার আগে যাচাই করুন", items: [
      "Machine-Readable Zone (MRZ) আছে এবং Maldives Immigration-এর বর্তমান নির্দেশনায় অন্তত এক মাস বৈধ passport/travel document; airline, transit বা onward destination বেশি মেয়াদ চায় কি না দেখুন।",
      "নিশ্চিত return বা onward ticket।", "মালদ্বীপের নিবন্ধিত স্থানে prepaid ও নিশ্চিত accommodation booking।",
      "সফরের জন্য যথেষ্ট funds অথবা Immigration-অনুমোদিত sponsorship।",
      "আগমনের আগে ৯৬ ঘণ্টার মধ্যে free IMUGA Traveller Declaration; শিশুসহ প্রত্যেকের আলাদা submission।",
      "পরবর্তী গন্তব্যের প্রবেশ শর্ত পূরণ এবং itinerary-তে প্রযোজ্য হলে বৈধ Yellow Fever certificate।",
    ] }],
    stepByStep: [
      "নিশ্চিত return/onward ticket এবং মালদ্বীপের নিবন্ধিত স্থানে prepaid stay বুকিংয়ের শর্ত দেখুন; পর্যাপ্ত funds বা অনুমোদিত sponsorship-এর প্রমাণ প্রস্তুত করুন।",
      "Passport বা travel document-এ MRZ ও Maldives Immigration-এর বর্তমান validity শর্ত আছে কি না দেখুন। Airline, transit বা পরবর্তী গন্তব্যের কঠোরতর শর্তও যাচাই করুন।",
      "মালদ্বীপে আগমনের আগের ৯৬ ঘণ্টার মধ্যে official IMUGA portal-এ free Traveller Declaration দিন। শিশুসহ প্রত্যেকের আলাদা submission এবং confirmation সংরক্ষণ করুন।",
      "Airline check-in ও arrival check-এর জন্য passport, return/onward ticket, নিবন্ধিত থাকার booking, funds/sponsorship প্রমাণ ও IMUGA confirmation হাতে রাখুন। ফেরার আলাদা নথির শর্তও যাচাই করুন।",
      "আগমনে চাওয়া নথি Maldives Immigration-এ দেখান। Tourist visa-তে pre-approval লাগে না, কিন্তু প্রবেশ কর্মকর্তার সিদ্ধান্ত ও বর্তমান সরকারি শর্তের অধীন।",
    ],
    faqs: [
      { question: "Maldives Immigration পর্যটকের কাছে কী নথি চায়?", answer: "সরকারি তালিকায় MRZ-সহ অন্তত এক মাস বৈধ passport/travel document, নিশ্চিত return journey, নিবন্ধিত স্থানে prepaid booking, পর্যাপ্ত funds বা অনুমোদিত sponsorship এবং আগমনের ৯৬ ঘণ্টার মধ্যে Traveller Declaration রয়েছে। বর্তমান নিয়ম ও airline/পরবর্তী গন্তব্যের আলাদা শর্ত যাচাই করুন।" },
      { question: "IMUGA Traveller Declaration কি free?", answer: "Maldives Immigration অনুযায়ী এটি বিনামূল্যে এবং আগমনের আগে ৯৬ ঘণ্টার মধ্যে official IMUGA portal-এ জমা দিতে হয়। শিশুসহ প্রত্যেক ভ্রমণকারীর পৃথক declaration প্রয়োজন।" },
    ],
  },
};
