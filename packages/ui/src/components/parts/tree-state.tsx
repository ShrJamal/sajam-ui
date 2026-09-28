"use client"

import { useRef, useState, type FocusEvent, type KeyboardEvent } from "react"

// Roving focus and APG tree keyboard support shared by Tree and OrganizationChart.
// This module is internal: it has no public facade.
export function useTreeNavigation<N extends TreeLikeNode<N>>({
  rows,
  initialKey,
  onExpand,
  onCollapse,
  onSelect,
}: NavigationOptions<N>) {
  const [focusedKey, setFocusedKey] = useState<string>()
  const elements = useRef(new Map<string, HTMLElement>())
  const activeKey = rows.some(function (row) {
    return row.node.key === focusedKey
  })
    ? focusedKey
    : rows.some(function (row) {
          return row.node.key === initialKey
        })
      ? initialKey
      : rows[0]?.node.key

  function focusRow(row: TreeRow<N> | undefined) {
    if (!row) return
    setFocusedKey(row.node.key)
    elements.current.get(row.node.key)?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>, index: number) {
    // Ignore keys from nested items and from interactive content rendered inside a node.
    if (event.target !== event.currentTarget) return
    const row = rows[index]
    if (!row) return
    switch (event.key) {
      case "ArrowDown":
        focusRow(rows[index + 1])
        break
      case "ArrowUp":
        focusRow(rows[index - 1])
        break
      case "Home":
        focusRow(rows[0])
        break
      case "End":
        focusRow(rows[rows.length - 1])
        break
      case "ArrowRight":
        if (row.expanded) {
          const next = rows[index + 1]
          if (next?.parentKey === row.node.key) focusRow(next)
        } else if (row.expandable) {
          onExpand(row)
        }
        break
      case "ArrowLeft":
        if (row.expanded && onCollapse) {
          onCollapse(row)
        } else {
          focusRow(
            rows.find(function (item) {
              return item.node.key === row.parentKey
            }),
          )
        }
        break
      case "Enter":
      case " ":
        onSelect(row)
        break
      default:
        return
    }
    event.preventDefault()
  }

  function getItemProps(row: TreeRow<N>, index: number) {
    return {
      ref(element: HTMLElement | null) {
        if (!element) return
        elements.current.set(row.node.key, element)
        return function () {
          elements.current.delete(row.node.key)
        }
      },
      tabIndex: row.node.key === activeKey ? 0 : -1,
      onFocus(event: FocusEvent<HTMLElement>) {
        if (event.target === event.currentTarget) setFocusedKey(row.node.key)
      },
      onKeyDown(event: KeyboardEvent<HTMLElement>) {
        handleKeyDown(event, index)
      },
    }
  }

  return { getItemProps }
}

// Lists the visible nodes in document order with the metadata a flat treeitem needs.
export function flattenTree<N extends TreeLikeNode<N>>(
  nodes: readonly N[],
  isExpanded: (node: N) => boolean,
  isExpandable: (node: N) => boolean = hasChildNodes,
  level = 0,
  parentKey?: string,
  rows: TreeRow<N>[] = [],
) {
  nodes.forEach(function (node, position) {
    const expandable = isExpandable(node)
    const expanded = expandable && isExpanded(node)
    rows.push({ node, level, parentKey, position, setSize: nodes.length, expandable, expanded })
    if (expanded && node.children) {
      flattenTree(node.children, isExpanded, isExpandable, level + 1, node.key, rows)
    }
  })
  return rows
}

// Returns the keys of every node that contains one of the target keys.
export function collectAncestorKeys<N extends TreeLikeNode<N>>(
  nodes: readonly N[],
  targets: ReadonlySet<string>,
) {
  const ancestors: string[] = []

  function visit(node: N): boolean {
    let contains = false
    for (const child of node.children ?? []) {
      if (visit(child)) contains = true
    }
    if (contains) ancestors.push(node.key)
    return contains || targets.has(node.key)
  }

  nodes.forEach(visit)
  return ancestors
}

// Attaches lazily loaded children to nodes that did not declare any of their own.
export function mergeLoadedChildren<N extends LazyNode<N>>(
  nodes: readonly N[],
  loaded: Readonly<Record<string, readonly N[]>>,
): N[] {
  return nodes.map(function (node) {
    const children = node.children?.length ? node.children : loaded[node.key]
    if (!children) return node
    return {
      ...node,
      lazy: node.lazy && !loaded[node.key],
      children: mergeLoadedChildren(children, loaded),
    }
  })
}

export type TreeLikeNode<N> = {
  key: string
  disabled?: boolean
  children?: readonly N[]
}

export type TreeRow<N> = {
  node: N
  level: number
  parentKey?: string
  position: number
  setSize: number
  expandable: boolean
  expanded: boolean
}

type LazyNode<N> = TreeLikeNode<N> & { lazy?: boolean }

type NavigationOptions<N> = {
  rows: TreeRow<N>[]
  initialKey?: string | null
  onExpand: (row: TreeRow<N>) => void
  onCollapse?: (row: TreeRow<N>) => void
  onSelect: (row: TreeRow<N>) => void
}

function hasChildNodes<N extends TreeLikeNode<N>>(node: N) {
  return Boolean(node.children?.length)
}
