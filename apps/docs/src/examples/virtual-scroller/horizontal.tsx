"use client"

import { VirtualScroller } from "@sajam/ui/virtual-scroller"

const days = Array.from({ length: 365 }, function (_, index) {
  return { id: index + 1, label: `Day ${index + 1}`, tasks: (index * 7) % 5 }
})

export default function HorizontalScrollerExample() {
  return (
    <VirtualScroller
      items={days}
      itemKey={function (day) {
        return day.id
      }}
      orientation="horizontal"
      itemSize={112}
      gap={8}
      height={112}
      label="Days"
      className="w-full p-2"
      renderItem={function (day) {
        return (
          <div className="bg-card flex h-full flex-col justify-between rounded-md border p-3">
            <span className="text-sm font-medium">{day.label}</span>
            <span className="text-muted-foreground text-xs">
              {day.tasks} {day.tasks === 1 ? "task" : "tasks"}
            </span>
          </div>
        )
      }}
    />
  )
}
