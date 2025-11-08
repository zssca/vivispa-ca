'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Service } from '@/types/service';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { ServiceCategorySkeleton } from './skeletons';

interface ServiceCategoryPreviewProps {
  id: string;
  name: string;
  services: Service[];
  className?: string;
  isLoading?: boolean;
}

export function ServiceCategoryPreview({ 
  id, 
  name, 
  services, 
  className,
  isLoading = false
}: ServiceCategoryPreviewProps) {
  
  // Show skeleton loading state
  if (isLoading) {
    return <ServiceCategorySkeleton />;
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-primary">
          {name}
        </h3>
        <Button variant="ghost" size="sm" asChild className="group transition-all duration-300 hover:bg-primary/5 rounded-full">
          <Link href={`/services?category=${id}`} className="flex items-center gap-1">
            View All <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
      
      <Separator className="bg-primary/10" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.slice(0, 3).map((service, index) => (
          <Link key={service.id} href={`/services/${service.slug}`} className="group block h-full">
            <Card className="flex flex-col h-full overflow-hidden bg-card border border-border/50">
              {service.image && (
                <div className="relative w-full aspect-[3/2] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-all duration-500 brightness-[0.98] group-hover:brightness-100"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col h-full">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-2 transition-colors duration-300 group-hover:text-primary">{service.title}</h4>
                <p className="text-sm text-muted-foreground leading-normal line-clamp-2 mb-auto">
                  {service.previewDescription}
                </p>
                <div className="flex items-center mt-3 text-sm text-primary font-medium transition-colors duration-300">
                  Learn more <ChevronRight className="h-3.5 w-3.5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}