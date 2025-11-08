'use client';

import { useState, useEffect } from 'react';
import { useShoppingCart } from '@/contexts/shopping-cart-context';
import { formatPrice } from '@/lib/square-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Separator } from '@/components/ui/separator';
import { CartItemCard } from '@/components/ui/cart-item-card';
import { ShoppingBag, Truck, Shield, Clock, Gift, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalItems } = useShoppingCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);


  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  // Calculate shipping threshold progress
  const freeShippingThreshold = 10000; // $100 in cents
  const shippingProgress = Math.min((cart.total / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingThreshold - cart.total, 0);

  if (cart.items.length === 0) {
    return (
      <Section>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            <p className="text-muted-foreground text-sm mt-1">Your cart is currently empty</p>
          </div>
          
          <Card className="border-0 bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="text-center max-w-md">
                <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Your Cart is Empty</h2>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven&apos;t added any products to your cart yet. Start shopping to fill it up!
                </p>
                <Link href="/shop">
                  <Button size="lg">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          {/* Title and Item Count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="lg"
                onClick={clearCart} 
                className="px-4 text-muted-foreground hover:text-destructive"
              >
                Clear Cart
              </Button>
              <Button asChild size="lg" className="px-4">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          {/* Free Shipping Progress */}
          {remainingForFreeShipping > 0 && (
            <Card className="border border-border bg-card">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-primary" />
                      <span className="font-medium">Free Shipping Progress</span>
                    </div>
                    <span className="text-sm text-primary font-semibold">
                      {formatPrice(remainingForFreeShipping, cart.currency)} away
                    </span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-primary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Add {formatPrice(remainingForFreeShipping, cart.currency)} more to qualify for free shipping!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {cart.total >= freeShippingThreshold && (
            <Card className="border border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Gift className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-primary mb-1">Congratulations! Free shipping unlocked</div>
                    <div className="text-sm text-muted-foreground">Your order qualifies for complimentary delivery</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Cart Items List */}
              <div className="space-y-6">
                {cart.items.map((item) => (
                  <CartItemCard
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-4">
              <Card className="border border-border bg-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
                      </span>
                      <span className="font-semibold">{formatPrice(cart.total, cart.currency)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-primary text-sm font-medium">
                        {cart.total >= 10000 ? 'FREE' : 'Calculated at checkout'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-muted-foreground">Calculated at checkout</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary">{formatPrice(cart.total, cart.currency)}</span>
                  </div>
                  
                  {cart.total < 10000 && (
                    <div className="bg-accent rounded-lg p-3 border border-border">
                      <p className="text-sm font-medium">
                        Add {formatPrice(10000 - cart.total, cart.currency)} more for free shipping!
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-3 pt-2">
                    <Link href="/shop/checkout" className="block">
                      <Button 
                        size="lg"
                        className="w-full text-base py-3"
                        disabled={isCheckingOut}
                        onClick={() => setIsCheckingOut(true)}
                      >
                        {isCheckingOut ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            Proceed to Checkout
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </Link>
                    
                    <Link href="/shop" className="block">
                      <Button variant="outline" size="lg" className="w-full text-base py-3 border-border">
                        Continue Shopping
                      </Button>
                    </Link>
                    
                    <div className="text-center pt-2">
                      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                        Save cart for later
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Security & Features */}
              <Card className="border border-border bg-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Secure & Convenient
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <Shield className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">256-bit SSL Encryption</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <Clock className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">30-Day Easy Returns</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <Truck className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">Same-Day Delivery</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <Gift className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">Gift Wrapping Available</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="text-center">
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      Trusted by 10,000+ customers
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}