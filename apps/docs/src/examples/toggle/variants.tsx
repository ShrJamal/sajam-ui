import { Toggle } from "@sajam/ui/toggle"
import { ItalicIcon, StrikethroughIcon, UnderlineIcon } from "lucide-react"

export default function ToggleVariantsExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle defaultPressed>
        <ItalicIcon />
        Italic
      </Toggle>
      <Toggle variant="outline">
        <UnderlineIcon />
        Underline
      </Toggle>
      <Toggle
        variant="outline"
        disabled
      >
        <StrikethroughIcon />
        Strikethrough
      </Toggle>
    </div>
  )
}
