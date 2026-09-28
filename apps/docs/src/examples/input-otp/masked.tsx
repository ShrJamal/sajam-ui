"use client"

import { InputOTP } from "@sajam/ui/input-otp"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

export default function InputOTPMaskedExample() {
  const id = useId()

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>Card PIN</Label>
      <InputOTP.Root
        id={id}
        length={4}
        mask
      />
    </div>
  )
}
