"use client"

import { InputOTP } from "@sajam/ui/input-otp"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

export default function InputOTPBasicExample() {
  const id = useId()

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>Verification code</Label>
      <InputOTP.Root
        id={id}
        length={6}
      >
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          <InputOTP.Slot />
          <InputOTP.Slot />
          <InputOTP.Slot />
        </InputOTP.Group>
      </InputOTP.Root>
    </div>
  )
}
