# Plan — two new Hajj/Umrah articles (tawaf & the Hajj rites)

**Status: PROPOSAL · 2 November 2026.** Not started. This is the plan the owner
asked for before any prose is written.

Fills Gap A and Gap B from
[the reel coverage audit](../03-social/video/CONTENT-COVERAGE-AND-URL-MAP.md).

> **Answer to the direct question:** yes, I can write both to the house
> standard. I verified that Nusuk's own pages are reachable and quotable
> (`umrah.nusuk.sa/Journey`, `hajj.nusuk.sa/nusuk/hajj-rituals`), that all four
> candidate cover images already exist in three sizes, and that the scheduled-
> post pipeline supports `internalLinksEn` / `internalLinksBn`, references and
> per-locale alt text. Four decisions are needed from you before I start — §6.

---

## 1. Why two articles rather than two sections

The earlier recommendation was sections inside existing owners, on the grounds
that a new URL splits authority. The owner has decided otherwise on 2 November
2026, and [Publication Standard v2](../growth/11-PUBLICATION-STANDARD-V2.md) now
permits gated new URLs. The case is real:

- **Tawaf + sa'i** is a complete, self-contained task ("what do I actually do
  inside the Haram"), searched independently of visa and budget. It is not a
  sub-topic of the pillar's visa/cost job.
- **The Hajj rites sequence** is the core of Hajj and currently has no home. The
  Hajj article owns *registration and packages*, which is a different reader
  moment (before booking vs during Hajj).

Both are written to stand alone, then wired into the pillar so authority still
concentrates.

---

## 2. Article A — Tawaf and sa'i

| Field | Value |
| --- | --- |
| Slug | `tawaf-sai-seven-circuits-step-by-step-guide` |
| URL | `/blog/tawaf-sai-seven-circuits-step-by-step-guide` + `/bn/blog/…` |
| Category | Umrah & Hajj |
| Length | **1,000–1,200 words EN**, BN parity on the same facts |
| Read time | 6 min read / ৬ মিনিট পঠন |
| Cover | `umrah_makkah_haram_guide_1790430007679` (exists at 1200/960/640, webp+avif) |
| CTA | **None** — §4.2 forbids airfare and attraction CTAs on a religious-procedure page. Record "no relevant partner" in the queue row (A2). |
| Traveller checks | 3, see §5 |
| Test | `scripts/test-tawaf-sai-guide.ts` (new), wired to `package.json` |

**Reader job.** A first-time Bangladeshi pilgrim inside Masjid al-Haram needs to
know where tawaf starts, how to count seven circuits, what breaks a circuit, how
sa'i counting works, and what to do when the crowd pushes them off the mataf.

**Section outline (EN, mirrored in BN)**

1. Quick Answer — 7 circuits, counterclockwise, Kaaba on your left, start and
   end in line with the Black Stone; sa'i is 7 one-way lengths, Safa → Marwa,
   ending at Marwa.
2. Before you enter the mataf — ihram state, wudu if you can, what to leave
   behind, meeting point for your group.
3. Where tawaf begins and how to count — the alignment rule; a circuit ends when
   you return to the same alignment, not at a gate.
4. What is sunnah in the circuits — idtiba (right shoulder uncovered, men),
   ramal in the first three (men, when the crowd allows), two rak'ahs after
   where safe, Zamzam.
5. What does **not** break tawaf, and what does — staying in ihram, being pushed
   outward, walking vs being carried, wheelchair/pushed pilgrims.
6. Sa'i — starts at Safa, seven one-way lengths, Safa→Marwa counts as one,
   ends at Marwa on the seventh; men jog between the green markers, women walk;
   the 3.5-lap intuition explained so nobody stops halfway.
7. If you lose count, or the crowd closes — practical recovery, asking a
   companion, using a counted dhikr rather than a phone.
8. Wheelchair, elderly, and women's practicalities — link out rather than
   duplicate.
9. Frequently Asked Questions.

**Sources (primary first, all HTTPS, checked date recorded in `updatedAt`)**

1. Nusuk — Umrah Journey (tawaf and sa'i mechanics, official)
   `https://umrah.nusuk.sa/Journey`
2. Nusuk — Hajj Rituals (tawaf/sa'i in the Hajj context)
   `https://hajj.nusuk.sa/nusuk/hajj-rituals`
3. Saudi Ministry of Hajj and Umrah — awareness/guidance page for the applicable
   category (to be pinned during writing; the mirror used by the ihram article is
   `https://www.haj.gov.sa/en/Umrah/Miqaats`)
4. Ministry of Hajj and Umrah — Ihram awareness guide (PDF already cited by the
   ihram article), for the ihram-state dependency.

**Internal links (≥4; ≥2 blog→blog; ≥1 hub — R1)**

| # | Target | Anchor draft | Role |
| --- | --- | --- | --- |
| 1 | `/umrah` | DIY Umrah portal and BDT budget calculator | hub, placed first (R5) |
| 2 | `/blog/wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules` | ihram and miqat rules from Dhaka | sibling, the step before |
| 3 | `/blog/umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates` | women's gates and crowd timing | sibling |
| 4 | `/blog/umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide` | elderly and wheelchair access at the Haram | sibling |
| 5 | `/blog/hajj-rites-mina-arafah-muzdalifah-day-by-day` | the Hajj rites day by day | new sibling (Article B) |

---

## 3. Article B — The Hajj rites, day by day

| Field | Value |
| --- | --- |
| Slug | `hajj-rites-mina-arafah-muzdalifah-day-by-day` |
| URL | `/blog/hajj-rites-mina-arafah-muzdalifah-day-by-day` + `/bn/blog/…` |
| Category | Umrah & Hajj |
| Length | **1,100–1,300 words EN**, BN parity |
| Read time | 7 min read / ৭ মিনিট পঠন |
| Cover | `mina_hajj_tents_1790484325661` (exists at 1200/960/640, webp+avif) |
| CTA | **None** — religious procedure (A2, §4.2) |
| Traveller checks | 3, see §5 |
| Test | `scripts/test-hajj-rites-guide.ts` (new) |

**Reader job.** A pilgrim who has a Hajj package needs the operational sequence
from 8 to 13 Dhul-Hijjah: where they sleep, what they do each day, what to carry,
and what happens if the crowd or the timetable moves.

**Section outline**

1. Quick Answer — the sequence in one paragraph: Mina → Arafah → Muzdalifah →
   Jamarat, sacrifice, halq/taqsir, tawaf al-ifadah, Tashreeq days, farewell
   tawaf.
2. The five-to-six day shape — why some leave on the 12th (nafar awwal) and
   others stay to the 13th (nafar thani).
3. 8 Dhul-Hijjah — Mina (Yawm al-Tarwiyah): entering ihram for Hajj, travel,
   shortened prayers, what to carry.
4. 9 Dhul-Hijjah — Arafah, then Muzdalifah: the standing, sunset departure,
   combined prayers, overnight under open sky, pebble collection.
5. 10 Dhul-Hijjah — the busiest day: Jamarat al-Aqabah (7 pebbles only), the
   sacrifice where it applies, halq/taqsir, tawaf al-ifadah, link to Article A.
6. 11–12(-13) — the Tashreeq days: stoning all three jamarat after midday, 21
   pebbles a day, Mina nights, and the exit rule.
7. Before you leave Makkah — the farewell tawaf.
8. What to carry, and what to expect — heat, walking distance, hydration,
   losing your group, medication.
9. Frequently Asked Questions.

**Editorial position on madhhab — needs your decision (§6.1).** The ruling status
of several rites differs by school (for example sa'i is *wajib* in the Hanafi
school but *rukn* in the Shafi'i; halq differs similarly). A travel site must not
adjudicate. My recommendation: state the **agreed sequence and what the pilgrim
physically does**, mark where the schools differ, and tell the reader to follow
their own school and their package's guidance. I would not print a
"rukн/wajib/sunnah" column as if it were settled.

**Sources (primary first)**

1. Nusuk — Hajj Rituals `https://hajj.nusuk.sa/nusuk/hajj-rituals`
2. Saudi Ministry of Hajj and Umrah `https://www.haj.gov.sa/` — the applicable
   season page/notice, quoted with its date
3. Bangladesh Haj Management Portal `https://hajj.gov.bd/` — for the
   Bangladesh-pilgrim context and any current-season notice
4. Saudi Press Agency `https://www.spa.gov.sa/` — only if a dated operational
   announcement (Mina/Arafat arrangements) is used, and then with the date in
   the sentence

**Internal links (≥4; ≥2 blog→blog; ≥1 hub)**

| # | Target | Anchor draft | Role |
| --- | --- | --- | --- |
| 1 | `/blog/hajj-registration-bangladesh-government-vs-private-package-cost` | Hajj registration and package comparison | sibling, the step before |
| 2 | `/umrah` | Umrah and Hajj planning hub | hub |
| 3 | `/blog/tawaf-sai-seven-circuits-step-by-step-guide` | tawaf and sa'i step by step | new sibling (Article A) |
| 4 | `/blog/makkah-madinah-badr-taif-historical-ziyarah-taxi-guide` | Badr and Taif ziyarah by taxi | sibling |
| 5 | `/blog/official-zamzam-water-dates-gold-customs-rules-jeddah-dhaka-airport` | Zamzam and customs on the way home | sibling, the step after |

---

## 4. Release wave — the parts that are easy to forget

**R2 (no orphans):** each new article must be linked from at least two existing
posts in the same wave. Planned edits:

| Existing article | Edit |
| --- | --- |
| `umrah-hajj-guide-…-nusuk-bdt-cost` (pillar) | add both new posts to `internalLinks` + one inline sentence each in body, EN and BN arrays |
| `wearing-ihram-…-miqat-rules` | link to Article A as "what happens after you enter the Haram" |
| `hajj-registration-…-package-cost` | link to Article B as "what the days actually involve" |

All three need both the English `internalLinks` and the Bengali
`internalLinks` arrays edited (R6 — there is no BN fallback).

**Do not** touch the prerenderer or sitemap: `BLOG_DATA` membership plus
`prerender.ts` generates both locales.

---

## 5. Code changes beyond the two Markdown files

| Change | File | Why |
| --- | --- | --- |
| 3 + 3 new traveller-check keys | `src/utils/travellerChecks.ts` (`TITLES` map + key union in the regex) | The parser only accepts a closed list; new cards are invisible without this. Proposed keys: `tawafStart`, `tawafCount`, `tawafCrowd`, `hajjMinaNight`, `hajjMuzdalifah`, `hajjJamarat` |
| Test scripts | `scripts/test-tawaf-sai-guide.ts`, `scripts/test-hajj-rites-guide.ts` | House convention: every guide in this cluster has a matching test asserting body phrases, source hosts, and BN parity |
| npm scripts | `package.json` | `test:tawaf-sai-guide`, `test:hajj-rites-guide` |
| Optional: surface both on the landing page | `src/components/UmrahLandingPage.tsx` | The landing page is the reel's end-card target; without cards the new guides are only reachable from the cluster |

---

## 6. Decisions I need from you

**6.1 Madhhab treatment (Article B) — the only one that changes the writing.**
Options:
- **(a) Neutral (recommended):** agreed sequence + "schools differ; follow yours".
- **(b) Hanafi-default:** state Hanafi rulings with a caveat, since most
  Bangladeshi pilgrims follow Hanafi.
- **(c) Comparison table:** neutral prose plus a per-school table.
I recommend (a). It is accurate, it ages well, and it keeps the site out of
issuing rulings. (b) and (c) are defensible but need a scholar's review before
publishing, which I cannot provide.

**6.2 Publish dates.** I will write both as `status: draft` with no
`publishDate`, which hides them from the build. Give me two dates and I will set
`status: scheduled` in the same commit, or leave them as drafts for your review
first. **Recommended: drafts first, one review, then schedule.**

**6.3 Byline.** Existing cluster posts use *Farhan Momen (Founder & Travel
Editor)*. Same byline for both, or a different author?

**6.4 Slugs.** They lock the URLs permanently. Confirm
`tawaf-sai-seven-circuits-step-by-step-guide` and
`hajj-rites-mina-arafah-muzdalifah-day-by-day`, or give me your preferred
wording before I write.

---

## 7. What I will not claim

- **No Nusuk app behaviour.** I cannot test the live app; the existing Nusuk
  article already owns that job. I will link to it rather than guess.
- **No season-specific operational detail** (tent numbering, this year's train
  arrangements, crowd-flow changes, Mina camp locations) unless a dated official
  notice supports it. If it is not published, the article says so.
- **No fee, quota or date figures.** Same rule as the reels: those live on the
  seasonal Hajj article and the official portals.
- **No rulings.** Articles describe practice and the sequence; they do not issue
  or prefer one school's ruling.

---

## 8. Effort and order

| Step | Output | Est. |
| --- | --- | --- |
| 1 | Article A, EN + BN, 3 checks, 5 links, test | ~1 session |
| 2 | Article B, EN + BN, 3 checks, 5 links, test | ~1 session |
| 3 | Code: traveller-check keys, tests, npm scripts | ~30 min |
| 4 | Wave: inbound links in 3 existing posts (EN + BN) | ~30 min |
| 5 | Build proof: `generate:scheduled`, `lint`, `build`, `verify:build`, both test scripts | ~15 min |
| 6 | Optional: landing-page cards for both | ~20 min |

Article A goes first: narrower task, higher source confidence, and it gives
Article B a sibling to link to on day one.

## 9. Acceptance checklist (per article, both locales)

- [ ] Body answers one reader job; no claim without a dated primary source.
- [ ] ≥3 references, `name` + `nameBn` + HTTPS `url`; highest prose marker ≤
      `references.length`.
- [ ] ≥4 `internalLinks`, ≥2 blog→blog, ≥1 hub/money; **BN array written
      explicitly**; no self, dead or duplicate target.
- [ ] CTA decision recorded (expected: none, per §4.2).
- [ ] Bengali twin carries the same facts, caveats and its own links.
- [ ] Cover image + `coverAltEn` + `coverAltBn`.
- [ ] `npm run lint`, `npm run build`, `npm run verify:build` exit 0; anchors
      present in `dist/` for `/blog/…` and `/bn/blog/…`.
- [ ] Matching `test-*.ts` passes.
- [ ] Reel links updated: the two scenes now point at real owners (Gap A and
      Gap B closed).
