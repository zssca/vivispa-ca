import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton loading state for offers grid
 */
export function OffersGridSkeleton() {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden h-full flex flex-col">
              <AspectRatio ratio={3/2}>
                <Skeleton className="h-full w-full" />
              </AspectRatio>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-6 flex-grow">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <div className="space-y-3 pt-2">
                  <Skeleton className="h-5 w-1/2" />
                  <div className="grid grid-cols-2 gap-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 