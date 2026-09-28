"use client"

import { DatePicker } from "@sajam/ui/date-picker"
import { Label } from "@sajam/ui/label"
import { useId, useState } from "react"

export default function DatePickerDateTimeExample() {
  const id = useId()
  const [meeting, setMeeting] = useState<Date | null>(new Date(2026, 9, 14, 9, 30))

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Meeting</Label>
      <DatePicker
        id={id}
        value={meeting}
        onValueChange={setMeeting}
        showTime
        timeStep={900}
        showTodayButton
        className="w-full"
      />
      <p className="text-muted-foreground text-xs">Times use 15-minute steps.</p>
    </div>
  )
}
