"use client"

import { Label } from "@sajam/ui/label"
import { Textarea } from "@sajam/ui/textarea"
import { useId } from "react"

export default function TextareaBasicExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor={id}>Feedback</Label>
      <Textarea
        id={id}
        rows={4}
        placeholder="Tell us what you think…"
      />
    </div>
  )
}
