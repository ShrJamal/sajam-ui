"use client"

import { Label } from "@sajam/ui/label"
import { Slider } from "@sajam/ui/slider"
import { useId } from "react"

const marks = ["0%", "25%", "50%", "75%", "100%"]

// `format` controls the announced value, so screen readers hear "75%" instead of "0.75".
export default function SliderStepsExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-xs gap-3">
      <Label id={id}>Layer opacity</Label>
      <Slider
        defaultValue={0.75}
        min={0}
        max={1}
        step={0.25}
        format={{ style: "percent" }}
        aria-labelledby={id}
      />
      <div
        aria-hidden="true"
        className="text-muted-foreground flex justify-between text-xs tabular-nums"
      >
        {marks.map(function (mark) {
          return <span key={mark}>{mark}</span>
        })}
      </div>
    </div>
  )
}
