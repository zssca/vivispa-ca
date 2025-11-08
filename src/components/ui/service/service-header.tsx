"use client"

import { Service } from '@/types/service'
import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-react'
import { locations } from '@/data/locations'

interface ServiceHeaderProps {
  service: Service
}

export function ServiceHeader({ service }: ServiceHeaderProps) {
  // Get locations where this service is available
  const availableLocations = locations.filter(location => 
    service.availableLocations?.includes(location.id)
  );

  return (
    <div className="mb-8 md:mb-10">
      <h1 className="scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 md:mb-6 text-primary">
        {service.title}
      </h1>
      
      {service.previewDescription && (
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 md:mb-6">
          {service.previewDescription}
        </p>
      )}
      
      {/* Category tags and location badges */}
      <div className="flex flex-wrap gap-3 md:gap-4 mb-4 md:mb-6 items-center">
        {service.category && (
          <Badge variant="secondary" className="mr-2">
            {service.category}
          </Badge>
        )}
        
        {/* Location availability badges */}
        {availableLocations.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground font-medium flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              Available at:
            </span>
            {availableLocations.map(location => (
              <Badge key={location.id} variant="outline" className="border border-border/60">
                {location.name} Location
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}