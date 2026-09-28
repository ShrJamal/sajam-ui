"use client"

import { Checkbox } from "@sajam/ui/checkbox"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

export default function CheckboxExample() {
  const id = useId()

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        defaultChecked
      />
      <Label htmlFor={id}>Email me product updates</Label>
    </div>
  )
}
