import { SCHEDULED_BLOG_SNIPPETS } from "../data/scheduledBlogSeo.generated";

/** Shared card/share answers for the client and saved related-reading cards. */
export function getBlogAeoSnippet50Words(slug: string, isBn: boolean, fallbackSummary: string): string {
  const snippetsEn: Record<string, string> = {
    "umrah-hajj-guide-bangladesh-nusuk-bdt-cost":
      "Check your eligible Umrah visa route and season before paying. Complete biometrics when the application requests them, then check the issued visa before Nusuk visitor registration and separate permits. Package conditions vary. The ten-day/four-sharing BDT reference is historical, not a current quote or evidence of agency savings.",
    "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh":
      "Choose the exact Makkah or Madinah hotel room and route, not an area-wide accessibility promise. HHR allows one large bag up to 25 kg and 65 x 55 x 35 cm plus one hand item. Its published basic fares are not checkout totals; confirm transfers and ticket conditions before payment.",
    "hajj-registration-bangladesh-government-vs-private-package-cost":
      "The latest MoRA 2027 notice supplied for this guide lists primary registration from 27 July to 24 September 2026, with no extension. The window has passed. Check hajj.gov.bd for later notices. The supplied sources do not establish 2027 package prices; 2026 figures are historical only.",
    "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide":
      "Request airline wheelchair help at booking, not at the airport: Biman calls it mandatory and recommends 48 hours, while Saudia publishes free carriage of wheelchairs and up to two mobility items. Inside the Grand Mosque, free manual wheelchairs and paid Tanaqol carts are separate services. No universal free airport service, guaranteed gate delivery or step-free hotel route is promised.",
    "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah":
      "A Saudi stopover may allow up to 96 hours, including Umrah, subject to eligibility, visa approval and separate appointments. Check exact documents and the airline’s itemized charges before payment. Saudia publishes a booking sequence; detailed current flynas conditions remain unverified. No universal free hotel, instant issuance or two-city feasibility is promised.",
    "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit":
      "Saudi Visa Bio applies when your Umrah visa application requires biometrics; it is not a universal tourist/stopover rule. Nusuk manages separate permits. The official Rawdah page describes annual regular booking, nearby Instant Track and attendance confirmation before an entry QR is available. Follow current booking instructions; paid data is not a permit requirement.",
    "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates":
      "The Ministry says women may come for Umrah without a mahram; visa-route, age and nationality conditions still need checking, and religious advice is separate. Ordinary mosque prayer differs from a Rawdah appointment. Follow your actual booking and staff directions, confirm the hotel route, and seek qualified guidance for Ihram, menstruation and Taqsir.",
    "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia":
      "Compare a Jeddah or Madinah roundtrip with both open-jaw directions on the same dates, passengers, baggage and full-trip basis. No live fare or guaranteed savings is established. Biman baggage varies by direction and fare; check Saudia Zamzam conditions, ticket structure, transit permission and every operating carrier before paying.",
    "ramadan-umrah-itikaf-guide-bangladesh-booking-budget":
      "Ramadan 1448 is expected to begin on 8 February 2027, and the Ministry's 1448 calendar closes Umrah visa issuance on 9 March 2027, entry on 23 March and departure on 7 April. Official I'tikaf permits are a separate, capacity-limited service whose published conditions have been aimed at citizens and residents with valid residency — not at visitors on an Umrah visa.",
    "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules":
      "Entering Ihram means intending Umrah or Hajj and beginning the Talbiyah, not just wearing the cloth. The Saudi Ministry of Hajj and Umrah says air arrivals must not pass the Miqat or the point parallel to it without entering Ihram, and that Jeddah airport is neither a Miqat nor a place for entering Ihram — so on a direct flight the step happens before landing. Which of the five points applies depends on the route your flight actually flies.",
    "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport":
      "One sealed 5-litre Zamzam bottle per pilgrim, bought at the airport and carried separately — the Madinah operator lists it at SAR 12.50. Bangladesh allows 100 g of gold ornaments and 200 g of silver once a calendar year, plus one declared bar up to 117 g. There is no published kilogram allowance for dates: personal use passes, a commercial quantity can be seized.",
    "bangladeshi-halal-food-guide-makkah-madinah-budget-meals":
      "Halal is the national baseline in Saudi Arabia — the food authority has stated that all food sold in the Kingdom is halal and pork imports are banned — so the real question is hygiene and price. The documented South Asian food streets in Makkah are Hijra Road and Ibrahim Khaleel Road in Misfalah; Al Baik's own branch list, with map pins, is the only reliable branch guide; and no per-plate price is printed here because no kitchen publishes one that can be re-checked.",
    "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide":
      "Hira's museums publish three different schedules and all three are printed; the Quba hadith is Ibn Majah 1412, Hasan; the Madinah bus is SR 90 for 24 hours; Badr is about 150 km west. No Ziyarah car tariff is published anywhere, so the guide prints none and teaches you to fix the total and the stops first.",
    "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide":
      "Combine a 7-day Makkah and Madinah Umrah with a 3-day Dubai and Abu Dhabi holiday on one Multi-City air ticket (DAC → JED/MED → DXB → DAC) to save BDT 35,000+ per person on airfare. Pair your Saudi Umrah e-Visa with a 96-hour UAE Transit Visa or 30-day Tourist e-Visa.",
    "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide":
      "Travel from Dubai to Abu Dhabi in 90 minutes for just AED 25 (~BDT 850) each way on the RTA E100 or E101 coach using your Silver Nol Card. Entry to Sheikh Zayed Grand Mosque is 100% free via online QR registration at visit.szgmc.gov.ae alongside Qasr Al Watan Palace.",
    "malaysia-islamic-heritage-putrajaya-halal-family-tour-guide":
      "Ranked #1 for Muslim family travel, Malaysia offers 100% JAKIM-certified Halal dining and Surau prayer rooms in every mall. Take the MRT Putrajaya Line from KLCC (MYR 5.40 / BDT 150) to Putrajaya's Pink Mosque (Masjid Putra) and Lake Cruise, and visit the Islamic Arts Museum Malaysia.",
    "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide":
      "Bangladeshi passport holders with a valid used US, UK, or Schengen visa qualify for an instant 1-year Saudi e-Visa or Visa on Arrival to perform Umrah on their return leg. In Paris, London, Rome, and New York, pre-book official Tiqets skip-the-line passes to avoid 2.5-hour museum queues.",
    "shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah":
      "Shariah-compliant dual-currency cards are issued by Islamic banks and Islamic windows in Bangladesh: a debit or prepaid card spends your own endorsed foreign exchange, while a charge card uses a fixed Ujrah fee instead of interest. Structures, fees and features differ by bank, so ask each bank about its own product; the USD 18,000 passport travel entitlement and the USD 300 single online-purchase rule apply whoever issued the card.",
    "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix":
      "Bangladesh Bank generally caps a single online purchase on a travel-quota card at USD 300. For a larger documented flight or hotel payment, ask your bank before checkout; approval is its decision. An RFCD card may pay online at the actual amount, but the account can hold only foreign cash brought back from travel.",
    "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card":
      "Travelers without an endorsed Dual-Currency Card can message the URAL Dhaka Desk on WhatsApp (+8801784385335) to book confirmed airline PNR tickets, Makkah/Madinah or Asian hotel vouchers, and Haramain train tickets in Bangladeshi Taka (BDT) via local bank transfer, bKash, or Nagad.",
    "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide":
      "For Umrah, buying Saudi Riyals (SAR) directly in Dhaka for daily cash spending avoids paying the buy–sell spread twice (BDT→USD→SAR). At any card terminal abroad, choose the local currency: if you pick BDT, the merchant's bank converts at its own rate, usually with a markup of several percent. There is no fixed DCC percentage — the markup varies by terminal, so the rule is to choose local currency.",
    "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide":
      "Thailand's official e-Visa portal handles applications, but approval and timing are not guaranteed. The Dhaka TR checklist (updated Nov 30, 2022) lists BDT 60,000 per person or BDT 120,000 per family; confirm current requirements. Check the live government fee; bank/payment charges and optional agency fees are separate.",
    "malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration":
      "Apply online at malaysiavisa.imi.gov.my for a 30-day Malaysia Tourist e-Visa (BDT 3,800–4,200; approved in 2–4 working days) with a 6-month bank statement showing BDT 80,000+ balance. Within 3 days before landing at KLIA, submit the mandatory free Malaysia Digital Arrival Card (MDAC).",
    "fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia":
      "Build a strong travel history on a blank Bangladeshi e-Passport in 3 steps: Step 1 — Get a zero-risk free Visa on Arrival in Nepal or the Maldives; Step 2 — Obtain online e-Visas for Malaysia and Thailand; Step 3 — Unlock Singapore, Dubai + Umrah, and Schengen/UK/US visas.",
    "dual-currency-card-endorsement-bangladesh":
      "Since 6 September 2026, Bangladesh Bank allows up to USD 18,000 per calendar year in travel foreign exchange for an adult resident (FEPD-1 Circular No. 33), with at most USD 5,000 as dollar notes. Endorsement at an Authorized Dealer bank records the amount in your passport; you must also activate the card's foreign-currency and e-commerce part before it will pay online.",
    "dhaka-airport-outbound-immigration-checklist-noc-go":
      "Clear Dhaka Airport (DAC) outbound emigration in under 2 minutes by carrying 5 printed documents in your cabin folder: a 6-month valid passport (with old passports), printed visa or arrival QR code, confirmed return air ticket, paid hotel voucher, passport dollar endorsement, and your Job NOC, GO, or Trade License.",
    "cheap-flight-booking-hacks-dhaka":
      "Cut international airfare from Dhaka (DAC) by 15%–30% by searching during Tuesday night airline inventory resets, flying out on Monday or Tuesday mornings instead of Thursday/Friday peak migration waves, travelling with 7kg cabin luggage on budget carriers, and stacking 12%–15% Bangladeshi bank card discounts.",
    "nepal-vs-thailand-first-trip":
      "Nepal Immigration lists a free tourist visa of up to 30 days for eligible SAARC visitors, except Afghanistan, on a first visit in a visa year; check current rules before departure. Thailand uses an advance e-Visa process. As planning estimates, a five-day trip is about BDT 45,000–65,000 in Nepal and BDT 80,000+ in Thailand; live fares and lodging rates change.",
    "hotel-savings-guide-bangkok-kl-dubai":
      "Compare hotel areas in Bangkok, Kuala Lumpur, and Dubai by itinerary, transport access, room needs, and booking terms. Use the same dates, guests, and room type to compare checkout totals; no fixed saving or hotel quote is promised.",
    "halal-food-guide-bangkok-bangladesh":
      "Bangladeshi travelers in Bangkok can find 100% certified Halal meals displaying the green Central Islamic Council of Thailand emblem across Pratunam (Petchaburi Road alleys) and Sukhumvit Soi 3 (Nana Arab Street). Halal food court dishes start at BDT 180–300, with famous spots including Maidaun and Yana Restaurant.",
    "nepal-pokhara-itinerary-bangladesh":
      "A 5-day Kathmandu and Pokhara trip from Dhaka costs just BDT 40,000–54,000 per person including roundtrip flights (BDT 28,000–35,000). Claim your free SAARC Visa on Arrival at Tribhuvan Airport, explore Boudhanath and Durbar Square, and take a scenic bus or flight to Phewa Lake and Sarangkot.",
    "maldives-budget-trip-bangladesh-maafushi":
      "Experience the Maldives from Dhaka for under BDT 75,000 per person (flights included) by staying on local inhabited islands like Maafushi and Hulhumalé instead of $500/night private resorts. Bangladeshi citizens receive a free 30-day Visa on Arrival (with free IMUGA QR) and $25 airport speedboat transfers.",
    "singapore-visa-guide-bangladesh-agents":
      "Bangladeshi citizens must apply for a Singapore Tourist e-Visa (BDT 4,200–6,500; 5–7 working days) through an Embassy-Authorized Visa Agent in Dhaka using Form 14A, a 35x45mm matte photo, a 6-month bank statement (BDT 1,50,000+ balance), and a Letter of Introduction (LOI Form V39A).",
    "top-budget-family-destinations-from-dhaka":
      "The top 6 budget-friendly international family destinations from Dhaka for 2026 ranked by 5-day per-person BDT cost are: 1. Nepal (from BDT 42,000, free VOA), 2. Malaysia (from BDT 68,000, online e-Visa), 3. Thailand (from BDT 72,000), 4. Maldives local islands (from BDT 75,000), 5. Singapore, and 6. Dubai.",
    "singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide":
      "Explore Singapore from Dhaka in 4 days for BDT 84,000–96,000 per person (flights included) by tapping your Bangladeshi Dual-Currency Visa/Mastercard directly on MRT gates via SimplyGo, staying near Farrer Park & Mustafa Centre (24/7) or Bugis Sultan Mosque, and dining at MUIS-certified Halal hawker stalls.",
    "bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh":
      "Bangladeshi patients visiting Bumrungrad International (Sukhumvit Soi 3), Bangkok Hospital, or Samitivej can book executive health check-up packages online (THB 6,900–24,500 / BDT 24,500–87,000) with complimentary Bengali medical interpreters, free airport wheelchair assistance, and patient apartments within a 5-minute walk.",
    "best-travel-esim-and-schengen-travel-insurance-bangladesh-guide":
      "Prepare for international travel from Dhaka with a verified connectivity and insurance strategy. Dual-SIM handsets let you use an Airalo or Yesim travel eSIM for mobile data abroad while keeping your Bangladeshi SIM active for bank SMS OTPs. Schengen visa applicants must also secure compliant €30,000 medical insurance.",
    "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost":
      "A 6-day Sri Lanka tour (Colombo, Kandy, Nuwara Eliya, Ella Nine Arch Bridge, and Galle Fort) from Dhaka costs BDT 68,000–82,000 per person including roundtrip flights. Bangladeshi passport holders apply online at eta.gov.lk ($20 USD SAARC fee) and enjoy abundant HAC-certified Halal dining.",
    "bangladesh-epassport-application-renewal-64-districts-fee-guide":
      "Apply or renew your Bangladeshi e-Passport across all 64 Regional Passport Offices at epassport.gov.bd without brokers. A 10-year 48-page e-Passport costs BDT 5,750 (Regular), BDT 8,050 (Express), or BDT 10,350 (Super Express, 2 days); always select the 64-page booklet (BDT 8,050+) if you travel frequently.",
    "flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp":
      "Bangladeshi passengers facing disruptions on qualifying European and UK routes can claim statutory compensation up to €600 or £520 for 3+ hour delays under EC 261/UK 261 rules. For international flights, the Montreal Convention sets a maximum liability limit of 1,519 SDR per passenger for proven baggage losses.",
    "top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla":
      "Compare every major airline flying out of Dhaka (DAC): Biman and Saudia lead for direct 6.5-hour Jeddah/Madinah flights with 2x23kg (46kg) baggage (route- and fare-dependent; confirm on your e-ticket) and free 5L Zamzam water; Emirates, Qatar, and Gulf Air offer top 1-stop transit value; and Malaysia/Singapore Airlines lead on Asian routes.",
    "havana-cuba-travel-guide-bangladesh":
      "The Gran Teatro de La Habana Alicia Alonso (opened 1914) is home of the Ballet Nacional de Cuba, with tickets often just USD 10-30. Bangladeshi travelers need a Cuban tourist visa or e-Visa plus proof of health insurance, must plan on cash (US-issued cards rarely work), and should budget about BDT 220,000-360,000 for five days including flights.",
    "chefchaouen-morocco-travel-guide-bangladesh":
      "Chefchaouen, Morocco's Blue City in the Rif Mountains, is best visited April-June and September-October. CTM buses reach it in about 4 hours from Tangier or Fes. Bangladeshi travelers need a Moroccan visa in advance (no visa on arrival), halal food is the default everywhere, and a 5-day Morocco loop costs about BDT 150,000-220,000 including flights.",
    "travel-creator-resources":
      "Travel creator resources that work in 2026: start with one free monetization hub (Travelpayouts), free SEO tools like Google Search Console and Trends, honest phone photography with real alt text, trusted research sources like Seat61 and embassy pages, and a realistic workflow - publish honest articles one at a time and disclose every affiliate link.",
    "dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide":
      "Cross-border passenger trains (Maitree, Bandhan, and Mitali Express) have been suspended since July 2024; check railway.gov.bd and indianrailways.gov.in for any restart notice. For overland travel via Benapole–Petrapole, Bangladeshi travelers need an IVAC sticker visa (ivacbd.com; no e-Visa) and can plan around an indicative 3-day Kolkata budget of BDT 8,000–18,000.",
  };

  const snippetsBn: Record<string, string> = {
    "umrah-hajj-guide-bangladesh-nusuk-bdt-cost":
      "টাকা দেওয়ার আগে প্রযোজ্য ওমরাহ ভিসার পথ ও মৌসুম দেখুন। আবেদনে চাইলে বায়োমেট্রিক দিন; এরপর ইস্যু হওয়া ভিসা মিলিয়ে Nusuk ভিজিটর নিবন্ধন ও আলাদা পারমিট নিন। Package-এর শর্ত আলাদা। ১০ দিন/চারজনের sharing-এর BDT reference পুরোনো, বর্তমান কোট বা agency saving-এর প্রমাণ নয়।",
    "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh":
      "পুরো এলাকার accessibility ধরে নয়, নির্দিষ্ট Makkah/Madinah hotel room ও route বাছুন। HHR জনপ্রতি একটি বড় bag সর্বোচ্চ ২৫ কেজি ও 65 x 55 x 35 cm, সঙ্গে একটি hand item দেয়। Published basic fare checkout total নয়; payment-এর আগে transfer ও ticket condition নিশ্চিত করুন।",
    "hajj-registration-bangladesh-government-vs-private-package-cost":
      "সর্বশেষ দেওয়া MoRA ২০২৭ বিজ্ঞপ্তিতে প্রাথমিক নিবন্ধনের সময় ২৭ জুলাই–২৪ সেপ্টেম্বর ২০২৬ বলা হয়েছে; সময়সীমা বাড়ানো হবে না। সময় শেষ। পরবর্তী নোটিশের জন্য hajj.gov.bd দেখুন। দেওয়া সূত্রে ২০২৭ প্যাকেজের দাম নিশ্চিত নয়; ২০২৬ সালের অঙ্ক আগের মৌসুমের তথ্য।",
    "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide":
      "এয়ারপোর্টে নয়, বুকিংয়ের সময়ই এয়ারলাইন হুইলচেয়ার সহায়তা চাইুন: বিমান এটি বাধ্যতামূলক বলে ও ৪৮ ঘণ্টা আগে আবেদনের পরামর্শ দেয়; সৌদিয়া হুইলচেয়ার ও সর্বোচ্চ দুইটি মোবিলিটি সামগ্রী বিনামূল্যে বহনের কথা বলে। মসজিদুল হারামে বিনামূল্যে ম্যানুয়াল হুইলচেয়ার ও সাশুল্ক তানাকুল কার্ট আলাদা সেবা। সবার জন্য বিনামূল্যে এয়ারপোর্ট সেবা, দরজায় ফেরত বা ধাপবিহীন হোটেল রুটের প্রতিশ্রুতি নয়।",
    "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah":
      "যোগ্যতা, visa approval ও আলাদা appointment সাপেক্ষে Saudi stopover-এ ওমরাহসহ সর্বোচ্চ ৯৬ ঘণ্টা থাকা যেতে পারে। টাকা দেওয়ার আগে exact document ও airline-এর itemized charge দেখুন। Saudia booking sequence প্রকাশ করে; flynas-এর বর্তমান detailed conditions যাচাই হয়নি। সবার জন্য free hotel, instant issuance বা দুই শহরের plan নিশ্চিত নয়।",
    "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit":
      "নিজের Umrah visa আবেদনে বায়োমেট্রিক চাইলে Saudi Visa Bio ব্যবহার করুন; এটি প্রত্যেক ট্যুরিস্ট/স্টপওভার যাত্রীর নিয়ম নয়। Nusuk-এ পারমিট আলাদা। অফিশিয়াল Rawdah পেজ সাধারণ বার্ষিক বুকিং, কাছাকাছি ভিজিটরের Instant Track এবং entry QR পাওয়ার আগে attendance confirmation বলে। নিজের বুকিংয়ের নির্দেশনা অনুসরণ করুন; পেইড ডেটা পারমিটের শর্ত নয়।",
    "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates":
      "মন্ত্রণালয় নারীর মাহরাম ছাড়া Umrah করতে আসা allowed বলেছে; visa-route, age ও nationality condition যাচাই বাকি, ধর্মীয় advice আলাদা। সাধারণ mosque prayer ও Rawdah appointment এক নয়। নিজের booking ও staff direction মানুন, hotel route নিশ্চিত করুন এবং Ihram, মাসিক ও Taqsir-এর জন্য যোগ্য পরামর্শ নিন।",
    "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia":
      "একই date, passenger, baggage ও full-trip basis-এ Jeddah বা Madinah roundtrip-এর সঙ্গে open-jaw-এর দুই direction তুলনা করুন। Live fare বা guaranteed savings প্রতিষ্ঠিত নয়। Biman baggage direction ও fare অনুযায়ী বদলায়; payment-এর আগে Saudia Zamzam condition, ticket structure, transit permission ও প্রতিটি operating carrier যাচাই করুন।",
    "ramadan-umrah-itikaf-guide-bangladesh-booking-budget":
      "রমজান ১৪৪৮ শুরু হতে পারে ৮ ফেব্রুয়ারি ২০২৭-এ, আর মন্ত্রণালয়ের ১৪৪৮ ক্যালেন্ডারে ওমরাহ ভিসা ইস্যু শেষ ৯ মার্চ ২০২৭, প্রবেশ ২৩ মার্চ ও প্রস্থান ৭ এপ্রিল। অফিশিয়াল ইতিকাফ পারমিট আলাদা ও আসনসীমিত সেবা, যার প্রকাশিত শর্ত নাগরিক ও বৈধ ইকামাধারী বাসিন্দাদের জন্য — ওমরাহ ভিসার দর্শনার্থীর জন্য নয়।",
    "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules":
      "ইহরামে প্রবেশ মানে ওমরাহ বা হজের নিয়ত করে তালবিয়া শুরু করা, শুধু কাপড় পরা নয়। সৌদি হজ ও ওমরাহ মন্ত্রণালয় বলছে, আকাশপথে আগত যাত্রী মিকাত বা তার সমান্তরাল বিন্দু অতিক্রমের আগে ইহরামে প্রবেশ করতে হবে, আর জেদ্দা বিমানবন্দর মিকাতও নয়, ইহরামে প্রবেশের স্থানও নয় — তাই সরাসরি ফ্লাইটে এই ধাপটি অবতরণের আগেই। পাঁচটি মিকাতের কোনটি প্রযোজ্য তা নির্ভর করে আপনার ফ্লাইটের প্রকৃত রুটের ওপর।",
    "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport":
      "প্রতি হাজীর জন্য একটি সিল করা ৫ লিটার জমজম বোতল, বিমানবন্দর থেকে কেনা ও আলাদাভাবে বহন — মদিনার পরিচালক দাম লিখেছে ১২.৫০ রিয়াল। বাংলাদেশে বছরে একবার ১০০ গ্রাম স্বর্ণালংকার ও ২০০ গ্রাম রুপা, সঙ্গে ঘোষণা সাপেক্ষে ১১৭ গ্রাম পর্যন্ত একটি বার। খেজুরে কেজিতে প্রকাশিত ছাড় নেই: ব্যক্তিগত ব্যবহার চলে, বাণিজ্যিক পরিমাণ জব্দ হতে পারে।",
    "bangladeshi-halal-food-guide-makkah-madinah-budget-meals":
      "সৌদি আরবে হালাল জাতীয় নিয়ম — খাদ্য কর্তৃপক্ষ জানিয়েছে রাজ্যে বিক্রি হওয়া সব খাবার হালাল এবং শূকরের মাংস আমদানি নিষিদ্ধ — তাই আসল প্রশ্ন পরিচ্ছন্নতা ও দাম। মক্কায় দক্ষিণ এশীয় খাবারের নথিভুক্ত রাস্তা মিসফালাহর হিজরা রোড ও ইব্রাহিম খলিল রোড; আল বাইকের নিজের শাখা-তালিকা ও ম্যাপ পিনই ভরসাযোগ্য; আর এখানে প্রতি প্লেটের দাম নেই, কারণ কোনো রেস্তোরাঁ এমন দাম প্রকাশ করে না যা আবার যাচাই করা যায়।",
    "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide":
      "হেরার মিউজিয়ামের সময় নিয়ে তিনটি সরকারি পাতা তিন রকম বলে, তিনটিই এখানে আছে; কুবার হাদিস ইবনে মাজাহ ১৪১২ (হাসান); মদিনার বাস ২৪ ঘণ্টায় ৯০ রিয়াল; বদর প্রায় ১৫০ কিমি পশ্চিমে। জিয়ারতের প্রকাশিত গাড়ি-ভাড়া নেই, তাই দাম ছাপা হয়নি — মোট দাম ও স্টপ আগে ঠিক করার নিয়ম দেওয়া হয়েছে।",
    "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide":
      "দুটি আলাদা ট্রিপের বিমান ভাড়া বাঁচাতে একটি Multi-City টিকিটেই (ঢাকা → জেদ্দা/মদিনা → দুবাই → ঢাকা) ৭ দিনের ওমরাহ এবং ৩ দিনের দুবাই ও আবুধাবি ভ্রমণ করুন। এতে ওমরাহ ই-ভিসা ও দুবাই ট্রানজিট/ই-ভিসা ব্যবহার করে জনপ্রতি ৩৫,০০০+ টাকা বিমান ভাড়া সাশ্রয় হয়।",
    "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide":
      "দুবাইয়ের ইবনে বতুতা বা আল গুবাইবা স্টেশন থেকে RTA E100/E101 এসি বাসে মাত্র ২৫ দিরহামে (~৮৫০ টাকা, Nol Card দিয়ে) ৯০ মিনিটে আবুধাবি যাওয়া যায়। অফিশিয়াল সাইটে (visit.szgmc.gov.ae) ফ্রি QR পাস নিয়ে শেখ জায়েদ গ্র্যান্ড মসজিদ ও কাসর আল ওয়াতান প্রাসাদ ঘুরে দেখুন।",
    "malaysia-islamic-heritage-putrajaya-halal-family-tour-guide":
      "মুসলিম পরিবারের ভ্রমণের জন্য মালয়েশিয়া বিশ্বে ১ নম্বর—প্রতিটি শপিং মলে সরকারি JAKIM হালাল খাবার ও নামাজের স্থান (Surau) রয়েছে। কুয়ালালামপুর থেকে MRT ট্রেনে মাত্র ৫.৪০ রিঙ্গিতে (১৫০ টাকা) পুত্রজায়া পিঙ্ক মসজিদ ও লেক ক্রুজ এবং ইসলামিক আর্টস মিউজিয়াম ঘুরে দেখুন।",
    "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide":
      "বাংলাদেশি পাসপোর্টে বৈধ ও একবার ব্যবহৃত (Used) US, UK বা Schengen ভিসা থাকলে ফেরার পথে তাৎক্ষণিক ১ বছরের সৌদি ই-ভিসা নিয়ে ওমরাহ করা যায়। এছাড়া প্যারিসের লুভর, আইফেল টাওয়ার, লন্ডন আই ও রোমের কলোসিয়ামে ২–৩ ঘণ্টার লাইন এড়াতে Tiqets স্কিপ-দ্য-লাইন পাস বুক করুন।",
    "shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah":
      "বাংলাদেশে ইসলামি ব্যাংক ও ইসলামিক উইন্ডো শরীয়াহ-সম্মত ডুয়েল-কারেন্সি কার্ড দেয়: ডেবিট বা প্রিপেইড কার্ড আপনার নিজের এনডোর্স করা বৈদেশিক মুদ্রা খরচ করে, আর চার্জ কার্ড সুদের বদলে নির্দিষ্ট উজরাহ ফি নেয়। গঠন, ফি ও সুবিধা ব্যাংকভেদে আলাদা, তাই প্রতিটি ব্যাংকের নিজের পণ্য সম্পর্কে জেনে নিন; USD 18,000 পাসপোর্ট ট্রাভেল entitlement ও USD 300 একবারের অনলাইন-কেনাকাটার নিয়ম যে কার্ডেই প্রযোজ্য।",
    "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix":
      "Bangladesh Bank-এর সাধারণ rule-এ travel-quota card দিয়ে একবারে online purchase-এর limit USD 300। বড় documented flight বা hotel payment-এর জন্য checkout-এর আগে bank-কে বলুন; approval তাদের সিদ্ধান্ত। RFCD card online-এ প্রকৃত amount payment করতে পারে, তবে account-এ শুধু travel থেকে সঙ্গে আনা foreign cash রাখা যায়।",
    "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card":
      "হাতে এনডোর্স করা Dual-Currency Card না থাকলে সরাসরি URAL-এর ঢাকা WhatsApp ডেস্কে (+8801784385335) যোগাযোগ করে দেশীয় ব্যাংক ট্রান্সফার, bKash বা Nagad-এ (BDT) পেমেন্ট করেই কনফার্মড ফ্লাইট PNR, মক্কা/মদিনা বা এশিয়ার হোটেল ভাউচার ও হারামাইন ট্রেন টিকিট বুক করতে পারেন।",
    "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide":
      "ওমরাহর হাতখরচের জন্য ঢাকা থেকেই সরাসরি নগদ সৌদি রিয়াল (SAR) কিনলে BDT→USD→SAR দুইবার spread দিতে হয় না। আর বিদেশে যেকোনো POS মেশিনে সবসময় local currency বেছে নিন: BDT বেছে নিলে merchant-এর ব্যাংক নিজের হারে (সাধারণত কয়েক শতাংশ markup-এ) convert করে। DCC-এর নির্দিষ্ট শতাংশ নেই—টার্মিনালভেদে বদলায়।",
    "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide":
      "Thailand-এর official e-Visa portal-এ আবেদন করুন; approval বা সময় নিশ্চিত নয়। Dhaka-র TR checklist (হালনাগাদ ৩০ নভেম্বর ২০২২) জনপ্রতি BDT 60,000/পরিবারে BDT 120,000 উল্লেখ করে—বর্তমান requirement যাচাই করুন। সরকারি fee, bank/payment charge ও optional agency fee আলাদা।",
    "malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration":
      "অনলাইনে malaysiavisa.imi.gov.my পোর্টালে ৮০,০০০+ টাকা ব্যাংক ব্যালেন্স দেখিয়ে আবেদন করলে ২–৪ কার্যদিবসে ৩০ দিনের মালয়েশিয়া ই-ভিসা (BDT ৩,৮০০–৪,২০০) পাওয়া যায়। কুয়ালালামপুর (KLIA) ফ্লাইটের ৩ দিন আগে অবশ্যই ফ্রি Malaysia Digital Arrival Card (MDAC) পূরণ করে প্রিন্ট সাথে রাখুন।",
    "fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia":
      "নতুন সাদা পাসপোর্টে ভিসা রিজেকশন এড়াতে ৩ ধাপে ট্রাভেল হিস্ট্রি গড়ুন: ১ম ধাপে নেপাল বা মালদ্বীপে নিশ্চিত ফ্রি Visa on Arrival সফর করুন; ২য় ধাপে মালয়েশিয়া ও থাইল্যান্ডের অনলাইন ই-ভিসা নিন; এবং ৩য় ধাপে সিঙ্গাপুর, দুবাই, সৌদি ওমরাহ ও ইউরোপের ভিসার আবেদন করুন।",
    "dual-currency-card-endorsement-bangladesh":
      "৬ সেপ্টেম্বর ২০২৬ থেকে বাংলাদেশ ব্যাংক প্রাপ্তবয়স্ক বাসিন্দার ভ্রমণের জন্য প্রতি ক্যালেন্ডার বছরে সর্বোচ্চ USD 18,000 বৈদেশিক মুদ্রা অনুমোদন করেছে (FEPD-1 Circular No. 33), যার মধ্যে ডলার নোট সর্বোচ্চ USD 5,000। Authorized Dealer ব্যাংকে endorsement পাসপোর্টে পরিমাণটি রেকর্ড করে; অনলাইনে পেমেন্টের আগে কার্ডের foreign-currency ও e-commerce অংশও চালু করতে হবে।",
    "dhaka-airport-outbound-immigration-checklist-noc-go":
      "ঢাকা বিমানবন্দরে (DAC) মাত্র ২ মিনিটে ইমিগ্রেশন সম্পন্ন করতে হাতের ফাইলে ৫টি প্রিন্টেড কাগজ রাখুন: ৬ মাসের মেয়াদসহ পাসপোর্ট (পুরাতন পাসপোর্টসহ), ভিসা বা Arrival QR প্রিন্ট, রিটার্ন এয়ার টিকিট, হোটেল ভাউচার, ডলার এনডোর্সমেন্ট এবং পেশাগত NOC, GO অথবা ট্রেড লাইসেন্স।",
    "cheap-flight-booking-hacks-dhaka":
      "ঢাকা (DAC) থেকে ১৫%–৩০% কম খরচে বিমান টিকিট কাটতে মঙ্গলবার রাতে ভাড়া যাচাই করুন, বৃহস্পতি/শুক্রবারের ভিড় এড়িয়ে সোম বা মঙ্গলবার সকালে ফ্লাইট নিন, বাজেট এয়ারলাইন্সে ৭ কেজি কেবিন ব্যাগে ভ্রমণ করুন এবং দেশীয় ব্যাংকের কার্ডে ১০%–১৫% ডিসকাউন্ট অফার ব্যবহার করুন।",
    "nepal-vs-thailand-first-trip":
      "Nepal Immigration-এর প্রকাশিত নিয়মে Afghanistan ছাড়া যোগ্য SAARC নাগরিকদের visa year-এ প্রথম সফরে সর্বোচ্চ ৩০ দিনের gratis visa আছে; যাত্রার আগে বর্তমান নিয়ম যাচাই করুন। Thailand-এর জন্য আগাম e-Visa দরকার। আনুমানিক ৫ দিনের বাজেট Nepal-এ BDT 45,000–65,000 এবং Thailand-এ BDT 80,000+—লাইভ ফ্লাইট ও হোটেলদর বদলায়।",
    "hotel-savings-guide-bangkok-kl-dubai":
      "ব্যাংকক, কুয়ালালামপুর ও দুবাইয়ে ভ্রমণসূচি, যাতায়াত, রুমের প্রয়োজন ও বুকিংয়ের শর্ত ধরে হোটেল এলাকা তুলনা করুন। একই তারিখ, অতিথি ও রুমের ধরন ধরে চূড়ান্ত মোট দাম মিলিয়ে নিন—নির্দিষ্ট সাশ্রয় বা হোটেল কোটের প্রতিশ্রুতি নেই।",
    "halal-food-guide-bangkok-bangladesh":
      "ব্যাংককে হালাল খাবারের জন্য Central Islamic Council of Thailand-এর সবুজ লোগো দেখে Pratunam (Petchaburi Soi 7) এবং Sukhumvit Soi 3 (Nana Arab Street) এলাকায় যান। মাত্র ১৮০–৩০০ টাকায় শপিং মলের ফুড কোর্টে এবং Maidaun ও Yana Restaurant-এ সুস্বাদু হালাল খাবার পাওয়া যায়।",
    "nepal-pokhara-itinerary-bangladesh":
      "ঢাকা থেকে রিটার্ন ফ্লাইটসহ (২৮,০০০–৩৫,০০০ টাকা) ৫ দিনের কাঠমান্ডু ও পোখরা ভ্রমণে জনপ্রতি মাত্র ৪০,০০০–৫৪,০০০ টাকা খরচ হয়। ত্রিভুবন এয়ারপোর্টে ফ্রি SAARC ভিসা নিয়ে বৌদ্ধনাথ স্তূপা, দরবার স্কয়ার এবং পোখরার ফেওয়া লেক ও সারাংকোট সূর্যোদয় উপভোগ করুন।",
    "maldives-budget-trip-bangladesh-maafushi":
      "প্রাইভেট রিসোর্টে লাখ টাকা খরচ না করে মাফুশি (Maafushi) ও হুলহুমালে লোকাল আইল্যান্ডে থেকে ঢাকা থেকে ফ্লাইটসহ মাত্র ৭৫,০০০ টাকার নিচে মালদ্বীপ ভ্রমণ করা যায়। বাংলাদেশিরা পান ফ্রি ৩০ দিনের অন-অ্যারাইভাল ভিসা এবং মাত্র ২৫ ডলারে এয়ারপোর্ট স্পিডবোট ট্রান্সফার।",
    "singapore-visa-guide-bangladesh-agents":
      "সিঙ্গাপুর ভ্রমণের জন্য বাংলাদেশিদের ঢাকায় অবস্থিত Embassy-Authorized Visa Agent-এর মাধ্যমে ই-ভিসা (খরচ ৪,২০০–৬,৫০০ টাকা; সময় ৫–৭ কর্মদিবস) করতে হয়। আবেদনের জন্য ফর্ম 14A, ৩৫x৪৫ মিমি ম্যাট ছবি, ১.৫ লক্ষ+ টাকার ব্যাংক স্টেটমেন্ট এবং LOI (Form V39A) প্রয়োজন।",
    "top-budget-family-destinations-from-dhaka":
      "ঢাকা থেকে ২০২৬ সালে পরিবার নিয়ে ভ্রমণের শীর্ষ ৬টি বাজেট-বান্ধব দেশ (৫ দিনের জনপ্রতি খরচ অনুযায়ী): ১. নেপাল (৪২,০০০ টাকা, ফ্রি ভিসা), ২. মালয়েশিয়া (৬৮,০০০ টাকা, অনলাইন ই-ভিসা), ৩. থাইল্যান্ড (৭২,০০০ টাকা), ৪. মালদ্বীপ মাফুশি (৭৫,০০০ টাকা), ৫. সিঙ্গাপুর এবং ৬. দুবাই।",
    "singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide":
      "ঢাকা থেকে ফ্লাইটসহ জনপ্রতি মাত্র ৮৪,০০০–৯৬,০০০ টাকায় ৪ দিনের সিঙ্গাপুর ভ্রমণ করুন: বাংলাদেশি ডুয়াল-কারেন্সি কার্ড সরাসরি MRT গেটে ট্যাপ (SimplyGo) করে যাতায়াত করুন, Farrer Park (Mustafa Centre) বা Bugis (সুলতান মসজিদ) এলাকায় থাকুন এবং MUIS হালাল ফুড কোর্টে খান।",
    "bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh":
      "ব্যাংককের Bumrungrad International (Sukhumvit Soi 3), Bangkok Hospital ও Samitivej-এ অনলাইনে অ্যাপয়েন্টমেন্ট নিয়ে ফ্রি দোভাষী সুবিধাসহ হেলথ চেকআপ (৬,৯০০–২৪,৫০০ বাথ / ২৪,৫০০–৮৭,০০০ টাকা) করা যায়। গুরুতর রোগীদের দ্রুত ভিসার জন্য হাসপাতাল থেকে ফ্রি Medical Invitation Letter পাওয়া যায়।",
    "best-travel-esim-and-schengen-travel-insurance-bangladesh-guide":
      "ঢাকা থেকে বিদেশ ভ্রমণের আগে ডুয়াল-সিম ফোনে Airalo বা Yesim ট্রাভেল eSIM ব্যবহার করে বিদেশে ইন্টারনেট সচল রাখা যায়, আর ফিজিক্যাল দেশীয় সিম দিয়ে ব্যাংকের ওটিপি এসএমএস পাওয়া যায়। শেনজেন ভিসার জন্য ইউরোপীয় ইউনিয়নের নিয়ম মেনে ন্যূনতম €30,000 কভারেজের মেডিকেল ইনস্যুরেন্স নিশ্চিত করুন।",
    "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost":
      "ঢাকা থেকে ফ্লাইটসহ জনপ্রতি মাত্র ৬৮,০০০–৮২,০০০ টাকায় ৬ দিনের শ্রীলঙ্কা (কলম্বো, ক্যান্ডি, নুওয়ারা এলিয়া, এলা Nine Arch Bridge ও গল ফোর্ট) ভ্রমণ করা যায়। বাংলাদেশি পাসপোর্টধারীরা অফিশিয়াল পোর্টালে (eta.gov.lk) মাত্র ২০ ডলারে SAARC ETA ভিসা পান।",
    "bangladesh-epassport-application-guide-64-districts-urgent-fees":
      "দালাল ছাড়াই দেশের ৬৪ জেলার পাসপোর্ট অফিসে epassport.gov.bd পোর্টালে ১০ বছর মেয়াদী ৪৮ পৃষ্ঠার ই-পাসপোর্ট করতে ৫,৭৫০ টাকা (রেগুলার), ৮,০৫০ টাকা (এক্সপ্রেস) বা ১০,৩৫০ টাকা (সুপার এক্সপ্রেস, ২ দিনে) লাগে। নিয়মিত ভ্রমণকারীদের জন্য ৬৪ পৃষ্ঠার পাসপোর্ট সেরা।",
    "bangladesh-epassport-application-renewal-64-districts-fee-guide":
      "দালাল ছাড়াই দেশের ৬৪ জেলার পাসপোর্ট অফিসে epassport.gov.bd পোর্টালে ১০ বছর মেয়াদী ৪৮ পৃষ্ঠার ই-পাসপোর্ট করতে ৫,৭৫০ টাকা (রেগুলার), ৮,০৫০ টাকা (এক্সপ্রেস) বা ১০,৩৫০ টাকা (সুপার এক্সপ্রেস, ২ দিনে) লাগে। নিয়মিত ভ্রমণকারীদের জন্য ৬৪ পৃষ্ঠার পাসপোর্ট সেরা।",
    "flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp":
      "ইউরোপ বা যুক্তরাজ্যের যোগ্য ফ্লাইটে ৩ ঘণ্টার বেশি দেরি হলে EC 261 বা UK 261 নিয়মে সর্বোচ্চ €৬০০ বা £৫২০ পর্যন্ত ক্ষতিপূরণ দাবি করা সম্ভব। যেকোনো আন্তর্জাতিক রুটে লাগেজ হারালে বা ক্ষতিগ্রস্ত হলে মন্ট্রিল কনভেনশন অনুযায়ী সর্বোচ্চ ১,৫১৯ SDR পর্যন্ত প্রমাণিত ক্ষতির ব্যয় ক্লেইম করা যায়।",
    "top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla":
      "ঢাকা (DAC) থেকে সরাসরি জেদ্দা/মদিনা ওমরাহ ফ্লাইটে ৪৬ কেজি (২x২৩ কেজি) ব্যাগেজ ও ৫ লিটার ফ্রি জমজম পানির সুবিধায় Biman ও Saudia সেরা। সাশ্রয়ী ১-স্টপ ট্রানজিটে Emirates, Qatar ও Gulf Air এবং এশিয়া রুটে Malaysia ও Singapore Airlines শীর্ষে।",
    "havana-cuba-travel-guide-bangladesh":
      "হাভানার গ্রান তেয়াত্রো দে লা আবানা আলিসিয়া আলোনসো (১৯১৪ সালে উদ্বোধন) কিউবার জাতীয় ব্যালের আবাসস্থল, শো-এর টিকিট প্রায়ই মাত্র USD ১০-৩০। বাংলাদেশি ভ্রমণকারীদের কিউবান ট্যুরিস্ট ভিসা/ই-ভিসা ও স্বাস্থ্য বীমার প্রমাণ লাগে; ৫ দিনের বাজেট প্রায় ২,২০,০০০-৩,৬০,০০০ টাকা - কিউবা নগদ-নির্ভর, US-ইস্যু কার্ড সাধারণত কাজ করে না।",
    "chefchaouen-morocco-travel-guide-bangladesh":
      "রিফ পাহাড়ের মরক্কোর নীল শহর শেফশাওয়েন এপ্রিল-জুন ও সেপ্টেম্বর-অক্টোবরে যাওয়া ভালো। টাঞ্জিয়ার বা ফেজ থেকে CTM বাসে প্রায় ৪ ঘণ্টা। বাংলাদেশিদের আগেই মরক্কো ভিসা লাগে (ভিসা অন অ্যারাইভাল নেই), হালাল সর্বত্র স্বাভাবিক, আর ৫ দিনের মরক্কো লুপের ব্যয় প্রায় ১,৫০,০০০-২,২০,০০০ টাকা (ফ্লাইটসহ)।",
    "travel-creator-resources":
      "২০২৬ সালের কার্যকর ট্রাভেল ক্রিয়েটর রিসোর্সেস: একটিমাত্র ফ্রি মনিটাইজেশন হাব (Travelpayouts), Google Search Console ও Trends-এর মতো ফ্রি SEO টুল, আসল অল্ট টেক্সটসহ সৎ ফোন ফটোগ্রাফি, Seat61 ও দূতাবাসের পেজের মতো বিশ্বস্ত রিসার্স সোর্স এবং বাস্তব ওয়ার্কফ্লো - একটি করে সৎ আর্টিকেল প্রকাশ করুন এবং প্রতিটি অ্যাফিলিয়েট লিংক প্রকাশ করুন।",
    "dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide":
      "জুলাই ২০২৪ থেকে মৈত্রী, বন্ধন ও মিতালি এক্সপ্রেস স্থগিত; পুনরায় চালুর বিজ্ঞপ্তির জন্য railway.gov.bd ও indianrailways.gov.in দেখুন। বেনাপোল–পেট্রাপোল স্থলপথে ভ্রমণের জন্য বাংলাদেশি পাসপোর্টধারীদের IVAC স্টিকার ভিসা (ivacbd.com; e-Visa নেই) লাগে এবং ৩ দিনের কলকাতা ভ্রমণের আনুমানিক পরিকল্পনা বাজেট BDT 8,000–18,000।",
  };

  const map = isBn ? snippetsBn : snippetsEn;
  if (map[slug]) {
    return map[slug];
  }
  const scheduledSnippet = SCHEDULED_BLOG_SNIPPETS[slug]?.[isBn ? "bn" : "en"];
  if (scheduledSnippet) return scheduledSnippet;

  // Fallback: clean ~50-word excerpt
  const cleanWords = fallbackSummary.replace(/\*\*/g, "").replace(/\s+/g, " ").trim().split(" ");
  if (cleanWords.length <= 52) return cleanWords.join(" ");
  return `${cleanWords.slice(0, 50).join(" ").replace(/[.,;:!?-]+$/, "")}...`;
}
