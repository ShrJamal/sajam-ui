import { Button } from "@sajam/ui/button"
import { ArrowRightIcon, PlusIcon } from "lucide-react"

export default function ButtonWithIconExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button>
        <PlusIcon data-icon="inline-start" />
        New project
      </Button>
      <Button variant="outline">
        Continue
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </div>
  )
}
