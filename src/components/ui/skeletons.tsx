import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

/**
 * Skeleton for service preview cards
 */
export function ServicePreviewSkeleton() {
  return (
    <Card className="h-full overflow-hidden border border-border/50">
      <div className="relative aspect-[3/2] w-full">
        <Skeleton className="w-full h-full" />
        <Skeleton className="absolute top-3 right-3 h-6 w-16 rounded-full" />
      </div>
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

/**
 * Skeleton for hero section
 */
export function HeroSectionSkeleton() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden min-h-[350px] sm:min-h-[400px] lg:min-h-[500px]">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary/80" />
      <div className="relative z-10 container mx-auto px-4 flex justify-center items-center h-full">
        <div className="w-full text-center space-y-6">
          <Skeleton className="h-12 sm:h-16 lg:h-20 w-full max-w-4xl mx-auto" />
          <Skeleton className="h-6 lg:h-8 w-full max-w-3xl mx-auto" />
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-36" />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Skeleton for section title and description
 */
export function SectionHeaderSkeleton() {
  return (
    <div className="text-center space-y-4">
      <Skeleton className="h-8 md:h-10 w-2/3 mx-auto" />
      <Skeleton className="h-5 w-3/4 mx-auto" />
    </div>
  );
}

/**
 * Skeleton for service grid (3 columns)
 */
export function ServiceGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <ServicePreviewSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Skeleton for benefits/features cards
 */
export function BenefitsCardSkeleton() {
  return (
    <Card className="border-0">
      <CardHeader>
        <Skeleton className="h-7 w-3/4" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Skeleton for testimonial cards
 */
export function TestimonialSkeleton() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <div className="flex space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-4" />
          ))}
        </div>
      </div>
    </Card>
  );
}

/**
 * Skeleton for FAQ items
 */
export function FAQSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4">
          <Skeleton className="h-5 w-3/4" />
          <div className="mt-3 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton for booking services table
 */
export function BookingTableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <div className="border rounded-lg">
        <div className="p-4 border-b bg-muted/50">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 border-b last:border-b-0">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-56" />
              </div>
              <div className="text-right space-y-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for team member cards
 */
export function TeamMemberSkeleton() {
  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
        <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
        <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6 mx-auto" />
          <Skeleton className="h-3 w-4/5 mx-auto" />
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Skeleton for service category preview
 */
export function ServiceCategorySkeleton() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <ServicePreviewSkeleton key={i} />
        ))}
      </div>
      <div className="text-center">
        <Skeleton className="h-10 w-40 mx-auto" />
      </div>
    </div>
  );
}

/**
 * Skeleton for page content with title and description
 */
export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 md:h-16 w-2/3" />
      <Skeleton className="h-6 w-3/4" />
    </div>
  );
}

/**
 * Skeleton for full page loading
 */
export function PageSkeleton() {
  return (
    <div className="space-y-16">
      <HeroSectionSkeleton />
      <div className="container mx-auto px-4 space-y-16">
        <div className="space-y-8">
          <SectionHeaderSkeleton />
          <ServiceGridSkeleton />
        </div>
        <div className="space-y-8">
          <SectionHeaderSkeleton />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <BenefitsCardSkeleton key={i} />
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <SectionHeaderSkeleton />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
