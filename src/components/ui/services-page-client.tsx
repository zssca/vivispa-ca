'use client';

import React from 'react';
import { Section } from '@/components/ui/section';
import { ServicesGrid } from '@/components/ui/services-grid';
import { ServiceCategoryFilter } from '@/components/ui/service-category-filter';
import { FAQSection } from '@/components/ui/faq-section';
import { ConsultationCTA } from '@/components/ui/consultation-cta';
import { Separator } from '@/components/ui/separator';
import { Service } from '@/types/service';
import { FAQ } from '@/types/faq';
import { ServiceCategoryPreview } from '@/components/ui/service-category-preview';

interface ServiceCategory {
  id: string;
  name: string;
  services: Service[];
}

interface ServicesPageClientProps {
  filteredServices: Service[];
  categories: ServiceCategory[];
  treatmentFaqs: FAQ[];
}

export function ServicesPageClient({ filteredServices, categories, treatmentFaqs }: ServicesPageClientProps) {
  const selectedCategory = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('category') 
    : null;

  // Find the current category object
  const currentCategory = selectedCategory 
    ? categories.find(cat => cat.id === selectedCategory) 
    : null;

  return (
    <div className="flex flex-col">
      <Section 
        title="Our Services"
        description="Discover our comprehensive range of premium treatments designed to enhance your natural beauty."
        centered
        spacing="md"
      >
        <ServiceCategoryFilter categories={categories} />
          
          <Separator className="mb-8 bg-primary/10" />
          
          {selectedCategory ? (
            <div key="category-view">
              {currentCategory && (
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-primary mb-3">{currentCategory.name}</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Browse our selection of {currentCategory.name.toLowerCase()} treatments
                  </p>
                </div>
              )}
              <ServicesGrid 
                services={filteredServices} 
                emptyMessage="No services found in this category. Please try another category."
              />
            </div>
          ) : (
            <div key="all-categories" className="space-y-20">
              {categories.map((category, index) => (
                <ServiceCategoryPreview 
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  services={category.services}
                />
              ))}
            </div>
          )}
      </Section>
      
      {/* FAQs Section */}
      <Section 
        backgroundClass="bg-muted/30"
        spacing="md"
      >
        <FAQSection 
          faqs={treatmentFaqs} 
          title="General Treatment Questions"
          description="Get answers to commonly asked questions about our treatment processes and procedures."
        />
      </Section>
      
      {/* Consultation CTA */}
      <Section 
        spacing="md"
      >
        <ConsultationCTA />
      </Section>
    </div>
  );
} 