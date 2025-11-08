/**
 * Testimonial interface defining the structure of a testimonial
 */
export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  service: string;
  serviceId: string;
  location: string;
  rating: number;
  date?: string;
  imageUrl?: string;
  isVerified?: boolean;
  featured?: boolean;
} 