import { NextRequest, NextResponse } from 'next/server';
import { fetchServicesForLocation, formatPrice, generateBookingUrl } from '@/lib/square-client';
import { ServiceCategory, ServiceItem } from '@/types/data';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const location = searchParams.get('location');
    
    if (!location) {
      return NextResponse.json({ error: 'Location parameter is required' }, { status: 400 });
    }

    // Map location names to Square location IDs
    const locationIds: Record<string, string> = {
      'downtown': process.env.SQUARE_LOCATION_ID_DOWNTOWN!,
      'edmonton-trail': process.env.SQUARE_LOCATION_ID_EDMONTON!,
    };

    const locationId = locationIds[location];
    if (!locationId) {
      return NextResponse.json({ error: 'Invalid location' }, { status: 400 });
    }

    // Fetch data from Square
    const { services, categories } = await fetchServicesForLocation(locationId);

    // Transform Square data to match our existing format
    const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));
    
    // Debug: Log categories and services
    console.log('Available categories:', categories);
    console.log('Services with categories:', services.map(s => ({ name: s.name, categoryId: s.categoryId })));
    
    // Group services by category
    const servicesByCategory = new Map<string, ServiceItem[]>();
    
    services.forEach(service => {
      const categoryName = service.categoryId 
        ? categoryMap.get(service.categoryId) || 'Other Services'
        : 'Other Services';
      
      console.log(`Service "${service.name}" -> Category "${categoryName}"`);
      
      if (!servicesByCategory.has(categoryName)) {
        servicesByCategory.set(categoryName, []);
      }

      // Debug: Log the service details
      console.log(`Service: ${service.name}, Catalog Item ID: ${service.id}, Category: ${categoryName}`);
      
      // Use the catalog item ID for booking (like n1nailbeautybar does)
      servicesByCategory.get(categoryName)!.push({
        name: service.name,
        url: generateBookingUrl(locationId, service.id),
        category: categoryName,
        price: formatPrice(service.price.amount, service.price.currency),
      });
    });

    // Convert to our expected format
    const formattedCategories: ServiceCategory[] = Array.from(servicesByCategory.entries())
      .map(([name, services]) => ({ name, services }))
      .sort((a, b) => {
        // Put Limited-Time Offers first
        if (a.name === '(Limited-Time Offers)') return -1;
        if (b.name === '(Limited-Time Offers)') return 1;
        return a.name.localeCompare(b.name);
      });

    return NextResponse.json({
      location: location === 'downtown' ? 'Downtown' : 'Edmonton Trail',
      categories: formattedCategories,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}