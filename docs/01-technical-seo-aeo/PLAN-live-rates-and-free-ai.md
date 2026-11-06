# Plan — Live rates, multi-currency, and free AI on URAL (revised 6 November 2026)

**Lifecycle: DRAFT PROPOSAL · not an instruction to build.** Nothing here is applied. Each step needs its own
owner approval before code, and the currency part needs one positioning decision (§2) written down first.

Supersedes the recommendation order in
[the planner-proposal review](2026-11-06-international-planner-proposal-review.md) Part II §15, which is
unchanged in its finding — the *replacement HTML* is still rejected. This document addresses what the owner
actually wants: live rates, less BDT-only framing, and free AI.

---

## 1. Answers to the five questions, with verified facts

### Q1a — "Is exchangerate-api.com free?"

**Yes, there is a genuinely free tier, with two conditions that constrain the architecture.**

Verified from the provider's own docs and terms on 6 November 2026:

| Tier | Key | Attribution | Updates | Limit |
|---|---|---|---|---|
| **Open Access** (`open.er-api.com`) | none | **required** | once/day | rate-limited; 429 clears in 20 min |
| Free | API key | not required | once/day | 1,500 requests/month |
| Pro | API key | not required | every 60 min | 30,000/month, $10/mo |

Conditions that matter for us:

- **Attribution is mandatory on Open Access** — the exact required markup is
  `<a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>`. Their docs explicitly permit
  making it discreet and in keeping with our design, so it does not become visual clutter (§Q5).
- **Caching is expressly permitted; redistribution is not.** Terms: data "cannot be re-distributed — caching is
  for customer end-use only", and it may not be used "in any product or service that offers programmatic or
  automatic access to exchange rate data". **This clause rules out ever exposing a public rates API of our own.**
  Caching one daily response server-side for our own pages is squarely inside the permission.
- Their disclaimer: rates are "only suitable for informational or illustrative purposes… Use… for actual
  transactions or as financial data is explicitly not recommended." That is compatible with our existing
  "not a booking rate" stance — and it should be quoted in our own disclaimer rather than softened.
- `time_eol_unix` exists specifically so we can alert on deprecation. We should read it.

**Recommendation: Open Access + mandatory attribution + server-side daily cache.** It costs nothing and needs no
account. If we ever outgrow 1 request/day (we will not — the data refreshes daily anyway), the free keyed tier is
1,500/month.

### Q1b — "Can I use the 10,000 Cloudflare neurons to check live sources and keep info authentic?"

This is the most important correction in this revision: **no. Neurons are the wrong tool for checking facts.**

- 10,000 neurons/day is roughly **74 conversations** on a 70B model or **~120/day** on an 8B, at ~2,000 in /
  400 out tokens. Verified figure, and it is the binding constraint — not request count.
- An LLM **cannot verify** anything. Pointed at a live government page it will summarise, paraphrase and
  occasionally invent. Its failure mode is *confident wrongness* — the exact failure this repository's
  `SHARED_UMRAH_BANNED_PATTERNS` guards were written to stop.
- Authenticity comes from **deterministic checks**, which cost zero neurons: fetching the official endpoint,
  reading the field, and recording `value + source URL + fetched-at timestamp`. That is what the rates function
  (§3) does, and what the claims ledger already does by hand.

**So: neurons for language, zero-neuron code for facts.** Any proposal that uses AI to "check" a visa fee is
buying fabricated precision with a metered resource. Free *and* honest is the zero-neuron path.

### Q2 — "Can I not tell the AI to check my authentic sources before replying?"

**Yes — and this is the one AI design that is both free and defensible.** It is Retrieval-Augmented Generation
(RAG), and it is strictly better than letting a model browse:

1. The visitor's question is matched against **our own verified corpus** — the claims ledger, the dated source
   review records, and the published article text.
2. Only the retrieved passages go to the model, with instructions to answer **from these passages only**.
3. The model drafts the wording. It is never the source of a fact.
4. If retrieval finds nothing above a confidence threshold, **the assistant refuses** and links the relevant
   page. A refusal is a correct answer, not a failure.

This is what I meant by "it can only be the retrieval layer for content you already verified." Your instinct —
"tell the AI to check my sources first" — is exactly right; the discipline is that "checking" means *retrieving
our recorded check*, not *asking the internet again*.

Cost: a retrieval step over a small corpus is deterministic and can run on Workers KV or D1 (free plan), so the
neurons are spent only on the final 3–5 sentence wording. At ~74–120 conversations/day free, a scoped helper on
one page is comfortably inside budget.

### Q3 — "Will it make the design cluttered? Can you manage it?"

**Manageable, and the selector does not belong to the worksheet — it belongs to the page.** Detail in §5. The
short version:

- The currency selector should be a **single compact control in the section header**, not a per-field control.
  Per-field currency would multiply the eight input rows by a currency dropdown and destroy the worksheet.
- Search intent stays intact: heading, H1 and `seoTitle` keep "Umrah cost from Bangladesh" (mapped query in
  `SEO-KEYWORD-MAP.md`). **We are adding a control, not replacing an intent.**
- Attribution sits in one muted 11px line with the rate date. `DESIGN.md` already defines `label-micro` (11px,
  weight 700) as the metadata role, so it is a token we own, not a new visual language.

---

## 2. The one decision that must come first (blocks everything else)

Write into `PRODUCT.md`, replacing the current blanket "BDT-first pricing" sentence:

> **Currency rule.** The Umrah budget worksheet keeps **BDT as the default for a Dhaka departure** and switches
> its display currency to the visitor's origin for every other origin (USD default, then a visible selector for
> SAR, IDR, AED, MYR, EUR, GBP). The worksheet still performs **no conversion of its own inputs**; conversion, if
> shown, uses the dated daily reference rate from `/api/rates` and is labelled as such. Equal-share per-person
> figures remain equal-share only.

This mirrors a rule the site already implements in the flight handoff (BDT for Bangladesh, USD otherwise, never
overriding an explicit choice — `AGENTS.md` §3). Reusing an existing rule is why this is not a reversal: nothing
about Bangladeshi priority is removed, and the *conversion* caveat survives.

**Until this paragraph is approved, Step 3 must not start.**

---

## 3. Step 1 — one dated rate source (1–2 days)

**Build:** `functions/api/rates.js` — a Pages Function, matching the existing `functions/api/contact.js`
convention.

- Fetch `https://open.er-api.com/v6/latest/BDT` **at most once per 24 hours**, using the response's own
  `time_next_update_unix` to decide when to refresh.
- Cache in Cloudflare's edge cache (`caches.default`) with `s-maxage` until the next update; serve stale on
  upstream failure for up to 24h so the tool never breaks.
- Return **only** `{ base, rates, fetchedAt, sourceDate, provider, eol }` — normalized, never the raw upstream
  payload (redistribution clause), and never a public "give me any pair" endpoint.
- Read `time_eol_unix`; if it is non-zero, log loudly (this is the deprecation warning the provider built for us).
- No key, no secret, no cost.

**Then:** replace the three hardcoded tables with this source —
`TravelpayoutsCustomWidget.tsx` (`rateFromBdt`), `InteractiveTools.tsx` (`conversionRates`), and the inline
converter in `App.tsx`. Measured error in the current tables is **−3.6% to −9.3%**; on a BDT 160,000 line that is
a **$49** error.

**Guard:** extend `verify:build` with a check that no `rateFromBdt`-style constant table returns to `src/`, and
that every rate-bearing surface renders the attribution string.

**Nothing here uses AI.**

---

## 4. Step 2 — the converter as a real tool (2–3 days)

Upgrade `/tools/currency-converter` to consume `/api/rates`:

- Visible **rate date** ("rates updated 6 November 2026, 00:02 UTC") — this finally satisfies
  `CONTENT-OS.md`'s "a BDT conversion needs the SAR/BDT rate source and date".
- Currencies: add **SAR, IDR, AED, MYR** to the existing set. All verified present in the upstream payload.
- The "reference rate; your bank/money changer differs" note stays and is not softened.
- Attribution line, styled to `label-micro`, in the panel footer.
- **Server-render the initial state** with the cached rate so the tool is useful and indexable without JS.

This is the audience magnet: it answers a query people actually search, and it is the natural bridge from a
currency question into the visa and Umrah content.

⚠️ One choice to make explicitly: a converter *is* "a product or service offering programmatic or automatic
access to exchange rate data" only if it exposes a raw feed. A human-facing calculator using a cached daily rate
is what the Open Access tier is for. **Do not publish `/api/rates` for third-party use**, and do not wrap it in a
public "API" page — that crosses the redistribution line.

---

## 5. Step 3 — multi-currency on the worksheet without clutter (2 days)

The constraint is real, so the design is deliberately narrow.

**Geometry (one control, not eight):**

```
┌────────────────────────────────────────────────────────────┐
│  What will your family's Umrah budget be?                  │
│  Your quote-based worksheet · Not market prices            │
│                          [ Display currency: ৳ BDT  ▾ ]    │  ← new, top-right
│  ⓘ Rates updated 6 Nov 2026 · reference only · Rates By…   │  ← 11px, muted
├────────────────────────────────────────────────────────────┤
│  Number of travellers [ 4 ]                                │
│  Whole-party totals …                    [ BDT amounts ]   │
└────────────────────────────────────────────────────────────┘
```

**Rules that keep it honest and uncluttered:**

1. **Inputs never change currency.** The reader types whole-party totals in the currency their quote is in. The
   selector only changes the *display* currency of the result panel and the per-person share.
2. **Display defaults:** `BDT` when the visitor's origin is Bangladesh, `USD` otherwise — via `Accept-Language`
   or an explicit toggle only, never IP geolocation alone (a Bangladeshi on a UK VPN must still get BDT if they
   choose it).
3. **Conversion is labelled, always:** "converted at the 6 Nov 2026 reference rate (1 BDT = 0.008026 USD) —
   your bank's rate differs."
4. **Every test obligation survives.** `locale` formatting already flows through one `Intl.NumberFormat` call in
   `UmrahBudgetCalculator.tsx:9-11`; it becomes currency-aware, with `en-BD`/`bn-BD` retained for BDT and locale
   mapped per currency. The existing 25 tests stay green; new tests cover: incomplete still shows no total, an
   unconverted display still shows the entered currency, and a missing rate degrades to BDT rather than to zero.
5. **No `days` field.** Part II §11 of the review measured that only 3 of 8 categories scale with days. Duration
   stays expressed *inside* the hotel and meal lines, where the reader already multiplies rooms × nights.

**Clutter budget:** one `<select>`, one 11px attribution line, one short conversion note. That is it. If it needs
more than that, the design is wrong.

---

## 6. Step 4 — free, honest AI (only after Steps 1–3 are live)

**Build: one scoped helper, one page.** Not a site-wide chat widget.

- Placement: the Umrah hub, below the visa note. Question box, 3–5 sentence answer, source line beneath.
- Corpus: the claims ledger, dated source-review records, and the four Umrah cluster articles — chunked, stored
  in Workers KV or D1 (free plan), retrieved by keyword/embedding match locally.
- Model: a **Workers-Free-eligible** small model. Verified 28 July 2026 change — `@cf/moonshotai/kimi-k2.6`,
  `kimi-k2.7-code` and `@cf/zai-org/glm-5.2` now **require Workers Paid** and return `403` on Free. The models
  still on Free include `@cf/zai-org/glm-4.7-flash`, `@cf/google/gemma-4-26b-a4b-it` and
  `@cf/nvidia/nemotron-3-120b-a12b`. Pick from the free set, then confirm in the dashboard before shipping.
- **Hard 10,000-neuron daily cap with its own reservation counter.** On Workers Free, exceeding the allocation
  *fails closed* rather than billing — so the failure mode is the assistant politely going quiet until 00:00 UTC,
  which is the correct behaviour. Never assume the account is on Paid.
- **The four non-negotiables, enforced in code, not in the prompt:**
  (a) answer only from retrieved passages — no retrieved passage, no answer;
  (b) every answer renders its source name + date beneath it;
  (c) a permanent "not official guidance — verify at the official portal" line;
  (d) a post-generation filter that **rejects and refuses** any answer containing a money figure, a processing
  time, or a visa validity claim that is not verbatim in a retrieved passage. Refusal is the safe outcome.
- **Never** let it state a visa price. That is not a prompt instruction; it is a regex gate on the output,
  because prompts are suggestions and tests are not.

**Budget reality:** ~74–120 conversations/day free. Instrument refusals and cap-hits from day one; if cap-hits
are frequent, the honest answer is that the free tier has been outgrown, not to quietly widen the cap.

---

## 7. What I would *not* do

- **Do not publish a rates API.** Redistribution breach (§1a).
- **Do not use AI to "check" official sources.** It cannot; it will invent (§1b).
- **Do not remove BDT or the Bangladesh heading from `/umrah`.** Mapped query; add alongside.
- **Do not put a currency dropdown on each of the eight input rows.** Clutter and arithmetic ambiguity.
- **Do not add a `days` multiplier.** Measured wrong for 5 of 8 categories.
- **Do not ship any tool that states a visa price**, AI or not.

---

## 8. Sequence and effort

| Step | Scope | Effort | Blocked by | Cost |
|---|---|---|---|---|
| 0 | `PRODUCT.md` currency-rule paragraph | hours | owner approval | £0 |
| 1 | `/api/rates` + retire 3 hardcoded tables | 1–2 days | Step 0 | £0 |
| 2 | Live converter + attribution + 4 new currencies | 2–3 days | Step 1 | £0 |
| 3 | Worksheet display currency (one control) | 2 days | Step 0, Step 1 | £0 |
| 4 | Scoped RAG helper with output gate | 4–6 days | Steps 1–3, corpus prep | £0 on Free tier |

Recommended first move: **Step 0 is a paragraph, not code.** Write it, then Step 1, because every later step
depends on one dated rate source existing.

---

## 9. Verification hooks this plan must satisfy

- `verify:build` (469 checks, 77 negative controls) stays green at every step.
- `test:umrah-budget` (25 tests) extended, not weakened, for currency display.
- The no-fabricated-total assertion still holds: a missing rate degrades to **BDT**, never to `0` or blank.
- Attribution string present on every rate-bearing surface (new check).
- No hardcoded rate constants in `src/` (new check).
- AI output gate proven with negative controls: a crafted answer containing "BDT 15,500" or "2–5 working days"
  must be refused. These strings already exist as `SHARED_UMRAH_BANNED_PATTERNS` — reuse them as the gate's
  test corpus, so the AI test suite and the content test suite cannot drift apart.

## 10. Provenance

- Provider terms/docs read 6 Nov 2026: `exchangerate-api.com/docs/free` (Open Access, attribution markup, caching
  permission, rate-limit/429 behaviour, `time_eol`) and `exchangerate-api.com/terms` (no redistribution; "not
  suitable for actual transactions").
- Live payload fetched 6 Nov 2026: `open.er-api.com/v6/latest/BDT` — 161 currencies, `time_last_update_utc`
  "Fri, 06 Nov 2026 00:02:31 +0000"; confirms BDT, SAR, IDR, AED, MYR availability.
- Cloudflare changelog 28 Jul 2026: three listed models moved to Workers Paid; free set named.
- Cloudflare Workers AI free allocation: 10,000 neurons/day, resets 00:00 UTC; Free plan fails closed on overage.
- Repo facts re-verified at `c63cd5a` on `arena/56e63301-ural-travel`: `functions/api/` convention,
  `UmrahBudgetCalculator.tsx:9-11` formatter, three hardcoded rate tables, 469/25 passing gates.
- Rate error measurement: repo tables vs live 6 Nov 2026 — USD −3.7%, EUR −7.1%, GBP −9.3%, AED −3.6%, SAR −3.7%.
