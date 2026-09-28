"use client"

import { cn } from "cn"
import { ChevronLeftIcon, ChevronRightIcon, Grid2X2Icon, ListIcon, SearchIcon } from "lucide-react"
import {
  useEffect,
  useEffectEvent,
  useId,
  useMemo,
  useRef,
  useState,
  type Key,
  type ReactNode,
} from "react"
import { Button } from "./button.js"
import { Input } from "./input.js"
import { Spinner } from "./spinner.js"
import * as ToggleGroup from "./toggle-group.js"

const DEFAULT_LABELS: DataViewLabels = {
  search: "Search",
  layout: "Layout",
  list: "List",
  grid: "Grid",
  previous: "Previous",
  next: "Next",
  loadMore: "Load more",
  loading: "Loading…",
  status: function ({ start, end, total, hasMore }) {
    return total ? `${start}–${end} of ${total}${hasMore ? "+" : ""}` : "No results"
  },
}

// Presents a collection as a list or grid with optional search, sorting, and paging.
// Paging splits local items into pages, reveals them in batches, or asks for more records.
export function DataView<T>({
  items,
  itemKey,
  renderItem,
  layout,
  defaultLayout = "list",
  onLayoutChange,
  showLayoutToggle = true,
  filterItem,
  filterValue,
  defaultFilterValue = "",
  onFilterValueChange,
  sort,
  paging = "pages",
  pageSize = 6,
  page,
  defaultPage = 1,
  onPageChange,
  hasMore = false,
  loading = false,
  onLoadMore,
  label,
  emptyMessage = "No results found.",
  labels,
  className,
}: Props<T>) {
  const text = { ...DEFAULT_LABELS, ...labels }
  const listId = useId()
  const sentinelRef = useRef<HTMLDivElement>(null)
  const size = Math.max(1, Math.floor(pageSize) || 1)
  const [localLayout, setLocalLayout] = useState(defaultLayout)
  const [localFilter, setLocalFilter] = useState(defaultFilterValue)
  const [localPage, setLocalPage] = useState(defaultPage)
  const [revealed, setRevealed] = useState(size)
  const currentLayout = layout ?? localLayout
  const query = filterValue ?? localFilter
  const filtered = useMemo(
    function () {
      const matching =
        filterItem && query.trim()
          ? items.filter(function (item) {
              return filterItem(item, query)
            })
          : [...items]
      return sort ? matching.sort(sort) : matching
    },
    [filterItem, items, query, sort],
  )
  const pageCount = Math.max(1, Math.ceil(filtered.length / size))
  const currentPage = Math.min(Math.max(1, Math.floor(page ?? localPage) || 1), pageCount)
  // With `onLoadMore`, every loaded item is shown and the consumer supplies the next batch.
  const remote = paging !== "pages" && onLoadMore !== undefined
  const start = paging === "pages" ? (currentPage - 1) * size : 0
  const end =
    paging === "pages" ? currentPage * size : remote ? filtered.length : Math.max(size, revealed)
  const visibleItems = filtered.slice(start, end)
  const canLoadMore = paging !== "pages" && (remote ? hasMore : end < filtered.length)
  const requestMore = useEffectEvent(loadMore)

  useEffect(
    function () {
      const sentinel = sentinelRef.current
      if (paging !== "infinite" || !sentinel || !canLoadMore || loading) return
      // Re-observing after every batch keeps loading until the sentinel leaves the viewport.
      const observer = new IntersectionObserver(
        function (entries) {
          if (
            entries.some(function (entry) {
              return entry.isIntersecting
            })
          ) {
            requestMore()
          }
        },
        { rootMargin: "160px 0px" },
      )
      observer.observe(sentinel)
      return function () {
        observer.disconnect()
      }
    },
    [canLoadMore, loading, paging, visibleItems.length],
  )

  function loadMore() {
    if (loading || !canLoadMore) return
    if (remote) onLoadMore?.()
    else setRevealed(end + size)
  }

  function changePage(next: number) {
    if (page === undefined) setLocalPage(next)
    onPageChange?.(next)
  }

  function changeFilter(next: string) {
    if (filterValue === undefined) setLocalFilter(next)
    onFilterValueChange?.(next)
    setRevealed(size)
    if (currentPage !== 1) changePage(1)
  }

  return (
    <div
      data-slot="data-view"
      className={cn("flex w-full min-w-0 flex-col gap-3", className)}
    >
      {filterItem || showLayoutToggle ? (
        <div className="flex items-center gap-2">
          {filterItem ? (
            <div className="relative min-w-0 flex-1">
              <SearchIcon
                aria-hidden="true"
                className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
              />
              <Input
                type="search"
                aria-label={text.search}
                aria-controls={listId}
                placeholder={text.search}
                value={query}
                onChange={function (event) {
                  changeFilter(event.target.value)
                }}
                className="pl-8"
              />
            </div>
          ) : null}
          {showLayoutToggle ? (
            <ToggleGroup.Root
              aria-label={text.layout}
              variant="outline"
              size="sm"
              value={[currentLayout]}
              onValueChange={function (next) {
                const nextLayout = next[0]
                if (nextLayout !== "list" && nextLayout !== "grid") return
                if (layout === undefined) setLocalLayout(nextLayout)
                onLayoutChange?.(nextLayout)
              }}
              className="ml-auto"
            >
              <ToggleGroup.Item
                value="list"
                aria-label={text.list}
              >
                <ListIcon />
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="grid"
                aria-label={text.grid}
              >
                <Grid2X2Icon />
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          ) : null}
        </div>
      ) : null}

      {visibleItems.length ? (
        <div
          id={listId}
          role="list"
          aria-label={label}
          aria-busy={loading || undefined}
          data-layout={currentLayout}
          className={cn(
            currentLayout === "grid"
              ? "grid grid-cols-[repeat(auto-fill,minmax(min(100%,12rem),1fr))] gap-3"
              : "flex flex-col gap-2",
          )}
        >
          {visibleItems.map(function (item, index) {
            return (
              <div
                key={itemKey(item)}
                role="listitem"
                className="min-w-0"
              >
                {renderItem(item, { index: start + index, layout: currentLayout })}
              </div>
            )
          })}
        </div>
      ) : (
        <div
          id={listId}
          className="text-muted-foreground flex min-h-32 items-center justify-center rounded-lg border border-dashed p-6 text-center text-sm"
        >
          {loading ? <Spinner aria-hidden="true" /> : emptyMessage}
        </div>
      )}

      <div className="flex min-h-8 flex-wrap items-center justify-between gap-2">
        <p
          role="status"
          className="text-muted-foreground flex items-center gap-2 text-xs tabular-nums"
        >
          {loading
            ? text.loading
            : text.status({
                start: visibleItems.length ? start + 1 : 0,
                end: start + visibleItems.length,
                total: filtered.length,
                hasMore: remote && hasMore,
              })}
        </p>
        {paging === "pages" && pageCount > 1 ? (
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-controls={listId}
              disabled={currentPage <= 1}
              onClick={function () {
                changePage(currentPage - 1)
              }}
            >
              <ChevronLeftIcon data-icon="inline-start" />
              {text.previous}
            </Button>
            <span className="text-muted-foreground min-w-12 text-center text-xs tabular-nums">
              {currentPage} / {pageCount}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-controls={listId}
              disabled={currentPage >= pageCount}
              onClick={function () {
                changePage(currentPage + 1)
              }}
            >
              {text.next}
              <ChevronRightIcon data-icon="inline-end" />
            </Button>
          </div>
        ) : null}
        {paging === "load-more" && (canLoadMore || loading) ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-controls={listId}
            loading={loading}
            onClick={loadMore}
          >
            {text.loadMore}
          </Button>
        ) : null}
        {paging === "infinite" && loading ? <Spinner aria-hidden="true" /> : null}
      </div>
      {paging === "infinite" ? (
        <div
          ref={sentinelRef}
          aria-hidden="true"
          className="h-px"
        />
      ) : null}
    </div>
  )
}

export type DataViewLayout = "list" | "grid"

export type DataViewPaging = "pages" | "load-more" | "infinite"

export type DataViewRenderOptions = {
  index: number
  layout: DataViewLayout
}

export type DataViewLabels = {
  search: string
  layout: string
  list: string
  grid: string
  previous: string
  next: string
  loadMore: string
  loading: string
  status: (range: { start: number; end: number; total: number; hasMore: boolean }) => string
}

type Props<T> = {
  items: readonly T[]
  itemKey: (item: T) => Key
  renderItem: (item: T, options: DataViewRenderOptions) => ReactNode
  layout?: DataViewLayout
  defaultLayout?: DataViewLayout
  onLayoutChange?: (layout: DataViewLayout) => void
  showLayoutToggle?: boolean
  // The search field appears only when `filterItem` is provided.
  filterItem?: (item: T, query: string) => boolean
  filterValue?: string
  defaultFilterValue?: string
  onFilterValueChange?: (value: string) => void
  sort?: (a: T, b: T) => number
  paging?: DataViewPaging
  // Items per page, or per batch when revealing local items.
  pageSize?: number
  // 1-based page number.
  page?: number
  defaultPage?: number
  onPageChange?: (page: number) => void
  // Remote batches: keep `hasMore` true while `onLoadMore` can append items.
  hasMore?: boolean
  loading?: boolean
  onLoadMore?: () => void
  label?: string
  emptyMessage?: ReactNode
  labels?: Partial<DataViewLabels>
  className?: string
}
