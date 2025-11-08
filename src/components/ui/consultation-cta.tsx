import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ConsultationCTAProps {
  title?: string
  description?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonHref?: string
  className?: string
}

export function ConsultationCTA({
  title = "Not Sure Which Service Is Right For You?",
  description = "Our team of experts can help you choose the perfect treatment based on your skin type and goals. Schedule a consultation today.",
  primaryButtonText = "Book Appointment",
  secondaryButtonText = "Contact Us",
  primaryButtonHref = "/booking",
  secondaryButtonHref = "/contact",
  className
}: ConsultationCTAProps) {
  return (
    <Card className={cn("bg-muted border-0", className)}>
      <CardHeader className="text-center py-4 sm:py-5 px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl md:text-3xl">
          {title}
        </CardTitle>
        <CardDescription className="text-sm sm:text-base max-w-2xl mx-auto">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pb-6 sm:pb-8 px-4 sm:px-6">
        <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-medium">
          <Link href={primaryButtonHref}>
            {primaryButtonText}
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-base font-medium">
          <Link href={secondaryButtonHref}>
            {secondaryButtonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
} 