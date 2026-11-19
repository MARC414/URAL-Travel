import React from "react";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import type { Language } from "../translations";
import { navigationHref, isNavigationPathCurrent, type NavigationItem, type NavigationMenu, type NavigationModel } from "../utils/navigation";

/** Progressive no-JS shell, replaced by React's live header on mount. */
export function StaticSiteNavigation({ model, lang, currentPath }: { model: NavigationModel; lang: Language; currentPath: string }) {
  const isBn = lang === "bn";
  const link = (item: NavigationItem, className = "ural-navigation-link") => <a key={item.id} className={className} href={navigationHref(item.path, lang)} aria-current={isNavigationPathCurrent(item.path, currentPath) ? "page" : undefined}><span className="ural-navigation-title">{item.label}</span>{item.subtitle && <span className="ural-navigation-subtitle">{item.subtitle}</span>}</a>;
  const groups = (menu: NavigationMenu, mobile = false) => menu.groups.map(group => <section key={group.id} className={mobile ? "ural-drawer-group" : "ural-mega-column"}><h3>{group.label}</h3><ul>{group.items.map(item => <li key={item.id}>{link(item)}</li>)}</ul></section>);
  return (
    <div id="sticky-site-header" className="ural-site-header sticky top-0 z-50" data-static-site-navigation="true">
      <div className="ural-utility-row"><div className="ural-header-container ural-utility-inner">
        <nav className="ural-utility-links" aria-label={isBn ? "URAL সম্পর্কে" : "About URAL"}>{model.utility.map((item, index) => <span key={item.id} className={index > 1 ? "ural-desktop-trust" : undefined}>{link(item, "ural-utility-link")}</span>)}</nav>
        <a className="ural-utility-search ural-static-directory" href={navigationHref("/sitemap", lang)}>{isBn ? "সব গাইডের ডিরেক্টরি" : "All guides directory"}<ArrowRight size={15} aria-hidden="true" /></a>
        <nav className="ural-utility-controls ural-static-language" aria-label={isBn ? "ভাষা" : "Language"}><a href={navigationHref(currentPath, "en")} hrefLang="en-bd" lang="en">EN</a><a href={navigationHref(currentPath, "bn")} hrefLang="bn-bd" lang="bn">বাংলা</a></nav>
      </div></div>
      <header id="main-navbar-sticky" className="ural-primary-row"><div className="ural-header-container ural-primary-inner">
        <a className="ural-header-brand" href={navigationHref("/", lang)} aria-label={isBn ? "URAL হোম" : "URAL home"}><img src="/assets/brand/svg/ural-wordmark-v1.svg" alt="URAL" width="98" height="34" loading="lazy" /><span>A Travel Intelligence Ecosystem</span></a>
        <nav className="ural-primary-nav" aria-label={isBn ? "প্রধান নেভিগেশন" : "Primary navigation"}>{model.primary.map(item => <div className="ural-primary-item" key={item.id}><a href={navigationHref(item.path, lang)}>{item.label}</a>{item.menu && <details name="ural-static-primary" className="ural-static-disclosure"><summary className="ural-disclosure" aria-label={isBn ? `${item.label} মেনু খুলুন` : `Open ${item.label} menu`}><ChevronDown size={13} aria-hidden="true" /></summary><div className="ural-mega-panel"><div className="ural-mega-surface"><div className="ural-mega-head"><div><h2>{model.menus[item.menu].title}</h2><p>{model.menus[item.menu].description}</p></div><a className="ural-menu-all" href={navigationHref(item.path, lang)}>{model.menus[item.menu].allLabel}<ArrowRight size={15} aria-hidden="true" /></a></div><div className={`ural-mega-columns ${item.menu === "destinations" ? "ural-mega-columns-four" : ""}`}>{groups(model.menus[item.menu])}</div></div></div></details>}</div>)}</nav>
        <details className="ural-static-mobile-navigation"><summary className="ural-header-icon" aria-label={isBn ? "নেভিগেশন মেনু খুলুন" : "Open navigation menu"}><Menu size={22} aria-hidden="true" /></summary><div className="ural-static-mobile-content"><nav className="ural-drawer-trust" aria-label={isBn ? "URAL সম্পর্কে" : "About URAL"}>{model.utility.map(item => link(item, "ural-utility-link"))}</nav><nav aria-label={isBn ? "মোবাইল প্রধান নেভিগেশন" : "Mobile primary navigation"}>{model.primary.map(item => item.menu ? <details key={item.id} className="ural-drawer-section" name="ural-static-mobile-groups"><summary className="ural-drawer-toggle">{item.label}<ChevronDown size={16} aria-hidden="true" /></summary><a className="ural-menu-all" href={navigationHref(item.path, lang)}>{model.menus[item.menu].allLabel}<ArrowRight size={15} aria-hidden="true" /></a>{groups(model.menus[item.menu], true)}</details> : <a key={item.id} className="ural-drawer-direct" href={navigationHref(item.path, lang)}>{item.label}<ArrowRight size={16} aria-hidden="true" /></a>)}</nav></div></details>
      </div></header>
    </div>
  );
}
