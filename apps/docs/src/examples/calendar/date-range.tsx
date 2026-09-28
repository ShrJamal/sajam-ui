"use client"

import { Calendar } from "@sajam/ui/calendar"
import { useState } from "react"

export default function CalendarDateRangeExample() {
  const [range, setRange] = useState<{ from: Date | undefined; to?: Date } | undefined>({
    from: new Date(2026, 8, 21),
    to: new Date(2026, 8, 25),
  })

  return (
    <Calendar.Root
      mode="range"
      selected={range}
      onSelect={setRange}
      defaultMonth={new Date(2026, 8, 1)}
      numberOfMonths={2}
      className="rounded-lg border"
    />
  )
}
