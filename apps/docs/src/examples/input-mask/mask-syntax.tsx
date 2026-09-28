"use client"

import { InputMask } from "@sajam/ui/input-mask"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

export default function InputMaskSyntaxExample() {
  const dateId = useId()
  const productId = useId()
  const inviteId = useId()

  return (
    <div className="grid w-full max-w-xs gap-4">
      <div className="grid gap-2">
        <Label htmlFor={dateId}>Date of birth</Label>
        <InputMask
          id={dateId}
          mask="99/99/9999"
          maskPlaceholder="_"
          placeholder="MM/DD/YYYY"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={productId}>Product code</Label>
        <InputMask
          id={productId}
          mask="aa-9999?-***"
          placeholder="AB-2048 or AB-2048-X7Z"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={inviteId}>Invite code</Label>
        <InputMask
          id={inviteId}
          mask="****-****"
          placeholder="A7K2-P9Q4"
        />
      </div>
    </div>
  )
}
