"use client"

import { cn } from "cn"
import * as React from "react"

// Scrolls horizontally when columns overflow, fading the edge that has more columns to reveal.
// The fade matches --table-fade (the background token by default); set it to the surface the
// table sits on, e.g. containerClassName="[--table-fade:var(--color-card)]".
function Table({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<"table"> & { containerClassName?: string }) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [overflow, setOverflow] = React.useState({ start: false, end: false })

  React.useEffect(function () {
    const element = scrollRef.current
    if (!element) return

    function update() {
      if (!element) return
      // scrollLeft is negative in right-to-left layouts, so compare magnitudes.
      const scrolled = Math.abs(element.scrollLeft)
      const maxScroll = element.scrollWidth - element.clientWidth
      setOverflow({ start: scrolled > 1, end: scrolled < maxScroll - 1 })
    }

    update()
    element.addEventListener("scroll", update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(element)
    if (element.firstElementChild) observer.observe(element.firstElementChild)

    return function () {
      element.removeEventListener("scroll", update)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full overflow-hidden [--table-fade:var(--color-background)]",
        containerClassName,
      )}
    >
      <div
        ref={scrollRef}
        data-slot="table-scroll"
        className="w-full overflow-x-auto rounded-[inherit]"
      >
        <table
          data-slot="table"
          className={cn("w-full caption-bottom text-sm", className)}
          {...props}
        />
      </div>
      <div
        aria-hidden="true"
        data-slot="table-fade"
        data-visible={overflow.start || undefined}
        className="pointer-events-none absolute inset-y-0 start-0 w-8 bg-linear-to-r from-(--table-fade) to-transparent opacity-0 transition-opacity duration-200 data-visible:opacity-100 rtl:bg-linear-to-l"
      />
      <div
        aria-hidden="true"
        data-slot="table-fade"
        data-visible={overflow.end || undefined}
        className="pointer-events-none absolute inset-y-0 end-0 w-8 bg-linear-to-l from-(--table-fade) to-transparent opacity-0 transition-opacity duration-200 data-visible:opacity-100 rtl:bg-linear-to-r"
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className)}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table as Root,
  TableHeader as Header,
  TableBody as Body,
  TableFooter as Footer,
  TableHead as Head,
  TableRow as Row,
  TableCell as Cell,
  TableCaption as Caption,
}
