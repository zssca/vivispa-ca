import { Testimonial } from '@/types/testimonial';

// Import all service testimonials
import { hydrodermaFacialTestimonials } from './hydroderma-facial';
import { laserHairRemovalTestimonials } from './laser-hair-removal';
import { iplPhotofacialTestimonials } from './ipl-photofacial';
import { microneedlingTestimonials } from './microneedling';
import { japaneseHeadSpaTestimonials } from './japanese-head-spa';
import { laserPigmentationRemovalTestimonials } from './laser-pigmentation-removal';
import { vascularVeinRemovalTestimonials } from './vascular-vein-removal';
import { laserSkinTighteningTestimonials } from './laser-skin-tightening';
import { skinTagRemovalTestimonials } from './skin-tag-removal';
import { eyelashExtensionsTestimonials } from './eyelash-extensions';
import { chemicalPeelTestimonials } from './chemical-peel';
import { lipFillersTestimonials } from './lip-fillers';
import { antiAgingFacialTestimonials } from './anti-aging-facial';
import { bodyContouringTestimonials } from './body-contouring';
import { mensFacialTestimonials } from './mens-facial';

/**
 * All testimonials organized by service ID
 * This maintains the same interface as the original monolithic file
 */
export const testimonialsByService: Record<string, Testimonial[]> = {
  'hydroderma-facial': hydrodermaFacialTestimonials,
  'laser-hair-removal': laserHairRemovalTestimonials,
  'ipl-photofacial': iplPhotofacialTestimonials,
  'microneedling': microneedlingTestimonials,
  'japanese-head-spa': japaneseHeadSpaTestimonials,
  'laser-pigmentation-removal': laserPigmentationRemovalTestimonials,
  'vascular-vein-removal': vascularVeinRemovalTestimonials,
  'laser-skin-tightening': laserSkinTighteningTestimonials,
  'skin-tag-removal': skinTagRemovalTestimonials,
  'eyelash-extensions': eyelashExtensionsTestimonials,
  'chemical-peel': chemicalPeelTestimonials,
  'lip-fillers': lipFillersTestimonials,
  'anti-aging-facial': antiAgingFacialTestimonials,
  'body-contouring': bodyContouringTestimonials,
  'mens-facial': mensFacialTestimonials,
};

/**
 * Extract all featured testimonials across all services
 */
export const featuredTestimonials: Testimonial[] = Object.values(testimonialsByService)
  .flat()
  .filter(testimonial => testimonial.featured);

/**
 * Get testimonials for a specific service
 */
export function getTestimonialsForService(serviceId: string, limit?: number): Testimonial[] {
  const testimonials = testimonialsByService[serviceId] || [];
  return limit ? testimonials.slice(0, limit) : testimonials;
}

/**
 * Get featured testimonials
 */
export function getFeaturedTestimonials(limit?: number): Testimonial[] {
  return limit ? featuredTestimonials.slice(0, limit) : featuredTestimonials;
}

/**
 * Get testimonials by service ID (alias for backward compatibility)
 */
export function getTestimonialsByService(serviceId: string): Testimonial[] {
  return testimonialsByService[serviceId] || [];
}

// Export individual service testimonials for direct access
export {
  hydrodermaFacialTestimonials,
  laserHairRemovalTestimonials,
  iplPhotofacialTestimonials,
  microneedlingTestimonials,
  japaneseHeadSpaTestimonials,
  laserPigmentationRemovalTestimonials,
  vascularVeinRemovalTestimonials,
  laserSkinTighteningTestimonials,
  skinTagRemovalTestimonials,
  eyelashExtensionsTestimonials,
  chemicalPeelTestimonials,
  lipFillersTestimonials,
  antiAgingFacialTestimonials,
  bodyContouringTestimonials,
  mensFacialTestimonials,
};