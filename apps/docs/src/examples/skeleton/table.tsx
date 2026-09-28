import { Skeleton } from "@sajam/ui/skeleton"

export default function SkeletonTable() {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-xl border">
      <div className="bg-muted/40 grid grid-cols-[1fr_8rem] gap-4 border-b p-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      {Array.from({ length: 4 }, function (_, index) {
        return (
          <div
            key={index}
            className="grid grid-cols-[1fr_8rem] gap-4 border-b p-3 last:border-b-0"
          >
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        )
      })}
    </div>
  )
}
