export function timeUntilUTC(hours: number) {
  const now = Date.now(); // Текущее время в миллисекундах
    const midnightUTC = new Date(Date.UTC(
        new Date().getUTCFullYear(), 
        new Date().getUTCMonth(), 
        new Date().getUTCDate() + 1, 
        hours, 0, 0
    )).getTime(); // Время следующей полуночи UTC в миллисекундах

  return midnightUTC - now;
}
