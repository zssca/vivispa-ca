'use client';

import Image from 'next/image';
import { CartItem } from '@/types/data';
import { formatPrice } from '@/lib/square-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  return (
    <Card className="border border-border bg-card">
      <CardContent className="p-4 sm:p-6">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            {(item.product.images && item.product.images.length > 0) || item.product.image ? (
              <Image 
                src={item.product.images?.[0] || item.product.image || '/assets/placeholder.webp'} 
                alt={item.product.name}
                width={96}
                height={96}
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
            <div className="fallback-icon w-full h-full flex items-center justify-center" style={{ display: (item.product.images && item.product.images.length > 0) || item.product.image ? 'none' : 'flex' }}>
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Header with Title and Remove Button */}
            <div className="flex justify-between items-start gap-3">
              <div className="min-w-0 flex-1 space-y-2">
                <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                  {item.product.name}
                </h3>
                {item.product.category && (
                  <p className="text-sm text-muted-foreground">
                    {item.product.category}
                  </p>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(item.product.id)}
                className="text-muted-foreground hover:text-destructive shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Price */}
            <div className="text-xl font-bold text-primary">
              {formatPrice(item.product.price, item.product.currency)}
            </div>
            
            {/* Controls and Total */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center justify-center sm:justify-start">
                <div className="flex items-center border border-border rounded-md bg-background">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    className="h-9 w-9 p-0 hover:bg-muted rounded-r-none"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex items-center justify-center w-12 h-9 text-sm font-semibold border-x border-border bg-muted/30">
                    {item.quantity}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    className="h-9 w-9 p-0 hover:bg-muted rounded-l-none"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="text-center sm:text-right">
                <p className="text-sm text-muted-foreground font-medium">Subtotal</p>
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(item.product.price * item.quantity, item.product.currency)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
