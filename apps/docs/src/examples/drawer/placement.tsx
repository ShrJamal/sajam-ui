import { Button } from "@sajam/ui/button"
import { Drawer } from "@sajam/ui/drawer"

const placements = [
  { label: "Top", direction: "up" },
  { label: "Right", direction: "right" },
  { label: "Bottom", direction: "down" },
  { label: "Left", direction: "left" },
] as const

export default function DrawerPlacement() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {placements.map(function (placement) {
        return (
          <Drawer.Root
            key={placement.direction}
            swipeDirection={placement.direction}
          >
            <Drawer.Trigger render={<Button variant="outline" />}>{placement.label}</Drawer.Trigger>
            <Drawer.Content showCloseButton>
              <Drawer.Header>
                <Drawer.Title>{placement.label} drawer</Drawer.Title>
                <Drawer.Description>
                  Swipe toward the {placement.label.toLowerCase()} edge to dismiss it.
                </Drawer.Description>
              </Drawer.Header>
              <Drawer.Body className="text-muted-foreground">
                Use side drawers for navigation and filters, and top or bottom drawers for quick
                actions.
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Root>
        )
      })}
    </div>
  )
}
