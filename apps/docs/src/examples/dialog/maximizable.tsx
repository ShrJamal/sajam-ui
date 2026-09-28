import { Button } from "@sajam/ui/button"
import { Dialog } from "@sajam/ui/dialog"

export default function MaximizableDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="outline" />}>Read release notes</Dialog.Trigger>
      <Dialog.Content
        maximizable
        className="sm:max-w-lg"
      >
        <Dialog.Header>
          <Dialog.Title>Release 2.4</Dialog.Title>
          <Dialog.Description>Maximize the dialog to read with more room.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body className="text-muted-foreground grid gap-3 leading-relaxed">
          <p>Projects now support nested milestones, so large launches can be split into phases.</p>
          <p>Search results load faster and remember the filters you used last.</p>
          <p>Keyboard shortcuts cover every common action. Press ? anywhere to see the list.</p>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close render={<Button />}>Got it</Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
