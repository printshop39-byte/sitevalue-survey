import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { HeaderSkeleton, CardGridSkeleton } from "@/components/page-skeletons";

export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <Skeleton className="h-20 w-full rounded-xl" />
      <HeaderSkeleton />
      <CardGridSkeleton />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <Skeleton className="h-56 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="mx-auto h-40 w-40 rounded-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
