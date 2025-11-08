import { Testimonial } from '@/types/testimonial'
import { TestimonialCard } from '@/components/ui/testimonial-card'
import { cn } from '@/lib/utils'
import React from 'react'
import { Container } from './container'

interface TestimonialSectionProps {
  testimonials: Testimonial[]
  title?: string
  description?: string
  className?: string
}

export function TestimonialSection({ 
  testimonials, 
  title = "What Our Clients Say",
  description,
  className
}: TestimonialSectionProps) {
  if (!testimonials.length) {
    return null
  }
  
  return (
    <section className={cn("py-8 sm:py-12 lg:py-16 w-full", className)}>
      <Container>
        {(title || description) && (
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            {title && <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight sm:text-4xl mb-2 sm:mb-3">{title}</h2>}
            {description && <p className="text-base text-muted-foreground leading-relaxed sm:text-lg max-w-3xl mx-auto">{description}</p>}
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id || index} className="h-full">
              <TestimonialCard 
                testimonial={testimonial} 
                showImage={true}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
} 