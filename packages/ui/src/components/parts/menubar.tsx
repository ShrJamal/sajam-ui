"use client"

import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"
import { cn } from "cn"
import * as React from "react"
import * as DropdownMenu from "./dropdown-menu.js"

function Menubar({ className, ...props }: MenubarPrimitive.Props) {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      className={cn("flex h-8 items-center gap-0.5 rounded-lg border p-[3px]", className)}
      {...props}
    />
  )
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof DropdownMenu.Root>) {
  return (
    <DropdownMenu.Root
      data-slot="menubar-menu"
      {...props}
    />
  )
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenu.Trigger>) {
  return (
    <DropdownMenu.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "hover:bg-muted focus-visible:bg-muted aria-expanded:bg-muted flex items-center rounded-sm px-1.5 py-[2px] text-sm font-medium outline-hidden select-none",
        className,
      )}
      {...props}
    />
  )
}

function MenubarContent({
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof DropdownMenu.Content>) {
  return (
    <DropdownMenu.Content
      data-slot="menubar-content"
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

export {
  Menubar as Root,
  MenubarMenu as Menu,
  MenubarTrigger as Trigger,
  MenubarContent as Content,
}

// Menubar menus are Base UI Menus, so they share the dropdown menu's styled items.
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
