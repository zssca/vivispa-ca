export interface ServiceItem {
  name: string;
  url: string; 
  category?: string;
  subcategory?: string;
  price: string;
  oldPrice?: string;
  isSpecialOffer?: boolean;
  imagePath?: string;
  badge?: string;
  badges?: string[];
}

export interface ServiceCategory {
  name: string;
  services: ServiceItem[];
}

export interface LocationServices {
  location: string;
  categories: ServiceCategory[];
}

export interface LocationOffers {
  [location: string]: {
    [offerType: string]: ServiceItem[];
  };
}

// Shopping Cart Types
export interface Product {
  id: string;
  name: string;
  price: number; // Price in cents (Square format)
  currency: string;
  image?: string;
  images?: string[]; // Array of image URLs for carousel
  description?: string;
  category?: string;
  variationId?: string; // Square variation ID
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShoppingCart {
  items: CartItem[];
  total: number; // Total in cents
  currency: string;
}

export interface CheckoutData {
  cart: ShoppingCart;
  customerInfo?: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
} 