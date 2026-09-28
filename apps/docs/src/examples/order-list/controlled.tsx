"use client"

import { Button } from "@sajam/ui/button"
import { Kbd } from "@sajam/ui/kbd"
import { OrderList } from "@sajam/ui/order-list"
import { useState } from "react"

const initialPriorities = ["Critical", "High", "Medium", "Low"]

export default function ControlledOrderExample() {
  const [priorities, setPriorities] = useState(initialPriorities)

  return (
    <div className="w-full max-w-sm space-y-3">
      <OrderList
        value={priorities}
        onValueChange={setPriorities}
        itemKey={function (priority) {
          return priority
        }}
        header="Priorities"
        renderItem={function (priority) {
          return priority
        }}
      />
      <div className="flex items-center justify-between gap-2">
        <p className="text-muted-foreground flex items-center gap-1 text-xs">
          Reorder with
          <Kbd.Group>
            <Kbd.Root>Alt</Kbd.Root>
            <Kbd.Root>↑</Kbd.Root>
            <Kbd.Root>↓</Kbd.Root>
          </Kbd.Group>
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={function () {
            setPriorities(initialPriorities)
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
