import { Button } from "@sajam/ui/button"
import { Tooltip } from "@sajam/ui/tooltip"

const sides = ["top", "right", "bottom", "left"] as const

export default function TooltipPlacement() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {sides.map(function (side) {
        return (
          <Tooltip.Root key={side}>
            <Tooltip.Trigger
              render={<Button variant="outline" />}
              className="capitalize"
            >
              {side}
            </Tooltip.Trigger>
            <Tooltip.Content side={side}>Opens on the {side}</Tooltip.Content>
          </Tooltip.Root>
        )
      })}
    </div>
  )
}
