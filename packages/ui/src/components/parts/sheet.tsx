"use client"

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { cva } from "class-variance-authority"
import { cn } from "cn"
import { XIcon } from "lucide-react"
import * as React from "react"
import { Button } from "./button.js"

// Side styles are plain utilities so a consumer className (for example a full-screen size) wins.
const sheetContentVariants = cva(
  "bg-popover text-popover-foreground fixed z-50 flex flex-col bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 h-auto max-h-dvh border-b data-ending-style:-translate-y-10 data-starting-style:-translate-y-10",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-ending-style:translate-x-10 data-starting-style:translate-x-10 sm:max-w-sm",
        bottom:
          "inset-x-0 bottom-0 h-auto max-h-dvh border-t data-ending-style:translate-y-10 data-starting-style:translate-y-10",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-ending-style:-translate-x-10 data-starting-style:-translate-x-10 sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
)

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return (
    <SheetPrimitive.Root
      data-slot="sheet"
      {...props}
    />
  )
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return (
    <SheetPrimitive.Trigger
      data-slot="sheet-trigger"
      {...props}
    />
  )
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return (
    <SheetPrimitive.Close
      data-slot="sheet-close"
      {...props}
    />
  )
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return (
    <SheetPrimitive.Portal
      data-slot="sheet-portal"
      {...props}
    />
  )
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "bg-foreground/10 dark:bg-background/60 fixed inset-0 z-50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
        className,
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  showOverlay = true,
  closeLabel = "Close",
  ...props
}: ContentProps) {
  return (
    <SheetPortal>
      {showOverlay && <SheetOverlay />}
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(sheetContentVariants({ side }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-3 right-3"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">{closeLabel}</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex shrink-0 flex-col gap-1 border-b p-4 pr-12", className)}
      {...props}
    />
  )
}

// Scrolls long content while the header and footer stay in place.
function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-body"
      className={cn("min-h-0 flex-1 overflow-y-auto p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "bg-muted/50 mt-auto flex shrink-0 flex-col-reverse gap-2 border-t p-4 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-heading text-foreground text-base font-medium", className)}
      {...props}
    />
  )
}

function SheetDescription({ className, ...props }: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

type ContentProps = SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
  showOverlay?: boolean
  closeLabel?: string
}

export {
  Sheet as Root,
  SheetTrigger as Trigger,
  SheetClose as Close,
  SheetPortal as Portal,
  SheetOverlay as Overlay,
  SheetContent as Content,
  SheetHeader as Header,
  SheetBody as Body,
  SheetFooter as Footer,
  SheetTitle as Title,
  SheetDescription as Description,
}
