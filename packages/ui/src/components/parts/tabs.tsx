"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { XIcon } from "lucide-react"

const tabsListVariants = cva(
  "group/tabs-list relative isolate inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Tabs({ className, orientation = "horizontal", ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      orientation={orientation}
      className={cn("group/tabs flex gap-2 data-horizontal:flex-col", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  variant = "default",
  scrollable = false,
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants> & { scrollable?: boolean }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        tabsListVariants({ variant }),
        scrollable &&
          "no-scrollbar max-w-full justify-start overflow-x-auto overflow-y-hidden [&>[role=tab]]:shrink-0",
        className,
      )}
      {...props}
    />
  )
}

// With `onClose`, the tab shows a pointer-only close mark and closes with the Delete key.
function TabsTrigger({
  className,
  children,
  onClose,
  closeLabel = "Close tab",
  onKeyDown,
  ...props
}: TriggerProps) {
  function close(tab: HTMLElement) {
    if (!onClose) return
    // Keep keyboard focus in the list: the closed tab is about to unmount.
    if (tab.ownerDocument.activeElement === tab) {
      const neighbor = [tab.nextElementSibling, tab.previousElementSibling].find(
        function (element) {
          return element?.getAttribute("role") === "tab"
        },
      )
      if (neighbor instanceof HTMLElement) neighbor.focus()
    }
    onClose()
  }

  return (
    <TabsPrimitive.Tab
      {...props}
      data-slot="tabs-trigger"
      aria-keyshortcuts={onClose ? "Delete" : undefined}
      className={cn(
        "text-foreground/60 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:text-muted-foreground dark:hover:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 has-data-[slot=tabs-close]:pr-1 group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
        "after:bg-foreground after:absolute after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        // Tabs.Indicator draws the active marker instead of the tab itself.
        "group-has-data-[slot=tabs-indicator]/tabs-list:after:hidden group-has-data-[slot=tabs-indicator]/tabs-list:data-active:border-transparent group-has-data-[slot=tabs-indicator]/tabs-list:data-active:bg-transparent group-has-data-[slot=tabs-indicator]/tabs-list:data-active:shadow-none dark:group-has-data-[slot=tabs-indicator]/tabs-list:data-active:border-transparent dark:group-has-data-[slot=tabs-indicator]/tabs-list:data-active:bg-transparent",
        className,
      )}
      onKeyDown={function (event) {
        onKeyDown?.(event)
        if (event.defaultPrevented || event.key !== "Delete" || !onClose || props.disabled) return
        event.preventDefault()
        close(event.currentTarget)
      }}
    >
      {children}
      {onClose ? (
        // Hidden from assistive technology: the Delete key is the accessible close action.
        <span
          aria-hidden="true"
          data-slot="tabs-close"
          title={closeLabel}
          className="hover:bg-foreground/10 hover:text-foreground inline-flex size-4 items-center justify-center rounded-sm opacity-60 hover:opacity-100"
          onClick={function (event) {
            event.stopPropagation()
            const tab = event.currentTarget.closest<HTMLElement>('[role="tab"]')
            if (tab) close(tab)
          }}
        >
          <XIcon className="size-3" />
        </span>
      ) : null}
    </TabsPrimitive.Tab>
  )
}

// An animated marker for the active tab. Place it as the last child of Tabs.List.
function TabsIndicator({ className, ...props }: TabsPrimitive.Indicator.Props) {
  return (
    <TabsPrimitive.Indicator
      data-slot="tabs-indicator"
      className={cn(
        "absolute top-0 left-0 -z-10 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) translate-y-(--active-tab-top) rounded-md transition-[translate,width,height] duration-200 ease-out motion-reduce:transition-none",
        "group-data-[variant=default]/tabs-list:bg-background dark:group-data-[variant=default]/tabs-list:border-input dark:group-data-[variant=default]/tabs-list:bg-input/30 group-data-[variant=default]/tabs-list:shadow-sm dark:group-data-[variant=default]/tabs-list:border",
        "group-data-[variant=line]/tabs-list:bg-foreground group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:data-horizontal:top-auto group-data-[variant=line]/tabs-list:data-horizontal:bottom-[-3px] group-data-[variant=line]/tabs-list:data-horizontal:h-0.5 group-data-[variant=line]/tabs-list:data-horizontal:translate-y-0 group-data-[variant=line]/tabs-list:data-vertical:right-[-1px] group-data-[variant=line]/tabs-list:data-vertical:left-auto group-data-[variant=line]/tabs-list:data-vertical:w-0.5 group-data-[variant=line]/tabs-list:data-vertical:translate-x-0",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

type TriggerProps = TabsPrimitive.Tab.Props & {
  onClose?: () => void
  closeLabel?: string
}

export {
  Tabs as Root,
  TabsList as List,
  TabsTrigger as Trigger,
  TabsIndicator as Indicator,
  TabsContent as Content,
  tabsListVariants as listVariants,
}
