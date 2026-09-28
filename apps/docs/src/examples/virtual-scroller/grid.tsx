"use client"

import { cn } from "@sajam/ui/utils"
import { VirtualScroller } from "@sajam/ui/virtual-scroller"

const tints = ["bg-chart-1/25", "bg-chart-2/25", "bg-chart-3/25", "bg-chart-4/25", "bg-chart-5/25"]

const photos = Array.from({ length: 3_000 }, function (_, index) {
  return { id: index + 1, tint: tints[index % tints.length]! }
})

export default function VirtualGridExample() {
  return (
    <VirtualScroller
      items={photos}
      itemKey={function (photo) {
        return photo.id
      }}
      itemSize={96}
      lanes={3}
      gap={8}
      height={288}
      label="Photos"
      className="w-full p-2"
      renderItem={function (photo) {
        return (
          <div
            className={cn("flex h-full items-end rounded-md p-2 text-xs font-medium", photo.tint)}
          >
            IMG_{String(photo.id).padStart(4, "0")}
          </div>
        )
      }}
    />
  )
}
