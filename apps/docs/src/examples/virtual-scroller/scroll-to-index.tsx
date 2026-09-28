"use client"

import { Button } from "@sajam/ui/button"
import { VirtualScroller, type VirtualScrollerHandle } from "@sajam/ui/virtual-scroller"
import { useRef, useState } from "react"

const records = Array.from({ length: 10_000 }, function (_, index) {
  return `Record ${String(index + 1).padStart(5, "0")}`
})

export default function ScrollToIndexExample() {
  const scrollerRef = useRef<VirtualScrollerHandle>(null)
  const [range, setRange] = useState({ first: 0, last: 0 })

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={function () {
            scrollerRef.current?.scrollToIndex(0, "start")
          }}
        >
          First
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={function () {
            scrollerRef.current?.scrollToIndex(4_999, "center")
          }}
        >
          Record 5,000
        </Button>
        <span className="text-muted-foreground ml-auto text-xs tabular-nums">
          {range.first + 1}–{range.last + 1}
        </span>
      </div>
      <VirtualScroller
        ref={scrollerRef}
        items={records}
        itemKey={function (record) {
          return record
        }}
        itemSize={40}
        height={240}
        label="Records"
        onRangeChange={setRange}
        renderItem={function (record) {
          return <div className="flex h-full items-center border-b px-3 text-sm">{record}</div>
        }}
      />
    </div>
  )
}
