# URAL — Content Strategy & Topical Authority Blueprint (2026)

> **Audience:** the URAL operator + any writer/agent producing content for `ural-travel.pages.dev`.
> **Method:** Koray Tuğberk Gübür's *Semantic SEO / Topical Authority* framework + Nathan Gotch's *content-gap & search-intent* architecture, adapted to a brand-new domain with no backlink authority yet.
> **Grounding:** this plan was written against the **actual** codebase (47 blog posts, 6 destination pillars, the real category system), not a guess. Where an earlier analysis assumed a gap that does not exist, this document corrects it.

> **Update — 15 October 2026, amended 19 October 2026: this file is the site-wide gap inventory and scoring model, not the current schedule.**
> Release order is owned by the **active cluster plan** — [`BANKING-FOREX-CLUSTER-PLAN.md`](BANKING-FOREX-CLUSTER-PLAN.md)
> for the money cluster opened on 19 October 2026, and [`UMRAH-CLUSTER-PLAN.md`](UMRAH-CLUSTER-PLAN.md) for the Umrah
> cluster — under the pipeline rules in [`CONTENT-OS.md`](CONTENT-OS.md) and the rows in [`CONTENT-QUEUE.md`](CONTENT-QUEUE.md):
>
> - **The Banking & Forex cluster is the most recently opened work** — hub `/banking` + `/bn/banking`, then the five
>   `Banking & Payments` node owners hardened and interlinked, on the [`A1-CLAIMS-LEDGER.md`](A1-CLAIMS-LEDGER.md)
>   evidence base.
> - **The Umrah cluster's remaining waves are paused, not closed** — `/umrah` + `/bn/umrah` hardened first (wave 1), then
>   the already-verified main guide (wave 2), then one bilingual child asset per wave. This supersedes the "Sprint 1"
>   scheduling in §12; §12's Sprint 0 (consolidate the Umrah cluster) is what was being executed, as waves.
> - **Fard Hajj remains a separate, linked topic** — `hajj-registration-bangladesh-government-vs-private-package-cost`
>   is a peer page for the Umrah guide to link to, never an Umrah child.
> - **India is still a real gap and still unscheduled.** Pillar E (§5), gap-register items #1–#2 (§6) and "Sprint 1"
>   (§12) stay valid as *analysis*. None of them is the next work item, so a tool that reads only this file will
>   recommend "Dhaka↔Kolkata land route" first — that recommendation is stale as a schedule.

---

## 0. Read this first — the honest data note

Any strategy that hands you exact "Monthly Search Volume: 2,400 / KD: 14" numbers for the **Bangladesh** market without a connected tool is giving you *invented precision*. Volume and difficulty are geo-specific and change monthly; nobody can read them reliably for `bd` from memory. This document therefore does **two** things differently:

1. It treats all volume/difficulty figures (including the ones in the analysis you pasted) as **directional hypotheses**, not facts — flagged, never load-bearing.
2. It ranks work by a **transparent priority score** you can compute yourself (§6), and it leans on Koray's core insight: for a young site, **topical completeness and internal consistency outrank chasing individual keyword volumes.** You win by *owning the whole topic*, not by sniping one high-volume term.

When you can, validate the hypotheses in **Google Search Console** (your own impressions/positions — the only free, true, first-party BD data) and optionally a real tool (Ahrefs/Semrush/KWFinder with the geo set to Bangladesh). GSC is the compass; everything else is a map drawn from memory.

---

## 1. Where URAL actually stands (ground-truth audit)

### 1.1 The real inventory

- **6 destination pillars**, each with 4 structured surfaces (destination guide / visa / flight route / trip cost): **Nepal, Thailand, Malaysia, Dubai (UAE), Singapore, Maldives** → 24 structured pages.
- **47 blog posts**, bilingual (English + Bengali, verified at parity in the build).
- Live tools: 3-tier BDT trip-budget calculator, flight/hotel search widgets, AEO answer snippets, author/editor E-E-A-T profile, FAQ/HowTo schema.

### 1.2 Cluster strength map (by real category counts)

| Cluster | Posts | Verdict |
|---|---|---|
| **Hajj & Umrah + Ziyarah/Stopovers** | **17** | **Already your strongest topical node.** Deep, specific, hard to beat. |
| Visa & Immigration | 7 | Strong for the 6 covered countries; absent for the West and India. |
| Banking / Forex / Payments | 5 | **A genuine moat** — nobody else covers Circular-33 / dual-currency / RFCD at this depth. |
| Cheap-flight / airlines / routes | 5 | Good; route *guides* can go deeper. |
| Destinations / budget itineraries | ~12 | Good for 6 hubs; shallow on sub-destinations. |
| Off-strategy aspirational | 2 (Chefchaouen, Havana) | **Flag — see §7.** Low feasibility for the BD-outbound mass market; dilutes focus. |

### 1.3 What the pasted analysis got wrong (because it lacked site access)

- ❌ *"Build a DIY Umrah hub"* — you already have **~17** religious-travel posts (Nusuk permits, ihram/miqat, women's mahram rules, elderly/wheelchair, Haramain train, hotel zones, Zamzam customs, open-jaw flights, 96-hr stopover, Ramadan i'tikaf…). The job is **not to build it — it's to pillar-ify and interlink it** (§5, §9).
- ❌ *"Pokhara is missing"* — `nepal-pokhara-itinerary` exists.
- ❌ *"Schengen only appears as attraction passes"* — partly true: you have an esim+**insurance** post and Europe experience passes, but **no visa-process guide**. That specific gap is real (§6).

**Net:** URAL is further along than the pasted analysis assumed. You are not starting a topical map — you are **completing and consolidating** one.

---

## 2. The competitive landscape (evidence-based)

Verified by fetching the actual sites, not assumed:

| Player | What they actually do | What they neglect (your opening) |
|---|---|---|
| **ShareTrip** | OTA with a `/travel-guide` section + a corporate `news.` subdomain (press releases, not travel content). `/visa-guide` is a **lead-gen form** ("select a country → request now"), i.e. *agency-assisted processing*, not DIY instructions. Medical-tourism (Malaysia) partnership. | Step-by-step DIY execution, exact BDT math, bank-circular specifics, airport-emigration friction, bilingual depth. |
| **GoZayaan** | JS-rendered app; **thin crawlable content**; growth is ads + app. | Essentially the entire organic/informational layer. |
| **Agencies (Obokash, Meherba, Flight Expert…)** | Package sales, offline Hajj/Umrah, flyers. | DIY self-service guides — *they are structurally disincentivized to publish them* (it kills their markup). |

**The strategic whitespace, confirmed:** **crawlable, DIY, BDT-transparent, bilingual, source-cited long-form content.** URAL already lives there. No competitor is contesting this ground with real content — so the race is URAL vs. *topical incompleteness*, not URAL vs. a strong content rival. That is a very winnable race.

---

## 3. The method, adapted (Koray + Gotch in one system)

**Koray Tuğberk Gübür — Topical Authority / Semantic SEO.** Pick a **Central Entity** and a **Source Context** (the unique angle only you can own), then cover the topic's **entire query network** — every prerequisite, attribute, sub-intent, barrier, and follow-up — with internal consistency, so Google models your site as *the* authority node for that topic. Momentum matters: publish densely and consistently within a topic before expanding outward.

**Nathan Gotch — Gotch SEO.** For each target, nail **search intent** (what the user actually wants), satisfy it **above the fold**, structure for scannability, and close the **content gap** (cover what rankers cover, plus what they miss).

**How they combine for URAL:**

```
          SOURCE CONTEXT (your unfair angle)
   "Self-service, BDT-first, source-cited execution
    for Bangladeshi passport holders"
                     │
         CENTRAL ENTITY ──────────────────────────────┐
   "Outbound international travel from Bangladesh"      │
                     │                                  │
     ┌───────────────┴───────────────┐                  │
     ▼                               ▼                  ▼
  CORE SECTION                   OUTER SECTION      PROCESSUAL
  (monetizable intent:          (authority/        (how-to, the
   flights, hotels, visa,        trust, breadth:    Gotch intent
   Umrah, forex)                 culture, safety,   satisfier on
   → earns commission            food, etiquette)   every page)
```

- **Core section** = pages close to money (booking, visa, Umrah, forex). These convert and must be complete first.
- **Outer section** = supporting authority content (culture, etiquette, safety, "is X halal", weather) that proves breadth and feeds internal links into the core. A young site needs *both* — core alone looks commercially thin to Google; outer alone doesn't pay.

---

## 4. URAL's Central Entity & Source Context (write this on the wall)

- **Central Entity:** *Outbound international travel from Bangladesh* (origin = Dhaka/Chattogram; traveler = Bangladeshi passport holder).
- **Source Context (the moat):** *"We show you how to do it yourself, in Taka, with the exact rules and official sources — the parts agencies hide because transparency kills their markup."*
- **Three recurring "attributes" that must appear in almost every piece** (this is what makes the site *semantically consistent* in Koray's sense):
  1. **BDT-first cost** (with USD alongside), expressed as ranges with dates.
  2. **Bangladeshi-passport reality** (visa route, bank/forex rule, airport/emigration friction).
  3. **Official, cited source** (government portal, bank circular, airline/airport page) linked for proof.

Everything below serves this entity through this context. A piece that can't carry at least two of the three attributes is probably **outer-section** support — or off-strategy (see Morocco/Cuba, §7).

---

## 5. The Topical Map

Organized by your **real** pillars. Legend: ✅ exists · 🟡 partial/thin · ➕ new (gap). This is the master semantic network — the goal is to make each pillar *complete* so Google sees a finished topic, not scattered posts.

### Pillar A — Religious travel (Umrah/Hajj) · **your flagship; consolidate, don't expand blindly**
- ✅ Pillar candidate: `umrah-hajj-guide-bangladesh-nusuk-bdt-cost` → **promote to the canonical "DIY Umrah from Bangladesh" pillar** and link all children to it (§9).
- ✅ Children already live: Nusuk app/Rawdah permit · ihram/miqat · hotel zones + Haramain train · women/mahram · elderly/wheelchair · Zamzam/gold customs · open-jaw DAC-JED/MED · 96-hr stopover · Ramadan i'tikaf · halal food Makkah/Madinah · Hajj gov-vs-private · Shariah dual-currency · pay hotels in BDT/bKash · Badr/Taif ziyarah.
- ➕ True remaining gaps (small): *Umrah with infants/children checklist* · *Umrah group vs. DIY decision guide* · *What breaks ihram — mistakes & fidya* · *Makkah↔Madinah luggage/left-luggage logistics*.
- 🟡 Consolidation risk: several posts overlap on "cost" and "hotels." Audit for cannibalization (§7).

### Pillar B — Banking / Forex / Payments · **your second moat; keep extending**
- ✅ Dual-currency endorsement · Circular-33 quota · RFCD vs travel quota · cash SAR/USD vs DCC fees · Shariah cards.
- ➕ Gaps: *Pay Agoda/Booking.com/Klook with bKash or dual-currency card — general guide* (you only cover the Makkah-hotel case) · *Bank-by-bank endorsement table (EBL/City Amex/BRAC/MTB/EBL) as a standalone comparison* · *3D-Secure / international-transaction toggle by bank app* · *USD cash declaration limits at DAC customs*.

### Pillar C — Airport / Emigration / Documentation · **high-urgency, low-competition; extend**
- ✅ DAC outbound immigration checklist (NOC/GO) · e-passport renewal (64 districts) · fresh-passport "travel-history ladder" · IATA codes directory.
- ➕ Gaps: *Job-holder NOC & GO at DAC — standalone deep guide* · *First-time traveler anti-rejection checklist* · *Transit/airport-transfer rules for BD passport (BKK/KUL/DXB)* · *Student/visit-visa holder emigration questions ("are you a TIP risk?")*.

### Pillar D — The 6 destination pillars · **deepen with sub-destinations**
Each hub currently = capital only. Add the obvious second cities (big intent, zero local competition):
- Nepal: ✅ Kathmandu, ✅ Pokhara → ➕ *Nagarkot sunrise* · ➕ *Chitwan* · ➕ *Nepal 7-day grand itinerary*.
- Thailand: ✅ Bangkok → ➕ *Phuket* · ➕ *Krabi* · ➕ *Pattaya* · ➕ *Bangkok→islands transit*.
- Malaysia: ✅ KL/Putrajaya → ➕ *Langkawi* · ➕ *Penang* · ➕ *KL→Langkawi transfer*.
- Dubai/UAE: ✅ Dubai, ✅ Abu Dhabi mosque → ➕ *Sharjah budget stays* · ➕ *UAE on a budget 5-day*.
- Singapore: ✅ 4-day MRT itinerary → ➕ *Sentosa with kids* · ➕ *Singapore↔JB (Malaysia) day trip*.
- Maldives: ✅ Maafushi budget → ➕ **IMUGA arrival-form step-by-step** (real gap, high urgency) · ➕ *local-island vs resort for BD families*.

### Pillar E — ➕ **INDIA — the missing pillar (highest-impact gap)**

> **Still no date (15 Oct 2026).** This is the largest *content* gap, not the next cluster. Do not start here;
> the rollout in progress is Umrah (see the dated note at the top of this file).

India is the **#1 outbound destination for Bangladeshis** by a wide margin, and you have **zero** coverage. For the Central Entity to look complete to Google, India cannot be absent. Build it as a full pillar mirroring the other six:
- ➕ *Dhaka↔Kolkata by land: Maitree Express train + Shyamoli/Green Line bus, Benapole/Petrapole border, BDT cost* (very high volume, operational intent).
- ➕ *India e-Visa (tourist/medical) for Bangladeshi passport — step-by-step* · ➕ *India medical-visa + attendant visa (Vellore/Chennai/Kolkata hospitals)* (medical tourism is massive and ShareTrip only touches Malaysia).
- ➕ *Dhaka→Delhi→Manali / Kashmir / Darjeeling-Sikkim budget itineraries* · ➕ *India trip BDT cost tiers* · ➕ *rupee/forex & card use in India for BD travelers*.
- **Note:** India–BD visa policy shifts with bilateral relations — every India page must carry a dated "verify current status at ivacbd.com / HCI Dhaka" caveat, exactly like your Thailand pages do.

### Pillar F — ➕ **West (Schengen / UK / US) — process guides, not just passes**
You sell experience passes for Paris/London/Rome/NYC but never explain *how a Bangladeshi gets the visa.* That's the hardest, most-searched barrier:
- ➕ *Schengen visa from Dhaka: VFS Global appointment slots, bank-statement/sponsorship rules, cover letter, travel insurance* (you already have the insurance post — link it in).
- ➕ *UK Standard Visitor visa from Bangladesh* · ➕ *US B1/B2: DS-160, interview prep, 214(b) refusal reasons, slot-wait reality*.
- Intent here is **informational/aspirational** and conversion is low, but it is *authority-defining* and link-attractive (Facebook-group gold). Treat as outer-section that elevates the whole domain.

### Pillar G — Outer-section authority (feeds links into Core; cheap to produce)
- ➕ *Is [X] halal-friendly? prayer spaces & halal food* per hub (you have Bangkok + Makkah; add KL, Singapore, Dubai, Maldives).
- ➕ *Best time to visit [hub] from Bangladesh (weather + fare seasonality)* · ➕ *SIM/eSIM & connectivity per hub* · ➕ *travel-safety & scams for first-time BD travelers* · ➕ *packing list by destination/season*.

---

## 6. The Content Gap register (prioritized, with an honest scoring model)

Instead of fake volume numbers, score each candidate **0–3 on five axes** and sum (max 15). This is reproducible and you can re-weight it:

- **I — Intent/urgency** (does the searcher need this *now*, mid-decision?)
- **B — Business value** (proximity to a flight/hotel/visa commission)
- **T — Topical completeness** (does it finish an incomplete pillar? Koray's lever)
- **W — Whitespace** (how absent is it from competitors / how winnable for a young site?)
- **E — Ease** (inverse effort — can you write it accurately and fast with sources?)

| # | Content piece | I | B | T | W | E | **Score** | Why first/last |
|---|---|---|---|---|---|---|---|---|
| 1 | **India pillar: Dhaka↔Kolkata land route (train+bus, border, BDT)** | 3 | 3 | 3 | 3 | 2 | **14** | Biggest missing entity; huge volume; operational intent; weak competition. |
| 2 | **India e-Visa + medical-visa for BD passport** | 3 | 3 | 3 | 2 | 2 | **13** | Opens the India pillar's visa surface; medical angle underserved. |
| 3 | **IMUGA Maldives arrival form — step-by-step** | 3 | 2 | 2 | 3 | 3 | **13** | High urgency (96-hr window), near-zero competition, fast to write. |
| 4 | **Pay Agoda/Booking/Klook with bKash or dual-currency (general)** | 3 | 3 | 2 | 2 | 2 | **12** | Transactional; extends your banking moat beyond the Makkah case. |
| 5 | **Schengen visa from Dhaka (VFS, bank statement, insurance)** | 2 | 2 | 3 | 3 | 1 | **11** | Authority-defining, link magnet; harder to keep accurate → dated caveats. |
| 6 | **Thailand: Phuket + Krabi budget guides** | 2 | 3 | 3 | 2 | 2 | **12** | Finishes the Thailand pillar; strong commercial intent. |
| 7 | **DAC job-holder NOC & GO — standalone** | 3 | 1 | 2 | 3 | 2 | **11** | High anxiety/urgency; you have the parent, this deepens it. |
| 8 | **US B1/B2 interview prep for BD applicants** | 2 | 1 | 2 | 3 | 1 | **9** | Pure authority/outer; hard, but almost no good BD-specific content exists. |
| 9 | **Malaysia: Langkawi + Penang** | 2 | 3 | 2 | 2 | 2 | **11** | Finishes Malaysia pillar. |
| 10 | **"Is it halal-friendly?" set (KL/SG/DXB/Maldives)** | 2 | 1 | 2 | 2 | 3 | **10** | Cheap outer-section; strong internal-link fuel; matches your Islamic-travel identity. |

> **How to use it:** **finish a pillar before you jump pillars** (Koray's momentum rule). Work order, however, comes from the active cluster plan, not from this table alone — see the dated note at the top of this file. Example: items 1→2 (+ India costs/flights/itinerary) would complete the India pillar as a *block*, which is worth more than 5 scattered high-score posts across 5 pillars.

---

## 7. Cannibalization & consolidation audit (do this before writing anything new)

Topical authority is hurt by *competing* pages as much as it's helped by complete ones. Before adding, fix overlaps:

1. **Umrah "cost" overlap.** Several posts touch Umrah cost (`umrah-hajj-guide-...-bdt-cost`, `book-flights-makkah-hotels-in-bdt`, hotel-zones, Ramadan). Designate **one** canonical cost pillar; make the others link *up* to it and cover only their narrow angle. Add an explicit "see the full cost breakdown →" link rather than re-estimating totals in each.
2. **Umrah "hotels" overlap.** `makkah-madinah-hotel-zones-haramain-train` is the canonical hotels node; other posts should reference it, not re-list hotels.
3. **Off-strategy aspirational posts — `chefchaouen-morocco`, `havana-cuba`.** Morocco and Cuba are extremely low-feasibility for the BD-outbound mass market (visa difficulty, no direct routes, tiny search demand in `bd`). In Koray's terms they **dilute the source context** — they're "travel content" but not *"outbound-from-Bangladesh"* content. Options, in order of preference:
   - **(a)** Re-angle them to the entity: *"Can a Bangladeshi actually visit Morocco/Cuba? Visa reality, routing via the Gulf, real BDT cost"* — makes them on-strategy.
   - **(b)** Leave them (they ship no bundle cost and do no harm) but **stop building more like them**.
   - **(c)** Only if you want maximum focus: `noindex` them so they don't dilute the topical signal, keeping the content for users who land via other channels.
   - *Recommendation:* **(a)** if you'll invest 30 min each; otherwise **(b)**. Don't delete — recoverable, and they're harmless.
4. **No orphan pages.** Every post must link to its pillar and be linked *from* it (§9). An unlinked post is invisible to the topical model.

---

## 8. On-page template (the publishing-ready blueprint, bilingual)

Every new piece follows this layout — it merges Gotch's intent-satisfaction with Koray's "answer-first + contextual vector," and it matches your existing AEO infrastructure (`getBlogAeoSnippet50Words`, FAQ/HowTo schema).

```
┌─ TITLE: {Primary entity} from Bangladesh ({year}): {the payoff/number}
│
├─ 1. HOOK (60–120 words) ── heart + mind + logic
│     Name the reader's real friction in their own words (the agency quote,
│     the airport anxiety, the "close to Haram" lie), then promise the
│     self-service way out. (This is your "someone is finally saying it" moment.)
│
├─ 2. ANSWER BOX (first screen, no scroll) ── the AEO/featured-snippet target
│     • One-paragraph direct answer (feeds getBlogAeoSnippet50Words)
│     • A BDT summary table (BDT primary, USD alongside), dated
│
├─ 3. THE STEPS ── numbered, scannable, each step = one decision/action
│     Every claim that involves a rule, fee, or form → cite + link an
│     OFFICIAL source inline (gov portal, bank circular, airline, airport).
│
├─ 4. THE THREE ATTRIBUTES (must appear): BDT cost · BD-passport reality · cited source
│
├─ 5. CONTEXTUAL CTA ── the booking widget / WhatsApp desk placed exactly where
│     intent peaks (after the "how to book flights/hotel" step), not bolted at the end.
│
├─ 6. FAQ (3–6 Q&A) ── answers the "People Also Ask" / follow-up query network;
│     emitted as FAQPage JSON-LD (your build already verifies this).
│
├─ 7. INTERNAL LINKS ── up to the pillar, across to 2–4 sibling nodes (§9)
│
└─ 8. SOURCES ── dated list of official links used, so the page is provably true.
      Bengali (বাংলা) version at full parity — not a translation of fluff, a
      genuine localization (your build enforces BN parity; keep it real).
```

**Freshness discipline (ties to your build):** when a piece changes rules/fees, bump `CONTENT_UPDATED` in `src/data/contentMeta.ts` so `sitemap.xml <lastmod>` updates — otherwise CI warns and crawlers see a stale date. Every page carries a dated "verify at [official source]" caveat for anything that can change (visa fees, forex limits).

---

## 9. Internal-linking architecture (the glue that *creates* topical authority)

Links are how Google learns that your 17 Umrah posts are **one authority**, not 17 strangers. Rules:

1. **Hub-and-spoke per pillar.** One pillar page (e.g., the DIY Umrah pillar) links *down* to every child; every child links *up* to the pillar. Bi-directional, always.
2. **Sibling links with descriptive anchors.** Each post links to 2–4 siblings using **entity-rich anchor text** ("Nusuk Rawdah permit", not "click here"). Anchors teach Google the relationships.
3. **Core ← Outer flow.** Outer-section posts ("is KL halal-friendly") link *into* core money pages (Malaysia visa/flights). This passes topical relevance toward the pages that convert.
4. **Cross-pillar bridges where intent really connects** (Umrah ↔ forex ↔ DAC emigration ↔ Jeddah flights). A reader booking Umrah needs the dual-currency card and the NOC — link them.
5. **Breadcrumbs + the crawlable `/blog` and `/bn/blog` hubs** (you already have these, verified) are the backbone — keep every new post wired into them.
6. **The momentum signal:** when you publish an India *block*, interlink all India pieces to each other on day one. A fully-wired cluster published together reads to Google as a confident authority move; the same pieces dribbled out unlinked do not.

---

## 10. E-E-A-T, authorship & trust

You already have an editor profile with a bio + documentary links and author entity in schema (the build verifies it). Extend it:
- **Byline every post** to the editor entity; keep the `sameAs` graph (LinkedIn/socials/Wikidata) consistent.
- **"How we verify" line** near sources: state that fees/rules were checked against official portals on {date}. This is the single most credible differentiator vs. agency flyers and vs. AI-spun competitor content.
- **First-hand signals** ("we booked this route in {month}", screenshots of the Nusuk/IMUGA steps, a real DAC emigration experience) — Google's "Experience" (the extra E) is exactly what agencies can't fake and OTAs don't bother with.

---

## 11. AEO / GEO layer (you're ahead here — extend the lead)

Your `robots.txt` already welcomes GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc., and you emit answer snippets + FAQ/HowTo schema. To get *cited* in AI answers (a real, growing traffic + authority channel for a niche like this):
- Lead every page with a **crisp, extractable, dated factual answer** (the Answer Box in §8) — AI engines lift these.
- Keep **entities explicit and consistent** (official place/airline/portal names, SAR/BDT figures) — semantic clarity is what both Google's topical model *and* LLMs reward.
- The combination *(BDT-specific + Bangladeshi-passport-specific + source-cited)* is a query shape almost nobody else satisfies — it's exactly what an LLM reaches for when asked "how does a Bangladeshi do Umrah on a budget." Own it.

---

## 12. Execution roadmap (sequenced, ~6 months, momentum-first)

Cadence target: **2–4 publishable pieces/week** (one *block* roughly every 2–3 weeks). Finish pillars; don't scatter.

> **Superseded as a schedule — 15 October 2026, amended 19 October 2026.** This roadmap still describes the work, but
> the *order and cadence* now come from the active cluster plan — [`BANKING-FOREX-CLUSTER-PLAN.md`](BANKING-FOREX-CLUSTER-PLAN.md)
> (the money cluster opened 19 October 2026) and [`UMRAH-CLUSTER-PLAN.md`](UMRAH-CLUSTER-PLAN.md) for the Umrah cluster:
> each cluster is split into waves, and a wave is **one bilingual asset** (English + Bengali routes together) awaiting
> owner release — not a 2–4-piece publishing week. **Sprint 1 (India) is deferred, not cancelled**: do not open it
> before the owner closes or re-prioritises the open cluster waves, and Fard Hajj stays a separate linked topic
> throughout.

**Sprint 0 — Hygiene & consolidation (week 1, no new content).**
- Cannibalization audit (§7): designate canonical Umrah cost + hotels nodes; add up-links.
- Re-angle or decide on Morocco/Cuba (§7.3).
- Promote `umrah-hajj-guide-...` to the formal DIY-Umrah pillar; wire all 17 religious posts hub-and-spoke (§9).
- *Outcome:* your strongest cluster becomes a visibly complete authority node — fastest ranking lift available, zero new writing.

**Sprint 1 — The India pillar (weeks 2–4).** Items #1, #2 + India costs/flights/itinerary, fully interlinked as a block. *Outcome:* close the single biggest entity gap.

**Sprint 2 — Transactional banking + Maldives IMUGA (weeks 5–6).** Items #3, #4 + the bank-by-bank endorsement table. *Outcome:* deepen both moats; quick high-urgency wins.

**Sprint 3 — Finish the Asia hubs (weeks 7–10).** Phuket/Krabi (#6), Langkawi/Penang (#9), Nagarkot/Chitwan, Sentosa/JB. *Outcome:* the 6 destination pillars become *complete*, not capital-only.

**Sprint 4 — Airport/emigration depth + outer-section (weeks 11–13).** NOC/GO standalone (#7), first-timer checklist, the "is X halal-friendly" set (#10) as link fuel.

**Sprint 5 — The West, as authority (weeks 14–18).** Schengen/VFS (#5), UK visitor, US B1/B2 (#8). Lower conversion, high authority + link attraction. Pair with heavy dated caveats.

**Ongoing — Freshness loop.** Monthly: re-verify fees/visa rules on the top 10 traffic pages, bump `CONTENT_UPDATED`, refresh the dated caveats. Stale accuracy is the one thing that kills a trust-based site.

---

## 13. Measurement & iteration (compass, not vanity)

Track in **Google Search Console** (free, true, BD-geo):
- **Impressions by page/cluster** — is the Umrah cluster gaining impressions as a *group* after interlinking? (topical authority shows up cluster-wide, not page-by-page).
- **Average position** for your 3 attributes' queries ("umrah cost bangladesh bdt", "imuga form", "dhaka kolkata train ticket").
- **Query count per URL** — a healthy topical page ranks for *dozens* of long-tail queries, not one. Rising query-count per URL = the semantic coverage is working.
- **Coverage/Indexing** — every new post indexed within ~2 weeks; if not, check internal links (orphan?) and `lastmod`.
- **Leading indicator:** new cluster → impressions in 2–6 weeks → positions climb over 2–4 months. Don't judge a piece before 8 weeks.

Only *then* consult a paid tool (geo = Bangladesh) to validate volume on your proven winners and find adjacent terms. **GSC first, tools second, memorized numbers never.**

---

## 14. Guardrails (so content work never breaks the site)

- **Bump `CONTENT_UPDATED`** when you add/edit content in `src/constants.ts` or `src/data/bengaliContent.ts`, or `sitemap.xml <lastmod>` goes stale (CI warns).
- **Run `npm run build` then `npm run verify:build`** before publishing — the ~134 checks guard schema, bilingual parity, meta uniqueness, internal-link resolution, and the Thailand/visa accuracy rules. Each new content type should ship with its check (the repo's convention).
- **Keep the determinism gate green** — don't let a build rewrite `public/sitemap.xml`/`rss.xml` except via a `CONTENT_UPDATED` bump.
- **Bengali parity is enforced** — never ship an English post without its genuine BN localization; the build will fail on fakes/stubs.
- **Every rule/fee gets a dated, cited, official source** — this is the brand. A single wrong fee on a trust site costs more than ten missing posts.
- **Don't publish thin, off-entity content** to hit a cadence number. One complete pillar beats ten scattered posts (Koray's whole thesis).

---

### Appendix — one-line summary for a busy day
> You already own the hardest-to-copy content in this market (DIY Umrah + BDT banking). **Finish what you started**: consolidate the Umrah cluster, build the missing **India** pillar, complete the six Asia hubs with second cities, extend the banking moat to general bookings, and add the West as authority — each as a *fully-interlinked block*, each piece BDT-first, passport-real, and source-cited, in both languages. Measure clusters in GSC, verify every build, and never let accuracy go stale.
