export function timeUntilUTC(hours: number) {
  const now = new Date();
  const byUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), hours, 0, 0));

  if (now.getUTCHours() >= 12) {
      byUTC.setUTCDate(byUTC.getUTCDate() + 1);
  }

  return byUTC.getTime();
}
