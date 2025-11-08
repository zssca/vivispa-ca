"use client"

import Image from 'next/image';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Sparkles, 
  Clock, 
  Award, 
  Calendar,
  Star,
  User,
  Gift,
  PartyPopper
} from 'lucide-react';
import { 
  ExtendedServiceItem, 
  getBookingUrlForLocation, 
  calculateDiscountPercentage, 
  calculateSavingsAmount,
  getBadgeVariant
} from './utils';
import { AVAILABLE_LOCATIONS, DEFAULT_IMAGE } from '@/data/booking/offers';

interface OffersGridProps {
  offers: ExtendedServiceItem[];
}

/**
 * Grid layout for displaying offer cards
 */
export function OffersGrid({ offers }: OffersGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {offers.map((offer, index) => (
        <div key={`${offer.name}-${index}`}>
          <OfferCard offer={offer} index={index} />
        </div>
      ))}
    </div>
  );
}

interface OfferCardProps {
  offer: ExtendedServiceItem;
  index: number;
}

/**
 * Get appropriate icon based on badge text
 */
function getBadgeIcon(badgeText: string) {
  if (badgeText.toLowerCase().includes("new")) {
    return <Sparkles size={12} className="mr-0.5" />;
  }
  
  if (badgeText.toLowerCase().includes("flash") || 
      badgeText.toLowerCase().includes("limited")) {
    return <Clock size={12} className="mr-0.5" />;
  }

  if (badgeText.toLowerCase().includes("stampede")) {
    return <PartyPopper size={12} className="mr-0.5" />;
  }
  
  if (badgeText.toLowerCase().includes("summer") || 
      badgeText.toLowerCase().includes("spring") ||
      badgeText.toLowerCase().includes("winter") ||
      badgeText.toLowerCase().includes("fall")) {
    return <Calendar size={12} className="mr-0.5" />;
  }

  if (badgeText.toLowerCase().includes("weekend") ||
      badgeText.toLowerCase().includes("holiday") ||
      badgeText.toLowerCase().includes("christmas") ||
      badgeText.toLowerCase().includes("valentine") ||
      badgeText.toLowerCase().includes("mother") ||
      badgeText.toLowerCase().includes("father")) {
    return <Gift size={12} className="mr-0.5" />;
  }
  
  if (badgeText.toLowerCase().includes("best") || 
      badgeText.toLowerCase().includes("favorite")) {
    return <Star size={12} className="mr-0.5" />;
  }

  if (badgeText.toLowerCase().includes("pick")) {
    return <User size={12} className="mr-0.5" />;
  }
  
  if (badgeText.toLowerCase().includes("anniversary") || 
      badgeText.toLowerCase().includes("opening")) {
    return <Award size={12} className="mr-0.5" />;
  }
  
  return null;
}

/**
 * Card component for displaying a single offer
 */
function OfferCard({ offer, index }: OfferCardProps) {
  // Get available locations for this service
  const availableLocations = offer.availableLocations || [offer.location || "Downtown"];
  
  // Default to the first available location
  const [cardSelectedLocation, setCardSelectedLocation] = useState<string>(availableLocations[0] || 'Downtown');
  
  // Calculate discount percentage if oldPrice exists
  const discountPercent = offer.oldPrice 
    ? calculateDiscountPercentage(offer.price, offer.oldPrice)
    : null;
    
  // Calculate actual savings amount
  const savingsAmount = offer.oldPrice
    ? calculateSavingsAmount(offer.price, offer.oldPrice)
    : null;
  
  // Default fallback image if none is provided
  const imageUrl = offer.imagePath || DEFAULT_IMAGE;
  
  // Get the appropriate booking URL based on the selected location
  const bookingUrl = getBookingUrlForLocation(offer, cardSelectedLocation);
  
  return (
    <Card className="overflow-hidden h-full flex flex-col border-border/40">
      <div className="relative overflow-hidden">
        <AspectRatio ratio={3/2}>
          <Image 
            src={imageUrl}
            alt={offer.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </AspectRatio>
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {discountPercent && (
            <Badge variant="destructive" className="px-3 py-1 text-sm font-semibold">
              {discountPercent}% OFF
            </Badge>
          )}
        </div>
      </div>
      
      <CardHeader className="space-y-2 pb-2">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight line-clamp-2">{offer.name}</h3>
        
        {/* Display multiple badges if available, or fall back to single badge */}
        {offer.badges && offer.badges.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {offer.badges.map((badgeText, i) => {
              const badgeVariant = getBadgeVariant(badgeText);
              const badgeIcon = getBadgeIcon(badgeText);
              return (
                <Badge key={i} variant={badgeVariant}>
                  {badgeIcon}{badgeText}
                </Badge>
              );
            })}
          </div>
        ) : offer.badge ? (
          <Badge variant={getBadgeVariant(offer.badge)}>
            {getBadgeIcon(offer.badge)}{offer.badge}
          </Badge>
        ) : null}
      </CardHeader>
      
      <CardContent className="space-y-4 flex-grow">
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">{offer.price}</span>
            {offer.oldPrice && (
              <span className="text-muted-foreground line-through text-sm">{offer.oldPrice}</span>
            )}
          </div>
          
          {savingsAmount && (
            <div className="text-sm text-green-600 font-medium flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
              Save ${savingsAmount}
            </div>
          )}
        </div>
        
        <div className="space-y-3 pt-2">
          <div className="text-sm font-medium flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Select location:
          </div>
          <RadioGroup 
            value={cardSelectedLocation} 
            onValueChange={setCardSelectedLocation}
            className="grid grid-cols-2 gap-2"
          >
            {AVAILABLE_LOCATIONS.map((location) => {
              const isAvailable = availableLocations.includes(location);
              return (
                <label 
                  key={location} 
                  className={`flex items-center justify-center p-3 border rounded-md transition-colors cursor-pointer ${
                    cardSelectedLocation === location && isAvailable ? 'border-primary bg-primary/5' : 'border-input'
                  } ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <RadioGroupItem 
                    id={`${offer.name}-${location}-${index}`}
                    value={location}
                    disabled={!isAvailable}
                    className="mr-2"
                  />
                  <span
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed ${!isAvailable ? 'line-through' : ''}`}
                  >
                    {location}
                  </span>
                </label>
              );
            })}
          </RadioGroup>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button className="w-full gap-2">
            <span>Book Now</span>
            <span className="font-normal text-xs bg-primary-foreground/90 text-primary px-2 py-0.5 rounded-full">
              {cardSelectedLocation}
            </span>
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
} 