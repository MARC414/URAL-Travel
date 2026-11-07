/**
 * Text for the "Copy Post" button.
 *
 * THE ONE RULE: a share caption carries exactly ONE URL.
 *
 * Why this is a module and not a template literal in the component. The caption
 * used to end with a second link — the URAL Facebook page — so the text pasted
 * into Facebook, LinkedIn or WhatsApp contained two addresses. A social platform
 * unfurls *one* link, and with a choice it does not reliably pick the article: the
 * owner pasted a caption and got the URAL profile logo instead of the post's hero
 * photograph, because the platform had scraped the Facebook page.
 *
 * Losing that link is not losing the call to follow. The brand prompt survives as
 * a bare handle, which no platform turns into a link preview — so the article URL
 * is the only address in the text and it is the only thing that can be scraped.
 *
 * The handle is spelled out rather than imported from `URAL_SOCIAL_LINKS` because
 * that constant is a URL, and using it is precisely the bug this file prevents.
 */

/** Canonical origin. Duplicated from `localeRoutes` on purpose: this module is
 * imported by a client chunk, and keeping it dependency-free is cheaper than
 * pulling the locale route table in for one string. `test:sharing-citations`
 * asserts the two agree, so the copy cannot drift silently. */
export const SHARE_ORIGIN = "https://uraltravel.co.uk";

/** Bare handles, never URLs. See the note at the top of this file. */
export const BRAND_HANDLE = "@uraltravelbd";
export const BRAND_WHATSAPP_DISPLAY = "+8801784385335";

export interface ShareCaptionInput {
  title: string;
  snippet: string;
  slug: string;
  isBn: boolean;
}

/** Canonical article URL for a slug and locale. */
export function shareArticleUrl(slug: string, isBn: boolean): string {
  return `${SHARE_ORIGIN}${isBn ? "/bn" : ""}/blog/${slug}`;
}

/**
 * Builds the caption. The article URL is placed on its own line exactly once, and
 * every other "address" in the text is a handle or a phone number — neither of
 * which any platform unfurls.
 */
export function buildShareCaption({ title, snippet, slug, isBn }: ShareCaptionInput): string {
  const url = shareArticleUrl(slug, isBn);
  const lines = isBn
    ? [
        `✈️ ${title}`,
        "",
        "📌 সংক্ষিপ্ত উত্তর:",
        snippet,
        "",
        `👉 সম্পূর্ণ গাইড: ${url}`,
        `🌐 Facebook: ${BRAND_HANDLE}`,
        `💬 প্রশ্ন করুন WhatsApp-এ: ${BRAND_WHATSAPP_DISPLAY}`,
      ]
    : [
        `✈️ ${title}`,
        "",
        "📌 Quick Summary:",
        snippet,
        "",
        `👉 Read Full Guide: ${url}`,
        `🌐 Follow URAL: ${BRAND_HANDLE}`,
        `💬 Questions on WhatsApp: ${BRAND_WHATSAPP_DISPLAY}`,
      ];
  return lines.join("\n");
}

/**
 * Every http(s) address in a chunk of text.
 *
 * Exposed so the test can assert the caption contains exactly one, rather than
 * matching on a phrase that a future rewrite could word differently while
 * reintroducing a second link.
 */
export function extractUrls(text: string): string[] {
  return text.match(/https?:\/\/[^\s]+/g) ?? [];
}
