import { Button } from "@sajam/ui/button"
import { Dialog } from "@sajam/ui/dialog"

export default function NonModalDialog() {
  return (
    <Dialog.Root
      modal={false}
      disablePointerDismissal
    >
      <Dialog.Trigger render={<Button variant="outline" />}>Open help panel</Dialog.Trigger>
      <Dialog.Content
        position="bottom-right"
        showOverlay={false}
        className="shadow-lg"
      >
        <Dialog.Header>
          <Dialog.Title>Need a hand?</Dialog.Title>
          <Dialog.Description>
            The page stays interactive while this panel is open.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close render={<Button variant="outline" />}>Close</Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
