import { luhnCheck } from "../src/luhn";

describe("luhnCheck", () => {
  test("valid card number", () => {
    expect(luhnCheck("4111111111111111")).toBe(true); // Visa
    expect(luhnCheck("6011000990139424")).toBe(true); // Discover
    expect(luhnCheck("30569309025904")).toBe(true); // Diners
  });

  test("invalid card number", () => {
    expect(luhnCheck("4111111111111112")).toBe(false);
  });

  test("ignores non-digit characters", () => {
    expect(luhnCheck("4111-1111-1111-1111")).toBe(true);
  });

  test("empty string should return false", () => {
    expect(luhnCheck("")).toBe(false);
  });
});
