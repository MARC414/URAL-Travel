import type { Language } from "../translations";
import { NAVIGATION_LAYOUT } from "../data/navigation";
import { SITE_ORIGIN, hasBengaliCounterpart, toEnglishBasePath } from "./localeRoutes";

export type NavigationMenuId = "destinations" | "activities" | "visas" | "tools";
export type NavigationMembership = { menu: NavigationMenuId; group: string; order: number };
export interface NavigationRecord {
  id: string;
  path: string;
  label: Record<Language, string>;
  subtitle?: Record<Language, string>;
  publishedLocales: readonly Language[];
  memberships: readonly NavigationMembership[];
}
export interface NavigationItem { id: string; path: string; label: string; subtitle?: string; menu?: NavigationMenuId }
export interface NavigationMenu { id: NavigationMenuId; parent: NavigationItem; title: string; description: string; allLabel: string; groups: { id: string; label: string; items: NavigationItem[] }[] }
export interface NavigationModel { utility: NavigationItem[]; primary: NavigationItem[]; menus: Record<NavigationMenuId, NavigationMenu> }

export function buildNavigation(records: readonly NavigationRecord[], lang: Language): NavigationModel {
  const published = records.filter(record => record.publishedLocales.includes(lang) && record.label[lang].trim());
  const localize = (record: NavigationRecord): NavigationItem => ({ id: record.id, path: record.path, label: record.label[lang], ...(record.subtitle?.[lang] ? { subtitle: record.subtitle[lang] } : {}) });
  const byId = new Map(published.map(record => [record.id, record]));
  const ordered = (ids: readonly string[]) => ids.flatMap(id => byId.has(id) ? [localize(byId.get(id)!)] : []);
  const menus = {} as NavigationModel["menus"];
  for (const id of Object.keys(NAVIGATION_LAYOUT.menus) as NavigationMenuId[]) {
    const layout = NAVIGATION_LAYOUT.menus[id];
    const parent = byId.get(id);
    if (!parent) throw new Error(`Missing published navigation parent: ${id} (${lang})`);
    menus[id] = {
      id, parent: localize(parent), title: layout.title[lang], description: layout.description[lang], allLabel: layout.all[lang],
      groups: layout.groups.map(([groupId, label]) => ({
        id: groupId, label: label[lang],
        items: published.flatMap(record => record.memberships.filter(member => member.menu === id && member.group === groupId).map(member => ({ record, order: member.order })))
          .sort((a, b) => a.order - b.order).map(({ record }) => localize(record)),
      })),
    };
  }
  return { utility: ordered(NAVIGATION_LAYOUT.utility), primary: ordered(NAVIGATION_LAYOUT.primary).map(item => ({ ...item, ...(item.id in menus ? { menu: item.id as NavigationMenuId } : {}) })), menus };
}

/** Page links only; preserve intent while normalizing the locale exactly once. */
export function navigationHref(path: string, lang: Language): string {
  const url = new URL(path || "/", SITE_ORIGIN);
  if (url.origin !== SITE_ORIGIN) throw new Error("Navigation must use an internal page path");
  const base = toEnglishBasePath(url.pathname);
  const localized = lang === "bn" && hasBengaliCounterpart(base) ? (base === "/" ? "/bn/" : `/bn${base}`) : base;
  return `${localized}${url.search}${url.hash}`;
}

/** The router and locale links must retain fragments on initial load and Back. */
export function navigationLocationPath(location: { pathname: string; search: string; hash?: string }): string {
  return `${location.pathname}${location.search}${location.hash ?? ""}`;
}

/** Restore a real fragment after route/language rendering, including lazy views. */
export function restoreNavigationFragment(path: string): () => void {
  if (typeof document === "undefined" || typeof window === "undefined") return () => {};
  let id: string;
  try { id = decodeURIComponent(new URL(path, SITE_ORIGIN).hash.slice(1)); }
  catch { return () => {}; }
  if (!id) return () => {};
  let cancelled = false;
  let frame = 0;
  let fallbackTimer = 0;
  const clearScheduledScroll = () => {
    window.cancelAnimationFrame(frame);
    window.clearTimeout(fallbackTimer);
    frame = 0;
    fallbackTimer = 0;
  };
  const cleanup = () => {
    cancelled = true;
    clearScheduledScroll();
    window.clearTimeout(timeout);
    observer.disconnect();
    window.removeEventListener("wheel", cleanup);
    window.removeEventListener("touchstart", cleanup);
    window.removeEventListener("keydown", cancelOnScrollKey);
  };
  const cancelOnScrollKey = (event: KeyboardEvent) => {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) cleanup();
  };
  const scroll = () => {
    clearScheduledScroll();
    if (cancelled) return;
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ block: "start", behavior: "instant" });
    cleanup();
  };
  const schedule = () => {
    if (cancelled || frame || fallbackTimer) return;
    frame = window.requestAnimationFrame(scroll);
    // Occluded tabs can pause animation frames while timers still run. Race a
    // short fallback, cancelling the other path before either attempts a jump.
    fallbackTimer = window.setTimeout(scroll, 100);
  };
  const observer = new MutationObserver(schedule);
  observer.observe(document.body, { childList: true, subtree: true });
  const timeout = window.setTimeout(cleanup, 5000);
  // A delayed automatic jump must never pull the reader away from their own
  // scroll gesture. These listeners live only until success, cancellation or timeout.
  window.addEventListener("wheel", cleanup, { passive: true });
  window.addEventListener("touchstart", cleanup, { passive: true });
  window.addEventListener("keydown", cancelOnScrollKey);
  // Fonts can move an otherwise mounted target; wait for the current font load.
  if (document.fonts?.ready) void document.fonts.ready.then(schedule);
  else schedule();
  return cleanup;
}

/** A closing search cannot return focus to a hidden/unmounted modal child. */
export function selectNavigationSearchOpener(active: HTMLElement | null, fallback: HTMLElement | null): HTMLElement | null {
  return active && active.tagName !== "BODY" && active.isConnected && active.getClientRects().length > 0 && !active.closest('[role="dialog"]') ? active : fallback;
}

export function activeNavigationMenu(path: string): NavigationMenuId | null {
  const base = toEnglishBasePath(path);
  if (base === "/destinations" || base.startsWith("/destinations/")) return "destinations";
  if (base === "/experiences" || base.startsWith("/experiences/") || base === "/attractions" || base.startsWith("/attractions/")) return "activities";
  if (base === "/visa" || base.startsWith("/visa/") || base === "/visa-free-countries" || base === "/visa-assistance") return "visas";
  if (["/tools", "/blog", "/costs", "/banking", "/pre-departure", "/resources", "/glossary", "/sitemap"].some(hub => base === hub || base.startsWith(`${hub}/`))) return "tools";
  return null;
}

export function isNavigationPathCurrent(target: string, current: string): boolean {
  if (toEnglishBasePath(target) !== toEnglishBasePath(current)) return false;
  const wanted = new URL(target, SITE_ORIGIN).searchParams;
  const actual = new URL(current, SITE_ORIGIN).searchParams;
  return [...wanted].every(([key, value]) => actual.get(key) === value);
}
