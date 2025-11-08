import { Service } from '@/types/service';

export const hydrodermaFacialService: Service & {
  image: string;
  scientificInfo?: string;
  benefits?: string[];
  procedure?: string;
  historyAndDevelopment?: string;
  structuredData?: Record<string, unknown>;
  availableLocations: string[];
} = {
  id: 'hydroderma-facial',
  slug: 'hydroderma-facial',
  title: 'Hydroderma Facial Treatment',
  previewDescription: 'Experience the rejuvenating Hydroderma Facial for deeply cleansed, hydrated, and radiant skin.',
  fullDescription: 'The Hydroderma Facial is an advanced skincare treatment that combines cleansing, exfoliation, extraction, hydration, and antioxidant protection simultaneously, resulting in clearer, more beautiful skin with no discomfort or downtime. The treatment is soothing, moisturizing, non-invasive, and non-irritating. It improves the appearance of fine lines, wrinkles, congested and enlarged pores, oily or acne-prone skin, hyperpigmentation, and brown spots.',
  
  metaTitle: 'Hydroderma Facial Calgary | Deep Cleansing & Hydration | Vivi Aesthetics & Spa',
  metaDescription: 'Book your Hydroderma Facial at Vivi Aesthetics & Spa Calgary for a non-invasive treatment that cleanses, exfoliates, and hydrates. Achieve radiant skin today!',
  keywords: ['hydroderma facial calgary', 'hydroderma facial in calgary', 'hydroderma facial treatment calgary', 'best hydroderma facial in calgary', 'facial treatment', 'skin rejuvenation', 'calgary spa', 'hydroderma facial treatment'],
  canonicalUrl: 'https://vivispa.ca/services/hydroderma-facial',
  
  image: '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-005.webp',
  
  // Gallery images with SEO-friendly filenames
  galleryImages: [
    '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-001.webp',
    '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-002.webp',
    '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-003.webp',
    '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-004.webp',
    '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-005.webp',
    '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-006.webp',
    '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-007.webp',
    '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-008.webp',
    '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-009.webp',
    '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-010.webp'
  ],

  // Available at both locations
  availableLocations: ['downtown', 'edmonton-trail'],

  openGraph: {
    title: 'Hydroderma Facial Treatment Calgary | Vivi Aesthetics & Spa',
    description: 'Experience the ultimate skin rejuvenation with our Hydroderma Facial treatment. Cleanse, exfoliate, and hydrate your skin in one session.',
    // Use jpg for OpenGraph as it has better compatibility across platforms
    image: '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-001.webp', 
    url: 'https://vivispa.ca/services/hydroderma-facial',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Hydroderma Facial Calgary | Vivi Aesthetics & Spa',
    description: 'Get smooth, hydrated, and youthful skin with our Hydroderma Facial treatment. Book now!',
    image: '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-002.webp',
  },

  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Hydroderma Facial Treatment Calgary',
    description: 'A non-invasive facial treatment that provides cleansing, exfoliation, extraction, hydration, and antioxidant protection.',
    image: '/assets/services/hydroderma-facial/hydroderma-facial-in-calgary-001.webp',
    url: 'https://vivispa.ca/services/hydroderma-facial',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Vivi Aesthetics & Spa',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Calgary',
        addressRegion: 'AB',
        addressCountry: 'Canada'
      }
    },
    procedureType: 'CosmeticProcedure',
    bodyLocation: 'Face',
    preparation: 'No special preparation required',
    howPerformed: 'Non-invasive procedure using a specialized device with patented Vortex-Fusion technology',
    indication: {
      '@type': 'MedicalIndication',
      name: 'Dehydrated skin, Fine lines, Enlarged pores, Hyperpigmentation, Oily skin'
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      areaServed: {
        '@type': 'City',
        name: 'Calgary'
      }
    }
  },

  scientificInfo: 'The Hydroderma Facial device uses a patented Vortex-Fusion delivery system to exfoliate, extract and hydrate skin, and, the spiral design delivers painless extractions. The multi-step treatment combines the benefits of advanced exfoliation, chemical exfoliation, automated painless extractions, and antioxidant delivery. The procedure works through a specialized handpiece that creates a vortex effect to dislodge and remove impurities while simultaneously delivering hydrating solutions. The technology allows for customization through different treatment tips and specialized serums that can be infused during the procedure to address specific skin concerns.',
  benefits: [
    'Deeply cleanses and exfoliates',
    'Hydrates and nourishes the skin',
    'Reduces appearance of fine lines and wrinkles',
    'Improves skin texture and tone',
    'Minimizes pore size',
    'Suitable for all skin types',
    'No downtime required after treatment'
  ],
  procedure: 'The multi-step treatment cleanses, evenly exfoliates and extracts to remove impurities and dead skin cells while at the same time replenishing vital nutrients including Antioxidants, Peptides and Hyaluronic Acid. The procedure typically includes cleansing and exfoliation using lactic and glycolic acids, followed by a gentle suction extraction to clear pores, and concludes with the infusion of intensive hydrating serums containing antioxidants, peptides, and hyaluronic acid. The entire process takes approximately 30-45 minutes with immediate visible results and no recovery time needed.',
  historyAndDevelopment: 'The Hydroderma Facial treatment was developed in the early 2000s as an advancement over traditional microdermabrasion. Initially known as "Hydrodermabrasion," it was designed to be a gentler, more hydrating alternative that eliminated the discomfort and potential irritation associated with crystal-based exfoliation systems. The technology received FDA approval in 2005 and has since evolved with various specialized treatment protocols and serums. The current system represents the third generation of the technology, with improvements in precision delivery, specialized treatment tips, and a wider range of targeted serums for customization.',
  relatedServiceIds: ['microneedling', 'ipl-photofacial']
}; 