import { Skeleton } from "@sajam/ui/skeleton"

export default function SkeletonCard() {
  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border p-4">
      <Skeleton className="aspect-video w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
  )
}
