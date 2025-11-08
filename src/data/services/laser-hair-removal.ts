import { Service } from '@/types/service';

export const laserHairRemovalService: Service & {
  image: string;
  scientificInfo?: string;
  benefits?: string[];
  procedure?: string;
  historyAndDevelopment?: string;
  structuredData?: Record<string, unknown>;
  availableLocations: string[];
  galleryImages: string[];
} = {
  id: 'laser-hair-removal',
  slug: 'laser-hair-removal',
  title: 'Laser Hair Removal Treatment',
  previewDescription: 'Achieve smooth, hair-free skin with our advanced laser hair removal services.',
  fullDescription: 'Our state-of-the-art laser hair removal technology offers a safe, effective, and long-lasting solution for unwanted hair on various parts of the body. Suitable for different skin types, the treatment targets hair follicles to inhibit future growth. Enjoy the convenience of reduced shaving and waxing, and the confidence of smooth skin year-round. Multiple sessions are typically required for optimal results.',

  metaTitle: 'Laser Hair Removal Calgary | Permanent Hair Reduction | Vivi Aesthetics & Spa',
  metaDescription: 'Book safe and effective laser hair removal at Vivi Aesthetics & Spa Calgary. Advanced technology for permanent hair reduction. Get smooth skin today!',
  keywords: ['laser hair removal', 'permanent hair reduction', 'hair removal calgary', 'calgary laser spa', 'smooth skin'],
  canonicalUrl: 'https://vivispa.ca/services/laser-hair-removal',

  // Available only at Downtown location
  availableLocations: ['downtown'],

  image: '/assets/services/laser-hair-removal/laser-hair-removal-in-calgary-001.webp',
  
  // Gallery images with SEO-friendly filenames
  galleryImages: [
    '/assets/services/laser-hair-removal/laser-hair-removal-in-calgary-001.webp',
    '/assets/services/laser-hair-removal/laser-hair-removal-in-calgary-003.webp',
    '/assets/services/laser-hair-removal/laser-hair-removal-in-calgary-004.webp',
    '/assets/services/laser-hair-removal/laser-hair-removal-in-calgary-005.webp',
    '/assets/services/laser-hair-removal/laser-hair-removal-in-calgary-006.webp',
    '/assets/services/laser-hair-removal/laser-hair-removal-in-calgary-007.webp'
  ],

  openGraph: {
    title: 'Laser Hair Removal Services in Calgary | Vivi Aesthetics & Spa',
    description: 'Advanced laser hair removal treatments at Vivi Aesthetics & Spa in Calgary. Safe, effective, and long-lasting results for all skin types.',
    image: '/assets/services/laser-hair-removal/laser-hair-removal-in-calgary-001.webp',
    url: 'https://vivispa.ca/services/laser-hair-removal',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Laser Hair Removal Calgary | Vivi Aesthetics & Spa',
    description: 'Get lasting smoothness with our expert laser hair removal services. Book your consultation!',
    image: '/assets/services/twitter-laser-hair-removal.webp',
  },

  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: 'Laser Hair Removal',
    description: 'A cosmetic procedure that uses a concentrated beam of light (laser) to remove unwanted hair.',
    image: '/assets/services/laser-hair-removal.webp',
    url: 'https://vivispa.ca/services/laser-hair-removal',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Vivi Aesthetics & Spa',
    },
    procedureType: {
      '@type': 'MedicalProcedureType',
      name: 'Non-invasive',
    },
    bodyLocation: 'Applicable to various body parts like legs, arms, underarms, bikini line, face, etc.',
  },

  scientificInfo: 'Laser hair removal works on the principle of selective photothermolysis, where the laser targets the melanin in the hair follicle while sparing the surrounding skin. This process uses specific wavelengths of light (typically 755nm for alexandrite lasers, 810nm for diode lasers, and 1064nm for Nd:YAG lasers) that are preferentially absorbed by the pigment in hair follicles. The absorbed light energy converts to heat, which damages the follicle and inhibits future hair growth. Effective treatment requires targeting hairs in the active growth phase (anagen), which is why multiple sessions spaced 4-6 weeks apart are necessary to catch all follicles as they enter this phase. Different technologies are optimized for various skin types and hair colors, with longer wavelengths being safer for darker skin tones.',
  benefits: [
    'Long-lasting hair reduction',
    'Reduces ingrown hairs',
    'Saves time and money on shaving/waxing',
    'Smoother skin texture',
    'Precision targeting for various body areas',
    'Less painful than waxing and other hair removal methods',
    'Prevention of folliculitis and other hair-related skin issues'
  ],
  procedure: 'During the procedure, a handheld laser device is pressed against your skin. The laser beam passes through the skin to the hair follicles. The intense heat from the laser damages the hair follicles, which inhibits future hair growth. Before treatment, the area is cleansed and may be shaved if necessary. Protective eyewear is provided to shield eyes from the laser light. The specialist adjusts the laser settings based on hair color, thickness, location, and skin tone. The sensation during treatment is often described as a rubber band snapping against the skin, with cooling systems used to maintain comfort. Sessions vary in length depending on the treatment area, with smaller areas requiring 15 minutes and larger areas up to an hour. Most patients require 6-8 treatments spaced 4-6 weeks apart for optimal results.',
  historyAndDevelopment: 'Laser hair removal was first developed in the late 1960s, but the technology only became commercially viable in the 1990s with the development of selective photothermolysis principles by researchers at Massachusetts General Hospital. Early devices were limited in their effectiveness and safety across different skin types. The first FDA approval for laser hair removal came in 1995 with the ruby laser (694nm), followed by alexandrite, diode, and Nd:YAG systems. Significant advancements in the 2000s included improved cooling systems, larger spot sizes for faster treatments, and longer wavelength technologies safer for darker skin tones. Recent innovations include specialized wavelength combinations, vacuum-assisted technology for enhanced follicle targeting, and sophisticated skin tone detection systems that automatically adjust parameters for optimal safety and efficacy.',
  relatedServiceIds: ['hydroderma-facial', 'ipl-photofacial']
}; 
