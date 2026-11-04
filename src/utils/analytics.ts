/**
 * URAL Travel Intelligence — Analytics & Event Tracking Engine
 * Dispatches structured events to window.dataLayer for Google Tag Manager (GTM-TMPVL82B)
 * and Google Analytics 4 (GA4).
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Push a clean event to GTM dataLayer */
export function pushDataLayerEvent(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...data,
    timestamp: new Date().toISOString(),
  });
}

/** Track virtual pageview for SPA route transitions */
export function trackPageView(pagePath: string, pageTitle: string, canonicalUrl: string) {
  pushDataLayerEvent("virtual_page_view", {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: canonicalUrl,
  });

  // Keep compatibility if gtag is shimmed in GTM or loaded elsewhere
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    try {
      window.gtag("event", "page_view", {
        page_path: pagePath,
        page_title: pageTitle,
        page_location: canonicalUrl,
      });
    } catch {
      // Gracefully ignore if gtag is not in direct mode
    }
  }
}

/**
 * Is this a Travelpayouts CREATOR-REFERRAL link rather than a booking tool?
 *
 * WHY THIS EXISTS
 * ---------------
 * `https://www.travelpayouts.com/?marker=675992` is the referral program link: it
 * invites another publisher to sign up to the network. It is NOT a flight, hotel
 * or activity booking link, so counting it as an `affiliate_partner_click` mixes
 * "a reader booked a trip" with "another blogger joined the platform" in the same
 * GA4 metric (and in the `partner_name` dimension).
 *
 * The discriminator is the HOST, not the marker: booking tools live on
 * `*.tpo.li`, `tp.media`, `tpemd.com` and the brands' own domains, while every
 * referral surface is on `travelpayouts.com` itself (docs, brands directory,
 * program landing pages) plus `?marker=` for attribution.
 */
export function isTravelpayoutsReferralUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url, "https://uraltravel.co.uk");
    const host = parsed.hostname.toLowerCase();
    const isPlatformHost = host === "travelpayouts.com" || host.endsWith(".travelpayouts.com");
    return isPlatformHost && parsed.searchParams.has("marker");
  } catch {
    return false;
  }
}

/** `sub_id` on an outbound URL, so referral signups can be traced to a placement. */
export function readReferralSubId(url: string): string {
  try {
    return new URL(url, "https://uraltravel.co.uk").searchParams.get("sub_id") || "";
  } catch {
    return "";
  }
}

const PARTNER_DOMAINS: Array<[string, string]> = [
  ["aviasales", "Aviasales"],
  ["tpembd.com", "Aviasales"],
  ["klook", "Klook"],
  ["airhelp", "AirHelp"],
  ["kiwitaxi", "Kiwitaxi"],
  ["airalo", "Airalo"],
  ["kkday", "KKday"],
  ["tiqets", "Tiqets"],
  ["radical", "Radical Storage"],
  ["qeeq", "QEEQ Car Rental"],
  ["yesim", "Yesim eSIM"],
  ["kiwi.com", "Kiwi.com"],
  ["gettransfer", "GetTransfer"],
  ["gocity", "Go City"],
  ["welcomepickups", "Welcome Pickups"],
  ["tpo.li", "Travelpayouts Partner"],
  ["tp.media", "Travelpayouts Partner"],
  ["travelpayouts", "Travelpayouts Partner"],
];

/** Known partner identification from URL */
export function identifyPartnerFromUrl(url: string): string {
  const lower = url.toLowerCase();
  if (isTravelpayoutsReferralUrl(url)) return "Travelpayouts (creator referral)";
  for (const [token, name] of PARTNER_DOMAINS) {
    if (lower.includes(token)) return name;
  }
  return "Affiliate Partner";
}

/** Track explicit affiliate click */
export function trackAffiliateClick({
  partner,
  label,
  url,
  destination,
  placement,
}: {
  partner?: string;
  label: string;
  url: string;
  destination?: string;
  /** First-party placement scope; not a Travelpayouts SubID. */
  placement?: string;
}) {
  const partnerName = partner || identifyPartnerFromUrl(url);
  pushDataLayerEvent("affiliate_partner_click", {
    partner_name: partnerName,
    link_label: label,
    outbound_url: url,
    destination: destination || "unknown",
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    ...(placement ? { affiliate_placement: placement } : {}),
  });
}

/** Track WhatsApp inquiry */
export function trackWhatsAppInquiry(details: {
  origin?: string;
  destination?: string;
  date?: string;
  passengers?: string;
  cabinClass?: string;
  inquiryType?: string;
}) {
  pushDataLayerEvent("whatsapp_inquiry", {
    inquiry_type: details.inquiryType || "flight_fare_quote",
    route: details.origin && details.destination ? `${details.origin}-${details.destination}` : undefined,
    origin: details.origin,
    destination: details.destination,
    departure_date: details.date || "flexible",
    passengers: details.passengers,
    cabin_class: details.cabinClass,
  });
}

/**
 * Global delegated click listener for all outbound sponsored/affiliate and WhatsApp links.
 * Automatically catches any clicks without needing manual markup changes across 70+ components.
 */
export function initGlobalClickTracking(): () => void {
  if (typeof window === "undefined") return () => {};

  const handleClick = (e: MouseEvent) => {
    const target = (e.target as HTMLElement)?.closest("a");
    if (!target) return;

    const href = target.getAttribute("href") || "";
    const rel = target.getAttribute("rel") || "";
    const text = (target.textContent || "").trim().slice(0, 100);
    // Stable first-party link placement. This scopes our click event only; it is
    // not appended to the partner URL and does not establish partner-side attribution.
    const affiliatePlacement = target.dataset?.affiliatePlacement || "";

    // 1. WhatsApp link detection
    if (href.includes("wa.me/") || href.includes("api.whatsapp.com") || href.includes("whatsapp://")) {
      pushDataLayerEvent("whatsapp_click", {
        link_label: text || "WhatsApp Button",
        outbound_url: href,
        page_path: window.location.pathname,
      });
      return;
    }

    // Ignore in-page anchor jumps and same-origin routes (except the flight white-label portal).
    if (!href || href.startsWith("#")) return;
    let host = "";
    let pathname = "";
    try {
      const parsed = new URL(href, "https://uraltravel.co.uk");
      host = parsed.hostname.toLowerCase();
      pathname = parsed.pathname;
    } catch {
      return;
    }
    if (host === "uraltravel.co.uk" && pathname !== "/travelpayouts-wl.html") return;

    // 2. Affiliate / Sponsored link detection
    const isAffiliateDomain =
      pathname === "/travelpayouts-wl.html" ||
      PARTNER_DOMAINS.some(([token]) => host.includes(token));

    // 3. Travelpayouts CREATOR REFERRAL - checked BEFORE the affiliate branch,
    //    because these links are also `rel="sponsored"` and also contain the
    //    substring "travelpayouts". Counting them as affiliate clicks would
    //    report "another publisher signed up" as "a reader booked a flight".
    //    `referral_sub_id` identifies the placement (creator_hub, post_social_income...).
    if (isTravelpayoutsReferralUrl(href)) {
      pushDataLayerEvent("travelpayouts_referral_click", {
        partner_name: "Travelpayouts (creator referral)",
        link_label: text || "Travelpayouts referral",
        outbound_url: href,
        referral_sub_id: readReferralSubId(href) || "untagged",
        page_path: window.location.pathname,
      });
      return;
    }

    const isSponsored = rel.includes("sponsored");

    if (isAffiliateDomain || isSponsored) {
      const partner = identifyPartnerFromUrl(href);
      // ONE label key for every outbound click event: `link_label`.
      // `link_text` / `partner_label` used to be pushed for this same event from
      // two other places, so a single click produced two events with different
      // key names and at most one populated value. See verify-build's
      // "one label key" guard.
      pushDataLayerEvent("affiliate_partner_click", {
        partner_name: partner,
        link_label: text || partner,
        outbound_url: href,
        page_path: window.location.pathname,
        ...(affiliatePlacement ? { affiliate_placement: affiliatePlacement } : {}),
      });
    }
  };

  document.addEventListener("click", handleClick, { capture: true });
  return () => {
    document.removeEventListener("click", handleClick, { capture: true });
  };
}
