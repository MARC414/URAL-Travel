import { getVisibleBlogFaqSection } from "./blogStructuredData";

export const ESIM_INSURANCE_SLUG = "best-travel-esim-and-schengen-travel-insurance-bangladesh-guide";
type Locale = "en" | "bn";

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/** Target-only semantic rendering, shared by React and prerender.
 * Input remains the existing localized article body, not a second copy of it.
 * All prose is escaped; this is intentionally not a general HTML/Markdown parser.
 */
export function renderEsimInsuranceBody(content: string, locale: Locale): string {
  const bn = locale === "bn";
  const headings = content.split(/\n\n/).map((block) => block.trim())
    .filter((block) => /^[0-9০-৯]+\. [^\n]+$/.test(block));
  const headingId = (heading: string) => `esim-section-${heading.match(/^[0-9০-৯]+/)?.[0]
    .replace(/[০-৯]/g, (digit) => String("০১২৩৪৫৬৭৮৯".indexOf(digit)))}`;
  const trust = bn
    ? "যাচাই: ১৬ অক্টোবর ২০২৬ — সেবাদাতার নির্দেশনা, EU Visa Code, দূতাবাসের চেকলিস্ট ও বিমার শর্ত। বাস্তবে নেটওয়ার্ক পরীক্ষা করা হয়নি।"
    : "Checked 16 October 2026 against provider guidance, the EU Visa Code, an embassy checklist and insurance terms. Not a field-tested network review.";
  const nav = headings.map((heading) => `<a class="underline underline-offset-4" href="#${headingId(heading)}">${escapeHtml(heading)}</a>`).join("");
  const body = content.split(/\n\n/).map((block) => {
    const text = block.trim();
    if (!text) return "";
    const faq = getVisibleBlogFaqSection(ESIM_INSURANCE_SLUG, text, locale);
    if (faq) {
      return `<section id="esim-section-6" class="space-y-4"><h2 class="font-serif text-xl font-bold text-brand-navy">${escapeHtml(faq.heading)}</h2>${faq.questions.map(({ question, answer }) => `<div class="space-y-2"><h3 class="font-semibold text-brand-navy">${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p></div>`).join("")}</section>`;
    }
    if (/^[0-9০-৯]+\. [^\n]+$/.test(text)) {
      return `<h2 id="${headingId(text)}" class="scroll-mt-24 font-serif text-xl font-bold text-brand-navy">${escapeHtml(text)}</h2>`;
    }
    if (text === "Before you buy" || text === "কেনার আগে মিলিয়ে নিন") {
      return `<h2 class="font-serif text-xl font-bold text-brand-navy">${escapeHtml(text)}</h2>`;
    }
    const lines = text.split("\n");
    const unordered = lines.every((line) => line.startsWith("- "));
    const ordered = lines.every((line) => /^[0-9০-৯]+\) /.test(line));
    if (unordered || ordered) {
      const tag = ordered ? "ol" : "ul";
      return `<${tag} class="${ordered ? "list-decimal" : "list-disc"} pl-6 space-y-3">${lines.map((line) => `<li>${escapeHtml(line.replace(/^(?:- |[0-9০-৯]+\) )/, ""))}</li>`).join("")}</${tag}>`;
    }
    return `<p>${escapeHtml(text)}</p>`;
  }).join("\n");
  return `<div data-esim-insurance-body="${locale}" class="space-y-6"><p class="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"><time datetime="2026-10-16">${escapeHtml(trust)}</time></p><nav aria-label="${bn ? "এই গাইডের বিষয়" : "In this guide"}" class="flex flex-col gap-2 rounded-xl border border-slate-200 p-4 text-sm">${nav}<a class="underline underline-offset-4" href="#esim-section-6">${bn ? "৬. সচরাচর জিজ্ঞাসা" : "6. Frequently Asked Questions"}</a></nav>${body}</div>`;
}

/** The caller supplies centrally resolved partner URLs; never a country deep link. */
export function renderEsimPartnerCallout(locale: Locale, urls: { airalo: string; yesim: string }): string {
  const bn = locale === "bn";
  const link = (url: string, label: string) => {
    if (!url.startsWith("https://")) throw new Error("eSIM partner URL must use HTTPS");
    return `<a class="inline-flex justify-center rounded-lg bg-brand-navy px-4 py-3 text-sm font-bold text-white" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer sponsored">${label}</a>`;
  };
  return `<aside data-esim-partners="${locale}" class="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-4" aria-labelledby="esim-partner-heading"><h2 id="esim-partner-heading" class="font-serif text-lg font-bold text-brand-navy">${bn ? "স্পনসরড / অ্যাফিলিয়েট লিংক: eSIM প্ল্যান দেখুন" : "Sponsored / affiliate links: browse eSIM plans"}</h2><p class="text-sm">${bn ? "এসব লিংক দিয়ে কিনলে URAL কমিশন পেতে পারে। এগুলো সেবাদাতার সাধারণ লিংক—ওমান আগে থেকে নির্বাচন করা নেই। সাইটে গিয়ে দেশ ও প্ল্যান বেছে দাম, কভারেজ, মেয়াদ এবং ফোনের সামঞ্জস্য যাচাই করুন। এগুলো বিমা কেনার লিংক নয়।" : "URAL may earn a commission if you buy through these links. They open the provider, not a preselected Oman package. Choose your destination and plan there, then confirm price, coverage, validity and device compatibility. These are not insurance-purchase links."}</p><div class="flex flex-wrap gap-3">${link(urls.airalo, bn ? "Airalo প্ল্যান দেখুন" : "Browse Airalo plans")}${link(urls.yesim, bn ? "Yesim প্ল্যান দেখুন" : "Browse Yesim plans")}</div></aside>`;
}
