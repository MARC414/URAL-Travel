import { useEffect, useRef } from "react";
import {
  generateFaqSchema,
  getFaqSchemaForPage,
  SERVICE_TOOLS_FAQS,
  SERVICE_CONTACT_FAQS,
  SERVICE_TRAVEL_SERVICES_FAQS,
  LANDING_DESTINATION_FAQS,
  LANDING_FLIGHT_FAQS,
  LANDING_HOTEL_FAQS,
  LANDING_VISA_FAQS,
  LANDING_COST_FAQS,
  PRE_DEPARTURE_SITEMAP_FAQS,
  type FAQItem,
  type SchemaQuestion,
  type FaqPageSchema,
} from "../utils/faqSchema";
import {
  breadcrumbSchema,
  webPageSchema,
  articleSchema,
  touristTripSchema,
  serviceSchema,
  productOfferSchema,
  collectionPageSchema,
  buildSchemaGraph,
  toIsoDate,
  parseAuthor,
} from "../utils/schema";

export interface SeoMetaProps {
  title: string;
  description: string;
  schema?: object | object[];
  breadcrumbs?: { name: string; url: string }[];
  faqs?: { question: string; answer: string }[];
  imageUrl?: string;
  inLanguage?: string;
  noindex?: boolean;
}

/**
 * FAQ content related to Hajj and Umrah preparation from Bangladesh. Emit it as
 * FAQPage markup only where the matching Q&A is visibly rendered; structured data
 * does not guarantee a Google rich result or ranking improvement.
 */
export const HAJJ_UMRAH_FAQS: FAQItem[] = [
  {
    question: "How can Bangladeshi citizens apply for an Umrah visa and use the Nusuk app in 2026?",
    answer:
      "Bangladeshi passport holders can obtain a 90-day Saudi Umrah e-Visa in 2 to 5 working days through a Ministry-authorized Umrah agency in Dhaka (BDT 15,500–19,500 including medical insurance), via a 96-hour Saudia/Flynas Stopover Visa, or via a Saudi Tourist e-Visa/VOA if holding a valid used US, UK, or Schengen visa. Once the visa number is issued, pilgrims register on the official Nusuk app (nusuk.sa) to book their Umrah slot and Rawdah Shareef permit in Madinah.",
  },
  {
    question: "What is the official process for Hajj registration from Bangladesh?",
    answer:
      "Obligatory Hajj cannot be performed on an Umrah, Tourist, or Transit visa. Bangladeshi citizens must complete official Pre-Registration (Prak-Nibondhon) and Final Registration (Nibondhon) through the Bangladesh Ministry of Religious Affairs portal (hajj.gov.bd) using a valid National ID (NID), e-Passport, and biometric enrollment on the Saudi Visa Bio app under either the Government Hajj Package or a Ministry-licensed Hajj agency.",
  },
  {
    question: "How much does a 10-day DIY Umrah trip from Dhaka cost in Bangladeshi Taka (BDT)?",
    answer:
      "An independent 10-day Umrah trip from Dhaka (5 nights in Makkah and 4 nights in Madinah, family of 4 sharing) typically costs BDT 1,16,000 to BDT 1,32,000 per person for budget 3-star or shuttle-connected hotels, or BDT 1,65,000 to BDT 2,15,000 per person for 4-to-5 star hotels within walking distance of Masjid al-Haram and Masjid an-Nabawi, inclusive of roundtrip flights, Umrah e-Visa, and Haramain High-Speed Train transfers—saving BDT 25,000 to BDT 45,000 per pilgrim compared to fixed group packages.",
  },
  {
    question: "Can Bangladeshi passport holders perform Umrah on a 96-hour Saudi Stopover Transit Visa?",
    answer:
      "Yes. When booking an international transit flight on Saudia (Saudi Arabian Airlines) or Flynas with a layover in Jeddah (JED) or Madinah (MED), Bangladeshi travelers can select the electronic 96-hour Saudi Stopover Visa during ticket checkout (~SAR 39.50 plus mandatory medical insurance, ~BDT 4,500 total), allowing up to 4 days to perform Umrah and visit Madinah.",
  },
  {
    question: "What is the best flight route from Dhaka (DAC) to Makkah and Madinah for Umrah?",
    answer:
      "The smartest flight strategy from Bangladesh is an Open-Jaw (Multi-City) ticket: fly inbound from Dhaka (DAC) to Jeddah (JED) to enter Ihram and perform Umrah first, take the Haramain High-Speed Bullet Train to Madinah, and fly outbound directly from Madinah (MED) back to Dhaka (DAC). This saves a 5-to-6 hour return highway transfer back to Jeddah Airport.",
  },
  {
    question: "Which Makkah and Madinah hotel zones are best for elderly Bangladeshi parents and wheelchair users?",
    answer:
      "For elderly parents or wheelchair users in Makkah, Abraj Al Bait (Clock Tower) and Jabal Omar offer zero-incline elevator access directly to the Haram courtyard, while Lower Ajyad Street (350m–600m) and Ibrahim Al Khalil Street (400m–850m) provide flat, paved walkways without steep hills. In Madinah, the Northern Central Area (Markazia North) sits 100m to 300m directly opposite the King Fahd Gate and Ladies' Prayer Gates.",
  },
  {
    question: "How do Bangladeshi pilgrims book the Haramain High-Speed Bullet Train between Makkah, Jeddah, and Madinah?",
    answer:
      "Pilgrims can pre-book tickets online via the official Haramain High-Speed Railway portal (sar.hhr.sa) or mobile app using an endorsed Bangladeshi Dual-Currency Visa/Mastercard. The 300 km/h electric bullet train connects Makkah and Madinah in 2 hours 20 minutes (~SAR 172.50 / BDT 5,600 in Economy) and Jeddah Airport (JED Terminal 1) to Makkah in just 54 minutes.",
  },
  {
    question: "What biometric, vaccination, and Dhaka airport documents are required before flying for Umrah or Hajj?",
    answer:
      "Before departing Hazrat Shahjalal International Airport (DAC), pilgrims must complete fingerprint and facial biometrics on the official Saudi Visa Bio app, carry an e-Passport valid for at least 6 months, a printed Umrah/Hajj e-Visa, confirmed roundtrip or multi-city air tickets, Makkah/Madinah hotel vouchers, a Meningococcal Meningitis (ACWY-135) vaccination certificate issued at least 10 days before travel, and endorsed foreign currency (USD/SAR cash or an active Dual-Currency Card).",
  },
];

/**
 * Generates a ready-to-inject Schema.org FAQPage JSON-LD object specifically for
 * Hajj and Umrah preparation pages and guides from Bangladesh.
 */
export function getHajjUmrahFaqSchema(
  url = "https://ural-travel.pages.dev/umrah",
  name = "Umrah & Hajj Preparation Guide from Bangladesh (2026) — Official FAQs"
): FaqPageSchema {
  return generateFAQSchema(HAJJ_UMRAH_FAQS, {
    url,
    name,
    description:
      "Verified answers on Saudi Umrah e-Visa rules, Nusuk Rawdah permits, official Bangladesh Hajj registration (hajj.gov.bd), DIY BDT cost breakdowns, Haramain High-Speed Train booking, and Makkah/Madinah hotel zones.",
  });
}

export interface PreDepartureFaqSchemaOptions {
  url?: string;
  name?: string;
  description?: string;
  uncheckedChecklistItems?: Array<{ title: string; detail: string }>;
  countryFilter?: string;
  additionalFaqs?: Array<{ question: string; answer: string }>;
}

/**
 * Dynamically generates a Schema.org FAQPage JSON-LD object for the
 * Sitemap & Dhaka Airport (DAC) Pre-Departure Readiness Hub (/sitemap, /pre-departure).
 * Combines core pre-flight readiness FAQs with dynamic checklist/country context when provided.
 */
export function getPreDepartureFaqSchema(
  options?: PreDepartureFaqSchemaOptions
): FaqPageSchema {
  const url = options?.url || "https://ural-travel.pages.dev/sitemap";
  const name =
    options?.name ||
    "Dhaka Airport (DAC) Pre-Departure Readiness, Baggage & Embassy Emergency Hub FAQs";
  const description =
    options?.description ||
    "Verified pre-flight readiness answers for Bangladeshi travelers departing Hazrat Shahjalal International Airport (DAC): immigration documents, NOC/GO rules, $12,000 card endorsement, 7 kg cabin & 20,000 mAh power bank limits, 5L Zamzam allowance, 72-hour digital arrival cards, and overseas Bangladesh Embassy emergency helplines.";

  const dynamicItems: FAQItem[] = [...PRE_DEPARTURE_SITEMAP_FAQS];

  if (
    options?.uncheckedChecklistItems &&
    options.uncheckedChecklistItems.length > 0
  ) {
    options.uncheckedChecklistItems.slice(0, 3).forEach((item) => {
      const q = `Why is "${item.title}" required before flying out of Dhaka Airport (DAC)?`;
      const alreadyExists = dynamicItems.some(
        (existing) => existing.question.toLowerCase() === q.toLowerCase()
      );
      if (!alreadyExists && item.detail) {
        dynamicItems.push({
          question: q,
          answer: item.detail,
        });
      }
    });
  }

  if (options?.additionalFaqs && options.additionalFaqs.length > 0) {
    options.additionalFaqs.forEach((faq) => {
      if (
        faq.question &&
        faq.answer &&
        !dynamicItems.some(
          (existing) =>
            existing.question.toLowerCase() === faq.question.toLowerCase()
        )
      ) {
        dynamicItems.push(faq);
      }
    });
  }

  return generateFAQSchema(dynamicItems, {
    url,
    name: options?.countryFilter
      ? `${name} (${options.countryFilter})`
      : name,
    description,
  });
}

/**
 * Cleans plain text for Schema.org JSON-LD (strips HTML tags and normalizes whitespace).
 */
function cleanFaqText(text: string): string {
  if (!text) return "";
  return text
    .replace(/<[^>]*>?/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Takes an array of { question, answer } objects and returns a Schema.org
 * JSON-LD FAQPage object for matching, visibly rendered page content.
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }> | undefined | null,
  options?: { url?: string; name?: string; description?: string }
): FaqPageSchema {
  const validItems: SchemaQuestion[] = Array.isArray(faqs)
    ? faqs
        .filter(
          (item) =>
            item &&
            typeof item.question === "string" &&
            typeof item.answer === "string"
        )
        .map((item) => ({
          "@type": "Question" as const,
          name: cleanFaqText(item.question),
          acceptedAnswer: {
            "@type": "Answer" as const,
            text: cleanFaqText(item.answer),
          },
        }))
        .filter((q) => q.name.length > 0 && q.acceptedAnswer.text.length > 0)
    : [];

  const faqSchema: FaqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: validItems,
  };

  if (options?.url) faqSchema.url = options.url;
  if (options?.name) faqSchema.name = options.name;
  if (options?.description) faqSchema.description = options.description;

  return faqSchema;
}

/**
 * Safely serializes JSON-LD payloads without throwing on circular references.
 */
function safeStringify(val: unknown): string {
  if (val === undefined || val === null) return "";
  try {
    const seen = new WeakSet();
    return JSON.stringify(val, (_key, value) => {
      try {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return "[Circular]";
          }
          seen.add(value);
        }
        return value;
      } catch {
        return undefined;
      }
    });
  } catch {
    try {
      return String(val);
    } catch {
      return "";
    }
  }
}

/**
 * Writes a page-specific <title>, <meta name="description">, and
 * JSON-LD <script type="application/ld+json"> tags into document.head.
 * Also manages canonical <link rel="canonical">, <meta property="og:url">,
 * <meta property="og:title">, and <meta property="og:description"> tags to
 * prevent duplicate content issues.
 */
export function useSeoMeta({
  title,
  description,
  schema,
  breadcrumbs,
  faqs,
  imageUrl,
  inLanguage = "en-BD",
  noindex = false,
}: SeoMetaProps) {
  const schemaStr = safeStringify(schema);
  const breadcrumbsStr = safeStringify(breadcrumbs);
  const faqsStr = safeStringify(faqs);
  const lastTrackedCanonicalRef = useRef<string | null>(null);

  // Derive clean path-based canonical URL to strictly match prerendered static files & sitemap.xml
  let canonicalUrl = "https://ural-travel.pages.dev/";
  let cleanPathTarget: string | null = null;
  if (typeof window !== "undefined") {
    const rawPathname = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const baseUrl = "https://ural-travel.pages.dev";
    // A leading /bn segment is the Bengali locale prefix. Strip it for section
    // detection but preserve it in every canonical/clean-path so /bn/* stays
    // self-referential — a Bengali page must never canonicalise to its English
    // counterpart (that would de-index the Bengali URL).
    const localePrefix = /^\/bn(\/|$)/.test(rawPathname) ? "/bn" : "";
    const pathname = localePrefix
      ? rawPathname.replace(/^\/bn/, "") || "/"
      : rawPathname;
    const localeBase = `${baseUrl}${localePrefix}`;
    const segments = pathname.split("/").filter(Boolean);
    const rootSection = segments[0] || "";
    const subSegment = segments[1] || "";

    if (rootSection === "flights") {
      const routeId = searchParams.get("route") || subSegment;
      canonicalUrl = routeId
        ? `${localeBase}/flights/${routeId}`
        : `${localeBase}/flights`;
      if (searchParams.has("route") && routeId) {
        cleanPathTarget = `${localePrefix}/flights/${routeId}`;
      }
    } else if (rootSection === "hotels") {
      const cityId = searchParams.get("city") || subSegment;
      canonicalUrl = cityId
        ? `${localeBase}/hotels/${cityId}`
        : `${localeBase}/hotels`;
      if (searchParams.has("city") && cityId) {
        cleanPathTarget = `${localePrefix}/hotels/${cityId}`;
      }
    } else if (rootSection === "visa") {
      const countryId = searchParams.get("country") || subSegment;
      canonicalUrl = countryId
        ? `${localeBase}/visa/${countryId}`
        : `${localeBase}/visa`;
      if (searchParams.has("country") && countryId) {
        cleanPathTarget = `${localePrefix}/visa/${countryId}`;
      }
    } else if (rootSection === "destinations") {
      const countryId = searchParams.get("country") || subSegment;
      canonicalUrl = countryId
        ? `${localeBase}/destinations/${countryId}`
        : `${localeBase}/destinations`;
      if (searchParams.has("country") && countryId) {
        cleanPathTarget = `${localePrefix}/destinations/${countryId}`;
      }
    } else if (rootSection === "costs") {
      const countryId = searchParams.get("country") || subSegment;
      canonicalUrl = countryId
        ? `${localeBase}/costs/${countryId}`
        : `${localeBase}/costs`;
      if (searchParams.has("country") && countryId) {
        cleanPathTarget = `${localePrefix}/costs/${countryId}`;
      }
    } else if (rootSection === "blog") {
      const slugId = searchParams.get("slug") || subSegment;
      canonicalUrl = slugId
        ? `${localeBase}/blog/${slugId}`
        : `${localeBase}/blog`;
      if (searchParams.has("slug") && slugId) {
        cleanPathTarget = `${localePrefix}/blog/${slugId}`;
      }
    } else if (rootSection === "pre-departure" || rootSection === "sitemap") {
      canonicalUrl = `${localeBase}/sitemap`;
    } else if (rootSection === "attractions" || rootSection === "experiences") {
      canonicalUrl = `${localeBase}/experiences`;
    } else if (rootSection === "hajj" || rootSection === "umrah") {
      canonicalUrl = `${localeBase}/umrah`;
    } else if (rootSection) {
      canonicalUrl = `${localeBase}/${rootSection}`;
    } else {
      // Home: English keeps its trailing slash (…/), Bengali home is …/bn
      // (no slash) to match the prerendered dist/bn.html and the sitemap.
      canonicalUrl = localePrefix ? localeBase : `${baseUrl}/`;
    }
  }

  useEffect(() => {
    // 0. Upgrade legacy query-string URLs (?slug=, ?route=, etc.) to clean path URLs in place
    if (typeof window !== "undefined" && cleanPathTarget) {
      window.history.replaceState({}, "", cleanPathTarget);
    }

    // 1. Update Title & Meta Description
    document.title = title;

    // 1a. Notify Google tag (G-2EWKHC1KE1) on client-side SPA route changes (skipping initial load already tracked by index.html)
    if (typeof window !== "undefined") {
      if (lastTrackedCanonicalRef.current === null) {
        lastTrackedCanonicalRef.current = canonicalUrl;
      } else if (lastTrackedCanonicalRef.current !== canonicalUrl) {
        lastTrackedCanonicalRef.current = canonicalUrl;
        const w = window as unknown as { gtag?: (...args: unknown[]) => void };
        if (typeof w.gtag === "function") {
          w.gtag("config", "G-2EWKHC1KE1", {
            page_title: title,
            page_location: canonicalUrl,
            page_path: window.location.pathname + window.location.search,
          });
        }
      }
    }
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // 1b. Set indexing and preview directives for this route.
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute(
      "content",
      noindex
        ? "noindex, follow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    // 2. Set/Update Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 3. Set/Update og:url & twitter:url Meta Tags
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", canonicalUrl);

    let twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (!twitterUrl) {
      twitterUrl = document.createElement("meta");
      twitterUrl.setAttribute("name", "twitter:url");
      document.head.appendChild(twitterUrl);
    }
    twitterUrl.setAttribute("content", canonicalUrl);

    // 4. Set/Update og:title & twitter:title Meta Tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", title);

    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement("meta");
      twitterTitle.setAttribute("name", "twitter:title");
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute("content", title);

    // 5. Set/Update og:description, twitter:description & og:image Meta Tags
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", description);

    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDesc) {
      twitterDesc = document.createElement("meta");
      twitterDesc.setAttribute("name", "twitter:description");
      document.head.appendChild(twitterDesc);
    }
    twitterDesc.setAttribute("content", description);

    const resolvedImage = imageUrl || "https://ural-travel.pages.dev/og-image.jpg";
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) {
      ogImg = document.createElement("meta");
      ogImg.setAttribute("property", "og:image");
      document.head.appendChild(ogImg);
    }
    ogImg.setAttribute("content", resolvedImage);

    let twitterImg = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImg) {
      twitterImg = document.createElement("meta");
      twitterImg.setAttribute("name", "twitter:image");
      document.head.appendChild(twitterImg);
    }
    twitterImg.setAttribute("content", resolvedImage);

    // 6. Consolidated @graph JSON-LD Schema Script Update
    document
      .querySelectorAll('script[data-seo-schema="true"]')
      .forEach((el) => el.remove());

    const graphNodes: Record<string, unknown>[] = [];

    // Always include a WebPage node unless schema already provides a CollectionPage/WebPage
    const rawSchemas: Record<string, unknown>[] = [];
    if (schema) {
      if (Array.isArray(schema)) {
        schema.forEach((s) => {
          if (s && typeof s === "object") {
            const obj = s as Record<string, unknown>;
            if (Array.isArray(obj["@graph"])) {
              rawSchemas.push(...(obj["@graph"] as Record<string, unknown>[]));
            } else {
              const { "@context": _ctx, ...rest } = obj;
              rawSchemas.push(rest);
            }
          }
        });
      } else if (typeof schema === "object") {
        const obj = schema as Record<string, unknown>;
        if (Array.isArray(obj["@graph"])) {
          rawSchemas.push(...(obj["@graph"] as Record<string, unknown>[]));
        } else {
          const { "@context": _ctx, ...rest } = obj;
          rawSchemas.push(rest);
        }
      }
    }

    const hasWebPageNode = rawSchemas.some(
      (n) => n["@type"] === "WebPage" || n["@type"] === "CollectionPage"
    );

    if (!hasWebPageNode) {
      graphNodes.push(
        webPageSchema({
          url: canonicalUrl,
          name: title,
          description,
          imageUrl: resolvedImage,
          inLanguage,
          hasBreadcrumb: Boolean(breadcrumbs && breadcrumbs.length > 0),
        })
      );
    }

    graphNodes.push(...rawSchemas);

    if (faqs && faqs.length > 0) {
      const faqSchemaObj = generateFAQSchema(faqs, {
        url: canonicalUrl,
        name: title,
      });
      if (faqSchemaObj.mainEntity.length > 0) {
        const { "@context": _ctx, ...faqNode } = faqSchemaObj as unknown as Record<string, unknown>;
        faqNode["@id"] = `${canonicalUrl}#faq`;
        faqNode["mainEntityOfPage"] = { "@id": `${canonicalUrl}#webpage` };
        faqNode["inLanguage"] = inLanguage;
        graphNodes.push(faqNode);
      }
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      graphNodes.push(breadcrumbSchema(canonicalUrl, breadcrumbs));
    }

    if (graphNodes.length > 0) {
      try {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-schema", "true");
        script.textContent = safeStringify(buildSchemaGraph(graphNodes, false));
        document.head.appendChild(script);
      } catch (e) {
        console.error("Failed to inject schema:", e);
      }
    }
  }, [
    title,
    description,
    schemaStr,
    breadcrumbsStr,
    faqsStr,
    canonicalUrl,
    cleanPathTarget,
    imageUrl,
    inLanguage,
    noindex,
  ]);
}

export {
  generateFaqSchema,
  getFaqSchemaForPage,
  SERVICE_TOOLS_FAQS,
  SERVICE_CONTACT_FAQS,
  SERVICE_TRAVEL_SERVICES_FAQS,
  LANDING_DESTINATION_FAQS,
  LANDING_FLIGHT_FAQS,
  LANDING_HOTEL_FAQS,
  LANDING_VISA_FAQS,
  LANDING_COST_FAQS,
  PRE_DEPARTURE_SITEMAP_FAQS,
  breadcrumbSchema,
  webPageSchema,
  articleSchema,
  touristTripSchema,
  serviceSchema,
  productOfferSchema,
  collectionPageSchema,
  buildSchemaGraph,
  toIsoDate,
  parseAuthor,
  type FAQItem,
  type SchemaQuestion,
  type FaqPageSchema,
};

/**
 * Alias for backwards compatibility with existing callers.
 */
export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return generateFAQSchema(faqs);
}
