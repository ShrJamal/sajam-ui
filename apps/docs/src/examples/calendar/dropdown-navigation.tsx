"use client"

import { Calendar } from "@sajam/ui/calendar"
import { useState } from "react"

export default function CalendarDropdownNavigationExample() {
  const [date, setDate] = useState<Date | undefined>(new Date(1994, 4, 17))

  return (
    <Calendar.Root
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={new Date(1994, 4, 1)}
      captionLayout="dropdown"
      startMonth={new Date(1940, 0)}
      endMonth={new Date(2026, 11)}
      className="rounded-lg border"
    />
  )
}
