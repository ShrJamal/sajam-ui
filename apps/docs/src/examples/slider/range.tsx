"use client"

import { Label } from "@sajam/ui/label"
import { Slider } from "@sajam/ui/slider"
import { useId, useState } from "react"

export default function SliderRangeExample() {
  const id = useId()
  const [range, setRange] = useState<readonly number[]>([200, 800])

  return (
    <div className="grid w-full max-w-xs gap-3">
      <div className="flex items-center justify-between">
        <Label id={id}>Price</Label>
        <span className="text-muted-foreground text-sm tabular-nums">
          ${range[0]} – ${range[1]}
        </span>
      </div>
      <Slider
        value={range}
        onValueChange={setRange}
        min={0}
        max={1000}
        step={50}
        minStepsBetweenValues={1}
        aria-labelledby={id}
        thumbLabels={["Minimum price", "Maximum price"]}
      />
    </div>
  )
}
