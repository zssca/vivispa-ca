import { Service } from '@/types/service';

export const laserSkinTightening: Service & {
  image: string;
  scientificInfo?: string;
  benefits?: string[];
  procedure?: string;
  historyAndDevelopment?: string;
  structuredData?: Record<string, unknown>;
  testimonials?: Array<{name: string, quote: string}>;
  availableLocations: string[];
  galleryImages: string[];
} = {
  id: "9",
  title: "Laser Skin Tightening",
  slug: "laser-skin-tightening",
  previewDescription: "Achieve youthful, firmer skin with non-invasive laser skin tightening in Calgary.",
  fullDescription: "Experience the benefits of laser skin tightening in Calgary at Vivi Aesthetics & Spa. This non-invasive procedure stimulates collagen production to combat signs of aging without surgery—perfect for individuals seeking skin tightening treatments in Calgary.",
  keywords: ["laser skin tightening calgary", "non surgical skin tightening calgary", "collagen stimulation therapy", "radiofrequency skin tightening", "skin firming treatment", "anti aging procedure", "non invasive facelift calgary"],
  image: "/assets/services/laser-skin-tightening/laser-skin-tightening-in-calgary-001.webp",
  
  // Gallery images with SEO-friendly filenames
  galleryImages: [
    "/assets/services/laser-skin-tightening/laser-skin-tightening-in-calgary-001.webp",
    "/assets/services/laser-skin-tightening/laser-skin-tightening-in-calgary-002.webp"
  ],
  
  // Available only at Downtown location
  availableLocations: ['downtown'],
  
  scientificInfo: "Laser skin tightening utilizes non-ablative laser technology that delivers focused light energy to the deeper dermis while preserving the epidermis. The controlled heat stimulates fibroblast cells to produce new collagen and elastin, the essential structural proteins responsible for skin firmness and elasticity. Technologies include Nd:YAG lasers (operating at 1064nm wavelength), radiofrequency devices that use electrical current to generate heat, and combination approaches that pair light energy with radiofrequency. The thermal effect causes immediate collagen contraction followed by neocollagenesis (new collagen formation) over 3-6 months. Studies have shown collagen increases of up to 28% six months post-treatment. The procedure works through controlled tissue heating to 65-75°C, the temperature range that triggers the body's natural wound healing response without causing ablation or surface damage.",
  benefits: [
    "Non-surgical alternative to facelifts with zero downtime",
    "Progressive improvement in skin laxity through natural collagen stimulation",
    "Effective for multiple treatment areas including face, neck, abdomen, and arms",
    "Prevention of further skin laxity when used as a maintenance treatment",
    "Simultaneous improvement in skin texture and fine lines",
    "Compatible with other aesthetic treatments in comprehensive rejuvenation protocols",
    "Suitable for most skin types with proper parameter adjustment"
  ],
  procedure: "Professional laser skin tightening begins with a detailed skin assessment and customized treatment planning. The area is cleansed and coupling gel may be applied to facilitate energy transmission. The specialist then passes the handpiece methodically over the treatment area, delivering calibrated energy pulses that penetrate to the dermal layer. Integrated cooling systems maintain surface comfort while allowing effective heating of deeper tissues. Patients typically experience a warming sensation during the procedure, with sessions lasting 30-60 minutes depending on the treatment area. The procedure is non-invasive with no recovery time—patients can immediately return to normal activities. Optimal results develop gradually as collagen remodeling occurs, with visible improvements appearing 2-3 months after treatment. A series of 3-6 treatments spaced 3-4 weeks apart is typically recommended for maximum benefit, followed by maintenance sessions every 6-12 months.",
  historyAndDevelopment: "The concept of using thermal energy for skin tightening dates back to the early 2000s when non-ablative laser technologies were first developed as alternatives to more invasive surgical procedures. The first FDA clearance for non-ablative skin tightening came in 2004 with early Nd:YAG laser systems. Radiofrequency devices for skin tightening were introduced around 2002, offering an alternative thermal approach without using light energy. Significant advancements occurred in the 2010s with the development of multipolar radiofrequency, fractional RF delivery, and combination systems that pair light with radiofrequency for synergistic effects. Recent innovations include sophisticated temperature monitoring systems, customizable treatment protocols for different skin types, and the introduction of micro-focused ultrasound technology that can target specific tissue depths with greater precision. These technologies continue to evolve with improvements in comfort, efficacy, and treatment versatility.",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Laser Skin Tightening",
    "procedureType": "https://schema.org/CosmeticProcedure",
    "bodyLocation": "Face, Neck, and Body",
    "preparation": "No special preparation required",
    "howPerformed": "Non-invasive procedure using laser technology to stimulate collagen production",
    "indication": {
      "@type": "MedicalIndication",
      "name": "Skin laxity, Loss of firmness, Mild to moderate sagging"
    }
  },
  relatedServiceIds: ["ipl-photofacial", "microneedling", "hydroderma-facial"]
}; 
