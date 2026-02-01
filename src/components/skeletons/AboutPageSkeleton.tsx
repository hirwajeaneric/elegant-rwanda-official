import { PageWrapper } from "@/components/layout/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function AboutPageSkeleton() {
  return (
    <PageWrapper>
      <div className="container-elegant py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-80 mx-auto mb-6" />
          <Skeleton className="h-6 w-96 max-w-3xl mx-auto" />
        </div>

        {/* Our Story + Quick Facts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-4/5 mb-4" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="bg-muted/50 rounded-2xl p-8 border border-border">
            <Skeleton className="h-8 w-28 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="text-center mb-16">
          <Skeleton className="h-8 w-40 mx-auto mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-6 w-48 mx-auto mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mx-auto max-w-xs" />
              </div>
            ))}
          </div>
        </div>

        {/* Our Team */}
        <div className="text-center">
          <Skeleton className="h-8 w-32 mx-auto mb-6" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl p-6 shadow-lg border border-border">
                <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
                <Skeleton className="h-6 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
