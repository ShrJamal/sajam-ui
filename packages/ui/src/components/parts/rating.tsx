"use client"

import { Radio } from "@base-ui/react/radio"
import { RadioGroup } from "@base-ui/react/radio-group"
import { cn } from "cn"
import { StarIcon, XIcon } from "lucide-react"
import { useState, type ComponentProps, type ReactNode } from "react"

// Base UI supplies radio semantics, form integration, and arrow-key navigation.
// Filled icons use the current text color (`text-primary` by default).
function Rating({
  value,
  defaultValue = 0,
  onValueChange,
  className,
  count = 5,
  clearable = false,
  clearLabel = "Clear rating",
  icon = <StarIcon />,
  emptyIcon,
  getValueText = defaultValueText,
  disabled,
  readOnly,
  onPointerLeave,
  "aria-label": ariaLabel,
  ...props
}: Props) {
  const [localValue, setLocalValue] = useState(defaultValue)
  const [hovered, setHovered] = useState<number | null>(null)
  const maximum = Number.isFinite(count) ? Math.max(1, Math.floor(count)) : 5
  const requestedValue = value ?? localValue
  const selected = Number.isFinite(requestedValue)
    ? Math.min(maximum, Math.max(0, requestedValue))
    : 0
  const interactive = !disabled && !readOnly
  // Hovering previews the rating the pointer would select.
  const shown = interactive && hovered !== null ? hovered : selected

  return (
    <RadioGroup
      {...props}
      data-slot="rating"
      aria-label={ariaLabel ?? (props["aria-labelledby"] ? undefined : "Rating")}
      value={selected}
      disabled={disabled}
      readOnly={readOnly}
      className={cn("text-primary flex w-fit gap-1", className)}
      onValueChange={function (next) {
        if (value === undefined) setLocalValue(next)
        onValueChange?.(next)
      }}
      onPointerLeave={function (event) {
        onPointerLeave?.(event)
        setHovered(null)
      }}
    >
      {clearable ? (
        <Radio.Root
          value={0}
          aria-label={clearLabel}
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 grid size-9 cursor-pointer place-items-center rounded-md outline-none focus-visible:ring-3 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:cursor-default"
          onPointerEnter={function () {
            setHovered(0)
          }}
        >
          <XIcon
            aria-hidden="true"
            className="size-4"
          />
        </Radio.Root>
      ) : null}
      {Array.from({ length: maximum }, function (_, index) {
        const item = index + 1
        const filled = item <= shown

        return (
          <Radio.Root
            key={item}
            value={item}
            aria-label={getValueText(item)}
            className="focus-visible:ring-ring/50 flex size-9 cursor-pointer items-center justify-center rounded-md outline-none focus-visible:ring-3 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:cursor-default"
            onPointerEnter={function () {
              setHovered(item)
            }}
          >
            <span
              aria-hidden="true"
              className={cn(
                "[&_svg]:size-6",
                filled ? "[&_svg]:fill-current" : "text-muted-foreground/40",
              )}
            >
              {filled ? icon : (emptyIcon ?? icon)}
            </span>
          </Radio.Root>
        )
      })}
    </RadioGroup>
  )
}

type Props = Omit<
  ComponentProps<typeof RadioGroup<number>>,
  "value" | "defaultValue" | "onValueChange" | "className" | "children"
> & {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  className?: string
  count?: number
  clearable?: boolean
  clearLabel?: string
  icon?: ReactNode
  emptyIcon?: ReactNode
  // Accessible name for each item, e.g. "3 stars".
  getValueText?: (value: number) => string
}

function defaultValueText(value: number) {
  return `${value} ${value === 1 ? "star" : "stars"}`
}

export { Rating }
