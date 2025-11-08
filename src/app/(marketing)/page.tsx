import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FAQSection } from "@/components/ui/faq-section";
import { HeroSection } from "@/components/ui/hero-section";
import { Service } from '@/types/service';
import { SiteInfo } from '@/types/site';
import { Section } from "@/components/ui/section";
import { ServicePreview } from "@/components/ui/service-preview";
import { ServiceCategoryPreview } from "@/components/ui/service-category-preview";
import { UnifiedTestimonial } from "@/components/ui/unified-testimonial";
import { getFeaturedTestimonials } from "@/data/testimonials";
import { getGeneralFaqs } from "@/data/faqs";
import { getAllServices } from '@/lib/data-loader';
import { featuredServices, serviceCategories } from "@/data/services";

// Business benefits data
const benefits = [
  {
    id: 1,
    title: "Expert Care",
    description: "Our team of licensed professionals is trained in the latest aesthetic techniques and technologies to provide you with safe, effective treatments.",
  },
  {
    id: 2,
    title: "Premium Products",
    description: "We use only the highest quality medical-grade products and state-of-the-art equipment for all our treatments.",
  },
  {
    id: 3,
    title: "Personalized Approach",
    description: "Every treatment plan is customized to your unique needs and goals, ensuring optimal results for your specific concerns.",
  },
];

export default function Home() {
  // Get site data
  const allServices = getAllServices();
  const displayedServices = featuredServices.length > 0 ? featuredServices : allServices.slice(0, 3);
  const siteInfo = {
    title: 'Vivi Aesthetics & Spa',
    description: 'Experience the ultimate in aesthetic treatments and spa services.'
  };
  
  // Get homepage FAQs using the centralized faqs system
  const homepageFaqs = getGeneralFaqs();
  
  // Get featured testimonials using the centralized testimonials system
  const featuredTestimonials = getFeaturedTestimonials();
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection 
        title={siteInfo.title}
        description={siteInfo.description}
        primaryCta={{
          text: "Book Appointment",
          href: "/booking"
        }}
        secondaryCta={{
          text: "View the Offers",
          href: "/offers"
        }}
      />

      {/* Featured Services Section */}
      <Section 
        title="Our Featured Services"
        description="Discover our most popular treatments designed to enhance your natural beauty and well-being"
        centered
        spacing="md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedServices.map((service: Service) => (
            <ServicePreview key={service.id} service={service} />
          ))}
        </div>
        
        <div className="mt-10 md:mt-16 text-center">
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            rounded="full"
            className="px-6 sm:px-8 py-5 sm:py-6 text-base font-medium"
          >
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </Section>

      {/* Service Categories Section */}
      <Section 
        backgroundClass="bg-muted/30"
        title="Explore Our Service Categories"
        description="Browse our comprehensive range of treatments organized by category"
        centered
        spacing="md"
      >
        <div className="space-y-12 md:space-y-16">
          {serviceCategories.map((category) => (
            <ServiceCategoryPreview 
              key={category.id}
              id={category.id}
              name={category.name}
              services={category.services}
            />
          ))}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section
        title="Why Choose Vivi Aesthetics & Spa"
        centered
        spacing="md"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit) => (
            <Card key={benefit.id} className="border-0">
              <CardHeader>
                <CardTitle className="scroll-m-20 text-xl font-semibold tracking-tight md:text-2xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <UnifiedTestimonial 
        testimonials={featuredTestimonials}
        title="What Our Clients Say"
        description="Discover what makes Vivi Aesthetics & Spa the preferred choice for beauty and wellness treatments"
        layout="carousel"
      />

      {/* FAQ Section */}
      <Section 
        backgroundClass="bg-muted/30"
        centered
        spacing="md"
      >
        <FAQSection 
          faqs={homepageFaqs} 
          title="Frequently Asked Questions" 
          description="Find answers to common questions about our services, appointments, and policies"
        />
      </Section>

      {/* CTA Section */}
      <Section 
        backgroundClass="bg-foreground text-background"
        centered
        spacing="md"
      >
        <div className="w-full text-center">
          <h2 className="scroll-m-20 text-2xl md:text-3xl font-semibold tracking-tight lg:text-4xl mb-4 md:mb-6">
            Ready to Transform Your Look?
          </h2>
          <p className="text-lg md:text-xl leading-relaxed mb-6 md:mb-8 max-w-3xl mx-auto">
            Book your appointment today and take the first step towards a more
            confident you.
          </p>
          <Button 
            asChild
            size="lg" 
            rounded="full"
            className="bg-background text-foreground hover:bg-background/90 px-6 sm:px-8 py-5 sm:py-6 text-base font-medium"
          >
            <Link href="/booking">Book Your Appointment</Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}
