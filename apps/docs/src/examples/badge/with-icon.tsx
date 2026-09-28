import { Badge } from "@sajam/ui/badge"
import { BadgeCheckIcon, SparklesIcon } from "lucide-react"

export default function BadgeWithIconExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="success">
        <BadgeCheckIcon data-icon="inline-start" />
        Verified
      </Badge>
      <Badge variant="outline">
        <span
          data-icon="inline-start"
          aria-hidden="true"
          className="bg-success size-1.5 rounded-full"
        />
        Online
      </Badge>
      <Badge variant="secondary">
        Beta
        <SparklesIcon data-icon="inline-end" />
      </Badge>
      <Badge className="min-w-5 px-1 tabular-nums">12</Badge>
    </div>
  )
}
