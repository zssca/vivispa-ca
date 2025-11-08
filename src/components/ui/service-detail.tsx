"use client"

import { Service } from '@/types/service'
import { FAQSection } from '@/components/ui/faq-section'
import { UnifiedTestimonial } from '@/components/ui/unified-testimonial'
import { Section } from '@/components/ui/section'
import { Separator } from '@/components/ui/separator'
import { ServiceHeader, ServiceGallery, ServiceInfo, ServiceBooking } from '@/components/ui/service'
import { getServiceTestimonials, getServiceFAQs } from '@/lib/utils/data-access'

interface ServiceDetailProps {
  service: Service & {
    benefits?: string[];
    procedure?: string;
    scientificInfo?: string;
    historyAndDevelopment?: string;
    galleryImages?: string[];
  }
}

export function ServiceDetail({ service }: ServiceDetailProps) {
  // Get testimonials and FAQs using the new utility functions
  const serviceTestimonials = getServiceTestimonials(service.slug);
  const serviceFaqs = getServiceFAQs(service.slug);
  
  return (
    <div className="flex flex-col space-y-0">
      {/* Service Header */}
      <Section className="pb-0">
        <ServiceHeader service={service} />
      </Section>

      {/* Service Gallery */}
      <Section className="py-8 md:py-10">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-6">
            Gallery
          </h2>
          <ServiceGallery service={service} />
        </div>
      </Section>

      {/* Main Content Grid */}
      <Section className="py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Service Information - Main Content */}
          <div className="lg:col-span-2">
            <ServiceInfo service={service} />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <ServiceBooking service={service} />
          </div>
        </div>
      </Section>
      
      {/* Testimonials Section */}
      {serviceTestimonials.length > 0 && (
        <Section className="py-8 md:py-10 bg-muted/30">
          <div className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-6">
              What Our Clients Say
            </h2>
            <UnifiedTestimonial 
              testimonials={serviceTestimonials}
              layout="carousel"
              maxCount={6}
              spacing="lg"
            />
          </div>
        </Section>
      )}

      {/* FAQs Section */}
      {serviceFaqs.length > 0 && (
        <Section className="py-8 md:py-10">
          <div className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-6">
              Frequently Asked Questions
            </h2>
            <FAQSection faqs={serviceFaqs} />
          </div>
        </Section>
      )}
    </div>
  );
}