"use client"

import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

// The asterisk is visual only; `required` on the input is what assistive technology announces.
export default function LabelRequiredExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor={id}>
        Workspace name
        <span
          aria-hidden="true"
          className="text-destructive -ml-1"
        >
          *
        </span>
      </Label>
      <Input
        id={id}
        required
        placeholder="Sajam"
      />
    </div>
  )
}
