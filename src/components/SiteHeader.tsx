import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ChevronDown, Menu, Search, X } from "lucide-react";
import type { Language } from "../translations";
import { translations } from "../translations";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { TopBarWhatsApp } from "./WhatsAppSupport";
import { activeNavigationMenu, isNavigationPathCurrent, navigationHref, type NavigationItem, type NavigationMenu, type NavigationMenuId, type NavigationModel } from "../utils/navigation";
import { toEnglishBasePath } from "../utils/localeRoutes";

const BRAND_TAGLINE = "A Travel Intelligence Ecosystem";

export interface SiteHeaderProps {
  lang: Language;
  currentPath: string;
  model: NavigationModel;
  getHref: (path: string) => string;
  onNavigate: (path: string) => void;
  onLanguageChange: (lang: Language) => void;
  localeHrefs: { en: string; bn: string };
  utilitySearch: React.ReactNode;
  searchOpen: boolean;
  consentOpen: boolean;
  onRequestSearch: (trigger: HTMLElement) => void;
  onEmailUpdates: () => void;
}

export function SiteHeader({ lang, currentPath, model, getHref, onNavigate, onLanguageChange, localeHrefs, utilitySearch, searchOpen, consentOpen, onRequestSearch, onEmailUpdates }: SiteHeaderProps) {
  const isBn = lang === "bn";
  const [openMenu, setOpenMenu] = useState<NavigationMenuId | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerGroup, setDrawerGroup] = useState<NavigationMenuId | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Partial<Record<NavigationMenuId, HTMLButtonElement | null>>>({});
  const restoreDrawerFocus = useRef(true);
  const pendingEmail = useRef(false);
  const overlaysOpen = searchOpen || consentOpen;
  const drawerVisible = drawerOpen && !overlaysOpen;
  const overlaysRef = useRef(overlaysOpen);
  overlaysRef.current = overlaysOpen;
  const active = activeNavigationMenu(currentPath);
  const routeKey = navigationHref(currentPath, "en");

  const closeDrawer = (restore = true) => { restoreDrawerFocus.current = restore; setDrawerOpen(false); };
  const closeNavigation = () => { setOpenMenu(null); closeDrawer(false); };
  const follow = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); closeNavigation(); onNavigate(path);
  };

  useEffect(() => { closeNavigation(); setDrawerGroup(activeNavigationMenu(currentPath)); }, [routeKey]);
  useEffect(() => { if (overlaysOpen) closeNavigation(); }, [overlaysOpen]);
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) setOpenMenu(null); };
    const focusOutside = (event: FocusEvent) => { if (!headerRef.current?.contains(event.target as Node)) setOpenMenu(null); };
    const resize = () => { setOpenMenu(null); if (window.innerWidth >= 1280) closeDrawer(false); };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", focusOutside);
    window.addEventListener("resize", resize);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("focusin", focusOutside); window.removeEventListener("resize", resize); };
  }, []);

  useEffect(() => {
    if (!drawerVisible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus());
    const focusable = () => Array.from(drawerRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])') ?? []).filter(element => element.getClientRects().length > 0);
    const trap = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); closeDrawer(); return; }
      if (event.key !== "Tab") return;
      const elements = focusable(), first = elements[0], last = elements.at(-1);
      const outside = !drawerRef.current?.contains(document.activeElement);
      if (!first || !last) { event.preventDefault(); drawerRef.current?.focus(); }
      else if (event.shiftKey && (document.activeElement === first || outside)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || outside)) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", trap);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", trap);
      if (restoreDrawerFocus.current && !overlaysRef.current) burgerRef.current?.focus();
    };
  }, [drawerVisible]);

  // Let the drawer cleanup release scroll/focus before the existing delayed signup action.
  useEffect(() => { if (!drawerOpen && pendingEmail.current) { pendingEmail.current = false; onEmailUpdates(); } }, [drawerOpen, onEmailUpdates]);
  const emailUpdates = () => { setOpenMenu(null); if (drawerOpen) { pendingEmail.current = true; closeDrawer(false); } else onEmailUpdates(); };
  const requestSearch = (trigger: HTMLElement) => { closeNavigation(); onRequestSearch(trigger); };
  const openDrawer = () => { if (overlaysOpen) return; restoreDrawerFocus.current = true; setOpenMenu(null); setDrawerOpen(true); };
  const toggle = (id: NavigationMenuId) => { if (!overlaysOpen) setOpenMenu(current => current === id ? null : id); };
  const isPrimaryActive = (item: NavigationItem) => item.menu ? active === item.menu : (isNavigationPathCurrent(item.path, currentPath) || toEnglishBasePath(currentPath).startsWith(`${item.path}/`) || (item.id === "hotels" && toEnglishBasePath(currentPath) === "/kkday-hotels"));
  const anchor = (item: NavigationItem, className = "ural-navigation-link") => (
    <a key={item.id} href={getHref(item.path)} data-navigation-path={item.path} onClick={event => follow(event, item.path)} aria-current={isNavigationPathCurrent(item.path, currentPath) ? "page" : undefined} className={className}>
      <span className="ural-navigation-title">{item.label}</span>{item.subtitle && <span className="ural-navigation-subtitle">{item.subtitle}</span>}
    </a>
  );
  const groups = (menu: NavigationMenu, mobile = false) => menu.groups.map(group => (
    <section key={group.id} className={mobile ? "ural-drawer-group" : "ural-mega-column"}>
      <h3>{group.label}</h3><ul>{group.items.map(item => <li key={item.id}>{anchor(item)}</li>)}</ul>
    </section>
  ));
  const language = <LanguageSwitcher lang={lang} onToggle={onLanguageChange} enHref={localeHrefs.en} bnHref={localeHrefs.bn} />;

  return (
    <div id="sticky-site-header" ref={headerRef} className="ural-site-header sticky top-0 z-50" onKeyDown={event => {
      if (event.key === "Escape" && openMenu) { event.preventDefault(); const trigger = triggers.current[openMenu]; setOpenMenu(null); trigger?.focus(); }
    }}>
      <div className="ural-utility-row"><div className="ural-header-container ural-utility-inner">
        <nav className="ural-utility-links" aria-label={isBn ? "URAL সম্পর্কে" : "About URAL"}>{model.utility.map((item, index) => <React.Fragment key={item.id}><span className={index > 1 ? "ural-desktop-trust" : undefined}>{anchor(item, "ural-utility-link")}</span></React.Fragment>)}</nav>
        <div className="ural-utility-search">{utilitySearch}</div>
        <div className="ural-utility-controls"><div className="ural-header-help ural-desktop-trust"><TopBarWhatsApp lang={lang} /></div>{language}</div>
      </div></div>
      <header id="main-navbar-sticky" className="ural-primary-row"><div className="ural-header-container ural-primary-inner">
        <a className="ural-header-brand" href={getHref("/")} onClick={event => follow(event, "/")} aria-label={isBn ? "URAL হোম" : "URAL home"}><img src="/assets/brand/svg/ural-wordmark-v1.svg" alt="URAL" width="98" height="34" /><span>{BRAND_TAGLINE}</span></a>
        <nav className="ural-primary-nav" aria-label={isBn ? "প্রধান নেভিগেশন" : "Primary navigation"}>{model.primary.map(item => (
          <div key={item.id} className={`ural-primary-item ${isPrimaryActive(item) || openMenu === item.menu ? "is-active" : ""} ${openMenu === item.menu ? "is-open" : ""}`}>
            <a href={getHref(item.path)} data-navigation-path={item.path} onClick={event => follow(event, item.path)} aria-current={isNavigationPathCurrent(item.path, currentPath) ? "page" : undefined}>{item.label}</a>
            {item.menu && <button type="button" id={`nav-${item.menu}-toggle`} ref={element => { triggers.current[item.menu!] = element; }} className="ural-disclosure" onClick={() => toggle(item.menu!)} aria-label={isBn ? `${item.label} মেনু খুলুন বা বন্ধ করুন` : `Toggle ${item.label} menu`} aria-controls={`nav-${item.menu}-panel`} aria-expanded={openMenu === item.menu}><ChevronDown size={13} aria-hidden="true" /></button>}
          </div>
        ))}</nav>
        <button type="button" id="btn-signup-cta" className="ural-email-cta ural-desktop-email" onClick={emailUpdates} aria-controls="sitewide-subscription">{translations[lang].signUpCta}</button>
        <div className="ural-mobile-actions"><button type="button" id="mobile-site-search" className="ural-header-icon" aria-label={isBn ? "গাইড খুঁজুন" : "Search guides"} aria-haspopup="dialog" onClick={event => requestSearch(event.currentTarget)}><Search size={20} aria-hidden="true" /></button><button type="button" id="mobile-menu-burger" ref={burgerRef} className="ural-header-icon" onClick={openDrawer} aria-label={isBn ? "নেভিগেশন মেনু খুলুন" : "Open navigation menu"} aria-expanded={drawerOpen} aria-controls="mobile-intent-drawer"><Menu size={22} aria-hidden="true" /></button></div>
        {Object.values(model.menus).map(menu => <section key={menu.id} id={`nav-${menu.id}-panel`} className="ural-mega-panel" role="region" aria-labelledby={`nav-${menu.id}-title`} hidden={openMenu !== menu.id}><div className="ural-mega-surface"><div className="ural-mega-head"><div><h2 id={`nav-${menu.id}-title`}>{menu.title}</h2><p>{menu.description}</p></div><a className="ural-menu-all" href={getHref(menu.parent.path)} onClick={event => follow(event, menu.parent.path)}>{menu.allLabel}<ArrowRight size={15} aria-hidden="true" /></a></div><div className={`ural-mega-columns ${menu.id === "destinations" ? "ural-mega-columns-four" : ""}`}>{groups(menu)}</div></div></section>)}
      </div></header>
      {drawerVisible && typeof document !== "undefined" && createPortal(
        <div className="ural-drawer-overlay" onClick={event => { if (event.target === event.currentTarget) closeDrawer(); }}>
          <div id="mobile-intent-drawer" ref={drawerRef} className="ural-drawer" role="dialog" aria-modal="true" aria-label={isBn ? "নেভিগেশন মেনু" : "Navigation menu"} tabIndex={-1}>
            <div className="ural-drawer-top"><img src="/assets/brand/svg/ural-wordmark-v1.svg" alt="URAL" width="90" height="32" /><div className="ural-drawer-controls">{language}<button type="button" id="mobile-menu-close" ref={closeRef} className="ural-header-icon" onClick={() => closeDrawer()} aria-label={isBn ? "মেনু বন্ধ করুন" : "Close navigation menu"}><X size={22} aria-hidden="true" /></button></div></div>
            <div className="ural-drawer-content"><nav className="ural-drawer-trust" aria-label={isBn ? "URAL সম্পর্কে" : "About URAL"}>{model.utility.map(item => anchor(item, "ural-utility-link"))}</nav>
              <nav aria-label={isBn ? "মোবাইল প্রধান নেভিগেশন" : "Mobile primary navigation"}>{model.primary.map(item => item.menu ? <div className="ural-drawer-section" key={item.id}><button type="button" id={`mobile-${item.menu}-toggle`} className="ural-drawer-toggle" aria-expanded={drawerGroup === item.menu} aria-controls={`mobile-${item.menu}-group`} onClick={() => setDrawerGroup(current => current === item.menu ? null : item.menu!)}>{item.label}<ChevronDown size={16} aria-hidden="true" /></button><div id={`mobile-${item.menu}-group`} hidden={drawerGroup !== item.menu}><a className="ural-menu-all" href={getHref(item.path)} onClick={event => follow(event, item.path)}>{model.menus[item.menu].allLabel}<ArrowRight size={15} aria-hidden="true" /></a>{groups(model.menus[item.menu], true)}</div></div> : <a key={item.id} className="ural-drawer-direct" href={getHref(item.path)} onClick={event => follow(event, item.path)} aria-current={isNavigationPathCurrent(item.path, currentPath) ? "page" : undefined}>{item.label}<ArrowRight size={16} aria-hidden="true" /></a>)}</nav>
            </div><div className="ural-drawer-foot"><div className="ural-header-help"><TopBarWhatsApp lang={lang} /></div><button type="button" id="mobile-email-updates" className="ural-email-cta" onClick={emailUpdates} aria-controls="sitewide-subscription">{translations[lang].signUpCta}</button></div>
          </div>
        </div>, document.body,
      )}
    </div>
  );
}
