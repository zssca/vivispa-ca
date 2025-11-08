'use client';

import Image from 'next/image';
import { Product } from '@/types/data';
import { formatPrice } from '@/lib/square-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
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

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
}

export function ProductCard({
  product,
  quantity,
  onAddToCart,
  onBuyNow,
  onUpdateQuantity,
}: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden border border-border bg-card">
      {/* Image Section */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="aspect-square bg-muted">
          {(product.images && product.images.length > 0) || product.image ? (
            <Image 
              src={product.images?.[0] || product.image || '/assets/placeholder.webp'} 
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.parentElement?.querySelector('.fallback-icon');
                if (fallback instanceof HTMLElement) {
                  fallback.style.display = 'flex';
                }
              }}
            />
          ) : null}
          <div className="fallback-icon absolute inset-0 bg-muted flex items-center justify-center" style={{ display: (product.images && product.images.length > 0) || product.image ? 'none' : 'flex' }}>
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
          </div>
        </div>
        
        {/* Category Badge */}
        {product.category && (
          <Badge className="absolute top-2 right-2 text-xs border border-border" variant="secondary">
            {product.category}
          </Badge>
        )}
      </div>
      
      {/* Content Section */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title and Description */}
        <div className="flex-1 space-y-3">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-foreground">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        {/* Price */}
        <div className="mt-4 mb-4">
          <div className="text-2xl font-bold text-primary">
            {formatPrice(product.price, product.currency)}
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-auto space-y-3">
          {quantity === 0 ? (
            <div className="space-y-3">
              <Button
                onClick={() => onAddToCart(product)}
                size="lg"
                className="w-full font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full"
              >
                <Link href={`/shop/product/${createProductSlug(product.name)}`}>
                  View Details
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Quantity Controls */}
              <div className="flex items-center justify-center">
                <div className="flex items-center border border-border rounded-md bg-background">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUpdateQuantity(product.id, quantity - 1)}
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
                    onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                    className="h-9 w-9 p-0 hover:bg-muted rounded-l-none"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full"
              >
                <Link href={`/shop/product/${createProductSlug(product.name)}`}>
                  View Details
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
