import { Button } from "@sajam/ui/button"
import { Drawer } from "@sajam/ui/drawer"

const notifications = Array.from({ length: 16 }, function (_, index) {
  return {
    id: index + 1,
    text: index % 3 === 0 ? "Amina commented on Launch plan." : "Leo completed a task.",
  }
})

export default function ScrollableDrawer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger render={<Button variant="outline" />}>Open notifications</Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Notifications</Drawer.Title>
          <Drawer.Description>
            The list scrolls while the header and footer stay put.
          </Drawer.Description>
        </Drawer.Header>
        <Drawer.Body>
          <ul className="grid gap-2">
            {notifications.map(function (notification) {
              return (
                <li
                  key={notification.id}
                  className="rounded-lg border p-3"
                >
                  {notification.text}
                </li>
              )
            })}
          </ul>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close render={<Button variant="outline" />}>Close</Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  )
}
