export interface DestinationHeroImage {
  src: string;
  altEn: string;
  altBn: string;
}

/**
 * One generated, destination-specific hero per published destination guide.
 * Keep this mapping as the shared source for the React hero and the prerendered
 * AVIF LCP preload, so the page never downloads two different hero images.
 */
export const DESTINATION_HERO_IMAGES: Readonly<Record<string, DestinationHeroImage>> = {
  "nepal-guide": {
    src: "/assets/images/destination_nepal_hero_20261101-1200.webp",
    altEn: "The Annapurna Himalayan range above Phewa Lake at dawn in Nepal",
    altBn: "নেপালের ফেওয়া লেকের ওপরে ভোরের আলোয় অন্নপূর্ণা হিমালয় পর্বতমালা",
  },
  "thailand-guide": {
    src: "/assets/images/destination_thailand_hero_20261101-1200.webp",
    altEn: "Wat Arun beside the Chao Phraya River at sunset in Bangkok",
    altBn: "ব্যাংককের চাও ফ্রায়া নদীর ধারে সূর্যাস্তের সময় ওয়াট অরুণ",
  },
  "malaysia-guide": {
    src: "/assets/images/destination_malaysia_hero_20261101-1200.webp",
    altEn: "The illuminated Petronas Twin Towers over Kuala Lumpur at blue hour",
    altBn: "নীল সন্ধ্যায় কুয়ালালামপুরের ওপর আলোকিত পেট্রোনাস টুইন টাওয়ার",
  },
  "dubai-guide": {
    src: "/assets/images/destination_dubai_hero_20261101-1200.webp",
    altEn: "The Burj Khalifa and Downtown Dubai reflected across the fountain lake at dusk",
    altBn: "গোধূলিতে ফাউন্টেন লেকে প্রতিফলিত বুর্জ খলিফা ও ডাউনটাউন দুবাই",
  },
  "singapore-guide": {
    src: "/assets/images/destination_singapore_hero_20261101-1200.webp",
    altEn: "Marina Bay Sands and Singapore's waterfront skyline at twilight",
    altBn: "গোধূলিতে মেরিনা বে স্যান্ডস ও সিঙ্গাপুরের জলতীরের আকাশরেখা",
  },
  "maldives-guide": {
    src: "/assets/images/destination_maldives_hero_20261101-1200.webp",
    altEn: "Overwater villas above a turquoise lagoon in the Maldives",
    altBn: "মালদ্বীপের ফিরোজা রঙের লেগুনের ওপর জলের ওপর নির্মিত ভিলা",
  },
  "london-guide": {
    src: "/assets/images/destination_london_hero_20261101-1200.webp",
    altEn: "Big Ben and the Palace of Westminster beside the River Thames at dusk",
    altBn: "গোধূলিতে টেমস নদীর পাশে বিগ বেন ও ওয়েস্টমিনস্টার প্রাসাদ",
  },
  "italy-guide": {
    src: "/assets/images/destination_italy_hero_20261101-1200.webp",
    altEn: "The Colosseum in Rome in warm evening light",
    altBn: "সন্ধ্যার উষ্ণ আলোয় রোমের কলোসিয়াম",
  },
  "paris-guide": {
    src: "/assets/images/destination_paris_hero_20261101-1200.webp",
    altEn: "The Eiffel Tower rising above the Seine at blue hour in Paris",
    altBn: "প্যারিসে নীল সন্ধ্যায় সেইন নদীর ওপরে দাঁড়িয়ে থাকা আইফেল টাওয়ার",
  },
  "new-york-guide": {
    src: "/assets/images/destination_new_york_hero_20261101-1200.webp",
    altEn: "The Statue of Liberty and Lower Manhattan across New York Harbor",
    altBn: "নিউ ইয়র্ক হারবারের ওপারে স্ট্যাচু অব লিবার্টি ও লোয়ার ম্যানহাটন",
  },
};
