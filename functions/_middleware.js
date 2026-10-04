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
