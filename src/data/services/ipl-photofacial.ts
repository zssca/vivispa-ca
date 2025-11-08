import { Service } from '@/types/service';

export const iplPhotofacial: Service & {
  image: string;
  scientificInfo?: string;
  benefits?: string[];
  procedure?: string;
  historyAndDevelopment?: string;
  structuredData?: Record<string, unknown>;
  availableLocations: string[];
  galleryImages: string[];
} = {
  id: "2",
  title: "IPL Photofacial",
  slug: "ipl-photofacial",
  previewDescription: "Rejuvenate your skin with IPL Photofacial treatments in Calgary.",
  fullDescription: "Discover the transformative power of IPL Photofacial in Calgary at Vivi Aesthetics & Spa. Our advanced photorejuvenation technique targets sun damage, age spots, and rosacea for a clearer, more radiant complexion with minimal downtime.",
  keywords: ["ipl photofacial calgary", "photofacial treatment calgary", "intense pulsed light therapy calgary", "photorejuvenation", "rosacea treatment", "sun damage repair", "collagen stimulation"],
  image: "/assets/services/ipl-photofacial/ipl-photofacial-in-calgary-001.webp",
  
  // Gallery images with SEO-friendly filenames
  galleryImages: [
    "/assets/services/ipl-photofacial/ipl-photofacial-in-calgary-001.webp",
    "/assets/services/ipl-photofacial/ipl-photofacial-in-calgary-003.webp"
  ],
  
  // Available only at Downtown location
  availableLocations: ['downtown'],
  
  scientificInfo: "IPL (Intense Pulsed Light) Photofacial is a non-laser light-based technology that employs broad-spectrum visible light in wavelengths ranging from 400 to 1200 nanometers. Unlike lasers that emit a single wavelength, IPL delivers multiple wavelengths simultaneously, allowing it to target various chromophores (color-absorbing molecules) in the skin. The technology works through selective photothermolysis, where the light energy is converted to heat when absorbed by specific targets like melanin (in pigmentation) and hemoglobin (in blood vessels). This thermal energy destroys the targeted structures while leaving surrounding tissue intact. Additionally, controlled thermal damage stimulates fibroblast activity, promoting collagen and elastin production for improved skin texture and elasticity.",
  benefits: [
    "Simultaneous treatment of multiple skin concerns including pigmentation, vascular lesions, and texture issues",
    "Stimulation of collagen production for natural skin tightening and fine line reduction",
    "Reduction in appearance of rosacea, broken capillaries, and facial redness",
    "Improvement in skin tone uniformity by addressing sun damage and age spots",
    "Minimal downtime compared to more invasive procedures with similar results",
    "Gradual, natural-looking improvement that develops over multiple sessions",
    "Treatment of non-facial areas including neck, chest, and hands"
  ],
  procedure: "During an IPL Photofacial procedure, a cooling gel is first applied to the treatment area to enhance comfort and light transmission. The specialist then uses a handheld device to deliver calibrated light pulses to the skin, systematically covering the treatment zone. Each pulse feels like a mild snapping sensation against the skin. Specialized filters within the device modify the light wavelengths to target specific concerns. The treatment typically takes 20-30 minutes for facial applications, with longer sessions for larger body areas. Following treatment, patients may experience temporary redness similar to mild sunburn. The complete protocol usually involves 3-5 sessions spaced approximately four weeks apart, with maintenance treatments recommended annually.",
  historyAndDevelopment: "IPL technology was first developed in the early 1990s by dermatologists looking for gentler alternatives to ablative laser treatments. It was commercially introduced for photorejuvenation in 1994 after researchers discovered its ability to improve photodamaged skin. Early IPL systems had limited controls and higher risk profiles, but technological advancements have significantly improved safety and efficacy. Modern systems feature sophisticated cooling mechanisms, precise energy delivery controls, and customizable wavelength filters. The application scope has expanded from initial vascular lesion treatments to address multiple skin concerns simultaneously, leading to the popularization of the term 'photofacial' in the early 2000s. Currently, IPL represents one of the most versatile and commonly performed aesthetic procedures worldwide, with ongoing innovations in pulse sequencing and wavelength optimization.",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "IPL Photofacial",
    "procedureType": "https://schema.org/CosmeticProcedure",
    "bodyLocation": "Face, Neck, Chest, Hands",
    "preparation": "Avoid sun exposure, retinoids, and certain medications before treatment",
    "howPerformed": "Non-invasive procedure using broad-spectrum visible light to target multiple skin concerns",
    "indication": {
      "@type": "MedicalIndication",
      "name": "Sun damage, Rosacea, Broken capillaries, Age spots, Fine lines"
    }
    },
}; 
