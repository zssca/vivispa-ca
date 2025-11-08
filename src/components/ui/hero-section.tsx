import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { HeroSectionSkeleton } from './skeletons'

export interface HeroSectionProps {
  title: string
  description: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  isLoading?: boolean
}

export function HeroSection({
  title,
  description,
  primaryCta,
  secondaryCta,
  isLoading = false
}: HeroSectionProps) {
  
  // Show skeleton loading state
  if (isLoading) {
    return <HeroSectionSkeleton />;
  }

  return (
    <section 
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden min-h-[350px] sm:min-h-[400px] lg:min-h-[500px]"
      aria-label="Hero section"
    >
      {/* Background with gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary/80"
        aria-hidden="true"
      ></div>
      
      {/* Content */}
      <Container size="lg" className="relative z-10 flex justify-center items-center h-full">
        <div className="w-full text-center">
          <h1 
            className="scroll-m-20 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-6xl mb-4 sm:mb-6"
          >
            {title}
          </h1>
          <p 
            className="text-base sm:text-lg lg:text-2xl text-muted-foreground leading-relaxed mb-6 sm:mb-8 max-w-3xl mx-auto"
          >
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            {primaryCta && (
              <Button 
                asChild 
                size="lg" 
                rounded="full"
                className="px-6 sm:px-8 py-5 sm:py-6 text-base font-medium"
              >
                <Link href={primaryCta.href}>
                  {primaryCta.text}
                </Link>
              </Button>
            )}
            
            {secondaryCta && (
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                rounded="full"
                className="px-6 sm:px-8 py-5 sm:py-6 text-base font-medium"
              >
                <Link href={secondaryCta.href}>
                  {secondaryCta.text}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}