// Exercises the actual App, including its lazy content and route views, in a DOM.
// Layout and visual behavior still require a real browser.
import assert from "node:assert/strict";
import { Window } from "happy-dom";
import { createServer } from "vite";

const win = new Window({ url: "http://localhost:3000/hotels" });
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
  await waitFor(() => document.querySelector("h1")?.textContent?.includes("Hotel Area Guides"), "English hotel hub");
  for (const prefix of ["", "/bn"]) {
    await visit(`${prefix}/hotels`, prefix ? "বাংলাদেশি ভ্রমণকারীদের জন্য হোটেল এলাকা গাইড" : "Hotel Area Guides");
    const selector = `a[target="_blank"][href^="${prefix}/hotels/"]`;
    await waitFor(() => document.querySelectorAll(selector).length === 6, `${prefix} hotel cards`);
    const cards = [...document.querySelectorAll(selector)];
    assert.equal(new Set(cards.map((link) => link.getAttribute("href"))).size, 6);
    for (const card of cards) {
      assert.match(card.rel, /noopener/);
      assert.match(card.rel, /noreferrer/);
      assert.ok(card.textContent.includes(prefix ? "নতুন ট্যাবে" : "new tab"));
      assert.ok(card.querySelector("img")?.getAttribute("alt"));
    }
    assert.ok(document.querySelector('img[src*="hotel_directory_hero_20261112"]'));
    const guides = [
      ["kathmandu-hotels", "Kathmandu"], ["bangkok-hotels", "Bangkok"],
      ["kuala-lumpur-hotels", "Kuala Lumpur"], ["dubai-hotels", "Dubai"],
      ["singapore-hotels", "Singapore"], ["maldives-hotels", "Malé & Maafushi"],
    ];
    for (const [id, city] of guides) {
      await visit(`${prefix}/hotels/${id}`, prefix ? `${city}-এ কোথায় থাকবেন` : `Where to Stay in ${city}`);
      assert.ok(document.querySelector("#hotel-neighborhoods"));
      assert.ok(document.querySelector("#hotel-curated-stays"));
      assert.ok(document.querySelector("details.ural-guide-jump"));
      assert.ok(document.querySelector(`a[href="${prefix}/hotels"]`));
      const klook = document.querySelector("#hotel-klook-check a[data-affiliate-placement]");
      assert.equal(klook?.getAttribute("href"), AFFILIATE_LINKS.klookHotels);
      assert.match(klook.rel, /sponsored/);
      assert.equal(klook.target, "_blank");
      await waitFor(() => document.querySelector(`#hotel-search a[href="${AFFILIATE_LINKS.kkdayHotels}"]`), `${prefix}/${id} hotel partner widget`);
      assert.ok(document.querySelector(`#hotel-search a[href="${AFFILIATE_LINKS.klookHotels}"]`));
      assert.ok(document.querySelector("#hotel-ground-transport"));
      const picks = document.querySelector("#klook-hotel-picks");
      assert.equal(Boolean(picks), id === "bangkok-hotels" || id === "kuala-lumpur-hotels");
    }
    await visit(`${prefix}/hotels?city=dubai-hotels`, prefix ? "Dubai-এ কোথায় থাকবেন" : "Where to Stay in Dubai");
  }
  await visit("/hotels/not-real", "This Travel Page Doesn't Exist");
  console.log("Hotel App routing, all bilingual guide partner links, locale, legacy query and invalid route checks passed.");
} finally {
  root.unmount();
  // Let lazy imports already started by React settle before shutting down Vite.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await vite.close();
  win.happyDOM.abort();
}
