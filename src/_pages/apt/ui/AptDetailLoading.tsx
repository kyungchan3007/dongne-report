import { Skeleton } from "@/shared/ui/skeleton";

export function AptDetailLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-52 w-full rounded-3xl" />
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-40 w-full rounded-3xl" />
        <Skeleton className="h-40 w-full rounded-3xl" />
        <Skeleton className="h-40 w-full rounded-3xl" />
        <Skeleton className="h-40 w-full rounded-3xl" />
      </div>
    </div>
  );
}
