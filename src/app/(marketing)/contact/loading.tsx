import { 
  PageHeaderSkeleton,
  FAQSkeleton 
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form Skeleton */}
              <div className="space-y-6">
                <Skeleton className="h-6 w-48" />
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
              
              {/* Contact Info Skeleton */}
              <div className="space-y-6">
                <Skeleton className="h-6 w-40" />
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <Skeleton className="h-5 w-5 mt-1" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Social Media Skeleton */}
                <div className="space-y-3">
                  <Skeleton className="h-5 w-28" />
                  <div className="flex space-x-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-8 w-8" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Map Section Skeleton */}
      <Section spacing="md" backgroundClass="bg-muted/30">
        <Container>
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </Container>
      </Section>

      {/* FAQ Section Skeleton */}
      <Section spacing="md">
        <Container>
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-40 mx-auto" />
              <Skeleton className="h-4 w-80 mx-auto" />
            </div>
            <FAQSkeleton />
          </div>
        </Container>
      </Section>
    </>
  );
}
