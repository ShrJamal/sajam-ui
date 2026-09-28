"use client"

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete"
import { cn } from "cn"
import { SearchIcon } from "lucide-react"
import * as React from "react"
import * as Dialog from "./dialog.js"
import * as InputGroup from "./input-group.js"

// An always-visible Base UI Autocomplete. Pass `items` (flat or grouped) so Base UI filters them
// as the query changes; the list renders the filtered items through a render function.
function Command<ItemValue>({
  className,
  children,
  items,
  inline = true,
  open = true,
  autoHighlight = "always",
  keepHighlight = true,
  ...props
}: AutocompletePrimitive.Root.Props<ItemValue> & { className?: string }) {
  return (
    <AutocompletePrimitive.Root
      // Base UI's overloads split flat and grouped items; this wrapper accepts either shape.
      items={items as readonly ItemValue[] | undefined}
      inline={inline}
      open={open}
      autoHighlight={autoHighlight}
      keepHighlight={keepHighlight}
      {...props}
    >
      <div
        data-slot="command"
        className={cn(
          "bg-popover text-popover-foreground flex size-full flex-col overflow-hidden rounded-xl! p-1",
          className,
        )}
      >
        {children}
      </div>
    </AutocompletePrimitive.Root>
  )
}

// Base UI resets the query and highlight when the dialog content unmounts on close.
function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog.Root>, "children"> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
  children: React.ReactNode
}) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Content
        className={cn("top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0", className)}
        showCloseButton={showCloseButton}
      >
        <Dialog.Header className="sr-only">
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
        </Dialog.Header>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  )
}

function CommandInput({ className, ...props }: AutocompletePrimitive.Input.Props) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="p-1 pb-0"
    >
      <InputGroup.Root className="border-input/30 bg-input/30 h-8! rounded-lg! shadow-none! *:data-[slot=input-group-addon]:pl-2!">
        <AutocompletePrimitive.Input
          data-slot="command-input"
          render={<InputGroup.Input />}
          className={cn("text-sm", className)}
          {...props}
        />
        <InputGroup.Addon>
          <SearchIcon className="size-4 shrink-0 opacity-50" />
        </InputGroup.Addon>
      </InputGroup.Root>
    </div>
  )
}

function CommandList({ className, ...props }: AutocompletePrimitive.List.Props) {
  return (
    <AutocompletePrimitive.List
      data-slot="command-list"
      className={cn(
        "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none",
        className,
      )}
      {...props}
    />
  )
}

// Stays mounted as a live region; Base UI renders its children only when no items match.
function CommandEmpty({ className, ...props }: AutocompletePrimitive.Empty.Props) {
  return (
    <AutocompletePrimitive.Empty
      data-slot="command-empty"
      className={cn("text-muted-foreground py-6 text-center text-sm empty:p-0", className)}
      {...props}
    />
  )
}

// Pass the group's filtered `items` and render them with `Collection`.
function CommandGroup({ className, ...props }: AutocompletePrimitive.Group.Props) {
  return (
    <AutocompletePrimitive.Group
      data-slot="command-group"
      className={cn("text-foreground overflow-hidden p-1", className)}
      {...props}
    />
  )
}

function CommandGroupLabel({ className, ...props }: AutocompletePrimitive.GroupLabel.Props) {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="command-group-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs font-medium", className)}
      {...props}
    />
  )
}

function CommandCollection({ ...props }: AutocompletePrimitive.Collection.Props) {
  return (
    <AutocompletePrimitive.Collection
      data-slot="command-collection"
      {...props}
    />
  )
}

function CommandSeparator({ className, ...props }: AutocompletePrimitive.Separator.Props) {
  return (
    <AutocompletePrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  )
}

// Set `value` to the matching entry from `items`. `onClick` runs on pointer click and on Enter.
function CommandItem({ className, ...props }: AutocompletePrimitive.Item.Props) {
  return (
    <AutocompletePrimitive.Item
      data-slot="command-item"
      className={cn(
        "group/command-item data-highlighted:bg-muted data-highlighted:text-foreground data-highlighted:*:[svg]:text-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground group-data-highlighted/command-item:text-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  )
}

export {
  Command as Root,
  CommandDialog as Dialog,
  CommandInput as Input,
  CommandList as List,
  CommandEmpty as Empty,
  CommandGroup as Group,
  CommandGroupLabel as GroupLabel,
  CommandCollection as Collection,
  CommandItem as Item,
  CommandShortcut as Shortcut,
  CommandSeparator as Separator,
}
