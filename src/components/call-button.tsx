'use client';

import * as React from 'react';
import { Phone } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from "@/lib/utils";
import { handlePhoneCall } from './whatsapp-chat/whatsapp-utils';

interface CallButtonProps {
  isVisible?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'floating' | 'inline';
  phoneNumber?: string;
  children?: React.ReactNode;
}

export function CallButton({ 
  isVisible = true, 
  className,
  size = 'md',
  variant = 'floating',
  phoneNumber,
  children 
}: CallButtonProps) {
  const handleCall = () => {
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`, '_self');
    } else {
      handlePhoneCall();
    }
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const variantClasses = {
    default: 'bg-primary hover:bg-primary/90 text-white',
    floating: 'bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg',
    inline: 'bg-transparent hover:bg-gray-100 text-primary border border-primary'
  };

  return (
    <Button
      onClick={handleCall}
      className={cn(
        sizeClasses[size],
        variantClasses[variant],
        'transition-all duration-200',
        isVisible 
          ? 'opacity-100' 
          : 'opacity-0 pointer-events-none',
        className
      )}
      aria-label="Call us"
    >
      {children || <Phone size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />}
    </Button>
  );
} 