// Unified UI Components Export
// These components provide consistent styling and behavior across the application

// Cards - using existing card component
export { Card as BaseCard, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './card';
export type { CardProps as BaseCardProps } from './card';

// Note: Unified card components have been consolidated into their base versions
// Use ServiceCard and FeatureCard from the main cards directory

// Sections - Updated component names (commented out - components don't exist)
// export { PageSection } from '../sections/page-section';
// export type { PageSectionProps } from '../sections/page-section';

// export { CTASection } from '../sections/cta-section';
// export type { CTASectionProps } from '../sections/cta-section';


// Layout - Updated component names (commented out - components don't exist)
// export { ResponsiveGrid, ResponsiveGridItem } from '../layout/responsive-grid';
// export type { ResponsiveGridProps, ResponsiveGridItemProps } from '../layout/responsive-grid';

// Buttons
export { Button, buttonVariants } from './button';
export type { ButtonProps } from './button';

// Layout and Sections (using existing components)
export { Container } from './container';
export { Section } from './section';

// Responsive Utilities (commented out - components don't exist)
// export { ResponsiveShow, ResponsiveHide, ResponsiveSpacing, ResponsiveText } from '../responsive/unified-responsive';
// export type { ResponsiveShowProps, ResponsiveHideProps, ResponsiveSpacingProps, ResponsiveTextProps } from '../responsive/unified-responsive';