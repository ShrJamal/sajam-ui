import { Button } from "@sajam/ui/button"
import { Drawer } from "@sajam/ui/drawer"

const stops = [
  { name: "Peek", detail: "Shows the arrival time and distance." },
  { name: "Half", detail: "Adds the next three turns." },
  { name: "Full", detail: "Lists every step of the route." },
]

export default function SnapPointsDrawer() {
  return (
    <Drawer.Root
      snapPoints={[0.35, 0.7, 1]}
      defaultSnapPoint={0.35}
      showSwipeHandle
    >
      <Drawer.Trigger render={<Button variant="outline" />}>Open route details</Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Route details</Drawer.Title>
          <Drawer.Description>
            Drag the handle between the peek, half, and full stops.
          </Drawer.Description>
        </Drawer.Header>
        <Drawer.Body>
          <ol className="grid gap-2">
            {stops.map(function (stop) {
              return (
                <li
                  key={stop.name}
                  className="bg-muted/50 rounded-lg border p-3"
                >
                  <p className="font-medium">{stop.name}</p>
                  <p className="text-muted-foreground mt-1">{stop.detail}</p>
                </li>
              )
            })}
          </ol>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  )
}
