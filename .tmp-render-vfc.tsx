import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import VisaFree from "./src/routes/VisaFreeCountriesRouteView";

const ctx = (isBn: boolean) => ({
  isBn,
  navigateTo: () => {},
  lang: isBn ? "bn" : "en",
  route: "/visa-free-countries",
  setLanguage: () => {},
});

function text(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"')
    .replace(/\s+/g, " ").trim();
}

const en = text(renderToStaticMarkup(React.createElement(VisaFree, { context: ctx(false) }) as any));
const bn = text(renderToStaticMarkup(React.createElement(VisaFree, { context: ctx(true) }) as any));

const bengaliWords = (t: string) => t.split(/\s+/).filter((w) => /[\u0980-\u09FF]/.test(w)).length;
const latinWords = (t: string) =>
  t.split(/\s+/).filter((w) => /^[A-Za-z][A-Za-z'’\-\/&.]*$/.test(w) && w.length > 2).length;

console.log("EN: chars", en.length, "| words", en.split(/\s+/).length, "| latin", latinWords(en), "| bengali", bengaliWords(en));
console.log("BN: chars", bn.length, "| words", bn.split(/\s+/).length, "| latin", latinWords(bn), "| bengali", bengaliWords(bn));

// Leak check: sentences that exist in the English render but should NOT be in Bengali
const sentences = (t: string) => t.split(/(?<=[.!?])\s+/).filter((x) => x.split(/\s+/).length >= 5);
const enS = sentences(en), bnS = new Set(sentences(bn));
const leaked = enS.filter((x) => bnS.has(x));
console.log("\nwhole English sentences still present in the Bengali render:", leaked.length);
leaked.forEach((x) => console.log("   LEAK →", x.slice(0, 130)));
console.log("\n[object Object] present:", bn.includes("[object Object]") || en.includes("[object Object]"));
