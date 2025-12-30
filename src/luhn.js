export function luhnCheck(number) {
  const clean = number.replace(/\D/g, "");
  if (clean.length === 0) return false;

  const digits = clean
    .split("")
    .reverse()
    .map((n) => parseInt(n, 10));

  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i];

    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
  }

  return sum % 10 === 0;
}
