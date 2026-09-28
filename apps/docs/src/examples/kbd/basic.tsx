import { Kbd } from "@sajam/ui/kbd"

export default function KbdExample() {
  return (
    <div className="text-muted-foreground grid gap-3 text-sm">
      <p>
        Press <Kbd.Root>Esc</Kbd.Root> to close the dialog.
      </p>
      <p>
        Open search with{" "}
        <Kbd.Group>
          <Kbd.Root>⌘</Kbd.Root>
          <Kbd.Root>K</Kbd.Root>
        </Kbd.Group>
        .
      </p>
    </div>
  )
}
