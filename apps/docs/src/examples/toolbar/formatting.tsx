import { ToggleGroup } from "@sajam/ui/toggle-group"
import { Toolbar } from "@sajam/ui/toolbar"
import { BoldIcon, ItalicIcon, RedoIcon, UnderlineIcon, UndoIcon } from "lucide-react"

// Toggle group items render through Toolbar.Button so they join the toolbar's arrow-key navigation.
export default function ToolbarExample() {
  return (
    <Toolbar.Root
      aria-label="Text formatting"
      className="w-fit"
    >
      <Toolbar.Group aria-label="History">
        <Toolbar.Button
          size="icon"
          aria-label="Undo"
        >
          <UndoIcon />
        </Toolbar.Button>
        <Toolbar.Button
          size="icon"
          aria-label="Redo"
          disabled
        >
          <RedoIcon />
        </Toolbar.Button>
      </Toolbar.Group>
      <Toolbar.Separator />
      <ToggleGroup.Root
        multiple
        defaultValue={["bold"]}
        aria-label="Text style"
      >
        <Toolbar.Button
          size="icon"
          aria-label="Bold"
          render={<ToggleGroup.Item value="bold" />}
        >
          <BoldIcon />
        </Toolbar.Button>
        <Toolbar.Button
          size="icon"
          aria-label="Italic"
          render={<ToggleGroup.Item value="italic" />}
        >
          <ItalicIcon />
        </Toolbar.Button>
        <Toolbar.Button
          size="icon"
          aria-label="Underline"
          render={<ToggleGroup.Item value="underline" />}
        >
          <UnderlineIcon />
        </Toolbar.Button>
      </ToggleGroup.Root>
    </Toolbar.Root>
  )
}
