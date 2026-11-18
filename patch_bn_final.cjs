const fs = require('fs');

const file = 'src/data/bengaliContent.ts';
let content = fs.readFileSync(file, 'utf8');

// 1. Dual-currency endorsement -> /bn/glossary
content = content.replace(
  /আমাদের এন্ডোর্সমেন্ট গাইডে বিস্তারিত বলা আছে/,
  'আমাদের [এন্ডোর্সমেন্ট](/bn/glossary#passport-endorsement) গাইডে বিস্তারিত বলা আছে'
);
content = content.replace(
  /ট্রাভেল এনটাইটেলমেন্ট পাসপোর্টে রেকর্ড করে দিতে বলুন/,
  '[ট্রাভেল এনটাইটেলমেন্ট](/bn/glossary#travel-quota) পাসপোর্টে রেকর্ড করে দিতে বলুন'
);
content = content.replace(
  /\*\*NID\*\* কার্ড নিয়ে ব্যাংকের ফরেন-এক্সচেঞ্জ ডেস্কে যান/,
  '**NID** কার্ড নিয়ে [RFCD](/bn/glossary#rfcd) সুবিধাযুক্ত ব্যাংকের ফরেন-এক্সচেঞ্জ ডেস্কে যান'
);

// 2. e-Passport guide -> /bn/resources + /bn/glossary
content = content.replace(
  /অফিসিয়াল \*\*2026 Department of Immigration & Passports \(epassport\.gov\.bd\)\*\*/,
  'অফিসিয়াল **2026 [Department of Immigration & Passports (epassport.gov.bd)](/bn/resources#identification)**'
);
content = content.replace(
  /বৈধ বা মেয়াদোত্তীর্ণ বাংলাদেশি \*\*MRP বা e-Passport\*\* থাকে/,
  'বৈধ বা মেয়াদোত্তীর্ণ বাংলাদেশি **[MRP](/bn/glossary#mrp) বা [e-Passport](/bn/glossary#e-passport)** থাকে'
);

// 3. Thailand eVisa -> /bn/visa-assistance + /bn/resources + /bn/glossary
content = content.replace(
  /\*\*e-Visa পোর্টাল \(thaievisa\.go\.th\)\*\*/,
  '**[e-Visa পোর্টাল (thaievisa.go.th)](/bn/resources#thailand)**'
);
content = content.replace(
  /অন্তত \*\*THB 20,000\*\*-এর আর্থিক প্রমাণ/,
  'অন্তত **THB 20,000**-এর [আর্থিক প্রমাণ](/bn/glossary#financial-evidence)'
);
content = content.replace(
  /ট্যুরিস্ট ভিসা \(\*\*TR\*\*\) নির্বাচন করুন/,
  'ট্যুরিস্ট ভিসা (**[TR](/bn/glossary#tourist-visa)**) নির্বাচন করুন'
);
content = content.replace(
  /শুধুমাত্র ব্যাংক ব্যালেন্স থাকলেই ভিসা অনুমোদনের নিশ্চয়তা দেওয়া যায় না\./,
  'শুধুমাত্র ব্যাংক ব্যালেন্স থাকলেই ভিসা অনুমোদনের নিশ্চয়তা দেওয়া যায় না। অ্যাপ্লিকেশন জমা দেওয়ার জন্য পেইড সহায়তার দরকার হলে আমাদের [ভিসা আবেদন সহায়তা](/bn/visa-assistance) গাইডটি দেখুন।'
);

// 4. Flight delay/compensation -> /bn/glossary
content = content.replace(
  /১,৫১৯ স্পেশাল ড্রয়িং রাইটস \(SDR\) পর্যন্ত/,
  '১,৫১৯ [স্পেশাল ড্রয়িং রাইটস (SDR)](/bn/glossary#special-drawing-rights) পর্যন্ত'
);
content = content.replace(
  /\*\*ইউরোপীয় ইউনিয়ন রেগুলেশন EC 261\/2004 \(ইইউ ফ্লাইট\):\*\*\n  এটি ইইউর/,
  '**ইউরোপীয় ইউনিয়ন রেগুলেশন EC 261/2004 (ইইউ ফ্লাইট):**\n  [EC 261](/bn/glossary#ec261) ইইউর'
);
content = content.replace(
  /যাত্রী-যত্নের দায়িত্ব বহাল থাকতে পারে/,
  '[যাত্রী-যত্নের দায়িত্ব](/bn/glossary#duty-of-care) বহাল থাকতে পারে'
);

fs.writeFileSync(file, content);
console.log('patched BN safely');
