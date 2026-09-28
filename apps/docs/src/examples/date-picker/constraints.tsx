"use client"

import { DatePicker } from "@sajam/ui/date-picker"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

export default function DatePickerConstraintsExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Review date</Label>
      <DatePicker
        id={id}
        name="reviewDate"
        defaultValue={new Date(2026, 9, 7)}
        minDate={new Date(2026, 9, 1)}
        maxDate={new Date(2026, 11, 18)}
        calendarProps={{ disabled: { dayOfWeek: [0, 6] }, captionLayout: "dropdown" }}
        aria-describedby={`${id}-hint`}
        className="w-full"
      />
      <p
        id={`${id}-hint`}
        className="text-muted-foreground text-xs"
      >
        Weekdays between October 1 and December 18.
      </p>
    </div>
  )
}
