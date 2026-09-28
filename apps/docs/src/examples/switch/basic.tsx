"use client"

import { Label } from "@sajam/ui/label"
import { Switch } from "@sajam/ui/switch"
import { useId } from "react"

export default function SwitchExample() {
  const id = useId()

  return (
    <div className="flex items-center gap-2">
      <Switch
        id={id}
        defaultChecked
      />
      <Label htmlFor={id}>Email notifications</Label>
    </div>
  )
}
