'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  showControls?: boolean;
  autoChangeOnHover?: boolean;
}

export function ProductImageCarousel({
  images,
  productName,
  className,
  aspectRatio = 'square',
  showControls = true,
  autoChangeOnHover = true,
}: ProductImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [api, setApi] = useState<CarouselApi>();

  // Filter out any empty or invalid images and log for debugging
  const validImages = images.filter(img => img && img.trim() !== '');
  
  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('ProductImageCarousel:', { productName, images, validImages });
  }

  // Auto-change images on hover
  useEffect(() => {
    if (!autoChangeOnHover || !isHovered || validImages.length <= 1 || !api) {
      return;
    }
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const nextIndex = (prev + 1) % validImages.length;
        api.scrollTo(nextIndex);
        return nextIndex;
      });
    }, 1500); // Change every 1.5 seconds on hover

    return () => clearInterval(interval);
  }, [isHovered, validImages.length, autoChangeOnHover, api]);

  // Update current index when carousel changes
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrentImageIndex(api.selectedScrollSnap());
    };

    api.on('select', handleSelect);
    return () => {
      api.off('select', handleSelect);
    };
  }, [api]);
  
  // If no valid images, show placeholder
  if (validImages.length === 0) {
    return (
      <div 
        className={cn(
          'relative bg-muted flex items-center justify-center overflow-hidden',
          aspectRatio === 'square' && 'aspect-square',
          aspectRatio === 'video' && 'aspect-video', 
          aspectRatio === 'portrait' && 'aspect-[3/4]',
          className
        )}
      >
        <ShoppingCart className="w-12 h-12 text-muted-foreground" />
      </div>
    );
  }

  // If only one image, show it without carousel
  if (validImages.length === 1) {
    return (
      <div 
        className={cn(
          'relative bg-muted overflow-hidden rounded-lg',
          aspectRatio === 'square' && 'aspect-square',
          aspectRatio === 'video' && 'aspect-video',
          aspectRatio === 'portrait' && 'aspect-[3/4]',
          className
        )}
      >
        <Image
          src={validImages[0]!}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'relative rounded-lg overflow-hidden',
        aspectRatio === 'square' && 'aspect-square',
        aspectRatio === 'video' && 'aspect-video',
        aspectRatio === 'portrait' && 'aspect-[3/4]',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (api) {
          api.scrollTo(0); // Reset to first image when not hovering
          setCurrentImageIndex(0);
        }
      }}
    >
      <Carousel 
        setApi={setApi}
        opts={{
          loop: true,
        }}
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {validImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-full bg-muted overflow-hidden">
                <Image
                  src={image!}
                  alt={`${productName} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0} // Prioritize loading first image
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Show controls only when there are multiple images and showControls is true */}
        {showControls && validImages.length > 1 && (
          <>
            <CarouselPrevious 
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 bg-background/80 hover:bg-background" 
              size="sm"
            />
            <CarouselNext 
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200 bg-background/80 hover:bg-background" 
              size="sm"
            />
          </>
        )}
        
        {/* Image indicators */}
        {validImages.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-80 hover:opacity-100 transition-opacity duration-200">
            {validImages.map((_, index) => (
              <button
                key={index}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors duration-200',
                  index === currentImageIndex ? 'bg-background' : 'bg-background/50'
                )}
                onClick={() => {
                  if (api) {
                    api.scrollTo(index);
                    setCurrentImageIndex(index);
                  }
                }}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  );
}