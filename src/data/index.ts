/**
 * Central export file for all data
 * This makes it easier to import data from multiple files
 */

// Services Data
export * from './services';

// Booking Data - Selective exports to avoid conflicts
// Downtown location
export {
  bookingLocations,
  bookingLocationsMap,
  getBookingLocationById,
  getAllBookingServices,
  getAvailableTimeSlots,
  // Renamed exports from downtown
  downtownCategories,
  downtownHydrodermaFacialServices,
  downtownLashServices,
  downtownSkinTagRemovalServices,
  downtownSpecialOffers,
  // Unique exports from downtown
  iplServices,
  pigmentationRemovalServices,
  skinTighteningServices,
  skinMicroneedlingServices,
  laserVeinRemovalServices,
  laserHairRemovalServices,
  // Renamed exports from edmonton-trail
  edmontonTrailCategories,
  edmontonTrailHydrodermaFacialServices,
  edmontonTrailLashServices,
  edmontonTrailSkinTagRemovalServices,
  edmontonTrailSpecialOffers,
  // Unique exports from edmonton-trail
  headSpaServices,
  edmontonTrailServices
} from './booking/index';

// Business and Site Data
export * from './site';
export * from './testimonials';
export * from './team';
export * from './locations';

/**
 * Image paths for consistency
 */
export const imagePaths = {
  // Service images
  services: '/images/services',
  // Team member images
  team: '/images/team',
  // Location images
  locations: '/images/locations',
  // General site images
  site: {
    logo: '/images/site/logo.png',
    logoInverse: '/images/site/logo-inverse.png',
    favicon: '/favicon.ico',
    ogImage: '/images/site/og-image.jpg',
    heroBackground: '/images/site/hero-background.jpg',
  },
  // Placeholder images
  placeholders: {
    service: '/images/placeholders/service.jpg',
    team: '/images/placeholders/team.jpg',
    location: '/images/placeholders/location.jpg',
  },
}; 