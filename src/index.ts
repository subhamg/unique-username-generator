import { nouns, adjectives } from "./data";
import { randomBytes } from "crypto";

type Style = "lowerCase" | "upperCase" | "capital";

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
  let randomNumberString;
  switch (maxNumber) {
    case 1:
      randomNumberString = Math.floor(getRandomInt(1, 9)).toString();
      break;
    case 2:
      randomNumberString = Math.floor(getRandomInt(10, 90)).toString();
      break;
    case 3:
      randomNumberString = Math.floor(getRandomInt(100, 900)).toString();
      break;
    case 4:
      randomNumberString = Math.floor(getRandomInt(1000, 9000)).toString();
      break;
    case 5:
      randomNumberString = Math.floor(getRandomInt(10000, 90000)).toString();
      break;
    case 6:
      randomNumberString = Math.floor(getRandomInt(100000, 900000)).toString();
      break;
    default:
      randomNumberString = "";
      break;
  }
  return randomNumberString;
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
    const dictionariesLength = config.dictionaries.length;
    let name = "";
    for (let i = 0; i < dictionariesLength; i++) {
      const next = fromDictRander(i);
      if (!name) { name = next; }
      else { name += separator + next; }
    }

    let username = name + randomNumber(config.randomDigits);

    username = username.toLowerCase();

    if (config.style === "lowerCase") {
      username = username.toLowerCase();
    } else if (config.style === "capital") {
      const [firstLetter, ...rest] = username.split("");
      username = firstLetter.toUpperCase() + rest.join("");
    } else if (config.style === "upperCase") {
      username = username.toUpperCase();
    }

    if (config.length) {
      return username.substring(0, config.length);
    } else {
      return username.substring(0, 15);
    }

  }
}

export { adjectives, nouns } from "./data";
