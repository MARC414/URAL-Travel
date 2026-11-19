import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { Window } from "happy-dom";

assert.ok(existsSync(new URL("../src/components/SiteHeader.tsx", import.meta.url)), "Accessible approved SiteHeader is missing");
const win = new Window({ url: "https://uraltravel.co.uk/" });
const scope = globalThis as unknown as Record<string, unknown>;
scope.window = win; scope.document = win.document;
for (const name of ["HTMLElement", "HTMLInputElement", "Element", "Node", "Event", "CustomEvent", "MutationObserver"]) {
  scope[name] = (win as unknown as Record<string, unknown>)[name];
}
scope.IS_REACT_ACT_ENVIRONMENT = true;
Object.defineProperty(win, "innerWidth", { value: 1280, writable: true });
// happy-dom has no layout. Only its visibility measurement is supplied; events,
// focus, mounted React state and the document's scroll lock remain real.
win.HTMLElement.prototype.getClientRects = function () {
  return this.closest("[hidden]") ? [] : [{ width: 44, height: 44 }];
} as unknown as typeof win.HTMLElement.prototype.getClientRects;
const React = await import("react");
const { createRoot } = await import("react-dom/client");
const { renderToStaticMarkup } = await import("react-dom/server");
const { SiteHeader } = await import("../src/components/SiteHeader");
const { GlobalSiteSearch } = await import("../src/components/GlobalSiteSearch");
const { NAVIGATION_RECORDS } = await import("../src/data/navigation");
const { buildNavigation, navigationHref } = await import("../src/utils/navigation");
const { focusSitewideSignup } = await import("../src/utils/signupCta");
const mounted = document.createElement("div"); document.body.appendChild(mounted);
const root = createRoot(mounted);
const visits: string[] = [];
let lang: "en" | "bn" = "en";
let path = "/", searchOpen = false, consentOpen = false;
let requestedSearch: HTMLElement | null = null;
let emailOverflow: string | null = null;
let testFullSearch = false;
const searchRestoreRef = { current: null as HTMLElement | null };
function props() {
  return {
    lang, currentPath: path, model: buildNavigation(NAVIGATION_RECORDS, lang),
    getHref: (target: string) => navigationHref(target, lang), onNavigate: (target: string) => visits.push(target),
    onLanguageChange: (target: "en" | "bn") => { lang = target; }, localeHrefs: { en: "/", bn: "/bn/" },
    utilitySearch: React.createElement("input", { id: "test-search", "aria-label": "Search URAL" }),
    searchOpen, consentOpen,
    onRequestSearch: (trigger: HTMLElement) => { requestedSearch = trigger; },
    onEmailUpdates: () => { emailOverflow = document.body.style.overflow; focusSitewideSignup({ delayMs: 0 }); },
  };
}
async function render() { await React.act(async () => { root.render(React.createElement(React.Fragment, null,
  testFullSearch && searchOpen ? React.createElement(GlobalSiteSearch, { isBn: false, initialQuery: "", onClose: () => {}, navigateTo: () => {}, triggerRef: searchRestoreRef }) : null,
  React.createElement(SiteHeader, props()),
)); }); }
const button = (id: string) => document.getElementById(id) as HTMLButtonElement;
async function click(element: Element, options: { button?: number; ctrlKey?: boolean; metaKey?: boolean; shiftKey?: boolean; altKey?: boolean } = {}) {
  const event = new win.MouseEvent("click", { bubbles: true, cancelable: true, button: 0, ...options });
  await React.act(async () => { element.dispatchEvent(event as unknown as Event); });
  return event;
}
async function key(element: Element, value: string, shiftKey = false) {
  await React.act(async () => { element.dispatchEvent(new win.KeyboardEvent("keydown", { key: value, shiftKey, bubbles: true, cancelable: true }) as unknown as Event); });
}
const settle = async () => { await React.act(async () => { await new Promise(resolve => win.setTimeout(resolve, 35)); }); };
let checks = 0;
async function test(name: string, run: () => void | Promise<void>) { await run(); checks++; console.log(`PASS ${name}`); }
await render();
await test("All four disclosure controls operate one panel and Escape restores focus", async () => {
  for (const id of ["destinations", "activities", "visas", "tools"]) {
    const trigger = button(`nav-${id}-toggle`);
    await click(trigger);
    assert.equal(document.querySelectorAll('.ural-mega-panel:not([hidden])').length, 1);
    assert.equal(trigger.getAttribute("aria-expanded"), "true");
    assert.equal(document.getElementById(trigger.getAttribute("aria-controls")!)?.hidden, false);
    await key(trigger, "Escape");
    assert.equal(trigger.getAttribute("aria-expanded"), "false");
    assert.equal(document.activeElement, trigger);
  }
});
await test("Chevron never navigates; ordinary anchors do, modified clicks remain native", async () => {
  visits.length = 0;
  await click(button("nav-destinations-toggle")); assert.deepEqual(visits, []);
  const anchor = document.querySelector('#main-navbar-sticky a[data-navigation-path="/destinations"]')!;
  for (const options of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
    const event = await click(anchor, options); assert.equal(event.defaultPrevented, false);
  }
  assert.deepEqual(visits, []);
  await click(anchor); assert.deepEqual(visits, ["/destinations"]);
  assert.equal(button("nav-destinations-toggle").getAttribute("aria-expanded"), "false");
});
await test("Outside interaction and route changes close menus", async () => {
  await click(button("nav-visas-toggle"));
  await React.act(async () => { document.body.dispatchEvent(new win.Event("pointerdown", { bubbles: true }) as unknown as Event); });
  assert.equal(button("nav-visas-toggle").getAttribute("aria-expanded"), "false");
  await click(button("nav-tools-toggle")); path = "/visa"; await render();
  assert.equal(button("nav-tools-toggle").getAttribute("aria-expanded"), "false");
});
await test("Language anchors retain new-tab behaviour and preserve an open panel on ordinary switching", async () => {
  const target = document.querySelector('#sticky-site-header a[hreflang="bn-bd"]')!;
  const modified = await click(target, { ctrlKey: true }); assert.equal(modified.defaultPrevented, false); assert.equal(lang, "en");
  await click(button("nav-destinations-toggle"));
  await click(target); path = "/bn/visa"; await render();
  assert.equal(lang, "bn"); assert.equal(button("nav-destinations-toggle").getAttribute("aria-expanded"), "true");
  assert.ok(document.getElementById("sticky-site-header")?.textContent?.includes("মধ্যপ্রাচ্য"));
  lang = "en"; await render();
});
await test("Drawer contains equivalent native links and traps only its visible controls", async () => {
  win.innerWidth = 390; await render();
  await click(button("mobile-menu-burger")); await settle();
  const drawer = document.getElementById("mobile-intent-drawer")!;
  assert.equal(drawer.getAttribute("aria-modal"), "true"); assert.equal(document.body.style.overflow, "hidden");
  assert.equal(document.activeElement, button("mobile-menu-close"));
  const visible = [...drawer.querySelectorAll<HTMLElement>('a[href],button')].filter(element => !element.closest("[hidden]"));
  visible[0].focus(); await key(visible[0], "Tab", true); assert.equal(document.activeElement, visible.at(-1));
  await key(visible.at(-1)!, "Tab"); assert.equal(document.activeElement, visible[0]);
  await click(button("mobile-destinations-toggle"));
  assert.ok(drawer.querySelector('a[href="/destinations/kashmir-guide"]'));
  await key(drawer, "Escape"); await settle();
  assert.equal(document.getElementById("mobile-intent-drawer"), null); assert.equal(document.body.style.overflow, "");
  assert.equal(document.activeElement, button("mobile-menu-burger"));
});
await test("Search/customized consent close navigation without stealing the next dialog's focus", async () => {
  await click(button("mobile-menu-burger")); await settle();
  const searchTrigger = button("mobile-site-search"); await click(searchTrigger); await settle();
  assert.equal(requestedSearch, searchTrigger); assert.equal(document.getElementById("mobile-intent-drawer"), null);
  searchOpen = true; await render(); searchOpen = false; await render();
  await click(button("mobile-menu-burger")); consentOpen = true; await render(); await settle();
  assert.equal(document.getElementById("mobile-intent-drawer"), null); assert.equal(document.body.style.overflow, "");
  consentOpen = false; await render();
});
await test("Crossing the desktop breakpoint releases a hidden drawer scroll lock", async () => {
  await click(button("mobile-menu-burger")); await settle();
  win.innerWidth = 1280;
  await React.act(async () => { win.dispatchEvent(new win.Event("resize")); }); await settle();
  assert.equal(document.getElementById("mobile-intent-drawer"), null); assert.equal(document.body.style.overflow, "");
});
await test("Email Updates closes/unlocks drawer before focusing the existing card", async () => {
  win.innerWidth = 390; await render();
  const card = document.createElement("section"); card.id = "sitewide-subscription";
  card.innerHTML = '<input id="sitewide-subscription-email" type="email">'; card.scrollIntoView = () => {};
  document.body.appendChild(card);
  await click(button("mobile-menu-burger")); await settle();
  await click(button("mobile-email-updates")); await settle();
  assert.equal(emailOverflow, ""); assert.equal(document.activeElement?.id, "sitewide-subscription-email");
  card.remove();
});
await test("Shortcut-opened full search owns scroll after a drawer, then releases it on close", async () => {
  const realFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ version: 1, entries: [] }), { headers: { "content-type": "application/json" } });
  try {
    await click(button("mobile-menu-burger")); await settle();
    assert.equal(document.body.style.overflow, "hidden");
    testFullSearch = true; searchOpen = true; await render(); await settle();
    assert.equal(document.body.style.overflow, "hidden", "Drawer cleanup must not unlock an active search dialog");
    assert.equal(document.activeElement?.id, "global-site-search-input");
    searchOpen = false; await render(); await settle();
    assert.equal(document.body.style.overflow, "", "Closing search must not resurrect the drawer's lock");
  } finally { globalThis.fetch = realFetch; testFullSearch = false; }
});
await test("Rendered navigation has no supplier promo while retaining activity discovery", () => {
  for (const language of ["en", "bn"] as const) {
    const markup = renderToStaticMarkup(React.createElement(SiteHeader, { ...props(), lang: language, model: buildNavigation(NAVIGATION_RECORDS, language), getHref: target => navigationHref(target, language) }));
    assert.ok(markup.includes(language === "bn" ? "ইমেইল আপডেট" : "Email Updates"));
    assert.ok(markup.includes(language === "bn" ? "/bn/experiences" : "/experiences"));
    assert.equal(/KKday 30% Sale|KKday Asia Travel Passes|tpo\.li/.test(markup), false);
  }
});
await React.act(async () => { root.unmount(); });
await win.happyDOM.abort();
console.log(`[site header] All ${checks} behavioural checks passed.`);
