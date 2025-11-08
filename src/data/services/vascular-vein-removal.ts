import { Service } from '@/types/service';

export const vascularVeinRemoval: Service & {
  image: string;
  scientificInfo?: string;
  benefits?: string[];
  procedure?: string;
  historyAndDevelopment?: string;
  structuredData?: Record<string, unknown>;
  availableLocations: string[];
  galleryImages: string[];
} = {
  id: "7",
  title: "Vascular & Vein Removal",
  slug: "vascular-vein-removal",
  previewDescription: "Eliminate visible veins and vascular lesions with advanced vein removal treatments in Calgary.",
  fullDescription: "Find relief from visible veins with vascular vein removal in Calgary at Vivi Aesthetics & Spa. Our advanced treatments effectively eliminate spider veins and vascular lesions—perfect for those seeking vein treatment in Calgary.",
  keywords: ["vascular vein removal calgary", "spider vein treatment calgary", "broken capillary treatment", "telangiectasia removal", "facial vein treatment", "laser vein removal", "sclerotherapy calgary"],
  image: "/assets/services/vascular-vein-removal/vascular-vein-removal-in-calgary-001.webp",
  
  // Gallery images with SEO-friendly filenames
  galleryImages: [
    "/assets/services/vascular-vein-removal/vascular-vein-removal-in-calgary-001.webp",
    "/assets/services/vascular-vein-removal/vascular-vein-removal-in-calgary-002.webp",
    "/assets/services/vascular-vein-removal/vascular-vein-removal-in-calgary-003.webp",
    "/assets/services/vascular-vein-removal/vascular-vein-removal-in-calgary-004.webp"
  ],
  
  // Available only at Downtown location
  availableLocations: ['downtown'],
  
  scientificInfo: "Vascular vein removal employs light-based technologies that target hemoglobin, the oxygen-carrying protein in red blood cells that gives blood vessels their characteristic color. The procedure utilizes the principle of selective photothermolysis, where specific wavelengths of light (typically 532nm for superficial vessels and 1064nm for deeper ones) are selectively absorbed by the hemoglobin, converting light energy to heat. This thermal damage causes the vessel walls to collapse and seal, after which the body naturally reabsorbs the treated vessels through its lymphatic system. Different vascular veins require specific approaches: telangiectasia (spider veins) and facial erythema respond well to pulsed dye lasers and intense pulsed light, while deeper reticular veins may require longer-wavelength Nd:YAG lasers or sclerotherapy. Temperature monitoring and advanced cooling systems protect the epidermis while allowing effective treatment of the underlying vessels.",
  benefits: [
    "Non-invasive treatment that avoids incisions, sclerotherapy injections, or surgical excision",
    "Precise targeting of blood vessels while preserving surrounding tissue",
    "Ability to treat vessels of varying depths through wavelength customization",
    "Immediate visible results for certain lesion types, particularly superficial vessels",
    "Treatment of various vascular conditions including spider veins, cherry angiomas, and port wine stains",
    "Minimal downtime compared to surgical vein removal procedures",
    "Progressive improvement over multiple sessions for stubborn or deep vascular issues"
  ],
  procedure: "The vascular vein removal procedure begins with skin preparation and eye protection. The specialist then applies the laser or IPL device to the treatment area, delivering calibrated light pulses that target the hemoglobin in blood vessels. Most systems incorporate cooling mechanisms to protect the skin surface while allowing effective treatment of the vasculature beneath. Patients typically experience a sensation similar to a rubber band snap during each pulse. Treatment sessions range from 15 to 45 minutes depending on the area size and vein type. Immediately after treatment, vessels may appear darker or change color, indicating successful targeting. Facial vessels often show immediate improvement, while leg veins typically require multiple sessions and may show gradual fading over several weeks. Compression garments may be recommended for leg vein treatments to support the vessel collapse process.",
  historyAndDevelopment: "The treatment of vascular veins with light-based technologies began in the 1960s when researchers noticed that intense light sources could selectively affect blood vessels. The first dedicated vascular laser, the pulsed dye laser (PDL), was developed in the 1980s specifically to treat port wine stains. It utilized the 585-595nm wavelength to target oxyhemoglobin with minimal damage to surrounding tissues. The 1990s saw the introduction of longer wavelength Nd:YAG lasers (1064nm) capable of reaching deeper vessels, particularly in the legs. The development of intense pulsed light systems in the mid-1990s offered a versatile alternative to lasers with adjustable wavelength ranges. Recent innovations include combined wavelength systems that can simultaneously target vessels at different depths, advanced cooling systems for enhanced comfort and safety, and microsecond pulse technologies that reduce purpura (bruising) while maintaining efficacy. These advancements have progressively expanded the range of treatable vascular conditions while improving safety profiles across different skin types.",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Vascular Vein Removal",
    "procedureType": "https://schema.org/CosmeticProcedure",
    "bodyLocation": "Face, Legs, and Body",
    "preparation": "Avoid sun exposure, certain medications, and alcohol before treatment",
    "howPerformed": "Non-invasive procedure using laser or light-based technology to target and collapse blood vessels",
    "indication": {
      "@type": "MedicalIndication",
      "name": "Spider veins, Telangiectasia, Cherry angiomas, Rosacea, Broken capillaries"
    }
    },
}; 