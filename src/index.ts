import { nouns, adjectives } from "./data";
import { randomBytes } from "crypto";

type Style = "lowerCase" | "upperCase" | "capital" | "camelCase" | "pascalCase";

export interface Config {
  dictionaries: string[][];
  separator?: string;
  randomDigits?: number;
  length?: number;
  style?: Style;
}

// Function to generate a random number within a given range
const getRandomInt = (min: number, max: number): number => {
  const randomBuffer = randomBytes(4); // 4 bytes to generate a 32-bit integer

  const randomInt = randomBuffer.readUInt32BE(0); // Convert bytes to an unsigned 32-bit integer

  return min + (randomInt % (max - min + 1));
};


const randomNumber = (maxNumber: number | undefined) => {
  if (!maxNumber || maxNumber < 1 || maxNumber > 6) { return ""; }
  else {
    const s = Math.pow(10, maxNumber - 1);
    return Math.floor(getRandomInt(s, 10 * s - 1)).toString();
  }
};

export function generateFromEmail(
  email: string,
  randomDigits?: number
): string {
  // Retrieve name from email address
  const nameParts = email.replace(/@.+/, "");
  // Replace all special characters like "@ . _ ";
  const name = nameParts.replace(/[&/\\#,+()$~%._@'":*?<>{}]/g, "");
  // Create and return unique username
  return name + randomNumber(randomDigits);
}

export function generateUsername(
  separator?: string,
  randomDigits?: number,
  length?: number
): string {
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

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
    const separator = config.separator || "";
    const fromDictRander = (i: number) => {
      if (config.dictionaries[i].length === 0) {
        throw new Error(
          `Dictionary #${i} is empty`
        );
      }
      const d = (separator == "" ? config.dictionaries[i] : config.dictionaries[i].filter(x => x.indexOf(separator) == -1));
      if (d.length === 0) {
        throw new Error(
          `Dictionary #${i} is empty after filtering out entries containing separator '${separator}'`
        );
      }
      return d[getRandomInt(0, d.length - 1)];
    }

    const parts = config.dictionaries.map((_, i) => fromDictRander(i).toLowerCase());
    let name = "";

    const cap = (w: string) => { return w.charAt(0).toUpperCase() + w.slice(1); };
    switch (config.style) {
      case "capital":
        {
          name = cap(parts.join(separator));
          break;
        }
      case "upperCase":
        {
          name = parts.join(separator).toUpperCase();
          break;
        }
      case "camelCase":
        {
          const [first, ...rest] = parts;
          name = [first].concat(rest.map(x => cap(x))).join(separator);
          break;
        }
      case "pascalCase":
        {
          name = parts.map(x => cap(x)).join(separator);
          break;
        }
      case "lowerCase":
      default:
        {
          name = parts.join(separator);
          break;
        }
    }

    const username = name + randomNumber(config.randomDigits);

    if (config.length) {
      return username.substring(0, config.length);
    } else {
      return username.substring(0, 15);
    }

  }
}

export { adjectives, nouns } from "./data";
