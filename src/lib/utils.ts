import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, merging Tailwind CSS
 * classes intelligently.
 *
 * @param {...ClassValue[]} inputs - An array of class values to be combined.
 * @returns {string} A single string with the combined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
