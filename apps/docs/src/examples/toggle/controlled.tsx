"use client"

import { Toggle } from "@sajam/ui/toggle"
import { PinIcon } from "lucide-react"
import { useState } from "react"

// Keep the label constant; the pressed state is announced from `aria-pressed`.
export default function ToggleControlledExample() {
  const [pinned, setPinned] = useState(false)

  return (
    <div className="flex items-center gap-3">
      <Toggle
        variant="outline"
        pressed={pinned}
        onPressedChange={setPinned}
      >
        <PinIcon />
        Pin
      </Toggle>
      <span className="text-muted-foreground text-sm">
        {pinned ? "Pinned to the top of the list" : "Not pinned"}
      </span>
    </div>
  )
}
