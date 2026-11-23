import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Window } from "happy-dom";
import BangladeshHubView from "../src/components/BangladeshHubView";

// Removing a section, reverting to a browser-global locale, or pointing a
// Bengali card at English must fail these tests against the actual route view.
const sectionIds = ["flights", "entry", "money", "preparation", "pilgrimage"];
const destinations: string[][] = [];
for (const lang of ["en", "bn"] as const) {
  const window = new Window();
  window.document.body.innerHTML = renderToStaticMarkup(
    React.createElement(BangladeshHubView as React.ComponentType<{ lang: "en" | "bn" }>, { lang })
  );
  const document = window.document;
  assert.equal(document.querySelectorAll("h1").length, 1, `${lang}: exactly one H1`);
  assert.equal(document.querySelectorAll("main").length, 0, `${lang}: view must not nest main`);
  assert.deepEqual(
    [...document.querySelectorAll("section[id]")].map(section => section.id),
    sectionIds,
    `${lang}: all five planning sections are rendered`
  );
  const links = [...document.querySelectorAll("section a[href]")];
  assert.ok(links.length >= 12, `${lang}: real guide destinations, not a stub`);
  for (const link of links) {
    const href = link.getAttribute("href")!;
    assert.ok(lang === "bn" ? href.startsWith("/bn/") : !href.startsWith("/bn"), `${lang}: localized ${href}`);
    if (lang === "bn") assert.match(link.textContent, /[\u0980-\u09ff]/, `Bengali anchor: ${href}`);
  }
  const paths = links.map(link => link.getAttribute("href")!.replace(/^\/bn(?=\/)/, ""));
  assert.equal(new Set(paths).size, paths.length, `${lang}: no duplicate guide links`);
  assert.ok(!paths.includes("/bangladesh"), `${lang}: no self-link`);
  assert.ok(!paths.includes("/uk"), `${lang}: no unapproved UK hub`);
  assert.equal(document.querySelector("a[data-hub-home]")?.getAttribute("href"), lang === "bn" ? "/bn/" : "/", `${lang}: international Home link`);
  if (lang === "bn") assert.match(document.querySelector("h1")!.textContent, /[\u0980-\u09ff]/);
  destinations.push(paths);
  await window.happyDOM.close();
}
assert.deepEqual(destinations[0], destinations[1], "EN/BN guide destinations and order match");
console.log("PASS departure hub: five sections, explicit EN/BN locale, native guide links, one H1 and Home");

// A language switch must update both OG values, not leave the prior document's
// alternate equal to its active locale. Exercise the real mounted metadata hook.
const window = new Window({ url: "https://uraltravel.co.uk/bangladesh" });
const scope = globalThis as unknown as Record<string, unknown>;
scope.window = window;
scope.document = window.document;
for (const name of ["HTMLElement", "Element", "Node", "Event", "CustomEvent", "MutationObserver"]) {
  scope[name] = (window as unknown as Record<string, unknown>)[name];
}
scope.IS_REACT_ACT_ENVIRONMENT = true;
window.document.head.innerHTML = '<meta property="og:locale" content="en_BD"><meta property="og:locale:alternate" content="bn_BD"><link rel="alternate" hreflang="en" href="https://uraltravel.co.uk/"><link rel="alternate" hreflang="bn" href="https://uraltravel.co.uk/bn/">';
const { createRoot } = await import("react-dom/client");
const { useSeoMeta } = await import("../src/hooks/useSeoMeta");
function Head({ lang }: { lang: "en" | "bn" }) {
  useSeoMeta({ title: "Hub metadata fixture", description: "Hub metadata fixture", inLanguage: lang === "bn" ? "bn-BD" : "en-BD" });
  return null;
}
const container = document.createElement("div");
document.body.append(container);
const root = createRoot(container);
try {
  for (const lang of ["en", "bn", "en"] as const) {
    window.history.replaceState({}, "", lang === "bn" ? "/bn/bangladesh" : "/bangladesh");
    await React.act(async () => { root.render(React.createElement(Head, { lang })); });
    assert.equal(window.document.querySelector('meta[property="og:locale"]')?.getAttribute("content"), lang === "bn" ? "bn_BD" : "en_BD");
    assert.equal(window.document.querySelector('meta[property="og:locale:alternate"]')?.getAttribute("content"), lang === "bn" ? "en_BD" : "bn_BD", `${lang}: opposite OG locale after switching`);
    assert.deepEqual([...window.document.querySelectorAll("link[hreflang]")].map(link => [link.getAttribute("hreflang"), link.getAttribute("href")]).sort(), [
      ["en-bd", "https://uraltravel.co.uk/bangladesh"],
      ["bn-bd", "https://uraltravel.co.uk/bn/bangladesh"],
      ["x-default", "https://uraltravel.co.uk/bangladesh"],
    ].sort(), `${lang}: exactly the hub alternate set, without inherited generic aliases`);
  }
} finally {
  await React.act(async () => { root.unmount(); });
  await window.happyDOM.abort();
}
console.log("PASS departure hub: mounted EN → BN → EN head maintains reciprocal hreflang and complementary OG locales");
