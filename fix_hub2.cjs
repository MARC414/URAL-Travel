const fs = require('fs');

const path = 'src/components/BangladeshHubView.tsx';
let content = fs.readFileSync(path, 'utf8');

// remove react-router-dom Link and replace with normal anchor tag for SSR/hybrid compatibility
content = content.replace('import { Link } from "react-router-dom";', '');
content = content.replace(/<Link/g, '<a');
content = content.replace(/<\/Link>/g, '</a>');
content = content.replace(/to=\{`/g, 'href={`');

// fix localeProvider import (it doesn't exist, this app uses `useLocale` context differently or manual prop passing, based on context we will just default to false and get lang from props or window if needed, let's remove it)
content = content.replace('import { useLocale } from "../utils/localeProvider";', '');
content = content.replace('const { isBn } = useLocale();', 'const isBn = typeof window !== "undefined" && window.location.pathname.startsWith("/bn");');

fs.writeFileSync(path, content);
