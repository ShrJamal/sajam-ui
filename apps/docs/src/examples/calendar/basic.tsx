"use client"

import { Calendar } from "@sajam/ui/calendar"
import { useState } from "react"

export default function CalendarExample() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 8, 24))

  return (
    <Calendar.Root
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={new Date(2026, 8, 1)}
      className="rounded-lg border"
    />
  )
}
