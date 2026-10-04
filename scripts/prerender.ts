import fs from "node:fs";
import path from "node:path";
import {
  FLIGHTS_DATA,
  HOTELS_DATA,
  VISA_DATA,
  DESTINATIONS_DATA,
  TRIP_COSTS_DATA,
  BLOG_DATA,
} from "../src/constants";
// English blog bodies were split out of constants.ts for Core Web Vitals (so
// they do not ship in the eager client `content-data` chunk). Prerender runs in
// Node at build time, so importing them eagerly here carries no client cost and
// keeps every /blog/:slug route's crawlable HTML body intact.
import { BLOG_CONTENT } from "../src/data/blogContent";
import {
  BASE_URL,
  breadcrumbSchema,
  webPageSchema,
  articleSchema,
  touristTripSchema,
  serviceSchema,
  productOfferSchema,
  collectionPageSchema,
  buildSchemaGraph,
  toIsoDate,
} from "../src/utils/schema";
import { getSeoCopy, stripBrandSuffix } from "../src/utils/seoCopy";
import { buildResponsiveSrcSet } from "../src/utils/imageAssets";
import { getRelatedBlogPosts } from "../src/utils/blogLinks";
import {
  CONTENT_UPDATED,
  CONTENT_UPDATED_MAX_AGE_DAYS,
} from "../src/data/contentMeta";
import {
  RADICAL_STORAGE_BLOG_PLACEMENTS,
  MULTI_PARTNER_BLOG_PLACEMENTS,
  resolvePartnerUrl,
  sanitizeExpiredPromoText,
  AFFILIATE_LINKS,
} from "../src/components/AffiliatePartners";
import {
  HAJJ_UMRAH_FAQS,
  generateFAQSchema,
  getFaqSchemaForPage,
  getPreDepartureFaqSchema,
} from "../src/hooks/useSeoMeta";
import {
  BENGALI_BLOG_OVERRIDES,
  getBengaliRouteSeo,
  getLocalizedBlogs,
  getLocalizedCosts,
  getLocalizedFlights,
  getLocalizedHajjFaqs,
  getLocalizedHotels,
  getLocalizedVisas,
} from "../src/data/bengaliContent";
import {
  BN_BREADCRUMB_LABELS,
  hasBengaliCounterpart,
  localizePublicSiteUrl,
  siteUrl,
  toBengaliPath,
  toEnglishBasePath,
} from "../src/utils/localeRoutes";
import { BENGALI_SEO_COPY, getBengaliSeoCopy } from "../src/utils/seoCopy";

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const OPTIMIZED_SOCIAL_IMAGES_DIR = path.join(ROOT_DIR, "src", "assets", "optimized-social");

const BLOG_IMAGE_MAP: Record<string, string> = {
  "umrah-hajj-guide-bangladesh-nusuk-bdt-cost": "umrah_makkah_haram_guide_1790430007679.jpg",
  "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh": "haramain_bullet_train_1790484312808.jpg",
  "hajj-registration-bangladesh-government-vs-private-package-cost": "mina_hajj_tents_1790484325661.jpg",
  "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide": "madinah_courtyard_umbrellas_1790484340720.jpg",
  "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah": "saudi_stopover_aircraft_1790484351784.jpg",
  "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit": "madinah_green_dome_1790484369923.jpg",
  "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates": "masjid_nabawi_arches_1790484388265.jpg",
  "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia": "jeddah_airport_terminal_1790484400414.jpg",
  "ramadan-umrah-itikaf-guide-bangladesh-booking-budget": "ramadan_makkah_night_1790484415220.jpg",
  "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules": "ihram_preparation_set_1790484426740.jpg",
  "official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport": "zamzam_ajwa_dates_1790484440926.jpg",
  "bangladeshi-halal-food-guide-makkah-madinah-budget-meals": "makkah_halal_cuisine_1790484456326.jpg",
  "makkah-madinah-badr-taif-historical-ziyarah-taxi-guide": "quba_mosque_taif_ziyarah_1790485732985.jpg",
  "umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide": "dubai_skyline_burj_twilight_1790485747967.jpg",
  "abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide": "sheikh_zayed_grand_mosque_1790485758750.jpg",
  "malaysia-islamic-heritage-putrajaya-halal-family-tour-guide": "putrajaya_pink_mosque_malaysia_1790485770212.jpg",
  "europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide": "paris_louvre_london_landmarks_1790485782111.jpg",
  "shariah-compliant-islamic-dual-currency-cards-bangladesh-umrah": "islamic_banking_card_makkah_1790486749439.jpg",
  "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix": "rfcd_foreign_currency_banking_1790486762760.jpg",
  "book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card": "bdt_travel_concierge_voucher_1790486777146.jpg",
  "cash-sar-usd-vs-dual-currency-card-dcc-fee-money-exchange-guide": "pos_card_terminal_currency_1790486792551.jpg",
  "thailand-evisa-bangladesh-thaievisa-document-bank-balance-guide": "bangkok_wat_arun_chao_phraya_1790486821534.jpg",
  "malaysia-evisa-mdac-arrival-card-guide-bangladesh-klia-immigration": "kuala_lumpur_petronas_twilight_1790486835902.jpg",
  "fresh-bangladeshi-passport-travel-history-ladder-nepal-maldives-malaysia": "passport_stamps_boarding_window_1790486849797.jpg",
  "singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide": "singapore_mrt_gardens_bay_1790520762227.jpg",
  "bumrungrad-bangkok-hospital-medical-checkup-visa-guide-bangladesh": "bangkok_medical_hospital_lobby_1790520775439.jpg",
  "best-travel-esim-and-schengen-travel-insurance-bangladesh-guide": "travel_esim_smartphone_insurance_1790520786938.jpg",
  "sri-lanka-maldives-combo-tour-from-bangladesh-eta-bdt-cost": "sri_lanka_nine_arch_train_1790520800518.jpg",
  "bangladesh-epassport-application-renewal-64-districts-fee-guide": "bangladesh_epassport_biometric_desk_1790520813052.jpg",
  "flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp": "airport_departure_board_delay_claim_1790520824658.jpg",
  "top-airlines-from-dhaka-baggage-rules-biman-saudia-emirates-qatar-us-bangla": "dhaka_airport_widebody_airlines_tarmac_1790520836931.jpg",
  "dual-currency-card-endorsement-bangladesh": "passport_card_travel_desk_1790430035290.jpg",
  "dhaka-airport-outbound-immigration-checklist-noc-go": "ural_hero_bg_1781543111624.jpg",
  "nepal-pokhara-itinerary-bangladesh": "nepal_destination_1781544132297.jpg",
  "nepal-vs-thailand-first-trip": "coxs_bazar_sunrise_1781620718331.jpg",
  "halal-food-guide-bangkok-bangladesh": "bangkok_destination_1781544149435.jpg",
  "top-budget-family-destinations-from-dhaka": "kl_destination_1781544164707.jpg",
  "hotel-savings-guide-bangkok-kl-dubai": "dubai_destination_1781544180311.jpg",
  "singapore-visa-guide-bangladesh-agents": "singapore_destination_1790387270177.jpg",
  "maldives-budget-trip-bangladesh-maafushi": "maldives_destination_1790387286896.jpg",
  "cheap-flight-booking-hacks-dhaka": "blog_editorial_hero_banner_1790429994056.jpg",
  "bangladesh-travelers-iata-airport-codes-directory-guide": "dhaka_airport_widebody_airlines_tarmac_1790520836931.jpg",
  "chattogram-to-dubai-middle-east-direct-flights-cgp-dxb-biman-flydubai": "dubai_skyline_burj_twilight_1790485747967.jpg",
};

function escapeHtml(str: string): string {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeXml(str: string): string {
  return escapeHtml(str);
}

const INTERNAL_ROUTE_ALIASES: Record<string, string> = {
  "/indexing": "/sitemap",
  "/pre-departure": "/sitemap",
};

function normalizeInternalHref(rawPath: string): string {
  const pathname = String(rawPath || "/").split(/[?#]/, 1)[0] || "/";
  return INTERNAL_ROUTE_ALIASES[pathname] || pathname;
}

interface InternalLinkItem {
  href: string;
  text: string;
}

type BlogEntry = (typeof BLOG_DATA)[number];

const CATEGORY_HUB_LINKS: InternalLinkItem[] = [
  { href: "/flights", text: "Compare international flights from Dhaka" },
  { href: "/hotels", text: "Compare hotel areas and stays by destination" },
  { href: "/visa", text: "Check visa requirements for Bangladeshi travelers" },
  { href: "/destinations", text: "Explore destination itineraries from Bangladesh" },
  { href: "/costs", text: "Plan an international trip budget in BDT" },
];

const STANDALONE_PAGE_LINKS: Record<string, InternalLinkItem[]> = {
  "/umrah": [
    {
      href: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost",
      text: "Umrah & Hajj preparation, Nusuk and BDT cost guide",
    },
    {
      href: "/blog/nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit",
      text: "Nusuk app, Saudi Visa Bio and Rawdah permit guide",
    },
    {
      href: "/blog/makkah-madinah-hotel-zones-haramain-train-guide-bangladesh",
      text: "Makkah and Madinah hotel zones and Haramain train guide",
    },
    {
      href: "/blog/hajj-registration-bangladesh-government-vs-private-package-cost",
      text: "Official Bangladesh Hajj registration and package comparison",
    },
    {
      href: "/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah",
      text: "Saudi stopover visa and Umrah routing guide",
    },
  ],
  "/experiences": [
    { href: "/blog/europe-uk-usa-sightseeing-skip-the-line-passes-bangladesh-guide", text: "Europe, UK and USA attraction passes for Bangladeshi travelers" },
    { href: "/blog/abu-dhabi-sheikh-zayed-mosque-day-trip-from-dubai-guide", text: "Abu Dhabi day trip from Dubai: mosque and attraction guide" },
    { href: "/blog/umrah-dubai-10-day-combo-trip-dhaka-multi-city-guide", text: "Umrah and Dubai multi-city itinerary from Dhaka" },
    { href: "/blog/singapore-4-day-budget-itinerary-mrt-simplygo-mustafa-halal-guide", text: "Singapore family itinerary with Sentosa and halal food" },
    { href: "/destinations/dubai-guide", text: "Plan a Dubai itinerary from Bangladesh" },
    { href: "/destinations/singapore-guide", text: "Explore the Singapore destination guide" },
  ],
  "/tools": [
    { href: "/blog/flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp", text: "Flight delay, cancellation and baggage claim guide" },
    { href: "/blog/best-travel-esim-and-schengen-travel-insurance-bangladesh-guide", text: "Travel eSIM and insurance guide for Bangladeshi travelers" },
    { href: "/blog/dual-currency-card-endorsement-bangladesh", text: "Dual-currency card endorsement and travel quota guide" },
    { href: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go", text: "Dhaka Airport outbound immigration checklist" },
  ],
  "/contact": [
    { href: "/blog/book-flights-makkah-hotels-in-bdt-bkash-bank-transfer-no-card", text: "How to book travel in BDT by bKash or bank transfer" },
    { href: "/blog/dual-currency-card-endorsement-bangladesh", text: "Passport dollar endorsement and dual-currency card guide" },
    { href: "/blog/dhaka-airport-outbound-immigration-checklist-noc-go", text: "Dhaka Airport documents and outbound checklist" },
    { href: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost", text: "Umrah planning and BDT cost guide" },
  ],
};

const COUNTRY_TOPIC_ALIASES: Record<string, string[]> = {
  Nepal: ["nepal", "kathmandu", "pokhara"],
  Thailand: ["thailand", "bangkok", "pattaya"],
  Malaysia: ["malaysia", "kuala lumpur", "putrajaya", "klia"],
  UAE: ["uae", "dubai", "abu dhabi"],
  Singapore: ["singapore", "sentosa", "little india"],
  Maldives: ["maldives", "male", "maafushi", "hulhumale"],
};

function findCountryForRoute(routePath: string): string | undefined {
  const [section, id] = routePath.split("/").filter(Boolean);
  if (!id) return undefined;
  if (section === "flights") return FLIGHTS_DATA.find((item) => item.id === id)?.country;
  if (section === "hotels") return HOTELS_DATA.find((item) => item.id === id)?.country;
  if (section === "visa") return VISA_DATA.find((item) => item.id === id)?.country;
  if (section === "destinations") return DESTINATIONS_DATA.find((item) => item.id === id)?.country;
  if (section === "costs") return TRIP_COSTS_DATA.find((item) => item.id === id)?.country;
  return undefined;
}

function getTripCrossLinks(country: string, currentPath: string): InternalLinkItem[] {
  const links: InternalLinkItem[] = [];
  const flight = FLIGHTS_DATA.find((item) => item.country === country);
  const hotel = HOTELS_DATA.find((item) => item.country === country);
  const visa = VISA_DATA.find((item) => item.country === country);
  const destination = DESTINATIONS_DATA.find((item) => item.country === country);
  const cost = TRIP_COSTS_DATA.find((item) => item.country === country);

  if (flight) {
    links.push({ href: `/flights/${flight.id}`, text: `Flights from Dhaka to ${flight.to.split(" (")[0]}` });
  }
  if (hotel) {
    links.push({ href: `/hotels/${hotel.id}`, text: `Hotel neighborhoods in ${hotel.city}` });
  }
  if (visa) {
    links.push({ href: `/visa/${visa.id}`, text: `${country} visa requirements for Bangladeshi citizens` });
  }
  if (destination) {
    links.push({ href: `/destinations/${destination.id}`, text: `${country} itinerary from Bangladesh` });
  }
  if (cost) {
    links.push({ href: `/costs/${cost.id}`, text: `${country} trip cost breakdown in BDT` });
  }

  return links.filter((link) => link.href !== currentPath);
}

function getRelatedBlogsForRoute(country: string, routePath: string, limit = 3): BlogEntry[] {
  const aliases = COUNTRY_TOPIC_ALIASES[country] || [country.toLowerCase()];
  return BLOG_DATA.map((post, index) => {
    const explicitlyLinksHere = (post.internalLinks || []).some(
      (link) => normalizeInternalHref(link.path) === routePath
    );
    const text = ` ${post.slug} ${post.title} `
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ");
    const topicMatches = aliases.filter((alias) => {
      const normalizedAlias = alias.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      return text.includes(` ${normalizedAlias} `);
    }).length;
    return { post, index, score: (explicitlyLinksHere ? 20 : 0) + topicMatches * 3 };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map((item) => item.post);
}

function renderLinkSection(id: string, heading: string, links: InternalLinkItem[]): string {
  if (links.length === 0) return "";
  return `<section aria-labelledby="${id}"><h2 id="${id}">${escapeHtml(heading)}</h2><ul>${links
    .map((link) => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.text)}</a></li>`)
    .join("\n")}</ul></section>`;
}

function addInternalLinkSections(
  routes: PrerenderRoute[],
  bnRouteByCanonicalUrl?: Map<string, PrerenderRoute>
): void {
  const categoryHubPaths = new Set(CATEGORY_HUB_LINKS.map((link) => link.href));

  for (const route of routes) {
    let extraLinks = "";
    if (categoryHubPaths.has(route.routePath)) {
      const siblingHubs = CATEGORY_HUB_LINKS.filter((link) => link.href !== route.routePath);
      extraLinks = renderLinkSection(
        "related-planning-hubs",
        "Continue planning your trip",
        siblingHubs
      );
    } else {
      const country = findCountryForRoute(route.routePath);
      if (country) {
        const tripLinks = getTripCrossLinks(country, route.routePath);
        const blogLinks = getRelatedBlogsForRoute(country, route.routePath).map((post) => ({
          href: `/blog/${post.slug}`,
          text: post.title,
        }));
        extraLinks = `${renderLinkSection("complete-trip-links", `Complete your ${country} trip`, tripLinks)}${renderLinkSection("related-destination-guides", `Related ${country} travel guides`, blogLinks)}`;
      } else if (route.routePath === "/sitemap") {
        const directoryLinks = routes
          .filter((entry) => entry.routePath !== "/sitemap")
          .map((entry) => ({ href: entry.routePath, text: entry.title }));
        extraLinks = renderLinkSection(
          "complete-page-directory",
          "Complete travel page directory",
          directoryLinks
        );
      } else if (STANDALONE_PAGE_LINKS[route.routePath]) {
        extraLinks = renderLinkSection(
          "related-standalone-guides",
          route.routePath === "/umrah"
            ? "Related Umrah and Hajj guides"
            : route.routePath === "/experiences"
              ? "Related attraction and destination guides"
              : route.routePath === "/tools"
                ? "Guides for using travel tools"
                : "Helpful guides before you contact URAL",
          STANDALONE_PAGE_LINKS[route.routePath]
        );
      }
    }

    if (extraLinks) {
      route.bodyHtml = route.bodyHtml.replace("</article>", `${extraLinks}</article>`);
    }

    if (
      route.routePath !== "/" &&
      route.routePath !== "/sitemap" &&
      !categoryHubPaths.has(route.routePath)
    ) {
      const parentHubPath = CATEGORY_HUB_LINKS.map((link) => link.href).find((hubPath) =>
        route.routePath.startsWith(`${hubPath}/`)
      );
      const sitewideHubLinks = CATEGORY_HUB_LINKS.filter(
        (link) => link.href !== parentHubPath && link.href !== route.routePath
      );
      const sitewideHubSection = renderLinkSection(
        "planning-hub-links",
        "More trip-planning hubs",
        sitewideHubLinks
      );
      route.bodyHtml = route.bodyHtml.replace("</article>", `${sitewideHubSection}</article>`);
    }

    if (route.bnUrl && bnRouteByCanonicalUrl) {
      const bnTwin = bnRouteByCanonicalUrl.get(route.bnUrl);
      const bnTitle = bnTwin?.title ? stripBrandSuffix(bnTwin.title) : "বাংলা সংস্করণ";
      const bnHref = toBengaliPath(route.routePath);
      const langLinks: InternalLinkItem[] =
        route.routePath === "/"
          ? [{ href: "/bn", text: "বাংলা ট্রাভেল ইন্টেলিজেন্স (বাংলা সংস্করণ)" }]
          : [
              { href: bnHref, text: bnTitle },
              { href: "/bn", text: "বাংলা ট্রাভেল ইন্টেলিজেন্স হোমপেইজ" },
            ];
      const langSection = renderLinkSection(
        "read-in-bengali",
        "বাংলায় পড়ুন — Read this page in Bengali",
        langLinks
      );
      if (route.bodyHtml.includes("</article>")) {
        route.bodyHtml = route.bodyHtml.replace("</article>", `${langSection}</article>`);
      } else {
        route.bodyHtml += langSection;
      }
    }
  }
}

interface PrerenderRoute {
  routePath: string; // e.g. "/" or "/blog/slug" — "/bn/blog/slug" for Bengali
  canonicalUrl: string;
  /** "en" (default) or "bn" — drives inLanguage, <html lang> and og:locale. */
  locale?: "en" | "bn";
  /** English counterpart URL (own canonicalUrl for English routes). */
  enUrl?: string;
  /** Bengali counterpart URL — present only when the twin page was generated. */
  bnUrl?: string;
  title: string;
  description: string;
  imageUrl: string;
  lcpImageUrl?: string;
  lcpImageSizes?: string;
  breadcrumbs: { name: string; url: string }[];
  extraGraphNodes: Record<string, unknown>[];
  bodyHtml: string;
  // ISO date (YYYY-MM-DD) for the sitemap <lastmod>. Blog posts carry their own
  // exact publish date; content-driven hub/route pages use CONTENT_DATA_LASTMOD
  // below, which is a committed date — so lastmod only moves when a human says
  // the content changed, never on a rebuild of unchanged pages, and it is
  // identical in local and CI builds.
  lastmod?: string;
}

// Fallback <lastmod> for data-driven pages. Deliberately a committed constant
// rather than a git lookup or the build date — see the long explanation in
// src/data/contentMeta.ts. Summary: Cloudflare Pages builds from a shallow
// checkout, so a git-derived value is unavailable there and the old "fall back
// to today" behaviour stamped the deploy date onto 77 unchanged URLs, while also
// making the local and CI sitemaps disagree.
const CONTENT_DATA_LASTMOD = CONTENT_UPDATED;

/**
 * Nudge, never fail: a stale lastmod under-signals to crawlers, so surface it in
 * the build log where a maintainer will actually see it. Kept non-fatal so a
 * forgotten bump can never block a deploy.
 */
function warnIfContentDateStale() {
  const updated = new Date(`${CONTENT_UPDATED}T00:00:00Z`).getTime();
  if (Number.isNaN(updated)) {
    console.warn(
      `[SEO Prerender] WARNING: CONTENT_UPDATED is not a parseable YYYY-MM-DD date ("${CONTENT_UPDATED}").`
    );
    return;
  }
  const ageDays = Math.floor((Date.now() - updated) / 86_400_000);
  if (ageDays > CONTENT_UPDATED_MAX_AGE_DAYS) {
    console.warn(
      `[SEO Prerender] WARNING: sitemap <lastmod> is ${ageDays} days old ` +
        `(CONTENT_UPDATED=${CONTENT_UPDATED}). If site content changed since then, ` +
        `bump CONTENT_UPDATED in src/data/contentMeta.ts.`
    );
  }
}

function getSocialImageSource(fileName: string): string {
  return path.join(OPTIMIZED_SOCIAL_IMAGES_DIR, fileName);
}

function copyStaticSeoImages() {
  const ogSrc = getSocialImageSource("ural_hero_bg_1781543111624.jpg");
  const targetDirs = [PUBLIC_DIR];
  if (fs.existsSync(DIST_DIR)) {
    targetDirs.push(DIST_DIR);
  }

  for (const baseDir of targetDirs) {
    fs.mkdirSync(path.join(baseDir, "img", "blog"), { recursive: true });
    if (fs.existsSync(ogSrc)) {
      fs.copyFileSync(ogSrc, path.join(baseDir, "og-image.jpg"));
    }
    for (const post of BLOG_DATA) {
      const fileName =
        BLOG_IMAGE_MAP[post.slug] || "ural_hero_bg_1781543111624.jpg";
      const srcFile = getSocialImageSource(fileName);
      if (fs.existsSync(srcFile)) {
        fs.copyFileSync(
          srcFile,
          path.join(baseDir, "img", "blog", `${post.slug}.jpg`)
        );
      }
    }
  }
}

function stripContext(obj: unknown): Record<string, unknown> {
  if (!obj || typeof obj !== "object") return {};
  const { "@context": _ctx, ...rest } = obj as Record<string, unknown>;
  return rest;
}

function renderLandingFaqs(
  id: string,
  heading: string,
  faqSchema: ReturnType<typeof getFaqSchemaForPage>
): string {
  const questions = faqSchema?.mainEntity || [];
  if (!questions.length) return "";
  return `<section aria-labelledby="${id}"><h2 id="${id}">${escapeHtml(heading)}</h2>${questions
    .map(
      (question) =>
        `<section><h3>${escapeHtml(question.name)}</h3><p>${escapeHtml(question.acceptedAnswer.text)}</p></section>`
    )
    .join("\n")}</section>`;
}

const VISA_OFFICIAL_SOURCES: Record<string, { label: string; url: string }[]> = {
  "nepal-visa": [
    { label: "Nepal Department of Immigration: visa information", url: "https://immigration.gov.np/visa-information" },
    { label: "Nepal official online immigration portal", url: "https://nepaliport.immigration.gov.np/" },
  ],
  "thailand-visa": [
    { label: "Thailand official e-Visa portal", url: "https://www.thaievisa.go.th/" },
    { label: "Royal Thai Embassy in Dhaka: visa information", url: "https://dhaka.thaiembassy.org/en/page/59898-visa-information?menu=5d83296215e39c2540006a10" },
  ],
  "malaysia-visa": [
    { label: "Malaysia official MYVISA portal", url: "https://malaysiavisa.imi.gov.my/" },
    { label: "Malaysia Immigration Department: eVISA information", url: "https://www.imi.gov.my/index.php/en/main-services/visa/evisa-en/" },
  ],
  "dubai-visa": [
    { label: "UAE Government: tourist visa information and application channels", url: "https://u.ae/en/information-and-services/visa-and-emirates-id/Types-of-visas/tourist-visa" },
  ],
  "singapore-visa": [
    { label: "Singapore ICA: visa requirements for Bangladesh passport holders", url: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements/visa-detail-page/bangladesh" },
    { label: "Singapore ICA: SG Arrival Card e-service", url: "https://eservices.ica.gov.sg/sgarrivalcard/" },
  ],
  "maldives-visa": [
    { label: "Maldives Immigration: tourist visa on arrival and entry requirements", url: "https://www.immigration.gov.mv/visa/tourist-visa" },
    { label: "Maldives Immigration: Traveller Declaration instructions", url: "https://www.immigration.gov.mv/traveller-declaration" },
    { label: "Official IMUGA Traveller Declaration portal", url: "https://imuga.immigration.gov.mv/traveller" },
  ],
};

function renderVisaOfficialSources(routeId: string): string {
  const sources = VISA_OFFICIAL_SOURCES[routeId] || [];
  if (!sources.length) return "";
  return `<section aria-labelledby="official-visa-sources"><h2 id="official-visa-sources">Official sources to verify current requirements</h2><p>Visa categories, document lists, fees and processing estimates can change. Check the destination authority's latest instructions before applying or booking.</p><ul>${sources
    .map((source) => `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a></li>`)
    .join("")}</ul></section>`;
}

function renderVisaRouteContext(routeId: string): string {
  const contextByRoute: Record<string, string> = {
    "nepal-visa": `<p>Nepal's Department of Immigration describes tourist visa on arrival and provides an online immigration portal. The department's current instructions explain the arrival-card and online-form or kiosk process, and set out the applicable tourist-visa categories and gratis eligibility. Check those official instructions close to travel: a saved fee table or old application receipt may no longer reflect the current visa year, charge or stay period. A tourist visa is for tourism; if your purpose is different, confirm the correct category before travel.</p>`,
    "thailand-visa": `<p>Use the official Thailand e-Visa portal together with the Royal Thai Embassy in Dhaka's current Bangladesh-facing visa information. The portal and local mission guidance are the places to confirm the category, submission method, documents, fees and any appointment or payment instructions that apply to your application. The supporting papers can depend on purpose, occupation, sponsorship and family circumstances; a checklist is a preparation aid, not an assurance of approval.</p>`,
    "malaysia-visa": `<p>Keep the Malaysia eVisa and arrival declaration as separate tasks. The official MYVISA portal is the source for the eVisa application and its current document, payment and approval instructions. Malaysia's official portal also publishes separate Malaysia Digital Arrival Card guidance, including its current submission window and passport conditions; it currently says to register the MDAC within three days before arrival. Recheck both details close to departure; an approved eVisa does not automatically complete a separate arrival-card requirement. Retain the approved visa notice and check that its details match your passport and itinerary.</p>`,
    "dubai-visa": `<p>The UAE Government describes several tourist-visa application channels, including the federal ICP and Dubai's GDRFA as well as airlines, hotels and licensed travel agents. Confirm which authority or sponsor handles the application and which emirate's process applies to the visa being issued. Before paying a provider, check its authorization, itemized charges, document-handling process and method for tracking the application. The BDT range and processing period in this guide are planning estimates, not an official offer or approval guarantee.</p>`,
    "singapore-visa": `<p>Singapore ICA publishes a country-specific entry-visa page for Bangladesh passport holders and the official supporting-document and application information. Check the latest ICA instructions and the applicable Dhaka submission channel rather than relying only on an agent checklist. The SG Arrival Card is a separate arrival declaration, not a visa; ICA publishes its own submission window and free e-service. Keep the visa decision and arrival declaration requirements distinct in your trip checklist.</p>`,
    "maldives-visa": `<p>Maldives Immigration states that tourists do not need pre-approval for a tourist visa, but they must meet the entry requirements for clearance on arrival. Its current page specifies an MRZ passport or travel document with at least one month's validity, a confirmed return journey, prepaid booking at a registered facility, and sufficient funds or approved sponsorship. It also requires each traveler to submit the free IMUGA Traveller Declaration within 96 hours before arrival. Meeting the listed requirements does not guarantee entry; immigration officers determine admissibility at the port of entry.</p>`,
  };
  return contextByRoute[routeId] || "";
}

function renderVisaApplicationGuidance(): string {
  return `<section aria-labelledby="visa-application-guidance"><h2 id="visa-application-guidance">A careful application workflow for Bangladeshi travelers</h2>
    <p>Start by checking that the visa category matches the real reason for travel and the planned length of stay. Use the official authority's current instructions to confirm where an application must be submitted, whether an online form or appointment is required, which documents must be original, and which fees are payable to the government or a service provider. Do not treat a generic checklist as a substitute for country- or applicant-specific instructions.</p>
    <p>Prepare a consistent document set: names, passport numbers, travel dates and accommodation details should agree across the form and supporting papers. Submit clear, readable scans or copies in the format requested. Provide genuine financial, employment, study or sponsorship evidence when requested; do not alter documents or make unexplained deposits to fit an informal target. If a document is not in an accepted language, confirm whether an official translation or certification is required.</p>
    <p>After submission, save the receipt or reference number and use the official portal or authorized channel to check status. Processing estimates can change because of holidays, application volume or requests for more information, so leave a buffer and avoid relying on a promised decision date. Before departure, check the approved visa's name, validity dates, number of entries and permitted stay, and carry the supporting papers that may be requested at check-in or arrival. A visa does not remove the need to meet border-entry conditions.</p>
  </section>`;
}

function renderFlightsHubBody(title: string, description: string, faqSchema: ReturnType<typeof getFaqSchemaForPage>): string {
  const routeDirectory = FLIGHTS_DATA.map(
    (route) =>
      `<li><a href="/flights/${escapeHtml(route.id)}">Flights from ${escapeHtml(route.from)} to ${escapeHtml(route.to)}</a> — ${escapeHtml(route.priceRangeBdt)}; ${escapeHtml(route.duration)}.</li>`
  ).join("");
  const routeDetails = FLIGHTS_DATA.map(
    (route) => `
      <section>
        <h3>${escapeHtml(route.from)} to ${escapeHtml(route.to)} (${escapeHtml(route.country)})</h3>
        <p>This route guide brings together an indicative fare band of ${escapeHtml(route.priceRangeBdt)}, a journey time of ${escapeHtml(route.duration)}, and the airlines listed for the route: ${escapeHtml(route.airlines.join(", "))}. Its booking lead-time note is ${escapeHtml(route.bestTimeToBook)}; check the live timetable, fare rules and current entry conditions before choosing a ticket.</p>
      </section>`
  ).join("");

  return `<article>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(description)}</p>
    <p>Use these Dhaka flight guides to compare the destinations covered, indicative BDT fare ranges, journey duration, airlines and booking guidance in one place. The route notes are planning references rather than live fare quotes: prices and schedules can change with travel dates, seat inventory, baggage choices and fare conditions. Before booking, compare the total itinerary—not only the headline fare—including baggage, stopovers, transit requirements, change or cancellation terms, and arrival time. Travelers starting in Chattogram, Sylhet or another city should plan any separate domestic leg and allow a realistic connection buffer. Confirm the operating carrier and current departure details with the airline or booking provider.</p>
    <section><h2>Dhaka international flight routes and fare guide</h2><ul>${routeDirectory}</ul></section>
    <section><h2>Route-by-route flight planning from Dhaka</h2>${routeDetails}</section>
    <section><h2>How to compare international flights from Bangladesh</h2>
      <p>Start with flexible dates where possible, then compare direct and connecting itineraries using the same passenger count and baggage allowance. A low displayed fare may exclude checked baggage, seat selection or payment fees, while a connection can add transit formalities and a longer journey. Check whether each segment is on one ticket, how missed connections are handled, and whether the fare permits changes. Keep passport validity and destination entry rules in view before committing to a non-refundable fare.</p>
      <p>Flight duration and booking windows in the linked guides are indicative and should be checked against current schedules. For trips during Eid, school holidays or the winter travel season, compare early and revisit fares before purchase rather than assuming a fixed discount window. If your itinerary includes a separate domestic flight to Dhaka, protect that connection with sufficient time and consider the consequences of delays.</p>
    </section>
    ${renderLandingFaqs("flights-hub-faqs", "Flight booking questions for travelers from Bangladesh", faqSchema)}
  </article>`;
}

function renderHotelsHubBody(title: string, description: string, faqSchema: ReturnType<typeof getFaqSchemaForPage>): string {
  const directory = HOTELS_DATA.map(
    (guide) =>
      `<li><a href="/hotels/${escapeHtml(guide.id)}">Where to stay in ${escapeHtml(guide.city)}, ${escapeHtml(guide.country)}</a> — compare ${guide.neighborhoods.map((area) => escapeHtml(area.name)).join(", ")}.</li>`
  ).join("");
  const guideDetails = HOTELS_DATA.map(
    (guide) => `
      <section>
        <h3>${escapeHtml(guide.city)}, ${escapeHtml(guide.country)}</h3>
        <p>Choose between ${guide.neighborhoods
          .map((area) => `<strong>${escapeHtml(area.name)}</strong> (${escapeHtml(area.vibe)})`)
          .join(", ")}. The linked guide compares these areas with example properties such as ${guide.hotels.map((hotel) => escapeHtml(hotel.name)).join(", ")}.</p>
        <p>Use the area notes to match a stay to your transit plans, preferred pace and trip budget. Check the exact address and current room terms before booking; a property's listed category or neighborhood alone does not confirm availability, accessibility or the final payable price.</p>
      </section>`
  ).join("");

  return `<article>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(description)}</p>
    <p>Choosing the right hotel area can matter as much as choosing the property. These guides compare neighborhoods in destinations reached by Bangladeshi travelers, with attention to transit access, family needs, local food options, quiet or busy surroundings, and the type of trip each area supports. Use the linked city guide to compare the neighborhoods and example stays before checking dates and availability. Displayed BDT amounts are planning references, not a guaranteed quote; the final total can differ because of room dates, occupancy, taxes, service charges, meal plans, currency conversion and the provider's cancellation terms.</p>
    <section><h2>Hotel neighborhood guides by destination</h2><ul>${directory}</ul></section>
    <section><h2>Compare where to stay in each destination</h2>${guideDetails}</section>
    <section><h2>Hotel booking checklist for Bangladesh-based travelers</h2>
      <p>Before paying, confirm the full property address, check-in and check-out time, room occupancy, whether breakfast is included, and whether the booking is refundable. Compare the final payable amount after local taxes and fees rather than relying on the first nightly rate shown. For family trips, confirm bed configuration and any child charges directly in the booking conditions.</p>
      <p>Review the neighborhood against your actual itinerary: proximity to a metro or airport link can reduce transfer time, while a quieter area may suit a longer stay. Check recent property reviews and the route between the hotel and the places you expect to visit. If you plan to pay with a Bangladeshi card, verify foreign-currency endorsement and online transaction settings with your bank; payment options vary by hotel and booking platform.</p>
    </section>
    ${renderLandingFaqs("hotels-hub-faqs", "Hotel booking questions for Bangladeshi travelers", faqSchema)}
  </article>`;
}

function renderVisaHubBody(title: string, description: string, faqSchema: ReturnType<typeof getFaqSchemaForPage>): string {
  const directory = VISA_DATA.map(
    (guide) =>
      `<li><a href="/visa/${escapeHtml(guide.id)}">${escapeHtml(guide.country)} visa guide for Bangladeshi passport holders</a> — ${escapeHtml(guide.requirementType)}; fee guidance ${escapeHtml(guide.costBdt)}; processing guidance ${escapeHtml(guide.processingTime)}.</li>`
  ).join("");
  const guideDetails = VISA_DATA.map(
    (guide) => `
      <section>
        <h3>${escapeHtml(guide.country)} visa requirements from Bangladesh</h3>
        <p>The current guide classifies the route as ${escapeHtml(guide.requirementType)} and provides fee guidance of ${escapeHtml(guide.costBdt)} with an indicative processing estimate of ${escapeHtml(guide.processingTime)}. It organizes the checklist into ${guide.documentChecklist.length} document groups (${guide.documentChecklist.map((group) => escapeHtml(group.category)).join(", ")}) and lays out ${guide.stepByStep.length} application steps. Open the destination guide for the complete checklist and sequence, then confirm the latest instructions with the official authority.</p>
      </section>`
  ).join("");

  return `<article>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(description)}</p>
    <p>This visa hub brings together entry-route, fee, processing-time and document guidance for popular destinations for Bangladeshi passport holders. Start with the country-specific guide below to understand whether the route described is visa-free, visa on arrival, electronic or an advance application. Requirements depend on the travel purpose, passport and current policy; the amounts and timeframes shown are guidance from the underlying destination pages, not an approval guarantee. Immigration rules can change without notice, so verify the latest requirements and application channel with the destination's official immigration department, embassy or authorized portal before booking or applying.</p>
    <section><h2>Country visa guides and application routes</h2><ul>${directory}</ul></section>
    <section><h2>Documents and steps by destination</h2>${guideDetails}</section>
    <section><h2>Before submitting a tourist visa application</h2>
      <p>Check that the visa category matches your real travel purpose and intended length of stay. Use the current application form and document list published by the official authority, and make sure names, passport numbers, dates and supporting bookings match across every document. If an application must be submitted through an embassy or authorized service provider, confirm the Dhaka jurisdiction, appointment process and payment instructions directly with that provider.</p>
      <p>Processing estimates are not guarantees: public holidays, peak demand, additional-document requests and individual circumstances can change the outcome. Avoid non-refundable travel commitments until you understand the relevant entry rules. Keep copies of submitted documents and the approval notice accessible during check-in and arrival. This directory is a starting point for research, not legal advice or a substitute for an official decision.</p>
    </section>
    ${renderLandingFaqs("visa-hub-faqs", "Visa questions for Bangladeshi passport holders", faqSchema)}
  </article>`;
}

function renderDestinationsHubBody(title: string, description: string, faqSchema: ReturnType<typeof getFaqSchemaForPage>): string {
  const directory = DESTINATIONS_DATA.map(
    (guide) =>
      `<li><a href="/destinations/${escapeHtml(guide.id)}">${escapeHtml(guide.country)} itinerary from Bangladesh</a> — best-time note: ${escapeHtml(guide.bestTimeToVisit)}; local budget reference: ${escapeHtml(guide.budgetBdt)}.</li>`
  ).join("");
  const guideDetails = DESTINATIONS_DATA.map(
    (guide) => `
      <section>
        <h3>${escapeHtml(guide.country)} itinerary from Dhaka</h3>
        <p>The linked itinerary covers ${guide.itinerary.length} days, with stops including ${guide.itinerary.map((day) => escapeHtml(day.title)).join(", ")}. The page's local transport notes compare ${guide.localTransport.length} ways to move around or between its featured places. Use it to decide whether the pace fits your dates before checking current schedules and local access.</p>
      </section>`
  ).join("");

  return `<article>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(description)}</p>
    <p>Use these destination guides to turn a broad idea into a practical trip plan from Bangladesh. Each linked page combines a day-by-day outline with seasonal context, local transport notes and a budget reference, so you can compare the pace and style of different destinations before deciding where to go. The outlines are starting points rather than fixed tours: adjust them for flight arrival times, family mobility, prayer and meal needs, local opening days and weather. Confirm entry requirements separately, then recheck transport schedules, attraction access and prices close to travel.</p>
    <section><h2>Destination itineraries for Bangladeshi travelers</h2><ul>${directory}</ul></section>
    <section><h2>Compare sample itineraries and local planning notes</h2>${guideDetails}</section>
    <section><h2>How to adapt an itinerary to your trip</h2>
      <p>Begin by setting the number of nights and identifying any fixed arrival or departure times. Avoid placing a long intercity transfer and several time-sensitive attractions on the same day. Check the actual location of each hotel against the itinerary, and leave room for traffic, rest and unexpected weather. For a multi-city trip, compare the time and total cost of road, rail and air connections rather than assuming the fastest option is the most convenient.</p>
      <p>Families and first-time travelers may prefer fewer hotel changes and a simpler route. Travelers with a specific interest—food, shopping, culture, nature or religious sites—can use the day outlines as a base and replace activities to suit their priorities. Budgets and seasonal notes are indicative; confirm current entry fees, transport fares and opening information with local operators or official destination sources.</p>
    </section>
    ${renderLandingFaqs("destinations-hub-faqs", "Planning an international trip from Bangladesh", faqSchema)}
  </article>`;
}

function renderCostsHubBody(title: string, description: string, faqSchema: ReturnType<typeof getFaqSchemaForPage>): string {
  const directory = TRIP_COSTS_DATA.map(
    (guide) =>
      `<li><a href="/costs/${escapeHtml(guide.id)}">${escapeHtml(guide.country)} trip cost in BDT</a> — ${guide.durationDays}-day guide in ${escapeHtml(guide.currencyCode)}.</li>`
  ).join("");
  const guideDetails = TRIP_COSTS_DATA.map(
    (guide) => `
      <section>
        <h3>${escapeHtml(guide.country)} trip budget from Bangladesh</h3>
        <p>This ${guide.durationDays}-day guide separates ${guide.categories.map((category) => escapeHtml(category.name)).join(", ")}. It also flags seasonal influences and includes ${guide.moneyHacks.length} practical budget suggestions. Open the destination breakdown to review its BDT ranges and assumptions together rather than treating any one category as the total trip price.</p>
      </section>`
  ).join("");

  return `<article>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(description)}</p>
    <p>Estimate an international trip from Dhaka in Bangladeshi Taka by looking at the whole journey rather than airfare alone. These destination guides break budgets into categories such as flights, accommodation, meals, transport and activities, with lower, mid-range and higher estimates where the underlying data provides them. Use the figures to set a starting budget and compare destinations; they are not live quotes or a promise that every listed cost is included in the same way. Travel dates, room occupancy, exchange rates, baggage, local taxes and activity choices can all change the final amount.</p>
    <section><h2>Destination cost guides and BDT budget ranges</h2><ul>${directory}</ul></section>
    <section><h2>Compare trip costs by destination</h2>${guideDetails}</section>
    <section><h2>How to build a realistic travel budget</h2>
      <p>Separate one-time costs from daily costs. Flights, visas and some activities are usually paid before departure; hotels, meals, ground transport and shopping are paid during the trip. Keep a contingency for exchange-rate movement, airport transfers, baggage fees and unexpected changes. If a category shows a range, choose the level that matches your likely travel style rather than simply adding every lowest estimate together.</p>
      <p>Exchange-rate references are approximate and can move; check a current bank or authorized money-changer rate before converting funds. Review what each guide includes and excludes, especially airfare, accommodation nights, visa fees and optional activities, so you do not compare different trip lengths on an equal footing. Revisit the estimate when your dates and bookings are known.</p>
      <ol>
        <li>Choose the destination and duration that match your real travel window, then open that country's detailed BDT breakdown.</li>
        <li>Mark which costs are already fixed, such as purchased flights, and which still depend on daily choices, such as meals and local transport.</li>
        <li>Use the middle estimate as a comparison point only when it fits your accommodation and activity preferences; do not assume the lowest figure covers every traveler.</li>
        <li>Recheck exchange rates, baggage conditions, hotel taxes and payment fees close to booking, and leave a separate contingency rather than hiding it inside the listed categories.</li>
      </ol>
    </section>
    ${renderLandingFaqs("costs-hub-faqs", "Trip budget questions for travelers from Bangladesh", faqSchema)}
  </article>`;
}

function buildAllRoutes(): PrerenderRoute[] {
  const routes: PrerenderRoute[] = [];
  const defaultOgImage = `${BASE_URL}/og-image.jpg`;

  // 1. Home (/)
  // Every question here must be unique to the homepage. HAJJ_UMRAH_FAQS is
  // already emitted in full on /umrah and on each Hajj/Umrah blog post, so
  // borrowing from it made the same two Q&A pairs appear at three different
  // URLs — answer engines pick one URL per answer and drop the rest.
  const homeFaq = stripContext(
    generateFAQSchema([
      {
        question: "How do I get a dual-currency card endorsement on a Bangladeshi passport?",
        answer:
          "Visit an authorized bank branch in Bangladesh with your original valid passport and NID to endorse up to USD $12,000 per calendar year under the Bangladesh Bank travel quota, then enable E-Commerce and 3D-Secure online transactions in your bank app before booking flights or hotels.",
      },
      {
        question: "What are the top budget-friendly family destinations from Dhaka?",
        answer:
          "Nepal (from BDT 42,000 per person with free Visa on Arrival), Malaysia (from BDT 68,000 with 4-day online e-Visa and universal Halal dining), Thailand, and the Maldives local islands (Maafushi and Hulhumalé) are the top budget-friendly family destinations from Dhaka.",
      },
      {
        question: "Which countries can Bangladeshi passport holders visit without a prior visa?",
        answer:
          "Nepal, the Maldives, Sri Lanka (via online ETA), Bhutan and Indonesia issue Visa on Arrival or free entry to Bangladeshi passport holders, so no embassy appointment is needed before departure from Dhaka. Nepal and the Maldives are the cheapest of these to reach from Dhaka (DAC).",
      },
      {
        question: "Is URAL a travel agency that sells tickets?",
        answer:
          "No. URAL is an independent outbound travel intelligence desk for Bangladeshi travellers: it publishes flight price guidance in BDT, official visa checklists, itineraries and realistic trip-cost breakdowns, then links out to the airline, hotel or visa portal so you book directly at the source price.",
      },
    ])
  );
  homeFaq["@id"] = `${BASE_URL}/#faq`;
  homeFaq["mainEntityOfPage"] = { "@id": `${BASE_URL}/#webpage` };

  routes.push({
    routePath: "/",
    canonicalUrl: `${BASE_URL}/`,
    title: "URAL — Compare Flights, Hotels & Visa Guides for Bangladeshi Travelers",
    description:
      "Compare flight prices from Dhaka to Nepal, Thailand, Malaysia and Dubai, check visa requirements step by step, and plan your trip budget in BDT.",
    imageUrl: defaultOgImage,
    lcpImageUrl: `/assets/images/clouds_boat_hero_1781438671378-1200.webp`,
    lcpImageSizes: "100vw",
    breadcrumbs: [{ name: "Home", url: `${BASE_URL}/` }],
    extraGraphNodes: [homeFaq],
    bodyHtml: `
      <h1>URAL — Flights, Hotels, Umrah &amp; Visa Guides for Bangladeshi Travelers</h1>
      <p>Compare cheap international flights from Dhaka (DAC), check official e-Visa checklists, plan DIY Umrah &amp; Hajj in BDT, and explore 41 verified travel guides for Bangladeshi passport holders.</p>
    `,
  });

  // 2. Umrah & Hajj Hub (/umrah)
  const umrahFaq = stripContext(
    generateFAQSchema(HAJJ_UMRAH_FAQS, {
      url: `${BASE_URL}/umrah`,
      name: "Umrah & Hajj Planning Hub from Bangladesh (2026)",
    })
  );
  umrahFaq["@id"] = `${BASE_URL}/umrah#faq`;
  umrahFaq["mainEntityOfPage"] = { "@id": `${BASE_URL}/umrah#webpage` };

  routes.push({
    routePath: "/umrah",
    canonicalUrl: `${BASE_URL}/umrah`,
    title: "Umrah Cost from Bangladesh: DIY Guide & Nusuk | URAL",
    description:
      "Plan Umrah from Dhaka with a BDT cost framework, Saudi visa and Nusuk guidance, Makkah–Madinah travel options, and a practical preparation checklist.",
    imageUrl: defaultOgImage,
    lcpImageUrl: `/assets/images/umrah_makkah_haram_guide_1790430007679-1200.webp`,
    lcpImageSizes: "100vw",
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Umrah & Hajj Hub", url: `${BASE_URL}/umrah` },
    ],
    extraGraphNodes: [umrahFaq],
    bodyHtml: `
      <article>
        <h1>Umrah &amp; Hajj Guide from Bangladesh (2026): DIY BDT Cost Calculator, Nusuk &amp; Flights</h1>
        <p>Plan an independent 10-day Umrah trip from Dhaka (DAC) from BDT 1,16,000–1,32,000 per pilgrim or compare official Bangladesh Hajj registration packages (hajj.gov.bd).</p>
        <section>
          <h2>Frequently Asked Questions on Umrah &amp; Hajj from Bangladesh</h2>
          ${HAJJ_UMRAH_FAQS.map(
            (f) => `<h3>${escapeHtml(f.question)}</h3><p>${escapeHtml(f.answer)}</p>`
          ).join("\n")}
        </section>
      </article>
    `,
  });

  // 3. Flights Hub (/flights) + 6 Flight Routes (/flights/:id)
  const flightsHubTitle = "Flights from Dhaka: Compare Fares, Routes & Airlines (2026) | URAL";
  const flightsHubDesc =
    "Compare cheap international flights from Hazrat Shahjalal International Airport (DAC) to Nepal, Thailand, Malaysia, and Dubai. View flight duration, direct airlines, and BDT fares.";
  const flightsFaq = getFaqSchemaForPage("flights", undefined, true, `${BASE_URL}/flights`);
  routes.push({
    routePath: "/flights",
    canonicalUrl: `${BASE_URL}/flights`,
    title: flightsHubTitle,
    description: flightsHubDesc,
    imageUrl: defaultOgImage,
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Flight Guides", url: `${BASE_URL}/flights` },
    ],
    extraGraphNodes: [
      collectionPageSchema({
        url: `${BASE_URL}/flights`,
        name: flightsHubTitle,
        description: flightsHubDesc,
        items: FLIGHTS_DATA.map((r) => ({
          name: `${r.from} to ${r.to} Flight Guide`,
          url: `${BASE_URL}/flights/${r.id}`,
          description: r.quickAnswer,
        })),
      }),
      ...(flightsFaq ? [stripContext(flightsFaq)] : []),
    ],
    bodyHtml: renderFlightsHubBody(flightsHubTitle, flightsHubDesc, flightsFaq),
  });

  for (const r of FLIGHTS_DATA) {
    const routeUrl = `${BASE_URL}/flights/${r.id}`;
    const title =
      r.id === "dhaka-kathmandu"
        ? "Dhaka to Kathmandu Flight Guide 2026: Price, Time & Visa | URAL"
        : `Flights from Dhaka to ${r.to.split(" (")[0]} (${r.country}) 2026 | URAL`;
    const description =
      r.id === "dhaka-kathmandu"
        ? "Direct Dhaka to Kathmandu flights take 1h30m on Biman Bangladesh or Himalaya Airlines, from BDT 28,000 roundtrip. Bangladeshis get a free visa on arrival."
        : `Compare flights from Dhaka to ${r.to.split(" (")[0]}. Check flight duration, direct airlines, and BDT fares.`;
    const extraNodes: Record<string, unknown>[] = [];
    if (r.schemaMarkup?.code) {
      try {
        extraNodes.push(stripContext(JSON.parse(r.schemaMarkup.code)));
      } catch {
        // ignore
      }
    }
    const routeFaq = getFaqSchemaForPage("flights", r.id, false, routeUrl);
    if (routeFaq) extraNodes.push(stripContext(routeFaq));

    routes.push({
      routePath: `/flights/${r.id}`,
      canonicalUrl: routeUrl,
      title,
      description,
      imageUrl: defaultOgImage,
      breadcrumbs: [
        { name: "Home", url: `${BASE_URL}/` },
        { name: "Flight Guides", url: `${BASE_URL}/flights` },
        { name: `${r.from.split(" (")[0]} to ${r.to.split(" (")[0]} Flight`, url: routeUrl },
      ],
      extraGraphNodes: extraNodes,
      bodyHtml: `
        <article>
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(r.quickAnswer || description)}</p>
          <p><strong>Price range:</strong> ${escapeHtml(r.priceRangeBdt)} | <strong>Journey duration:</strong> ${escapeHtml(r.duration)} | <strong>Airlines listed:</strong> ${escapeHtml(r.airlines.join(", "))}</p>
          <section>
            <h2>Dhaka to ${escapeHtml(r.to.split(" (")[0])} route facts</h2>
            <ul>${r.keyFacts.map((fact) => `<li><strong>${escapeHtml(fact.label)}:</strong> ${escapeHtml(fact.value)}</li>`).join("")}</ul>
          </section>
          <section>
            <h2>How to compare fares on this route</h2>
            <p>Treat the published fare band as a starting point for comparison, not as a live quote or a promise that seats are available at that price. Check the same travel dates, passenger count, cabin and baggage allowance across providers. Compare the final payable amount after any booking, payment or seat-selection fees, and read the change and cancellation conditions before you pay. A connecting option may have a lower headline price but a longer total journey; make sure the transfer time is practical and that you understand who is responsible if a segment is delayed.</p>
            <p>If your dates are flexible, compare nearby departure days as well as different times. Fare inventory changes, and holidays or school breaks may affect availability. The guide's BDT range is useful for planning a budget; use the airline or booking provider's current checkout total for the final decision.</p>
          </section>
          <section>
            <h2>Booking window and airline choice</h2>
            <p>The route guidance suggests starting fare checks around ${escapeHtml(r.bestTimeToBook)}. That is a planning cue rather than a guaranteed cheapest day to buy: compare current schedules and prices, then balance fare against departure time, total travel duration, baggage and support if plans change. Airlines listed for this route include ${escapeHtml(r.airlines.join(", "))}; operating carriers, aircraft and schedules can vary by date, so confirm the carrier shown on each segment.</p>
            <p>Before choosing a direct or connecting itinerary, check the exact origin and destination airport codes on the ticket. If a connection is involved, verify whether all sectors are on one ticket, whether baggage is checked through, and whether you need permission to enter or transit the connection country. Do not assume a booking platform's itinerary summary replaces the airline's conditions.</p>
          </section>
          <section>
            <h2>Entry requirements and departure preparation</h2>
            <p>The current route data describes the entry requirement as: ${escapeHtml(r.visaRequirement)}. Visa rules depend on the traveler and can change; verify the latest instructions with the destination's official immigration authority or embassy before purchasing a non-refundable ticket. Check that passport details match the booking, understand the permitted stay and any pre-arrival form requirements, and carry the documents requested for your specific trip.</p>
            <p>For departure from Dhaka, check your airline's current check-in time, baggage limits and airport instructions before travel. Keep the passport, ticket, visa or entry authorization, accommodation details and onward or return itinerary accessible. Requirements differ by destination and individual circumstances, so use the linked visa guide as a starting point and confirm with official sources.</p>
          </section>
          <section>
            <h2>Plan the full journey around this flight</h2>
            <p>Door-to-door timing includes more than the time in the air. Plan how you will reach Hazrat Shahjalal International Airport from your starting point, allow the airline's required check-in time, and consider the time needed to collect bags and reach accommodation after landing. For this route, confirm the destination airport shown on the ticket (${escapeHtml(r.to)}) before arranging a pickup or choosing a hotel; airport names and codes matter when comparing transfer options. If you arrive late or have a connection, confirm the transfer plan and the accommodation's check-in arrangements in advance. Keep enough flexibility for traffic and schedule changes rather than planning a tight onward connection on a separate booking.</p>
          </section>
          <section>
            <h2>Arrival and connection checklist</h2>
            <ol>
              <li>Confirm the airport code, operating carrier, departure time and terminal shown on the latest itinerary.</li>
              <li>Review cabin and checked-baggage allowances for every sector, especially when an itinerary combines more than one airline.</li>
              <li>Check transit rules for each connection point and leave enough time for any required security or immigration steps.</li>
              <li>Save the booking confirmation offline and keep the airline's contact and disruption instructions available.</li>
              <li>Plan the transfer from the arrival airport to your accommodation using current local information, and share your hotel address with your travel party.</li>
            </ol>
          </section>
          ${renderLandingFaqs("flight-route-faqs", "Questions about this Dhaka flight route", routeFaq)}
        </article>
      `,
    });
  }

  // 4. Hotels Hub (/hotels) + 6 Hotel Guides (/hotels/:id)
  const hotelsHubTitle = "International Hotel Guides for Bangladeshi Travelers (2026) | URAL";
  const hotelsHubDesc =
    "Find top-rated budget & family hotels in Kathmandu, Bangkok, Kuala Lumpur, and Dubai. Neighborhood safety, halal dining, and BDT payment guides.";
  const hotelsFaq = getFaqSchemaForPage("hotels", undefined, true, `${BASE_URL}/hotels`);
  routes.push({
    routePath: "/hotels",
    canonicalUrl: `${BASE_URL}/hotels`,
    title: hotelsHubTitle,
    description: hotelsHubDesc,
    imageUrl: defaultOgImage,
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Hotel Neighborhoods", url: `${BASE_URL}/hotels` },
    ],
    extraGraphNodes: [
      collectionPageSchema({
        url: `${BASE_URL}/hotels`,
        name: hotelsHubTitle,
        description: hotelsHubDesc,
        items: HOTELS_DATA.map((h) => ({
          name: `Best Hotels in ${h.city} (${h.country})`,
          url: `${BASE_URL}/hotels/${h.id}`,
          description: h.quickAnswer,
        })),
      }),
      ...(hotelsFaq ? [stripContext(hotelsFaq)] : []),
    ],
    bodyHtml: renderHotelsHubBody(hotelsHubTitle, hotelsHubDesc, hotelsFaq),
  });

  for (const h of HOTELS_DATA) {
    const hotelUrl = `${BASE_URL}/hotels/${h.id}`;
    const title =
      h.id === "kathmandu-hotels"
        ? "Best Hotels in Kathmandu for Bangladeshi Travelers (2026) | URAL"
        : `Top Rated Hotels in ${h.city} | URAL`;
    const description =
      h.id === "kathmandu-hotels"
        ? "Where to stay in Kathmandu: Thamel for budget travelers from BDT 1,500/night, Lazimpat for comfort, and Boudha for a quieter trip. Full neighborhood guide."
        : `Compare clean rooms, recommended zones, and hotels in ${h.city} starting from cheap BDT tourist rates.`;
    const extraNodes: Record<string, unknown>[] = [];
    if (h.schemaMarkup?.code) {
      try {
        extraNodes.push(stripContext(JSON.parse(h.schemaMarkup.code)));
      } catch {
        // ignore
      }
    }
    const hotelFaq = getFaqSchemaForPage("hotels", h.id, false, hotelUrl);
    if (hotelFaq) extraNodes.push(stripContext(hotelFaq));

    routes.push({
      routePath: `/hotels/${h.id}`,
      canonicalUrl: hotelUrl,
      title,
      description,
      imageUrl: defaultOgImage,
      breadcrumbs: [
        { name: "Home", url: `${BASE_URL}/` },
        { name: "Hotel Neighborhoods", url: `${BASE_URL}/hotels` },
        { name: `${h.city} Hotels`, url: hotelUrl },
      ],
      extraGraphNodes: extraNodes,
      bodyHtml: `
        <article>
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(h.quickAnswer || h.description || description)}</p>
          <h2>Neighborhoods to compare in ${escapeHtml(h.city)}</h2>
          <ul>
            ${h.neighborhoods.map((area) => `<li><strong>${escapeHtml(area.name)}:</strong> ${escapeHtml(area.description)} (${escapeHtml(area.vibe)})</li>`).join("")}
          </ul>
          <h2>Planning facts</h2>
          <ul>${h.keyFacts.map((fact) => `<li><strong>${escapeHtml(fact.label)}:</strong> ${escapeHtml(fact.value)}</li>`).join("")}</ul>
          <h2>Example properties in the ${escapeHtml(h.city)} guide</h2>
          <ul>${h.hotels.map((hotel) => `<li><strong>${escapeHtml(hotel.name)}</strong> — ${escapeHtml(hotel.category)} option in ${escapeHtml(hotel.neighborhood)}; indicative guide figure BDT ${hotel.priceBdt.toLocaleString("en-US")}. Listed features include ${escapeHtml(hotel.features.join(", "))}.</li>`).join("")}</ul>
          <section>
            <h2>Match the hotel area to your itinerary</h2>
            <p>The area options in this guide have different profiles: ${h.neighborhoods.map((area) => `${escapeHtml(area.name)} (${escapeHtml(area.vibe)})`).join("; ")}. Choose by looking at where you expect to spend your time, how you will reach those places and the pace that suits your travel party. A central location may reduce some local journeys but can cost more or be busier; a quieter base may require more planning for meals and transport. Use the neighborhood descriptions above to compare trade-offs rather than treating one area as the universal best choice.</p>
            <p>Before selecting a property, plot its exact address against your planned activities and the transport you expect to use. Check walking distances, station access and airport-transfer arrangements using current maps. If you have mobility needs, children or an early departure, contact the property to confirm the room setup, lift access, luggage storage and check-in arrangements instead of relying only on a neighborhood label.</p>
          </section>
          <section>
            <h2>Check the full rate and reservation conditions</h2>
            <p>Compare the final amount for the same dates, room occupancy and number of nights. Confirm whether the displayed rate includes local taxes, service charges, breakfast and any required deposit; these items can change the checkout total. Review the cancellation deadline, refund method, payment schedule and conditions for changing guest names. If a booking is marked non-refundable, make sure your travel dates and entry arrangements are sufficiently settled before paying.</p>
            <p>The BDT figures and property examples in this guide are planning references, not live availability or a guaranteed offer. Prices can change with season, room type, occupancy and booking channel. Check the provider's current listing and recent property reviews, and verify that the selected room meets your needs before confirming. A star category or an attractive headline rate does not replace checking the room description and terms.</p>
          </section>
          <section>
            <h2>Payment and arrival planning for travelers from Bangladesh</h2>
            <p>Payment methods vary by booking platform and property. Before relying on a Bangladeshi debit or credit card, ask your bank about foreign-currency endorsement, online transactions and any international usage controls. A “pay at property” option may still require a card guarantee or a deposit, so read the policy rather than assuming payment can be made in BDT at arrival. Keep the reservation confirmation and the property's contact details available offline.</p>
            <p>For arrival day, note the local address and check-in hours, then confirm what to do if your flight is delayed or lands after reception hours. Arrange a transfer using current airport and local transport information; do not assume the hotel is next to the airport or a station simply because it appears close on a city map. Share the address and check-in plan with the other travelers in your party.</p>
          </section>
          ${renderLandingFaqs("hotel-guide-faqs", `Hotel questions about ${h.city}`, hotelFaq)}
        </article>
      `,
    });
  }

  // 5. Visa Hub (/visa) + 6 Visa Guides (/visa/:id)
  const visaHubTitle = "Visa Requirements for Bangladeshi Citizens 2026: Guides & Checklists | URAL";
  const visaHubDesc =
    "Check complete tourist visa guides for Bangladeshi citizens. Learn about free Visa on Arrival in Nepal, Thailand sticker visa rules, Malaysia eVisa, and Dubai visas.";
  const visaFaq = getFaqSchemaForPage("visa", undefined, true, `${BASE_URL}/visa`);
  routes.push({
    routePath: "/visa",
    canonicalUrl: `${BASE_URL}/visa`,
    title: visaHubTitle,
    description: visaHubDesc,
    imageUrl: defaultOgImage,
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Visa Guides", url: `${BASE_URL}/visa` },
    ],
    extraGraphNodes: [
      collectionPageSchema({
        url: `${BASE_URL}/visa`,
        name: visaHubTitle,
        description: visaHubDesc,
        items: VISA_DATA.map((v) => ({
          name: `${v.country} Visa Guide for Bangladeshis`,
          url: `${BASE_URL}/visa/${v.id}`,
          description: v.quickAnswer,
        })),
      }),
      ...(visaFaq ? [stripContext(visaFaq)] : []),
    ],
    bodyHtml: renderVisaHubBody(visaHubTitle, visaHubDesc, visaFaq),
  });

  for (const v of VISA_DATA) {
    const visaUrl = `${BASE_URL}/visa/${v.id}`;
    const title =
      v.id === "nepal-visa"
        ? "Nepal Visa for Bangladeshi Citizens 2026: Free Visa on Arrival Guide | URAL"
        : `${v.country} Visa for Bangladeshi Travelers 2026 | URAL`;
    const description =
      v.id === "nepal-visa"
        ? "Bangladeshi citizens get a free 30-day Nepal visa on arrival for their first trip each year. Full document checklist, fees for repeat visits, and step-by-step process."
        : `Check complete visa requirements, costs in BDT, step-by-step instructions, and checklist for ${v.country} from Dhaka.`;
    const extraNodes: Record<string, unknown>[] = [];
    if (v.schemaMarkup?.code) {
      try {
        extraNodes.push(stripContext(JSON.parse(v.schemaMarkup.code)));
      } catch {
        // ignore
      }
    }
    const vFaq = getFaqSchemaForPage("visa", v.id, false, visaUrl);
    if (vFaq) extraNodes.push(stripContext(vFaq));

    routes.push({
      routePath: `/visa/${v.id}`,
      canonicalUrl: visaUrl,
      title,
      description,
      imageUrl: defaultOgImage,
      breadcrumbs: [
        { name: "Home", url: `${BASE_URL}/` },
        { name: "Visa Guides", url: `${BASE_URL}/visa` },
        { name: `${v.country} Visa`, url: visaUrl },
      ],
      extraGraphNodes: extraNodes,
      bodyHtml: `
        <article>
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(v.quickAnswer || description)}</p>
          <p><strong>Entry route:</strong> ${escapeHtml(v.requirementType)} | <strong>Published fee/entry guidance:</strong> ${escapeHtml(v.costBdt)} | <strong>Indicative processing guidance:</strong> ${escapeHtml(v.processingTime)}</p>
          <p>These details are an editorial planning summary, not an official decision. Rules, fees, forms and processing windows can change; verify the current requirements with the linked authority before applying or making non-refundable plans.</p>
          <h2>Key visa facts</h2>
          <ul>${v.keyFacts.map((fact) => `<li><strong>${escapeHtml(fact.label)}:</strong> ${escapeHtml(fact.value)}</li>`).join("")}</ul>
          <h2>Documents to check</h2>
          ${v.documentChecklist.map((checklist) => `<section><h3>${escapeHtml(checklist.category)}</h3><ul>${checklist.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`).join("")}
          <h2>Application steps</h2>
          <ol>${v.stepByStep.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
          ${renderVisaRouteContext(v.id)}
          ${renderVisaApplicationGuidance()}
          <section aria-labelledby="visa-travel-insurance-esim">
            <h2 id="visa-travel-insurance-esim">${escapeHtml(v.country)} Visa Travel Medical Insurance &amp; eSIM</h2>
            <p>Download an embassy-compliant <a href="${escapeHtml(resolvePartnerUrl(AFFILIATE_LINKS.ekta))}" target="_blank" rel="noopener noreferrer sponsored">EKTA Travel Medical Insurance English PDF policy (from $0.99/day)</a> for your ${escapeHtml(v.country)} visa checklist, pre-install a <a href="${escapeHtml(resolvePartnerUrl(AFFILIATE_LINKS.yesim))}" target="_blank" rel="noopener noreferrer sponsored">Yesim Travel eSIM (App &amp; Web)</a>, and book private airport pickup via <a href="${escapeHtml(resolvePartnerUrl(AFFILIATE_LINKS.getTransfer))}" target="_blank" rel="noopener noreferrer sponsored">GetTransfer.com</a>.</p>
          </section>
          ${renderVisaOfficialSources(v.id)}
          ${renderLandingFaqs("visa-guide-faqs", `${v.country} visa questions for Bangladeshi travelers`, vFaq)}
        </article>
      `,
    });
  }

  // 6. Destinations Hub (/destinations) + 6 Destination Guides (/destinations/:id)
  const destHubTitle = "Outbound Travel Plans & Itineraries from Bangladesh | URAL";
  const destHubDesc =
    "Explore hand-crafted 5-day itineraries and travel plans for Bangladeshi tourists visiting Nepal, Thailand, Malaysia, and the UAE with BDT budgets.";
  const destFaq = getFaqSchemaForPage("destinations", undefined, true, `${BASE_URL}/destinations`);
  routes.push({
    routePath: "/destinations",
    canonicalUrl: `${BASE_URL}/destinations`,
    title: destHubTitle,
    description: destHubDesc,
    imageUrl: defaultOgImage,
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Destinations", url: `${BASE_URL}/destinations` },
    ],
    extraGraphNodes: [
      collectionPageSchema({
        url: `${BASE_URL}/destinations`,
        name: destHubTitle,
        description: destHubDesc,
        items: DESTINATIONS_DATA.map((d) => ({
          name: `${d.country} 5-Day Itinerary from Bangladesh`,
          url: `${BASE_URL}/destinations/${d.id}`,
          description: d.quickAnswer,
        })),
      }),
      ...(destFaq ? [stripContext(destFaq)] : []),
    ],
    bodyHtml: renderDestinationsHubBody(destHubTitle, destHubDesc, destFaq),
  });

  for (const d of DESTINATIONS_DATA) {
    const destUrl = `${BASE_URL}/destinations/${d.id}`;
    const title =
      d.id === "nepal-guide"
        ? "Nepal Trip Plan from Bangladesh: 5-Day Itinerary & Costs (2026) | URAL"
        : `${d.country} Tour Itinerary & Travel Plan from Bangladesh | URAL`;
    const description =
      d.id === "nepal-guide"
        ? "A day-by-day Nepal itinerary for Bangladeshi travelers - Kathmandu and Pokhara highlights, local transport, food, and a realistic budget in BDT."
        : `Find tourist route plans, day-by-day itineraries, local transport guides, and estimated daily spends in BDT.`;
    const extraNodes: Record<string, unknown>[] = [
      touristTripSchema({
        url: destUrl,
        name: `${d.country} 5-Day Itinerary from Dhaka`,
        description,
        country: d.country,
        places: d.itinerary?.map((p) => p.title) || [d.country],
        estimatedPriceBdt:
          d.id === "nepal-guide"
            ? 45000
            : d.id === "thailand-guide"
            ? 68000
            : d.id === "malaysia-guide"
            ? 68000
            : d.id === "singapore-guide"
            ? 88000
            : d.id === "maldives-guide"
            ? 76000
            : 95000,
      }),
    ];
    const dFaq = getFaqSchemaForPage("destinations", d.id, false, destUrl);
    if (dFaq) extraNodes.push(stripContext(dFaq));

    routes.push({
      routePath: `/destinations/${d.id}`,
      canonicalUrl: destUrl,
      title,
      description,
      imageUrl: defaultOgImage,
      breadcrumbs: [
        { name: "Home", url: `${BASE_URL}/` },
        { name: "Destinations", url: `${BASE_URL}/destinations` },
        { name: `${d.country} Guide`, url: destUrl },
      ],
      extraGraphNodes: extraNodes,
      bodyHtml: `
        <article>
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(d.quickAnswer || d.description || description)}</p>
          <p><strong>Best time to visit:</strong> ${escapeHtml(d.bestTimeToVisit)}</p>
          <h2>${escapeHtml(String(d.itinerary.length))}-day route outline</h2>
          <ol>${d.itinerary.map((day) => `<li><strong>Day ${escapeHtml(String(day.day))} — ${escapeHtml(day.title)}:</strong> ${day.activities.map(escapeHtml).join("; ")}</li>`).join("")}</ol>
          <h2>Local transport options</h2>
          <ul>${d.localTransport.map((option) => `<li>${escapeHtml(option)}</li>`).join("")}</ul>
          <p><strong>Indicative local budget:</strong> ${escapeHtml(d.budgetBdt)}. Review international flights and current entry rules separately.</p>
          ${renderLandingFaqs(`${d.id}-faqs`, `${d.country} itinerary questions for Bangladeshi travelers`, dFaq)}
        </article>
      `,
    });
  }

  // 7. Costs Hub (/costs) + 6 Cost Guides (/costs/:id)
  const costsHubTitle = "International Trip Budgets from Bangladesh: Realistic BDT Cost Guides | URAL";
  const costsHubDesc =
    "How much does an international trip really cost from Dhaka? Detailed BDT budgets for Nepal, Thailand, Malaysia, and Dubai covering flights, hotels, food & transport.";
  const costsFaq = getFaqSchemaForPage("costs", undefined, true, `${BASE_URL}/costs`);
  routes.push({
    routePath: "/costs",
    canonicalUrl: `${BASE_URL}/costs`,
    title: costsHubTitle,
    description: costsHubDesc,
    imageUrl: defaultOgImage,
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Trip Costs", url: `${BASE_URL}/costs` },
    ],
    extraGraphNodes: [
      collectionPageSchema({
        url: `${BASE_URL}/costs`,
        name: costsHubTitle,
        description: costsHubDesc,
        items: TRIP_COSTS_DATA.map((c) => ({
          name: `${c.country} 5-Day Trip Cost Breakdown in BDT`,
          url: `${BASE_URL}/costs/${c.id}`,
          description: c.quickAnswer,
        })),
      }),
      ...(costsFaq ? [stripContext(costsFaq)] : []),
    ],
    bodyHtml: renderCostsHubBody(costsHubTitle, costsHubDesc, costsFaq),
  });

  for (const c of TRIP_COSTS_DATA) {
    const costUrl = `${BASE_URL}/costs/${c.id}`;
    const title =
      c.id === "nepal-costs"
        ? "Nepal Trip Cost from Bangladesh 2026: Full Budget Breakdown (BDT) | URAL"
        : `${c.country} Trip Cost from Bangladesh: Full Budget Sheet | URAL`;
    const description =
      c.id === "nepal-costs"
        ? "What a 5-day Nepal trip really costs from Bangladesh - flights, hotels, food, and transport in BDT, from budget (BDT 45,000) to luxury."
        : `Detailed BDT breakdown of flights, hotels, dining, and sightseeing costs for planning your trip from Dhaka to ${c.country}.`;
    const extraNodes: Record<string, unknown>[] = [];
    const cFaq = getFaqSchemaForPage("costs", c.id, false, costUrl);
    if (cFaq) extraNodes.push(stripContext(cFaq));

    routes.push({
      routePath: `/costs/${c.id}`,
      canonicalUrl: costUrl,
      title,
      description,
      imageUrl: defaultOgImage,
      breadcrumbs: [
        { name: "Home", url: `${BASE_URL}/` },
        { name: "Trip Costs", url: `${BASE_URL}/costs` },
        { name: `${c.country} Costs`, url: costUrl },
      ],
      extraGraphNodes: extraNodes,
      bodyHtml: `
        <article>
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(c.quickAnswer || description)}</p>
          <h2>${escapeHtml(String(c.durationDays))}-day cost categories</h2>
          <table>
            <thead><tr><th>Category</th><th>Lower estimate</th><th>Mid-range estimate</th><th>Higher estimate</th></tr></thead>
            <tbody>${c.categories.map((category) => `<tr><th scope="row">${escapeHtml(category.name)}</th><td>BDT ${category.lowBdt.toLocaleString("en-US")}</td><td>BDT ${category.midBdt.toLocaleString("en-US")}</td><td>BDT ${category.highBdt.toLocaleString("en-US")}</td></tr>`).join("")}</tbody>
          </table>
          <p><strong>Seasonal considerations:</strong> ${escapeHtml(c.seasonalVariation)}</p>
          <h2>Budget planning tips</h2>
          <ul>${c.moneyHacks.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}</ul>
          <p>These figures are planning estimates, not live quotes. Check current fares, hotel rates and exchange rates before booking.</p>
          ${renderLandingFaqs(`${c.id}-faqs`, `${c.country} trip cost questions for Bangladeshi travelers`, cFaq)}
        </article>
      `,
    });
  }

  // 8. Experiences Hub (/experiences)
  routes.push({
    routePath: "/experiences",
    canonicalUrl: `${BASE_URL}/experiences`,
    title: "Europe, UK, USA & Asian Attraction Passes (Tiqets & Klook Hub) | URAL",
    description:
      "Skip the line in Paris, London, Rome, Milan, Venice, and New York with official Tiqets passes, or book discounted Klook tours in Dubai, Bangkok, Singapore, and KL.",
    imageUrl: defaultOgImage,
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Attractions & Passes", url: `${BASE_URL}/experiences` },
    ],
    extraGraphNodes: [
      productOfferSchema({
        url: `${BASE_URL}/experiences`,
        idSuffix: "product-airalo-saudi-esim",
        name: "Saudi Arabia Travel eSIM for Umrah (5 GB / 30 days)",
        description:
          "Prepaid data eSIM covering Makkah, Madinah and Jeddah, activated before departure from Dhaka.",
        sku: "airalo-saudi-5gb-30d",
        brandName: "Airalo",
        priceBdt: 2100,
      }),
      productOfferSchema({
        url: `${BASE_URL}/experiences`,
        idSuffix: "product-tiqets-paris-pass",
        name: "Paris Louvre, Eiffel Tower & Seine River Skip-the-Line Bundle",
        description:
          "Official mobile-entry attraction bundle for Bangladeshi Schengen visa travelers visiting Paris.",
        sku: "tiqets-paris-bundle-2026",
        brandName: "Tiqets",
        priceBdt: 9800,
      }),
    ],
    bodyHtml: `
      <article>
        <h1>Europe, UK, USA &amp; Asian Attraction Passes (Tiqets &amp; Klook Hub)</h1>
        <p>Skip the line in Paris, London, Rome, Milan, Venice, and New York with official Tiqets passes, or book discounted Klook tours in Dubai, Bangkok, Singapore, and Kuala Lumpur.</p>
        <section aria-labelledby="luggage-storage-tip">
          <h2 id="luggage-storage-tip">Museum Bag-Ban Rule, Go City All-Inclusive &amp; Explorer Passes &amp; Luggage Storage</h2>
          <p>Major European, UK, and US attractions (Louvre, Eiffel Tower, Colosseum, Vatican, British Museum, and Statue of Liberty) strictly prohibit suitcases and large backpacks inside security. Store your bags for ~€5/day per bag (with €3,000 security guarantee) at verified hotels and shops near major stations via <a href="${escapeHtml(resolvePartnerUrl(AFFILIATE_LINKS.radicalStorage))}" target="_blank" rel="noopener noreferrer sponsored">Radical Storage luggage storage network</a>, bundle 3 to 10+ city landmarks with <a href="${escapeHtml(resolvePartnerUrl(AFFILIATE_LINKS.goCity))}" target="_blank" rel="noopener noreferrer sponsored">Go City All-Inclusive &amp; Explorer Passes</a>, book verified global hotels and sightseeing tours on <a href="${escapeHtml(resolvePartnerUrl(AFFILIATE_LINKS.klook))}" target="_blank" rel="noopener noreferrer sponsored">Klook Global Hotels &amp; Activities</a>, and download <a href="${escapeHtml(resolvePartnerUrl(AFFILIATE_LINKS.ekta))}" target="_blank" rel="noopener noreferrer sponsored">EKTA €30,000 Schengen Travel Insurance</a>.</p>
        </section>
      </article>
    `,
  });

  // 9. Tools Hub (/tools)
  const toolsFaq = getFaqSchemaForPage("tools", undefined, true, `${BASE_URL}/tools`);
  routes.push({
    routePath: "/tools",
    canonicalUrl: `${BASE_URL}/tools`,
    title: "Bangladeshi Traveler Utility Tools & Services (2026) | URAL",
    description:
      "Access handy travel utility tools for Bangladeshi outbound tourists: live BDT exchange rates, power plug specifications, packing checklist, and translation aids.",
    imageUrl: defaultOgImage,
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Travel Tools", url: `${BASE_URL}/tools` },
    ],
    extraGraphNodes: [
      serviceSchema({
        url: `${BASE_URL}/tools`,
        idSuffix: "service-travel-tools",
        name: "Bangladesh Outbound Currency, Visa Odds & Flight Delay Claim Tools",
        description:
          "Access handy travel utility tools for Bangladeshi outbound tourists: live BDT exchange rates, power plug specifications, packing checklist, and translation aids.",
        serviceType: "Travel Planning & Flight Compensation Utility",
      }),
      ...(toolsFaq ? [stripContext(toolsFaq)] : []),
    ],
    bodyHtml: `
      <article>
        <h1>Bangladeshi Traveler Utility Tools &amp; Flight Delay Compensation (€600)</h1>
        <p>Convert BDT to USD, SAR, NPR, THB, MYR, SGD, and AED, evaluate tourist visa approval readiness, and claim up to €600 ($650) for delayed or cancelled flights via AirHelp.</p>
        ${renderLandingFaqs("tools-hub-faqs", "Travel planning tool questions for Bangladeshi travelers", toolsFaq)}
      </article>
    `,
  });

  // 10. Sitemap & Pre-Departure Hub (/sitemap)
  const sitemapFaqSchema = getPreDepartureFaqSchema({ url: `${BASE_URL}/sitemap` });
  const sitemapFaq = stripContext(sitemapFaqSchema);
  sitemapFaq["@id"] = `${BASE_URL}/sitemap#faq`;
  sitemapFaq["mainEntityOfPage"] = { "@id": `${BASE_URL}/sitemap#webpage` };

  routes.push({
    routePath: "/sitemap",
    canonicalUrl: `${BASE_URL}/sitemap`,
    title: "Dhaka Airport (DAC) Pre-Departure Checklist, Baggage & Complete 83-Page Sitemap | URAL",
    description:
      "Interactive pre-flight readiness checklist for Bangladeshi travelers departing Dhaka Airport (DAC), cabin & Zamzam baggage rules, Embassy emergency helplines, and complete 83-page directory.",
    imageUrl: defaultOgImage,
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Pre-Departure & Complete Sitemap", url: `${BASE_URL}/sitemap` },
    ],
    extraGraphNodes: [sitemapFaq],
    bodyHtml: `
      <article>
        <h1>Dhaka Airport (DAC) Pre-Departure Readiness Checklist &amp; Complete 83-Page Sitemap</h1>
        <p>Interactive pre-flight checklist for Bangladeshi travelers departing Hazrat Shahjalal International Airport (DAC), cabin &amp; 5L Zamzam baggage rules, Bangladesh Embassy emergency helplines abroad, and direct links to all 41 travel guides.</p>
        ${renderLandingFaqs("sitemap-predeparture-faqs", "Dhaka Airport pre-departure and baggage questions", sitemapFaqSchema)}
      </article>
    `,
  });

  // 11. Contact Hub (/contact)
  const contactFaq = getFaqSchemaForPage("contact", undefined, true, `${BASE_URL}/contact`);
  routes.push({
    routePath: "/contact",
    canonicalUrl: `${BASE_URL}/contact`,
    title: "Contact URAL — Direct Phone & WhatsApp Support",
    description:
      "Connect directly with our flight & visa support desk at +8801784385335. Send us an inquiry for flight packages, visa assistance, and personalized outbound plans.",
    imageUrl: defaultOgImage,
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Contact Us", url: `${BASE_URL}/contact` },
    ],
    extraGraphNodes: [
      serviceSchema({
        url: `${BASE_URL}/contact`,
        idSuffix: "service-visa-assistance",
        name: "Bangladesh Outbound Visa Assistance & BDT Booking Desk",
        description:
          "Visa checklist review, document preparation, and flight/hotel booking in Bangladeshi Taka via bKash or bank transfer for Bangladeshi passport holders.",
        serviceType: "Visa Assistance",
      }),
      ...(contactFaq ? [stripContext(contactFaq)] : []),
    ],
    bodyHtml: `
      <article>
        <h1>Contact URAL — Dhaka Outbound Flight, Umrah &amp; Visa Desk (+8801784385335)</h1>
        <p>Connect directly with our Dhaka support desk via WhatsApp at +8801784385335 for BDT flight &amp; hotel booking, Umrah e-Visa processing, and tourist visa document verification.</p>
        <section>
          <h2>Official URAL Social Media &amp; Community Channels</h2>
          <ul>
            <li><a href="https://web.facebook.com/uraltravelbd/" target="_blank" rel="me noopener noreferrer">Facebook — @uraltravelbd (URAL Travel Bangladesh)</a></li>
            <li><a href="https://www.instagram.com/uraltravelbd/" target="_blank" rel="me noopener noreferrer">Instagram — @uraltravelbd</a></li>
            <li><a href="https://www.linkedin.com/company/ural-travel-bangladesh" target="_blank" rel="me noopener noreferrer">LinkedIn — URAL Travel Bangladesh</a></li>
            <li><a href="https://wa.me/8801784385335" target="_blank" rel="noopener noreferrer">WhatsApp Support Desk — +8801784385335</a></li>
          </ul>
        </section>
        ${renderLandingFaqs("contact-desk-faqs", "Questions about URAL travel support and BDT booking", contactFaq)}
      </article>
    `,
  });

  // 12. Privacy & Cookie Policy (/privacy)
  routes.push({
    routePath: "/privacy",
    canonicalUrl: `${BASE_URL}/privacy`,
    title: "Privacy & Cookie Policy | URAL Travel Intelligence",
    description:
      "Official Privacy and Cookie Policy of URAL Travel Intelligence. Learn how we handle visitor telemetry, Google Tag Manager, GA4 Consent Mode v2, and affiliate disclosures.",
    imageUrl: defaultOgImage,
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Privacy & Cookie Policy", url: `${BASE_URL}/privacy` },
    ],
    extraGraphNodes: [
      webPageSchema({
        url: `${BASE_URL}/privacy`,
        name: "Privacy & Cookie Policy | URAL Travel Intelligence",
        description:
          "Official Privacy and Cookie Policy of URAL Travel Intelligence. Learn how we handle visitor telemetry, Google Tag Manager, GA4 Consent Mode v2, and affiliate disclosures.",
      }),
    ],
    bodyHtml: `
      <article>
        <h1>Privacy &amp; Cookie Policy — URAL Travel Intelligence</h1>
        <p>This Privacy and Cookie Policy outlines how URAL Travel Intelligence collects, processes, and protects visitor data, our Google Consent Mode v2 compliance architecture, and our commercial affiliate partner relationships.</p>
        <section>
          <h2>1. Data Controller &amp; Editorial Identity</h2>
          <p>URAL Travel Intelligence (https://ural-travel.pages.dev) is an independent travel intelligence publisher. We do not sell flight tickets directly or process passenger credit card transactions on our infrastructure.</p>
        </section>
        <section>
          <h2>2. Google Tag Manager &amp; Consent Mode v2</h2>
          <p>We deploy Google Tag Manager (GTM-TMPVL82B) with Consent Mode v2 default denial. Analytical and marketing storage are only activated after explicit user consent.</p>
        </section>
        <section>
          <h2>3. Affiliate Partnerships &amp; FTC Transparency</h2>
          <p>URAL participates in Travelpayouts, Aviasales, Hotellook, Klook, KKday, Airalo, and other affiliate programs. Outbound links may earn referral commissions at zero added cost to visitors.</p>
        </section>
      </article>
    `,
  });

  // 13. Blog Hub (/blog) + 41 Blog Guides (/blog/:slug)
  const blogHubTitle =
    "Travel Guides, Umrah Preparation & Outbound Intelligence for Bangladesh (2026) | URAL Blog";
  const blogHubDesc =
    "Explore verified travel guides built for Bangladeshi travelers: DIY Umrah & Hajj preparation, dual-currency card endorsement, visa checklists, and family trip budgets in BDT.";
  routes.push({
    routePath: "/blog",
    canonicalUrl: `${BASE_URL}/blog`,
    title: blogHubTitle,
    description: blogHubDesc,
    imageUrl: defaultOgImage,
    lcpImageUrl: `/assets/images/blog_editorial_hero_banner_1790429994056-1200.webp`,
    lcpImageSizes: "100vw",
    breadcrumbs: [
      { name: "Home", url: `${BASE_URL}/` },
      { name: "Travel Blog", url: `${BASE_URL}/blog` },
    ],
    extraGraphNodes: [
      collectionPageSchema({
        url: `${BASE_URL}/blog`,
        name: blogHubTitle,
        description: blogHubDesc,
        items: BLOG_DATA.map((p) => ({
          name: p.title,
          url: `${BASE_URL}/blog/${p.slug}`,
          description: p.summary,
        })),
      }),
    ],
    bodyHtml: `
      <article>
        <h1>${escapeHtml(blogHubTitle)}</h1>
        <p>${escapeHtml(blogHubDesc)}</p>
        <ul>
          ${BLOG_DATA.map(
            (p) =>
              `<li><a href="/blog/${p.slug}">${escapeHtml(p.title)}</a> — ${escapeHtml(p.summary)}</li>`
          ).join("\n")}
        </ul>
      </article>
    `,
  });

  for (const post of BLOG_DATA) {
    const postUrl = `${BASE_URL}/blog/${post.slug}`;
    const postImageFileName =
      BLOG_IMAGE_MAP[post.slug] || "ural_hero_bg_1781543111624.jpg";
    const postLcpImageUrl = `/assets/images/${postImageFileName.replace(/\.jpg$/, "-1200.webp")}`;
    const postImgUrl = `${BASE_URL}/img/blog/${post.slug}.jpg`;
    const title = `${post.title} | URAL Travel Blog`;
    const description = post.summary;

    const extraNodes: Record<string, unknown>[] = [
      articleSchema({
        url: postUrl,
        headline: post.title,
        description: post.summary,
        slug: post.slug,
        datePublished: post.date,
        dateModified: post.date,
        authorRaw: post.author,
        articleSection: post.category,
        imageUrl: postImgUrl,
      }),
    ];

    const planLinks: { text: string; href: string }[] = [];
    const relatedGuideLinks: { text: string; href: string }[] = [];
    const usedBlogLinkHrefs = new Set<string>();

    for (const link of post.internalLinks || []) {
      const href = normalizeInternalHref(link.path);
      if (!href.startsWith("/")) continue;
      if (href.startsWith("/blog/")) {
        if (href !== `/blog/${post.slug}` && !usedBlogLinkHrefs.has(href)) {
          relatedGuideLinks.push({ text: link.text, href });
          usedBlogLinkHrefs.add(href);
        }
      } else if (!planLinks.some((existing) => existing.href === href)) {
        planLinks.push({ text: link.text, href });
      }
    }

    for (const relatedPost of getRelatedBlogPosts(post, BLOG_DATA, 4)) {
      const href = `/blog/${relatedPost.slug}`;
      if (!usedBlogLinkHrefs.has(href)) {
        relatedGuideLinks.push({ text: relatedPost.title, href });
        usedBlogLinkHrefs.add(href);
      }
    }

    const planLinksHtml = planLinks.length
      ? `<section aria-labelledby="plan-your-trip-links"><h2 id="plan-your-trip-links">Plan your trip</h2><ul>${planLinks
          .map((link) => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.text)}</a></li>`)
          .join("\n")}</ul></section>`
      : "";
    const relatedGuidesHtml = relatedGuideLinks.length
      ? `<section aria-labelledby="related-travel-guides"><h2 id="related-travel-guides">Related Bangladesh travel guides</h2><ul>${relatedGuideLinks
          .map((link) => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.text)}</a></li>`)
          .join("\n")}</ul></section>`
      : "";
    const radicalPlacement = RADICAL_STORAGE_BLOG_PLACEMENTS[post.slug];
    const radicalStorageHtml = radicalPlacement
      ? `<section aria-labelledby="luggage-storage-tip"><h2 id="luggage-storage-tip">${escapeHtml(radicalPlacement.headlineEn)}</h2><p>${escapeHtml(radicalPlacement.bodyBeforeAnchorEn)}<a href="${escapeHtml(resolvePartnerUrl(AFFILIATE_LINKS.radicalStorage))}" target="_blank" rel="noopener noreferrer sponsored">${escapeHtml(radicalPlacement.anchorTextEn)}</a>${escapeHtml(radicalPlacement.bodyAfterAnchorEn)} <a href="${escapeHtml(resolvePartnerUrl(AFFILIATE_LINKS.radicalStorage))}" target="_blank" rel="noopener noreferrer sponsored">${escapeHtml(radicalPlacement.buttonLabelEn)}</a>.</p></section>`
      : "";
    const multiPlacement = MULTI_PARTNER_BLOG_PLACEMENTS[post.slug];
    const multiPartnerHtml = multiPlacement
      ? `<section aria-labelledby="partner-travel-tools"><h2 id="partner-travel-tools">${escapeHtml(multiPlacement.headlineEn)}</h2><p>${escapeHtml(multiPlacement.bodyBeforeAnchorEn)}<a href="${escapeHtml(resolvePartnerUrl(AFFILIATE_LINKS[multiPlacement.primaryPartner]))}" target="_blank" rel="noopener noreferrer sponsored">${escapeHtml(multiPlacement.anchorTextEn)}</a>${escapeHtml(multiPlacement.bodyAfterAnchorEn)} <a href="${escapeHtml(resolvePartnerUrl(AFFILIATE_LINKS[multiPlacement.primaryPartner]))}" target="_blank" rel="noopener noreferrer sponsored">${escapeHtml(multiPlacement.primaryButtonEn)}</a>${
          multiPlacement.secondaryPartner && multiPlacement.secondaryButtonEn
            ? ` · <a href="${escapeHtml(resolvePartnerUrl(AFFILIATE_LINKS[multiPlacement.secondaryPartner]))}" target="_blank" rel="noopener noreferrer sponsored">${escapeHtml(multiPlacement.secondaryButtonEn)}</a>`
            : ""
        }.</p></section>`
      : "";

    routes.push({
      routePath: `/blog/${post.slug}`,
      canonicalUrl: postUrl,
      title,
      description,
      imageUrl: postImgUrl,
      lcpImageUrl: postLcpImageUrl,
      lcpImageSizes: "(max-width: 767px) 100vw, 840px",
      breadcrumbs: [
        { name: "Home", url: `${BASE_URL}/` },
        { name: "Travel Blog", url: `${BASE_URL}/blog` },
        { name: post.title, url: postUrl },
      ],
      extraGraphNodes: extraNodes,
      lastmod: toIsoDate(post.date),
      bodyHtml: `
        <article>
          <h1>${escapeHtml(post.title)}</h1>
          <p><em>By ${escapeHtml(post.author)} · Published ${escapeHtml(post.date)} · ${escapeHtml(post.readTime)}</em></p>
          <p>${escapeHtml(post.summary)}</p>
          ${(() => {
            // English body now lives in the lazily-loaded BLOG_CONTENT map
            // (keyed by slug); fall back to any inline content for safety.
            const body = post.content ?? BLOG_CONTENT[post.slug] ?? "";
            return sanitizeExpiredPromoText(String(body))
              .split("\n\n")
              .map((para) => `<p>${escapeHtml(sanitizeExpiredPromoText(String(para)))}</p>`)
              .join("\n");
          })()}
          ${radicalStorageHtml}
          ${multiPartnerHtml}
          ${planLinksHtml}
          ${relatedGuidesHtml}
        </article>
      `,
    });
  }

  return routes;
}


// ===========================================================================
// Bengali (/bn) route generation
//
// Bengali is a real, crawlable locale sub-directory: /bn/umrah mirrors /umrah.
// Each Bengali route is a twin of its English counterpart carrying:
//   - a Bengali title/meta description/H1 (src/data/bengaliContent.ts)
//   - a genuinely Bengali body built from the localized data — an English-bodied
//     page on a bn-BD URL would be a cloaking/quality problem
//   - a self-referential canonical (/bn/... never /umrah)
//   - en-bd / bn-bd / x-default hreflang tags whose three values are identical
//     on both members of the pair (valid reciprocal return tags)
//
// Coverage (src/data/bengaliContent.ts): 41/41 blogs, 6 flights, 6 hotels,
// 6 visas, 6 trip-cost guides and the Hajj/Umrah FAQs. Hub and static pages use
// the hand-written BENGALI_SEO_COPY. /destinations/* has no Bengali data yet, so
// no /bn route is generated for it and its hreflang cluster is withheld — see
// DEFERRED_BN_GROUPS in src/utils/localeRoutes.ts.
// ===========================================================================

/** Bengali labels for the trip-cost line items (names are English in the data). */
const BN_COST_CATEGORY_LABELS: Record<string, string> = {
  "Flights from Dhaka": "ঢাকা থেকে ফ্লাইট",
  "Flights from Dhaka (Roundtrip)": "ঢাকা থেকে ফ্লাইট (রাউন্ডট্রিপ)",
  "Accommodations (per night)": "থাকার খরচ (প্রতি রাত)",
  "Accommodations (3 Nights Total)": "থাকার খরচ (৩ রাত)",
  "Hotels / Guesthouses (4 Nights)": "হোটেল / গেস্টহাউস (৪ রাত)",
  "Daily Meals & Street Food": "দৈনিক খাবার ও স্ট্রিট ফুড",
  "Daily Meals & Satay Feasts": "দৈনিক খাবার ও সাটে",
  "Daily Meals & Creek Shawarma": "দৈনিক খাবার ও শাওয়ারমা",
  "Halal Hawker Centres & Meals": "হালাল হকার সেন্টার ও খাবার",
  "Meals & Beachfront Dining": "খাবার ও বিচফ্রন্ট ডাইনিং",
  "Intercity Transit / Taxis": "আন্তঃনগর যাতায়াত / ট্যাক্সি",
  "BTS/MRT Trains & Grab Rides": "BTS/MRT ট্রেন ও গ্র্যাব",
  "MRT SimplyGo & Airport Transit": "MRT SimplyGo ও এয়ারপোর্ট ট্রান্সফার",
  "Metro Nol card & RTA Taxis": "মেট্রো নল কার্ড ও RTA ট্যাক্সি",
  "LRT/MRT Trains & Grab Taxis": "LRT/MRT ট্রেন ও গ্র্যাব ট্যাক্সি",
  "Attraction Tickets & Guides": "দর্শনীয় স্থানের টিকিট ও গাইড",
  "Sentosa, Gardens & Visa Fee": "সেন্তোসা, গার্ডেনস ও ভিসা ফি",
  "Genting / Attractions Tickets": "গেন্টিং / দর্শনীয় স্থানের টিকিট",
  "Desert Safaris & Khalifa tickets": "ডেজার্ট সাফারি ও খলিফা টাওয়ার টিকিট",
  "Shopping & Market Purchases": "শপিং ও মার্কেট কেনাকাটা",
  "Snorkeling, Sandbank & Resort Tours": "স্নরকেলিং, স্যান্ডব্যাংক ও রিসোর্ট ট্যুর",
  "Speedboat / Ferry Transfers": "স্পিডবোট / ফেরি ট্রান্সফার",
};

function bnSection(heading: string, inner: string): string {
  return `<section><h2>${escapeHtml(heading)}</h2>${inner}</section>`;
}

function bnFactList(rows: { label: string; value?: string }[]): string {
  const items = rows
    .filter((row) => row.value && String(row.value).trim())
    .map(
      (row) =>
        `<li><strong>${escapeHtml(row.label)}:</strong> ${escapeHtml(String(row.value))}</li>`
    )
    .join("");
  return `<ul>${items}</ul>`;
}

/** Bengali link list. Paths without a Bengali counterpart are dropped (no 404s). */
function bnLinkList(
  heading: string,
  links: { label: string; path: string }[]
): string {
  const items = links
    .filter((link) => link.label && hasBengaliCounterpart(link.path))
    .map(
      (link) =>
        `<li><a href="${escapeHtml(toBengaliPath(link.path))}">${escapeHtml(link.label)}</a></li>`
    )
    .join("");
  return items ? bnSection(heading, `<ul>${items}</ul>`) : "";
}

function bnFaqList(
  heading: string,
  faqs: { question: string; answer: string }[]
): string {
  if (!faqs.length) return "";
  return bnSection(
    heading,
    faqs
      .map(
        (faq) =>
          `<h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p>`
      )
      .join("")
  );
}

/** Turns the Bengali blog body (plain text with blank-line paragraphs) into HTML. */
function bnParagraphs(text: string): string {
  return String(text || "")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n/g, " ").replace(/\*\*/g, "").trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

/** Directory section: links to the Bengali twins of the given English paths. */
function bnDirectory(heading: string, englishPaths: string[]): string {
  const links = englishPaths
    .map((path) => ({ path, copy: getBengaliRouteSeo(path) }))
    .filter((entry) => entry.copy)
    .map((entry) => ({ label: entry.copy!.h1, path: entry.path }));
  return bnLinkList(heading, links);
}

/** Cross-links to the same country's flight/hotel/visa/cost Bengali pages. */
function bnCountryCrossLinks(
  country: string,
  currentEnglishPath: string
): { label: string; path: string }[] {
  const links: { label: string; path: string }[] = [];
  const flight = FLIGHTS_DATA.find((item) => item.country === country);
  const hotel = HOTELS_DATA.find((item) => item.country === country);
  const visa = VISA_DATA.find((item) => item.country === country);
  const cost = TRIP_COSTS_DATA.find((item) => item.country === country);
  const push = (path: string, label: string) => {
    if (path !== currentEnglishPath) links.push({ label, path });
  };
  if (flight) push(`/flights/${flight.id}`, "ঢাকা থেকে ফ্লাইট: সময়, এয়ারলাইন্স ও BDT ভাড়া");
  if (hotel) push(`/hotels/${hotel.id}`, "হোটেল এলাকা, হালাল খাবার ও রুম ভাড়া");
  if (visa) push(`/visa/${visa.id}`, "ভিসার নিয়ম, ডকুমেন্ট চেকলিস্ট ও ফি");
  if (cost) push(`/costs/${cost.id}`, "৫ দিনের সম্পূর্ণ BDT খরচের হিসাব");
  return links;
}

/** Bengali crawl body for one route — always ends with internal links. */
function buildBengaliBody(
  englishPath: string,
  h1: string,
  description: string
): string {
  const segments = englishPath.split("/").filter(Boolean);
  const [group, id] = segments;
  const parts: string[] = [
    `<h1>${escapeHtml(h1)}</h1>`,
    `<p>${escapeHtml(description)}</p>`,
  ];
  const englishPathsIn = (prefix: string, ids: string[]) =>
    ids.map((value) => `${prefix}/${value}`);

  if (group === "blog" && id) {
    const override = BENGALI_BLOG_OVERRIDES[id];
    if (override) {
      parts.push(bnParagraphs(override.content));
      const internal = (override.internalLinks || [])
        .filter((link) => hasBengaliCounterpart(link.path))
        .map((link) => ({ label: link.text, path: link.path }));
      const related = bnLinkList("সম্পর্কিত গাইড", internal);
      if (related) parts.push(related);
    }
    return `<article>${parts.join("")}</article>`;
  }

  if (group === "flights") {
    if (id) {
      const route = getLocalizedFlights("bn").find((item) => item.id === id);
      if (route) {
        parts.push(
          bnFactList([
            { label: "ভাড়ার পরিসীমা (রাউন্ডট্রিপ)", value: route.priceRangeBdt },
            { label: "যাত্রার সময়", value: route.flightDuration || route.duration },
            { label: "এয়ারলাইন্স", value: route.airlines.join(", ") },
            { label: "বুকিংয়ের উপযুক্ত সময়", value: route.bestTimeToBook },
            { label: "ভিসা প্রয়োজন", value: route.visaRequirement },
          ])
        );
        parts.push(
          bnLinkList(
            "এই ট্রিপের বাকি পরিকল্পনা",
            bnCountryCrossLinks(route.country, englishPath)
          )
        );
      }
      const guidance = bnGuidanceFor(group);
      if (guidance.length) {
        parts.push(
          bnSection(
            "ব্যবহারিক পরামর্শ",
            guidance.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")
          )
        );
      }

    } else {
      parts.push(
        bnDirectory(
          "সব ফ্লাইট রুট গাইড",
          englishPathsIn("/flights", FLIGHTS_DATA.map((route) => route.id))
        )
      );
    }
    return `<article>${parts.join("")}</article>`;
  }

  if (group === "hotels") {
    if (id) {
      const hotel = getLocalizedHotels("bn").find((item) => item.id === id);
      if (hotel) {
        parts.push(
          bnFactList([{ label: "শহর", value: hotel.city }, { label: "দেশ", value: hotel.country }])
        );
        const stays = hotel.hotels
          .slice(0, 6)
          .map(
            (item) =>
              `<li><strong>${escapeHtml(item.name)}</strong> — BDT ${item.priceBdt}/রাত (${item.stars}★, ${escapeHtml(item.neighborhood)})</li>`
          )
          .join("");
        if (stays) parts.push(bnSection("কোথায় থাকবেন", `<ul>${stays}</ul>`));
        parts.push(
          bnLinkList(
            "এই ট্রিপের বাকি পরিকল্পনা",
            bnCountryCrossLinks(hotel.country, englishPath)
          )
        );
      }
      const guidance = bnGuidanceFor(group);
      if (guidance.length) {
        parts.push(
          bnSection(
            "ব্যবহারিক পরামর্শ",
            guidance.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")
          )
        );
      }

    } else {
      parts.push(
        bnDirectory(
          "সব হোটেল গাইড",
          englishPathsIn("/hotels", HOTELS_DATA.map((hotel) => hotel.id))
        )
      );
    }
    return `<article>${parts.join("")}</article>`;
  }

  if (group === "visa") {
    if (id) {
      const visa = getLocalizedVisas("bn").find((item) => item.id === id);
      if (visa) {
        parts.push(
          bnFactList([
            { label: "ভিসার ধরন", value: visa.requirementType },
            { label: "আনুমানিক খরচ", value: visa.costBdt },
            { label: "প্রসেসিং সময়", value: visa.processingTime },
          ])
        );
        parts.push(
          bnLinkList(
            "এই ট্রিপের বাকি পরিকল্পনা",
            bnCountryCrossLinks(visa.country, englishPath)
          )
        );
      }
      const guidance = bnGuidanceFor(group);
      if (guidance.length) {
        parts.push(
          bnSection(
            "ব্যবহারিক পরামর্শ",
            guidance.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")
          )
        );
      }

    } else {
      parts.push(
        bnDirectory(
          "সব ভিসা গাইড",
          englishPathsIn("/visa", VISA_DATA.map((visa) => visa.id))
        )
      );
    }
    return `<article>${parts.join("")}</article>`;
  }

  if (group === "costs") {
    if (id) {
      const cost = getLocalizedCosts("bn").find((item) => item.id === id);
      if (cost) {
        const rows = cost.categories
          .map((category) => {
            const label =
              BN_COST_CATEGORY_LABELS[category.name] || category.name;
            return `<li><strong>${escapeHtml(label)}:</strong> BDT ${category.lowBdt.toLocaleString(
              "en-US"
            )} – ${category.midBdt.toLocaleString("en-US")} (মিড-রেঞ্জ) – ${category.highBdt.toLocaleString(
              "en-US"
            )}</li>`;
          })
          .join("");
        if (rows) parts.push(bnSection("খরচের খাতভিত্তিক হিসাব", `<ul>${rows}</ul>`));
        parts.push(
          bnLinkList(
            "এই ট্রিপের বাকি পরিকল্পনা",
            bnCountryCrossLinks(cost.country, englishPath)
          )
        );
      }
      const guidance = bnGuidanceFor(group);
      if (guidance.length) {
        parts.push(
          bnSection(
            "ব্যবহারিক পরামর্শ",
            guidance.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")
          )
        );
      }

    } else {
      parts.push(
        bnDirectory(
          "সব খরচের গাইড",
          englishPathsIn("/costs", TRIP_COSTS_DATA.map((cost) => cost.id))
        )
      );
    }
    return `<article>${parts.join("")}</article>`;
  }

  if (group === "umrah") {
    parts.push(
      bnFaqList("উমরাহ ও হজ: সাধারণ প্রশ্ন", getLocalizedHajjFaqs("bn"))
    );
    parts.push(
      bnLinkList("সম্পর্কিত গাইড", [
        { label: "ঢাকা থেকে জেদ্দা ও মদিনার ফ্লাইট", path: "/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost" },
        { label: "নেপাল ভিসা (ফ্রি Visa on Arrival)", path: "/visa/nepal-visa" },
      ])
    );
    return `<article>${parts.join("")}</article>`;
  }

  // Home + static/hub pages: Bengali intro plus a directory of the main hubs.
  const hubLinks = [
    { label: "ফ্লাইট গাইড", path: "/flights" },
    { label: "হোটেল গাইড", path: "/hotels" },
    { label: "ভিসা গাইড", path: "/visa" },
    { label: "ভ্রমণ খরচ", path: "/costs" },
    { label: "উমরাহ প্ল্যানার", path: "/umrah" },
    { label: "৪১টি ট্রাভেল ব্লগ", path: "/blog" },
  ];
  parts.push(bnLinkList("কোথা থেকে শুরু করবেন", hubLinks));
  return `<article>${parts.join("")}</article>`;
}

/**
 * Hub/static pages have no data-driven Bengali metadata, so their copy comes
 * from BENGALI_SEO_COPY (src/utils/seoCopy.ts). Returns null when the path has
 * no Bengali copy at all — those routes are simply not localised yet.
 */
function bengaliStaticCopy(
  englishPath: string
): { title: string; description: string; h1: string } | null {
  const copy = BENGALI_SEO_COPY[englishPath];
  if (!copy) return null;
  return {
    title: copy.title,
    description: copy.description,
    h1: copy.title.replace(/\s*\|\s*URAL\s*$/i, "").trim(),
  };
}

/**
 * Bengali long-form sections per route group.
 *
 * The English detail pages carry hand-written boilerplate ("How to compare
 * fares…", "Booking window…"). Machine-translating those walls of text would
 * produce exactly the thin, duplicated content the SEO audit warns about, so the
 * Bengali pages get their own concise guidance instead — written once per group,
 * factual, and with no claims that the data does not support.
 */
function bnGuidanceFor(group: string): string[] {
  if (group === "flights") {
    return [
      "টিকিট কেনার আগে একই যাত্রার তারিখ, যাত্রীসংখ্যা, কেবিন ও ব্যাগেজ ভাতা রেখে একাধিক এয়ারলাইন্স ও এজেন্সির দাম তুলনা করুন। শুধু হেডলাইন ভাড়া নয়—বুকিং ফি, পেমেন্ট চার্জ ও সিট সিলেকশন ফি যোগ করার পর চূড়ান্ত মোট কত পড়ছে সেটাই আসল দাম।",
      "কানেক্টিং ফ্লাইটে সময় কম মনে হলেও ট্রান্সফার এয়ারপোর্ট, ব্যাগেজ এক টিকিটে চেক-থ্রু হবে কি না, আর দেরি হলে দায় কার—এগুলো আগে নিশ্চিত করুন। বুকিংয়ের পরে এয়ারলাইন্সের নিজস্ব নিয়মই চূড়ান্ত, তাই নন-রিফান্ডেবল টিকিট কাটার আগে পরিবর্তন ও বাতিলের শর্ত পড়ে নিন।",
      "পাসপোর্টের তথ্য টিকিটের সাথে হুবহু মিলিয়ে নিন এবং গন্তব্যের সর্বশেষ ভিসা/এন্ট্রি নিয়ম সংশ্লিষ্ট অফিসিয়াল দূতাবাস বা ইমিগ্রেশন ওয়েবসাইট থেকে যাচাই করুন। ভিসার নিয়ম বদলায়—এই গাইড শুরুর পয়েন্ট, চূড়ান্ত প্রমাণ নয়।",
    ];
  }
  if (group === "hotels") {
    return [
      "রুম বুক করার আগে এলাকার নিরাপত্তা, মেট্রো বা স্টেশনের দূরত্ব এবং আশপাশে হালাল খাবারের ব্যবস্থা আছে কি না দেখে নিন। ঢাকার বাইরে বাজেট হোটেলে অবস্থান (location) সাধারণত রুমের সাইজের চেয়ে বেশি গুরুত্বপূর্ণ।",
      "চেক-ইন ও চেক-আউটের সময়, বাতিলকরণের শর্ত এবং অতিরিক্ত রিসোর্ট ফি বা ট্যাক্স আলাদা করে পড়ুন—বুকিং সাইটের যে দাম দেখছেন তার সাথে চূড়ান্ত বিল সবসময় এক নাও হতে পারে।",
      "মার্কিন ডলারে প্রি-পেইড বুকিং করার আগে কার্ডে ইন্টারন্যাশনাল লেনদেন চালু ও ৩ডি-সিকিউর অ্যাকটিভ করা আছে কি না নিশ্চিত করুন; অনেক বুকিং নিশ্চিত হয়েও কার্ড ডিক্লাইনের কারণে বাতিল হয়ে যায়।",
    ];
  }
  if (group === "visa") {
    return [
      "আবেদন করার আগে পাসপোর্টের মেয়াদ (সাধারণত যাত্রার পর অন্তত ৬ মাস), দুই কপি ছবি, ব্যাংক স্টেটমেন্ট, এনওসি/ট্রেড লাইসেন্স এবং ট্রাভেল ইনস্যুরেন্স—এই ডকুমেন্টগুলো প্রস্তুত রাখুন। ফরম্যাট বা মেয়াদ সংক্রান্ত নিয়ম দেশভেদে আলাদা, তাই অফিসিয়াল সাইটের সর্বশেষ নির্দেশনা মানুন।",
      "ভিসা ফি ও সার্ভিস চার্জের পাশাপাশি প্রসেসিং সময় হিসাব করে টিকিটের তারিখ ঠিক করুন। অনেক ক্ষেত্রে ভিসা না পাওয়া পর্যন্ত নন-রিফান্ডেবল টিকিট কেনা ঝুঁকিপূর্ণ।",
      "এই পাতার তথ্য ২০২৬ সালের যাচাইকৃত সারসংক্ষেপ। নিয়ম বা ফি পরিবর্তিত হলে সংশ্লিষ্ট দেশের ইমিগ্রেশন বা দূতাবাসের ওয়েবসাইটই চূড়ান্ত সূত্র হিসেবে বিবেচ্য।",
    ];
  }
  if (group === "costs") {
    return [
      "খরচের হিসাবটি জনপ্রতি এবং ন্যূনতম থেকে মিড-রেঞ্জ ধরে করা; সিজন, এয়ারলাইন্সের ভাড়া ও রুমের ধরন অনুযায়ী চূড়ান্ত বাজেট ১৫–২৫% ওঠানামা করতে পারে।",
      "বাজেটে জরুরি খরচের জন্য ১০% আলাদা রাখুন—এয়ারপোর্ট ট্যাক্সি, অতিরিক্ত ব্যাগেজ, রিসোর্ট ফি বা অসুস্থতার মতো খরচ প্রায়ই হিসাবের বাইরে থাকে।",
      "পরিবারের সঙ্গে ভ্রমণ করলে ফ্লাইট ও থাকার খরচে গ্রুপ ডিসকাউন্ট, আর অফ-সিজনে হোটেলে উল্লেখযোগ্য ছাড় পাওয়া যায়—তারিখ নমনীয় থাকলে খরচ অনেক কমতে পারে।",
    ];
  }
  return [];
}

/** Builds the Bengali twin of every English route that has Bengali content. */
function buildBengaliRoutes(enRoutes: PrerenderRoute[]): PrerenderRoute[] {
  const bnRoutes: PrerenderRoute[] = [];
  for (const en of enRoutes) {
    const englishPath = toEnglishBasePath(en.routePath);
    if (!hasBengaliCounterpart(englishPath)) continue;
    // Precedence, mirrored exactly in src/App.tsx so the prerendered <title>
    // and the client-rendered one can never drift:
    //   1. hand-written Bengali SERP copy (BENGALI_SEO_COPY — all 35 localised
    //      hubs and detail guides, written for search intent)
    //   2. copy generated from the Bengali data (flights/hotels/visa/costs/blogs)
    //   3. nothing -> no Bengali page for this route
    // The generated H1 is preferred for the on-page heading in both cases.
    const generated = getBengaliRouteSeo(englishPath);
    const handWritten = bengaliStaticCopy(englishPath);
    if (!generated && !handWritten) continue;
    const copy = {
      title: handWritten?.title ?? generated!.title,
      description: handWritten?.description ?? generated!.description,
      h1: generated?.h1 ?? handWritten!.h1,
    };

    const bnPath = toBengaliPath(englishPath);
    const canonicalUrl = `${BASE_URL}${bnPath === "/bn" ? "/bn/" : bnPath}`;
    const bnHomeUrl = `${BASE_URL}/bn/`;

    const breadcrumbs = en.breadcrumbs.map((crumb, index) => {
      const isLast = index === en.breadcrumbs.length - 1;
      if (isLast) return { name: copy.h1, url: canonicalUrl };
      return {
        name: BN_BREADCRUMB_LABELS[crumb.name] || crumb.name,
        url: index === 0 ? bnHomeUrl : localizePublicSiteUrl(crumb.url, "bn"),
      };
    });

    const extraGraphNodes: Record<string, unknown>[] = [];
    const segments = englishPath.split("/").filter(Boolean);
    if (segments[0] === "blog" && segments[1]) {
      const localizedPost = getLocalizedBlogs("bn").find(
        (item) => item.slug === segments[1]
      );
      const sourcePost = BLOG_DATA.find((item) => item.slug === segments[1]);
      extraGraphNodes.push(
        articleSchema({
          url: canonicalUrl,
          headline: copy.h1,
          description: copy.description,
          slug: segments[1],
          datePublished: sourcePost?.date,
          dateModified: sourcePost?.date,
          authorRaw: sourcePost?.author,
          articleSection: localizedPost?.category,
          inLanguage: "bn-BD",
        })
      );
    } else if (englishPath === "/umrah") {
      const bnUmrahFaq = stripContext(
        generateFAQSchema(getLocalizedHajjFaqs("bn"), {
          url: canonicalUrl,
          name: copy.title,
        })
      );
      bnUmrahFaq["@id"] = `${canonicalUrl}#faq`;
      bnUmrahFaq["mainEntityOfPage"] = { "@id": `${canonicalUrl}#webpage` };
      bnUmrahFaq["inLanguage"] = "bn-BD";
      extraGraphNodes.push(bnUmrahFaq);
    } else if (englishPath === "/flights") {
      extraGraphNodes.push(
        collectionPageSchema({
          url: canonicalUrl,
          name: copy.title,
          description: copy.description,
          inLanguage: "bn-BD",
          items: getLocalizedFlights("bn").map((r) => ({
            name:
              getBengaliSeoCopy(`/flights/${r.id}`)?.title ||
              `${r.from} থেকে ${r.to} ফ্লাইট গাইড`,
            url: siteUrl(`/flights/${r.id}`, "bn"),
            description: r.quickAnswer,
          })),
        })
      );
    } else if (englishPath === "/hotels") {
      extraGraphNodes.push(
        collectionPageSchema({
          url: canonicalUrl,
          name: copy.title,
          description: copy.description,
          inLanguage: "bn-BD",
          items: getLocalizedHotels("bn").map((h) => ({
            name:
              getBengaliSeoCopy(`/hotels/${h.id}`)?.title ||
              `${h.city} হোটেল গাইড (${h.country})`,
            url: siteUrl(`/hotels/${h.id}`, "bn"),
            description: h.quickAnswer,
          })),
        })
      );
    } else if (englishPath === "/visa") {
      extraGraphNodes.push(
        collectionPageSchema({
          url: canonicalUrl,
          name: copy.title,
          description: copy.description,
          inLanguage: "bn-BD",
          items: getLocalizedVisas("bn").map((v) => ({
            name:
              getBengaliSeoCopy(`/visa/${v.id}`)?.title ||
              `${v.country} ভিসা গাইড`,
            url: siteUrl(`/visa/${v.id}`, "bn"),
            description: v.quickAnswer,
          })),
        })
      );
    } else if (englishPath === "/costs") {
      extraGraphNodes.push(
        collectionPageSchema({
          url: canonicalUrl,
          name: copy.title,
          description: copy.description,
          inLanguage: "bn-BD",
          items: getLocalizedCosts("bn").map((c) => ({
            name:
              getBengaliSeoCopy(`/costs/${c.id}`)?.title ||
              `${c.country} ভ্রমণ খরচ (BDT)`,
            url: siteUrl(`/costs/${c.id}`, "bn"),
            description: c.quickAnswer,
          })),
        })
      );
    } else if (englishPath === "/blog") {
      extraGraphNodes.push(
        collectionPageSchema({
          url: canonicalUrl,
          name: copy.title,
          description: copy.description,
          inLanguage: "bn-BD",
          items: getLocalizedBlogs("bn").map((p) => ({
            name: p.title,
            url: siteUrl(`/blog/${p.slug}`, "bn"),
            description: p.summary,
          })),
        })
      );
    } else if (englishPath === "/tools") {
      extraGraphNodes.push(
        serviceSchema({
          url: canonicalUrl,
          idSuffix: "service-travel-tools",
          name: "Bangladesh Outbound Currency, Visa Odds & Flight Delay Claim Tools",
          description: copy.description,
          serviceType: "Travel Planning & Flight Compensation Utility",
        })
      );
    } else if (englishPath === "/contact") {
      extraGraphNodes.push(
        serviceSchema({
          url: canonicalUrl,
          idSuffix: "service-visa-assistance",
          name: "Bangladesh Outbound Visa Assistance & BDT Booking Desk",
          description:
            "Visa checklist review, document preparation, and flight/hotel booking in Bangladeshi Taka via bKash or bank transfer for Bangladeshi passport holders.",
          serviceType: "Visa Assistance",
        })
      );
    } else if (englishPath === "/experiences") {
      extraGraphNodes.push(
        productOfferSchema({
          url: canonicalUrl,
          idSuffix: "product-airalo-saudi-esim",
          name: "Saudi Arabia Travel eSIM for Umrah (5 GB / 30 days)",
          description:
            "Prepaid data eSIM covering Makkah, Madinah and Jeddah, activated before departure from Dhaka.",
          sku: "airalo-saudi-5gb-30d",
          brandName: "Airalo",
          priceBdt: 2100,
        }),
        productOfferSchema({
          url: canonicalUrl,
          idSuffix: "product-tiqets-paris-pass",
          name: "Paris Louvre, Eiffel Tower & Seine River Skip-the-Line Bundle",
          description:
            "Official mobile-entry attraction bundle for Bangladeshi Schengen visa travelers visiting Paris.",
          sku: "tiqets-paris-bundle-2026",
          brandName: "Tiqets",
          priceBdt: 9800,
        })
      );
    } else if (englishPath === "/privacy") {
      extraGraphNodes.push(
        webPageSchema({
          url: canonicalUrl,
          name: copy.title,
          description: copy.description,
          inLanguage: "bn-BD",
        })
      );
    } else if (
      segments.length === 2 &&
      ["flights", "hotels", "visa", "costs"].includes(segments[0])
    ) {
      for (const node of en.extraGraphNodes) {
        if (node["@type"] !== "FAQPage") {
          extraGraphNodes.push(node);
        }
      }
    }

    bnRoutes.push({
      routePath: bnPath,
      canonicalUrl,
      locale: "bn",
      title: copy.title,
      description: copy.description,
      imageUrl: en.imageUrl,
      breadcrumbs,
      extraGraphNodes,
      bodyHtml: buildBengaliBody(englishPath, copy.h1, copy.description),
      lastmod: en.lastmod,
    });
  }
  return bnRoutes;
}

function applySharedSeoCopy(
  routes: PrerenderRoute[],
  locale: "en" | "bn" = "en"
) {
  for (const route of routes) {
    const seoCopy = getSeoCopy(
      route.routePath,
      route.title,
      route.description,
      locale
    );
    route.title = seoCopy.title;
    route.description = seoCopy.description;
    // Strip trailing "| URAL" / "| URAL Blog" brand suffixes from prerendered H1s
    // so static HTML matches the clean React detail-page headings.
    route.bodyHtml = route.bodyHtml.replace(
      /<h1([^>]*)>([\s\S]*?)<\/h1>/i,
      (_match, attrs, inner) => `<h1${attrs}>${stripBrandSuffix(inner)}</h1>`
    );

    for (const node of route.extraGraphNodes) {
      const type = node["@type"];
      if (type === "WebPage" || type === "CollectionPage") {
        node.name = route.title;
        node.description = route.description;
      }
    }
  }
}

function generateSitemapXml(routes: PrerenderRoute[]) {
  // Weak crawl-priority hints. The homepage and the five category hubs are the
  // freshest, most important entry points; individual guides and blog posts
  // change less often. These are hints only — Google largely ignores priority,
  // but a truthful changefreq/priority costs nothing and never hurts.
  // Priority/changefreq are computed on the English base path so a Bengali twin
  // inherits the same hint as its English counterpart.
  const isHub = (p: string) =>
    p === "/" ||
    ["/flights", "/hotels", "/visa", "/destinations", "/costs", "/blog"].includes(
      p
    );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map((r) => {
    const englishPath = toEnglishBasePath(r.routePath);
    const lastmod = r.lastmod || CONTENT_DATA_LASTMOD;
    const hub = isHub(englishPath);
    const changefreq = hub ? "weekly" : "monthly";
    const priority = englishPath === "/" ? "1.0" : hub ? "0.9" : "0.7";
    // Reciprocal hreflang annotations, emitted only when the twin page exists.
    // The three values are derived from the pair, so both members of a pair
    // publish byte-identical annotations (a one-sided cluster is invalid).
    const alternates =
      r.enUrl && r.bnUrl
        ? `\n    <xhtml:link rel="alternate" hreflang="en-bd" href="${escapeXml(r.enUrl)}" />` +
          `\n    <xhtml:link rel="alternate" hreflang="bn-bd" href="${escapeXml(r.bnUrl)}" />` +
          `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(r.enUrl)}" />`
        : "";
    return `  <url>
    <loc>${escapeXml(r.canonicalUrl)}</loc>${alternates}
    <lastmod>${escapeXml(lastmod)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), xml, "utf8");
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(path.join(DIST_DIR, "sitemap.xml"), xml, "utf8");
  }
}

function generateRssXml() {
  const rssItems = BLOG_DATA.map((post) => {
    const postUrl = `${BASE_URL}/blog/${post.slug}`;
    // toIsoDate already returns a full ISO-8601 timestamp (e.g.
    // "2026-10-03T09:00:00+06:00"). Appending a time again produced
    // "...T09:00:00+06:00T06:00:00+06:00", so `new Date(...)` was NaN and every
    // <pubDate> shipped as the literal string "Invalid Date" — invisible to tsc,
    // to a successful build, and to verify:build. toUTCString() yields the
    // RFC 1123 form ("Fri, 03 Oct 2026 03:00:00 GMT") that feed readers expect.
    const pubDate = new Date(toIsoDate(post.date)).toUTCString();
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <pubDate>${escapeXml(pubDate)}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(post.summary)}</description>
    </item>`;
  }).join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>URAL — Flights, Hotels, Umrah &amp; Visa Guides for Bangladeshi Travelers</title>
    <link>${BASE_URL}/</link>
    <description>Verified outbound travel intelligence, DIY Umrah &amp; Hajj guides, e-Visa checklists, and BDT trip budgets for Bangladeshi passport holders departing Dhaka (DAC).</description>
    <language>en-bd</language>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, "rss.xml"), rss, "utf8");
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(path.join(DIST_DIR, "rss.xml"), rss, "utf8");
  }
}

function prerenderDistHtmlFiles(routes: PrerenderRoute[]) {
  const distIndex = path.join(DIST_DIR, "index.html");
  if (!fs.existsSync(distIndex)) return;

  const templateHtml = fs.readFileSync(distIndex, "utf8");

  for (const r of routes) {
    const hasCollectionNode = r.extraGraphNodes.some(
      (n) => n["@type"] === "CollectionPage"
    );
    const graphNodes: Record<string, unknown>[] = [];
    if (!hasCollectionNode) {
      graphNodes.push(
        webPageSchema({
          url: r.canonicalUrl,
          name: r.title,
          description: r.description,
          imageUrl: r.imageUrl,
          inLanguage: r.locale === "bn" ? "bn-BD" : "en-BD",
          hasBreadcrumb: r.breadcrumbs.length > 0,
        })
      );
    }
    graphNodes.push(...r.extraGraphNodes);
    if (r.breadcrumbs.length > 0) {
      graphNodes.push(breadcrumbSchema(r.canonicalUrl, r.breadcrumbs));
    }

    const fullGraphJson = JSON.stringify(buildSchemaGraph(graphNodes, false));
    const lcpImagePreload = r.lcpImageUrl
      ? `    <link rel="preload" as="image" type="image/webp" href="${escapeHtml(r.lcpImageUrl)}" imagesrcset="${escapeHtml(buildResponsiveSrcSet(r.lcpImageUrl))}" imagesizes="${escapeHtml(r.lcpImageSizes || "100vw")}" fetchpriority="high" />\n`
      : "";

    // Locale-correct critical font preloads. The LCP element of every /bn/
    // route is Bengali TEXT, so the critical fonts there are Noto Sans
    // Bengali 400/600 — the SPA shell preloads Inter 400/600 instead, which
    // on bn pages spends two early-connection slots on a font with zero
    // Bengali glyphs while the font that paints the headline arrives late
    // and swaps (perceived LCP + CLS risk). English routes keep Inter.
    const fontPreloads =
      r.locale === "bn"
        ? `    <link rel="preload" as="font" type="font/woff2" href="/fonts/noto-sans-bengali-400.woff2" crossorigin />\n    <link rel="preload" as="font" type="font/woff2" href="/fonts/noto-sans-bengali-600.woff2" crossorigin />\n`
        : `    <link rel="preload" as="font" type="font/woff2" href="/fonts/inter-400.woff2" crossorigin />\n    <link rel="preload" as="font" type="font/woff2" href="/fonts/inter-600.woff2" crossorigin />\n`;

    // Reciprocal hreflang cluster: identical on both members of a locale pair
    // (en-bd/x-default → the English URL, bn-bd → the Bengali URL). The bn-bd
    // tag is dropped entirely when no Bengali twin was generated, because a
    // return tag pointing at a 404 is worse than no tag at all.
    const englishUrl = r.enUrl || r.canonicalUrl;
    const bengaliUrl = r.bnUrl || null;
    const localeTag = r.locale === "bn" ? "bn-BD" : "en-BD";
    const localeOgp = r.locale === "bn" ? "bn_BD" : "en_BD";

    let pageHtml = templateHtml
      .replace(/<html lang="[^"]*">/, `<html lang="${localeTag}">`)
      .replace(
        /\s*<link rel="preload" as="image"[^>]*\/>\n?/,
        lcpImagePreload ? `\n${lcpImagePreload}` : "\n"
      )
      .replace(
        /[ \t]*<link rel="preload" as="font"[^>]*\/>\n[ \t]*<link rel="preload" as="font"[^>]*\/>\n/,
        fontPreloads
      )
      .replace(
        /<title>[\s\S]*?<\/title>/,
        `<title>${escapeHtml(r.title)}</title>`
      )
      .replace(
        /<meta name="description" content="[^"]*" \/>/,
        `<meta name="description" content="${escapeHtml(r.description)}" />`
      )
      .replace(
        /<link rel="canonical" href="[^"]*" \/>/,
        `<link rel="canonical" href="${escapeHtml(r.canonicalUrl)}" />`
      )
      // Both hreflang tags are self-referential: en-BD is the served variant and
      // x-default catches every other locale. Without rewriting them per route,
      // all 83 pages would declare the homepage as their alternate, which
      // Search Console reports as "no return tag" and ignores wholesale.
      .replace(
        /<link rel="alternate" hreflang="en-bd" href="[^"]*" \/>/,
        `<link rel="alternate" hreflang="en-bd" href="${escapeHtml(englishUrl)}" />`
      )
      .replace(
        /<link rel="alternate" hreflang="x-default" href="[^"]*" \/>/,
        `<link rel="alternate" hreflang="x-default" href="${escapeHtml(englishUrl)}" />`
      )
      .replace(
        /\n?\s*<link rel="alternate" hreflang="bn-bd" href="[^"]*" \/>/,
        bengaliUrl
          ? `\n    <link rel="alternate" hreflang="bn-bd" href="${escapeHtml(bengaliUrl)}" />`
          : ""
      )
      .replace(
        /<meta property="og:locale" content="[^"]*" \/>/,
        `<meta property="og:locale" content="${localeOgp}" />`
      )
      .replace(
        /<meta property="og:locale:alternate" content="[^"]*" \/>/,
        `<meta property="og:locale:alternate" content="${r.locale === "bn" ? "en_BD" : "bn_BD"}" />`
      )
      .replace(
        /<meta property="og:url" content="[^"]*" \/>/,
        `<meta property="og:url" content="${escapeHtml(r.canonicalUrl)}" />`
      )
      .replace(
        /<meta property="og:title" content="[^"]*" \/>/,
        `<meta property="og:title" content="${escapeHtml(r.title)}" />`
      )
      .replace(
        /<meta property="og:description" content="[^"]*" \/>/,
        `<meta property="og:description" content="${escapeHtml(r.description)}" />`
      )
      .replace(
        /<meta property="og:image" content="[^"]*" \/>/,
        `<meta property="og:image" content="${escapeHtml(r.imageUrl)}" />`
      )
      .replace(
        /<meta name="twitter:url" content="[^"]*" \/>/,
        `<meta name="twitter:url" content="${escapeHtml(r.canonicalUrl)}" />`
      )
      .replace(
        /<meta name="twitter:title" content="[^"]*" \/>/,
        `<meta name="twitter:title" content="${escapeHtml(r.title)}" />`
      )
      .replace(
        /<meta name="twitter:description" content="[^"]*" \/>/,
        `<meta name="twitter:description" content="${escapeHtml(r.description)}" />`
      )
      .replace(
        /<meta name="twitter:image" content="[^"]*" \/>/,
        `<meta name="twitter:image" content="${escapeHtml(r.imageUrl)}" />`
      )
      .replace(
        "</head>",
        `  <script type="application/ld+json" data-seo-schema="true">${fullGraphJson}</script>\n  </head>`
      );

    if (r.routePath !== "/") {
      pageHtml = pageHtml.replace(
        /<div id="root">[\s\S]*?<\/main>\s*<\/div>/,
        `<div id="root"><main style="max-width:1100px;margin:0 auto;padding:24px;font-family:system-ui,sans-serif">${r.bodyHtml}</main></div>`
      );
    }

    if (r.routePath === "/") {
      fs.writeFileSync(path.join(DIST_DIR, "index.html"), pageHtml, "utf8");
    } else {
      const segments = r.routePath.split("/").filter(Boolean);
      const fileName = `${segments.pop()}.html`;
      const outDir = path.join(DIST_DIR, ...segments);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, fileName), pageHtml, "utf8");
    }
  }
}

function main() {
  copyStaticSeoImages();
  const enRoutes = buildAllRoutes();
  for (const route of enRoutes) {
    route.locale = "en";
    route.enUrl = route.canonicalUrl;
  }

  // Bengali twins, then pair the two locales so both members of a pair publish
  // the same en-bd / bn-bd / x-default values (valid reciprocal return tags).
  const bnRoutes = buildBengaliRoutes(enRoutes);
  const bnByPath = new Map(bnRoutes.map((route) => [route.routePath, route]));
  for (const route of enRoutes) {
    const twin = bnByPath.get(toBengaliPath(route.routePath));
    if (twin) {
      route.bnUrl = twin.canonicalUrl;
      twin.enUrl = route.canonicalUrl;
      twin.bnUrl = twin.canonicalUrl;
    }
  }

  const routes = [...enRoutes, ...bnRoutes];
  // English link sections only: Bengali bodies already carry Bengali links
  // (the English renderer would inject English anchor text into /bn pages).
  const bnByCanonicalUrl = new Map(bnRoutes.map((r) => [r.canonicalUrl, r]));
  addInternalLinkSections(enRoutes, bnByCanonicalUrl);
  applySharedSeoCopy(enRoutes, "en");
  applySharedSeoCopy(bnRoutes, "bn");
  warnIfContentDateStale();
  generateSitemapXml(routes);
  generateRssXml();
  prerenderDistHtmlFiles(routes);
  console.log(
    `[SEO Prerender] Generated ${enRoutes.length} English + ${bnRoutes.length} Bengali canonical routes, clean sitemap.xml (with xhtml:link hreflang clusters), rss.xml, optimized og-image.jpg & ${BLOG_DATA.length} blog JPEGs.`
  );
}

main();
