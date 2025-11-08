import { Service } from '@/types/service';

export const laserPigmentationRemoval: Service & {
  image: string;
  scientificInfo?: string;
  benefits?: string[];
  procedure?: string;
  historyAndDevelopment?: string;
  structuredData?: Record<string, unknown>;
  availableLocations: string[];
  galleryImages: string[];
} = {
  id: "4",
  title: "Laser Pigmentation Removal",
  slug: "laser-pigmentation-removal",
  previewDescription: "Eliminate unwanted dark spots with laser pigmentation removal in Calgary.",
  fullDescription: "Resolve hyperpigmentation with laser pigmentation removal in Calgary at Vivi Aesthetics & Spa. Our advanced technology effectively treats dark spots, melasma, and uneven skin tone—perfect for those seeking pigmentation treatment in Calgary.",
  keywords: ["laser pigmentation removal calgary", "pigmentation treatment calgary", "laser for dark spots calgary", "hyperpigmentation treatment", "melasma removal", "sun spot treatment", "age spot removal"],
  image: "/assets/services/laser-pigmentation-removal/laser-pigmentation-removal-in-calgary-001.webp",
  
  // Gallery images with SEO-friendly filenames
  galleryImages: [
    "/assets/services/laser-pigmentation-removal/laser-pigmentation-removal-in-calgary-001.webp",
    "/assets/services/laser-pigmentation-removal/laser-pigmentation-removal-in-calgary-002.webp"
  ],
  
  // Available only at Downtown location
  availableLocations: ['downtown'],
  
  scientificInfo: "Laser pigmentation removal utilizes specific wavelengths of light that are selectively absorbed by melanin, the pigment responsible for skin coloration and discoloration. This targeted photothermolysis process converts light energy into heat, fragmenting the melanin deposits in the skin. The body's natural lymphatic system then removes these fragments over time. Different laser types including Q-switched Nd:YAG, fractional lasers, IPL (Intense Pulsed Light), and picosecond technology are employed depending on the pigmentation type, depth, and patient skin tone. The treatment can address various forms of hyperpigmentation including solar lentigines (sun spots), melasma, post-inflammatory hyperpigmentation, and certain types of birthmarks.",
  benefits: [
    "Non-invasive treatment of multiple pigmentation types without surgical intervention",
    "Precise targeting of melanin without significant damage to surrounding tissues",
    "Improvement in overall skin tone and texture beyond pigmentation reduction",
    "Stimulation of collagen production for additional anti-aging benefits",
    "Treatment of large areas with relatively quick procedures",
    "Ability to address deep and superficial pigmentation through wavelength customization",
    "Reduction in appearance of freckles, age spots, and sun damage"
  ],
  procedure: "Laser pigmentation removal begins with a detailed skin analysis to determine the type and depth of pigmentation. Protective eyewear is provided before the procedure starts. The specialist then applies the laser device to the treatment area, delivering calibrated light pulses that target the melanin clusters. Some systems include integrated cooling technology to maintain comfort. The procedure typically causes a mild snapping or warming sensation. Depending on the pigmentation type, immediate results may be visible as pigmented areas darken before gradually fading. Multiple sessions spaced 4-6 weeks apart are typically required for optimal results, with the precise number depending on pigmentation severity.",
  historyAndDevelopment: "The use of lasers for treating pigmentation disorders began in the 1960s with the development of the first medical lasers. Early techniques often resulted in significant side effects and limited efficacy across different skin types. Major advancements occurred in the 1990s with the development of selective photothermolysis theory and Q-switched lasers specifically designed for pigmentation issues. The introduction of fractionated technology in the early 2000s further improved safety profiles. Most recently, picosecond lasers have revolutionized the field by using ultra-short pulse durations measured in trillionths of a second, allowing more efficient pigment fragmentation with reduced thermal damage to surrounding tissue. These innovations have progressively expanded treatment possibilities to include more skin types and pigmentation conditions.",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Laser Pigmentation Removal",
    "procedureType": "https://schema.org/CosmeticProcedure",
    "bodyLocation": "Face and Body",
    "preparation": "Avoid sun exposure and certain skincare ingredients before treatment",
    "howPerformed": "Non-invasive procedure using specialized lasers to target melanin deposits",
    "indication": {
      "@type": "MedicalIndication",
      "name": "Hyperpigmentation, Melasma, Solar lentigines, Post-inflammatory hyperpigmentation"
    }
  }
}; 
