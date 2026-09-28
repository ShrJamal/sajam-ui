import { Button } from "@sajam/ui/button"
import { ButtonGroup } from "@sajam/ui/button-group"
import { MinusIcon, PlusIcon, ScanIcon } from "lucide-react"

export default function VerticalButtonGroupExample() {
  return (
    <ButtonGroup.Root
      orientation="vertical"
      aria-label="Zoom"
    >
      <Button
        variant="outline"
        size="icon"
        aria-label="Zoom in"
      >
        <PlusIcon />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Zoom out"
      >
        <MinusIcon />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Fit to screen"
      >
        <ScanIcon />
      </Button>
    </ButtonGroup.Root>
  )
}
