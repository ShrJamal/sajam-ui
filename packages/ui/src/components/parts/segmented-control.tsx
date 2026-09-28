"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { cn } from "cn"
import * as React from "react"

const SegmentedControlContext = React.createContext<Size>("default")

// A pill track with exactly one selected segment. Built on radio semantics, so arrow keys move
// the selection; use ToggleGroup when segments can be deselected or several can be on.
function SegmentedControl<Value extends string>({
  className,
  size = "default",
  ...props
}: RadioGroupPrimitive.Props<Value> & { size?: Size }) {
  return (
    <SegmentedControlContext.Provider value={size}>
      <RadioGroupPrimitive<Value>
        data-slot="segmented-control"
        data-size={size}
        className={cn(
          "bg-muted text-muted-foreground inline-flex w-fit items-center gap-0.5 rounded-lg p-0.5 data-disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </SegmentedControlContext.Provider>
  )
}

function SegmentedControlItem({ className, ...props }: RadioPrimitive.Root.Props) {
  const size = React.useContext(SegmentedControlContext)

  return (
    <RadioPrimitive.Root
      data-slot="segmented-control-item"
      data-size={size}
      className={cn(
        "hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 data-checked:bg-background data-checked:text-foreground dark:data-checked:bg-input/50 inline-flex flex-1 cursor-default items-center justify-center gap-1.5 rounded-md border border-transparent font-medium whitespace-nowrap transition-[color,background-color,box-shadow] outline-none focus-visible:ring-3 data-checked:shadow-sm data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[size=default]:h-7 data-[size=default]:px-2.5 data-[size=default]:text-sm data-[size=lg]:h-8 data-[size=lg]:px-3 data-[size=lg]:text-sm data-[size=sm]:h-6 data-[size=sm]:px-2 data-[size=sm]:text-xs data-[size=sm]:[&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    />
  )
}

type Size = "sm" | "default" | "lg"

export { SegmentedControl as Root, SegmentedControlItem as Item }
