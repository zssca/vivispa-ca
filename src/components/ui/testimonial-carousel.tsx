"use client"

import React from 'react'
import { Testimonial } from '@/types/testimonial'
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel'
import { TestimonialCard } from '@/components/ui/testimonial-card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  title?: string
  description?: string
}

export function TestimonialCarousel({ 
  testimonials,
  title,
  description 
}: TestimonialCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  
  // Handle button clicks
  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])
  
  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])
  
  // Check if there are testimonials
  if (!testimonials?.length) {
    return null
  }

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {(title || description) && (
        <div className="text-center mb-3 sm:mb-5 lg:mb-6">
          {title && <h2 className="scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight sm:text-4xl mb-2 sm:mb-3">{title}</h2>}
          {description && <p className="text-sm sm:text-base text-muted-foreground leading-relaxed sm:text-lg max-w-3xl mx-auto">{description}</p>}
        </div>
      )}
      
      <div className="relative px-0 sm:px-1">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="px-1">
            {testimonials.map((testimonial, index) => (
              <CarouselItem 
                key={testimonial.id || index} 
                className="pl-1 sm:pl-2 xs:basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <TestimonialCard testimonial={testimonial} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        <div className="flex justify-end gap-2 mt-3 sm:mt-4 lg:mt-6 pr-1 sm:pr-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-primary/20 text-primary hover:bg-primary/10"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-primary/20 text-primary hover:bg-primary/10"
            onClick={scrollNext}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>
    </div>
  )
} 