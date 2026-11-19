# Handoff — Navigation preview before implementation — 19 November 2026

> **HISTORICAL PREVIEW RECORD — DO NOT TREAT AS CURRENT EXECUTION STATE.**
> The owner subsequently authorized native implementation and then push/merge. Current code, verification
> and remaining deployment acceptance are in the [implementation handoff](2026-11-19-approved-navigation-implementation.md).
> The earlier “not started” and pending execution-choice statements below describe the preview stage only;
> the executed plan is archived at [docs/history/2026-11-19-approved-navigation-plan.md](../history/2026-11-19-approved-navigation-plan.md).

**Goal:** make URAL's navigation easier to use while keeping the established design, all existing URLs and affiliate earning doorways intact; show the mega menu before changing the public site.

**Branch:** documentation integration targets `main`, refreshed from upstream `374cbe6`. **Working-file caution:** five untracked owner image files were present when this batch began. They are not part of this documentation commit; do not add, overwrite or remove them. The commit containing this handoff can be found with `git log -- docs/handoff/2026-11-19-navigation-preview-first.md`; no self-referential commit hash is needed here.

## State

- Recorded: the owner accepted the two-row header, visible Home/About Us, a Things to Do entry separate from destination itineraries, geographic menu groups and preserving all current URLs.
- Written: `docs/superpowers/specs/2026-11-19-navigation-and-earning-flow-design.md`, including the named trust/discovery repairs and an independent builder clarity check.
- Visual approval recorded: owner said "yes, approved" after the revised navbar preview, including Middle East → Europe & UK → Asia → Americas.
- Written next: `docs/superpowers/plans/2026-11-19-approved-navigation.md` (since executed and archived under `docs/history/`); awaiting review and execution-method choice at the time.
- Local prototype complete: outside the repository/deployable graph; 42 screen-state checks and review-board controls passed. This is not verification of production React code.
- Not started: production React navigation implementation, catalogue repairs and new UK/Pakistan visa-guide publication. The latter two are separate subprojects, not included in the navbar approval.
- No additional commit/push performed for this approval record or implementation plan. Earlier documentation-push permission did not authorize production UI deployment.
- **Not authorized:** live UI deployment. The owner explicitly requires preview approval first and final approval before deploying the verified implementation.

## Files and entry points

- `00-URAL-STRATEGY-INDEX.md` — current navigation-plan pointer and preview/deployment gates.
- `docs/superpowers/specs/2026-11-19-navigation-and-earning-flow-design.md` — complete proposed stabilization design and protected scope.
- This handoff — cross-tool resume point; read the design before touching code.
- `DESIGN.md`, `PRODUCT.md` — preserve the existing URAL world; not rewritten in this batch.
- `src/App.tsx`, `src/components/ExperiencesPage.tsx`, `src/components/GlobalAttractionsHub.tsx`, `src/components/AttractionDetailPage.tsx` — inspected as relevant implementation owners, not changed in this documentation batch.
- `src/data/evisaProgram.ts`, `src/components/AffiliatePartners.tsx`, `src/utils/flightSearch.ts` — current affiliate configuration is preserved; do not guess new campaign IDs or restore legacy embedded flight engines.

## Decisions and why

- Keep the two-row header: Home/About/Partners/Contact plus search/help/language in the utility row; Destinations, Things to Do, Flights, Hotels, Visa Guides, Umrah & Hajj and Guides & Tools in the primary row.
- Use mega menus only for grouped sections; mobile uses expandable drawer groups. Preserve keyboard, native anchor and Back behavior.
- Approved Destinations order: four desktop columns, Middle East (Saudi Umrah hub, Saudi visa guide, Dubai) → Europe & UK (London first) → Asia (including Pakistan/Azad Kashmir) → Americas (New York). These same groups/order apply on mobile and in Bengali. Other panels remain three columns.
- Keep `/experiences`, its regional URLs, `/attractions` and every existing detail URL. `/experiences` is activity discovery; `/attractions` becomes the individual-guide directory. **No consolidation redirect.**
- Service names lead menus; providers remain identifiable at commercial handoffs and on relationship pages. Do not hide eVisas' private paid role or erase affiliate disclosures.
- Preserve the prominent eVisas section, supplied widget/campaigns, hosted Page 24232 and existing affiliate lifecycle/consent behavior.
- UK visitor visa from Bangladesh is the first future new visa task; Pakistan visa follows. Do not add menu/search links to unpublished guides or confuse UK visitor entry with UK-passport Saudi/Umrah content.
- Stabilization is bounded. After acceptance, freeze cosmetic/navigation churn; still correct security, broken links, expired claims and changed travel rules.

## Dead ends and corrections

- Earlier advice that attraction details were client-only was wrong: they have static routes. The remaining observed issues included thin initial content/discovery differences and an English title becoming a numeric ID after JavaScript.
- Earlier 59-attraction inventory was wrong: the dated audit found 18 detail records/URLs per locale. Avoid restoring the unsupported public count.
- Earlier Pakistan/source absence came from a stale local checkout (`dfb7f6f`), not lost content. A safe fast-forward to `374cbe6` recovered `/destinations/kashmir-guide`, `/flights/dhaka-islamabad` and their mappings.
- Pakistan **and UK campaign entries now exist** in `src/data/evisaProgram.ts`. Preserve them. Code presence is not proof of the provider's destination/nationality service or actual account attribution; verify before using a new guide to promote them.
- A proposed `/attractions` redirect was explicitly withdrawn after the owner said no existing URL may change.
- No full application implementation/test/deployment success is implied by a plan or this handoff. Earlier audit measurements are dated observations, not current certificates.

## Next step — visual gate satisfied

Review the bounded navigation plan with the owner and retain their chosen execution method. Reconfirm the latest source before execution and use an isolated worktree; do not rebuild or re-request approval of the already accepted visual direction. Implement only the navigation subproject, preserving application behaviour and existing commercial handoffs.

Present verification and the implemented preview; obtain **separate final deployment approval** before merging/pushing UI to the production branch or deploying. The local prototype is available at `C:\Users\HP\AppData\Local\Temp\opencode\ural-navigation-preview-2026-11-19\`; its `review/` screenshots and `session/content/assets/ui.html` are reference artifacts only, not production code or portable build dependencies.

## Open questions / approval gates

- Mega-menu appearance, panel layout and mobile treatment — owner approved on 19 November 2026; do not reopen cosmetics without a material defect or owner request.
- Bounded navigation plan review and native/subagent-driven execution choice — pending.
- Final implementation/deployment — owner approval after verified result; pending.
- GA4/GTM and partner dashboard receipt/service coverage — authenticated evidence/operational permission needed if absent. Website code or a supplied URL is not booking/commission proof.

## Getting back to work

Read `AGENTS.md`, the strategy index, the design linked above, `PRODUCT.md` and `DESIGN.md` first. Recheck `git status` before editing; other tools are active.

Existing application commands for a later approved isolated implementation:

```text
npm run dev
npm run lint
npm run build
npm run verify:build
```

`dev`, lint and build regenerate scheduled/search/feed artifacts. They are not permission to publish due/unrelated posts. The initial menu preview does not require a production build or a deployment hook. Keep preview-only visual artifacts out of the public graph.

## Documentation push versus deployment

Cloudflare Pages deploys through its own Git integration; `.github/workflows/ci.yml` is validation, not deployment. For this documentation-only commit use the documented **`[CF-Pages-Skip]` commit-message prefix** to omit that push's Pages deployment. Do not change Cloudflare settings or invoke the scheduled production deploy hook.

Official reference checked 19 November 2026: https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/#skipping-a-build-via-a-commit-message.

Existing scheduled publication is independent and unchanged. The menu implementation must never enter production merely because someone pushed a UI branch to `main` before approval.

## Documentation integration verification — 19 November 2026

- Verified source baseline: `374cbe61a31481eefb15f17e505cfd095c23ddb4`, with this documentation batch copied into an isolated local clone. Existing workspace dependencies were reused; this was a local Windows run, not a claim that remote GitHub CI or a fresh `npm ci` had completed.
- All **44 `npm run` commands** listed in `.github/workflows/ci.yml` exited 0, including lint, build and `verify:build`; the latter reported **609 checks passed**. The existing non-blocking content-debt notices remain editorial review items, not findings repaired by this documentation batch.
- The build left committed sitemap XML/text and RSS unchanged. `INDEXNOW_SUBMIT=0` prevented search-engine notifications; no deployment hook was invoked. Generated/build artifacts stayed in the isolated clone, outside the owner's checkout.
- The first runner attempt was interrupted by the shell's overall 120-second timeout during `test:rates`. Resuming without that overall limit completed successfully; no application fix was needed.
- Relative document links resolved and staged whitespace checks passed. Only the strategy index, design and this handoff belong to the integration commit; the owner's untracked images remain excluded.

These checks validate the existing source baseline and documentation integration, **not an implemented mega menu**, production deployment, provider eligibility or confirmed analytics/commission receipt. Re-run the relevant release verification on the later owner-approved implementation.
