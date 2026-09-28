import { Toggle } from "@sajam/ui/toggle"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

// Icon-only toggles need an accessible name.
export default function ToggleSizesExample() {
  return (
    <div className="flex items-center gap-2">
      <Toggle
        size="sm"
        variant="outline"
        aria-label="Bold"
      >
        <BoldIcon />
      </Toggle>
      <Toggle
        variant="outline"
        aria-label="Italic"
      >
        <ItalicIcon />
      </Toggle>
      <Toggle
        size="lg"
        variant="outline"
        aria-label="Underline"
      >
        <UnderlineIcon />
      </Toggle>
    </div>
  )
}
