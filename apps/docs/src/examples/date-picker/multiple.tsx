"use client"

import { DatePicker } from "@sajam/ui/date-picker"
import { Label } from "@sajam/ui/label"
import { useId, useState } from "react"

export default function DatePickerMultipleExample() {
  const id = useId()
  const [dates, setDates] = useState<Date[]>([new Date(2026, 9, 5), new Date(2026, 9, 19)])

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Delivery days</Label>
      <DatePicker
        id={id}
        mode="multiple"
        value={dates}
        onValueChange={setDates}
        maxDates={4}
        placeholder="Pick up to four days"
        className="w-full"
      />
      <p className="text-muted-foreground text-xs">{dates.length} of 4 days selected</p>
    </div>
  )
}
