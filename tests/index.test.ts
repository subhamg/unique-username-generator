import { generateFromEmail, exportedForUnitTests } from "../src/index";
import { expect } from "chai";

const { getRandomInt, generateDigits, capitalizeString } = exportedForUnitTests;

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

describe("getRandomInt()", (): void => {
  it("returns a decimal number to the second place between 0 and 1", (): void => {
    const actual: number = getRandomInt();
    expect(actual).to.be.above(0);
    expect(actual).to.be.below(1);
  })
})

describe("generateDigits()", (): void => {
  // it 
  it("returns an empty string if not passed an argument", (): void => {
    const actual: string = generateDigits();
    expect(actual).to.equal("")
  })

  it("returns a string that is the number of digits passed as an argument", (): void => {
    const actual: string = generateDigits(3);
    expect(actual).to.be.length(3);
  })
})

describe("capitalizeString()", (): void => {
  it("Capitalizes the first letter of a string", (): void => {
    const actual: string = capitalizeString("lorem");
    expect(actual).to.equal("Lorem");
  })
})