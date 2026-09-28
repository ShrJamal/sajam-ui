"use client"

import { InputMask } from "@sajam/ui/input-mask"
import { Label } from "@sajam/ui/label"
import { useId, useState } from "react"

export default function InputMaskRawValueExample() {
  const id = useId()
  const statusId = useId()
  const [value, setValue] = useState("")
  const [rawValue, setRawValue] = useState("")
  const [complete, setComplete] = useState(false)

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Card number</Label>
      <InputMask
        id={id}
        mask="9999 9999 9999 9999"
        value={value}
        onValueChange={function (nextValue, nextRawValue) {
          setValue(nextValue)
          setRawValue(nextRawValue)
          setComplete(false)
        }}
        onComplete={function () {
          setComplete(true)
        }}
        clearIncomplete
        autoComplete="cc-number"
        placeholder="1234 5678 9012 3456"
        aria-describedby={statusId}
      />
      <p
        id={statusId}
        className="text-muted-foreground text-xs"
      >
        Raw value: {rawValue || "empty"} {complete ? "(complete)" : null}
      </p>
    </div>
  )
}
