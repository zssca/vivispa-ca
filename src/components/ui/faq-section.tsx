'use client';

import { FAQ } from '@/types/faq'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import React from 'react'
import { FAQSkeleton } from './skeletons'

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
  description?: string
  className?: string
  isLoading?: boolean
}

export function FAQSection({ 
  faqs, 
  title = "Frequently Asked Questions",
  description,
  className,
  isLoading = false
}: FAQSectionProps) {
  
  // Show skeleton loading state
  if (isLoading) {
    return (
      <div className={cn("w-full", className)}>
        {(title || description) && (
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            {title && (
              <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl mb-3">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-muted-foreground text-base leading-relaxed sm:text-lg max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        <FAQSkeleton />
      </div>
    )
  }
  
  if (!faqs.length) return null
  
  // Split the faqs into two equal(ish) columns
  const midpoint = Math.ceil(faqs.length / 2);
  const firstColumn = faqs.slice(0, midpoint);
  const secondColumn = faqs.slice(midpoint);
  
  return (
    <div className={cn("w-full", className)}>
      {(title || description) && (
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          {title && (
            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl mb-3">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground text-base leading-relaxed sm:text-lg max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* First column */}
        <div>
          <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
            {firstColumn.map((faq, index) => (
              <AccordionItem 
                key={index}
                value={`faq-${index}`}
                className="border border-border rounded-md overflow-hidden"
              >
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* Second column */}
        <div>
          <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
            {secondColumn.map((faq, index) => (
              <AccordionItem 
                key={index + midpoint}
                value={`faq-${index + midpoint}`}
                className="border border-border rounded-md overflow-hidden"
              >
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}