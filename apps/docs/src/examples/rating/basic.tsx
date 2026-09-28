"use client"

import { Label } from "@sajam/ui/label"
import { Rating } from "@sajam/ui/rating"
import { useId, useState } from "react"

export default function RatingExample() {
  const id = useId()
  const [value, setValue] = useState(4)

  return (
    <div className="grid gap-2">
      <Label id={id}>How was your experience?</Label>
      <div className="flex items-center gap-3">
        <Rating
          value={value}
          onValueChange={setValue}
          aria-labelledby={id}
        />
        <span className="text-muted-foreground text-sm tabular-nums">{value} / 5</span>
      </div>
    </div>
  )
}
