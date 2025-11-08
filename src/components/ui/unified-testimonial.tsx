"use client"

import React from 'react'
import { Testimonial } from '@/types/testimonial'
import { TestimonialCarousel } from './testimonial-carousel'
import { TestimonialCard } from './testimonial-card'
import { Section } from './section'
import { TestimonialSkeleton } from './skeletons'

interface UnifiedTestimonialProps {
  testimonials: Testimonial[]
  title?: string
  description?: string
  layout?: 'grid' | 'carousel'
  maxCount?: number
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
}

export function UnifiedTestimonial({
  testimonials,
  title = 'What Our Clients Say',
  description,
  layout = 'grid',
  maxCount = 6,
  spacing = 'md',
  isLoading = false
}: UnifiedTestimonialProps) {
  // Limit the number of testimonials displayed if needed
  const displayedTestimonials = maxCount ? testimonials.slice(0, maxCount) : testimonials

  // Show skeleton loading state
  if (isLoading) {
    return (
      <Section
        title={title}
        {...(description && { description })}
        centered
        spacing={spacing}
      >
        <div className={layout === 'carousel' ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'}>
          {Array.from({ length: maxCount || 3 }).map((_, i) => (
            <TestimonialSkeleton key={i} />
          ))}
        </div>
      </Section>
    )
  }

  if (!displayedTestimonials.length) return null

  // Decide which layout to use: grid or carousel
  return (
    <Section
      title={title}
      {...(description && { description })}
      centered
      spacing={spacing}
    >
      {layout === 'carousel' ? (
        <TestimonialCarousel testimonials={displayedTestimonials} />
      ) : (
        <TestimonialGrid testimonials={displayedTestimonials} />
      )}
    </Section>
  )
}

function TestimonialGrid({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null

  // If there's only one testimonial, display it centered
  if (testimonials.length === 1) {
    return (
      <div className="mx-auto max-w-md">
        <TestimonialCard testimonial={testimonials[0]!} />
      </div>
    )
  }

  // For multiple testimonials, display in a responsive grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard 
          key={testimonial.id || index} 
          testimonial={testimonial} 
        />
      ))}
    </div>
  )
}