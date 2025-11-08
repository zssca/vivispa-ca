import { Service } from '@/types/service';

// Import all service data
import { hydrodermaFacialService as hydrodermaFacial } from './hydroderma-facial';
import { microneedling } from './microneedling';
import { laserHairRemovalService as laserHairRemoval } from './laser-hair-removal';
import { iplPhotofacial } from './ipl-photofacial';
import { japaneseHeadSpa } from './japanese-head-spa';
import { laserPigmentationRemoval } from './laser-pigmentation-removal';
import { vascularVeinRemoval } from './vascular-vein-removal';
import { laserSkinTightening } from './laser-skin-tightening';
import { skinTagRemoval } from './skin-tag-removal';
import { eyelashExtensions } from './eyelash-extensions';

// Map of all services for easy lookup by ID or slug
export const servicesMap = new Map<string, Service>([
  [hydrodermaFacial.id, hydrodermaFacial],
  [microneedling.id, microneedling],
  [laserHairRemoval.id, laserHairRemoval],
  [iplPhotofacial.id, iplPhotofacial],
  [japaneseHeadSpa.id, japaneseHeadSpa],
  [laserPigmentationRemoval.id, laserPigmentationRemoval],
  [vascularVeinRemoval.id, vascularVeinRemoval],
  [laserSkinTightening.id, laserSkinTightening],
  [skinTagRemoval.id, skinTagRemoval],
  [eyelashExtensions.id, eyelashExtensions],
]);

// Array of all services
export const services: Service[] = Array.from(servicesMap.values());

// Service categories
export const serviceCategories = [
  {
    id: 'facial-treatments',
    name: 'Facial Treatments',
    services: [
      hydrodermaFacial,
      iplPhotofacial,
      microneedling,
    ],
  },
  {
    id: 'laser-treatments',
    name: 'Laser Treatments',
    services: [
      laserHairRemoval,
      laserPigmentationRemoval,
      laserSkinTightening,
      vascularVeinRemoval,
    ],
  },
  {
    id: 'specialty-treatments',
    name: 'Specialty Treatments',
    services: [
      japaneseHeadSpa,
      skinTagRemoval,
      eyelashExtensions,
    ],
  },
];

// Featured services for homepage
export const featuredServices = [
  hydrodermaFacial,
  laserHairRemoval,
  japaneseHeadSpa,
];

// Get a service by ID
export function getServiceById(id: string): Service | undefined {
  return servicesMap.get(id);
}

// Get a service by slug
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

// Get related services
export function getRelatedServices(serviceId: string, limit = 3): Service[] {
  const service = getServiceById(serviceId);
  if (!service) return [];
  
  return (service.relatedServiceIds || [])
    .map(id => getServiceById(id))
    .filter((s): s is Service => s !== undefined)
    .slice(0, limit);
}

// Get all service slugs for static generation
export async function getAllServiceSlugs(): Promise<{ slug: string }[]> {
  return services.map(service => ({
    slug: service.slug
  }));
}

/**
 * Get available locations for a service
 * 
 * @param service - The service or service ID to check
 * @returns Array of location IDs where the service is available
 */
export function getServiceAvailableLocations(service: Service | string): string[] {
  const serviceObj = typeof service === 'string' ? getServiceById(service) : service;
  if (!serviceObj) return [];
  
  return serviceObj.availableLocations || [];
}

/**
 * Check if a service is available at a specific location
 * 
 * @param service - The service or service ID to check
 * @param locationId - The location ID to check
 * @returns boolean indicating if the service is available at the location
 */
export function isServiceAvailableAtLocation(service: Service | string, locationId: string): boolean {
  const availableLocations = getServiceAvailableLocations(service);
  return availableLocations.includes(locationId);
}

// Export individual services for direct imports
export {
  hydrodermaFacial,
  microneedling,
  laserHairRemoval,
  iplPhotofacial,
  japaneseHeadSpa,
  laserPigmentationRemoval,
  vascularVeinRemoval,
  laserSkinTightening,
  skinTagRemoval,
  eyelashExtensions,
}; 