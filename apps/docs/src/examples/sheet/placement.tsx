import { Avatar } from "@sajam/ui/avatar"
import { Button } from "@sajam/ui/button"
import { Sheet } from "@sajam/ui/sheet"

const sides = [
  { label: "Top", side: "top" },
  { label: "Right", side: "right" },
  { label: "Bottom", side: "bottom" },
  { label: "Left", side: "left" },
] as const

const activity = [
  { initials: "AM", name: "Alex Morgan", action: "commented on Homepage hero", time: "2m" },
  { initials: "SL", name: "Sam Lee", action: "moved Pricing table to Review", time: "18m" },
  { initials: "RK", name: "Riya Kapoor", action: "uploaded 3 new screenshots", time: "1h" },
]

export default function SheetPlacement() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {sides.map(function (item) {
        return (
          <Sheet.Root key={item.side}>
            <Sheet.Trigger render={<Button variant="outline" />}>{item.label}</Sheet.Trigger>
            <Sheet.Content side={item.side}>
              <Sheet.Header>
                <Sheet.Title>Recent activity</Sheet.Title>
                <Sheet.Description>This sheet slides in from the {item.side}.</Sheet.Description>
              </Sheet.Header>
              <Sheet.Body>
                <ul className="grid gap-4">
                  {activity.map(function (entry) {
                    return (
                      <li
                        key={entry.name}
                        className="flex items-center gap-3"
                      >
                        <Avatar.Root size="sm">
                          <Avatar.Fallback>{entry.initials}</Avatar.Fallback>
                        </Avatar.Root>
                        <p className="min-w-0 flex-1 text-sm">
                          <span className="font-medium">{entry.name}</span>{" "}
                          <span className="text-muted-foreground">{entry.action}</span>
                        </p>
                        <span className="text-muted-foreground text-xs">{entry.time}</span>
                      </li>
                    )
                  })}
                </ul>
              </Sheet.Body>
              <Sheet.Footer>
                <Sheet.Close render={<Button variant="outline" />}>Close</Sheet.Close>
              </Sheet.Footer>
            </Sheet.Content>
          </Sheet.Root>
        )
      })}
    </div>
  )
}
