/**
 * Interface for site information
 */
export interface SiteInfo {
  title: string;
  description: string;
  name?: string;
  url?: string;
  ogImage?: string;
  links?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
  };
  organization?: {
    name?: string;
    url?: string;
    logo?: string;
    address?: {
      streetAddress?: string;
      addressLocality?: string;
      addressRegion?: string;
      postalCode?: string;
      addressCountry?: string;
    };
  };
} 