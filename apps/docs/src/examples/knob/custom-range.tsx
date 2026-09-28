"use client"

import { Knob } from "@sajam/ui/knob"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

// Use min, max, and step for any numeric range; formatValue sets the visible and announced text.
export default function KnobCustomRangeExample() {
  const id = useId()

  return (
    <div className="grid justify-items-center gap-2">
      <Knob
        defaultValue={21.5}
        min={16}
        max={28}
        step={0.5}
        formatValue={function (value) {
          return `${value.toFixed(1)}°C`
        }}
        aria-labelledby={id}
      />
      <Label id={id}>Thermostat</Label>
    </div>
  )
}
