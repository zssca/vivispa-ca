// Define location coordinates type
export interface LocationCoordinates {
  lat: number;
  lng: number;
}

// Define address type
export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

// Define contact info type
export interface ContactInfo {
  phone: string;
  email: string;
  website?: string;
}

// Define business hours type
export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

// Define service type for booking
export interface BookingService {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  image?: string;
}

// Define time slot type
export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

// Define booking location type
export interface BookingLocation {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: Address;
  coordinates: LocationCoordinates;
  contactInfo: ContactInfo;
  businessHours: BusinessHours[];
  availableServices: BookingService[];
  sampleTimeSlots: TimeSlot[];
  image?: string;
  amenities?: string[];
  parkingInfo?: string;
  directions?: string;
}

// Define booking type
export interface Booking {
  id: string;
  locationId: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
} 