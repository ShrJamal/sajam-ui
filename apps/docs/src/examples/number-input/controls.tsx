"use client"

import { Label } from "@sajam/ui/label"
import { NumberInput } from "@sajam/ui/number-input"
import { useId } from "react"

export default function NumberInputControlsExample() {
  const splitId = useId()
  const stackedId = useId()
  const noneId = useId()

  return (
    <div className="grid w-full max-w-48 gap-4">
      <div className="grid gap-2">
        <Label htmlFor={splitId}>Split</Label>
        <NumberInput
          id={splitId}
          defaultValue={4}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={stackedId}>Stacked</Label>
        <NumberInput
          id={stackedId}
          defaultValue={4}
          controls="stacked"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={noneId}>Keyboard only</Label>
        <NumberInput
          id={noneId}
          defaultValue={4}
          controls="none"
        />
      </div>
    </div>
  )
}
