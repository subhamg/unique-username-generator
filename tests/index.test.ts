import { generateFromEmail } from "../src/index";
import { expect } from "chai";

describe("generate-unique-username unit tests", (): void => {
  it("generating unique username from email without any special character in the name", (): void => {
    const actual: string = generateFromEmail("lakshminarayan@example.com");
    expect(actual.slice(0, -3)).is.equal("lakshminarayan");
  });
  it("generating unique username from email with a special character in the name", (): void => {
    const actual: string = generateFromEmail("lakshmi.narayan@example.com");
    expect(actual.slice(0, -3)).is.equal("lakshminarayan");
  });
});
