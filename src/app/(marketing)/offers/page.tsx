"use client"

import { Suspense, useEffect } from 'react';
import { useState } from 'react';
import { Section } from "@/components/ui/section";
import { downtownGeneralOffers, edmontonTrailOffers } from '@/data/booking/offers';
import { LocationSelector } from './location-selector';
import { OffersGridSkeleton } from './offers-skeleton';
import { ExtendedServiceItem, sortOffers, enhanceOffersWithDynamicBadges } from './utils';
import { TagIcon } from "lucide-react";

/**
 * Offers page component displaying all limited-time offers and promotions
 */
export default function OffersPage() {
  const [offers, setOffers] = useState<ExtendedServiceItem[]>([]);

  useEffect(() => {
    fetchOffers().then((fetchedOffers: ExtendedServiceItem[]) => {
      setOffers(fetchedOffers);
    });
  }, []);

  return (
    <>
      <Section>
        <div className="space-y-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <TagIcon size={16} />
              <span>Exclusive Deals</span>
            </div>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
              Special Offers & Promotions
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Take advantage of our exclusive special offers and save on premium aesthetic services. 
              Browse by location and easily compare prices.
            </p>
          </div>
          
          <Suspense fallback={<OffersGridSkeleton />}>
            <OffersWrapper initialOffers={offers} />
          </Suspense>
        </div>
      </Section>
    </>
  );
}

// Refactor OffersWrapper to remove async and handle data fetching separately
function OffersWrapper({ initialOffers }: { initialOffers: ExtendedServiceItem[] }) {
  return <LocationSelector initialOffers={initialOffers} />;
}

// Move data fetching logic to a separate function
async function fetchOffers() {
  const rawOffers = [
    ...downtownGeneralOffers.map(offer => ({ ...offer, location: 'Downtown' })),
    ...edmontonTrailOffers.map(offer => ({ ...offer, location: 'Edmonton Trail' }))
  ];

  // Step 2: Create a map to track duplicates and consolidate locations
  const offerMap = new Map();

  rawOffers.forEach(offer => {
    const key = offer.name;

    if (offerMap.has(key)) {
      // This is a duplicate offer, merge the location information
      const existingOffer = offerMap.get(key);

      // Create an array of locations where this service is available
      const locations = Array.isArray(existingOffer.availableLocations) 
        ? [...existingOffer.availableLocations]
        : [existingOffer.location];

      if (!locations.includes(offer.location)) {
        locations.push(offer.location);
      }

      // Store both location-specific URLs
      const locationUrls = {
        ...(existingOffer.locationUrls || { [existingOffer.location]: existingOffer.url }),
        [offer.location]: offer.url
      };

      // Update the offer with consolidated location information
      offerMap.set(key, {
        ...existingOffer,
        availableLocations: locations,
        locationUrls,
      });
    } else {
      // First time seeing this offer
      offerMap.set(key, {
        ...offer,
        availableLocations: [offer.location],
        locationUrls: { [offer.location]: offer.url }
      });
    }
  });

  // Step 3: Convert map back to array
  let deduplicatedOffers = Array.from(offerMap.values());
  
  // Step 4: Apply badge conversion (keeping only manual badges)
  deduplicatedOffers = enhanceOffersWithDynamicBadges(deduplicatedOffers);

  // Step 5: Sort offers by discount percentage (highest first)
  return sortOffers(deduplicatedOffers, "discount");
} 
