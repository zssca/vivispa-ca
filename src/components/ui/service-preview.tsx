'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Service } from '@/types/service';
import { Badge } from '@/components/ui/badge';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { locations } from '@/data/locations';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ServicePreviewProps {
  service: Service;
  variant?: 'default' | 'compact';
  className?: string;
  index?: number;
}

export function ServicePreview({ service, variant = 'default', className, index = 0 }: ServicePreviewProps) {
  const isCompact = variant === 'compact';
  
  // Get locations where this service is available
  const availableLocations = locations.filter(location => 
    service.availableLocations?.includes(location.id)
  );
  
  return (
    <Card 
      className={cn(
        "group h-full overflow-hidden border border-border/50",
        className
      )}
    >
        {service.image && (
          <div className="overflow-hidden">
            <div className="relative aspect-[3/2] w-full">
              <Image 
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-all duration-500 brightness-[0.98] group-hover:brightness-100"
              />
              {service.price && (
                <Badge variant="secondary" className="absolute top-3 right-3 font-medium z-10">
                  {typeof service.price === 'number' ? `$${service.price}` : service.price}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <CardHeader className={cn(isCompact ? "p-4" : "p-6 pb-2")}>
          <CardTitle className={cn("font-semibold tracking-tight", isCompact ? "text-lg" : "text-xl")}>
            {service.title}
          </CardTitle>
          
          {/* Location badges - always show this section */}
          <div className="flex flex-wrap gap-2 mt-2 items-center">
            <span className="text-xs text-muted-foreground font-medium">
              Available at:
            </span>
            
            {availableLocations.length > 0 ? (
              // Show specific location badges when we have them
              availableLocations.map((location) => (
                <Badge 
                  key={location.id} 
                  variant="outline" 
                  className="text-xs border border-border/60"
                >
                  {location.name}
                </Badge>
              ))
            ) : (
              // Fallback for services without explicitly defined locations
              <Badge 
                variant="outline" 
                className="text-xs border border-border/60"
              >
                All locations
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className={cn(isCompact ? "p-4 pt-0" : "p-6 pt-2 pb-2")}>
          <p className={cn(
            "text-muted-foreground mb-4", 
            isCompact ? "line-clamp-2 text-sm leading-normal" : "line-clamp-3 leading-relaxed"
          )}>
            {service.previewDescription}
          </p>
          
          {service.benefits && service.benefits.length > 0 && !isCompact && (
            <div className="flex flex-wrap gap-2 mb-4">
              {service.benefits.slice(0, 3).map((benefit, idx) => (
                <Badge key={idx} variant="outline" className="text-xs font-normal border border-border/60">
                  {benefit}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        
        <CardFooter className={cn(isCompact ? "p-4 pt-0" : "p-6 pt-2")}>
          <Button 
            asChild 
            variant={isCompact ? "ghost" : "default"} 
            size={isCompact ? "sm" : "default"}
            className="group/button transition-all duration-300 rounded-full"
          >
            <Link href={`/services/${service.slug}`} className="flex items-center gap-1">
              Learn More
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
    </Card>
  );
} 