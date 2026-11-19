const fs = require('fs');

const path = 'src/utils/coreSeoCopy.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '"/destinations/new-york-guide": {\n    title: "New York City Itinerary from Bangladesh: Landmarks & Planning | URAL",\n    description:\n      "Plan New York City around harbor sights, parks, museums and selected neighborhoods. Check current attraction, transport and entry information for your dates.",\n  },',
  '"/destinations/new-york-guide": {\n    title: "New York City Itinerary from Bangladesh: Landmarks & Planning | URAL",\n    description:\n      "Plan New York City around harbor sights, parks, museums and selected neighborhoods. Check current attraction, transport and entry information for your dates.",\n  },\n  "/destinations/kashmir-guide": {\n    title: "Azad Kashmir Destination Guide from Bangladesh: Neelum Valley & Planning | URAL",\n    description:\n      "Plan an Azad Kashmir trip focusing on the Neelum Valley, Muzaffarabad, and Rawalakot. Check current road conditions and Pakistan entry requirements for Bangladeshi passports.",\n  },'
);

content = content.replace(
  '"/bn/destinations/new-york-guide": {\n    title: "বাংলাদেশ থেকে নিউ ইয়র্ক সিটি গাইড: রূপরেখা ও প্রস্তুতি | URAL",\n    description:\n      "শহর, জাদুঘর এবং দর্শনীয় স্থানগুলোর জন্য একটি নমনীয় নিউ ইয়র্ক সিটি ভ্রমণ ছক। বুকিংয়ের আগে আকর্ষণের সময়সূচি, পরিবহন এবং প্রবেশের শর্ত যাচাই করুন।",\n  },',
  '"/bn/destinations/new-york-guide": {\n    title: "বাংলাদেশ থেকে নিউ ইয়র্ক সিটি গাইড: রূপরেখা ও প্রস্তুতি | URAL",\n    description:\n      "শহর, জাদুঘর এবং দর্শনীয় স্থানগুলোর জন্য একটি নমনীয় নিউ ইয়র্ক সিটি ভ্রমণ ছক। বুকিংয়ের আগে আকর্ষণের সময়সূচি, পরিবহন এবং প্রবেশের শর্ত যাচাই করুন।",\n  },\n  "/bn/destinations/kashmir-guide": {\n    title: "বাংলাদেশ থেকে আজাদ কাশ্মীর গাইড: রূপরেখা ও প্রস্তুতি | URAL",\n    description:\n      "নীলম ভ্যালি, মোজাফফরাবাদ এবং রাওয়ালাকোট নিয়ে একটি আজাদ কাশ্মীর ভ্রমণ ছক। বর্তমান সড়ক যোগাযোগ ও ভিসা শর্ত যাচাই করুন।",\n  },'
);

fs.writeFileSync(path, content);
