import assert from "node:assert/strict";
import {
  dhakaCalendarDate,
  formatBengaliPublishDate,
  formatEnglishPublishDate,
  getPostsDueForPublishing,
  isPostIncludedInBuild,
  loadScheduledBlogPosts,
} from "./scheduledPosts";

const nowAtDhakaEarlyMorning = new Date("2026-10-14T21:01:00.000Z");
const nowBeforePublish = new Date("2026-10-15T02:59:59.000Z"); // 08:59:59 in Dhaka
const nowAtPublish = new Date("2026-10-15T03:00:00.000Z"); // 09:00:00 in Dhaka
assert.equal(dhakaCalendarDate(nowAtDhakaEarlyMorning), "2026-10-15");
assert.equal(formatEnglishPublishDate("2026-11-20"), "November 20, 2026");
assert.match(formatBengaliPublishDate("2026-11-20"), /২০/);

const fixture = (status: "draft" | "scheduled", publishDate?: string) =>
  ({ status, publishDate }) as Parameters<typeof isPostIncludedInBuild>[0];
assert.equal(isPostIncludedInBuild(fixture("draft", "2026-10-15"), nowAtPublish), false);
assert.equal(isPostIncludedInBuild(fixture("scheduled", "2026-10-16"), nowAtPublish), false);
assert.equal(isPostIncludedInBuild(fixture("scheduled", "2026-10-15"), nowBeforePublish), false);
assert.equal(isPostIncludedInBuild(fixture("scheduled", "2026-10-15"), nowAtPublish), true);
assert.equal(isPostIncludedInBuild(fixture("scheduled", "2026-10-14"), nowAtPublish), true);
assert.equal(isPostIncludedInBuild(fixture("draft"), nowBeforePublish, true), true);

const dueFixtures = [
  { status: "draft", publishDate: "2026-10-15" },
  { status: "scheduled", publishDate: "2026-10-15" },
  { status: "scheduled", publishDate: "2026-10-14" },
  { status: "scheduled", publishDate: "2026-10-16" },
] as Parameters<typeof getPostsDueForPublishing>[0];
assert.equal(getPostsDueForPublishing(dueFixtures, nowBeforePublish).length, 0);
assert.equal(getPostsDueForPublishing(dueFixtures, nowAtPublish).length, 1);
assert.equal(getPostsDueForPublishing(dueFixtures, nowAtPublish, true).length, 2);

const repoPosts = loadScheduledBlogPosts();
assert.equal(repoPosts.length, 4, "the two Cox’s Bazar articles, the affiliate experiment and the social-income article should be retained in content/blog");
const affiliateExperimentPost = repoPosts.find(
  (post) => post.slug === "can-you-make-money-travel-affiliate-marketing-ural-experiment",
);
assert.ok(affiliateExperimentPost, "the new travel affiliate experiment should be retained in content/blog");
assert.equal(affiliateExperimentPost.status, "scheduled");
assert.equal(affiliateExperimentPost.publishDate, "2026-10-24");
assert.ok(affiliateExperimentPost.englishBody.includes("join Travelpayouts through my referral link"));
assert.ok(affiliateExperimentPost.englishBody.includes("The Fabryk's published Travelpayouts report"));
assert.ok(affiliateExperimentPost.bengaliBody.includes("এখনো জানি না"));
assert.ok((affiliateExperimentPost.englishBody.match(/^## /gm) ?? []).length >= 14);
assert.ok((affiliateExperimentPost.bengaliBody.match(/^## /gm) ?? []).length >= 14);
assert.ok(affiliateExperimentPost.englishBody.includes("## What Is Travel Affiliate Marketing?"));
assert.ok(affiliateExperimentPost.bengaliBody.includes("## ট্রাভেল অ্যাফিলিয়েট মার্কেটিং কী?"));
assert.ok(affiliateExperimentPost.englishBody.includes("https://www.travelpayouts.com/?marker=675992&sub_id=post_ural_experiment"));

const socialIncomePost = repoPosts.find(
  (post) => post.slug === "turn-travel-experience-into-income-without-a-website",
);
assert.ok(socialIncomePost, "the social-first travel income article should be retained in content/blog");
assert.equal(socialIncomePost.status, "scheduled");
assert.equal(socialIncomePost.category, "Travel Creator Economy");
assert.equal(socialIncomePost.categoryBn, "ট্রাভেল ক্রিয়েটর ইকোনমি");
assert.ok((socialIncomePost.englishBody.match(/^## /gm) ?? []).length >= 12);
assert.ok((socialIncomePost.bengaliBody.match(/^## /gm) ?? []).length >= 12);
assert.ok(socialIncomePost.englishBody.includes("## Where that ecosystem is still incomplete"));
assert.ok(socialIncomePost.bengaliBody.includes("## এই ইকোসিস্টেমে এখনো যা নেই"));
assert.ok(socialIncomePost.references.length >= 4);
assert.ok(
  socialIncomePost.references.some((ref) =>
    ref.url.includes("205233008-For-social-media-creators"),
  ),
  "the no-website claim must cite Travelpayouts' own social-creator documentation",
);
assert.ok(socialIncomePost.internalLinksEn.length >= 8);
assert.ok(socialIncomePost.internalLinksBn.length >= 8);
assert.ok(
  socialIncomePost.inlineFigure,
  "the social-income post should keep its in-article UGC figure",
);
assert.ok(
  socialIncomePost.inlineFigure?.imageSrc ===
    "/assets/images/traveller_phone_street_ugc_1792483200000-1200.webp",
  "the figure must point at the canonical -1200.webp asset, not a one-off URL",
);
assert.equal(
  (socialIncomePost.englishBody.match(/\[\[figure\]\]/g) ?? []).length,
  1,
  "the English body must carry exactly one [[figure]] placeholder",
);
assert.equal(
  (socialIncomePost.bengaliBody.match(/\[\[figure\]\]/g) ?? []).length,
  1,
  "the Bengali body must carry exactly one [[figure]] placeholder",
);
assert.ok(
  socialIncomePost.inlineFigure?.altBn &&
    socialIncomePost.inlineFigure?.captionBn &&
    socialIncomePost.inlineFigure?.altEn &&
    socialIncomePost.inlineFigure?.captionEn,
  "the figure needs alt text and a caption in both locales",
);

const coxsBazarPost = repoPosts.find(
  (post) => post.slug === "kathmandu-to-coxs-bazar-flights-route-status-booking",
);
assert.ok(coxsBazarPost, "the existing Cox’s Bazar article should be retained in content/blog");
assert.equal(coxsBazarPost.status, "scheduled");
assert.equal(coxsBazarPost.publishDate, "2026-10-16");
assert.ok(coxsBazarPost.englishBody.includes("no confirmed scheduled passenger service"));
const coxsBazarGuidePost = repoPosts.find(
  (post) => post.slug === "coxs-bazar-travel-guide-flights-train-hotels-costs-bangladesh",
);
assert.ok(coxsBazarGuidePost, "the Cox’s Bazar travel guide should be retained in content/blog");
assert.equal(coxsBazarGuidePost.status, "scheduled");
assert.equal(coxsBazarGuidePost.publishDate, "2026-10-16");
assert.ok(
  coxsBazarGuidePost.englishBody.includes(
    "NOTAM A0325/26 suspends international scheduled and non-scheduled movements",
  ),
);
assert.ok(
  coxsBazarGuidePost.bengaliBody.includes(
    "A0325/26 নির্ধারিত আন্তর্জাতিক সার্ভিস শুরু না হওয়া পর্যন্ত",
  ),
);
assert.ok(coxsBazarPost.bengaliBody.includes("নির্ধারিত যাত্রীবাহী ফ্লাইটের নিশ্চিত সময়সূচি পাওয়া যায়নি"));
const nowOct16AtPublish = new Date("2026-10-16T03:00:00.000Z"); // 09:00:00 on Oct 16 in Dhaka
assert.equal(isPostIncludedInBuild(coxsBazarPost, nowOct16AtPublish), true);
assert.equal(isPostIncludedInBuild(coxsBazarPost, nowAtPublish), false);

/**
 * The prerendered FAQPage JSON-LD node is built by locating the FAQ heading in
 * the whole body and pairing every following line until the next numbered
 * heading (see isNumberedHeading in src/utils/blogStructuredData.ts). Anything
 * that leaves an odd line count — a trailing paragraph, a missing answer —
 * silently drops the structured data while the page still looks correct, so the
 * pairing rule is asserted here for every scheduled article in both locales.
 */
const numberedHeadingLine = /^\s*(?:\d+|[\u09e6-\u09ef]+)[.)]\s+/;
for (const post of repoPosts) {
  const locales = [
    ["English", post.faqHeadingEn, post.englishBody],
    ["Bengali", post.faqHeadingBn, post.bengaliBody],
  ] as const;
  for (const [label, heading, body] of locales) {
    if (!heading) continue;
    const lines = body.split(/\r?\n/);
    const headingIndex = lines.findIndex((line) => line.trim() === heading.trim());
    assert.ok(
      headingIndex >= 0,
      `${post.slug}: the ${label} body must carry the FAQ heading "${heading}" verbatim for FAQ schema`,
    );
    let sectionEnd = lines.length;
    for (let index = headingIndex + 1; index < lines.length; index += 1) {
      if (numberedHeadingLine.test(lines[index])) {
        sectionEnd = index;
        break;
      }
    }
    const faqLines = lines.slice(headingIndex + 1, sectionEnd).map((line) => line.trim()).filter(Boolean);
    assert.ok(
      faqLines.length >= 2 && faqLines.length % 2 === 0,
      `${post.slug}: the ${label} FAQ block needs question and answer lines in pairs (got ${faqLines.length}); nothing may follow it except another numbered heading`,
    );
  }
}

console.log("Scheduled blog parser, Dhaka 9 AM date gates, and current scheduled post all pass.");

// --- Live-sitemap self-heal: rebuild only when a due/overdue post is actually missing ---

import { resolvePublishPlan } from "./publishPlan";
import { SITE_ORIGIN } from "../src/utils/localeRoutes";

const selfHealNow = new Date("2026-10-24T04:00:00.000Z"); // 10:00 Dhaka on Oct 24
const selfHealFixture = (slug: string, publishDate: string) =>
  ({ slug, status: "scheduled", publishDate }) as Parameters<typeof resolvePublishPlan>[0][number];

function sitemapFor(posts: { slug: string; present: boolean }[], outage = false) {
  const attempts = { count: 0 };
  const fetcher = async (): Promise<Set<string>> => {
    attempts.count += 1;
    if (outage) throw new Error("simulated live-site outage");
    const entries = posts
      .map(({ slug, present }) =>
        present
          ? [`<url><loc>${SITE_ORIGIN}/blog/${slug}</loc></url>`, `<url><loc>${SITE_ORIGIN}/bn/blog/${slug}</loc></url>`]
          : [],
      )
      .flat()
      .join("");
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;
    return new Set(Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((match) => match[1]));
  };
  return { fetcher, attempts };
}

{
  // Nothing due: no sitemap request at all, and no rebuild.
  const { fetcher, attempts } = sitemapFor([]);
  const plan = await resolvePublishPlan(
    [selfHealFixture("future-post", "2026-11-01")],
    selfHealNow,
    true,
    fetcher,
  );
  assert.equal(plan.publish, false, "nothing due means no rebuild");
  assert.equal(attempts.count, 0, "no sitemap fetch when nothing is due");
}

{
  // Overdue and still missing from the live sitemap → rebuild fires (catch-up).
  const { fetcher, attempts } = sitemapFor([{ slug: "coxs-bazar-travel-guide-flights-train-hotels-costs-bangladesh", present: false }]);
  const plan = await resolvePublishPlan(
    [selfHealFixture("coxs-bazar-travel-guide-flights-train-hotels-costs-bangladesh", "2026-10-16")],
    selfHealNow,
    true,
    fetcher,
  );
  assert.equal(plan.publish, true, "an overdue post missing from the live sitemap must request a rebuild");
  assert.deepEqual(plan.missingFromLive, ["coxs-bazar-travel-guide-flights-train-hotels-costs-bangladesh"]);
  assert.equal(plan.sitemapChecked, true);
  assert.equal(attempts.count, 1);
}

{
  // Overdue but already live in both locales → no rebuild, no repeat heartbeat.
  const { fetcher, attempts } = sitemapFor([
    { slug: "coxs-bazar-travel-guide-flights-train-hotels-costs-bangladesh", present: true },
    { slug: "kathmandu-to-coxs-bazar-flights-route-status-booking", present: true },
  ]);
  const plan = await resolvePublishPlan(
    [
      selfHealFixture("coxs-bazar-travel-guide-flights-train-hotels-costs-bangladesh", "2026-10-16"),
      selfHealFixture("kathmandu-to-coxs-bazar-flights-route-status-booking", "2026-10-16"),
    ],
    selfHealNow,
    true,
    fetcher,
  );
  assert.equal(plan.publish, false, "live posts must not trigger a nightly rebuild storm");
  assert.equal(attempts.count, 1, "the sitemap was checked once and decided on its own");
}

{
  // One EN/BN twin already live, the other missing → still counts as missing.
  const fetcher = sitemapFor([{ slug: "coxs-bazar-travel-guide-flights-train-hotels-costs-bangladesh", present: false }]);
  const plan = await resolvePublishPlan(
    [selfHealFixture("coxs-bazar-travel-guide-flights-train-hotels-costs-bangladesh", "2026-10-16")],
    selfHealNow,
    true,
    async () =>
      new Set([
        `${SITE_ORIGIN}/blog/coxs-bazar-travel-guide-flights-train-hotels-costs-bangladesh`,
      ]),
  );
  assert.equal(plan.publish, true, "half-published (EN live, BN missing) still requires the rebuild");
}

{
  // Sitemap unreachable → fail safe to rebuild rather than silently skipping.
  const plan = await resolvePublishPlan(
    [selfHealFixture("kathmandu-to-coxs-bazar-flights-route-status-booking", "2026-10-16")],
    selfHealNow,
    true,
    async () => {
      throw new Error("simulated CDN outage");
    },
  );
  assert.equal(plan.publish, true, "an unreadable sitemap may not veto publication");
  assert.equal(plan.sitemapChecked, false);
}

console.log("Scheduled blog live-sitemap self-heal (check once, publish only the missing, no repeat rebuilds) all pass.");
