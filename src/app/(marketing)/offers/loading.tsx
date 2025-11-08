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
            
            {/* Featured Offers Grid Skeleton */}
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <Skeleton className="h-6 w-48 mx-auto" />
                <Skeleton className="h-4 w-80 mx-auto" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="border rounded-lg overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-6 space-y-3">
                      <div className="flex justify-between items-start">
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                        <Skeleton className="h-9 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Seasonal Offers Section Skeleton */}
      <Section spacing="md" backgroundClass="bg-muted/30">
        <Container>
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-56 mx-auto" />
              <Skeleton className="h-4 w-96 mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="bg-background rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-7 w-3/4" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-10 w-28" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Package Deals Section Skeleton */}
      <Section spacing="md">
        <Container>
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-44 mx-auto" />
              <Skeleton className="h-4 w-72 mx-auto" />
            </div>
            <ServiceGridSkeleton />
          </div>
        </Container>
      </Section>

      {/* CTA Section Skeleton */}
      <Section spacing="md" backgroundClass="bg-foreground">
        <Container>
          <div className="text-center space-y-6">
            <Skeleton className="h-10 w-80 mx-auto bg-background/20" />
            <Skeleton className="h-6 w-96 mx-auto bg-background/20" />
            <Skeleton className="h-12 w-48 mx-auto bg-background/20" />
          </div>
        </Container>
      </Section>
    </>
  );
}
