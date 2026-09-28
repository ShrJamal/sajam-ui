"use client"

import { Label } from "@sajam/ui/label"
import { NumberInput } from "@sajam/ui/number-input"
import { useId } from "react"

export default function NumberInputBasicExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-48 gap-2">
      <Label htmlFor={id}>Quantity</Label>
      <NumberInput
        id={id}
        name="quantity"
        defaultValue={1}
        min={1}
        max={99}
      />
    </div>
  )
}
