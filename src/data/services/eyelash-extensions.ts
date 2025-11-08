import { Service } from '@/types/service';

export const eyelashExtensions: Service & {
  image: string;
  scientificInfo?: string;
  benefits?: string[];
  procedure?: string;
  historyAndDevelopment?: string;
  structuredData?: Record<string, unknown>;
  availableLocations: string[];
  galleryImages: string[];
} = {
  id: "8",
  title: "Eyelash Extensions",
  slug: "eyelash-extensions",
  previewDescription: "Enhance your look with natural-looking eyelash extensions in Calgary.",
  fullDescription: "Accentuate your eyes with the best eyelash extensions in Calgary at Vivi Aesthetics & Spa. Vivian crafts natural-looking lashes customized for a stunning, low-maintenance beauty boost—ideal for natural-looking eyelash extensions in Calgary seekers.",
  keywords: ["eyelash extensions calgary", "best eyelash extensions in calgary", "natural looking eyelash extensions calgary", "semi-permanent lashes", "volume lashes", "classic lash extensions", "hybrid lashes"],
  image: "/assets/services/eyelash-extensions/eyelash-extensions-in-calgary-001.webp",
  
  // Gallery images with SEO-friendly filenames
  galleryImages: [
    "/assets/services/eyelash-extensions/eyelash-extensions-in-calgary-001.webp",
    "/assets/services/eyelash-extensions/eyelash-extensions-in-calgary-002.webp",
    "/assets/services/eyelash-extensions/eyelash-extensions-in-calgary-003.webp",
    "/assets/services/eyelash-extensions/eyelash-extensions-in-calgary-004.webp",
    "/assets/services/eyelash-extensions/eyelash-extensions-in-calgary-005.webp",
    "/assets/services/eyelash-extensions/eyelash-extensions-in-calgary-006.webp",
    "/assets/services/eyelash-extensions/eyelash-extensions-in-calgary-007.webp",
    "/assets/services/eyelash-extensions/eyelash-extensions-in-calgary-008.webp"
  ],
  
  // Available at both locations
  availableLocations: ['downtown', 'edmonton-trail'],
  
  scientificInfo: "Eyelash extensions are semi-permanent fibers attached to natural eyelashes to enhance length, thickness, and fullness. These extensions are typically made from synthetic materials like polyester, silk, or mink-like fibers, with varying diameters (0.05mm to 0.25mm) and lengths (6mm to 18mm). The application involves isolating individual natural lashes and bonding an extension to each using a cyanoacrylate-based medical-grade adhesive. The technology behind these adhesives has evolved to create flexible bonds that move naturally with the lash while maintaining strong adhesion. Extensions are designed to follow the natural lash growth cycle, with each extension shedding when the natural lash it's attached to reaches the end of its growth phase (typically 4-8 weeks). Research in adhesive technology and synthetic fiber development continues to improve extension durability, flexibility, and biocompatibility.",
  benefits: [
    "Immediate enhancement of eye appearance without daily makeup application",
    "Customizable results from subtle enhancement to dramatic transformation",
    "Time-saving alternative to daily mascara application and removal",
    "Weightless feel and natural movement when properly applied",
    "Waterproof and smudge-proof solution for active lifestyles",
    "Non-invasive beauty enhancement without surgical intervention",
    "Various styling options including classic (one-to-one), volume, and hybrid techniques"
  ],
  procedure: "Professional eyelash extension application begins with a thorough consultation to determine the client's desired look and assess natural lash health. The eyes are cleansed to remove oils and makeup residue, and under-eye gel patches are applied to isolate the lower lashes and protect the skin. The technician then uses precision tweezers to isolate each natural lash and applies a single extension (classic technique) or multiple ultra-fine extensions (volume or hybrid techniques) using medical-grade adhesive. The process requires meticulous attention to proper isolation, adhesive amount, and placement to avoid damage to natural lashes. A full set typically requires 1.5-2.5 hours and involves applying 80-140 extensions depending on the client's natural lash count and desired fullness. The procedure concludes with gentle air drying and lash separation to ensure proper bonding and natural appearance. Maintenance fills are recommended every 2-3 weeks to replace extensions that have shed with the natural lash cycle.",
  historyAndDevelopment: "The concept of eyelash enhancement dates back to ancient Egypt, but modern eyelash extensions were developed in Japan in the 1990s and introduced to the United States around 2004. The initial techniques involved strip or cluster lashes, which could damage natural lashes due to their weight. The revolutionary development was the introduction of individual lash extension application, which allowed for customization and reduced stress on natural lashes. The early 2000s saw rapid adoption of this technique among celebrities, followed by mainstream popularity. By 2010, volume lashing techniques emerged from Russia, allowing for the application of multiple ultra-fine extensions to a single natural lash for increased fullness without additional weight. Recent innovations include hybrid techniques combining classic and volume methods, development of lighter and more flexible synthetic materials, faster-drying adhesives with reduced fume emission, and specialized tools for improved application precision. The industry continues to evolve with improved safety standards and certification programs for technicians.",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "BeautyService",
    "name": "Eyelash Extensions",
    "serviceType": "Cosmetic Enhancement",
    "procedureType": "Application",
    "bodyLocation": "Eyes",
    "preparation": "Arrive without eye makeup, contact lenses, or eye products",
    "howPerformed": "Manual application of individual synthetic lashes to natural eyelashes",
    "serviceOutput": "Enhanced eyelash appearance with increased length, thickness, and fullness"
  }
}; 
