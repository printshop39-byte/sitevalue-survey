import { HeaderSkeleton, TableSkeleton } from "@/components/page-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function SitesLoading() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <HeaderSkeleton />
      <Skeleton className="h-16 w-full rounded-xl" />
      <TableSkeleton rows={8} />
    </div>
  );
}
