import { Metadata } from 'next'
import { getBookingFaqs } from '@/data/faqs'
import { serviceCategories, services } from '@/data/services'
import { ServicesPageClient } from '@/components/ui/services-page-client'

export const metadata: Metadata = {
  title: 'Luxury Spa Services & Treatments in Calgary | Vivi Aesthetics',
  description: 'Discover premium aesthetic services in Calgary including facials, laser treatments, microneedling, and skin rejuvenation at Vivi Aesthetics & Spa. Book your personalized treatment today.',
}

interface ServicesPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

/**
 * Services page component displaying all available services with category filtering
 */
export default async function ServicesPage(props: ServicesPageProps) {
  // Await the searchParams object to avoid Next.js App Router warnings
  const searchParams = await Promise.resolve(props.searchParams);
  
  // Get all services directly from the imported module to avoid async issues
  const allServices = services;
  
  console.log(`Total services available: ${allServices.length}`);
  
  // Handle category filtering - properly handle searchParams by awaiting first
  const categoryParam = typeof searchParams.category === 'string' 
    ? searchParams.category 
    : undefined;

  // Log category information for debugging
  if (categoryParam) {
    console.log(`Filtering by category: ${categoryParam}`);
    
    // Find the category
    const category = serviceCategories.find(c => c.id === categoryParam);
    console.log(`Category found: ${category ? 'Yes' : 'No'}`);
    
    if (category) {
      console.log(`Services in this category: ${category.services.length}`);
    }
  }
  
  // Filter services by category if a category is specified
  const filteredServices = categoryParam 
    ? allServices.filter(service => {
        // Find the category containing this service
        const matchingCategory = serviceCategories.find(
          category => category.id === categoryParam
        );
        
        // If we found the category, check if this service is in it
        if (matchingCategory) {
          return matchingCategory.services.some(s => s.id === service.id);
        }
        return false;
      })
    : allServices;
    
  console.log(`Filtered services count: ${filteredServices.length}`);
  
  // Get general treatment FAQs for the services page
  const treatmentFaqs = getBookingFaqs();

  // Pass data to the client component
  return (
    <ServicesPageClient 
      filteredServices={filteredServices}
      categories={serviceCategories}
      treatmentFaqs={treatmentFaqs}
    />
  )
}
