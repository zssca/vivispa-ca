import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vivispa.ca';

// Define organization info for structured data
const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'Vivi Aesthetics & Spa',
  url: siteUrl,
  logo: `${siteUrl}/assets/logos/logo.webp`,
  description: 'Premium beauty treatments and aesthetic services in Calgary, Alberta.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Main Street',
    addressLocality: 'Calgary',
    addressRegion: 'AB',
    postalCode: 'T2P 1J9',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '51.0447',
    longitude: '-114.0719',
  },
  telephone: '+14035551234',
  email: 'ViviAestheticsSpa@gmail.com',
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '10:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '10:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '00:00',
      closes: '00:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/vivispa.ca',
    'https://www.instagram.com/vivispa.ca',
  ],
};

/**
 * Truncates title to ensure it stays under 60 characters
 */
function optimizeTitle(title: string): string {
  return title.length <= 60 ? title : `${title.substring(0, 57)}...`;
}

/**
 * Truncates description to ensure it stays within 155-160 characters
 */
function optimizeDescription(description: string): string {
  const maxLength = 157;
  return description.length <= maxLength ? description : `${description.substring(0, maxLength)}...`;
}

/**
 * Interface for page-specific SEO metadata
 */
export interface PageSeoProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  canonicalPath?: string;
}

/**
 * Generates optimized metadata for a specific page
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  ogImage,
  canonicalPath = '',
}: PageSeoProps): Metadata {
  const optimizedTitle = optimizeTitle(title);
  const optimizedDescription = optimizeDescription(description);
  const pageUrl = canonicalPath ? `${siteUrl}${canonicalPath}` : siteUrl;
  
  return {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: [...defaultMetadata.keywords as string[], ...keywords],
    alternates: {
      canonical: pageUrl,
      languages: {
        'en-CA': pageUrl,
      },
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: optimizedTitle,
      description: optimizedDescription,
      url: pageUrl,
      images: ogImage ? [ogImage] : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: optimizedTitle,
      description: optimizedDescription,
      images: ogImage ? [ogImage] : defaultMetadata.twitter?.images,
    },
  };
}

/**
 * Generates optimized metadata for service pages with location-specific SEO
 */
export function generateServicePageMetadata({
  serviceName,
  primaryKeyword,
  secondaryKeywords = [],
  benefits = [],
  canonicalPath,
}: {
  serviceName: string;
  primaryKeyword: string;
  secondaryKeywords?: string[];
  benefits?: string[];
  canonicalPath: string;
}): Metadata {
  // Create location-optimized title and description
  const title = optimizeTitle(`${serviceName} | Best ${primaryKeyword}`);
  
  // Create compelling description with benefits and call to action
  const benefitsText = benefits.length > 0 
    ? `${benefits.slice(0, 2).join(' and ')}. ` 
    : '';
  
  const description = optimizeDescription(
    `Expert ${primaryKeyword}. ${benefitsText}Visit Vivi Aesthetics & Spa in Calgary for professional, personalized treatments. Book now!`
  );
  
  return generatePageMetadata({
    title,
    description,
    keywords: [primaryKeyword, ...secondaryKeywords],
    canonicalPath,
  });
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Calgary Aesthetics & Spa | Premium Beauty Treatments',
    template: '%s | Vivi Aesthetics',
  },
  description: 'Calgary\'s top-rated spa offering premium facials, laser treatments, microneedling & more. Expert aestheticians, customized treatments, and proven results.',
  keywords: [
    'Calgary spa', 'aesthetics', 'beauty treatments', 'skincare', 'laser treatments', 
    'Hydroderma Facial Calgary', 'microneedling Calgary', 'Calgary beauty', 'facial treatments',
    'anti-aging', 'skin rejuvenation', 'beauty services', 'esthetic services Calgary'
  ],
  authors: [{ name: 'Vivi Aesthetics & Spa' }],
  creator: 'Vivi Aesthetics & Spa',
  publisher: 'Vivi Aesthetics & Spa',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' },
    ],
    other: [
      { url: '/images/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: siteUrl,
    title: 'Calgary Aesthetics & Spa | Premium Beauty Treatments',
    description: 'Calgary\'s top-rated spa offering premium facials, laser treatments, microneedling & more. Expert aestheticians, customized treatments, and proven results.',
    siteName: 'Vivi Aesthetics & Spa',
    images: [{
      url: `${siteUrl}/opengraph-image.png`,
      width: 1200,
      height: 630,
      alt: 'Vivi Aesthetics & Spa - Luxury spa treatments in Calgary',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calgary Aesthetics & Spa | Premium Beauty',
    description: 'Calgary\'s top-rated spa offering premium facials, laser treatments, microneedling & more. Expert aestheticians & proven results.',
    images: [{
      url: `${siteUrl}/twitter-image.png`,
      width: 1200,
      height: 630,
      alt: 'Vivi Aesthetics & Spa - Luxury spa treatments in Calgary',
    }],
    creator: '@vivispa.ca',
    site: '@vivispa.ca',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-CA': siteUrl,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
    'msapplication-TileColor': '#ffffff',
    'theme-color': '#ffffff',
    'application-name': 'Vivi Aesthetics & Spa',
    // Add JSON-LD structured data
    'structured-data': JSON.stringify(organizationStructuredData),
  },
}; 