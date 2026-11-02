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

**Resolved 2 November 2026 — there is no decision to make.** `VisaGuide.requirementType`
is declared as `"Visa On Arrival" | "e-Visa" | "Sticker Visa / Sticker Required" | "Visa Free" | string`.
The trailing `| string` means any string already type-checks: the union is
documentation, not a constraint. `requirementType` is also used in exactly two
places, both display-only (`src/routes/VisaRouteView.tsx:74` and `:120`) — no
switch, no colour map, no filter. So a new value costs nothing and risks nothing.

**Use `"Multiple routes — check eligibility"`.** It is accurate, it reads
naturally in the directory listing beside "Visa On Arrival" and "Visa Free",
and it sets the reader's expectation that they must find out which route is
theirs. The three routes are then enumerated in `stepByStep` and `keyFacts`.

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

> ### STATUS 2 NOVEMBER 2026: BLOCKED. Do not write this page yet.
>
> I attempted the source verification and could not complete it. What I found:
>
> | Source tried | Result |
> | --- | --- |
> | `haj.gov.sa/en/Umrah` | **Live and authentic** (updated 19 Oct 2026). Confirms Umrah = Ihram + Tawaf + Sa'i, and that packages are booked through accredited providers integrated with Nusuk. **Says nothing about visa eligibility by nationality.** |
> | `hajj.nusuk.sa/Journey` | Maintenance page, twice, hours apart. |
> | `umrah.nusuk.sa/Journey` | Live. Rites only; no visa eligibility. |
> | `visa.mofa.gov.sa` | Live, but an Arabic-language transactional portal (login + service selection). No citable eligibility statement. |
> | `mofa.gov.sa/en/visa` | 404. |
> | `ksavisa.sa` | Live, but it is an AI virtual-assistant interface, not a document. Cannot be cited. |
>
> Every search result describing Bangladeshi eligibility (ivisa.com, saudivisaoffice.com,
> evisaudi.com, hudhudtrip.com, hotelsinmakkah.com) is a **commercial visa agency**.
> They broadly agree — Bangladesh is not on the tourist eVisa list; a used US/UK/Schengen
> visa or GCC residency opens the eVisa route; otherwise the Umrah visa goes through a
> licensed agent on the Masar system — but **not one of them is a government source**, and
> S1 forbids publishing a visa page from them.
>
> **This is the correct outcome, not a delay.** A visa page whose central claim — who is
> eligible for which route — rests on competitor agencies' marketing copy is the single
> most damaging page this site could publish. It is also the page a reader is most likely
> to act on with money.
>
> **What unblocks it (owner task, ~10 minutes):** open `https://ksavisa.sa` in a browser and
> ask the assistant "Umrah visa eligibility for Bangladeshi passport holders" — the tool is
> designed to answer exactly this and it is an official MOFA channel. Capture the answer
> **and the date**. Alternatively, the Saudi Embassy in Dhaka publishes consular guidance;
> a screenshot or PDF of the current notice is a citable primary source. Either one is
> enough for me to write the page.
>
> **Do not substitute:** a blog, an agency, or my own recollection of the rules.



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
