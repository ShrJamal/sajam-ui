"use client"

import { Label } from "@sajam/ui/label"
import { NumberInput } from "@sajam/ui/number-input"
import { useId } from "react"

export default function NumberInputStatesExample() {
  const disabledId = useId()
  const readOnlyId = useId()
  const invalidId = useId()
  const errorId = useId()

  return (
    <div className="grid w-full max-w-48 gap-4">
      <div className="grid gap-2">
        <Label htmlFor={disabledId}>Disabled</Label>
        <NumberInput
          id={disabledId}
          defaultValue={12}
          disabled
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={readOnlyId}>Read-only</Label>
        <NumberInput
          id={readOnlyId}
          defaultValue={48}
          readOnly
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={invalidId}>Seats</Label>
        <NumberInput
          id={invalidId}
          defaultValue={0}
          aria-invalid="true"
          aria-describedby={errorId}
        />
        <p
          id={errorId}
          className="text-destructive text-xs"
        >
          Choose at least one seat.
        </p>
      </div>
    </div>
  )
}
