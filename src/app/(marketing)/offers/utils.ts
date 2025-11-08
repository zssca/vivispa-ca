import { locationIds } from '@/data/booking/offers';
import { ServiceItem } from '@/types/data';
import { BadgeVariant } from '@/components/ui/badge';

// Extended ServiceItem with location data
export interface ExtendedServiceItem extends ServiceItem {
  location?: string;
  availableLocations?: string[];
  locationUrls?: Record<string, string>;
  category?: string; // Make category optional
}

// Helper function to check if a service is available at a given location
export function isServiceAvailableAtLocation(
  offer: ExtendedServiceItem,
  targetLocation: string | null | undefined
): boolean {
  if (!targetLocation || targetLocation === "All Locations") {
    return true;
  }
  
  // Check if this location is in the available locations list
  if (offer.availableLocations && Array.isArray(offer.availableLocations)) {
    return offer.availableLocations.includes(targetLocation);
  }
  
  // Fallback to the original location
  return offer.location === targetLocation;
}

// Helper function to get an updated booking URL for an offer at a specific location
export function getBookingUrlForLocation(
  offer: ExtendedServiceItem,
  targetLocation: string | null | undefined
): string {
  // If no target location specified, use original URL
  if (!targetLocation) {
    return offer.url;
  }
  
  // If we have location-specific URLs, use those directly
  if (offer.locationUrls && offer.locationUrls[targetLocation]) {
    return offer.locationUrls[targetLocation];
  }
  
  // Fallback to the original URL with location ID replacement
  if (offer.url.includes(locationIds["Downtown"]) || offer.url.includes(locationIds["Edmonton Trail"])) {
    // Replace location ID in URL to match selected location
    const targetLocationId = locationIds[targetLocation as keyof typeof locationIds];
    
    // Extract service_id from original URL
    const serviceIdMatch = offer.url.match(/service_id=([^&]+)/);
    const serviceId = serviceIdMatch ? serviceIdMatch[1] : null;
    
    if (targetLocationId && serviceId) {
      return `https://squareup.com/appointments/book/${targetLocationId}/services?service_id=${serviceId}&direct=true`;
    }
  }
  
  return offer.url;
}

// Sort function for offers
export function sortOffers(offers: ExtendedServiceItem[], option: string): ExtendedServiceItem[] {
  return [...offers].sort((a, b) => {
    if (option === "price-low") {
      return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
    } 
    else if (option === "price-high") {
      return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
    }
    else if (option === "discount") {
      // Calculate discount percentages
      const aDiscountPercent = a.oldPrice 
        ? (parseFloat(a.oldPrice.replace('$', '')) - parseFloat(a.price.replace('$', ''))) / parseFloat(a.oldPrice.replace('$', '')) * 100
        : 0;
      const bDiscountPercent = b.oldPrice 
        ? (parseFloat(b.oldPrice.replace('$', '')) - parseFloat(b.price.replace('$', ''))) / parseFloat(b.price.replace('$', '')) * 100
        : 0;
        
      return bDiscountPercent - aDiscountPercent; // Highest discount first
    }
    else if (option === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });
}

// Calculate discount percentage
export function calculateDiscountPercentage(price: string, oldPrice: string): number {
  if (!oldPrice) return 0;
  
  const currentPrice = parseFloat(price.replace('$', ''));
  const originalPrice = parseFloat(oldPrice.replace('$', ''));
  
  return Math.round((originalPrice - currentPrice) / originalPrice * 100);
}

// Calculate savings amount
export function calculateSavingsAmount(price: string, oldPrice: string): string | null {
  if (!oldPrice) return null;
  
  const currentPrice = parseFloat(price.replace('$', ''));
  const originalPrice = parseFloat(oldPrice.replace('$', ''));
  
  return (originalPrice - currentPrice).toFixed(2);
}

// Get default badge text
export function getDefaultBadgeText(offer: ExtendedServiceItem): string {
  return offer.badge || (offer.badges && offer.badges[0]) || "Limited Time Offer";
}

// Apply badge conversion to offers (keeping only manual badges)
export function enhanceOffersWithDynamicBadges(offers: ExtendedServiceItem[]): ExtendedServiceItem[] {
  return offers.map(offer => {
    // Use only manually set badges - no dynamic generation
    
    // If offer already has badges array, keep it as is
    if (offer.badges && Array.isArray(offer.badges)) {
      return offer;
    }
    
    // If offer has single badge, convert to badges array
    if (offer.badge) {
      return {
        ...offer,
        badges: [offer.badge]
      };
    }
    
    // If no badges set, return as is without adding any
    return offer;
  });
}

// Get badge variant based on badge text
export function getBadgeVariant(badgeText: string): BadgeVariant {
  // Canadian holidays and events
  if (badgeText.toLowerCase().includes("canada day")) {
    return "canada";
  }
  
  if (badgeText.toLowerCase().includes("calgary stampede")) {
    return "calgary"; 
  }
  
  if (badgeText.toLowerCase().includes("stampede")) {
    return "seasonal"; 
  }
  
  if (badgeText.toLowerCase().includes("thanksgiving")) {
    return "thanksgiving";
  }
  
  if (badgeText.toLowerCase().includes("remembrance")) {
    return "canada";
  }
  
  if (badgeText.toLowerCase().includes("festival") || 
      badgeText.toLowerCase().includes("globalfest") ||
      badgeText.toLowerCase().includes("lilac") ||
      badgeText.toLowerCase().includes("folk")) {
    return "festival";
  }
  
  // Existing badge variants
  if (badgeText.toLowerCase().includes("new client")) {
    return "newClient";
  }
  
  if (badgeText.toLowerCase().includes("flash") || 
      badgeText.toLowerCase().includes("limited")) {
    return "flashSale";
  }
  
  if (badgeText.toLowerCase().includes("summer") || 
      badgeText.toLowerCase().includes("spring") ||
      badgeText.toLowerCase().includes("winter") ||
      badgeText.toLowerCase().includes("fall")) {
    return "seasonal";
  }

  if (badgeText.toLowerCase().includes("weekend")) {
    return "secondary";
  }
  
  if (badgeText.toLowerCase().includes("christmas") ||
      badgeText.toLowerCase().includes("valentine") ||
      badgeText.toLowerCase().includes("mother") ||
      badgeText.toLowerCase().includes("father") ||
      badgeText.toLowerCase().includes("holiday") ||
      badgeText.toLowerCase().includes("halloween") ||
      badgeText.toLowerCase().includes("patrick")) {
    return "holiday";
  }
  
  if (badgeText.toLowerCase().includes("best") || 
      badgeText.toLowerCase().includes("favorite") ||
      badgeText.toLowerCase().includes("premium")) {
    return "bestSeller";
  }
  
  if (badgeText.toLowerCase().includes("pick") ||
      badgeText.toLowerCase().includes("quick")) {
    return "primary";
  }
  
  if (badgeText.toLowerCase().includes("anniversary") || 
      badgeText.toLowerCase().includes("opening")) {
    return "anniversary";
  }
  
  return "default";
} 