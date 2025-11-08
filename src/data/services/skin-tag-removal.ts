import { Service } from '@/types/service';

export const skinTagRemoval: Service & {  
  image: string;  
  scientificInfo?: string;  
  benefits?: string[];  
  procedure?: string;  
  historyAndDevelopment?: string;  
  structuredData?: Record<string, unknown>;
  availableLocations: string[];
  galleryImages: string[];
} = {
  id: "10",
  title: "Skin Tag Removal",
  slug: "skin-tag-removal",
  previewDescription: "Safe and effective skin tag and mole removal in Calgary.",
  fullDescription: "Achieve smooth, flawless skin with professional skin tag removal in Calgary at Vivi Aesthetics & Spa. Our gentle techniques safely eliminate unwanted skin growths with minimal discomfort—perfect for those seeking mole removal in Calgary.",
  keywords: ["skin tag removal calgary", "mole removal calgary", "skin lesion removal calgary", "acrochordon removal", "electrocautery treatment", "benign lesion removal", "dermatosis papulosa nigra"],
  image: "/assets/services/skin-tag-removal/skin-tag-removal-in-calgary-001.webp",
  
  // Gallery images with SEO-friendly filenames
  galleryImages: [
    "/assets/services/skin-tag-removal/skin-tag-removal-in-calgary-001.webp",
    "/assets/services/skin-tag-removal/skin-tag-removal-in-calgary-002.webp",
    "/assets/services/skin-tag-removal/skin-tag-removal-in-calgary-003.webp",
    "/assets/services/skin-tag-removal/skin-tag-removal-in-calgary-004.webp",
    "/assets/services/skin-tag-removal/skin-tag-removal-in-calgary-005.webp"
  ],
  
  // Available at both locations
  availableLocations: ['downtown', 'edmonton-trail'],
  
  scientificInfo: "Skin tags (acrochordons) are benign outgrowths of skin consisting of collagen fibers and blood vessels surrounded by an epithelial layer. While their exact cause remains unknown, they are associated with friction, hormonal factors, insulin resistance, and genetic predisposition. These lesions commonly develop in skin folds where friction occurs, such as the neck, axillae, groin, and eyelids. Unlike moles (nevi) which contain melanocytes, skin tags don't typically undergo malignant transformation. Professional removal techniques vary based on the lesion's size, location, and characteristics. Electrocautery uses high-frequency electrical current to cut and simultaneously coagulate tissue, minimizing bleeding. Cryotherapy employs extreme cold (typically liquid nitrogen at -196°C) to freeze and destroy lesion cells. Excision involves surgically removing the lesion with sterile instruments and may include histopathological examination when warranted. Laser ablation utilizes specific wavelengths that target the lesion's water content to vaporize tissue with minimal damage to surrounding structures.",
  benefits: [
    "Immediate removal of cosmetically concerning lesions",
    "Prevention of irritation from friction against clothing or jewelry",
    "Relief from discomfort caused by lesions in sensitive areas",
    "Multiple treatment options based on lesion characteristics and patient preferences",
    "Minimal scarring when performed by skilled professionals",
    "Histological analysis when appropriate to rule out malignancy",
    "Quick procedure with minimal recovery time"
  ],
  procedure: "Professional skin tag and benign lesion removal begins with a thorough assessment to determine the appropriate technique for each specific lesion. After cleansing the area, a topical or local anesthetic may be applied to ensure comfort. For electrocautery, a fine probe delivers a precise electrical current to remove the lesion while simultaneously sealing blood vessels. Cryotherapy involves applying liquid nitrogen directly to the lesion, causing cellular destruction through freezing. During excision, the specialist may use fine surgical instruments to snip the lesion at its base, followed by hemostasis and possibly a small suture. Laser ablation utilizes calibrated light energy to precisely vaporize the lesion. All removed tissue may be collected for histopathological examination if there are any concerning features. Post-procedure care typically involves keeping the area clean and protected, with complete healing occurring within 1-2 weeks depending on the technique used and lesion size. Results are immediate, with complete resolution of the treated lesions.",
  historyAndDevelopment: "The treatment of skin tags and benign lesions has evolved significantly throughout medical history. Ancient treatments dating back to Egyptian papyri included caustic plant extracts and rudimentary surgical techniques. By the 19th century, surgical excision became more refined with the introduction of antiseptic techniques and improved instruments. Electrocautery was developed in the early 20th century, offering simultaneous cutting and coagulation. Cryotherapy emerged in the 1940s with the medical application of liquid nitrogen, though its use for dermatological conditions became widespread in the 1960s. Laser technology for dermatological applications was introduced in the 1980s, with continued refinements in wavelength optimization and delivery systems improving precision and reducing recovery time. Recent innovations include radiofrequency devices, plasma technology, and combination approaches that offer enhanced cosmetic outcomes with minimal downtime. Modern techniques emphasize preserving aesthetic appearance while ensuring complete removal, with technological advances allowing for increasingly precise tissue interactions and improved healing profiles.",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Skin Tag and Benign Lesion Removal",
    "procedureType": "https://schema.org/CosmeticProcedure",
    "bodyLocation": "Various body locations",
    "preparation": "Assessment of lesions to determine appropriate removal technique",
    "howPerformed": "Minimally invasive procedures including electrocautery, cryotherapy, excision, or laser ablation",
    "indication": {
      "@type": "MedicalIndication",
      "name": "Skin tags, Benign moles, Seborrheic keratoses, Dermatosis papulosa nigra"
    }
  }
}; 
