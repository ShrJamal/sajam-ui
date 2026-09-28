"use client"

import { Label } from "@sajam/ui/label"
import { Textarea } from "@sajam/ui/textarea"
import { useId } from "react"

export default function TextareaAutoResizeExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor={id}>Release notes</Label>
      <Textarea
        id={id}
        autoResize
        className="max-h-48"
        placeholder="This field grows as you type, up to a maximum height…"
      />
    </div>
  )
}
