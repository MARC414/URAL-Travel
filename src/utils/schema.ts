export const BASE_URL = "https://ural-travel.pages.dev";
export const SITE_ORG_ID = `${BASE_URL}/#organization`;
export const SITE_LOGO_ID = `${BASE_URL}/#logo`;
export const SITE_WEBSITE_ID = `${BASE_URL}/#website`;

export const URAL_SOCIAL_LINKS = {
  facebook: "https://web.facebook.com/uraltravelbd/",
  instagram: "https://www.instagram.com/uraltravelbd/",
  linkedin: "https://www.linkedin.com/company/ural-travel-bangladesh",
  whatsapp: "https://wa.me/8801784385335",
} as const;

export interface BreadcrumbItemInput {
  name: string;
  url: string;
}

/**
 * Converts human-readable dates (e.g. "June 12, 2026" or "2026-09-27")
 * into ISO-8601 timestamps with Bangladesh Standard Time (+06:00).
 */
export function toIsoDate(
  dateStr?: string,
  fallback = "2026-09-15T09:00:00+06:00"
): string {
  if (!dateStr) return fallback;
  const trimmed = dateStr.trim();
  if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
    return trimmed;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return `${trimmed}T09:00:00+06:00`;
  }
  const parsed = new Date(`${trimmed} 09:00:00 GMT+0600`);
  if (!Number.isNaN(parsed.getTime())) {
    const yyyy = parsed.getUTCFullYear();
    const mm = String(parsed.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(parsed.getUTCDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}T09:00:00+06:00`;
  }
  return fallback;
}

/**
 * Parses author strings such as "Zayan Rahman (Senior Travel Researcher)"
 * into a Schema.org Person entity linked to the URAL Organization.
 */
export function parseAuthor(authorRaw?: string) {
  const raw = (authorRaw || "Zayan Rahman (Senior Travel Researcher)").trim();
  const match = raw.match(/^([^(]+?)(?:\s*\(([^)]+)\))?$/);
  const name = (match?.[1] || raw).trim();
  const jobTitle = (match?.[2] || "Senior Travel Researcher").trim();

  return {
    "@type": "Person" as const,
    "@id": `${BASE_URL}/#/author/${encodeURIComponent(name)}`,
    name,
    jobTitle,
    worksFor: { "@id": SITE_ORG_ID },
  };
}

/**
 * Site-wide Organization/TravelAgency + WebSite entities.
 */
export function getSiteGraphNodes() {
  return [
    {
      "@type": ["Organization", "TravelAgency"],
      "@id": SITE_ORG_ID,
      name: "URAL",
      legalName: "URAL Travel Intelligence",
      url: `${BASE_URL}/`,
      description:
        "Travel intelligence, visa checklists, and BDT-priced flight, hotel, Umrah and Hajj planning for Bangladeshi outbound travelers.",
      logo: {
        "@type": "ImageObject",
        "@id": SITE_LOGO_ID,
        url: `${BASE_URL}/assets/brand/favicon/favicon-512.png`,
        contentUrl: `${BASE_URL}/assets/brand/favicon/favicon-512.png`,
        width: 512,
        height: 512,
        caption: "URAL Ascent mark",
      },
      image: { "@id": SITE_LOGO_ID },
      telephone: "+8801784385335",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressRegion: "Dhaka Division",
        addressCountry: "BD",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+8801784385335",
          contactType: "customer support",
          areaServed: "BD",
          availableLanguage: ["English", "Bengali"],
        },
      ],
      areaServed: [
        { "@type": "Country", name: "Bangladesh" },
        { "@type": "Country", name: "Saudi Arabia" },
        { "@type": "Country", name: "Thailand" },
        { "@type": "Country", name: "Malaysia" },
        { "@type": "Country", name: "Nepal" },
        { "@type": "Country", name: "Singapore" },
        { "@type": "Country", name: "Maldives" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      knowsLanguage: ["en", "bn"],
      sameAs: [
        URAL_SOCIAL_LINKS.facebook,
        URAL_SOCIAL_LINKS.instagram,
        URAL_SOCIAL_LINKS.linkedin,
        URAL_SOCIAL_LINKS.whatsapp,
      ],
    },
    {
      "@type": "WebSite",
      "@id": SITE_WEBSITE_ID,
      url: `${BASE_URL}/`,
      name: "URAL",
      description: "Travel Intelligence for Bangladeshi Outbound Travelers",
      publisher: { "@id": SITE_ORG_ID },
      inLanguage: "en-BD",
    },
  ];
}

/**
 * Builds a Schema.org BreadcrumbList node.
 * Per Google Search Central guidelines, the final breadcrumb omits the `item` URL.
 */
export function breadcrumbSchema(
  pageUrl: string,
  crumbs: BreadcrumbItemInput[]
) {
  return {
    "@type": "BreadcrumbList" as const,
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((crumb, idx) => {
      const isLast = idx === crumbs.length - 1;
      return isLast
        ? {
            "@type": "ListItem" as const,
            position: idx + 1,
            name: crumb.name,
          }
        : {
            "@type": "ListItem" as const,
            position: idx + 1,
            name: crumb.name,
            item: crumb.url,
          };
    }),
  };
}

/**
 * Builds a Schema.org WebPage node bound to #website and #organization.
 */
export function webPageSchema(options: {
  url: string;
  name: string;
  description: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
  inLanguage?: string;
  hasBreadcrumb?: boolean;
}) {
  const {
    url,
    name,
    description,
    imageUrl = `${BASE_URL}/og-image.jpg`,
    datePublished,
    dateModified,
    inLanguage = "en-BD",
    hasBreadcrumb = true,
  } = options;

  const node: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": SITE_WEBSITE_ID },
    about: { "@id": SITE_ORG_ID },
    // The image is declared once with a stable @id, then referenced by both
    // primaryImageOfPage and image. Inlining it twice would make parsers treat
    // it as two unrelated ImageObjects for the same page.
    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": `${url}#primaryimage`,
      url: imageUrl,
      contentUrl: imageUrl,
      width: 1200,
      height: 630,
    },
    image: { "@id": `${url}#primaryimage` },
    inLanguage,
  };

  if (datePublished) node.datePublished = toIsoDate(datePublished);
  if (dateModified) node.dateModified = toIsoDate(dateModified);
  if (hasBreadcrumb) node.breadcrumb = { "@id": `${url}#breadcrumb` };

  return node;
}

/**
 * Builds a Schema.org Article node for blog guides using real post dates,
 * named Person authors, and dedicated static image URLs.
 */
export function articleSchema(options: {
  url: string;
  headline: string;
  description: string;
  slug: string;
  datePublished?: string;
  dateModified?: string;
  authorRaw?: string;
  articleSection?: string;
  imageUrl?: string;
  inLanguage?: string;
}) {
  const {
    url,
    headline,
    description,
    slug,
    datePublished,
    dateModified,
    authorRaw,
    articleSection = "Bangladesh Outbound Travel Guides",
    imageUrl = `${BASE_URL}/img/blog/${slug}.jpg`,
    inLanguage = "en-BD",
  } = options;

  const isoPub = toIsoDate(datePublished);
  const isoMod = dateModified ? toIsoDate(dateModified) : isoPub;

  return {
    "@type": "Article",
    "@id": `${url}#article`,
    isPartOf: { "@id": `${url}#webpage` },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    headline,
    description,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: isoPub,
    dateModified: isoMod,
    author: parseAuthor(authorRaw),
    publisher: { "@id": SITE_ORG_ID },
    articleSection,
    inLanguage,
  };
}

/**
 * Builds a Schema.org CollectionPage + ItemList node for hub index pages.
 */
export function collectionPageSchema(options: {
  url: string;
  name: string;
  description: string;
  items: Array<{ name: string; url: string; description?: string }>;
  inLanguage?: string;
}) {
  const { url, name, description, items, inLanguage = "en-BD" } = options;
  return {
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": SITE_WEBSITE_ID },
    about: { "@id": SITE_ORG_ID },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage,
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: items.length,
      itemListElement: items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: item.name,
        url: item.url,
        ...(item.description ? { description: item.description } : {}),
      })),
    },
  };
}

/**
 * Builds a Schema.org TouristTrip node for 5-day destination itineraries.
 */
export function touristTripSchema(options: {
  url: string;
  name: string;
  description: string;
  country: string;
  places: string[];
  estimatedPriceBdt?: number;
  inLanguage?: string;
}) {
  const {
    url,
    name,
    description,
    country,
    places,
    estimatedPriceBdt = 48000,
    inLanguage = "en-BD",
  } = options;

  return {
    "@type": "TouristTrip",
    "@id": `${url}#trip`,
    name,
    description,
    inLanguage,
    provider: { "@id": SITE_ORG_ID },
    touristType: [
      "Bangladeshi outbound travelers",
      "Halal family travelers",
      "First-time international travelers",
    ],
    itinerary: {
      "@type": "ItemList",
      numberOfItems: places.length,
      itemListElement: places.map((place, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "TouristDestination",
          name: `${place}, ${country}`,
        },
      })),
    },
    offers: {
      "@type": "Offer",
      url,
      price: estimatedPriceBdt,
      priceCurrency: "BDT",
      availability: "https://schema.org/InStock",
      seller: { "@id": SITE_ORG_ID },
    },
  };
}

/**
 * Builds a Schema.org Service node for /contact, /tools, and /visa support desks.
 */
export function serviceSchema(options: {
  url: string;
  idSuffix?: string;
  name: string;
  description: string;
  serviceType: string;
}) {
  const {
    url,
    idSuffix = "service",
    name,
    description,
    serviceType,
  } = options;

  return {
    "@type": "Service",
    "@id": `${url}#${idSuffix}`,
    name,
    description,
    serviceType,
    provider: { "@id": SITE_ORG_ID },
    areaServed: { "@type": "Country", name: "Bangladesh" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      servicePhone: "+8801784385335",
      availableLanguage: ["English", "Bengali"],
    },
  };
}

/**
 * Builds a Schema.org Product + Offer node for bookable travel passes / eSIMs / packages.
 */
export function productOfferSchema(options: {
  url: string;
  idSuffix: string;
  name: string;
  description: string;
  sku: string;
  brandName: string;
  priceBdt: number;
  imageUrl?: string;
}) {
  const {
    url,
    idSuffix,
    name,
    description,
    sku,
    brandName,
    priceBdt,
    imageUrl = `${BASE_URL}/og-image.jpg`,
  } = options;

  return {
    "@type": "Product",
    "@id": `${url}#${idSuffix}`,
    name,
    description,
    image: imageUrl,
    sku,
    brand: { "@type": "Brand", name: brandName },
    offers: {
      "@type": "Offer",
      url,
      price: priceBdt,
      priceCurrency: "BDT",
      priceValidUntil: "2026-12-31",
      availability: "https://schema.org/InStock",
      seller: { "@id": SITE_ORG_ID },
    },
  };
}

/**
 * Builds a Schema.org FAQPage node linked to the page's #webpage entity.
 * Must only be used on pages where the Q&A list is visibly rendered.
 */
export function faqPageNodeSchema(options: {
  url: string;
  faqs: Array<{ question: string; answer: string }>;
  inLanguage?: string;
}) {
  const { url, faqs, inLanguage = "en-BD" } = options;
  const valid = (faqs || [])
    .filter((f) => f && f.question && f.answer)
    .map((f) => ({
      "@type": "Question" as const,
      name: f.question.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim(),
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: f.answer.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim(),
      },
    }))
    .filter((q) => q.name.length > 0 && q.acceptedAnswer.text.length > 0);

  return {
    "@type": "FAQPage" as const,
    "@id": `${url}#faq`,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    inLanguage,
    mainEntity: valid,
  };
}

/**
 * Wraps page-level schema nodes into a single @graph JSON-LD document.
 */
export function buildSchemaGraph(
  nodes: Array<Record<string, unknown> | null | undefined>,
  includeSiteEntities = false
) {
  const cleanNodes = nodes.filter(Boolean) as Record<string, unknown>[];
  return {
    "@context": "https://schema.org",
    "@graph": includeSiteEntities
      ? [...getSiteGraphNodes(), ...cleanNodes]
      : cleanNodes,
  };
}
