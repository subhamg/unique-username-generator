import * as nouns from "./data/nouns.json";
import * as adjectives from "./data/adjectives.json";

const randomNumber = (maxNumber: number | undefined) => {
  switch (maxNumber) {
    case 1:
      return Math.floor(Math.random() * 10).toString();
      break;
    case 2:
      return Math.floor(10 + Math.random() * 90).toString();
      break;
    case 3:
      return Math.floor(100 + Math.random() * 900).toString();
      break;
    case 4:
      return Math.floor(1000 + Math.random() * 9000).toString();
      break;
    case 5:
      return Math.floor(10000 + Math.random() * 90000).toString();
      break;
    case 6:
      return Math.floor(100000 + Math.random() * 900000).toString();
      break;
    default:
      return "";
      break;
  }
};

export function generateFromEmail(
  email: string,
  randomDigits?: number
): string {
  // Retrive name from email address
  const nameParts = email.replace(/^(.+)@(.+)$/g, "$1");
  // Replace all special characters like "@ . _";
  const name = nameParts.replace(/[&/\\#,+()$~%._@'":*?<>{}]/g, "");
  // Create unique username
  const username = name + randomNumber(randomDigits);
  return username;
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
