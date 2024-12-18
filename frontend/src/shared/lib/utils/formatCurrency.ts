export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 2,
  }).format(value);
}
