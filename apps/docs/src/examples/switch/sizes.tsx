"use client"

import { Label } from "@sajam/ui/label"
import { Switch } from "@sajam/ui/switch"
import { useId } from "react"

export default function SwitchSizesExample() {
  const id = useId()

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-2">
        <Switch
          id={`${id}-small`}
          size="sm"
          defaultChecked
        />
        <Label htmlFor={`${id}-small`}>Small</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id={`${id}-default`}
          defaultChecked
        />
        <Label htmlFor={`${id}-default`}>Default</Label>
      </div>
    </div>
  )
}
