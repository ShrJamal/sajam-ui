"use client"

import { Meter as MeterPrimitive } from "@base-ui/react/meter"
import { cn } from "cn"
import * as React from "react"

const fallbackColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

// Stacks several measurements that share one range. Each legend entry is its own meter for
// assistive technology; the combined bar is decorative.
function MeterGroup({
  values,
  label,
  min = 0,
  max = 100,
  format,
  orientation = "horizontal",
  labelPosition = "end",
  showValues = true,
  className,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: Props) {
  const labelId = React.useId()
  const range = max > min ? max - min : 0

  const bar = (
    <div
      aria-hidden="true"
      data-slot="meter-group-bar"
      className={cn(
        "bg-muted flex overflow-hidden rounded-full",
        orientation === "horizontal" ? "h-3 w-full" : "h-48 w-3 flex-col-reverse",
      )}
    >
      {values.map(function (item, index) {
        const percentage = range ? clamp(item.value / range, 0, 1) * 100 : 0

        return (
          <span
            key={`${item.label}-${index}`}
            data-slot="meter-group-segment"
            className="shrink-0 transition-[width,height] duration-300 motion-reduce:transition-none"
            style={{
              backgroundColor: item.color ?? fallbackColors[index % fallbackColors.length],
              ...(orientation === "horizontal"
                ? { width: `${percentage}%` }
                : { height: `${percentage}%` }),
            }}
          />
        )
      })}
    </div>
  )

  const legend = (
    <ul
      data-slot="meter-group-legend"
      className={cn(
        "m-0 grid list-none gap-x-5 gap-y-2 p-0",
        orientation === "horizontal" ? "grid-cols-1 sm:grid-cols-2" : "min-w-44 grid-cols-1",
      )}
    >
      {values.map(function (item, index) {
        const color = item.color ?? fallbackColors[index % fallbackColors.length]

        return (
          <li
            key={`${item.label}-${index}`}
            className="min-w-0"
          >
            <MeterPrimitive.Root
              value={clamp(item.value, min, max)}
              min={min}
              max={max}
              format={format}
              data-slot="meter-group-item"
              className="flex items-center gap-2 text-sm"
            >
              {item.icon ? (
                <span
                  aria-hidden="true"
                  className="flex shrink-0 [&_svg:not([class*='size-'])]:size-3.5"
                  style={{ color }}
                >
                  {item.icon}
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                />
              )}
              <MeterPrimitive.Label className="text-muted-foreground min-w-0 truncate">
                {item.label}
              </MeterPrimitive.Label>
              {showValues ? (
                <MeterPrimitive.Value className="ml-auto font-medium tabular-nums" />
              ) : null}
            </MeterPrimitive.Root>
          </li>
        )
      })}
    </ul>
  )

  return (
    <div
      role="group"
      aria-labelledby={label ? labelId : ariaLabelledBy}
      data-slot="meter-group"
      data-orientation={orientation}
      data-label-position={labelPosition}
      className={cn(
        "flex gap-3",
        orientation === "horizontal" ? "w-full flex-col" : "flex-wrap items-stretch",
        className,
      )}
      {...props}
    >
      {label ? (
        <div
          id={labelId}
          data-slot="meter-group-label"
          className="w-full text-sm font-medium"
        >
          {label}
        </div>
      ) : null}
      {labelPosition === "start" ? legend : null}
      {bar}
      {labelPosition === "end" ? legend : null}
    </div>
  )
}

type MeterValue = {
  label: string
  value: number
  // Any CSS color. Prefer theme tokens such as "var(--chart-1)".
  color?: string
  icon?: React.ReactNode
}

// A visible `label` or an `aria-label`/`aria-labelledby` names the group.
type Props = Omit<React.ComponentProps<"div">, "children"> & {
  values: MeterValue[]
  min?: number
  max?: number
  // Formats each value; defaults to a percentage of the range.
  format?: Intl.NumberFormatOptions
  orientation?: "horizontal" | "vertical"
  labelPosition?: "start" | "end"
  showValues?: boolean
} & (
    | { label: React.ReactNode }
    | { label?: undefined; "aria-label": string }
    | { label?: undefined; "aria-labelledby": string }
  )

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export { MeterGroup, type MeterValue }
