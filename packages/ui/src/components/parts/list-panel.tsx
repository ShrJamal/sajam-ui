"use client"

import { cn } from "cn"
import { SearchIcon } from "lucide-react"
import {
  useEffect,
  useId,
  useRef,
  useState,
  type DragEvent,
  type KeyboardEvent,
  type Key,
  type ReactNode,
} from "react"
import { Input } from "./input.js"

// Filter, selection, and focus state for one reorderable listbox. Shared by OrderList and PickList;
// this module is internal and has no public facade.
export function useListState<T>({
  items,
  itemKey,
  filterItem,
  isItemDisabled,
}: ListStateOptions<T>): ListState<T> {
  const [query, setQuery] = useState("")
  const [selection, setSelection] = useState<ReadonlySet<Key>>(new Set())
  const [activeKey, setActiveKey] = useState<Key | null>(null)
  const filtering = Boolean(filterItem && query.trim())
  const visibleItems = filtering
    ? items.filter(function (item) {
        return filterItem!(item, query)
      })
    : items
  const visibleKeys = visibleItems.map(itemKey)
  const itemKeys = new Set(items.map(itemKey))
  // Keys of items that left the list are ignored rather than pruned in an effect.
  const selected = new Set(
    [...selection].filter(function (key) {
      return itemKeys.has(key)
    }),
  )
  const movableKeys = visibleItems
    .filter(function (item) {
      return selected.has(itemKey(item)) && !isItemDisabled?.(item)
    })
    .map(itemKey)
  return {
    items,
    query,
    setQuery,
    filtering,
    visibleItems,
    visibleKeys,
    selected,
    setSelected: setSelection,
    movableKeys,
    activeKey,
    setActiveKey,
  }
}

// Renders a multi-select listbox with aria-activedescendant focus, an optional filter, and drag and drop.
export function ListPanel<T>({
  state,
  renderItem,
  isItemDisabled,
  filterable,
  label,
  header,
  actions,
  filterPlaceholder,
  emptyMessage,
  dragAndDrop,
  dragging,
  onMove,
  onDragItems,
  onDropItems,
  onDragFinish,
  className,
}: ListPanelProps<T>) {
  const baseId = useId()
  const headerId = `${baseId}-header`
  const anchorKey = useRef<Key | null>(null)
  const [dropKey, setDropKey] = useState<Key | null | undefined>(undefined)
  const { visibleItems, visibleKeys, selected, activeKey, setActiveKey, setSelected } = state
  const activeIndex = activeKey === null ? -1 : visibleKeys.indexOf(activeKey)
  const activeId = activeIndex >= 0 ? `${baseId}-option-${activeIndex}` : undefined

  useEffect(
    function () {
      if (activeId) document.getElementById(activeId)?.scrollIntoView({ block: "nearest" })
    },
    [activeId],
  )

  function isDisabled(item: T | undefined) {
    return item === undefined || Boolean(isItemDisabled?.(item))
  }

  function toggle(key: Key) {
    const next = new Set(selected)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    anchorKey.current = key
    setSelected(next)
  }

  function selectRange(key: Key) {
    const from = anchorKey.current === null ? -1 : visibleKeys.indexOf(anchorKey.current)
    const to = visibleKeys.indexOf(key)
    if (from < 0 || to < 0) {
      toggle(key)
      return
    }
    const next = new Set(selected)
    for (let index = Math.min(from, to); index <= Math.max(from, to); index += 1) {
      if (!isDisabled(visibleItems[index])) next.add(visibleKeys[index]!)
    }
    setSelected(next)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const lastIndex = visibleKeys.length - 1
    const index = Math.max(0, activeIndex)
    const key = visibleKeys[index]
    if (key === undefined) return
    if (event.altKey && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
      event.preventDefault()
      if (isDisabled(visibleItems[index])) return
      // Alt+Arrow moves the selection, including the active item.
      const moving = new Set([...state.movableKeys, key])
      if (!selected.has(key)) setSelected(new Set(selected).add(key))
      setActiveKey(key)
      onMove?.(
        event.key === "ArrowUp" ? "up" : "down",
        visibleKeys.filter(function (visibleKey) {
          return moving.has(visibleKey)
        }),
      )
      return
    }
    let nextIndex: number | undefined
    switch (event.key) {
      case "ArrowDown":
        nextIndex = activeIndex < 0 ? 0 : Math.min(index + 1, lastIndex)
        break
      case "ArrowUp":
        nextIndex = Math.max(index - 1, 0)
        break
      case "Home":
        nextIndex = 0
        break
      case "End":
        nextIndex = lastIndex
        break
      case " ":
      case "Enter":
        if (!isDisabled(visibleItems[index])) toggle(key)
        break
      case "a":
        if (!event.metaKey && !event.ctrlKey) return
        setSelected(
          visibleKeys.every(function (visibleKey, keyIndex) {
            return selected.has(visibleKey) || isDisabled(visibleItems[keyIndex])
          })
            ? new Set()
            : new Set(
                visibleKeys.filter(function (_, keyIndex) {
                  return !isDisabled(visibleItems[keyIndex])
                }),
              ),
        )
        break
      default:
        return
    }
    event.preventDefault()
    if (nextIndex === undefined) return
    const nextKey = visibleKeys[nextIndex]!
    setActiveKey(nextKey)
    if (event.shiftKey && !isDisabled(visibleItems[nextIndex])) {
      setSelected(new Set(selected).add(nextKey))
    }
  }

  function dropTargetFor(event: DragEvent<HTMLLIElement>, index: number) {
    const bounds = event.currentTarget.getBoundingClientRect()
    const after = event.clientY > bounds.top + bounds.height / 2
    return after ? (visibleKeys[index + 1] ?? null) : visibleKeys[index]!
  }

  function finishDrop(beforeKey: Key | null) {
    setDropKey(undefined)
    onDropItems?.(beforeKey)
  }

  return (
    <div
      data-slot="list-panel"
      className={cn(
        "bg-background flex min-w-0 flex-col overflow-hidden rounded-lg border",
        className,
      )}
    >
      {header || actions ? (
        <div className="bg-muted/40 flex min-h-10 items-center justify-between gap-2 border-b px-3 py-1.5 text-sm font-medium">
          <span id={headerId}>{header}</span>
          {actions ? (
            <div
              role="group"
              aria-labelledby={header ? headerId : undefined}
              className="flex gap-0.5"
            >
              {actions}
            </div>
          ) : null}
        </div>
      ) : null}
      {filterable ? (
        <div className="relative border-b p-2">
          <SearchIcon
            aria-hidden="true"
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
          />
          <Input
            type="search"
            aria-label={filterPlaceholder}
            placeholder={filterPlaceholder}
            value={state.query}
            onChange={function (event) {
              state.setQuery(event.target.value)
            }}
            className="pl-8"
          />
        </div>
      ) : null}
      <div
        data-drop-end={dropKey === null || undefined}
        className="data-drop-end:after:bg-primary max-h-72 min-h-40 flex-1 overflow-auto p-1 data-drop-end:after:mx-1 data-drop-end:after:block data-drop-end:after:h-0.5 data-drop-end:after:rounded-full"
        onDragOver={function (event) {
          if (!dragging) return
          event.preventDefault()
          setDropKey(null)
        }}
        onDragLeave={function (event) {
          if (
            !(event.relatedTarget instanceof Node) ||
            !event.currentTarget.contains(event.relatedTarget)
          ) {
            setDropKey(undefined)
          }
        }}
        onDrop={function (event) {
          if (!dragging) return
          event.preventDefault()
          finishDrop(null)
        }}
      >
        {visibleItems.length ? (
          <ul
            role="listbox"
            tabIndex={0}
            aria-label={header ? undefined : label}
            aria-labelledby={header ? headerId : undefined}
            aria-multiselectable="true"
            aria-activedescendant={activeId}
            onKeyDown={handleKeyDown}
            onFocus={function () {
              if (activeIndex >= 0) return
              setActiveKey(
                visibleKeys.find(function (key) {
                  return selected.has(key)
                }) ?? visibleKeys[0]!,
              )
            }}
            className="group/listbox focus-visible:ring-ring/50 flex flex-col gap-0.5 rounded-md outline-none focus-visible:ring-2"
          >
            {visibleItems.map(function (item, index) {
              const key = visibleKeys[index]!
              const disabled = isDisabled(item)
              const isSelected = selected.has(key)
              return (
                <li
                  key={key}
                  id={`${baseId}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={disabled || undefined}
                  data-active={key === activeKey || undefined}
                  data-selected={isSelected || undefined}
                  data-disabled={disabled || undefined}
                  data-drop-before={dropKey === key || undefined}
                  draggable={dragAndDrop && !disabled}
                  onClick={function (event) {
                    setActiveKey(key)
                    if (disabled) return
                    if (event.shiftKey) selectRange(key)
                    else toggle(key)
                  }}
                  onDragStart={function (event) {
                    event.dataTransfer.effectAllowed = "move"
                    event.dataTransfer.setData("text/plain", String(key))
                    // Dragging a selected item carries the whole selection with it.
                    onDragItems?.(state.movableKeys.includes(key) ? state.movableKeys : [key])
                  }}
                  onDragOver={function (event) {
                    if (!dragging) return
                    event.preventDefault()
                    event.stopPropagation()
                    setDropKey(dropTargetFor(event, index))
                  }}
                  onDrop={function (event) {
                    if (!dragging) return
                    event.preventDefault()
                    event.stopPropagation()
                    finishDrop(dropTargetFor(event, index))
                  }}
                  onDragEnd={function () {
                    setDropKey(undefined)
                    onDragFinish?.()
                  }}
                  className="data-selected:bg-primary/10 hover:bg-muted group-focus-visible/listbox:data-active:ring-ring data-drop-before:before:bg-primary relative cursor-default rounded-md px-3 py-2 text-sm select-none group-focus-visible/listbox:data-active:ring-2 data-disabled:opacity-50 data-drop-before:before:absolute data-drop-before:before:inset-x-1 data-drop-before:before:-top-0.5 data-drop-before:before:h-0.5 data-drop-before:before:rounded-full"
                >
                  {renderItem(item)}
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="text-muted-foreground flex min-h-36 items-center justify-center p-4 text-center text-sm">
            {emptyMessage}
          </p>
        )}
      </div>
    </div>
  )
}

// Reorders the visible items and writes them back into the slots they occupied, so hidden items keep
// their place while the list is filtered. Returns null when nothing moved.
export function reorderVisible<T>(
  items: readonly T[],
  visibleItems: readonly T[],
  itemKey: (item: T) => Key,
  reorder: (visible: T[]) => T[],
) {
  const nextVisible = reorder([...visibleItems])
  if (
    nextVisible.every(function (item, index) {
      return item === visibleItems[index]
    })
  ) {
    return null
  }
  const visibleKeys = new Set(visibleItems.map(itemKey))
  let cursor = 0
  return items.map(function (item) {
    if (!visibleKeys.has(itemKey(item))) return item
    cursor += 1
    return nextVisible[cursor - 1]!
  })
}

// Moves a block of items one step or to either end; up and down keep non-adjacent items apart.
export function moveItems<T>(
  items: T[],
  moving: ReadonlySet<Key>,
  direction: MoveDirection,
  itemKey: (item: T) => Key,
) {
  if (direction === "top" || direction === "bottom") {
    const picked = items.filter(function (item) {
      return moving.has(itemKey(item))
    })
    const rest = items.filter(function (item) {
      return !moving.has(itemKey(item))
    })
    return direction === "top" ? [...picked, ...rest] : [...rest, ...picked]
  }
  const next = [...items]
  const step = direction === "up" ? -1 : 1
  const indexes = next.map(function (_, index) {
    return index
  })
  if (direction === "down") indexes.reverse()
  for (const index of indexes) {
    const neighbour = index + step
    if (neighbour < 0 || neighbour >= next.length) continue
    if (moving.has(itemKey(next[index]!)) && !moving.has(itemKey(next[neighbour]!))) {
      ;[next[neighbour], next[index]] = [next[index]!, next[neighbour]!]
    }
  }
  return next
}

// Inserts items before `beforeKey`, or at the end when it is null or missing.
export function insertBefore<T>(
  items: readonly T[],
  inserted: readonly T[],
  beforeKey: Key | null,
  itemKey: (item: T) => Key,
) {
  const index =
    beforeKey === null
      ? -1
      : items.findIndex(function (item) {
          return itemKey(item) === beforeKey
        })
  return index < 0
    ? [...items, ...inserted]
    : [...items.slice(0, index), ...inserted, ...items.slice(index)]
}

// Whether any moving item has a non-moving neighbour in the given direction.
export function canMove(keys: readonly Key[], moving: ReadonlySet<Key>, direction: "up" | "down") {
  const step = direction === "up" ? -1 : 1
  return keys.some(function (key, index) {
    const neighbour = keys[index + step]
    return moving.has(key) && neighbour !== undefined && !moving.has(neighbour)
  })
}

export type MoveDirection = "top" | "up" | "down" | "bottom"

export type ListState<T> = {
  items: readonly T[]
  query: string
  setQuery: (query: string) => void
  filtering: boolean
  visibleItems: readonly T[]
  visibleKeys: Key[]
  selected: ReadonlySet<Key>
  setSelected: (keys: ReadonlySet<Key>) => void
  // Selected, visible, and enabled keys in visible order.
  movableKeys: Key[]
  activeKey: Key | null
  setActiveKey: (key: Key | null) => void
}

type ListStateOptions<T> = {
  items: readonly T[]
  itemKey: (item: T) => Key
  filterItem?: (item: T, query: string) => boolean
  isItemDisabled?: (item: T) => boolean
}

type ListPanelProps<T> = {
  state: ListState<T>
  renderItem: (item: T) => ReactNode
  isItemDisabled?: (item: T) => boolean
  filterable: boolean
  label?: string
  header?: ReactNode
  actions?: ReactNode
  filterPlaceholder: string
  emptyMessage: ReactNode
  dragAndDrop: boolean
  // True while any drag from this component is in progress, so the panel accepts drops.
  dragging: boolean
  onMove?: (direction: "up" | "down", keys: Key[]) => void
  onDragItems?: (keys: Key[]) => void
  onDropItems?: (beforeKey: Key | null) => void
  onDragFinish?: () => void
  className?: string
}
