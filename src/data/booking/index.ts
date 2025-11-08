import * as downtownData from './downtown';
import * as edmontonTrailData from './edmonton-trail';
import { ServiceItem } from '@/types/data';
import { downtownGeneralOffers, edmontonTrailOffers } from './offers';

type LocationWithServices = {
  availableServices?: ExtendedServiceItem[];
  sampleTimeSlots?: { time: string; available: boolean }[];
};

// Export all location booking data
export const bookingLocations = [
  downtownData,
  edmontonTrailData
] as unknown as (typeof downtownData & LocationWithServices)[];

// Export a map for easy lookup
export const bookingLocationsMap = new Map<string, typeof downtownData & LocationWithServices>([
  ['downtown', downtownData as typeof downtownData & LocationWithServices],
  ['edmonton-trail', edmontonTrailData as unknown as typeof downtownData & LocationWithServices]
]);

// Helper function to get booking location by ID
export function getBookingLocationById(id: string) {
  return bookingLocationsMap.get(id);
}

// Helper function to get all available services
export function getAllBookingServices() {
  // Combine services from all locations and deduplicate
  const allServices = bookingLocations.flatMap(location => 
    location.availableServices || []
  );
  
  // Deduplicate by service ID
  const uniqueServices = Array.from(
    new Map(allServices.map(service => [service.id || service.name, service])).values()
  );
  
  return uniqueServices;
}

// Helper function to get all available time slots
export function getAvailableTimeSlots(locationId: string) {
  const location = getBookingLocationById(locationId);
  if (!location) return [];
  
  // In a real app, this would query an API or database
  // For the static version, return sample time slots
  return location.sampleTimeSlots || [];
}

// Selectively re-export from downtown to avoid naming conflicts
export {
  categories as downtownCategories,
  hydrodermaFacialServices as downtownHydrodermaFacialServices,
  lashServices as downtownLashServices,
  skinTagRemovalServices as downtownSkinTagRemovalServices,
  iplServices,
  pigmentationRemovalServices,
  skinTighteningServices,
  skinMicroneedlingServices,
  laserVeinRemovalServices,
  laserHairRemovalServices
} from './downtown';

// Re-export offers for backward compatibility
export const downtownSpecialOffers = downtownGeneralOffers;
export const edmontonTrailSpecialOffers = edmontonTrailOffers;

// Selectively re-export from edmonton-trail to avoid naming conflicts
export {
  categories as edmontonTrailCategories,
  hydrodermaFacialServices as edmontonTrailHydrodermaFacialServices,
  lashServices as edmontonTrailLashServices,
  skinTagRemovalServices as edmontonTrailSkinTagRemovalServices,
  headSpaServices,
  edmontonTrailServices
} from './edmonton-trail';

// Ensure consistent export of ExtendedServiceItem
export interface ExtendedServiceItem extends ServiceItem {
  id?: string;
  location?: string;
  availableLocations?: string[];
  locationUrls?: Record<string, string>;
} 