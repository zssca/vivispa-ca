import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';
import { SectionHeaderSkeleton } from './skeletons';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  centered?: boolean;
  backgroundClass?: string;
  containerClass?: string;
  containerSize?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  topSpacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  bottomSpacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  loadingSkeleton?: React.ReactNode;
}

export function Section({
  title,
  description,
  children,
  centered = false,
  backgroundClass = '',
  containerClass = '',
  containerSize = 'default',
  spacing = 'md',
  topSpacing,
  bottomSpacing,
  className,
  isLoading = false,
  loadingSkeleton,
  ...props
}: SectionProps) {
  // Define spacing classes for different sizes
  const spacingValues = {
    none: '0',
    xs: 'py-4 sm:py-6 lg:py-8',
    sm: 'py-6 sm:py-8 lg:py-12',
    md: 'py-8 sm:py-12 lg:py-16',
    lg: 'py-12 sm:py-16 lg:py-24',
    xl: 'py-16 sm:py-24 lg:py-32'
  };

  // Define top/bottom specific spacing
  const topSpacingValues = {
    none: 'pt-0',
    xs: 'pt-4 sm:pt-6 lg:pt-8',
    sm: 'pt-6 sm:pt-8 lg:pt-12',
    md: 'pt-8 sm:pt-12 lg:pt-16',
    lg: 'pt-12 sm:pt-16 lg:pt-24',
    xl: 'pt-16 sm:pt-24 lg:pt-32'
  };

  const bottomSpacingValues = {
    none: 'pb-0',
    xs: 'pb-4 sm:pb-6 lg:pb-8',
    sm: 'pb-6 sm:pb-8 lg:pb-12',
    md: 'pb-8 sm:pb-12 lg:pb-16',
    lg: 'pb-12 sm:pb-16 lg:pb-24',
    xl: 'pb-16 sm:pb-24 lg:pb-32'
  };

  // Determine padding classes
  let paddingClasses = '';
  
  // If specific top or bottom spacing is provided, use those
  if (topSpacing || bottomSpacing) {
    const top = topSpacing ? topSpacingValues[topSpacing] : '';
    const bottom = bottomSpacing ? bottomSpacingValues[bottomSpacing] : '';
    paddingClasses = `${top} ${bottom}`;
  } else {
    // Otherwise use the combined spacing
    paddingClasses = spacingValues[spacing];
  }

  // Minimum height based on spacing
  const minHeightClasses = {
    none: '',
    xs: 'min-h-[100px]',
    sm: 'min-h-[150px]',
    md: 'min-h-[200px]',
    lg: 'min-h-[250px]',
    xl: 'min-h-[300px]'
  };

  const effectiveSpacing = spacing;

  return (
    <section 
      className={cn(
        "w-full", 
        paddingClasses,
        minHeightClasses[effectiveSpacing],
        backgroundClass, 
        className
      )}
      {...props}
    >
      <Container 
        className={containerClass} 
        size={containerSize}
      >
        {isLoading ? (
          <>
            {(title || description) && (
              <div className={cn(
                "max-w-7xl mb-6 sm:mb-8 lg:mb-12",
                centered ? "mx-auto text-center" : "text-left"
              )}>
                <SectionHeaderSkeleton />
              </div>
            )}
            {loadingSkeleton || (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {(title || description) && (
              <div className={cn(
                "max-w-7xl mb-6 sm:mb-8 lg:mb-12",
                centered ? "mx-auto text-center" : "text-left"
              )}>
                {title && (
                  <h2 className="scroll-m-20 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-2 sm:mb-3 lg:mb-4">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
                    {description}
                  </p>
                )}
              </div>
            )}
            {children}
          </>
        )}
      </Container>
    </section>
  );
}