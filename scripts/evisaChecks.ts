import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Window } from "happy-dom";
import { AFFILIATE_OFFER_REGISTRY } from "../src/components/AffiliatePartners";
import { EvisaArticleCta, EvisaBanner, EvisaBlogBanner, EvisaBlogContextLink, EvisaDestinationPlacement, EvisaHomeSection, EvisaVisaPanel, EvisaWidgetPrivacyNote } from "../src/components/EvisaPanels";
import { EVISAS_BANNERS, EVISAS_BLOG_PLACEMENTS, EVISAS_HOME_COPY, EVISAS_WIDGET, evisasCampaignUrl, type EvisaLang } from "../src/data/evisaProgram";
import { getLocalizedBlogs } from "../src/data/bengaliContent";
import { resolveBlogAffiliateUrl } from "../src/utils/blogAffiliate";
import type { EvisaCampaignKey } from "../src/types";
import { evisaWidgetConsentFromEvent, hasEvisaWidgetConsent } from "../src/utils/evisaWidgetConsent";

/** Exercise destination attribution and the static/client commercial contract. */
export function checkEvisaIntegration(dist: string, check: (ok: boolean, label: string) => void) {
  const window = new Window();
  const parse = (html: string) => {
    const root = window.document.createElement("div");
    root.innerHTML = html;
    return root;
  };
  const render = (node: React.ReactNode) => renderToStaticMarkup(node);
  const expectedUrls: Record<EvisaCampaignKey | "general", string> = {
    general: "https://evisas.com/?ref=uraltravel",
    uae: "https://evisas.com/?ref=uraltravel&sid=dubai",
    thailand: "https://evisas.com/?ref=uraltravel&sid=thailand",
    morocco: "https://evisas.com/?ref=uraltravel&sid=morocco",
  };
  const inspectLinks = (html: string, expected: string) => {
    const links = [...parse(html).querySelectorAll('a[href^="https://evisas.com/"]')];
    return links.length > 0 && links.every((link) =>
      link.getAttribute("href") === expected &&
      link.getAttribute("target") === "_blank" &&
      ["noopener", "noreferrer", "sponsored"].every((token) => link.getAttribute("rel")?.split(/\s+/).includes(token)) &&
      Boolean(link.getAttribute("data-affiliate-placement")),
    );
  };
  type Case = { file: string; campaign: keyof typeof expectedUrls; banner: boolean; render: (lang: EvisaLang) => string };
  const cases: Case[] = [
    { file: "index.html", campaign: "general", banner: true, render: (lang) => render(React.createElement(EvisaHomeSection, { lang })) },
    { file: "visa.html", campaign: "general", banner: true, render: (lang) => render(React.createElement(EvisaBanner, { size: "horizontal", lang, placement: "evisas_visa_hub_banner" })) },
    ...["thailand-visa", "dubai-visa"].map((visaId): Case => ({ file: `visa/${visaId}.html`, campaign: visaId === "dubai-visa" ? "uae" : "thailand", banner: visaId === "dubai-visa", render: (lang) => render(React.createElement(EvisaVisaPanel, { visaId, lang })) })),
    ...["thailand-guide", "dubai-guide"].map((guideId): Case => ({ file: `destinations/${guideId}.html`, campaign: guideId === "dubai-guide" ? "uae" : "thailand", banner: guideId === "dubai-guide", render: (lang) => render(React.createElement(EvisaDestinationPlacement, { guideId, lang })) })),
    ...Object.entries(EVISAS_BLOG_PLACEMENTS).map(([slug, placement]): Case => ({
      file: `blog/${slug}.html`, campaign: placement!.campaign, banner: Boolean(placement!.banner),
      render: (lang) => render(React.createElement(EvisaBlogContextLink, { slug, lang })),
    })),
    { file: "blog/chefchaouen-morocco-travel-guide-bangladesh.html", campaign: "morocco", banner: true, render: (lang) => {
      const cta = getLocalizedBlogs(lang).find((post) => post.slug === "chefchaouen-morocco-travel-guide-bangladesh")?.affiliateCTA;
      return cta ? render(React.createElement(EvisaArticleCta, { cta, lang })) : "";
    } },
  ];
  const active = AFFILIATE_OFFER_REGISTRY.evisas.status === "active";
  const issues: string[] = [];
  const eligibilityIssues: string[] = [];
  for (const entry of cases) {
    for (const lang of ["en", "bn"] as const) {
      const file = path.join(dist, lang === "bn" ? "bn" : "", entry.file);
      const html = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
      const root = parse(html);
      if (!html) issues.push(`${lang}/${entry.file}: missing page`);
      if (active && (!entry.render(lang) || !html.includes(entry.render(lang)) || !inspectLinks(html, expectedUrls[entry.campaign]))) issues.push(`${lang}/${entry.file}: missing shared markup or incorrect sponsored campaign link`);
      if (!active && root.querySelector('a[href^="https://evisas.com/"]')) issues.push(`${lang}/${entry.file}: paused programme still linked`);
      const creatives = [...root.querySelectorAll("[data-evisa-creative]")];
      if (creatives.length !== (active && entry.banner ? 1 : 0)) issues.push(`${lang}/${entry.file}: missing or duplicate ad`);
      if (lang === "bn" && root.querySelector('img[src*="partners/evisas"]')) issues.push(`${entry.file}: English artwork on Bengali page`);
      const adWords = lang === "bn" ? ["বিজ্ঞাপন", "বেসরকারি"] : ["Advertisement", "Private"];
      const pageDisclosesCommission = lang === "bn" ? root.textContent.includes("কমিশন") : /commission/i.test(root.textContent);
      for (const creative of creatives) {
        const figure = creative.closest("figure");
        const caption = figure?.querySelector("figcaption")?.textContent ?? "";
        const panel = creative.closest("[data-evisa-panel]")?.textContent ?? "";
        if (figure) {
          if (!adWords.every((word) => caption.includes(word))) issues.push(`${lang}/${entry.file}: ad is not labelled beside the creative`);
        } else if (!(lang === "bn" ? panel.includes("বেসরকারি") : /private/i.test(panel))) {
          issues.push(`${lang}/${entry.file}: creative sits in an unlabelled panel`);
        }
        if (!pageDisclosesCommission && !(lang === "bn" ? panel.includes("কমিশন") : /commission/i.test(`${caption} ${panel}`))) issues.push(`${lang}/${entry.file}: neither the page footer nor the ad discloses a commission`);
      }
      if (active && entry.campaign === "thailand") {
        const section = root.querySelector('[data-evisa-context="thailand"], [data-evisa-panel]');
        const official = section?.querySelector('a[href="https://www.thaievisa.go.th/"]');
        if (!official || official.getAttribute("rel")?.includes("sponsored") || !section?.textContent.includes(lang === "bn" ? "বাংলাদেশ নেই" : "excludes Bangladesh")) eligibilityIssues.push(`${lang}/${entry.file}: lost Thailand qualification or official route`);
        const primary = section?.querySelector('[data-evisa-action="primary"]');
        if (primary && primary.getAttribute("href") !== "https://www.thaievisa.go.th/") eligibilityIssues.push(`${lang}/${entry.file}: Thailand affiliate became primary`);
      }
      if (active && entry.campaign === "morocco" && (!root.textContent.includes("residence permit") || !root.querySelector('a[href="https://www.acces-maroc.ma/"]'))) eligibilityIssues.push(`${lang}/${entry.file}: lost Morocco condition or official route`);
    }
  }
  check(issues.length === 0, `eVisas saved EN/BN placements match React, keep exact campaign URLs and show one disclosed ad per selected page [${issues.join("; ")}]`);
  check(eligibilityIssues.length === 0, `Thailand keeps the official route first; Morocco retains its eligibility conditions in both languages [${eligibilityIssues.join("; ")}]`);

  const assetIssues = Object.values(EVISAS_BANNERS).filter((asset) => !fs.existsSync(path.join(dist, asset.src)));
  check(assetIssues.length === 0 && Object.keys(EVISAS_BANNERS).length === 4, "all four supplied eVisas banner sizes have shipped WebP assets");
  const homeHtml = fs.readFileSync(path.join(dist, "index.html"), "utf8");
  const homeBnHtml = fs.readFileSync(path.join(dist, "bn", "index.html"), "utf8");
  const homeIssues: string[] = [];
  for (const [lang, html] of [["en", homeHtml], ["bn", homeBnHtml]] as const) {
    const root = parse(html);
    const section = root.querySelector('[data-evisa-panel="home-evisas-check"]');
    if (!active) continue;
    if (!section || !html.includes(render(React.createElement(EvisaHomeSection, { lang })))) homeIssues.push(`${lang}: missing shared section`);
    if (root.querySelectorAll('#home-evisas-check').length !== 1 || section?.querySelector("h2")?.textContent !== EVISAS_HOME_COPY[lang].headline || section?.querySelector("h3")?.textContent !== EVISAS_HOME_COPY[lang].hook) homeIssues.push(`${lang}: heading or hook differs`);
    if (root.querySelector('[data-evisa-creative="horizontal"]') || !section?.querySelector('[data-evisa-creative="square"]')) homeIssues.push(`${lang}: not a single square creative`);
    if (root.querySelector(`iframe[src="${EVISAS_WIDGET.src}"]`) || section?.querySelector("[data-evisa-widget-src]")?.getAttribute("data-evisa-widget-src") !== EVISAS_WIDGET.src) homeIssues.push(`${lang}: unsafe initial iframe or wrong embed`);
    if (!section?.querySelector('a[data-affiliate-placement="evisas_home_banner_cta"]')) homeIssues.push(`${lang}: missing the eVisas button under the square`);
    if ((section?.querySelector("figcaption")?.textContent ?? "") !== EVISAS_HOME_COPY[lang].bannerCaption) homeIssues.push(`${lang}: square caption is not the single ad label`);
    const partnerActions = section ? [...section.querySelectorAll('a[href^="https://evisas.com/"]')].filter((link) => !link.hasAttribute("data-evisa-creative")) : [];
    if (partnerActions.length !== 1 || !partnerActions[0]?.closest(".home-evisa-ad")) homeIssues.push(`${lang}: partner action is not the single button under the creative`);
    if (section?.querySelector("footer, .home-evisa-links") || section?.querySelector('a[href="/visa"], a[href="/bn/visa"]')) homeIssues.push(`${lang}: removed disclosure footer or guide button came back`);
  }
  check(homeIssues.length === 0, `both homepages contain one large-heading eVisas section, a short hook, square creative and consent-safe widget fallback [${homeIssues.join("; ")}]`);
  const appSource = fs.readFileSync(path.join(dist, "..", "src", "App.tsx"), "utf8");
  check((appSource.match(/<EvisaHomeSection\b/g) ?? []).length === 1 && !/EvisaHome(?:Card|Banner)/.test(appSource) && appSource.indexOf("<EvisaHomeSection") < appSource.indexOf('id="destinations-section"') && appSource.indexOf('id="airport-code-reference"') > appSource.indexOf('id="destinations-section"') && appSource.indexOf("<EvisaHomeSection") < appSource.indexOf('<TravelEssentials country='), "the homepage runs flight search, then eVisas, then the destination cards and the airport-code reference, then Travel Essentials");

  const consentFixtures = [
    { status: null, settings: null, expected: false },
    { status: "declined", settings: '{"marketing":true}', expected: false },
    { status: "accepted", settings: null, expected: true },
    { status: "custom", settings: '{"analytics":true,"functionality":true,"marketing":false}', expected: false },
    { status: "custom", settings: '{"marketing":true}', expected: true },
    { status: "custom", settings: '{"marketing":"true"}', expected: false },
    { status: "custom", settings: "bad json", expected: false },
  ];
  check(consentFixtures.every((fixture) => hasEvisaWidgetConsent({ getItem: (key) => key === "cookie-consent" ? fixture.status : fixture.settings }) === fixture.expected) &&
    !hasEvisaWidgetConsent({ getItem: () => { throw new Error("Storage blocked"); } }) &&
    evisaWidgetConsentFromEvent({ payload: { ad_storage: "granted" } }) &&
    !evisaWidgetConsentFromEvent({ payload: { ad_storage: "denied" } }) &&
    !evisaWidgetConsentFromEvent(null),
    "eVisas consent fails closed for declined/missing/malformed storage, ignores analytics-only consent and handles grant/withdrawal events");
  for (const lang of ["en", "bn"] as const) {
    const privacy = fs.readFileSync(path.join(dist, lang === "bn" ? "bn" : "", "privacy.html"), "utf8");
    check(privacy.includes(render(React.createElement(EvisaWidgetPrivacyNote, { lang }))), `${lang} privacy page discloses the consent-gated eVisas embed and links the provider's privacy policy`);
  }

  const previousStatus = AFFILIATE_OFFER_REGISTRY.evisas.status;
  try {
    AFFILIATE_OFFER_REGISTRY.evisas.status = "paused";
    const allHidden = cases.every((entry) => entry.render("en") === "" && entry.render("bn") === "") &&
      render(React.createElement(EvisaHomeSection, { lang: "en" })) === "" &&
      Object.keys(EVISAS_BLOG_PLACEMENTS).every((slug) => render(React.createElement(EvisaBlogBanner, { slug, lang: "bn" })) === "") &&
      Object.keys(expectedUrls).filter((key) => key !== "general").every((key) => evisasCampaignUrl(key as EvisaCampaignKey) === "") &&
      resolveBlogAffiliateUrl({ provider: "evisas", campaign: "morocco", headline: "", body: "" }) === "";
    check(allHidden, "pausing eVisas removes account/campaign links and their panels across both renderers");
  } finally {
    AFFILIATE_OFFER_REGISTRY.evisas.status = previousStatus;
  }
  check(
    ["nepal-visa", "saudi-arabia-visa", "malaysia-visa", "singapore-visa"].every((visaId) => render(React.createElement(EvisaVisaPanel, { visaId })) === "") &&
      render(React.createElement(EvisaDestinationPlacement, { guideId: "nepal-guide", lang: "en" })) === "",
    "unmapped visa and destination pages do not inherit a generic eVisas offer",
  );
  const fixture = '<a href="https://evisas.com/?ref=uraltravel&amp;sid=dubai" target="_blank" rel="noopener noreferrer sponsored" data-affiliate-placement="test">UAE visa options</a>';
  check(inspectLinks(fixture, expectedUrls.uae) && !inspectLinks(fixture.replace("sid=dubai", "sid=thailand"), expectedUrls.uae) && !inspectLinks(fixture.replace(" noreferrer sponsored", " noreferrer"), expectedUrls.uae), "eVisas attribution guard rejects a wrong destination campaign and a missing sponsored label (negative controls)");
  window.happyDOM.abort();
}
