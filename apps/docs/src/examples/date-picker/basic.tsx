"use client"

import { DatePicker } from "@sajam/ui/date-picker"
import { Label } from "@sajam/ui/label"
import { useId, useState } from "react"

export default function DatePickerExample() {
  const id = useId()
  const [date, setDate] = useState<Date | null>(null)

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Due date</Label>
      <DatePicker
        id={id}
        value={date}
        onValueChange={setDate}
        className="w-full"
      />
    </div>
  )
}
