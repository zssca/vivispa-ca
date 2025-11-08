import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface LoadingWrapperProps {
  isLoading: boolean;
  skeleton?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * A wrapper component that shows skeleton loading when isLoading is true
 * and renders children when loading is complete
 */
export function LoadingWrapper({ 
  isLoading, 
  skeleton, 
  children, 
  className 
}: LoadingWrapperProps) {
  if (isLoading) {
    return (
      <div className={cn('animate-pulse', className)}>
        {skeleton || <DefaultSkeleton />}
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * Default skeleton to use when no custom skeleton is provided
 */
function DefaultSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

/**
 * Text loading component for inline text content
 */
interface TextLoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
  width?: string;
  height?: string;
  className?: string;
}

export function TextLoading({ 
  isLoading, 
  children, 
  width = 'w-32', 
  height = 'h-4',
  className 
}: TextLoadingProps) {
  if (isLoading) {
    return <Skeleton className={cn(height, width, className)} />;
  }

  return <>{children}</>;
}

/**
 * Image loading component
 */
interface ImageLoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
  aspectRatio?: string;
  className?: string;
}

export function ImageLoading({ 
  isLoading, 
  children, 
  aspectRatio = 'aspect-square',
  className 
}: ImageLoadingProps) {
  if (isLoading) {
    return <Skeleton className={cn(aspectRatio, 'w-full', className)} />;
  }

  return <>{children}</>;
}

/**
 * Button loading component
 */
interface ButtonLoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
  width?: string;
  height?: string;
  className?: string;
}

export function ButtonLoading({ 
  isLoading, 
  children, 
  width = 'w-24', 
  height = 'h-10',
  className 
}: ButtonLoadingProps) {
  if (isLoading) {
    return <Skeleton className={cn(height, width, 'rounded-full', className)} />;
  }

  return <>{children}</>;
}

/**
 * Card loading component
 */
interface CardLoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
  hasImage?: boolean;
  imageAspectRatio?: string;
  className?: string;
}

export function CardLoading({ 
  isLoading, 
  children, 
  hasImage = false,
  imageAspectRatio = 'aspect-[3/2]',
  className 
}: CardLoadingProps) {
  if (isLoading) {
    return (
      <div className={cn('border rounded-lg overflow-hidden', className)}>
        {hasImage && (
          <Skeleton className={cn(imageAspectRatio, 'w-full')} />
        )}
        <div className="p-6 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
