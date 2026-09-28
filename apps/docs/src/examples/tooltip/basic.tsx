import { Button } from "@sajam/ui/button"
import { Tooltip } from "@sajam/ui/tooltip"
import { Settings2Icon } from "lucide-react"

export default function TooltipExample() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label="Project settings"
          />
        }
      >
        <Settings2Icon />
      </Tooltip.Trigger>
      <Tooltip.Content>Project settings</Tooltip.Content>
    </Tooltip.Root>
  )
}
