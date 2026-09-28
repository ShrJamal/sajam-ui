"use client"

import { Knob } from "@sajam/ui/knob"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

export default function KnobStatesExample() {
  const id = useId()

  return (
    <div className="flex flex-wrap justify-center gap-6">
      <div className="grid justify-items-center gap-2">
        <Knob
          defaultValue={42}
          readOnly
          aria-labelledby={`${id}-read-only`}
        />
        <Label id={`${id}-read-only`}>Read-only</Label>
      </div>
      <div className="grid justify-items-center gap-2">
        <Knob
          defaultValue={42}
          disabled
          aria-labelledby={`${id}-disabled`}
        />
        <Label id={`${id}-disabled`}>Disabled</Label>
      </div>
    </div>
  )
}
