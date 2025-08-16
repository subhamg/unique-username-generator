import { adjectives, nouns, generateFromEmail, uniqueUsernameGenerator, generateUsername, generateMany, generateUniqueAsync } from "../src/index";
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
  it("generateFromEmail should strip leading digits from local part", (): void => {
    const actual: string = generateFromEmail("243423423432asasdsa@dd.dd", 1);
    expect(actual.slice(0, -1)).is.equal("asasdsa");
  });
  it("generateFromEmail can keep leading digits when configured", (): void => {
    const actual: string = generateFromEmail("123abc@example.com", { randomDigits: 0, stripLeadingDigits: false });
    expect(actual).is.equal("123abc");
  });
  it("generateFromEmail can customize fallback when all digits", (): void => {
    const actual: string = generateFromEmail("12345@example.com", { randomDigits: 0, leadingFallback: "member" });
    expect(actual).is.equal("member");
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
  it("uniqueUsernameGenerator length 1 trims 2 to 1", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["qa"]],
      length: 1
    });
    expect(actual).is.equal("q");
  });
  it("uniqueUsernameGenerator length 3 leaves 2 unchanged", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["qa"]],
      length: 3
    });
    expect(actual).is.equal("qa");
  });
  it("uniqueUsernameGenerator default length", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["qazwsxedcrfvtgby"]]
    });
    expect(actual).is.equal("qazwsxedcrfvtgb");
  });
  it("uniqueUsernameGenerator digits 1", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["q"], ["a"]],
      randomDigits: 1
    });
    expect(actual).to.match(/qa[1-9]/);
  });
  it("uniqueUsernameGenerator digits 3", (): void => {
    const actual: string = uniqueUsernameGenerator({
      dictionaries: [["q"], ["a"]],
      randomDigits: 3
    });
    expect(actual).to.match(/qa[1-9]\d{2}/);
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
  it("uniqueUsernameGenerator excludes profane words by default", (): void => {
    const config = { dictionaries: [["shit"], ["nice"]] } as any;
    const actual: string = uniqueUsernameGenerator(config);
    expect(actual).to.equal("nice");
  });
  it("uniqueUsernameGenerator supports extra exclude list", (): void => {
    const config = { dictionaries: [["alpha", "beta"]], exclude: ["beta"], randomDigits: 0 } as any;
    const actual: string = uniqueUsernameGenerator(config);
    expect(actual).to.equal("alpha");
  });
  it("formatting styles work", (): void => {
    const cfg = { dictionaries: [["blue"], ["whale"]], separator: "-" } as any;
    expect(uniqueUsernameGenerator({ ...cfg, style: "kebabCase", randomDigits: 0, length: 20 })).to.equal("blue-whale");
    expect(uniqueUsernameGenerator({ ...cfg, style: "snakeCase", randomDigits: 0, length: 20 })).to.equal("blue_whale");
    expect(uniqueUsernameGenerator({ ...cfg, style: "camelCase", randomDigits: 0, length: 20 })).to.equal("blueWhale");
    expect(uniqueUsernameGenerator({ ...cfg, style: "pascalCase", randomDigits: 0, length: 20 })).to.equal("BlueWhale");
    expect(uniqueUsernameGenerator({ ...cfg, style: "titleCase", randomDigits: 0, length: 20 })).to.equal("Blue-Whale");
  });
  it("deterministic output with seed", (): void => {
    const cfg = { dictionaries: [["a","b","c"], ["x","y","z"]], randomDigits: 0, seed: "seed" } as any;
    const a: string = uniqueUsernameGenerator(cfg);
    const b: string = uniqueUsernameGenerator(cfg);
    expect(a).to.equal(b);
  });
  it("template rendering works", (): void => {
    const cfg = { dictionaries: [["blue"], ["whale"]], randomDigits: 0, seed: 1, template: "{adjective}-{noun}-{digits:2}" } as any;
    const actual: string = uniqueUsernameGenerator(cfg);
    expect(actual).to.match(/^blue-whale-\d{2}$/);
  });
  it("generateMany produces requested count and uniqueness when asked", (): void => {
    const cfg = { dictionaries: [["a","b"],["x","y"]], randomDigits: 0 } as any;
    const many = generateMany({ ...cfg, count: 3, unique: true });
    expect(many).to.lengthOf(3);
    expect(new Set(many).size).to.equal(3);
  });
  it("generateUniqueAsync retries until available", async (): Promise<void> => {
    const cfg = { dictionaries: [["a","b"],["x","y"]], randomDigits: 0 } as any;
    const seen = new Set<string>();
    const isTaken = (candidate: string) => {
      if (seen.size === 0) {
        seen.add(candidate);
        return true; // first generated is taken
      }
      return false;
    };
    const username = await generateUniqueAsync(cfg, isTaken, 50);
    expect(username).to.be.a("string");
    expect(username).to.not.equal(Array.from(seen)[0]);
  });
});

describe("generate-unique-username unit tests", (): void => {
  it("generating unique username", (): void => {
    const actual: string = generateUsername();
    expect(typeof actual).is.equal("string");
    expect(actual).is.not.equal("");
  });

  it("generating unique username with separator", (): void => {
    const actual: string = generateUsername("-");
    expect(actual).is.contains("-");
    expect(actual.split("-").length).is.greaterThan(1);
  });
  it("generating unique username with separator and no random number", (): void => {
    const actual: string = generateUsername("-", 0);
    expect(actual).to.not.match(/[0-9]/);
  });
  it("generating unique username with max length", (): void => {
    const actual: string = generateUsername("-", 2, 5);
    expect(actual).to.lengthOf(5)
  });
  it("generating unique username with max length and prefix", (): void => {
    const actual: string = generateUsername("-", undefined, undefined, "unique username");
    expect(actual).to.contain(`unique-username`)
  });
})