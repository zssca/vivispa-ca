import { 
  PageHeaderSkeleton,
  ServiceGridSkeleton,
  FAQSkeleton 
} from "@/components/ui/skeletons";
import { Section, Container } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <PageHeaderSkeleton />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
          </div>
        </Container>
      </Section>

      {/* Service Details Section Skeleton */}
      <Section spacing="md" backgroundClass="bg-muted/30">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
              
              <div className="space-y-4">
                <Skeleton className="h-8 w-40" />
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <Skeleton className="h-4 w-4 mt-1" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <Skeleton className="h-8 w-56" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              <div className="border rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-20" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
              
              <div className="border rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-40" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              </div>
              
              <div className="border rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-36" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Before/After Gallery Skeleton */}
      <Section spacing="md">
        <Container>
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-4 w-72 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section Skeleton */}
      <Section spacing="md" backgroundClass="bg-muted/30">
        <Container>
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-56 mx-auto" />
              <Skeleton className="h-4 w-80 mx-auto" />
            </div>
            <FAQSkeleton />
          </div>
        </Container>
      </Section>

      {/* Related Services Skeleton */}
      <Section spacing="md">
        <Container>
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-44 mx-auto" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  <Skeleton className="aspect-[3/2] w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
