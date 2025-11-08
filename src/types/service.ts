export interface Service {
  id: string;
  slug: string;
  title: string;
  previewDescription: string;
  fullDescription: string;
  
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  
  // SEO specific keywords
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  
  image?: string;
  galleryImages?: string[];
  
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  };
  
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  
  structuredData?: Record<string, unknown>;
  
  scientificInfo?: string;
  benefits?: string[];
  procedure?: string;
  relatedServiceIds?: string[];
  
  // Available locations
  availableLocations?: string[];
  
  // Optional additional fields
  name?: string;
  description?: string;
  category?: string;
  price?: string | number;
  duration?: string | number;
  isFeatured?: boolean;
  popularityRank?: number;
  
  // FAQ and testimonial fields that will be moved to centralized files
  faqs?: Array<{ question: string; answer: string }>;
  testimonials?: Array<{ name: string; quote: string }>;
} 