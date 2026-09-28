"use client"

import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

export default function InputKeyFilterExample() {
  const codeId = useId()
  const skuId = useId()

  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-2">
        <Label htmlFor={codeId}>Verification code</Label>
        <Input
          id={codeId}
          inputMode="numeric"
          maxLength={6}
          keyFilter="digits"
          placeholder="Digits only"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={skuId}>SKU</Label>
        <Input
          id={skuId}
          keyFilter={/^[A-Z0-9-]*$/}
          placeholder="AB-1024"
        />
      </div>
    </div>
  )
}
