import { ToggleGroup } from "@sajam/ui/toggle-group"
import { TextAlignCenterIcon, TextAlignEndIcon, TextAlignStartIcon } from "lucide-react"

export default function ToggleGroupExample() {
  return (
    <ToggleGroup.Root
      defaultValue={["start"]}
      aria-label="Text alignment"
    >
      <ToggleGroup.Item
        value="start"
        aria-label="Align left"
      >
        <TextAlignStartIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="center"
        aria-label="Align center"
      >
        <TextAlignCenterIcon />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="end"
        aria-label="Align right"
      >
        <TextAlignEndIcon />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
