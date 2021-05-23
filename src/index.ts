import * as nouns from "./data/nouns.json";
import * as adjectives from "./data/adjectives.json";
import * as crypto from "crypto";

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
