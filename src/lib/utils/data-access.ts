import { Service } from '@/types/service';
import { Testimonial } from '@/types/testimonial';
import { FAQ } from '@/types/faq';
import { services, servicesMap, getServiceById, getServiceBySlug } from '@/data/services';
import { testimonialsByService } from '@/data/testimonials';
import { serviceFaqs } from '@/data/faqs';

/**
 * Unified data access utilities for services, testimonials, and FAQs
 */

// ==================== SERVICE UTILITIES ====================

/**
 * Get all services
 */
export function getAllServices(): Service[] {
  return services;
}

/**
 * Get service by ID
 */
export function getService(id: string): Service | undefined {
  return getServiceById(id);
}

/**
 * Get service by slug
 */
export function getServiceBySlugUtil(slug: string): Service | undefined {
  return getServiceBySlug(slug);
}

/**
 * Check if service is available at location
 */
export function isServiceAvailableAtLocation(
  service: Service | string,
  locationId: string
): boolean {
  const serviceObj = typeof service === 'string' ? getService(service) : service;
  if (!serviceObj) return false;
  
  return serviceObj.availableLocations?.includes(locationId) ?? false;
}

/**
 * Get related services for a service
 */
export function getRelatedServices(serviceId: string, limit = 3): Service[] {
  const service = getService(serviceId);
  if (!service) return [];
  
  return (service.relatedServiceIds || [])
    .map(id => getService(id))
    .filter((s): s is Service => s !== undefined)
    .slice(0, limit);
}

// ==================== TESTIMONIAL UTILITIES ====================

/**
 * Get testimonials for a specific service
 */
export function getServiceTestimonials(serviceId: string): Testimonial[] {
  const normalizedId = serviceId.toLowerCase().replace(/\s+/g, '-');
  return testimonialsByService[serviceId] || testimonialsByService[normalizedId] || [];
}

/**
 * Get all testimonials as flat array
 */
export function getAllTestimonials(): Testimonial[] {
  return Object.values(testimonialsByService).flat();
}

/**
 * Get featured testimonials
 */
export function getFeaturedTestimonials(limit?: number): Testimonial[] {
  const featured = getAllTestimonials().filter(t => t.featured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Get random testimonials
 */
export function getRandomTestimonials(
  count: number, 
  excludeServiceId?: string
): Testimonial[] {
  const allTestimonials = getAllTestimonials();
  const eligible = excludeServiceId
    ? allTestimonials.filter(t => t.serviceId !== excludeServiceId)
    : allTestimonials;
  
  // Simple shuffle and slice
  return eligible
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

/**
 * Get testimonials for multiple services
 */
export function getTestimonialsForServices(serviceIds: string[]): Testimonial[] {
  return serviceIds.reduce<Testimonial[]>((acc, serviceId) => {
    return [...acc, ...getServiceTestimonials(serviceId)];
  }, []);
}

// ==================== FAQ UTILITIES ====================

/**
 * Get FAQs for a specific service
 */
export function getServiceFAQs(serviceId: string): FAQ[] {
  const normalizedId = serviceId.toLowerCase().replace(/\s+/g, '-');
  return serviceFaqs[serviceId] || serviceFaqs[normalizedId] || [];
}

/**
 * Get all service FAQs as map
 */
export function getAllServiceFAQs(): Record<string, FAQ[]> {
  return serviceFaqs;
}

/**
 * Get FAQs for multiple services
 */
export function getFAQsForServices(serviceIds: string[]): FAQ[] {
  return serviceIds.reduce<FAQ[]>((acc, serviceId) => {
    return [...acc, ...getServiceFAQs(serviceId)];
  }, []);
}

// ==================== LOCATION UTILITIES ====================

/**
 * Check if item is available at location (generic)
 */
export function isAvailableAtLocation(
  item: { availableLocations?: string[] },
  locationId: string | null | undefined
): boolean {
  if (!locationId || locationId === "All Locations") {
    return true;
  }
  
  return item.availableLocations?.includes(locationId) ?? false;
}

// ==================== SEARCH AND FILTER UTILITIES ====================

/**
 * Search services by keyword
 */
export function searchServices(query: string): Service[] {
  const lowerQuery = query.toLowerCase();
  return services.filter(service =>
    service.title.toLowerCase().includes(lowerQuery) ||
    service.previewDescription.toLowerCase().includes(lowerQuery) ||
    service.keywords?.some(keyword => 
      keyword.toLowerCase().includes(lowerQuery)
    )
  );
}

/**
 * Filter services by category
 */
export function getServicesByCategory(category: string): Service[] {
  return services.filter(service => service.category === category);
}

/**
 * Get services available at a specific location
 */
export function getServicesAtLocation(locationId: string): Service[] {
  return services.filter(service => 
    isServiceAvailableAtLocation(service, locationId)
  );
}