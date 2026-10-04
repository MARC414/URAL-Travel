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

// --- Marketing-consent gate for the affiliate script ------------------------
//
// The Emerald/Travelpayouts affiliate script is listed as a MARKETING processor
// in this site's own privacy policy. It must not load before the visitor grants
// marketing consent, and that rule is now the same for every visitor regardless
// of country: the consent banner is shown to everyone (no region check in
// ConsentBanner.tsx), so a region-limited gate only ever created two behaviours
// to reason about — and it left non-EEA visitors loading a marketing script
// before they had been given the choice.
//
// The gate itself lives in the shell: the loader in index.html calls
// marketingAllowed() and refuses to inject the script until localStorage says
// marketing consent was granted, then listens for `ural:consent-updated`.
//
// This Function therefore no longer touches response bodies. The earlier
// revision stamped `data-consent-region` on <html> from `request.cf.country`,
// which meant reading, re-encoding and re-emitting every HTML response at the
// edge — dropped here because the decision is client-side, and because leaving
// rendered bodies alone keeps ETag/Last-Modified revalidation, compression and
// content-length exactly as the asset layer produced them.
//
// This Function is redirect-only: if it ever throws, the asset layer still
// serves the page.
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

  return context.next();
}
