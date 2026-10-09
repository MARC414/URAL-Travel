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

const BLOG_FAQ_SLUG = "travel-creator-resources";

function isNumberedHeading(line: string): boolean {
  return /^\s*(?:\d+|[০-৯]+)[.)]\s+/.test(line);
}

/**
 * Reads the existing FAQ section from the visible English or Bengali article
 * body. This deliberately has a single allowlisted slug: schema is emitted
 * only where the page itself has a matching question-and-answer section.
 */
export function getVisibleBlogFaqSection(
  slug: string,
  content: string,
  locale: BlogStructuredDataLocale
): VisibleBlogFaqSection | undefined {
  if (slug !== BLOG_FAQ_SLUG || !content.trim()) return undefined;

  const lines = content.split(/\r?\n/);
  const headingPattern =
    locale === "bn"
      ? /^\s*৭\.\s*সচরাচর জিজ্ঞাসা\s*$/
      : /^\s*7\.\s*Frequently Asked Questions\s*$/i;
  const headingIndex = lines.findIndex((line) => headingPattern.test(line));
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
  "dual-currency-card-endorsement-bangladesh": [
    {
      idSuffix: "howto-card-endorsement",
      en: {
        start: /^2\.\s*STEP-BY-STEP:\s*HOW TO GET YOUR DUAL-CURRENCY CARD ENDORSED/i,
        end: /^3\.\s*RFCD ACCOUNT/i,
        name: "How to get a dual-currency card endorsed at a bank in Bangladesh",
        parseStep: englishNumberedStep,
      },
      bn: {
        start: /^৩\.\s*ধাপে ধাপে ব্যাংকে PASSPORT ENDORSEMENT/i,
        end: /^৪\.\s*RFCD ACCOUNT/i,
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
        start: /^2\.\s*HOW TO COMPLETE FINGERPRINT BIOMETRICS/i,
        end: /^3\.\s*HOW TO CREATE YOUR NUSUK/i,
        name: "How to complete fingerprint biometrics in the Saudi Visa Bio app",
        parseStep: englishNumberedStep,
      },
      bn: {
        start: /^২\.\s*বাংলাদেশে বসে SAUDI VISA BIO/i,
        end: /^৩\.\s*ভিসা পাওয়ার পর NUSUK/i,
        name: "Saudi Visa Bio অ্যাপে বায়োমেট্রিক তথ্য দেওয়ার ধাপ",
        parseStep: bengaliNumberedStep,
      },
    },
    {
      idSuffix: "howto-nusuk-visitor-registration",
      en: {
        start: /^3\.\s*HOW TO CREATE YOUR NUSUK APP ACCOUNT/i,
        end: /^4\.\s*HOW TO BOOK A FREE RAWDAH/i,
        name: "How to create a Nusuk visitor account after your Saudi visa is issued",
        parseStep: englishNumberedStep,
      },
      bn: {
        start: /^৩\.\s*ভিসা পাওয়ার পর NUSUK/i,
        end: /^৪\.\s*মদিনায় ফ্রি রিয়াজুল জান্নাত/i,
        name: "সৌদি ভিসা পাওয়ার পর Nusuk অ্যাপে Visitor হিসেবে নিবন্ধনের ধাপ",
        parseStep: bengaliNumberedStep,
      },
    },
  ],
  "hajj-registration-bangladesh-government-vs-private-package-cost": [
    {
      idSuffix: "howto-official-hajj-registration",
      en: {
        start: /^1\.\s*STEP-BY-STEP:\s*OFFICIAL 2-STAGE HAJJ REGISTRATION/i,
        end: /^2\.\s*GOVERNMENT HAJJ PACKAGE/i,
        name: "How to register for Hajj through Bangladesh's official Hajj system",
        parseStep: (line) => {
          const stage = line
            .trim()
            .match(/^-\s*Stage\s+(\d+)\s*:\s*(.+)$/i);
          if (stage) {
            const titleSplit = stage[2].match(/^([^:]+):\s*(.*)$/);
            return {
              name: titleSplit
                ? `Stage ${stage[1]}: ${titleSplit[1].trim()}`
                : `Stage ${stage[1]}`,
              inlineText: titleSplit?.[2]?.trim() || stage[2].trim(),
            };
          }
          const verify = line
            .trim()
            .match(/^-\s*How to Verify Your Registration Online:\s*(.*)$/i);
          return verify
            ? {
                name: "How to Verify Your Registration Online",
                inlineText: verify[1].trim(),
              }
            : undefined;
        },
      },
      bn: {
        start: /^১\.\s*ধাপে ধাপে সরকারি ২-স্তরের HAJJ নিবন্ধন/i,
        end: /^২\.\s*সরকারি হজ প্যাকেজ/i,
        name: "বাংলাদেশের সরকারি ই-হজ ব্যবস্থায় কীভাবে নিবন্ধন করবেন",
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
