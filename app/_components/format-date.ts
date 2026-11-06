/** "2026-11-06" to "Nov 6, 2026". ISO dates from content are treated as UTC so the output is the same on every machine. */
export function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
