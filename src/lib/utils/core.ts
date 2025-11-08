import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A utility function for constructing class names with conditional logic
 * Combines clsx and tailwind-merge for handling class merging and conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a price string to a localized currency display
 */
export function formatPrice(
  price: string | number,
  locale: string = "en-CA",
  currency: string = "CAD"
): string {
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(numericPrice);
}

/**
 * Truncates text to a specified length and adds ellipsis if needed
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Formats a date string into a localized date display
 */
export function formatDate(
  dateString: string,
  locale: string = "en-CA",
  options: Intl.DateTimeFormatOptions = { 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  }
): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to slug format (lowercase, hyphens instead of spaces)
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    const replacement = newArray[j];
    if (temp !== undefined && replacement !== undefined) {
      newArray[i] = replacement;
      newArray[j] = temp;
    }
  }
  return newArray;
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}