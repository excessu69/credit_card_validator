import { getCardType } from "../src/getCardType";

describe("getCardType", () => {
  test("detects MIR", () => {
    expect(getCardType("2200123412341234")).toBe("mir");
  });

  test("detects VISA", () => {
    expect(getCardType("4111111111111111")).toBe("visa");
  });

  test("detects AMEX", () => {
    expect(getCardType("340000000000009")).toBe("amex");
  });

  test("detects Discover", () => {
    expect(getCardType("6011111111111117")).toBe("discover");
  });

  test("detects Diners", () => {
    expect(getCardType("30569309025904")).toBe("diners");
  });

  test("returns null for unknown", () => {
    expect(getCardType("9999999999999999")).toBe(null);
  });
});
