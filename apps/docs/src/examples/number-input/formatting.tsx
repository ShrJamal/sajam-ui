"use client"

import { Label } from "@sajam/ui/label"
import { NumberInput } from "@sajam/ui/number-input"
import { useId } from "react"

export default function NumberInputFormattingExample() {
  const priceId = useId()
  const budgetId = useId()
  const discountId = useId()
  const storageId = useId()

  return (
    <div className="grid w-full max-w-xs gap-4">
      <div className="grid gap-2">
        <Label htmlFor={priceId}>Price</Label>
        <NumberInput
          id={priceId}
          defaultValue={1299}
          min={0}
          step={0.5}
          format={{ style: "currency", currency: "USD" }}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={budgetId}>Budget (French locale)</Label>
        <NumberInput
          id={budgetId}
          defaultValue={24500.5}
          min={0}
          step={100}
          locale="fr-FR"
          format={{ style: "currency", currency: "EUR" }}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={discountId}>Discount</Label>
        <NumberInput
          id={discountId}
          defaultValue={0.15}
          min={0}
          max={1}
          step={0.05}
          format={{ style: "percent" }}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={storageId}>Storage</Label>
        <NumberInput
          id={storageId}
          defaultValue={50}
          min={10}
          step={10}
          format={{ style: "unit", unit: "gigabyte" }}
        />
      </div>
    </div>
  )
}
