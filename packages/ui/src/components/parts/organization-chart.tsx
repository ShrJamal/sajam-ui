"use client"

import { cn } from "cn"
import { ChevronDownIcon } from "lucide-react"
import { useMemo, useState, type ReactNode } from "react"
import { flattenTree, useTreeNavigation, type TreeRow } from "./tree-state.js"

// Connector lines are drawn with pseudo-elements: each child draws half of the shared rail plus its own stem.
const CONNECTORS = {
  vertical: {
    group:
      "relative pt-5 before:absolute before:top-0 before:left-1/2 before:h-5 before:border-l before:border-border",
    item: "relative px-2 pt-5 before:absolute before:top-0 before:right-1/2 before:h-5 before:w-1/2 before:border-t before:border-border after:absolute after:top-0 after:left-1/2 after:h-5 after:w-1/2 after:border-t after:border-l after:border-border first:before:border-0 first:after:rounded-tl-md last:before:rounded-tr-md last:before:border-r last:after:border-0 only:pt-0 only:before:hidden only:after:hidden",
  },
  horizontal: {
    group:
      "relative pl-5 before:absolute before:top-1/2 before:left-0 before:w-5 before:border-t before:border-border",
    item: "relative py-2 pl-5 before:absolute before:top-0 before:left-0 before:h-1/2 before:w-5 before:border-l before:border-border after:absolute after:top-1/2 after:left-0 after:h-1/2 after:w-5 after:border-t after:border-l after:border-border first:before:border-0 first:after:rounded-tl-md last:before:rounded-bl-md last:before:border-b last:after:border-0 only:pl-0 only:before:hidden only:after:hidden",
  },
}

// Displays a selectable hierarchy with collapsible branches and custom node cards.
export function OrganizationChart<T>({
  nodes,
  label = "Organization chart",
  orientation = "vertical",
  value,
  defaultValue = null,
  onValueChange,
  expandedKeys,
  defaultExpandedKeys,
  onExpandedKeysChange,
  collapsible = true,
  renderNode,
  className,
}: Props<T>) {
  const [localValue, setLocalValue] = useState(defaultValue)
  const [localExpanded, setLocalExpanded] = useState(function () {
    return defaultExpandedKeys ?? collectParentKeys(nodes)
  })
  const selected = value !== undefined ? value : localValue
  const expanded = expandedKeys ?? localExpanded
  const expandedSet = useMemo(
    function () {
      return new Set(expanded)
    },
    [expanded],
  )
  const rows = flattenTree(nodes, function (node) {
    return !collapsible || expandedSet.has(node.key)
  })
  const rowIndexes = new Map(
    rows.map(function (row, index) {
      return [row.node.key, index]
    }),
  )
  const { getItemProps } = useTreeNavigation({
    rows,
    initialKey: selected,
    onExpand: toggle,
    onCollapse: collapsible ? toggle : undefined,
    onSelect: function (row) {
      select(row.node)
    },
  })
  const connectors = CONNECTORS[orientation]

  function toggle(row: TreeRow<OrganizationChartNode<T>>) {
    if (!collapsible) return
    const next = row.expanded
      ? expanded.filter(function (key) {
          return key !== row.node.key
        })
      : [...expanded, row.node.key]
    if (expandedKeys === undefined) setLocalExpanded(next)
    onExpandedKeysChange?.(next)
  }

  function select(node: OrganizationChartNode<T>) {
    if (node.disabled || node.key === selected) return
    if (value === undefined) setLocalValue(node.key)
    onValueChange?.(node.key)
  }

  function renderBranch(branch: OrganizationChartNode<T>[], level: number): ReactNode {
    return (
      <ul
        role={level === 0 ? "tree" : "group"}
        aria-label={level === 0 ? label : undefined}
        className={cn(
          "m-0 flex list-none p-0",
          orientation === "vertical" ? "justify-center" : "flex-col justify-center",
          level === 0 ? "gap-6" : connectors.group,
        )}
      >
        {branch.map(function (node) {
          const index = rowIndexes.get(node.key) ?? -1
          const row = rows[index]
          if (!row) return null
          const isSelected = selected === node.key
          return (
            <li
              key={node.key}
              {...getItemProps(row, index)}
              role="treeitem"
              aria-level={row.level + 1}
              aria-posinset={row.position + 1}
              aria-setsize={row.setSize}
              aria-selected={isSelected}
              aria-expanded={collapsible && row.expandable ? row.expanded : undefined}
              aria-disabled={node.disabled || undefined}
              className={cn(
                "focus-visible:[&>[data-slot=organization-chart-node]]:ring-ring/50 flex outline-none focus-visible:[&>[data-slot=organization-chart-node]]:ring-3",
                orientation === "vertical" ? "flex-col items-center" : "items-center",
                level > 0 && connectors.item,
              )}
            >
              <div
                data-slot="organization-chart-node"
                data-selected={isSelected || undefined}
                data-disabled={node.disabled || undefined}
                onClick={function () {
                  select(node)
                }}
                className="bg-card text-card-foreground data-selected:border-primary data-selected:ring-primary/20 relative min-w-36 cursor-default rounded-lg border px-3 py-2 text-center text-sm shadow-xs select-none data-disabled:opacity-50 data-selected:ring-3"
              >
                {renderNode ? (
                  renderNode(node)
                ) : (
                  <>
                    <p className="font-medium">{node.label}</p>
                    {node.description ? (
                      <p className="text-muted-foreground mt-0.5 text-xs">{node.description}</p>
                    ) : null}
                  </>
                )}
                {collapsible && row.expandable ? (
                  <span
                    aria-hidden="true"
                    onClick={function (event) {
                      event.stopPropagation()
                      toggle(row)
                    }}
                    className={cn(
                      "bg-background text-muted-foreground hover:text-foreground absolute z-10 grid size-5 place-items-center rounded-full border",
                      orientation === "vertical"
                        ? "-bottom-2.5 left-1/2 -translate-x-1/2"
                        : "top-1/2 -right-2.5 -translate-y-1/2",
                    )}
                  >
                    <ChevronDownIcon
                      className={cn(
                        "size-3.5 transition-transform",
                        orientation === "vertical"
                          ? row.expanded && "rotate-180"
                          : row.expanded
                            ? "rotate-90"
                            : "-rotate-90",
                      )}
                    />
                  </span>
                ) : null}
              </div>
              {row.expanded && node.children?.length
                ? renderBranch(node.children, level + 1)
                : null}
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div
      data-slot="organization-chart"
      data-orientation={orientation}
      className={cn("overflow-auto p-4", className)}
    >
      <div className="mx-auto w-max">{renderBranch(nodes, 0)}</div>
    </div>
  )
}

export type OrganizationChartNode<T = unknown> = {
  key: string
  label: ReactNode
  description?: ReactNode
  children?: OrganizationChartNode<T>[]
  disabled?: boolean
  data?: T
}

type Props<T> = {
  nodes: OrganizationChartNode<T>[]
  label?: string
  orientation?: "vertical" | "horizontal"
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  expandedKeys?: string[]
  defaultExpandedKeys?: string[]
  onExpandedKeysChange?: (keys: string[]) => void
  // When false, every branch stays open and the expand controls are hidden.
  collapsible?: boolean
  renderNode?: (node: OrganizationChartNode<T>) => ReactNode
  className?: string
}

function collectParentKeys<T>(nodes: OrganizationChartNode<T>[]): string[] {
  return nodes.flatMap(function (node) {
    return node.children?.length ? [node.key, ...collectParentKeys(node.children)] : []
  })
}
