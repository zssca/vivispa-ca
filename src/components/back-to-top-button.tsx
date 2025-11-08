'use client';

import * as React from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BackToTopButtonProps {
  onVisibilityChange: (isVisible: boolean) => void;
  className?: string;
}

export function BackToTopButton({ onVisibilityChange, className }: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = React.useCallback(() => {
    const shouldBeVisible = window.scrollY > 300;
    if (shouldBeVisible !== isVisible) {
      setIsVisible(shouldBeVisible);
      onVisibilityChange(shouldBeVisible);
    }
  }, [isVisible, onVisibilityChange]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [toggleVisibility]);

  return (
    <Button
      variant="default"
      onClick={scrollToTop}
      className={cn(
        'h-12 w-12 rounded-full p-0 transition-opacity duration-200',
        'bg-gray-600 hover:bg-gray-700 text-white shadow-lg',
        isVisible
          ? 'opacity-100'
          : 'opacity-0 pointer-events-none',
        className
      )}
      aria-label="Scroll to top"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  );
} 