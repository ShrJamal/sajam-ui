import { Button } from "@sajam/ui/button"
import { Popover } from "@sajam/ui/popover"

const sides = ["top", "right", "bottom", "left"] as const

export default function PopoverPlacement() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {sides.map(function (side) {
        return (
          <Popover.Root key={side}>
            <Popover.Trigger
              render={<Button variant="outline" />}
              className="capitalize"
            >
              {side}
            </Popover.Trigger>
            <Popover.Content
              side={side}
              sideOffset={8}
              className="w-48"
            >
              <Popover.Header>
                <Popover.Title className="capitalize">{side}</Popover.Title>
                <Popover.Description>
                  Flips to the other side when space runs out.
                </Popover.Description>
              </Popover.Header>
              <Popover.Arrow />
            </Popover.Content>
          </Popover.Root>
        )
      })}
    </div>
  )
}
