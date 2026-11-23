import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { Window } from "happy-dom";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { Language } from "../src/translations";

// Catches exclusive first-paint/hydrated copy, missing BN FAQs and a schema
// describing answers that the reader cannot see. Render the real App, not a mock.
const win = new Window({ url: "https://uraltravel.co.uk/" });
const scope = globalThis as unknown as Record<string, unknown>;
scope.window = win; scope.document = win.document;
const { default: App } = await import("../src/App");
const subtitle = {
  en: "Source-backed travel guides, global flight search and practical next steps for your passport and departure.",
  bn: "নির্ভরযোগ্য সূত্রভিত্তিক ভ্রমণ গাইড, বিশ্বজুড়ে ফ্লাইট খোঁজা এবং আপনার পাসপোর্ট ও যাত্রার স্থান অনুযায়ী পরবর্তী ধাপের ব্যবহারিক নির্দেশনা।",
};
const text = (element: Element | null) => element?.textContent?.replace(/\s+/g, " ").trim() ?? "";
function parse(html: string) { const doc = win.document.implementation.createHTMLDocument(); doc.documentElement.innerHTML = html; return doc; }
function pairs(doc: Document) {
  const section = doc.querySelector('[aria-labelledby="home-faqs"]');
  return Array.from(section?.querySelectorAll("h3") ?? []).map(heading => ({ question: text(heading), answer: text(heading.nextElementSibling) }));
}
const rendered: Partial<Record<Language, Document>> = {};
try {
  for (const lang of ["en", "bn"] as const) {
    win.location.href = `https://uraltravel.co.uk/${lang === "bn" ? "bn/" : ""}`;
    const doc = parse(renderToStaticMarkup(React.createElement(App))) as unknown as Document;
    rendered[lang] = doc;
    assert.equal(doc.querySelectorAll("h1").length, 1, `${lang}: one homepage H1`);
    assert.ok(text(doc.querySelector("h1")?.nextElementSibling ?? null).includes(subtitle[lang]), `${lang}: homepage must render the approved international subtitle, not exclusive copy`);
    assert.ok(!/50\+|15\+|100%|BD Traveler Focus|বাংলাদেশি পাসপোর্ট ফোকাস/.test(text(doc.querySelector("#hero-stats-bar"))), `${lang}: remove unsupported hero statistics`);
    assert.ok(doc.querySelector(`a[href="${lang === "bn" ? "/bn" : ""}/bangladesh"]`), `${lang}: a visible Bangladesh planning doorway`);
    assert.equal(pairs(doc).length, 4, `${lang}: four visible orientation FAQs`);
    assert.ok(doc.querySelector('a[href="#live-flight-search"]'), "Retain the flight fragment action");
    assert.ok(doc.querySelector('a[href="#global-hotel-search"]'), "Retain the hotel fragment action");
  }
  const { getHomeFaqs, getHomeFaqHeading } = await import("../src/data/homeFaqs");
  const { getHomePositioning } = await import("../src/data/homePositioning");
  const { generateFAQSchema } = await import("../src/hooks/useSeoMeta");
  assert.deepEqual(getHomePositioning("en").h1Lines, ["Plan Your Trip", "From Anywhere"]);
  // The source shell is also served by SPA-only builds, before prerendering.
  const shell = parse(readFileSync(new URL("../index.html", import.meta.url), "utf8"));
  assert.equal(shell.title, getHomePositioning("en").title, "First-paint source title must make the same international promise");
  for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
    assert.equal(shell.querySelector(selector)?.getAttribute("content"), getHomePositioning("en").title);
  }
  for (const lang of ["en", "bn"] as const) {
    const faqs = getHomeFaqs(lang);
    const copy = getHomePositioning(lang);
    assert.equal(copy.features.length, 4);
    assert.equal(copy.subtitle, subtitle[lang]);
    assert.deepEqual(pairs(rendered[lang]!), faqs, `${lang}: visible questions/answers equal the localized records`);
    assert.equal(text(rendered[lang]!.querySelector("#home-faqs")), getHomeFaqHeading(lang));
    assert.ok(!/\d/.test(faqs.map(faq => faq.answer).join(" ")), "Orientation FAQs carry no inherited price/quota estimates");
    const schema = generateFAQSchema(faqs) as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] };
    assert.deepEqual(schema.mainEntity.map(item => ({ question: item.name, answer: item.acceptedAnswer.text })), pairs(rendered[lang]!));
    for (const feature of copy.features) assert.ok(text(rendered[lang]!.body).includes(feature));
    if (process.argv.includes("--built")) {
      const saved = parse(readFileSync(new URL(lang === "bn" ? "../dist/bn/index.html" : "../dist/index.html", import.meta.url), "utf8")) as unknown as Document;
      assert.equal(saved.querySelectorAll("h1").length, 1);
      assert.ok(text(saved.querySelector("h1")?.nextElementSibling ?? null).includes(subtitle[lang]));
      assert.ok(saved.querySelector(`a[href="${lang === "bn" ? "/bn" : ""}/bangladesh"]`));
      assert.deepEqual(pairs(saved), faqs, `${lang}: saved FAQ matches React`);
      assert.equal(saved.title, copy.title);
      assert.equal(saved.querySelector('meta[name="description"]')?.getAttribute("content"), copy.description);
      const nodes = Array.from(saved.querySelectorAll('script[type="application/ld+json"]')).flatMap(script => { const node = JSON.parse(script.textContent ?? "{}"); return node["@graph"] ?? [node]; });
      const faqNodes = nodes.filter(node => node["@type"] === "FAQPage");
      assert.equal(faqNodes.length, 1, `${lang}: exactly one saved FAQPage`);
      assert.deepEqual(faqNodes[0].mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => ({ question: item.name, answer: item.acceptedAnswer.text })), pairs(saved));
      for (const path of ["/flights", "/hotels", "/visa", "/destinations", "/umrah", "/tools", "/blog"]) {
        assert.ok(saved.querySelector(`a[href="${lang === "bn" ? "/bn" : ""}${path}"]`), `${lang}: saved action ${path} retained`);
      }
      for (const feature of copy.features) assert.ok(text(saved.body).includes(feature), `${lang}: saved capability ${feature}`);
    }
  }
  console.log(`PASS international_home_is_paired_and_specific; home_faqs_are_bilingual_and_schema_matches_visible_answers${process.argv.includes("--built") ? "; saved EN/BN parity" : ""}`);
} finally { await win.happyDOM.abort(); }
