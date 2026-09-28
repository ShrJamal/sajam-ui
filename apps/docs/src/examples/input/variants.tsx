"use client"

import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

export default function InputVariantsExample() {
  const defaultId = useId()
  const filledId = useId()

  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-2">
        <Label htmlFor={defaultId}>Default</Label>
        <Input
          id={defaultId}
          placeholder="Project name"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={filledId}>Filled</Label>
        <Input
          id={filledId}
          variant="filled"
          placeholder="Project name"
        />
      </div>
    </div>
  )
}
