"use client"

import { Label } from "@sajam/ui/label"
import { Rating } from "@sajam/ui/rating"
import { useId } from "react"

export default function RatingStatesExample() {
  const id = useId()

  return (
    <div className="grid gap-4">
      <div className="grid gap-1">
        <Label id={`${id}-read-only`}>Average rating (read-only)</Label>
        <Rating
          defaultValue={4}
          readOnly
          aria-labelledby={`${id}-read-only`}
        />
      </div>
      <div className="grid gap-1">
        <Label id={`${id}-disabled`}>Rate after delivery (disabled)</Label>
        <Rating
          disabled
          aria-labelledby={`${id}-disabled`}
        />
      </div>
    </div>
  )
}
