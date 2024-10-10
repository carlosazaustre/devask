const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

/**
 * Returns a relative time string in Spanish for a given date string.
 * 
 * @param dateString - The date string to be converted to a relative time string.
 * @returns A string representing the relative time from the given date to now.
 * 
 * @example
 * ```typescript
 * getRelativeString("2023-10-01T12:00:00Z"); // "hace 2 días"
 * ```
 */
export function getRelativeString(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 5) return "ahora";

  const timeUnits: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];

  for (const [unit, secondsInUnit] of timeUnits) {
    if (Math.abs(diffInSeconds) >= secondsInUnit || unit === "second") {
      const value = Math.floor(diffInSeconds / secondsInUnit);
      return rtf.format(-value, unit).replace("hace ", "hace ").trim();
    }
  }

  return "ahora";
}
