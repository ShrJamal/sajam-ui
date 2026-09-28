import { ToggleGroup } from "@sajam/ui/toggle-group"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

export default function ToggleGroupMultipleExample() {
  return (
    <ToggleGroup.Root
      multiple
      defaultValue={["bold", "italic"]}
      variant="outline"
      aria-label="Text formatting"
    >
      <ToggleGroup.Item
        value="bold"
        aria-label="Bold"
      >
        <BoldIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="italic"
        aria-label="Italic"
      >
        <ItalicIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="underline"
        aria-label="Underline"
      >
        <UnderlineIcon />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
