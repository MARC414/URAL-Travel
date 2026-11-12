# SPEC — Umrah & Hajj from the UK (2026): research-first brief

**Status:** RESEARCH PHASE — pass 1 (S1–S9) logged 11 Nov 2026 in
[RESEARCH-uk-umrah-hajj-2026-11-11.md](RESEARCH-uk-umrah-hajj-2026-11-11.md) (6 primaries
collected; open questions 2, 3, 5 pending pass 2) — owner declared focus, 11 November 2026: *"I will focus on
UK-umrah-hajj guide fully, maintaining SEO, AEO, natural writing, authentic verified info
from govt sources and other true links, live record, practical outlook."*
This is the owner approval the archived S4 cluster required. Publishing still passes
G1–G7 of [Publication Standard v2](../growth/11-PUBLICATION-STANDARD-V2.md). The weekly
cap was removed by owner decision on 12 November 2026; this SPEC now covers the **cluster**
below, not a single URL.
**Provenance:** derived from archived [Brief 1](../history/2026-10-strategy-baseline/growth/19-S4-UK-DIASPORA-DRAFTS-PLAN.md)
(Umrah from London & Manchester), extended to include Hajj at owner's request. Archived
assumptions (UMM, BIC, GBP-issued ticket proof) are **prompts, not facts — every one is
re-verified below.**
**Decision recorded in:** [PLAN-gsc-content-2026-11-11](PLAN-gsc-content-2026-11-11.md) §5.

---

## 1. G1 — distinct job (checked 11 Nov 2026)

- No `/umrah-uk`, `/hajj-uk`, or UK-pilgrimage URL exists in `public/sitemap.xml` (262 URLs).
- `/destinations/london-guide` is a sightseeing guide — different job; link only if genuinely
  useful, never as filler.
- The job: **a UK resident (often a Bangladeshi passport holder with BRP/eVisa) arranging the
  whole pilgrimage from the UK** — which passport governs the visa, which airline flies
  LHR/MAN↔JED/MED, ATOL-protected booking, GBP budgets, and what differs from the Dhaka flow
  (`/umrah`).
- Pattern followed: mirrors the site's existing pillar
  `/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost` (Umrah + Hajj, one URL).

## 1a. Cluster scope (owner-approved 12 November 2026)

The pillar is live; the owner approved seven supporting URLs and removed the weekly cap, so they
ship in consecutive daily slots. Order and intent are recorded in plan §5 (cluster calendar).
Money intent first (packages/ATOL, flights), then visa mechanics, Hajj 2027, Ramadan, family
access, and stopover combinations. Every URL still passes G1–G6; G7 no longer caps cadence.

## 2. Structure decision

**Option A (chosen unless research says otherwise): one pillar URL** —
"Umrah & Hajj from the UK (2026)" — EN + BN twins, mirroring the BD pillar.
**Option B (fallback):** Umrah-only URL first (archived brief 1 as-written), Hajj-from-UK as a
second URL in a later week *if* Hajj-UK query evidence or owner request justifies it (G1: if the
research shows Hajj-UK questions can be served as a 400-word section, they become a section —
that is the fail-behaviour, not a new URL).

## 3. Research protocol — how, and from whom

Every claim that reaches the draft needs: `name`, `nameBn`, HTTPS `url`, **checked date**
(G2: ≥3 primary references minimum; this brief targets ~10). Primary first; aggregator blogs
never carry a rule.

### Source matrix (collect URLs + checked dates before drafting)

| # | Question the source must answer | Primary source | Why it matters |
| --- | --- | --- | --- |
| S1 | Entry rules, visa type, exit rules for the UK departure | **UK FCDO — Saudi Arabia travel advice** (`gov.uk/foreign-travel-advice/saudi-arabia`) | The UK reader's home authority; sets the "what changes vs Dhaka" frame |
| S2 | Who can apply for the Saudi eVisa/Umrah visa **from the UK**, and on which passport | **Saudi eVisa official portal** (visa.visitsaudi.com / KSA visa service) | **Core research question:** does a BD passport + BRP/eVisa resident apply as a UK resident, or as a BD national? Verify — never from memory |
| S3 | Umrah permit/visa routing for UK-based applicants | **Nusuk** (nusuk.sa) | Same app the site already documents; UK flow may differ |
| S4 | Umrah & Hajj rules, Hajj seasons/quotas, UK pilgrim regulations | **Saudi Ministry of Hajj and Umrah** (haj.gov.sa) | The govt source the owner requires |
| S5 | Haramain logistics (train, hotels, zones) | **Visit Saudi / Haramain** | Ties into the existing Makkah/Madinah cluster |
| S6 | Which airlines fly LHR/MAN↔JED/MED, schedules, baggage | **Airline official sites** (Saudia, British Airways, Virgin, others as found) | Direct vs one-stop; the fare table's spine |
| S7 | Booking protection, financial cover for UK pilgrims | **UK CAA / ATOL** (caa.co.uk, atol.org) | The "practical outlook" the owner asked for — UK booking ≠ BD desk booking |
| S8 | Hajj 2027 timing and UK registration windows | **haj.gov.sa + UK-licensed Hajj operator scheme** | Dates only when announced; label estimates as estimates |
| S9 | Dated GBP fare snapshots | **Live affiliate search results** (Aviasales etc.), value + screenshot + "checked \<date\>" | Brief 2's evidence pattern, applied here |

### Open questions — must be answered BEFORE drafting (each = research task)

1. **Passport-vs-residency rule for the Saudi visa** (S2): a Bangladeshi citizen living in the
   UK — apply via which channel, on which document? This decides the whole article's spine.
2. **96-hour stopover eVisa** — does it apply to UK-passport *and/or* UK-resident BD-passport
   holders equally? (The archived brief's own open question; `/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah`
   documents the **BD** angle only — do not import its conclusions.)
3. **Direct services:** which LHR/MAN↔JED/MED routes actually operate for the travel dates
   (year-round vs seasonal)? Schedules change; stamp every finding with a date.
4. **Hajj 2027:** season dates announced? UK registration window? Licensed-operator list
   current? If not announced, say "not yet announced — checked \<date\>" (Number rule).
5. **GBP budget basis:** which figures are live counters (dated at check-in) vs fixed reference
   values, and the GBP/BDT rate note with its date.

## 4. Quality standards the owner named, mapped to repo machinery

| Owner's requirement | How this repo enforces it |
| --- | --- |
| SEO | `seoTitle`/`seoDescription` EN+BN, one query per URL, hub in `SEO-KEYWORD-MAP` row at publish |
| AEO | Answer-first "short answer" paragraph, question-shaped H2s, `generateFAQSchema` FAQ block, speakable summary, a table/list the reader can act on (§3 of the Standard: short is allowed, thin is not) |
| Natural writing | [AI-WRITING-PROMPTS](../growth/AI-WRITING-PROMPTS.md) + [Content Upgrade Standard](../growth/10-CONTENT-UPGRADE-STANDARD.md); one reader task; no keyword stuffing; no generic "plan your trip" filler |
| Authentic govt/true sources | G2 source matrix above; every rule claim carries its checked date; new factual claims considered against [A1-CLAIMS-LEDGER](../growth/A1-CLAIMS-LEDGER.md) |
| Live record | Fares/prices = dated snapshots ("checked \<date\>"); GBP embeds `currency=GBP&locale=en-gb`; every money figure sourced & dated (Number rule) — the master plan found three wrong rate tables, so no undated figure ships |
| Practical outlook | ATOL/CAA booking cover, Section 75/payment advice, airport transfer reality, what to do when a rule changes mid-trip — the section the archived briefs never had |

## 5. Pre-mapped links — existence verified 11 Nov 2026

**Out of this article (G4: ≥4, ≥2 blog→blog, ≥1 hub/money):**
- `/umrah` (hub/money) ✓ exists
- `/blog/dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia` ✓ exists (blog→blog)
- `/blog/dhaka-airport-outbound-immigration-checklist-noc-go` ✓ exists (blog→blog)
- `/blog/saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah` ✓ exists (blog→blog, BD-angle link with an explicit "for the Bangladesh flow" label)
- `/blog/hajj-umrah-accommodation-guide-makkah-madinah` + the Makkah/Madinah hotel cluster ✓ all exist (blog→blog; **this also gives the new cluster one of its missing inbound links** — see plan §10)
- **GBP budget post (archived brief 1's target) does not exist** → link `/costs/*` or hold; never a dead link
- WhatsApp BDT-desk: one bridging line only, per archived brief

**Into this article (G4: ≥2 posts link in, same release):**
- `/blog/umrah-hajj-guide-bangladesh-nusuk-bdt-cost` internalLinks (constants.ts) — add
- `/umrah` hub outbound list (UmrahLandingPage/prerender) — add
- BN twins mirror the same set in `internalLinksBn` (explicitly written, not copied paths)

**Affiliate CTAs (all present in `AFFILIATE_LINKS` today):**
`aviasales` (UK↔SAUDI markets; tag with `?sub_id=` per Travelpayouts dynamic SubID) ·
`kiwitaxi` (Jeddah/Madinah pickup) · `klook` where verifiable · WhatsApp line as bridge only.
S2 disclosure: footer disclosure exists site-wide (`staticAffiliateDisclosure`) — verify it
renders on the new page before scheduling (site freeze S2 condition).

**Constraints carried from the plan:** hreflang stays `en-bd`/`bn-bd` (**no `en-gb`** —
unapproved); no domain change; publication ≤1 new URL/week while measurement is broken.

## 6. Gates checklist at scheduling time

- [ ] G1 distinct job — done (§1), re-check sitemap the day of scheduling
- [ ] G2 ≥3 primary refs, all four fields + checked date — target ~10 (§3)
- [ ] G3 demand signal — **owner request (this document, 11 Nov) + UK = #2 country,
  269 impressions, 1 click (GSC 11 Nov)** — both valid under §2.2
- [ ] G4 links both ways — §5 map, both locales
- [ ] G5 EN + BN body at publish, same facts, written BN `internalLinks`
- [ ] G6 maintenance owner + `fast-moving` (90 days) — visa/fares/ATOL rules drift
- [x] G7 cadence — **no weekly cap** (owner, 12 Nov 2026); cluster ships in consecutive daily slots

## 7. Drafting order once research closes

1. Resolve open questions 1–4 (they decide the outline).
2. EN draft (1,200–1,600 words target; length never the goal — the 90-day impression test
   applies: no own-query impressions by ~Feb 2027 → merge/301 per §3).
3. BN twin, same facts, written `internalLinksBn`.
4. FAQ schema + answer-first block + GBP table with checked dates.
5. Internal-link release: the two inbound links (§5) ship **in the same release**.
6. `SEO-KEYWORD-MAP` row + plan §5/§9 update + schedule in the next free daily slot.
7. Measure at the **2 Dec 2026** export with the UK track (plan §5 checkpoint).
