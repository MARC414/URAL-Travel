import type { BlogPost } from "../types";

const ENGLISH_MONTHS: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

const BENGALI_MONTHS: Record<string, number> = {
  "জানুয়ারি": 1,
  "ফেব্রুয়ারি": 2,
  "মার্চ": 3,
  "এপ্রিল": 4,
  "মে": 5,
  "জুন": 6,
  "জুলাই": 7,
  "আগস্ট": 8,
  "সেপ্টেম্বর": 9,
  "অক্টোবর": 10,
  "নভেম্বর": 11,
  "ডিসেম্বর": 12,
};

const BENGALI_DIGITS: Record<string, string> = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};

/** Convert the English or Bengali editorial display date to a UTC sort key. */
export function blogPublicationTimestamp(date: string): number {
  const englishDate = date.trim().match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (englishDate) {
    const month = ENGLISH_MONTHS[englishDate[1].toLowerCase()];
    if (month) {
      return Date.UTC(Number(englishDate[3]), month - 1, Number(englishDate[2]));
    }
  }

  const normalizedBengaliDate = date
    .replace(/[০-৯]/g, (digit) => BENGALI_DIGITS[digit] ?? digit)
    .replace(/,/g, " ")
    .trim();
  const bengaliDate = normalizedBengaliDate.match(/^(\d{1,2})\s+([^\s]+)\s+(\d{4})$/u);
  if (bengaliDate) {
    const month = BENGALI_MONTHS[bengaliDate[2]];
    if (month) {
      return Date.UTC(Number(bengaliDate[3]), month - 1, Number(bengaliDate[1]));
    }
  }

  return Number.NEGATIVE_INFINITY;
}

/**
 * Sort a display list by its original publication date, newest first.
 * When the display records are localized (Bengali), canonical English records
 * provide a locale-independent date key. The localized date is the fallback.
 * Equal dates retain their original order for deterministic pagination.
 */
export function sortBlogsNewestFirst<T extends BlogPost>(
  posts: readonly T[],
  canonicalPosts: readonly BlogPost[] = [],
): T[] {
  const canonicalDates = new Map(
    canonicalPosts.map((post) => [post.slug, blogPublicationTimestamp(post.date)]),
  );

  return posts
    .map((post, originalIndex) => ({
      post,
      originalIndex,
      timestamp: canonicalDates.get(post.slug) ?? blogPublicationTimestamp(post.date),
    }))
    .sort(
      (a, b) =>
        b.timestamp - a.timestamp || a.originalIndex - b.originalIndex,
    )
    .map(({ post }) => post);
}
