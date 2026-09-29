import type { BlogPost } from "../types";

const TOPIC_STOP_WORDS = new Set([
  "about", "after", "and", "best", "complete", "from", "guide", "guides",
  "how", "into", "near", "over", "the", "their", "this", "through", "top",
  "travel", "traveler", "travelers", "trip", "under", "with", "your", "2026",
  "bangladesh", "bangladeshi", "dhaka", "bdt", "booking", "budget", "cheap",
  "cost", "costs", "family", "flight", "flights", "hotel", "hotels", "visa",
]);

function topicTokens(post: BlogPost): Set<string> {
  return new Set(
    `${post.slug} ${post.title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2 && !TOPIC_STOP_WORDS.has(word))
  );
}

/**
 * Recommend a small set of genuinely related guides. Explicit editorial links
 * and reciprocal links take precedence, followed by shared category and topic.
 */
export function getRelatedBlogPosts(
  post: BlogPost,
  posts: readonly BlogPost[],
  limit = 3
): BlogPost[] {
  const selfPath = `/blog/${post.slug}`;
  const currentTokens = topicTokens(post);
  const explicitLinks = new Set(
    (post.internalLinks || [])
      .map((link) => link.path.split(/[?#]/, 1)[0])
      .filter((href) => href.startsWith("/blog/"))
  );
  const reciprocalLinks = new Set(
    posts.filter((candidate) =>
      (candidate.internalLinks || []).some(
        (link) => link.path.split(/[?#]/, 1)[0] === selfPath
      )
    ).map((candidate) => candidate.slug)
  );

  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate, index) => {
      const sharedTopicCount = [...topicTokens(candidate)].filter((word) =>
        currentTokens.has(word)
      ).length;
      const score =
        (candidate.category === post.category ? 4 : 0) +
        (explicitLinks.has(`/blog/${candidate.slug}`) ? 12 : 0) +
        (reciprocalLinks.has(candidate.slug) ? 8 : 0) +
        sharedTopicCount * 3;
      return { candidate, index, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map((item) => item.candidate);
}
