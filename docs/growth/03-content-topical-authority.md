# 03 — Content & Topical Authority

**Perspective:** giving Google and answer engines a reason to index and rank the pages.
**Prereqs:** [01-indexing-crawling.md](01-indexing-crawling.md) root causes B (thin content).
**Feeds into:** [02-internal-linking.md](02-internal-linking.md) (things to link to), [04-keywords.md](04-keywords.md) (what to write about), [05-aeo-geo.md](05-aeo-geo.md) (answer-friendly formatting).

---

## 1. The niche and the authority thesis

URAL is a **travel planning resource for Bangladeshi travelers** (flights, hotels, visas, destinations, trip costs, Hajj/Umrah), monetized via affiliate links (Travelpayouts / `emrld.ltd`). To rank, the site must become the **most complete, most specifically-Bangladeshi** answer to "how do I plan this trip from Bangladesh."

The winning angle nobody else nails: **everything from the Bangladeshi passport-holder's point of view** — BDT pricing, Dhaka/Chattogram/Sylhet departure realities, which countries are visa-free/visa-on-arrival for the green passport, embassy locations in Dhaka, Biman/US-Bangla/regional carrier context, Hajj/Umrah logistics. Generic global travel content loses; hyper-local Bangladeshi specificity wins.

---

## 2. Fix thin pages first (blocks indexing)

Per [01](01-indexing-crawling.md), `/flights` prerenders ~803 chars. Every hub and money page needs **≥ 1,000 words of genuinely useful, prerendered body content.** Priority order:

1. **The 5 category hubs** (`/flights`, `/hotels`, `/visa`, `/destinations`, `/costs`) — each needs:
   - A 150–250 word intro answering "what will I find here and why from Bangladesh."
   - A structured list/table linking to every child (doubles as internal linking, see [02](02-internal-linking.md)).
   - An FAQ block (3–5 Q&As) scoped to that hub, wired into `FAQPage` schema **without duplicating** questions used elsewhere (answer engines pick one URL per answer — see [05](05-aeo-geo.md)).
2. **Route/spoke pages** (individual flight routes, destination guides, cost pages) — each ≥ 800 words with real specifics: prices in BDT, seasons, tips, requirements.
3. **Blog posts** — most are probably fine on length; audit any under 600 words and expand.

**Content lives data-driven in `src/constants.ts`.** Adding body content likely means extending the data model (e.g., a `longIntro`, `sections`, `faqs` field per hub/route) and rendering it. **Medium risk (touches data model + prerender) — say so, don't ask.** Verify the prose appears in `dist/` HTML afterward.

---

## 3. Content upgrade rules (E-E-A-T for this niche)

Google rewards Experience, Expertise, Authoritativeness, Trust. For a travel-affiliate site with no famous author, build trust through **specificity and freshness**:

- **Concrete numbers with dates.** "As of September 2026, a Dhaka→Dubai return is roughly ৳X–৳Y" beats "flights are affordable." Add a visible "Last updated" date to money pages.
- **First-hand framing.** Even without a named expert, write from lived Bangladeshi travel reality (embassy queues, agent vs online booking, common visa rejection reasons).
- **Author & About signals.** Add a real `Organization`/`About` page (you have `#organization` schema — back it with a visible About page describing who URAL is and its editorial stance). Add `author`/`publisher` to article schema pointing at `#organization`.
- **Cite primary sources** for visa rules (embassy sites, IATA) — outbound links to authoritative sources build trust and don't leak meaningful equity for a site this size.
- **Answer the actual question in the first 100 words** (also critical for AEO — see [05](05-aeo-geo.md)).

---

## 4. New content to build topical authority (the content roadmap)

Build **clusters**. Each cluster = one pillar page + supporting posts, all interlinked ([02](02-internal-linking.md)). Prioritize by search demand from [04-keywords.md](04-keywords.md).

### Cluster A — Visa (highest commercial + informational intent for BD)
Pillar: "Complete Visa Guide for Bangladeshi Passport Holders (2026)."
Supporting posts (one per key destination + themes):
- Visa-free & visa-on-arrival countries for Bangladeshi passport (2026 list) — *huge* search volume, high shareability, backlink magnet.
- Dubai/UAE visa from Bangladesh: types, cost in BDT, processing time, documents.
- Schengen visa from Bangladesh: which embassy, appointment reality, rejection reasons.
- Malaysia / Thailand / Singapore / Indonesia visa from Bangladesh.
- Saudi visa for Umrah/Hajj vs tourist.

### Cluster B — Costs (matches "how much" intent, easy to rank)
Pillar: "How Much Does It Cost to Travel from Bangladesh in 2026 (by destination)."
Supporting: per-destination "trip cost from Dhaka" breakdowns in BDT (flights + hotel + visa + daily budget).

### Cluster C — Hajj & Umrah (high-value, high-trust, seasonal)
Pillar: comprehensive Umrah guide from Bangladesh (already have `/umrah`; deepen it).
Supporting: cost breakdown, best time, package vs DIY, documents, step-by-step, common mistakes. **Sensitive/religious topic — be accurate and respectful; cite official sources.**

### Cluster D — Destinations (informational, feeds affiliate)
Per top destination: "Best time to visit X from Bangladesh," "X itinerary for Bangladeshi travelers," "Is X worth it / budget vs luxury."

### Cluster E — Flights (transactional)
Deepen route pages: "Cheapest way to fly Dhaka→X," "Best airlines for the route," "When to book."

**Cadence:** ship 2–4 quality posts/week, always interlinked into the relevant cluster and up to the money page. Quality over volume — one 1,500-word deeply specific post beats five 400-word ones.

---

## 5. The Bengali content decision (remaining strategic choice)

Bengali is currently a **client-side toggle with no distinct URL** — invisible to Google, and a huge missed audience (most of the target market searches in Bangla or Banglish).

Two options — **owner decides (high-ish risk: routing change):**
- **Option 1 (recommended): real `/bn/` URLs.** Prerender Bengali versions at `/bn/...`, self-referential `bn-BD` hreflang paired with the English `en-BD` and `x-default`. This unlocks Bengali search traffic and is the correct long-term architecture. Significant work.
- **Option 2: stay English-only for now.** Then **do not emit `bn-BD` hreflang** (currently correct — don't add it). Revisit later.

Until Option 1 ships, treat the site as English-only for SEO purposes. Do not half-ship Bengali (toggle without URLs) and claim multilingual — it does nothing for search.

---

## 6. Content hygiene rules

- **No duplicate answers across pages.** If two pages answer the same question, either differentiate them or canonicalize. Especially FAQ answers — see [05](05-aeo-geo.md).
- **No AI-obvious filler.** Bangladeshi specificity is the moat; generic "travel is a wonderful experience" padding actively hurts.
- **Update, don't abandon.** Refresh prices and visa rules; bump the visible "last updated" date and the sitemap `<lastmod>` only when content truly changes ([01](01-indexing-crawling.md) §4).
- **Match managed metadata.** Titles/descriptions are in `src/utils/seoCopy.ts`; keep them in sync with the actual page content and target keyword ([04](04-keywords.md)).

---

## 7. Verification & success metric

- [ ] No hub/money page under 1,000 words in `dist/` HTML.
- [ ] Each cluster has a pillar + ≥ 4 supporting posts, all interlinked.
- [ ] Every money page shows a visible "last updated" date.
- [ ] About page live and referenced by `#organization` schema.
- **Success:** target keywords start appearing in GSC Performance (impressions first, then clicks) within 4–8 weeks; deep pages get indexed ([01](01-indexing-crawling.md)).
