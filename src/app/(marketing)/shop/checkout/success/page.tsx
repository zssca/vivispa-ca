'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useShoppingCart } from '@/contexts/shopping-cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { CheckCircle, XCircle, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useShoppingCart();
  const [status, setStatus] = useState<'loading' | 'success' | 'cancelled' | 'error'>('loading');

  useEffect(() => {
    // Check URL parameters to determine payment status
    const paymentStatus = searchParams.get('status');
    const orderId = searchParams.get('orderId');
    const transactionId = searchParams.get('transactionId');

    // Payment status processing

    if (paymentStatus === 'success' || transactionId) {
      setStatus('success');
      // Clear the cart after successful payment
      clearCart();
    } else if (paymentStatus === 'cancelled') {
      setStatus('cancelled');
    } else if (paymentStatus === 'error') {
      setStatus('error');
    } else {
      // If no clear status, assume success if we have transaction data
      setStatus(transactionId ? 'success' : 'cancelled');
    }
  }, [searchParams, clearCart]);

  // Success State
  if (status === 'success') {
    return (
      <Section spacing="md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h1 className="text-3xl font-bold mb-2 text-green-600">Payment Successful!</h1>
              <p className="text-muted-foreground mb-6">
                Thank you for your purchase. Your payment has been processed successfully.
              </p>
              
              <div className="bg-muted rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <ul className="text-sm text-muted-foreground space-y-1 text-left">
                  <li>• You will receive a confirmation email shortly</li>
                  <li>• Our team will contact you regarding product delivery</li>
                  <li>• For any questions, please contact us at support@viviaesthetics.ca</li>
                </ul>
              </div>
              
              <div className="flex gap-3 justify-center">
                <Link href="/shop">
                  <Button variant="outline">
                    Continue Shopping
                  </Button>
                </Link>
                
                <Link href="/">
                  <Button>
                    Return Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </Section>
    );
  }

  // Cancelled State
  if (status === 'cancelled') {
    return (
      <Section spacing="md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="p-8">
              <XCircle className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
              <h1 className="text-3xl font-bold mb-2 text-yellow-600">Payment Cancelled</h1>
              <p className="text-muted-foreground mb-6">
                Your payment was cancelled. Your cart items are still saved.
              </p>
              
              <div className="flex gap-3 justify-center">
                <Link href="/shop/checkout">
                  <Button>
                    Try Again
                  </Button>
                </Link>
                
                <Link href="/shop/cart">
                  <Button variant="outline">
                    Back to Cart
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </Section>
    );
  }

  // Error State
  if (status === 'error') {
    return (
      <Section spacing="md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="p-8">
              <XCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h1 className="text-3xl font-bold mb-2 text-red-600">Payment Error</h1>
              <p className="text-muted-foreground mb-6">
                There was an error processing your payment. Please try again or contact support.
              </p>
              
              <div className="flex gap-3 justify-center">
                <Link href="/shop/checkout">
                  <Button>
                    Try Again
                  </Button>
                </Link>
                
                <Link href="/contact">
                  <Button variant="outline">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </Section>
    );
  }

  // Loading State
  return (
    <Section spacing="md">
      <div className="max-w-2xl mx-auto text-center">
        <Card>
          <CardContent className="p-8">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <h1 className="text-2xl font-bold mb-2">Processing Payment...</h1>
            <p className="text-muted-foreground">
              Please wait while we confirm your payment status.
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <Section spacing="md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="p-8">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground animate-pulse" />
              <h1 className="text-2xl font-bold mb-2">Loading...</h1>
              <p className="text-muted-foreground">
                Please wait while we process your request.
              </p>
            </CardContent>
          </Card>
        </div>
        </div>
      </Section>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}