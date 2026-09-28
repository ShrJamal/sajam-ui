import { Button } from "@sajam/ui/button"

export default function ButtonSizesExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        size="xs"
        variant="outline"
      >
        Extra small
      </Button>
      <Button
        size="sm"
        variant="outline"
      >
        Small
      </Button>
      <Button variant="outline">Default</Button>
      <Button
        size="lg"
        variant="outline"
      >
        Large
      </Button>
    </div>
  )
}
