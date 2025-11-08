import { NextRequest, NextResponse } from 'next/server';
import { fetchItemsForLocation, formatPrice, generateBookingUrl } from '@/lib/square-client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location') || 'downtown';
    
    // Map location names to IDs
    const locationMap: Record<string, string> = {
      'downtown': process.env.SQUARE_LOCATION_ID_DOWNTOWN || '',
      'edmonton': process.env.SQUARE_LOCATION_ID_EDMONTON || '',
    };
    
    const locationId = locationMap[location.toLowerCase()];
    
    if (!locationId) {
      return NextResponse.json(
        { error: 'Invalid location specified' },
        { status: 400 }
      );
    }

    console.log(`Fetching items for location: ${location} (${locationId})`);
    
    const { services: items, categories } = await fetchItemsForLocation(locationId);
    
    console.log(`Found ${items.length} items in ${categories.length} categories`);
    
    // If no items from Square, create some test products for development
    if (items.length === 0) {
      console.log('No items from Square API, creating test products');
      const testProducts = [
        {
          id: 'test-1',
          name: 'Hydrating Face Serum',
          price: { amount: 4500, currency: 'CAD' },
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
          images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop']
        },
        {
          id: 'test-2',
          name: 'Luxury Moisturizer',
          price: { amount: 6500, currency: 'CAD' },
          image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
          images: ['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop']
        },
        {
          id: 'test-3',
          name: 'Anti-Aging Cream',
          price: { amount: 8900, currency: 'CAD' },
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
          images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop']
        },
        {
          id: 'test-4',
          name: 'Vitamin C Serum',
          price: { amount: 5500, currency: 'CAD' },
          image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop',
          images: ['https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop']
        },
        {
          id: 'test-5',
          name: 'Essential Oil Blend',
          price: { amount: 3500, currency: 'CAD' },
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
          images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop']
        }
      ];
      
      const testCategories = [{
        id: 'skincare',
        name: 'Skincare',
        services: testProducts
      }];
      
      const products = testProducts.map((item, index) => ({
        id: item.id,
        name: item.name,
        description: `Premium ${item.name}`,
        price: item.price.amount,
        currency: item.price.currency,
        image: item.image,
        images: item.images,
        category: 'Skincare',
      }));
      
      console.log(`Returning ${products.length} test products`);
      console.log('First test product:', products[0]);
      
      return NextResponse.json(products);
    }
    
    // Create a category lookup map
    const categoryMap = new Map();
    categories.forEach(category => {
      if (category.services) {
        category.services.forEach(service => {
          categoryMap.set(service.id, category.name);
        });
      }
    });
    
    // Create placeholder images if none exist
    const getPlaceholderImage = (index: number) => {
      const placeholders = [
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
      ];
      return placeholders[index % placeholders.length];
    };
    
    // Return flat array of products that matches the Product interface
    const products = items.map((item, index) => {
      const hasValidImage = item.image && item.image.trim() !== '';
      const hasValidImages = item.images && item.images.length > 0 && item.images.some(img => img && img.trim() !== '');
      
      // Use actual images if available, otherwise use placeholders
      const productImage = hasValidImage ? item.image : getPlaceholderImage(index);
      const productImages = hasValidImages ? item.images : [getPlaceholderImage(index)];
      
      return {
        id: item.id,
        name: item.name,
        description: `Premium ${item.name}`, // Add a default description
        price: item.price.amount, // Keep as cents for consistency
        currency: item.price.currency,
        image: productImage,
        images: productImages,
        category: categoryMap.get(item.id) || 'Other Products',
      };
    });
    
    console.log(`Returning ${products.length} products`);
    console.log('Sample product with images:', products[0]);
    
    return NextResponse.json(products);
    
  } catch (error) {
    console.error('Error in items API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}