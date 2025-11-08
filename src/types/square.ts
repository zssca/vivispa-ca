// Square SDK Types
export interface SquareSDK {
  payments: (applicationId: string, locationId: string) => SquarePayments;
}

export interface SquarePayments {
  card: () => Promise<SquareCard>;
}

export interface SquareCard {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<SquareTokenizeResult>;
}

export interface SquareTokenizeResult {
  status: 'OK' | 'ERROR';
  token?: string;
  errors?: SquareError[];
}

export interface SquareError {
  code: string;
  detail: string;
}

// Payment Result Types
export interface PaymentSuccessResult {
  success: true;
  paymentId: string;
  status: string;
  totalAmount: number;
  currency: string;
  receiptUrl?: string;
  orderNumber: string;
  message: string;
  customerEmail: string;
}

export interface PaymentErrorResult {
  success: false;
  error: string;
  code?: string;
}

export type PaymentResult = PaymentSuccessResult | PaymentErrorResult;

// Customer Information Types
export interface CustomerInfo {
  email: string;
  firstName: string;
  lastName?: string;
}

// Square Configuration Types
export interface SquareConfig {
  accessToken: string;
  environment: 'production' | 'sandbox';
  applicationId: string;
  locationIds: {
    downtown: string;
    edmontonTrail: string;
  };
  merchantId?: string;
}

// Square Catalog Types
export interface SquareCatalogItem {
  id: string;
  type: 'ITEM' | 'CATEGORY' | 'IMAGE';
  itemData?: SquareItemData;
  categoryData?: SquareCategoryData;
  imageData?: SquareImageData;
}

export interface SquareItemData {
  name: string;
  categoryId?: string;
  categories?: SquareCategory[];
  imageIds?: string[];
  variations?: SquareItemVariation[];
}

export interface SquareCategoryData {
  name: string;
}

export interface SquareImageData {
  url: string;
}

export interface SquareCategory {
  id: string;
  name: string;
}

export interface SquareItemVariation {
  id: string;
  type: 'ITEM_VARIATION';
  itemVariationData?: {
    name?: string;
    priceMoney?: {
      amount: number;
      currency: string;
    };
  };
}

// Square Service Types
export interface SquareService {
  id: string;
  name: string;
  categoryId?: string | null;
  price: {
    amount: number;
    currency: string;
  };
  image?: string;
  images?: string[];
  bookingUrl?: string;
  variations?: SquareServiceVariation[];
}

export interface SquareServiceVariation {
  id: string;
  name: string;
  price: {
    amount: number;
    currency: string;
  };
}

// Square Payment Types - Updated to match Square SDK
export interface SquarePaymentRequest {
  sourceId: string;
  idempotencyKey: string;
  amountMoney: {
    amount: bigint;
    currency: 'CAD' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CHF' | 'CNY' | 'DKK' | 'NOK' | 'PLN' | 'SEK' | 'SGD' | 'ZAR';
  };
  locationId: string;
  note?: string;
  buyerEmailAddress?: string;
  billingContact?: {
    emailAddress: string;
    name: string;
  };
}

export interface SquarePaymentResponse {
  payment?: SquarePayment;
  errors?: SquareError[];
}

export interface SquarePayment {
  id: string;
  status: string;
  totalMoney?: {
    amount: number;
    currency: string;
  };
  receiptUrl?: string;
  orderId?: string;
}

// Global Window Extension
declare global {
  interface Window {
    Square?: SquareSDK;
  }
} 