import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

export const PUBLISH_TIME_ZONE = "Asia/Dhaka";
export const DEFAULT_PUBLISH_HOUR = 9;

export type ScheduledPostStatus = "draft" | "scheduled";

export interface ScheduledBlogReference {
  name: string;
  nameBn: string;
  url: string;
}

export interface ScheduledBlogLink {
  text: string;
  path: string;
}

export interface ScheduledBlogPost {
  slug: string;
  status: ScheduledPostStatus;
  publishDate?: string;
  title: string;
  titleBn: string;
  summary: string;
  summaryBn: string;
  category: string;
  categoryBn: string;
  author: string;
  authorBn: string;
  readTime: string;
  readTimeBn: string;
  updatedAt?: string;
  coverImage?: string;
  coverAltEn?: string;
  coverAltBn?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoTitleBn?: string;
  seoDescriptionBn?: string;
  snippet?: string;
  snippetBn?: string;
  faqHeadingEn?: string;
  faqHeadingBn?: string;
  references: ScheduledBlogReference[];
  internalLinksEn: ScheduledBlogLink[];
  internalLinksBn: ScheduledBlogLink[];
  englishBody: string;
  bengaliBody: string;
  sourceFile: string;
}

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const BLOG_DRAFTS_DIR = path.join(ROOT_DIR, "content", "blog");
const BLOG_INDEX_FILE = path.join(ROOT_DIR, "src", "data", "blogIndex.ts");
const IMAGE_DIMENSIONS_FILE = path.join(ROOT_DIR, "src", "utils", "imageAssets.ts");

function fail(file: string, message: string): never {
  throw new Error(`[Scheduled blogs] ${path.relative(ROOT_DIR, file)}: ${message}`);
}

function requiredString(data: Record<string, unknown>, key: string, file: string): string {
  const value = data[key];
  if (typeof value !== "string" || !value.trim()) {
    return fail(file, `frontmatter field "${key}" must be a non-empty string`);
  }
  return value.trim();
}

function optionalString(data: Record<string, unknown>, key: string, file: string): string | undefined {
  const value = data[key];
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string" || !value.trim()) {
    return fail(file, `frontmatter field "${key}" must be a non-empty string when provided`);
  }
  return value.trim();
}

function dateString(value: unknown, field: string, file: string): string | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const normalized = value instanceof Date ? value.toISOString().slice(0, 10) : value;
  if (typeof normalized !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return fail(file, `frontmatter field "${field}" must be a quoted YYYY-MM-DD date`);
  }
  const [year, month, day] = normalized.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return fail(file, `frontmatter field "${field}" is not a real calendar date`);
  }
  return normalized;
}

function parseLinks(value: unknown, field: string, file: string): ScheduledBlogLink[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) return fail(file, `frontmatter field "${field}" must be a list`);
  return value.map((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      return fail(file, `frontmatter field "${field}[${index}]" must contain text and path`);
    }
    const link = item as Record<string, unknown>;
    if (typeof link.text !== "string" || !link.text.trim()) {
      return fail(file, `frontmatter field "${field}[${index}].text" must be non-empty`);
    }
    if (typeof link.path !== "string" || !/^\/(?!\/)[^\s]*$/.test(link.path)) {
      return fail(file, `frontmatter field "${field}[${index}].path" must be a local site path`);
    }
    return { text: link.text.trim(), path: link.path.trim() };
  });
}

function parseReferences(value: unknown, file: string): ScheduledBlogReference[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) return fail(file, 'frontmatter field "references" must be a list');
  return value.map((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      return fail(file, `frontmatter field "references[${index}]" must contain name, nameBn and url`);
    }
    const reference = item as Record<string, unknown>;
    for (const field of ["name", "nameBn", "url"] as const) {
      if (typeof reference[field] !== "string" || !reference[field].trim()) {
        return fail(file, `frontmatter field "references[${index}].${field}" must be non-empty`);
      }
    }
    if (!/^https:\/\//i.test(reference.url as string)) {
      return fail(file, `frontmatter field "references[${index}].url" must use https`);
    }
    return {
      name: (reference.name as string).trim(),
      nameBn: (reference.nameBn as string).trim(),
      url: (reference.url as string).trim(),
    };
  });
}

function getStaticBlogSlugs(): Set<string> {
  const source = fs.readFileSync(BLOG_INDEX_FILE, "utf8");
  const match = source.match(/export\s+const\s+BLOG_SLUGS\s*=\s*\[([\s\S]*?)\]\s*(?:as\s+const)?\s*;/);
  if (!match) throw new Error("[Scheduled blogs] Could not read the static BLOG_SLUGS list.");
  return new Set([...match[1].matchAll(/"([a-z0-9-]+)"/g)].map((entry) => entry[1]));
}

function parsePost(file: string): ScheduledBlogPost {
  const source = fs.readFileSync(file, "utf8");
  const frontmatterMatch = source.match(/^(?:\uFEFF)?---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!frontmatterMatch) return fail(file, "file must start with a YAML frontmatter block wrapped in --- lines");

  let parsedData: unknown;
  try {
    parsedData = parseYaml(frontmatterMatch[1]);
  } catch (error) {
    return fail(file, `could not parse YAML frontmatter (${String(error)})`);
  }
  if (!parsedData || typeof parsedData !== "object" || Array.isArray(parsedData)) {
    return fail(file, "YAML frontmatter must be a mapping of fields");
  }
  const data = parsedData as Record<string, unknown>;
  const bodyContent = source.slice(frontmatterMatch[0].length);
  const slug = requiredString(data, "slug", file);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return fail(file, '"slug" must be lowercase kebab-case');
  }
  if (path.basename(file, ".md") !== slug) {
    return fail(file, `filename must match the frontmatter slug (${slug}.md)`);
  }

  const status = requiredString(data, "status", file);
  if (status !== "draft" && status !== "scheduled") {
    return fail(file, '"status" must be either "draft" or "scheduled"');
  }
  const publishDate = dateString(data.publishDate, "publishDate", file);
  if (status === "scheduled" && !publishDate) {
    return fail(file, 'a "scheduled" post must have a quoted publishDate: YYYY-MM-DD');
  }

  const separator = /\r?\n<!--\s*lang:bn\s*-->\r?\n/;
  const bodyParts = bodyContent.split(separator);
  if (bodyParts.length !== 2) {
    return fail(file, 'body must contain one Bengali section separator on its own line: <!-- lang:bn -->');
  }
  const englishBody = bodyParts[0].trim();
  const bengaliBody = bodyParts[1].trim();
  if (!englishBody || !bengaliBody) return fail(file, "English and Bengali article bodies must both be non-empty");

  const coverImage = optionalString(data, "coverImage", file);
  const coverAltEn = optionalString(data, "coverAltEn", file);
  const coverAltBn = optionalString(data, "coverAltBn", file);
  if (status === "scheduled" && !coverImage) {
    return fail(file, 'a "scheduled" post must define a validated coverImage');
  }
  if (coverImage && (!coverAltEn || !coverAltBn)) {
    return fail(file, "coverImage requires localized coverAltEn and coverAltBn text");
  }
  if (coverImage) {
    if (!/^[a-z0-9]+(?:[_-][a-z0-9]+)*$/.test(coverImage)) {
      return fail(file, '"coverImage" must be an asset basename without an extension');
    }
    const imageDimensionsSource = fs.readFileSync(IMAGE_DIMENSIONS_FILE, "utf8");
    if (!imageDimensionsSource.includes(`\"${coverImage}\":`)) {
      return fail(file, `cover image "${coverImage}" needs an entry in src/utils/imageAssets.ts`);
    }
    for (const width of [640, 960, 1200]) {
      const variant = path.join(ROOT_DIR, "public", "assets", "images", `${coverImage}-${width}.webp`);
      if (!fs.existsSync(variant)) return fail(file, `cover image is missing ${path.relative(ROOT_DIR, variant)}`);
    }
    const socialImage = path.join(ROOT_DIR, "src", "assets", "optimized-social", `${coverImage}.jpg`);
    if (!fs.existsSync(socialImage)) {
      return fail(file, `cover image needs its social JPEG at ${path.relative(ROOT_DIR, socialImage)}`);
    }
  }

  const updatedAt = dateString(data.updatedAt, "updatedAt", file);
  return {
    slug,
    status,
    publishDate,
    title: requiredString(data, "title", file),
    titleBn: requiredString(data, "titleBn", file),
    summary: requiredString(data, "summary", file),
    summaryBn: requiredString(data, "summaryBn", file),
    category: requiredString(data, "category", file),
    categoryBn: requiredString(data, "categoryBn", file),
    author: requiredString(data, "author", file),
    authorBn: requiredString(data, "authorBn", file),
    readTime: requiredString(data, "readTime", file),
    readTimeBn: requiredString(data, "readTimeBn", file),
    updatedAt,
    coverImage,
    coverAltEn,
    coverAltBn,
    seoTitle: optionalString(data, "seoTitle", file),
    seoDescription: optionalString(data, "seoDescription", file),
    seoTitleBn: optionalString(data, "seoTitleBn", file),
    seoDescriptionBn: optionalString(data, "seoDescriptionBn", file),
    snippet: optionalString(data, "snippet", file),
    snippetBn: optionalString(data, "snippetBn", file),
    faqHeadingEn: optionalString(data, "faqHeadingEn", file),
    faqHeadingBn: optionalString(data, "faqHeadingBn", file),
    references: parseReferences(data.references, file),
    internalLinksEn: parseLinks(data.internalLinksEn, "internalLinksEn", file),
    internalLinksBn: parseLinks(data.internalLinksBn, "internalLinksBn", file),
    englishBody,
    bengaliBody,
    sourceFile: file,
  };
}

export function loadScheduledBlogPosts(): ScheduledBlogPost[] {
  if (!fs.existsSync(BLOG_DRAFTS_DIR)) return [];
  const files = fs
    .readdirSync(BLOG_DRAFTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && entry.name.toLowerCase() !== "readme.md")
    .map((entry) => path.join(BLOG_DRAFTS_DIR, entry.name))
    .sort();
  const staticSlugs = getStaticBlogSlugs();
  const seen = new Set<string>();
  const posts = files.map(parsePost);
  for (const post of posts) {
    if (staticSlugs.has(post.slug)) return fail(post.sourceFile, `slug "${post.slug}" already exists in the published blog index`);
    if (seen.has(post.slug)) return fail(post.sourceFile, `duplicate scheduled blog slug "${post.slug}"`);
    seen.add(post.slug);
  }
  return posts;
}

export function dhakaCalendarDate(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: PUBLISH_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function isPublicationTimeReached(post: ScheduledBlogPost, now: Date = new Date()): boolean {
  if (post.status !== "scheduled" || !post.publishDate) return false;
  const publishAt = Date.parse(
    `${post.publishDate}T${String(DEFAULT_PUBLISH_HOUR).padStart(2, "0")}:00:00+06:00`,
  );
  return now.getTime() >= publishAt;
}

export function isPostIncludedInBuild(
  post: ScheduledBlogPost,
  now: Date = new Date(),
  includeUnpublished = false,
): boolean {
  if (includeUnpublished) return true;
  return isPublicationTimeReached(post, now);
}

export function getPostsDueForPublishing(
  posts: ScheduledBlogPost[],
  now: Date = new Date(),
  includeOverdue = false,
): ScheduledBlogPost[] {
  const todayDhaka = dhakaCalendarDate(now);
  return posts.filter((post) => {
    if (!isPublicationTimeReached(post, now) || !post.publishDate) return false;
    return includeOverdue ? post.publishDate <= todayDhaka : post.publishDate === todayDhaka;
  });
}

export function formatEnglishPublishDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: PUBLISH_TIME_ZONE,
  }).format(new Date(`${isoDate}T12:00:00+06:00`));
}

export function formatBengaliPublishDate(isoDate: string): string {
  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: PUBLISH_TIME_ZONE,
  })
    .format(new Date(`${isoDate}T12:00:00+06:00`))
    .replace(/,/g, "");
}
