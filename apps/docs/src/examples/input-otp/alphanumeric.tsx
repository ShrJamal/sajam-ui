"use client"

import { InputOTP } from "@sajam/ui/input-otp"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

export default function InputOTPAlphanumericExample() {
  const id = useId()

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>Invite code</Label>
      <InputOTP.Root
        id={id}
        length={6}
        validationType="alphanumeric"
        normalizeValue={function (value) {
          return value.toUpperCase()
        }}
      />
      <p className="text-muted-foreground text-xs">Pasting ABC-123 fills every slot.</p>
    </div>
  )
}
