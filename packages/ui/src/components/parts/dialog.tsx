"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cn } from "cn"
import { Maximize2Icon, Minimize2Icon, XIcon } from "lucide-react"
import * as React from "react"
import { Button } from "./button.js"

const positions = {
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  top: "top-4 left-1/2 -translate-x-1/2",
  bottom: "bottom-4 left-1/2 -translate-x-1/2",
  left: "top-1/2 left-4 -translate-y-1/2",
  right: "top-1/2 right-4 -translate-y-1/2",
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "right-4 bottom-4",
}

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return (
    <DialogPrimitive.Root
      data-slot="dialog"
      {...props}
    />
  )
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      {...props}
    />
  )
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return (
    <DialogPrimitive.Portal
      data-slot="dialog-portal"
      {...props}
    />
  )
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      {...props}
    />
  )
}

function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "bg-foreground/10 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 dark:bg-background/60 fixed inset-0 isolate z-50 duration-100 supports-backdrop-filter:backdrop-blur-xs",
        className,
      )}
      {...props}
    />
  )
}

function DialogContent({ showOverlay = true, ...props }: ContentProps) {
  return (
    <DialogPortal>
      {showOverlay && <DialogOverlay />}
      <DialogPopup {...props} />
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex shrink-0 flex-col gap-2", className)}
      {...props}
    />
  )
}

// Scrolls long content while the header, footer, and close button stay in place.
function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("-mx-4 -my-1 min-h-0 flex-1 overflow-y-auto px-4 py-1", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "bg-muted/50 -mx-4 -mb-4 flex shrink-0 flex-col-reverse gap-2 rounded-b-xl border-t p-4 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-heading text-base leading-none font-medium", className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3",
        className,
      )}
      {...props}
    />
  )
}

type ContentProps = DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
  showOverlay?: boolean
  position?: keyof typeof positions
  maximizable?: boolean
  maximized?: boolean
  defaultMaximized?: boolean
  onMaximizedChange?: (maximized: boolean) => void
  closeLabel?: string
  maximizeLabel?: string
  restoreLabel?: string
}

// Lives inside the portal so uncontrolled maximized state resets each time the dialog closes.
function DialogPopup({
  className,
  children,
  showCloseButton = true,
  position = "center",
  maximizable = false,
  maximized,
  defaultMaximized = false,
  onMaximizedChange,
  closeLabel = "Close",
  maximizeLabel = "Maximize",
  restoreLabel = "Restore",
  ...props
}: Omit<ContentProps, "showOverlay">) {
  const [localMaximized, setLocalMaximized] = React.useState(defaultMaximized)
  const expanded = maximizable && (maximized ?? localMaximized)

  return (
    <DialogPrimitive.Popup
      data-slot="dialog-content"
      data-maximized={expanded || undefined}
      data-position={position}
      className={cn(
        "bg-popover text-popover-foreground ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 fixed z-50 flex max-h-[calc(100dvh-2rem)] w-full max-w-[calc(100%-2rem)] flex-col gap-4 overflow-y-auto rounded-xl p-4 text-sm ring-1 duration-100 outline-none sm:max-w-sm",
        positions[position],
        className,
        expanded &&
          "inset-4 h-auto max-h-none w-auto max-w-none translate-x-0 translate-y-0 sm:max-w-none",
      )}
      {...props}
    >
      {children}
      {maximizable && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={cn("absolute top-2", showCloseButton ? "right-10" : "right-2")}
          aria-label={expanded ? restoreLabel : maximizeLabel}
          aria-pressed={expanded}
          onClick={function () {
            if (maximized === undefined) setLocalMaximized(!expanded)
            onMaximizedChange?.(!expanded)
          }}
        >
          {expanded ? <Minimize2Icon /> : <Maximize2Icon />}
        </Button>
      )}
      {showCloseButton && (
        <DialogPrimitive.Close
          data-slot="dialog-close"
          render={
            <Button
              variant="ghost"
              className="absolute top-2 right-2"
              size="icon-sm"
            />
          }
        >
          <XIcon />
          <span className="sr-only">{closeLabel}</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Popup>
  )
}

export {
  Dialog as Root,
  DialogBody as Body,
  DialogClose as Close,
  DialogContent as Content,
  DialogDescription as Description,
  DialogFooter as Footer,
  DialogHeader as Header,
  DialogOverlay as Overlay,
  DialogPortal as Portal,
  DialogTitle as Title,
  DialogTrigger as Trigger,
}
