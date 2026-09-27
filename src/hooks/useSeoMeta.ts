import { useEffect } from "react";
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
  type FAQItem,
  type SchemaQuestion,
  type FaqPageSchema,
} from "../utils/faqSchema";

export interface SeoMetaProps {
  title: string;
  description: string;
  schema?: object | object[];
  breadcrumbs?: { name: string; url: string }[];
  faqs?: { question: string; answer: string }[];
}

/**
 * Verified FAQ schema questions related to Hajj and Umrah preparation from Bangladesh
 * to boost search engine visibility and rich-snippet eligibility for religious travel queries.
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
 * JSON-LD FAQPage object to boost search engine visibility for travel queries.
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
}: SeoMetaProps) {
  const schemaStr = safeStringify(schema);
  const breadcrumbsStr = safeStringify(breadcrumbs);
  const faqsStr = safeStringify(faqs);

  // Derive canonical URL inside the hook to strictly match public/sitemap.xml
  let canonicalUrl = "https://ural-travel.pages.dev/";
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const baseUrl = "https://ural-travel.pages.dev";
    const segments = pathname.split("/").filter(Boolean);
    const rootSection = segments[0] || "";
    const subSegment = segments[1] || "";

    if (rootSection === "flights") {
      const routeId = searchParams.get("route") || subSegment;
      canonicalUrl = routeId
        ? `${baseUrl}/flights?route=${routeId}`
        : `${baseUrl}/flights`;
    } else if (rootSection === "hotels") {
      const cityId = searchParams.get("city") || subSegment;
      canonicalUrl = cityId
        ? `${baseUrl}/hotels?city=${cityId}`
        : `${baseUrl}/hotels`;
    } else if (rootSection === "visa") {
      const countryId = searchParams.get("country") || subSegment;
      canonicalUrl = countryId
        ? `${baseUrl}/visa?country=${countryId}`
        : `${baseUrl}/visa`;
    } else if (rootSection === "destinations") {
      const countryId = searchParams.get("country") || subSegment;
      canonicalUrl = countryId
        ? `${baseUrl}/destinations?country=${countryId}`
        : `${baseUrl}/destinations`;
    } else if (rootSection === "costs") {
      const countryId = searchParams.get("country") || subSegment;
      canonicalUrl = countryId
        ? `${baseUrl}/costs?country=${countryId}`
        : `${baseUrl}/costs`;
    } else if (rootSection === "blog") {
      const slugId = searchParams.get("slug") || subSegment;
      canonicalUrl = slugId
        ? `${baseUrl}/blog?slug=${slugId}`
        : `${baseUrl}/blog`;
    } else if (rootSection === "pre-departure" || rootSection === "sitemap") {
      canonicalUrl = `${baseUrl}/sitemap`;
    } else if (rootSection === "attractions" || rootSection === "experiences") {
      canonicalUrl = `${baseUrl}/experiences`;
    } else if (rootSection === "hajj" || rootSection === "umrah") {
      canonicalUrl = `${baseUrl}/umrah`;
    } else if (rootSection) {
      canonicalUrl = `${baseUrl}/${rootSection}`;
    } else {
      canonicalUrl = `${baseUrl}/`;
    }
  }

  useEffect(() => {
    // 1. Update Title & Meta Description
    document.title = title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // 1b. Ensure Robots Meta Tag explicitly permits indexing & rich snippets
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute(
      "content",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
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

    // 5. Set/Update og:description & twitter:description Meta Tags
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

    // 6. JSON-LD Schema Script Updates
    document
      .querySelectorAll('script[data-seo-schema="true"]')
      .forEach((el) => el.remove());

    const hasSchema = Boolean(schema);
    const hasBreadcrumbs = Boolean(breadcrumbs && breadcrumbs.length > 0);
    const hasFaqs = Boolean(faqs && faqs.length > 0);

    if (hasSchema || hasBreadcrumbs || hasFaqs) {
      const schemas: object[] = [];

      if (schema) {
        if (Array.isArray(schema)) {
          schemas.push(...schema);
        } else {
          schemas.push(schema);
        }
      }

      if (faqs && faqs.length > 0) {
        const faqSchemaObj = generateFAQSchema(faqs, {
          url: canonicalUrl,
          name: title,
        });
        if (faqSchemaObj.mainEntity.length > 0) {
          schemas.push(faqSchemaObj);
        }
      }

      if (breadcrumbs && breadcrumbs.length > 0) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((crumb, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: crumb.name,
            item: crumb.url,
          })),
        });
      }

      schemas.forEach((s) => {
        try {
          const script = document.createElement("script");
          script.type = "application/ld+json";
          script.setAttribute("data-seo-schema", "true");
          script.textContent = safeStringify(s);
          document.head.appendChild(script);
        } catch (e) {
          console.error("Failed to inject schema:", e);
        }
      });
    }
  }, [title, description, schemaStr, breadcrumbsStr, faqsStr, canonicalUrl]);
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
