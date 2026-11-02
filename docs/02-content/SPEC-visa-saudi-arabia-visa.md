# Spec — `/visa/saudi-arabia-visa`

**Status: PROPOSED · 2 November 2026.** Not built. Needs the source work in §5
before any text is written.

This is the third item in the 2 November sequence, after the measurement
runbook and the two new articles. It is **a page, not an article**, so it does
not consume the new-URL allowance in
[Publication Standard v2](../growth/11-PUBLICATION-STANDARD-V2.md) — but it must
meet the same evidence bar, and it has a shorter review interval than any blog
post.

---

## 1. The correction that matters

I previously wrote `/visa/saudi-arabia`. **That URL is wrong.** The visa family
is keyed on `VisaGuide.id` and prerendered as `/visa/{id}`:

| Existing id | Live URL |
| --- | --- |
| `nepal-visa` | `/visa/nepal-visa` |
| `thailand-visa` | `/visa/thailand-visa` |
| `dubai-visa` | `/visa/dubai-visa` |

So the correct slug is **`saudi-arabia-visa`** →
`/visa/saudi-arabia-visa` and `/bn/visa/saudi-arabia-visa`. Shipping
`/visa/saudi-arabia` would create a second convention for one page, which is
exactly the kind of inconsistency that costs you later.

---

## 2. Why this is the highest-value missing URL

| Evidence | Reading |
| --- | --- |
| Six sibling visa pages exist; Saudi — the single most important destination on the site — has none. | We are missing the page for our own core audience. |
| The whole Umrah cluster (17 posts + `/umrah`) funnels to `uraltravel.co.uk` with no entry-page for "Saudi visa for Bangladeshis". | The money intent lands on a blog post instead of a page built to convert it. |
| 252 sitemap URLs, zero contain a Saudi visa intent. | Uncontested internally — nothing to cannibalise. |
| The reel's end card sends viewers to the domain; the natural next click is a visa page. | Attribution dead-ends at a blog post today. |

It is also **cheap**: no new template, no new component, no new route. One data
object lights up a page, a directory entry, FAQ schema, hreflang and the
sitemap, because `scripts/prerender.ts` maps `VISA_DATA` wholesale
(lines 1191–1200, 1856–1883, 3244).

---

## 3. The modelling trap — `requirementType` is a single string

Saudi Arabia does **not** have one visa route for a Bangladeshi pilgrim. The
pillar already documents three conditional categories:

1. Standard Umrah visa via Nusuk or an authorised external provider
2. An eligible airline stopover (the 96-hour route)
3. An eligible tourist-visa route, including package visa

`VisaGuide.requirementType` is one string, and every sibling page uses it as a
headline ("Visa On Arrival", "e-Visa"). Do **not** pick one route and drop the
other two — that would make the page wrong for most readers.

**Recommended value:** `"e-Visa — multiple eligible routes (see steps)"`, with
the three categories enumerated in `stepByStep` and `keyFacts`. If that reads
badly in the directory listing, the alternative is to extend the type union
with something like `"Multiple routes"`, which is a small code change and a
better long-term shape. Decide before writing.

## 4. Content spec

| Field | Requirement |
| --- | --- |
| `id` | `saudi-arabia-visa` |
| `country` | `Saudi Arabia` |
| `requirementType` | see §3 |
| `costBdt` | **No figure.** Fees change and vary by route. Say what the reader must check and where, and name which costs are charged by whom (visa fee vs biometric/enrolment vs agent service fee). |
| `processingTime` | Ranges with the caveat that biometrics and season change it; never a single number. |
| `documentChecklist` | Grouped: passport/photo; financial evidence; travel evidence (tickets/accommodation); health requirements; biometrics. Mirror the depth of the existing Nusuk article. |
| `stepByStep` | The three routes in order, each ending at "confirm on the official portal for your dates". Include what must be true *before* paying anyone. |
| `quickAnswer` | 60–90 words: which route applies to most Bangladeshi Umrah pilgrims, and that approval is not automatic. |
| `keyFacts` | 4–6 rows: eligibility by route, biometrics required, whether an agent is mandatory, permit needs (Rawdah), and where the fee is published. |
| `faqs` | 5–8, drawn from the pillar's FAQ where it already answers correctly — do not invent new answers. |

**Do not duplicate the blog cluster.** Link out to it: Nusuk app steps, the
stopover visa post, ihram/miqat, budget. This page owns *entry eligibility and
the application route*; the posts own the operational detail.

## 5. Sources — the gate before writing

Minimum three, primary first, all dated. Candidate set (verify each before use;
none may be cited from memory):

| # | Source | What it is for |
| --- | --- | --- |
| 1 | `https://www.haj.gov.sa/` | Umrah/Hajj visa categories and conditions for the applicable season |
| 2 | `https://www.nusuk.sa/` | Nusuk process, permitted application path |
| 3 | `https://mofa.gov.sa/` or the Saudi embassy route for Bangladesh | Tourist/e-visa eligibility for Bangladeshi passport holders |
| 4 | `https://www.moh.gov.sa/` | Health requirements, if the page states any (season-dated) |

Do **not** publish this page if 1–3 cannot be confirmed at their source. A visa
page built from secondary summaries is the single most damaging page you can
ship: it is where readers spend money.

## 6. Bengali parity

`getLocalizedVisas("bn")` merges `BENGALI_VISA_OVERRIDES[id]` over the English
object and **silently falls back to English** if the key is absent. The sitemap
still lists `/bn/visa/saudi-arabia-visa`.

That is the same defect class as the Dubai combo post: an English page on a
`/bn/` URL. So this release must include a `BENGALI_VISA_OVERRIDES` entry in the
same commit, covering at minimum `requirementType`, `costBdt`,
`processingTime`, `quickAnswer`, `keyFacts` and `faqs`.

## 7. Implementation checklist

- [ ] Object appended to `VISA_DATA` in `src/constants.ts`.
- [ ] `BENGALI_VISA_OVERRIDES["saudi-arabia-visa"]` added in `src/data/bengaliContent.ts`.
- [ ] `requirementType` decision made (§3) and applied consistently.
- [ ] Internal links: to `/umrah`, the pillar, Nusuk post, stopover post, ihram post.
- [ ] Inbound links: `/umrah` and the pillar each link to the new visa page.
- [ ] `npm run build` → confirm `/visa/saudi-arabia-visa` and `/bn/visa/saudi-arabia-visa`
      exist in `dist/` **and** in the generated sitemap, with hreflang both ways.
- [ ] FAQ schema renders (prerender generates it from `faqs`).
- [ ] Because no visa test exists in the repo, add `scripts/test-visa-saudi-arabia.ts`
      asserting: routes exist, BN override is present and non-English, ≥3
      references with HTTPS, and no currency figure in `costBdt`.
- [ ] Owner review of the visa claims — this page should not ship on my
      citation alone.

## 8. Maintenance

**Class: fast-moving.** Review every **90 days**, and immediately on any of:

- a new Nusuk or haj.gov.sa notice about Umrah visa categories
- a change to the stopover visa rules
- a change to tourist-visa eligibility for Bangladeshi passport holders
- any reader report that an application path did not work

Record the checked date in the page copy (the sibling pages do this) and in
`updatedAt` only when a claim actually changed.

## 9. Risks

| Risk | Mitigation |
| --- | --- |
| Visa categories change mid-season. | No fees, no promises, no "guaranteed"; every step ends at the official portal. |
| Readers treat the page as legal advice. | State plainly it is guidance, not an approval, and that eligibility is decided by the Saudi authorities. |
| Duplicates the pillar's visa section. | Pillar keeps the process narrative; this page owns eligibility-by-route and the fee-owner breakdown. Cross-link, don't copy. |
| Bengali falls back to English silently. | Override shipped in the same commit; test asserts it. |
| Stale within a season. | 90-day review class and a named owner. |
