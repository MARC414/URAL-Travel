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

function buildAllRoutes(): PrerenderRoute[] {
  const routes: PrerenderRoute[] = [];
  const defaultOgImage = `${BASE_URL}/og-image.jpg`;

  // 1. Home (/)
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
      ...HAJJ_UMRAH_FAQS.slice(0, 2),
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
    lcpImageUrl: `${BASE_URL}/assets/images/clouds_boat_hero_1781438671378-1200.webp`,
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
    lcpImageUrl: `${BASE_URL}/assets/images/umrah_makkah_haram_guide_1790430007679-1200.webp`,
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
    bodyHtml: `
      <article>
        <h1>${escapeHtml(flightsHubTitle)}</h1>
        <p>${escapeHtml(flightsHubDesc)}</p>
        <ul>
          ${FLIGHTS_DATA.map(
            (r) =>
              `<li><a href="/flights/${r.id}">${escapeHtml(r.from)} to ${escapeHtml(
                r.to
              )} — ${escapeHtml(r.priceRangeBdt)} (${escapeHtml(r.duration)})</a></li>`
          ).join("\n")}
        </ul>
      </article>
    `,
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
          <p><strong>Price Range:</strong> ${escapeHtml(r.priceRangeBdt)} | <strong>Duration:</strong> ${escapeHtml(r.duration)} | <strong>Airlines:</strong> ${escapeHtml(r.airlines.join(", "))}</p>
          ${
            r.faqs && r.faqs.length > 0
              ? `<section><h2>Frequently Asked Questions</h2>${r.faqs
                  .map((f) => `<h3>${escapeHtml(f.question)}</h3><p>${escapeHtml(f.answer)}</p>`)
                  .join("\n")}</section>`
              : ""
          }
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
    bodyHtml: `
      <article>
        <h1>${escapeHtml(hotelsHubTitle)}</h1>
        <p>${escapeHtml(hotelsHubDesc)}</p>
        <ul>
          ${HOTELS_DATA.map(
            (h) => `<li><a href="/hotels/${h.id}">Best Hotels in ${escapeHtml(h.city)} (${escapeHtml(h.country)})</a></li>`
          ).join("\n")}
        </ul>
      </article>
    `,
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
          <h2>Neighborhoods to compare</h2>
          <ul>
            ${h.neighborhoods.map((area) => `<li><strong>${escapeHtml(area.name)}:</strong> ${escapeHtml(area.description)} (${escapeHtml(area.vibe)})</li>`).join("")}
          </ul>
          <h2>Planning facts</h2>
          <ul>${h.keyFacts.map((fact) => `<li><strong>${escapeHtml(fact.label)}:</strong> ${escapeHtml(fact.value)}</li>`).join("")}</ul>
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
    bodyHtml: `
      <article>
        <h1>${escapeHtml(visaHubTitle)}</h1>
        <p>${escapeHtml(visaHubDesc)}</p>
        <ul>
          ${VISA_DATA.map(
            (v) =>
              `<li><a href="/visa/${v.id}">${escapeHtml(v.country)} Visa (${escapeHtml(v.requirementType)}) — ${escapeHtml(v.costBdt)}</a></li>`
          ).join("\n")}
        </ul>
      </article>
    `,
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
    bodyHtml: `
      <article>
        <h1>${escapeHtml(destHubTitle)}</h1>
        <p>${escapeHtml(destHubDesc)}</p>
        <ul>
          ${DESTINATIONS_DATA.map(
            (d) => `<li><a href="/destinations/${d.id}">${escapeHtml(d.country)} 5-Day Itinerary</a></li>`
          ).join("\n")}
        </ul>
      </article>
    `,
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
    bodyHtml: `
      <article>
        <h1>${escapeHtml(costsHubTitle)}</h1>
        <p>${escapeHtml(costsHubDesc)}</p>
        <ul>
          ${TRIP_COSTS_DATA.map(
            (c) => `<li><a href="/costs/${c.id}">${escapeHtml(c.country)} Trip Cost in BDT</a></li>`
          ).join("\n")}
        </ul>
      </article>
    `,
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
    lcpImageUrl: `${BASE_URL}/assets/images/blog_editorial_hero_banner_1790429994056-1200.webp`,
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
    const postLcpImageUrl = `${BASE_URL}/assets/images/${postImageFileName.replace(/\.jpg$/, "-1200.webp")}`;
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
          <p><a href="/blog">← Back to All 41 Bangladesh Travel Guides</a></p>
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
      ? `  <link rel="preload" as="image" type="image/webp" href="${escapeHtml(r.lcpImageUrl)}" imagesrcset="${escapeHtml(`${r.lcpImageUrl.replace(/-1200\.webp$/, "-640.webp")} 640w, ${r.lcpImageUrl} 1200w`)}" imagesizes="${escapeHtml(r.lcpImageSizes || "100vw")}" fetchpriority="high" />\n`
      : "";

    let pageHtml = templateHtml
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
        `${lcpImagePreload}  <script type="application/ld+json" data-seo-schema="true">${fullGraphJson}</script>\n  </head>`
      );

    if (r.routePath !== "/") {
      pageHtml = pageHtml.replace(
        /<div id="root">[\s\S]*?<\/main>\s*<\/div>/,
        `<div id="root"><main style="max-width:1100px;margin:0 auto;padding:24px;font-family:system-ui,sans-serif">${r.bodyHtml}</main></div>`
      );
    }

    const outDir =
      r.routePath === "/"
        ? DIST_DIR
        : path.join(DIST_DIR, ...r.routePath.split("/").filter(Boolean));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), pageHtml, "utf8");
  }
}

function main() {
  copyStaticSeoImages();
  const routes = buildAllRoutes();
  applySharedSeoCopy(routes);
  generateSitemapXml(routes);
  generateRssXml();
  prerenderDistHtmlFiles(routes);
  console.log(
    `[SEO Prerender] Generated ${routes.length} canonical routes, clean sitemap.xml, rss.xml, optimized og-image.jpg & 41 optimized blog JPEGs.`
  );
}

main();
