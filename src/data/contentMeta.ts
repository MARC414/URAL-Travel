/**
 * Content recency — single source of truth for the sitemap `<lastmod>` of every
 * page whose content is data-driven (hubs, and the flights / hotels / visa /
 * destinations / costs / umrah / tools / contact / sitemap routes).
 *
 * Blog posts do NOT use this value: they carry their own publish date in
 * `BLOG_DATA[].date`, which is an exact ISO timestamp.
 *
 * ---------------------------------------------------------------------------
 * WHY THIS CONSTANT EXISTS — do not "improve" it back into a git lookup
 * ---------------------------------------------------------------------------
 * `scripts/prerender.ts` previously derived this from
 * `git log -1 --format=%cs -- src/constants.ts`, falling back to *today's build
 * date* when git history was unavailable. Cloudflare Pages builds from a shallow
 * checkout, where that file has no reachable history, so the fallback fired on
 * every deploy. Three consequences, all observed:
 *
 *   1. Every hub `<lastmod>` became the deploy date — 77 of 159 URLs reset their
 *      freshness signal on a docs-only commit. Moving `lastmod` on unchanged
 *      content is exactly what teaches Google to ignore the field ([01] §4).
 *   2. A local build (full history) produced different dates than CI (no
 *      history), so the tracked `public/sitemap.xml` flip-flopped on every build.
 *   3. The failure was silent — no warning, no failing build.
 *
 * A committed date is identical in every environment (local, CI, any machine)
 * and moves only when a human decides the content genuinely changed. If git
 * history is ever needed again, it must be *additive* (an accurate git date may
 * only ever make the value more precise, never fresher than reality).
 *
 * ---------------------------------------------------------------------------
 * MAINTENANCE — the one thing you must remember
 * ---------------------------------------------------------------------------
 * Bump `CONTENT_UPDATED` whenever you materially change content in
 * `src/constants.ts` or `src/data/bengaliContent.ts` — prices, visa rules,
 * itineraries, hotel/route data, Bengali copy. Format: `YYYY-MM-DD`.
 *
 * The safe failure mode here is *staleness*, not freshness: a `lastmod` that is
 * too old only under-signals to crawlers, while one that is too new is a lie
 * that erodes the signal. `scripts/prerender.ts` prints a warning at build time
 * once this value is more than `CONTENT_UPDATED_MAX_AGE_DAYS` old, so it cannot
 * rot silently.
 *
 * Last derivation: `git log -1 -- src/constants.ts` → 2026-09-30 (c0de02e),
 * `src/data/bengaliContent.ts` → 2026-10-01 (fa82a7b). Highest wins.
 */
export const CONTENT_UPDATED = "2026-10-01";

/**
 * Warn (do not fail) once CONTENT_UPDATED is older than this. Chosen so a content
 * refresh is prompted well before a quarterly review cycle elapses.
 */
export const CONTENT_UPDATED_MAX_AGE_DAYS = 180;
