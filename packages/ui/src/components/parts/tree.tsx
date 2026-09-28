"use client"

import { cn } from "cn"
import { CheckIcon, ChevronRightIcon, MinusIcon, SearchIcon } from "lucide-react"
import { useMemo, useState, type MouseEvent, type ReactNode } from "react"
import { Input } from "./input.js"
import { Spinner } from "./spinner.js"
import { flattenTree, mergeLoadedChildren, useTreeNavigation, type TreeRow } from "./tree-state.js"

const EMPTY_KEYS: ReadonlySet<string> = new Set()

// Presents hierarchical data with roving focus, selection, filtering, and lazy branches.
export function Tree<T>(props: Props<T>) {
  const {
    nodes,
    label = "Tree",
    expandedKeys,
    defaultExpandedKeys = [],
    onExpandedKeysChange,
    filterable = false,
    filterValue,
    defaultFilterValue = "",
    onFilterValueChange,
    filterPlaceholder = "Filter…",
    emptyMessage = "No results found.",
    renderNode,
    onLoadChildren,
    onLoadError,
    onNodeAction,
    onNodeContextMenu,
    className,
  } = props
  const mode = props.selectionMode ?? "single"
  const [localValue, setLocalValue] = useState(function () {
    return toKeys(props.defaultValue)
  })
  const [localExpanded, setLocalExpanded] = useState(defaultExpandedKeys)
  const [localFilter, setLocalFilter] = useState(defaultFilterValue)
  const [loaded, setLoaded] = useState<Record<string, TreeNode<T>[]>>({})
  const [loadingKeys, setLoadingKeys] = useState<ReadonlySet<string>>(EMPTY_KEYS)
  const [filterCollapsed, setFilterCollapsed] = useState({ query: "", keys: EMPTY_KEYS })
  const selectedKeys = props.value !== undefined ? toKeys(props.value) : localValue
  const expanded = expandedKeys ?? localExpanded
  const query = (filterValue ?? localFilter).trim().toLocaleLowerCase()
  const effectiveNodes = useMemo(
    function () {
      return mergeLoadedChildren(nodes, loaded)
    },
    [loaded, nodes],
  )
  const selectedSet = useMemo(
    function () {
      return new Set(selectedKeys)
    },
    [selectedKeys],
  )
  const expandedSet = useMemo(
    function () {
      return new Set(expanded)
    },
    [expanded],
  )
  const checkStates = useMemo(
    function () {
      return mode === "checkbox" ? computeCheckStates(effectiveNodes, selectedSet).states : null
    },
    [effectiveNodes, mode, selectedSet],
  )
  const filtered = useMemo(
    function () {
      const openKeys = new Set<string>()
      return {
        nodes: query ? filterNodes(effectiveNodes, query, openKeys) : effectiveNodes,
        openKeys,
      }
    },
    [effectiveNodes, query],
  )
  const collapsedMatches = filterCollapsed.query === query ? filterCollapsed.keys : EMPTY_KEYS
  const rows = flattenTree(
    filtered.nodes,
    function (node) {
      return query && filtered.openKeys.has(node.key)
        ? !collapsedMatches.has(node.key)
        : expandedSet.has(node.key)
    },
    hasChildren,
  )
  const { getItemProps } = useTreeNavigation({
    rows,
    initialKey: rows.find(function (row) {
      return selectedSet.has(row.node.key)
    })?.node.key,
    onExpand: toggle,
    onCollapse: toggle,
    onSelect: function (row) {
      select(row.node)
    },
  })

  function changeExpanded(next: string[]) {
    if (expandedKeys === undefined) setLocalExpanded(next)
    onExpandedKeysChange?.(next)
  }

  function toggle(row: TreeRow<TreeNode<T>>) {
    const { key } = row.node
    // Filtering auto-expands the ancestors of matches; collapsing them only lasts for the current query.
    if (query && filtered.openKeys.has(key)) {
      const keys = new Set(collapsedMatches)
      if (row.expanded) keys.add(key)
      else keys.delete(key)
      setFilterCollapsed({ query, keys })
      return
    }
    if (row.expanded) {
      changeExpanded(
        expanded.filter(function (item) {
          return item !== key
        }),
      )
      return
    }
    changeExpanded([...expanded, key])
    if (row.node.lazy && !row.node.children?.length && !loadingKeys.has(key)) {
      void loadChildren(row.node)
    }
  }

  async function loadChildren(node: TreeNode<T>) {
    if (!onLoadChildren) return
    setLoadingKeys(function (current) {
      return new Set(current).add(node.key)
    })
    try {
      const children = await onLoadChildren(node)
      if (children) {
        setLoaded(function (current) {
          return { ...current, [node.key]: children }
        })
      }
    } catch (error) {
      onLoadError?.(error, node)
    } finally {
      setLoadingKeys(function (current) {
        const next = new Set(current)
        next.delete(node.key)
        return next
      })
    }
  }

  function commit(keys: string[]) {
    if (props.value === undefined) setLocalValue(keys)
    if (props.selectionMode === "multiple" || props.selectionMode === "checkbox") {
      props.onValueChange?.(keys)
    } else {
      props.onValueChange?.(keys[0] ?? null)
    }
  }

  function select(node: TreeNode<T>) {
    if (node.disabled) return
    updateSelection(node)
    onNodeAction?.(node)
  }

  function updateSelection(node: TreeNode<T>) {
    if (mode === "single") {
      if (!selectedSet.has(node.key)) commit([node.key])
      return
    }
    if (mode === "multiple") {
      commit(
        selectedSet.has(node.key)
          ? selectedKeys.filter(function (key) {
              return key !== node.key
            })
          : [...selectedKeys, node.key],
      )
      return
    }
    const next = new Set(selectedSet)
    const checked = checkStates?.get(node.key) === true
    for (const key of collectEnabledKeys(node)) {
      if (checked) next.delete(key)
      else next.add(key)
    }
    // Parents mirror their children so the value always describes complete branches.
    const { states, parentKeys } = computeCheckStates(effectiveNodes, next)
    for (const key of parentKeys) {
      if (states.get(key) === true) next.add(key)
      else next.delete(key)
    }
    commit([...next])
  }

  return (
    <div
      data-slot="tree"
      className={cn("flex min-h-0 flex-col gap-2", className)}
    >
      {filterable ? (
        <div className="relative shrink-0">
          <SearchIcon
            aria-hidden="true"
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
          />
          <Input
            type="search"
            aria-label={filterPlaceholder}
            placeholder={filterPlaceholder}
            value={filterValue ?? localFilter}
            onChange={function (event) {
              if (filterValue === undefined) setLocalFilter(event.target.value)
              onFilterValueChange?.(event.target.value)
            }}
            className="pl-8"
          />
        </div>
      ) : null}
      {rows.length ? (
        <div
          role="tree"
          aria-label={label}
          aria-multiselectable={mode !== "single" || undefined}
          className="-m-0.5 min-h-0 overflow-auto p-0.5"
        >
          {rows.map(function (row, index) {
            const { node } = row
            const checkState = checkStates?.get(node.key) ?? false
            const selected = mode === "checkbox" ? undefined : selectedSet.has(node.key)
            const loading = loadingKeys.has(node.key)
            return (
              <div
                key={node.key}
                {...getItemProps(row, index)}
                role="treeitem"
                aria-level={row.level + 1}
                aria-posinset={row.position + 1}
                aria-setsize={row.setSize}
                aria-expanded={row.expandable ? row.expanded : undefined}
                aria-selected={selected}
                aria-checked={
                  mode === "checkbox" ? (checkState === "mixed" ? "mixed" : checkState) : undefined
                }
                aria-disabled={node.disabled || undefined}
                aria-busy={loading || undefined}
                data-selected={selected || undefined}
                data-disabled={node.disabled || undefined}
                onClick={function () {
                  select(node)
                }}
                onContextMenu={function (event) {
                  onNodeContextMenu?.(event, node)
                }}
                className="hover:bg-muted focus-visible:ring-ring/50 data-selected:bg-accent data-selected:text-accent-foreground flex min-h-8 cursor-default items-center gap-1.5 rounded-md pr-2 text-sm outline-none select-none focus-visible:ring-2"
                style={{ paddingInlineStart: `${row.level * 1.25 + 0.25}rem` }}
              >
                <span
                  aria-hidden="true"
                  onClick={function (event) {
                    if (!row.expandable) return
                    event.stopPropagation()
                    toggle(row)
                  }}
                  className="text-muted-foreground grid size-6 shrink-0 place-items-center rounded-sm"
                >
                  {loading ? (
                    <Spinner />
                  ) : row.expandable ? (
                    <ChevronRightIcon
                      className={cn(
                        "size-4 transition-transform rtl:rotate-180",
                        row.expanded && "rotate-90 rtl:rotate-90",
                      )}
                    />
                  ) : null}
                </span>
                {mode === "checkbox" ? (
                  <span
                    aria-hidden="true"
                    data-checked={checkState !== false || undefined}
                    className={cn(
                      "border-input dark:bg-input/30 data-checked:border-primary data-checked:bg-primary dark:data-checked:bg-primary data-checked:text-primary-foreground flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors [&>svg]:size-3.5",
                      node.disabled && "opacity-50",
                    )}
                  >
                    {checkState === "mixed" ? <MinusIcon /> : checkState ? <CheckIcon /> : null}
                  </span>
                ) : null}
                {node.icon ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-muted-foreground flex shrink-0 [&_svg:not([class*='size-'])]:size-4",
                      node.disabled && "opacity-50",
                    )}
                  >
                    {node.icon}
                  </span>
                ) : null}
                <span className={cn("min-w-0 flex-1 truncate", node.disabled && "opacity-50")}>
                  {renderNode ? renderNode(node) : node.label}
                </span>
              </div>
            )
          })}
        </div>
      ) : (
        <p
          role="status"
          className="text-muted-foreground px-2 py-6 text-center text-sm"
        >
          {emptyMessage}
        </p>
      )}
    </div>
  )
}

export type TreeNode<T = unknown> = {
  key: string
  label: ReactNode
  // Plain text used for filtering when `label` is not a string.
  textValue?: string
  children?: TreeNode<T>[]
  disabled?: boolean
  icon?: ReactNode
  data?: T
  // Loads children through `onLoadChildren` the first time the node expands.
  lazy?: boolean
}

export type TreeSelectionMode = "single" | "multiple" | "checkbox"

// Single selection uses one key or null; multiple and checkbox selection use key arrays.
export type TreeSelectionProps =
  | {
      selectionMode?: "single"
      value?: string | null
      defaultValue?: string | null
      onValueChange?: (value: string | null) => void
    }
  | {
      selectionMode: "multiple"
      value?: string[]
      defaultValue?: string[]
      onValueChange?: (value: string[]) => void
    }
  | {
      selectionMode: "checkbox"
      value?: string[]
      defaultValue?: string[]
      onValueChange?: (value: string[]) => void
    }

type Props<T> = TreeSelectionProps & {
  nodes: TreeNode<T>[]
  label?: string
  expandedKeys?: string[]
  defaultExpandedKeys?: string[]
  onExpandedKeysChange?: (keys: string[]) => void
  filterable?: boolean
  filterValue?: string
  defaultFilterValue?: string
  onFilterValueChange?: (value: string) => void
  filterPlaceholder?: string
  emptyMessage?: ReactNode
  renderNode?: (node: TreeNode<T>) => ReactNode
  onLoadChildren?: (node: TreeNode<T>) => Promise<TreeNode<T>[] | void> | TreeNode<T>[] | void
  onLoadError?: (error: unknown, node: TreeNode<T>) => void
  // Runs after a node is picked by click, Enter, or Space, even when its selection does not change.
  onNodeAction?: (node: TreeNode<T>) => void
  onNodeContextMenu?: (event: MouseEvent<HTMLDivElement>, node: TreeNode<T>) => void
  className?: string
}

type CheckState = boolean | "mixed"

function toKeys(value: string | string[] | null | undefined) {
  if (Array.isArray(value)) return value
  return value ? [value] : []
}

function hasChildren<T>(node: TreeNode<T>) {
  return Boolean(node.children?.length || node.lazy)
}

// Keeps matching nodes with their whole subtree and records ancestors that should open.
function filterNodes<T>(nodes: TreeNode<T>[], query: string, openKeys: Set<string>): TreeNode<T>[] {
  return nodes.flatMap(function (node) {
    const children = filterNodes(node.children ?? [], query, openKeys)
    if (children.length) openKeys.add(node.key)
    if (textOf(node).toLocaleLowerCase().includes(query)) return [node]
    return children.length ? [{ ...node, children }] : []
  })
}

function textOf<T>(node: TreeNode<T>) {
  const label =
    typeof node.label === "string" || typeof node.label === "number" ? String(node.label) : ""
  return `${label} ${node.textValue ?? ""}`
}

// Derives every node's checkbox state in one pass. Disabled leaves keep their own state but do not
// affect their parents, so a locked item never prevents a branch from being checked.
function computeCheckStates<T>(nodes: TreeNode<T>[], selected: ReadonlySet<string>) {
  const states = new Map<string, CheckState>()
  const parentKeys: string[] = []

  function visit(node: TreeNode<T>): CheckState | undefined {
    const childStates = (node.children ?? []).map(visit).filter(function (state) {
      return state !== undefined
    })
    let state: CheckState | undefined
    if (childStates.length) {
      parentKeys.push(node.key)
      state = childStates.every(function (item) {
        return item === true
      })
        ? true
        : childStates.some(function (item) {
              return item !== false
            })
          ? "mixed"
          : false
    } else if (!node.disabled) {
      state = selected.has(node.key)
    }
    states.set(node.key, state ?? selected.has(node.key))
    return state
  }

  nodes.forEach(visit)
  return { states, parentKeys }
}

// A disabled node keeps its own state, but its enabled descendants still follow their ancestors.
function collectEnabledKeys<T>(node: TreeNode<T>, keys: string[] = []) {
  if (!node.disabled) keys.push(node.key)
  node.children?.forEach(function (child) {
    collectEnabledKeys(child, keys)
  })
  return keys
}
