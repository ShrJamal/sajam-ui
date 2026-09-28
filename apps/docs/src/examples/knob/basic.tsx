"use client"

import { Knob } from "@sajam/ui/knob"
import { Label } from "@sajam/ui/label"
import { useId, useState } from "react"

export default function KnobExample() {
  const id = useId()
  const [volume, setVolume] = useState(68)

  return (
    <div className="grid justify-items-center gap-2">
      <Knob
        value={volume}
        onValueChange={setVolume}
        formatValue={function (value) {
          return `${value}%`
        }}
        aria-labelledby={id}
      />
      <Label id={id}>Volume</Label>
    </div>
  )
}
