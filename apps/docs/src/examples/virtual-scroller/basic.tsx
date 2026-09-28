"use client"

import { VirtualScroller } from "@sajam/ui/virtual-scroller"

const customers = Array.from({ length: 10_000 }, function (_, index) {
  return { id: index + 1, name: `Customer ${String(index + 1).padStart(5, "0")}` }
})

export default function VirtualListExample() {
  return (
    <VirtualScroller
      items={customers}
      itemKey={function (customer) {
        return customer.id
      }}
      itemSize={40}
      height={280}
      label="Customers"
      className="w-full"
      renderItem={function (customer) {
        return (
          <div className="flex h-full items-center justify-between gap-3 border-b px-3 text-sm">
            <span className="font-medium">{customer.name}</span>
            <span className="text-muted-foreground text-xs tabular-nums">#{customer.id}</span>
          </div>
        )
      }}
    />
  )
}
