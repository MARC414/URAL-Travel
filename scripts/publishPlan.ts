import {
  dhakaCalendarDate,
  getPostsDueForPublishing,
  type ScheduledBlogPost,
} from "./scheduledPosts";
import { SITE_ORIGIN } from "../src/utils/localeRoutes";

/**
 * The nightly checker used to rebuild whenever "publishDate === today in Dhaka",
 * with include_overdue defaulting to false — so a post the schedule missed on
 * its own day (workflow outage, empty cron run, slow deploy) was missed forever.
 *
 * The rebuild the workflow triggers (isPostIncludedInBuild) is time-based, so:
 * - a post whose date has arrived or passed is always present in the next build;
 * - forcing the rebuild one time catches everything up;
 * - re-checking every night is safe only while it does not cause repeat rebuilds.
 *
 * That last part is what makes catch-up self-healing instead of a nightly
 * heartbeat: the publish decision is gated on the *live* production sitemap.
 * A scheduled post whose publish time has passed **and** whose EN/BN URLs are
 * still missing from the live sitemap requests a rebuild; a post that is
 * already live never triggers one. If the sitemap cannot be read, the checker
 * fails safe to "rebuild" — an unreachable sitemap must not be able to leave a
 * published-intent article unpublished, and Cloudflare outages are rarer than
 * the false-negative that would otherwise be permanent.
 */

export interface PublishPlan {
  publish: boolean;
  todayDhaka: string;
  dueSlugs: string[];
  missingFromLive: string[];
  sitemapChecked: boolean;
  liveSitemapUrlCount: number | null;
  mode: "include-overdue" | "publish-date-only";
}

function postUrlMissingFromXml(post: ScheduledBlogPost, locs: Set<string>): boolean {
  const englishUrl = new URL(`/blog/${post.slug}`, SITE_ORIGIN).toString();
  const bengaliUrl = new URL(`/bn/blog/${post.slug}`, SITE_ORIGIN).toString();
  return !locs.has(englishUrl) || !locs.has(bengaliUrl);
}

export async function fetchLiveSitemapUrls(fetchImpl: typeof fetch = fetch): Promise<Set<string>> {
  const url = new URL("/sitemap.xml", SITE_ORIGIN).toString();
  const response = await fetchImpl(url, {
    headers: { "Cache-Control": "no-cache" },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) {
    throw new Error(`live sitemap request failed: ${url} returned HTTP ${response.status}`);
  }
  const body = (await response.text()).normalize("NFC");
  const locs = new Set<string>();
  for (const match of body.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
    locs.add(match[1].normalize("NFC"));
  }
  if (locs.size === 0) {
    throw new Error(`live sitemap request succeeded but contained no <loc> entries: ${url}`);
  }
  return locs;
}

export async function resolvePublishPlan(
  posts: ScheduledBlogPost[],
  now: Date,
  includeOverdue: boolean,
  fetchLive: () => Promise<Set<string>> = () => fetchLiveSitemapUrls(),
): Promise<PublishPlan> {
  const todayDhaka = dhakaCalendarDate(now);
  const duePosts = getPostsDueForPublishing(posts, now, includeOverdue);
  const mode: PublishPlan["mode"] = includeOverdue ? "include-overdue" : "publish-date-only";

  if (duePosts.length === 0) {
    return {
      publish: false,
      todayDhaka,
      dueSlugs: [],
      missingFromLive: [],
      sitemapChecked: false,
      liveSitemapUrlCount: null,
      mode,
    };
  }

  try {
    const liveUrls = await fetchLive();
    const missing = duePosts.filter((post) => postUrlMissingFromXml(post, liveUrls));
    return {
      publish: missing.length > 0,
      todayDhaka,
      dueSlugs: duePosts.map((post) => post.slug),
      missingFromLive: missing.map((post) => post.slug),
      sitemapChecked: true,
      liveSitemapUrlCount: liveUrls.size,
      mode,
    };
  } catch (error) {
    console.warn(
      `[scheduled:check] could not read the live production sitemap (${error instanceof Error ? error.message : String(error)}); failing safe to request the rebuild.`,
    );
    return {
      publish: true,
      todayDhaka,
      dueSlugs: duePosts.map((post) => post.slug),
      missingFromLive: duePosts.map((post) => post.slug),
      sitemapChecked: false,
      liveSitemapUrlCount: null,
      mode,
    };
  }
}
