import { Badge } from "@sajam/ui/badge"

export default function BadgeSizesExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge
        size="sm"
        variant="secondary"
      >
        Small
      </Badge>
      <Badge variant="secondary">Default</Badge>
      <Badge
        size="lg"
        variant="secondary"
      >
        Large
      </Badge>
    </div>
  )
}
