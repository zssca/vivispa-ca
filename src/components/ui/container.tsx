import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /**
   * Controls the max-width of the container
   * @default 'default'
   */
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
}

/**
 * Container component that provides consistent padding and max-width constraints
 * while allowing content to be centered within a full-width section
 */
export function Container({ 
  children, 
  className,
  size = 'default',
  ...props 
}: ContainerProps) {
  return (
    <div 
      className={cn(
        "w-full mx-auto px-4 sm:px-5 md:px-6 lg:px-8",
        {
          'max-w-3xl': size === 'sm',
          'max-w-7xl': size === 'default',
          'max-w-screen-xl': size === 'lg',
          'max-w-screen-2xl': size === 'xl',
          'max-w-none': size === 'full',
        }, 
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 