"use client"

import { Calendar } from "@sajam/ui/calendar"
import { useState } from "react"

const booked = [new Date(2026, 8, 9), new Date(2026, 8, 10), new Date(2026, 8, 17)]

export default function CalendarDisabledDaysExample() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <div className="grid gap-3">
      <Calendar.Root
        mode="single"
        selected={date}
        onSelect={setDate}
        defaultMonth={new Date(2026, 8, 1)}
        disabled={[{ dayOfWeek: [0, 6] }, ...booked]}
        modifiers={{ booked }}
        modifiersClassNames={{ booked: "line-through" }}
        className="rounded-lg border"
      />
      <p className="text-muted-foreground text-center text-xs">
        {date
          ? `Appointment on ${date.toLocaleDateString("en-US", { dateStyle: "long" })}`
          : "Weekends and booked days are unavailable."}
      </p>
    </div>
  )
}
