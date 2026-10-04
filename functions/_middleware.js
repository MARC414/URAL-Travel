const LEGACY_QUERY_ROUTES = {
  "/flights": { parameter: "route", prefix: "/flights" },
  "/hotels": { parameter: "city", prefix: "/hotels" },
  "/visa": { parameter: "country", prefix: "/visa" },
  "/destinations": { parameter: "country", prefix: "/destinations" },
  "/costs": { parameter: "country", prefix: "/costs" },
  "/blog": { parameter: "slug", prefix: "/blog" },
};

// These slugs appeared in older internal links and should converge in one hop.
const LEGACY_BLOG_SLUGS = {
  "bangkok-medical-tourism-checkup-guide-bangladesh-bumrungrad-bangkok-hospital":
    "bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh",
  "bangkok-medical-tourism-guide-bangladesh-bumrungrad-visa-cost":
    "bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh",
  "bangladesh-epassport-application-renewal-guide-64-districts-urgent-fees":
    "bangladesh-epassport-application-renewal-64-districts-fee-guide",
  "bangladesh-epassport-application-renewal-guide-fees-police-verification":
    "bangladesh-epassport-application-renewal-64-districts-fee-guide",
  "best-airlines-from-dhaka-biman-saudia-emirates-qatar-singapore-baggage-guide":
    "top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla",
  "best-travel-esim-and-insurance-from-bangladesh-airalo-schengen-umrah":
    "best-travel-esim-and-schengen-travel-insurance-bangladesh-guide",
  "sri-lanka-budget-tour-from-bangladesh-eta-visa-colombo-kandy-ella":
    "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost",
};

// --- GDPR-jurisdiction consent gate -----------------------------------------
//
// Cloudflare exposes the visitor's country on the request (`request.cf.country`).
// The Emerald/Travelpayouts affiliate script is listed as a MARKETING processor
// in this site's own privacy policy, so visitors in the EEA, the UK and
// Switzerland must not load it before they grant marketing consent.
//
// The HTML is static (and prerendered to ~165 routes), so the region is passed
// to the client as an attribute on <html>; the inline loader in the shell reads
// it and waits for the consent event before injecting the script. The rewrite
// happens per request inside this Function — nothing is cached with the
// attribute baked in.
//
// Fail-open by design: if `request.cf` is unavailable (local dev) or anything
// below throws, the original response is served unchanged, i.e. today's
// behaviour. Only the shipping of this Function can gate traffic; it can never
// break a page.
const GDPR_REGIONS = new Set([
  // EU 27
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  // EEA
  "IS", "LI", "NO",
  // UK + Switzerland (GDPR-equivalent regimes)
  "GB", "CH",
]);

async function tagConsentRegion(context) {
  const response = await context.next();
  const country = context.request.cf && context.request.cf.country;
  if (!country || !GDPR_REGIONS.has(country)) return response;

  const contentType = response.headers.get("content-type") || "";
  // A conditional request is answered by the asset layer with 304 + no body, so
  // this early return is also what preserves HTML revalidation for these
  // visitors: the browser reuses the tagged copy it already has.
  if (response.status !== 200 || !contentType.includes("text/html")) return response;

  const headers = new Headers(response.headers);
  // The body is re-emitted as plain text, so byte-level headers must not be
  // carried over. ETag/Last-Modified are deliberately KEPT.
  headers.delete("content-length");
  headers.delete("content-encoding");

  let html;
  try {
    html = await response.text();
  } catch {
    return response; // unreadable body: serve it untouched
  }

  const tagged = html.replace(/<html([^>]*)>/, '<html$1 data-consent-region="eea">');
  return new Response(tagged, { status: response.status, headers });
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const legacyRoute = LEGACY_QUERY_ROUTES[url.pathname];

  if (legacyRoute) {
    const legacyId = url.searchParams.get(legacyRoute.parameter);
    if (legacyId) {
      const routeId =
        legacyRoute.parameter === "slug"
          ? LEGACY_BLOG_SLUGS[legacyId] || legacyId
          : legacyRoute.parameter === "country" && legacyId === "uae-guide"
            ? "dubai-guide"
            : legacyId;

      url.pathname = `${legacyRoute.prefix}/${encodeURIComponent(routeId)}`;
      url.searchParams.delete(legacyRoute.parameter);
      return Response.redirect(url.toString(), 301);
    }
  }

  return tagConsentRegion(context);
}
