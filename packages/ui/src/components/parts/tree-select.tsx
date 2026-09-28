"use client"

import { cn } from "cn"
import { ChevronDownIcon, XIcon } from "lucide-react"
import { useId, useMemo, useRef, useState, type ReactNode } from "react"
import { Badge } from "./badge.js"
import { Button } from "./button.js"
import * as Popover from "./popover.js"
import { collectAncestorKeys, mergeLoadedChildren } from "./tree-state.js"
import { Tree, type TreeNode, type TreeSelectionProps } from "./tree.js"

// Opens a filterable tree from a form control and keeps its expansion and loaded branches between openings.
export function TreeSelect<T>(props: Props<T>) {
  const {
    nodes,
    id,
    label,
    "aria-labelledby": labelledBy,
    placeholder = "Select…",
    filterable = true,
    filterPlaceholder,
    emptyMessage,
    disabled = false,
    clearable = false,
    clearLabel = "Clear selection",
    display = "label",
    name,
    open,
    defaultOpen = false,
    onOpenChange,
    expandedKeys,
    defaultExpandedKeys,
    onExpandedKeysChange,
    renderValue,
    renderNode,
    onLoadChildren,
    onLoadError,
    className,
  } = props
  const multiple = props.selectionMode === "multiple" || props.selectionMode === "checkbox"
  const labelId = useId()
  const valueId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [localValue, setLocalValue] = useState(function () {
    return toKeys(props.defaultValue)
  })
  const [localOpen, setLocalOpen] = useState(defaultOpen)
  const [filterValue, setFilterValue] = useState("")
  const [loaded, setLoaded] = useState<Record<string, TreeNode<T>[]>>({})
  const selectedKeys = props.value !== undefined ? toKeys(props.value) : localValue
  const effectiveNodes = useMemo(
    function () {
      return mergeLoadedChildren(nodes, loaded)
    },
    [loaded, nodes],
  )
  const [localExpanded, setLocalExpanded] = useState(function () {
    return (
      defaultExpandedKeys ??
      collectAncestorKeys(effectiveNodes, new Set(toKeys(props.defaultValue)))
    )
  })
  const expanded = expandedKeys ?? localExpanded
  const isOpen = open ?? localOpen
  const byKey = useMemo(
    function () {
      const map = new Map<string, TreeNode<T>>()
      indexNodes(effectiveNodes, map)
      return map
    },
    [effectiveNodes],
  )
  const selectedNodes = selectedKeys.flatMap(function (key) {
    const node = byKey.get(key)
    return node ? [node] : []
  })
  const showClear = clearable && selectedKeys.length > 0 && !disabled
  const selection: TreeSelectionProps = multiple
    ? {
        selectionMode: props.selectionMode,
        value: selectedKeys,
        onValueChange: commit,
      }
    : {
        selectionMode: "single",
        value: selectedKeys[0] ?? null,
        onValueChange: function (key) {
          commit(key ? [key] : [])
        },
      }

  function commit(keys: string[]) {
    if (props.value === undefined) setLocalValue(keys)
    if (props.selectionMode === "multiple" || props.selectionMode === "checkbox") {
      props.onValueChange?.(keys)
    } else {
      props.onValueChange?.(keys[0] ?? null)
    }
  }

  function changeExpanded(next: string[]) {
    if (expandedKeys === undefined) setLocalExpanded(next)
    onExpandedKeysChange?.(next)
  }

  function changeOpen(next: boolean) {
    // Reveal the current selection each time the tree opens.
    if (next) {
      const missing = collectAncestorKeys(effectiveNodes, new Set(selectedKeys)).filter(
        function (key) {
          return !expanded.includes(key)
        },
      )
      if (missing.length) changeExpanded([...expanded, ...missing])
    }
    if (open === undefined) setLocalOpen(next)
    onOpenChange?.(next)
  }

  const summary = renderValue ? (
    renderValue(selectedNodes)
  ) : !selectedNodes.length ? (
    <span className="text-muted-foreground">{placeholder}</span>
  ) : display === "chips" ? (
    <span className="flex flex-wrap gap-1">
      {selectedNodes.map(function (node) {
        return (
          <Badge
            key={node.key}
            variant="secondary"
          >
            {node.label}
          </Badge>
        )
      })}
    </span>
  ) : selectedNodes.length === 1 ? (
    selectedNodes[0]!.label
  ) : (
    `${selectedNodes.length} selected`
  )

  return (
    <div
      data-slot="tree-select"
      className={cn("relative inline-flex w-full min-w-48", className)}
    >
      {label && !labelledBy ? (
        <span
          id={labelId}
          className="sr-only"
        >
          {label}
        </span>
      ) : null}
      <Popover.Root
        open={isOpen}
        onOpenChange={changeOpen}
      >
        <Popover.Trigger
          id={id}
          disabled={disabled}
          ref={triggerRef}
          aria-labelledby={[labelledBy ?? (label ? labelId : undefined), valueId]
            .filter(Boolean)
            .join(" ")}
          render={<Button variant="outline" />}
          className={cn(
            "w-full min-w-0 justify-between font-normal",
            display === "chips" && "h-auto min-h-8 py-1",
          )}
        >
          <span
            id={valueId}
            className={cn(
              "min-w-0 flex-1 text-start",
              display === "chips" ? "py-0.5" : "truncate",
              showClear && "pe-7",
            )}
          >
            {summary}
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            data-icon="inline-end"
            className="text-muted-foreground"
          />
        </Popover.Trigger>
        <Popover.Content
          align="start"
          className="w-(--anchor-width) min-w-64 p-2"
        >
          <Tree<T>
            {...selection}
            nodes={effectiveNodes}
            label={label ?? "Options"}
            expandedKeys={expanded}
            onExpandedKeysChange={changeExpanded}
            filterable={filterable}
            filterValue={filterValue}
            onFilterValueChange={setFilterValue}
            filterPlaceholder={filterPlaceholder}
            emptyMessage={emptyMessage}
            renderNode={renderNode}
            onNodeAction={function () {
              // Picking a node closes single selection, including the node that is already selected.
              if (!multiple) changeOpen(false)
            }}
            onLoadError={onLoadError}
            onLoadChildren={
              onLoadChildren &&
              async function (node) {
                // Loaded branches live here so they survive the popup unmounting.
                const children = await onLoadChildren(node)
                if (children) {
                  setLoaded(function (current) {
                    return { ...current, [node.key]: children }
                  })
                }
              }
            }
            className="max-h-80"
          />
        </Popover.Content>
      </Popover.Root>
      {showClear ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={clearLabel}
          onClick={function () {
            commit([])
            triggerRef.current?.focus()
          }}
          className="absolute top-1/2 right-8 -translate-y-1/2"
        >
          <XIcon />
        </Button>
      ) : null}
      {name
        ? (selectedKeys.length ? selectedKeys : [""]).map(function (key) {
            return (
              <input
                key={key}
                type="hidden"
                name={name}
                value={key}
                disabled={disabled}
              />
            )
          })
        : null}
    </div>
  )
}

type Props<T> = TreeSelectionProps & {
  nodes: TreeNode<T>[]
  id?: string
  // Accessible name when no visible label is referenced through `aria-labelledby`.
  label?: string
  "aria-labelledby"?: string
  placeholder?: ReactNode
  filterable?: boolean
  filterPlaceholder?: string
  emptyMessage?: ReactNode
  disabled?: boolean
  clearable?: boolean
  clearLabel?: string
  display?: "label" | "chips"
  name?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  expandedKeys?: string[]
  defaultExpandedKeys?: string[]
  onExpandedKeysChange?: (keys: string[]) => void
  renderValue?: (nodes: TreeNode<T>[]) => ReactNode
  renderNode?: (node: TreeNode<T>) => ReactNode
  onLoadChildren?: (node: TreeNode<T>) => Promise<TreeNode<T>[] | void> | TreeNode<T>[] | void
  onLoadError?: (error: unknown, node: TreeNode<T>) => void
  className?: string
}

function toKeys(value: string | string[] | null | undefined) {
  if (Array.isArray(value)) return value
  return value ? [value] : []
}

function indexNodes<T>(nodes: TreeNode<T>[], map: Map<string, TreeNode<T>>) {
  for (const node of nodes) {
    map.set(node.key, node)
    if (node.children) indexNodes(node.children, map)
  }
}
