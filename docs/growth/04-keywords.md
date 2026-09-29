# 04 — Keywords (audience-matched)

**Perspective:** targeting terms real Bangladeshi travelers type, at the intent that converts.
**Prereqs:** the existing [`../../SEO-KEYWORD-MAP.md`](../../SEO-KEYWORD-MAP.md) — this file extends it, it does not replace it.
**Feeds into:** [02](02-internal-linking.md) (anchor text), [03](03-content-topical-authority.md) (what to write), [05](05-aeo-geo.md) (question phrasing).

---

## 1. Principle: match the audience's real language, not textbook English

The target audience is Bangladeshi travelers who search in **English, Bangla, and Banglish**, often with the country baked into the query. Your keyword edge is the phrase **"from Bangladesh" / "for Bangladeshi"**. Global head terms ("cheap flights", "Dubai visa") are dominated by giants and unwinnable for a new site. **Win the long tail with local qualifiers.**

Every managed title/description in `src/utils/seoCopy.ts` and every internal-link anchor should lean into these qualifiers.

---

## 2. The qualifier patterns that win

Compose keywords from these building blocks — they carry high intent and low competition:

| Modifier type | Examples |
|---|---|
| **Origin** | "from Bangladesh", "from Dhaka", "from Chittagong/Chattogram", "from Sylhet" |
| **Nationality** | "for Bangladeshi", "for Bangladeshi passport holders", "for Bangladeshi citizens" |
| **Currency/budget** | "in BDT", "in taka", "cost", "budget", "cheap", "how much" |
| **Year/freshness** | "2026", "this year", "latest" |
| **Intent verbs** | "how to apply", "requirements", "documents needed", "processing time", "is it worth it", "best time to" |

**Formula:** `[destination/service] + [origin/nationality] + [intent] + [year]`
e.g. "Dubai visa requirements for Bangladeshi passport holders 2026", "cost of Umrah from Bangladesh 2026", "cheapest flights Dhaka to Kuala Lumpur".

---

## 3. Intent tiers (map each keyword to the right page)

Do **not** target transactional and informational keywords on the same page — split them, and let intent decide which page owns which term ([01](01-indexing-crawling.md) canonicals prevent cannibalization).

- **Transactional / commercial (money pages):** "cheapest flights Dhaka to X", "book X hotel", "X visa cost from Bangladesh" → flights/hotels/visa route pages. These carry affiliate revenue.
- **Informational (blog/guides):** "best time to visit X from Bangladesh", "is X visa-free for Bangladeshi", "how much does a trip to X cost" → blog posts & pillar pages, which then link to the money pages.
- **Navigational/brand:** "URAL travel", "ural-travel" → homepage. Low priority; you own these by default.

The existing `SEO-KEYWORD-MAP.md` already sets intent boundaries per URL — **extend that file** with the new cluster keywords rather than duplicating the map here.

---

## 4. High-opportunity keyword themes (build content around these)

Ranked by likely value for this niche (validate volume with free tools, §6):

1. **"visa-free countries for Bangladeshi passport 2026"** — high volume, high shareability, natural backlink magnet ([07](07-backlinks-free.md)). Pillar in Cluster A.
2. **"[destination] visa from Bangladesh"** — Dubai/UAE, Schengen, Malaysia, Thailand, Singapore, Saudi. High commercial intent.
3. **"Umrah cost from Bangladesh 2026"** and Hajj/Umrah logistics — high value, seasonal, trust-sensitive.
4. **"cost of trip to [destination] from Bangladesh"** — matches "how much" intent, easy long-tail wins.
5. **"cheapest/best time to fly Dhaka to [destination]"** — transactional, feeds flights affiliate.
6. **"best time to visit [destination]"** + "for Bangladeshi travelers" — informational top-of-funnel.
7. **Banglish/Bangla variants** — only actionable once Bengali URLs exist ([03](03-content-topical-authority.md) §5); note them now for later.

---

## 5. On-page keyword placement rules

For the target keyword of each page:
- In the `<title>` (front-loaded) and `<meta description>` (`src/utils/seoCopy.ts`).
- In the `<h1>` (one per page) and at least one `<h2>`.
- In the first 100 words of body content (also serves AEO — [05](05-aeo-geo.md)).
- In the URL slug where natural (don't retrofit existing indexed slugs — 301 cost outweighs benefit).
- As inbound internal anchor text from related pages ([02](02-internal-linking.md) §6).
- **Naturally.** No stuffing, no repeating the exact phrase 20 times. Use synonyms and related terms (Google understands topics, not just strings).

---

## 6. Free keyword research tools (no budget)

- **Google Search Console → Performance** — *your own* impression/click data once you have some; the single best source of what you're *almost* ranking for. Mine "queries with impressions but no clicks" and improve those pages.
- **Google autocomplete + "People also ask" + related searches** — free, real queries.
- **Bing Webmaster Tools keyword research** — free volume estimates.
- **Google Trends** — compare terms, spot seasonality (Umrah, holidays).
- **AnswerThePublic / AlsoAsked** (limited free) — question variants for AEO ([05](05-aeo-geo.md)).
- Avoid paying for tools until revenue justifies it; GSC + autocomplete is enough to start.

---

## 7. Verification & success metric

- [ ] Every money/hub page has one clear primary keyword mapped in `SEO-KEYWORD-MAP.md`.
- [ ] No two pages target the same primary keyword (cannibalization check).
- [ ] Titles/descriptions in `seoCopy.ts` reflect the mapped keyword + local qualifier.
- **Success:** GSC Performance shows rising impressions on qualifier-based long-tail terms within 4–8 weeks; refine pages that hit "impressions, low CTR" by improving title/description.
