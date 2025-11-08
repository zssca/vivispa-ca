'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Service } from '@/types/service';

interface ServiceCategory {
  id: string;
  name: string;
  services: Service[];
}

interface ServiceCategoryFilterProps {
  categories: ServiceCategory[];
  className?: string;
  isLoading?: boolean;
}

export function ServiceCategoryFilter({ 
  categories, 
  className,
  isLoading = false
}: ServiceCategoryFilterProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  
  // Show skeleton loading state
  if (isLoading) {
    return (
      <div className={cn("flex flex-wrap items-center justify-center gap-3 px-1 py-2 mb-8", className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full" />
        ))}
      </div>
    );
  }
  
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-3 px-1 py-2 mb-8", className)}>
      <Button
        asChild
        variant={!currentCategory ? "default" : "outline"}
        size="sm"
        className="rounded-full transition-all duration-300 border border-border/60"
      >
        <Link href="/services">All Services</Link>
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category.id}
          asChild
          variant={currentCategory === category.id ? "default" : "outline"}
          size="sm"
          className="rounded-full transition-all duration-300 border border-border/60"
        >
          <Link href={`/services?category=${category.id}`}>
            {category.name}
          </Link>
        </Button>
      ))}
    </div>
  );
}