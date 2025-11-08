'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useShoppingCart } from '@/contexts/shopping-cart-context';
import { formatPrice } from '@/lib/square-client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShoppingBag, CreditCard, Shield, ArrowRight, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart, getTotalItems } = useShoppingCart();
  const router = useRouter();
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to proceed to payment
  const handleProceedToPayment = async () => {
    setIsCreatingCheckout(true);
    setError(null);

    try {
      // For development/localhost: show info about HTTPS requirement
      if (window.location.protocol === 'http:' && window.location.hostname === 'localhost') {
        setError('Note: Payment autofill is disabled on localhost. This will work properly on HTTPS in production.');
      }
      
      // Redirect to our existing payment flow but with better UX
      window.location.href = '/shop/checkout/payment';
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Unable to proceed to payment. Please try again.');
    } finally {
      setIsCreatingCheckout(false);
    }
  };

  // Redirect to cart if cart is empty
  if (cart.items.length === 0) {
    return (
      <Section spacing="md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-20">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-semibold mb-3">No items to checkout</h1>
            <p className="text-muted-foreground text-sm mb-6">
              Your cart is empty. Add some products before proceeding to checkout.
            </p>
            <Link href="/shop">
              <Button className="h-10 px-6">
                Go Shopping
              </Button>
            </Link>
          </div>
          </div>
        </div>
      </Section>
    );
  }

  // Calculate totals
  const subtotal = cart.total;
  const taxAmount = Math.round(subtotal * 0.05); // 5% tax
  const totalAmount = subtotal + taxAmount;

  // Main Checkout State
  return (
    <Section spacing="md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold mb-2">Checkout</h1>
              <p className="text-muted-foreground text-sm">
                Review your order and complete your secure purchase
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs px-2 py-1">
                Secure
              </Badge>
              <Badge variant="outline" className="text-xs px-2 py-1">
                SSL Protected
              </Badge>
            </div>
          </div>
        </div>

        {/* Development Warning */}
        {typeof window !== 'undefined' && window.location.hostname === 'localhost' && (
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Development Mode:</strong> You&apos;re running on localhost. In production, 
              this checkout will have enhanced security features and better payment processing.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <Card className="border-0 bg-card">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cart.items.map((item) => (
                      <div key={item.product.id} className="flex items-start gap-3 py-2">
                        <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
                          <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Qty: {item.quantity}
                            {item.product.category && ` • ${item.product.category}`}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-medium text-sm">
                            {formatPrice(item.product.price * item.quantity, item.product.currency)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>{formatPrice(subtotal, cart.currency)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Tax (5%)</span>
                      <span>{formatPrice(taxAmount, cart.currency)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(totalAmount, cart.currency)}</span>
                    </div>
                  </div>

                  {/* Back to Cart */}
                  <div className="pt-4">
                    <Link href="/shop/cart">
                      <Button variant="outline" className="h-12 px-6 border-border">
                        ← Back to Cart
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-4">
                <Card className="border-0 bg-card">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Secure Payment
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Powered by Square</span>
                      </div>
                      
                      <div className="bg-muted/50 rounded-md p-3">
                        <h4 className="font-medium text-sm mb-2">Secure Payment Features</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• 256-bit SSL encryption</li>
                          <li>• PCI DSS compliant</li>
                          <li>• All major credit cards</li>
                          <li>• Apple Pay & Google Pay</li>
                        </ul>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleProceedToPayment} 
                      disabled={isCreatingCheckout}
                      className="w-full h-12 text-base"
                    >
                      {isCreatingCheckout ? (
                        'Processing...'
                      ) : (
                        <>
                          Proceed to Payment
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center leading-relaxed">
                      You&apos;ll be redirected to our secure payment page
                    </p>
                  </CardContent>
                </Card>

                {/* Trust Signals */}
                <Card className="border-0 bg-muted/30">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-muted-foreground">Instant Order Confirmation</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-muted-foreground">24/7 Customer Support</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-muted-foreground">Money-Back Guarantee</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
      </div>
    </Section>
  );
}