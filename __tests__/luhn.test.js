import { luhnCheck } from "../src/luhn.js";

describe("luhnCheck()", () => {
  test("valid card numbers return true", () => {
    expect(luhnCheck("4111111111111111")).toBe(true); // Visa
    expect(luhnCheck("6011000990139424")).toBe(true); // Discover
    expect(luhnCheck("30569309025904")).toBe(true); // Diners
  });

  test("invalid card numbers return false", () => {
    expect(luhnCheck("4111111111111112")).toBe(false);
    expect(luhnCheck("6011000990139420")).toBe(false);
  });

  test("empty string returns false", () => {
    expect(luhnCheck("")).toBe(false);
  });

  test("non-digit characters are ignored", () => {
    expect(luhnCheck("4111-1111-1111-1111")).toBe(true);
  });

  test("string with only letters returns false", () => {
    expect(luhnCheck("abcdef")).toBe(false);
  });
});
