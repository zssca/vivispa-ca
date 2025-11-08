import { FAQ } from '@/types/faq';

// Import all service FAQs
import { hydrodermaFacialFaqs } from './hydroderma-facial';
import { microneedlingFaqs } from './microneedling';
import { laserHairRemovalFaqs } from './laser-hair-removal';
import { iplPhotofacialFaqs } from './ipl-photofacial';
import { japaneseHeadSpaFaqs } from './japanese-head-spa';
import { laserPigmentationRemovalFaqs } from './laser-pigmentation-removal';
import { vascularVeinRemovalFaqs } from './vascular-vein-removal';
import { laserSkinTighteningFaqs } from './laser-skin-tightening';
import { skinTagRemovalFaqs } from './skin-tag-removal';
import { eyelashExtensionsFaqs } from './eyelash-extensions';

/**
 * Service-specific FAQs organized by service ID
 * This maintains the same interface as the original monolithic file
 */
export const serviceFaqs: Record<string, FAQ[]> = {
  'hydroderma-facial': hydrodermaFacialFaqs,
  'microneedling': microneedlingFaqs,
  'laser-hair-removal': laserHairRemovalFaqs,
  'ipl-photofacial': iplPhotofacialFaqs,
  'japanese-head-spa': japaneseHeadSpaFaqs,
  'laser-pigmentation-removal': laserPigmentationRemovalFaqs,
  'vascular-vein-removal': vascularVeinRemovalFaqs,
  'laser-skin-tightening': laserSkinTighteningFaqs,
  'skin-tag-removal': skinTagRemovalFaqs,
  'eyelash-extensions': eyelashExtensionsFaqs,
};

/**
 * General FAQ categories for the website
 */
export const generalFaqs: FAQ[] = [
  {
    question: "What should I expect during my first visit?",
    answer: "During your first visit to Vivi Aesthetics & Spa, you'll complete a brief health and skin assessment form. You'll then meet with one of our skin care specialists who will analyze your skin, discuss your concerns and goals, and recommend treatments tailored to your specific needs. We encourage you to arrive 15 minutes early for your first appointment to complete paperwork and get comfortable in our space."
  },
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment through our online booking system, by calling us at +1 (403) 708-7654, or by emailing ViviAestheticsSpa@gmail.com. We recommend booking 1-2 weeks in advance for most treatments, though we do try to accommodate last-minute appointments when possible."
  },
  {
    question: "Do you offer gift cards?",
    answer: "Yes, we offer digital and physical gift cards in any denomination. Gift cards can be purchased online, by phone, or in person at either of our locations. They make perfect gifts for birthdays, anniversaries, or any special occasion."
  },
  {
    question: "What qualifications do your aestheticians have?",
    answer: "All of our aestheticians are licensed professionals with specialized training in their respective areas of expertise. Many have additional certifications in advanced treatments like laser therapy, microneedling, and medical-grade facials. We invest in ongoing education to ensure our team stays current with the latest techniques and technologies."
  },
  {
    question: "Do you accept insurance or health spending accounts?",
    answer: "We provide detailed receipts for all treatments that may be eligible for health spending accounts or insurance reimbursement. Coverage varies by provider, so we recommend checking with your insurance company regarding specific treatment eligibility before your appointment."
  },
  {
    question: "Are your treatments suitable for all skin types and tones?",
    answer: "Yes, we offer treatments suitable for all skin types, conditions, and tones. During your consultation, our specialists will assess your specific needs and customize treatments accordingly. We use advanced technologies and products designed to safely treat diverse skin tones."
  }
];

export const bookingFaqs: FAQ[] = [
  {
    question: "What is your cancellation policy?",
    answer: "We require 24 hours notice for cancellations or rescheduling. Appointments cancelled with less than 24 hours notice may be subject to a cancellation fee of 50% of the service price. No-shows will be charged the full service price."
  },
  {
    question: "Do you offer consultations?",
    answer: "Yes, we offer complimentary 15-minute consultations for most services. For advanced treatments like laser procedures or specialized skin concerns, we provide in-depth 30-minute consultations that can be credited toward your treatment if booked within 30 days."
  },
  {
    question: "How often should I get treatments?",
    answer: "Treatment frequency varies by service type and individual needs. During your consultation, our specialists will create a personalized treatment schedule. Generally, facial treatments are recommended every 4-6 weeks, while laser treatments may require 6-8 sessions spaced 4-6 weeks apart."
  }
];

export const offersFaqs: FAQ[] = [
  {
    question: "Do you offer package deals?",
    answer: "Yes, we offer various package deals and treatment series that provide better value than individual sessions. These are customized based on your treatment goals and can include combinations of different services."
  },
  {
    question: "Are there seasonal promotions?",
    answer: "We regularly offer seasonal promotions and special events. Follow us on social media or subscribe to our newsletter to stay updated on current offers and exclusive deals."
  },
  {
    question: "Can I combine different treatments?",
    answer: "Many treatments can be combined for enhanced results. Our specialists will advise on the best treatment combinations and proper timing between different procedures to ensure optimal results and safety."
  }
];

/**
 * Helper functions for backward compatibility
 */

/**
 * Get FAQs for a specific service
 */
export function getFaqsByService(serviceId: string): FAQ[] {
  return serviceFaqs[serviceId] || [];
}

/**
 * Get general FAQs
 */
export function getGeneralFaqs(): FAQ[] {
  return generalFaqs;
}

/**
 * Get booking FAQs
 */
export function getBookingFaqs(): FAQ[] {
  return bookingFaqs;
}

/**
 * Get offers FAQs
 */
export function getOffersFaqs(): FAQ[] {
  return offersFaqs;
}

/**
 * Get all service FAQs
 */
export function getAllServiceFaqs(): Record<string, FAQ[]> {
  return serviceFaqs;
}

// Export individual service FAQs for direct access
export {
  hydrodermaFacialFaqs,
  microneedlingFaqs,
  laserHairRemovalFaqs,
  iplPhotofacialFaqs,
  japaneseHeadSpaFaqs,
  laserPigmentationRemovalFaqs,
  vascularVeinRemovalFaqs,
  laserSkinTighteningFaqs,
  skinTagRemovalFaqs,
  eyelashExtensionsFaqs,
};