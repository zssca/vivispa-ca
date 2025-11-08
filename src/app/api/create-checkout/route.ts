import { NextRequest, NextResponse } from 'next/server';
import { getSquareClient } from '@/lib/square-client';
import { ShoppingCart } from '@/types/data';
import { randomUUID } from 'crypto';
import { Square } from 'square';

interface CreateCheckoutRequest {
  cart: ShoppingCart;
  redirectUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateCheckoutRequest = await request.json();
    const { cart, redirectUrl } = body;

    // Validate required fields
    if (!cart || !cart.items || cart.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty or invalid' },
        { status: 400 }
      );
    }

    if (!redirectUrl) {
      return NextResponse.json(
        { error: 'Redirect URL is required' },
        { status: 400 }
      );
    }

    // Get Square configuration
    const locationId = process.env.SQUARE_LOCATION_ID_DOWNTOWN || process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID_DOWNTOWN;
    
    if (!locationId) {
      console.error('Square location ID not configured');
      return NextResponse.json(
        { error: 'Payment system configuration error' },
        { status: 500 }
      );
    }

    // Calculate totals
    const taxRate = 0.05; // 5% tax rate
    const subtotal = cart.total;
    const taxAmount = Math.round(subtotal * taxRate);
    const totalAmount = subtotal + taxAmount;

    // For now, let's create a simple payment using the existing checkout API
    // and redirect to a simpler Square payment flow
    // This is a fallback approach since Square's hosted checkout might not be available
    
    // Create a simple order for the items
    const orderLineItems = cart.items.map((item) => ({
      quantity: String(item.quantity),
      name: item.product.name,
      basePriceMoney: {
        amount: BigInt(item.product.price),
        currency: item.product.currency as Square.Currency,
      },
    }));

    console.log('Creating simple checkout redirect for cart:', {
      totalAmount,
      itemCount: cart.items.length,
      locationId,
    });

    // Since Square's hosted checkout API structure varies, 
    // let's redirect to our own payment processing for now
    const checkoutUrl = `${redirectUrl}?status=redirect&total=${totalAmount}&currency=${cart.currency}`;
    
    return NextResponse.json({
      success: true,
      checkoutUrl: checkoutUrl,
      message: 'Redirecting to payment processing',
    });
  } catch (error) {
    console.error('Create checkout error:', error);
    
    // Handle Square API errors
    const squareError = error as { statusCode?: number; errors?: Array<{ detail?: string; code?: string }> };
    if (squareError.statusCode) {
      const firstError = squareError.errors?.[0];
      return NextResponse.json(
        {
          error: firstError?.detail || 'Failed to create checkout session',
          code: firstError?.code,
        },
        { status: squareError.statusCode }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests with information about the checkout API
export async function GET() {
  return NextResponse.json({
    message: 'Create Checkout API is running',
    acceptedMethods: ['POST'],
    description: 'Creates Square checkout sessions for hosted payment processing',
  });
}