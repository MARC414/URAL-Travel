import { getTravellerCheck } from "./travellerChecks";
import { SCHEDULED_BLOG_FAQ_HEADINGS } from "../data/scheduledBlogSeo.generated";

export type BlogStructuredDataLocale = "en" | "bn";

export interface VisibleBlogFaq {
  question: string;
  answer: string;
}

export interface VisibleBlogFaqSection {
  heading: string;
  questions: VisibleBlogFaq[];
}

export interface BlogHowToStep {
  name: string;
  text: string;
}

export interface BlogHowToDocument {
  idSuffix: string;
  name: string;
  steps: BlogHowToStep[];
}

const BLOG_FAQ_CONFIGS: Record<
  string,
  { en: RegExp; bn: RegExp }
> = {
  "travel-creator-resources": {
    en: /^\s*7\.\s*Frequently Asked Questions\s*$/i,
    bn: /^\s*৭\.\s*সচরাচর জিজ্ঞাসা\s*$/,
  },
  "umrah-hajj-guide-bangladesh-nusuk-bdt-cost": {
    en: /^\s*9\.\s*Frequently Asked Questions\s*$/i,
    bn: /^\s*৯\.\s*সচরাচর জিজ্ঞাসা\s*$/,
  },
  "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit": {
    en: /^\s*5\.\s*Frequently Asked Questions\s*$/i,
    bn: /^\s*৫\.\s*সচরাচর জিজ্ঞাসা\s*$/,
  },
  "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates": {
    en: /^\s*7\.\s*Frequently Asked Questions\s*$/i,
    bn: /^\s*৭\.\s*সচরাচর জিজ্ঞাসা\s*$/,
  },
  "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide": {
    en: /^\s*6\.\s*Frequently Asked Questions\s*$/i,
    bn: /^\s*৬\.\s*সচরাচর জিজ্ঞাসা\s*$/,
  },
  "wearing-ihram-dhaka-airport-vs-transit-flight-miqat-rules": {
    en: /^\s*6\.\s*Frequently Asked Questions\s*$/i,
    bn: /^\s*৬\.\s*সচরাচর জিজ্ঞাসা\s*$/,
  },
  "dhaka-kolkata-train-bus-benapole-border-bdt-cost-guide": {
    en: /^\s*7\.\s*Frequently Asked Questions\s*$/i,
    bn: /^\s*৭\.\s*সচরাচর জিজ্ঞাসা\s*$/,
  },
  "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia": {
    en: /^\s*7\.\s*Frequently Asked Questions\s*$/i,
    bn: /^\s*৭\.\s*সচরাচর জিজ্ঞাসা\s*$/,
  },
  "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh": {
    en: /^\s*6\.\s*Frequently Asked Questions\s*$/i,
    bn: /^\s*৬\.\s*সচরাচর জিজ্ঞাসা\s*$/,
  },
  "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah": {
    en: /^\s*5\.\s*Frequently Asked Questions\s*$/i,
    bn: /^\s*৫\.\s*সচরাচর জিজ্ঞাসা\s*$/,
  },
  "dual-currency-card-endorsement-bangladesh": {
    en: /^\s*8\.\s*Frequently Asked Questions\s*$/i,
    bn: /^\s*৮\.\s*সচরাচর জিজ্ঞাসা\s*$/,
  },
  "rfcd-account-vs-travel-quota-bangladesh-300-dollar-limit-fix": {
    en: /^\s*6\.\s*Frequently Asked Questions\s*$/i,
    bn: /^\s*৬\.\s*সচরাচর জিজ্ঞাসা\s*$/,
  },
  "best-travel-esim-and-schengen-travel-insurance-bangladesh-guide": {
    en: /^\s*6\.\s*Frequently Asked Questions\s*$/i,
    bn: /^\s*৬\.\s*সচরাচর জিজ্ঞাসা\s*$/,
  },
  "flight-delay-cancellation-lost-baggage-compensation-bangladesh-airhelp": {
    en: /^\s*3\.\s*Frequently Asked Questions\s*$/i,
    bn: /^\s*৩\.\s*সচরাচর জিজ্ঞাসা\s*$/,
  },
};

function isNumberedHeading(line: string): boolean {
  return /^\s*(?:\d+|[০-৯]+)[.)]\s+/.test(line);
}

/**
 * Reads the existing FAQ section from the visible English or Bengali article
 * body. Only explicitly allowlisted slugs receive FAQ schema, and the visible
 * question-and-answer section must match the locale-specific heading.
 */
export function getVisibleBlogFaqSection(
  slug: string,
  content: string,
  locale: BlogStructuredDataLocale
): VisibleBlogFaqSection | undefined {
  const faqConfig = BLOG_FAQ_CONFIGS[slug];
  const scheduledHeading = SCHEDULED_BLOG_FAQ_HEADINGS[slug]?.[locale];
  if ((!faqConfig && !scheduledHeading) || !content.trim()) return undefined;

  const lines = content.split(/\r?\n/);
  const headingPattern = faqConfig?.[locale];
  const headingIndex = lines.findIndex((line) =>
    headingPattern ? headingPattern.test(line) : line.trim() === scheduledHeading?.trim(),
  );
  if (headingIndex < 0) return undefined;

  let sectionEnd = lines.length;
  for (let index = headingIndex + 1; index < lines.length; index += 1) {
    if (isNumberedHeading(lines[index])) {
      sectionEnd = index;
      break;
    }
  }

  const faqLines = lines
    .slice(headingIndex + 1, sectionEnd)
    .map((line) => line.trim())
    .filter(Boolean);
  if (faqLines.length < 2 || faqLines.length % 2 !== 0) return undefined;

  const questions: VisibleBlogFaq[] = [];
  for (let index = 0; index < faqLines.length; index += 2) {
    const question = faqLines[index].replace(/^[-•]\s*/, "").trim();
    const answer = faqLines[index + 1].replace(/^[-•]\s*/, "").trim();
    if (!question || !answer) return undefined;
    questions.push({ question, answer });
  }

  return { heading: lines[headingIndex].trim(), questions };
}

interface LocalizedHowToSection {
  start: RegExp;
  end: RegExp;
  name: string;
  parseStep(line: string): { name: string; inlineText?: string } | undefined;
}

interface BlogHowToConfig {
  idSuffix: string;
  en: LocalizedHowToSection;
  bn: LocalizedHowToSection;
}

function englishNumberedStep(line: string) {
  const match = line.trim().match(/^Step\s+\d+\s*:\s*(.+)$/i);
  return match
    ? { name: match[1].replace(/\s*[:：]\s*$/, "").trim() }
    : undefined;
}

function bengaliNumberedStep(line: string) {
  const match = line.trim().match(/^ধাপ\s+[০-৯\d]+\s*[:：]\s*(.*)$/i);
  return match
    ? { name: match[1].replace(/\s*[:：]\s*$/, "").trim() }
    : undefined;
}

const HOW_TO_CONFIGS: Record<string, BlogHowToConfig[]> = {
  "umrah-rules-for-women-bangladesh-mahram-visa-ladies-gates": [{
    idSuffix: "howto-women-rawdah-preparation",
    en: {
      start: /^3\.\s*How should women prepare a Rawdah/i,
      end: /^4\.\s*What should you check about women/i,
      name: "How to prepare a women's Rawdah appointment using actual booking instructions",
      parseStep: englishNumberedStep,
    },
    bn: {
      start: /^৩\.\s*নারীরা RAWDAH APPOINTMENT/,
      end: /^৪\.\s*নারীদের ইহরামের পোশাক/,
      name: "নিজের booking instruction অনুযায়ী নারীদের Rawdah appointment-এর প্রস্তুতি",
      parseStep: bengaliNumberedStep,
    },
  }],
  "umrah-with-elderly-parents-bangladesh-wheelchair-medical-guide": [{
    idSuffix: "howto-elderly-airline-assistance",
    en: {
      start: /^1\.\s*WHAT CAN THE AIRLINE ARRANGE/i,
      end: /^2\.\s*CAN YOU BRING YOUR OWN WHEELCHAIR/i,
      name: "How to request airline wheelchair assistance for an elderly parent from Bangladesh",
      parseStep: englishNumberedStep,
    },
    bn: {
      start: /^১\.\s*এয়ারলাইন কী ব্যবস্থা করতে পারে/,
      end: /^২\.\s*নিজের হুইলচেয়ার/,
      name: "বাংলাদেশ থেকে বয়স্ক বাবা-মার জন্য এয়ারলাইন হুইলচেয়ার সহায়তা চাওয়ার ধাপ",
      parseStep: bengaliNumberedStep,
    },
  }],
  "dhaka-to-jeddah-madinah-open-jaw-flight-strategy-biman-saudia": [{
    idSuffix: "howto-compare-umrah-flights",
    en: {
      start: /^5\.\s*How do you compare flight quotes/i,
      end: /^6\.\s*Which guide/i,
      name: "How to compare Umrah flight quotes on the same basis",
      parseStep: englishNumberedStep,
    },
    bn: {
      start: /^৫\.\s*একই BASIS-এ FLIGHT QUOTE/,
      end: /^৬\.\s*এরপর কোন GUIDE/,
      name: "একই basis-এ Umrah flight quote তুলনার ধাপ",
      parseStep: bengaliNumberedStep,
    },
  }],
  "makkah-madinah-hotel-zones-haramain-train-guide-bangladesh": [{
    idSuffix: "howto-hotel-rail-plan",
    en: {
      start: /^4\.\s*How should you book the hotel and train/i,
      end: /^5\.\s*Which details belong/i,
      name: "How to plan hotel access and Haramain tickets with confirmed arrangements",
      parseStep: englishNumberedStep,
    },
    bn: {
      start: /^৪\.\s*Hotel ও train/,
      end: /^৫\.\s*কোন detail/,
      name: "নিশ্চিত arrangement দিয়ে hotel access ও Haramain ticket পরিকল্পনার ধাপ",
      parseStep: bengaliNumberedStep,
    },
  }],
  "saudi-stopover-visa-96-hours-bangladesh-saudia-flynas-umrah": [{
    idSuffix: "howto-saudia-stopover-request",
    en: {
      start: /^2\.\s*How do you request a stopover through Saudia/i,
      end: /^3\.\s*Is a used US/i,
      name: "How to prepare a Saudia stopover request subject to eligibility and approval",
      parseStep: englishNumberedStep,
    },
    bn: {
      start: /^২\.\s*Saudia-তে stopover-এর আবেদন/,
      end: /^৩\.\s*ব্যবহৃত US/,
      name: "যোগ্যতা ও অনুমোদনসাপেক্ষে Saudia stopover আবেদনের প্রস্তুতি",
      parseStep: bengaliNumberedStep,
    },
  }],
  "umrah-hajj-guide-bangladesh-nusuk-bdt-cost": [{
    idSuffix: "howto-diy-umrah-sequence",
    en: {
      start: /^4\.\s*What should you do before paying/i,
      end: /^5\.\s*How should you plan flights/i,
      name: "How to plan the visa application and permit sequence for DIY Umrah from Bangladesh",
      parseStep: englishNumberedStep,
    },
    bn: {
      start: /^৪\.\s*টাকা দেওয়ার আগে/,
      end: /^৫\.\s*ফ্লাইট, হোটেল/,
      name: "বাংলাদেশ থেকে DIY ওমরাহের আবেদন ও পারমিটের ক্রম",
      parseStep: bengaliNumberedStep,
    },
  }],
  "dual-currency-card-endorsement-bangladesh": [
    {
      idSuffix: "howto-card-endorsement",
      en: {
        start: /^2\.\s*Step by Step:\s*Endorse at an Authorized Dealer Bank/i,
        end: /^3\.\s*Activate the Foreign-Currency/i,
        name: "How to get a dual-currency card endorsed at a bank in Bangladesh",
        parseStep: englishNumberedStep,
      },
      bn: {
        start: /^২\.\s*ধাপে ধাপে:\s*Authorized Dealer ব্যাংকে Endorsement/i,
        end: /^৩\.\s*Foreign-Currency/i,
        name: "বাংলাদেশে ব্যাংকের মাধ্যমে ডুয়াল-কারেন্সি কার্ডে পাসপোর্ট এনডোর্স করার ধাপ",
        parseStep: (line) => {
          const match = line
            .trim()
            .match(/^[০-৯\d]+\.\s+\*\*(.+?)\*\*\s*(.*)$/);
          return match
            ? {
                name: match[1].replace(/\s*[:：]\s*$/, "").trim(),
                inlineText: match[2].trim(),
              }
            : undefined;
        },
      },
    },
  ],
  "nusuk-app-saudi-visa-bio-guide-bangladesh-rawdah-permit": [
    {
      idSuffix: "howto-saudi-visa-bio",
      en: {
        start: /^2\.\s*How should you complete Saudi Visa Bio/i,
        end: /^3\.\s*How do you register in Nusuk/i,
        name: "How to prepare Saudi Visa Bio enrollment when your visa application requires it",
        parseStep: englishNumberedStep,
      },
      bn: {
        start: /^২\.\s*নিজের আবেদনে Saudi Visa Bio/,
        end: /^৩\.\s*বিদেশ থেকে/,
        name: "আবেদনে চাওয়া হলে Saudi Visa Bio-তে বায়োমেট্রিক দেওয়ার প্রস্তুতি",
        parseStep: bengaliNumberedStep,
      },
    },
    {
      idSuffix: "howto-nusuk-visitor-registration",
      en: {
        start: /^3\.\s*How do you register in Nusuk/i,
        end: /^4\.\s*How do you book, confirm/i,
        name: "How to register in Nusuk as an overseas visitor with a valid visa",
        parseStep: englishNumberedStep,
      },
      bn: {
        start: /^৩\.\s*বিদেশ থেকে/,
        end: /^৪\.\s*Rawdah অ্যাপয়েন্টমেন্ট/,
        name: "বৈধ ভিসা নিয়ে বিদেশি ভিজিটর হিসেবে Nusuk-এ নিবন্ধনের ধাপ",
        parseStep: bengaliNumberedStep,
      },
    },
    {
      idSuffix: "howto-rawdah-booking",
      en: {
        start: /^4\.\s*How do you book, confirm/i,
        end: /^Does Nusuk require you to buy an eSIM/i,
        name: "How to request and confirm a Rawdah appointment subject to eligibility and availability",
        parseStep: englishNumberedStep,
      },
      bn: {
        start: /^৪\.\s*Rawdah অ্যাপয়েন্টমেন্ট/,
        end: /^Nusuk ব্যবহারের জন্য কি eSIM/,
        name: "যোগ্যতা ও প্রাপ্যতা অনুযায়ী Rawdah অ্যাপয়েন্টমেন্ট বুক ও নিশ্চিত করার ধাপ",
        parseStep: bengaliNumberedStep,
      },
    },
  ],
  "hajj-registration-bangladesh-government-vs-private-package-cost": [
    {
      idSuffix: "hajj-deadline-next-steps",
      en: {
        start: /^1\.\s*WHAT TO DO AFTER THE HAJJ 2027 REGISTRATION DEADLINE/i,
        end: /^2\.\s*GOVERNMENT-MANAGED VS\. PRIVATE HAJJ ARRANGEMENTS/i,
        name: "What to do after the Hajj 2027 registration deadline",
        parseStep: (line) => {
          const step = line.trim().match(/^-\s*Step\s+(\d+)\s*:\s*(.+)$/i);
          if (!step) return undefined;
          const titleSplit = step[2].match(/^([^:]+):\s*(.*)$/);
          return {
            name: titleSplit ? `Step ${step[1]}: ${titleSplit[1].trim()}` : `Step ${step[1]}`,
            inlineText: titleSplit?.[2]?.trim() || step[2].trim(),
          };
        },
      },
      bn: {
        start: /^১\.\s*২০২৭ সালের হজ নিবন্ধনের সময়সীমার পর করণীয়/i,
        end: /^২\.\s*সরকারি ব্যবস্থাপনা বনাম বেসরকারি হজের ব্যবস্থা/i,
        name: "হজ ২০২৭ নিবন্ধনের সময়সীমা পেরোনোর পর করণীয়",
        parseStep: (line) => {
          const match = line
            .trim()
            .match(/^-\s*\*\*(.+?)\*\*\s*(.*)$/);
          return match
            ? {
                name: match[1].replace(/\s*[:：]\s*$/, "").trim(),
                inlineText: match[2].replace(/^[:：]\s*/, "").trim(),
              }
            : undefined;
        },
      },
    },
  ],
};

function cleanInstructionText(value: string): string {
  return value
    .replace(/^\s*[-•*]\s+/, "")
    .replace(/\*\*/g, "")
    .replace(/(^|[^*])\*([^*]+)\*/g, "$1$2")
    .replace(/\s+/g, " ")
    .trim();
}

function extractHowToSteps(
  lines: string[],
  parseStep: LocalizedHowToSection["parseStep"]
): BlogHowToStep[] {
  const steps: BlogHowToStep[] = [];
  let current: { name: string; textParts: string[] } | undefined;

  const finishStep = () => {
    if (!current) return;
    const text = current.textParts.map(cleanInstructionText).filter(Boolean).join(" ");
    if (current.name && text) steps.push({ name: current.name, text });
    current = undefined;
  };

  for (const line of lines) {
    // These visible evidence/privacy notes are not an extra instruction or a continuation of the last step.
    if (getTravellerCheck(line)) continue;
    const parsed = parseStep(line);
    if (parsed) {
      finishStep();
      current = {
        name: cleanInstructionText(parsed.name),
        textParts: parsed.inlineText ? [parsed.inlineText] : [],
      };
    } else if (current && line.trim()) {
      current.textParts.push(line);
    }
  }
  finishStep();
  return steps;
}

/**
 * Builds HowTo descriptions only for article sections with an explicit,
 * visible step or stage sequence. The step text is taken from the section body
 * itself (including its bullet details); no price, timing, or outcome claims are
 * inferred for structured data.
 */
export function getVisibleBlogHowTos(
  slug: string,
  content: string,
  locale: BlogStructuredDataLocale
): BlogHowToDocument[] {
  const configs = HOW_TO_CONFIGS[slug];
  if (!configs || !content.trim()) return [];

  const lines = content.split(/\r?\n/);
  return configs.flatMap((config) => {
    const section = config[locale];
    const startIndex = lines.findIndex((line) => section.start.test(line.trim()));
    if (startIndex < 0) return [];

    let endIndex = lines.length;
    for (let index = startIndex + 1; index < lines.length; index += 1) {
      if (section.end.test(lines[index].trim())) {
        endIndex = index;
        break;
      }
    }

    const steps = extractHowToSteps(lines.slice(startIndex + 1, endIndex), section.parseStep);
    if (steps.length < 2) return [];

    return [{ idSuffix: config.idSuffix, name: section.name, steps }];
  });
}
