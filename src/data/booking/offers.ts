import { ServiceItem, LocationOffers } from '@/types/data';

// ===============================================
// CONSTANTS
// ===============================================

// Standard locations list - used in offers-grid.tsx
export const AVAILABLE_LOCATIONS = ["Downtown", "Edmonton Trail"];

// Default fallback image if none is provided for an offer
export const DEFAULT_IMAGE = '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-001.webp';

// ===============================================
// IMAGE PATHS
// ===============================================
const SERVICE_IMAGES = {
  // Hydroderma Facial services
  HYDRODERMA_FACIAL_EXPRESS: '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-003.webp',
  HYDRODERMA_FACIAL_DELUXE: '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-002.webp',
  HYDRODERMA_FACIAL_ANTI_AGING: '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-001.webp',
  HYDRODERMA_FACIAL_ANTI_ACNE: '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-004.webp',

  // IPL Photofacial services
  IPL_PHOTOFACIAL_FACE: '/assets/services/ipl-photofacial/ipl-photofacial-in-calgary-001.webp',

  // Head spa services
  HEAD_SPA_RELAX: '/assets/services/japanese-head-spa/japanese-head-spa-in-calgary-001.webp',
  HEAD_SPA_BOGO: '/assets/services/japanese-head-spa/japanese-head-spa-in-calgary-002.webp',
};

// ===============================================
// BADGE TYPES
// ===============================================
export const BADGES = {
  // Sale Types
  NEW_CLIENT: "New Client Special",
  FLASH_SALE: "Flash Sale",
  WEEKEND_DEAL: "Weekend Deal",
  LIMITED_TIME: "Limited Time",
  
  // Seasonal
  SPRING_SPECIAL: "Spring Special",
  SUMMER_SPECIAL: "Summer Special",
  FALL_SPECIAL: "Fall Special",
  WINTER_SPECIAL: "Winter Special",
  
  // Holiday
  MOTHERS_DAY: "Mother's Day Special",
  FATHERS_DAY: "Father's Day Special",
  VALENTINES: "Valentine's Special",
  BLACK_FRIDAY: "Black Friday",
  CHRISTMAS: "Christmas Special",
  NEW_YEAR: "New Year Special",
  
  // Events
  STAMPEDE: "Stampede Special",
  GRAND_OPENING: "Grand Opening",
  ANNIVERSARY: "Anniversary Special",
  
  // Value Propositions
  BEST_SELLER: "Best Seller",
  STAFF_PICK: "Staff Pick",
  CUSTOMER_FAVORITE: "Customer Favorite"
};

// ===============================================
// LOCATION IDs
// ===============================================
export const locationIds = {
  "Downtown": "LSX0A4Z6HJE2E",
  "Edmonton Trail": "LR77SHRSPMK0X"
};

// ===============================================
// STANDARD LOCATION OFFERS
// ===============================================

/**
 * Downtown location offers - add general services available at Downtown location
 */
export const downtownGeneralOffers: ServiceItem[] = [
  { 
    name: "Hydroderma Facial - Express", 
    url: "https://squareup.com/appointments/book/LSX0A4Z6HJE2E/services?service_id=GQGICNA2YM2Z7IWU3NKBHNUB&direct=true", 
    price: "$49.00", 
    oldPrice: "$185.00",
    imagePath: SERVICE_IMAGES.HYDRODERMA_FACIAL_EXPRESS,
    badges: [BADGES.NEW_CLIENT],
    category: "Facial Treatments"
  },
  { 
    name: "Hydroderma Facial - Deluxe", 
    url: "https://squareup.com/appointments/book/LSX0A4Z6HJE2E/services?service_id=NOAGL2PZTYX6A5BIYYCPH3W4&direct=true", 
    price: "$82.00", 
    oldPrice: "$235.00",
    imagePath: SERVICE_IMAGES.HYDRODERMA_FACIAL_DELUXE,
    badges: [BADGES.LIMITED_TIME, BADGES.CUSTOMER_FAVORITE],
    category: "Facial Treatments"
  },
  { 
    name: "Hydroderma Facial - Platinum Anti-Ageing", 
    url: "https://squareup.com/appointments/book/LSX0A4Z6HJE2E/services?service_id=5FUJ7D2JQILUWW464XVJRFT6&direct=true", 
    price: "$99.00", 
    oldPrice: "$319.00",
    imagePath: SERVICE_IMAGES.HYDRODERMA_FACIAL_ANTI_AGING,
    badges: [BADGES.SPRING_SPECIAL, BADGES.STAFF_PICK, BADGES.BEST_SELLER],
    category: "Facial Treatments"
  },
  {
    name: "Hydroderma Facial - Platinum Anti-Acne",
    url: "https://squareup.com/appointments/book/LSX0A4Z6HJE2E/services?service_id=HDTWXOST7HVR3HUWZGOICXHW&direct=true",
    price: "$99.00",
    oldPrice: "$319.00",
    imagePath: SERVICE_IMAGES.HYDRODERMA_FACIAL_ANTI_ACNE,
    badges: [BADGES.STAFF_PICK, BADGES.FLASH_SALE, BADGES.CUSTOMER_FAVORITE],
    category: "Facial Treatments"
  },
  {
    name: "IPL Photofacial - Face",
    url: "https://book.squareup.com/appointments/0lipxbpg6zumdr/location/LSX0A4Z6HJE2E/services/7KIJPR3ZAJFSN2KLDY7HP5RW",
    price: "$99.00",
    oldPrice: "$259.00",
    imagePath: SERVICE_IMAGES.IPL_PHOTOFACIAL_FACE,
    badges: [BADGES.LIMITED_TIME, BADGES.BEST_SELLER],
    category: "Facial Treatments"
  },
];

/**
 * Edmonton Trail location offers - add general services available at Edmonton Trail
 */
export const edmontonTrailOffers: ServiceItem[] = [
  { 
    name: "Hydroderma Facial - Express", 
    url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=GQGICNA2YM2Z7IWU3NKBHNUB&direct=true", 
    price: "$49.00", 
    oldPrice: "$185.00",
    imagePath: SERVICE_IMAGES.HYDRODERMA_FACIAL_EXPRESS,
    badges: [BADGES.NEW_CLIENT],
    category: "Facial Treatments"
  },
  { 
    name: "Hydroderma Facial - Deluxe", 
    url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=NOAGL2PZTYX6A5BIYYCPH3W4&direct=true", 
    price: "$82.00", 
    oldPrice: "$235.00",
    imagePath: SERVICE_IMAGES.HYDRODERMA_FACIAL_DELUXE,
    badges: [BADGES.WEEKEND_DEAL, BADGES.CUSTOMER_FAVORITE],
    category: "Facial Treatments"
  },
  { 
    name: "Hydroderma Facial - Platinum Anti-Ageing", 
    url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=5FUJ7D2JQILUWW464XVJRFT6&direct=true", 
    price: "$99.00", 
    oldPrice: "$319.00",
    imagePath: SERVICE_IMAGES.HYDRODERMA_FACIAL_ANTI_AGING,
    badges: [BADGES.NEW_YEAR, BADGES.BEST_SELLER, BADGES.STAFF_PICK],
    category: "Facial Treatments"
  },
  { 
    name: "Hydroderma Facial - Platinum Anti-Acne", 
    url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=HDTWXOST7HVR3HUWZGOICXHW&direct=true", 
    price: "$99.00", 
    oldPrice: "$319.00",
    imagePath: SERVICE_IMAGES.HYDRODERMA_FACIAL_ANTI_ACNE,
    badges: [BADGES.STAFF_PICK, BADGES.FLASH_SALE, BADGES.LIMITED_TIME],
    category: "Facial Treatments"
  },
  { 
    name: "Relax Head Spa", 
    url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=HY2USLLLQCTBKEBQB4F5Q2AN&direct=true", 
    price: "$69.00", 
    oldPrice: "$119.00",
    imagePath: SERVICE_IMAGES.HEAD_SPA_RELAX,
    badges: [BADGES.CUSTOMER_FAVORITE],
    category: "Head Spa Services"
  },
  { 
    name: "Hydrating Scalp Therapy", 
    url: "https://book.squareup.com/appointments/0lipxbpg6zumdr/location/LR77SHRSPMK0X/services/AUZRTA6C4FNVQRTW6D7BSZKP", 
    price: "$79", 
    oldPrice: "$129",
    imagePath: SERVICE_IMAGES.HEAD_SPA_BOGO,
    badges: [BADGES.FLASH_SALE, BADGES.BEST_SELLER, BADGES.LIMITED_TIME],
    category: "Head Spa Services"
  }
];

// ===============================================
// DATA ORGANIZATION & EXPORTS
// ===============================================

// Combine all offers by location for export
export const allOffers: LocationOffers = {
  Downtown: {
    general: downtownGeneralOffers
  },
  'Edmonton Trail': {
    general: edmontonTrailOffers
  }
};

// Export all offer categories
const offerExports = {
  // Location-specific offers
  downtownGeneralOffers,
  edmontonTrailOffers,
  
  // Badge types
  BADGES,
  
  // Utilities
  locationIds,
  AVAILABLE_LOCATIONS,
  DEFAULT_IMAGE
};

export default offerExports; 
