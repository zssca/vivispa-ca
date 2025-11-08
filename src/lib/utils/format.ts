/**
 * Formatting utilities for time, dates, and other data
 */

/**
 * Formats a date into a time string (HH:MM AM/PM)
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Formats a phone number for display
 */
export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
  }
  return phoneNumber;
}

/**
 * Formats a phone number for WhatsApp (digits only)
 */
export function formatPhoneForWhatsApp(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, '');
}