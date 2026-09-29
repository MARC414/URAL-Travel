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
import { getSeoCopy } from "../src/utils/seoCopy";
import { getRelatedBlogPosts } from "../src/utils/blogLinks";
import {
  HAJJ_UMRAH_FAQS,
  generateFAQSchema,
  getFaqSchemaForPage,
  getPreDepartureFaqSchema,
} from "../src/hooks/useSeoMeta";

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const DIST_DIR = path.join(ROOT_DIR, "dist");
const ASSETS_IMAGES_DIR = path.join(ROOT_DIR, "src", "assets", "images");
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

function addInternalLinkSections(routes: PrerenderRoute[]): void {
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

  }
}

interface PrerenderRoute {
  routePath: string; // e.g. "/" or "/blog/slug"
  canonicalUrl: string;
  title: string;
  description: string;
  imageUrl: string;
  lcpImageUrl?: string;
  lcpImageSizes?: string;
  breadcrumbs: { name: string; url: string }[];
  extraGraphNodes: Record<string, unknown>[];
  bodyHtml: string;
}

function getSocialImageSource(fileName: string): string {
  const optimizedPath = path.join(OPTIMIZED_SOCIAL_IMAGES_DIR, fileName);
  return fs.existsSync(optimizedPath)
    ? optimizedPath
    : path.join(ASSETS_IMAGES_DIR, fileName);
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
          <p><strong>Visa Type:</strong> ${escapeHtml(v.requirementType)} | <strong>Published fee guidance:</strong> ${escapeHtml(v.costBdt)} | <strong>Typical processing guidance:</strong> ${escapeHtml(v.processingTime)}</p>
          <p>Entry rules, fees and processing times can change. Confirm current requirements with the destination's official immigration or visa authority before applying.</p>
          <h2>Documents to check</h2>
          ${v.documentChecklist.map((checklist) => `<section><h3>${escapeHtml(checklist.category)}</h3><ul>${checklist.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`).join("")}
          <h2>Application steps</h2>
          <ol>${v.stepByStep.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
          ${v.faqs.length ? `<section><h2>Common questions</h2>${v.faqs.map((faq) => `<h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p>`).join("")}</section>` : ""}
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
      </article>
    `,
  });

  // 10. Sitemap & Pre-Departure Hub (/sitemap)
  const sitemapFaq = stripContext(
    getPreDepartureFaqSchema({ url: `${BASE_URL}/sitemap` })
  );
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
      </article>
    `,
  });

  // 12. Blog Hub (/blog) + 41 Blog Guides (/blog/:slug)
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

    if (post.category === "Hajj & Umrah" || post.category === "Ziyarah & Stopovers") {
      const faqNode = stripContext(
        generateFAQSchema(HAJJ_UMRAH_FAQS, {
          url: postUrl,
          name: post.title,
        })
      );
      faqNode["@id"] = `${postUrl}#faq`;
      faqNode["mainEntityOfPage"] = { "@id": `${postUrl}#webpage` };
      extraNodes.push(faqNode);
    }

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
      bodyHtml: `
        <article>
          <h1>${escapeHtml(post.title)}</h1>
          <p><em>By ${escapeHtml(post.author)} · Published ${escapeHtml(post.date)} · ${escapeHtml(post.readTime)}</em></p>
          <p>${escapeHtml(post.summary)}</p>
          ${(Array.isArray(post.content) ? post.content : String(post.content || "").split("\n\n"))
            .map((para) => `<p>${escapeHtml(para)}</p>`)
            .join("\n")}
          ${planLinksHtml}
          ${relatedGuidesHtml}
        </article>
      `,
    });
  }

  return routes;
}

function applySharedSeoCopy(routes: PrerenderRoute[]) {
  for (const route of routes) {
    const seoCopy = getSeoCopy(route.routePath, route.title, route.description);
    route.title = seoCopy.title;
    route.description = seoCopy.description;

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
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${escapeXml(r.canonicalUrl)}</loc>
  </url>`
  )
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
    const pubDate = new Date(`${toIsoDate(post.date)}T06:00:00+06:00`).toUTCString();
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
          inLanguage: "en-BD",
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
      ? `    <link rel="preload" as="image" type="image/webp" href="${escapeHtml(r.lcpImageUrl)}" imagesrcset="${escapeHtml(`${r.lcpImageUrl.replace(/-1200\.webp$/, "-640.webp")} 640w, ${r.lcpImageUrl} 1200w`)}" imagesizes="${escapeHtml(r.lcpImageSizes || "100vw")}" fetchpriority="high" />\n`
      : "";

    let pageHtml = templateHtml
      .replace(
        /\s*<link rel="preload" as="image"[^>]*\/>\n?/,
        lcpImagePreload ? `\n${lcpImagePreload}` : "\n"
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
        `<link rel="alternate" hreflang="en-bd" href="${escapeHtml(r.canonicalUrl)}" />`
      )
      .replace(
        /<link rel="alternate" hreflang="x-default" href="[^"]*" \/>/,
        `<link rel="alternate" hreflang="x-default" href="${escapeHtml(r.canonicalUrl)}" />`
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
  const routes = buildAllRoutes();
  addInternalLinkSections(routes);
  applySharedSeoCopy(routes);
  generateSitemapXml(routes);
  generateRssXml();
  prerenderDistHtmlFiles(routes);
  console.log(
    `[SEO Prerender] Generated ${routes.length} canonical routes, clean sitemap.xml, rss.xml, optimized og-image.jpg & 41 optimized blog JPEGs.`
  );
}

main();
