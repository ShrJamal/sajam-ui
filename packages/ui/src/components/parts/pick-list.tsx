"use client"

import { cn } from "cn"
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react"
import { useState, type Key, type ReactNode } from "react"
import { Button } from "./button.js"
import {
  ListPanel,
  canMove,
  insertBefore,
  moveItems,
  reorderVisible,
  useListState,
  type ListState,
} from "./list-panel.js"

const DEFAULT_LABELS: PickListLabels = {
  filter: "Filter",
  moveToTarget: "Move selected to target",
  moveAllToTarget: "Move all to target",
  moveToSource: "Move selected to source",
  moveAllToSource: "Move all to source",
  moveUp: "Move up",
  moveDown: "Move down",
  moved: function ({ count }) {
    return `Moved ${count} ${count === 1 ? "item" : "items"}.`
  },
}

// Moves items between a source and a target list; both lists can also be reordered.
export function PickList<T>({
  value,
  defaultValue = { source: [], target: [] },
  onValueChange,
  itemKey,
  renderItem,
  isItemDisabled,
  filterItem,
  sourceHeader = "Available",
  targetHeader = "Selected",
  emptyMessage = "No items.",
  dragAndDrop = false,
  labels,
  className,
}: Props<T>) {
  const text = { ...DEFAULT_LABELS, ...labels }
  const [localValue, setLocalValue] = useState<PickListValue<T>>(defaultValue)
  const [drag, setDrag] = useState<{ from: Side; keys: Key[] } | null>(null)
  const [announcement, setAnnouncement] = useState("")
  const current = value ?? localValue
  const source = useListState({ items: current.source, itemKey, filterItem, isItemDisabled })
  const target = useListState({ items: current.target, itemKey, filterItem, isItemDisabled })
  const lists = { source, target }

  function commit(next: PickListValue<T>, count: number) {
    if (value === undefined) setLocalValue(next)
    onValueChange?.(next)
    setAnnouncement(text.moved({ count }))
  }

  function update(side: Side, items: T[], count: number) {
    commit(side === "source" ? { ...current, source: items } : { ...current, target: items }, count)
  }

  function transfer(from: Side, keys: readonly Key[], beforeKey: Key | null = null) {
    const moving = new Set(keys)
    const fromList = lists[from]
    const moved = fromList.items.filter(function (item) {
      return moving.has(itemKey(item))
    })
    if (!moved.length) return
    const remaining = fromList.items.filter(function (item) {
      return !moving.has(itemKey(item))
    })
    const receiving = insertBefore(lists[other(from)].items, moved, beforeKey, itemKey)
    fromList.setSelected(
      new Set(
        [...fromList.selected].filter(function (key) {
          return !moving.has(key)
        }),
      ),
    )
    commit(
      from === "source"
        ? { source: remaining, target: receiving }
        : { source: receiving, target: remaining },
      moved.length,
    )
  }

  function reorder(side: Side, direction: "up" | "down", keys: readonly Key[]) {
    const moving = new Set(keys)
    const list = lists[side]
    const next = reorderVisible(list.items, list.visibleItems, itemKey, function (visible) {
      return moveItems(visible, moving, direction, itemKey)
    })
    if (next) update(side, next, moving.size)
  }

  function drop(side: Side, beforeKey: Key | null) {
    if (!drag) return
    setDrag(null)
    if (drag.from !== side) {
      transfer(drag.from, drag.keys, beforeKey)
      return
    }
    const moving = new Set(drag.keys)
    if (beforeKey !== null && moving.has(beforeKey)) return
    const list = lists[side]
    const next = reorderVisible(list.items, list.visibleItems, itemKey, function (visible) {
      const picked = visible.filter(function (item) {
        return moving.has(itemKey(item))
      })
      const rest = visible.filter(function (item) {
        return !moving.has(itemKey(item))
      })
      return insertBefore(rest, picked, beforeKey, itemKey)
    })
    if (next) update(side, next, moving.size)
  }

  function renderPanel(side: Side, header: ReactNode) {
    const list = lists[side]
    const movable = new Set(list.movableKeys)
    return (
      <ListPanel
        state={list}
        renderItem={renderItem}
        isItemDisabled={isItemDisabled}
        filterable={Boolean(filterItem)}
        header={header}
        actions={
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={text.moveUp}
              disabled={!canMove(list.visibleKeys, movable, "up")}
              onClick={function () {
                reorder(side, "up", list.movableKeys)
              }}
            >
              <ArrowUpIcon />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={text.moveDown}
              disabled={!canMove(list.visibleKeys, movable, "down")}
              onClick={function () {
                reorder(side, "down", list.movableKeys)
              }}
            >
              <ArrowDownIcon />
            </Button>
          </>
        }
        filterPlaceholder={text.filter}
        emptyMessage={emptyMessage}
        dragAndDrop={dragAndDrop}
        dragging={drag !== null}
        onMove={function (direction, keys) {
          reorder(side, direction, keys)
        }}
        onDragItems={function (keys) {
          setDrag({ from: side, keys })
        }}
        onDropItems={function (beforeKey) {
          drop(side, beforeKey)
        }}
        onDragFinish={function () {
          setDrag(null)
        }}
      />
    )
  }

  return (
    <div
      data-slot="pick-list"
      className={cn("@container w-full min-w-0", className)}
    >
      <div className="grid gap-2 @lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        {renderPanel("source", sourceHeader)}
        <div className="flex items-center justify-center gap-1 @lg:flex-col">
          <TransferButton
            label={text.moveToTarget}
            disabled={!source.movableKeys.length}
            onClick={function () {
              transfer("source", source.movableKeys)
            }}
          >
            <ArrowRightIcon />
          </TransferButton>
          <TransferButton
            label={text.moveAllToTarget}
            disabled={!transferableKeys(source, itemKey, isItemDisabled).length}
            onClick={function () {
              transfer("source", transferableKeys(source, itemKey, isItemDisabled))
            }}
          >
            <ChevronsRightIcon />
          </TransferButton>
          <TransferButton
            label={text.moveToSource}
            disabled={!target.movableKeys.length}
            onClick={function () {
              transfer("target", target.movableKeys)
            }}
          >
            <ArrowLeftIcon />
          </TransferButton>
          <TransferButton
            label={text.moveAllToSource}
            disabled={!transferableKeys(target, itemKey, isItemDisabled).length}
            onClick={function () {
              transfer("target", transferableKeys(target, itemKey, isItemDisabled))
            }}
          >
            <ChevronsLeftIcon />
          </TransferButton>
        </div>
        {renderPanel("target", targetHeader)}
      </div>
      <p
        role="status"
        className="sr-only"
      >
        {announcement}
      </p>
    </div>
  )
}

export type PickListValue<T> = {
  source: readonly T[]
  target: readonly T[]
}

export type PickListLabels = {
  filter: string
  moveToTarget: string
  moveAllToTarget: string
  moveToSource: string
  moveAllToSource: string
  moveUp: string
  moveDown: string
  moved: (move: { count: number }) => string
}

type Props<T> = {
  value?: PickListValue<T>
  defaultValue?: PickListValue<T>
  // Called for every transfer and reorder with both lists.
  onValueChange?: (value: PickListValue<T>) => void
  itemKey: (item: T) => Key
  renderItem: (item: T) => ReactNode
  // Disabled items stay in their list and keep their position.
  isItemDisabled?: (item: T) => boolean
  // The filter fields appear only when `filterItem` is provided.
  filterItem?: (item: T, query: string) => boolean
  sourceHeader?: ReactNode
  targetHeader?: ReactNode
  emptyMessage?: ReactNode
  dragAndDrop?: boolean
  labels?: Partial<PickListLabels>
  className?: string
}

type Side = "source" | "target"

type TransferButtonProps = {
  label: string
  disabled: boolean
  onClick: () => void
  children: ReactNode
}

function TransferButton({ label, disabled, onClick, children }: TransferButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="@max-lg:[&_svg]:rotate-90"
    >
      {children}
    </Button>
  )
}

function other(side: Side): Side {
  return side === "source" ? "target" : "source"
}

// Every visible, enabled item in a list.
function transferableKeys<T>(
  list: ListState<T>,
  itemKey: (item: T) => Key,
  isItemDisabled?: (item: T) => boolean,
) {
  return list.visibleItems
    .filter(function (item) {
      return !isItemDisabled?.(item)
    })
    .map(itemKey)
}
