import { Service } from '@/types/service';

export const japaneseHeadSpa: Service & {
  image: string;
  scientificInfo?: string;
  benefits?: string[];
  procedure?: string;
  historyAndDevelopment?: string;
  structuredData?: Record<string, unknown>;
  availableLocations: string[];
  galleryImages: string[];
} = {
  id: "3",
  title: "Japanese Head Spa",
  slug: "japanese-head-spa",
  previewDescription: "Relax and rejuvenate with a traditional Japanese head spa in Calgary.",
  fullDescription: "Experience the ultimate relaxation with a Japanese head spa in Calgary at Vivi Aesthetics & Spa. This traditional technique combines scalp massage, meridian therapy, and essential oils to relieve tension, stimulate hair growth, and provide deep relaxation—perfect for head spa in Calgary seekers.",
  keywords: ["japanese head spa calgary", "head spa calgary", "scalp massage calgary", "head meridian therapy", "japanese scalp treatment", "hair rejuvenation", "traditional japanese technique"],
  image: "/assets/services/japanese-head-spa/japanese-head-spa-in-calgary-003.webp",
  
  // Gallery images with SEO-friendly filenames
  galleryImages: [
    "/assets/services/japanese-head-spa/japanese-head-spa-in-calgary-001.webp",
    "/assets/services/japanese-head-spa/japanese-head-spa-in-calgary-002.webp",
    "/assets/services/japanese-head-spa/japanese-head-spa-in-calgary-003.webp",
    "/assets/services/japanese-head-spa/japanese-head-spa-in-calgary-004.webp",
    "/assets/services/japanese-head-spa/japanese-head-spa-in-calgary-005.webp",
    "/assets/services/japanese-head-spa/japanese-head-spa-in-calgary-006.webp",
    "/assets/services/japanese-head-spa/japanese-head-spa-in-calgary-007.webp",
    "/assets/services/japanese-head-spa/japanese-head-spa-in-calgary-008.webp",
    "/assets/services/japanese-head-spa/japanese-head-spa-in-calgary-009.webp"
  ],
  
  // Available only at Edmonton Trail location
  availableLocations: ['edmonton-trail'],
  
  scientificInfo: "Japanese Head Spa therapy combines traditional Eastern medicine concepts with modern understanding of the scalp's physiology. It works through the stimulation of blood circulation to the hair follicles, encouraging nutrient delivery and toxin removal. The treatment addresses sebum production regulation, scalp tension relief, and strengthening of hair follicles. Scientific studies have shown that regular scalp massage can increase hair thickness by stretching cells of hair follicles, which stimulates genes that regulate hair growth and causes follicles to produce thicker hair.",
  benefits: [
    "Stimulation of blood circulation to nourish hair follicles",
    "Deep cleansing of scalp to remove excess sebum and product buildup",
    "Stress reduction through activation of parasympathetic nervous system",
    "Relief of tension headaches and eye strain",
    "Potential improvement in hair growth and thickness",
    "Balancing of scalp conditions like dryness or excessive oiliness",
    "Enhanced efficacy of hair treatments through improved product absorption"
  ],
  procedure: "Japanese Head Spa treatment begins with a thorough assessment of the scalp condition, followed by the application of specialized cleansers to remove impurities. Next, therapists perform a meticulous scalp massage using traditional Japanese techniques that focus on meridian points and energy channels. The massage incorporates varying pressure levels and rhythmic movements to stimulate blood flow. Depending on specific scalp needs, therapeutic serums containing botanical extracts are applied. Many treatments include aromatherapy elements using essential oils like hinoki (Japanese cypress), yuzu, or sakura, chosen for their therapeutic properties.",
  historyAndDevelopment: "Japanese Head Spa treatments evolved from traditional Japanese hair care practices dating back to the Heian period (794-1185), when elaborate hair care rituals were considered essential among nobility. The modern concept developed in Tokyo during the 1990s as a response to increasing stress-related hair and scalp issues in urban populations. It combines elements of traditional Chinese medicine meridian theory, Japanese shiatsu massage techniques, and contemporary trichology. The practice gained international recognition in the early 2000s as part of the global interest in Japanese beauty and wellness approaches, now found in premium spas worldwide.",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "Japanese Head Spa Treatment",
    "serviceType": "Head Spa",
    "procedureType": "Therapeutic Massage",
    "bodyLocation": "Head and Scalp",
    "preparation": "No special preparation required",
    "howPerformed": "Manual massage techniques combined with specialized scalp treatments",
    "benefit": "Scalp health, Hair growth, Stress reduction"
  }
}; 
