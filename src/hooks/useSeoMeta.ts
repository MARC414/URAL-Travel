import { useEffect } from "react";

interface SeoMetaProps {
  title: string;
  description: string;
  schema?: object | object[];
}

/**
 * Writes a page-specific <title>, <meta name="description">, and
 * JSON-LD <script type="application/ld+json"> tags into document.head.
 * Call this once per route/view with that page's data.
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

export function useSeoMeta({ title, description, schema }: SeoMetaProps) {
  const schemaStr = safeStringify(schema);

  useEffect(() => {
    document.title = title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Clear any previously injected schema before adding new ones
    document.querySelectorAll('script[data-seo-schema="true"]').forEach((el) => el.remove());

    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
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
  }, [title, description, schemaStr]);
}

/**
 * Converts a FAQ array into a schema.org FAQPage object,
 * for AEO (Google AI Overviews, Perplexity, ChatGPT browsing).
 */
export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
