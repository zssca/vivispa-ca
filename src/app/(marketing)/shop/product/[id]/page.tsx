'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useShoppingCart } from '@/contexts/shopping-cart-context';
import { formatPrice } from '@/lib/square-client';
import { Product } from '@/types/data';

// UI Components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { Separator } from '@/components/ui/separator';

// Icons
import { ShoppingCart, Plus, Minus, ArrowLeft, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import Link from 'next/link';

// Utility function to create URL-friendly slug from product name
const createProductSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productSlug = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { addToCart, updateQuantity, getCartItemQuantity } = useShoppingCart();
  const quantity = product ? getCartItemQuantity(product.id) : 0;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/items');
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const products: Product[] = await response.json();
        const foundProduct = products.find(p => createProductSlug(p.name) === productSlug);
        
        if (!foundProduct) {
          setError('Product not found');
        } else {
          setProduct(foundProduct);
        }
      } catch (err) {
        setError('Failed to load product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productSlug) {
      fetchProduct();
    }
  }, [productSlug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (product) {
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product);
      router.push('/shop/cart');
    }
  };

  if (loading) {
    return (
      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-32"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-6 bg-muted rounded w-1/4"></div>
                  <div className="h-10 bg-muted rounded w-full"></div>
                </div>
              </div>
            </div>
        </div>
      </Section>
    );
  }

  if (error || !product) {
    return (
      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center py-16">
            <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/shop">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
        {/* Back Button */}
        <Link href="/shop">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Button>
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted border border-border">
              {(product.images && product.images.length > 0) || product.image ? (
                <Image 
                  src={product.images?.[0] || product.image || '/assets/placeholder.webp'} 
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              {product.category && (
                <Badge variant="secondary" className="border border-border">
                  {product.category}
                </Badge>
              )}
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground">
                {product.description || 'Premium spa product for your wellness journey'}
              </p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {formatPrice(product.price, product.currency)}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(124 reviews)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              {quantity === 0 ? (
                <div className="flex gap-3">
                  <Button onClick={handleAddToCart} className="flex-1">
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button onClick={handleBuyNow} variant="outline">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add & Go to Cart
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center border border-border rounded-md bg-background">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateQuantity(quantity - 1)}
                        className="h-9 w-9 p-0 hover:bg-muted rounded-r-none"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      
                      <div className="flex items-center justify-center w-12 h-9 text-sm font-semibold border-x border-border bg-muted/30">
                        {quantity}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateQuantity(quantity + 1)}
                        className="h-9 w-9 p-0 hover:bg-muted rounded-l-none"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Button onClick={handleBuyNow} className="w-full">
                    View Cart & Checkout
                  </Button>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="space-y-3">
              <Separator />
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>100% secure payment</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw className="w-4 h-4 text-primary" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <Card className="border border-border bg-card">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {product.description || `Experience the luxury of ${product.name}, carefully crafted to enhance your wellness journey. This premium spa product combines the finest ingredients with expert formulation to deliver exceptional results.`}
              </p>
              <div className="mt-6 space-y-2">
                <h3 className="font-medium">Key Benefits:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Premium quality ingredients</li>
                  <li>Professionally formulated</li>
                  <li>Suitable for all skin types</li>
                  <li>Cruelty-free and ethically sourced</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </Section>
  );
}