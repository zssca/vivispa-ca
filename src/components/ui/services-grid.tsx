import React from 'react';
import { Service } from '@/types/service';
import { cn } from '@/lib/utils';
import { ServicePreview } from '@/components/ui/service-preview';
import { ServicePreviewSkeleton } from './skeletons';

interface ServicesGridProps {
  services: Service[];
  className?: string;
  emptyMessage?: string;
  isLoading?: boolean;
  skeletonCount?: number;
}

export function ServicesGrid({ 
  services, 
  className, 
  emptyMessage = "No services found",
  isLoading = false,
  skeletonCount = 6
}: ServicesGridProps) {
  
  // Show skeleton loading state
  if (isLoading) {
    return (
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
          className
        )}
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ServicePreviewSkeleton key={index} />
        ))}
      </div>
    );
  }
  
  if (services.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground leading-7">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
        className
      )}
    >
      {services.map((service, index) => (
        <ServicePreview key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}