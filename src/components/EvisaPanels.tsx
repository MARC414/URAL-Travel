import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  EVISAS_BANNERS,
  EVISAS_BLOG_PLACEMENTS,
  EVISAS_DESTINATION_CAMPAIGNS,
  EVISAS_DISCLOSURE,
  EVISAS_HOME_COPY,
  EVISAS_WIDGET,
  EVISAS_WIDGET_PRIVACY,
  evisasDestinationUrl,
  getEvisaContext,
  getEvisaOfficialAction,
  getEvisaVisaPanel,
  type EvisaBannerSize,
  type EvisaBlock,
  type EvisaCampaignKey,
  type EvisaLang,
} from "../data/evisaProgram";
import type { BlogPost } from "../types";
import { getAffiliateCtaButtonLabel, sanitizeExpiredPromoText } from "./AffiliatePartners";
import { openConsentPreferences, useConsent } from "../utils/consent";

const LINK_FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy";

function EvisaActionLink({ action, lang, placement }: {
  action: EvisaBlock["actions"][number];
  lang: EvisaLang;
  placement: string;
}) {
  const external = /^https?:/i.test(action.href);
  const primary = action.emphasis === "primary";
  const style = primary
    ? `inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition-colors ${
        action.sponsored
          ? "bg-brand-gold text-brand-navy hover:bg-brand-gold-dark active:bg-brand-gold-dark"
          : "bg-brand-navy text-white hover:bg-slate-700 active:bg-slate-800"
      }`
    : "inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-navy underline underline-offset-4 hover:text-brand-gold-ink active:text-brand-navy";

  return (
    <a
      href={action.href}
      target={external ? "_blank" : undefined}
      rel={external ? `noopener noreferrer${action.sponsored ? " sponsored" : ""}` : undefined}
      data-affiliate-placement={action.sponsored ? placement : undefined}
      data-evisa-action={primary ? "primary" : "text"}
      className={`${style} ${LINK_FOCUS}`}
    >
      {action.label}
      {external && <><ExternalLink size={14} className="shrink-0" aria-hidden="true" /><span className="sr-only">{lang === "bn" ? " (নতুন ট্যাবে খুলবে)" : " (opens in a new tab)"}</span></>}
    </a>
  );
}

/** Supplied artwork stays intact. A single picture selects the right format. */
function EvisaCreative({ size, campaign, lang, placement }: {
  size: EvisaBannerSize;
  campaign?: EvisaCampaignKey;
  lang: EvisaLang;
  placement: string;
}) {
  const href = evisasDestinationUrl(campaign);
  if (!href) return null;
  const asset = EVISAS_BANNERS[size];
  const media = size === "horizontal" ? "(min-width: 768px)" : size === "skyscraper" ? "(min-width: 1024px)" : undefined;
  const fallback = media ? EVISAS_BANNERS.square : asset;
  const label = campaign ? getEvisaContext(campaign, lang).label : lang === "bn" ? "eVisas-এ ভিসার সুযোগ দেখুন" : "Check visa options with eVisas";
  const newTab = lang === "bn" ? "নতুন ট্যাবে খুলবে" : "opens in a new tab";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      aria-label={`${label} (${newTab})`}
      data-affiliate-placement={placement}
      data-evisa-creative={size}
      className={`evisa-creative evisa-creative--${size} ${LINK_FOCUS}`}
    >
      {lang === "bn" ? (
        <span className="evisa-native">
          <span className="text-lg font-bold">eVisas</span>
          <span className="text-base font-semibold leading-relaxed">ভিসা আবেদন সহায়তা</span>
          <span className="text-sm leading-relaxed text-white/80">আপনার পাসপোর্টে সুযোগ দেখুন</span>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-brand-gold">দেখুন <ExternalLink size={14} aria-hidden="true" /></span>
        </span>
      ) : (
        <picture>
          {media && <source media={media} srcSet={asset.src} width={asset.width} height={asset.height} />}
          <img
            src={fallback.src}
            alt={`${label} — paid application service (advertisement)`}
            width={fallback.width}
            height={fallback.height}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </picture>
      )}
    </a>
  );
}

function EvisaBlockShell({ block, headingId, lang, placement, banner, campaign }: {
  block: EvisaBlock;
  headingId: string;
  lang: EvisaLang;
  placement: string;
  banner?: EvisaBannerSize;
  campaign?: EvisaCampaignKey;
}) {
  const primary = block.actions.filter((action) => action.emphasis === "primary");
  const textActions = block.actions.filter((action) => action.emphasis === "text");
  const sponsored = block.actions.some((action) => action.sponsored);

  return (
    <section aria-labelledby={headingId} data-evisa-panel={headingId} className="evisa-panel rounded-xl border border-border-subtle bg-white p-5 sm:p-6">
      <div className={banner && sponsored ? "evisa-panel-layout" : undefined}>
        <div className="min-w-0 space-y-3">
          <p className="text-xs font-semibold text-slate-600">{block.badge}</p>
          <h2 id={headingId} className="evisa-title font-serif text-xl font-bold leading-snug text-brand-navy sm:text-2xl">{block.headline}</h2>
          <p className="max-w-prose text-sm leading-relaxed text-slate-700 sm:text-base">{block.body}</p>
          {primary.length > 0 && <div className="flex flex-wrap gap-3">{primary.map((action) => <EvisaActionLink key={action.href} action={action} lang={lang} placement={placement} />)}</div>}
          {textActions.length > 0 && (
            <div className="space-y-1">
              {block.note && sponsored && <p className="text-sm leading-relaxed text-slate-700">{block.note}</p>}
              {textActions.map((action) => <EvisaActionLink key={action.href} action={action} lang={lang} placement={placement} />)}
            </div>
          )}
        </div>
        {banner && sponsored && <EvisaCreative size={banner} campaign={campaign} lang={lang} placement={`${placement}_banner`} />}
      </div>
      {sponsored && <p className="mt-4 border-t border-slate-200 pt-3 text-xs leading-relaxed text-slate-600">{block.disclosure}</p>}
    </section>
  );
}

export function EvisaVisaPanel({ visaId, lang = "en" }: { visaId: string; lang?: EvisaLang }) {
  const block = getEvisaVisaPanel(visaId, lang);
  if (!block || !block.actions.some((action) => action.sponsored)) return null;
  return <EvisaBlockShell block={block} headingId="visa-evisas-next-step" lang={lang} placement={`evisas_visa_${visaId}`} banner={visaId === "dubai-visa" ? "vertical" : undefined} campaign={visaId === "dubai-visa" ? "uae" : "thailand"} />;
}

export const EVISAS_WIDGET_SLOW_MS = 12_000;

/** One prominent homepage section. Remote content never loads in saved HTML. */
export function EvisaHomeSection({ lang = "en" }: { lang?: EvisaLang }) {
  const allowed = useConsent("marketing");
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  const [inView, setInView] = useState(false);
  const slotRef = useRef<HTMLDivElement | null>(null);
  const href = evisasDestinationUrl();
  const copy = EVISAS_HOME_COPY[lang];

  // Start the slow-load countdown only once the widget slot actually enters the
  // visible viewport, so visitors using flight search or reading above a
  // `loading="lazy"` iframe never see a premature slow-load notice.
  useEffect(() => {
    if (!allowed) {
      setLoaded(false);
      setSlow(false);
      setInView(false);
      return;
    }
    if (loaded || inView || !href) return;
    const node = slotRef.current;
    if (!node || typeof window === "undefined" || typeof window.IntersectionObserver !== "function") {
      setInView(true);
      return;
    }
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting || entry.intersectionRatio > 0)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [allowed, loaded, inView, href]);

  useEffect(() => {
    if (!allowed || !inView || loaded || !href) return;
    const timer = window.setTimeout(() => setSlow(true), EVISAS_WIDGET_SLOW_MS);
    return () => window.clearTimeout(timer);
  }, [allowed, inView, loaded, href]);

  if (!href) return null;
  return (
    <section aria-labelledby="home-evisas-check" data-evisa-panel="home-evisas-check" className="home-evisa">
      <header className="home-evisa-intro">
        <h2 id="home-evisas-check" className="home-evisa-title">{copy.headline}</h2>
        <h3 className="home-evisa-hook">{copy.hook}</h3>
        <p className="home-evisa-body">{copy.body}</p>
      </header>
      <div className="home-evisa-layout">
        <div className="home-evisa-widget" data-evisa-widget-src={EVISAS_WIDGET.src}>
          {copy.languageNote && <p className="mb-3 text-sm leading-relaxed text-slate-600">{copy.languageNote}</p>}
          <div
            ref={slotRef}
            className={`home-evisa-widget-slot${allowed ? " home-evisa-widget-slot--live" : ""}${allowed && !loaded ? " home-evisa-widget-slot--loading" : ""}`}
          >
            {allowed ? (
              <>
                {!loaded && <p role="status" className="home-evisa-loading">{slow ? copy.slow : copy.loading}</p>}
                <iframe
                  src={EVISAS_WIDGET.src}
                  width="100%"
                  height={EVISAS_WIDGET.height}
                  style={{ border: 0, overflow: "hidden", maxWidth: "none" }}
                  loading="lazy"
                  title={EVISAS_WIDGET.title}
                  lang="en"
                  data-ural-consent="marketing"
                  className="home-evisa-frame"
                  onLoad={() => {
                    setLoaded(true);
                    setSlow(false);
                  }}
                />
              </>
            ) : (
              <div className="home-evisa-consent">
                <h4 className="text-lg font-bold leading-snug text-brand-navy sm:text-xl">{copy.widgetHeading}</h4>
                <p className="max-w-md text-sm leading-relaxed text-slate-600">{copy.consent}</p>
                <button
                  type="button"
                  onClick={openConsentPreferences}
                  data-evisa-consent-trigger=""
                  className={`inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-500 bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-navy hover:bg-slate-100 active:bg-slate-200 cursor-pointer ${LINK_FOCUS}`}
                >{copy.preferences}</button>
              </div>
            )}
          </div>
        </div>
        <figure data-evisa-banner="square" className="home-evisa-ad">
          <EvisaCreative size="square" lang={lang} placement="evisas_home_banner" />
          <figcaption className="home-evisa-ad-caption">{copy.bannerCaption}</figcaption>
          <div className="home-evisa-ad-cta">
            <EvisaActionLink
              action={{ href, label: copy.direct, sponsored: true, emphasis: "primary" }}
              lang={lang}
              placement="evisas_home_banner_cta"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}


export function EvisaWidgetPanel({ lang = "en" }: { lang?: EvisaLang }) {
  const allowed = useConsent("marketing");
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  const [inView, setInView] = useState(false);
  const slotRef = useRef<HTMLDivElement | null>(null);
  const href = evisasDestinationUrl();
  const copy = EVISAS_HOME_COPY[lang];

  useEffect(() => {
    if (!allowed) {
      setLoaded(false);
      setSlow(false);
      setInView(false);
      return;
    }
    if (loaded || inView || !href) return;
    const node = slotRef.current;
    if (!node || typeof window === "undefined" || typeof window.IntersectionObserver !== "function") {
      setInView(true);
      return;
    }
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting || entry.intersectionRatio > 0)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [allowed, loaded, inView, href]);

  useEffect(() => {
    if (!allowed || !inView || loaded || !href) return;
    const timer = window.setTimeout(() => setSlow(true), EVISAS_WIDGET_SLOW_MS);
    return () => window.clearTimeout(timer);
  }, [allowed, inView, loaded, href]);

  if (!href) return null;

  return (
    <section aria-labelledby="visa-assistance-widget" data-evisa-panel="visa-assistance-widget" className="ural-panel bg-slate-50 border border-border-subtle p-5 sm:p-6 space-y-4">
      <h2 id="visa-assistance-widget" className="ural-section-title font-serif text-lg font-bold text-brand-navy">
        {lang === "bn" ? "ভিসার সুযোগ যাচাই করুন" : "Check your visa options"}
      </h2>
      <div className="home-evisa-widget" data-evisa-widget-src={EVISAS_WIDGET.src}>
        <div
          ref={slotRef}
          className={`home-evisa-widget-slot${allowed ? " home-evisa-widget-slot--live" : ""}${allowed && !loaded ? " home-evisa-widget-slot--loading" : ""}`}
        >
          {allowed ? (
            <>
              {!loaded && <p role="status" className="home-evisa-loading">{slow ? copy.slow : copy.loading}</p>}
              <iframe
                src={EVISAS_WIDGET.src}
                width="100%"
                height={EVISAS_WIDGET.height}
                style={{ border: 0, overflow: "hidden", maxWidth: "none" }}
                loading="lazy"
                title={EVISAS_WIDGET.title}
                lang="en"
                data-ural-consent="marketing"
                className="home-evisa-frame"
                onLoad={() => {
                  setLoaded(true);
                  setSlow(false);
                }}
              />
            </>
          ) : (
            <div className="home-evisa-consent">
              <h4 className="text-lg font-bold leading-snug text-brand-navy sm:text-xl">{copy.widgetHeading}</h4>
              <p className="max-w-md text-sm leading-relaxed text-slate-600">{copy.consent}</p>
              <button
                type="button"
                onClick={openConsentPreferences}
                data-evisa-consent-trigger=""
                className={`inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-500 bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-navy hover:bg-slate-100 active:bg-slate-200 cursor-pointer ${LINK_FOCUS}`}
              >{copy.preferences}</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function EvisaWidgetPrivacyNote({ lang }: { lang: EvisaLang }) {
  const copy = EVISAS_WIDGET_PRIVACY[lang];
  return (
    <section data-evisa-widget-privacy className="space-y-3">
      <h3 className="text-lg font-bold">{copy.heading}</h3>
      <p>{copy.body}</p>
      <p>
        <a
          href="https://evisas.com/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          {copy.link}
          <span className="sr-only">{lang === "bn" ? " (নতুন ট্যাবে খুলবে)" : " (opens in a new tab)"}</span>
        </a>
      </p>
    </section>
  );
}

/** One ad per placement; Bengali uses localized native copy, not English art. */
export function EvisaBanner({ size, campaign, lang = "en", placement, omitCommissionLine = false }: {
  size: EvisaBannerSize;
  campaign?: EvisaCampaignKey;
  lang?: EvisaLang;
  placement: string;
  omitCommissionLine?: boolean;
}) {
  if (!evisasDestinationUrl(campaign)) return null;
  return (
    <figure data-evisa-banner={size} className={`evisa-banner evisa-banner--${size}`}>
      <EvisaCreative size={size} campaign={campaign} lang={lang} placement={placement} />
      <figcaption className="mt-3 space-y-1 text-center text-xs leading-relaxed text-slate-600">
        <p className="font-semibold">{lang === "bn" ? "বিজ্ঞাপন · বেসরকারি পেইড ভিসা সার্ভিস" : "Advertisement · Private, paid visa service"}</p>
        {!omitCommissionLine && (
          <p>{lang === "bn" ? "এই লিংকের মাধ্যমে আবেদন করলে URAL কমিশন পেতে পারে।" : "URAL may earn a commission if you apply through this link."}</p>
        )}
      </figcaption>
    </figure>
  );
}

/** Descriptive sponsored anchors complement the page's internal reading links. */
export function EvisaContextLink({ campaign, lang, placement }: {
  campaign: EvisaCampaignKey;
  lang: EvisaLang;
  placement: string;
}) {
  const copy = getEvisaContext(campaign, lang);
  if (!copy.href) return null;
  return (
    <div data-evisa-context={campaign} className="evisa-context space-y-2 text-sm leading-relaxed text-slate-700">
      <p>
        {copy.before}<a href={copy.href} target="_blank" rel="noopener noreferrer sponsored" data-affiliate-placement={placement} className={`font-semibold text-brand-navy underline underline-offset-4 hover:text-brand-gold-ink active:text-brand-navy ${LINK_FOCUS}`}>{copy.label}<span className="sr-only">{lang === "bn" ? " (নতুন ট্যাবে খুলবে)" : " (opens in a new tab)"}</span></a>{copy.after}
      </p>
      <EvisaActionLink action={copy.official} lang={lang} placement={placement} />
      <p className="text-xs leading-relaxed text-slate-600">{EVISAS_DISCLOSURE[lang]}</p>
    </div>
  );
}

export function EvisaDestinationPlacement({ guideId, lang }: { guideId: string; lang: EvisaLang }) {
  const campaign = EVISAS_DESTINATION_CAMPAIGNS[guideId];
  if (!campaign || !evisasDestinationUrl(campaign)) return null;
  return (
    <div className="space-y-5">
      {campaign === "uae" && (
        <EvisaBanner
          size="square"
          campaign={campaign}
          lang={lang}
          placement={`evisas_destination_${guideId}_banner`}
          omitCommissionLine
        />
      )}
      <EvisaContextLink campaign={campaign} lang={lang} placement={`evisas_destination_${guideId}_text`} />
    </div>
  );
}

export function EvisaBlogContextLink({ slug, lang }: { slug: string; lang: EvisaLang }) {
  const placement = EVISAS_BLOG_PLACEMENTS[slug];
  return placement ? <EvisaContextLink campaign={placement.campaign} lang={lang} placement={`evisas_blog_${slug}_text`} /> : null;
}

export function EvisaBlogBanner({ slug, lang }: { slug: string; lang: EvisaLang }) {
  const placement = EVISAS_BLOG_PLACEMENTS[slug];
  return placement?.banner ? <EvisaBanner size={placement.banner} campaign={placement.campaign} lang={lang} placement={`evisas_blog_${slug}_banner`} /> : null;
}

/** The declared article CTA supplies the same copy to React and saved HTML. */
export function EvisaArticleCta({ cta, lang }: { cta: NonNullable<BlogPost["affiliateCTA"]>; lang: EvisaLang }) {
  if (cta.provider !== "evisas") return null;
  const href = evisasDestinationUrl(cta.campaign);
  if (!href) return null;
  const block: EvisaBlock = {
    badge: lang === "bn" ? "eVisas · পেইড আবেদন সহায়তা" : "eVisas · Paid application assistance",
    headline: sanitizeExpiredPromoText(cta.headline),
    body: sanitizeExpiredPromoText(cta.body),
    actions: [
      { href, label: getAffiliateCtaButtonLabel("evisas", lang), sponsored: true, emphasis: "primary" },
      ...(cta.campaign ? [getEvisaOfficialAction(cta.campaign, lang)] : []),
    ],
    disclosure: EVISAS_DISCLOSURE[lang],
  };
  return <EvisaBlockShell block={block} headingId="article-affiliate-cta" lang={lang} placement={`evisas_article_${cta.campaign ?? "general"}`} banner="square" campaign={cta.campaign} />;
}
