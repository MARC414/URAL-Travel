# Repo-based bilingual blog drafts and scheduling

Each article lives in one Markdown file in this directory. The checked-in file is the publishing source of truth; generated TypeScript is ignored and rebuilt by the npm scripts.

Before authoring or repurposing, read the [master content optimization guide](../../URAL-CONTENT-OPTIMIZATION-GUIDE.md)
and [article acceptance contract](../../docs/growth/10-CONTENT-UPGRADE-STANDARD.md). This file supplies the
Markdown publishing mechanics; the current owner task selects the work.

## Google Drive source-to-draft handoff

Use Drive as the research/source library and the repository as the publishing queue. The GitHub schedule does **not** poll Drive or publish a newly uploaded document automatically.

- **Keep in Drive:** strategy/social plans (for example, `URAL-FIRST-5-POSTS.md`, which is a social-media plan, not a website article), source documents, data, URLs, and claim-check notes with the date checked. Organize these by topic or article slug. The existing `URAL Articles` folder is suitable.
- **Use the current baseline:** [the strategy index](../../00-URAL-STRATEGY-INDEX.md) and [current audit](../../00-URAL-CURRENT-AUDIT.md) establish context; the owner authorizes the next task. [SEO-KEYWORD-MAP.md](../../SEO-KEYWORD-MAP.md) preserves intent boundaries. The former content queue is historical and must not be resumed as a calendar.
- **Keep the publishable website article in the repo:** one bilingual Markdown file at `content/blog/<slug>.md`. This committed file is the only publishing source of truth. You may keep a Drive copy for convenience, but updates there do not update the website.

1. Tell me which Drive file or folder contains the source material. I can read connected Drive sources, check time-sensitive claims against primary sources where possible, and flag anything uncertain.
2. I turn the reviewed material into a bilingual repo article with `status: draft` and no `publishDate`. Drafts stay hidden.
3. Review the repo draft. When it is approved, set `status: scheduled` and `publishDate: "YYYY-MM-DD"` in that article's YAML frontmatter, then commit it to the production branch.
4. GitHub checks the repo file and triggers Cloudflare on the scheduled date. Drive credentials are not stored in GitHub, and a new Drive upload alone cannot publish anything.

This review gate keeps source documents, unverified claims, and drafts out of the live site.

## Status and publish time

- `status: draft` — never included in a normal site build, regardless of its date.
- `status: scheduled` plus `publishDate: "YYYY-MM-DD"` — automatically included in the first production build at or after **9:00 AM on that Dhaka date**. The daily GitHub Action runs at **03:00 UTC (about 9:00 AM Asia/Dhaka)**. The checker includes due and overdue posts by default and uses the live sitemap to avoid rebuilding posts already published.
- A date without a time means **9:00 AM Dhaka time**. Do not add a timezone offset or a time to the date.
- Keep the post in the repository before its scheduled date. The Cloudflare deploy-hook URL is stored as the private GitHub Actions secret `CLOUDFLARE_PAGES_DEPLOY_HOOK`; never add it to an article or commit it.
- If GitHub Actions misses a date, the default overdue-inclusive checker can recover it on a later run. **Run workflow** also defaults `include_overdue` to true; explicitly setting it false restricts the check. See `scripts/check-scheduled-posts.ts` and `scripts/publishPlan.ts`; the current behavior supersedes old date-equality comments and plans.

## Create or schedule a post

1. Copy an existing `.md` article and rename it to `<lowercase-kebab-case-slug>.md`.
2. Keep the English and Bengali metadata and body together in the file.
3. Set `status: draft` while writing. When ready, change it to `status: scheduled` and add a quoted `publishDate: "YYYY-MM-DD"`.
4. Commit the article to the production branch before that date. No per-post Cloudflare or GitHub-secret changes are needed.

The frontmatter fields `slug`, `status`, `title`, `titleBn`, `summary`, `summaryBn`, `category`, `categoryBn`, `author`, `authorBn`, `readTime`, and `readTimeBn` are required. `publishDate` is required only when status is `scheduled`. Optional fields include `updatedAt`, the localized SEO title/description, a cover image, localized alt text, AEO snippets, FAQ headings, references, and internal links. A post must have a validated cover image plus English and Bengali alt text before it can be marked `scheduled`. Reference URLs must use HTTPS.

Split the article body with this exact marker on a line by itself:

```html
<!-- lang:bn -->
```

Everything above it is English; everything below it is Bengali. Keep FAQ headings in the body exactly aligned with `faqHeadingEn` and `faqHeadingBn` if you want FAQ structured data.

Minimal frontmatter shape:

```yaml
---
slug: example-bangladesh-travel-guide
status: draft
title: English article title
titleBn: বাংলা শিরোনাম
summary: Short English summary.
summaryBn: সংক্ষিপ্ত বাংলা সারাংশ।
category: Travel planning
categoryBn: ভ্রমণ পরিকল্পনা
author: Author name
authorBn: লেখকের নাম
readTime: 6 min read
readTimeBn: ৬ মিনিট পঠন
# Optional: coverImage: existing_asset_basename
---
English article body.

<!-- lang:bn -->
বাংলা নিবন্ধের মূল লেখা।
```

## Local preview and validation

- `npm run dev` previews only currently publishable content.
- `npm run dev:drafts` includes drafts and future scheduled posts for local review. This is a preview-only build mode; do not deploy its generated output.
- `npm run test:scheduling` checks the Dhaka date handling, date gates, parser, and the retained Cox’s Bazar draft.
- `npm run lint`, `npm run build`, and `npm run verify:build` validate the normal production path.

A cover image must already have the site's optimized `640/960/1200.webp` variants, a social JPEG under `src/assets/optimized-social/`, and a dimensions entry in `src/utils/imageAssets.ts`. The build rejects a scheduled post with a missing asset instead of shipping a broken cover.
