"use client"

import { cn } from "cn"
import * as React from "react"
import * as ResizablePrimitive from "react-resizable-panels"

// Sajam owns these prop types and maps them onto react-resizable-panels, so
// library renames do not change the public API.

// The library sets the group's flex direction and a 100% size inline. Clearing the inline
// size lets height and width classes apply; data-orientation is exposed for styling.
function ResizableRoot({
  actionsRef,
  className,
  defaultValue,
  onValueChange,
  onValueCommitted,
  orientation = "horizontal",
  ref,
  style,
  ...props
}: RootProps) {
  const groupRef = ResizablePrimitive.useGroupRef()

  React.useImperativeHandle(
    actionsRef,
    () => ({
      getValue: () => groupRef.current?.getLayout() ?? {},
      setValue: (layout) => groupRef.current?.setLayout(layout),
    }),
    [groupRef],
  )

  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      data-orientation={orientation}
      orientation={orientation}
      className={cn("h-full w-full", className)}
      style={{ height: undefined, width: undefined, ...style }}
      defaultLayout={defaultValue}
      elementRef={ref}
      groupRef={groupRef}
      onLayoutChange={onValueChange}
      onLayoutChanged={
        onValueCommitted &&
        ((layout, meta) => onValueCommitted(layout, { userInteraction: meta.isUserInteraction }))
      }
      {...props}
    />
  )
}

function ResizablePanel({ actionsRef, onSizeChange, ref, ...props }: PanelProps) {
  const panelRef = ResizablePrimitive.usePanelRef()

  React.useImperativeHandle(
    actionsRef,
    () => ({
      collapse: () => panelRef.current?.collapse(),
      expand: () => panelRef.current?.expand(),
      getSize: () => toPanelSize(panelRef.current?.getSize()),
      isCollapsed: () => panelRef.current?.isCollapsed() ?? false,
      resize: (size) => panelRef.current?.resize(size),
    }),
    [panelRef],
  )

  return (
    <ResizablePrimitive.Panel
      data-slot="resizable-panel"
      elementRef={ref}
      panelRef={panelRef}
      onResize={onSizeChange && ((size) => onSizeChange(toPanelSize(size)))}
      {...props}
    />
  )
}

function ResizableHandle({ withHandle, className, ref, ...props }: HandleProps) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      elementRef={ref}
      className={cn(
        "bg-border ring-offset-background focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90",
        className,
      )}
      {...props}
    >
      {withHandle && <div className="bg-border z-10 flex h-6 w-1 shrink-0 rounded-lg" />}
    </ResizablePrimitive.Separator>
  )
}

// Panel sizes keyed by panel id, as percentages of the group (0..100).
type Layout = Record<string, number>

// Numbers are pixels. Strings without a unit are percentages ("40" or "40%");
// "px", "em", "rem", "vh", and "vw" units are also accepted.
type Size = number | string

type PanelSize = {
  percentage: number
  pixels: number
}

type RootActions = {
  getValue: () => Layout
  setValue: (layout: Layout) => void
}

type PanelActions = {
  collapse: () => void
  expand: () => void
  getSize: () => PanelSize
  isCollapsed: () => boolean
  resize: (size: Size) => void
}

type DivProps = Omit<React.ComponentProps<"div">, "defaultValue" | "id" | "onResize">

type RootProps = DivProps & {
  actionsRef?: React.Ref<RootActions>
  // Initial layout, for example one restored from storage.
  defaultValue?: Layout
  disabled?: boolean
  id?: string
  // Called on every change, including each pointer move while dragging.
  onValueChange?: (layout: Layout) => void
  // Called once a change is complete. Prefer it for saving layouts.
  onValueCommitted?: (layout: Layout, details: { userInteraction: boolean }) => void
  orientation?: "horizontal" | "vertical"
}

type PanelProps = DivProps & {
  actionsRef?: React.Ref<PanelActions>
  // Size when collapsed. Defaults to 0%.
  collapsedSize?: Size
  // Collapses when resized below minSize.
  collapsible?: boolean
  defaultSize?: Size
  // Prevents resizing this panel directly or through its neighbors.
  disabled?: boolean
  // Keys this panel in the layout. Set it when saving or restoring layouts.
  id?: string
  maxSize?: Size
  minSize?: Size
  onSizeChange?: (size: PanelSize) => void
}

type HandleProps = Omit<DivProps, "role" | "tabIndex"> & {
  disabled?: boolean
  id?: string
  withHandle?: boolean
}

function toPanelSize(size: ResizablePrimitive.PanelSize | undefined): PanelSize {
  return { percentage: size?.asPercentage ?? 0, pixels: size?.inPixels ?? 0 }
}

export {
  ResizableHandle as Handle,
  ResizablePanel as Panel,
  ResizableRoot as Root,
  type Layout,
  type PanelActions,
  type PanelSize,
  type RootActions,
}
