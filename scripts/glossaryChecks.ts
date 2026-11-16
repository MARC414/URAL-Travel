/**
 * Guards for the glossary behind /glossary.
 *
 * The page promises plain meanings in both languages, a URAL guide and an
 * official source for each term, and no fees or prices (those go stale; they
 * live in the dated guides). These checks keep that mechanical.
 * Shared by `npm run test:glossary` and `npm run verify:build`.
 */
import { getLocalizedBlogs } from "../src/data/bengaliContent";
import { GLOSSARY_GROUPS, GLOSSARY_TERMS, glossaryTermsByGroup } from "../src/data/glossary";
import { getOfficialSources } from "../src/data/officialSources";

export interface GlossaryCheck {
  ok: boolean;
  label: string;
}

const BENGALI_LETTER = /[\u0980-\u09FF]/;
/** A currency sign or code next to a number, or a number next to a currency word. */
const MONEY_FIGURE =
  /[£$€৳]\s?[\d০-৯]|\b(?:SAR|BDT|GBP|USD|EUR|AED|Tk)\.?\s?[\d০-৯]|[\d০-৯][\d০-৯,.]*\s?(?:SAR|BDT|GBP|USD|EUR|AED|taka|riyals?|pounds?|dollars?|টাকা|রিয়াল|পাউন্ড|ডলার)/i;
/** Wording that gives a religious ruling instead of a meaning. */
const RULING_WORDING =
  /\b(?:is|are|becomes?) (?:haram|halal|sinful|forbidden|invalid)\b|\binvalidates?\b|\bfatwa\b|নাজায়েজ|জায়েজ|ফতোয়া|গুনাহ/i;

/** Hub pages a term may point to. Blog, visa and tool paths are matched by shape. */
const HUB_PATHS = new Set([
  "/umrah",
  "/visa",
  "/visa-free-countries",
  "/banking",
  "/flights",
  "/hotels",
  "/costs",
  "/pre-departure",
  "/resources",
]);

export function runGlossaryChecks(): GlossaryCheck[] {
  const results: GlossaryCheck[] = [];
  const add = (problems: string[], label: string) =>
    results.push({
      ok: problems.length === 0,
      label: problems.length === 0 ? label : `${label} — ${problems.slice(0, 5).join(", ")}`,
    });

  const ids = GLOSSARY_TERMS.map((term) => term.id);
  add(
    ids.filter((id, index) => ids.indexOf(id) !== index || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)),
    `${GLOSSARY_TERMS.length} glossary terms have unique, URL-safe ids`
  );

  const names = GLOSSARY_TERMS.map((term) => term.en.toLocaleLowerCase());
  add(
    GLOSSARY_TERMS.filter((term, index) => names.indexOf(term.en.toLocaleLowerCase()) !== index).map((term) => term.en),
    "no English term name is listed twice"
  );

  const groupIds = new Set(GLOSSARY_GROUPS.map((group) => group.id));
  add(
    [
      ...GLOSSARY_TERMS.filter((term) => !groupIds.has(term.group)).map((term) => term.id),
      ...GLOSSARY_GROUPS.filter((group) => glossaryTermsByGroup(group.id).length === 0).map((group) => group.id),
    ],
    `every term sits in one of ${GLOSSARY_GROUPS.length} topics and no topic is empty`
  );

  add(
    GLOSSARY_TERMS.filter(
      (term) =>
        term.en.trim().length < 2 ||
        term.defEn.trim().length < 25 ||
        !/[.?]$/.test(term.defEn.trim()) ||
        BENGALI_LETTER.test(term.defEn)
    ).map((term) => term.id),
    "every term has an English name and a full-sentence English definition"
  );

  add(
    GLOSSARY_TERMS.filter(
      (term) =>
        term.bn.trim().length < 2 ||
        !BENGALI_LETTER.test(term.defBn) ||
        term.defBn.trim().length < 20 ||
        !/[।?.]$/.test(term.defBn.trim())
    ).map((term) => term.id),
    "every term has a Bengali name and a Bengali definition"
  );

  add(
    GLOSSARY_TERMS.filter((term) => /উমরাহ|হজ্জ/.test(`${term.bn} ${term.defBn}`)).map((term) => term.id),
    "Bengali text uses the site spellings ওমরাহ and হজ"
  );

  add(
    GLOSSARY_TERMS.filter((term) => MONEY_FIGURE.test(`${term.defEn} ${term.defBn}`)).map((term) => term.id),
    "no definition states a fee or a price"
  );

  add(
    GLOSSARY_TERMS.filter((term) => RULING_WORDING.test(`${term.defEn} ${term.defBn}`)).map((term) => term.id),
    "no definition gives a religious ruling"
  );

  add(
    GLOSSARY_TERMS.filter((term) => /[\u2014\u2013]/.test(`${term.defEn} ${term.defBn}`)).map((term) => term.id),
    "definitions use plain punctuation (no dashes)"
  );

  add(
    GLOSSARY_TERMS.filter(
      (term) => term.aka && (term.aka.length === 0 || term.aka.some((alias) => alias === term.en || alias === term.bn))
    ).map((term) => term.id),
    "other spellings do not repeat the term's own name"
  );

  const published = {
    en: new Set(getLocalizedBlogs("en").map((post) => post.slug)),
    bn: new Set(getLocalizedBlogs("bn").map((post) => post.slug)),
  };
  add(
    GLOSSARY_TERMS.filter((term) => {
      const guide = term.guide;
      if (!guide) return false;
      if (HUB_PATHS.has(guide)) return false;
      if (/^\/visa\/[a-z-]+-visa$/.test(guide) || /^\/tools\/[a-z-]+$/.test(guide)) return false;
      const slug = guide.match(/^\/blog\/([a-z0-9-]+)$/)?.[1];
      return !slug || !published.en.has(slug) || !published.bn.has(slug);
    }).map((term) => `${term.id} → ${term.guide}`),
    "every URAL guide link is a hub, visa, tool or published blog path in both languages"
  );

  const officialUrls = new Set(getOfficialSources().map((source) => source.url));
  add(
    GLOSSARY_TERMS.filter((term) => term.source && !officialUrls.has(term.source)).map((term) => term.id),
    "every official source link is in the /resources registry"
  );

  const linked = GLOSSARY_TERMS.filter((term) => term.guide || term.source).length;
  add(
    GLOSSARY_TERMS.filter((term) => !term.guide && !term.source).map((term) => term.id),
    `every term links to a URAL guide or an official source (${linked} of ${GLOSSARY_TERMS.length})`
  );

  return results;
}

/** Guide paths the built site must contain, for verify:build. */
export function glossaryGuidePaths(): string[] {
  return [...new Set(GLOSSARY_TERMS.flatMap((term) => (term.guide ? [term.guide] : [])))];
}
