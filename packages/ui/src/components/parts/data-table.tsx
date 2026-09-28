"use client"

import {
  columnFilteringFeature,
  columnPinningFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createExpandedRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFns,
  functionalUpdate,
  globalFilteringFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFns,
  tableFeatures,
  useTable,
  type Cell,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  type ColumnVisibilityState,
  type ExpandedState,
  type PaginationState,
  type Row,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type Updater,
} from "@tanstack/react-table"
import { useVirtualizer } from "@tanstack/react-virtual"
import { cn } from "cn"
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ChevronRightIcon,
  Columns3Icon,
  SearchIcon,
} from "lucide-react"
import {
  Fragment,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react"
import { Button } from "./button.js"
import { Checkbox } from "./checkbox.js"
import * as DropdownMenu from "./dropdown-menu.js"
import * as InputGroup from "./input-group.js"
import * as Pagination from "./pagination.js"
import { Skeleton } from "./skeleton.js"
import * as Table from "./table.js"

const SELECT_COLUMN_ID = "select"

// Every built-in filter and sort function stays registered so columns can name them.
const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowExpandingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  columnVisibilityFeature,
  columnPinningFeature,
  columnSizingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  expandedRowModel: createExpandedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns,
  sortFns,
})

const DEFAULT_PAGINATION: PaginationState = { pageIndex: 0, pageSize: 10 }

const DEFAULT_COLUMN_PINNING: ColumnPinningState = { start: [], end: [] }

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50]

const DEFAULT_LABELS: Labels = {
  search: "Search rows",
  searchPlaceholder: "Search…",
  columns: "Columns",
  toggleColumns: "Toggle columns",
  selectAll: "Select all",
  expandRow: "Expand row",
  collapseRow: "Collapse row",
  loading: "Loading rows",
  selected: function (count, total) {
    return `${count} of ${total} selected`
  },
  rowsPerPage: "Rows per page",
  previousPage: "Previous page",
  nextPage: "Next page",
  range: function (from, to, total) {
    return `${from}–${to} of ${total}`
  },
}

// Renders typed rows with TanStack Table. Every state is controlled or uncontrolled,
// and rows are keyed by `getRowId` so selection survives data refreshes and server paging.
function DataTable<TData extends RowData>({
  columns,
  data,
  label,
  getRowId,
  getSubRows,
  getRowCanExpand,
  renderSubComponent,
  selectionMode,
  searchable = false,
  columnMenu = false,
  toolbar,
  paginate = true,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  manual = false,
  rowCount,
  virtual,
  loading = false,
  emptyMessage = "No results.",
  density = "default",
  labels: labelOverrides,
  className,
  sorting: sortingProp,
  defaultSorting = [],
  onSortingChange,
  globalFilter: globalFilterProp,
  defaultGlobalFilter = "",
  onGlobalFilterChange,
  columnFilters: columnFiltersProp,
  defaultColumnFilters = [],
  onColumnFiltersChange,
  pagination: paginationProp,
  defaultPagination = DEFAULT_PAGINATION,
  onPaginationChange,
  rowSelection: rowSelectionProp,
  defaultRowSelection = {},
  onRowSelectionChange,
  columnVisibility: columnVisibilityProp,
  defaultColumnVisibility = {},
  onColumnVisibilityChange,
  columnPinning: columnPinningProp,
  defaultColumnPinning = DEFAULT_COLUMN_PINNING,
  onColumnPinningChange,
  expanded: expandedProp,
  defaultExpanded = {},
  onExpandedChange,
}: Props<TData>) {
  const tableId = useId()
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollToTop = useRef(false)
  const [activeRowId, setActiveRowId] = useState<string>()
  const labels = { ...DEFAULT_LABELS, ...labelOverrides }
  const isTree = Boolean(getSubRows)
  const [sorting, setSorting] = useControllableState(sortingProp, defaultSorting, onSortingChange)
  const [globalFilter, setGlobalFilter] = useControllableState(
    globalFilterProp,
    defaultGlobalFilter,
    onGlobalFilterChange,
  )
  const [columnFilters, setColumnFilters] = useControllableState(
    columnFiltersProp,
    defaultColumnFilters,
    onColumnFiltersChange,
  )
  const [pagination, setPagination] = useControllableState(
    paginationProp,
    defaultPagination,
    onPaginationChange,
  )
  const [rowSelection, setRowSelection] = useControllableState(
    rowSelectionProp,
    defaultRowSelection,
    onRowSelectionChange,
  )
  const [columnVisibility, setColumnVisibility] = useControllableState(
    columnVisibilityProp,
    defaultColumnVisibility,
    onColumnVisibilityChange,
  )
  const [columnPinning, setColumnPinning] = useControllableState(
    columnPinningProp,
    defaultColumnPinning,
    onColumnPinningChange,
  )
  const [expanded, setExpanded] = useControllableState(
    expandedProp,
    defaultExpanded,
    onExpandedChange,
  )
  // Selection is a real column so visibility and pinning offsets account for it.
  const tableColumns = useMemo(
    function () {
      if (!selectionMode) return columns
      const selectColumn: DataTableColumn<TData> = {
        id: SELECT_COLUMN_ID,
        size: 40,
        enableSorting: false,
        enableHiding: false,
        enableColumnFilter: false,
        enableGlobalFilter: false,
      }
      return [selectColumn, ...columns]
    },
    [columns, selectionMode],
  )
  const pinnedStart = columnPinning.start
  const pinning =
    selectionMode && pinnedStart.length > 0 && !pinnedStart.includes(SELECT_COLUMN_ID)
      ? { ...columnPinning, start: [SELECT_COLUMN_ID, ...pinnedStart] }
      : columnPinning

  // Sorting and filtering return to the first page and the top of a virtual list.
  function resetPosition() {
    setPagination(function (current) {
      return current.pageIndex === 0 ? current : { ...current, pageIndex: 0 }
    })
    scrollToTop.current = true
  }

  const table = useTable({
    features,
    data,
    columns: tableColumns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      pagination,
      rowSelection,
      columnVisibility,
      columnPinning: pinning,
      expanded,
    },
    getRowId,
    getSubRows,
    getRowCanExpand:
      getRowCanExpand ??
      (renderSubComponent
        ? function () {
            return true
          }
        : undefined),
    manualSorting: manual,
    manualFiltering: manual,
    manualPagination: manual || !paginate,
    rowCount: manual ? rowCount : undefined,
    autoResetPageIndex: false,
    autoResetExpanded: false,
    filterFromLeafRows: isTree,
    globalFilterFn: "includesString",
    enableRowSelection: Boolean(selectionMode),
    enableMultiRowSelection: selectionMode === "multiple",
    enableSubRowSelection: selectionMode === "multiple",
    onSortingChange: function (updater) {
      setSorting(updater)
      resetPosition()
    },
    onGlobalFilterChange: function (updater) {
      setGlobalFilter(updater)
      resetPosition()
    },
    onColumnFiltersChange: function (updater) {
      setColumnFilters(updater)
      resetPosition()
    },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    onExpandedChange: setExpanded,
  })
  const rows = table.getRowModel().rows
  const headerGroups = table.getHeaderGroups()
  const columnCount = table.getVisibleLeafColumns().length
  const pageCount = table.getPageCount()
  const lastPageIndex = Math.max(0, pageCount - 1)
  const pageOutOfRange =
    paginate && !loading && pageCount >= 0 && pagination.pageIndex > lastPageIndex
  // oxlint-disable-next-line react/incompatible-library
  const virtualizer = useVirtualizer({
    count: rows.length,
    enabled: Boolean(virtual) && !loading,
    getScrollElement: function () {
      return scrollRef.current
    },
    estimateSize: function () {
      return virtual?.estimateSize ?? (density === "compact" ? 29 : 37)
    },
    getItemKey: function (index) {
      return rows[index]?.id ?? index
    },
    overscan: virtual?.overscan ?? 8,
    useFlushSync: false,
  })
  const virtualItems = virtualizer.getVirtualItems()
  const paddingTop = virtualItems[0]?.start ?? 0
  const paddingBottom = virtual ? virtualizer.getTotalSize() - (virtualItems.at(-1)?.end ?? 0) : 0
  const renderedRows = virtual
    ? virtualItems.flatMap(function (item) {
        const row = rows[item.index]
        return row ? [row] : []
      })
    : rows
  const focusableRowId = renderedRows.some(function (row) {
    return row.id === activeRowId
  })
    ? activeRowId
    : renderedRows[0]?.id
  const selectedCount = Object.values(rowSelection).filter(Boolean).length
  const hasToolbar = searchable || columnMenu || toolbar !== undefined

  // Keep the page in range when data or filters shrink instead of resetting on every change.
  useEffect(
    function () {
      if (pageOutOfRange) table.setPageIndex(lastPageIndex)
    },
    [pageOutOfRange, lastPageIndex, table],
  )

  // Runs after the sorted or filtered rows are measured, so the virtualizer cannot restore the old offset.
  useLayoutEffect(function () {
    if (!scrollToTop.current) return
    scrollToTop.current = false
    if (virtual) virtualizer.scrollToOffset(0)
  })

  function renderRow(row: DataTableRow<TData>, index: number) {
    const cells = row.getVisibleCells()
    const firstDataCell = cells.find(function (cell) {
      return cell.column.id !== SELECT_COLUMN_ID
    })
    // Selection controls are named by the row's first visible data cell.
    const rowLabelId = firstDataCell ? `${tableId}-${encodeURIComponent(row.id)}` : undefined
    const canExpand = row.getCanExpand()
    return (
      <Fragment key={row.id}>
        <Table.Row
          data-row-id={row.id}
          data-state={row.getIsSelected() ? "selected" : undefined}
          aria-rowindex={virtual ? index + headerGroups.length + 1 : undefined}
          aria-level={isTree ? row.depth + 1 : undefined}
          aria-expanded={isTree && canExpand ? row.getIsExpanded() : undefined}
          aria-selected={isTree && selectionMode ? row.getIsSelected() : undefined}
          tabIndex={isTree ? (row.id === focusableRowId ? 0 : -1) : undefined}
          className={cn(
            "group/row",
            isTree &&
              "focus-visible:outline-ring outline-none focus-visible:outline-2 focus-visible:-outline-offset-2",
          )}
          onFocus={
            isTree
              ? function () {
                  setActiveRowId(row.id)
                }
              : undefined
          }
          onKeyDown={
            isTree
              ? function (event) {
                  moveTreeFocus(event, row)
                }
              : undefined
          }
        >
          {cells.map(function (cell) {
            const pinned = cell.column.getIsPinned()
            const content = renderCellContent(row, cell, cell === firstDataCell, rowLabelId)
            return (
              <Table.Cell
                key={cell.id}
                className={cn(pinned && getPinnedClassName(cell.column, "cell"))}
                style={getPinnedStyle(cell.column)}
              >
                {pinned && cell.column.id !== SELECT_COLUMN_ID ? (
                  // A zero intrinsic width keeps pinned columns at their `size`, so offsets stay exact.
                  <div className="w-0 min-w-full truncate">{content}</div>
                ) : (
                  content
                )}
              </Table.Cell>
            )
          })}
        </Table.Row>
        {renderSubComponent && row.getIsExpanded() ? (
          <Table.Row className="hover:bg-transparent">
            <Table.Cell
              colSpan={cells.length}
              className="bg-muted/30 whitespace-normal"
            >
              {renderSubComponent(row)}
            </Table.Cell>
          </Table.Row>
        ) : null}
      </Fragment>
    )
  }

  function renderCellContent(
    row: DataTableRow<TData>,
    cell: Cell<typeof features, TData, unknown>,
    isFirstDataCell: boolean,
    rowLabelId: string | undefined,
  ) {
    return cell.column.id === SELECT_COLUMN_ID ? (
      selectionMode === "single" ? (
        <input
          type="radio"
          name={`${tableId}-selection`}
          aria-labelledby={rowLabelId}
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          className="accent-primary focus-visible:outline-ring block size-4 outline-offset-2"
          onChange={function () {
            row.toggleSelected(true)
          }}
        />
      ) : (
        <Checkbox
          aria-labelledby={rowLabelId}
          checked={row.getIsSelected()}
          indeterminate={row.getIsSomeSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={function (checked) {
            row.toggleSelected(checked)
          }}
        />
      )
    ) : isFirstDataCell && (isTree || renderSubComponent) ? (
      <div
        className="flex items-center gap-1"
        style={isTree ? { paddingInlineStart: `${row.depth * 1.25}rem` } : undefined}
      >
        {row.getCanExpand() ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            tabIndex={isTree ? -1 : undefined}
            aria-label={row.getIsExpanded() ? labels.collapseRow : labels.expandRow}
            aria-expanded={isTree ? undefined : row.getIsExpanded()}
            onClick={row.getToggleExpandedHandler()}
          >
            <ChevronRightIcon
              className={cn("transition-transform", row.getIsExpanded() && "rotate-90")}
            />
          </Button>
        ) : (
          <span
            aria-hidden="true"
            className="size-6 shrink-0"
          />
        )}
        <span id={rowLabelId}>
          <table.FlexRender cell={cell} />
        </span>
      </div>
    ) : isFirstDataCell ? (
      <span id={rowLabelId}>
        <table.FlexRender cell={cell} />
      </span>
    ) : (
      <table.FlexRender cell={cell} />
    )
  }

  return (
    <div
      data-slot="data-table"
      data-density={density}
      className={cn("flex w-full min-w-0 flex-col gap-3", className)}
    >
      {hasToolbar ? (
        <div className="flex flex-wrap items-center gap-2">
          {searchable ? (
            <InputGroup.Root className="w-full max-w-xs min-w-40 flex-1">
              <InputGroup.Input
                type="search"
                aria-label={labels.search}
                aria-controls={tableId}
                placeholder={labels.searchPlaceholder}
                value={globalFilter}
                onChange={function (event) {
                  table.setGlobalFilter(event.target.value)
                }}
              />
              <InputGroup.Addon>
                <SearchIcon />
              </InputGroup.Addon>
            </InputGroup.Root>
          ) : null}
          {toolbar}
          {columnMenu ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger
                render={
                  <Button
                    variant="outline"
                    className="ml-auto"
                  />
                }
              >
                <Columns3Icon />
                {labels.columns}
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                align="end"
                className="w-44"
              >
                <DropdownMenu.Group>
                  <DropdownMenu.GroupLabel>{labels.toggleColumns}</DropdownMenu.GroupLabel>
                  {table
                    .getAllLeafColumns()
                    .filter(function (column) {
                      return column.getCanHide()
                    })
                    .map(function (column) {
                      return (
                        <DropdownMenu.CheckboxItem
                          key={column.id}
                          checked={column.getIsVisible()}
                          onCheckedChange={function (checked) {
                            column.toggleVisibility(checked)
                          }}
                        >
                          {typeof column.columnDef.header === "string"
                            ? column.columnDef.header
                            : column.id}
                        </DropdownMenu.CheckboxItem>
                      )
                    })}
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ) : null}
        </div>
      ) : null}
      <div
        ref={scrollRef}
        className={cn(
          // This wrapper scrolls, so the table's own scroll area and edge fades step aside.
          "bg-background relative overflow-auto rounded-lg border [&_[data-slot=table-container]]:overflow-visible [&_[data-slot=table-fade]]:hidden [&_[data-slot=table-scroll]]:overflow-visible",
          density === "compact" && "[&_td]:py-1 [&_th]:h-8",
        )}
        style={virtual ? { height: virtual.height } : undefined}
      >
        <Table.Root
          id={tableId}
          role={isTree ? "treegrid" : undefined}
          aria-label={label}
          aria-busy={loading || undefined}
          aria-rowcount={virtual ? rows.length + headerGroups.length : undefined}
        >
          <Table.Header
            className={cn(
              virtual &&
                "bg-background sticky top-0 z-20 shadow-[inset_0_-1px_0_var(--color-border)]",
            )}
          >
            {headerGroups.map(function (headerGroup, groupIndex) {
              return (
                <Table.Row
                  key={headerGroup.id}
                  aria-rowindex={virtual ? groupIndex + 1 : undefined}
                  className="hover:bg-transparent"
                >
                  {headerGroup.headers.map(function (header) {
                    const column = header.column
                    const sorted = column.getIsSorted()
                    const SortIcon =
                      sorted === "asc"
                        ? ArrowUpIcon
                        : sorted === "desc"
                          ? ArrowDownIcon
                          : ArrowUpDownIcon
                    return (
                      <Table.Head
                        key={header.id}
                        colSpan={header.colSpan}
                        aria-sort={
                          column.getCanSort()
                            ? sorted === "asc"
                              ? "ascending"
                              : sorted === "desc"
                                ? "descending"
                                : "none"
                            : undefined
                        }
                        className={cn(column.getIsPinned() && getPinnedClassName(column, "head"))}
                        style={getPinnedStyle(column)}
                      >
                        {header.isPlaceholder ? null : column.id === SELECT_COLUMN_ID ? (
                          selectionMode === "multiple" ? (
                            <Checkbox
                              aria-label={labels.selectAll}
                              checked={table.getIsAllPageRowsSelected()}
                              indeterminate={
                                table.getIsSomePageRowsSelected() &&
                                !table.getIsAllPageRowsSelected()
                              }
                              onCheckedChange={function (checked) {
                                table.toggleAllPageRowsSelected(checked)
                              }}
                            />
                          ) : null
                        ) : column.getCanSort() ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="-ml-2.5"
                            onClick={column.getToggleSortingHandler()}
                          >
                            <table.FlexRender header={header} />
                            <SortIcon
                              aria-hidden="true"
                              className={cn(!sorted && "text-muted-foreground")}
                            />
                          </Button>
                        ) : (
                          <table.FlexRender header={header} />
                        )}
                      </Table.Head>
                    )
                  })}
                </Table.Row>
              )
            })}
          </Table.Header>
          {loading ? (
            <Table.Body>
              {Array.from(
                { length: paginate ? Math.min(pagination.pageSize, 10) : 5 },
                function (_, index) {
                  return (
                    <Table.Row
                      key={index}
                      aria-hidden="true"
                    >
                      {table.getVisibleLeafColumns().map(function (column) {
                        return (
                          <Table.Cell key={column.id}>
                            <Skeleton
                              className={column.id === SELECT_COLUMN_ID ? "size-4" : "h-4 w-full"}
                            />
                          </Table.Cell>
                        )
                      })}
                    </Table.Row>
                  )
                },
              )}
            </Table.Body>
          ) : rows.length === 0 ? (
            <Table.Body>
              <Table.Row className="hover:bg-transparent">
                <Table.Cell
                  colSpan={columnCount}
                  className="text-muted-foreground h-24 text-center whitespace-normal"
                >
                  {emptyMessage}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ) : virtual ? (
            <>
              {paddingTop > 0 ? (
                <tbody aria-hidden="true">
                  <tr>
                    <td
                      colSpan={columnCount}
                      style={{ height: paddingTop, padding: 0 }}
                    />
                  </tr>
                </tbody>
              ) : null}
              {virtualItems.map(function (item) {
                const row = rows[item.index]
                if (!row) return null
                // Each item is its own row group so detail rows are measured with their parent row.
                return (
                  <tbody
                    key={item.key}
                    data-index={item.index}
                    ref={virtualizer.measureElement}
                  >
                    {renderRow(row, item.index)}
                  </tbody>
                )
              })}
              {paddingBottom > 0 ? (
                <tbody aria-hidden="true">
                  <tr>
                    <td
                      colSpan={columnCount}
                      style={{ height: paddingBottom, padding: 0 }}
                    />
                  </tr>
                </tbody>
              ) : null}
            </>
          ) : (
            <Table.Body>
              {rows.map(function (row, index) {
                return renderRow(row, index)
              })}
            </Table.Body>
          )}
        </Table.Root>
        <span
          role="status"
          className="sr-only"
        >
          {loading ? labels.loading : ""}
        </span>
      </div>
      {selectionMode || paginate ? (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          {selectionMode ? (
            <p
              role="status"
              className="text-muted-foreground text-sm"
            >
              {labels.selected(
                selectedCount,
                manual ? (rowCount ?? 0) : table.getCoreRowModel().flatRows.length,
              )}
            </p>
          ) : null}
          {paginate ? (
            <Pagination.Controls
              className="ml-auto"
              totalItems={table.getRowCount()}
              page={Math.min(pagination.pageIndex, lastPageIndex) + 1}
              onPageChange={function (page) {
                table.setPageIndex(page - 1)
              }}
              pageSize={pagination.pageSize}
              onPageSizeChange={function (pageSize) {
                table.setPageSize(pageSize)
              }}
              pageSizeOptions={pageSizeOptions}
              disabled={loading}
              rowsPerPageLabel={labels.rowsPerPage}
              previousLabel={labels.previousPage}
              nextLabel={labels.nextPage}
              formatRange={labels.range}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

type Props<TData extends RowData> = BaseProps<TData> & SelectionProps<TData> & ServerProps

type BaseProps<TData extends RowData> = {
  // Column value types are invariant, so `any` accepts columns of mixed value types,
  // matching TanStack's `columnHelper.columns()`.
  // oxlint-disable-next-line typescript/no-explicit-any
  columns: DataTableColumn<TData, any>[]
  data: TData[]
  // Accessible name of the table.
  label: string
  getRowId?: (row: TData, index: number, parent?: DataTableRow<TData>) => string
  // Nested rows render as an expandable tree grid.
  getSubRows?: (row: TData, index: number) => TData[] | undefined
  getRowCanExpand?: (row: DataTableRow<TData>) => boolean
  // Detail content shown in a full-width row below an expanded row.
  renderSubComponent?: (row: DataTableRow<TData>) => ReactNode
  searchable?: boolean
  columnMenu?: boolean
  // Extra toolbar content, such as filters or bulk actions.
  toolbar?: ReactNode
  paginate?: boolean
  pageSizeOptions?: number[]
  // Renders only visible rows inside a scroll area of `height`. Works with or without pagination.
  virtual?: { height: number | string; estimateSize?: number; overscan?: number }
  loading?: boolean
  emptyMessage?: ReactNode
  density?: "default" | "compact"
  labels?: Partial<Labels>
  className?: string
  sorting?: SortingState
  defaultSorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
  globalFilter?: string
  defaultGlobalFilter?: string
  onGlobalFilterChange?: (globalFilter: string) => void
  columnFilters?: ColumnFiltersState
  defaultColumnFilters?: ColumnFiltersState
  onColumnFiltersChange?: (columnFilters: ColumnFiltersState) => void
  pagination?: PaginationState
  defaultPagination?: PaginationState
  onPaginationChange?: (pagination: PaginationState) => void
  rowSelection?: RowSelectionState
  defaultRowSelection?: RowSelectionState
  onRowSelectionChange?: (rowSelection: RowSelectionState) => void
  columnVisibility?: ColumnVisibilityState
  defaultColumnVisibility?: ColumnVisibilityState
  onColumnVisibilityChange?: (columnVisibility: ColumnVisibilityState) => void
  // Pinned columns render at their column `size` (150px by default).
  columnPinning?: ColumnPinningState
  defaultColumnPinning?: ColumnPinningState
  onColumnPinningChange?: (columnPinning: ColumnPinningState) => void
  expanded?: ExpandedState
  defaultExpanded?: ExpandedState
  onExpandedChange?: (expanded: ExpandedState) => void
}

// Selection is keyed by row id, so a stable `getRowId` is required.
type SelectionProps<TData extends RowData> =
  | { selectionMode?: undefined }
  | {
      selectionMode: "single" | "multiple"
      getRowId: (row: TData, index: number, parent?: DataTableRow<TData>) => string
    }

// Server mode: `data` is the current page, already sorted and filtered.
type ServerProps = { manual?: false; rowCount?: undefined } | { manual: true; rowCount: number }

type Labels = {
  search: string
  searchPlaceholder: string
  columns: string
  toggleColumns: string
  selectAll: string
  expandRow: string
  collapseRow: string
  loading: string
  selected: (count: number, total: number) => string
  rowsPerPage: string
  previousPage: string
  nextPage: string
  range: (from: number, to: number, total: number) => string
}

type DataTableColumn<TData extends RowData, TValue = unknown> = ColumnDef<
  typeof features,
  TData,
  TValue
>

type DataTableRow<TData extends RowData> = Row<typeof features, TData>

// Uses the prop while it is defined at mount, otherwise local state. Updates made before
// the next render build on each other, so several updates in one event compose.
function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
) {
  const [controlled] = useState(value !== undefined)
  const [localValue, setLocalValue] = useState(defaultValue)
  const pending = useRef<{ value: T } | null>(null)
  const current = controlled ? (value as T) : localValue

  useEffect(function () {
    pending.current = null
  })

  function setValue(updater: Updater<T>) {
    const previous = pending.current ? pending.current.value : current
    const next = functionalUpdate(updater, previous)
    if (Object.is(next, previous)) return
    pending.current = { value: next }
    if (!controlled) setLocalValue(next)
    onChange?.(next)
  }

  return [current, setValue] as const
}

function getPinnedStyle<TData extends RowData>(
  column: Column<typeof features, TData, unknown>,
): CSSProperties | undefined {
  const pinned = column.getIsPinned()
  if (!pinned) return undefined
  const size = column.getSize()
  return {
    position: "sticky",
    insetInlineStart: pinned === "start" ? column.getStart("start") : undefined,
    insetInlineEnd: pinned === "end" ? column.getAfter("end") : undefined,
    width: size,
    minWidth: size,
    maxWidth: size,
  }
}

// Pinned cells need an opaque background that still follows hover and selected row states.
function getPinnedClassName<TData extends RowData>(
  column: Column<typeof features, TData, unknown>,
  part: "head" | "cell",
) {
  return cn(
    "bg-background z-10",
    part === "cell" &&
      "group-data-[state=selected]/row:bg-muted group-hover/row:bg-[color-mix(in_oklab,var(--color-muted)_50%,var(--color-background))] group-has-aria-expanded/row:bg-[color-mix(in_oklab,var(--color-muted)_50%,var(--color-background))]",
    column.getIsPinned() === "start" &&
      column.table.getStartVisibleLeafColumns().at(-1)?.id === column.id &&
      "shadow-[inset_-1px_0_0_var(--color-border)] rtl:shadow-[inset_1px_0_0_var(--color-border)]",
    column.getIsPinned() === "end" &&
      column.table.getEndVisibleLeafColumns()[0]?.id === column.id &&
      "shadow-[inset_1px_0_0_var(--color-border)] rtl:shadow-[inset_-1px_0_0_var(--color-border)]",
  )
}

// Tree grid keyboard support: arrows move between rows, Right/Left expand, collapse, or
// move to the parent row. Keys from controls inside cells are left alone.
function moveTreeFocus<TData extends RowData>(
  event: KeyboardEvent<HTMLTableRowElement>,
  row: DataTableRow<TData>,
) {
  if (event.target !== event.currentTarget) return
  const rowElements = Array.from(
    event.currentTarget
      .closest("table")
      ?.querySelectorAll<HTMLTableRowElement>("tr[data-row-id]") ?? [],
  )
  const index = rowElements.indexOf(event.currentTarget)
  let target: HTMLTableRowElement | undefined
  if (event.key === "ArrowDown") target = rowElements[index + 1]
  else if (event.key === "ArrowUp") target = rowElements[index - 1]
  else if (event.key === "Home") target = rowElements[0]
  else if (event.key === "End") target = rowElements.at(-1)
  else if (event.key === "ArrowRight") {
    if (row.getCanExpand() && !row.getIsExpanded()) row.toggleExpanded(true)
    else if (row.getIsExpanded()) target = rowElements[index + 1]
  } else if (event.key === "ArrowLeft") {
    const parentId = row.getParentRow()?.id
    if (row.getIsExpanded()) row.toggleExpanded(false)
    else if (parentId !== undefined) {
      target = rowElements.find(function (element) {
        return element.dataset.rowId === parentId
      })
    }
  } else return
  event.preventDefault()
  target?.focus()
}

export { DataTable }

export type {
  DataTableColumn,
  ColumnFiltersState as DataTableColumnFiltersState,
  ColumnPinningState as DataTableColumnPinningState,
  ExpandedState as DataTableExpandedState,
  PaginationState as DataTablePaginationState,
  DataTableRow,
  RowSelectionState as DataTableRowSelectionState,
  SortingState as DataTableSortingState,
  ColumnVisibilityState as DataTableVisibilityState,
}
