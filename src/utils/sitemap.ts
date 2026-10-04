import {
  FLIGHTS_DATA,
  HOTELS_DATA,
  VISA_DATA,
  DESTINATIONS_DATA,
  TRIP_COSTS_DATA,
  BLOG_DATA,
} from "../constants";

export interface SitemapEntry {
  path: string;
  loc: string;
  title: string;
  subtitle: string;
  category:
    | "Core Pages"
    | "Flight Routes"
    | "Hotel Guides"
    | "Visa Checklists"
    | "Destination Plans"
    | "Trip Budgets (BDT)"
    | "Travel Blog & Guides";
  lastmod?: string;
  changefreq: "daily" | "weekly" | "monthly";
  priority: string;
}

const DEFAULT_BASE_URL = "https://ural-travel.pages.dev";

/**
 * Dynamically generates a complete list of all route-based pages
 * (Flights, Hotels, Visa, Destinations, Costs, Blog, and Core views)
 * for search engine indexing and the interactive SitemapPage component.
 */
export function generateSitemap(baseUrl: string = DEFAULT_BASE_URL): SitemapEntry[] {
  const cleanBase = baseUrl.replace(/\/$/, "");

  const corePages: SitemapEntry[] = [
    {
      path: "/",
      loc: `${cleanBase}/`,
      title: "URAL Home — Outbound Travel Intelligence for Bangladesh",
      subtitle: "Live flight comparison, hotel search, visa guides, and BDT trip calculators",
      category: "Core Pages",
      changefreq: "daily",
      priority: "1.0",
    },
    {
      path: "/flights",
      loc: `${cleanBase}/flights`,
      title: "International Flights from Dhaka (DAC) Hub",
      subtitle: "Compare direct & transit airlines, baggage allowances, and roundtrip BDT fares",
      category: "Core Pages",
      changefreq: "daily",
      priority: "0.9",
    },
    {
      path: "/hotels",
      loc: `${cleanBase}/hotels`,
      title: "Hotel & Neighborhood Guides for Bangladeshi Travelers",
      subtitle: "Halal-friendly areas, MRT-connected stays, and BDT room price ranges",
      category: "Core Pages",
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      path: "/visa",
      loc: `${cleanBase}/visa`,
      title: "Tourist Visa Requirements & Checklists for Bangladeshi Citizens",
      subtitle: "Visa on Arrival, e-Visa portals, bank statement rules, and step-by-step guides",
      category: "Core Pages",
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      path: "/destinations",
      loc: `${cleanBase}/destinations`,
      title: "Outbound Destination Itineraries from Bangladesh",
      subtitle: "Day-by-day trip plans, local transport hacks, and sightseeing guides",
      category: "Core Pages",
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      path: "/experiences",
      loc: `${cleanBase}/experiences`,
      title: "Europe, UK, USA & Asian Attraction Passes (Tiqets & Klook Hub)",
      subtitle: "Skip-the-line museum tickets, theme parks, river cruises, and BDT bundle calculator",
      category: "Core Pages",
      changefreq: "weekly",
      priority: "0.95",
    },
    {
      path: "/umrah",
      loc: `${cleanBase}/umrah`,
      title: "Umrah & Hajj Planning Hub from Bangladesh (2026 BDT Calculator & Nusuk Guide)",
      subtitle: "Compare Dhaka–Jeddah/Madinah flights, walkable Haram hotels, e-Visa steps & BDT booking desk",
      category: "Core Pages",
      changefreq: "weekly",
      priority: "0.95",
    },
    {
      path: "/costs",
      loc: `${cleanBase}/costs`,
      title: "International Trip Cost & Budget Breakdowns in BDT",
      subtitle: "Budget, Mid-Range, and Luxury cost matrices for Bangladeshi travelers",
      category: "Core Pages",
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      path: "/tools",
      loc: `${cleanBase}/tools`,
      title: "Bangladeshi Traveler Utility Tools (BDT Converter, Plugs & Packing)",
      subtitle: "Interactive currency calculator, immigration checklist, and travel phrasebook",
      category: "Core Pages",
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      path: "/blog",
      loc: `${cleanBase}/blog`,
      title: "URAL Travel Blog — Dual-Currency Cards, Visa Hacks & Budget Guides",
      subtitle: "In-depth articles solving real outbound travel challenges from Bangladesh",
      category: "Core Pages",
      changefreq: "weekly",
      priority: "0.8",
    },
    {
      path: "/contact",
      loc: `${cleanBase}/contact`,
      title: "Contact URAL — Direct WhatsApp & Telephone Support Desk",
      subtitle: "Free consultation for flight bookings, visa document checks, and BDT payments",
      category: "Core Pages",
      changefreq: "monthly",
      priority: "0.7",
    },
    {
      path: "/sitemap",
      loc: `${cleanBase}/sitemap`,
      title: "Dynamic XML & HTML Sitemap Directory",
      subtitle: "Complete index of all route-based pages for search engines and travelers",
      category: "Core Pages",
      changefreq: "weekly",
      priority: "0.6",
    },
  ];

  const flightEntries: SitemapEntry[] = FLIGHTS_DATA.map((route) => ({
    path: `/flights/${route.id}`,
    loc: `${cleanBase}/flights/${route.id}`,
    title: `${route.from} to ${route.to} Flight Guide (${route.country})`,
    subtitle: `${route.duration} · ${route.priceRangeBdt}`,
    category: "Flight Routes",
    changefreq: "weekly",
    priority: "0.85",
  }));

  const hotelEntries: SitemapEntry[] = HOTELS_DATA.map((hotel) => ({
    path: `/hotels/${hotel.id}`,
    loc: `${cleanBase}/hotels/${hotel.id}`,
    title: `Best Hotels & Neighborhoods in ${hotel.city} (${hotel.country})`,
    subtitle: `Areas: ${hotel.neighborhoods.map((n) => n.name).join(", ")}`,
    category: "Hotel Guides",
    changefreq: "weekly",
    priority: "0.85",
  }));

  const visaEntries: SitemapEntry[] = VISA_DATA.map((visa) => ({
    path: `/visa/${visa.id}`,
    loc: `${cleanBase}/visa/${visa.id}`,
    title: `${visa.country} Visa Requirements for Bangladeshi Citizens`,
    subtitle: `${visa.requirementType} · Processing: ${visa.processingTime}`,
    category: "Visa Checklists",
    changefreq: "weekly",
    priority: "0.85",
  }));

  const destinationEntries: SitemapEntry[] = DESTINATIONS_DATA.map((dest) => ({
    path: `/destinations/${dest.id}`,
    loc: `${cleanBase}/destinations/${dest.id}`,
    title: dest.title,
    subtitle: `${dest.itinerary.length}-Day Itinerary · ${dest.budgetBdt.split(" (")[0]}`,
    category: "Destination Plans",
    changefreq: "weekly",
    priority: "0.85",
  }));

  const costEntries: SitemapEntry[] = TRIP_COSTS_DATA.map((cost) => ({
    path: `/costs/${cost.id}`,
    loc: `${cleanBase}/costs/${cost.id}`,
    title: `${cost.country} Trip Cost from Bangladesh (${cost.durationDays}-Day BDT Budget)`,
    subtitle: `${cost.currencyCode} · ${cost.exchangeRateText}`,
    category: "Trip Budgets (BDT)",
    changefreq: "weekly",
    priority: "0.85",
  }));

  const blogEntries: SitemapEntry[] = BLOG_DATA.map((post) => ({
    path: `/blog/${post.slug}`,
    loc: `${cleanBase}/blog/${post.slug}`,
    title: post.title,
    subtitle: `${post.category} · ${post.readTime} · Updated ${post.date}`,
    category: "Travel Blog & Guides",
    changefreq: "weekly",
    priority: "0.80",
  }));

  return [
    ...corePages,
    ...flightEntries,
    ...hotelEntries,
    ...visaEntries,
    ...destinationEntries,
    ...costEntries,
    ...blogEntries,
  ];
}

/**
 * Generates standard Sitemaps.org 0.9 XML string from all dynamically generated routes.
 */
export function generateSitemapXml(baseUrl: string = DEFAULT_BASE_URL): string {
  const entries = generateSitemap(baseUrl);
  const urlBlocks = entries
    .map((entry) => {
      const lastmod = entry.lastmod
        ? `\n    <lastmod>${entry.lastmod}</lastmod>`
        : "";
      return `  <url>\n    <loc>${entry.loc.replace(/&/g, "&amp;")}</loc>${lastmod}\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlBlocks}
</urlset>`;
}

export const getDynamicSitemapEntries = generateSitemap;
export const generateDynamicSitemapXml = generateSitemapXml;
