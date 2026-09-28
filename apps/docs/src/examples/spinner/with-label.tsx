import { Spinner } from "@sajam/ui/spinner"

export default function SpinnerWithLabel() {
  return (
    <p
      role="status"
      className="text-muted-foreground flex items-center gap-2 text-sm"
    >
      <Spinner aria-hidden="true" />
      Saving your changes…
    </p>
  )
}
