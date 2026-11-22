const fs = require('fs');

const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  ': "Flights, hotels, visas, and destination guides — crafted specifically for Bangladeshi travelers. Your travel intelligence for the world."}',
  ': "Flights, hotels, visas, and destination guides. Your travel intelligence for the world."}'
);

content = content.replace(
  'aria-label={isBn ? "বাংলাদেশি ট্রাভেলারদের জন্য ভ্রমণ পরিকল্পনা" : "Travel planning for Bangladeshi travelers"}',
  'aria-label={isBn ? "বাংলাদেশি ট্রাভেলারদের জন্য ভ্রমণ পরিকল্পনা" : "Travel planning intelligence"}'
);

fs.writeFileSync(path, content);
