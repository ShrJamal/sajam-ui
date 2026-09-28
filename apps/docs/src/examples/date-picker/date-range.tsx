"use client"

import { DatePicker, type DatePickerRange } from "@sajam/ui/date-picker"
import { Label } from "@sajam/ui/label"
import { useId, useState } from "react"

export default function DatePickerRangeExample() {
  const id = useId()
  const [stay, setStay] = useState<DatePickerRange | null>({
    from: new Date(2026, 9, 8),
    to: new Date(2026, 9, 12),
  })

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Stay</Label>
      <DatePicker
        id={id}
        mode="range"
        value={stay}
        onValueChange={setStay}
        placeholder="Check-in – check-out"
        calendarProps={{ numberOfMonths: 2 }}
        className="w-full"
      />
    </div>
  )
}
