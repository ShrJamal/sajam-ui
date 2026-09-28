"use client"

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"
import { cn } from "cn"
import * as React from "react"
import * as DropdownMenu from "./dropdown-menu.js"

function ContextMenu({ ...props }: ContextMenuPrimitive.Root.Props) {
  return (
    <ContextMenuPrimitive.Root
      data-slot="context-menu"
      {...props}
    />
  )
}

function ContextMenuTrigger({ className, ...props }: ContextMenuPrimitive.Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn("select-none", className)}
      {...props}
    />
  )
}

// Context menu popups open at the pointer, so they size to their items instead of the trigger.
function ContextMenuContent({
  align = "start",
  alignOffset = 4,
  side = "inline-end",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenu.Content>) {
  return (
    <DropdownMenu.Content
      data-slot="context-menu-content"
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      className={cn("min-w-36", className)}
      {...props}
    />
  )
}

export { ContextMenu as Root, ContextMenuTrigger as Trigger, ContextMenuContent as Content }

// Context menu items are Base UI Menu parts, so they share the dropdown menu's styled items.
export {
  CheckboxItem,
  Group,
  GroupLabel,
  Item,
  LinkItem,
  RadioGroup,
  RadioItem,
  Separator,
  Shortcut,
  Sub,
  SubContent,
  SubTrigger,
} from "./dropdown-menu.js"
