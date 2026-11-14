import { SCHEDULED_BLOG_AEO_PANELS } from "../data/scheduledBlogIndex.generated";

/**
 * Per-article copy for the Essential Travel Insights panel
 * (`src/components/AeoInspector.tsx`, rendered at the end of a blog article by
 * both the React route and `scripts/prerender.ts`).
 *
 * The panel used to be one hard-coded Bangladesh block printed on every
 * Hajj/Umrah article through a denylist of exceptions, so UK pages carried
 * hajj.gov.bd, BDT budgets and Dhaka departure advice. It is now opt-in: a post
 * either declares its own `aeoSummary` + three dated `aeoFacts` in frontmatter
 * or it renders no panel. A missing entry is therefore normal, never a fallback
 * to somebody else's page.
 */
export type BlogAeoAudience = "uk" | "bd";

export interface BlogAeoKeyFact {
  label: string;
  value: string;
}

export interface BlogAeoPanel {
  audience: BlogAeoAudience;
  /** Wording for the panel subtitle: "Key facts … for <audience label>". */
  audienceLabel: { en: string; bn: string };
  summary: { en: string; bn: string };
  facts: { en: BlogAeoKeyFact[]; bn: BlogAeoKeyFact[] };
}

const DEFAULT_AUDIENCE_LABELS: Record<BlogAeoAudience, { en: string; bn: string }> = {
  uk: { en: "UK travellers", bn: "যুক্তরাজ্যের ভ্রমণকারীদের" },
  bd: { en: "travellers from Bangladesh", bn: "বাংলাদেশি ভ্রমণকারীদের" },
};

export function getBlogAeoPanel(slug: string): BlogAeoPanel | undefined {
  const panel = SCHEDULED_BLOG_AEO_PANELS[slug];
  if (!panel) return undefined;
  const fallback = DEFAULT_AUDIENCE_LABELS[panel.audience];
  return {
    audience: panel.audience,
    audienceLabel: {
      en: panel.audienceLabelEn ?? fallback.en,
      bn: panel.audienceLabelBn ?? fallback.bn,
    },
    summary: { ...panel.summary },
    facts: {
      en: panel.facts.map((fact) => ({ label: fact.label, value: fact.value })),
      bn: panel.facts.map((fact) => ({ label: fact.labelBn, value: fact.valueBn })),
    },
  };
}

/**
 * The audience an article writes for. Used for labels we cannot vary per post
 * (related-guide heading, CTA wording). Defaults to the Bangladesh audience so
 * an unlabelled post keeps the site's original voice instead of silently
 * claiming to be UK content.
 */
export function getBlogAudience(slug: string): BlogAeoAudience {
  return SCHEDULED_BLOG_AEO_PANELS[slug]?.audience ?? "bd";
}

export function isUkAudiencePost(slug: string): boolean {
  return getBlogAudience(slug) === "uk";
}

/** Slugs whose panel speaks to UK readers — used by the build guards. */
export function getUkAudienceSlugs(): string[] {
  return Object.entries(SCHEDULED_BLOG_AEO_PANELS)
    .filter(([, panel]) => panel.audience === "uk")
    .map(([slug]) => slug);
}
