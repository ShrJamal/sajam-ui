"use client"

import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

export default function InputStatesExample() {
  const disabledId = useId()
  const readOnlyId = useId()
  const invalidId = useId()
  const errorId = useId()

  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-2">
        <Label htmlFor={disabledId}>Disabled</Label>
        <Input
          id={disabledId}
          placeholder="Not available"
          disabled
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={readOnlyId}>Read-only</Label>
        <Input
          id={readOnlyId}
          defaultValue="acme-production"
          readOnly
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={invalidId}>Email</Label>
        <Input
          id={invalidId}
          type="email"
          defaultValue="jamie@"
          aria-invalid="true"
          aria-describedby={errorId}
        />
        <p
          id={errorId}
          className="text-destructive text-xs"
        >
          Enter a complete email address.
        </p>
      </div>
    </div>
  )
}
