import { 
  PageHeaderSkeleton,
  TeamMemberSkeleton,
  BenefitsCardSkeleton 
} from "@/components/ui/skeletons";
import { Section, Container } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            <PageHeaderSkeleton />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Mission Section Skeleton */}
      <Section spacing="md" backgroundClass="bg-secondary/50">
        <Container>
          <div className="text-center space-y-6">
            <Skeleton className="h-8 w-48 mx-auto" />
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="border-l-4 border-muted pl-4 space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-5 w-5/6" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values/Features Section Skeleton */}
      <Section spacing="md">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <BenefitsCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Team Section Skeleton */}
      <Section spacing="md" backgroundClass="bg-muted/30">
        <Container>
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-40 mx-auto" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <TeamMemberSkeleton key={i} />
              ))}
            </div>
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
