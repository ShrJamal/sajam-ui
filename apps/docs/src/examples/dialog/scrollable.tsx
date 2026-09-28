import { Button } from "@sajam/ui/button"
import { Dialog } from "@sajam/ui/dialog"

const events = Array.from({ length: 20 }, function (_, index) {
  return {
    title: `Project update ${index + 1}`,
    detail: index % 2 === 0 ? "Amina changed the project timeline." : "Leo added a new task.",
  }
})

export default function ScrollableDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="outline" />}>Review activity</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Recent activity</Dialog.Title>
          <Dialog.Description>Changes from the latest workspace session.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <ul className="grid gap-2">
            {events.map(function (event) {
              return (
                <li
                  key={event.title}
                  className="bg-muted/50 rounded-lg border p-3"
                >
                  <p className="font-medium">{event.title}</p>
                  <p className="text-muted-foreground mt-1">{event.detail}</p>
                </li>
              )
            })}
          </ul>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close render={<Button />}>Done</Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
