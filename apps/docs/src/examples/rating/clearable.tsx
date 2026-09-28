"use client"

import { Rating } from "@sajam/ui/rating"
import { useState } from "react"

export default function RatingClearableExample() {
  const [value, setValue] = useState(3)

  return (
    <div className="grid gap-2">
      <Rating
        value={value}
        onValueChange={setValue}
        clearable
        aria-label="Recipe rating"
      />
      <p className="text-muted-foreground text-sm">
        {value === 0 ? "Not rated yet" : `Rated ${value} out of 5`}
      </p>
    </div>
  )
}
