import { 
  PageHeaderSkeleton,
  ServiceGridSkeleton,
  FAQSkeleton 
} from "@/components/ui/skeletons";
import { Section } from "@/components/ui/section";

export default function Loading() {
  return (
    <>
      <Section spacing="md">
        <div className="space-y-8">
          <PageHeaderSkeleton />
          
          {/* Filter tabs skeleton */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-9 w-24 bg-muted rounded-md animate-pulse" />
            ))}
          </div>
          
          <ServiceGridSkeleton />
        </div>
      </Section>
      
      <Section backgroundClass="bg-muted/30" spacing="md">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="h-8 w-48 bg-muted rounded mx-auto animate-pulse" />
            <div className="h-4 w-64 bg-muted rounded mx-auto animate-pulse" />
          </div>
          <FAQSkeleton />
        </div>
      </Section>
    </>
  );
}
