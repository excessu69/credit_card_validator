export function getCardType(number) {
  const n = number.replace(/\D/g, "");

  if (/^220[0-4]/.test(n)) return "mir";

  if (/^4/.test(n)) return "visa";

  if (/^(34|37)/.test(n)) return "amex";

  if (/^(6011|65|64[4-9])/.test(n)) return "discover";

  if (/^(30[0-5]|36|38|39)/.test(n)) return "diners";

  return null;
}
