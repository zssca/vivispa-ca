'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Service } from '@/types/service';
import { ServicePreview } from '@/components/ui/service-preview';
import { cn } from '@/lib/utils';

interface FeaturedServicesCarouselProps {
  services: Service[];
  className?: string;
}

export function FeaturedServicesCarousel({ services, className }: FeaturedServicesCarouselProps) {
  return (
    <Carousel className={cn("w-full", className)}>
        <div className="relative">
          <CarouselContent className="-ml-4">
            {services.map((service, index) => (
              <CarouselItem key={service.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="h-full">
                  <ServicePreview service={service} index={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-12 top-1/2" />
            <CarouselNext className="absolute -right-12 top-1/2" />
          </div>
        </div>
      </Carousel>
  );
} 