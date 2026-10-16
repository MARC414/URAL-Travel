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
assert.equal(repoPosts.length, 1, "the existing Cox’s Bazar article should be retained in content/blog");
const coxsBazarPost = repoPosts[0];
assert.equal(coxsBazarPost.status, "scheduled");
assert.equal(coxsBazarPost.publishDate, "2026-10-16");
assert.ok(coxsBazarPost.englishBody.includes("no confirmed scheduled passenger service"));
assert.ok(coxsBazarPost.bengaliBody.includes("নির্ধারিত যাত্রীবাহী ফ্লাইটের নিশ্চিত সময়সূচি পাওয়া যায়নি"));
const nowOct16AtPublish = new Date("2026-10-16T03:00:00.000Z"); // 09:00:00 on Oct 16 in Dhaka
assert.equal(isPostIncludedInBuild(coxsBazarPost, nowOct16AtPublish), true);
assert.equal(isPostIncludedInBuild(coxsBazarPost, nowAtPublish), false);

console.log("Scheduled blog parser, Dhaka 9 AM date gates, and current scheduled post all pass.");
