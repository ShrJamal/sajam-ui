"use client"

import { Label } from "@sajam/ui/label"
import { Slider } from "@sajam/ui/slider"
import { useId, useState } from "react"

export default function SliderExample() {
  const id = useId()
  const [volume, setVolume] = useState(40)

  return (
    <div className="grid w-full max-w-xs gap-3">
      <div className="flex items-center justify-between">
        <Label id={id}>Volume</Label>
        <span className="text-muted-foreground text-sm tabular-nums">{volume}%</span>
      </div>
      <Slider
        value={volume}
        onValueChange={setVolume}
        aria-labelledby={id}
      />
    </div>
  )
}
