import { NextRequest, NextResponse } from 'next/server';
import { getSquareClient } from '@/lib/square-client';
import { getSquareConfig } from '@/lib/square-config';
import { ShoppingCart } from '@/types/data';
import { CustomerInfo, PaymentResult, SquarePaymentRequest } from '@/types/square';
import { randomUUID } from 'crypto';
import { Square } from 'square';

interface CheckoutRequest {
  sourceId: string; // Payment token from Square Web SDK
  cart: ShoppingCart;
  customerInfo: CustomerInfo;
}

interface SquareApiError {
  statusCode: number;
  errors?: Array<{
    code: string;
    detail: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();
    const { sourceId, cart, customerInfo } = body;

    // Validate required fields
    if (!sourceId || !cart || !customerInfo) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!customerInfo.email || !customerInfo.firstName) {
      return NextResponse.json(
        { success: false, error: 'Customer email and first name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Add defensive checks for cart structure
    if (!cart.items || !Array.isArray(cart.items) || cart.items.length === 0) {
      console.error('Cart validation failed:', {
        hasItems: !!cart.items,
        isArray: Array.isArray(cart.items),
        length: cart.items ? cart.items.length : 'undefined',
        cartStructure: JSON.stringify(cart, null, 2)
      });
      return NextResponse.json(
        { success: false, error: 'Cart is empty or invalid' },
        { status: 400 }
      );
    }

    // Validate cart total
    if (!cart.total || cart.total <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid cart total' },
        { status: 400 }
      );
    }

    // Get Square configuration
    const config = getSquareConfig();
    const locationId = config.locationIds.downtown;
    
    if (!locationId || locationId === 'your_downtown_location_id_here') {
      console.error('Square location ID not configured');
      return NextResponse.json(
        { success: false, error: 'Payment system configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Calculate tax (you can customize this based on your tax requirements)
    const taxRate = 0.05; // 5% tax rate
    const subtotal = cart.total;
    const taxAmount = Math.round(subtotal * taxRate);
    const totalAmount = subtotal + taxAmount;

    // Validate total amount
    if (totalAmount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment amount' },
        { status: 400 }
      );
    }

    // Create payment request
    const paymentRequest: SquarePaymentRequest = {
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(totalAmount),
        currency: (cart.currency as 'CAD' | 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AUD' | 'CHF' | 'CNY' | 'DKK' | 'NOK' | 'PLN' | 'SEK' | 'SGD' | 'ZAR') || 'CAD',
      },
      locationId,
      note: `Online purchase - ${cart.items.length} items - ${customerInfo.email}`,
      buyerEmailAddress: customerInfo.email,
      billingContact: {
        emailAddress: customerInfo.email,
        name: `${customerInfo.firstName} ${customerInfo.lastName || ''}`.trim(),
      },
    };

    console.log('Creating payment with Square:', {
      amount: totalAmount,
      currency: cart.currency,
      items: cart.items.length,
      customer: customerInfo.email,
      locationId,
      environment: config.environment,
    });

    const squareClient = getSquareClient();
    const paymentsApi = squareClient.payments;
    const response = await paymentsApi.create(paymentRequest);

    if (response.payment) {
      const payment = response.payment;
      
      // Payment successful
      console.log('Payment successful:', {
        paymentId: payment.id,
        status: payment.status,
        amount: payment.totalMoney?.amount,
        customerEmail: customerInfo.email,
      });
      
      // Here you could add additional logic like:
      // - Save order to database
      // - Send confirmation email
      // - Update inventory
      // - etc.

      const successResult: PaymentResult = {
        success: true,
        paymentId: payment.id || '',
        status: payment.status || '',
        totalAmount: totalAmount,
        currency: cart.currency,
        receiptUrl: payment.receiptUrl,
        orderNumber: payment.orderId || payment.id || '',
        message: 'Payment processed successfully',
        customerEmail: customerInfo.email,
      };

      return NextResponse.json(successResult);
    } else {
      console.error('Payment failed - no payment object returned');
      const errorResult: PaymentResult = {
        success: false,
        error: 'Payment processing failed. Please try again.',
      };
      return NextResponse.json(errorResult, { status: 500 });
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    
    // Handle Square API errors
    const squareError = error as SquareApiError;
    if (squareError.statusCode) {
      const firstError = squareError.errors?.[0];
      let errorMessage = 'Payment processing failed. Please try again.';
      
      // Provide more specific error messages based on Square error codes
      if (firstError?.code) {
        switch (firstError.code) {
          case 'CARD_DECLINED':
            errorMessage = 'Your card was declined. Please try a different payment method.';
            break;
          case 'INSUFFICIENT_FUNDS':
            errorMessage = 'Insufficient funds. Please try a different payment method.';
            break;
          case 'EXPIRED_CARD':
            errorMessage = 'Your card has expired. Please try a different payment method.';
            break;
          case 'INVALID_EXPIRATION':
            errorMessage = 'Invalid card expiration date. Please check your card details.';
            break;
          case 'INVALID_ACCOUNT':
            errorMessage = 'Invalid account. Please check your card details.';
            break;
          case 'CARD_NOT_SUPPORTED':
            errorMessage = 'This card type is not supported. Please try a different payment method.';
            break;
          case 'PAYMENT_LIMIT_EXCEEDED':
            errorMessage = 'Payment limit exceeded. Please try a smaller amount or different payment method.';
            break;
          default:
            errorMessage = firstError?.detail || errorMessage;
        }
      }
      
      const errorResult: PaymentResult = {
        success: false,
        error: errorMessage,
        code: firstError?.code,
      };
      
      return NextResponse.json(errorResult, { status: squareError.statusCode });
    }

    // Handle network or other errors
    const errorResult: PaymentResult = {
      success: false,
      error: 'Payment processing failed. Please check your connection and try again.',
    };
    return NextResponse.json(errorResult, { status: 500 });
  }
}

// Optional: Handle GET requests with information about payment methods
export async function GET() {
  const config = getSquareConfig();
  return NextResponse.json({
    message: 'Checkout API is running',
    acceptedMethods: ['POST'],
    supportedCurrencies: ['CAD', 'USD'],
    testMode: config.environment !== 'production',
    configured: !!(config.accessToken && config.locationIds.downtown),
    environment: config.environment,
  });
}