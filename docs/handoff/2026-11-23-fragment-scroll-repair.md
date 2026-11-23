# F02 follow-up — fragment scroll repair

**Lifecycle:** isolated implementation; not a new publication approval. **Date:** 23 November 2026.

- Owner direction: proceed one step at a time; visual upgrades are discussion only for now.
- Source: `b41e584e29313e499955f68c74957c0c983d9ff6`.
- Worktree: `E:\AI\Worktrees\bangladesh-hub-f02`; branch `fix/fragment-scroll-fallback`.
- Scope: `restoreNavigationFragment` in `src/utils/navigation.ts`, regressions in `scripts/test-site-header.tsx`, and execution evidence. No imagery, homepage, article, partner or price changes.
- Approach: retain the existing shared helper and frame-first scheduling; provide a short timer fallback for stalled frames, cancel both schedules after success/navigation cleanup, and respect manual scroll intent. Do not add another route-specific scroll handler.
- Root-cause evidence: in the local browser, the document and hub were present and fonts loaded, but a requested animation frame did not fire while a separate 1.8-second timer did. The current helper schedules only a frame and cancels everything after five seconds. Local instrumentation is outside `src/` and `dist/`.
- Baseline: `test:site-header` passes 17 checks; `test:navigation` passes 9 checks.

## Single-task checklist

- [x] Reconcile current main and reuse a clean isolated worktree.
- [x] Reproduce stalled-frame behavior without altering published artifacts.
- [x] Observe regression failure against the actual helper with frames paused.
- [x] Implement frame/timer race with complete cleanup; no duplicate scroll.
- [x] Verify late targets, navigation cancellation and user wheel/touch/scroll-key cancellation.
- [x] Verify direct EN/BN loads, language switching and Back in the browser.
- [x] Run all suites plus lint/build/verify:build once on final source; preserve route/content output.
- [x] Record results and stop before F03 or publication.

## Visual direction discussed — proposal only

Preserve URAL's existing brand while planning purposeful travel imagery, image-led guide cards, clearer reading/next-action hierarchy and equivalent EN/BN mobile layouts. Audit existing assets and their provenance first; optimize approved images and present paired previews before implementation. F03 retains the existing hero image/layout. No image generation, new assets, UI redesign or visual release is authorised by this note.

## Evidence

Status: VERIFIED_LOCAL. Final read-only review accepted the checkpoint with zero findings. The earlier main push does not authorise another push; this repair remains uncommitted and unpublished.

- Red evidence: paused-frame test received no scroll against the existing helper. After adding the fallback, manual-scroll priority failed (one unwanted jump); adding cancellation listeners resolved it.
- Green evidence: `test:site-header` now passes **23** checks, including six added cases; the full **44** test suites pass. `npm run lint`, `npm run build` and `npm run verify:build` exit 0; **653** build checks pass.
- The preferred animation frame races a **100ms** timer. Either path clears the other before checking the real target. Missing targets remain observable until the existing five-second deadline; route cleanup cancels everything. Wheel, touch-start and scroll-key input cancel pending automatic restoration without preventing native input.
- Browser verification, first instrumented then repeated on plain HTML without instrumentation: direct EN and BN `#money` loads remained below the **115px** sticky header after six seconds, at about **119.6px** and **120.4px** respectively. Query/hash, target clearance and document language remain correct through language switching and Back.
- An existing deep route was also checked: `/umrah#umrah-calculator` retained its real target at about **120.1px**, below the same sticky header after six seconds.
- The same existing canonical-route preservation test passes. No route, title, canonical, article body or hub content change is introduced by this repair. No sitemap or image file changed.
- Verification logs: `C:\Users\HP\AppData\Local\Temp\opencode\fragment-repair-build.log`, `fragment-repair-verify.log`, `fragment-repair-all-tests.log`. Diagnostic server/script are temporary local tools, not shipping assets.
- Ruling: do not introduce a second route-specific scroll handler, an unbounded retry or a delay added to every navigation. The fallback covers only pending fragment restoration and yields to reader input.
- Next task after this checkpoint: **F03**, paired international-homepage copy and FAQs while retaining the existing hero imagery/layout. The proposed broader visual upgrade remains separately scoped and unapproved.
- Final review: zero Critical/Important/Minor findings; no duplicate route handler, unbounded polling, missing cleanup or content/navigation regression found. The reviewer did not rerun verification; command/browser evidence was independently produced by this implementing session.
