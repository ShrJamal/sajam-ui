import { Spinner } from "@sajam/ui/spinner"

export default function SpinnerSizes() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-3" />
      <Spinner />
      <Spinner className="size-6" />
      <Spinner className="text-primary size-8" />
    </div>
  )
}
