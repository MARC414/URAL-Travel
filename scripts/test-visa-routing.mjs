// Exercises the real lazy-loaded App, plus the saved directory HTML.
// A DOM emulator cannot verify visual layout or third-party checkout/tracking.
import assert from "node:assert/strict";
import fs from "node:fs";
import { Window } from "happy-dom";
import { createServer } from "vite";

const win = new Window({ url: "http://localhost:3000/visa" });
for (const name of ["window", "document", "location", "history", "HTMLElement", "Element", "Node", "Event", "CustomEvent", "MutationObserver", "localStorage", "sessionStorage"]) {
  globalThis[name] = name === "window" ? win : win[name];
}
win.scrollTo = () => {};
win.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
globalThis.requestAnimationFrame = (callback) => setTimeout(callback, 1);
globalThis.cancelAnimationFrame = clearTimeout;
const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
const React = await import("react");
const { createRoot } = await import("react-dom/client");
const { default: App } = await vite.ssrLoadModule("/src/App.tsx");
const { AFFILIATE_LINKS } = await vite.ssrLoadModule("/src/components/AffiliatePartners.tsx");
const { VISA_DATA } = await vite.ssrLoadModule("/src/constants.ts");
const { getLocalizedVisas } = await vite.ssrLoadModule("/src/data/bengaliContent.ts");
function faqNodes(root) {
  if (!root || typeof root !== "object") return [];
  return [...(root["@type"] === "FAQPage" ? [root] : []), ...Object.values(root).flatMap(faqNodes)];
}
function extractFaqs(doc) {
  return [...doc.querySelectorAll('script[type="application/ld+json"]')]
    .flatMap((element) => faqNodes(JSON.parse(element.textContent)));
}
const container = document.createElement("div");
document.body.append(container);
const root = createRoot(container);
root.render(React.createElement(App));
async function waitFor(predicate, message) {
  for (let i = 0; i < 200; i++) {
    if (predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error(`${message}; current heading: ${document.querySelector("h1")?.textContent}`);
}
async function visit(path, heading) {
  history.pushState({}, "", path);
  win.dispatchEvent(new win.PopStateEvent("popstate"));
  await waitFor(() => document.querySelector("h1")?.textContent?.includes(heading), path);
}
try {
  await waitFor(() => document.querySelector("h1")?.textContent?.includes("Visa Guides &"), "English visa hub");
  for (const prefix of ["", "/bn"]) {
    await visit(`${prefix}/visa`, prefix ? "বাংলাদেশি নাগরিকদের জন্য ভিসা গাইড" : "Visa Guides &");
    const selector = `a[target="_blank"][href^="${prefix}/visa/"]`;
    await waitFor(() => document.querySelectorAll(selector).length === VISA_DATA.length, `${prefix} visa cards`);
    const cards = [...document.querySelectorAll(selector)];
    assert.equal(new Set(cards.map((link) => link.getAttribute("href"))).size, VISA_DATA.length);
    for (const guide of VISA_DATA) {
      const card = cards.find((link) => link.getAttribute("href") === `${prefix}/visa/${guide.id}`);
      assert.ok(card);
      assert.match(card.rel, /noopener/);
      assert.match(card.rel, /noreferrer/);
      assert.ok(card.textContent.includes(prefix ? "নতুন ট্যাবে" : "new tab"));
      assert.ok(card.querySelector("img")?.getAttribute("alt"));
      assert.ok((card.querySelector("p")?.textContent?.length ?? 0) > 100);
    }
    assert.ok(document.querySelector('img[src*="visa_directory_hero_20261112"]'));
    assert.ok(document.querySelector(`a[href="${prefix}/visa-free-countries"]`));
    const saved = fs.readFileSync(`dist/${prefix ? "bn/" : ""}visa.html`, "utf8");
    for (const guide of VISA_DATA) assert.ok(saved.includes(`href="${prefix}/visa/${guide.id}" target="_blank" rel="noopener noreferrer"`));
    assert.ok(saved.includes(prefix ? "নতুন ট্যাবে" : "new tab"));
    assert.ok(saved.includes("visa_directory_hero_20261112-1200.avif"));
    for (const guide of VISA_DATA) {
      const bnCountries = { "nepal-visa": "নেপাল", "thailand-visa": "থাইল্যান্ড", "malaysia-visa": "মালয়েশিয়া", "dubai-visa": "সংযুক্ত আরব আমিরাত", "singapore-visa": "সিঙ্গাপুর", "maldives-visa": "মালদ্বীপ", "saudi-arabia-visa": "সৌদি" };
      const expected = prefix ? `${bnCountries[guide.id]} ভিসা` : `${guide.country} Visa Requirements`;
      await visit(`${prefix}/visa/${guide.id}`, expected);
      const localized = prefix ? getLocalizedVisas("bn").find((v) => v.id === guide.id) : guide;
      const firstQuestion = localized.faqs[0].question;
      await waitFor(() => document.body.textContent.includes(firstQuestion), `${prefix}/${guide.id} localized FAQ`);
      await waitFor(() => extractFaqs(document).some((node) => node.mainEntity?.[0]?.name === firstQuestion), `${prefix}/${guide.id} live FAQ schema`);
      const liveFaqs = extractFaqs(document);
      assert.equal(liveFaqs.length, 1, `${prefix}/${guide.id} duplicate live FAQ schema`);
      assert.deepEqual(liveFaqs[0].mainEntity.map((q) => [q.name, q.acceptedAnswer.text]), localized.faqs.map((q) => [q.question, q.answer]));
      const staticHtml = fs.readFileSync(`dist/${prefix ? "bn/" : ""}visa/${guide.id}.html`, "utf8");
      const savedWindow = new Window();
      savedWindow.document.write(staticHtml);
      const staticFaqs = extractFaqs(savedWindow.document);
      assert.equal(staticFaqs.length, 1, `${prefix}/${guide.id} duplicate saved FAQ schema`);
      assert.deepEqual(staticFaqs[0].mainEntity.map((q) => [q.name, q.acceptedAnswer.text]), localized.faqs.map((q) => [q.question, q.answer]));
      for (const faq of localized.faqs) assert.ok(savedWindow.document.body.textContent.includes(faq.question));
      savedWindow.happyDOM.abort();
      assert.ok(document.querySelector("#visa-key-facts"));
      assert.ok(document.querySelector("#visa-steps"));
      assert.ok(document.querySelector("#visa-documents"));
      assert.ok(document.querySelector("details.ural-guide-jump"));
      assert.ok(document.querySelector(`a[href="${prefix}/visa"]`));
      assert.ok(document.querySelector("#official-visa-sources a[target='_blank']"));
      assert.ok(document.querySelector(`#visa-flight-booking a[href="${AFFILIATE_LINKS.yesim}"]`));
      assert.ok(document.querySelector(`#visa-flight-booking a[href="${AFFILIATE_LINKS.airalo}"]`));
      assert.ok(document.querySelector(`#visa-flight-booking a[href="${AFFILIATE_LINKS.getTransfer}"]`));
      if (guide.id === "saudi-arabia-visa") {
        assert.ok(document.querySelector(`a[href="${prefix}/hotels"]`));
        assert.ok(document.querySelector(`a[href="${prefix}/flights/dhaka-madinah"]`));
        assert.ok(document.querySelector(`a[href="${prefix}/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost"]`));
      }
    }
    await visit(`${prefix}/visa?country=thailand-visa`, prefix ? "থাইল্যান্ড ভিসা" : "Thailand Visa Requirements");
  }
  await visit("/visa/not-real", "This Travel Page Doesn't Exist");
  console.log("Visa App routing, bilingual cards and guides, source and partner links, legacy query, invalid route and saved HTML checks passed.");
} finally {
  root.unmount();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await vite.close();
  win.happyDOM.abort();
}
