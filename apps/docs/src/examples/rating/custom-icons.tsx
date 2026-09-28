"use client"

import { Rating } from "@sajam/ui/rating"
import { CircleIcon, HeartIcon } from "lucide-react"

// Filled icons use the text color, so set it with className.
export default function RatingCustomIconsExample() {
  return (
    <div className="grid gap-3">
      <Rating
        defaultValue={3}
        className="text-warning"
        aria-label="Hotel rating"
      />
      <Rating
        count={3}
        defaultValue={2}
        icon={<HeartIcon />}
        emptyIcon={<CircleIcon />}
        getValueText={function (value) {
          return `${value} ${value === 1 ? "heart" : "hearts"}`
        }}
        className="text-destructive"
        aria-label="How much did you love it?"
      />
    </div>
  )
}
