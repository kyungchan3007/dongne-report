import { Skeleton } from "@/shared/ui/skeleton";

export function AptDetailLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-44 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}
