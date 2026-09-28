"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"
import * as React from "react"
import { buttonVariants } from "./button.js"
import { Label } from "./label.js"
import * as NativeSelect from "./native-select.js"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="pagination-item"
      {...props}
    />
  )
}

// Renders a link styled as a button. Pass `render={<button type="button" />}` for state-driven paging.
// `aria-disabled` dims the control and blocks activation, including keyboard activation.
function PaginationLink({
  className,
  isActive,
  size = "icon",
  render,
  ref,
  onClick,
  ...props
}: LinkProps) {
  const disabled = props["aria-disabled"] === true || props["aria-disabled"] === "true"
  return useRender({
    defaultTagName: "a",
    render,
    ref,
    props: mergeProps<"a">(props, {
      "aria-current": isActive ? "page" : undefined,
      className: cn(
        buttonVariants({ variant: isActive ? "outline" : "ghost", size }),
        "aria-disabled:pointer-events-none aria-disabled:opacity-50",
        className,
      ),
      onClick: function (event: React.MouseEvent<HTMLAnchorElement>) {
        if (disabled) {
          event.preventDefault()
          return
        }
        onClick?.(event)
      },
    }),
    state: {
      slot: "pagination-link",
      active: isActive,
    },
  })
}

function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("pl-1.5!", className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("pr-1.5!", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  )
}

// All-in-one paging built from the parts: range text, optional rows-per-page select,
// and numbered pages. `page` is 1-based; page and size are controlled or uncontrolled.
function PaginationControls({
  totalItems,
  page,
  defaultPage = 1,
  onPageChange,
  pageSize,
  defaultPageSize = 10,
  onPageSizeChange,
  pageSizeOptions,
  siblingCount = 1,
  disabled = false,
  rowsPerPageLabel = "Rows per page",
  previousLabel = "Previous page",
  nextLabel = "Next page",
  formatRange = defaultFormatRange,
  className,
  ...props
}: ControlsProps) {
  const sizeId = React.useId()
  const [pageControlled] = React.useState(page !== undefined)
  const [sizeControlled] = React.useState(pageSize !== undefined)
  const [localPage, setLocalPage] = React.useState(defaultPage)
  const [localSize, setLocalSize] = React.useState(defaultPageSize)
  const total = Math.max(0, Math.floor(totalItems) || 0)
  const size = Math.max(1, Math.floor((sizeControlled ? pageSize : localSize) ?? 1) || 1)
  const pages = Math.max(1, Math.ceil(total / size))
  const current = Math.min(
    pages,
    Math.max(1, Math.floor((pageControlled ? page : localPage) ?? 1) || 1),
  )
  const sizeOptions = [...new Set([size, ...(pageSizeOptions ?? [])])]
    .filter(function (option) {
      return Number.isInteger(option) && option > 0
    })
    .sort(function (a, b) {
      return a - b
    })

  function changePage(next: number) {
    if (next === current || next < 1 || next > pages) return
    if (!pageControlled) setLocalPage(next)
    onPageChange?.(next)
  }

  function changePageSize(nextSize: number) {
    // Keep the first visible item on screen after the size changes.
    const nextPage = Math.floor(((current - 1) * size) / nextSize) + 1
    if (!sizeControlled) setLocalSize(nextSize)
    onPageSizeChange?.(nextSize)
    if (nextPage !== current) {
      if (!pageControlled) setLocalPage(nextPage)
      onPageChange?.(nextPage)
    }
  }

  return (
    <div
      {...props}
      data-slot="pagination-controls"
      className={cn("flex flex-wrap items-center gap-x-4 gap-y-2 text-sm", className)}
    >
      <p
        aria-live="polite"
        className="text-muted-foreground tabular-nums"
      >
        {formatRange(
          total === 0 ? 0 : (current - 1) * size + 1,
          Math.min(current * size, total),
          total,
        )}
      </p>
      {pageSizeOptions && pageSizeOptions.length > 0 ? (
        <div className="flex items-center gap-2">
          <Label
            htmlFor={sizeId}
            className="text-muted-foreground font-normal"
          >
            {rowsPerPageLabel}
          </Label>
          <NativeSelect.Root
            id={sizeId}
            size="sm"
            value={size}
            disabled={disabled}
            onChange={function (event) {
              changePageSize(Number(event.target.value))
            }}
          >
            {sizeOptions.map(function (option) {
              return (
                <NativeSelect.Option
                  key={option}
                  value={option}
                >
                  {option}
                </NativeSelect.Option>
              )
            })}
          </NativeSelect.Root>
        </div>
      ) : null}
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              render={<button type="button" />}
              aria-label={previousLabel}
              aria-disabled={disabled || current === 1 || undefined}
              onClick={function () {
                changePage(current - 1)
              }}
            >
              <ChevronLeftIcon />
            </PaginationLink>
          </PaginationItem>
          {getPageItems(current, pages, siblingCount).map(function (item) {
            return (
              <PaginationItem key={item}>
                {typeof item === "number" ? (
                  <PaginationLink
                    render={<button type="button" />}
                    isActive={item === current}
                    aria-disabled={disabled || undefined}
                    onClick={function () {
                      changePage(item)
                    }}
                  >
                    {item}
                  </PaginationLink>
                ) : (
                  <PaginationEllipsis />
                )}
              </PaginationItem>
            )
          })}
          <PaginationItem>
            <PaginationLink
              render={<button type="button" />}
              aria-label={nextLabel}
              aria-disabled={disabled || current === pages || undefined}
              onClick={function () {
                changePage(current + 1)
              }}
            >
              <ChevronRightIcon />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

type LinkProps = useRender.ComponentProps<"a"> & {
  isActive?: boolean
  size?: VariantProps<typeof buttonVariants>["size"]
}

type ControlsProps = Omit<React.ComponentProps<"div">, "children"> & {
  totalItems: number
  page?: number
  defaultPage?: number
  onPageChange?: (page: number) => void
  pageSize?: number
  defaultPageSize?: number
  onPageSizeChange?: (pageSize: number) => void
  // Shows a rows-per-page select. The current size is always included.
  pageSizeOptions?: number[]
  // Pages shown on each side of the current page.
  siblingCount?: number
  disabled?: boolean
  rowsPerPageLabel?: string
  previousLabel?: string
  nextLabel?: string
  formatRange?: (from: number, to: number, total: number) => string
}

function defaultFormatRange(from: number, to: number, total: number) {
  return `${from}–${to} of ${total}`
}

// First and last pages stay visible; the window around the current page keeps a stable length.
function getPageItems(
  current: number,
  pages: number,
  siblingCount: number,
): (number | "start-ellipsis" | "end-ellipsis")[] {
  const siblings = Math.max(0, Math.floor(siblingCount))
  if (pages <= siblings * 2 + 5) {
    return Array.from({ length: pages }, function (_, index) {
      return index + 1
    })
  }
  const start = Math.max(Math.min(current - siblings, pages - siblings * 2 - 2), 3)
  const end = Math.min(Math.max(current + siblings, siblings * 2 + 3), pages - 2)
  const middle = Array.from({ length: end - start + 1 }, function (_, index) {
    return start + index
  })
  return [
    1,
    start > 3 ? "start-ellipsis" : 2,
    ...middle,
    end < pages - 2 ? "end-ellipsis" : pages - 1,
    pages,
  ]
}

export {
  Pagination as Root,
  PaginationContent as Content,
  PaginationItem as Item,
  PaginationLink as Link,
  PaginationPrevious as Previous,
  PaginationNext as Next,
  PaginationEllipsis as Ellipsis,
  PaginationControls as Controls,
}
