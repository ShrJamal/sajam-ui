"use client"

import { InputMask } from "@sajam/ui/input-mask"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

export default function InputMaskBasicExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Phone number</Label>
      <InputMask
        id={id}
        mask="(999) 999-9999"
        autoComplete="tel-national"
        placeholder="(555) 123-4567"
      />
    </div>
  )
}
