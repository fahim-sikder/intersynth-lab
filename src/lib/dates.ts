// Content dates are written as plain days (e.g. `date: 2026-11-04`), which
// parse to midnight UTC. An item counts as upcoming for the whole of its day
// and becomes past only once that day is over (midnight UTC the next day).
// .github/scripts/date-rebuild-check.mjs applies the same rule.
const DAY_MS = 24 * 60 * 60 * 1000;

export function isUpcoming(date: Date, now: Date = new Date()): boolean {
  return date.valueOf() + DAY_MS > now.valueOf();
}
