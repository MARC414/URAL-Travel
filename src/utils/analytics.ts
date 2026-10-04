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

/** Known partner identification from URL */
export function identifyPartnerFromUrl(url: string): string {
  const lower = url.toLowerCase();
  if (lower.includes("aviasales") || lower.includes("search.hotellook.com") || lower.includes("tpembd.com")) {
    return lower.includes("hotellook") ? "Hotellook" : "Aviasales";
  }
  if (lower.includes("klook")) return "Klook";
  if (lower.includes("airhelp")) return "AirHelp";
  if (lower.includes("kiwitaxi")) return "Kiwitaxi";
  if (lower.includes("airalo")) return "Airalo";
  if (lower.includes("kkday")) return "KKday";
  if (lower.includes("tiqets")) return "Tiqets";
  if (lower.includes("radicalstorage") || lower.includes("radical")) return "Radical Storage";
  if (lower.includes("qeeq")) return "QEEQ Car Rental";
  if (lower.includes("yesim")) return "Yesim eSIM";
  if (lower.includes("ekta")) return "Ekta Insurance";
  if (lower.includes("kiwi.com")) return "Kiwi.com";
  if (lower.includes("gettransfer")) return "GetTransfer";
  if (lower.includes("gocity")) return "Go City";
  if (lower.includes("welcomepickups")) return "Welcome Pickups";
  if (lower.includes("tpo.li") || lower.includes("travelpayouts")) return "Travelpayouts Partner";
  return "Affiliate Partner";
}

/** Track explicit affiliate click */
export function trackAffiliateClick({
  partner,
  label,
  url,
  destination,
}: {
  partner?: string;
  label: string;
  url: string;
  destination?: string;
}) {
  const partnerName = partner || identifyPartnerFromUrl(url);
  pushDataLayerEvent("affiliate_partner_click", {
    partner_name: partnerName,
    link_label: label,
    outbound_url: url,
    destination: destination || "unknown",
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

    // 1. WhatsApp link detection
    if (href.includes("wa.me/") || href.includes("api.whatsapp.com") || href.includes("whatsapp://")) {
      pushDataLayerEvent("whatsapp_click", {
        link_text: text || "WhatsApp Button",
        outbound_url: href,
        page_path: window.location.pathname,
      });
      return;
    }

    // 2. Affiliate / Sponsored link detection
    const isAffiliateDomain =
      href.includes(".tpo.li") ||
      href.includes("travelpayouts") ||
      href.includes("aviasales") ||
      href.includes("hotellook") ||
      href.includes("klook") ||
      href.includes("airhelp") ||
      href.includes("kiwitaxi") ||
      href.includes("airalo") ||
      href.includes("kkday") ||
      href.includes("tiqets") ||
      href.includes("radicalstorage") ||
      href.includes("qeeq") ||
      href.includes("yesim") ||
      href.includes("ekta") ||
      href.includes("kiwi.com") ||
      href.includes("gettransfer") ||
      href.includes("gocity") ||
      href.includes("welcomepickups") ||
      href.includes("travelpayouts-wl.html");

    const isSponsored = rel.includes("sponsored");

    if (isAffiliateDomain || isSponsored) {
      const partner = identifyPartnerFromUrl(href);
      pushDataLayerEvent("affiliate_partner_click", {
        partner_name: partner,
        link_text: text || partner,
        outbound_url: href,
        page_path: window.location.pathname,
      });
    }
  };

  document.addEventListener("click", handleClick, { capture: true });
  return () => {
    document.removeEventListener("click", handleClick, { capture: true });
  };
}
