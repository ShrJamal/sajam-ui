"use client"

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar"
import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { buttonVariants } from "./button.js"

// Groups related controls with roving keyboard focus.
function Toolbar({ className, ...props }: ToolbarPrimitive.Root.Props) {
  return (
    <ToolbarPrimitive.Root
      data-slot="toolbar"
      className={cn(
        "bg-card flex min-h-11 items-center gap-1 rounded-xl border p-1.5 data-vertical:w-fit data-vertical:flex-col",
        className,
      )}
      {...props}
    />
  )
}

function ToolbarGroup({ className, ...props }: ToolbarPrimitive.Group.Props) {
  return (
    <ToolbarPrimitive.Group
      data-slot="toolbar-group"
      className={cn("flex items-center gap-1 data-vertical:flex-col", className)}
      {...props}
    />
  )
}

// Disabled toolbar buttons stay focusable, so they are styled through `data-disabled`.
function ToolbarButton({ className, variant = "ghost", size = "default", ...props }: ButtonProps) {
  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function ToolbarLink({ className, variant = "ghost", size = "default", ...props }: LinkProps) {
  return (
    <ToolbarPrimitive.Link
      data-slot="toolbar-link"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

// Keep a single input as the last item: arrow keys also move its text cursor.
function ToolbarInput({ className, ...props }: ToolbarPrimitive.Input.Props) {
  return (
    <ToolbarPrimitive.Input
      data-slot="toolbar-input"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 h-8 w-full min-w-0 rounded-lg border bg-transparent px-2.5 text-sm transition-colors outline-none focus-visible:ring-3 data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

function ToolbarSeparator({ className, ...props }: ToolbarPrimitive.Separator.Props) {
  return (
    <ToolbarPrimitive.Separator
      data-slot="toolbar-separator"
      className={cn(
        "bg-border mx-1 h-5 w-px shrink-0 data-horizontal:mx-0 data-horizontal:my-1 data-horizontal:h-px data-horizontal:w-5",
        className,
      )}
      {...props}
    />
  )
}

type ButtonProps = ToolbarPrimitive.Button.Props & VariantProps<typeof buttonVariants>

type LinkProps = ToolbarPrimitive.Link.Props & VariantProps<typeof buttonVariants>

export {
  Toolbar as Root,
  ToolbarButton as Button,
  ToolbarGroup as Group,
  ToolbarInput as Input,
  ToolbarLink as Link,
  ToolbarSeparator as Separator,
}
