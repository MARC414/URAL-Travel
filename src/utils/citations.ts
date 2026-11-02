/**
 * Inline citation markers (`[1]`, `[১]`) inside article bodies.
 *
 * The body prose was always authored with numbered markers, but they rendered as
 * plain text: a reader who wanted to check a claim had to scroll to the bottom,
 * count down a list, and match the number by eye. These helpers turn the marker
 * itself into a jump link to the matching entry in the sources block.
 *
 * ONE definition, used by both renderers. `src/routes/BlogPostRouteView.tsx` builds
 * React nodes from it and `scripts/prerender.ts` builds HTML from it, so the
 * clickable marker exists in the served HTML *and* after hydration. The repo has
 * been bitten before by a feature that lived only in the React view and vanished
 * for crawlers; a citation that disappears without JavaScript is worse than a
 * plain number, because the number at least survives.
 */

/** Bengali digits, index == value. */
const BENGALI_DIGITS = "০১২৩৪৫৬৭৮৯";

/**
 * Matches a bare bracketed number, in either script.
 *
 * The negative lookahead is load-bearing: `[text](https://…)` is the body's own
 * markdown link syntax, and `[1](https://…)` is a legitimate numbered link. Without
 * `(?!\()` the citation pass would eat those and leave the URL as loose text.
 */
export const INLINE_CITATION_PATTERN = /\[([0-9]{1,3}|[০-৯]{1,3})\](?!\()/g;

/** Parses either script's digits. Returns null for anything that is not a number. */
export function parseCitationNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (/^[0-9]+$/.test(trimmed)) return Number.parseInt(trimmed, 10);
  if (/^[০-৯]+$/.test(trimmed)) {
    let value = 0;
    for (const char of trimmed) {
      const digit = BENGALI_DIGITS.indexOf(char);
      if (digit < 0) return null;
      value = value * 10 + digit;
    }
    return value;
  }
  return null;
}

/** The DOM id the sources block puts on the entry a citation points at. */
export function citationAnchorId(index: number): string {
  return `source-${index}`;
}

/**
 * Resolves a marker against the article's reference list.
 *
 * Returns null when there is no such source, which is deliberate: a body that
 * cites `[7]` on an article with five references is a content bug, and rendering
 * a link to nowhere would hide it. The marker stays as literal text so the
 * mismatch is visible instead.
 */
export function resolveCitation(raw: string, referenceCount: number): number | null {
  const value = parseCitationNumber(raw);
  if (value === null || value < 1 || value > referenceCount) return null;
  return value;
}

/**
 * Rewrites `[n]` markers in an already-HTML-escaped paragraph into jump links.
 *
 * Runs after escaping because `[` and `]` are not escaped characters, so the
 * pattern still matches, while any text the user sees inside the tag is escaped
 * exactly once. It is idempotent-safe against the reference list itself because
 * only body paragraphs call it.
 */
export function linkifyCitations(
  html: string,
  referenceCount: number,
  className: string,
): string {
  if (!referenceCount) return html;
  return html.replace(INLINE_CITATION_PATTERN, (match, raw: string) => {
    const index = resolveCitation(raw, referenceCount);
    if (index === null) return match;
    return `<a href="#${citationAnchorId(index)}" class="${className}">[${raw}]</a>`;
  });
}

/** The class string shared by both renderers so the marker looks identical. */
export const CITATION_LINK_CLASS =
  "text-emerald-800 font-semibold no-underline hover:underline decoration-1 underline-offset-2";
