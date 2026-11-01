export type SiteSearchKind =
  | "destination"
  | "hotel"
  | "flight"
  | "visa"
  | "cost"
  | "article"
  | "tool"
  | "hub"
  | "other";

export interface SiteSearchEntry {
  id: string;
  kind: SiteSearchKind;
  pathEn: string;
  pathBn?: string;
  titleEn: string;
  titleBn?: string;
  summaryEn: string;
  summaryBn?: string;
  /** Visible page copy plus verified query aliases from both locales. */
  searchText: string;
}

export interface SiteSearchResult {
  entry: SiteSearchEntry;
  path: string;
  title: string;
  summary: string;
  score: number;
}

export interface PreparedSiteSearchEntry {
  entry: SiteSearchEntry;
  titleTokensEn: Set<string>;
  titleTokensBn: Set<string>;
  summaryTokensEn: Set<string>;
  summaryTokensBn: Set<string>;
  allTokens: Set<string>;
  titleNormEn: string;
  titleNormBn: string;
  corpusNorm: string;
}

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "can", "do", "for", "from", "how", "in", "is",
  "of", "on", "the", "to", "what", "which", "where", "with", "your",
]);

const KIND_INTENT_TOKENS: Partial<Record<SiteSearchKind, ReadonlySet<string>>> = {
  destination: new Set(["destination", "itinerary", "গন্তব্য", "ভ্রমণ"]),
  hotel: new Set(["hotel", "stay", "accommodation", "lodging", "হোটেল", "থাকা", "আবাসন"]),
  flight: new Set(["flight", "airfare", "ticket", "airline", "ফ্লাইট", "বিমান", "টিকিট"]),
  visa: new Set(["visa", "evisa", "ভিসা"]),
  cost: new Set(["cost", "budget", "expense", "খরচ", "বাজেট"]),
  tool: new Set(["tool", "calculator", "converter", "checklist", "টুল", "ক্যালকুলেটর"]),
};

function normalizeSearchText(value: string): string {
  return String(value ?? "")
    .normalize("NFKC")
    .toLocaleLowerCase()
    .replace(/[\u200c\u200d\ufeff]/g, "")
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, " ")
    .trim();
}

function stemToken(token: string): string {
  if (token.length > 4 && token.endsWith("ies")) return `${token.slice(0, -3)}y`;
  if (token.length > 4 && token.endsWith("es")) return token.slice(0, -2);
  if (token.length > 3 && token.endsWith("s")) return token.slice(0, -1);
  return token;
}

function tokenize(value: string): string[] {
  return normalizeSearchText(value)
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token))
    .map(stemToken);
}

/** Return true only for an exact match or a one-character typo on longer words. */
function matchesToken(queryToken: string, documentTokens: Set<string>): { matched: boolean; fuzzy: boolean } {
  if (documentTokens.has(queryToken)) return { matched: true, fuzzy: false };
  if (queryToken.length < 5) return { matched: false, fuzzy: false };

  for (const candidate of documentTokens) {
    if (Math.abs(candidate.length - queryToken.length) > 1) continue;
    let differences = 0;
    let left = 0;
    let right = 0;
    while (left < queryToken.length && right < candidate.length) {
      if (queryToken[left] === candidate[right]) {
        left += 1;
        right += 1;
        continue;
      }
      differences += 1;
      if (differences > 1) break;
      if (queryToken.length > candidate.length) left += 1;
      else if (candidate.length > queryToken.length) right += 1;
      else {
        left += 1;
        right += 1;
      }
    }
    if (left < queryToken.length || right < candidate.length) differences += 1;
    if (differences === 1) return { matched: true, fuzzy: true };
  }
  return { matched: false, fuzzy: false };
}

/**
 * Match the query against the generated public-page index. Search is deliberately
 * local and deterministic: it never sends the user's query to a third party.
 */
export function prepareSiteSearchIndex(entries: readonly SiteSearchEntry[]): PreparedSiteSearchEntry[] {
  return entries.map((entry) => {
    const titleEn = entry.titleEn;
    const titleBn = entry.titleBn || entry.titleEn;
    const summaryBn = entry.summaryBn || entry.summaryEn;
    const corpus = `${entry.searchText} ${entry.titleEn} ${titleBn} ${entry.summaryEn} ${summaryBn}`;
    return {
      entry,
      titleTokensEn: new Set(tokenize(titleEn)),
      titleTokensBn: new Set(tokenize(titleBn)),
      summaryTokensEn: new Set(tokenize(entry.summaryEn)),
      summaryTokensBn: new Set(tokenize(summaryBn)),
      allTokens: new Set(tokenize(corpus)),
      titleNormEn: normalizeSearchText(titleEn),
      titleNormBn: normalizeSearchText(titleBn),
      corpusNorm: normalizeSearchText(corpus),
    };
  });
}

export function searchSite(
  entries: readonly PreparedSiteSearchEntry[],
  query: string,
  locale: "en" | "bn",
  limit = 7,
): SiteSearchResult[] {
  const normalizedQuery = normalizeSearchText(query);
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const results: SiteSearchResult[] = [];
  for (const prepared of entries) {
    const { entry } = prepared;
    if (locale === "bn" && !entry.pathBn) continue;
    const title = locale === "bn" ? entry.titleBn || entry.titleEn : entry.titleEn;
    const summary = locale === "bn" ? entry.summaryBn || entry.summaryEn : entry.summaryEn;
    const titleTokens = locale === "bn" ? prepared.titleTokensBn : prepared.titleTokensEn;
    const summaryTokens = locale === "bn" ? prepared.summaryTokensBn : prepared.summaryTokensEn;

    let score = 0;
    let allMatched = true;
    for (const token of queryTokens) {
      const titleMatch = matchesToken(token, titleTokens);
      const summaryMatch = matchesToken(token, summaryTokens);
      const anyMatch = titleMatch.matched || summaryMatch.matched
        ? { matched: true, fuzzy: titleMatch.fuzzy || summaryMatch.fuzzy }
        : matchesToken(token, prepared.allTokens);
      if (!anyMatch.matched) {
        allMatched = false;
        break;
      }
      score += titleMatch.matched ? (titleMatch.fuzzy ? 5 : 12)
        : summaryMatch.matched ? (summaryMatch.fuzzy ? 3 : 6)
        : (anyMatch.fuzzy ? 1 : 2);
    }
    if (!allMatched) continue;

    const kindIntent = KIND_INTENT_TOKENS[entry.kind];
    if (kindIntent && queryTokens.some((token) => kindIntent.has(token))) score += 18;

    const normalizedTitle = locale === "bn" ? prepared.titleNormBn : prepared.titleNormEn;
    if (normalizedTitle.includes(normalizedQuery)) score += 30;
    else if (prepared.corpusNorm.includes(normalizedQuery)) score += 10;

    results.push({
      entry,
      path: locale === "bn" ? entry.pathBn! : entry.pathEn,
      title,
      summary,
      score,
    });
  }

  return results
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, locale === "bn" ? "bn-BD" : "en"))
    .slice(0, limit);
}

export function siteSearchKindLabel(kind: SiteSearchKind, locale: "en" | "bn"): string {
  const labels: Record<SiteSearchKind, { en: string; bn: string }> = {
    destination: { en: "Destination guide", bn: "গন্তব্য গাইড" },
    hotel: { en: "Hotel area guide", bn: "হোটেল এলাকা গাইড" },
    flight: { en: "Flight route", bn: "ফ্লাইট রুট" },
    visa: { en: "Visa guide", bn: "ভিসা গাইড" },
    cost: { en: "Trip cost guide", bn: "ভ্রমণ খরচের গাইড" },
    article: { en: "Travel article", bn: "ভ্রমণ নিবন্ধ" },
    tool: { en: "Travel tool", bn: "ভ্রমণ টুল" },
    hub: { en: "Planning hub", bn: "পরিকল্পনা হাব" },
    other: { en: "Site page", bn: "সাইট পেজ" },
  };
  return labels[kind][locale];
}
