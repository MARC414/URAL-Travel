import React, { useState, useEffect } from "react";
import {
  Globe,
  Plane,
  Building,
  ShieldAlert,
  Compass,
  DollarSign,
  Briefcase,
  BookOpen,
  ArrowRight,
  Menu,
  X,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Link2,
  Calendar,
  Layers,
  HelpCircle,
  Clock
} from "lucide-react";

// Types
import { FlightRoute, HotelGuide, VisaGuide, DestinationGuide, TripCostData, BlogPost } from "./types";

// Database Constants
import { FLIGHTS_DATA, HOTELS_DATA, VISA_DATA, DESTINATIONS_DATA, TRIP_COSTS_DATA, BLOG_DATA } from "./constants";

// Subcomponents
import { TravelIntelligence } from "./components/AeoInspector";
import { TravelpayoutsOnboarding } from "./components/TravelpayoutsOnboarding";
import { TravelpayoutsCustomWidget } from "./components/TravelpayoutsCustomWidget";
import TravelpayoutsWidget from "./components/TravelpayoutsWidget.jsx";
import { TravelpayoutsEmbed } from "./components/TravelpayoutsEmbed";
import { TrustpilotReviews } from "./components/TrustpilotReviews";
import { InteractiveTools } from "./components/InteractiveTools";
import { TravelEssentials } from "./components/TravelEssentials";
import {
  KiwitaxiTransferWidget,
  WelcomePickupsWidget,
  AiraloEsimWidget,
  KlookActivitiesWidget,
  QeeqCarRentalWidget,
  PartnerLinkButton,
  AFFILIATE_LINKS
} from "./components/AffiliatePartners";
import {
  useSeoMeta,
  generateFAQSchema,
  HAJJ_UMRAH_FAQS,
  buildFaqSchema,
  getFaqSchemaForPage,
  getPreDepartureFaqSchema,
  SERVICE_TOOLS_FAQS,
  SERVICE_CONTACT_FAQS,
  articleSchema,
  touristTripSchema,
  serviceSchema,
  productOfferSchema,
  collectionPageSchema,
} from "./hooks/useSeoMeta";
import { Language, translations } from "./translations";
import {
  getLocalizedBlogs,
  getLocalizedFlights,
  getLocalizedHotels,
  getLocalizedVisas,
  getLocalizedCosts,
  getLocalizedHajjFaqs,
  getFeaturedGrowthTopics,
} from "./data/bengaliContent";
import { WhatsAppSupport, TopBarWhatsApp } from "./components/WhatsAppSupport";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { KKdayPromoBanner } from "./components/KKdayPromoBanner";
import { PriceAlertModal } from "./components/PriceAlertModal";
import { SitemapPage } from "./components/SitemapPage";
import { ExperiencesPage } from "./components/ExperiencesPage";
import { getSeoCopy } from "./utils/seoCopy";
import { UmrahLandingPage } from "./components/UmrahLandingPage";
import { AirHelpWidget } from "./components/AirHelpWidget";
import { TopicalAuthorityBlueprint } from "./components/TopicalAuthorityBlueprint";
import { getBlogImageAltText, getResponsiveImageProps } from "./utils/imageAssets";
const heroBgImage = "/assets/images/clouds_boat_hero_1781438671378-1200.webp";
const uralHeroBgImg = "/assets/images/ural_hero_bg_1781543111624-1200.webp";
const coxsBazarSunriseImg = "/assets/images/coxs_bazar_sunrise_1781620718331-1200.webp";
const nepalDestImg = "/assets/images/nepal_destination_1781544132297-1200.webp";
const bangkokDestImg = "/assets/images/bangkok_destination_1781544149435-1200.webp";
const klDestImg = "/assets/images/kl_destination_1781544164707-1200.webp";
const dubaiDestImg = "/assets/images/dubai_destination_1781544180311-1200.webp";
const singaporeDestImg = "/assets/images/singapore_destination_1790387270177-1200.webp";
const maldivesDestImg = "/assets/images/maldives_destination_1790387286896-1200.webp";
const blogHeroBannerImg = "/assets/images/blog_editorial_hero_banner_1790429994056-1200.webp";
const umrahMakkahImg = "/assets/images/umrah_makkah_haram_guide_1790430007679-1200.webp";
const passportCardDeskImg = "/assets/images/passport_card_travel_desk_1790430035290-1200.webp";
const haramainTrainImg = "/assets/images/haramain_bullet_train_1790484312808-1200.webp";
const minaHajjTentsImg = "/assets/images/mina_hajj_tents_1790484325661-1200.webp";
const madinahUmbrellasImg = "/assets/images/madinah_courtyard_umbrellas_1790484340720-1200.webp";
const saudiStopoverFlightImg = "/assets/images/saudi_stopover_aircraft_1790484351784-1200.webp";
const madinahGreenDomeImg = "/assets/images/madinah_green_dome_1790484369923-1200.webp";
const masjidNabawiArchesImg = "/assets/images/masjid_nabawi_arches_1790484388265-1200.webp";
const jeddahAirportTerminalImg = "/assets/images/jeddah_airport_terminal_1790484400414-1200.webp";
const ramadanMakkahNightImg = "/assets/images/ramadan_makkah_night_1790484415220-1200.webp";
const ihramPreparationImg = "/assets/images/ihram_preparation_set_1790484426740-1200.webp";
const zamzamAjwaDatesImg = "/assets/images/zamzam_ajwa_dates_1790484440926-1200.webp";
const makkahHalalCuisineImg = "/assets/images/makkah_halal_cuisine_1790484456326-1200.webp";
const qubaMosqueZiyarahImg = "/assets/images/quba_mosque_taif_ziyarah_1790485732985-1200.webp";
const dubaiSkylineTwilightImg = "/assets/images/dubai_skyline_burj_twilight_1790485747967-1200.webp";
const sheikhZayedMosqueImg = "/assets/images/sheikh_zayed_grand_mosque_1790485758750-1200.webp";
const putrajayaPinkMosqueImg = "/assets/images/putrajaya_pink_mosque_malaysia_1790485770212-1200.webp";
const parisLouvreLandmarksImg = "/assets/images/paris_louvre_london_landmarks_1790485782111-1200.webp";
const islamicBankingCardImg = "/assets/images/islamic_banking_card_makkah_1790486749439-1200.webp";
const rfcdForeignBankingImg = "/assets/images/rfcd_foreign_currency_banking_1790486762760-1200.webp";
const bdtTravelConciergeImg = "/assets/images/bdt_travel_concierge_voucher_1790486777146-1200.webp";
const posCardTerminalImg = "/assets/images/pos_card_terminal_currency_1790486792551-1200.webp";
const bangkokWatArunImg = "/assets/images/bangkok_wat_arun_chao_phraya_1790486821534-1200.webp";
const kualaLumpurPetronasImg = "/assets/images/kuala_lumpur_petronas_twilight_1790486835902-1200.webp";
const passportStampsWindowImg = "/assets/images/passport_stamps_boarding_window_1790486849797-1200.webp";
const singaporeMrtGardensImg = "/assets/images/singapore_mrt_gardens_bay_1790520762227-1200.webp";
const bangkokMedicalLobbyImg = "/assets/images/bangkok_medical_hospital_lobby_1790520775439-1200.webp";
const travelEsimInsuranceImg = "/assets/images/travel_esim_smartphone_insurance_1790520786938-1200.webp";
const sriLankaNineArchImg = "/assets/images/sri_lanka_nine_arch_train_1790520800518-1200.webp";
const bdEpassportDeskImg = "/assets/images/bangladesh_epassport_biometric_desk_1790520813052-1200.webp";
const airportDelayBoardImg = "/assets/images/airport_departure_board_delay_claim_1790520824658-1200.webp";
const dhakaAirlinesTarmacImg = "/assets/images/dhaka_airport_widebody_airlines_tarmac_1790520836931-1200.webp";

// Every single blog post (all 41 articles) is mapped to its own 100% unique visual asset (zero repeated images)
function getBlogCoverImage(slug: string): string {
  switch (slug) {
    case "umrah-hajj-guide-bangladesh-nusuk-bdt-cost":
      return umrahMakkahImg;
    case "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh":
      return haramainTrainImg;
    case "hajj-registration-bangladesh-government-vs-private-package-cost":
      return minaHajjTentsImg;
    case "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide":
      return madinahUmbrellasImg;
    case "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah":
      return saudiStopoverFlightImg;
    case "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit":
      return madinahGreenDomeImg;
    case "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates":
      return masjidNabawiArchesImg;
    case "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia":
      return jeddahAirportTerminalImg;
    case "ramadan-umrah-itikaf-guide-bangladesh-booking-budget":
      return ramadanMakkahNightImg;
    case "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules":
      return ihramPreparationImg;
    case "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport":
      return zamzamAjwaDatesImg;
    case "bangladeshi-halal-food-guide-makkah-madinah-budget-meals":
      return makkahHalalCuisineImg;
    case "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide":
      return qubaMosqueZiyarahImg;
    case "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide":
      return dubaiSkylineTwilightImg;
    case "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide":
      return sheikhZayedMosqueImg;
    case "malaysia-islamic-heritage-putrajaya-halal-family-tour-guide":
      return putrajayaPinkMosqueImg;
    case "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide":
      return parisLouvreLandmarksImg;
    case "shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah":
      return islamicBankingCardImg;
    case "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix":
      return rfcdForeignBankingImg;
    case "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card":
      return bdtTravelConciergeImg;
    case "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide":
      return posCardTerminalImg;
    case "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide":
      return bangkokWatArunImg;
    case "malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration":
      return kualaLumpurPetronasImg;
    case "fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia":
      return passportStampsWindowImg;
    case "singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide":
      return singaporeMrtGardensImg;
    case "bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh":
      return bangkokMedicalLobbyImg;
    case "best-travel-esim-and-schengen-travel-insurance-bangladesh-guide":
      return travelEsimInsuranceImg;
    case "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost":
      return sriLankaNineArchImg;
    case "bangladesh-epassport-application-renewal-64-districts-fee-guide":
      return bdEpassportDeskImg;
    case "flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp":
      return airportDelayBoardImg;
    case "top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla":
      return dhakaAirlinesTarmacImg;
    case "dual-currency-card-endorsement-bangladesh":
      return passportCardDeskImg;
    case "dhaka-airport-outbound-immigration-checklist-noc-go":
      return uralHeroBgImg;
    case "nepal-pokhara-itinerary-bangladesh":
      return nepalDestImg;
    case "nepal-vs-thailand-first-trip":
      return coxsBazarSunriseImg;
    case "halal-food-guide-bangkok-bangladesh":
      return bangkokDestImg;
    case "top-budget-family-destinations-from-dhaka":
      return klDestImg;
    case "hotel-savings-guide-bangkok-kl-dubai":
      return dubaiDestImg;
    case "singapore-visa-guide-bangladesh-agents":
      return singaporeDestImg;
    case "maldives-budget-trip-bangladesh-maafushi":
      return maldivesDestImg;
    case "cheap-flight-booking-hacks-dhaka":
      return blogHeroBannerImg;
    default:
      return heroBgImage;
  }
}

// Precision ~50-Word AEO Direct Answer Snippets for Blog Cards (Complete sentences, high-fact density)
function getBlogAeoSnippet50Words(slug: string, isBn: boolean, fallbackSummary: string): string {
  const snippetsEn: Record<string, string> = {
    "umrah-hajj-guide-bangladesh-nusuk-bdt-cost":
      "A 10-day DIY Umrah from Bangladesh costs BDT 1,16,000–1,32,000 per person (family of 4 sharing), covering a 90-day Umrah e-Visa (BDT 15,500–19,500), roundtrip Dhaka–Jeddah/Madinah flights, hotels, and Haramain Bullet Train. Obligatory Fard Hajj requires separate registration via the official Ministry portal (hajj.gov.bd).",
    "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh":
      "For flat wheelchair-friendly access in Makkah, stay in Jabal Omar or Clock Tower (3–5 minutes to Haram), or save 60% in Mahbas Al Jin shuttle hotels (BDT 4,200–7,500/night). In Madinah, book Markazia North near Ladies' Gates 25–29 and ride the 300 km/h Haramain Train (sar.hhr.sa).",
    "hajj-registration-bangladesh-government-vs-private-package-cost":
      "Obligatory Hajj from Bangladesh requires two-stage registration on hajj.gov.bd: Pre-Registration with your NID and ~BDT 30,000 deposit to get a tracking N-Serial, followed by Final Registration (BDT 5,20,000–6,00,000 for Government packages or BDT 5,80,000–9,50,000+ for licensed Private Agency Maktab A/B/D packages).",
    "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide":
      "When taking elderly parents for Umrah from Dhaka, attach a free airline Wheelchair (WCHR) request 48 hours before departure and bring a foldable wheelchair from Bangladesh (carried free). Inside Masjid al-Haram, rent official roof-level electric scooters (SAR 115 full Umrah) and stay on flat Jabal Omar streets.",
    "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah":
      "Bangladeshi passport holders flying Saudia or Flynas to the UK, US, Europe, Istanbul, or Dubai can book a 96-Hour Saudi Stopover Visa during flight checkout for ~SAR 135 (BDT 4,200) with 1 free hotel night on Saudia. US/UK/Schengen visa holders also qualify for a 1-year Saudi e-Visa.",
    "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit":
      "Every Bangladeshi pilgrim must complete 10-fingerprint biometrics on the official Saudi Visa Bio app before flying and register on the Nusuk app (nusuk.sa) using their 10-digit Visa Number. Inside Nusuk, book your free Umrah slot and mandatory Rawdah Shareef (Riyazul Jannah) permit in Madinah.",
    "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates":
      "Under updated Saudi Ministry of Hajj & Umrah (haj.gov.sa) rules, Bangladeshi women can obtain an Umrah e-Visa without a mandatory male Mahram restriction in the visa portal. In Madinah, book hotels in Markazia North facing Ladies' Gates 25–29 for direct women's prayer hall and Rawdah access.",
    "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia":
      "Save 6 hours of highway travel by booking an Open-Jaw (Multi-City) ticket: fly Dhaka (DAC) to Jeddah (JED) outbound and return directly from Madinah (MED) to Dhaka. Direct Biman and Saudia flights cost BDT 72,000–92,000 with 46kg baggage, while 1-stop Gulf carriers start at BDT 54,000.",
    "ramadan-umrah-itikaf-guide-bangladesh-booking-budget":
      "Performing Umrah in Ramadan equals the reward of Hajj, but Last-10-Days Makkah hotel rates triple to BDT 2,20,000+ per person. Cut your budget by 50% (to BDT 1,35,000–1,55,000) by flying in late Sha'ban and performing Umrah during the first week of Ramadan, or register early on Nusuk for I'tikaf.",
    "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules":
      "When flying direct from Dhaka to Jeddah on Biman or Saudia, put on your unstitched Ihram garments at Dhaka Airport and make Niyyah when the pilot announces Miqat Qarn al-Manazil 45 minutes before landing. On 1-stop transit flights, change into Ihram during your Gulf airport layover.",
    "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport":
      "Never pack loose Zamzam bottles inside checked suitcases. Buy one official 5-liter sealed Zamzam box (SAR 9.50–12.50) at the Jeddah or Madinah airport kiosk, carried free by Biman and Saudia. Returning Bangladeshi passengers can also bring 5–10 kg of Madinah dates and up to 100g of gold jewelry duty-free.",
    "bangladeshi-halal-food-guide-makkah-madinah-budget-meals":
      "Skip expensive hotel buffets and oily fast food during Umrah: walk 5 minutes from Masjid al-Haram into Ibrahim Al Khalil Road (Misflah) or Lower Ajyad in Makkah, and Bengalee Lane (West Markazia) in Madinah, for fresh Bangladeshi rice, fish curry, daal, and bharta at SAR 12–18 (BDT 390–580).",
    "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide":
      "A private 4-seater sedan for a 3-hour morning Ziyarah costs SAR 150–200 in Makkah (Jabal al-Noor Hira Cultural District, Jabal Thawr, Mina, Arafat) and SAR 120–160 in Madinah (Masjid Quba—where 2 Rakah equals an Umrah reward—Mount Uhud, and Qiblatain), while a Taif highland day trip costs SAR 350–450.",
    "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide":
      "Combine a 7-day Makkah and Madinah Umrah with a 3-day Dubai and Abu Dhabi holiday on one Multi-City air ticket (DAC → JED/MED → DXB → DAC) to save BDT 35,000+ per person on airfare. Pair your Saudi Umrah e-Visa with a 96-hour UAE Transit Visa or 30-day Tourist e-Visa.",
    "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide":
      "Travel from Dubai to Abu Dhabi in 90 minutes for just AED 25 (~BDT 850) each way on the RTA E100 or E101 coach using your Silver Nol Card. Entry to Sheikh Zayed Grand Mosque is 100% free via online QR registration at visit.szgmc.gov.ae alongside Qasr Al Watan Palace.",
    "malaysia-islamic-heritage-putrajaya-halal-family-tour-guide":
      "Ranked #1 for Muslim family travel, Malaysia offers 100% JAKIM-certified Halal dining and Surau prayer rooms in every mall. Take the MRT Putrajaya Line from KLCC (MYR 5.40 / BDT 150) to Putrajaya's Pink Mosque (Masjid Putra) and Lake Cruise, and visit the Islamic Arts Museum Malaysia.",
    "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide":
      "Bangladeshi passport holders with a valid used US, UK, or Schengen visa qualify for an instant 1-year Saudi e-Visa or Visa on Arrival to perform Umrah on their return leg. In Paris, London, Rome, and New York, pre-book official Tiqets skip-the-line passes to avoid 2.5-hour museum queues.",
    "shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah":
      "Top Shariah-compliant Riba-free cards in Bangladesh for Umrah and Halal travel include Islami Bank (IBBL) Dual-Currency Debit & Khidmah Card, City Islamic Amex/Visa, EBL Islamic Debit Card, Al-Arafah La-Riba, and Standard Chartered Saadiq—all supporting the $12,000 passport travel quota for Haramain Train and Makkah hotel bookings.",
    "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix":
      "When Bangladeshi banks block online flight or hotel payments above $300 USD on regular Travel Quota cards, call your bank's 24/7 hotline 15 minutes before checkout to lift the merchant cap—or open a Resident Foreign Currency Deposit (RFCD) account using leftover travel cash for zero single-transaction caps.",
    "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card":
      "Travelers without an endorsed Dual-Currency Card can message the URAL Dhaka Desk on WhatsApp (+8801784385335) to book confirmed airline PNR tickets, Makkah/Madinah or Asian hotel vouchers, and Haramain train tickets in Bangladeshi Taka (BDT) via local bank transfer, bKash, or Nagad.",
    "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide":
      "For Umrah, buy Saudi Riyals (SAR) directly in Dhaka for daily cash expenses to avoid losing 3% on double conversion (BDT→USD→SAR). When tapping your Dual-Currency Card at hotels or malls in Makkah, Bangkok, or Kuala Lumpur, always select 'Local Currency' on the POS terminal to avoid 5% DCC fees.",
    "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide":
      "Bangladeshi citizens apply online via thaievisa.go.th for a 60-day Thailand Tourist Visa (TR) without surrendering their physical passport. Upload clear PDF scans of your passport, return ticket, paid hotel booking, NOC/Trade License, and a 6-month bank statement showing at least BDT 65,000 (BDT 1,20,000+ recommended) per person.",
    "malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration":
      "Apply online at malaysiavisa.imi.gov.my for a 30-day Malaysia Tourist e-Visa (BDT 3,800–4,200; approved in 2–4 working days) with a 6-month bank statement showing BDT 80,000+ balance. Within 3 days before landing at KLIA, submit the mandatory free Malaysia Digital Arrival Card (MDAC).",
    "fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia":
      "Build a strong travel history on a blank Bangladeshi e-Passport in 3 steps: Step 1 — Get a zero-risk free Visa on Arrival in Nepal or the Maldives; Step 2 — Obtain online e-Visas for Malaysia and Thailand; Step 3 — Unlock Singapore, Dubai + Umrah, and Schengen/UK/US visas.",
    "dual-currency-card-endorsement-bangladesh":
      "Under Bangladesh Bank rules, adult passport holders can endorse up to USD $12,000 per calendar year on a Dual-Currency Debit, Prepaid, or Credit Card (EBL, City Bank Amex, BRAC, MTB). After getting the physical passport stamp, unlock E-Commerce and 3D-Secure in your bank app before booking online.",
    "dhaka-airport-outbound-immigration-checklist-noc-go":
      "Clear Dhaka Airport (DAC) outbound emigration in under 2 minutes by carrying 5 printed documents in your cabin folder: a 6-month valid passport (with old passports), printed visa or arrival QR code, confirmed return air ticket, paid hotel voucher, passport dollar endorsement, and your Job NOC, GO, or Trade License.",
    "cheap-flight-booking-hacks-dhaka":
      "Cut international airfare from Dhaka (DAC) by 15%–30% by searching during Tuesday night airline inventory resets, flying out on Monday or Tuesday mornings instead of Thursday/Friday peak migration waves, travelling with 7kg cabin luggage on budget carriers, and stacking 12%–15% Bangladeshi bank card discounts.",
    "nepal-vs-thailand-first-trip":
      "For first-time Bangladeshi travelers, Nepal is the easiest budget starter trip (free instant SAARC Visa on Arrival at Kathmandu Airport and a BDT 45,000–55,000 5-day budget), while Thailand is best for family shopping, beaches, and medical check-ups (requiring a pre-arranged e-Visa and BDT 75,000+ budget).",
    "hotel-savings-guide-bangkok-kl-dubai":
      "Save 30%–40% on family hotels in Bangkok, Kuala Lumpur, and Dubai without sacrificing safety by booking 2–3 metro stops outside the pricey tourist core—such as On Nut BTS in Bangkok, Al Rigga Metro in Deira Dubai, or serviced family apartments near Bukit Bintang and KLCC in Malaysia.",
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
      "Avoid BDT 1,200/day international roaming charges by installing an Airalo Travel eSIM ($4.50–$9.00 via your Dual-Currency Card) in Dhaka before departure so 5G data activates upon landing in Jeddah, Bangkok, KL, or Singapore—and pair it with a $30,000+ Travel Medical Insurance policy.",
    "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost":
      "A 6-day Sri Lanka tour (Colombo, Kandy, Nuwara Eliya, Ella Nine Arch Bridge, and Galle Fort) from Dhaka costs BDT 68,000–82,000 per person including roundtrip flights. Bangladeshi passport holders apply online at eta.gov.lk ($20 USD SAARC fee) and enjoy abundant HAC-certified Halal dining.",
    "bangladesh-epassport-application-renewal-64-districts-fee-guide":
      "Apply or renew your Bangladeshi e-Passport across all 64 Regional Passport Offices at epassport.gov.bd without brokers. A 10-year 48-page e-Passport costs BDT 5,750 (Regular), BDT 8,050 (Express), or BDT 10,350 (Super Express, 2 days); always select the 64-page booklet (BDT 8,050+) if you travel frequently.",
    "flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp":
      "Bangladeshi passengers whose flights are delayed 3+ hours, cancelled, or overbooked on UK/EU routes (EC 261/2004) can claim €250–€600 (BDT 33,000–80,000), while Montreal Convention rules cover up to ~$1,700 (BDT 2,05,000) for lost or damaged baggage on Biman, Saudia, Emirates, or Qatar Airways.",
    "top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla":
      "Compare every major airline flying out of Dhaka (DAC): Biman and Saudia lead for direct 6.5-hour Jeddah/Madinah flights with 2x23kg (46kg) baggage and free 5L Zamzam water; Emirates, Qatar, and Gulf Air offer top 1-stop transit value; and Malaysia/Singapore Airlines lead on Asian routes.",
  };

  const snippetsBn: Record<string, string> = {
    "umrah-hajj-guide-bangladesh-nusuk-bdt-cost":
      "ঢাকা থেকে ৪ জনের পরিবারের শেয়ারে ১০ দিনের DIY ওমরাহ করতে জনপ্রতি BDT ১,১৬,০০০–১,৩২,০০০ খরচ হয়—যার মধ্যে ৯০ দিনের ই-ভিসা (১৬,৫০০ টাকা), রিটার্ন ফ্লাইট, হোটেল ও হারামাইন বুলেট ট্রেন অন্তর্ভুক্ত। আর ফরজ হজের জন্য সরকারি পোর্টাল (hajj.gov.bd)-এ নিবন্ধন বাধ্যতামূলক।",
    "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh":
      "মক্কায় বয়স্ক মা-বাবার জন্য ঢালহীন সমতল রাস্তার Jabal Omar বা Clock Tower সেরা (৩–৫ মিনিটে হারাম), আর বাজেট বাঁচাতে Mahbas Al Jin শাটল হোটেল (রাত ৪,২০০–৭,৫০০ টাকা) বেছে নিন। মদিনায় মহিলাদের গেট ২৫–২৯ এর কাছে Markazia North-এ থাকুন ও হারামাইন ট্রেনে যাতায়াত করুন।",
    "hajj-registration-bangladesh-government-vs-private-package-cost":
      "বাংলাদেশ থেকে ফরজ হজের জন্য ধর্ম মন্ত্রণালয়ের পোর্টাল (hajj.gov.bd)-এ ২ ধাপে নিবন্ধন করতে হয়: NID ও ৩০,০০০ টাকা জমা দিয়ে প্রাক-নিবন্ধন (N-Serial) এবং কোটা অনুযায়ী চূড়ান্ত নিবন্ধন (সরকারি প্যাকেজ ৫.২০–৬.০০ লক্ষ টাকা; বেসরকারি এজেন্সি ৫.৮০–৯.৫০+ লক্ষ টাকা)।",
    "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide":
      "বয়স্ক মা-বাবাকে নিয়ে ওমরাহ যাত্রায় ফ্লাইটের ৪৮ ঘণ্টা আগে ফ্রি এয়ারপোর্ট হুইলচেয়ার (WCHR) বুক করুন এবং দেশ থেকে একটি ফোল্ডিং হুইলচেয়ার সাথে নিন (ফ্লাইটে ফ্রি)। মসজিদুল হারামের ছাদে অফিশিয়াল ইলেকট্রিক স্কুটার (তাওয়াফ+সাঈ ১১৫ রিয়াল) ও সমতল রাস্তার হোটেল ব্যবহার করুন।",
    "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah":
      "Saudia বা Flynas এয়ারলাইন্সে লন্ডন, ইউরোপ, আমেরিকা, ইস্তাম্বুল বা দুবাই যাওয়ার পথে বাংলাদেশি পাসপোর্টধারীরা মাত্র ১৩৫ সৌদি রিয়াল (~৪,২০০ টাকা) খরচে ৯৬ ঘণ্টার Saudi Stopover Visa ও ১ রাত ফ্রি হোটেল নিয়ে ওমরাহ করতে পারেন। এছাড়া US/UK/Schengen ভিসাধারীরা ১ বছরের ই-ভিসা পান।",
    "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit":
      "ওমরাহ ও হজযাত্রীদের ফ্লাইটের আগেই Saudi Visa Bio অ্যাপে ১০ আঙুলের ছাপ দিতে হয় এবং ভিসা ইস্যুর পর ১০ ডিজিটের ভিসা নম্বর দিয়ে অফিশিয়াল Nusuk অ্যাপে (nusuk.sa) একাউন্ট খুলতে হয়। Nusuk অ্যাপ থেকেই মদিনায় রিয়াজুল জান্নাত (Rawdah Shareef) জিয়ারতের ফ্রি পারমিট বুক করা যায়।",
    "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates":
      "সৌদি হজ ও ওমরাহ মন্ত্রণালয়ের (haj.gov.sa) হালনাগাদ নিয়মে বাংলাদেশি নারীরা মাহরাম ছাড়াও ওমরাহ ই-ভিসার আবেদন করতে পারেন। মদিনায় মা ও বোনদের সহজে নামাজ ও রিয়াজুল জান্নাতে প্রবেশের জন্য উত্তর দিকের Ladies' Gates 25–29 সংলগ্ন Markazia North হোটেলে থাকা সবচেয়ে সুবিধাজনক।",
    "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia":
      "ওমরাহ শেষে মদিনা থেকে জেদ্দা বিমানবন্দরের ৬ ঘণ্টার ক্লান্তিকর সড়কপথ এড়াতে Multi-City (Open-Jaw) টিকিট কাটুন: ঢাকা থেকে জেদ্দা (DAC–JED) যান এবং মদিনা থেকে সরাসরি ঢাকা (MED–DAC) ফিরুন। বিমান ও সৌদিয়ার ডিরেক্ট ফ্লাইট ৭২–৯২ হাজার টাকা এবং ট্রানজিট ফ্লাইট ৫৪ হাজার টাকা থেকে শুরু।",
    "ramadan-umrah-itikaf-guide-bangladesh-booking-budget":
      "রমজান মাসে ওমরাহ পালনে হজের সমান সওয়াব পাওয়া যায়, তবে শেষ ১০ দিনে মক্কার হোটেল ভাড়া তিনগুণ বেড়ে জনপ্রতি ২.২০ লক্ষ+ টাকা ছাড়িয়ে যায়। শাবানের শেষ সপ্তাহে মদিনায় গিয়ে রমজানের প্রথম সপ্তাহে মক্কায় ওমরাহ করলে মাত্র ১.৩৫–১.৫৫ লক্ষ টাকায় (৫০% কমে) রমজান ওমরাহ সম্পন্ন করা সম্ভব।",
    "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules":
      "বিমান বা সৌদিয়ার ডিরেক্ট ফ্লাইটে জেদ্দা গেলে ঢাকা এয়ারপোর্টেই ইহরামের কাপড় পরুন এবং ল্যান্ডিংয়ের ৪৫ মিনিট আগে পাইলট মিকাত (কারনুল মানাজিল) ঘোষণা করলে নিয়ত ও তালবিয়াহ পড়ুন। আর ট্রানজিট ফ্লাইটে গেলে দুবাই/শারজাহ/মাস্কাট যাত্রাবিরতিতে ইহরাম পরে নিন।",
    "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport":
      "লাগেজের ভেতর খোলা বোতলে জমজমের পানি ভরলে এক্স-রে স্ক্যানারে তা জব্দ হয়। জেদ্দা বা মদিনা এয়ারপোর্টের অফিশিয়াল কিয়স্ক থেকে পাসপোর্ট দেখিয়ে ৫ লিটারের সিল করা জমজম বক্স (৯.৫০–১২.৫০ রিয়াল) কিনুন, যা বিমান ও সৌদিয়া ফ্রি বহন করে। সাথে ৫–১০ কেজি খেজুর ও ১০০ গ্রাম স্বর্ণালংকার শুল্কমুক্ত আনা যায়।",
    "bangladeshi-halal-food-guide-makkah-madinah-budget-meals":
      "ওমরাহ সফরে প্রতিদিন ফাস্টফুড না খেয়ে মক্কার ইব্রাহিম আল খলিল রোড (মিসফালাহ) ও আজইয়াদ এবং মদিনার বাঙালি লেনে (গেট ৫–৯ এর কাছে) মাত্র ১২–১৮ রিয়ালে (৩৯০–৫৮০ টাকা) গরম ভাত, মাছের ঝোল, ডাল ও ভর্তা খেতে পারেন। এছাড়া জাবাল ওমর ও তায়্যিবা সেন্টারে পাবেন অফিশিয়াল Al Baik।",
    "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide":
      "প্রাইভেট ৪-সিটার গাড়িতে ৩ ঘণ্টার মক্কা জিয়ারত (জাবালে নূর হেরা ডিস্ট্রিক্ট, গারে সাওর, মিনা, আরাফাত) ১৫০–২০০ রিয়াল এবং মদিনা জিয়ারত (মসজিদে কুবা—যেখানে ২ রাকাত নামাজে ১টি ওমরাহর সওয়াব—উহুদ ও কিবলাতাইন) ১২০–১৬০ রিয়ালে করা যায়। আর তায়েফ ডে-ট্রিপের ভাড়া ৩৫০–৪৫০ রিয়াল।",
    "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide":
      "দুটি আলাদা ট্রিপের বিমান ভাড়া বাঁচাতে একটি Multi-City টিকিটেই (ঢাকা → জেদ্দা/মদিনা → দুবাই → ঢাকা) ৭ দিনের ওমরাহ এবং ৩ দিনের দুবাই ও আবুধাবি ভ্রমণ করুন। এতে ওমরাহ ই-ভিসা ও দুবাই ট্রানজিট/ই-ভিসা ব্যবহার করে জনপ্রতি ৩৫,০০০+ টাকা বিমান ভাড়া সাশ্রয় হয়।",
    "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide":
      "দুবাইয়ের ইবনে বতুতা বা আল গুবাইবা স্টেশন থেকে RTA E100/E101 এসি বাসে মাত্র ২৫ দিরহামে (~৮৫০ টাকা, Nol Card দিয়ে) ৯০ মিনিটে আবুধাবি যাওয়া যায়। অফিশিয়াল সাইটে (visit.szgmc.gov.ae) ফ্রি QR পাস নিয়ে শেখ জায়েদ গ্র্যান্ড মসজিদ ও কাসর আল ওয়াতান প্রাসাদ ঘুরে দেখুন।",
    "malaysia-islamic-heritage-putrajaya-halal-family-tour-guide":
      "মুসলিম পরিবারের ভ্রমণের জন্য মালয়েশিয়া বিশ্বে ১ নম্বর—প্রতিটি শপিং মলে সরকারি JAKIM হালাল খাবার ও নামাজের স্থান (Surau) রয়েছে। কুয়ালালামপুর থেকে MRT ট্রেনে মাত্র ৫.৪০ রিঙ্গিতে (১৫০ টাকা) পুত্রজায়া পিঙ্ক মসজিদ ও লেক ক্রুজ এবং ইসলামিক আর্টস মিউজিয়াম ঘুরে দেখুন।",
    "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide":
      "বাংলাদেশি পাসপোর্টে বৈধ ও একবার ব্যবহৃত (Used) US, UK বা Schengen ভিসা থাকলে ফেরার পথে তাৎক্ষণিক ১ বছরের সৌদি ই-ভিসা নিয়ে ওমরাহ করা যায়। এছাড়া প্যারিসের লুভর, আইফেল টাওয়ার, লন্ডন আই ও রোমের কলোসিয়ামে ২–৩ ঘণ্টার লাইন এড়াতে Tiqets স্কিপ-দ্য-লাইন পাস বুক করুন।",
    "shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah":
      "ওমরাহ ও হালাল ভ্রমণে সুদমুক্ত (Riba-Free) লেনদেনের জন্য ইসলামী ব্যাংক (IBBL) ডুয়াল-কারেন্সি ডেবিট ও খিদমাহ কার্ড, সিটি ইসলামিক অ্যামেক্স/ভিসা, ইবিএল ইসলামিক, আল-আরাফাহ লা-রিবা এবং স্ট্যান্ডার্ড চার্টার্ড সাদিক কার্ডে $12,000 পাসপোর্ট এনডোর্সমেন্ট করে হারামাইন ট্রেন ও মক্কার হোটেল বুক করা যায়।",
    "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix":
      "সাধারণ ডুয়াল-কারেন্সি কার্ডে $300 USD-এর বেশি ফ্লাইট বা হোটেল পেমেন্ট ডিক্লাইন হলে পেমেন্টের ১৫ মিনিট আগে ব্যাংকের হটলাইনে কল করে লিমিট আনলক করুন। আর স্থায়ী সমাধানের জন্য বিদেশ থেকে ফেরার পর বেঁচে যাওয়া নগদ ডলার জমা দিয়ে ব্যাংকে RFCD Account ও কার্ড খুলুন।",
    "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card":
      "হাতে এনডোর্স করা Dual-Currency Card না থাকলে সরাসরি URAL-এর ঢাকা WhatsApp ডেস্কে (+8801784385335) যোগাযোগ করে দেশীয় ব্যাংক ট্রান্সফার, bKash বা Nagad-এ (BDT) পেমেন্ট করেই কনফার্মড ফ্লাইট PNR, মক্কা/মদিনা বা এশিয়ার হোটেল ভাউচার ও হারামাইন ট্রেন টিকিট বুক করতে পারেন।",
    "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide":
      "ওমরাহর হাতখরচের জন্য ঢাকা থেকেই সরাসরি নগদ সৌদি রিয়াল (SAR) কিনলে ডাবল কনভার্সন (BDT→USD→SAR) লস বাঁচে। আর মক্কা, ব্যাংকক বা কুয়ালালামপুরে কার্ড পাঞ্চ করার সময় POS মেশিনে সবসময় 'Local Currency' সিলেক্ট করবেন—এতে ৫% অতিরিক্ত DCC চার্জ কাটবে না।",
    "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide":
      "পাসপোর্ট জমা না দিয়েই অফিশিয়াল thaievisa.go.th পোর্টালে আবেদন করে ৫–১০ কার্যদিবসে ৬০ দিনের থাইল্যান্ড ই-ভিসা (TR) পাওয়া যায়। এজন্য পাসপোর্ট স্ক্যান, রিটার্ন টিকিট, হোটেল ভাউচার, NOC/Trade License এবং জনপ্রতি অন্তত ৬৫,০০০+ টাকার (নিরাপদ অনুমোদনের জন্য ১.২০ লক্ষ+ টাকা) ব্যাংক স্টেটমেন্ট আপলোড করুন।",
    "malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration":
      "অনলাইনে malaysiavisa.imi.gov.my পোর্টালে ৮০,০০০+ টাকা ব্যাংক ব্যালেন্স দেখিয়ে আবেদন করলে ২–৪ কার্যদিবসে ৩০ দিনের মালয়েশিয়া ই-ভিসা (BDT ৩,৮০০–৪,২০০) পাওয়া যায়। কুয়ালালামপুর (KLIA) ফ্লাইটের ৩ দিন আগে অবশ্যই ফ্রি Malaysia Digital Arrival Card (MDAC) পূরণ করে প্রিন্ট সাথে রাখুন।",
    "fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia":
      "নতুন সাদা পাসপোর্টে ভিসা রিজেকশন এড়াতে ৩ ধাপে ট্রাভেল হিস্ট্রি গড়ুন: ১ম ধাপে নেপাল বা মালদ্বীপে নিশ্চিত ফ্রি Visa on Arrival সফর করুন; ২য় ধাপে মালয়েশিয়া ও থাইল্যান্ডের অনলাইন ই-ভিসা নিন; এবং ৩য় ধাপে সিঙ্গাপুর, দুবাই, সৌদি ওমরাহ ও ইউরোপের ভিসার আবেদন করুন।",
    "dual-currency-card-endorsement-bangladesh":
      "বাংলাদেশ ব্যাংকের নিয়মে প্রাপ্তবয়স্ক পাসপোর্টধারীরা বছরে সর্বোচ্চ ১২,০০০ মার্কিন ডলার ডুয়াল-কারেন্সি ডেবিট, প্রিপেইড বা ক্রেডিট কার্ডে এনডোর্সমেন্ট করতে পারেন। ব্যাংকে পাসপোর্ট স্ট্যাম্প নেওয়ার পর অনলাইনে ফ্লাইট বা হোটেল বুকিংয়ের আগে ব্যাংক অ্যাপ বা হটলাইনে E-Commerce ও 3D-Secure চালু করে নিন।",
    "dhaka-airport-outbound-immigration-checklist-noc-go":
      "ঢাকা বিমানবন্দরে (DAC) মাত্র ২ মিনিটে ইমিগ্রেশন সম্পন্ন করতে হাতের ফাইলে ৫টি প্রিন্টেড কাগজ রাখুন: ৬ মাসের মেয়াদসহ পাসপোর্ট (পুরাতন পাসপোর্টসহ), ভিসা বা Arrival QR প্রিন্ট, রিটার্ন এয়ার টিকিট, হোটেল ভাউচার, ডলার এনডোর্সমেন্ট এবং পেশাগত NOC, GO অথবা ট্রেড লাইসেন্স।",
    "cheap-flight-booking-hacks-dhaka":
      "ঢাকা (DAC) থেকে ১৫%–৩০% কম খরচে বিমান টিকিট কাটতে মঙ্গলবার রাতে ভাড়া যাচাই করুন, বৃহস্পতি/শুক্রবারের ভিড় এড়িয়ে সোম বা মঙ্গলবার সকালে ফ্লাইট নিন, বাজেট এয়ারলাইন্সে ৭ কেজি কেবিন ব্যাগে ভ্রমণ করুন এবং দেশীয় ব্যাংকের কার্ডে ১০%–১৫% ডিসকাউন্ট অফার ব্যবহার করুন।",
    "nepal-vs-thailand-first-trip":
      "প্রথমবার বিদেশ ভ্রমণের জন্য বাংলাদেশিদের কাছে নেপাল সবচেয়ে সহজ ও সাশ্রয়ী (কাঠমান্ডু এয়ারপোর্টে ফ্রি অন-অ্যারাইভাল ভিসা এবং ৫ দিনে মাত্র ৪৫,০০০–৫৫,০০০ টাকা বাজেট)। অন্যদিকে ফ্যামিলি শপিং, থিম পার্ক ও মেডিকেল চেকআপের জন্য থাইল্যান্ড সেরা (আগাম ই-ভিসা ও ৭৫,০০০+ টাকা বাজেট)।",
    "hotel-savings-guide-bangkok-kl-dubai":
      "ব্যাংকক, কুয়ালালামপুর ও দুবাইয়ে নিরাপদ ও পরিচ্ছন্ন হোটেলে ৩০%–৪০% খরচ বাঁচাতে মূল ট্যুরিস্ট স্পট থেকে মাত্র ২–৩টি মেট্রো স্টেশন দূরে হোটেল নিন—যেমন ব্যাংককের On Nut BTS, দুবাই দেইরার Al Rigga Metro অথবা কুয়ালালামপুরের Bukit Bintang সংলগ্ন ফ্যামিলি অ্যাপার্টমেন্ট।",
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
      "বিদেশে প্রতিদিন ১,২০০ টাকার রোমিং বিল বাঁচাতে ঢাকা থেকেই ডুয়াল-কারেন্সি কার্ড দিয়ে Airalo অ্যাপে Travel eSIM ($4.50–$9.00) ইনস্টল করুন—যাতে জেদ্দা, ব্যাংকক বা কুয়ালালামপুরে ল্যান্ড করার সাথে সাথেই 5G ইন্টারনেট চালু হয়। সাথে রাখুন ট্রাভেল মেডিকেল ইন্স্যুরেন্স।",
    "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost":
      "ঢাকা থেকে ফ্লাইটসহ জনপ্রতি মাত্র ৬৮,০০০–৮২,০০০ টাকায় ৬ দিনের শ্রীলঙ্কা (কলম্বো, ক্যান্ডি, নুওয়ারা এলিয়া, এলা Nine Arch Bridge ও গল ফোর্ট) ভ্রমণ করা যায়। বাংলাদেশি পাসপোর্টধারীরা অফিশিয়াল পোর্টালে (eta.gov.lk) মাত্র ২০ ডলারে SAARC ETA ভিসা পান।",
    "bangladesh-epassport-application-guide-64-districts-urgent-fees":
      "দালাল ছাড়াই দেশের ৬৪ জেলার পাসপোর্ট অফিসে epassport.gov.bd পোর্টালে ১০ বছর মেয়াদী ৪৮ পৃষ্ঠার ই-পাসপোর্ট করতে ৫,৭৫০ টাকা (রেগুলার), ৮,০৫০ টাকা (এক্সপ্রেস) বা ১০,৩৫০ টাকা (সুপার এক্সপ্রেস, ২ দিনে) লাগে। নিয়মিত ভ্রমণকারীদের জন্য ৬৪ পৃষ্ঠার পাসপোর্ট সেরা।",
    "bangladesh-epassport-application-renewal-64-districts-fee-guide":
      "দালাল ছাড়াই দেশের ৬৪ জেলার পাসপোর্ট অফিসে epassport.gov.bd পোর্টালে ১০ বছর মেয়াদী ৪৮ পৃষ্ঠার ই-পাসপোর্ট করতে ৫,৭৫০ টাকা (রেগুলার), ৮,০৫০ টাকা (এক্সপ্রেস) বা ১০,৩৫০ টাকা (সুপার এক্সপ্রেস, ২ দিনে) লাগে। নিয়মিত ভ্রমণকারীদের জন্য ৬৪ পৃষ্ঠার পাসপোর্ট সেরা।",
    "flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp":
      "ফ্লাইট ৩+ ঘণ্টা দেরি (Delay), বাতিল বা ওভারবুকিং হলে ইউরোপ/যুক্তরাজ্য রুটে EC 261/2004 আইন অনুযায়ী €250–€600 (৩৩,০০০–৮০,০০০ টাকা) এবং যেকোনো আন্তর্জাতিক এয়ারলাইন্সে লাগেজ হারালে মন্ট্রিয়ল কনভেনশনে সর্বোচ্চ ২,০৫,০০০ টাকা পর্যন্ত ক্ষতিপূরণ দাবি করা যায়।",
    "top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla":
      "ঢাকা (DAC) থেকে সরাসরি জেদ্দা/মদিনা ওমরাহ ফ্লাইটে ৪৬ কেজি (২x২৩ কেজি) ব্যাগেজ ও ৫ লিটার ফ্রি জমজম পানির সুবিধায় Biman ও Saudia সেরা। সাশ্রয়ী ১-স্টপ ট্রানজিটে Emirates, Qatar ও Gulf Air এবং এশিয়া রুটে Malaysia ও Singapore Airlines শীর্ষে।",
  };

  const map = isBn ? snippetsBn : snippetsEn;
  if (map[slug]) {
    return map[slug];
  }

  // Fallback: clean ~50-word excerpt
  const cleanWords = fallbackSummary.replace(/\*\*/g, "").replace(/\s+/g, " ").trim().split(" ");
  if (cleanWords.length <= 52) return cleanWords.join(" ");
  return `${cleanWords.slice(0, 50).join(" ").replace(/[.,;:!?-]+$/, "")}...`;
}

type SectionType = "home" | "flights" | "hotels" | "visa" | "destinations" | "experiences" | "umrah" | "costs" | "tools" | "blog" | "contact" | "sitemap" | "notFound";

function getCountryIata(country: string): string {
  const c = country.toLowerCase();
  if (c === "nepal") return "KTM";
  if (c === "thailand") return "BKK";
  if (c === "malaysia") return "KUL";
  if (c === "uae") return "DXB";
  if (c === "singapore") return "SIN";
  if (c === "maldives") return "MLE";
  return "KTM";
}

function getCountryCityWithIata(country: string): string {
  const c = country.toLowerCase();
  if (c === "nepal") return "Kathmandu (KTM)";
  if (c === "thailand") return "Bangkok (BKK)";
  if (c === "malaysia") return "Kuala Lumpur (KUL)";
  if (c === "uae") return "Dubai (DXB)";
  if (c === "singapore") return "Singapore (SIN)";
  if (c === "maldives") return "Malé (MLE)";
  return "Kathmandu (KTM)";
}

function getCountryCityName(country: string): string {
  const c = country.toLowerCase();
  if (c === "nepal") return "Kathmandu";
  if (c === "thailand") return "Bangkok";
  if (c === "malaysia") return "Kuala Lumpur";
  if (c === "uae") return "Dubai";
  if (c === "singapore") return "Singapore";
  if (c === "maldives") return "Malé & Maafushi";
  return "Kathmandu";
}

function getCountryVisaId(country: string): string {
  const c = country.toLowerCase();
  if (c === "nepal") return "nepal-visa";
  if (c === "thailand") return "thailand-visa";
  if (c === "malaysia") return "malaysia-visa";
  if (c === "uae") return "dubai-visa";
  if (c === "singapore") return "singapore-visa";
  if (c === "maldives") return "maldives-visa";
  return "nepal-visa";
}

function getCountryHotelId(country: string): string {
  const c = country.toLowerCase();
  if (c === "nepal") return "kathmandu-hotels";
  if (c === "thailand") return "bangkok-hotels";
  if (c === "malaysia") return "kuala-lumpur-hotels";
  if (c === "uae") return "dubai-hotels";
  if (c === "singapore") return "singapore-hotels";
  if (c === "maldives") return "maldives-hotels";
  return "kathmandu-hotels";
}

function getCountryFlightId(country: string): string {
  const c = country.toLowerCase();
  if (c === "nepal") return "dhaka-kathmandu";
  if (c === "thailand") return "dhaka-bangkok";
  if (c === "malaysia") return "dhaka-kuala-lumpur";
  if (c === "uae") return "dhaka-dubai";
  if (c === "singapore") return "dhaka-singapore";
  if (c === "maldives") return "dhaka-maldives";
  return "dhaka-kathmandu";
}

function getCountryDestId(country: string): string {
  const c = country.toLowerCase();
  if (c === "nepal") return "nepal-guide";
  if (c === "thailand") return "thailand-guide";
  if (c === "malaysia") return "malaysia-guide";
  if (c === "uae") return "dubai-guide";
  if (c === "singapore") return "singapore-guide";
  if (c === "maldives") return "maldives-guide";
  return "nepal-guide";
}

export default function App() {
  // Simulated Browser Routing State
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname + window.location.search;
    }
    return "/";
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroSearchTab, setHeroSearchTab] = useState<"flights" | "hotels" | "visa">("flights");
  const [heroFlightRoute, setHeroFlightRoute] = useState("dhaka-kathmandu");
  
  // Custom Action Affiliate Conversion Toast overlay state
  const [affiliateToast, setAffiliateToast] = useState<string | null>(null);
  const triggerAffiliateToast = (msg: string) => {
    setAffiliateToast(msg);
    setTimeout(() => {
      setAffiliateToast(null);
    }, 4500);
  };
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ural_lang");
      if (saved === "bn" || saved === "en") return saved;
    }
    return "en";
  });

  const handleLangToggle = (newLang: Language) => {
    setLang(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("ural_lang", newLang);
    }
  };

  const t = translations[lang];
  const isBn = lang === "bn";
  const localizedBlogs = getLocalizedBlogs(lang);
  const localizedFlights = getLocalizedFlights(lang);
  const localizedHotels = getLocalizedHotels(lang);
  const localizedVisas = getLocalizedVisas(lang);
  const localizedCosts = getLocalizedCosts(lang);
  const localizedHajjFaqs = getLocalizedHajjFaqs(lang);
  const featuredGrowthTopics = getFeaturedGrowthTopics(lang);
  const [isPriceAlertOpen, setIsPriceAlertOpen] = useState(false);
  const [alertDestination, setAlertDestination] = useState("Bangkok (BKK)");

  const openPriceAlert = (dest?: string) => {
    if (dest) setAlertDestination(dest);
    setIsPriceAlertOpen(true);
  };

  const [heroHotelCity, setHeroHotelCity] = useState("kathmandu-hotels");
  const [heroVisaCountry, setHeroVisaCountry] = useState("nepal-visa");

  // Custom Interactive Home states
  const [currencyAmount, setCurrencyAmount] = useState<number>(10000);
  const [currencyToOption, setCurrencyToOption] = useState<"USD" | "NPR" | "THB" | "MYR" | "AED" | "SGD">("NPR");
  const [emailSubscribed, setEmailSubscribed] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [packingItems, setPackingItems] = useState([
    { id: 1, text: "6 Months Valid Original Passport", checked: true },
    { id: 2, text: "Bank Statement (Minimum BDT 150K balance)", checked: true },
    { id: 3, text: "Printed Roundtrip Air Ticket Copy", checked: false },
    { id: 4, text: "Confirmed Hotel Voucher copy", checked: false },
    { id: 5, text: "2x2 white background photos (for specific entries)", checked: false },
  ]);

  // Contact Us Page States
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactSubject, setContactSubject] = useState("Visa Processing Checklist");
  const [contactDestination, setContactDestination] = useState("Nepal");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  // Blog Directory Filtering & Search States
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<string>("all");
  const [blogSearchQuery, setBlogSearchQuery] = useState<string>("");

  // Parse path to resolve active section and optional query parameters
  const getRouteDetails = () => {
    const url = new URL(currentPath, "https://ural-travel.pages.dev");
    const searchParams = url.searchParams;
    const segments = url.pathname.split("/").filter(Boolean);
    const root = segments[0] || "";
    const subSegment = segments[1] || null;

    let section: SectionType = "notFound";
    let parameterId: string | null = null;
    let isLanding = false;

    if (!root) {
      section = "home";
      isLanding = true;
    } else if (root === "flights" && segments.length <= 2) {
      const routeParam = searchParams.get("route") || subSegment;
      if (!routeParam || FLIGHTS_DATA.some((route) => route.id === routeParam)) {
        section = "flights";
        parameterId = routeParam || "dhaka-kathmandu";
        isLanding = !routeParam;
      }
    } else if (root === "hotels" && segments.length <= 2) {
      const cityParam = searchParams.get("city") || subSegment;
      if (!cityParam || HOTELS_DATA.some((hotel) => hotel.id === cityParam)) {
        section = "hotels";
        parameterId = cityParam || "kathmandu-hotels";
        isLanding = !cityParam;
      }
    } else if (root === "visa" && segments.length <= 2) {
      const countryParam = searchParams.get("country") || subSegment;
      if (!countryParam || VISA_DATA.some((visa) => visa.id === countryParam)) {
        section = "visa";
        parameterId = countryParam || "nepal-visa";
        isLanding = !countryParam;
      }
    } else if (root === "destinations" && segments.length <= 2) {
      const countryParam = searchParams.get("country") || subSegment;
      if (!countryParam || DESTINATIONS_DATA.some((destination) => destination.id === countryParam)) {
        section = "destinations";
        parameterId = countryParam || "nepal-guide";
        isLanding = !countryParam;
      }
    } else if (root === "costs" && segments.length <= 2) {
      const countryParam = searchParams.get("country") || subSegment;
      if (!countryParam || TRIP_COSTS_DATA.some((cost) => cost.id === countryParam)) {
        section = "costs";
        parameterId = countryParam || "nepal-costs";
        isLanding = !countryParam;
      }
    } else if ((root === "experiences" || root === "attractions") && segments.length === 1) {
      section = "experiences";
      isLanding = true;
    } else if ((root === "umrah" || root === "hajj") && segments.length === 1) {
      section = "umrah";
      isLanding = true;
    } else if (root === "tools" && segments.length === 1) {
      section = "tools";
      isLanding = true;
    } else if (root === "blog" && segments.length <= 2) {
      const slugParam = searchParams.get("slug") || subSegment;
      if (!slugParam || BLOG_DATA.some((post) => post.slug === slugParam)) {
        section = "blog";
        parameterId = slugParam || "cheap-flight-booking-hacks-dhaka";
        isLanding = !slugParam;
      }
    } else if (root === "contact" && segments.length === 1) {
      section = "contact";
      isLanding = true;
    } else if (
      ["sitemap", "pre-departure", "indexing"].includes(root) &&
      segments.length === 1
    ) {
      section = "sitemap";
      isLanding = true;
    }

    const isAdmin = searchParams.has("admin") || searchParams.has("inspector") || searchParams.get("onboarding") === "true";

    return { section, parameterId, isLanding, isAdmin };
  };

  const { section, parameterId, isLanding, isAdmin } = getRouteDetails();

  // Mobile Drawer User-Intent Accordion State (reduces vertical scroll depth)
  const getDefaultDrawerGroup = (sec: SectionType): "booking" | "destinations" | "research" | "tools" => {
    if (sec === "destinations" || sec === "experiences") return "destinations";
    if (sec === "blog" || sec === "costs") return "research";
    if (sec === "tools" || sec === "sitemap" || sec === "contact") return "tools";
    return "booking";
  };

  const [expandedDrawerGroup, setExpandedDrawerGroup] = useState<
    "booking" | "destinations" | "research" | "tools" | null
  >(() => getDefaultDrawerGroup(section));

  useEffect(() => {
    setExpandedDrawerGroup(getDefaultDrawerGroup(section));
  }, [section]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Dynamically compute metadata and schema
  let seoTitle = "URAL — Compare Flights, Hotels & Visa Guides for Bangladeshi Travelers";
  let seoDescription = "Compare flight prices from Dhaka to Nepal, Thailand, Malaysia and Dubai, check visa requirements step by step, and plan your trip budget in BDT.";
  let seoSchema: any = undefined;
  let seoBreadcrumbs: { name: string; url: string }[] = [];
  let seoImageUrl = "https://ural-travel.pages.dev/og-image.jpg";
  const pageLanguage = lang === "bn" ? "bn-BD" : "en-BD";

  if (section === "home") {
    seoSchema = generateFAQSchema([
      {
        question: "How do I get a dual-currency card endorsement on a Bangladeshi passport?",
        answer:
          "Visit an authorized bank branch in Bangladesh with your original valid passport and NID to endorse up to USD $12,000 per calendar year under the Bangladesh Bank travel quota, then enable E-Commerce and 3D-Secure online transactions in your bank app before booking flights or hotels.",
      },
      {
        question: "What are the top budget-friendly family destinations from Dhaka?",
        answer:
          "Nepal (from BDT 42,000 per person with free Visa on Arrival), Malaysia (from BDT 68,000 with 4-day online e-Visa and universal Halal dining), Thailand, and the Maldives local islands (Maafushi and Hulhumalé) are the top budget-friendly family destinations from Dhaka.",
      },
      ...HAJJ_UMRAH_FAQS.slice(0, 2),
    ]);
    seoBreadcrumbs = [
      { name: "Home", url: "https://ural-travel.pages.dev/" }
    ];
  } else if (section === "flights") {
    const activeRoute = FLIGHTS_DATA.find(r => r.id === parameterId) || FLIGHTS_DATA[0];
    const year = new Date().getFullYear();

    if (isLanding) {
      seoTitle = `Flights from Dhaka: Compare Fares, Routes & Airlines (${year}) | URAL`;
      seoDescription = "Compare cheap international flights from Hazrat Shahjalal International Airport (DAC) to Nepal, Thailand, Malaysia, and Dubai. View flight duration, direct airlines, and BDT fares.";
      const collectionNode = collectionPageSchema({
        url: "https://ural-travel.pages.dev/flights",
        name: seoTitle,
        description: seoDescription,
        inLanguage: pageLanguage,
        items: FLIGHTS_DATA.map((r) => ({
          name: `${r.from} to ${r.to} Flight Guide`,
          url: `https://ural-travel.pages.dev/flights/${r.id}`,
          description: r.quickAnswer,
        })),
      });
      const faqSchema = getFaqSchemaForPage("flights", undefined, true, "https://ural-travel.pages.dev/flights");
      seoSchema = faqSchema ? [collectionNode, faqSchema] : [collectionNode];
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural-travel.pages.dev/" },
        { name: "Flight Guides", url: "https://ural-travel.pages.dev/flights" }
      ];
    } else {
      const routeUrl = `https://ural-travel.pages.dev/flights/${activeRoute.id}`;
      seoTitle = activeRoute.id === "dhaka-kathmandu"
        ? `Dhaka to Kathmandu Flight Guide 2026: Price, Time & Visa | URAL`
        : `Flights from Dhaka to ${activeRoute.to.split(" (")[0]} (${activeRoute.country}) ${year} | URAL`;
      seoDescription = activeRoute.id === "dhaka-kathmandu"
        ? `Direct Dhaka to Kathmandu flights take 1h30m on Biman Bangladesh or Himalaya Airlines, from BDT 28,000 roundtrip. Bangladeshis get a free visa on arrival.`
        : `Compare flights from Dhaka to ${activeRoute.to.split(" (")[0]}. Check flight duration, direct airlines, and BDT fares.`;

      let schemaObj: any = undefined;
      try {
        if (activeRoute.schemaMarkup?.code) {
          schemaObj = JSON.parse(activeRoute.schemaMarkup.code);
        }
      } catch (e) {
        console.error("Schema parse error:", e);
      }
      const faqSchema = getFaqSchemaForPage("flights", activeRoute.id, false, routeUrl);
      seoSchema = schemaObj && faqSchema ? [schemaObj, faqSchema] : (schemaObj || faqSchema);

      seoBreadcrumbs = [
        { name: "Home", url: "https://ural-travel.pages.dev/" },
        { name: "Flight Guides", url: "https://ural-travel.pages.dev/flights" },
        { name: `${activeRoute.from.split(" (")[0]} to ${activeRoute.to.split(" (")[0]} Flight`, url: routeUrl }
      ];
    }

  } else if (section === "hotels") {
    const activeHotel = HOTELS_DATA.find(h => h.id === parameterId) || HOTELS_DATA[0];

    if (isLanding) {
      seoTitle = `International Hotel Guides for Bangladeshi Travelers (2026) | URAL`;
      seoDescription = "Find top-rated budget & family hotels in Kathmandu, Bangkok, Kuala Lumpur, and Dubai. Neighborhood safety, halal dining, and BDT payment guides.";
      const collectionNode = collectionPageSchema({
        url: "https://ural-travel.pages.dev/hotels",
        name: seoTitle,
        description: seoDescription,
        inLanguage: pageLanguage,
        items: HOTELS_DATA.map((h) => ({
          name: `Best Hotels in ${h.city} (${h.country})`,
          url: `https://ural-travel.pages.dev/hotels/${h.id}`,
          description: h.quickAnswer,
        })),
      });
      const faqSchema = getFaqSchemaForPage("hotels", undefined, true, "https://ural-travel.pages.dev/hotels");
      seoSchema = faqSchema ? [collectionNode, faqSchema] : [collectionNode];
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural-travel.pages.dev/" },
        { name: "Hotel Neighborhoods", url: "https://ural-travel.pages.dev/hotels" }
      ];
    } else {
      const hotelUrl = `https://ural-travel.pages.dev/hotels/${activeHotel.id}`;
      seoTitle = activeHotel.id === "kathmandu-hotels"
        ? `Best Hotels in Kathmandu for Bangladeshi Travelers (2026) | URAL`
        : `Top Rated Hotels in ${activeHotel.city} | URAL`;
      seoDescription = activeHotel.id === "kathmandu-hotels"
        ? `Where to stay in Kathmandu: Thamel for budget travelers from BDT 1,500/night, Lazimpat for comfort, and Boudha for a quieter trip. Full neighborhood guide.`
        : `Compare clean rooms, recommended zones, and hotels in ${activeHotel.city} starting from cheap BDT tourist rates.`;

      let schemaObj: any = undefined;
      try {
        if (activeHotel.schemaMarkup?.code) {
          schemaObj = JSON.parse(activeHotel.schemaMarkup.code);
        }
      } catch (e) {
        console.error("Schema parse error:", e);
      }
      const faqSchema = getFaqSchemaForPage("hotels", activeHotel.id, false, hotelUrl);
      seoSchema = schemaObj && faqSchema ? [schemaObj, faqSchema] : (schemaObj || faqSchema);

      seoBreadcrumbs = [
        { name: "Home", url: "https://ural-travel.pages.dev/" },
        { name: "Hotel Neighborhoods", url: "https://ural-travel.pages.dev/hotels" },
        { name: `${activeHotel.city} Hotels`, url: hotelUrl }
      ];
    }

  } else if (section === "visa") {
    const activeVisa = VISA_DATA.find(v => v.id === parameterId) || VISA_DATA[0];

    if (isLanding) {
      seoTitle = `Visa Requirements for Bangladeshi Citizens 2026: Guides & Checklists | URAL`;
      seoDescription = "Check complete tourist visa guides for Bangladeshi citizens. Learn about free Visa on Arrival in Nepal, Thailand sticker visa rules, Malaysia eVisa, and Dubai visas.";
      const collectionNode = collectionPageSchema({
        url: "https://ural-travel.pages.dev/visa",
        name: seoTitle,
        description: seoDescription,
        inLanguage: pageLanguage,
        items: VISA_DATA.map((v) => ({
          name: `${v.country} Visa Guide for Bangladeshis`,
          url: `https://ural-travel.pages.dev/visa/${v.id}`,
          description: v.quickAnswer,
        })),
      });
      const faqSchema = getFaqSchemaForPage("visa", undefined, true, "https://ural-travel.pages.dev/visa");
      seoSchema = faqSchema ? [collectionNode, faqSchema] : [collectionNode];
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural-travel.pages.dev/" },
        { name: "Visa Guides", url: "https://ural-travel.pages.dev/visa" }
      ];
    } else {
      const visaUrl = `https://ural-travel.pages.dev/visa/${activeVisa.id}`;
      seoTitle = activeVisa.id === "nepal-visa"
        ? `Nepal Visa for Bangladeshi Citizens 2026: Free Visa on Arrival Guide | URAL`
        : `${activeVisa.country} Visa for Bangladeshi Travelers 2026 | URAL`;
      seoDescription = activeVisa.id === "nepal-visa"
        ? `Bangladeshi citizens get a free 30-day Nepal visa on arrival for their first trip each year. Full document checklist, fees for repeat visits, and step-by-step process.`
        : `Check complete visa requirements, costs in BDT, step-by-step instructions, and checklist for ${activeVisa.country} from Dhaka.`;

      let schemaObj: any = undefined;
      try {
        if (activeVisa.schemaMarkup?.code) {
          schemaObj = JSON.parse(activeVisa.schemaMarkup.code);
        }
      } catch (e) {
        console.error("Schema parse error:", e);
      }
      const faqSchema = getFaqSchemaForPage("visa", activeVisa.id, false, visaUrl);
      seoSchema = schemaObj && faqSchema ? [schemaObj, faqSchema] : (schemaObj || faqSchema);

      seoBreadcrumbs = [
        { name: "Home", url: "https://ural-travel.pages.dev/" },
        { name: "Visa Guides", url: "https://ural-travel.pages.dev/visa" },
        { name: `${activeVisa.country} Visa`, url: visaUrl }
      ];
    }

  } else if (section === "destinations") {
    const activeDes = DESTINATIONS_DATA.find(d => d.id === parameterId) || DESTINATIONS_DATA[0];

    if (isLanding) {
      seoTitle = `Outbound Travel Plans & Itineraries from Bangladesh | URAL`;
      seoDescription = "Explore hand-crafted 5-day itineraries and travel plans for Bangladeshi tourists visiting Nepal, Thailand, Malaysia, and the UAE with BDT budgets.";
      const collectionNode = collectionPageSchema({
        url: "https://ural-travel.pages.dev/destinations",
        name: seoTitle,
        description: seoDescription,
        inLanguage: pageLanguage,
        items: DESTINATIONS_DATA.map((d) => ({
          name: `${d.country} 5-Day Itinerary from Bangladesh`,
          url: `https://ural-travel.pages.dev/destinations/${d.id}`,
          description: d.quickAnswer,
        })),
      });
      const faqSchema = getFaqSchemaForPage("destinations", undefined, true, "https://ural-travel.pages.dev/destinations");
      seoSchema = faqSchema ? [collectionNode, faqSchema] : [collectionNode];
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural-travel.pages.dev/" },
        { name: "Destinations", url: "https://ural-travel.pages.dev/destinations" }
      ];
    } else {
      const destUrl = `https://ural-travel.pages.dev/destinations/${activeDes.id}`;
      seoTitle = activeDes.id === "nepal-guide"
        ? `Nepal Trip Plan from Bangladesh: 5-Day Itinerary & Costs (2026) | URAL`
        : `${activeDes.country} Tour Itinerary & Travel Plan from Bangladesh | URAL`;
      seoDescription = activeDes.id === "nepal-guide"
        ? `A day-by-day Nepal itinerary for Bangladeshi travelers - Kathmandu and Pokhara highlights, local transport, food, and a realistic budget in BDT.`
        : `Find tourist route plans, day-by-day itineraries, local transport guides, and estimated daily spends in BDT.`;

      let schemaObj: any = undefined;
      try {
        if (activeDes.schemaMarkup?.code) {
          schemaObj = JSON.parse(activeDes.schemaMarkup.code);
        }
      } catch (e) {
        console.error("Schema parse error:", e);
      }
      const tripNode = touristTripSchema({
        url: destUrl,
        name: `${activeDes.country} 5-Day Itinerary from Dhaka`,
        description: seoDescription,
        country: activeDes.country,
        places: activeDes.itinerary?.map((p) => p.title) || [activeDes.country],
        estimatedPriceBdt:
          activeDes.id === "nepal-guide"
            ? 45000
            : activeDes.id === "thailand-guide"
            ? 68000
            : activeDes.id === "malaysia-guide"
            ? 68000
            : activeDes.id === "singapore-guide"
            ? 88000
            : activeDes.id === "maldives-guide"
            ? 76000
            : 95000,
        inLanguage: pageLanguage,
      });
      const faqSchema = getFaqSchemaForPage("destinations", activeDes.id, false, destUrl);
      seoSchema = [schemaObj, tripNode, faqSchema].filter(Boolean);

      seoBreadcrumbs = [
        { name: "Home", url: "https://ural-travel.pages.dev/" },
        { name: "Destinations", url: "https://ural-travel.pages.dev/destinations" },
        { name: `${activeDes.country} Guide`, url: destUrl }
      ];
    }

  } else if (section === "costs") {
    const activeCost = TRIP_COSTS_DATA.find(c => c.id === parameterId) || TRIP_COSTS_DATA[0];

    if (isLanding) {
      seoTitle = `International Trip Budgets from Bangladesh: Realistic BDT Cost Guides | URAL`;
      seoDescription = "How much does an international trip really cost from Dhaka? Detailed BDT budgets for Nepal, Thailand, Malaysia, and Dubai covering flights, hotels, food & transport.";
      const collectionNode = collectionPageSchema({
        url: "https://ural-travel.pages.dev/costs",
        name: seoTitle,
        description: seoDescription,
        inLanguage: pageLanguage,
        items: TRIP_COSTS_DATA.map((c) => ({
          name: `${c.country} 5-Day Trip Cost Breakdown in BDT`,
          url: `https://ural-travel.pages.dev/costs/${c.id}`,
          description: c.quickAnswer,
        })),
      });
      const faqSchema = getFaqSchemaForPage("costs", undefined, true, "https://ural-travel.pages.dev/costs");
      seoSchema = faqSchema ? [collectionNode, faqSchema] : [collectionNode];
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural-travel.pages.dev/" },
        { name: "Trip Costs", url: "https://ural-travel.pages.dev/costs" }
      ];
    } else {
      const costUrl = `https://ural-travel.pages.dev/costs/${activeCost.id}`;
      seoTitle = activeCost.id === "nepal-costs"
        ? `Nepal Trip Cost from Bangladesh 2026: Full Budget Breakdown (BDT) | URAL`
        : `${activeCost.country} Trip Cost from Bangladesh: Full Budget Sheet | URAL`;
      seoDescription = activeCost.id === "nepal-costs"
        ? `What a 5-day Nepal trip really costs from Bangladesh - flights, hotels, food, and transport in BDT, from budget (BDT 45,000) to luxury.`
        : `Detailed BDT breakdown of flights, hotels, dining, and sightseeing costs for planning your trip from Dhaka to ${activeCost.country}.`;

      let schemaObj: any = undefined;
      try {
        if (activeCost.schemaMarkup?.code) {
          schemaObj = JSON.parse(activeCost.schemaMarkup.code);
        }
      } catch (e) {
        console.error("Schema parse error:", e);
      }
      const faqSchema = getFaqSchemaForPage("costs", activeCost.id, false, costUrl);
      seoSchema = schemaObj && faqSchema ? [schemaObj, faqSchema] : (schemaObj || faqSchema);

      seoBreadcrumbs = [
        { name: "Home", url: "https://ural-travel.pages.dev/" },
        { name: "Trip Costs", url: "https://ural-travel.pages.dev/costs" },
        { name: `${activeCost.country} Costs`, url: costUrl }
      ];
    }

  } else if (section === "tools") {
    seoTitle = "Bangladeshi Traveler Utility Tools & Services (2026) | URAL";
    seoDescription = "Access handy travel utility tools for Bangladeshi outbound tourists: live BDT exchange rates, power plug specifications, packing checklist, and translation aids.";
    const toolsServiceNode = serviceSchema({
      url: "https://ural-travel.pages.dev/tools",
      idSuffix: "service-travel-tools",
      name: "Bangladesh Outbound Currency, Visa Odds & Flight Delay Claim Tools",
      description: seoDescription,
      serviceType: "Travel Planning & Flight Compensation Utility",
    });
    const faqSchema = getFaqSchemaForPage("tools", undefined, true, "https://ural-travel.pages.dev/tools");
    seoSchema = faqSchema ? [toolsServiceNode, faqSchema] : [toolsServiceNode];
    seoBreadcrumbs = [
      { name: "Home", url: "https://ural-travel.pages.dev/" },
      { name: "Travel Tools", url: "https://ural-travel.pages.dev/tools" }
    ];

  } else if (section === "blog") {
    const activePost = BLOG_DATA.find(p => p.slug === parameterId) || BLOG_DATA[0];
    if (isLanding) {
      seoTitle = "Travel Guides, Umrah Preparation & Outbound Intelligence for Bangladesh (2026) | URAL Blog";
      seoDescription = "Explore verified travel guides built for Bangladeshi travelers: DIY Umrah & Hajj preparation, dual-currency card endorsement, visa checklists, and family trip budgets in BDT.";
      seoSchema = collectionPageSchema({
        url: "https://ural-travel.pages.dev/blog",
        name: seoTitle,
        description: seoDescription,
        inLanguage: pageLanguage,
        items: BLOG_DATA.map((p) => ({
          name: p.title,
          url: `https://ural-travel.pages.dev/blog/${p.slug}`,
          description: p.summary,
        })),
      });
      seoBreadcrumbs = [
        { name: "Home", url: "https://ural-travel.pages.dev/" },
        { name: "Travel Blog", url: "https://ural-travel.pages.dev/blog" }
      ];
    } else {
      const postUrl = `https://ural-travel.pages.dev/blog/${activePost.slug}`;
      const postImgUrl = `https://ural-travel.pages.dev/img/blog/${activePost.slug}.jpg`;
      seoTitle = `${activePost.title} | URAL Travel Blog`;
      seoDescription = activePost.summary;
      seoImageUrl = postImgUrl;

      const articleNode = articleSchema({
        url: postUrl,
        headline: activePost.title,
        description: activePost.summary,
        slug: activePost.slug,
        datePublished: activePost.date,
        dateModified: activePost.date,
        authorRaw: activePost.author,
        articleSection: activePost.category,
        imageUrl: postImgUrl,
        inLanguage: pageLanguage,
      });

      // Only emit FAQPage when the article is in the Hajj & Umrah or Ziyarah & Stopovers cluster where those FAQs are visibly rendered
      if (activePost.category === "Hajj & Umrah" || activePost.category === "Ziyarah & Stopovers") {
        const faqSchema = generateFAQSchema(HAJJ_UMRAH_FAQS, {
          url: postUrl,
          name: activePost.title,
        });
        seoSchema = [articleNode, faqSchema];
      } else {
        seoSchema = [articleNode];
      }

      seoBreadcrumbs = [
        { name: "Home", url: "https://ural-travel.pages.dev/" },
        { name: "Travel Blog", url: "https://ural-travel.pages.dev/blog" },
        { name: activePost.title, url: postUrl }
      ];
    }
  } else if (section === "contact") {
    seoTitle = "Contact URAL — Direct Phone & WhatsApp Support";
    seoDescription = "Connect directly with our flight & visa support desk at +8801784385335. Send us an inquiry for flight packages, visa assistance, and personalized outbound plans.";
    const contactServiceNode = serviceSchema({
      url: "https://ural-travel.pages.dev/contact",
      idSuffix: "service-visa-assistance",
      name: "Bangladesh Outbound Visa Assistance & BDT Booking Desk",
      description:
        "Visa checklist review, document preparation, and flight/hotel booking in Bangladeshi Taka via bKash or bank transfer for Bangladeshi passport holders.",
      serviceType: "Visa Assistance",
    });
    const faqSchema = getFaqSchemaForPage("contact", undefined, true, "https://ural-travel.pages.dev/contact");
    seoSchema = faqSchema ? [contactServiceNode, faqSchema] : [contactServiceNode];
    seoBreadcrumbs = [
      { name: "Home", url: "https://ural-travel.pages.dev/" },
      { name: "Contact Us", url: "https://ural-travel.pages.dev/contact" }
    ];
  } else if (section === "experiences") {
    seoTitle = "Europe, UK, USA & Asian Attraction Passes (Tiqets & Klook Hub) | URAL";
    seoDescription = "Skip the line in Paris, London, Rome, Milan, Venice, and New York with official Tiqets passes, or book discounted Klook tours in Dubai, Bangkok, Singapore, and KL.";
    seoSchema = [
      productOfferSchema({
        url: "https://ural-travel.pages.dev/experiences",
        idSuffix: "product-airalo-saudi-esim",
        name: "Saudi Arabia Travel eSIM for Umrah (5 GB / 30 days)",
        description:
          "Prepaid data eSIM covering Makkah, Madinah and Jeddah, activated before departure from Dhaka.",
        sku: "airalo-saudi-5gb-30d",
        brandName: "Airalo",
        priceBdt: 2100,
      }),
      productOfferSchema({
        url: "https://ural-travel.pages.dev/experiences",
        idSuffix: "product-tiqets-paris-pass",
        name: "Paris Louvre, Eiffel Tower & Seine River Skip-the-Line Bundle",
        description:
          "Official mobile-entry attraction bundle for Bangladeshi Schengen visa travelers visiting Paris.",
        sku: "tiqets-paris-bundle-2026",
        brandName: "Tiqets",
        priceBdt: 9800,
      }),
    ];
    seoBreadcrumbs = [
      { name: "Home", url: "https://ural-travel.pages.dev/" },
      { name: "Attractions & Passes", url: "https://ural-travel.pages.dev/experiences" }
    ];
  } else if (section === "umrah") {
    seoTitle = "Umrah Cost from Bangladesh: DIY Guide & Nusuk | URAL";
    seoDescription = "Plan Umrah from Dhaka with a BDT cost framework, Saudi visa and Nusuk guidance, Makkah–Madinah travel options, and a practical preparation checklist.";
    seoSchema = generateFAQSchema(HAJJ_UMRAH_FAQS, {
      url: "https://ural-travel.pages.dev/umrah",
      name: "Umrah & Hajj Planning Hub from Bangladesh (2026)",
    });
    seoBreadcrumbs = [
      { name: "Home", url: "https://ural-travel.pages.dev/" },
      { name: "Umrah & Hajj Hub", url: "https://ural-travel.pages.dev/umrah" }
    ];
  } else if (section === "sitemap") {
    seoTitle = "Dhaka Airport (DAC) Pre-Departure Checklist, Baggage & Complete 83-Page Sitemap | URAL";
    seoDescription = "Interactive pre-flight readiness checklist for Bangladeshi travelers departing Dhaka Airport (DAC), cabin & Zamzam baggage rules, Embassy emergency helplines, and complete 83-page directory.";
    seoSchema = getPreDepartureFaqSchema({
      url: "https://ural-travel.pages.dev/sitemap",
    });
    seoBreadcrumbs = [
      { name: "Home", url: "https://ural-travel.pages.dev/" },
      { name: "Pre-Departure & Complete Sitemap", url: "https://ural-travel.pages.dev/sitemap" }
    ];
  }

  if (section === "notFound") {
    seoTitle = "Page not found | URAL";
    seoDescription = "The requested URAL travel page could not be found. Browse the travel guides or return to the homepage.";
  }

  const seoRoutePath = (() => {
    if (section === "home") return "/";
    if (["flights", "hotels", "visa", "destinations", "costs"].includes(section)) {
      return isLanding ? `/${section}` : `/${section}/${parameterId}`;
    }
    if (section === "blog") return isLanding ? "/blog" : `/blog/${parameterId}`;
    if (section === "experiences") return "/experiences";
    if (section === "umrah") return "/umrah";
    if (section === "sitemap") return "/sitemap";
    if (section === "tools" || section === "contact") return `/${section}`;
    return new URL(currentPath, "https://ural-travel.pages.dev").pathname;
  })();

  const sharedSeoCopy = getSeoCopy(seoRoutePath, seoTitle, seoDescription);
  seoTitle = sharedSeoCopy.title;
  seoDescription = sharedSeoCopy.description;

  const syncPageSchemaCopy = (schemaNode: any): any => {
    if (Array.isArray(schemaNode)) return schemaNode.map(syncPageSchemaCopy);
    if (!schemaNode || typeof schemaNode !== "object") return schemaNode;

    const updatedNode = { ...schemaNode };
    if (updatedNode["@type"] === "WebPage" || updatedNode["@type"] === "CollectionPage") {
      updatedNode.name = seoTitle;
      updatedNode.description = seoDescription;
    }
    if (Array.isArray(updatedNode["@graph"])) {
      updatedNode["@graph"] = updatedNode["@graph"].map(syncPageSchemaCopy);
    }
    return updatedNode;
  };
  seoSchema = syncPageSchemaCopy(seoSchema);

  // Call the hook at the top level
  useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    schema: seoSchema,
    breadcrumbs: seoBreadcrumbs,
    imageUrl: seoImageUrl,
    inLanguage: pageLanguage,
    noindex: section === "notFound",
  });

  // Helper that normalizes legacy query-string paths to clean path-based routes
  const normalizeRoutePath = (rawPath: string): string => {
    try {
      const u = new URL(rawPath, "https://ural-travel.pages.dev");
      const p = u.pathname;
      const sp = u.searchParams;
      if (p === "/flights" && sp.get("route")) return `/flights/${sp.get("route")}`;
      if (p === "/hotels" && sp.get("city")) return `/hotels/${sp.get("city")}`;
      if (p === "/visa" && sp.get("country")) return `/visa/${sp.get("country")}`;
      if (p === "/destinations" && sp.get("country")) return `/destinations/${sp.get("country")}`;
      if (p === "/costs" && sp.get("country")) return `/costs/${sp.get("country")}`;
      if (p === "/blog" && sp.get("slug")) return `/blog/${sp.get("slug")}`;
      if (p === "/pre-departure" || p === "/indexing") return "/sitemap";
      return u.pathname + u.search + u.hash;
    } catch {
      return rawPath;
    }
  };

  // Navigation Helper that emulates URL path routing with clean path URLs
  const navigateTo = (path: string) => {
    const cleanPath = normalizeRoutePath(path);
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", cleanPath);
    }
    setCurrentPath(cleanPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  // Synchronise real live Dhaka (BST) clock instead of static mock timestamp
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateDhakaClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Dhaka",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setCurrentTime(`${formatted} (Dhaka BST)`);
      } catch {
        setCurrentTime("Dhaka Standard Time (GMT+6)");
      }
    };
    updateDhakaClock();
    const timer = window.setInterval(updateDhakaClock, 60000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-brand-ivory text-slate-800 font-sans leading-relaxed selection:bg-[#F6B73C] selection:text-brand-navy overflow-x-hidden">
      


      {/* 🟦 STICKY HEADER WRAPPER (Top Strip + Main Navbar) */}
      <div className="sticky top-0 z-50 w-full shadow-lg">
        
        {/* 🟦 TOP STRIP (Height: 36px, Background: #0B1426) */}
        <div className="w-full bg-brand-navy h-9 flex items-center select-none">
          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between text-white/55 text-xs">
            <span className="truncate font-sans font-medium">{t.topStripTagline}</span>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 font-sans text-[11px] font-medium">
              <TopBarWhatsApp lang={lang} />
              <span className="w-px h-3 bg-white/20"></span>
              <LanguageSwitcher lang={lang} onToggle={handleLangToggle} />
            </div>
          </div>
        </div>

        {/* 🟦 1. MAIN NAVBAR (Height: 64px, Background: #0B1426) */}
        <header id="main-navbar-sticky" className="w-full bg-brand-navy text-white border-b border-white/8 h-16 flex items-center">
          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between">
            
            {/* Logo Left */}
            <div className="flex items-center cursor-pointer" onClick={() => navigateTo("/")}>
              <img
                src="/assets/brand/svg/ural-wordmark.svg"
                alt="URAL"
                width="105"
                height="36"
                className="h-9 w-auto"
              />
            </div>

            {/* Navigation Centered — Streamlined High-Intent Information Architecture */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-5">
              {/* 1. Home */}
              <button
                type="button"
                id="nav-home"
                onClick={() => navigateTo("/")}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap py-2 ${
                  section === "home" ? "text-[#F6B73C] font-semibold" : "text-white/75"
                }`}
              >
                {t.navHome}
              </button>

              {/* 2. Priority #1 Pillar: Umrah & Hajj */}
              <button
                type="button"
                id="nav-umrah"
                onClick={() => navigateTo("/umrah")}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-semibold hover:text-[#F6B73C] whitespace-nowrap flex items-center gap-1.5 py-2 ${
                  section === "umrah" ? "text-[#F6B73C]" : "text-white"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C]" aria-hidden="true" />
                <span>{t.navUmrah}</span>
              </button>

              {/* 3. Flights */}
              <button
                type="button"
                id="nav-flights"
                onClick={() => navigateTo("/flights")}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap py-2 ${
                  section === "flights" ? "text-[#F6B73C] font-semibold" : "text-white/75"
                }`}
              >
                {t.navFlights}
              </button>

              {/* 4. Hotels */}
              <button
                type="button"
                id="nav-hotels"
                onClick={() => navigateTo("/hotels")}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap py-2 ${
                  section === "hotels" ? "text-[#F6B73C] font-semibold" : "text-white/75"
                }`}
              >
                {t.navHotels}
              </button>

              {/* 5. Visa Checklists */}
              <button
                type="button"
                id="nav-visa"
                onClick={() => navigateTo("/visa")}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap py-2 ${
                  section === "visa" ? "text-[#F6B73C] font-semibold" : "text-white/75"
                }`}
              >
                {t.navVisa}
              </button>

              {/* 6. Destinations & Global Attractions Mega Menu */}
              <div className="relative group">
                <button
                  type="button"
                  id="nav-destinations-megamenu"
                  onClick={() => navigateTo("/destinations")}
                  className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap flex items-center gap-1 py-2 ${
                    section === "destinations" || section === "experiences"
                      ? "text-[#F6B73C] font-semibold"
                      : "text-white/75"
                  }`}
                >
                  <span>{t.navDestinations}</span>
                  <span className="text-[10px] opacity-75">▾</span>
                </button>

                {/* 3-Column Mega Menu Dropdown Panel */}
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[780px] lg:w-[860px] z-50">
                  <div className="bg-brand-navy border border-white/15 rounded-3xl shadow-2xl p-6 grid grid-cols-12 gap-6 text-left">
                    {/* Column 1: Asia & Middle East Pillars (4 Cols) */}
                    <div className="col-span-4 space-y-3 border-r border-white/10 pr-5">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-[#F6B73C] font-bold uppercase tracking-wider block">
                          {isBn ? "এশিয়া ও মধ্যপ্রাচ্য গাইড" : "Asia & Middle East Pillars"}
                        </span>
                        <span className="text-xs text-slate-400 block">
                          {isBn ? "ভিসা + ফ্লাইট + BDT বাজেট গাইড" : "Full Visa, Flight & Hotel Guides"}
                        </span>
                      </div>

                      <div className="space-y-1">
                        {[
                          {
                            label: isBn ? "🇳🇵 নেপাল (কাঠমান্ডু ও পোখরা)" : "🇳🇵 Nepal (Kathmandu & Pokhara)",
                            sub: isBn ? "ফ্রি SAARC অন-অ্যারাইভাল ভিসা" : "Free SAARC VOA · From BDT 40k",
                            path: "/destinations/nepal-guide",
                          },
                          {
                            label: isBn ? "🇹🇭 থাইল্যান্ড (ব্যাংকক ও ফুকেট)" : "🇹🇭 Thailand (Bangkok & Phuket)",
                            sub: isBn ? "শপিং, হালাল ফুড ও আইল্যান্ড" : "Halal dining, shopping & islands",
                            path: "/destinations/thailand-guide",
                          },
                          {
                            label: isBn ? "🇲🇾 মালয়েশিয়া (কুয়ালালামপুর)" : "🇲🇾 Malaysia (KL & Genting)",
                            sub: isBn ? "ই-ভিসা ও ফ্যামিলি হাব" : "Fast e-Visa · Family favorite",
                            path: "/destinations/malaysia-guide",
                          },
                          {
                            label: isBn ? "🇸🇬 সিঙ্গাপুর (মেরিনা বে ও সেন্টোসা)" : "🇸🇬 Singapore (Sentosa & Bugis)",
                            sub: isBn ? "MRT গাইড ও থিম পার্ক" : "SimplyGo MRT & Universal Studios",
                            path: "/destinations/singapore-guide",
                          },
                          {
                            label: isBn ? "🇲🇻 মালদ্বীপ (মাফুশি ও রিসোর্ট)" : "🇲🇻 Maldives (Maafushi & Resorts)",
                            sub: isBn ? "ফ্রি ভিসা · বাজেট ও ওয়াটার ভিলা" : "Free VOA · Local island & resorts",
                            path: "/destinations/maldives-guide",
                          },
                          {
                            label: isBn ? "🇦🇪 দুবাই ও আবুধাবি (UAE)" : "🇦🇪 Dubai & Abu Dhabi (UAE)",
                            sub: isBn ? "ডেজার্ট সাফারি ও বুর্জ খলিফা" : "Desert Safari, Deira & Downtown",
                            path: "/destinations/dubai-guide",
                          },
                        ].map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => navigateTo(item.path)}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/8 transition-colors block cursor-pointer"
                          >
                            <div className="text-xs font-semibold text-white">{item.label}</div>
                            <div className="text-[11px] text-slate-400">{item.sub}</div>
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => navigateTo("/destinations")}
                        className="w-full text-left px-3 pt-1 text-xs font-semibold text-[#F6B73C] hover:underline cursor-pointer"
                      >
                        {isBn ? "সবগুলো এশিয়ান গন্তব্য দেখুন →" : "View All Asian Destination Guides →"}
                      </button>
                    </div>

                    {/* Column 2: Europe, UK & USA Hubs — Tiqets Official (4 Cols) */}
                    <div className="col-span-4 space-y-3 border-r border-white/10 pr-5">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-[#F6B73C] font-bold uppercase tracking-wider block">
                          {isBn ? "ইউরোপ, যুক্তরাজ্য ও আমেরিকা (Tiqets)" : "Europe, UK & USA (Tiqets)"}
                        </span>
                        <span className="text-xs text-slate-400 block">
                          {isBn ? "স্কিপ-দ্য-লাইন মিউজিয়াম ও পাস" : "Skip-the-Line Passes & Bundles"}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {[
                          {
                            label: isBn ? "🇫🇷 প্যারিস, ফ্রান্স (Paris)" : "🇫🇷 Paris, France (Schengen)",
                            sub: isBn ? "লুভর, আইফেল টাওয়ার ও সেইন ক্রুজ" : "Louvre, Eiffel Tower & Seine Cruise",
                            path: "/experiences?region=west&city=paris",
                          },
                          {
                            label: isBn ? "🇬🇧 লন্ডন, যুক্তরাজ্য (London)" : "🇬🇧 London, United Kingdom",
                            sub: isBn ? "লন্ডন আই, টাওয়ার অব লন্ডন ও টেমস" : "Tower of London, Thames & London Eye",
                            path: "/experiences?region=west&city=london",
                          },
                          {
                            label: isBn ? "🇮🇹 রোম, মিলান ও ভেনিস (Italy)" : "🇮🇹 Rome, Milan & Venice (Italy)",
                            sub: isBn ? "কলোসিয়াম, দুওমো ও ভেনিস গন্ডোলা" : "Colosseum, Milan Duomo & Gondola",
                            path: "/experiences?region=west&city=rome-italy",
                          },
                          {
                            label: isBn ? "🇺🇸 নিউ ইয়র্ক সিটি (USA)" : "🇺🇸 New York City (USA)",
                            sub: isBn ? "স্ট্যাচু অব লিবার্টি ও SUMMIT ডেক" : "Statue of Liberty, Harbor & SUMMIT",
                            path: "/experiences?region=west&city=new-york",
                          },
                        ].map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => navigateTo(item.path)}
                            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/8 transition-colors block cursor-pointer"
                          >
                            <div className="text-xs font-semibold text-white">{item.label}</div>
                            <div className="text-[11px] text-slate-400">{item.sub}</div>
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => navigateTo("/experiences?region=west")}
                        className="w-full text-left px-3 pt-1 text-xs font-semibold text-[#F6B73C] hover:underline cursor-pointer"
                      >
                        {isBn
                          ? "ইউরোপ, UK ও USA-এর সব পাস দেখুন →"
                          : "Browse Europe, UK & USA Hub →"}
                      </button>
                    </div>

                    {/* Column 3: Asia Attractions (Klook) + KKday Promo (4 Cols) */}
                    <div className="col-span-4 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                            {isBn ? "এশিয়া ও দুবাই ডে-পাস (Klook)" : "Asia & Dubai Passes (Klook)"}
                          </span>
                          <span className="text-xs text-slate-400 block">
                            {isBn
                              ? "বাংলাদেশিদের শীর্ষ বুকিংকৃত আকর্ষণ"
                              : "Top Residency Experiences in BDT"}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          {[
                            {
                              label: isBn ? "🇦🇪 দুবাই সাফারি ও বুর্জ খলিফা" : "🇦🇪 Dubai Safari & Burj Khalifa",
                              sub: isBn ? "মিউজিয়াম অব দ্য ফিউচার ও ডিনার ক্রুজ" : "Museum of the Future + Red Dunes",
                              path: "/experiences?region=asia&city=dubai-klook",
                            },
                            {
                              label: isBn ? "🇹🇭 ব্যাংকক সাফারি ওয়ার্ল্ড ও ক্রুজ" : "🇹🇭 Bangkok Safari World & Cruise",
                              sub: isBn ? "হালাল চাও ফ্রায়া ডিনার ও স্কাইওয়াক" : "Halal Chao Phraya Cruise & SkyWalk",
                              path: "/experiences?region=asia&city=bangkok-klook",
                            },
                            {
                              label: isBn ? "🇸🇬 সিঙ্গাপুর ও গেন্টিং হাইল্যান্ডস" : "🇸🇬 Universal Studios & Genting",
                              sub: isBn ? "গার্ডেন্স বাই দ্য বে ও কেবল কার" : "Gardens by the Bay & Awana SkyWay",
                              path: "/experiences?region=asia&city=singapore-kl",
                            },
                          ].map((item, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => navigateTo(item.path)}
                              className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/8 transition-colors block cursor-pointer"
                            >
                              <div className="text-xs font-semibold text-white">{item.label}</div>
                              <div className="text-[11px] text-slate-400">{item.sub}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Featured Callout Card inside Mega Menu */}
                      <div className="bg-white/6 border border-white/12 rounded-2xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-cyan-300 font-bold">
                            {isBn ? "🔥 KKday ৯.৯ সেল (৩০% ছাড়)" : "🔥 KKday 9.9 SEA Sale (30% OFF)"}
                          </span>
                          <span className="text-amber-300 font-semibold">+$100 Giveaway</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {isBn
                            ? "থাইল্যান্ড, মালয়েশিয়া ও সিঙ্গাপুরে ৩০% প্রোমো কোড + Buy 1 Get 1 ডিল (ভ্রমণ: ৩১ ডিসেম্বর ২০২৬ পর্যন্ত)।"
                            : "30% OFF + Buy 1 Get 1 on Thailand, Malaysia & Singapore passes (travel until Dec 31, 2026)."}
                        </p>
                        <div className="grid grid-cols-2 gap-2 pt-0.5">
                          <button
                            type="button"
                            onClick={() => navigateTo("/experiences")}
                            className="bg-[#F6B73C] hover:bg-[#ffc654] text-brand-navy font-bold text-[11px] py-2 px-2.5 rounded-xl transition-colors cursor-pointer"
                          >
                            {isBn ? "অ্যাক্টিভিটি হাব →" : "All Passes →"}
                          </button>
                          <a
                            href={AFFILIATE_LINKS.kkday}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="bg-cyan-400 hover:bg-cyan-300 text-[#0B192C] font-bold text-[11px] py-2 px-2.5 rounded-xl transition-colors text-center"
                          >
                            {isBn ? "KKday ৩০% ডিল ↗" : "KKday 30% Sale ↗"}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. PRIMARY TOP-LEVEL BLOG LINK (Crawl Depth = 1 for Topical Authority) */}
              <button
                type="button"
                id="nav-blog"
                onClick={() => navigateTo("/blog")}
                className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] whitespace-nowrap py-2 ${
                  section === "blog" ? "text-[#F6B73C] font-semibold" : "text-white/75"
                }`}
              >
                {t.navBlog}
              </button>

              {/* 8. COMPACT UTILITY MENU: TOOLS, BUDGETS & PRE-DEPARTURE HUB */}
              <div className="relative group">
                <button
                  type="button"
                  id="nav-tools-megamenu"
                  onClick={() => navigateTo("/tools")}
                  className={`text-[13.5px] transition-colors duration-200 cursor-pointer font-medium hover:text-[#F6B73C] flex items-center gap-1 py-2 whitespace-nowrap ${
                    ["costs", "tools", "contact", "sitemap"].includes(section)
                      ? "text-[#F6B73C] font-semibold"
                      : "text-white/75"
                  }`}
                >
                  <span>{t.navTools}</span>
                  <span className="text-[10px] opacity-75">▾</span>
                </button>

                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 transition-all duration-150 absolute right-0 top-full pt-2 w-[340px] z-50">
                  <div className="bg-brand-navy border border-white/15 rounded-3xl shadow-2xl p-4 space-y-1.5 text-left">
                    <span className="text-[10px] font-mono text-[#F6B73C] font-bold uppercase tracking-wider block px-2 pb-1">
                      {isBn ? "ইন্টারেক্টিভ টুলস ও হেল্পলাইন" : "Calculators, Checklists & Support"}
                    </span>

                    {[
                      {
                        id: "costs",
                        label: isBn ? "📊 দেশভিত্তিক বাজেট শিট (BDT)" : "📊 Trip Cost & Budget Matrices",
                        sub: isBn ? "৬টি দেশের ৩-স্তরের খরচের হিসাব" : "3-tier BDT budgets for 6 countries",
                        path: "/costs",
                      },
                      {
                        id: "tools",
                        label: isBn ? "🧮 কারেন্সি কনভার্টার ও প্যাকিং" : "🧮 Currency, Packing & Visa Odds",
                        sub: isBn ? "লাইভ BDT রেট ও প্যাকিং লিস্ট" : "Live BDT FX converter & trip tools",
                        path: "/tools",
                      },
                      {
                        id: "pre-departure",
                        label: isBn ? "✈️ প্রি-ডিপার্চার ও দূতাবাস হেল্পলাইন" : "✈️ Pre-Departure & Embassy Hub",
                        sub: isBn ? "লাগেজ নিয়ম, জমজম ও জরুরি নাম্বার" : "DAC baggage, Zamzam & embassy contacts",
                        path: "/pre-departure",
                      },
                      {
                        id: "airhelp",
                        label: isBn ? "🛡️ ফ্লাইট বিলম্ব ক্ষতিপূরণ (€600)" : "🛡️ Flight Delay Claim (€600 / AirHelp)",
                        sub: isBn ? "প্রোমো কোড AHTPO11 (১১% ছাড়)" : "Up to BDT 78k payout + Code AHTPO11",
                        path: "/tools?tab=airhelp",
                      },
                      {
                        id: "contact",
                        label: isBn ? "💬 BDT বুকিং ও সাপোর্ট ডেস্ক" : "💬 Contact & BDT Booking Desk",
                        sub: isBn ? "WhatsApp: +8801784385335" : "Pay in BDT via bank / bKash",
                        path: "/contact",
                      },
                    ].map((toolItem) => (
                      <button
                        key={toolItem.id}
                        type="button"
                        onClick={() => navigateTo(toolItem.path)}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/8 transition-colors block cursor-pointer"
                      >
                        <div className="text-xs font-semibold text-white">{toolItem.label}</div>
                        <div className="text-[11px] text-slate-400">{toolItem.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Start Trip CTA Right */}
            <div className="flex items-center gap-4">
              <button
                id="btn-start-trip-cta"
                onClick={() => navigateTo("/destinations")}
                className="hidden md:block bg-[#F6B73C] text-brand-navy hover:bg-[#D4941A] font-bold text-sm rounded-full px-5 py-2 shadow-md transition-colors whitespace-nowrap cursor-pointer"
              >
                {t.startTripCta}
              </button>

              {/* Mobile Hamburger Menu Burger */}
              <button
                type="button"
                id="mobile-menu-burger"
                aria-label={isBn ? "নেভিগেশন মেনু খুলুন" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-intent-drawer"
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1.5 hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] cursor-pointer transition-colors"
              >
                <span className="w-5 h-[2px] bg-[#F6B73C] rounded-full transition-all"></span>
                <span className="w-5 h-[2px] bg-[#F6B73C] rounded-full transition-all"></span>
                <span className="w-5 h-[2px] bg-[#F6B73C] rounded-full transition-all"></span>
              </button>
            </div>
          </div>

          {/* Mobile Sliding Navigation Drawer — Grouped by User Intent with Collapsible Sub-Menus */}
          {mobileMenuOpen && (
            <div
              id="mobile-intent-drawer"
              role="dialog"
              aria-modal="true"
              aria-label={isBn ? "মোবাইল নেভিগেশন মেনু" : "Mobile navigation menu"}
              className="fixed inset-0 z-50 md:hidden"
            >
              {/* Semi-transparent backdrop with click-to-close */}
              <div
                className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
                aria-hidden="true"
              />

              {/* Sliding drawer from right */}
              <div className="fixed top-0 right-0 h-full w-[340px] max-w-[90vw] bg-brand-navy shadow-2xl flex flex-col z-10 border-l border-white/10">
                {/* Drawer Header */}
                <div className="h-15 px-4 flex items-center justify-between border-b border-white/10 shrink-0">
                  <div className="flex flex-col items-start gap-0.5">
                    <img
                      src="/assets/brand/svg/ural-wordmark.svg"
                      alt="URAL"
                      width="70"
                      height="24"
                      className="h-6 w-auto"
                    />
                    <span className="text-[11px] text-slate-400 block">
                      {isBn ? "যাত্রার উদ্দেশ্য অনুযায়ী মেনু" : "Browse by Travel Intent"}
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label={isBn ? "মেনু বন্ধ করুন" : "Close navigation menu"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-[#F6B73C] hover:text-white hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Compact Pinned Top Shortcuts (Zero-Scroll High-Frequency Entry Points) */}
                <div className="px-3.5 pt-3 pb-2.5 border-b border-white/8 grid grid-cols-2 gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      navigateTo("/");
                      setMobileMenuOpen(false);
                    }}
                    className={`min-h-[44px] px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] ${
                      section === "home"
                        ? "bg-[#F6B73C]/15 text-[#F6B73C] border border-[#F6B73C]/40"
                        : "bg-white/5 text-white/90 hover:bg-white/10 border border-white/8"
                    }`}
                  >
                    <span>{t.navHome}</span>
                    <ArrowRight size={12} className="opacity-70 shrink-0" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigateTo("/umrah");
                      setMobileMenuOpen(false);
                    }}
                    className={`min-h-[44px] px-3 py-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] ${
                      section === "umrah"
                        ? "bg-[#F6B73C] text-brand-navy"
                        : "bg-[#F6B73C]/15 text-[#F6B73C] hover:bg-[#F6B73C]/25 border border-[#F6B73C]/35"
                    }`}
                  >
                    <span className="truncate">🕋 {t.navUmrah}</span>
                    <ArrowRight size={12} className="shrink-0" />
                  </button>
                </div>

                {/* Collapsible User-Intent Accordion Navigation */}
                <nav
                  aria-label={isBn ? "প্রধান মোবাইল নেভিগেশন" : "Primary mobile navigation by intent"}
                  className="flex-1 px-3.5 py-2.5 overflow-y-auto space-y-2"
                >
                  {([
                    {
                      id: "booking" as const,
                      title: isBn ? "ফ্লাইট, হোটেল ও ভিসা বুকিং" : "Flights, Hotels & Visas",
                      subtitle: isBn
                        ? "ঢাকা রুট · হালাল হোটেল · ই-ভিসা চেকলিস্ট"
                        : "Dhaka fares · Hotel zones · Visa rules",
                      isActiveGroup: ["flights", "hotels", "visa", "umrah"].includes(section),
                      primaryLinks: [
                        {
                          id: "flights",
                          label: t.navFlights,
                          meta: isBn ? "ঢাকা থেকে ৬টি প্রধান রুট" : "Compare Dhaka (DAC) routes",
                          path: "/flights",
                        },
                        {
                          id: "hotels",
                          label: t.navHotels,
                          meta: isBn ? "হালাল ও ফ্যামিলি জোন গাইড" : "Family & Halal hotel areas",
                          path: "/hotels",
                        },
                        {
                          id: "visa",
                          label: t.navVisa,
                          meta: isBn ? "অন-অ্যারাইভাল ও ই-ভিসা ধাপ" : "Free VOA & e-Visa checklists",
                          path: "/visa",
                        },
                        {
                          id: "umrah",
                          label: isBn ? "ওমরাহ ও হজ প্ল্যানার ২০২৬" : "Umrah & Hajj 2026 Hub",
                          meta: isBn ? "Nusuk অ্যাপ ও DIY খরচ" : "Nusuk permit & DIY BDT cost",
                          path: "/umrah",
                        },
                      ],
                      quickChips: [
                        { label: isBn ? "✈️ কাঠমান্ডু ফ্লাইট" : "✈️ Dhaka → KTM", path: "/flights/dhaka-kathmandu" },
                        { label: isBn ? "✈️ ব্যাংকক ফ্লাইট" : "✈️ Dhaka → BKK", path: "/flights/dhaka-bangkok" },
                        { label: isBn ? "🛂 থাইল্যান্ড ই-ভিসা" : "🛂 Thai e-Visa", path: "/visa/thailand-visa" },
                        { label: isBn ? "🛂 মালয়েশিয়া ভিসা" : "🛂 Malaysia eVisa", path: "/visa/malaysia-visa" },
                      ],
                    },
                    {
                      id: "destinations" as const,
                      title: isBn ? "গন্তব্য গাইড ও অ্যাক্টিভিটি পাস" : "Destinations & Attraction Passes",
                      subtitle: isBn
                        ? "এশিয়া গাইড · ইউরোপ, UK ও USA পাস"
                        : "6 Asian hubs · Europe, UK & USA passes",
                      isActiveGroup: ["destinations", "experiences"].includes(section),
                      primaryLinks: [
                        {
                          id: "destinations",
                          label: t.navDestinations,
                          meta: isBn ? "নেপাল, থাইল্যান্ড, মালয়েশিয়া ও দুবাই" : "Full country itineraries & tips",
                          path: "/destinations",
                        },
                        {
                          id: "experiences",
                          label: t.navExperiences,
                          meta: isBn ? "Tiqets ও Klook স্কিপ-দ্য-লাইন পাস" : "Tiqets & Klook skip-the-line passes",
                          path: "/experiences",
                        },
                      ],
                      quickChips: [
                        { label: isBn ? "🇳🇵 নেপাল গাইড" : "🇳🇵 Nepal Guide", path: "/destinations/nepal-guide" },
                        { label: isBn ? "🇹🇭 থাইল্যান্ড" : "🇹🇭 Thailand", path: "/destinations/thailand-guide" },
                        { label: isBn ? "🇲🇾 মালয়েশিয়া" : "🇲🇾 Malaysia", path: "/destinations/malaysia-guide" },
                        { label: isBn ? "🇸🇬 সিঙ্গাপুর" : "🇸🇬 Singapore", path: "/destinations/singapore-guide" },
                        { label: isBn ? "🇲🇻 মালদ্বীপ" : "🇲🇻 Maldives", path: "/destinations/maldives-guide" },
                        { label: isBn ? "🇦🇪 দুবাই ও UAE" : "🇦🇪 Dubai / UAE", path: "/destinations/dubai-guide" },
                        { label: isBn ? "🇫🇷🇬🇧 ইউরোপ ও UK" : "🇫🇷🇬🇧 Europe & UK", path: "/experiences?region=west" },
                        { label: isBn ? "🎟️ এশিয়া Klook ডিল" : "🎟️ Asia Passes", path: "/experiences?region=asia" },
                      ],
                    },
                    {
                      id: "research" as const,
                      title: isBn ? "ট্রাভেল ব্লগ ও BDT বাজেট হিসাব" : "Blog Guides & BDT Trip Budgets",
                      subtitle: isBn
                        ? `${localizedBlogs.length}টি বিস্তারিত গাইড · ৫ দিনের খরচ`
                        : `${localizedBlogs.length} in-depth guides · 5-day BDT sheets`,
                      isActiveGroup: ["blog", "costs"].includes(section),
                      primaryLinks: [
                        {
                          id: "blog",
                          label: isBn ? `সবগুলো ট্রাভেল ব্লগ (${localizedBlogs.length})` : `All Travel Blog Guides (${localizedBlogs.length})`,
                          meta: isBn ? "ওমরাহ, কার্ড এন্ডোর্সমেন্ট ও ইমিগ্রেশন" : "Umrah, Card Endorsement & Visas",
                          path: "/blog",
                        },
                        {
                          id: "costs",
                          label: t.navCosts,
                          meta: isBn ? "বাজেট, মিড-রেঞ্জ ও ফ্যামিলি খরচ" : "3-tier BDT cost matrices by country",
                          path: "/costs",
                        },
                      ],
                      quickChips: [
                        {
                          label: isBn ? "💳 কার্ড এন্ডোর্সমেন্ট" : "💳 Card Endorsement",
                          path: "/blog/dual-currency-card-endorsement-bangladesh",
                        },
                        {
                          label: isBn ? "🛂 ঢাকা ইমিগ্রেশন" : "🛂 DAC Immigration",
                          path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go",
                        },
                        {
                          label: isBn ? "🏥 ব্যাংকক মেডিকেল" : "🏥 Medical Visa",
                          path: "/blog/bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh",
                        },
                        {
                          label: isBn ? "📘 ই-পাসপোর্ট গাইড" : "📘 e-Passport Guide",
                          path: "/blog/bangladesh-epassport-application-renewal-64-districts-fee-guide",
                        },
                      ],
                    },
                    {
                      id: "tools" as const,
                      title: isBn ? "এয়ারপোর্ট প্রস্তুতি, টুলস ও সাপোর্ট" : "Airport Readiness, Tools & Help",
                      subtitle: isBn
                        ? "কারেন্সি কনভার্টার · দূতাবাস · €600 ক্লেইম"
                        : "FX tool · DAC checklist · €600 claim",
                      isActiveGroup: ["tools", "sitemap", "contact"].includes(section),
                      primaryLinks: [
                        {
                          id: "tools",
                          label: isBn ? "কারেন্সি কনভার্টার ও প্যাকিং টুলস" : "BDT Currency & Packing Tools",
                          meta: isBn ? "লাইভ BDT রেট ও ভিসা ক্যালকুলেটর" : "Live BDT FX & readiness tools",
                          path: "/tools",
                        },
                        {
                          id: "sitemap",
                          label: isBn ? "ঢাকা এয়ারপোর্ট (DAC) ও দূতাবাস হাব" : "Pre-Departure & Embassy Hub",
                          meta: isBn ? "লাগেজ নিয়ম, জমজম ও জরুরি নাম্বার" : "Baggage rules, Zamzam & embassies",
                          path: "/pre-departure",
                        },
                        {
                          id: "airhelp",
                          label: isBn ? "ফ্লাইট বিলম্ব ক্ষতিপূরণ (€600)" : "Flight Delay Claim (€600 / AirHelp)",
                          meta: isBn ? "প্রোমো কোড AHTPO11 · ৭৮,০০০ টাকা পর্যন্ত" : "Code AHTPO11 · Up to BDT 78k payout",
                          path: "/tools?tab=airhelp",
                        },
                        {
                          id: "contact",
                          label: t.navContact,
                          meta: isBn ? "কার্ড ছাড়াই বিকাশ/ব্যাংকে BDT পেমেন্ট" : "Book via bKash, Nagad or Bank BDT",
                          path: "/contact",
                        },
                      ],
                      quickChips: [],
                    },
                  ]).map((group) => {
                    const isExpanded = expandedDrawerGroup === group.id;
                    return (
                      <div
                        key={group.id}
                        className={`rounded-2xl border transition-colors ${
                          isExpanded
                            ? "bg-white/[0.05] border-white/15"
                            : group.isActiveGroup
                            ? "bg-white/[0.03] border-[#F6B73C]/35"
                            : "bg-white/[0.02] border-white/8"
                        }`}
                      >
                        {/* Accordion Trigger Button */}
                        <button
                          type="button"
                          id={`drawer-trigger-${group.id}`}
                          aria-expanded={isExpanded}
                          aria-controls={`drawer-panel-${group.id}`}
                          onClick={() =>
                            setExpandedDrawerGroup((prev) => (prev === group.id ? null : group.id))
                          }
                          className="w-full min-h-[52px] px-3.5 py-2.5 text-left flex items-center justify-between gap-2 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[13.5px] font-semibold leading-snug truncate ${
                                  group.isActiveGroup || isExpanded ? "text-[#F6B73C]" : "text-white"
                                }`}
                              >
                                {group.title}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400 block truncate mt-0.5">
                              {group.subtitle}
                            </span>
                          </div>
                          <ChevronDown
                            size={16}
                            className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-[#F6B73C]" : ""
                            }`}
                          />
                        </button>

                        {/* Collapsible Sub-Menu Panel */}
                        {isExpanded && (
                          <div
                            id={`drawer-panel-${group.id}`}
                            role="region"
                            aria-labelledby={`drawer-trigger-${group.id}`}
                            className="px-2.5 pb-2.5 pt-1 border-t border-white/8 space-y-1.5"
                          >
                            <div className="space-y-1">
                              {group.primaryLinks.map((link) => {
                                const isCurrent = section === link.id;
                                return (
                                  <button
                                    key={link.path}
                                    type="button"
                                    onClick={() => {
                                      navigateTo(link.path);
                                      setMobileMenuOpen(false);
                                    }}
                                    className={`w-full min-h-[44px] px-3 py-2 rounded-xl text-left flex items-center justify-between gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C] ${
                                      isCurrent
                                        ? "bg-[#F6B73C]/15 text-[#F6B73C]"
                                        : "hover:bg-white/8 text-white/90"
                                    }`}
                                  >
                                    <div className="min-w-0">
                                      <div className="text-xs font-semibold truncate">{link.label}</div>
                                      <div className="text-[11px] text-slate-400 truncate">{link.meta}</div>
                                    </div>
                                    <ArrowRight
                                      size={12}
                                      className={isCurrent ? "text-[#F6B73C] shrink-0" : "text-slate-500 shrink-0"}
                                    />
                                  </button>
                                );
                              })}
                            </div>

                            {group.quickChips.length > 0 && (
                              <div className="pt-1.5 border-t border-white/6">
                                <div className="grid grid-cols-2 gap-1.5">
                                  {group.quickChips.map((chip) => (
                                    <button
                                      key={chip.path}
                                      type="button"
                                      onClick={() => {
                                        navigateTo(chip.path);
                                        setMobileMenuOpen(false);
                                      }}
                                      className="min-h-[38px] px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-white/10 border border-white/8 text-left text-[11px] font-medium text-slate-200 hover:text-[#F6B73C] truncate transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6B73C]"
                                    >
                                      {chip.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>

                {/* Drawer CTA Footer (Compact to preserve vertical viewport budget) */}
                <div className="p-4 border-t border-white/10 bg-brand-navy space-y-2.5 shrink-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/70 font-medium">Language / ভাষা:</span>
                    <LanguageSwitcher lang={lang} onToggle={handleLangToggle} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20need%20travel%20assistance%21"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[42px] bg-brand-emerald text-white font-bold text-xs px-3 rounded-xl flex items-center justify-center gap-1.5 shadow transition-colors"
                    >
                      <span>💬 WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        navigateTo("/destinations");
                        setMobileMenuOpen(false);
                      }}
                      className="min-h-[42px] bg-[#F6B73C] text-brand-navy hover:bg-[#D4941A] font-bold text-xs px-3 rounded-xl shadow-md text-center transition-colors cursor-pointer"
                    >
                      {t.startTripCta}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>

      </div>

      {/* ⚡ ACTIVE TEMPLATE RENDER */}
      {section === "home" && (
        <div className="w-full">
          {/* 🟦 SECTION 1: TOP SECTION (ABOVE THE FOLD) — PRIMARY CONVERSION ZONE */}
          <div
            className="hero-bg relative overflow-hidden min-h-[500px] lg:min-h-[560px] flex items-center p-6 md:p-12 lg:p-16 select-none border-b border-slate-800/80 bg-cover bg-center"
          >
            <img
              {...getResponsiveImageProps(heroBgImage, "100vw")}
              alt=""
              aria-hidden={true}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
            />
            <div
              aria-hidden={true}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(8, 17, 32, 0.85) 0%, rgba(11, 23, 44, 0.8) 35%, rgba(15, 30, 56, 0.75) 65%, rgba(21, 38, 68, 0.85) 100%)",
              }}
            />

            {/* Bottom Fade Gradient Overlay - Removed to avoid white overlay */}

            {/* Animated SVG Route Map Overlay */}
            <svg className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10 opacity-40" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
              {/* Flight route paths starting from Dhaka (Dhaka is at 600, 350 in the middle) */}
              
              {/* Dhaka to Kathmandu */}
              <path d="M 600,350 Q 560,220 560,90" fill="none" stroke="#F6B73C" strokeWidth="2.5" className="route-line" style={{ animationDelay: '0s' }} />
              {/* Dhaka to Bangkok */}
              <path d="M 600,350 Q 840,305 1080,260" fill="none" stroke="#F6B73C" strokeWidth="2.5" className="route-line" style={{ animationDelay: '-4s' }} />
              {/* Dhaka to Kuala Lumpur */}
              <path d="M 600,350 Q 810,445 1020,540" fill="none" stroke="#F6B73C" strokeWidth="2.5" className="route-line" style={{ animationDelay: '-8s' }} />
              {/* Dhaka to Maldives */}
              <path d="M 600,350 Q 425,455 250,560" fill="none" stroke="#F6B73C" strokeWidth="2.5" className="route-line" style={{ animationDelay: '-12s' }} />
              {/* Dhaka to Dubai */}
              <path d="M 600,350 Q 360,295 120,240" fill="none" stroke="#F6B73C" strokeWidth="2.5" className="route-line" style={{ animationDelay: '-16s' }} />

              {/* Dotted static reference lines under routes for depth */}
              <path d="M 600,350 Q 560,220 560,90" fill="none" stroke="#F6B73C" strokeWidth="1.5" strokeOpacity="0.20" strokeDasharray="4 4" />
              <path d="M 600,350 Q 840,305 1080,260" fill="none" stroke="#F6B73C" strokeWidth="1.5" strokeOpacity="0.20" strokeDasharray="4 4" />
              <path d="M 600,350 Q 810,445 1020,540" fill="none" stroke="#F6B73C" strokeWidth="1.5" strokeOpacity="0.20" strokeDasharray="4 4" />
              <path d="M 600,350 Q 425,455 250,560" fill="none" stroke="#F6B73C" strokeWidth="1.5" strokeOpacity="0.20" strokeDasharray="4 4" />
              <path d="M 600,350 Q 360,295 120,240" fill="none" stroke="#F6B73C" strokeWidth="1.5" strokeOpacity="0.20" strokeDasharray="4 4" />

              {/* Destination Dots with Pulse animation */}
              {/* Dhaka (Hub -> Large Pulsating Gold Dot in the middle) */}
              <circle cx="600" cy="350" r="7" fill="#F6B73C" className="dest-dot" style={{ animationDelay: '0s' }} />
              <circle cx="600" cy="350" r="14" fill="none" stroke="#F6B73C" strokeWidth="1.5" strokeOpacity="0.5" className="animate-ping" style={{ transformOrigin: '600px 350px' }} />
              <text x="600" y="380" fill="#F6B73C" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle" opacity="0.95" letterSpacing="1">DHAKA (DAC)</text>

              {/* Kathmandu */}
              <circle cx="560" cy="90" r="4.5" fill="#FFFFFF" stroke="#F6B73C" strokeWidth="1.5" className="dest-dot" style={{ animationDelay: '0.8s' }} />
              <text x="560" y="72" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.8">KATHMANDU (KTM)</text>

              {/* Bangkok */}
              <circle cx="1080" cy="260" r="4.5" fill="#FFFFFF" stroke="#F6B73C" strokeWidth="1.5" className="dest-dot" style={{ animationDelay: '1.6s' }} />
              <text x="1080" y="242" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.8">BANGKOK (BKK)</text>

              {/* Kuala Lumpur */}
              <circle cx="1020" cy="540" r="4.5" fill="#FFFFFF" stroke="#F6B73C" strokeWidth="1.5" className="dest-dot" style={{ animationDelay: '2.4s' }} />
              <text x="1020" y="522" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.8">KUALA LUMPUR (KUL)</text>

              {/* Maldives */}
              <circle cx="250" cy="560" r="4.5" fill="#FFFFFF" stroke="#F6B73C" strokeWidth="1.5" className="dest-dot" style={{ animationDelay: '3.2s' }} />
              <text x="250" y="542" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.8">MALDIVES (MLE)</text>

              {/* Dubai */}
              <circle cx="120" cy="240" r="4.5" fill="#FFFFFF" stroke="#F6B73C" strokeWidth="1.5" className="dest-dot" style={{ animationDelay: '1.2s' }} />
              <text x="120" y="222" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.8">DUBAI (DXB)</text>
            </svg>

            {/* Master Left-Aligned Stack aligned perfectly with max-w-7xl content */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col items-center sm:items-start justify-center space-y-6">
              
              <span className="hero-badge font-sans tracking-widest uppercase inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 border leading-none bg-[#F6B73C]/15 border-[#F6B73C]/25 text-[#F6B73C] rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C] animate-ping"></span>
                {isBn
                  ? "বাংলাদেশি ভ্রমণকারীদের জন্য ট্রাভেল প্ল্যানিং"
                  : "Travel planning for Bangladeshi travelers"}
              </span>
              
              <h1 className="hero-h1 font-sans text-[clamp(2.3rem,6vw,4.5rem)] font-[900] leading-[1.1] tracking-tight text-white max-w-4xl drop-shadow text-center sm:text-left">
                {isBn ? (
                  <>
                    বাংলাদেশ থেকে ভ্রমণ <br />
                    <span className="text-[#F6B73C]">পরিকল্পনা করুন স্মার্টভাবে</span>
                  </>
                ) : (
                  <>
                    Plan Your Trip <br />
                    <span className="text-[#F6B73C]">From Bangladesh</span>
                  </>
                )}
              </h1>
              
              <p className="hero-subtitle text-white/80 text-[1.1rem] sm:text-[1.2rem] leading-[1.60] max-w-2xl font-sans text-center sm:text-left">
                {isBn
                  ? "বাংলাদেশি ভ্রমণকারীদের জন্য তৈরি Flight, Hotel, Visa চেকলিস্ট, Hajj ও Umrah প্রস্তুতি এবং BDT বাজেট গাইড—সবকিছু এক জায়গায়।"
                  : "Flights, hotels, visas, and destination guides — crafted specifically for Bangladeshi travelers. Your travel intelligence for the world."}
              </p>

              {/* Pill List of Expert Features */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-4">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/95 text-xs sm:text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C]" />
                  {isBn ? "যাচাইকৃত Visa ও Umrah গাইড" : "Expert Visa Guides"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/95 text-xs sm:text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C]" />
                  {isBn ? "BDT বাজেট হিসাব" : "BDT Pricing"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/95 text-xs sm:text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C]" />
                  {isBn ? "Halal খাবার ও হোটেল জোন" : "Halal-Friendly Picks"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/95 text-xs sm:text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C]" />
                  {isBn ? "Dhaka (DAC) ফ্লাইট রুট" : "Dhaka Routes Focus"}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Bar Container (Full Width) */}
          <div id="hero-stats-bar" className="stats-bar bg-brand-navy py-7 px-4 shadow-lg border-t border-b border-[#F6B73C]/20">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-around gap-6 md:gap-4 md:divide-x md:divide-white/10 text-center select-none">
              <div className="flex-1 w-full space-y-1">
                <div className="text-[#F6B73C] text-3xl font-extrabold leading-none">50+</div>
                <div className="text-white/75 text-[12px] uppercase tracking-widest font-semibold font-sans">
                  {isBn ? "ট্রাভেল ও Umrah গাইড" : "Travel Guides"}
                </div>
              </div>
              <div className="flex-1 w-full space-y-1 md:pl-4">
                <div className="text-[#F6B73C] text-3xl font-extrabold leading-none">15+</div>
                <div className="text-white/75 text-[12px] uppercase tracking-widest font-semibold font-sans">
                  {isBn ? "জনপ্রিয় গন্তব্য" : "Destinations Covered"}
                </div>
              </div>
              <div className="flex-1 w-full space-y-1 md:pl-4">
                <div className="text-[#F6B73C] text-3xl font-extrabold leading-none">100%</div>
                <div className="text-white/75 text-[12px] uppercase tracking-widest font-semibold font-sans">
                  {isBn ? "বাংলাদেশি পাসপোর্ট ফোকাস" : "BD Traveler Focus"}
                </div>
              </div>
              <div className="flex-1 w-full space-y-1 md:pl-4">
                <div className="text-[#F6B73C] text-3xl font-extrabold leading-none">Free</div>
                <div className="text-white/75 text-[12px] uppercase tracking-widest font-semibold font-sans">
                  {isBn ? "ফ্রি ট্রাভেল ইন্টেলিজেন্স" : "Travel Intelligence"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ⚡ ACTIVE TEMPLATE RENDER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* -------------------------------------------------------------
            🏠 VIEW 1: HOME PAGE (CONVERSION HUB)
        ------------------------------------------------------------- */}
        {section === "home" && (
          <div className="space-y-16">

            {/* 🟦 SECTION 1.5: FRESH NEW SEARCH SECTOR - relocated from hero */}
            <div id="live-flight-search" className="scroll-mt-12 space-y-6">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-widest bg-slate-200 px-3 py-1 rounded-full">
                  {t.searchSectionBadge}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {t.searchSectionTitle}
                </h2>
                <p className="text-xs text-slate-500 max-w-xl mx-auto">
                  {t.searchSectionSubtitle}
                </p>
              </div>

              <div className="bg-[#1E293B] border border-slate-700/50 rounded-2xl p-2 sm:p-5 shadow-2xl w-full">
                <div className="flex items-center justify-between mb-3 px-2">
                  <span className="text-[10px] font-mono font-bold text-[#F6B73C] uppercase tracking-wider">{t.liveSearchBoxHeader}</span>
                  <button
                    type="button"
                    onClick={() => openPriceAlert("Bangkok (BKK)")}
                    className="inline-flex items-center gap-1.5 text-xs text-brand-ivory hover:text-white bg-brand-emerald/15 hover:bg-brand-emerald/25 px-2.5 py-1 rounded-md border border-brand-emerald/30 font-medium transition-colors cursor-pointer"
                  >
                    <span>🔔</span>
                    <span className="hidden sm:inline">{t.setPriceAlertBtn}</span>
                    <span className="sm:hidden">Price Alert</span>
                  </button>
                </div>
                <div className="text-slate-900">
                  <TravelpayoutsWidget />
                </div>
              </div>

              {/* Price Alert Promotion Banner */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:px-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-brand-emerald flex items-center justify-center font-bold text-sm shrink-0 border border-amber-200">
                    🔔
                  </div>
                  <div className="text-xs text-slate-650 leading-snug">
                    <span className="font-bold text-slate-900 block sm:inline mr-1">
                      {lang === "bn" ? "ভাড়া কমার নোটিফিকেশন:" : "Looking for lowest fare?"}
                    </span>
                    <span>{t.priceAlertBanner}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openPriceAlert()}
                  className="shrink-0 w-full sm:w-auto bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer text-center"
                >
                  {t.setPriceAlertBtn}
                </button>
              </div>
            </div>

            {/* 🟦 SECTION 2: QUICK DESTINATION ENTRY */}
            <div id="destinations-section" className="scroll-mt-12 space-y-6">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-widest bg-slate-200 px-3 py-1 rounded-full">{t.destinationsBadge}</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{t.destinationsTitle}</h2>
                <p className="text-xs text-slate-500 max-w-xl mx-auto">{t.destinationsSubtitle}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    city: "Kathmandu",
                    country: "Nepal",
                    tag: isBn
                      ? "বাংলাদেশিদের জন্য ফ্রি Visa on Arrival। Thamel-এ BDT 1,500/রাত থেকে হোটেল। প্রথম বিদেশ ভ্রমণের জন্য সেরা।"
                      : "Free visa on arrival for Bangladeshis. Budget hotels in Thamel from BDT 1,500/night. A great first international trip.",
                    code: "nepal-guide",
                    img: "🇳🇵",
                    path: "/destinations/nepal-guide",
                    bgImg: nepalDestImg,
                    alt: "Boudhanath Stupa in Kathmandu at sunset.",
                  },
                  {
                    city: "Bangkok",
                    country: "Thailand",
                    tag: isBn
                      ? "অনলাইন Thailand e-Visa (৫–১০ দিনে অনুমোদন)। হালাল স্ট্রিট ফুড, Pratunam শপিং, দ্বীপ ও মেডিকেল চেকআপ।"
                      : "Online e-Visa — approved in 5–10 days. Street food, Pratunam shopping, islands, and golden temples.",
                    code: "thailand-guide",
                    img: "🇹🇭",
                    path: "/destinations/thailand-guide",
                    bgImg: bangkokDestImg,
                    alt: "Wat Arun on Bangkok’s Chao Phraya River at sunset.",
                  },
                  {
                    city: "Kuala Lumpur",
                    country: "Malaysia",
                    tag: isBn
                      ? "সহজ অনলাইন Malaysia e-Visa। সাশ্রয়ী KLCC অ্যাপার্টমেন্ট, ১০০% Halal খাবার এবং উন্নত মেট্রো যাতায়াত।"
                      : "Simple online eVisa. Affordable KLCC suites, 100% halal dining, and easy transit across Kuala Lumpur.",
                    code: "malaysia-guide",
                    img: "🇲🇾",
                    path: "/destinations/malaysia-guide",
                    bgImg: klDestImg,
                    alt: "Petronas Twin Towers in the Kuala Lumpur skyline at twilight.",
                  },
                  {
                    city: "Singapore",
                    country: "Singapore",
                    tag: isBn
                      ? "ঢাকা থেকে ৪ ঘণ্টা ১৫ মিনিটের ডিরেক্ট ফ্লাইট। Marina Bay, Sentosa, Gardens by the Bay ও ২৪ ঘণ্টা Mustafa শপিং।"
                      : "4h 15m direct from Dhaka. Marina Bay, Sentosa, Gardens by the Bay, and 24-hour Mustafa shopping in Little India.",
                    code: "singapore-guide",
                    img: "🇸🇬",
                    path: "/destinations/singapore-guide",
                    bgImg: singaporeDestImg,
                    alt: "Gardens by the Bay Supertrees against Singapore’s waterfront skyline.",
                  },
                  {
                    city: "Malé & Maafushi",
                    country: "Maldives",
                    tag: isBn
                      ? "৩০ দিনের ফ্রি Visa on Arrival! Maafushi লোকাল আইল্যান্ডে BDT 6,500/রাত থেকে হোটেল এবং $30 স্নরকেলিং ট্যুর।"
                      : "Free 30-day Visa on Arrival! Stay on Maafushi local island from BDT 6,500/night with $30 coral & sandbank tours.",
                    code: "maldives-guide",
                    img: "🇲🇻",
                    path: "/destinations/maldives-guide",
                    bgImg: maldivesDestImg,
                    alt: "Overwater villas above a turquoise lagoon in the Maldives.",
                  },
                  {
                    city: "Dubai",
                    country: "UAE",
                    tag: isBn
                      ? "৩–৫ দিনে UAE e-Visa। Burj Khalifa, Desert Safari ও শপিং — ঢাকা থেকে ৪ ঘণ্টা ৪৫ মিনিটের সরাসরি ফ্লাইট।"
                      : "eVisa in 3–5 days. Burj Khalifa, desert safari, duty-free shopping — 4h 45m direct from Dhaka.",
                    code: "dubai-guide",
                    img: "🇦🇪",
                    path: "/destinations/dubai-guide",
                    bgImg: dubaiDestImg,
                    alt: "Burj Khalifa rising above Dubai’s skyline at sunset.",
                  },
                ].map((dest, idx) => (
                  <div 
                    key={idx}
                    onClick={() => navigateTo(dest.path)}
                    className="group relative rounded-2xl overflow-hidden bg-slate-950 shadow-lg hover:shadow-2xl transition-all duration-350 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-end aspect-[4/5] sm:aspect-square md:aspect-[4/5] border border-slate-800/10 hover:border-[#F6B73C]/20"
                  >
                    {/* Background Travel Image */}
                    <img
                      {...getResponsiveImageProps(
                        dest.bgImg,
                        "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw",
                      )}
                      alt={dest.alt}
                      loading="lazy"
                      fetchPriority="low"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                    />

                    {/* Dark gradient shadow overlay for extreme readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />

                    {/* Glassmorphic description layout */}
                    <div className="relative z-20 p-4 space-y-2.5 bg-slate-950/65 backdrop-blur-md border-t border-white/10 m-3 rounded-xl shadow-lg">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm px-1.5 py-0.5 bg-white/15 rounded backdrop-blur-sm font-sans shrink-0">{dest.img}</span>
                        <h4 className="font-sans font-bold text-sm text-white tracking-tight">{dest.city}, {dest.country}</h4>
                      </div>
                      
                      <p className="text-[10px] text-slate-250 font-normal leading-relaxed line-clamp-3">
                        {dest.tag}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-[10px] font-mono font-bold text-[#F6B73C] flex items-center gap-1 group-hover:text-amber-300 transition-colors">
                          {isBn ? "ট্রিপ প্ল্যান দেখুন" : "Plan This Trip"}{" "}
                          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🟦 SECTION 3: “PLAN YOUR TRIP” PATHWAY */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  {isBn ? "🎯 ঢাকা থেকে আপনার পরবর্তী সফর সাজান" : "🎯 Plan your next trip from Dhaka"}
                </span>
                <h3 className="font-serif text-2xl sm:text-3.5xl font-black text-brand-navy tracking-tight">
                  {isBn ? "বুকিং করার আগে যা যা জানা প্রয়োজন" : "Everything You Need Before You Book"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {isBn
                    ? "কোথা থেকে শুরু করবেন ভাবছেন? প্রথমে ফ্লাইটের ভাড়া যাচাই করুন, এরপর পছন্দের এলাকায় হোটেল তুলনা করুন এবং আমাদের ভিসা গাইড দেখে প্রয়োজনীয় ডকুমেন্টগুলো গুছিয়ে নিন।"
                    : "Not sure where to start? Check flight prices first, then compare hotels in the area you want to stay, and use our visa guide to know exactly what documents to prepare. No travel agent needed."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
                <button 
                  onClick={() => navigateTo("/flights")}
                  className="bg-brand-navy text-white hover:bg-slate-800 font-bold text-xs py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isBn ? "সাশ্রয়ী Flight খুঁজুন →" : "Find Cheap Flights →"}
                </button>
                <button 
                  onClick={() => navigateTo("/hotels")}
                  className="bg-brand-navy text-white hover:bg-slate-800 font-bold text-xs py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isBn ? "বাজেট Hotel খুঁজুন →" : "Search Budget Hotels →"}
                </button>
                <button 
                  onClick={() => navigateTo("/blog")}
                  className="bg-[#F6B73C] text-brand-navy hover:bg-[#ffc654] font-black text-xs py-3.5 px-6 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isBn ? "সব ট্রাভেল ব্লগ পড়ুন →" : "Browse Travel Guides →"}
                </button>
              </div>
            </div>

            {/* 🟦 SECTION 4: HOTEL SEARCH ENTRY */}
            <div className="relative rounded-3xl overflow-hidden bg-brand-navy text-white p-8 md:p-12 shadow-xl border border-slate-800">
              
              <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
                <span className="text-[10px] font-mono font-bold text-[#F6B73C] uppercase tracking-widest bg-[#F6B73C]/10 border border-[#F6B73C]/20 px-3 py-1 rounded-full">
                  {isBn ? "🏨 আপনার সফরের জন্য সঠিক হোটেল খুঁজুন" : "🏨 Find the right hotel for your trip"}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
                  {isBn
                    ? "Kathmandu, Bangkok, Kuala Lumpur ও Dubai-এর হোটেল ভাড়া তুলনা করুন"
                    : "Compare Hotels in Kathmandu, Bangkok, KL & Dubai"}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xl mx-auto">
                  {isBn
                    ? "শহর ও তারিখ দিয়ে আসল ভাড়া দেখুন। Thamel-এর বাজেট রুম কিংবা Pratunam-এর ফ্যামিলি স্যুট—সব অপশন তুলনা করে সরাসরি বুক করুন।"
                    : "Search by city and date to see real prices. Budget room in Thamel or a family suite in Pratunam — compare options and book directly."}
                </p>
              </div>

              {/* HOTEL WIDGET INTEGRATION: Visually distinct & secondary to flights widget */}
              <div className="w-full text-slate-900 bg-white rounded-2xl p-2 sm:p-4 shadow-xl">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-3 px-2">
                  {isBn ? "🏨 হোটেল সার্চ (Search Hotels)" : "🏨 Search Hotels"}
                </span>
                <TravelpayoutsCustomWidget initialTab="hotels" />
              </div>

              {/* Quick links to pre-filled hotel lookups */}
              <div className="text-center text-xs font-mono text-slate-400 mt-6 flex flex-wrap justify-center items-center gap-2">
                <span>{isBn ? "জনপ্রিয় ফ্যামিলি হোটেল জোন:" : "Top family-rated lodging selectors:"}</span>
                <button onClick={() => navigateTo("/hotels/kathmandu-hotels")} className="text-[#F6B73C] hover:underline">Thamel, Kathmandu 🇳🇵</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels/bangkok-hotels")} className="text-[#F6B73C] hover:underline">Pratunam, Bangkok 🇹🇭</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels/kuala-lumpur-hotels")} className="text-[#F6B73C] hover:underline">Bukit Bintang, KL 🇲🇾</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels/singapore-hotels")} className="text-[#F6B73C] hover:underline">Little India, Singapore 🇸🇬</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels/maldives-hotels")} className="text-[#F6B73C] hover:underline">Maafushi, Maldives 🇲🇻</button>
                <span>•</span>
                <button onClick={() => navigateTo("/hotels/dubai-hotels")} className="text-[#F6B73C] hover:underline">Deira, Dubai 🇦🇪</button>
              </div>
            </div>

            {/* 🟦 SECTION 4.25: UNIFIED TABBED TRAVEL ESSENTIALS HUB */}
            <TravelEssentials country="Thailand, Malaysia, Singapore, Maldives, Nepal & UAE" lang={lang} />

            {/* 🟦 INTERACTIVE TOOLS DESK PANEL (Aesthetic calculation tools) */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
              <div className="border-l-4 border-brand-navy pl-4">
                <h3 className="font-serif text-xl font-bold text-brand-navy">
                  {isBn ? "প্রয়োজনীয় ট্রাভেল টুলস (Handy Travel Tools)" : "Handy Travel Tools"}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {isBn
                    ? "বাংলাদেশি টাকা (BDT) কনভার্ট করুন, প্যাকিং চেকলিস্ট মিলিয়ে নিন এবং ট্রিপের মোট বাজেট হিসাব করুন।"
                    : "Quick tools to help you convert BDT, check what to pack, and estimate your trip budget."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. Currency Converter (Interactive) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-brand-navy font-mono uppercase tracking-widest block mb-2">
                      {isBn ? "💸 কারেন্সি কনভার্টার (BDT রেট)" : "💸 Currency Converter"}
                    </span>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-mono text-[10px] uppercase w-12">BDT (৳)</span>
                        <input 
                          type="number" 
                          value={currencyAmount}
                          onChange={(e) => setCurrencyAmount(Number(e.target.value))}
                          className="flex-grow bg-slate-50 border border-slate-200 rounded p-1 text-xs font-mono focus:outline-none"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-mono text-[10px] uppercase w-12">To</span>
                        <select 
                          value={currencyToOption}
                          onChange={(e) => setCurrencyToOption(e.target.value as any)}
                          className="flex-grow bg-slate-50 border border-slate-250 rounded p-1 text-xs font-mono focus:outline-none font-bold"
                        >
                          <option value="NPR">NPR (Nepal Rupee)</option>
                          <option value="THB">THB (Thai Baht)</option>
                          <option value="MYR">MYR (Malaysian Ringgit)</option>
                          <option value="SGD">SGD (Singapore Dollar)</option>
                          <option value="USD">USD (Maldives / Global)</option>
                          <option value="AED">AED (UAE Dirham)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-mono font-bold text-center bg-slate-50 py-1.5 rounded text-indigo-900">
                    ৳ {currencyAmount.toLocaleString()} BDT = &nbsp;
                    <span className="text-[#F6B73C]">
                      {currencyToOption === "NPR" ? (currencyAmount * 1.13).toFixed(2) :
                       currencyToOption === "THB" ? (currencyAmount * 0.30).toFixed(2) : 
                       currencyToOption === "MYR" ? (currencyAmount * 0.037).toFixed(2) :
                       currencyToOption === "SGD" ? (currencyAmount * 0.011).toFixed(2) :
                       currencyToOption === "USD" ? (currencyAmount * 0.0082).toFixed(2) :
                       (currencyAmount * 0.031).toFixed(2)} {currencyToOption}
                    </span>
                  </div>
                </div>

                {/* 2. Packing Checklist (Interactive checkboxes) */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-brand-navy font-mono uppercase tracking-widest block mb-1">
                      {isBn ? "🧳 ডকুমেন্ট ও প্যাকিং চেকলিস্ট" : "🧳 Packing Checklist"}
                    </span>
                    <p className="text-[10px] text-slate-400 mb-2">
                      {isBn ? "ফ্লাইটের আগে জরুরি ডকুমেন্টগুলো মিলিয়ে নিন:" : "Check requirements to keep track before your flight:"}
                    </p>
                    <div className="space-y-1.5 text-[11px] font-medium text-slate-700">
                      {packingItems.slice(0, 3).map((item) => (
                        <label key={item.id} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                          <input 
                            type="checkbox" 
                            checked={item.checked}
                            onChange={() => {
                              setPackingItems(prev => prev.map(p => p.id === item.id ? { ...p, checked: !p.checked } : p));
                            }}
                            className="rounded text-[#F6B73C] focus:ring-[#F6B73C]"
                          />
                          <span className={item.checked ? "line-through text-slate-400" : ""}>{item.text}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-[#F6B73C] block mt-2 text-right">
                    {isBn ? "ইমিগ্রেশন চেকলিস্ট" : "Interactive Outbound checklist"}
                  </span>
                </div>

                {/* 3. Budget Planner Tool */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-brand-navy font-mono uppercase tracking-widest block mb-2">
                      {isBn ? "📊 ৫ দিনের BDT বাজেট প্ল্যানার" : "📊 Fast Budget Planner"}
                    </span>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      {isBn
                        ? "৫ দিনের বিদেশ সফরে Flight, Hotel, খাবার ও লোকাল যাতায়াতে মোট কত টাকা (BDT) খরচ হবে তার বিস্তারিত হিসাব দেখুন।"
                        : "Get a rough estimate of what a 5-day trip costs — flights, hotel, food, and transport, all broken down in BDT."}
                    </p>
                  </div>
                  <button 
                    onClick={() => navigateTo("/costs")}
                    className="bg-brand-navy text-white hover:bg-slate-800 font-bold text-[10px] py-1.5 px-3 rounded-lg self-start mt-3"
                  >
                    {isBn ? "বাজেট ক্যালকুলেটর খুলুন" : "Open Budget Calculator"}
                  </button>
                </div>

              </div>
            </div>

            {/* 🟦 SECTION 4.5: TRUSTPILOT TESTIMONIALS */}
            <TrustpilotReviews />



            {/* 🟦 SECTION 6: TRUST + ENGAGEMENT */}
            <div className="bg-brand-navy text-white rounded-3xl p-8 border border-slate-800 text-center space-y-6 flex flex-col justify-center" style={{ minHeight: "220px" }}>
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-[#F6B73C] uppercase tracking-widest">
                  {isBn ? "কেন ভ্রমণকারীরা URAL ব্যবহার করেন" : "Why Travelers Use URAL"}
                </span>
                <h3 className="font-serif text-2xl font-black">
                  {isBn ? "সহজ, ফ্রি এবং বাংলাদেশিদের জন্য তৈরি" : "Simple, Free, and Built for Bangladesh"}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full text-left">
                <div className="space-y-1 p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                  <span className="text-[#F6B73C] font-semibold text-xs block uppercase tracking-wider font-mono">
                    {isBn ? "✈️ লাইভ Flight ভাড়া" : "✈️ Real Flight Prices"}
                  </span>
                  <p className="text-[11px] text-[#F6B73C] font-bold mt-1">
                    {isBn
                      ? "“ঢাকা থেকে সব প্রধান এয়ারলাইন্সের ভাড়া এক সাথে তুলনা করুন”"
                      : "“Compare prices from all major airlines flying from Dhaka”"}
                  </p>
                  <p className="text-[10px] text-slate-350 leading-relaxed">
                    {isBn
                      ? "Biman Bangladesh, Saudia, Emirates, AirAsia, US-Bangla ও Thai Airways সহ ঢাকা থেকে চলাচলকারী সব এয়ারলাইন্সের প্রতিদিনের আপডেট ভাড়া।"
                      : "Flight search covers Biman Bangladesh, Emirates, AirAsia, Thai Airways, and other airlines that fly out of Dhaka — updated daily."}
                  </p>
                </div>
                <div className="space-y-1 p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                  <span className="text-[#F6B73C] font-semibold text-xs block uppercase tracking-wider font-mono">
                    {isBn ? "⚡ দ্রুত ও সম্পূর্ণ ফ্রি" : "⚡ Fast and Free"}
                  </span>
                  <p className="text-[11px] text-[#F6B73C] font-bold mt-1">
                    {isBn ? "“কোনো রেজিস্ট্রেশন বা বাড়তি ফি নেই”" : "“No signup, no fees”"}
                  </p>
                  <p className="text-[10px] text-slate-350 leading-relaxed">
                    {isBn
                      ? "কোনো একাউন্ট খোলা ছাড়াই ফ্লাইট ও হোটেল সার্চ করুন। কোনো লুকানো চার্জ নেই—অথবা কার্ড না থাকলে WhatsApp-এ BDT দিয়ে বুক করুন।"
                      : "Search flights and hotels without creating an account. No hidden charges. Click through to book directly with the airline or hotel."}
                  </p>
                </div>
                <div className="space-y-1 p-4 bg-[#F6B73C]/10 rounded-xl border border-[#F6B73C]/30">
                  <span className="text-[#F6B73C] font-semibold text-xs block uppercase tracking-wider font-mono">
                    {isBn ? "🤝 বিশ্বস্ত আন্তর্জাতিক পার্টনার" : "🤝 Trusted Partners"}
                  </span>
                  <p className="text-[11px] text-[#F6B73C] font-bold mt-1">“Powered by Travelpayouts”</p>
                  <p className="text-[10px] text-slate-350 leading-relaxed font-sans">
                    {isBn
                      ? "আমাদের ফ্লাইট, এয়ারপোর্ট পিকআপ, ট্যুর, Travel eSIM ও গাড়ি ভাড়ার সেবাগুলো Travelpayouts, Aviasales, Welcome Pickups, Klook, Kiwitaxi, Airalo ও QEEQ-এর মাধ্যমে পরিচালিত।"
                      : "Flights, transfers, activities, eSIMs, and car rentals on this site are powered by Travelpayouts and its partner network — including Aviasales, Klook, Kiwitaxi, Airalo, and QEEQ."}
                  </p>
                </div>
              </div>
            </div>

            {/* 🟦 SECTION 7 / EMAIL ACTION SIGNUP */}
            <div
              className="w-screen relative left-1/2 -translate-x-1/2 border-t border-b border-slate-900/10 bg-cover bg-center select-none overflow-hidden"
            >
              <img
                {...getResponsiveImageProps(coxsBazarSunriseImg, "100vw")}
                alt=""
                aria-hidden={true}
                loading="lazy"
                fetchPriority="low"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                style={{ objectPosition: "center 40%" }}
              />
              <div
                aria-hidden={true}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(15, 30, 54, 0.5) 0%, rgba(11, 23, 44, 0.85) 65%, rgba(10, 15, 30, 0.98) 100%)",
                }}
              />

              <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20 flex flex-col justify-center items-center text-center space-y-8 relative z-10">
                
                {/* Visual Badge */}
                <span className="font-sans tracking-widest uppercase inline-flex items-center gap-1.5 text-[11px] font-bold px-4 py-1.5 border leading-none bg-[#F6B73C]/20 border-[#F6B73C]/35 text-[#F6B73C] rounded-full backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6B73C] animate-pulse"></span>
                  {isBn ? "🌅 বাংলাদেশ থেকে বিশ্বজুড়ে যাত্রা" : "🌅 Live from Cox's Bazar to the World"}
                </span>

                <div className="space-y-3 max-w-2xl">
                  <h3 className="font-serif text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                    {isBn ? (
                      <>
                        ঢাকা থেকে ফ্লাইটের ভাড়া কমলে <br className="sm:hidden" />
                        <span className="text-[#F6B73C]">সাথে সাথে এলার্ট পান</span>
                      </>
                    ) : (
                      <>
                        Get Flight Deal Alerts <br className="sm:hidden" />
                        <span className="text-[#F6B73C]">from Dhaka</span>
                      </>
                    )}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed max-w-xl mx-auto opacity-95">
                    {isBn ? (
                      <>
                        ঢাকা থেকে Maldives, Nepal, Bangkok, Kuala Lumpur, Jeddah বা Dubai-এর ফ্লাইটের ভাড়া কমলেই ইমেইলে{" "}
                        <span className="text-[#F6B73C] font-semibold">BDT Fare Alert</span> পেতে সাবস্ক্রাইব করুন।
                      </>
                    ) : (
                      <>
                        Sign up to get instant BDT notifications when flight prices from Dhaka drop below{" "}
                        <span className="text-[#F6B73C] font-semibold">BDT 20,000</span> to Maldives, Nepal, Bangkok, KL, or Dubai.
                      </>
                    )}
                  </p>
                </div>

                <div className="w-full max-w-md bg-slate-950/40 p-1 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
                  {emailSubscribed ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm px-6 py-4 rounded-xl font-mono text-center">
                      {isBn ? (
                        <>
                          ✔ সাবস্ক্রিপশন সম্পন্ন হয়েছে! ঢাকা থেকে ফ্লাইটের ভাড়া কমলে আপনার <b className="text-white">{userEmail}</b> ইমেইলে জানিয়ে দেওয়া হবে।
                        </>
                      ) : (
                        <>
                          ✔ You're subscribed! We'll email you at <b className="text-white">{userEmail}</b> when Dhaka flight prices drop. Happy travels!
                        </>
                      )}
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (userEmail.trim()) {
                          setEmailSubscribed(true);
                        }
                      }}
                      className="flex flex-col sm:flex-row items-center gap-2"
                    >
                      <input 
                        type="email" 
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder={isBn ? "আপনার ইমেইল এড্রেস লিখুন" : "Enter your personal email"}
                        required
                        className="w-full sm:flex-grow bg-slate-900/60 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#F6B73C] focus:ring-1 focus:ring-[#F6B73C] transition-all font-sans text-center sm:text-left"
                      />
                      <button 
                        type="submit"
                        className="w-full sm:w-auto bg-[#F6B73C] text-brand-navy hover:bg-[#ffc240] active:bg-[#e2a222] font-black text-sm px-8 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0 shadow-lg shadow-[#F6B73C]/20"
                      >
                        {isBn ? "এলার্ট চালু করুন" : "Subscribe Alerts"}
                      </button>
                    </form>
                  )}
                </div>

                <div className="flex items-center gap-4 text-[11px] font-mono text-slate-300 opacity-90">
                  <span className="flex items-center gap-1">🔒 Spam-Free</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                  <span className="flex items-center gap-1">❌ 1-Click Unsubscribe</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                  <span className="flex items-center gap-1">🇧🇩 BDT Pricing Alerts</span>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            ✈️ VIEW 2: FLIGHTS INDEX & LANDING PAGES
        ------------------------------------------------------------- */}
        {section === "flights" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Router for cities */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">
                {isBn ? "ফ্লাইট রুট নির্বাচন করুন:" : "SELECT FLIGHT ROUTE:"}
              </span>
              <div className="space-y-2">
                {localizedFlights.map((route) => (
                  <button
                    key={route.id}
                    id={`btn-route-select-${route.id}`}
                    onClick={() => navigateTo(`/flights/${route.id}`)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      parameterId === route.id
                        ? "bg-brand-navy text-white border-brand-navy shadow-md"
                        : "bg-white text-slate-705 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span>{route.from} ✈️ {route.to}</span>
                    <ArrowRight size={12} className={parameterId === route.id ? "text-[#F6B73C]" : "text-slate-450"} />
                  </button>
                ))}
              </div>

              {/* Conversion Ads banner */}
              <div className="bg-brand-navy text-white p-5 rounded-xl border border-slate-800 space-y-3 shadow">
                <span className="text-[10px] text-[#F6B73C] font-mono uppercase tracking-widest block font-bold">
                  {isBn ? "💰 বিশেষ সাশ্রয়" : "💰 Special Offer"}
                </span>
                <h4 className="font-serif text-sm font-bold">
                  {isBn ? "আপনার পরবর্তী ফ্লাইট বুকিংয়ে সর্বোচ্চ BDT 3,500 সাশ্রয় করুন" : "Save up to BDT 3,500 on Your Next Booking"}
                </h4>
                <p className="text-[11px] text-slate-300 leading-normal">
                  {isBn
                    ? `আপনার ${localizedFlights.find(r => r.id === parameterId)?.country || "Nepal"} ফ্লাইটের ভাড়া তুলনা করুন — ভেরিফায়েড পার্টনারের মাধ্যমে সর্বনিম্ন ভাড়া খুঁজুন।`
                    : `Compare prices for your ${localizedFlights.find(r => r.id === parameterId)?.country || "Nepal"} flight — lowest fares through our verified booking partners.`}
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-2 shadow-sm">
                <span className="text-[10px] text-brand-navy font-mono uppercase tracking-widest block font-bold">
                  {isBn ? "🚕 ল্যান্ড করার পর" : "🚕 After You Land"}
                </span>
                <p className="text-[11px] text-slate-500 leading-normal">
                  {isBn
                    ? `${localizedFlights.find(r => r.id === parameterId)?.country || "Nepal"}-এ নেমে সরাসরি হোটেলে যেতে আগে থেকেই প্রাইভেট Airport Transfer বুক করুন।`
                    : `Pre-book a private airport transfer to your hotel in ${localizedFlights.find(r => r.id === parameterId)?.country || "Nepal"} — skip the taxi line.`}
                </p>
                <PartnerLinkButton href={AFFILIATE_LINKS.kiwitaxi} label={isBn ? "Airport Transfer খুঁজুন" : "Find a Transfer"} variant="dark" />
              </div>
            </div>

            {/* Master Page Content */}
            <div className="lg:col-span-3 space-y-6">
              {(() => {
                const activeRoute = localizedFlights.find(r => r.id === parameterId) || localizedFlights[0];
                return (
                  <div className="space-y-8 animate-fade-in">
                    
                    {/* Header */}
                    <div className="border-b border-slate-200 pb-5">
                      <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 mb-2 uppercase">
                        <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>{isBn ? "হোম" : "Home"}</span>
                        <span>/</span>
                        <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/flights")}>{isBn ? "ফ্লাইটস" : "Flights"}</span>
                        <span>/</span>
                        <span className="text-brand-navy font-bold">{activeRoute.id}</span>
                      </nav>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                          {isBn ? `${activeRoute.from} থেকে ${activeRoute.to} ফ্লাইট গাইড` : `Flights from ${activeRoute.from} to ${activeRoute.to}`}
                        </h1>
                        <div className="flex items-center gap-2.5">
                          <span className="bg-[#F6B73C]/20 text-brand-navy text-xs px-3 py-1.5 rounded-full font-bold font-mono">
                            {activeRoute.priceRangeBdt.split(" (")[0]}
                          </span>
                          <button
                            type="button"
                            onClick={() => openPriceAlert(activeRoute.to)}
                            className="inline-flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-full shadow-xs transition-colors cursor-pointer"
                          >
                            <span>🔔</span>
                            <span>{isBn ? "ফেয়ার অ্যালার্ট" : "Price Alert"}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 🤖 AEO: QUICK ANSWER (50-80 Words, Google AI Overview Optimized) */}
                    <div id="aeo-quick-answer-card" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">
                      <span className="text-[10px] font-bold tracking-widest text-brand-navy font-mono block mb-1">
                        {isBn ? "সংক্ষিপ্ত তথ্য (Quick Answer)" : "Quick Answer"}
                      </span>
                      <p className="text-slate-800 text-sm sm:text-[14.5px] font-sans leading-relaxed">
                        {activeRoute.quickAnswer}
                      </p>
                    </div>

                    {/* 📊 AEO: KEY FACTS TABLE */}
                    <div className="space-y-3">
                      <h2 className="font-serif font-black text-lg text-slate-900">
                        {isBn ? "এক নজরে ফ্লাইটের তথ্য" : "Flight Facts at a Glance"}
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {activeRoute.keyFacts.map((fact) => (
                          <div key={fact.label} className="bg-white border border-slate-250 p-4 rounded-xl text-center shadow-sm">
                            <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider block">{fact.label}</span>
                            <span className="text-xs font-semibold text-brand-navy font-mono block mt-1">{fact.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rich description contents */}
                    <div className="prose prose-slate max-w-none text-sm sm:text-[14.5px] text-slate-700 space-y-4 leading-relaxed">
                      <h2 className="font-serif font-black text-lg text-slate-900">
                        {isBn ? "এই রুটে চলাচলকারী এয়ারলাইন্সসমূহ" : "Airlines Flying This Route"}
                      </h2>
                      <p>
                        {isBn
                          ? "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর (DAC) থেকে প্রতিদিন একাধিক ফ্লাইট এই রুটে চলাচল করে। সময় ও ভ্রমণ ক্লান্তি কমাতে Direct Flight বেছে নেওয়া সবচেয়ে সুবিধাজনক:"
                          : "Bangladeshi outbound travellers can leverage several daily flight profiles from Hazrat Shahjalal International Airport (DAC). Direct options are highly recommended to save travel fatigue:"}
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        {activeRoute.airlines.map((airline) => (
                          <li key={airline} className="font-medium text-slate-805">{airline}</li>
                        ))}
                      </ul>
                      
                      <h3 className="font-serif font-black text-base text-slate-900 mt-4">
                        {isBn ? "সবচেয়ে কম ভাড়ায় টিকেট কাটার উপযুক্ত সময়" : "When to Book for the Best Price"}
                      </h3>
                      <p>
                        {isBn ? (
                          <>
                            আমরা ভ্রমণের অন্তত <strong>{activeRoute.bestTimeToBook}</strong> ফ্লাইট টিকেট বুক করার পরামর্শ দিই। এতে শেষ মুহূর্তের অতিরিক্ত ভাড়া এড়ানো যায়। পাশাপাশি আপনার ভিসার মেয়াদ ও শর্তাবলী (<strong>{activeRoute.visaRequirement}</strong>) মিলিয়ে টিকেট ইস্যু করুন।
                          </>
                        ) : (
                          <>
                            We advise booking flights approximately <strong>{activeRoute.bestTimeToBook}</strong>. In doing so, economy flyers can generally avoid peak dynamic pricing models. Ensure that you synchronize your flight bookings with visa durations, which are pre-configured at {activeRoute.visaRequirement}.
                          </>
                        )}
                      </p>
                    </div>

                     {/* Embedded Conversion search form widget */}
                    <div className="bg-slate-100 p-4 rounded-xl border border-slate-250/60 my-6">
                      <span className="text-[10px] font-mono font-bold text-brand-navy block mb-2">
                        {isBn ? "এই রুটের ফ্লাইট সার্চ করুন" : "Search Flights on This Route"}
                      </span>
                      <TravelpayoutsEmbed
                        defaultDestination={getCountryIata(activeRoute.country)}
                      />
                    </div>

                    {/* 🛡️ AirHelp Flight Delay Compensation & AirHelp+ (AHTPO11 11% OFF) */}
                    <AirHelpWidget
                      lang={lang}
                      routeLabel={`${activeRoute.from} → ${activeRoute.to}`}
                    />

                    {/* internal linking system ranking loops (Flights to Visa and Hotels!) */}
                    <div id="hotel-visa-loop-links" className="bg-brand-navy/5 border border-brand-navy/15 p-5 rounded-xl space-y-3">
                      <span className="text-[10px] font-bold text-brand-navy font-mono tracking-widest uppercase block">
                        {isBn ? "এই ট্রিপের জন্য আরও প্রয়োজনীয় তথ্য" : "Also Useful for This Trip"}
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold font-mono">
                        <button
                          id={`lnk-view-visa-from-flight-${activeRoute.id}`}
                          onClick={() => {
                            navigateTo(`/visa/${getCountryVisaId(activeRoute.country)}`);
                          }}
                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🛂 {isBn ? `${activeRoute.country} ভিসা চেকলিস্ট দেখুন` : `Check ${activeRoute.country} Visa Checklist`} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-hotel-from-flight-${activeRoute.id}`}
                          onClick={() => {
                            navigateTo(`/hotels/${getCountryHotelId(activeRoute.country)}`);
                          }}
                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🏨 {isBn ? `${activeRoute.country}-এ কোথায় থাকবেন` : `Where to Stay in ${activeRoute.country}`} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <a href={AFFILIATE_LINKS.kiwitaxi} target="_blank" rel="noopener noreferrer sponsored" className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm">
                          🚕 {isBn ? `${activeRoute.country} Airport Transfer বুক করুন` : `Book Airport Transfer in ${activeRoute.country}`} <ExternalLink size={12} className="ml-auto text-[#F6B73C]" />
                        </a>
                      </div>
                    </div>

                    <TravelIntelligence
                      pageTitle={isBn ? `${activeRoute.country} ফ্লাইট গাইড` : `Flights to ${activeRoute.country}`}
                      quickAnswer={activeRoute.quickAnswer}
                      keyFacts={activeRoute.keyFacts}
                      faqs={activeRoute.faqs}
                    />

                  </div>
                );
              })()}
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            🏨 VIEW 3: HOTELS SECTION
        ------------------------------------------------------------- */}
        {section === "hotels" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar list */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">
                {isBn ? "শহর অনুযায়ী হোটেল গাইড:" : "CITY HOUSING DIRECTORY:"}
              </span>
              <div className="space-y-2">
                {localizedHotels.map((col) => (
                  <button
                    key={col.id}
                    id={`btn-hotel-select-${col.id}`}
                    onClick={() => navigateTo(`/hotels/${col.id}`)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      parameterId === col.id
                        ? "bg-brand-navy text-white border-brand-navy shadow-md"
                        : "bg-white text-slate-705 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span>🏨 {isBn ? `${col.city} হোটেল গাইড` : `${col.city} Hotels Guide`}</span>
                    <ArrowRight size={12} className={parameterId === col.id ? "text-[#F6B73C]" : "text-slate-450"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Hotel content template */}
            <div className="lg:col-span-3 space-y-6">
              {(() => {
                const activeHotel = localizedHotels.find(h => h.id === parameterId) || localizedHotels[0];
                return (
                  <div className="space-y-8 animate-fade-in">
                    
                    {/* Header */}
                    <div className="border-b border-slate-200 pb-5">
                      <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 mb-2 uppercase">
                        <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>{isBn ? "হোম" : "Home"}</span>
                        <span>/</span>
                        <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/hotels")}>{isBn ? "হোটেল" : "Hotels"}</span>
                        <span>/</span>
                        <span className="text-brand-navy font-bold">{activeHotel.id}</span>
                      </nav>

                      <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                        {isBn ? `${activeHotel.city}-এ কোথায় থাকবেন: সেরা এলাকা ও হোটেল গাইড` : `Where to Stay in ${activeHotel.city}: Best Areas & Hotels`}
                      </h1>
                    </div>

                    {/* AEO Answer */}
                    <div id="hotel-aeo-quick-answer" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">
                      <span className="text-[10px] font-bold tracking-widest text-brand-navy font-mono block mb-1">
                        {isBn ? "সংক্ষিপ্ত তথ্য (Quick Answer)" : "Quick Answer"}
                      </span>
                      <p className="text-slate-800 text-sm sm:text-[14.5px] font-sans leading-relaxed">
                        {activeHotel.quickAnswer}
                      </p>
                    </div>

                    {/* Neighborhoods breakdown */}
                    <div className="space-y-4">
                      <h2 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2">
                        {isBn ? "থাকার জন্য সেরা এলাকা ও লোকেশন বিশ্লেষণ" : "Best Neighborhoods Area breakdown"}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {activeHotel.neighborhoods.map((zone) => (
                          <div key={zone.name} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:shadow">
                            <span className="font-serif text-base font-bold text-brand-navy block">{zone.name}</span>
                            <span className="text-[10px] bg-slate-100 font-mono text-brand-navy font-bold rounded-full px-2 py-0.5 inline-block my-1">{zone.vibe}</span>
                            <p className="text-sm text-slate-700 leading-relaxed mt-2 font-sans">{zone.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Curated Housing Grid list */}
                    <div className="space-y-4">
                      <h2 className="font-serif font-black text-lg text-slate-900">
                        {isBn ? "বাংলাদেশি ভ্রমণকারীদের জন্য বাছাইকৃত হোটেল" : "Curated Local Stays Selection"}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activeHotel.hotels.map((room) => (
                          <div key={room.name} className="border border-slate-205 p-5 bg-white rounded-xl shadow-sm flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-full uppercase border ${
                                  room.category === "Luxury" ? "bg-amber-100 border-amber-300 text-amber-800" :
                                  room.category === "Budget" ? "bg-emerald-100 border-emerald-300 text-emerald-800" :
                                  "bg-indigo-100 border-indigo-300 text-indigo-805"
                                }`}>
                                  {room.category}
                                </span>
                                <span className="text-xs font-mono font-bold text-amber-500">{room.stars} ★</span>
                              </div>
                              <h4 className="font-bold text-slate-800 text-sm">{room.name}</h4>
                              <p className="text-[11px] text-slate-450 mt-1 font-semibold italic">📍 {room.neighborhood}</p>
                              
                              <div className="flex flex-wrap gap-1 mt-3">
                                {room.features.slice(0, 3).map((f) => (
                                  <span key={f} className="text-[9px] font-mono bg-slate-100 text-brand-navy px-2 py-0.5 rounded border border-slate-200">{f}</span>
                                ))}
                              </div>
                            </div>

                            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                              <div>
                                <span className="text-xs font-mono text-slate-400 block">{isBn ? "প্রতি রাতের ভাড়া" : "Night Rate"}</span>
                                <span className="text-sm font-bold text-slate-800">৳ {room.priceBdt.toLocaleString()} BDT</span>
                              </div>
                              
                              <button
                                id={`hotel-booking-btn-${room.name.toLowerCase().replace(/\s+/g, '-')}`}
                                onClick={() => {
                                  triggerAffiliateToast(
                                    isBn
                                      ? `${room.name}, ${room.neighborhood}-এর সর্বনিম্ন রেট খোঁজা হচ্ছে...`
                                      : `Finding the best available rate at ${room.name}, ${room.neighborhood}. Opening booking page...`
                                  );
                                }}
                                className="bg-brand-navy text-white hover:bg-[#1a4166] text-[10px] font-bold px-3 py-1.5 rounded-md cursor-pointer flex items-center gap-1.5 transition-colors"
                              >
                                {isBn ? "বুক করুন" : "Book Stay"} <ExternalLink size={10} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 🚕 Unified Airport Transfer & Travel Essentials Hub */}
                    <TravelEssentials
                      country={activeHotel.city}
                      defaultTab="transfers"
                      compactHeader
                      lang={lang}
                    />

                    {/* Flight & Visa Loop linkups */}
                    <div id="hotel-internal-loop" className="bg-brand-navy/5 border border-brand-navy/15 p-5 rounded-xl space-y-3">
                      <span className="text-[10px] font-bold text-brand-navy font-mono tracking-widest uppercase block">
                        {isBn ? "⚡ ফ্লাইট রুট ও ভিসা গাইড:" : "⚡ FLIGHT ROUTING & ENTRY DETAILS:"}
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold font-mono">
                        <button
                          id={`lnk-view-visa-from-hotel-${activeHotel.id}`}
                          onClick={() => {
                            navigateTo(`/visa/${getCountryVisaId(activeHotel.country)}`);
                          }}
                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          🛂 {isBn ? `${activeHotel.country} ভিসা চেকলিস্ট` : `Check ${activeHotel.country} Visa Checklist`} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-flight-from-hotel-${activeHotel.id}`}
                          onClick={() => {
                            navigateTo(`/flights/${getCountryFlightId(activeHotel.country)}`);
                          }}
                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          ✈️ {isBn ? "ঢাকা থেকে ফ্লাইট রুট" : "Recommended Dhaka Flights"} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <a
                          href={AFFILIATE_LINKS.kiwitaxi}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-250 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          🚕 {isBn ? "Airport Transfer ভাড়া তুলনা" : "Compare Transfer Prices"} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </a>
                      </div>
                    </div>

                    {/* Widget */}
                    <TravelpayoutsCustomWidget 
                      initialTab="hotels"
                      initialHotelCity={activeHotel.city}
                      initialTo={getCountryCityWithIata(activeHotel.country)}
                    />

                    <TravelIntelligence
                      pageTitle={isBn ? `${activeHotel.city}-এ কোথায় থাকবেন` : `Where to stay in ${activeHotel.city}`}
                      quickAnswer={activeHotel.quickAnswer}
                      keyFacts={activeHotel.keyFacts}
                      faqs={activeHotel.faqs}
                    />

                  </div>
                );
              })()}
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            🛂 VIEW 4: VISA SECTION
        ------------------------------------------------------------- */}
        {section === "visa" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar list */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">
                {isBn ? "দেশ অনুযায়ী ভিসা গাইড" : "VISA GUIDES BY COUNTRY"}
              </span>
              <div className="space-y-2">
                {localizedVisas.map((v) => (
                  <button
                    key={v.id}
                    id={`btn-visa-select-${v.id}`}
                    onClick={() => navigateTo(`/visa/${v.id}`)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      parameterId === v.id
                        ? "bg-brand-navy text-white border-brand-navy shadow-md"
                        : "bg-white text-slate-705 border-slate-200 hover:bg-slate-50 relative"
                    }`}
                  >
                    <span>🛂 {isBn ? `${v.country} ভিসা রিকোয়ারমেন্টস` : `${v.country} Visa Requirements`}</span>
                    <ArrowRight size={12} className={parameterId === v.id ? "text-[#F6B73C]" : "text-slate-450"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-3 space-y-6">
              {(() => {
                const activeVisa = localizedVisas.find(v => v.id === parameterId) || localizedVisas[0];
                return (
                  <div className="space-y-8 animate-fade-in">
                    
                    {/* Header */}
                    <div className="border-b border-slate-200 pb-5">
                      <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 mb-2 uppercase">
                        <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>{isBn ? "হোম" : "Home"}</span>
                        <span>/</span>
                        <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/visa")}>{isBn ? "ভিসা গাইড" : "Visa"}</span>
                        <span>/</span>
                        <span className="text-brand-navy font-bold">{activeVisa.id}</span>
                      </nav>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                          {isBn
                            ? `বাংলাদেশি পাসপোর্টধারীদের জন্য ${activeVisa.country} ভিসা গাইড ও চেকলিস্ট`
                            : `${activeVisa.country} Visa Requirements for Bangladeshi Citizens`}
                        </h1>
                        <span className="bg-brand-navy text-white text-xs px-3 py-1 rounded-full font-bold font-mono">
                          {activeVisa.requirementType}
                        </span>
                      </div>
                    </div>

                    {/* AEO Quote */}
                    <div id="visa-aeo-box" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">
                      <span className="text-[10px] font-bold tracking-widest text-brand-navy font-mono block mb-1">
                        {isBn ? "সংক্ষিপ্ত তথ্য (Quick Answer)" : "Quick Answer"}
                      </span>
                      <p className="text-slate-800 text-sm sm:text-[14.5px] font-sans leading-relaxed">
                        {activeVisa.quickAnswer}
                      </p>
                    </div>

                    {/* Core facts */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {activeVisa.keyFacts.map((fact) => (
                        <div key={fact.label} className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-sm">
                          <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider block">{fact.label}</span>
                          <span className="text-xs font-semibold text-brand-navy font-mono block mt-1">{fact.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Step-by-step procedures */}
                    <div className="space-y-4">
                      <h2 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2">
                        {isBn ? "ধাপে ধাপে ভিসা আবেদনের নিয়মাবলী" : "Step-by-Step Application Process"}
                      </h2>
                      <div className="space-y-3">
                        {activeVisa.stepByStep.map((step, idx) => (
                          <div key={idx} className="flex gap-4 text-sm sm:text-[14.5px] leading-relaxed text-slate-705 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                            <span className="w-6 h-6 rounded-full bg-brand-navy text-white font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Document structures */}
                    <div className="space-y-4">
                      <h2 className="font-serif font-black text-lg text-slate-900">
                        {isBn ? "প্রয়োজনীয় ডকুমেন্ট চেকলিস্ট" : "Document Checklist"}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activeVisa.documentChecklist.map((cat) => (
                          <div key={cat.category} className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
                            <span className="text-xs font-bold font-mono uppercase tracking-wider text-brand-navy block border-b border-slate-200 pb-2 mb-3">📋 {cat.category}</span>
                            <ul className="space-y-2 text-sm sm:text-[14.5px] text-slate-700">
                              {cat.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Flight booking CTA after visa checklist */}
                    <div className="space-y-4 pt-4 border-t border-slate-200">
                      <div className="text-center text-sm font-semibold text-slate-600 py-2">
                        {isBn ? "আপনার ট্রিপ বুক করতে প্রস্তুত?" : "Ready to book your trip?"}
                      </div>
                      
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">
                          {isBn ? "ঢাকা থেকে ফ্লাইট খুঁজুন" : "Find flights from Dhaka"}
                        </span>
                        <TravelpayoutsEmbed
                          defaultDestination={getCountryIata(activeVisa.country)}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <PartnerLinkButton 
                          href={AFFILIATE_LINKS.airalo} 
                          label={isBn ? `${activeVisa.country}-এর জন্য লোকাল eSIM নিন` : `Get a local eSIM for ${activeVisa.country}`} 
                        />
                        <PartnerLinkButton 
                          href={AFFILIATE_LINKS.kiwitaxi} 
                          label={isBn ? "Airport Transfer বুক করুন" : "Book airport transfer"} 
                        />
                      </div>
                    </div>

                    {/* 📶 Stay Connected widget block */}
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4 animate-fade-in">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-widest block">
                          {isBn ? "📶 ফ্লাইটে ওঠার আগে" : "📶 Before You Fly"}
                        </span>
                        <h2 className="font-serif text-lg font-bold text-slate-900">
                          {isBn ? `${activeVisa.country}-এর জন্য লোকাল eSIM সংগ্রহ করুন` : `Get a Local eSIM for ${activeVisa.country}`}
                        </h2>
                        <p className="text-xs text-slate-500">
                          {isBn ? "এয়ারপোর্টে নেমেই সাথে সাথে ইন্টারনেট চালু করুন — সিমের লাইনে দাঁড়ানোর ঝামেলা নেই।" : "Land with data already active — no SIM card counter, no roaming bill shock."}
                        </p>
                      </div>
                      <div className="bg-white p-2 sm:p-4 rounded-xl border border-slate-200">
                        <AiraloEsimWidget />
                      </div>
                    </div>

                    {/* Flight & Hotel loop structure */}
                    <div id="visa-internal-loop" className="bg-brand-navy/5 border border-brand-navy/15 p-5 rounded-xl space-y-3">
                      <span className="text-[10px] font-bold text-brand-navy font-mono tracking-widest uppercase block">
                        {isBn ? "আপনার পুরো ট্রিপ প্ল্যান করুন" : "Plan Your Full Trip"}
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold font-mono">
                        <button
                          id={`lnk-view-hotel-from-visa-${activeVisa.id}`}
                          onClick={() => {
                            navigateTo(`/hotels/${getCountryHotelId(activeVisa.country)}`);
                          }}
                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          🏨 {isBn ? `${activeVisa.country}-এর বাছাইকৃত হোটেল` : `Curated ${activeVisa.country} Hotels`} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-flight-from-visa-${activeVisa.id}`}
                          onClick={() => {
                            navigateTo(`/flights/${getCountryFlightId(activeVisa.country)}`);
                          }}
                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          ✈️ {isBn ? "ঢাকা থেকে ফ্লাইট বুক করুন" : "Book Flights from Dhaka"} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <a
                          href={AFFILIATE_LINKS.airalo}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm cursor-pointer"
                        >
                          📶 {isBn ? "লোকাল eSIM নিন" : "Get a Local eSIM"} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </a>
                      </div>
                    </div>

                    <TravelIntelligence
                      pageTitle={isBn ? `${activeVisa.country} ভিসা প্রসেসিং গাইড` : `${activeVisa.country} Outbound Visa Process`}
                      quickAnswer={activeVisa.quickAnswer}
                      keyFacts={activeVisa.keyFacts}
                      faqs={activeVisa.faqs}
                    />

                  </div>
                );
              })()}
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            🌍 VIEW 5: DESTINATIONS ROADMAP SECTION
        ------------------------------------------------------------- */}
        {section === "destinations" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar list */}
            <div className="space-y-4 font-mono">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block font-sans">OUTBOUND ROUTE SUITES:</span>
              <div className="space-y-2 text-xs">
                {DESTINATIONS_DATA.map((des) => (
                  <button
                    key={des.id}
                    id={`btn-dest-select-${des.id}`}
                    onClick={() => navigateTo(`/destinations/${des.id}`)}
                    className={`w-full text-left p-3.5 rounded-xl border font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      parameterId === des.id
                        ? "bg-brand-navy text-white border-brand-navy shadow-md font-sans"
                        : "bg-white text-slate-705 border-slate-200 hover:bg-slate-50 font-sans"
                    }`}
                  >
                    <span>🌍 {des.country} Travel Guide</span>
                    <ArrowRight size={12} className={parameterId === des.id ? "text-[#F6B73C]" : "text-slate-450"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Main Details content */}
            <div className="lg:col-span-3 space-y-6">
              {(() => {
                const activeDes = DESTINATIONS_DATA.find(d => d.id === parameterId) || DESTINATIONS_DATA[0];
                return activeDes.id === "dubai-guide" ? (
                  <div className="space-y-10 animate-fade-in text-slate-800">
                    {/* BREADCRUMB HEADER */}
                    <div className="border-b border-slate-200 pb-5">
                      <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 mb-2 uppercase">
                        <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>Home</span>
                        <span>/</span>
                        <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/destinations")}>Destinations</span>
                        <span>/</span>
                        <span className="text-brand-navy font-bold">dubai-guide</span>
                      </nav>

                          {/* 🟦 1. HERO SECTION (TOP OF PAGE) */}
                          <h1 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                            Dubai Travel Guide
                          </h1>
                          <p className="text-sm sm:text-base text-slate-500 mt-2 font-light">
                            Find flights, hotels, and plan your Dubai trip instantly
                          </p>
                        </div>

                        {/* 👉 INSERT FLIGHT SEARCH WIDGET (Travelpayouts) */}
                        {/* Widget placement rule: Must be first interactive element on page, Above all content */}
                        <div id="dubai-flight-conversion-widget" className="bg-brand-navy text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 animate-pulse-subtle">
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono font-bold text-[#F6B73C] uppercase tracking-widest bg-[#F6B73C]/10 border border-[#F6B73C]/30 px-3 py-1 rounded-full inline-block">
                              ✈️ FLIGHTS TO DUBAI (DXB) — PRIMARY CONVERSION ZONE
                            </span>
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Search Cheapest Flights leaving Dhaka (DAC) to Dubai (DXB)</h3>
                            <p className="text-xs text-slate-300 leading-relaxed font-light">
                              Direct flights from Dhaka to Dubai take about 4 hours 45 minutes. Emirates, flydubai, Biman, and US-Bangla all fly this route. Roundtrip prices typically start around BDT 58,000.
                            </p>
                          </div>
                          <div className="bg-[#0f1d2e] p-2 sm:p-4 rounded-xl border border-slate-700/60 text-slate-900">
                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-3 px-1">✈️ LIVE FLIGHTS SEARCH</span>
                            <TravelpayoutsEmbed defaultDestination="DXB" />
                          </div>
                        </div>

                        {/* 🟨 2. DUBAI QUICK SNAPSHOT */}
                        <div id="dubai-quick-snapshot" className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                          <div className="border-l-4 border-brand-navy pl-3">
                            <h4 className="font-serif font-black text-sm text-brand-navy uppercase tracking-wider">Dubai Quick Snapshot</h4>
                            <p className="text-[11px] text-slate-500 font-mono font-light">Instant travel context before you search accommodation options below.</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">🌞 Best time to visit</span>
                              <span className="font-serif font-bold text-slate-800 text-xs block">November – March</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">🏙️ Known for</span>
                              <span className="font-serif font-bold text-slate-800 text-xs block">luxury lifestyle, skyscrapers, beaches, shopping</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">🎒 Travel style</span>
                              <span className="font-serif font-bold text-slate-800 text-xs block">budget to luxury options available</span>
                            </div>
                            <a
                              href={AFFILIATE_LINKS.airalo}
                              target="_blank"
                              rel="noopener noreferrer sponsored"
                              className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1 cursor-pointer hover:border-[#F6B73C] block"
                            >
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">📶 Stay connected</span>
                              <span className="font-serif font-bold text-slate-800 text-xs block">Local eSIM from Airalo</span>
                            </a>
                          </div>
                        </div>

                        {/* 🏨 3. ACCOMMODATION SECTION */}
                        <div id="dubai-accommodation" className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-widest block">
                              🏨 SECTION 2: ACCOMMODATION PORTAL
                            </span>
                            <h3 className="font-serif text-lg font-bold text-slate-900">Find Hotels in Dubai</h3>
                            <p className="text-xs text-slate-500">
                              Compare properties, locate perfect layovers, and secure custom partner rates instantly.
                            </p>
                          </div>
                          <div className="bg-white p-2 sm:p-4 rounded-xl border border-slate-200 text-slate-900">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-3 px-1">🏨 LIVE HOTEL COMPARISON ENGINE</span>
                            <TravelpayoutsCustomWidget 
                              initialTab="hotels"
                              initialTo="Dubai (DXB)"
                              initialHotelCity="Dubai"
                            />
                          </div>
                        </div>

                        {/* 📍 4. BEST AREAS TO STAY */}
                        <div id="dubai-best-areas" className="space-y-4 font-sans text-slate-800">
                          <div className="border-b border-slate-200 pb-2">
                            <h3 className="font-serif font-black text-lg text-slate-900">Best Areas to Stay</h3>
                            <p className="text-xs text-slate-500">Curated neighborhoods targeting different traveler types & budget tiers.</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                              { area: "Downtown Dubai", details: "luxury stays, Burj Khalifa view", hint: "Perfect for shopping and premium fountain views.", estimate: "৳12,000 / night" },
                              { area: "Dubai Marina", details: "nightlife, beach access, modern lifestyle", hint: "Unlocks spectacular marina harbor walks & yachts.", estimate: "৳18,000 / night" },
                              { area: "Deira", details: "budget-friendly, cultural experience", hint: "Offers traditional gold/spice souks and affordable diners.", estimate: "৳8,500 / night" }
                            ].map((item, index) => (
                              <div key={index} className="bg-white border border-slate-200 hover:border-[#F6B73C] p-5 rounded-2xl shadow-sm flex flex-col justify-between transition-all transform hover:-translate-y-1">
                                <div className="space-y-2">
                                  <span className="text-[9px] font-mono font-bold uppercase bg-slate-100 text-brand-navy px-2 py-0.5 rounded-full inline-block">
                                    📍 AREA RECOMMENDATION
                                  </span>
                                  <h4 className="font-serif font-bold text-sm text-slate-900">{item.area}</h4>
                                  <p className="text-xs text-slate-705"><strong>Pros:</strong> {item.details}</p>
                                  <p className="text-[11px] text-slate-500 font-light leading-relaxed">{item.hint}</p>
                                </div>
                                <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
                                  <div>
                                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Typical Baseline</span>
                                    <span className="text-xs font-mono font-bold text-[#F6B73C]">{item.estimate}</span>
                                  </div>
                                  <button 
                                    onClick={() => triggerAffiliateToast(`Finding the best available rates for hotels in ${item.area}. Opening booking page...`)}
                                    className="bg-brand-navy hover:bg-[#F6B73C] hover:text-brand-navy text-white font-bold text-[10px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                                  >
                                    Check Hotels <ExternalLink size={10} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 🚗 4. UNIFIED TABBED TRAVEL ESSENTIALS (Welcome Pickups, Kiwitaxi, Klook, Airalo, QEEQ) */}
                        <TravelEssentials country="Dubai, UAE" />

                        {/* 💡 5. TRAVEL INSIGHTS SECTION */}
                        <div id="dubai-insights" className="bg-brand-navy/5 border-l-4 border-[#F6B73C] p-6 rounded-r-2xl space-y-3">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block font-sans">💡 Booking Tips</span>
                            <h4 className="font-serif text-base font-bold text-brand-navy">Essential Dubai Booking Tips & Cost Hacks</h4>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="text-amber-500 font-bold block">✈️ airfare timing</span>
                              <p className="text-slate-650 leading-relaxed font-light">Mid-week flights are often cheaper</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="text-amber-500 font-bold block">🏨 hotel demand peak</span>
                              <p className="text-slate-650 leading-relaxed font-light">Hotel prices increase during peak season (Dec–Jan)</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="text-amber-500 font-bold block">🔒 secure availability</span>
                              <p className="text-slate-650 leading-relaxed font-light">Early booking improves price and availability</p>
                            </div>
                          </div>
                        </div>

                        {/* 🧭 7. THINGS TO DO IN DUBAI */}
                        <div id="dubai-things-to-do" className="space-y-4">
                          <div className="border-b border-slate-200 pb-2">
                            <h3 className="font-serif font-black text-lg text-slate-900">Things to Do in Dubai</h3>
                            <p className="text-xs text-slate-500">Unmissable attractions with deep-linked partner rates.</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans">
                            {[
                              { title: "Burj Khalifa visit", sub: "Ride the world's fastest elevator to level 124/125." },
                              { title: "Desert safari experience", sub: "Sunset dune bashing, camel riding, and Bedouin BBQ dining." },
                              { title: "Dubai Mall shopping", sub: "Explore unlimited retail lanes, internal aquarium, and cinema nodes." },
                              { title: "Marina cruise", sub: "Glide alongside multi-million yacht slips under starry nights." }
                            ].map((thing, idx) => (
                              <div key={idx} className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col justify-between space-y-2 hover:border-[#F6B73C] transition-all">
                                <div className="space-y-1">
                                  <span className="font-mono text-[#F6B73C] text-[10px] block font-bold font-sans">#0{idx+1}</span>
                                  <p className="font-serif font-extrabold text-slate-900 text-xs">{thing.title}</p>
                                  <p className="text-[11px] text-slate-500 font-light">{thing.sub}</p>
                                </div>
                                <button
                                  onClick={() => triggerAffiliateToast(`Checking availability for: ${thing.title}. Opening booking page...`)}
                                  className="mt-2 text-[10px] text-brand-navy hover:text-[#F6B73C] hover:underline flex items-center gap-1 font-mono cursor-pointer font-bold"
                                >
                                  Secure Pass <ExternalLink size={8} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 🚀 8. FINAL CALL TO ACTION */}
                        <div id="dubai-final-cta" className="bg-brand-navy text-white p-8 rounded-2xl text-center space-y-4">
                          <div className="space-y-1 max-w-xl mx-auto">
                            <h4 className="font-serif font-black text-lg sm:text-2xl text-[#F6B73C]">Plan your Dubai trip now</h4>
                            <p className="text-xs sm:text-sm text-slate-300 font-light font-sans leading-relaxed">
                              Search flights, compare hotels, and book your journey
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-xs font-semibold">
                            <button 
                              onClick={() => navigateTo("/flights")} 
                              className="w-full sm:w-auto bg-[#F6B73C] text-brand-navy hover:bg-[#ffc654] px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                            >
                              Search Outbound Flights
                            </button>
                            <button 
                              onClick={() => navigateTo("/hotels")} 
                              className="w-full sm:w-auto bg-transparent border border-white/40 hover:border-white text-white px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
                            >
                              Compare Luxury Accommodations
                            </button>
                          </div>
                        </div>

                        {/* ⚙️ 9. INTERNAL LINKING (FOR SEO SCALING) */}
                        <div id="dubai-internal-linking" className="border-t border-slate-200 pt-6 space-y-3">
                          <span className="font-mono text-[9px] font-bold text-slate-400 block uppercase tracking-widest text-center font-sans">Explore More</span>
                          <div className="flex flex-wrap justify-center items-center gap-2.5 text-xs">
                            <button
                              onClick={() => navigateTo("/flights")}
                              className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 font-sans transition-all"
                            >
                              ✈️ Cheap flights page (Dubai route)
                            </button>
                            <button
                              onClick={() => navigateTo("/hotels")}
                              className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 font-sans transition-all"
                            >
                              🏨 Hotel comparison page (Dubai)
                            </button>
                            <button
                              onClick={() => navigateTo("/")}
                              className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 font-sans transition-all"
                            >
                              📰 Future travel blog articles
                            </button>
                          </div>
                        </div>

                        <TravelIntelligence
                          pageTitle={`${activeDes.country} Travel Guide Itinerary`}
                          quickAnswer={activeDes.quickAnswer}
                          keyFacts={activeDes.keyFacts}
                          faqs={activeDes.faqs}
                        />
                      </div>
                    ) : (
                      <div className="space-y-10 animate-fade-in text-slate-800">
                        
                        {/* BREADCRUMB HEADER */}
                        <div className="border-b border-slate-200 pb-5">
                          <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 mb-2 uppercase">
                            <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>Home</span>
                            <span>/</span>
                            <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/destinations")}>Destinations</span>
                            <span>/</span>
                            <span className="text-brand-navy font-bold">{activeDes.id}</span>
                          </nav>

                          <span className="text-[10px] font-mono font-bold tracking-widest text-[#F6B73C] bg-brand-navy px-2.5 py-0.5 rounded-full inline-block uppercase mb-2 animate-pulse">
                            🌍 Destination Guide
                          </span>
                          <h1 className="font-serif text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                            {activeDes.title}
                          </h1>
                        </div>

                        {/* 2. TOP SECTION (PRIMARY CONVERSION ZONE) - FLIGHTS WIDGET FIRST */}
                        <div id="dest-primary-conversion" className="bg-brand-navy text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono font-bold text-[#F6B73C] uppercase tracking-widest bg-[#F6B73C]/10 border border-[#F6B73C]/30 px-3 py-1 rounded-full inline-block font-sans">
                              ✈️ Book Your Flight
                            </span>
                            <h3 className="font-serif text-xl sm:text-2xl font-bold">Flights Leaving Dhaka (DAC) to {getCountryCityWithIata(activeDes.country)}</h3>
                            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-light font-sans">
                              {activeDes.id === "nepal-guide" ? "Direct flights from Dhaka to Kathmandu take just 1 hour 30 minutes on Biman Bangladesh or Himalaya Airlines. Roundtrip fares typically run BDT 28,000–40,000. Compare prices for your dates below." :
                              activeDes.id === "thailand-guide" ? "Dhaka to Bangkok takes about 2.5 hours direct. Thai Airways, Biman, US-Bangla, and Thai Lion Air fly this route. Roundtrip fares usually start around BDT 31,500." :
                              activeDes.id === "malaysia-guide" ? "Dhaka to Kuala Lumpur takes about 3 hours 50 minutes. Malaysia Airlines, AirAsia, Biman, and Batik Air all fly direct. Expect BDT 36,000–48,000 roundtrip." :
                              activeDes.id === "singapore-guide" ? "Direct flights from Dhaka to Singapore Changi (SIN) take 4 hours 15 minutes on Singapore Airlines, Biman, and US-Bangla. Roundtrip fares start around BDT 42,000." :
                              activeDes.id === "maldives-guide" ? "Direct flights from Dhaka to Malé (MLE) take 4 hours 10 minutes on US-Bangla Airlines, or 1-stop via Colombo on SriLankan Airlines. Free 30-day Visa on Arrival for Bangladeshis." :
                              activeDes.id === "dubai-guide" ? "Direct flights from Dhaka to Dubai take about 4 hours 45 minutes. Emirates, flydubai, Biman, and US-Bangla all fly this route. Roundtrip prices typically start around BDT 58,000." : "Lock down lowest flight options direct from Dhaka."}
                            </p>
                          </div>

                          {/* Travelpayouts Flights widget */}
                          <div className="bg-[#0f1d2e] p-2 sm:p-4 rounded-xl border border-slate-700/60 text-slate-900">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-3 px-1">✈️ LIVE FLIGHTS COMPARISON ENGINE</span>
                            <TravelpayoutsEmbed
                              defaultDestination={getCountryIata(activeDes.country)}
                            />
                          </div>
                        </div>

                        {/* 3. DESTINATION SNAPSHOT SECTION (FAST CONTEXT) */}
                        <div id="dest-snapshot-bento" className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                          <div className="border-l-4 border-brand-navy pl-3">
                            <h4 className="font-serif font-black text-sm text-brand-navy uppercase tracking-wider">Quick Facts</h4>
                            <p className="text-[11px] text-slate-500 font-mono">Quick decision support parameters before searching accommodation.</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">🌞 Best Time To Visit</span>
                              <span className="font-serif font-bold text-slate-800 text-xs block">{activeDes.bestTimeToVisit}</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">💰 Average Cost Index</span>
                              <span className="font-mono font-bold text-[#F6B73C] text-xs block">
                                {activeDes.id === "nepal-guide" ? "Highly Budget-Friendly (approx BDT 3,500/day local expense)" :
                                activeDes.id === "thailand-guide" ? "Affordable Mid-Range (approx BDT 6,000/day local expense)" :
                                activeDes.id === "malaysia-guide" ? "Family-Friendly Budget (approx BDT 7,500/day local expense)" :
                                activeDes.id === "singapore-guide" ? "Smart Urban Comfort (approx BDT 11,500/day local expense)" :
                                activeDes.id === "maldives-guide" ? "Local Island Budget (approx BDT 8,500/day on Maafushi)" :
                                activeDes.id === "dubai-guide" ? "Premium Business Luxury (approx BDT 14,000/day local expense)" : "Sufficient BDT 5,000/day"}
                              </span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">🎒 Optimal Travel Style</span>
                              <span className="text-slate-650 leading-snug block font-sans">
                                {activeDes.id === "nepal-guide" ? "High-altitude trekking, organic dining, and historical pagoda walks." :
                                activeDes.id === "thailand-guide" ? "Multi-mall shopping, marine activities, and street food market tasting." :
                                activeDes.id === "malaysia-guide" ? "Urban adventure, Genting theme parks, and tropical reserve strolls." :
                                activeDes.id === "singapore-guide" ? "MRT city exploration, Sentosa theme parks, Gardens by the Bay & Mustafa shopping." :
                                activeDes.id === "maldives-guide" ? "Maafushi coral reef snorkeling, sandbank picnics, and 1-day luxury resort passes." :
                                activeDes.id === "dubai-guide" ? "Desert dune riding, observation deck sightseeing, and beach luxury resorts." : "Casual exploration"}
                              </span>
                            </div>
                            <a href={AFFILIATE_LINKS.airalo} target="_blank" rel="noopener noreferrer sponsored" className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-1 block hover:border-[#F6B73C] cursor-pointer">
                              <span className="font-mono text-[9px] font-bold text-slate-400 uppercase block">📶 Stay Connected</span>
                              <span className="font-serif font-bold text-slate-800 text-xs block">Local eSIM from Airalo</span>
                            </a>
                          </div>
                        </div>

                        {/* 4. HOTEL SEARCH SECTION (SECONDARY CONVERSION ZONE) */}
                        <div id="dest-secondary-conversion" className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-widest block font-sans">
                              🏨 Find a Hotel
                            </span>
                            <h3 className="font-serif text-lg font-bold text-slate-900">Compare Accommodations in {getCountryCityName(activeDes.country)}</h3>
                            <p className="text-xs text-slate-500">
                              Now that your travel days are mapped, click to lock Halal-certified suites or cheap family units near critical transit points.
                            </p>
                          </div>

                          <div className="bg-white p-2 sm:p-4 rounded-xl border border-slate-200 text-slate-900">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-3 px-1">🏨 LIVE ACCOMMODATION COMPARISON ENGINE</span>
                            <TravelpayoutsCustomWidget 
                              initialTab="hotels"
                              initialTo={getCountryCityWithIata(activeDes.country)}
                              initialHotelCity={getCountryCityName(activeDes.country)}
                            />
                          </div>
                        </div>

                        {/* 5. “TOP PLACES TO STAY” SECTION (SEO + AFFILIATE SUPPORT) */}
                        <div id="dest-curated-stays" className="space-y-4">
                          <div className="border-b border-slate-200 pb-2">
                            <h3 className="font-serif font-black text-lg text-slate-900">Curated Stays & Recommended Neighborhoods</h3>
                            <p className="text-xs text-slate-500">Hotels near the main attractions, picked for travelers from Bangladesh.</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {(activeDes.id === "nepal-guide" ? [
                              { area: "Downtown Backpacker Zone (Thamel)", name: "Thamel Eco Resort & Spa", rate: "৳3,500 / night", star: "⭐ ⭐ ⭐", linkTip: "Free airport luggage pick-up and organic buffet included." },
                              { area: "Airport Transit Hub (Sinamangal)", name: "The Suite Airport Guest House KTM", rate: "৳4,200 / night", star: "⭐ ⭐ ⭐", linkTip: "Walking distance to Tribhuvan airport gates; perfect for night arrivals." },
                              { area: "Heritage Tourist Sector (Patan / Durbar)", name: "Durbar Square Boutique Heritage Lodge", rate: "৳5,800 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "Stunning brick-lined traditional Newari apartments with city terrace view." }
                            ] : activeDes.id === "thailand-guide" ? [
                              { area: "Downtown Shopping Sector (Pratunam Market)", name: "Centara Watergate Pavillion Hotel Bangkok", rate: "৳9,800 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "Direct access to market lanes and legendary Sukhumvit halal hub food lines." },
                              { area: "Airport Connection (Suvarnabhumi Link)", name: "Mariya Boutique Residence BKK Node", rate: "৳5,200 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "Complimentary sky train shuttle and early check-in options for Bangladeshis." },
                              { area: "Vibrant Night Market District (Sukhumvit Road)", name: "Siam Star Premium Hotel Area", rate: "৳4,800 / night", star: "⭐ ⭐ ⭐", linkTip: "Very close to BTS Skytrain lines, making central transport entirely gridlock-free." }
                            ] : activeDes.id === "malaysia-guide" ? [
                              { area: "Downtown Action Core (Bukit Bintang Mallway)", name: "Gold 3 Boutique Family Hotel KL", rate: "৳4,500 / night", star: "⭐ ⭐ ⭐", linkTip: "Surrounded by local food courts, digital item hubs, and direct Monorail stations." },
                              { area: "Airport Transit Zone (KLIA Sepang Node)", name: "Tune Airport Hotel KLIA2 Terminal", rate: "৳6,200 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "Covered walkway directly to boarding check-in counters. Outstanding choice for child layovers." },
                              { area: "Prestige Park Sector (KLCC Petronas Vista)", name: "Impiana KLCC Premium Resort Complex", rate: "৳9,500 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "Skybridge walking path connects straight to Twin Towers and central park fountains." }
                            ] : activeDes.id === "singapore-guide" ? [
                              { area: "24/7 Bangladeshi Hub (Little India / Farrer Park)", name: "One Farrer Hotel / ibis budget Imperial", rate: "৳7,200 – ৳19,500 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "Steps from 24-hour Mustafa Centre, MRT station, and halal Bangladeshi/Indian dining." },
                              { area: "Halal Heritage Quarter (Bugis / Arab Street)", name: "Village Hotel Bugis & Hotel Boss", rate: "৳10,500 – ৳13,500 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "Walkable to Sultan Mosque, Haji Lane, and Bugis MRT interchange." },
                              { area: "Iconic Waterfront (Marina Bay Sands Zone)", name: "Marina Bay Waterfront Luxury Suites", rate: "৳34,000 / night", star: "⭐ ⭐ ⭐ ⭐ ⭐", linkTip: "Unbeatable views of Gardens by the Bay and nightly Spectra water show." }
                            ] : activeDes.id === "maldives-guide" ? [
                              { area: "Best Budget Island (Maafushi Bikini Beach)", name: "Kaani Palm Beach & Arena Beach Hotel", rate: "৳8,200 – ৳9,800 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "35-min shared speedboat ($25) from airport; $30 snorkeling & sandbank tours daily." },
                              { area: "Airport Road Island (Hulhumalé Beachfront)", name: "h78 at Hulhumale Maldives", rate: "৳6,400 / night", star: "⭐ ⭐ ⭐", linkTip: "Connected to Malé Airport by bridge taxi ($8) — zero speedboat fees required." },
                              { area: "Private Overwater Island (North Malé Atoll)", name: "Cinnamon Dhonveli Water Suites", rate: "৳38,000 / night", star: "⭐ ⭐ ⭐ ⭐ ⭐", linkTip: "Iconic overwater bungalows with all-inclusive halal dining and house reef." }
                            ] : [
                              { area: "Downtown Luxury Skyscrapers (Burj Vista Center)", name: "Rove Downtown Dubai Premium Suites", rate: "৳12,000 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "Stellar views of Burj Khalifa and direct shuttle rides to the Dubai Mall gates." },
                              { area: "Airport Sector & Budget Markets (Deira Creek)", name: "Ibis Styles Dubai Airport Transit Inn", rate: "৳8,500 / night", star: "⭐ ⭐ ⭐", linkTip: "Right beside metro lines; close to traditional gold souks and BDT-friendly diners." },
                              { area: "Beach Side Promenade (Dubai Marina / JBR)", name: "Marina View Deluxe Hotel Apartment", rate: "৳18,000 / night", star: "⭐ ⭐ ⭐ ⭐", linkTip: "High-altitude skyline balconies, private kitchen amenities, and direct yacht harbor lookouts." }
                            ]).map((hotel, index) => (
                              <div key={index} className="bg-white border border-slate-200 hover:border-[#F6B73C] p-5 rounded-2xl shadow-sm flex flex-col justify-between transition-all transform hover:-translate-y-1">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-mono font-bold uppercase bg-slate-100 text-brand-navy px-2 py-0.5 rounded-full">
                                      {hotel.area}
                                    </span>
                                    <span className="text-amber-500 text-xs font-bold leading-none">{hotel.star}</span>
                                  </div>
                                  <h4 className="font-serif font-bold text-sm text-slate-900">{hotel.name}</h4>
                                  <p className="text-[11px] text-slate-500 leading-relaxed font-light">{hotel.linkTip}</p>
                                </div>

                                <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
                                  <div>
                                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Estimate rates</span>
                                    <span className="text-xs font-mono font-bold text-[#F6B73C]">{hotel.rate}</span>
                                  </div>
                                  <button 
                                    onClick={() => triggerAffiliateToast(`Finding the best available rate at ${hotel.name}, ${hotel.area}. Opening booking page...`)}
                                    className="bg-brand-navy hover:bg-[#F6B73C] hover:text-brand-navy text-white font-bold text-[10px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                                  >
                                    Check Rates <ExternalLink size={10} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 🚗 TRAVEL ESSENTIALS & SERVICES (Taxis, eSIMs, Rentals, Activities) */}
                        <TravelEssentials country={activeDes.country} />

                        {/* 6. FLIGHT PRICE / DEAL INSIGHT SECTION */}
                        <div id="dest-flight-insights" className="bg-brand-navy/5 border-l-4 border-[#F6B73C] p-6 rounded-r-2xl space-y-3">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block font-sans">Flight Prices & Timing</span>
                            <h4 className="font-serif text-base font-bold text-brand-navy">Typical Flight Prices (Dhaka to {getCountryCityWithIata(activeDes.country)})</h4>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1">
                              <span className="font-semibold block text-slate-700">📅 Best Months to Book Lower Fares:</span>
                              <p className="text-slate-650 leading-relaxed font-sans">
                                {activeDes.id === "nepal-guide" ? "September & May represent low tourism price cycles." :
                                activeDes.id === "thailand-guide" ? "June & September mark monsoon sales with high airline availability." :
                                activeDes.id === "malaysia-guide" ? "March & October see significant carrier promo codes online." :
                                activeDes.id === "singapore-guide" ? "February–May and July–August offer lower hotel & airfare combinations." :
                                activeDes.id === "maldives-guide" ? "May, October & November shoulder months drop resort & flight rates by 30%." :
                                "July & August are extremely hot but yield major airfare drops."}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <span className="font-semibold block text-slate-700">💰 Return Airfare typical baseline:</span>
                              <span className="text-[#F6B73C] font-mono font-extrabold text-xs block">
                                {activeDes.id === "nepal-guide" ? "৳28,000 – ৳36,000 Return" :
                                activeDes.id === "thailand-guide" ? "৳31,500 – ৳42,000 Return" :
                                activeDes.id === "malaysia-guide" ? "৳36,000 – ৳46,000 Return" :
                                activeDes.id === "singapore-guide" ? "৳42,000 – ৳56,000 Return" :
                                activeDes.id === "maldives-guide" ? "৳46,000 – ৳62,000 Return" :
                                "৳58,000 – ৳72,000 Return"}
                              </span>
                            </div>
                          </div>

                          <div className="bg-white/80 border border-slate-200 p-3.5 rounded-xl text-[11px] text-slate-650 flex items-start gap-2.5">
                            <span className="text-amber-500 mt-0.5 shrink-0">⚠️</span>
                            <span className="font-sans"><b>Alert:</b> {
                              activeDes.id === "nepal-guide" ? "Flights during festivals peak heavily. Book at least 3 weeks in advance!" :
                              activeDes.id === "thailand-guide" ? "Weekend departure prices surge by 20%. Select Tuesday or Wednesday flights." :
                              activeDes.id === "malaysia-guide" ? "Direct Biman or AirAsia paths get booked up. Lock flight slots early for families." :
                              activeDes.id === "singapore-guide" ? "Submit your free SG Arrival Card within 72 hours before departure alongside your printed e-Visa!" :
                              activeDes.id === "maldives-guide" ? "Complete the free IMUGA Traveller Declaration within 96 hours before flying to Malé!" :
                              "Transit-based routes via Muscat are up to BDT 15,000 cheaper than direct options!"
                            }</span>
                          </div>
                        </div>

                        {/* 7. THINGS TO DO SECTION (CONTENT + RETENTION LAYER) */}
                        <div id="dest-things-to-do" className="space-y-4">
                          <h3 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2">Suggested Itinerary</h3>
                          <div className="space-y-6">
                            {activeDes.itinerary.map((dayPlan) => (
                              <div key={dayPlan.day} className="relative pl-8 border-l-2 border-slate-200 ml-4 space-y-2 font-sans">
                                {/* Visual Timeline Bulb */}
                                <div className="absolute -left-3 top-1 w-5.5 h-5.5 rounded-full bg-brand-navy text-white flex items-center justify-center font-mono font-bold text-[10px]">
                                  D{dayPlan.day}
                                </div>
                                <h4 className="font-serif text-base font-bold text-brand-navy">{dayPlan.title}</h4>
                                <ul className="space-y-1.5 text-xs text-slate-650">
                                  {dayPlan.activities.map((act, innerIndex) => (
                                    <li key={innerIndex} className="flex gap-2">
                                      <span className="text-slate-400 font-bold font-mono">▸</span>
                                      <span>{act}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {/* local city transportation hacks */}
                          <div className="space-y-3 bg-slate-50 border border-slate-200 p-5 rounded-2xl mt-4">
                            <h4 className="font-serif font-bold text-sm text-slate-900">Local Inner-City Transport hacks</h4>
                            <ul className="space-y-2 text-xs text-slate-700">
                              {activeDes.localTransport.map((trans, idx) => (
                                <li key={idx} className="flex items-start gap-2.5">
                                  <span className="w-5 h-5 rounded bg-slate-200 text-brand-navy font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">✓</span>
                                  <span>{trans}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* 7B. KKDAY SOUTHEAST ASIA 9.9 SALE FOR THAILAND, MALAYSIA & SINGAPORE */}
                        {(activeDes.id === "thailand" ||
                          activeDes.id === "malaysia" ||
                          activeDes.id === "singapore") && (
                          <KKdayPromoBanner
                            lang={lang}
                            variant="compact"
                            cityContext={activeDes.country}
                          />
                        )}

                        {/* 8. TRAVEL PLANNING CTA SECTION */}
                        <div id="dest-planning-links-hub" className="bg-brand-navy/5 border border-slate-200/60 p-6 rounded-2xl space-y-4 text-center">
                          <div className="space-y-1 max-w-xl mx-auto">
                            <h4 className="font-serif font-bold text-slate-955 text-base">Ready to Book?</h4>
                            <p className="text-xs text-slate-500">Move deeper into our integrated, certified airfare and hotel booking channels to guarantee secure pricing codes.</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold">
                            <button 
                              onClick={() => navigateTo("/flights")} 
                              className="bg-brand-navy text-white hover:bg-slate-800 p-3 rounded-xl transition-colors cursor-pointer"
                            >
                              Find Cheap Flights →
                            </button>
                            <button 
                              onClick={() => navigateTo("/hotels")} 
                              className="bg-brand-navy text-white hover:bg-slate-800 p-3 rounded-xl transition-colors cursor-pointer"
                            >
                              Check Hotel Directories →
                            </button>
                            <button 
                              onClick={() => {
                                navigateTo(`/visa/${getCountryVisaId(activeDes.country)}`);
                              }} 
                              className="bg-[#F6B73C] text-brand-navy hover:bg-[#ffc654] p-3 rounded-xl transition-colors cursor-pointer"
                            >
                              View Visa Guidelines →
                            </button>
                          </div>
                        </div>

                        {/* 9. INTERNAL SEO LINKING SECTION */}
                        <div id="dest-seo-internal" className="border-t border-slate-200 pt-6 space-y-3">
                          <span className="font-mono text-[9px] font-bold text-slate-400 block uppercase tracking-widest text-center font-sans">Other Destinations</span>
                          <div className="flex flex-wrap justify-center items-center gap-2 text-xs">
                            {DESTINATIONS_DATA.filter(d => d.id !== activeDes.id).map((other) => (
                              <button
                                key={other.id}
                                onClick={() => navigateTo(`/destinations/${other.id}`)}
                                className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 transition-all font-sans font-medium"
                              >
                                🌍 {other.country} Outbound Guide
                              </button>
                            ))}
                            <button
                              onClick={() => navigateTo("/visa")}
                              className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 transition-all font-sans font-medium"
                            >
                              🛂 Embassy Visa Center
                            </button>
                            <button
                              onClick={() => navigateTo("/costs")}
                              className="bg-white border border-slate-200 hover:border-[#F6B73C] px-3.5 py-1.5 rounded-full text-slate-700 transition-all font-sans font-medium"
                            >
                              💰 Dual-Currency Costs Analyzer
                            </button>
                          </div>
                        </div>

                        <TravelIntelligence
                          pageTitle={`${activeDes.country} Travel Guide Itinerary`}
                          quickAnswer={activeDes.quickAnswer}
                          keyFacts={activeDes.keyFacts}
                          faqs={activeDes.faqs}
                        />

                      </div>
                    )
                  ;
                })()}
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            💰 VIEW 6: TRIP COSTS ANALYZER (CONVERSION BOOSTER)
        ------------------------------------------------------------- */}
        {section === "costs" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar list */}
            <div className="space-y-4 font-mono uppercase">
              <span className="text-xs font-bold text-slate-500 block font-sans">
                {isBn ? "দেশ অনুযায়ী ট্রিপ বাজেট গাইড" : "TRIP COST GUIDES"}
              </span>
              <div className="space-y-2 text-xs">
                {localizedCosts.map((c) => (
                  <button
                    key={c.id}
                    id={`btn-cost-select-${c.id}`}
                    onClick={() => navigateTo(`/costs/${c.id}`)}
                    className={`w-full text-left p-3.5 rounded-xl border font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      parameterId === c.id
                        ? "bg-brand-navy text-white border-brand-navy shadow-md font-sans"
                        : "bg-white text-slate-705 border-slate-200 hover:bg-slate-50 font-sans"
                    }`}
                  >
                    <span>💰 {isBn ? `${c.country} ভ্রমণ খরচ` : `${c.country} Trip Cost`}</span>
                    <ArrowRight size={12} className={parameterId === c.id ? "text-[#F6B73C]" : "text-slate-450"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Cost View Content Template */}
            <div className="lg:col-span-3 space-y-6">
              {(() => {
                const activeCost = localizedCosts.find(c => c.id === parameterId) || localizedCosts[0];
                return (
                  <div className="space-y-8 animate-fade-in">
                    
                    {/* Header */}
                    <div className="border-b border-slate-200 pb-5">
                      <nav className="text-slate-400 text-[10px] font-mono flex items-center gap-1.5 mb-2 uppercase">
                        <span className="hover:text-slate-750 cursor-pointer" onClick={() => navigateTo("/")}>{isBn ? "হোম" : "Home"}</span>
                        <span>/</span>
                        <span className="hover:text-slate-755 cursor-pointer" onClick={() => navigateTo("/costs")}>{isBn ? "ভ্রমণ খরচ" : "Trip Costs"}</span>
                        <span>/</span>
                        <span className="text-brand-navy font-bold">{activeCost.id}</span>
                      </nav>

                      <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
                        {isBn
                          ? `বাংলাদেশ থেকে ${activeCost.country} ভ্রমণের বিস্তারিত খরচ (BDT বাজেট চার্ট)`
                          : `${activeCost.country} Trip Cost from Bangladesh: Complete Price Matrix`}
                      </h1>
                    </div>

                    {/* AEO Quote */}
                    <div id="cost-aeo-text-box" className="bg-slate-50 border-l-4 border-[#F6B73C] p-5 rounded-r-xl">
                      <span className="text-[10px] font-bold tracking-widest text-brand-navy font-mono block mb-1">
                        {isBn ? "সংক্ষিপ্ত তথ্য (Quick Answer)" : "Quick Answer"}
                      </span>
                      <p className="text-slate-800 text-sm sm:text-[14.5px] font-sans leading-relaxed">
                        {activeCost.quickAnswer}
                      </p>
                    </div>

                    {/* Detailed matrix cost tables */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">
                        <h2 className="font-serif font-black text-lg text-slate-900">
                          {isBn ? "খাতওয়ারী সম্পূর্ণ ভ্রমণ খরচের হিসাব (BDT)" : "Full Trip Cost Breakdown (BDT)"}
                        </h2>
                        <span className="text-xs text-brand-navy bg-emerald-50 border border-emerald-200 font-mono px-3 py-1 rounded">
                          {isBn ? "এক্সচেঞ্জ রেট:" : "Exchange Rate:"} {activeCost.exchangeRateText}
                        </span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                          <thead>
                            <tr className="bg-brand-navy text-white">
                              <th className="p-4 font-serif font-bold">{isBn ? "খরচের খাত" : "What You'll Spend On"}</th>
                              <th className="p-4 font-mono font-bold">{isBn ? "বাজেট (Budget)" : "Budget"}</th>
                              <th className="p-4 font-mono font-bold">{isBn ? "মিড-রেঞ্জ (Mid-Range)" : "Mid-Range"}</th>
                              <th className="p-4 font-mono font-bold">{isBn ? "লাক্সারি (Luxury)" : "Luxury"}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {activeCost.categories.map((cat, idx) => (
                              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-medium text-slate-800">{cat.name}</td>
                                <td className="p-4 font-mono text-emerald-650 font-bold">৳ {cat.lowBdt.toLocaleString()}</td>
                                <td className="p-4 font-mono text-indigo-700 font-bold">৳ {cat.midBdt.toLocaleString()}</td>
                                <td className="p-4 font-mono text-amber-700 font-bold">৳ {cat.highBdt.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Unified Conversion Widgets Block */}
                      <div className="space-y-6 mt-6">
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono block">
                            {isBn ? `ঢাকা থেকে ${activeCost.country} ফ্লাইটের আজকের ভাড়া দেখুন` : `Check today's flight prices from Dhaka to ${activeCost.country}`}
                          </span>
                          <TravelpayoutsEmbed
                            defaultDestination={getCountryIata(activeCost.country)}
                          />
                        </div>

                        <TravelEssentials
                          country={activeCost.country}
                          defaultTab="transfers"
                          compactHeader
                          lang={lang}
                        />
                      </div>
                    </div>

                    {/* Seasonal variations description */}
                    <div className="bg-slate-50 border border-slate-205 p-6 rounded-xl space-y-2">
                      <h4 className="font-serif font-black text-base text-slate-900">
                        {isBn ? "মৌসুম অনুযায়ী খরচের তারতম্য" : "How Prices Change by Season"}
                      </h4>
                      <p className="text-sm leading-relaxed text-slate-700 font-sans">
                        {activeCost.seasonalVariation}
                      </p>
                    </div>

                    {/* Money-saving hacks */}
                    <div className="space-y-4">
                      <h3 className="font-serif font-black text-lg text-brand-navy">
                        {isBn ? "খরচ কমানোর পরীক্ষিত কৌশল" : "Tips to Spend Less"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activeCost.moneyHacks.map((hack, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-2">
                            <span className="text-[10px] uppercase tracking-widest font-mono text-[#F6B73C] font-bold">
                              {isBn ? `টিপস #${idx + 1}` : `Tip ${idx + 1}`}
                            </span>
                            <p className="text-sm text-slate-700 leading-relaxed font-sans">{hack}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Internal link graphs */}
                    <div id="cost-internal-loop" className="bg-brand-navy/5 border border-brand-navy/15 p-5 rounded-xl space-y-3">
                      <span className="text-[10px] font-bold text-brand-navy font-mono tracking-widest uppercase block">
                        {isBn ? "এই ট্রিপের অন্যান্য গাইড" : "Also Plan For This Trip"}
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold font-mono">
                        <button
                          id={`lnk-view-visa-from-cost-${activeCost.id}`}
                          onClick={() => {
                            navigateTo(`/visa/${getCountryVisaId(activeCost.country)}`);
                          }}
                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🛂 {isBn ? "ভিসা চেকলিস্ট দেখুন" : "Passport Visa Checklist"} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-dest-from-cost-${activeCost.id}`}
                          onClick={() => {
                            navigateTo(`/destinations/${getCountryDestId(activeCost.country)}`);
                          }}
                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🌍 {isBn ? "ট্যুর আইটিনারারি দেখুন" : "View Travel Itinerary"} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                        <button
                          id={`lnk-view-hotel-from-cost-${activeCost.id}`}
                          onClick={() => {
                            navigateTo(`/hotels/${getCountryHotelId(activeCost.country)}`);
                          }}
                          className="flex items-center gap-2 text-brand-navy hover:text-[#F6B73C] p-3 bg-white border border-slate-200 rounded-lg text-left shadow-sm"
                        >
                          🏨 {isBn ? "সেরা হোটেল জোন" : "Curated Area Stays"} <ArrowRight size={12} className="ml-auto text-[#F6B73C]" />
                        </button>
                      </div>
                    </div>

                    <InteractiveTools />

                    <TravelIntelligence
                      pageTitle={isBn ? `${activeCost.country} ভ্রমণের খরচের হিসাব` : `${activeCost.country} Trip Cost calculations`}
                      quickAnswer={activeCost.quickAnswer}
                      keyFacts={activeCost.keyFacts}
                      faqs={activeCost.faqs}
                    />

                  </div>
                );
              })()}
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            🧰 VIEW 7: TRAVEL DATA UTILITY DESK
        ------------------------------------------------------------- */}
        {section === "tools" && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900">
                {isBn ? "বাংলাদেশি ভ্রমণকারীদের জন্য স্মার্ট ট্রাভেল টুলস" : "Outbound Travel Tools Workspace"}
              </h1>
              <p className="text-xs text-slate-500 font-mono">
                {isBn ? "BDT কারেন্সি কনভার্টার, ইমিগ্রেশন চেকলিস্ট এবং জরুরি ট্রাভেল ইউটিলিটি।" : "Dynamic calculators constructed specifically for South Asian travelers."}
              </p>
            </div>
            
            <InteractiveTools />

            {isAdmin && <TravelpayoutsOnboarding />}

            {/* Book Your Trip - Visual Step-by-Step Booking Checklist Funnel */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-8 mt-8">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="font-serif text-xl font-bold text-slate-900">
                  {isBn ? "ধাপে ধাপে আপনার ট্রিপ বুক করুন" : "Book Your Trip"}
                </h2>
                <p className="text-sm text-slate-500">
                  {isBn
                    ? "বাংলাদেশ থেকে বিদেশ ভ্রমণের জন্য ৪ ধাপে সম্পূর্ণ বুকিং চেকলিস্ট।"
                    : "Your step-by-step planning and conversion dashboard built for outbound trips from Bangladesh."}
                </p>
              </div>

              <div className="space-y-8 divide-y divide-slate-100">
                {/* Step 1 */}
                <div className="space-y-4 pt-0">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-navy text-white font-mono text-sm font-bold shadow-sm">
                      1
                    </div>
                    <h3 className="font-serif text-base font-bold text-brand-navy">
                      {isBn ? "ধাপ ১: আপনার ফ্লাইট খুঁজুন" : "Step 1: Find your flight"}
                    </h3>
                  </div>
                  <div className="pl-0 sm:pl-11">
                    <TravelpayoutsEmbed />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-4 pt-8">
                  <div className="flex items-center gap-3 font-medium">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-navy text-white font-mono text-sm font-bold shadow-sm">
                      2
                    </div>
                    <h3 className="font-serif text-base font-bold text-brand-navy">
                      {isBn ? "ধাপ ২: আপনার হোটেল বুক করুন" : "Step 2: Book your hotel"}
                    </h3>
                  </div>
                  <div className="pl-0 sm:pl-11">
                    <TravelpayoutsCustomWidget initialTab="hotels" />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="space-y-4 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-navy text-white font-mono text-sm font-bold shadow-sm">
                      3
                    </div>
                    <h3 className="font-serif text-base font-bold text-brand-navy">
                      {isBn ? "ধাপ ৩: Klook-এ ট্যুর ও অ্যাক্টিভিটি বুক করুন" : "Step 3: Plan activities with Klook"}
                    </h3>
                  </div>
                  <div className="pl-0 sm:pl-11">
                    <KlookActivitiesWidget />
                  </div>
                </div>

                {/* Step 4 */}
                <div className="space-y-4 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-navy text-white font-mono text-sm font-bold shadow-sm">
                      4
                    </div>
                    <h3 className="font-serif text-base font-bold text-brand-navy">
                      {isBn ? "ধাপ ৪: ট্রাভেল eSIM সংগ্রহ করুন" : "Step 4: Get your travel eSIM"}
                    </h3>
                  </div>
                  <div className="pl-0 sm:pl-11">
                    <AiraloEsimWidget />
                  </div>
                </div>
              </div>
            </div>

            {/* Traveler Utility Desk FAQs & Travel Intelligence */}
            <TravelIntelligence
              pageTitle={isBn ? "বাংলাদেশি ভ্রমণকারীদের ট্রাভেল টুলস" : "Bangladeshi Traveler Utility Tools"}
              quickAnswer={
                isBn
                  ? "আমাদের ট্রাভেল টুলস ড্যাশবোর্ডে বাংলাদেশি ভ্রমণকারীদের জন্য রয়েছে লাইভ BDT কারেন্সি কনভার্টার, বিভিন্ন দেশের পাওয়ার প্লাগ ও অ্যাডাপ্টার গাইড (Type C, D, G), ঢাকা এয়ারপোর্ট ইমিগ্রেশন চেকলিস্ট এবং জরুরি বিদেশি ভাষার ফ্রেজবুক।"
                  : "Our travel tool suite equips outbound tourists from Bangladesh with live mid-market exchange rate calculators, comprehensive plug type adapters (Type C, D, G) by destination, an interactive packing checklist for Dhaka airport immigration, and essential phrases in Thai, Malay, Nepali, and Arabic."
              }
              keyFacts={[
                { label: isBn ? "কারেন্সি রেট" : "Currency Rates", value: "Mid-Market BDT Live Tracker" },
                { label: isBn ? "বার্ষিক এন্ডোর্সমেন্ট কোটা" : "Annual FX Quota", value: "$12,000 USD / Adult Passport" },
                { label: isBn ? "প্লাগ সাপোর্ট" : "Plug Compatibility", value: "Type C/D (Nepal), A/B (Thailand), G (MY/UAE)" },
                { label: isBn ? "ইমিগ্রেশন প্যাক" : "Immigration Pack", value: "Passport + Ticket + Hotel + Solvency" }
              ]}
              faqs={SERVICE_TOOLS_FAQS}
            />
          </div>
        )}

        {/* -------------------------------------------------------------
            📰 VIEW 8: BLOG INTEL HUB (DIRECTORY LANDING VS. DEDICATED ARTICLE PAGE)
        ------------------------------------------------------------- */}
        {section === "blog" && isLanding && (
          <div className="space-y-12 animate-fade-in">
            {/* 1. FULL-WIDTH EDGE-TO-EDGE HERO IMAGE WITH H1 HEADER & SHORT DESCRIPTION */}
            <section
              aria-labelledby="blog-hero-h1"
              className="w-screen relative left-1/2 -translate-x-1/2 -mt-6 sm:-mt-8 bg-brand-navy text-white overflow-hidden border-b border-slate-800 shadow-xl"
            >
              <div className="absolute inset-0">
                <img
                  {...getResponsiveImageProps(blogHeroBannerImg, "100vw")}
                  alt=""
                  aria-hidden={true}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-center opacity-45 pointer-events-none"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(105deg, rgba(11,22,40,0.96) 0%, rgba(16,42,67,0.86) 55%, rgba(11,22,40,0.72) 100%)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-brand-navy/40" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
                <div className="max-w-4xl space-y-5">
                  <nav
                    aria-label="Breadcrumb"
                    className="text-slate-300 text-xs flex flex-wrap items-center gap-2 font-mono"
                  >
                    <button
                      type="button"
                      onClick={() => navigateTo("/")}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      {isBn ? "হোম (Home)" : "Home"}
                    </button>
                    <span aria-hidden="true">/</span>
                    <span className="text-[#F6B73C] font-semibold">
                      {isBn ? "ট্রাভেল ব্লগ ও গাইড (Travel Blog)" : "Travel Guides & Blog"}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="bg-white/10 text-white/90 px-2.5 py-0.5 rounded-md border border-white/15">
                      {isBn
                        ? `${localizedBlogs.length}টি বিস্তারিত গাইড`
                        : `${localizedBlogs.length} Travel Guides`}
                    </span>
                  </nav>

                  <h1
                    id="blog-hero-h1"
                    className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12] text-balance"
                  >
                    {isBn
                      ? "বাংলাদেশি ভ্রমণকারীদের জন্য Travel Guide, Hajj ও Umrah প্রস্তুতি এবং BDT বাজেট প্ল্যান"
                      : "Bangladesh Outbound Travel Blog: Visa Checklists, DIY Umrah & BDT Trip Guides"}
                  </h1>

                  <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-3xl">
                    {isBn
                      ? "বাংলাদেশি পাসপোর্টধারীদের জন্য সহজ বাংলায় তৈরি ধাপে ধাপে গাইড—সরকারি নিয়মে Hajj রেজিস্ট্রেশন, Nusuk App দিয়ে DIY Umrah, Dual-Currency Card Endorsement, Dhaka Airport Immigration চেকলিস্ট এবং কম খরচে ফ্যামিলি ট্যুর পরিকল্পনা।"
                      : "Step-by-step editorial playbooks researched for Bangladeshi passport holders—covering DIY Umrah with the Nusuk app, dual-currency card endorsement, Dhaka Airport immigration checklists, and BDT destination budgets."}
                  </p>
                </div>
              </div>
            </section>

            {/* 2. INTERACTIVE CATEGORY FILTER TABS & SEARCH BAR */}
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div
                  role="tablist"
                  aria-label="Filter travel guides by topic"
                  className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 p-1.5 bg-slate-200/75 rounded-xl"
                >
                  {[
                    {
                      id: "all",
                      label: isBn
                        ? `সব গাইড (${localizedBlogs.length})`
                        : `All Guides (${localizedBlogs.length})`,
                    },
                    {
                      id: "Hajj & Umrah",
                      label: isBn
                        ? `হজ্জ ও ওমরাহ (${localizedBlogs.filter((b) => b.category === "Hajj & Umrah").length})`
                        : `Hajj & Umrah (${localizedBlogs.filter((b) => b.category === "Hajj & Umrah").length})`,
                    },
                    {
                      id: "Ziyarah & Stopovers",
                      label: isBn
                        ? `জিয়ারত ও স্টপওভার (${localizedBlogs.filter((b) => b.category === "Ziyarah & Stopovers").length})`
                        : `Ziyarah & Stopovers (${localizedBlogs.filter((b) => b.category === "Ziyarah & Stopovers").length})`,
                    },
                    {
                      id: "Visa & Immigration",
                      label: isBn ? "ভিসা ও ইমিগ্রেশন (3)" : "Visa & Immigration (3)",
                    },
                    {
                      id: "Banking & Payments",
                      label: isBn ? "ডুয়াল-কারেন্সি কার্ড ও BDT (1)" : "Card Endorsement & BDT (1)",
                    },
                    {
                      id: "Family & Budget",
                      label: isBn ? "ফ্যামিলি ও বাজেট ট্রিপ (3)" : "Family & Budget Trips (3)",
                    },
                    {
                      id: "Flights, Hotels & Food",
                      label: isBn
                        ? "ফ্লাইট, হোটেল ও হালাল খাবার (3)"
                        : "Flights, Hotels & Halal Food (3)",
                    },
                  ].map((tab) => {
                    const isActive = blogCategoryFilter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setBlogCategoryFilter(tab.id)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          isActive
                            ? "bg-brand-navy text-white shadow-xs"
                            : "text-slate-700 hover:text-slate-900 hover:bg-white/60"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div className="relative w-full lg:w-72 shrink-0">
                  <input
                    type="search"
                    value={blogSearchQuery}
                    onChange={(e) => setBlogSearchQuery(e.target.value)}
                    placeholder={
                      isBn
                        ? "Umrah, Card, Nepal, Visa লিখে খুঁজুন..."
                        : "Search Umrah, card, Nepal, visa..."
                    }
                    aria-label="Search blog guides"
                    className="w-full bg-white border border-slate-200 focus:border-brand-navy rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none transition-colors"
                  />
                  {blogSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setBlogSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      {isBn ? "মুছুন" : "Clear"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 3. 3-CARDS-PER-ROW BLOG GRID (UNIQUE THUMBNAIL + DARK H2 TITLE + ~50-WORD AEO SNIPPET + 'READ FULL BLOG' BUTTON) */}
            {(() => {
              const orderedBlogs = [
                ...localizedBlogs.filter((b) => b.category === "Hajj & Umrah"),
                ...localizedBlogs.filter((b) => b.category === "Ziyarah & Stopovers"),
                ...localizedBlogs.filter((b) => b.category !== "Hajj & Umrah" && b.category !== "Ziyarah & Stopovers"),
              ];

              const filteredBlogs = orderedBlogs.filter((post) => {
                const matchesCategory =
                  blogCategoryFilter === "all"
                    ? true
                    : blogCategoryFilter === "Flights, Hotels & Food"
                    ? ["Cheap Flight Tips", "Hotel Savings", "Food & Culture"].includes(post.category)
                    : post.category === blogCategoryFilter;

                const q = blogSearchQuery.trim().toLowerCase();
                const matchesQuery =
                  !q ||
                  post.title.toLowerCase().includes(q) ||
                  post.summary.toLowerCase().includes(q) ||
                  post.category.toLowerCase().includes(q);

                return matchesCategory && matchesQuery;
              });

              if (filteredBlogs.length === 0) {
                return (
                  <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
                    <h3 className="font-serif text-[20px] font-bold text-brand-navy">
                      {isBn ? "কোনো ট্রাভেল গাইড খুঁজে পাওয়া যায়নি" : "No matching travel guides found"}
                    </h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      {isBn
                        ? "অনুগ্রহ করে অন্য শব্দ দিয়ে খুঁজুন অথবা সব গাইড দেখতে নিচের বাটনে ক্লিক করুন।"
                        : "Try clearing your search filter or switching back to All Guides to browse our complete library of Bangladeshi travel guides."}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setBlogCategoryFilter("all");
                        setBlogSearchQuery("");
                      }}
                      className="bg-brand-navy text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer"
                    >
                      {isBn
                        ? `সবগুলো গাইড দেখুন (${localizedBlogs.length})`
                        : `Show All ${localizedBlogs.length} Guides`}
                    </button>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {filteredBlogs.map((post) => {
                    const coverImg = getBlogCoverImage(post.slug);
                    const aeoSnippet50Words = getBlogAeoSnippet50Words(post.slug, isBn, post.summary);

                    return (
                      <article
                        key={post.id}
                        onClick={() => navigateTo(`/blog/${post.slug}`)}
                        className="group bg-white border border-slate-200/90 hover:border-[#F6B73C] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
                      >
                        <div className="flex flex-col">
                          {/* Unique Card Thumbnail Image */}
                          <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                            <img
                              {...getResponsiveImageProps(
                                coverImg,
                                "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw",
                              )}
                              alt={getBlogImageAltText(post.slug)}
                              loading="lazy"
                              fetchPriority="low"
                              decoding="async"
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-white/95 font-medium">
                              <span className="bg-brand-navy/85 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-white/15">
                                {post.category}
                              </span>
                              <span className="font-mono">{post.readTime}</span>
                            </div>
                          </div>

                          {/* Card Body: Metadata + Dark H2 Title (20px-22px) + ~50-Word AEO Main Snippet (14px) */}
                          <div className="p-6 space-y-3">
                            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                              <span>{post.date}</span>
                              <span aria-hidden="true">·</span>
                              <span>
                                {isBn
                                  ? `লেখক: ${post.author.split(" (")[0]}`
                                  : `By ${post.author.split(" (")[0]}`}
                              </span>
                            </div>

                            <h2 className="font-serif text-[20px] sm:text-[22px] font-bold text-brand-navy group-hover:text-brand-emerald leading-[1.3] text-balance">
                              {post.title}
                            </h2>

                            <p className="text-[14px] text-slate-700 leading-[1.65]">
                              {aeoSnippet50Words}
                            </p>
                          </div>
                        </div>

                        {/* Card Footer: 'Read Full Blog' Button */}
                        <div className="px-6 pb-6 pt-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateTo(`/blog/${post.slug}`);
                            }}
                            className="w-full bg-brand-navy group-hover:bg-[#F6B73C] text-white group-hover:text-brand-navy font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-between cursor-pointer"
                          >
                            <span>{isBn ? "সম্পূর্ণ ব্লগ পড়ুন · Read Full Blog" : "Read Full Blog"}</span>
                            <ArrowRight size={14} className="text-[#F6B73C] group-hover:text-brand-navy transition-transform group-hover:translate-x-0.5" />
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              );
            })()}

            {/* Admin-Only SEO Matrix (Hidden from regular site visitors) */}
            {isAdmin && <TopicalAuthorityBlueprint lang={lang} onNavigate={navigateTo} />}

            {/* 4. SMART CONVERSION WIDGETS SECTION ON BLOG DIRECTORY PAGE */}
            <div className="pt-8 border-t border-slate-200 space-y-8">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-brand-navy">
                      {isBn
                        ? "লাইভ Flight ও Umrah রুটের ভাড়া তুলনা"
                        : "Live Airfare & Umrah Route Comparison"}
                    </div>
                    <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-brand-navy">
                      {isBn
                        ? "ঢাকা (DAC) থেকে ফ্লাইটের সর্বনিম্ন ভাড়া যাচাই করুন"
                        : "Compare Flights from Dhaka (DAC) While You Plan"}
                    </h2>
                    <p className="text-xs text-slate-600">
                      {isBn
                        ? "Jeddah, Madinah, Kathmandu, Bangkok, Kuala Lumpur, Singapore, Malé ও Dubai-এর লাইভ ভাড়া দেখুন—অথবা Dual-Currency Card না থাকলে আমাদের WhatsApp BDT ডেস্কে মেসেজ দিন।"
                        : "Search live fares to Jeddah, Madinah, Kathmandu, Bangkok, Kuala Lumpur, Singapore, Malé, and Dubai—or message our WhatsApp BDT Desk if you don't have a dual-currency card yet."}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo("/contact")}
                    className="self-start sm:self-end text-xs font-semibold text-brand-navy hover:underline inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
                  >
                    <span>
                      {isBn
                        ? "BDT-তে টিকিট ও হোটেল বুকিং সহায়তা"
                        : "Need BDT Booking Help? Contact Desk"}
                    </span>
                    <ArrowRight size={12} />
                  </button>
                </div>
                <TravelpayoutsEmbed defaultDestination="JED" />
              </div>

              <TravelEssentials country="Saudi Arabia & Asia" defaultTab="transfers" compactHeader lang={lang} />

              <TravelIntelligence
                pageTitle={
                  isBn
                    ? "বাংলাদেশ থেকে Hajj, Umrah ও বিদেশ ভ্রমণের প্রস্তুতি — সাধারণ প্রশ্নোত্তর (FAQ)"
                    : "Hajj, Umrah & Outbound Preparation from Bangladesh — Verified FAQs"
                }
                quickAnswer={
                  isBn
                    ? "বাংলাদেশি নাগরিকদের ফরজ Hajj-এর জন্য অবশ্যই ধর্ম মন্ত্রণালয়ের পোর্টাল (hajj.gov.bd)-এ নিবন্ধন করতে হবে। তবে বছরের যেকোনো সময় ৯০ দিনের Umrah e-Visa, ৯৬ ঘণ্টার Saudia/Flynas Stopover Visa অথবা US/UK/Schengen ভিসাধারীদের অনলাইন e-Visa এবং Nusuk App ব্যবহার করে নিজে নিজে কম খরচে DIY Umrah পালন করা যায়।"
                    : "Bangladeshi citizens must register via hajj.gov.bd for obligatory Hajj, while year-round Umrah can be planned independently using a 90-day Umrah e-Visa, a 96-hour Saudia/Flynas Stopover Visa, or a qualified US/UK/Schengen holder e-Visa, paired with the official Nusuk and Saudi Visa Bio apps."
                }
                keyFacts={[
                  {
                    label: isBn ? "Umrah e-Visa খরচ" : "Umrah e-Visa Cost",
                    value: isBn ? "BDT 15,500 – 19,500 (২–৫ দিন)" : "BDT 15,500 – 19,500 (2–5 Days)",
                  },
                  {
                    label: isBn ? "১০ দিনের DIY Umrah বাজেট" : "10-Day DIY Umrah Budget",
                    value: isBn ? "BDT 1,16,000 – 1,32,000 / জন" : "BDT 1,16,000 – 1,32,000 / Person",
                  },
                  {
                    label: isBn ? "বার্ষিক Card FX কোটা" : "Annual Card FX Quota",
                    value: "$12,000 USD / Adult Passport",
                  },
                  {
                    label: isBn ? "বাধ্যতামূলক Umrah অ্যাপ" : "Mandatory Umrah Apps",
                    value: "Saudi Visa Bio + Nusuk (nusuk.sa)",
                  },
                ]}
                faqs={localizedHajjFaqs}
              />
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            📖 DEDICATED SINGLE BLOG POST PAGE (/blog/...)
        ------------------------------------------------------------- */}
        {section === "blog" && !isLanding && (
          <div className="space-y-8 animate-fade-in">
            {(() => {
              const activePost = localizedBlogs.find((p) => p.slug === parameterId) || localizedBlogs[0];
              const activeCoverImg = getBlogCoverImage(activePost.slug);
              const sameCategoryPosts = localizedBlogs.filter(
                (p) => p.slug !== activePost.slug && p.category === activePost.category
              );
              const otherCategoryPosts = localizedBlogs.filter(
                (p) => p.slug !== activePost.slug && p.category !== activePost.category
              );
              const relatedPosts = [...sameCategoryPosts, ...otherCategoryPosts].slice(0, 3);

              // First-Occurrence Semantic Contextual Internal Linker (Nathan Gotch / Koray Tugberk Silo Rule)
              // Ensures each target URL is linked at most ONCE inside the article body (no spammy duplicate links, no self-links)
              const usedInternalPaths = new Set<string>();
              const currentBlogPath = `/blog/${activePost.slug}`;

              const CONTEXTUAL_INTERNAL_LINK_RULES: { pattern: RegExp; path: string; title: string }[] = [
                {
                  pattern: /\b(Nusuk App|Nusuk portal|Rawdah Shareef permit|Riyazul Jannah|রিয়াজুল জান্নাত|Nusuk অ্যাপ)\b/i,
                  path: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit",
                  title: "Nusuk App & Rawdah Shareef Permit Step-by-Step Guide",
                },
                {
                  pattern: /\b(96-Hour Saudi Stopover Visa|Saudi Stopover Visa|৯৬ ঘণ্টার Saudi Stopover Visa|স্টপওভার ভিসা)\b/i,
                  path: "/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah",
                  title: "96-Hour Saudi Stopover Visa Guide for Bangladeshis",
                },
                {
                  pattern: /\b(Haramain Bullet Train|Haramain High-Speed Train|Jabal Omar|Mahbas Al Jin|হারামাইন বুলেট ট্রেন)\b/i,
                  path: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh",
                  title: "Makkah & Madinah Hotel Zones & Haramain Bullet Train Guide",
                },
                {
                  pattern: /\b(Open-Jaw|Multi-City ticket|মাল্টি-সিটি টিকিট|Open-Jaw Flight)\b/i,
                  path: "/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia",
                  title: "Dhaka to Jeddah & Madinah Open-Jaw Flight Strategy",
                },
                {
                  pattern: /\b(Dual-Currency Card|passport dollar endorsement|\$12,000 annual travel quota|ডুয়াল-কারেন্সি কার্ড|ডলার এনডোর্সমেন্ট)\b/i,
                  path: "/blog/dual-currency-card-endorsement-bangladesh",
                  title: "Dual-Currency Card & $12,000 Passport Endorsement Guide",
                },
                {
                  pattern: /\b(elderly parents|electric scooter|wheelchair assistance|বয়স্ক মা-বাবা|ইলেকট্রিক স্কুটার)\b/i,
                  path: "/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide",
                  title: "Performing Umrah with Elderly Parents from Bangladesh",
                },
                {
                  pattern: /\b(Ladies' Gates 25–29|Northern Gates 25 to 29|without a male Mahram|মাহরাম ছাড়া)\b/i,
                  path: "/blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates",
                  title: "Umrah Rules for Bangladeshi Women & Ladies' Gates 25–29",
                },
                {
                  pattern: /\b(Miqat Qarn al-Manazil|wear Ihram|ইহরাম বাঁধার নিয়ম|মিকাত)\b/i,
                  path: "/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules",
                  title: "Wearing Ihram from Dhaka Airport vs. Transit Flight Miqat Guide",
                },
                {
                  pattern: /\b(5-liter sealed Zamzam|Zamzam carton|Ajwa dates|জমজম বক্স|আজওয়া খেজুর)\b/i,
                  path: "/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport",
                  title: "Official Zamzam Water, Dates & Gold Customs Rules",
                },
                {
                  pattern: /\b(Masjid Quba|Mount Uhud|Taif day trip|Hira Cultural District|মসজিদে কুবা|তায়েফ ডে-ট্রিপ)\b/i,
                  path: "/blog/makkah-madinah-badr-taif-historical-ziyarah-taxi-guide",
                  title: "Complete Makkah, Madinah, Badr & Taif Ziyarah Guide",
                },
                {
                  pattern: /\b(Sheikh Zayed Grand Mosque|Qasr Al Watan|শেখ জায়েদ গ্র্যান্ড মসজিদ)\b/i,
                  path: "/blog/abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide",
                  title: "Abu Dhabi Sheikh Zayed Mosque & Qasr Al Watan Day Trip Guide",
                },
                {
                  pattern: /\b(Putrajaya Pink Mosque|Masjid Putra|Islamic Arts Museum Malaysia|পুত্রজায়া পিঙ্ক মসজিদ)\b/i,
                  path: "/blog/malaysia-islamic-heritage-putrajaya-halal-family-tour-guide",
                  title: "Malaysia Islamic Heritage & Putrajaya Halal Family Guide",
                },
                {
                  pattern: /\b(Skip-the-Line|Louvre Museum|Colosseum|স্কিপ-দ্য-লাইন)\b/i,
                  path: "/blog/europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide",
                  title: "Europe, UK & USA Sightseeing Skip-the-Line & Stopover Umrah Guide",
                },
                {
                  pattern: /\b(Islamic Dual-Currency|Shariah-Compliant|Khidmah Card|Riba-Free|ইসলামিক ডুয়াল-কারেন্সি|শরীয়াহ-সম্মত)\b/i,
                  path: "/blog/shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah",
                  title: "Best Shariah-Compliant Islamic Dual-Currency Cards in Bangladesh",
                },
                {
                  pattern: /\b(RFCD Account|Resident Foreign Currency Deposit|\$300 single-transaction|RFCD একাউন্ট|\$300 ক্যাপ)\b/i,
                  path: "/blog/rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix",
                  title: "RFCD Account vs. Regular Travel Quota ($300 Cap Solution)",
                },
                {
                  pattern: /\b(bKash|Nagad|BDT Support Desk|local bank transfer|বিকাশ|নগদে পেমেন্ট)\b/i,
                  path: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card",
                  title: "How to Book Flights & Makkah Hotels in BDT via bKash/Bank Transfer",
                },
                {
                  pattern: /\b(Dynamic Currency Conversion|5% DCC|SuperRich|ডাবল কনভার্সন|DCC চার্জ)\b/i,
                  path: "/blog/cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide",
                  title: "Cash SAR / USD vs. Dual-Currency Card & Avoiding 5% DCC Fees",
                },
                {
                  pattern: /\b(thaievisa\.go\.th|Thailand e-Visa|Thailand Tourist Visa|থাইল্যান্ড ই-ভিসা)\b/i,
                  path: "/blog/thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide",
                  title: "Thailand Official e-Visa Guide from Bangladesh (thaievisa.go.th)",
                },
                {
                  pattern: /\b(Malaysia Digital Arrival Card|MDAC|malaysiavisa\.imi\.gov\.my|মালয়েশিয়া ই-ভিসা)\b/i,
                  path: "/blog/malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration",
                  title: "Malaysia Online e-Visa & Free MDAC Arrival Card Guide",
                },
                {
                  pattern: /\b(Form V39A|Letter of Introduction|Authorized Visa Agent|সিঙ্গাপুর ভিসা)\b/i,
                  path: "/blog/singapore-visa-guide-bangladesh-agents",
                  title: "Singapore Tourist Visa Guide from Bangladesh (LOI Form V39A)",
                },
                {
                  pattern: /\b(Travel History Ladder|Fresh Passport|blank passport|নতুন পাসপোর্টে|ট্রাভেল হিস্ট্রি)\b/i,
                  path: "/blog/fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia",
                  title: "First International Trip on a Fresh Bangladeshi Passport (3-Step Ladder)",
                },
                {
                  pattern: /\b(SimplyGo|Mustafa Centre|Gardens by the Bay|Sentosa|সিঙ্গাপুর MRT)\b/i,
                  path: "/blog/singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide",
                  title: "Singapore 4-Day Budget Itinerary from Dhaka (MRT SimplyGo & Halal Food)",
                },
                {
                  pattern: /\b(Bumrungrad|Bangkok Hospital|Samitivej|Medical Check-Up|বামরুনগ্রাদ|মেডিকেল ভিসা)\b/i,
                  path: "/blog/bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh",
                  title: "Bangkok Medical Check-Up & Hospital Guide from Bangladesh (Bumrungrad & Bangkok Hospital)",
                },
                {
                  pattern: /\b(Airalo|Travel eSIM|Schengen Travel Insurance|ট্রাভেল ই-সিম|ট্রাভেল ইন্স্যুরেন্স)\b/i,
                  path: "/blog/best-travel-esim-and-schengen-travel-insurance-bangladesh-guide",
                  title: "Best Travel eSIM (Airalo) & Overseas Medical Insurance from Bangladesh",
                },
                {
                  pattern: /\b(Sri Lanka ETA|Nine Arch Bridge|Nuwara Eliya|শ্রীলঙ্কা ভ্রমণ|শ্রীলঙ্কা ভিসা)\b/i,
                  path: "/blog/sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost",
                  title: "Sri Lanka 6-Day Budget Tour from Bangladesh (ETA Visa, Kandy & Ella Train)",
                },
                {
                  pattern: /\b(epassport\.gov\.bd|e-Passport Renewal|Super Express Passport|ই-পাসপোর্ট রিনিউ|৬৪ পৃষ্ঠার পাসপোর্ট)\b/i,
                  path: "/blog/bangladesh-epassport-application-renewal-64-districts-fee-guide",
                  title: "Bangladesh e-Passport Application & Urgent Renewal Guide (All 64 Districts)",
                },
                {
                  pattern: /\b(AirHelp|EC 261\/2004|PIR Report|Flight Delay Compensation|ফ্লাইট ডিলে ক্ষতিপূরণ)\b/i,
                  path: "/blog/flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp",
                  title: "Flight Delay, Cancellation & Lost Baggage Compensation Guide for Bangladeshis",
                },
                {
                  pattern: /\b(Biman vs\.? Saudia|46kg Baggage|২x২৩ কেজি|বিমান বনাম সৌদিয়া)\b/i,
                  path: "/blog/top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla",
                  title: "Best Airlines Flying from Dhaka Compared (Biman, Saudia, Emirates, Qatar & Baggage Rules)",
                },
                {
                  pattern: /\b(Dhaka Airport emigration|NOC|Government Order|ইমিগ্রেশন)\b/i,
                  path: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go",
                  title: "Dhaka Airport Outbound Immigration Checklist (NOC & GO Rules)",
                },
                {
                  pattern: /\b(DIY Umrah|10-day DIY Umrah|নিজে নিজে ওমরাহ)\b/i,
                  path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost",
                  title: "DIY Umrah & Hajj Preparation from Bangladesh (10-Day BDT Budget)",
                },
              ];

              const injectContextualInternalLink = (textSegment: string, keyPrefix: string): React.ReactNode => {
                if (usedInternalPaths.size >= 6) return textSegment;
                for (const rule of CONTEXTUAL_INTERNAL_LINK_RULES) {
                  if (rule.path === currentBlogPath || usedInternalPaths.has(rule.path)) continue;
                  const match = rule.pattern.exec(textSegment);
                  if (match && match.index !== undefined) {
                    const matchedWord = match[0];
                    const before = textSegment.slice(0, match.index);
                    const after = textSegment.slice(match.index + matchedWord.length);
                    usedInternalPaths.add(rule.path);
                    return (
                      <React.Fragment key={keyPrefix}>
                        {before}
                        <a
                          href={rule.path}
                          title={rule.title}
                          onClick={(e) => {
                            e.preventDefault();
                            navigateTo(rule.path);
                          }}
                          className="text-brand-navy font-semibold underline decoration-[#D4941A] decoration-2 underline-offset-3 hover:text-brand-emerald transition-colors cursor-pointer"
                        >
                          {matchedWord}
                        </a>
                        {after}
                      </React.Fragment>
                    );
                  }
                }
                return textSegment;
              };

              const renderFormattedText = (rawText: string) => {
                const parts = rawText.split(/(\*\*[^*]+\*\*)/g);
                return parts.map((part, pIdx) => {
                  if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
                    const boldInner = part.slice(2, -2);
                    return (
                      <strong key={pIdx} className="font-semibold text-brand-navy">
                        {injectContextualInternalLink(boldInner, `bold-${pIdx}`)}
                      </strong>
                    );
                  }
                  return <React.Fragment key={pIdx}>{injectContextualInternalLink(part, `txt-${pIdx}`)}</React.Fragment>;
                });
              };

              const officialGovSources =
                activePost.category === "Hajj & Umrah" || activePost.category === "Ziyarah & Stopovers"
                  ? [
                      {
                        name: isBn ? "ধর্ম মন্ত্রণালয় বাংলাদেশ (hajj.gov.bd)" : "BD Ministry of Religious Affairs (hajj.gov.bd)",
                        url: "https://www.hajj.gov.bd",
                      },
                      {
                        name: isBn ? "অফিশিয়াল Nusuk পোর্টাল (nusuk.sa)" : "Official Saudi Nusuk Portal (nusuk.sa)",
                        url: "https://www.nusuk.sa",
                      },
                      {
                        name: isBn ? "সৌদি হজ ও ওমরাহ মন্ত্রণালয় (haj.gov.sa)" : "Saudi Ministry of Hajj & Umrah (haj.gov.sa)",
                        url: "https://www.haj.gov.sa",
                      },
                      {
                        name: isBn ? "সৌদি ই-ভিসা পোর্টাল (ksavisa.sa)" : "Saudi Unified Visa Platform (ksavisa.sa)",
                        url: "https://ksavisa.sa",
                      },
                      {
                        name: isBn ? "হারামাইন বুলেট ট্রেন (sar.hhr.sa)" : "Haramain High-Speed Railway (sar.hhr.sa)",
                        url: "https://sar.hhr.sa",
                      },
                      {
                        name: isBn ? "UAE পোর্টাল (u.ae) ও JAKIM (islam.gov.my)" : "UAE Official Portal (u.ae) & Malaysia JAKIM (islam.gov.my)",
                        url: "https://u.ae",
                      },
                    ]
                  : [
                      {
                        name: isBn ? "বাংলাদেশ ই-পাসপোর্ট পোর্টাল (epassport.gov.bd)" : "BD e-Passport Portal (epassport.gov.bd)",
                        url: "https://www.epassport.gov.bd",
                      },
                      {
                        name: isBn ? "বাংলাদেশ ব্যাংক ট্রাভেল কোটা (bb.org.bd)" : "Bangladesh Bank FX Rules (bb.org.bd)",
                        url: "https://www.bb.org.bd",
                      },
                      {
                        name: isBn ? "জাতীয় রাজস্ব বোর্ড কাস্টমস (nbr.gov.bd)" : "Bangladesh Customs NBR (nbr.gov.bd)",
                        url: "https://nbr.gov.bd",
                      },
                      {
                        name: isBn ? "থাইল্যান্ড ই-ভিসা (thaievisa.go.th)" : "Official Thai e-Visa (thaievisa.go.th)",
                        url: "https://www.thaievisa.go.th",
                      },
                      {
                        name: isBn ? "মালয়েশিয়া ই-ভিসা ও MDAC (imi.gov.my)" : "Malaysia Immigration & MDAC (imi.gov.my)",
                        url: "https://malaysiavisa.imi.gov.my",
                      },
                      {
                        name: isBn ? "সিঙ্গাপুর ICA (ica.gov.sg)" : "Singapore ICA Portal (ica.gov.sg)",
                        url: "https://www.ica.gov.sg",
                      },
                    ];

              return (
                <>
                  {/* Top Navigation Bar: Back to All Blogs + Breadcrumb */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <button
                      type="button"
                      onClick={() => navigateTo("/blog")}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-brand-navy hover:text-slate-900 bg-white border border-slate-200 hover:border-brand-navy px-4 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={14} />
                      <span>
                        {isBn
                          ? `সবগুলো ট্রাভেল ব্লগে ফিরে যান (${localizedBlogs.length})`
                          : `Back to All Travel Guides (${localizedBlogs.length})`}
                      </span>
                    </button>

                    <nav className="text-slate-500 text-xs flex items-center gap-1.5 truncate max-w-full">
                      <span className="hover:text-slate-900 cursor-pointer" onClick={() => navigateTo("/")}>
                        {isBn ? "হোম" : "Home"}
                      </span>
                      <span aria-hidden="true">/</span>
                      <span className="hover:text-slate-900 cursor-pointer" onClick={() => navigateTo("/blog")}>
                        {isBn ? "ট্রাভেল ব্লগ" : "Travel Blog"}
                      </span>
                      <span aria-hidden="true">/</span>
                      <span className="text-brand-navy font-semibold truncate max-w-[240px] sm:max-w-md">
                        {activePost.title}
                      </span>
                    </nav>
                  </div>

                  {/* Main Article 2-Column Layout (Content + Sticky Trip Planner Sidebar) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Full Article Content (8 Cols) with Dark H1 / H2 / H3 Hierarchy */}
                    <article className="lg:col-span-8 space-y-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
                      {/* Primary Semantic H1 in Dark Color (#0B1426) & Large Pixel Scale (30px–38px) */}
                      <header className="space-y-5 border-b border-slate-200 pb-6">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-brand-navy">{activePost.category}</span>
                            <span aria-hidden="true">·</span>
                            <span>{activePost.date}</span>
                            <span aria-hidden="true">·</span>
                            <span>{activePost.readTime}</span>
                            <span aria-hidden="true">·</span>
                            <span>{isBn ? `লেখক: ${activePost.author}` : `By ${activePost.author}`}</span>
                          </div>
                          <span className="font-mono text-emerald-700 font-semibold">
                            {isBn ? "✓ সরকারি সূত্র হতে যাচাইকৃত (2026)" : "✓ Verified Official Rules (2026)"}
                          </span>
                        </div>

                        <h1 className="font-serif text-[28px] sm:text-[34px] lg:text-[38px] font-black text-brand-navy leading-[1.18] tracking-tight text-balance">
                          {activePost.title}
                        </h1>

                        {/* Dedicated Unique Article Feature Photograph */}
                        <figure className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
                          <img
                            {...getResponsiveImageProps(
                              activeCoverImg,
                              "(max-width: 767px) 100vw, 840px",
                            )}
                            alt={getBlogImageAltText(activePost.slug)}
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                            className="w-full aspect-[16/9] object-cover object-center"
                          />
                        </figure>

                        {/* Quick Answer & Key Takeaway Box (AEO-Structured Direct Answer) */}
                        <div className="bg-slate-50 border-l-4 border-brand-navy p-5 rounded-r-xl space-y-1.5">
                          <div className="text-xs font-bold text-brand-navy">
                            {isBn
                              ? "একনজরে মূল উত্তর ও সারসংক্ষেপ (Quick Answer & Key Takeaway)"
                              : "Quick Answer & Key Takeaway"}
                          </div>
                          <p className="text-[15px] sm:text-[16px] text-slate-800 leading-[1.75]">
                            {activePost.summary}
                          </p>
                        </div>

                        {/* Official Government & Verified Sources Bar */}
                        <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4 space-y-2">
                          <div className="text-xs font-bold text-brand-navy flex items-center justify-between">
                            <span>
                              {isBn
                                ? "অফিশিয়াল সরকারি পোর্টাল ও যাচাইকৃত তথ্যসূত্র (Official Government Sources):"
                                : "Verified Official Government Portals & Authentic Sources:"}
                            </span>
                            <span className="text-[11px] font-mono text-emerald-800">
                              {isBn ? "হালনাগাদ: ২০২৬" : "Updated: 2026"}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
                            {officialGovSources.map((src, sIdx) => (
                              <a
                                key={sIdx}
                                href={src.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-brand-navy hover:text-brand-emerald underline decoration-slate-300 hover:decoration-brand-navy inline-flex items-center gap-1"
                              >
                                <span>{src.name}</span>
                                <ExternalLink size={11} className="opacity-70" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </header>

                      {/* Full Long-Form Verified Guide Content with Dark H2 (24px–26px), Dark H3 (19px–21px) & 16px Body */}
                      <div className="max-w-none text-slate-800 leading-[1.8] space-y-6 text-[16px] sm:text-[17px] font-sans">
                        {activePost.content.split("\n\n").map((block, bIdx) => {
                          const trimmed = block.trim();
                          if (!trimmed) return null;

                          // Major numbered section heading -> Semantic H2 (Dark #0B1426, 22px–26px)
                          if (/^([0-9]+|[০-৯]+)\.\s+/.test(trimmed) && trimmed.length < 170 && !trimmed.includes("\n")) {
                            return (
                              <h2
                                key={bIdx}
                                className="font-serif text-[22px] sm:text-[26px] font-bold text-brand-navy leading-[1.3] pt-5 pb-2 border-b border-slate-200"
                              >
                                {trimmed.replace(/\*\*/g, "")}
                              </h2>
                            );
                          }

                          // Sub-heading -> Semantic H3 (Dark #0B1426, 18px–21px)
                          if (
                            (/^(Step|Option|Tier|Zone|Route|Phase|Tip|Rule|Pathway|Scenario|ধাপ|অপশন|রুট|টিপস|নিয়ম|জোন|দৃশ্যপট)\s+/i.test(trimmed) ||
                              (trimmed.endsWith(":") && trimmed.length < 120)) &&
                            !trimmed.includes("\n")
                          ) {
                            return (
                              <h3
                                key={bIdx}
                                className="font-serif text-[18px] sm:text-[21px] font-bold text-brand-navy leading-[1.35] pt-3"
                              >
                                {trimmed.replace(/\*\*/g, "")}
                              </h3>
                            );
                          }

                          // Multi-line block where the first line is a numbered H2 heading followed by body/bullets/H3s
                          const lines = trimmed.split("\n");
                          const firstLine = lines[0].trim();
                          const isFirstLineH2 =
                            /^([0-9]+|[০-৯]+)\.\s+/.test(firstLine) && firstLine.length < 170;
                          const isFirstLineH3 =
                            !isFirstLineH2 &&
                            lines.length > 1 &&
                            firstLine.length < 125 &&
                            (firstLine.endsWith(":") ||
                              /^(Step|Option|Tier|Zone|Route|Phase|Tip|Rule|Pathway|Scenario|ধাপ|অপশন|রুট|টিপস|নিয়ম|জোন|দৃশ্যপট)\s+/i.test(firstLine));

                          const remainingLines =
                            isFirstLineH2 || isFirstLineH3 ? lines.slice(1) : lines;

                          return (
                            <React.Fragment key={bIdx}>
                              <div className="space-y-3.5">
                                {isFirstLineH2 && (
                                <h2 className="font-serif text-[22px] sm:text-[26px] font-bold text-brand-navy leading-[1.3] pt-5 pb-2 border-b border-slate-200">
                                  {firstLine.replace(/\*\*/g, "")}
                                </h2>
                              )}
                              {isFirstLineH3 && (
                                <h3 className="font-serif text-[18px] sm:text-[21px] font-bold text-brand-navy leading-[1.35] pt-3">
                                  {firstLine.replace(/\*\*/g, "")}
                                </h3>
                              )}
                              {remainingLines.map((line, lIdx) => {
                                const cleanLine = line.trim();
                                if (!cleanLine) return null;

                                // Check if an inner line is an H3 sub-heading (e.g., Step 1:, Rule 1:, Zone 1:, ধাপ ১:, নিয়ম ১:)
                                if (
                                  !/^(-|•|\*)\s+/.test(cleanLine) &&
                                  cleanLine.length < 125 &&
                                  (cleanLine.endsWith(":") ||
                                    /^(Step|Option|Tier|Zone|Route|Phase|Tip|Rule|Pathway|Scenario|ধাপ|অপশন|রুট|টিপস|নিয়ম|জোন|দৃশ্যপট)\s+/i.test(cleanLine))
                                ) {
                                  return (
                                    <h3
                                      key={lIdx}
                                      className="font-serif text-[18px] sm:text-[21px] font-bold text-brand-navy leading-[1.35] pt-3"
                                    >
                                      {cleanLine.replace(/\*\*/g, "")}
                                    </h3>
                                  );
                                }

                                if (/^(-|•|\*)\s+/.test(cleanLine)) {
                                  const bulletText = cleanLine.replace(/^(-|•|\*)\s+/, "");
                                  return (
                                    <div
                                      key={lIdx}
                                      className="flex items-start gap-3 pl-2 text-slate-800"
                                    >
                                      <span className="text-brand-navy font-bold mt-1 shrink-0">•</span>
                                      <span className="leading-[1.8]">
                                        {renderFormattedText(bulletText)}
                                      </span>
                                    </div>
                                  );
                                }
                                return (
                                  <p key={lIdx} className="leading-[1.8] text-slate-800">
                                    {renderFormattedText(cleanLine)}
                                  </p>
                                );
                              })}
                              </div>

                              {/* Mid-Article Contextual Internal Link + Native Content-Analyzed Travelpayouts & BDT Hotel Conversion Card (Zero-CLS Native Replacement for Travelpayouts Drive) */}
                              {bIdx === 2 && activePost.internalLinks[0] && (
                                <div className="my-6 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3.5">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                                    <div className="space-y-0.5">
                                      <span className="text-[11px] font-bold text-brand-navy uppercase tracking-wider block">
                                        {isBn ? "সংশ্লিষ্ট পরবর্তী ধাপ (Recommended Next Guide)" : "Recommended Next Step in This Topic"}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => navigateTo(activePost.internalLinks[0].path)}
                                        className="text-left font-serif font-bold text-[16px] text-brand-navy hover:text-brand-emerald underline decoration-[#D4941A] decoration-2 underline-offset-3 cursor-pointer"
                                      >
                                        {activePost.internalLinks[0].text} →
                                      </button>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => navigateTo("/umrah")}
                                      className="self-start sm:self-center text-xs font-semibold text-brand-navy bg-white border border-slate-200 hover:border-brand-navy px-3 py-1.5 rounded-lg shrink-0 cursor-pointer"
                                    >
                                      {isBn ? "Umrah BDT ক্যালকুলেটর" : "Open Umrah BDT Calculator"}
                                    </button>
                                  </div>

                                  <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
                                    <div className="text-xs text-slate-700 max-w-xl">
                                      {isBn
                                        ? "নিজে ডুয়াল-কারেন্সি কার্ডে অনলাইনে ফ্লাইট, পিকআপ ও ট্যুর পাস বুক করুন—অথবা কার্ড না থাকলে সরাসরি আমাদের ঢাকা ডেস্ক থেকে BDT-তে হোটেল ভাউচার ও টিকিট নিন:"
                                        : "Book flights, airport transfers, or attraction passes online with your card—or book Makkah, Madinah, Dubai & KL hotels directly in BDT via our Dhaka Desk:"}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                      <PartnerLinkButton
                                        href={
                                          activePost.affiliateCTA
                                            ? AFFILIATE_LINKS[activePost.affiliateCTA.provider]
                                            : AFFILIATE_LINKS.aviasales
                                        }
                                        label={
                                          activePost.affiliateCTA?.provider === "tiqets"
                                            ? isBn
                                              ? "Skip-the-Line টিকিট দেখুন"
                                              : "Check Skip-the-Line Passes"
                                            : activePost.affiliateCTA?.provider === "klook" ||
                                              activePost.affiliateCTA?.provider === "kkday"
                                            ? isBn
                                              ? "ট্যুর ও ডে-পাস ভাড়া দেখুন"
                                              : "Compare Tour & Attraction Passes"
                                            : activePost.affiliateCTA?.provider === "kiwitaxi" ||
                                              activePost.affiliateCTA?.provider === "welcomePickups"
                                            ? isBn
                                              ? "প্রাইভেট কার ও পিকআপ ভাড়া দেখুন"
                                              : "Check Private Car & Pickup Rates"
                                            : activePost.affiliateCTA?.provider === "airalo"
                                            ? isBn
                                              ? "Saudi / ট্রাভেল eSIM দেখুন"
                                              : "Check Travel eSIM Plans"
                                            : isBn
                                            ? "লাইভ বিমান ভাড়া তুলনা করুন"
                                            : "Compare Live Flight Fares"
                                        }
                                        variant="dark"
                                      />
                                      <a
                                        href={`https://wa.me/8801784385335?text=${encodeURIComponent(
                                          `Assalamu Alaikum URAL Desk, I was reading "${activePost.title}" and want to check BDT hotel & flight package rates.`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 bg-brand-navy hover:bg-slate-800 text-white font-semibold text-xs px-3.5 py-2.5 rounded-lg transition-colors"
                                      >
                                        <span>{isBn ? "BDT-তে হোটেল ও টিকিট বুকিং (WhatsApp)" : "Book Hotel & Flight in BDT (WhatsApp)"}</span>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      {/* Contextual Affiliate Widget */}
                      {activePost.affiliateCTA && (
                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3 text-left">
                          <h3 className="text-xs font-bold text-brand-navy">
                            {activePost.affiliateCTA.headline}
                          </h3>
                          <p className="text-xs text-slate-600">{activePost.affiliateCTA.body}</p>
                          {activePost.affiliateCTA.provider === "klook" ? (
                            <KlookActivitiesWidget />
                          ) : activePost.affiliateCTA.provider === "kiwitaxi" ? (
                            <KiwitaxiTransferWidget />
                          ) : activePost.affiliateCTA.provider === "airalo" ? (
                            <AiraloEsimWidget />
                          ) : activePost.affiliateCTA.provider === "qeeq" ? (
                            <QeeqCarRentalWidget />
                          ) : (
                            <PartnerLinkButton
                              href={AFFILIATE_LINKS[activePost.affiliateCTA.provider]}
                              label={
                                isBn
                                  ? "লাইভ ভাড়া ও অ্যাভেইলেবিলিটি দেখুন"
                                  : "Compare Live Prices & Availability"
                              }
                              variant="dark"
                            />
                          )}
                        </div>
                      )}

                      {/* Hub-and-Spoke Topical Cluster Silo Navigator (Internal Linking Authority Matrix) */}
                      <div className="pt-6 border-t border-slate-200 space-y-4">
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3.5">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-emerald block">
                                {isBn ? "টপিক্যাল ক্লাস্টার সাইলো নেভিগেটর (Hub & Spoke Silo)" : "Topical Authority Cluster Navigator (Hub & Spoke Silo)"}
                              </span>
                              <h3 className="font-serif text-base font-bold text-brand-navy">
                                {isBn
                                  ? `${activePost.category} — এই ক্লাস্টারের সবগুলো গাইড (${sameCategoryPosts.length + 1}টি আর্টিকেল)`
                                  : `Complete "${activePost.category}" Topical Series (${sameCategoryPosts.length + 1} Connected Guides)`}
                              </h3>
                            </div>
                            <button
                              type="button"
                              onClick={() => navigateTo("/sitemap")}
                              className="text-xs font-semibold text-brand-navy hover:underline cursor-pointer"
                            >
                              {isBn ? "সম্পূর্ণ SEO Blueprint দেখুন →" : "View Full Topical Map →"}
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {[activePost, ...sameCategoryPosts].map((clusterPost, cIdx) => {
                              const isCurrent = clusterPost.slug === activePost.slug;
                              return (
                                <button
                                  key={clusterPost.id}
                                  type="button"
                                  disabled={isCurrent}
                                  onClick={() => !isCurrent && navigateTo(`/blog/${clusterPost.slug}`)}
                                  className={`text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                                    isCurrent
                                      ? "bg-brand-navy text-white border-brand-navy cursor-default"
                                      : "bg-white hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-brand-navy cursor-pointer"
                                  }`}
                                >
                                  <span
                                    className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                                      isCurrent ? "bg-[#F6B73C] text-brand-navy" : "bg-slate-100 text-brand-navy"
                                    }`}
                                  >
                                    {String(cIdx + 1).padStart(2, "0")}
                                  </span>
                                  <div className="space-y-0.5 min-w-0">
                                    <div className={`text-xs font-semibold line-clamp-2 leading-snug ${isCurrent ? "text-white" : "text-brand-navy"}`}>
                                      {clusterPost.title}
                                    </div>
                                    <div className={`text-[10px] ${isCurrent ? "text-[#F6B73C] font-semibold" : "text-slate-500"}`}>
                                      {isCurrent
                                        ? isBn
                                          ? "● বর্তমানে এই গাইডটি পড়ছেন"
                                          : "● Currently Reading This Guide"
                                        : `${clusterPost.readTime} · ${isBn ? "পড়তে ক্লিক করুন →" : "Read Spoke Guide →"}`}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="text-xs font-bold text-brand-navy">
                          {isBn
                            ? "সংশ্লিষ্ট ক্যালকুলেটর ও পরবর্তী ধাপ (Cross-Cluster Internal Links)"
                            : "Related Calculators & Cross-Cluster Next Steps on URAL"}
                        </div>
                        <div className="flex flex-wrap gap-2.5 text-xs">
                          {activePost.internalLinks.map((lnk, idx) => (
                            <button
                              key={idx}
                              id={`blog-inner-link-${idx}`}
                              onClick={() => navigateTo(lnk.path)}
                              className="bg-slate-100 hover:bg-brand-navy text-brand-navy hover:text-white border border-slate-200 px-3.5 py-2 rounded-xl cursor-pointer flex items-center gap-1.5 transition-colors font-medium"
                            >
                              <Link2 size={13} className="text-brand-emerald" />
                              <span>{lnk.text}</span>
                            </button>
                          ))}
                        </div>

                        {/* Viral Bangladesh Social & WhatsApp Family Group Share Bar + Ready-to-Post FB Caption Copy */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-brand-navy block">
                              {isBn
                                ? "পরিবার বা বন্ধুদের সাথে গাইডটি শেয়ার করুন (WhatsApp / Facebook)"
                                : "Share This Guide with Family or Travel Groups"}
                            </span>
                            <span className="text-[11px] text-slate-600 block">
                              {isBn
                                ? "এক ক্লিকে WhatsApp গ্রুপে পাঠান অথবা ফেসবুক পোস্ট ক্যাপশন কপি করুন:"
                                : "Send to your family WhatsApp chat or copy a ready-to-post Facebook caption:"}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <a
                              href={`https://wa.me/?text=${encodeURIComponent(
                                `${activePost.title}\n\n${getBlogAeoSnippet50Words(activePost.slug, isBn, activePost.summary)}\n\nRead Full Guide on URAL: https://ural-travel.pages.dev/blog/${activePost.slug}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-brand-navy hover:bg-slate-800 text-white font-semibold px-3.5 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5"
                            >
                              <span>{isBn ? "WhatsApp-এ শেয়ার" : "Share on WhatsApp"}</span>
                            </a>
                            <a
                              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                `https://ural-travel.pages.dev/blog/${activePost.slug}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white hover:bg-slate-100 text-brand-navy border border-slate-300 font-semibold px-3.5 py-2 rounded-xl transition-colors inline-flex items-center gap-1.5"
                            >
                              <span>{isBn ? "Facebook-এ শেয়ার" : "Share on Facebook"}</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => {
                                const fbCaption = isBn
                                  ? `✈️ ${activePost.title}\n\n📌 সংক্ষিপ্ত উত্তর:\n${getBlogAeoSnippet50Words(activePost.slug, true, activePost.summary)}\n\n👉 সম্পূর্ণ গাইড ও BDT বাজেট দেখুন: https://ural-travel.pages.dev/blog/${activePost.slug}\n💬 কার্ড ছাড়াই BDT/bKash-এ ফ্লাইট ও হোটেল বুকিং হেল্পলাইন (WhatsApp): +8801784385335`
                                  : `✈️ ${activePost.title}\n\n📌 Quick Summary:\n${getBlogAeoSnippet50Words(activePost.slug, false, activePost.summary)}\n\n👉 Read Full Guide & BDT Calculator: https://ural-travel.pages.dev/blog/${activePost.slug}\n💬 Book Flights & Hotels in BDT via WhatsApp: +8801784385335`;
                                navigator.clipboard?.writeText(fbCaption);
                                setAffiliateToast(
                                  isBn
                                    ? "ফেসবুক পোস্ট ক্যাপশন ও লিংক কপি হয়েছে! এখন যেকোনো Facebook পেজ বা গ্রুপে পেস্ট করুন।"
                                    : "Ready-to-post Facebook caption & link copied to clipboard!"
                                );
                              }}
                              className="bg-[#F6B73C] hover:bg-[#e5a629] text-brand-navy font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                            >
                              {isBn ? "📋 FB ক্যাপশন কপি করুন" : "📋 Copy Ready FB Post"}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Visible Hajj, Umrah & Ziyarah Preparation FAQs (Matches JSON-LD FAQPage Schema 100%) */}
                      {(activePost.category === "Hajj & Umrah" || activePost.category === "Ziyarah & Stopovers") && (
                        <TravelIntelligence
                          pageTitle={
                            isBn
                              ? "বাংলাদেশ থেকে Umrah ও Hajj প্রস্তুতি — সাধারণ প্রশ্নোত্তর (FAQ)"
                              : "Umrah & Hajj Preparation from Bangladesh — Verified FAQs"
                          }
                          quickAnswer={
                            isBn
                              ? "বাংলাদেশি নাগরিকদের ফরজ Hajj-এর জন্য অবশ্যই ধর্ম মন্ত্রণালয়ের পোর্টাল (hajj.gov.bd)-এ নিবন্ধন করতে হবে। তবে বছরের যেকোনো সময় ৯০ দিনের Umrah e-Visa, ৯৬ ঘণ্টার Saudia/Flynas Stopover Visa অথবা US/UK/Schengen ভিসাধারীদের অনলাইন e-Visa এবং Nusuk App ব্যবহার করে নিজে নিজে কম খরচে DIY Umrah পালন করা যায়।"
                              : "Bangladeshi citizens must register via hajj.gov.bd for obligatory Hajj, while year-round Umrah can be planned independently using a 90-day Umrah e-Visa, a 96-hour Saudia/Flynas Stopover Visa, or a qualified US/UK/Schengen holder e-Visa, paired with the official Nusuk and Saudi Visa Bio apps."
                          }
                          keyFacts={[
                            {
                              label: isBn ? "Umrah e-Visa খরচ" : "Umrah e-Visa Cost",
                              value: isBn ? "BDT 15,500 – 19,500 (২–৫ দিন)" : "BDT 15,500 – 19,500 (2–5 Days)",
                            },
                            {
                              label: isBn ? "১০ দিনের DIY Umrah বাজেট" : "10-Day DIY Umrah Budget",
                              value: isBn ? "BDT 1,16,000 – 1,32,000 / জন" : "BDT 1,16,000 – 1,32,000 / Person",
                            },
                            {
                              label: isBn ? "বাধ্যতামূলক অ্যাপ" : "Mandatory Apps",
                              value: "Saudi Visa Bio + Nusuk (nusuk.sa)",
                            },
                          ]}
                          faqs={localizedHajjFaqs}
                        />
                      )}
                    </article>

                    {/* Right Column: Sticky Trip Planning & BDT Support Sidebar (4 Cols) */}
                    <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                      {/* Direct WhatsApp BDT Booking Desk Card */}
                      <div className="bg-brand-navy text-white rounded-2xl p-6 space-y-4 shadow-sm">
                        <div className="text-xs font-semibold text-[#F6B73C]">
                          {isBn
                            ? "Dual-Currency Card নেই? BDT-তে বুক করুন"
                            : "No Dual-Currency Card? Pay in BDT"}
                        </div>
                        <h3 className="font-serif text-lg font-bold text-white leading-snug">
                          {isBn
                            ? "WhatsApp-এর মাধ্যমে বাংলাদেশি টাকায় Flight, Umrah Hotel ও Transfer বুক করুন"
                            : "Book Flights, Umrah Hotels & Transfers in BDT via WhatsApp"}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {isBn
                            ? "আমাদের ঢাকা সাপোর্ট ডেস্কের মাধ্যমে দেশীয় ব্যাংক ট্রান্সফার, bKash বা Nagad ব্যবহার করে আপনার রাউন্ডট্রিপ বিমান টিকিট, মক্কা/মদিনা বা এশিয়ার হোটেল ভাউচার এবং এয়ারপোর্ট পিকআপ বুক করতে পারেন।"
                            : "Our Dhaka support desk can issue your roundtrip air tickets, Makkah/Madinah or Asian hotel vouchers, and airport transfers using local bank transfer, bKash, or Nagad."}
                        </p>
                        <a
                          href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20was%20reading%20your%20travel%20guide%20and%20need%20help%20planning%20my%20trip!"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-brand-emerald text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                          <span>
                            {isBn
                              ? "WhatsApp-এ মেসেজ দিন (+8801784385335)"
                              : "Chat on WhatsApp (+8801784385335)"}
                          </span>
                        </a>
                      </div>

                      {/* Quick Partner Booking Tools */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                        <div className="text-xs font-bold text-slate-800">
                          {isBn ? "নিজে নিজে অনলাইন বুকিং লিংক" : "Self-Service Booking Links"}
                        </div>
                        <div className="space-y-2.5">
                          <PartnerLinkButton
                            href={AFFILIATE_LINKS.aviasales}
                            label={isBn ? "ঢাকা থেকে Flight ভাড়া তুলনা করুন" : "Compare flights from Dhaka"}
                            variant="dark"
                          />
                          <PartnerLinkButton
                            href={AFFILIATE_LINKS.welcomePickups}
                            label={isBn ? "Airport Meet & Greet পিকআপ বুক করুন" : "Pre-book airport Meet & Greet"}
                            variant="dark"
                          />
                          <PartnerLinkButton
                            href={AFFILIATE_LINKS.klook}
                            label={isBn ? "Tours ও Theme Park টিকিট বুক করুন" : "Book tours & attraction passes"}
                            variant="dark"
                          />
                          <PartnerLinkButton
                            href={AFFILIATE_LINKS.airalo}
                            label={isBn ? "ফ্লাইটের আগে Travel eSIM নিন" : "Get a travel eSIM before flying"}
                            variant="dark"
                          />
                        </div>
                      </div>

                      {/* More Guides List in Sidebar */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">
                            {isBn ? "আরও ট্রাভেল গাইড" : "More Travel Guides"}
                          </span>
                          <button
                            type="button"
                            onClick={() => navigateTo("/blog")}
                            className="text-xs font-semibold text-brand-navy hover:underline cursor-pointer"
                          >
                            {isBn ? `সব দেখুন (${localizedBlogs.length})` : `View All (${localizedBlogs.length})`}
                          </button>
                        </div>
                        <div className="divide-y divide-slate-100">
                          {relatedPosts.map((post) => (
                            <button
                              key={post.id}
                              type="button"
                              onClick={() => navigateTo(`/blog/${post.slug}`)}
                              className="w-full text-left py-3 first:pt-1 last:pb-0 group cursor-pointer space-y-1"
                            >
                              <div className="text-[11px] text-slate-500">
                                {post.category} · {post.readTime}
                              </div>
                              <div className="text-xs font-semibold text-slate-800 group-hover:text-brand-navy line-clamp-2 leading-snug">
                                {post.title}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </aside>
                  </div>

                  {/* Bottom Section: 3 More Blog Cards in One Row (Unique Thumbnail + Dark H3 + 50-Word AEO Snippet + 'Read Full Blog' Button) */}
                  <div className="pt-10 border-t border-slate-200 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-brand-navy">
                          {isBn ? "আরও পড়ুন" : "Continue Reading"}
                        </div>
                        <h2 className="font-serif text-2xl font-bold text-brand-navy">
                          {isBn
                            ? "বাংলাদেশি ভ্রমণকারীদের জন্য আরও প্রয়োজনীয় গাইড"
                            : "More Travel Guides for Bangladeshi Flyers"}
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigateTo("/blog")}
                        className="self-start sm:self-end bg-brand-navy text-white text-xs font-semibold px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>
                          {isBn
                            ? `সবগুলো ব্লগ গাইড দেখুন (${localizedBlogs.length})`
                            : `Back to All ${localizedBlogs.length} Blog Guides`}
                        </span>
                        <ArrowRight size={13} className="text-[#F6B73C]" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedPosts.map((post) => {
                        const relatedSnippet = getBlogAeoSnippet50Words(post.slug, isBn, post.summary);

                        return (
                          <article
                            key={post.id}
                            onClick={() => navigateTo(`/blog/${post.slug}`)}
                            className="group bg-white border border-slate-200 hover:border-[#F6B73C] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between cursor-pointer transition-all"
                          >
                            <div>
                              <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                                <img
                                  {...getResponsiveImageProps(
                                    getBlogCoverImage(post.slug),
                                    "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw",
                                  )}
                                  alt={getBlogImageAltText(post.slug)}
                                  loading="lazy"
                                  fetchPriority="low"
                                  decoding="async"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div className="p-5 space-y-2.5">
                                <div className="text-xs text-slate-500">
                                  {post.category} · {post.readTime}
                                </div>
                                <h3 className="font-serif font-bold text-[18px] text-brand-navy group-hover:text-brand-emerald leading-snug">
                                  {post.title}
                                </h3>
                                <p className="text-[13.5px] text-slate-700 leading-[1.65]">
                                  {relatedSnippet}
                                </p>
                              </div>
                            </div>
                            <div className="px-5 pb-5 pt-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigateTo(`/blog/${post.slug}`);
                                }}
                                className="w-full bg-brand-navy group-hover:bg-[#F6B73C] text-white group-hover:text-brand-navy font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-between cursor-pointer"
                              >
                                <span>{isBn ? "সম্পূর্ণ ব্লগ পড়ুন · Read Full Blog" : "Read Full Blog"}</span>
                                <ArrowRight size={13} />
                              </button>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

      {/* 🟦 CONTENT & GROWTH: 4 FEATURED BANGLADESHI TRAVEL GUIDES IN ONE ROW */}
      {section !== "blog" && section !== "notFound" && (
        <section
          id="content-and-growth-hub"
          className="mt-20 pt-16 border-t border-slate-200/80 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-brand-navy">
                  {isBn ? "ট্রাভেল গাইড ও ব্লগ" : "Featured Travel Guides"}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {isBn ? "বাংলাদেশি ভ্রমণকারীদের জন্য যাচাইকৃত গাইড (2026)" : "Verified Playbooks for Bangladeshi Travelers (2026)"}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
                {isBn
                  ? "বাংলাদেশি ভ্রমণকারীদের জন্য সবচেয়ে জরুরি ৪টি ট্রাভেল ও Umrah গাইড"
                  : "Essential Travel & Umrah Guides for Bangladeshi Flyers"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {isBn
                  ? "Dual-Currency Card Endorsement, কম খরচে ফ্যামিলি ট্যুর, নিজে নিজে Umrah প্রস্তুতি এবং Dhaka Airport Immigration-এর যাচাইকৃত গাইড।"
                  : "Step-by-step guides answering top banking, family budget, DIY Umrah, and Dhaka airport immigration questions."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigateTo("/blog")}
              className="self-start sm:self-end bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>
                {isBn
                  ? `সবগুলো ব্লগ দেখুন (${localizedBlogs.length})`
                  : `View All ${localizedBlogs.length} Blogs`}
              </span>
              <ArrowRight size={13} className="text-[#F6B73C]" />
            </button>
          </div>

          {/* Strictly 4 Featured Blog Topics in a Single Row on Desktop (With Unique Image + 50-Word AEO Snippet + Read Full Blog Button) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredGrowthTopics.map((topic) => {
              const cardSnippet = getBlogAeoSnippet50Words(topic.slug, isBn, topic.excerpt);
              return (
                <article
                  key={topic.id}
                  onClick={() => navigateTo(`/blog/${topic.slug}`)}
                  className="group bg-white border border-slate-200 hover:border-[#F6B73C] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between transition-all cursor-pointer"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                      <img
                        {...getResponsiveImageProps(
                          getBlogCoverImage(topic.slug),
                          "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw",
                        )}
                        alt={getBlogImageAltText(topic.slug)}
                        loading="lazy"
                        fetchPriority="low"
                        decoding="async"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                      <span className="absolute bottom-2.5 left-3 bg-brand-navy/85 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md border border-white/15">
                        {topic.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="font-serif font-bold text-base text-brand-navy group-hover:text-brand-emerald leading-snug">
                        {topic.title}
                      </h3>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        {cardSnippet}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 pb-4 pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo(`/blog/${topic.slug}`);
                      }}
                      className="w-full bg-brand-navy group-hover:bg-[#F6B73C] text-white group-hover:text-brand-navy font-bold text-xs py-2.5 px-3.5 rounded-xl transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>{isBn ? "সম্পূর্ণ ব্লগ পড়ুন" : "Read Full Blog"}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------
          📞 VIEW 9: CONTACT US & DIRECT SUPPORT HUB
      ------------------------------------------------------------- */}
      {section === "contact" && (
        <div className="space-y-10 animate-fade-in font-sans">
          
          {/* Visual Header Banner */}
          <div className="bg-brand-navy text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl border border-slate-800">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#F6B73C]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#F6B73C]/15 text-[#F6B73C] text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#F6B73C] animate-ping"></span>
                {isBn ? "সরাসরি সাপোর্ট হটলাইন" : "Direct Assistance Hotline"}
              </div>
              
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
                {isBn ? "সরাসরি আমাদের সাথে যোগাযোগ করুন" : "Let's Connect Directly"}
              </h1>
              
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                {isBn
                  ? "ফ্লাইট বুকিং, ভিসা প্রসেসিং, কিংবা Umrah ও ট্যুর প্যাকেজ সম্পর্কে জানতে চান? সরাসরি কল করুন, WhatsApp-এ মেসেজ দিন অথবা নিচের ফর্মটি পূরণ করুন। আমরা দ্রুততম সময়ে উত্তর দিই!"
                  : "Have inquiries about flight bookings, visa procedures, or destination travel packages? Contact our director directly through Call, WhatsApp, or the interactive travel inquiry form below. We respond instantly!"}
              </p>
            </div>
          </div>

          {/* Quick Contact Grid cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* WhatsApp direct card */}
            <div className="bg-white border border-slate-200 hover:border-brand-emerald/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">
              <div className="p-3.5 bg-brand-emerald/10 text-brand-emerald rounded-xl shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.488 5.35 1.489 5.513 0 10.002-4.486 10.005-9.999.001-2.671-1.037-5.182-2.924-7.071C17.192 1.685 14.685.648 12.012.648c-5.516 0-10.01 4.488-10.014 10.002-.001 1.902.483 3.654 1.401 5.247l-.952 3.479 3.599-.944z" />
                </svg>
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-[10px] font-mono font-bold text-brand-emerald block uppercase tracking-widest">WHATSAPP CHAT</span>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {isBn ? "সরাসরি WhatsApp চ্যাট করুন" : "Start Direct Chat"}
                </h3>
                <p className="text-xs text-slate-500 leading-normal">
                  {isBn
                    ? "কাস্টম সাপোর্ট পাওয়ার সবচেয়ে দ্রুত মাধ্যম। ভিসা চেকলিস্ট, রিটার্ন এয়ার টিকেট বা হোটেল বুকিংয়ের জন্য মেসেজ দিন।"
                    : "The fastest way to get custom support. Ask visa questions, seek roundtrip ticket packages, or request customized hotel bookings."}
                </p>
                <a 
                  href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20need%20travel%20assistance%21" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-emerald text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-colors"
                >
                  {isBn ? "WhatsApp-এ মেসেজ দিন (+8801784385335)" : "Chat on WhatsApp (+8801784385335)"}
                </a>
              </div>
            </div>

            {/* Phone Direct call card */}
            <div className="bg-white border border-slate-200 hover:border-brand-navy/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">
              <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-[10px] font-mono font-bold text-blue-600 block uppercase tracking-widest">TELEPHONE HOTLINE</span>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {isBn ? "সরাসরি ফোনে কথা বলুন" : "Direct Mobile Support"}
                </h3>
                <p className="text-xs text-slate-500 leading-normal">
                  {isBn
                    ? "সরাসরি আমাদের ডেস্কের সাথে কথা বলুন। ভিসা ডকুমেন্ট যাচাই, লাইভ ফ্লাইট ভাড়া এবং বিশ্বস্ত পরামর্শ পান।"
                    : "Talk directly to the director. Get immediate verification of requirements, active flight check comparisons, and reliable counsel."}
                </p>
                <a 
                  href="tel:+8801784385335" 
                  className="inline-flex items-center gap-2 bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-colors"
                >
                  {isBn ? "সরাসরি কল করুন (+8801784385335)" : "Call Directly (+8801784385335)"}
                </a>
              </div>
            </div>

          </div>

          {/* Travel Inquiry Contact Form & Verification Section */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Form (Col 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="font-serif text-xl font-bold text-slate-900">
                  {isBn ? "আপনার ভ্রমণ জিজ্ঞাসা পাঠান" : "Send an Interactive Travel Inquiry"}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isBn ? "আপনার গন্তব্য এবং কী ধরনের সহায়তা প্রয়োজন তা উল্লেখ করুন, আমরা দ্রুত কলব্যাক করব।" : "Specify your target destination and desired assistance type to receive a custom callback."}
                </p>
              </div>

              {contactSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl shadow-sm shadow-emerald-500/20">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-slate-900">
                      {isBn ? "আপনার বার্তা সফলভাবে গৃহীত হয়েছে!" : "Inquiry Received Successfully!"}
                    </h3>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      {isBn ? (
                        <>
                          ধন্যবাদ <b>{contactName}</b>। আপনার <b>{contactSubject}</b> সংক্রান্ত অনুরোধটি নথিভুক্ত হয়েছে। আমরা দ্রুত <b>{contactPhone}</b> নাম্বারে কল বা WhatsApp-এ যোগাযোগ করব।
                        </>
                      ) : (
                        <>
                          Thank you <b>{contactName}</b>. Your request regarding <b>{contactSubject}</b> has been registered. We will contact you at <b>{contactPhone}</b> via Call and WhatsApp shortly.
                        </>
                      )}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-emerald-150 text-left space-y-2 max-w-md mx-auto font-mono text-[11px] text-slate-600">
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                      <span className="font-bold text-slate-400">SUBJECT:</span>
                      <span className="text-slate-800 font-bold">{contactSubject}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-1">
                      <span className="font-bold text-slate-400">DESTINATION:</span>
                      <span className="text-slate-800 font-bold">{contactDestination}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="font-bold text-slate-400">SUBMISSION ID:</span>
                      <span className="text-brand-navy font-bold">URAL-REQ-{Math.floor(1000 + Math.random() * 9000)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName("");
                      setContactPhone("");
                      setContactMessage("");
                    }}
                    className="bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs py-2 px-5 rounded-lg transition-colors"
                  >
                    {isBn ? "আরেকটি জিজ্ঞাসা পাঠান" : "Send Another Inquiry"}
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!contactName || !contactPhone) {
                      return;
                    }
                    setContactLoading(true);
                    
                    try {
                      // POST to FormSubmit.co AJAX endpoint to route the inquiry safely and for free to your email
                      await fetch("https://formsubmit.co/ajax/farhan.momen@gmail.com", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          "Accept": "application/json"
                        },
                        body: JSON.stringify({
                          Name: contactName,
                          "Phone / WhatsApp": contactPhone,
                          "Assistance Category": contactSubject,
                          "Travel Destination": contactDestination,
                          Message: contactMessage,
                          "_subject": `New URAL Travel Inquiry from ${contactName}`,
                          "_template": "table"
                        })
                      });
                    } catch (err) {
                      console.warn("Direct email delivery through FormSubmit was blocked or offline, simulating success locally:", err);
                    } finally {
                      setContactLoading(false);
                      setContactSubmitted(true);
                    }
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">
                        {isBn ? "আপনার নাম" : "Full Name"} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isBn ? "যেমন: Farhan Momen" : "e.g. Farhan Momen"}
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-brand-navy rounded-xl px-4 py-3 text-slate-800 outline-none transition-all"
                      />
                    </div>

                    {/* Phone input */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">
                        {isBn ? "ফোন বা WhatsApp নাম্বার" : "Phone or WhatsApp Number"} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +8801784385335"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-brand-navy rounded-xl px-4 py-3 text-slate-800 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Assistance Category */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">
                        {isBn ? "সহায়তার বিষয়" : "Subject / Assistance Category"}
                      </label>
                      <select
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-brand-navy rounded-xl px-3 py-3 text-slate-800 outline-none transition-all cursor-pointer"
                      >
                        <option value="Visa Processing Checklist">{isBn ? "ভিসা প্রসেসিং চেকলিস্ট" : "Visa Processing Checklist"}</option>
                        <option value="Cheap Flight Package comparison">{isBn ? "সাশ্রয়ী ফ্লাইট টিকেট তুলনা" : "Cheap Flight Package comparison"}</option>
                        <option value="Custom Group Itinerary planning">{isBn ? "ফ্যামিলি বা গ্রুপ ট্যুর প্ল্যানিং" : "Custom Group Itinerary planning"}</option>
                        <option value="Hotel Booking Assistance">{isBn ? "হোটেল বুকিং সহায়তা (BDT)" : "Hotel Booking Assistance"}</option>
                        <option value="Umrah & Makkah/Madinah Booking">{isBn ? "Umrah ভিসা ও Makkah/Madinah হোটেল" : "Umrah & Makkah/Madinah Booking"}</option>
                      </select>
                    </div>

                    {/* Target Destination */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700 block">
                        {isBn ? "ভ্রমণ গন্তব্য" : "Travel Destination"}
                      </label>
                      <select
                        value={contactDestination}
                        onChange={(e) => setContactDestination(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-brand-navy rounded-xl px-3 py-3 text-slate-800 outline-none transition-all cursor-pointer"
                      >
                        <option value="Saudi Arabia (Umrah / Hajj)">Saudi Arabia (Umrah / Hajj) 🇸🇦</option>
                        <option value="Nepal">Nepal 🇳🇵</option>
                        <option value="Thailand">Thailand 🇹🇭</option>
                        <option value="Malaysia">Malaysia 🇲🇾</option>
                        <option value="Singapore">Singapore 🇸🇬</option>
                        <option value="Maldives">Maldives 🇲🇻</option>
                        <option value="United Arab Emirates">United Arab Emirates 🇦🇪</option>
                        <option value="Other / Multi-Destination">Other / Multi-Destination 🌍</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 block">
                      {isBn ? "আপনার বার্তা / বিশেষ প্রয়োজন" : "Your Message / Specific Requirements"}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={
                        isBn
                          ? "আপনার সম্ভাব্য ভ্রমণের তারিখ, যাত্রীর সংখ্যা বা বাজেট সম্পর্কে লিখুন যাতে আমরা সঠিক তথ্য দিয়ে সাহায্য করতে পারি..."
                          : "Please write down your budget constraints, travel dates, or special assistance needs so we can guide you effectively..."
                      }
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-brand-navy rounded-xl px-4 py-3 text-slate-800 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="w-full bg-brand-navy hover:bg-slate-800 text-[#F6B73C] font-black text-xs uppercase py-3.5 rounded-xl shadow-md tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {contactLoading ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>
                        <span>{isBn ? "পাঠানো হচ্ছে..." : "Processing Inquiry..."}</span>
                      </>
                    ) : (
                      <>
                        <span>{isBn ? "জিজ্ঞাসা সাবমিট করুন" : "Submit Travel Inquiry"}</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Side info card (Col 5) */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-widest">SUPPORT COVENANT</span>
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  {isBn ? "কেন সরাসরি URAL-এর সাথে কথা বলবেন?" : "Why Contact URAL Directly?"}
                </h3>
                
                <div className="space-y-3.5 text-xs text-slate-650">
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>
                    <p>
                      {isBn ? (
                        <>
                          <b>১০০% ফ্রি পরামর্শ:</b> ভিসা ডকুমেন্ট চেক বা কম ভাড়ার ফ্লাইট খোঁজার জন্য আমরা কোনো কনসালটেশন ফি নিই না।
                        </>
                      ) : (
                        <>
                          <b>100% Free Consultation:</b> We never charge any fees to verify visa documents or search for cheap flights.
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>
                    <p>
                      {isBn ? (
                        <>
                          <b>ভেরিফায়েড পার্টনার নেটওয়ার্ক:</b> অনুমোদিত ভিসা ডেস্ক এবং বিশ্বস্ত ট্রাভেল অপারেটরের মাধ্যমে নিরাপদ বুকিং।
                        </>
                      ) : (
                        <>
                          <b>Authorized Referrals:</b> Connect to approved visa processing desks and Travelpayouts verified operators.
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-500 mt-0.5 shrink-0">✔</span>
                    <p>
                      {isBn ? (
                        <>
                          <b>দ্রুত কলব্যাক:</b> ফর্ম সাবমিট করার ১–২ ঘণ্টার মধ্যে আমাদের টিম সরাসরি কল বা WhatsApp-এ যোগাযোগ করে।
                        </>
                      ) : (
                        <>
                          <b>Direct Callback:</b> Bangladeshi tourists receive a personal callback within 1-2 hours of submission.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-250 p-4 rounded-xl border border-slate-300 text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">DIRECT DIAL DESK</span>
                <span className="text-sm font-serif font-black text-brand-navy block">+8801784385335</span>
                <span className="text-[9px] text-slate-400 block">
                  {isBn ? "২৪/৭ WhatsApp মেসেঞ্জারে সচল" : "Available 24/7 on WhatsApp Messenger"}
                </span>
              </div>
            </div>

          </div>

          {/* Contact & Booking Consultation FAQs */}
          <TravelIntelligence
            pageTitle={isBn ? "ট্রাভেল বুকিং সহায়তা ও সাপোর্ট ডেস্ক" : "Travel Booking Assistance & Desk Support"}
            quickAnswer={
              isBn
                ? "URAL বাংলাদেশি ভ্রমণকারীদের জন্য ট্যুর প্ল্যানিং, ভিসা ডকুমেন্ট রিভিউ এবং সরাসরি এজেন্সি বুকিং সহায়তা প্রদান করে (+8801784385335 WhatsApp ও হটলাইন)। ফ্লাইট টিকেট ও হোটেল বুকিংয়ের পেমেন্ট bKash, Nagad বা লোকাল ব্যাংক ট্রান্সফারের মাধ্যমে বাংলাদেশি টাকায় (BDT) সম্পন্ন করা যায়।"
                : "URAL connects Bangladeshi travelers with dedicated itinerary planning, visa checklist reviews, and direct agency booking services via WhatsApp (+8801784385335) and hotline. All ticket and hotel payments can be completed safely in BDT via domestic banking, bKash, or in person."
            }
            keyFacts={[
              { label: isBn ? "হেল্পলাইন" : "Helpline", value: "+8801784385335 (Direct / WhatsApp)" },
              { label: isBn ? "রেসপন্স সময়" : "Response Window", value: "15 to 30 Mins (Dhaka Time)" },
              { label: isBn ? "পেমেন্ট মাধ্যম" : "Payment Flexibility", value: "BDT (bKash / Nagad / Bank Transfer)" },
              { label: isBn ? "ভেরিফিকেশন" : "Desk Verification", value: "Verified IATA Agency Network" }
            ]}
            faqs={SERVICE_CONTACT_FAQS}
          />

        </div>
      )}

      {/* -------------------------------------------------------------
          🎟️ VIEW 11: GLOBAL ATTRACTIONS & SKIP-THE-LINE HUB (TIQETS & KLOOK)
      ------------------------------------------------------------- */}
      {section === "experiences" && (
        <ExperiencesPage lang={lang} onNavigate={navigateTo} />
      )}

      {/* -------------------------------------------------------------
          🕋 VIEW 12: DEDICATED UMRAH & HAJJ PAID-ADS LANDING PAGE
      ------------------------------------------------------------- */}
      {section === "umrah" && (
        <UmrahLandingPage
          lang={lang}
          localizedHajjFaqs={localizedHajjFaqs}
          onNavigate={navigateTo}
          coverImage={umrahMakkahImg}
        />
      )}

      {/* -------------------------------------------------------------
          ✈️ VIEW 10: DHAKA AIRPORT (DAC) PRE-DEPARTURE & EMBASSY HUB
      ------------------------------------------------------------- */}
      {section === "sitemap" && (
        <SitemapPage onNavigate={navigateTo} lang={lang} />
      )}

      {section === "notFound" && (
        <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-sm">
          <div className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-brand-emerald">404 · Page not found</div>
          <h1 className="mt-3 font-serif text-3xl font-black text-brand-navy">We can’t find that travel page.</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600">The address may have changed or the guide may no longer be available. Browse our travel guides or return to the home page.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => navigateTo("/")} className="rounded-xl bg-brand-navy px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800">Go to home</button>
            <button type="button" onClick={() => navigateTo("/blog")} className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-brand-navy transition-colors hover:bg-slate-200">Browse travel guides</button>
          </div>
        </section>
      )}

      </main>

      {/* 🔮 MASTER FOOTER BLOCK */}
      <footer className="bg-brand-navy text-slate-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <img
                src="/assets/brand/svg/ural-wordmark.svg"
                alt="URAL"
                width="82"
                height="28"
                className="h-7 w-auto"
              />
              <span className="text-[11px] font-semibold tracking-wide text-slate-300">Travel Intelligence</span>
            </div>
            <p className="leading-relaxed text-slate-400">
              {isBn
                ? "বাংলাদেশি ভ্রমণকারীদের জন্য ফ্লাইট ভাড়া, হোটেল গাইড, ভিসা চেকলিস্ট, Umrah প্রস্তুতি এবং BDT ট্রিপ বাজেট।"
                : "Flight prices, hotel guides, visa steps, and trip budgets — built for travelers from Bangladesh."}
            </p>
            <div className="pt-1 text-[11px] font-semibold">
              <a
                href="/sitemap"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("/sitemap");
                }}
                className="text-[#F6B73C] hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <span>
                  {isBn
                    ? "✈️ ঢাকা এয়ারপোর্ট (DAC) চেকলিস্ট ও সব গাইড ডিরেক্টরি →"
                    : "✈️ Dhaka Airport (DAC) Checklist & All Guides Directory →"}
                </span>
              </a>
            </div>
            <p className="text-[10px] font-mono text-slate-500">
              {isBn
                ? "© 2026 URAL Platforms. বাংলাদেশ থেকে আন্তর্জাতিক ফ্লাইট রুট, ভিসা চেকলিস্ট ও হোটেল গাইড।"
                : "© 2026 URAL Platforms. Outbound flight routes, visa checklists, and hotel guides from Bangladesh."}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold font-mono uppercase text-xs block mb-1">
              {isBn ? "জনপ্রিয় ফ্লাইট রুট" : "Flights Destination Directory"}
            </span>
            <ul className="space-y-1 text-xs">
              <li><a href="/flights/dhaka-kathmandu" onClick={(e) => { e.preventDefault(); navigateTo("/flights/dhaka-kathmandu"); }} className="hover:text-white hover:underline text-left cursor-pointer">Dhaka → Kathmandu (KTM)</a></li>
              <li><a href="/flights/dhaka-bangkok" onClick={(e) => { e.preventDefault(); navigateTo("/flights/dhaka-bangkok"); }} className="hover:text-white hover:underline text-left cursor-pointer">Dhaka → Bangkok (BKK)</a></li>
              <li><a href="/flights/dhaka-kuala-lumpur" onClick={(e) => { e.preventDefault(); navigateTo("/flights/dhaka-kuala-lumpur"); }} className="hover:text-white hover:underline text-left cursor-pointer">Dhaka → Kuala Lumpur (KUL)</a></li>
              <li><a href="/flights/dhaka-singapore" onClick={(e) => { e.preventDefault(); navigateTo("/flights/dhaka-singapore"); }} className="hover:text-white hover:underline text-left cursor-pointer">Dhaka → Singapore (SIN)</a></li>
              <li><a href="/flights/dhaka-maldives" onClick={(e) => { e.preventDefault(); navigateTo("/flights/dhaka-maldives"); }} className="hover:text-white hover:underline text-left cursor-pointer">Dhaka → Malé, Maldives (MLE)</a></li>
              <li><a href="/flights/dhaka-dubai" onClick={(e) => { e.preventDefault(); navigateTo("/flights/dhaka-dubai"); }} className="hover:text-white hover:underline text-left cursor-pointer">Dhaka → Dubai (DXB)</a></li>
              <li><a href="/umrah" onClick={(e) => { e.preventDefault(); navigateTo("/umrah"); }} className="text-[#F6B73C] hover:underline text-left cursor-pointer">Dhaka → Jeddah & Madinah (Umrah Hub)</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold font-mono uppercase text-xs block mb-1">
              {isBn ? "দেশ অনুযায়ী ভিসা গাইড" : "Visa Guides by Country"}
            </span>
            <ul className="space-y-1 text-xs">
              <li><a href="/visa/nepal-visa" onClick={(e) => { e.preventDefault(); navigateTo("/visa/nepal-visa"); }} className="hover:text-white hover:underline text-left cursor-pointer">{isBn ? "Nepal ফ্রি Visa on Arrival" : "Nepal Free Visa on Arrival"}</a></li>
              <li><a href="/visa/maldives-visa" onClick={(e) => { e.preventDefault(); navigateTo("/visa/maldives-visa"); }} className="hover:text-white hover:underline text-left cursor-pointer">{isBn ? "Maldives ফ্রি VOA + IMUGA" : "Maldives Free VOA + IMUGA"}</a></li>
              <li><a href="/visa/thailand-visa" onClick={(e) => { e.preventDefault(); navigateTo("/visa/thailand-visa"); }} className="hover:text-white hover:underline text-left cursor-pointer">{isBn ? "Thailand অফিসিয়াল e-Visa" : "Thailand Official e-Visa"}</a></li>
              <li><a href="/visa/malaysia-visa" onClick={(e) => { e.preventDefault(); navigateTo("/visa/malaysia-visa"); }} className="hover:text-white hover:underline text-left cursor-pointer">{isBn ? "Malaysia অনলাইন eVisa" : "Malaysia Online eVisa"}</a></li>
              <li><a href="/visa/singapore-visa" onClick={(e) => { e.preventDefault(); navigateTo("/visa/singapore-visa"); }} className="hover:text-white hover:underline text-left cursor-pointer">{isBn ? "Singapore অনুমোদিত এজেন্ট ভিসা" : "Singapore Authorized Agent Visa"}</a></li>
              <li><a href="/visa/dubai-visa" onClick={(e) => { e.preventDefault(); navigateTo("/visa/dubai-visa"); }} className="hover:text-white hover:underline text-left cursor-pointer">{isBn ? "UAE Dubai ট্যুরিস্ট eVisa" : "UAE Dubai Tourist eVisa"}</a></li>
              <li><a href="/blog" onClick={(e) => { e.preventDefault(); navigateTo("/blog"); }} className="text-[#F6B73C] hover:underline text-left cursor-pointer">{isBn ? "সবগুলো ৪১টি ট্রাভেল ব্লগ গাইড →" : "All 41 Travel Blog Guides →"}</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-white font-bold font-mono uppercase text-xs block mb-1">
              {isBn ? "ট্রাভেল সার্ভিস পার্টনার" : "Travel Services"}
            </span>
            <ul className="space-y-1 text-xs">
              <li><a href={AFFILIATE_LINKS.tiqets} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Europe, UK & USA Passes (Tiqets)</a></li>
              <li><a href={AFFILIATE_LINKS.klook} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Asia & Dubai Tours (Klook)</a></li>
              <li><a href={AFFILIATE_LINKS.airhelp} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Flight Delay Compensation (AirHelp · Code AHTPO11)</a></li>
              <li><a href={AFFILIATE_LINKS.welcomePickups} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Welcome Pickups (Meet & Greet)</a></li>
              <li><a href={AFFILIATE_LINKS.kiwitaxi} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Kiwitaxi Airport Transfers</a></li>
              <li><a href={AFFILIATE_LINKS.qeeq} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Car Rental (QEEQ)</a></li>
              <li><a href={AFFILIATE_LINKS.airalo} target="_blank" rel="noopener noreferrer sponsored" className="hover:text-white hover:underline">Local Travel eSIM (Airalo)</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-white font-bold font-mono uppercase text-xs block mb-1">
              {isBn ? "সরাসরি সাপোর্ট ও যোগাযোগ" : "Direct Support & Contact"}
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-brand-ivory">💬</span>
                <a href="https://wa.me/8801784385335?text=Hi%20URAL%2C%20I%20need%20travel%20assistance%21" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline text-brand-ivory font-mono font-bold">WhatsApp: 01784385335</a>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#F6B73C]">📞</span>
                <a href="tel:+8801784385335" className="hover:text-white hover:underline text-[#F6B73C] font-mono font-bold">Direct Call: +8801784385335</a>
              </div>
              <div className="pt-1">
                <button onClick={() => navigateTo("/contact")} className="bg-slate-800 text-[#F6B73C] hover:bg-slate-700 px-3 py-1.5 rounded-md font-bold text-[10px] uppercase tracking-wide cursor-pointer transition-colors">
                  {isBn ? "যোগাযোগ ফর্ম পেজ" : "Contact Form Page"}
                </button>
              </div>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-500 pt-2 border-t border-slate-800">
              {isBn ? (
                <>
                  <b>স্বচ্ছতা:</b> আমাদের সাইটের পার্টনার লিংকের মাধ্যমে বুকিং সম্পন্ন হলে আপনার অতিরিক্ত কোনো খরচ ছাড়াই URAL সামান্য কমিশন পেতে পারে।
                </>
              ) : (
                <>
                  <b>Transparency:</b> URAL earns a small commission on travel reservations completed via links on our site, at no extra cost to you.
                </>
              )}
            </p>
          </div>

        </div>
      </footer>

      {/* Dynamic Action Affiliate Conversion Toast Overlay */}
      {affiliateToast && (
        <div id="converter-toast" className="fixed bottom-6 right-6 z-50 max-w-sm bg-brand-navy text-white p-4 rounded-xl shadow-2xl border border-[#F6B73C] animate-fade-in flex items-start gap-4">
          <div className="p-2 bg-[#F6B73C] text-brand-navy rounded-lg shrink-0 text-xs">🚀</div>
          <div className="space-y-1 text-xs">
            <span className="font-mono font-bold text-[#F6B73C] block uppercase tracking-wide font-sans">Secure Partner Dispatch</span>
            <p className="leading-relaxed font-sans text-slate-300">{affiliateToast}</p>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-mono mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Redirecting via secure affiliate link...</span>
            </div>
          </div>
          <button onClick={() => setAffiliateToast(null)} className="text-slate-400 hover:text-white font-mono text-xs cursor-pointer ml-auto">×</button>
        </div>
      )}

      {/* Direct Floating WhatsApp Contact Launcher */}
      <WhatsAppSupport lang={lang} />

      {/* Flight Price Drop Alert Modal */}
      <PriceAlertModal
        isOpen={isPriceAlertOpen}
        onClose={() => setIsPriceAlertOpen(false)}
        lang={lang}
        defaultDestination={alertDestination}
      />

    </div>
  );
}
