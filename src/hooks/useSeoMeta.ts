import { useEffect } from "react";

interface SeoMetaProps {
  title: string;
  description: string;
  schema?: object | object[];
  breadcrumbs?: { name: string; url: string }[];
}

/**
 * Writes a page-specific <title>, <meta name="description">, and
 * JSON-LD <script type="application/ld+json"> tags into document.head.
 * Also manages canonical <link rel="canonical">, <meta property="og:url">,
 * <meta property="og:title">, and <meta property="og:description"> tags to 
 * prevent duplicate content issues.
 */
function safeStringify(val: any): string {
  if (val === undefined || val === null) return "";
  try {
    const seen = new WeakSet();
    return JSON.stringify(val, (key, value) => {
      try {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return "[Circular]";
          }
          seen.add(value);
        }
        return value;
      } catch (err) {
        return undefined;
      }
    });
  } catch (e) {
    try {
      return String(val);
    } catch {
      return "";
    }
  }
}

export function useSeoMeta({ title, description, schema, breadcrumbs }: SeoMetaProps) {
  const schemaStr = safeStringify(schema);
  const breadcrumbsStr = safeStringify(breadcrumbs);

  // Derive canonical URL inside the hook
  let canonicalUrl = "https://ural-travel.pages.dev/";
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    
    let parameterId = "";
    if (pathname.startsWith("/flights")) {
      parameterId = searchParams.get("route") || "";
    } else if (pathname.startsWith("/hotels")) {
      parameterId = searchParams.get("city") || "";
    } else if (pathname.startsWith("/visa")) {
      parameterId = searchParams.get("country") || "";
    } else if (pathname.startsWith("/destinations")) {
      parameterId = searchParams.get("country") || "";
    } else if (pathname.startsWith("/costs")) {
      parameterId = searchParams.get("country") || "";
    } else if (pathname.startsWith("/blog")) {
      parameterId = searchParams.get("slug") || "";
    }

    const baseUrl = "https://ural-travel.pages.dev";
    const cleanPathname = pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
    
    if (parameterId) {
      canonicalUrl = `${baseUrl}${cleanPathname}/${parameterId}`;
    } else {
      canonicalUrl = `${baseUrl}${cleanPathname}`;
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

    // 2. Set/Update Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 3. Set/Update og:url Meta Tag
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", canonicalUrl);

    // 4. Set/Update og:title Meta Tag
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute("content", title);

    // 5. Set/Update og:description Meta Tag
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute("content", description);

    // 6. JSON-LD Schema Script Updates
    document.querySelectorAll('script[data-seo-schema="true"]').forEach((el) => el.remove());

    if (schema || (breadcrumbs && breadcrumbs.length > 0)) {
      const schemas: any[] = [];
      
      if (schema) {
        if (Array.isArray(schema)) {
          schemas.push(...schema);
        } else {
          schemas.push(schema);
        }
      }

      if (breadcrumbs && breadcrumbs.length > 0) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.map((crumb, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": crumb.name,
            "item": crumb.url
          }))
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
  }, [title, description, schemaStr, breadcrumbsStr, canonicalUrl]);
}

import { generateFaqSchema, getFaqSchemaForPage } from "../utils/faqSchema";
export { generateFaqSchema, getFaqSchemaForPage };

/**
 * Converts a FAQ array into a schema.org FAQPage object,
 * for AEO (Google AI Overviews, Perplexity, ChatGPT browsing).
 */
export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return generateFaqSchema(faqs) || {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [],
  };
}
