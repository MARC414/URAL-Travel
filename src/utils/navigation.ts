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
