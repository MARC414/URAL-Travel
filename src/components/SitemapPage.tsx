import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Plane,
  ShieldCheck,
  Luggage,
  PhoneCall,
  FileCheck2,
  CreditCard,
  Search,
  RotateCcw,
  Sparkles,
  MapPin,
  AlertTriangle,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { Language } from "../translations";
import { getLocalizedBlogs } from "../data/bengaliContent";
import {
  getPreDepartureFaqSchema,
  PRE_DEPARTURE_SITEMAP_FAQS,
} from "../hooks/useSeoMeta";

interface SitemapPageProps {
  onNavigate: (path: string) => void;
  lang?: Language;
}

interface ChecklistItem {
  id: string;
  stage: "banking" | "immigration" | "boarding";
  titleEn: string;
  titleBn: string;
  detailEn: string;
  detailBn: string;
  actionLabelEn?: string;
  actionLabelBn?: string;
  actionPath?: string;
}

const PRE_DEPARTURE_CHECKLIST: ChecklistItem[] = [
  {
    id: "passport-6m",
    stage: "banking",
    titleEn: "Passport Validity (6+ Months from Return Date)",
    titleBn: "পাসপোর্টের মেয়াদ (ফেরার তারিখ থেকে কমপক্ষে ৬ মাস)",
    detailEn:
      "Airlines at Dhaka Airport (DAC) will deny boarding if your passport expires within 180 days of your return flight.",
    detailBn:
      "পাসপোর্টের মেয়াদ ৬ মাসের কম থাকলে ঢাকা এয়ারপোর্টে এয়ারলাইন্স বোর্ডিং পাস ইস্যু করবে না। কমপক্ষে ২টি খালি পাতা থাকতে হবে।",
  },
  {
    id: "dollar-endorsement",
    stage: "banking",
    titleEn: "Dual-Currency Card Endorsement & E-Commerce Activation",
    titleBn: "ডুয়াল-কারেন্সি কার্ডে ডলার এন্ডোর্সমেন্ট ও E-Commerce চালু",
    detailEn:
      "Get your passport stamped under the $12,000 annual travel quota at your bank branch and turn ON Foreign POS & E-Commerce in your banking app.",
    detailBn:
      "ব্যাংক ব্রাঞ্চ থেকে পাসপোর্টে বার্ষিক $১২,০০০ কোটায় এন্ডোর্সমেন্ট সিল নিন এবং ব্যাংক অ্যাপ বা হেল্পলাইনে কল করে ফরেন ট্রানজেকশন চালু করুন।",
    actionLabelEn: "Read Card Endorsement Guide",
    actionLabelBn: "কার্ড এন্ডোর্সমেন্ট গাইড পড়ুন",
    actionPath: "/blog/dual-currency-card-endorsement-bangladesh",
  },
  {
    id: "usd-cash-carry",
    stage: "banking",
    titleEn: "Carry USD $300–$500 Cash Alongside Your Card",
    titleBn: "কার্ডের পাশাপাশি নগদ $৩০০–$৫০০ মার্কিন ডলার সাথে রাখুন",
    detailEn:
      "Carry crisp, undamaged 2013+ series $100 USD bills for Visa on Arrival fees, Thailand immigration proof of funds, or emergency money exchange.",
    detailBn:
      "দাগ বা ভাঁজ ছাড়া নতুন সিরিজের $১০০ ডলার নোট সাথে রাখুন—অন-অ্যারাইভাল ভিসা ফি, থাইল্যান্ড ইমিগ্রেশন বা জরুরি মানি এক্সচেঞ্জে প্রয়োজন হয়।",
    actionLabelEn: "Open BDT Currency Tool",
    actionLabelBn: "কারেন্সি কনভার্টার দেখুন",
    actionPath: "/tools",
  },
  {
    id: "return-ticket-hotel",
    stage: "immigration",
    titleEn: "Printed Return Air Ticket & Confirmed Hotel Voucher",
    titleBn: "প্রিন্টেড রিটার্ন এয়ার টিকেট ও কনফার্মড হোটেল ভাউচার",
    detailEn:
      "Always print hard copies of your two-way return flight ticket and hotel booking confirmation—DAC immigration officers routinely inspect paper copies.",
    detailBn:
      "ট্যুরিস্ট ভিসায় ওয়ান-ওয়ে টিকেটে ভ্রমণ করা যায় না। যাওয়া-আসার কনফার্মড রিটার্ন টিকেট ও হোটেল বুকিংয়ের প্রিন্ট কপি হাতের কাছে রাখুন।",
    actionLabelEn: "Compare Dhaka Flights",
    actionLabelBn: "ঢাকা থেকে ফ্লাইট খুঁজুন",
    actionPath: "/flights",
  },
  {
    id: "noc-go-profession",
    stage: "immigration",
    titleEn: "Profession Proof: Office NOC / Govt GO / Trade License / Student ID",
    titleBn: "পেশার প্রমাণপত্র: অফিস NOC / সরকারি GO / ট্রেড লাইসেন্স / স্টুডেন্ট আইডি",
    detailEn:
      "Private job holders need a printed NOC + Office ID; govt/bank staff need an official GO; business owners need Trade License copy; newlyweds should carry Nikahnama.",
    detailBn:
      "বেসরকারি চাকরিজীবীদের NOC ও অফিস আইডি, সরকারি কর্মীদের GO, ব্যবসায়ীদের ট্রেড লাইসেন্স কপি এবং নবদম্পতিদের নিকাহনামা সাথে রাখা জরুরি।",
    actionLabelEn: "Dhaka Immigration Checklist",
    actionLabelBn: "ঢাকা ইমিগ্রেশন চেকলিস্ট",
    actionPath: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go",
  },
  {
    id: "bank-solvency",
    stage: "immigration",
    titleEn: "Printed 6-Month Bank Statement (For First-Time Flyers)",
    titleBn: "৬ মাসের ব্যাংক স্টেটমেন্ট (প্রথমবার বিদেশ ভ্রমণকারীদের জন্য)",
    detailEn:
      "If this is your first international trip on a fresh Bangladeshi passport, carry your bank statement copy matching the one submitted for your visa.",
    detailBn:
      "নতুন পাসপোর্টে প্রথমবার বিদেশ যাওয়ার ক্ষেত্রে ভিসা আবেদনে ব্যবহৃত ব্যাংক স্টেটমেন্টের কপি সাথে রাখলে ইমিগ্রেশন দ্রুত সম্পন্ন হয়।",
  },
  {
    id: "digital-arrival-card",
    stage: "boarding",
    titleEn: "Digital Arrival Card Submitted (72 Hours Before Flight)",
    titleBn: "ডিজিটাল অ্যারাইভাল কার্ড পূরণ (ফ্লাইটের ৭২ ঘণ্টা আগে)",
    detailEn:
      "Submit Malaysia MDAC, Singapore SGAC (MyICA), Maldives IMUGA, Thailand TDAC, or Saudi Nusuk permit online—completely free on official government portals.",
    detailBn:
      "মালয়েশিয়া (MDAC), সিঙ্গাপুর (SGAC), মালদ্বীপ (IMUGA) বা ওমরাহর ক্ষেত্রে (Nusuk) ফ্লাইটের ৩ দিন আগে অনলাইনে বিনামূল্যে পূরণ করুন।",
    actionLabelEn: "Check Country Visa Rules",
    actionLabelBn: "দেশভিত্তিক ভিসা নিয়ম দেখুন",
    actionPath: "/visa",
  },
  {
    id: "powerbank-handcarry",
    stage: "boarding",
    titleEn: "Power Bank (Max 20,000 mAh) Packed in Hand Carry Only",
    titleBn: "পাওয়ার ব্যাংক (সর্বোচ্চ ২০,০০০ mAh) অবশ্যই হ্যান্ড ব্যাগে রাখুন",
    detailEn:
      "Never put power banks, spare lithium batteries, or laptops in checked-in luggage—DAC security scanners will hold or confiscate them.",
    detailBn:
      "পাওয়ার ব্যাংক বা লিথিয়াম ব্যাটারি কখনোই বড় লাগেজে (Checked Baggage) দেবেন না—হ্যান্ড ক্যারিতে রাখুন, নতুবা সিকিউরিটি স্ক্যানিংয়ে জব্দ হতে পারে।",
  },
  {
    id: "esim-offline-docs",
    stage: "boarding",
    titleEn: "Pre-Install Travel eSIM & Save Offline Document Scans",
    titleBn: "ট্রাভেল eSIM ইনস্টল ও ফোনে অফলাইন ডকুমেন্ট ব্যাকআপ",
    detailEn:
      "Install your local eSIM before takeoff so Grab/Uber and Google Maps work upon landing, and save PDF copies of your passport & visa offline.",
    detailBn:
      "দেশ ছাড়ার আগেই ফোনে eSIM ইনস্টল করে নিন যাতে ল্যান্ড করার সাথে সাথেই ইন্টারনেট পান এবং পাসপোর্ট ও ভিসার ছবি অফলাইনে সেভ রাখুন।",
  },
];

const EMBASSY_DIRECTORY = [
  {
    countryEn: "Nepal (Kathmandu)",
    countryBn: "নেপাল (কাঠমান্ডু)",
    flag: "🇳🇵",
    missionEn: "Embassy of Bangladesh, Kathmandu",
    missionBn: "বাংলাদেশ দূতাবাস, কাঠমান্ডু",
    address: "Maharajgunj, Ring Road, Ward No. 3, Kathmandu, Nepal",
    phone: "+977-1-4372843",
    emergencyNoteEn: "Issues Emergency Travel Permits (Travel Pass) if passport is lost in Thamel/Pokhara.",
    emergencyNoteBn: "নেপালে পাসপোর্ট হারালে জরুরি ট্রাভেল পাস ইস্যু ও কনস্যুলার সহায়তা প্রদান করে।",
    visaPath: "/visa/nepal-visa",
    guidePath: "/destinations/nepal-guide",
  },
  {
    countryEn: "Thailand (Bangkok)",
    countryBn: "থাইল্যান্ড (ব্যাংকক)",
    flag: "🇹🇭",
    missionEn: "Embassy of Bangladesh, Bangkok",
    missionBn: "বাংলাদেশ দূতাবাস, ব্যাংকক",
    address: "47/8 Ekamai Soi 30, Sukhumvit 63, Watthana, Bangkok 10110",
    phone: "+66-2-3905107",
    emergencyNoteEn: "Located near Sukhumvit/Ekamai; assists Bangladeshi tourists and medical patients at Bumrungrad/Bangkok Hospital.",
    emergencyNoteBn: "সুখুমভিত একামাই এলাকায় অবস্থিত; পর্যটক ও চিকিৎসা নিতে যাওয়া বাংলাদেশিদের জরুরি সহায়তা দেয়।",
    visaPath: "/visa/thailand-visa",
    guidePath: "/destinations/thailand-guide",
  },
  {
    countryEn: "Malaysia (Kuala Lumpur)",
    countryBn: "মালয়েশিয়া (কুয়ালালামপুর)",
    flag: "🇲🇾",
    missionEn: "High Commission of Bangladesh, KL",
    missionBn: "বাংলাদেশ হাইকমিশন, কুয়ালালামপুর",
    address: "Lot 9 & 10, Jalan Sultan Yahya Petra, 54100 Kuala Lumpur",
    phone: "+60-3-26040946",
    emergencyNoteEn: "Consular wing assists with emergency travel documents and KLIA immigration liaison.",
    emergencyNoteBn: "জরুরি পাসপোর্ট সহায়তা এবং কুয়ালালামপুরে অবস্থানরত বাংলাদেশি নাগরিকদের সেবা প্রদান করে।",
    visaPath: "/visa/malaysia-visa",
    guidePath: "/destinations/malaysia-guide",
  },
  {
    countryEn: "Singapore",
    countryBn: "সিঙ্গাপুর",
    flag: "🇸🇬",
    missionEn: "High Commission of Bangladesh, Singapore",
    missionBn: "বাংলাদেশ হাইকমিশন, সিঙ্গাপুর",
    address: "91 Bencoolen Street, #04-01 Sunshine Plaza, Singapore 189652",
    phone: "+65-62550075",
    emergencyNoteEn: "Walking distance from Bugis / Bencoolen MRT; fast consular support during weekday hours.",
    emergencyNoteBn: "বুগিস ও বেনকুলেন MRT-এর কাছে সানশাইন প্লাজায় অবস্থিত; দ্রুত কনস্যুলার সহায়তা পাওয়া যায়।",
    visaPath: "/visa/singapore-visa",
    guidePath: "/destinations/singapore-guide",
  },
  {
    countryEn: "Maldives (Malé)",
    countryBn: "মালদ্বীপ (মালে)",
    flag: "🇲🇻",
    missionEn: "High Commission of Bangladesh, Malé",
    missionBn: "বাংলাদেশ হাইকমিশন, মালে",
    address: "M. Luxury, 7th Floor, Orchid Magu, Malé, Maldives",
    phone: "+960-3320859",
    emergencyNoteEn: "Central Malé location near ferry terminals; assists tourists traveling to Maafushi & Hulhumalé.",
    emergencyNoteBn: "মালে শহরের কেন্দ্রস্থলে অবস্থিত; মাফুশি ও হুলহুমালে ভ্রমণকারীদের জরুরি সহায়তা দেয়।",
    visaPath: "/visa/maldives-visa",
    guidePath: "/destinations/maldives-guide",
  },
  {
    countryEn: "UAE (Dubai & Abu Dhabi)",
    countryBn: "সংযুক্ত আরব আমিরাত (দুবাই)",
    flag: "🇦🇪",
    missionEn: "Consulate General of Bangladesh, Dubai",
    missionBn: "বাংলাদেশ কনস্যুলেট জেনারেল, দুবাই",
    address: "Villa 36 & 145, Al Wuheida Rd, Deira, Dubai, UAE",
    phone: "+971-4-2388199",
    emergencyNoteEn: "Conveniently located in Deira for tourists staying near Al Rigga, Bur Dubai, and Downtown.",
    emergencyNoteBn: "দেইরা এলাকায় অবস্থিত; দুবাই ও উত্তর আমিরাতে ভ্রমণরত বাংলাদেশিদের জরুরি সেবা দেয়।",
    visaPath: "/visa/dubai-visa",
    guidePath: "/destinations/dubai-guide",
  },
  {
    countryEn: "Saudi Arabia (Jeddah & Makkah)",
    countryBn: "সৌদি আরব (জেদ্দা ও মক্কা ওমরাহ মিশন)",
    flag: "🇸🇦",
    missionEn: "Consulate General of Bangladesh, Jeddah",
    missionBn: "বাংলাদেশ কনস্যুলেট জেনারেল, জেদ্দা",
    address: "Al-Nuzlah Al-Yamaniyah District, Kilo-3, Jeddah, Saudi Arabia",
    phone: "+966-12-6878465",
    emergencyNoteEn: "Dedicated Hajj & Umrah Welfare Wing for Bangladeshi pilgrims in Makkah, Madinah, and Jeddah.",
    emergencyNoteBn: "মক্কা, মদিনা ও জেদ্দায় ওমরাহ ও হজযাত্রীদের জরুরি চিকিৎসা ও হারানো পাসপোর্ট সেবায় নিয়োজিত।",
    visaPath: "/umrah",
    guidePath: "/umrah",
  },
];

const COUNTRY_QUICK_MATRIX = [
  {
    countryEn: "Nepal",
    countryBn: "নেপাল",
    flag: "🇳🇵",
    taglineEn: "Free SAARC Visa on Arrival · 1h 30m flight",
    taglineBn: "ফ্রি অন-অ্যারাইভাল ভিসা · ১ ঘণ্টা ৩০ মিনিটের ফ্লাইট",
    flightPath: "/flights/dhaka-kathmandu",
    visaPath: "/visa/nepal-visa",
    hotelPath: "/hotels/kathmandu-hotels",
    planPath: "/destinations/nepal-guide",
    costPath: "/costs/nepal-costs",
  },
  {
    countryEn: "Thailand",
    countryBn: "থাইল্যান্ড",
    flag: "🇹🇭",
    taglineEn: "Official e-Visa · Bangkok & Phuket islands",
    taglineBn: "অফিসিয়াল ই-ভিসা · ব্যাংকক, ফুকেট ও হালাল ডাইনিং",
    flightPath: "/flights/dhaka-bangkok",
    visaPath: "/visa/thailand-visa",
    hotelPath: "/hotels/bangkok-hotels",
    planPath: "/destinations/thailand-guide",
    costPath: "/costs/thailand-costs",
  },
  {
    countryEn: "Malaysia",
    countryBn: "মালয়েশিয়া",
    flag: "🇲🇾",
    taglineEn: "Fast Online e-Visa · 100% Halal-friendly hub",
    taglineBn: "দ্রুত অনলাইন ই-ভিসা · ফ্যামিলি ও হালাল ফুড হাব",
    flightPath: "/flights/dhaka-kuala-lumpur",
    visaPath: "/visa/malaysia-visa",
    hotelPath: "/hotels/kuala-lumpur-hotels",
    planPath: "/destinations/malaysia-guide",
    costPath: "/costs/malaysia-costs",
  },
  {
    countryEn: "Singapore",
    countryBn: "সিঙ্গাপুর",
    flag: "🇸🇬",
    taglineEn: "Authorized Agent e-Visa · Sentosa & Marina Bay",
    taglineBn: "অনুমোদিত এজেন্ট ভিসা · মেরিনা বে ও সেন্টোসা",
    flightPath: "/flights/dhaka-singapore",
    visaPath: "/visa/singapore-visa",
    hotelPath: "/hotels/singapore-hotels",
    planPath: "/destinations/singapore-guide",
    costPath: "/costs/singapore-costs",
  },
  {
    countryEn: "Maldives",
    countryBn: "মালদ্বীপ",
    flag: "🇲🇻",
    taglineEn: "Free 30-Day VOA · Maafushi & Water Villas",
    taglineBn: "ফ্রি ৩০ দিনের ভিসা · মাফুশি ও ওয়াটার ভিলা",
    flightPath: "/flights/dhaka-maldives",
    visaPath: "/visa/maldives-visa",
    hotelPath: "/hotels/maldives-hotels",
    planPath: "/destinations/maldives-guide",
    costPath: "/costs/maldives-costs",
  },
  {
    countryEn: "Dubai & UAE",
    countryBn: "দুবাই ও আমিরাত",
    flag: "🇦🇪",
    taglineEn: "Tourist e-Visa · Desert Safari & Burj Khalifa",
    taglineBn: "ট্যুরিস্ট ই-ভিসা · ডেজার্ট সাফারি ও বুর্জ খলিফা",
    flightPath: "/flights/dhaka-dubai",
    visaPath: "/visa/dubai-visa",
    hotelPath: "/hotels/dubai-hotels",
    planPath: "/destinations/dubai-guide",
    costPath: "/costs/dubai-costs",
  },
];

const STORAGE_KEY = "ural_dac_predeparture_checked_v1";

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate, lang = "en" as Language }) => {
  const isBn = lang === "bn";

  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return ["passport-6m", "return-ticket-hotel"];
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ["passport-6m", "return-ticket-hotel"];
    } catch {
      return ["passport-6m", "return-ticket-hotel"];
    }
  });

  const [countrySearch, setCountrySearch] = useState("");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const localizedBlogs = useMemo(() => getLocalizedBlogs(lang), [lang]);

  const uncheckedChecklistItems = useMemo(
    () =>
      PRE_DEPARTURE_CHECKLIST.filter((item) => !checkedIds.includes(item.id)).map(
        (item) => ({
          title: isBn ? item.titleBn : item.titleEn,
          detail: isBn ? item.detailBn : item.detailEn,
          titleEn: item.titleEn,
          detailEn: item.detailEn,
        })
      ),
    [checkedIds, isBn]
  );

  const localizedPreDepartureFaqs = useMemo(() => {
    const baseFaqs = [
      {
        questionEn: PRE_DEPARTURE_SITEMAP_FAQS[0].question,
        answerEn: PRE_DEPARTURE_SITEMAP_FAQS[0].answer,
        questionBn:
          "ঢাকা এয়ারপোর্ট (DAC) ইমিগ্রেশনে বাংলাদেশি যাত্রীদের কী কী কাগজপত্র দেখাতে হয়?",
        answerBn:
          "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর (DAC) দিয়ে বিদেশ ভ্রমণের সময় কমপক্ষে ৬ মাস মেয়াদী মূল পাসপোর্ট, প্রিন্টেড রিটার্ন এয়ার টিকেট, কনফার্মড হোটেল ভাউচার, বৈধ ভিসা বা ই-ভিসার কপি, পেশার প্রমাণপত্র (বেসরকারি চাকরিজীবীদের NOC ও অফিস আইডি, সরকারি কর্মীদের GO, ব্যবসায়ীদের ট্রেড লাইসেন্স বা স্টুডেন্ট আইডি) এবং পাসপোর্টে এন্ডোর্সকৃত ডুয়াল-কারেন্সি কার্ড বা নগদ মার্কিন ডলার সাথে রাখতে হয়।",
      },
      {
        questionEn: PRE_DEPARTURE_SITEMAP_FAQS[1].question,
        answerEn: PRE_DEPARTURE_SITEMAP_FAQS[1].answer,
        questionBn:
          "আন্তর্জাতিক ফ্লাইটের কত ঘণ্টা আগে ঢাকা এয়ারপোর্টে (DAC) পৌঁছানো উচিত?",
        answerBn:
          "চেক-ইন কাউন্টার, লাগেজ ড্রপ এবং ইমিগ্রেশন লাইনের ভিড় এড়াতে ফ্লাইট ছাড়ার নির্ধারিত সময়ের কমপক্ষে ৩.৫ থেকে ৪ ঘণ্টা আগে ঢাকা বিমানবন্দরের টার্মিনালে পৌঁছানো উচিত।",
      },
      {
        questionEn: PRE_DEPARTURE_SITEMAP_FAQS[2].question,
        answerEn: PRE_DEPARTURE_SITEMAP_FAQS[2].answer,
        questionBn:
          "ঢাকা এয়ারপোর্টে পাওয়ার ব্যাংক, ব্যাটারি ও কেবিন লাগেজের নিয়ম কী?",
        answerBn:
          "হ্যান্ড ক্যারিতে সর্বোচ্চ ৭ কেজি ওজন এবং ১০০ মি.লি.-এর কম বোতলে তরল পদার্থ বহন করা যায়। পাওয়ার ব্যাংক (সর্বোচ্চ ২০,০০০ mAh বা ১০০ Wh) এবং অতিরিক্ত লিথিয়াম ব্যাটারি কখনোই চেকড লাগেজে দেওয়া যাবে না—অবশ্যই হ্যান্ড ব্যাগে রাখতে হবে এবং গায়ে mAh ক্ষমতা স্পষ্টভাবে লেখা থাকতে হবে।",
      },
      {
        questionEn: PRE_DEPARTURE_SITEMAP_FAQS[3].question,
        answerEn: PRE_DEPARTURE_SITEMAP_FAQS[3].answer,
        questionBn:
          "বাংলাদেশি পাসপোর্টে বছরে কত ডলার এন্ডোর্স করা যায় এবং কাস্টমসে স্বর্ণ আনার সীমা কত?",
        answerBn:
          "বাংলাদেশ ব্যাংকের নিয়ম অনুযায়ী প্রাপ্তবয়স্ক যাত্রীরা বার্ষিক সর্বোচ্চ USD $১২,০০০ পর্যন্ত পাসপোর্টে এন্ডোর্স করে ডুয়াল-কারেন্সি কার্ড ও নগদ অর্থে বহন করতে পারেন। ফেরার সময় গ্রিন চ্যানেল দিয়ে শুল্কমুক্তভাবে সর্বোচ্চ ১০০ গ্রাম ব্যক্তিগত স্বর্ণালংকার এবং ২টি মোবাইল ফোন আনা যায়।",
      },
      {
        questionEn: PRE_DEPARTURE_SITEMAP_FAQS[4].question,
        answerEn: PRE_DEPARTURE_SITEMAP_FAQS[4].answer,
        questionBn:
          "ওমরাহ ও হজযাত্রীরা ঢাকা ফেরার সময় কতটুকু জমজম পানি বিনামূল্যে আনতে পারবেন?",
        answerBn:
          "জেদ্দা (JED) বা মদিনা (MED) এয়ারপোর্ট থেকে বিমান বাংলাদেশ, সৌদিয়া বা নির্ধারিত এয়ারলাইন্সে ফেরার সময় বৈধ ওমরাহ বা হজ ভিসাধারী প্রত্যেক যাত্রী মূল চেকড লাগেজের অতিরিক্ত হিসেবে বিনামূল্যে ১টি সিলকৃত ৫ লিটারের জমজম পানির কার্টন আনতে পারবেন।",
      },
      {
        questionEn: PRE_DEPARTURE_SITEMAP_FAQS[5].question,
        answerEn: PRE_DEPARTURE_SITEMAP_FAQS[5].answer,
        questionBn:
          "কোন কোন দেশে যাওয়ার আগে ৭২ ঘণ্টার মধ্যে অনলাইনে ফ্রি ডিজিটাল অ্যারাইভাল কার্ড পূরণ করতে হয়?",
        answerBn:
          "ঢাকা থেকে ফ্লাইটের ৭২ ঘণ্টা আগে মালয়েশিয়ার জন্য MDAC, সিঙ্গাপুরের জন্য SGAC (MyICA অ্যাপ), মালদ্বীপের জন্য IMUGA এবং থাইল্যান্ডের জন্য TDAC সরকারি ওয়েবসাইটে বিনামূল্যে পূরণ করতে হয়। এছাড়া ওমরাহ যাত্রীদের জন্য Saudi Visa Bio ও Nusuk অ্যাপ নিবন্ধন আবশ্যক।",
      },
      {
        questionEn: PRE_DEPARTURE_SITEMAP_FAQS[6].question,
        answerEn: PRE_DEPARTURE_SITEMAP_FAQS[6].answer,
        questionBn:
          "বিদেশে ভ্রমণকালে পাসপোর্ট হারিয়ে বা চুরি হয়ে গেলে করণীয় কী?",
        answerBn:
          "বিদেশে পাসপোর্ট হারালে সাথে সাথে নিকটস্থ পুলিশ স্টেশনে জিডি (Police Report) করুন এবং পাসপোর্ট ও এনআইডির ফটোকপি নিয়ে কাঠমান্ডু, ব্যাংকক, কুয়ালালামপুর, সিঙ্গাপুর, মালে, দুবাই বা জেদ্দায় অবস্থিত বাংলাদেশ দূতাবাসে যোগাযোগ করে দেশে ফেরার জন্য Emergency Travel Permit (Travel Pass) সংগ্রহ করুন।",
      },
    ];

    const dynamicChecklistFaqs = uncheckedChecklistItems.slice(0, 2).map((item) => ({
      questionEn: `Why is "${item.titleEn}" required before flying out of Dhaka Airport (DAC)?`,
      answerEn: item.detailEn,
      questionBn: `ঢাকা এয়ারপোর্টে ফ্লাইটের আগে "${item.title}" কেন জরুরি?`,
      answerBn: item.detail,
    }));

    return [...baseFaqs, ...dynamicChecklistFaqs];
  }, [uncheckedChecklistItems]);

  // Dynamically synchronize the Schema.org FAQPage JSON-LD in document.head when checklist or country filter state updates
  useEffect(() => {
    if (typeof document === "undefined") return;
    const dynamicSchema = getPreDepartureFaqSchema({
      url: "https://ural-travel.pages.dev/sitemap",
      uncheckedChecklistItems: uncheckedChecklistItems.map((i) => ({
        title: i.titleEn,
        detail: i.detailEn,
      })),
      countryFilter: countrySearch.trim() || undefined,
    });

    const existingScripts = Array.from(
      document.querySelectorAll('script[type="application/ld+json"][data-seo-schema="true"]')
    );
    existingScripts.forEach((el) => {
      try {
        const parsed = JSON.parse(el.textContent || "{}");
        if (parsed && Array.isArray(parsed["@graph"])) {
          const idx = parsed["@graph"].findIndex(
            (n: Record<string, unknown>) => n && n["@type"] === "FAQPage"
          );
          const { "@context": _ctx, ...faqNode } = dynamicSchema as unknown as Record<string, unknown>;
          faqNode["@id"] = "https://ural-travel.pages.dev/sitemap#faq";
          faqNode["mainEntityOfPage"] = { "@id": "https://ural-travel.pages.dev/sitemap#webpage" };
          if (idx >= 0) {
            parsed["@graph"][idx] = faqNode;
          } else {
            parsed["@graph"].push(faqNode);
          }
          el.textContent = JSON.stringify(parsed);
        } else if (parsed && parsed["@type"] === "FAQPage") {
          el.textContent = JSON.stringify(dynamicSchema);
        }
      } catch {
        // ignore parse errors
      }
    });
  }, [uncheckedChecklistItems, countrySearch]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
    } catch {
      // ignore storage quota errors
    }
  }, [checkedIds]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const resetChecklist = () => {
    setCheckedIds([]);
  };

  const progressPct = Math.round(
    (checkedIds.length / PRE_DEPARTURE_CHECKLIST.length) * 100
  );

  const filteredCountries = useMemo(() => {
    const q = countrySearch.trim().toLowerCase();
    if (!q) return COUNTRY_QUICK_MATRIX;
    return COUNTRY_QUICK_MATRIX.filter(
      (c) =>
        c.countryEn.toLowerCase().includes(q) ||
        c.countryBn.includes(q) ||
        c.taglineEn.toLowerCase().includes(q)
    );
  }, [countrySearch]);

  const stages: Array<{
    key: ChecklistItem["stage"];
    badgeEn: string;
    badgeBn: string;
    titleEn: string;
    titleBn: string;
  }> = [
    {
      key: "banking",
      badgeEn: "STAGE 01 · 7 DAYS BEFORE FLIGHT",
      badgeBn: "ধাপ ০১ · ফ্লাইটের ৭ দিন আগে",
      titleEn: "Passport, Dollar Endorsement & Foreign Currency",
      titleBn: "পাসপোর্ট, ডলার এন্ডোর্সমেন্ট ও ফরেন কারেন্সি",
    },
    {
      key: "immigration",
      badgeEn: "STAGE 02 · DHAKA IMMIGRATION DESK",
      badgeBn: "ধাপ ০২ · ঢাকা এয়ারপোর্ট ইমিগ্রেশন ডেস্ক",
      titleEn: "Mandatory Printed Documents for DAC Officers",
      titleBn: "ইমিগ্রেশন কাউন্টারে প্রদর্শনের আবশ্যক কাগজপত্র",
    },
    {
      key: "boarding",
      badgeEn: "STAGE 03 · 72 HOURS BEFORE TAKEOFF",
      badgeBn: "ধাপ ০৩ · উড্ডয়নের ৭২ ঘণ্টা আগে",
      titleEn: "Digital Arrival Cards, Cabin Safety & eSIM",
      titleBn: "ডিজিটাল অ্যারাইভাল কার্ড, পাওয়ার ব্যাংক ও eSIM",
    },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* 1. HERO HEADER BANNER */}
      <div className="bg-brand-navy text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs text-[#F6B73C] font-mono bg-[#F6B73C]/10 border border-[#F6B73C]/25 px-3.5 py-1 rounded-full">
              <Plane size={13} />
              <span>
                {isBn
                  ? "হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর (DAC) · প্রি-ডিপার্চার হাব"
                  : "Hazrat Shahjalal International Airport (DAC) · Traveler Readiness Hub"}
              </span>
            </div>
            <h1
              className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white"
              style={{ textWrap: "balance" }}
            >
              {isBn
                ? "ঢাকা এয়ারপোর্ট প্রি-ডিপার্চার চেকলিস্ট, লাগেজ নিয়ম ও দূতাবাস হেল্পলাইন"
                : "Dhaka Airport (DAC) Pre-Departure Checklist & Traveler Emergency Hub"}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isBn
                ? "বিমানবন্দরে রওনা দেওয়ার আগে আপনার পাসপোর্ট এন্ডোর্সমেন্ট, NOC/GO, রিটার্ন টিকেট ও ডিজিটাল অ্যারাইভাল কার্ড যাচাই করে নিন। পাশাপাশি কেবিন লাগেজ, জমজম পানির নিয়ম এবং বিদেশে বাংলাদেশ দূতাবাসের জরুরি নাম্বারগুলো হাতের কাছে রাখুন।"
                : "Everything a Bangladeshi traveler needs in the final 72 hours before flying out of Dhaka (DAC) — verify your immigration documents, check cabin & Zamzam baggage rules, save Bangladesh Embassy emergency numbers, or jump directly to any country guide."}
            </p>
          </div>

          {/* Live Readiness Meter Card */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 min-w-[260px] space-y-2.5 shrink-0">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono uppercase tracking-wider text-slate-400">
                {isBn ? "আপনার ফ্লাইট প্রস্তুতি" : "Flight Readiness Score"}
              </span>
              <span className="font-mono font-bold text-[#F6B73C] text-sm tabular-nums">
                {checkedIds.length}/{PRE_DEPARTURE_CHECKLIST.length} ({progressPct}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#F6B73C] to-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-400">
                {progressPct === 100
                  ? isBn
                    ? "✅ আপনি ইমিগ্রেশনের জন্য সম্পূর্ণ প্রস্তুত!"
                    : "✅ All set for DAC Immigration!"
                  : isBn
                  ? "চেকলিস্টে টিক দিয়ে অগ্রগতি সেভ করুন"
                  : "Tap items below to check them off"}
              </span>
              {checkedIds.length > 0 && (
                <button
                  type="button"
                  onClick={resetChecklist}
                  className="text-[11px] text-slate-400 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw size={11} />
                  <span>{isBn ? "রিসেট" : "Reset"}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Essential DAC Airport Quick Rules Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 text-left">
          {[
            {
              value: isBn ? "৩.৫ – ৪ ঘণ্টা আগে" : "3.5 – 4 Hours Early",
              label: isBn ? "এয়ারপোর্টে পৌঁছানোর সময়" : "Arrive at DAC Terminal 1 / 2",
              note: isBn ? "চেক-ইন ও ইমিগ্রেশন লাইনের জন্য" : "Buffer for check-in & immigration",
            },
            {
              value: "USD $12,000 / Yr",
              label: isBn ? "বার্ষিক পাসপোর্ট ডলার কোটা" : "Annual Travel Quota",
              note: isBn ? "ডুয়াল-কারেন্সি কার্ড এন্ডোর্সমেন্ট" : "Bangladesh Bank card endorsement",
            },
            {
              value: isBn ? "৭ কেজি + ২০/৩০ কেজি" : "7 kg Cabin + 20–30 kg",
              label: isBn ? "স্ট্যান্ডার্ড লাগেজ সীমা" : "Standard Baggage Allowance",
              note: isBn ? "পাওয়ার ব্যাংক শুধুমাত্র হ্যান্ড ব্যাগে" : "Power banks in hand carry only",
            },
            {
              value: isBn ? "৫ লিটার (ফ্রি)" : "5 Liters Free",
              label: isBn ? "জমজম পানির অনুমোদন" : "Zamzam Water Allowance",
              note: isBn ? "ওমরাহ ও হজযাত্রীদের জন্য (সিলকৃত)" : "1 sealed airport pack per pilgrim",
            },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1 bg-white/4 rounded-xl p-3.5 border border-white/8">
              <div className="text-base sm:text-lg font-bold text-[#F6B73C] font-mono tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-white">{stat.label}</div>
              <div className="text-[11px] text-slate-400">{stat.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. INTERACTIVE 3-STAGE PRE-DEPARTURE CHECKLIST */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-brand-navy uppercase tracking-wider block">
              {isBn ? "📋 ইন্টারেক্টিভ প্রি-ফ্লাইট চেকলিস্ট" : "📋 INTERACTIVE PRE-FLIGHT VERIFICATION"}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              {isBn
                ? "বিমানবন্দরে যাওয়ার আগে ৯টি আবশ্যক ধাপ মিলিয়ে নিন"
                : "9 Essential Checks Before Leaving for Dhaka Airport (DAC)"}
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            {isBn
              ? "আপনার টিক দেওয়া তথ্য ব্রাউজারে স্বয়ংক্রিয়ভাবে সেভ থাকে"
              : "Your progress is saved automatically on this device"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {stages.map((stage) => {
            const stageItems = PRE_DEPARTURE_CHECKLIST.filter((i) => i.stage === stage.key);
            return (
              <div
                key={stage.key}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-brand-navy uppercase tracking-wider block">
                      {isBn ? stage.badgeBn : stage.badgeEn}
                    </span>
                    <h3 className="font-serif text-base font-bold text-slate-900">
                      {isBn ? stage.titleBn : stage.titleEn}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {stageItems.map((item) => {
                      const isDone = checkedIds.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                            isDone
                              ? "bg-emerald-50/60 border-emerald-200"
                              : "bg-slate-50/70 hover:bg-slate-50 border-slate-200"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 shrink-0">
                              {isDone ? (
                                <CheckCircle2 size={18} className="text-emerald-600" />
                              ) : (
                                <Circle size={18} className="text-slate-400" />
                              )}
                            </span>
                            <div className="space-y-1.5 min-w-0">
                              <div
                                className={`text-xs font-bold leading-snug ${
                                  isDone ? "text-emerald-950 line-through" : "text-slate-900"
                                }`}
                              >
                                {isBn ? item.titleBn : item.titleEn}
                              </div>
                              <p className="text-[11.5px] text-slate-600 leading-relaxed">
                                {isBn ? item.detailBn : item.detailEn}
                              </p>
                              {item.actionPath && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onNavigate(item.actionPath!);
                                  }}
                                  className="text-[11px] font-semibold text-brand-navy hover:text-brand-emerald inline-flex items-center gap-1 pt-0.5 cursor-pointer"
                                >
                                  <span>
                                    {isBn ? item.actionLabelBn : item.actionLabelEn}
                                  </span>
                                  <ArrowRight size={11} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. DHAKA AIRPORT (DAC) BAGGAGE, ZAMZAM & CUSTOMS RULES */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-brand-navy uppercase tracking-wider block">
            {isBn ? "🧳 লাগেজ, কাস্টমস ও বিমানবন্দর নিয়মাবলী" : "🧳 DAC BAGGAGE, ZAMZAM & CUSTOMS RULES"}
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            {isBn
              ? "হযরত শাহজালাল বিমানবন্দরে লাগেজ, পাওয়ার ব্যাংক ও কাস্টমস গাইড"
              : "Baggage Limits, Power Banks, Zamzam Water & Customs Allowance"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Luggage size={17} className="text-brand-navy" />
              <span>
                {isBn
                  ? "কেবিন লাগেজ (৭ কেজি) ও তরল পদার্থের নিয়ম"
                  : "Cabin Baggage (7 kg) & 100ml Liquid Rule"}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? "হ্যান্ড ক্যারিতে সর্বোচ্চ ৭ কেজি ওজন এবং ১০০ মি.লি.-এর বেশি পারফিউম, লোশন বা তরল নেওয়া নিষেধ। বড় শ্যাম্পু, আচার বা কসমেটিকস অবশ্যই চেকড লাগেজে (২০–৩০ কেজি) প্যাক করুন।"
                : "Carry-on bags are capped at 7 kg across Biman, US-Bangla, AirAsia, and Gulf carriers. Perfumes, lotions, and gels in hand carry must be in containers of 100ml or less; pack larger bottles in checked luggage."}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <AlertTriangle size={17} className="text-amber-600" />
              <span>
                {isBn
                  ? "পাওয়ার ব্যাংক ও ব্যাটারি সতর্কতা (খুবই গুরুত্বপূর্ণ)"
                  : "Power Bank & Lithium Battery Rule (Strict at DAC)"}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? "পাওয়ার ব্যাংক (সর্বোচ্চ ২০,০০০ mAh বা ১০০ Wh) কখনোই বড় লাগেজে দেবেন না। এটি অবশ্যই হ্যান্ড ব্যাগে রাখতে হবে। গায়ে mAh লেখা মুছে গেলে এয়ারপোর্ট সিকিউরিটি সেটি জব্দ করতে পারে।"
                : "Power banks up to 20,000 mAh (100Wh) are strictly allowed in Hand Carry only. Never place power banks in checked luggage, and ensure the mAh capacity label is clearly printed on the casing."}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Sparkles size={17} className="text-emerald-600" />
              <span>
                {isBn
                  ? "ওমরাহ ও হজযাত্রীদের জন্য জমজম পানির নিয়ম"
                  : "Zamzam Water Rules for Umrah & Hajj Pilgrims"}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? "জেদ্দা বা মদিনা এয়ারপোর্ট থেকে ফেরার সময় ওমরাহ বা হজ ভিসাধারী প্রত্যেক যাত্রী মূল লাগেজের বাইরে বিনামূল্যে ১টি সিলকৃত ৫ লিটারের জমজম পানির কার্টন আনতে পারবেন।"
                : "Pilgrims flying back from Jeddah (JED) or Madinah (MED) on Biman, Saudia, or scheduled carriers are entitled to 1 official sealed 5-liter Zamzam bottle free of charge in addition to checked baggage."}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <CreditCard size={17} className="text-brand-navy" />
              <span>
                {isBn
                  ? "বৈদেশিক মুদ্রা ও স্বর্ণালংকার কাস্টমস সীমা"
                  : "Foreign Currency & Gold Ornaments Customs Limit"}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? "বাংলাদেশ ব্যাংকের নিয়ম অনুযায়ী বার্ষিক সর্বোচ্চ $১২,০০০ পর্যন্ত পাসপোর্টে এন্ডোর্স করা যায়। শুল্কমুক্তভাবে ব্যক্তিগত ব্যবহারের জন্য সর্বোচ্চ ১০০ গ্রাম স্বর্ণালংকার এবং ১টি নতুন ফোন আনা যায়।"
                : "Travelers can endorse up to USD $12,000 annually per adult passport. Returning passengers may bring up to 100 grams of personal gold ornaments and 2 phones duty-free through the DAC Green Channel."}
            </p>
          </div>
        </div>
      </section>

      {/* 4. OVERSEAS BANGLADESH EMBASSY & HIGH COMMISSION EMERGENCY DIRECTORY */}
      <section className="space-y-5">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-brand-navy uppercase tracking-wider block">
            {isBn
              ? "🇧🇩 প্রবাসে বাংলাদেশ দূতাবাস ও জরুরি হেল্পলাইন"
              : "🇧🇩 BANGLADESH EMBASSY & CONSULAR HELPLINES ABROAD"}
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            {isBn
              ? "বিদেশে পাসপোর্ট হারালে বা জরুরি প্রয়োজনে বাংলাদেশ মিশনের ঠিকানা ও ফোন নাম্বার"
              : "Verified Bangladesh Missions Abroad (Lost Passport & Emergency Support)"}
          </h2>
          <p className="text-xs text-slate-500">
            {isBn
              ? "ভ্রমণকালে পাসপোর্ট হারিয়ে গেলে নিকটস্থ পুলিশ স্টেশনে জিডি (Police Report) করে নিচের বাংলাদেশ দূতাবাসে যোগাযোগ করলে দেশে ফেরার জন্য Emergency Travel Permit পাওয়া যায়।"
              : "If your passport is lost or stolen abroad, file a local Police Report immediately and contact the nearest Bangladesh Embassy/High Commission below for an Emergency Travel Permit."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EMBASSY_DIRECTORY.map((emb) => (
            <div
              key={emb.countryEn}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span className="text-lg">{emb.flag}</span>
                    <span>{isBn ? emb.countryBn : emb.countryEn}</span>
                  </span>
                  <a
                    href={`tel:${emb.phone}`}
                    className="text-xs font-mono font-bold text-brand-navy bg-slate-100 hover:bg-brand-navy hover:text-white px-2.5 py-1 rounded-lg transition-colors inline-flex items-center gap-1"
                  >
                    <PhoneCall size={11} />
                    <span>{emb.phone}</span>
                  </a>
                </div>

                <div className="text-xs font-semibold text-slate-800">
                  {isBn ? emb.missionBn : emb.missionEn}
                </div>

                <div className="text-[11.5px] text-slate-500 flex items-start gap-1.5">
                  <MapPin size={13} className="text-slate-400 shrink-0 mt-0.5" />
                  <span>{emb.address}</span>
                </div>

                <p className="text-[11.5px] text-slate-600 bg-slate-50 border border-slate-100 rounded-xl p-2.5 leading-relaxed">
                  {isBn ? emb.emergencyNoteBn : emb.emergencyNoteEn}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => onNavigate(emb.visaPath)}
                  className="text-brand-navy hover:underline cursor-pointer"
                >
                  {isBn ? "ভিসা গাইড" : "Visa Guide"}
                </button>
                <span className="text-slate-300">·</span>
                <button
                  type="button"
                  onClick={() => onNavigate(emb.guidePath)}
                  className="text-brand-navy hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{isBn ? "পূর্ণাঙ্গ ভ্রমণ গাইড" : "Full Country Guide"}</span>
                  <ArrowRight size={11} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ONE-CLICK COUNTRY & GUIDE QUICK FINDER */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-brand-navy uppercase tracking-wider block">
              {isBn ? "🧭 এক ক্লিকে সব গন্তব্যের গাইড" : "🧭 ALL-IN-ONE DESTINATION QUICK FINDER"}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              {isBn
                ? "দেশ অনুযায়ী ফ্লাইট, ভিসা, হোটেল ও BDT বাজেট শিট বেছে নিন"
                : "Jump Directly to Any Country's Flight, Visa, Hotel, or BDT Budget Guide"}
            </h2>
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={countrySearch}
              onChange={(e) => setCountrySearch(e.target.value)}
              placeholder={
                isBn ? "দেশের নাম লিখুন (যেমন: Nepal, Dubai)..." : "Filter country (e.g. Nepal, Dubai)..."
              }
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-navy rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCountries.map((item) => (
            <div
              key={item.countryEn}
              className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 hover:bg-white transition-colors space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>{item.flag}</span>
                    <span>{isBn ? item.countryBn : item.countryEn}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {isBn ? item.taglineBn : item.taglineEn}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <a
                  href={item.flightPath}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.flightPath);
                  }}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-brand-navy text-slate-800 text-left flex items-center justify-between cursor-pointer"
                >
                  <span>✈️ {isBn ? "ফ্লাইট রুট" : "Flights"}</span>
                  <ArrowRight size={11} className="text-slate-400" />
                </a>
                <a
                  href={item.visaPath}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.visaPath);
                  }}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-brand-navy text-slate-800 text-left flex items-center justify-between cursor-pointer"
                >
                  <span>🛂 {isBn ? "ভিসা চেকলিস্ট" : "Visa Rules"}</span>
                  <ArrowRight size={11} className="text-slate-400" />
                </a>
                <a
                  href={item.hotelPath}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.hotelPath);
                  }}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-brand-navy text-slate-800 text-left flex items-center justify-between cursor-pointer"
                >
                  <span>🏨 {isBn ? "হোটেল জোন" : "Best Hotels"}</span>
                  <ArrowRight size={11} className="text-slate-400" />
                </a>
                <a
                  href={item.costPath}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.costPath);
                  }}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-brand-navy text-slate-800 text-left flex items-center justify-between cursor-pointer"
                >
                  <span>📊 {isBn ? "BDT বাজেট" : "BDT Budget"}</span>
                  <ArrowRight size={11} className="text-slate-400" />
                </a>
              </div>

              <a
                href={item.planPath}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.planPath);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-brand-navy hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>
                  {isBn
                    ? `${item.countryBn} ভ্রমণ গাইড ও ইটিনারারি দেখুন`
                    : `Explore ${item.countryEn} Full Itinerary`}
                </span>
                <ArrowRight size={13} className="text-[#F6B73C]" />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom Popular Hubs Bar */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono font-bold text-slate-500 uppercase">
              {isBn ? "বিশেষ হাব:" : "More Essential Hubs:"}
            </span>
            <a
              href="/umrah"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/umrah");
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-navy hover:text-white text-slate-800 font-semibold transition-colors cursor-pointer"
            >
              🕋 {isBn ? "ওমরাহ ও হজ প্ল্যানার ২০২৬" : "Umrah & Hajj Hub 2026"}
            </a>
            <a
              href="/experiences"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/experiences");
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-navy hover:text-white text-slate-800 font-semibold transition-colors cursor-pointer"
            >
              🎟️ {isBn ? "ইউরোপ, UK, USA ও এশিয়া অ্যাক্টিভিটি পাস" : "Europe, UK, USA & Asia Passes"}
            </a>
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/blog");
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-navy hover:text-white text-slate-800 font-semibold transition-colors cursor-pointer"
            >
              📖 {isBn ? "সবগুলো ৪১টি ট্রাভেল ব্লগ ও গাইড" : "All 41 Travel Blog Guides"}
            </a>
            <a
              href="/tools?tab=airhelp"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/tools?tab=airhelp");
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-navy hover:text-white text-slate-800 font-semibold transition-colors cursor-pointer"
            >
              🛡️ {isBn ? "ফ্লাইট বিলম্ব ক্ষতিপূরণ (€600)" : "Flight Delay Claim (€600)"}
            </a>
          </div>
        </div>
      </section>

      {/* 6. DYNAMIC PRE-DEPARTURE READINESS & DHAKA AIRPORT (DAC) FAQS */}
      <section
        aria-labelledby="predeparture-faq-heading"
        className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-brand-navy uppercase tracking-wider block">
              {isBn
                ? "❓ প্রি-ডিপার্চার ও ঢাকা এয়ারপোর্ট (DAC) সাধারণ জিজ্ঞাসা"
                : "❓ PRE-FLIGHT READINESS & DHAKA AIRPORT (DAC) FAQS"}
            </span>
            <h2
              id="predeparture-faq-heading"
              className="font-serif text-xl sm:text-2xl font-bold text-slate-900"
            >
              {isBn
                ? "ইমিগ্রেশন, লাগেজ, ডলার এন্ডোর্সমেন্ট ও জরুরি নিয়মাবলী (FAQ)"
                : "Frequently Asked Questions Before Flying Out of Dhaka (DAC)"}
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            {isBn
              ? `আপনার চেকলিস্ট অগ্রগতি (${progressPct}%) অনুযায়ী ডায়নামিক প্রশ্নোত্তর সংযুক্ত`
              : `Dynamically tailored to your pre-flight checklist (${progressPct}% complete)`}
          </p>
        </div>

        <div className="divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden">
          {localizedPreDepartureFaqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div key={faq.questionEn} className="bg-white">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`predeparture-faq-answer-${idx}`}
                  id={`predeparture-faq-trigger-${idx}`}
                  onClick={() => setOpenFaqIdx((prev) => (prev === idx ? null : idx))}
                  className="w-full min-h-[52px] px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
                >
                  <span className="text-sm font-bold text-slate-900 leading-snug">
                    {isBn ? faq.questionBn : faq.questionEn}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-brand-navy" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    id={`predeparture-faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`predeparture-faq-trigger-${idx}`}
                    className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50"
                  >
                    {isBn ? faq.answerBn : faq.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. COMPLETE CRAWLABLE HTML SITEMAP DIRECTORY (ALL 41 BLOG GUIDES & 42 HUBS) */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-brand-navy uppercase tracking-wider block">
            {isBn
              ? "📚 সম্পূর্ণ সাইট ডিরেক্টরি (৪১টি গাইড ও ৪২টি হাব পেজ)"
              : "📚 COMPLETE CRAWLABLE DIRECTORY · ALL 41 BLOG GUIDES & 42 HUB PAGES"}
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            {isBn
              ? "বাংলাদেশি ভ্রমণকারীদের জন্য আমাদের সবগুলো ৪১টি গাইডের সরাসরি লিংক"
              : "All 41 Verified Bangladesh Outbound Travel & Umrah Guides (Direct Anchor Index)"}
          </h2>
          <p className="text-xs text-slate-500">
            {isBn
              ? "সার্চ ইঞ্জিন ক্রলার এবং পাঠকদের দ্রুত নেভিগেশনের জন্য প্রতিটি গাইডের সরাসরি HTML লিংক নিচে দেওয়া হলো:"
              : "Every guide below is linked via standard HTML <a href> tags so Googlebot and readers can reach any article in one click:"}
          </p>
        </div>

        <nav
          aria-label="All 41 Bangladesh Travel Blog Guides"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {localizedBlogs.map((post, idx) => {
            const href = `/blog/${post.slug}`;
            return (
              <a
                key={post.slug}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(href);
                }}
                className="group p-3.5 rounded-2xl border border-slate-200 hover:border-brand-navy bg-slate-50/60 hover:bg-white transition-all flex items-start gap-3"
              >
                <span className="text-[11px] font-mono font-bold text-brand-navy bg-slate-200/80 group-hover:bg-[#F6B73C] px-2 py-0.5 rounded-md shrink-0 mt-0.5">
                  #{String(idx + 1).padStart(2, "0")}
                </span>
                <div className="space-y-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-brand-navy leading-snug line-clamp-2">
                    {post.title}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                    <BookOpen size={10} />
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </nav>
      </section>
    </div>
  );
};
