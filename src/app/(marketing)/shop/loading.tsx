import { 
  PageHeaderSkeleton,
  ServiceGridSkeleton 
} from "@/components/ui/skeletons";
import { Section, Container } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Section spacing="md">
        <Container>
          <div className="space-y-8">
            <PageHeaderSkeleton />
            
            {/* Filter/Search Bar Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-9 w-20" />
                ))}
              </div>
              <Skeleton className="h-9 w-64" />
            </div>
            
            {/* Products Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-4 space-y-3">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-5/6" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination Skeleton */}
            <div className="flex justify-center space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-8" />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Categories Section Skeleton */}
      <Section spacing="md" backgroundClass="bg-muted/30">
        <Container>
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-56 mx-auto" />
              <Skeleton className="h-4 w-80 mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="text-center space-y-4">
                  <Skeleton className="h-32 w-32 rounded-full mx-auto" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32 mx-auto" />
                    <Skeleton className="h-4 w-48 mx-auto" />
                  </div>
                  <Skeleton className="h-9 w-28 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Newsletter/CTA Section Skeleton */}
      <Section spacing="md">
        <Container>
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-72 mx-auto" />
              <Skeleton className="h-4 w-96 mx-auto" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
