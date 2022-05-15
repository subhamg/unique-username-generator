import { nouns, adjectives } from "./data";
import * as crypto from "crypto";

type Style = "lowerCase" | "upperCase" | "capital";

export interface Config {
  dictionaries: string[][];
  separator?: string;
  randomDigits?: number;
  length?: number;
  style?: Style;
}

const randomNumber = (maxNumber: number | undefined) => {
  let randomNumberString;
  switch (maxNumber) {
    case 1:
      randomNumberString = crypto.randomInt(1, 9).toString();
      break;
    case 2:
      randomNumberString = crypto.randomInt(10, 90).toString();
      break;
    case 3:
      randomNumberString = crypto.randomInt(100, 900).toString();
      break;
    case 4:
      randomNumberString = crypto.randomInt(1000, 9000).toString();
      break;
    case 5:
      randomNumberString = crypto.randomInt(10000, 90000).toString();
      break;
    case 6:
      randomNumberString = crypto.randomInt(100000, 900000).toString();
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
  // Retrive name from email address
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
    username = noun + separator + adjective + randomNumber(randomDigits);
  } else {
    username = noun + adjective + randomNumber(randomDigits);
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
    const dictionariesLength = config.dictionaries.length;
    let name = "";
    for (let i = 0; i < dictionariesLength; i++) {
      if (name && config.separator) {
        if (config.separator) {
          name = name + config.separator + config.dictionaries[i][Math.floor(Math.random() * config.dictionaries[i].length)];
        } else {
          name = name + config.dictionaries[i][Math.floor(Math.random() * config.dictionaries[i].length)];
        }
      } else {
        name = config.dictionaries[i][Math.floor(Math.random() * config.dictionaries[i].length)];
      }
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
      return username.substring(0, config.length)
    } else {
      return username.substring(0, 15);
    }

  }
}

export { adjectives, nouns } from "./data";