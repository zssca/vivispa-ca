'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShoppingCart } from '@/contexts/shopping-cart-context';
import { SquarePaymentForm } from '@/components/ui/square-payment-form';
import { formatPrice } from '@/lib/square-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, ShoppingBag, AlertTriangle, Shield, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { PaymentResult } from '@/types/square';

export default function PaymentPage() {
  const { cart, clearCart, getTotalItems } = useShoppingCart();
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Add loading state to handle cart initialization
  useEffect(() => {
    // Give time for cart to load from localStorage
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show loading state while cart is initializing
  if (isLoading) {
    return (
      <Section spacing="md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading your cart...</p>
          </div>
        </div>
      </Section>
    );
  }

  // Redirect to cart if cart is empty
  if (cart.items.length === 0 && paymentStatus === 'idle') {
    return (
      <Section spacing="md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-2">No items to checkout</h1>
            <p className="text-muted-foreground mb-6">
              Your cart is empty. Add some items before proceeding to payment.
            </p>
            
            {/* Debug information in development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-muted rounded-lg p-4 mb-6 text-left text-sm">
                <h3 className="font-semibold mb-2">Debug Info:</h3>
                <p>Cart Items: {cart.items.length}</p>
                <p>Cart Total: {formatPrice(cart.total, cart.currency)}</p>
                <p>Local Storage Key: vivispa-shopping-cart</p>
              </div>
            )}
            
            <div className="flex gap-3 justify-center">
              <Link href="/shop">
                <Button size="lg">
                  Go Shopping
                </Button>
              </Link>
              
              <Link href="/shop/cart">
                <Button variant="outline" size="lg">
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  const handlePaymentSuccess = (result: PaymentResult) => {
    setPaymentStatus('success');
    setPaymentResult(result);
    clearCart(); // Clear cart after successful payment
  };

  const handlePaymentError = (error: PaymentResult) => {
    setPaymentStatus('error');
    setPaymentResult(error);
  };

  const handleTryAgain = () => {
    setPaymentStatus('idle');
    setPaymentResult(null);
  };

  // Payment Success State
  if (paymentStatus === 'success') {
    return (
      <Section spacing="md">
        <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h1 className="text-3xl font-bold mb-2 text-green-600">Payment Successful!</h1>
              <p className="text-muted-foreground mb-6">
                Thank you for your purchase. Your payment has been processed successfully.
              </p>
              
              {paymentResult && paymentResult.success && (
                <div className="bg-muted rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold mb-2">Payment Details:</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Order Number:</strong> {paymentResult.orderNumber}</p>
                    <p><strong>Payment ID:</strong> {paymentResult.paymentId}</p>
                    <p><strong>Amount:</strong> {formatPrice(paymentResult.totalAmount, paymentResult.currency)}</p>
                    <p><strong>Status:</strong> {paymentResult.status}</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  You will receive a confirmation email shortly with your purchase details.
                </p>
                
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
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </Section>
    );
  }

  // Payment Error State
  if (paymentStatus === 'error') {
    return (
      <Section spacing="md">
        <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="p-8">
              <XCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h1 className="text-3xl font-bold mb-2 text-red-600">Payment Failed</h1>
              <p className="text-muted-foreground mb-6">
                We were unable to process your payment. Please try again.
              </p>
              
              {paymentResult && !paymentResult.success && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold mb-2 text-red-800">Error Details:</h3>
                  <p className="text-sm text-red-700">
                    {paymentResult.error}
                  </p>
                </div>
              )}
              
              <div className="flex gap-3 justify-center">
                <Button onClick={handleTryAgain}>
                  Try Again
                </Button>
                
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

  // Check if running on localhost and show warning
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  // Main Payment State
  return (
    <Section spacing="md" containerSize="lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Secure Payment</h1>
          <p className="text-muted-foreground text-sm">
            Complete your purchase with Square&apos;s secure payment processing
          </p>
        </div>

          {/* Development warning */}
          {isLocalhost && (
            <Alert className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Development Note:</strong> Payment autofill is disabled on localhost. 
                In production with HTTPS, browsers will enable secure autofill features for a better user experience.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cart.items.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatPrice(item.product.price * item.quantity, item.product.currency)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>{formatPrice(cart.total, cart.currency)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Tax (5%)</span>
                      <span>{formatPrice(Math.round(cart.total * 0.05), cart.currency)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(cart.total + Math.round(cart.total * 0.05), cart.currency)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Form */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-lg">Secure Payment Processing</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your payment information is processed securely by Square and never stored on our servers.
                </p>
              </div>
              
              <SquarePaymentForm
                cart={cart}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            </div>
          </div>
      </div>
    </Section>
  );
}