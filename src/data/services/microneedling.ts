import { Service } from '@/types/service';

export const microneedling: Service & {
  image: string;
  scientificInfo?: string;
  benefits?: string[];
  procedure?: string;
  historyAndDevelopment?: string;
  structuredData?: Record<string, unknown>;
  availableLocations: string[];
  galleryImages: string[];
} = {
  id: "6",
  title: "Microneedling",
  slug: "microneedling",
  previewDescription: "Rejuvenate your skin with microneedling treatments in Calgary.",
  fullDescription: "Revitalize your skin with microneedling in Calgary at Vivi Aesthetics & Spa. This collagen induction therapy stimulates your skin's natural healing process to reduce scars, fine lines, and improve texture—ideal for those seeking skin needling in Calgary.",
  keywords: ["microneedling calgary", "skin needling calgary", "collagen induction therapy calgary", "percutaneous collagen induction", "acne scar treatment", "RF microneedling", "dermaroller treatment"],
  image: "/assets/services/microneedling/microneedling-in-calgary-001.webp",
  
  // Gallery images with SEO-friendly filenames
  galleryImages: [
    "/assets/services/microneedling/microneedling-in-calgary-001.webp",
    "/assets/services/microneedling/microneedling-in-calgary-002.webp",
    "/assets/services/microneedling/microneedling-in-calgary-003.webp",
    "/assets/services/microneedling/microneedling-in-calgary-004.webp",
    "/assets/services/microneedling/microneedling-in-calgary-005.webp",
    "/assets/services/microneedling/microneedling-in-calgary-006.webp"
  ],
  
  // Available at both locations
  availableLocations: ['downtown', 'edmonton-trail'],
  
  scientificInfo: "Microneedling works through a process called controlled mechanical percutaneous collagen induction. The procedure creates thousands of microchannels in the skin's epidermis and superficial dermis, triggering the body's wound healing cascade. This controlled injury stimulates the release of growth factors that promote fibroblast migration and proliferation, leading to increased production of collagen and elastin. The new collagen (primarily type III, which later converts to stronger type I collagen) remodels the skin matrix, improving texture, firmness, and elasticity. Studies have shown increases of up to 400% in collagen and elastin deposition six months post-treatment. Additionally, the microchannels created serve as pathways for enhanced penetration of topical products, increasing their efficacy by up to 3,000% compared to application on intact skin.",
  benefits: [
    "Significant improvement in acne scarring and surgical scars",
    "Reduction in fine lines and wrinkles through collagen stimulation",
    "Minimization of pore size and improvement in skin texture",
    "Enhancement of topical product absorption and efficacy",
    "Reduction in stretch marks and improvement in skin laxity",
    "Minimal downtime compared to ablative resurfacing procedures",
    "Safety across all skin types with proper technique and minimal risk of post-inflammatory hyperpigmentation"
  ],
  procedure: "Professional microneedling begins with thorough cleansing and application of topical anesthetic to ensure comfort. The specialist then uses either a sterile dermaroller or an automated microneedling pen containing fine needles (typically 0.5-2.5mm in length) to create controlled micro-injuries across the treatment area. Needle depth is adjusted based on the treatment area and skin concern, with deeper penetration for scar revision and shallower depths for general skin rejuvenation. Many protocols incorporate the application of growth factors, hyaluronic acid, or peptide serums during or immediately after treatment to enhance results. Advanced variations include radiofrequency microneedling, which adds thermal energy to the mechanical stimulation for enhanced collagen production, and microneedling with platelet-rich plasma (PRP) that utilizes the patient's own blood components to accelerate healing and regeneration.",
  historyAndDevelopment: "The concept of microneedling dates back to 1995 when Dr. Desmond Fernandes developed the first dermaroller in South Africa to treat his patients' scars and wrinkles. The initial focus was primarily on stimulating collagen production for acne scarring. By the early 2000s, the technique gained popularity in Europe and was further refined with the publication of scientific studies confirming its efficacy. In 2006, Dr. Fernandes formally introduced the Percutaneous Collagen Induction therapy concept to the medical community. The development of automated pen devices around 2010 revolutionized the field by allowing for customizable needle depths and more precise treatments. Further innovations have included combination approaches like radiofrequency microneedling (introduced around 2013) and microneedling with drug delivery systems. The FDA granted clearance to several microneedling devices starting in 2018, officially recognizing the technology for treating facial acne scars in patients aged 22 and older.",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Microneedling",
    "alternateName": "Collagen Induction Therapy",
    "procedureType": "https://schema.org/CosmeticProcedure",
    "bodyLocation": "Face and Body",
    "preparation": "Consultation required to assess skin condition and contraindications",
    "howPerformed": "Minimally invasive procedure using fine needles to create controlled micro-injuries",
    "indication": {
      "@type": "MedicalIndication",
      "name": "Acne scars, Fine lines, Enlarged pores, Skin texture issues, Stretch marks"
    }
  }
}; 
