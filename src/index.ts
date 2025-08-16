import { nouns, adjectives } from "./data";
import { getRandomInt, createSeededRandomInt, RandomIntFunction } from "./utils/random";
import { DEFAULT_PROFANITY, buildProfanityFilter, ProfanityFilterOptions } from "./data/profanity";

type Style = "lowerCase" | "upperCase" | "capital" | "titleCase" | "camelCase" | "pascalCase" | "kebabCase" | "snakeCase";

export interface Config {
  dictionaries: string[][];
  separator?: string;
  randomDigits?: number;
  length?: number;
  style?: Style;
  // New options (backward-compatible)
  exclude?: string[];
  profanityList?: string[];
  profanityOptions?: ProfanityFilterOptions;
  ensureUnique?: boolean; // try to avoid duplicates within a single call
  // Determinism and templating
  seed?: string | number;
  template?: string; // e.g. "{adjective}-{noun}-{digits:2}"
}

export interface EmailOptions {
  randomDigits?: number;
  stripLeadingDigits?: boolean; // default: true
  leadingFallback?: string; // default: "user"
}

export interface GenerateManyOptions extends Config {
  count: number;
  unique?: boolean; // enforce uniqueness within the batch
}

export async function generateUniqueAsync(
  config: Config,
  isTaken: (candidate: string) => boolean | Promise<boolean>,
  maxAttempts = 1000
): Promise<string> {
  const used = new Set<string>();
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidate = uniqueUsernameGenerator(config);
    if (used.has(candidate)) continue;
    const taken = await Promise.resolve(isTaken(candidate));
    if (!taken) return candidate;
    used.add(candidate);
  }
  throw new Error("Unable to find a unique username within the given attempts");
}

export function generateMany(options: GenerateManyOptions): string[] {
  const { count, unique = false, ...rest } = options;
  const results: string[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < count; i++) {
    let candidate = uniqueUsernameGenerator(rest);
    if (unique) {
      let spins = 0;
      while (seen.has(candidate) && spins < 1000) {
        candidate = uniqueUsernameGenerator(rest);
        spins++;
      }
      if (seen.has(candidate)) {
        throw new Error("Unable to produce the requested number of unique usernames");
      }
      seen.add(candidate);
    }
    results.push(candidate);
  }
  return results;
}

const randomNumber = (maxNumber: number | undefined) => {
  if (!maxNumber || maxNumber < 1 || maxNumber > 6) { return ""; }
  else {
    const s = Math.pow(10, maxNumber - 1);
    return Math.floor(getRandomInt(s, 10 * s - 1)).toString();
  }
};

export function generateFromEmail(email: string, randomDigits?: number): string;
export function generateFromEmail(email: string, options?: EmailOptions): string;
export function generateFromEmail(
  email: string,
  second?: number | EmailOptions
): string {
  // Retrieve name from email address
  const nameParts = email.replace(/@.+/, "");
  // Replace all special characters like "@ . _ ";
  let name = nameParts.replace(/[&/\\#,+()$~%._@'":*?<>{}]/g, "");

  const opts: EmailOptions = typeof second === "object" && second !== null
    ? second
    : { randomDigits: typeof second === "number" ? second : undefined };

  const stripLeading = opts.stripLeadingDigits !== false; // default true
  const fallback = opts.leadingFallback ?? "user";

  if (stripLeading) {
    name = name.replace(/^[0-9]+/, "");
    if (name.length === 0) {
      name = fallback;
    }
  }
  // Create and return unique username
  const digits = typeof opts.randomDigits === "number" ? opts.randomDigits : undefined;
  return name + randomNumber(digits);
}

export function generateUsername(
  separator?: string,
  randomDigits?: number,
  length?: number,
  prefix?: string
): string {
  const nouns = safeNouns();
  const adjectives = safeAdjectives();
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const adjective = prefix ? prefix.replace(/\s{2,}/g, " ").replace(/\s/g, separator ?? "").toLocaleLowerCase() : adjectives[Math.floor(Math.random() * adjectives.length)];

  let username;
  // Create unique username
  if (separator) {
    username = adjective + separator + noun + randomNumber(randomDigits);
  } else {
    username = adjective + noun + randomNumber(randomDigits);
  }

  if (length) {
    return username.substring(0, length);
  }

  return username;
}

export function uniqueUsernameGenerator(config: Config): string {
  if (!config.dictionaries) {
    throw new Error(
      "Cannot find any dictionary. Please provide at least one, or leave " +
      "the 'dictionary' field empty in the config object",
    );
  } else {
    // Build filters
    const blocklist = Array.from(new Set([...(config.profanityList ?? DEFAULT_PROFANITY), ...(config.exclude ?? [])]))
      .filter((w) => !!w);
    const isBlocked = buildProfanityFilter(blocklist, config.profanityOptions);
    // Wrap dictionaries to filter out blocked terms
    const filteredDictionaries: string[][] = config.dictionaries.map((dict) =>
      dict.filter((w) => !isBlocked(String(w)))
    );
    const usableDictionaries: string[][] = filteredDictionaries.filter((d) => d.length > 0);
    if (usableDictionaries.length === 0) {
      throw new Error("All provided dictionaries are empty after filtering. Consider relaxing filters or providing more words.");
    }
    const randInt: RandomIntFunction = typeof config.seed !== "undefined" ? createSeededRandomInt(config.seed) : getRandomInt;
    const fromDictRander = (i: number) => usableDictionaries[i][randInt(0, usableDictionaries[i].length - 1)];
    const dictionariesLength = usableDictionaries.length;
    const separator = config.separator || "";
    const maxLength = config.length || 15;

    // Template-based assembly
    let username: string;
    let alreadyFormatted = false;
    if (config.template) {
      username = renderTemplate(config.template, usableDictionaries, randInt, separator, config.randomDigits);
    } else {
      const selected: string[] = [];
      for (let i = 0; i < dictionariesLength; i++) {
        const next = fromDictRander(i);
        selected.push(next);
      }
      const core = formatFromTokens(selected, config.style ?? "lowerCase", separator);
      username = core + randomNumber(config.randomDigits);
      alreadyFormatted = true;
    }

    if (!alreadyFormatted) {
      username = formatUsername(username, config.style ?? "lowerCase", separator);
    }

    return username.substring(0, maxLength);
  }
}

export { adjectives, nouns } from "./data";
export { DEFAULT_PROFANITY } from "./data/profanity";

// Helpers
function safeAdjectives(): string[] {
  const isBlocked = buildProfanityFilter(DEFAULT_PROFANITY);
  return adjectives.filter((w) => !isBlocked(w));
}

function safeNouns(): string[] {
  const isBlocked = buildProfanityFilter(DEFAULT_PROFANITY);
  return nouns.filter((w) => !isBlocked(w));
}

function titleCaseWord(word: string): string {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function toWords(input: string, separator: string | undefined): string[] {
  if (!separator) return [input];
  return input.split(separator).filter(Boolean);
}

function formatUsername(base: string, style: Style, separator: string | undefined): string {
  const normalizedSeparator = typeof separator === "string" ? separator : "";
  const parts = toWords(base, normalizedSeparator);

  switch (style) {
    case "upperCase":
      return parts.join(normalizedSeparator).toUpperCase();
    case "capital":
      return parts.map(titleCaseWord).join(normalizedSeparator);
    case "camelCase": {
      const [first, ...rest] = parts.map((p) => p.toLowerCase());
      return [first ?? "", ...rest.map(titleCaseWord)].join("");
    }
    case "pascalCase": {
      return parts.map(titleCaseWord).join("");
    }
    case "kebabCase":
      return parts.map((p) => p.toLowerCase()).join("-");
    case "snakeCase":
      return parts.map((p) => p.toLowerCase()).join("_");
    case "lowerCase":
    default:
      return parts.join(normalizedSeparator).toLowerCase();
  }
}

function formatFromTokens(tokens: string[], style: Style, separator: string): string {
  const normalizedTokens = tokens.map((t) => sanitizeToken(t, separator));
  switch (style) {
    case "upperCase":
      return normalizedTokens.map((t) => t.toUpperCase()).join(separator);
    case "capital":
      {
        const joined = normalizedTokens.join(separator);
        if (!joined) return joined;
        return joined.charAt(0).toUpperCase() + joined.slice(1).toLowerCase();
      }
    case "titleCase":
      return normalizedTokens.map(titleCaseWord).join(separator);
    case "camelCase": {
      const [first, ...rest] = normalizedTokens.map((p) => p.toLowerCase());
      return [first ?? "", ...rest.map(titleCaseWord)].join("");
    }
    case "pascalCase":
      return normalizedTokens.map(titleCaseWord).join("");
    case "kebabCase":
      return normalizedTokens.map((p) => p.toLowerCase()).join("-");
    case "snakeCase":
      return normalizedTokens.map((p) => p.toLowerCase()).join("_");
    case "lowerCase":
    default:
      return normalizedTokens.map((p) => p.toLowerCase()).join(separator);
  }
}

function sanitizeToken(token: string, separator: string): string {
  if (!token) return token;
  if (!separator) {
    // remove non-alphanumeric characters when no explicit separator is requested
    return token.replace(/[^a-zA-Z0-9]/g, "");
  }
  // replace non-alphanumeric with the provided separator and collapse repeats
  const replaced = token.replace(/[^a-zA-Z0-9]+/g, separator);
  const collapsed = replaced.replace(new RegExp(`${escapeRegex(separator)}{2,}`, "g"), separator);
  return trimSeparator(collapsed, separator);
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function trimSeparator(value: string, separator: string): string {
  const re = new RegExp(`^${escapeRegex(separator)}|${escapeRegex(separator)}$`, "g");
  return value.replace(re, "");
}

// Template rendering: supports {word} tokens and {digits:n}
function renderTemplate(
  template: string,
  dictionaries: string[][],
  randInt: RandomIntFunction,
  separator: string,
  randomDigits?: number
): string {
  // Pre-defined tokens: {adjective}, {noun}, positional {0}, {1}, ... and {digits:n}
  const tokenRegex = /\{(adjective|noun|digits(?::\d+)?|\d+)\}/gi;
  const pick = (index: number) => dictionaries[index][randInt(0, dictionaries[index].length - 1)];
  let adjIndex = -1;
  let nounIndex = -1;
  // Best-effort: try to map first dict to adjective and second to noun
  if (dictionaries.length > 0) adjIndex = 0;
  if (dictionaries.length > 1) nounIndex = 1;

  return template.replace(tokenRegex, (match) => {
    const inner = match.slice(1, -1);
    if (inner.startsWith("digits")) {
      const parts = inner.split(":");
      const n = parts[1] ? parseInt(parts[1], 10) : (randomDigits ?? 0);
      return randomNumber(Number.isFinite(n) ? n : undefined);
    }
    if (inner === "adjective" && adjIndex >= 0) return pick(adjIndex);
    if (inner === "noun" && nounIndex >= 0) return pick(nounIndex);
    const idx = parseInt(inner, 10);
    if (Number.isFinite(idx) && idx >= 0 && idx < dictionaries.length) return pick(idx);
    return match;
  }).replace(/\s+/g, separator || "");
}
