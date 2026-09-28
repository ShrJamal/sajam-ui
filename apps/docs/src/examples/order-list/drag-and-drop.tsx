"use client"

import { OrderList } from "@sajam/ui/order-list"
import { GripVerticalIcon } from "lucide-react"

const tracks = [
  { id: 1, title: "Opening theme", length: "2:14" },
  { id: 2, title: "Night drive", length: "3:48" },
  { id: 3, title: "Low tide", length: "4:02" },
  { id: 4, title: "Late arrivals", length: "3:11" },
  { id: 5, title: "Closing credits", length: "1:57" },
]

export default function DragOrderExample() {
  return (
    <OrderList
      defaultValue={tracks}
      itemKey={function (track) {
        return track.id
      }}
      header="Playlist"
      dragAndDrop
      renderItem={function (track) {
        return (
          <div className="flex items-center gap-2">
            <GripVerticalIcon
              aria-hidden="true"
              className="text-muted-foreground size-4 shrink-0"
            />
            <span className="flex-1 truncate">{track.title}</span>
            <span className="text-muted-foreground text-xs tabular-nums">{track.length}</span>
          </div>
        )
      }}
      className="max-w-sm"
    />
  )
}
