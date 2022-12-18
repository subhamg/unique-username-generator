import { nouns, adjectives } from "./data";
import * as crypto from "crypto";

const getRandomInt = () => crypto.randomInt(0, 100) / 100;

const generateDigits = (numDigits = 0) => {
  if (numDigits === 0) return "";
  if (numDigits > 10) throw new Error("Cannot generate more than 10 numbers.");

  let min = 1;
  let max = 9;

  while (numDigits > 1) {
    min *= 10
    max *= 10
    numDigits--
  }

  return crypto.randomInt(min, max).toString();
};

const capitalizeString = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export interface UsernameGeneratorConfig {
  dictionaries?: string[][];
  separator?: string;
  randomDigits?: number;
  length?: number;
  style?: "lowerCase" | "upperCase" | "capitalize";
}

export function generateFromEmail(
  email: string,
  randomDigits?: number
): string {
  // Retrieve name from email address
  const nameParts = email.replace(/@.+/, "");
  // Replace all special characters like "@ . _ ";
  const name = nameParts.replace(/[&/\\#,+()$~%._@'":*?<>{}]/g, "");
  // Create and return unique username
  return name + generateDigits(randomDigits);
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
    username = adjective + separator + noun + generateDigits(randomDigits);
  } else {
    username = adjective + noun + generateDigits(randomDigits);
  }

  if (length) {
    return username.substring(0, length);
  }

  return username;
}

export function uniqueUsernameGenerator(config: UsernameGeneratorConfig): string {
  const { dictionaries = [adjectives, nouns], separator = "", randomDigits = 0 } = config;

  const numWords = dictionaries.length;

  let username: string | string[] = [];

  for (let idx = 0; idx < numWords; idx++) {
    const dictionary = dictionaries[idx];
    const randomWord = dictionary[Math.floor(getRandomInt() * dictionary.length)]

    username.push(randomWord);
  }

  if (config.style === "capitalize") username = username.map(word => capitalizeString(word)); 

  username = username.join(separator) 

  if (randomDigits) username += generateDigits(config.randomDigits);
  if (config.style === "lowerCase") username = username.toLowerCase();   
  if (config.style === "upperCase") username = username.toUpperCase();

  if (config.length) return username.substring(0, config.length);
    
  return username;
}

export {adjectives, nouns};

export const exportedForUnitTests = {
  getRandomInt,
  generateDigits,
  capitalizeString
}