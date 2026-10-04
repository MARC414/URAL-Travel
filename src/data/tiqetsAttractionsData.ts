export interface TiqetsAttractionItem {
  productId: string;
  cityId: string;
  cityName: string;
  country: string;
  title: string;
  titleBn: string;
  category: "landmark" | "cruise" | "viewpoint" | "museum" | "transit" | "pass" | "family";
  badge: string;
  badgeBn: string;
  soldOutRescue?: boolean;
  skipTheLine?: boolean;
  audioGuide?: boolean;
  rooftopAccess?: boolean;
  priceUsd: number;
  priceBdt: number;
  commissionTier: "High-Ticket (6-8%)" | "Core Anchor (5-7%)" | "Fast Add-On (3.5-5%)";
  audienceMatch: string;
  audienceMatchBn: string;
  whyItConverts: string;
  whyItConvertsBn: string;
}

export interface CityTripleStack {
  cityId: string;
  cityName: string;
  cityNameBn: string;
  country: string;
  flag: string;
  VisaCategoryForBd: string;
  VisaCategoryForBdBn: string;
  heroTagline: string;
  heroTaglineBn: string;
  bundleTitle: string;
  bundleTitleBn: string;
  morningSlot: {
    time: string;
    label: string;
    productId: string;
    title: string;
    priceUsd: number;
    perk: string;
  };
  afternoonSlot: {
    time: string;
    label: string;
    productId: string;
    title: string;
    priceUsd: number;
    perk: string;
  };
  sunsetSlot: {
    time: string;
    label: string;
    productId: string;
    title: string;
    priceUsd: number;
    perk: string;
  };
  airportTransit: {
    productId: string;
    title: string;
    priceUsd: number;
    note: string;
  };
}

export const TIQETS_PARTNER_LINK = "https://tiqets.tpo.li/KSc4uyIB";

export const TIQETS_CITY_STACKS: CityTripleStack[] = [
  {
    cityId: "london",
    cityName: "London",
    cityNameBn: "লন্ডন (যুক্তরাজ্য)",
    country: "United Kingdom",
    flag: "🇬🇧",
    VisaCategoryForBd: "UK Standard Visitor Visa (VFS Dhaka / Sylhet)",
    VisaCategoryForBdBn: "UK স্ট্যান্ডার্ড ভিজিটর ভিসা (VFS ঢাকা / সিলেট)",
    heroTagline: "Top destination for Bangladeshi diaspora, family visits & students — skip 2-hour ticket queues on the Thames.",
    heroTaglineBn: "বাংলাদেশি পরিবার, শিক্ষার্থী ও ভ্রমণকারীদের সবচেয়ে জনপ্রিয় গন্তব্য — দীর্ঘ লাইন এড়িয়ে ফাস্ট-ট্র্যাক টিকেট কাটুন।",
    bundleTitle: "The Classic Royal & Thames 1-Day Triple-Stack",
    bundleTitleBn: "রয়্যাল লন্ডন ও টেমস নদী ১-দিনের কম্বো প্ল্যান",
    morningSlot: {
      time: "09:30 AM",
      label: "Iconic Landmark",
      productId: "974054",
      title: "Tower of London + Crown Jewels Entry",
      priceUsd: 44,
      perk: "Beat the midday tour groups at the Crown Jewels vault"
    },
    afternoonSlot: {
      time: "02:00 PM",
      label: "River Cruise",
      productId: "975431",
      title: "Thames Cruise: Westminster to Greenwich",
      priceUsd: 24,
      perk: "Skip the tube — sail past Tower Bridge & Big Ben"
    },
    sunsetSlot: {
      time: "06:00 PM",
      label: "Panoramic Viewpoint",
      productId: "973995",
      title: "The View from The Shard (Level 72)",
      priceUsd: 42,
      perk: "Western Europe's highest open-air 360° skydeck at golden hour"
    },
    airportTransit: {
      productId: "1048837",
      title: "Heathrow Express (LHR to Paddington in 15 Mins)",
      priceUsd: 32,
      note: "Fastest transfer after a Biman direct DAC–LHR flight"
    }
  },
  {
    cityId: "paris",
    cityName: "Paris",
    cityNameBn: "প্যারিস (ফ্রান্স)",
    country: "France",
    flag: "🇫🇷",
    VisaCategoryForBd: "Schengen Tourist Visa (France Embassy / VFS Dhaka)",
    VisaCategoryForBdBn: "সেনজেন ট্যুরিস্ট ভিসা (ফ্রান্স দূতাবাস / VFS ঢাকা)",
    heroTagline: "Official Louvre & Eiffel Summit slots sell out 3 weeks ahead — secure verified Tiqets reseller allotments.",
    heroTaglineBn: "অফিসিয়াল ওয়েবসাইটে লুভর ও আইফেল টাওয়ারের টিকেট ৩ সপ্তাহ আগেই শেষ হয়ে যায় — এখান থেকে রিজার্ভড স্লট নিন।",
    bundleTitle: "The Parisian Masterpiece, Rooftop & Seine 1-Day Stack",
    bundleTitleBn: "প্যারিস মিউজিয়াম, রুফটপ ও সেইন নদী ক্রুজ ১-দিনের কম্বো",
    morningSlot: {
      time: "09:30 AM",
      label: "Priority Museum",
      productId: "1065031",
      title: "Louvre Museum: Priority Entry + Direct Access to Mona Lisa",
      priceUsd: 69,
      perk: "Dedicated host takes you straight to the Mona Lisa room"
    },
    afternoonSlot: {
      time: "03:30 PM",
      label: "Panoramic Rooftop",
      productId: "974146",
      title: "Arc de Triomphe: Entry Ticket + Rooftop Access",
      priceUsd: 18,
      perk: "Best Champs-Élysées & Eiffel Tower photo angle in Paris"
    },
    sunsetSlot: {
      time: "07:30 PM",
      label: "River Cruise",
      productId: "973977",
      title: "Sightseeing Cruise On The Seine (From Eiffel Tower Foot)",
      priceUsd: 19,
      perk: "Watch the Eiffel Tower sparkle from the water with audio guide"
    },
    airportTransit: {
      productId: "1053154",
      title: "Paris Beauvais Airport Official Shuttle Bus",
      priceUsd: 20,
      note: "Direct coach transfer synced with European budget flights"
    }
  },
  {
    cityId: "rome",
    cityName: "Rome",
    cityNameBn: "রোম (ইতালি)",
    country: "Italy",
    flag: "🇮🇹",
    VisaCategoryForBd: "Schengen Visa (Italy VFS Dhaka)",
    VisaCategoryForBdBn: "সেনজেন ভিসা (ইতালি VFS ঢাকা)",
    heroTagline: "Home to Europe's #1 and #2 most sold-out landmarks — Colosseum Arena & Vatican Sistine Chapel Fast-Track.",
    heroTaglineBn: "কলোসিয়াম এবং ভ্যাটিকান মিউজিয়ামের ফাস্ট-ট্র্যাক অ্যাক্সেস — রোদে দীর্ঘ লাইনে দাঁড়ানোর ঝামেলা ছাড়াই প্রবেশ।",
    bundleTitle: "Ancient Rome & Vatican Fast-Track 1-Day Stack",
    bundleTitleBn: "প্রাচীন রোম ও ভ্যাটিকান ফাস্ট-ট্র্যাক ১-দিনের কম্বো",
    morningSlot: {
      time: "09:00 AM",
      label: "Ancient Wonder",
      productId: "997640",
      title: "Colosseum, Arena Floor, Roman Forum & Palatine Hill + Audio Guide",
      priceUsd: 64,
      perk: "Includes restricted Gladiator Arena Floor access"
    },
    afternoonSlot: {
      time: "01:30 PM",
      label: "Fast-Track Dome",
      productId: "1097231",
      title: "Rome Pantheon: Fast Track Ticket + Audio Guide App",
      priceUsd: 17,
      perk: "Skip the piazza ticket machine queue with QR entry"
    },
    sunsetSlot: {
      time: "04:00 PM",
      label: "Masterpiece Access",
      productId: "973975",
      title: "Vatican Museums & Sistine Chapel: Fast Track Ticket",
      priceUsd: 49,
      perk: "Dedicated entrance bypassing the 2-hour wall queue"
    },
    airportTransit: {
      productId: "1012261",
      title: "Leonardo Express: Fiumicino Airport (FCO) to Rome Termini",
      priceUsd: 19,
      note: "Non-stop 32-minute high-speed airport rail"
    }
  },
  {
    cityId: "new-york",
    cityName: "New York",
    cityNameBn: "নিউ ইয়র্ক (যুক্তরাষ্ট্র)",
    country: "United States",
    flag: "🇺🇸",
    VisaCategoryForBd: "US B1/B2 Tourist Visa (US Embassy Dhaka)",
    VisaCategoryForBdBn: "US B1/B2 ট্যুরিস্ট ভিসা (যুক্তরাষ্ট্র দূতাবাস ঢাকা)",
    heroTagline: "High-ticket skyline observatories, Statue of Liberty ferries & Broadway musicals with instant mobile QR entry.",
    heroTaglineBn: "স্ট্যাচু অফ লিবার্টি ফেরি, সামিট ওয়ান ভ্যান্ডারবিল্ট এবং এম্পায়ার স্টেট বিল্ডিংয়ের তাৎক্ষণিক মোবাইল টিকেট।",
    bundleTitle: "The Ultimate Manhattan Skyline & Harbor 1-Day Stack",
    bundleTitleBn: "ম্যানহাটন স্কাইলাইন ও হারবার ১-দিনের কম্বো",
    morningSlot: {
      time: "09:00 AM",
      label: "Harbor Icon",
      productId: "974085",
      title: "Statue of Liberty & Ellis Island: Entry Ticket + Ferry from Manhattan",
      priceUsd: 31,
      perk: "Official Battery Park ferry + pedestal grounds & guidebook"
    },
    afternoonSlot: {
      time: "01:30 PM",
      label: "Historic Memorial",
      productId: "974440",
      title: "9/11 Memorial and Museum: Timed Entry Ticket",
      priceUsd: 33,
      perk: "Guaranteed timed entry right in Lower Manhattan"
    },
    sunsetSlot: {
      time: "05:30 PM",
      label: " viral Skydeck",
      productId: "1023033",
      title: "SUMMIT One Vanderbilt: Immersive Mirrored Observatory",
      priceUsd: 46,
      perk: "NYC's #1 viral glass & mirror skydeck overlooking Chrysler & Empire State"
    },
    airportTransit: {
      productId: "1002293",
      title: "Official New York CityPASS (Save 40% on 5 Top Attractions)",
      priceUsd: 146,
      note: "Best value for families staying 3 to 7 days in NYC"
    }
  },
  {
    cityId: "amsterdam",
    cityName: "Amsterdam",
    cityNameBn: "আমস্টারডাম (নেদারল্যান্ডস)",
    country: "Netherlands",
    flag: "🇳🇱",
    VisaCategoryForBd: "Schengen Visa",
    VisaCategoryForBdBn: "সেনজেন ভিসা",
    heroTagline: "Van Gogh Museum never sells tickets at the door — pre-book your timed slot + canal cruise combo.",
    heroTaglineBn: "ভ্যান গগ মিউজিয়ামে গেটে কোনো টিকেট বিক্রি হয় না — আগে থেকেই অনলাইনে টাইমড স্লট ও ক্যানেল ক্রুজ বুক করুন।",
    bundleTitle: "Dutch Masterpieces, Canal Cruise & Sky Swing Stack",
    bundleTitleBn: "ডাচ মিউজিয়াম, ক্যানেল ক্রুজ ও স্কাই ভিউ কম্বো",
    morningSlot: {
      time: "10:00 AM",
      label: "Must-Book Museum",
      productId: "974079",
      title: "Van Gogh Museum: Timed Entry Ticket",
      priceUsd: 26,
      perk: "100% online-only entry — sells out days in advance"
    },
    afternoonSlot: {
      time: "02:00 PM",
      label: "Canal Cruise",
      productId: "973666",
      title: "Amsterdam: Lovers Canal Cruise from Central Station",
      priceUsd: 18,
      perk: "1-hour glass-top boat tour through UNESCO canals"
    },
    sunsetSlot: {
      time: "05:30 PM",
      label: "360° Rooftop",
      productId: "1104097",
      title: "A'DAM Lookout: Entry Ticket + Welcome Drink",
      priceUsd: 21,
      perk: "Panoramic harbour deck via free 3-minute ferry from Central Station"
    },
    airportTransit: {
      productId: "1013522",
      title: "NS Direct Train: Schiphol Airport (AMS) to Amsterdam Central",
      priceUsd: 7,
      note: "15-minute direct airport train with mobile barcode"
    }
  },
  {
    cityId: "milan",
    cityName: "Milan",
    cityNameBn: "মিলান (ইতালি)",
    country: "Italy",
    flag: "🇮🇹",
    VisaCategoryForBd: "Schengen Visa (Italy VFS Dhaka)",
    VisaCategoryForBdBn: "সেনজেন ভিসা (ইতালি VFS ঢাকা)",
    heroTagline: "Walk amongst the marble spires of Duomo di Milano, see Da Vinci's Last Supper, or take a Lake Como day boat.",
    heroTaglineBn: "দুওমো দি মিলানোর ছাদে হাঁটুন, দা ভিঞ্চির লাস্ট সাপার দেখুন অথবা লেক কোমোতে ডে-ট্রিপ উপভোগ করুন।",
    bundleTitle: "Duomo Rooftops, Da Vinci & Navigli Canal Stack",
    bundleTitleBn: "দুওমো রুফটপ, দা ভিঞ্চি ও নাভিগলি ক্যানেল কম্বো",
    morningSlot: {
      time: "09:30 AM",
      label: "Cathedral Rooftop",
      productId: "976045",
      title: "The Duomo di Milano, Rooftops & Museum: Fast Track",
      priceUsd: 34,
      perk: "Elevator fast-track access to the Gothic marble rooftop terraces"
    },
    afternoonSlot: {
      time: "01:30 PM",
      label: "Rare Allotment",
      productId: "1032004",
      title: "Da Vinci’s Last Supper: Skip-the-Line Guided Tour",
      priceUsd: 78,
      perk: "Guaranteed entry slot to the 15-minute humidity-controlled refectory"
    },
    sunsetSlot: {
      time: "06:00 PM",
      label: "Canal Cruise",
      productId: "1056949",
      title: "Aperitif by Boat on the Milanese Navigli Canals",
      priceUsd: 35,
      perk: "Evening sightseeing cruise through Milan's historic canal district"
    },
    airportTransit: {
      productId: "1013151",
      title: "Malpensa Express: Malpensa Airport (MXP) to Milan Central",
      priceUsd: 16,
      note: "Direct airport train for Gulf carrier arrivals into MXP"
    }
  },
  {
    cityId: "venice",
    cityName: "Venice",
    cityNameBn: "ভেনিস (ইতালি)",
    country: "Italy",
    flag: "🇮🇹",
    VisaCategoryForBd: "Schengen Visa (Italy VFS Dhaka)",
    VisaCategoryForBdBn: "সেনজেন ভিসা (ইতালি VFS ঢাকা)",
    heroTagline: "Explore St. Mark's Basilica terraces, Doge's Palace Bridge of Sighs, and Murano glass-blowing islands.",
    heroTaglineBn: "সেন্ট মার্কস ব্যাসিলিকা, ডোজের প্রাসাদ, গন্ডোলা রাইড এবং মুরানো-বুরানো দ্বীপপুঞ্জ ভ্রমণ।",
    bundleTitle: "St. Mark's, Grand Canal Gondola & 3-Island Cruise Stack",
    bundleTitleBn: "সেন্ট মার্কস, গন্ডোলা রাইড ও ৩-দ্বীপ বোট ট্যুর কম্বো",
    morningSlot: {
      time: "09:30 AM",
      label: "Palace & Bridge of Sighs",
      productId: "1058258",
      title: "Doge's Palace: Fast Track Main Entry Ticket",
      priceUsd: 34,
      perk: "Walk across the historic Bridge of Sighs without waiting in line"
    },
    afternoonSlot: {
      time: "01:30 PM",
      label: "3-Island Cruise",
      productId: "1058799",
      title: "Traditional Island Boat Tour: Murano, Burano & Torcello",
      priceUsd: 29,
      perk: "Live glass-blowing in Murano + colorful fishermen houses of Burano"
    },
    sunsetSlot: {
      time: "05:30 PM",
      label: "Iconic Canal Ride",
      productId: "974328",
      title: "Venice: Classic Grand Canal Gondola Ride",
      priceUsd: 39,
      perk: "Pre-booked fixed rate — avoid 90€+ dockside haggling"
    },
    airportTransit: {
      productId: "1031081",
      title: "Venice ACTV Vaporetto Water-Bus Pass + Airport Transfer",
      priceUsd: 38,
      note: "Unlimited water buses across Grand Canal & Lido"
    }
  },
  {
    cityId: "florence",
    cityName: "Florence",
    cityNameBn: "ফ্লোরেন্স (ইতালি)",
    country: "Italy",
    flag: "🇮🇹",
    VisaCategoryForBd: "Schengen Visa (Italy VFS Dhaka)",
    VisaCategoryForBdBn: "সেনজেন ভিসা (ইতালি VFS ঢাকা)",
    heroTagline: "Renaissance capital of Italy — skip the 3-hour street queues for Michelangelo's David, Uffizi & Brunelleschi's Dome.",
    heroTaglineBn: "রেনেসাঁর শহর ফ্লোরেন্স — মাইকেলেঞ্জেলোর ডেভিড, উফিজি গ্যালারি ও ব্রুনেলেস্কির ডোমে ফাস্ট-ট্র্যাক এন্ট্রি।",
    bundleTitle: "Renaissance Icons & Cathedral Dome Climb Stack",
    bundleTitleBn: "রেনেসাঁ মিউজিয়াম ও ক্যাথেড্রাল ডোম ১-দিনের কম্বো",
    morningSlot: {
      time: "09:00 AM",
      label: "Sculpture Icon",
      productId: "974171",
      title: "Accademia Gallery: Priority Entrance (Michelangelo's David)",
      priceUsd: 29,
      perk: "Timed priority slot to see the original statue of David"
    },
    afternoonSlot: {
      time: "01:30 PM",
      label: "World #1 Renaissance Museum",
      productId: "974170",
      title: "Uffizi Gallery: Reserved Entrance + Official Audioguide",
      priceUsd: 36,
      perk: "See Botticelli's Birth of Venus & Da Vinci works with audio guide"
    },
    sunsetSlot: {
      time: "05:00 PM",
      label: "Panoramic Dome Climb",
      productId: "1032002",
      title: "Brunelleschi's Dome: Premium Skip-the-Line Climb",
      priceUsd: 45,
      perk: "360° sunset view over Tuscany's terracotta rooftops"
    },
    airportTransit: {
      productId: "1092559",
      title: "Uffizi, Pitti Palace & Boboli Gardens: Combined 5-Day Pass",
      priceUsd: 49,
      note: "All-in-one royal pass covering both sides of the Arno River"
    }
  },
  {
    cityId: "lisbon",
    cityName: "Lisbon",
    cityNameBn: "লিসবন (পর্তুগাল)",
    country: "Portugal",
    flag: "🇵🇹",
    VisaCategoryForBd: "Schengen Visa",
    VisaCategoryForBdBn: "সেনজেন ভিসা",
    heroTagline: "Explore Sintra's fairytale Pena Palace, Belém's UNESCO Jerónimos Monastery, and Tagus sunset cruises.",
    heroTaglineBn: "সিনত্রার পেনা প্যালেস, বেলেমের জেরোনিমোস মনাস্ট্রি এবং টেগাস নদীতে সানসেট ক্রুজ।",
    bundleTitle: "Belém Heritage, Castle Viewpoint & Tagus Sunset Cruise Stack",
    bundleTitleBn: "বেলেম হেরিটেজ, ক্যাসেল ভিউপয়েন্ট ও সানসেট ক্রুজ কম্বো",
    morningSlot: {
      time: "09:30 AM",
      label: "UNESCO Landmark",
      productId: "1012358",
      title: "Jerónimos Monastery: Official Timed Entry Ticket",
      priceUsd: 19,
      perk: "Right next to Pastéis de Belém & Belém Tower"
    },
    afternoonSlot: {
      time: "02:30 PM",
      label: "Hilltop Fortress",
      productId: "1106063",
      title: "São Jorge Castle: Skip-The-Line Entry with Audio Guide",
      priceUsd: 22,
      perk: "Highest medieval citadel overlooking Alfama & the red bridge"
    },
    sunsetSlot: {
      time: "06:00 PM",
      label: "River Sailing",
      productId: "1017080",
      title: "Lisboat Sunset Tagus River Cruise",
      priceUsd: 24,
      perk: "Sail past Cristo Rei & 25 de Abril Bridge at sunset"
    },
    airportTransit: {
      productId: "974847",
      title: "Official Lisbon Card (24/48/72H Unlimited Metro, Tram 28 & 50+ Museums)",
      priceUsd: 31,
      note: "Includes free CP train to Sintra & airport metro access"
    }
  }
];

export const TIQETS_TOP_ATTRACTIONS: TiqetsAttractionItem[] = [
  // LONDON
  {
    productId: "992434",
    cityId: "london",
    cityName: "London",
    country: "UK",
    title: "Warner Bros. Studio Tour London — The Making of Harry Potter",
    titleBn: "ওয়ার্নার ব্রাদার্স স্টুডিও ট্যুর লন্ডন — হ্যারি পটার মেকিং",
    category: "family",
    badge: "🔥 #1 Highest Commission Family Ticket",
    badgeBn: "🔥 #১ ফ্যামিলি বেস্টসেলার টিকেট",
    soldOutRescue: true,
    skipTheLine: true,
    priceUsd: 119,
    priceBdt: 14500,
    commissionTier: "High-Ticket (6-8%)",
    audienceMatch: "Families, Harry Potter Fans & First-Time UK Visitors",
    audienceMatchBn: "পরিবার, শিশু এবং প্রথমবার যুক্তরাজ্য ভ্রমণকারী",
    whyItConverts: "Official WB site sells out 6–8 weeks early; Tiqets bundle includes return coach transfer from Central London.",
    whyItConvertsBn: "অফিসিয়াল সাইটে ২ মাস আগেই টিকেট শেষ হয়ে যায়; এতে সেন্ট্রাল লন্ডন থেকে যাতায়াত ও এন্ট্রি অন্তর্ভুক্ত।"
  },
  {
    productId: "975910",
    cityId: "london",
    cityName: "London",
    country: "UK",
    title: "Lastminute.com London Eye: Fast-Track Boarding Ticket",
    titleBn: "লন্ডন আই (London Eye): ফাস্ট-ট্র্যাক বোর্ডিং টিকেট",
    category: "viewpoint",
    badge: "⚡ Skip 90-Min Line",
    badgeBn: "⚡ ৯০ মিনিটের লাইন এড়িয়ে চলুন",
    skipTheLine: true,
    rooftopAccess: true,
    priceUsd: 54,
    priceBdt: 6600,
    commissionTier: "Core Anchor (5-7%)",
    audienceMatch: "First-Time Visitors & Couples",
    audienceMatchBn: "প্রথমবার লন্ডন ভ্রমণকারী ও কাপল",
    whyItConverts: "Dedicated Fast-Track lane cuts a 90-minute South Bank wait down to 10 minutes.",
    whyItConvertsBn: "সাউথ ব্যাংকের দীর্ঘ ৯০ মিনিটের লাইন এড়িয়ে মাত্র ১০ মিনিটে কেবিনে ওঠার সুবিধা।"
  },
  {
    productId: "974054",
    cityId: "london",
    cityName: "London",
    country: "UK",
    title: "Tower of London & Crown Jewels Exhibition: Entry Ticket",
    titleBn: "টাওয়ার অফ লন্ডন ও ক্রাউন জুয়েলস এন্ট্রি টিকেট",
    category: "landmark",
    badge: "👑 Royal Koh-i-Noor Display",
    badgeBn: "👑 ঐতিহাসিক কোহিনূর ও রাজমুকুট প্রদর্শনী",
    skipTheLine: true,
    priceUsd: 44,
    priceBdt: 5400,
    commissionTier: "Core Anchor (5-7%)",
    audienceMatch: "History Lovers & Bangladeshi Families",
    audienceMatchBn: "ইতিহাসপ্রেমী ও বাংলাদেশি পরিবার",
    whyItConverts: "Must-see for South Asian visitors wanting to view the Royal Crown Jewels & Koh-i-Noor in person.",
    whyItConvertsBn: "ব্রিটিশ রাজপরিবারের মুকুট ও ঐতিহাসিক কোহিনূর হীরা কাছ থেকে দেখার সুযোগ।"
  },
  {
    productId: "974688",
    cityId: "london",
    cityName: "London",
    country: "UK",
    title: "Chelsea FC Stamford Bridge / Arsenal Emirates Stadium Tour (975045)",
    titleBn: "চেলসি স্ট্যামফোর্ড ব্রিজ / আর্সেনাল এমিরেটস স্টেডিয়াম ট্যুর",
    category: "family",
    badge: "⚽ Premier League Access",
    badgeBn: "⚽ প্রিমিয়ার লিগ স্টেডিয়াম ট্যুর",
    audioGuide: true,
    priceUsd: 38,
    priceBdt: 4650,
    commissionTier: "Core Anchor (5-7%)",
    audienceMatch: "Football Fans & Youth Travelers",
    audienceMatchBn: "ফুটবল ভক্ত ও তরুণ ভ্রমণকারী",
    whyItConverts: "Walk through the players' tunnel, dressing rooms, and pitchside dugout with audio guide.",
    whyItConvertsBn: "ড্রেসিং রুম, প্লেয়ার টানেল ও পিচসাইড দেখার দারুণ অভিজ্ঞতা।"
  },

  // PARIS
  {
    productId: "997343",
    cityId: "paris",
    cityName: "Paris",
    country: "France",
    title: "Eiffel Tower: Skip The Ticket Line + 2nd Floor & Summit Option",
    titleBn: "আইফেল টাওয়ার: স্কিপ-দ্য-লাইন + ২য় তলা ও সামিট অপশন",
    category: "viewpoint",
    badge: "🗼 Sold-Out Rescue Slot",
    badgeBn: "🗼 সোল্ড-আউট রেসকিউ স্লট",
    soldOutRescue: true,
    skipTheLine: true,
    rooftopAccess: true,
    priceUsd: 74,
    priceBdt: 9000,
    commissionTier: "High-Ticket (6-8%)",
    audienceMatch: "First-Time Paris Visitors & Honeymooners",
    audienceMatchBn: "প্রথমবার প্যারিস ভ্রমণকারী ও হানিমুন কাপল",
    whyItConverts: "Direct elevator access to the 2nd floor & Summit when the official Eiffel website shows 0 availability.",
    whyItConvertsBn: "অফিসিয়াল সাইটে টিকেট না থাকলেও এখান থেকে সরাসরি লিফট অ্যাক্সেস পাওয়া যায়।"
  },
  {
    productId: "1065031",
    cityId: "paris",
    cityName: "Paris",
    country: "France",
    title: "Louvre Museum: Priority Entry + Direct Access to Mona Lisa (ML)",
    titleBn: "লুভর মিউজিয়াম: প্রায়োরিটি এন্ট্রি + সরাসরি মোনালিসা অ্যাক্সেস",
    category: "museum",
    badge: "🎨 Hosted Mona Lisa Express",
    badgeBn: "🎨 মোনালিসা এক্সপ্রেস অ্যাক্সেস",
    soldOutRescue: true,
    skipTheLine: true,
    priceUsd: 69,
    priceBdt: 8400,
    commissionTier: "High-Ticket (6-8%)",
    audienceMatch: "Art Lovers & Time-Conscious Travelers",
    audienceMatchBn: "শিল্পপ্রেমী ও কম সময়ে ভ্রমণকারী",
    whyItConverts: "Escorted group entry straight to Leonardo da Vinci's Mona Lisa without getting lost in 400 rooms.",
    whyItConvertsBn: "বিশাল মিউজিয়ামে পথ না হারিয়ে সরাসরি মোনালিসা পেইন্টিংয়ের সামনে যাওয়ার গাইডেড সুবিধা।"
  },
  {
    productId: "973977",
    cityId: "paris",
    cityName: "Paris",
    country: "France",
    title: "Sightseeing Cruise On The Seine (Bateaux Parisiens / Mouches)",
    titleBn: "সেইন নদীতে সাইটসিইং বোট ক্রুজ (আইফেল টাওয়ারের নিচ থেকে)",
    category: "cruise",
    badge: "🚢 #1 Volume Seller in Paris",
    badgeBn: "🚢 প্যারিসের #১ জনপ্রিয় বোট ক্রুজ",
    audioGuide: true,
    priceUsd: 19,
    priceBdt: 2350,
    commissionTier: "Fast Add-On (3.5-5%)",
    audienceMatch: "Every Paris Visitor, Families & Seniors",
    audienceMatchBn: "সকল বয়সের ভ্রমণকারী ও পরিবার",
    whyItConverts: "Open-dated flexible boarding right at the foot of the Eiffel Tower with 14-language audio guide.",
    whyItConvertsBn: "আইফেল টাওয়ারের পাদদেশ থেকে যেকোনো সুবিধাজনক সময়ে বোটে ওঠার ফ্লেক্সিবল টিকেট।"
  },

  // ROME
  {
    productId: "973975",
    cityId: "rome",
    cityName: "Rome",
    country: "Italy",
    title: "Vatican Museums & Sistine Chapel: Official Fast-Track Ticket",
    titleBn: "ভ্যাটিকান মিউজিয়াম ও সিস্টিন চ্যাপেল: ফাস্ট-ট্র্যাক টিকেট",
    category: "museum",
    badge: "🏛️ Skip 2.5-Hour Wall Line",
    badgeBn: "🏛️ ২.৫ ঘণ্টার দীর্ঘ লাইন এড়ান",
    soldOutRescue: true,
    skipTheLine: true,
    priceUsd: 49,
    priceBdt: 5980,
    commissionTier: "High-Ticket (6-8%)",
    audienceMatch: "First-Time Italy Visitors & Culture Seekers",
    audienceMatchBn: "ইতালি ভ্রমণকারী ও সংস্কৃতিপ্রেমী",
    whyItConverts: "Uses TicketStation & Tiqets reserved allotments (`1089099` / `973975`) for instant mobile entry.",
    whyItConvertsBn: "মোবাইল কিউআর কোড দেখিয়ে সরাসরি সংরক্ষিত গেট দিয়ে প্রবেশের সুবিধা।"
  },
  {
    productId: "997640",
    cityId: "rome",
    cityName: "Rome",
    country: "Italy",
    title: "Colosseum, Gladiator Arena Floor, Roman Forum & Palatine Hill + Audio Guide",
    titleBn: "কলোসিয়াম, গ্ল্যাডিয়েটর এরিনা ফ্লোর ও রোমান ফোরাম + অডিও গাইড",
    category: "landmark",
    badge: "⚔️ Restricted Arena Floor",
    badgeBn: "⚔️ স্পেশাল এরিনা ফ্লোর অ্যাক্সেস",
    soldOutRescue: true,
    skipTheLine: true,
    audioGuide: true,
    priceUsd: 64,
    priceBdt: 7800,
    commissionTier: "High-Ticket (6-8%)",
    audienceMatch: "History Buffs, Families & Photographers",
    audienceMatchBn: "ইতিহাসপ্রেমী, পরিবার ও ফটোগ্রাফার",
    whyItConverts: "Standard tickets exclude the Arena Floor; this package unlocks the Gladiator gate + 3 archaeological sites.",
    whyItConvertsBn: "সাধারণ টিকেটে এরিনা ফ্লোর থাকে না; এই কম্বোতে গ্ল্যাডিয়েটর গেটসহ ৩টি ঐতিহাসিক স্থান অন্তর্ভুক্ত।"
  },

  // NEW YORK
  {
    productId: "1023033",
    cityId: "new-york",
    cityName: "New York",
    country: "USA",
    title: "SUMMIT One Vanderbilt: General & Sunset Admission",
    titleBn: "সামিট ওয়ান ভ্যান্ডারবিল্ট (SUMMIT One Vanderbilt) এন্ট্রি টিকেট",
    category: "viewpoint",
    badge: "🌆 NYC #1 Viral Skydeck",
    badgeBn: "🌆 নিউ ইয়র্কের #১ ভাইরাল স্কাইডেক",
    rooftopAccess: true,
    skipTheLine: true,
    priceUsd: 46,
    priceBdt: 5600,
    commissionTier: "High-Ticket (6-8%)",
    audienceMatch: "Instagram/Video Creators, Couples & Families",
    audienceMatchBn: "কন্টেন্ট ক্রিয়েটর, কাপল ও পরিবার",
    whyItConverts: "3 floors of floor-to-ceiling mirrors, glass ledges (Levitation) & silver balloons above Grand Central.",
    whyItConvertsBn: "গ্র্যান্ড সেন্ট্রালের উপরে ৩ তলা জুড়ে আয়না ও কাঁচের ফ্লোর থেকে ম্যানহাটনের অবিশ্বাস্য ভিউ।"
  },
  {
    productId: "974085",
    cityId: "new-york",
    cityName: "New York",
    country: "USA",
    title: "Statue of Liberty & Ellis Island: Official Ferry + Guidebook",
    titleBn: "স্ট্যাচু অফ লিবার্টি ও এলিস আইল্যান্ড: অফিসিয়াল ফেরি টিকেট",
    category: "cruise",
    badge: "🗽 Iconic NYC Must-Do",
    badgeBn: "🗽 নিউ ইয়র্কের প্রধান আকর্ষণ",
    audioGuide: true,
    priceUsd: 31,
    priceBdt: 3800,
    commissionTier: "Core Anchor (5-7%)",
    audienceMatch: "First-Time US Visitors & Families",
    audienceMatchBn: "প্রথমবার আমেরিকা ভ্রমণকারী ও পরিবার",
    whyItConverts: "Includes roundtrip Battery Park ferry, Liberty Island grounds, Ellis Island Immigration Museum & audio guide.",
    whyItConvertsBn: "ব্যাটারি পার্ক থেকে রাউন্ডট্রিপ ফেরি, লিবার্টি আইল্যান্ড ও ইমিগ্রেশন মিউজিয়াম অডিও গাইডসহ।"
  },
  {
    productId: "1002293",
    cityId: "new-york",
    cityName: "New York",
    country: "USA",
    title: "Official New York CityPASS® (5 Iconic Attractions Bundle)",
    titleBn: "অফিসিয়াল নিউ ইয়র্ক CityPASS® (৫টি শীর্ষ আকর্ষণ এক টিকেটে)",
    category: "pass",
    badge: "💎 High Cart Value ($146)",
    badgeBn: "💎 ৪০% সাশ্রয়ী অল-ইন-ওয়ান পাস",
    skipTheLine: true,
    priceUsd: 146,
    priceBdt: 17800,
    commissionTier: "High-Ticket (6-8%)",
    audienceMatch: "3-to-7 Day NYC Travelers & Families",
    audienceMatchBn: "৩–৭ দিনের নিউ ইয়র্ক ভ্রমণকারী পরিবার",
    whyItConverts: "Covers Empire State Building (`974092`), AMNH (`974096`), Top of the Rock (`974124`), Statue of Liberty Ferry & 9/11 Museum (`974440`).",
    whyItConvertsBn: "এম্পায়ার স্টেট বিল্ডিং, টপ অফ দ্য রক, স্ট্যাচু অফ লিবার্টি এবং ৯/১১ মিউজিয়াম এক পাসে।"
  },

  // AMSTERDAM
  {
    productId: "974079",
    cityId: "amsterdam",
    cityName: "Amsterdam",
    country: "Netherlands",
    title: "Van Gogh Museum: Official Timed-Entry Ticket",
    titleBn: "ভ্যান গগ মিউজিয়াম: অফিসিয়াল টাইমড-এন্ট্রি টিকেট",
    category: "museum",
    badge: "🌻 100% Online Only (No Door Sales)",
    badgeBn: "🌻 শুধুমাত্র অনলাইনে প্রাপ্য",
    soldOutRescue: true,
    skipTheLine: true,
    priceUsd: 26,
    priceBdt: 3180,
    commissionTier: "Core Anchor (5-7%)",
    audienceMatch: "Art Lovers & First-Time Amsterdam Visitors",
    audienceMatchBn: "শিল্পপ্রেমী ও আমস্টারডাম ভ্রমণকারী",
    whyItConverts: "Zero tickets are sold at the museum box office; travelers must book a timed slot online or combine with Canal Cruise (`974260`).",
    whyItConvertsBn: "মিউজিয়াম কাউন্টারে কোনো টিকেট বিক্রি হয় না; অনলাইনে টাইম স্লট বুক করা বাধ্যতামূলক।"
  },

  // MILAN
  {
    productId: "1032004",
    cityId: "milan",
    cityName: "Milan",
    country: "Italy",
    title: "Da Vinci’s Last Supper: Skip-the-Line Guided Tour",
    titleBn: "দা ভিঞ্চির 'দ্য লাস্ট সাপার': স্কিপ-দ্য-লাইন গাইডেড ট্যুর",
    category: "museum",
    badge: "🎟️ Ultra-Rare 30-Person Slot",
    badgeBn: "🎟️ বিরল সংরক্ষিত স্লট",
    soldOutRescue: true,
    skipTheLine: true,
    priceUsd: 78,
    priceBdt: 9500,
    commissionTier: "High-Ticket (6-8%)",
    audienceMatch: "Culture Travelers & High-Spend Tourists",
    audienceMatchBn: "সংস্কৃতি ও ইতিহাসপ্রেমী ভ্রমণকারী",
    whyItConverts: "Only 30 people are allowed inside every 15 minutes; official slots vanish 3 months ahead.",
    whyItConvertsBn: "প্রতি ১৫ মিনিটে মাত্র ৩০ জন প্রবেশের অনুমতি পান; এখানে গ্যারান্টিড গাইডেড স্লট পাওয়া যায়।"
  },
  {
    productId: "976045",
    cityId: "milan",
    cityName: "Milan",
    country: "Italy",
    title: "The Duomo di Milano, Rooftops & Duomo Museum: Fast Track",
    titleBn: "দুওমো দি মিলানো, রুফটপ ও মিউজিয়াম: ফাস্ট-ট্র্যাক টিকেট",
    category: "viewpoint",
    badge: "⛪ Elevator Rooftop Access",
    badgeBn: "⛪ লিফটে সরাসরি রুফটপ অ্যাক্সেস",
    skipTheLine: true,
    rooftopAccess: true,
    priceUsd: 34,
    priceBdt: 4150,
    commissionTier: "Core Anchor (5-7%)",
    audienceMatch: "Every Milan Visitor & Layover Travelers",
    audienceMatchBn: "মিলান ভ্রমণকারী ও ট্রানজিট যাত্রী",
    whyItConverts: "Includes Fast-Track elevator up to the Gothic marble spires plus cathedral & museum access.",
    whyItConvertsBn: "লিফটে সরাসরি ক্যাথেড্রালের ছাদে ওঠা এবং মিউজিয়াম পরিদর্শনের ফাস্ট-ট্র্যাক পাস।"
  },

  // VENICE
  {
    productId: "1092565",
    cityId: "venice",
    cityName: "Venice",
    country: "Italy",
    title: "Doge’s Palace & St. Mark’s Basilica: Skip-the-Line + Basilica Terrace",
    titleBn: "ডোজের প্রাসাদ ও সেন্ট মার্কস ব্যাসিলিকা: স্কিপ-দ্য-লাইন + টেরেস",
    category: "landmark",
    badge: "👑 2-in-1 VIP Combo",
    badgeBn: "👑 ২-ইন-১ ভিআইপি কম্বো",
    soldOutRescue: true,
    skipTheLine: true,
    rooftopAccess: true,
    priceUsd: 92,
    priceBdt: 11200,
    commissionTier: "High-Ticket (6-8%)",
    audienceMatch: "Couples, History Lovers & Cruise Passengers",
    audienceMatchBn: "কাপল, ইতিহাসপ্রেমী ও ভেনিস ভ্রমণকারী",
    whyItConverts: "Combines Venice's top two landmarks with Basilica Loggia terrace views over St. Mark's Square.",
    whyItConvertsBn: "ভেনিসের প্রধান দুটি ঐতিহাসিক স্থাপনা ও ব্যাসিলিকা টেরেস এক টিকেটে।"
  },

  // FLORENCE
  {
    productId: "974170",
    cityId: "florence",
    cityName: "Florence",
    country: "Italy",
    title: "Uffizi Gallery: Official Reserved Entrance + Digital Audio Guide",
    titleBn: "উফিজি গ্যালারি (Uffizi Gallery): রিজার্ভড এন্ট্রি + অডিও গাইড",
    category: "museum",
    badge: "🎨 #1 Renaissance Gallery",
    badgeBn: "🎨 #১ রেনেসাঁ আর্ট গ্যালারি",
    soldOutRescue: true,
    skipTheLine: true,
    audioGuide: true,
    priceUsd: 36,
    priceBdt: 4400,
    commissionTier: "Core Anchor (5-7%)",
    audienceMatch: "Art Lovers & Italy Rail Travelers",
    audienceMatchBn: "শিল্পপ্রেমী ও ইতালি ভ্রমণকারী",
    whyItConverts: "Bypasses the notorious U-shaped courtyard queue with official timed entry and audio commentary.",
    whyItConvertsBn: "দীর্ঘ লাইনে না দাঁড়িয়ে নির্ধারিত সময়ে অডিও গাইডসহ সরাসরি প্রবেশ।"
  },

  // LISBON
  {
    productId: "1025946",
    cityId: "lisbon",
    cityName: "Lisbon",
    country: "Portugal",
    title: "Sintra, Pena Palace & Quinta da Regaleira: Full-Day Guided Trip from Lisbon",
    titleBn: "সিনত্রা, পেনা প্যালেস ও কিন্তা দা রেগালেইরা: লিসবন থেকে ডে-ট্রিপ",
    category: "landmark",
    badge: "🏰 #1 Portugal Day Trip",
    badgeBn: "🏰 পর্তুগালের #১ ডে-ট্রিপ",
    skipTheLine: true,
    priceUsd: 76,
    priceBdt: 9250,
    commissionTier: "High-Ticket (6-8%)",
    audienceMatch: "Families, Schengen Expats & Photographers",
    audienceMatchBn: "পরিবার, প্রবাসী বাংলাদেশি ও ফটোগ্রাফার",
    whyItConverts: "Sintra hill roads ban private cars; this guided transfer + palace entry solves transport and tickets in one click.",
    whyItConvertsBn: "সিনত্রার পাহাড়ি রাস্তায় প্রাইভেট গাড়ি নিষিদ্ধ; তাই যাতায়াত ও প্যালেস টিকেট একসাথে বুক করাই সেরা উপায়।"
  }
];
