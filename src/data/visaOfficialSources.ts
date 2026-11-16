/**
 * Official links used by both the app and prerendered visa guides.
 *
 * `labelBn` is the Bengali wording used by the official sources directory
 * (/bn/resources). The visa guides themselves still print `label`.
 */
export const VISA_OFFICIAL_SOURCES: Record<string, { label: string; labelBn: string; url: string }[]> = {
  "nepal-visa": [
    { label: "Nepal Department of Immigration: visa information", labelBn: "নেপাল ইমিগ্রেশন বিভাগ: ভিসা তথ্য", url: "https://immigration.gov.np/visa-information" },
    { label: "Nepal official online immigration portal", labelBn: "নেপালের অফিসিয়াল অনলাইন ইমিগ্রেশন পোর্টাল", url: "https://nepaliport.immigration.gov.np/" },
  ],
  "thailand-visa": [
    { label: "Thailand official e-Visa portal", labelBn: "থাইল্যান্ডের অফিসিয়াল e-Visa পোর্টাল", url: "https://www.thaievisa.go.th/" },
    { label: "Royal Thai Embassy in Dhaka: visa information", labelBn: "রয়্যাল থাই এমব্যাসি ঢাকা: ভিসা তথ্য", url: "https://dhaka.thaiembassy.org/en/page/59898-visa-information?menu=5d83296215e39c2540006a10" },
  ],
  "malaysia-visa": [
    { label: "Malaysia official MYVISA portal", labelBn: "মালয়েশিয়ার অফিসিয়াল MYVISA পোর্টাল", url: "https://malaysiavisa.imi.gov.my/" },
    { label: "Malaysia Immigration Department: eVISA information", labelBn: "মালয়েশিয়া ইমিগ্রেশন বিভাগ: eVISA তথ্য", url: "https://www.imi.gov.my/index.php/en/main-services/visa/evisa-en/" },
  ],
  "dubai-visa": [
    { label: "UAE Government: tourist visa information and application channels", labelBn: "সংযুক্ত আরব আমিরাত সরকার: ট্যুরিস্ট ভিসার তথ্য ও আবেদনের চ্যানেল", url: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/tourist-visa" },
  ],
  "singapore-visa": [
    { label: "Singapore ICA: visa requirements for Bangladesh passport holders", labelBn: "সিঙ্গাপুর ICA: বাংলাদেশি পাসপোর্টধারীদের ভিসার শর্ত", url: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements/visa-detail-page/bangladesh" },
    { label: "Singapore ICA: SG Arrival Card e-service", labelBn: "সিঙ্গাপুর ICA: SG Arrival Card ই-সেবা", url: "https://eservices.ica.gov.sg/sgarrivalcard/" },
  ],
  "saudi-arabia-visa": [
    { label: "Visit Saudi: check visa regulations and eligibility", labelBn: "Visit Saudi: ভিসার নিয়ম ও যোগ্যতা যাচাই", url: "https://www.visitsaudi.com/en/plan-your-trip/visa-regulations" },
    { label: "Saudi official eVisa portal and nationality list", labelBn: "সৌদি আরবের অফিসিয়াল eVisa পোর্টাল ও জাতীয়তার তালিকা", url: "https://visa.visitsaudi.com/" },
    { label: "Visit Saudi: tourist Package Visa requirements", labelBn: "Visit Saudi: ট্যুরিস্ট Package Visa-র শর্ত", url: "https://www.visitsaudi.com/en/campaigns/package-visa" },
    { label: "Visit Saudi: stopover visa and charges", labelBn: "Visit Saudi: স্টপওভার ভিসা ও চার্জ", url: "https://www.visitsaudi.com/en/campaigns/saudi-stopover" },
    { label: "Saudi Ministry of Tourism: Tourist Visa Regulations (revision date not established)", labelBn: "সৌদি পর্যটন মন্ত্রণালয়: Tourist Visa Regulations (সংশোধনের তারিখ নিশ্চিত নয়)", url: "https://cdn.mt.gov.sa/mtportal/mt-fe-production/content/policies-regulations/documents/tourism-regulations/Tourist-Visa-Regulations-En-V012.pdf" },
    { label: "Visit Saudi-listed provider webook: package conditions (provider information)", labelBn: "Visit Saudi-তালিকাভুক্ত প্রোভাইডার webook: প্যাকেজের শর্ত (প্রোভাইডারের তথ্য)", url: "https://webook.com/en/e-visa" },
    { label: "Visit Saudi-listed provider Reserval: package conditions (provider information)", labelBn: "Visit Saudi-তালিকাভুক্ত প্রোভাইডার Reserval: প্যাকেজের শর্ত (প্রোভাইডারের তথ্য)", url: "https://www.reserval.com/packagevisa" },
    { label: "Saudi Ministry of Health: Umrah health requirements", labelBn: "সৌদি স্বাস্থ্য মন্ত্রণালয়: ওমরাহর স্বাস্থ্য-শর্ত", url: "https://www.moh.gov.sa/en/HealthAwareness/Pilgrims-Health/Documents/Health-Regulations-Umrah-EN.pdf" },
  ],
  "maldives-visa": [
    { label: "Maldives Immigration: tourist visa on arrival and entry requirements", labelBn: "মালদ্বীপ ইমিগ্রেশন: অন-অ্যারাইভাল ট্যুরিস্ট ভিসা ও প্রবেশের শর্ত", url: "https://www.immigration.gov.mv/visa/tourist-visa" },
    { label: "Maldives Immigration: Traveller Declaration instructions", labelBn: "মালদ্বীপ ইমিগ্রেশন: Traveller Declaration নির্দেশনা", url: "https://www.immigration.gov.mv/traveller-declaration" },
    { label: "Official IMUGA Traveller Declaration portal", labelBn: "অফিসিয়াল IMUGA Traveller Declaration পোর্টাল", url: "https://imuga.immigration.gov.mv/traveller" },
  ],
};
