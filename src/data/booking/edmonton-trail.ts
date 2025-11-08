import { ServiceItem, ServiceCategory, LocationServices } from '@/types/data';

// ===============================================
// Edmonton Trail Hydroderma Facial services
// ===============================================
export const hydrodermaFacialServices: ServiceItem[] = [
  { name: "Hydroderma Facial - Deluxe", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=CTF3LY2FTMZIWENTV5R6GCOG&direct=true", category: "Hydroderma Facial", price: "$235.00" },
  { name: "Hydroderma Facial - Express", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=G6IMA6NDEI3YJ7YKLIQZQFEM&direct=true", category: "Hydroderma Facial", price: "$185.00" },
  { name: "Hydroderma Facial - Platinum Anti-Ageing", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=TYNZT4CEZWWDJ6D2NEWFFOSL&direct=true", category: "Hydroderma Facial", price: "$319.00" },
  { name: "Hydroderma Facial - Platinum Anti-Acne", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=2C2BFU35RFSFYKCOBIFW4ADZ&direct=true", category: "Hydroderma Facial", price: "$319.00" },
  { name: "Hydroderma Facial - Platinum Collagen", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=6GZDKHRZXCQFZRSEE2TT6LUX&direct=true", category: "Hydroderma Facial", price: "$319.00" }
];

// ===============================================
// Edmonton Trail Lash Extensions services
// ===============================================
export const lashServices: ServiceItem[] = [
  { name: "Lash Extensions - Strip Lashes Look", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=DSCTRLXIHUTARLFCYCX5ZUG3&direct=true", category: "Lash Extensions", price: "$265.00" },
  { name: "Lash Extensions - 2D Volume", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=ZUIRDB5BGEJ5XYH4BR2OBZEQ&direct=true", category: "Lash Extensions", price: "$138.00" },
  { name: "Lash Extensions - 3D Volume", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=BHVFVGMKNRZKQB5VCRJK5WWV&direct=true", category: "Lash Extensions", price: "$145.00" },
  { name: "Lash Extensions - 4D Volume", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=PYAO5PKIOBZCI6EVL5EHMFLW&direct=true", category: "Lash Extensions", price: "$158.00" },
  { name: "Lash Extensions - 5D Volume", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=CULJ7KIVOPLQBHATTZ7F75MR&direct=true", category: "Lash Extensions", price: "$165.00" },
  { name: "Lash Extensions - Mega Volume", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=X5GH4BZCGHZFTEIMILBZD4HQ&direct=true", category: "Lash Extensions", price: "$230.00" }
];

// ===============================================
// Edmonton Trail Skin Tag Removal services
// ===============================================
export const skinTagRemovalServices: ServiceItem[] = [
  { name: "Skin Tag Removal", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=WNDYH76I2H5YFE3BS6UTA337&direct=true", category: "Skin Tag Removal", price: "$50.00" }
];

// ===============================================
// Edmonton Trail Head Spa services
// ===============================================
export const headSpaServices: ServiceItem[] = [
  { name: "Relax Head Spa", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=LQETA3CTXK2CB7CIT67LDV7V&direct=true", category: "Signature Head Spa Treatments", price: "$119.00" },
  { name: "Premium Head Spa", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=HZ2AEFM6NC5LHQED6HLBCY5E&direct=true", category: "Signature Head Spa Treatments", price: "$119.00" },
  { name: "Luxury Head Spa", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=YGMXBXPIM3U3PPSYKJUEW6S5&direct=true", category: "Signature Head Spa Treatments", price: "$160.00" },
  { name: "Scalp Detox & Purification", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=RJ6DPUJMT354NNKO7OZHVG3N&direct=true", category: "Signature Head Spa Treatments", price: "$130.00" },
  { name: "Hydrating Scalp Therapy", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=PZZIQN5HW5WSAKAYSDJ7FZMQ&direct=true", category: "Signature Head Spa Treatments", price: "$129.00" },
  { name: "Hair Growth Stimulation", url: "https://squareup.com/appointments/book/LR77SHRSPMK0X/services?service_id=O6PLQWAPRCUXBSF4HFXM2FWT&direct=true", category: "Signature Head Spa Treatments", price: "$150.00" }
];

// ===============================================
// Build Edmonton Trail location service structure
// ===============================================
export const categories: ServiceCategory[] = [
  { name: "Hydroderma Facial", services: hydrodermaFacialServices },
  { name: "Lash Extensions", services: lashServices },
  { name: "Skin Tag Removal", services: skinTagRemovalServices },
  { name: "Signature Head Spa Treatments", services: headSpaServices }
];

export const edmontonTrailServices: LocationServices = {
  location: "Edmonton Trail",
  categories
};

export default edmontonTrailServices; 
