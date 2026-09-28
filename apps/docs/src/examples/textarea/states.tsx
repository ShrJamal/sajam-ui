"use client"

import { Label } from "@sajam/ui/label"
import { Textarea } from "@sajam/ui/textarea"
import { useId } from "react"

export default function TextareaStatesExample() {
  const filledId = useId()
  const disabledId = useId()
  const invalidId = useId()
  const errorId = useId()

  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-2">
        <Label htmlFor={filledId}>Filled</Label>
        <Textarea
          id={filledId}
          variant="filled"
          placeholder="Private note…"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={disabledId}>Disabled</Label>
        <Textarea
          id={disabledId}
          defaultValue="This note is managed by your organization."
          disabled
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={invalidId}>Reason</Label>
        <Textarea
          id={invalidId}
          aria-invalid="true"
          aria-describedby={errorId}
        />
        <p
          id={errorId}
          className="text-destructive text-xs"
        >
          Add a reason before continuing.
        </p>
      </div>
    </div>
  )
}
