"use client"

import { Label } from "@sajam/ui/label"
import { Switch } from "@sajam/ui/switch"
import { useId, useState } from "react"

export default function SwitchControlledExample() {
  const id = useId()
  const [focusMode, setFocusMode] = useState(false)

  return (
    <div className="grid max-w-sm gap-2">
      <div className="flex items-center gap-2">
        <Switch
          id={id}
          checked={focusMode}
          onCheckedChange={setFocusMode}
        />
        <Label htmlFor={id}>Focus mode</Label>
      </div>
      <p className="text-muted-foreground text-sm">
        {focusMode
          ? "Notifications are paused until you turn focus mode off."
          : "You receive notifications as usual."}
      </p>
    </div>
  )
}
