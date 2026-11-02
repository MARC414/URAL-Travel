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

> ### STATUS 2 NOVEMBER 2026: **BUILT — the block was resolved by a different source.**
>
> The owner's NotebookLM run returned `NOT IN SOURCES` to every eligibility question,
> which was the useful answer: the ministry does not publish nationality eligibility in
> English. But it also surfaced the right portal, and that portal settles the question.
>
> | Source | Verified? | What it actually says |
> | --- | --- | --- |
> | `https://visa.visitsaudi.com/` | ✅ **primary, fetched** | Lists all 68 eVisa-eligible countries by region. **Bangladesh is not among them.** Also: eVisa is one year, multiple entry, up to 90 days; the tourist visa covers "Umrah (excluding Hajj)"; and "If your country is not in the list contact the nearest Saudi Arabia Embassy." |
> | `https://www.saudia.com/explore/visit-saudi-arabia/visas` | ✅ official carrier, fetched | "Tourists that are not from eligible countries list should apply for a consulate visa through Saudi embassies and consulates." Stopover transit eVisa: available to holders of a valid GCC / UK / USA / Schengen tourist visa, 90-day validity, stay up to 96 hours. |
> | `https://haj.gov.sa/en/Umrah` | ✅ primary, fetched | Umrah = Ihram + Tawaf + Sa'i; packages are booked through accredited providers integrated with Nusuk. |
> | `https://www.moh.gov.sa/en/healthawareness/pilgrims-health/pages/default.aspx` | ✅ primary, fetched | Publishes the current Hajj 1447-2026 and Umrah health-requirement documents. The PDFs themselves could not be downloaded here, so the page is cited for the existence and location of the requirement, not for specific vaccines. |
>
> **What this page can therefore say, all of it sourced:** Bangladesh is not on the
> 68-country list; the official fallback is a consulate visa; a transit eVisa exists
> but is conditional on holding another country's tourist visa; Umrah is permitted on
> a tourist visa but Hajj is not.
>
> **What it still cannot say, and does not pretend to:** the fee, the processing time,
> the biometrics step, or a document list. Those are issued consularly and are not
> published centrally in English. The page states that plainly and sends the reader to
> the embassy, which is more useful than a number copied from an agency.
>
> **Agency sources were not used.** ivisa, saudivisaoffice, evisaudi, hudhudtrip,
> visathing, obokash and umrah.com.bd all appeared in the research and none was cited.

--- | --- |
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

---

## 10. Owner's NotebookLM run — what it proved, and why it was worth doing

The research returned **`NOT IN SOURCES` to every eligibility question**. That is a
result, not a failure, and it changed the build:

| Question asked | Answer | Consequence |
| --- | --- | --- |
| Is Bangladesh on the eVisa list? | `NOT IN SOURCES` | The ministry pages genuinely do not answer it — so the answer had to come from the portal itself, which does. |
| Conditions for eVisa / visa on arrival | `NOT IN SOURCES` | Confirmed the gap is real, not a search failure. |
| Is an agent mandatory? | `NOT IN SOURCES` | The page now says the ministry *describes* packages as sold through accredited providers, and explicitly declines to call an agent "legally mandatory", because no official English page says that. |
| Fees, processing, biometrics | `NOT IN SOURCES` | The page publishes none of them, and says why. |
| Hajj 8–13 Dhul-Hijjah sequence | Outline headings only, procedure `NOT IN SOURCES` | Article B cannot be written to standard yet — see §11. |
| Vaccinations | ✅ quoted, `haj.gov.sa/en/Hajj` | Supported by the MOH requirement documents, which the built page points at. |

**The pattern worth remembering:** English-language Saudi government pages publish
*ritual guidance, virtues, health advice and contact details*. They do **not** publish
visa eligibility, fees, processing times or biometrics. Any site that states those
confidently got them from somewhere other than the ministry — usually a competitor's
marketing copy.

## 11. Article B — the source position, now precise

`hajj.nusuk.sa/Journey` gives the **order** of the rites as outline headings
(airport → Makkah → Mina/Tarwiyah → Arafah → Muzdalifah → Jamrat al-Aqaba → sacrifice
→ Tawaf al-Ifadhah and Sa'i → night of the 10th in Mina → 11th → 12th → 13th →
Tawaf al-Wadaa). Everything procedural — times, pebble counts, nafar awwal conditions,
where shaving sits for Hajj — is `NOT IN SOURCES`.

So Article B as planned (a 1,100–1,300 word day-by-day) **cannot be written to the
house standard**. What *is* writable is a shorter piece built on the official order,
with an explicit "the ministry does not specify this here" marker on every step, and
the operational detail delegated to the group leader and the package operator.

**Status: BUILT — 2 November 2026, after the source position changed.**

The owner supplied a second source set: six dated Islam Q&A answers. They were fetched
and read in full, not taken on trust. They answer all eight questions, and the reason
is worth recording, because it reframes the whole problem:

> **The ministry was never going to answer these.** Visa eligibility, ritual validity
> windows, pebble counts and exit conditions are *fiqh* questions, not administrative
> ones. `haj.gov.sa` publishes logistics, virtues and health advice. The ruling on when
> a standing is valid belongs to scholarship. Asking the ministry for it was asking the
> wrong institution, and the `NOT IN SOURCES` result was the correct answer to a
> misframed question.

**The verified procedural ledger**

| Question | Answer | Source |
| --- | --- | --- |
| Arafah window | From the zenith on the 9th until dawn on the 10th — Malik, Abu Hanifah and the majority; Ahmad said from dawn on the 9th | [144830](https://islamqa.info/en/answers/144830) |
| Late arrival | Reaching Arafah any time before dawn on the 10th is valid — the Hajj is not lost | 144830 |
| Aqabah stoning | After sunrise until sunset on the Day of Sacrifice; the weak at the end of the night; not delayed past dawn on the 11th | [36436](https://islamqa.info/en/answers/36436) |
| Tashreeq order | Small (furthest from Makkah) → middle → Aqabah, seven each, du'a after the first two only | [27090](https://islamqa.info/en/answers/27090) |
| Tashreeq timing | Opens when the sun passes the zenith; closes at the end of the night; night stoning permitted when it is hard by day | 36436 |
| Pebbles | 7 on the 10th, then 21 a day — 49 leaving on the 12th, 70 staying to the 13th | 27090 (counts derived, arithmetic stated on the page) |
| Nafar awwal | Out of Mina after stoning and before sunset; caught by sunset ⇒ must stay and stone on the 13th; involuntary detention (traffic) is excepted | [205161](https://islamqa.info/en/answers/205161), 27090 |
| Shaving on the 10th | Between the sacrifice and Tawaf al-Ifadhah — the step the ministry's own Day 10 list omits | 27090, [31822](https://islamqa.info/en/answers/31822) |
| Arafah boundary | Standing **outside** the boundary invalidates the Hajj — the counterpart to the late-arrival relief: time is forgiving, place is not | [34293](https://islamqa.info/en/answers/34293) |
| Talbiyah, qiblah | Talbiyah continues until Aqabah is stoned on the 10th; du'a faces the qiblah, not the mountain | 34293 |
| "Hastening" defined | Leaving on the 12th **after stoning**; leaving first and stoning later is not hastening | [43274](https://islamqa.info/en/answers/43274) |

**Editorial consequence.** The article's spine is now the *gap* between the two source
classes: the ministry's order, joined to the dated rulings it leaves out. That is a
genuinely differentiated page rather than a restatement of headings, and it lets the
reader see which sentence comes from which institution.

**Shipped as** `hajj-rites-mina-arafah-muzdalifah-day-by-day`, 1,770 EN words (BN at parity)
plus the boundary and hastening sections, eight references, three traveller checks, no commercial CTA (A2), guarded by
`test:hajj-rites` (22 checks).
