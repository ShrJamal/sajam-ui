"use client"

import { cn } from "cn"
import { ArrowDownIcon, ArrowUpIcon, ChevronsDownIcon, ChevronsUpIcon } from "lucide-react"
import { useState, type Key, type ReactNode } from "react"
import { Button } from "./button.js"
import {
  ListPanel,
  canMove,
  insertBefore,
  moveItems,
  reorderVisible,
  useListState,
  type MoveDirection,
} from "./list-panel.js"

const DEFAULT_LABELS: OrderListLabels = {
  filter: "Filter",
  moveTop: "Move to top",
  moveUp: "Move up",
  moveDown: "Move down",
  moveBottom: "Move to bottom",
  moved: function ({ count, position, total }) {
    return count === 1
      ? `Moved to position ${position} of ${total}.`
      : `Moved ${count} items to position ${position} of ${total}.`
  },
}

// Lets people reorder a list with buttons, Alt+Arrow keys, or drag and drop.
export function OrderList<T>({
  value,
  defaultValue = [],
  onValueChange,
  itemKey,
  renderItem,
  isItemDisabled,
  filterItem,
  header,
  label = "Items",
  emptyMessage = "No items.",
  dragAndDrop = false,
  labels,
  className,
}: Props<T>) {
  const text = { ...DEFAULT_LABELS, ...labels }
  const [localValue, setLocalValue] = useState<readonly T[]>(defaultValue)
  const [dragKeys, setDragKeys] = useState<Key[] | null>(null)
  const [announcement, setAnnouncement] = useState("")
  const items = value ?? localValue
  const list = useListState({ items, itemKey, filterItem, isItemDisabled })
  const movable = new Set(list.movableKeys)
  const canMoveUp = canMove(list.visibleKeys, movable, "up")
  const canMoveDown = canMove(list.visibleKeys, movable, "down")

  function commit(next: T[] | null, movedKeys: readonly Key[]) {
    if (!next) return
    if (value === undefined) setLocalValue(next)
    onValueChange?.(next)
    const moved = new Set(movedKeys)
    const visibleKeys = next.map(itemKey).filter(function (key) {
      return list.visibleKeys.includes(key)
    })
    const position =
      visibleKeys.findIndex(function (key) {
        return moved.has(key)
      }) + 1
    setAnnouncement(text.moved({ count: moved.size, position, total: visibleKeys.length }))
  }

  function move(direction: MoveDirection, keys: readonly Key[] = list.movableKeys) {
    const moving = new Set(keys)
    if (!moving.size) return
    commit(
      reorderVisible(items, list.visibleItems, itemKey, function (visible) {
        return moveItems(visible, moving, direction, itemKey)
      }),
      keys,
    )
  }

  function drop(beforeKey: Key | null) {
    if (!dragKeys) return
    const moving = new Set(dragKeys)
    setDragKeys(null)
    if (beforeKey !== null && moving.has(beforeKey)) return
    commit(
      reorderVisible(items, list.visibleItems, itemKey, function (visible) {
        const picked = visible.filter(function (item) {
          return moving.has(itemKey(item))
        })
        const rest = visible.filter(function (item) {
          return !moving.has(itemKey(item))
        })
        return insertBefore(rest, picked, beforeKey, itemKey)
      }),
      dragKeys,
    )
  }

  return (
    <div
      data-slot="order-list"
      className={cn("grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-2", className)}
    >
      <div className="flex flex-col justify-center gap-1">
        {(
          [
            ["top", ChevronsUpIcon, text.moveTop, canMoveUp],
            ["up", ArrowUpIcon, text.moveUp, canMoveUp],
            ["down", ArrowDownIcon, text.moveDown, canMoveDown],
            ["bottom", ChevronsDownIcon, text.moveBottom, canMoveDown],
          ] as const
        ).map(function ([direction, Icon, buttonLabel, enabled]) {
          return (
            <Button
              key={direction}
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label={buttonLabel}
              disabled={!enabled}
              onClick={function () {
                move(direction)
              }}
            >
              <Icon />
            </Button>
          )
        })}
      </div>
      <ListPanel
        state={list}
        renderItem={renderItem}
        isItemDisabled={isItemDisabled}
        filterable={Boolean(filterItem)}
        label={label}
        header={header}
        filterPlaceholder={text.filter}
        emptyMessage={emptyMessage}
        dragAndDrop={dragAndDrop}
        dragging={dragKeys !== null}
        onMove={move}
        onDragItems={setDragKeys}
        onDropItems={drop}
        onDragFinish={function () {
          setDragKeys(null)
        }}
      />
      <p
        role="status"
        className="sr-only"
      >
        {announcement}
      </p>
    </div>
  )
}

export type OrderListLabels = {
  filter: string
  moveTop: string
  moveUp: string
  moveDown: string
  moveBottom: string
  moved: (move: { count: number; position: number; total: number }) => string
}

type Props<T> = {
  value?: readonly T[]
  defaultValue?: readonly T[]
  onValueChange?: (value: T[]) => void
  itemKey: (item: T) => Key
  renderItem: (item: T) => ReactNode
  isItemDisabled?: (item: T) => boolean
  // The filter field appears only when `filterItem` is provided.
  filterItem?: (item: T, query: string) => boolean
  header?: ReactNode
  // Accessible name for the list when there is no header.
  label?: string
  emptyMessage?: ReactNode
  dragAndDrop?: boolean
  labels?: Partial<OrderListLabels>
  className?: string
}
