export function getPlural(value: number, forms: string[]) {
  value = Math.abs(value) % 100;
  const lastDigit = value % 10;

  if (value > 10 && value < 20) return forms[2]; // "часов" или "минут"
  if (lastDigit > 1 && lastDigit < 5) return forms[1]; // "часа" или "минуты"
  if (lastDigit === 1) return forms[0]; // "час" или "минута"
  return forms[2];
}
