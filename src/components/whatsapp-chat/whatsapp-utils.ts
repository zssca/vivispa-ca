import type { Message } from './whatsapp.types';
import { formatTime } from '../../lib/utils/format';

// Constants
const WHATSAPP_NUMBER = '14037087654'; // Vivi Aesthetics & Spa phone number
const INITIAL_MESSAGE =
  "Hi! I'm interested in learning more about your beauty and wellness treatments at Vivi Aesthetics & Spa.";

export function handlePhoneCall(): void {
  window.open(`tel:${WHATSAPP_NUMBER}`, '_self');
}

export function handleWhatsAppRedirect(message?: string): void {
  const text = encodeURIComponent(message || INITIAL_MESSAGE);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  window.open(whatsappUrl, '_blank');
}

export function createMessage(text: string, sender: 'user' | 'support'): Message {
  return {
    id: Date.now().toString(),
    text: text.trim(),
    sender,
    timestamp: new Date(),
  };
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export { formatTime }; 