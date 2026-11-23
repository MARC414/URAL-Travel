# F03 — paired international homepage

**Lifecycle:** VERIFIED_LOCAL, uncommitted/unpublished. **Owner scope:** 23 November 2026, F03 only; strictly no visual upgrades now.

## Brief

- Update `/` and `/bn/` in place to help any reader choose global search, relevant entry guidance and a useful planning next step. Bangladesh remains an explicitly labelled specialism and real doorway.
- Preserve existing hero image, layout, fonts, navbar, flight/hotel actions, consent, partners, newsletter and every deep guide URL/audience.
- Shared `getHomePositioning(lang)` feeds intro, metadata and features. Keep English H1 `Plan Your Trip` / `From Anywhere` and the exact approved subtitle.
- Four paired FAQs: editorial/referral role and partner responsibility; official passport/residence entry checks; current display-currency policy/manual override and BDT worksheet inputs; Bangladesh departure/passport guidance.
- Evidence: PRODUCT/AGENTS for editorial role; existing `flightSearch.ts`, widget and rate contracts for current currency behavior; F02 real hub for the doorway. No new entry rule, price, FX value, experience, audience count or demand claim is introduced.
- Article reference/link minimums are article contracts, not a requirement to pad this orientation page with unrelated references. Existing official-source guides remain linked and unchanged.
- No UK operation claim or `/uk` doorway. F04-F07 are later search/currency/locale tasks, not approved in this checkpoint.

## Source and preservation

- Base: `b41e584e29313e499955f68c74957c0c983d9ff6`.
- Worktree: `E:\AI\Worktrees\bangladesh-hub-f02`; branch `feat/international-home-f03`.
- The verified scroll repair is pending/unpublished. Its `navigation.ts`, `test-site-header.tsx` and handoffs are preserved, not F03 edits.
- Broader inside-page imagery/UI beautification is deferred until functional work is finished and separately scoped. No navbar redesign.

## Evidence

First integrated run: `lint`, `build`, `test:home-positioning` and `verify:build` exited 0; **655** build checks and **45** test suites passed. A subsequent source-title regression caught the source shell's old title; the closing run below repeats verification after correcting source metadata alongside saved/runtime metadata.

**Closing resolution:** after that source correction, fresh `npm run lint`, `npm run build`, `npm run verify:build`, every **45** `test:*` suite and a further `test:home-positioning` run exit 0. Build verification remains **655** checks. The read-only final reviewer found zero Critical/Important/Minor issues. The preservation comparison and `git diff --check` also exit 0. Nothing has been committed, pushed, merged or deployed for F03 or the pending scroll repair.

- RED: actual App SSR failed the approved subtitle; saved-home test failed against the earlier artifact; the added source-title test failed on the old Bangladesh-only source title. These were genuine content differences, not import errors.
- Root EN/BN saved HTML carries the shared intro/features, native flight/hotel fallback links, localized Bangladesh doorway and four orientation FAQs. Each saved FAQPage matches visible answers exactly.
- Hydrated EN/BN browser checks: four FAQs, one matching FAQPage, unchanged `clouds_boat_hero_1781438671378-1200.webp`, no desktop horizontal overflow. Flight action focuses `ural-global-dest-input`; hotel action focuses `btn-browse-hotel-partner` in both locales. BN doorway reaches `/bn/bangladesh` with the real translated hub.
- Homepage language switching and Back preserve the incoming query, localized H1 and four questions; switching leaves exactly one matching FAQPage. Both homes also pass a **390px browser-frame** narrow-layout check (fully hydrated, no horizontal overflow, four FAQs). This is not a mobile-device or performance benchmark.
- Before/after saved-file snapshot: exact same **280** HTML files; **276** non-home/non-directory title/canonical/body triples unchanged. EN/BN directories differ only by one generated homepage title label each; all deep article/hub metadata remains unchanged.
- Scope rulings: preserve current currency behavior (BDT for Bangladesh, USD otherwise) until F05; use shared core Bengali root metadata rather than edit article overrides; directory title-label updates are derived consequences, not permission to rewrite directory content.
- Logs and snapshots: `C:\Users\HP\AppData\Local\Temp\opencode\f03-{build,verify,all-tests}.log`, `f03-baseline.json`, `f03-preservation.mjs`. No credentials or owner asset copies are stored in this record.
- No new images, stylesheets, navbar changes, guide rewrite, new public route, commit, push or deployment is claimed.
- Final evidence logs use the `f03-final-{build,verify,all-tests}.log` prefix in the same approved temporary directory. Next planned functional task is **F04**, safe unselected-airport state; it has not started. All inside-page beautification stays deferred and separately scoped.
