'use client'

import { Testimonial } from '@/types/testimonial'
import { CardContent } from '@/components/ui/card'
import { CheckCircle, Quote, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Card } from '@/components/ui/card'

interface TestimonialCardProps {
  testimonial: Testimonial
  showImage?: boolean
  index?: number
}

export function TestimonialCard({ testimonial, showImage = true, index = 0 }: TestimonialCardProps) {
  return (
    <Card className="h-full w-full flex flex-col">
      <CardContent className="flex flex-col gap-3 sm:gap-4 flex-grow p-3 sm:p-4 md:p-5">
        <Quote className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-primary opacity-70" />
        
        <p className="text-sm md:text-base italic leading-relaxed mt-1 sm:mt-2">{testimonial.quote}</p>
        
        <div className="flex items-start gap-2 sm:gap-3 mt-auto pt-3 sm:pt-4">
          {showImage && testimonial.imageUrl && (
            <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full overflow-hidden flex-shrink-0">
              <Image 
                src={testimonial.imageUrl} 
                alt={testimonial.name} 
                width={56} 
                height={56}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold text-sm md:text-base">{testimonial.name}</p>
            {testimonial.location && (
              <p className="text-xs md:text-sm text-muted-foreground">{testimonial.location}</p>
            )}
            {testimonial.service && (
              <p className="text-xs md:text-sm text-primary">{testimonial.service}</p>
            )}
            
            {testimonial.rating && (
              <div className="flex mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "h-3 w-3 md:h-3.5 md:w-3.5", 
                      i < testimonial.rating ? "text-primary fill-primary" : "text-muted"
                    )} 
                  />
                ))}
              </div>
            )}
            
            {testimonial.isVerified && (
              <div className="flex items-center text-xxs md:text-xs text-muted-foreground mt-1">
                <CheckCircle className="mr-1 h-2.5 w-2.5 md:h-3 md:w-3 text-primary" />
                Verified Client
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 