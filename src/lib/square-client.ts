import { SquareClient, SquareEnvironment } from 'square';
import { getSquareConfig, isSquareConfigured } from './square-config';
import { 
  SquareService, 
  SquareCategory, 
  SquareCatalogItem, 
  SquareItemData, 
  SquareCategory as SquareCategoryType,
  SquareItemVariation 
} from '@/types/square';

// This should only be used on the server side
function createSquareClient() {
  if (!isSquareConfigured()) {
    throw new Error('Square is not properly configured. Please check your environment variables.');
  }

  const config = getSquareConfig();
  const environment = config.environment === 'production' 
    ? SquareEnvironment.Production 
    : SquareEnvironment.Sandbox;

  return new SquareClient({
    token: config.accessToken,
    environment,
  });
}

// Only create the client when needed (server-side only)
export const getSquareClient = () => {
  if (typeof window !== 'undefined') {
    throw new Error('Square client can only be used on the server side');
  }
  return createSquareClient();
};

// For backward compatibility, but this will error on client side
export const squareClient = typeof window === 'undefined' ? createSquareClient() : null;

export async function fetchServicesForLocation(locationId: string) {
  try {
    const squareClient = getSquareClient();
    // Use Catalog API to get services (like n1nailbeautybar)
    console.log('Fetching catalog items for location:', locationId);
    
    const catalogResponse = await squareClient.catalog.searchItems({
      enabledLocationIds: [locationId],
      productTypes: ['APPOINTMENTS_SERVICE']
    });

    const items = catalogResponse.items || [];
    console.log('Raw catalog items:', items.length);
    
    // Collect all category IDs from items
    const categoryIds = new Set<string>();
    items.forEach(item => {
      if (item.type === 'ITEM' && (item as SquareCatalogItem).itemData) {
        const itemData = (item as SquareCatalogItem).itemData!;
        if (itemData.categoryId) {
          categoryIds.add(itemData.categoryId);
        }
        if (itemData.categories) {
          itemData.categories.forEach((cat: SquareCategoryType) => {
            if (cat.id) categoryIds.add(cat.id);
          });
        }
      }
    });

    // Fetch categories
    const categories: SquareCategory[] = [];
    if (categoryIds.size > 0) {
      const categoryResponse = await squareClient.catalog.batchGet({
        objectIds: Array.from(categoryIds)
      });
      
      const categoryObjects = categoryResponse.objects || [];
      categoryObjects.forEach(cat => {
        if (cat.type === 'CATEGORY' && cat.categoryData) {
          categories.push({
            id: cat.id!,
            name: cat.categoryData.name || ''
          });
        }
      });
    }

    // Transform items to services
    const services: SquareService[] = items
      .filter(item => item.type === 'ITEM')
      .map(item => {
        const itemData = (item as SquareCatalogItem).itemData!;
        const variations = itemData.variations || [];
        
        // Get price from first variation
        let price = { amount: 0, currency: 'CAD' };
        if (variations.length > 0) {
          const firstVariation = variations[0];
          if (firstVariation && firstVariation.type === 'ITEM_VARIATION' && firstVariation.itemVariationData?.priceMoney) {
            const priceMoney = firstVariation.itemVariationData.priceMoney;
            price = {
              amount: Number(priceMoney.amount) || 0,
              currency: priceMoney.currency || 'CAD'
            };
          }
        }

        // Get category ID
        let categoryId = itemData.categoryId;
        if (!categoryId && itemData.categories && itemData.categories.length > 0) {
          categoryId = itemData.categories[0]?.id;
        }

        return {
          id: item.id!,
          name: itemData.name || '',
          categoryId: categoryId,
          price,
          image: itemData.imageIds && itemData.imageIds.length > 0 ? itemData.imageIds[0] : undefined,
          bookingUrl: generateBookingUrl(locationId, item.id!),
          variations: variations
            .filter((v: SquareItemVariation) => v.type === 'ITEM_VARIATION')
            .map((v: SquareItemVariation) => ({
              id: v.id!,
              name: v.itemVariationData?.name || '',
              price: v.itemVariationData?.priceMoney ? {
                amount: Number(v.itemVariationData.priceMoney.amount) || 0,
                currency: v.itemVariationData.priceMoney.currency || 'CAD'
              } : { amount: 0, currency: 'CAD' }
            }))
        };
      });

    return { services, categories };
  } catch (error) {
    console.error('Error fetching Square services:', error);
    throw error;
  }
}

export async function fetchItemsForLocation(locationId: string) {
  try {
    const squareClient = getSquareClient();
    console.log('Fetching catalog items (products) for location:', locationId);
    
    const catalogResponse = await squareClient.catalog.searchItems({
      enabledLocationIds: [locationId],
      productTypes: ['REGULAR'] // Fetch regular items/products, not services
    });

    const items = catalogResponse.items || [];
    console.log('Raw catalog items (products):', items.length);

    // Collect all image IDs to fetch their URLs
    const imageIds = new Set<string>();
    items.forEach(item => {
      if (item.type === 'ITEM' && (item as SquareCatalogItem).itemData) {
        const itemData = (item as SquareCatalogItem).itemData!;
        if (itemData.imageIds && itemData.imageIds.length > 0) {
          itemData.imageIds.forEach((imageId: string) => {
            imageIds.add(imageId);
          });
        }
      }
    });

    // Fetch image objects to get URLs
    const imageMap = new Map<string, string>();
    if (imageIds.size > 0) {
      try {
        const imageResponse = await squareClient.catalog.batchGet({
          objectIds: Array.from(imageIds)
        });
        
        const imageObjects = imageResponse.objects || [];
        imageObjects.forEach(imageObj => {
          if (imageObj.type === 'IMAGE' && imageObj.imageData?.url) {
            imageMap.set(imageObj.id!, imageObj.imageData.url);
          }
        });
      } catch (imageError) {
        console.warn('Error fetching images:', imageError);
      }
    }
    
    // Collect all category IDs from items
    const categoryIds = new Set<string>();
    items.forEach(item => {
      if (item.type === 'ITEM' && (item as SquareCatalogItem).itemData) {
        const itemData = (item as SquareCatalogItem).itemData!;
        if (itemData.categoryId) {
          categoryIds.add(itemData.categoryId);
        }
        if (itemData.categories) {
          itemData.categories.forEach((cat: SquareCategoryType) => {
            if (cat.id) categoryIds.add(cat.id);
          });
        }
      }
    });

    // Fetch categories
    const categories: SquareCategory[] = [];
    if (categoryIds.size > 0) {
      const categoryResponse = await squareClient.catalog.batchGet({
        objectIds: Array.from(categoryIds)
      });
      
      const categoryObjects = categoryResponse.objects || [];
      categoryObjects.forEach(cat => {
        if (cat.type === 'CATEGORY' && cat.categoryData) {
          categories.push({
            id: cat.id!,
            name: cat.categoryData.name || ''
          });
        }
      });
    }

    // Transform items to SquareService format (can be used for products too)
    const products: SquareService[] = items
      .filter(item => item.type === 'ITEM' && item.itemData)
      .map((item, index) => {
        const itemData = (item as SquareCatalogItem).itemData!;
        
        // Get category ID
        let categoryId = itemData.categoryId;
        if (!categoryId && itemData.categories && itemData.categories.length > 0) {
          categoryId = itemData.categories[0]?.id;
        }

        // Get all image URLs
        const imageUrls: string[] = [];
        let primaryImageUrl: string | undefined = undefined;
        
        if (itemData.imageIds && itemData.imageIds.length > 0) {
          itemData.imageIds.forEach((imageId: string) => {
            const imageUrl = imageMap.get(imageId);
            if (imageUrl) {
              imageUrls.push(imageUrl);
              if (!primaryImageUrl) {
                primaryImageUrl = imageUrl; // First image is primary
              }
            }
          });
        }

        return {
          id: item.id!,
          name: itemData.name || '',
          categoryId,
          bookingUrl: '', // Items don't have booking URLs
          image: primaryImageUrl,
          images: imageUrls,
          price: itemData.variations && itemData.variations.length > 0 && itemData.variations[0]?.itemVariationData
            ? itemData.variations[0].itemVariationData.priceMoney
              ? {
                  amount: Number(itemData.variations[0].itemVariationData.priceMoney.amount || 0),
                  currency: itemData.variations[0].itemVariationData.priceMoney.currency || 'CAD'
                }
              : { amount: 0, currency: 'CAD' }
            : { amount: 0, currency: 'CAD' }
        };
      });

    // Group products by category
    const categorizedProducts = categories.map(category => ({
      id: category.id,
      name: category.name,
      services: products.filter(product => product.categoryId === category.id)
    }));

    // Add uncategorized products
    const uncategorizedProducts = products.filter(product => !product.categoryId);
    if (uncategorizedProducts.length > 0) {
      categorizedProducts.push({
        id: 'uncategorized',
        name: 'Other Products',
        services: uncategorizedProducts
      });
    }

    return { services: products, categories: categorizedProducts };
  } catch (error) {
    console.error('Error fetching Square items:', error);
    throw error;
  }
}

export function formatPrice(amount: number, currency: string = 'CAD'): string {
  // Square amounts are in cents, so divide by 100
  const dollars = amount / 100;
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency,
  }).format(dollars);
}

export function generateBookingUrl(locationId: string, serviceId: string): string {
  // Use the correct Square booking URL format like n1nailbeautybar
  // https://book.squareup.com/appointments/{merchant_id}/location/{location_id}/services/{service_id}
  
  const config = getSquareConfig();
  const merchantId = config.merchantId;
  
  if (!merchantId) {
    console.error('SQUARE_MERCHANT_ID not found in environment variables');
    return `#booking-error`;
  }
  
  return `https://book.squareup.com/appointments/${merchantId}/location/${locationId}/services/${serviceId}`;
}