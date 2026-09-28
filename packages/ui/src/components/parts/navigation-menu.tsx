import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import { cva } from "class-variance-authority"
import { cn } from "cn"
import { ChevronDownIcon } from "lucide-react"

const navigationMenuTriggerStyle = cva(
  "group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted group-data-[orientation=vertical]/navigation-menu:w-full group-data-[orientation=vertical]/navigation-menu:justify-start",
)

// Renders the shared popup. Vertical menus open beside their triggers unless `side` is set.
// The positioner's pseudo-element bridges the offset gap so the pointer can reach the popup.
function NavigationMenu({
  orientation = "horizontal",
  side = orientation === "vertical" ? "inline-end" : "bottom",
  sideOffset = 8,
  align = "start",
  alignOffset = 0,
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Root.Props &
  Pick<NavigationMenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center data-[orientation=vertical]:max-w-none data-[orientation=vertical]:flex-none data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[orientation=vertical]:justify-start",
        className,
      )}
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Portal>
        <NavigationMenuPrimitive.Positioner
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          className="isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] before:absolute before:content-[''] data-instant:transition-none data-[side=bottom]:before:inset-x-0 data-[side=bottom]:before:-top-2.5 data-[side=bottom]:before:h-2.5 data-[side=inline-end]:before:inset-y-0 data-[side=inline-end]:before:-start-2.5 data-[side=inline-end]:before:w-2.5 data-[side=inline-start]:before:inset-y-0 data-[side=inline-start]:before:-end-2.5 data-[side=inline-start]:before:w-2.5 data-[side=left]:before:inset-y-0 data-[side=left]:before:-right-2.5 data-[side=left]:before:w-2.5 data-[side=right]:before:inset-y-0 data-[side=right]:before:-left-2.5 data-[side=right]:before:w-2.5 data-[side=top]:before:inset-x-0 data-[side=top]:before:-bottom-2.5 data-[side=top]:before:h-2.5"
        >
          <NavigationMenuPrimitive.Popup className="bg-popover text-popover-foreground ring-foreground/10 relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-lg shadow ring-1 transition-[opacity,transform,width,height,scale,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] outline-none data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-[ease] data-starting-style:scale-90 data-starting-style:opacity-0">
            <NavigationMenuPrimitive.Viewport className="relative size-full overflow-hidden" />
          </NavigationMenuPrimitive.Popup>
        </NavigationMenuPrimitive.Positioner>
      </NavigationMenuPrimitive.Portal>
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({ className, ...props }: NavigationMenuPrimitive.List.Props) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "flex flex-1 list-none items-center justify-center gap-0 group-data-[orientation=vertical]/navigation-menu:flex-col group-data-[orientation=vertical]/navigation-menu:items-stretch",
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({ className, ...props }: NavigationMenuPrimitive.Item.Props) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        aria-hidden="true"
        className="relative top-px ml-1 size-3 transition duration-300 group-data-[orientation=horizontal]/navigation-menu:group-data-popup-open/navigation-menu-trigger:rotate-180 group-data-[orientation=vertical]/navigation-menu:ml-auto group-data-[orientation=vertical]/navigation-menu:-rotate-90 rtl:group-data-[orientation=vertical]/navigation-menu:rotate-90"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({ className, ...props }: NavigationMenuPrimitive.Content.Props) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "h-full w-auto p-1 transition-[opacity,transform,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:data-[activation-direction=down]:-translate-y-8 data-starting-style:data-[activation-direction=down]:translate-y-8 data-ending-style:data-[activation-direction=left]:translate-x-1/2 data-starting-style:data-[activation-direction=left]:-translate-x-1/2 data-ending-style:data-[activation-direction=right]:-translate-x-1/2 data-starting-style:data-[activation-direction=right]:translate-x-1/2 data-ending-style:data-[activation-direction=up]:translate-y-8 data-starting-style:data-[activation-direction=up]:-translate-y-8",
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuLink({ className, ...props }: NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "hover:bg-muted focus:bg-muted focus-visible:ring-ring/50 data-active:bg-muted/50 data-active:hover:bg-muted data-active:focus:bg-muted flex items-center gap-2 rounded-lg p-2 text-sm transition-all outline-none focus-visible:ring-3 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:rounded-md [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

export {
  NavigationMenu as Root,
  NavigationMenuList as List,
  NavigationMenuItem as Item,
  NavigationMenuTrigger as Trigger,
  NavigationMenuContent as Content,
  NavigationMenuLink as Link,
  navigationMenuTriggerStyle as triggerStyle,
}
