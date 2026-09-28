"use client"

import { useVirtualizer } from "@tanstack/react-virtual"
import { cn } from "cn"
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useImperativeHandle,
  useRef,
  type CSSProperties,
  type Key,
  type ReactNode,
  type Ref,
} from "react"

// Renders only the visible part of a long list, horizontal strip, or multi-lane grid.
export function VirtualScroller<T>({
  ref,
  items,
  itemKey,
  renderItem,
  itemSize,
  estimatedItemSize,
  orientation = "vertical",
  lanes = 1,
  gap = 0,
  height = 320,
  overscan = 4,
  initialScrollIndex,
  onRangeChange,
  label,
  className,
}: Props<T>) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const horizontal = orientation === "horizontal"
  const measured = itemSize === undefined
  const size = Math.max(1, (itemSize ?? estimatedItemSize) || 1)
  const laneCount = Math.max(1, Math.floor(lanes) || 1)
  const getItemKey = useCallback(
    function (index: number) {
      return itemKey(items[index]!, index)
    },
    // Keys only need recomputing when the collection changes, not when an inline itemKey is recreated.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items],
  )
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: function () {
      return scrollRef.current
    },
    estimateSize: function () {
      return size
    },
    getItemKey,
    horizontal,
    lanes: laneCount,
    gap,
    overscan,
    initialOffset: initialScrollIndex
      ? Math.floor(initialScrollIndex / laneCount) * (size + gap)
      : undefined,
  })
  const virtualItems = virtualizer.getVirtualItems()
  const first = virtualizer.range?.startIndex ?? 0
  const last = virtualizer.range?.endIndex ?? -1
  const notifyRange = useEffectEvent(function (range: VirtualScrollerRange) {
    onRangeChange?.(range)
  })
  // Each lane gets an equal share of the cross axis, minus the gaps between lanes.
  const laneSize = `calc((100% - ${(laneCount - 1) * gap}px) / ${laneCount})`

  useImperativeHandle(
    ref,
    function () {
      return {
        scrollToIndex(index: number, align: VirtualScrollerAlign = "auto") {
          if (!items.length) return
          virtualizer.scrollToIndex(
            Math.min(Math.max(0, Math.floor(index) || 0), items.length - 1),
            {
              align,
            },
          )
        },
      }
    },
    [items.length, virtualizer],
  )

  useEffect(
    function () {
      if (last >= first) notifyRange({ first, last })
    },
    [first, last],
  )

  return (
    <div
      ref={scrollRef}
      role="list"
      aria-label={label}
      tabIndex={0}
      data-slot="virtual-scroller"
      data-orientation={orientation}
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 relative overflow-auto rounded-lg border outline-none focus-visible:ring-3",
        className,
      )}
      style={{ height }}
    >
      <div
        className="relative"
        style={
          horizontal
            ? { width: virtualizer.getTotalSize(), height: "100%" }
            : { height: virtualizer.getTotalSize(), width: "100%" }
        }
      >
        {virtualItems.map(function (virtualItem) {
          const laneOffset = `calc(${virtualItem.lane} * (${laneSize} + ${gap}px))`
          const style: CSSProperties = horizontal
            ? {
                position: "absolute",
                top: laneOffset,
                left: 0,
                height: laneSize,
                width: measured ? undefined : virtualItem.size,
                transform: `translateX(${virtualItem.start}px)`,
              }
            : {
                position: "absolute",
                top: 0,
                left: laneOffset,
                width: laneSize,
                height: measured ? undefined : virtualItem.size,
                transform: `translateY(${virtualItem.start}px)`,
              }
          return (
            <div
              key={virtualItem.key}
              ref={measured ? virtualizer.measureElement : undefined}
              data-index={virtualItem.index}
              role="listitem"
              aria-posinset={virtualItem.index + 1}
              aria-setsize={items.length}
              style={style}
            >
              {renderItem(items[virtualItem.index]!, virtualItem.index)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export type VirtualScrollerHandle = {
  scrollToIndex: (index: number, align?: VirtualScrollerAlign) => void
}

export type VirtualScrollerAlign = "auto" | "start" | "center" | "end"

// Indexes of the first and last visible items, inclusive.
export type VirtualScrollerRange = {
  first: number
  last: number
}

// Use `itemSize` for fixed sizes, or `estimatedItemSize` to measure each rendered item.
type SizeProps =
  | { itemSize: number; estimatedItemSize?: never }
  | { estimatedItemSize: number; itemSize?: never }

type Props<T> = SizeProps & {
  ref?: Ref<VirtualScrollerHandle>
  items: readonly T[]
  itemKey: (item: T, index: number) => Key
  renderItem: (item: T, index: number) => ReactNode
  orientation?: "vertical" | "horizontal"
  // Columns in a vertical scroller, rows in a horizontal one.
  lanes?: number
  // Space between items and lanes, in pixels.
  gap?: number
  height?: number | string
  overscan?: number
  initialScrollIndex?: number
  onRangeChange?: (range: VirtualScrollerRange) => void
  label?: string
  className?: string
}
