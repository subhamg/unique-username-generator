import { adjectives, nouns, generateFromEmail, uniqueUsernameGenerator } from "../src/index";
import { expect } from "chai";

describe("generate-unique-username-from-email unit tests", (): void => {
  it("generating from email containing no special character in the name", (): void => {
    const actual: string = generateFromEmail("lakshminarayan@example.com");
    expect(actual).is.equal("lakshminarayan");
  });
  it("generating from email with special character in the name", (): void => {
    const actual: string = generateFromEmail("lakshmi.narayan@example.com");
    expect(actual).is.equal("lakshminarayan");
  });
  it("generating from email containing no special character in the name and adding one random digit", (): void => {
    const actual: string = generateFromEmail("lakshminarayan@example.com", 1);
    expect(actual.slice(0, -1)).is.equal("lakshminarayan");
  });
  it("generating from email with special character in the name and adding one random digit", (): void => {
    const actual: string = generateFromEmail("lakshmi.narayan@example.com", 1);
    expect(actual.slice(0, -1)).is.equal("lakshminarayan");
  });
  it("generating from email containing no special character in the name and adding two random digit", (): void => {
    const actual: string = generateFromEmail("lakshminarayan@example.com", 2);
    expect(actual.slice(0, -2)).is.equal("lakshminarayan");
  });
  it("generating from email with special character in the name and adding two random digit", (): void => {
    const actual: string = generateFromEmail("lakshmi.narayan@example.com", 2);
    expect(actual.slice(0, -2)).is.equal("lakshminarayan");
  });
  it("generating from email containing no special character in the name and adding three random digit", (): void => {
    const actual: string = generateFromEmail("lakshminarayan@example.com", 3);
    expect(actual.slice(0, -3)).is.equal("lakshminarayan");
  });
  it("generating from email with special character in the name and adding three random digit", (): void => {
    const actual: string = generateFromEmail("lakshmi.narayan@example.com", 3);
    expect(actual.slice(0, -3)).is.equal("lakshminarayan");
  });
  it("generating from email containing no special character in the name and adding four random digit", (): void => {
    const actual: string = generateFromEmail("lakshminarayan@example.com", 4);
    expect(actual.slice(0, -4)).is.equal("lakshminarayan");
  });
  it("generating from email with special character in the name and adding four random digit", (): void => {
    const actual: string = generateFromEmail("lakshmi.narayan@example.com", 4);
    expect(actual.slice(0, -4)).is.equal("lakshminarayan");
  });
  it("generating from email containing no special character in the name and adding five random digit", (): void => {
    const actual: string = generateFromEmail("lakshminarayan@example.com", 5);
    expect(actual.slice(0, -5)).is.equal("lakshminarayan");
  });
  it("generating from email with special character in the name and adding five random digit", (): void => {
    const actual: string = generateFromEmail("lakshmi.narayan@example.com", 5);
    expect(actual.slice(0, -5)).is.equal("lakshminarayan");
  });
  it("generating from email containing no special character in the name and adding six random digit", (): void => {
    const actual: string = generateFromEmail("lakshminarayan@example.com", 6);
    expect(actual.slice(0, -6)).is.equal("lakshminarayan");
  });
  it("generating from email with special character in the name and adding six random digit", (): void => {
    const actual: string = generateFromEmail("lakshmi.narayan@example.com", 6);
    expect(actual.slice(0, -6)).is.equal("lakshminarayan");
  });
});

describe("generate-unique-username-uniqueUsernameGenerator unit tests", (): void => {
  it("uniqueUsernameGenerator uses all dicts w separator", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["q"], ["a"]],
      separator: "-"
    });
    expect(actual).is.equal("q-a");
  });

  it("uniqueUsernameGenerator uses all dicts wo separator", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["q"], ["a"]]
    });
    expect(actual).is.equal("qa");
  });
  it("uniqueUsernameGenerator style UPPERCASE", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["q"], ["a"]],
      style: "upperCase"
    });
    expect(actual).is.equal("QA");
  });
  it("uniqueUsernameGenerator style lowercase", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["Q"], ["A"]],
      style: "lowerCase"
    });
    expect(actual).is.equal("qa");
  });
  it("uniqueUsernameGenerator style capital", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["q"], ["A"]],
      style: "capital"
    });
    expect(actual).is.equal("Qa");
  });
  it("uniqueUsernameGenerator works w config w default dictionaries only", (): void => {
    const actual: string = uniqueUsernameGenerator({ dictionaries: [adjectives, nouns] });
    expect(actual).not.contains("-");
  });
});
