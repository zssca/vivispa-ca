import { 
  PageHeaderSkeleton,
  BookingTableSkeleton,
  FAQSkeleton 
} from "@/components/ui/skeletons";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Section spacing="md">
        <div className="space-y-6 md:space-y-8">
          <PageHeaderSkeleton />

          {/* Tabs skeleton */}
          <div className="w-full">
            <div className="grid grid-cols-2 w-full mb-6 rounded-md p-1 bg-muted h-10">
              <Skeleton className="h-full rounded bg-background" />
              <Skeleton className="h-full rounded bg-transparent" />
            </div>

            {/* Tab content skeleton */}
            <div className="mt-6 space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>

              {/* Service categories skeleton */}
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <BookingTableSkeleton key={i} />
                ))}
              </div>

              {/* Online booking button skeleton */}
              <div className="text-center">
                <Skeleton className="h-12 w-64 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* FAQ Section skeleton */}
      <Section backgroundClass="bg-muted/30" spacing="md">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-36 mx-auto" />
            <Skeleton className="h-4 w-80 mx-auto" />
          </div>
          <FAQSkeleton />
        </div>
      </Section>
    </>
  );
} 