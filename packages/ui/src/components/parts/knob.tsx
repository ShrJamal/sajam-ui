"use client"

import { cn } from "cn"
import { useState, type ComponentProps, type KeyboardEvent, type PointerEvent } from "react"

const START_ANGLE = 135
const SWEEP = 270
const RADIUS = 42

// Presents a numeric value as a keyboard and pointer-operable dial.
// The value arc uses the current text color (`text-*`) and the size follows `size-*` classes.
function Knob({
  className,
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  formatValue = String,
  showValue = true,
  readOnly,
  disabled,
  name,
  onKeyDown,
  onPointerDown,
  onPointerMove,
  ...props
}: Props) {
  const [internalValue, setInternalValue] = useState(() => clamp(defaultValue ?? min, min, max))
  const currentValue = clamp(value ?? internalValue, min, max)
  const valueText = formatValue(currentValue)
  const sweep = max === min ? 0 : ((currentValue - min) / (max - min)) * SWEEP
  const interactive = !disabled && !readOnly

  function update(nextValue: number) {
    const steppedValue = clamp(roundToStep(nextValue, min, step), min, max)
    if (steppedValue === currentValue) return
    if (value === undefined) setInternalValue(steppedValue)
    onValueChange?.(steppedValue)
  }

  function updateFromPointer(event: PointerEvent<HTMLDivElement>, dragging: boolean) {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - (bounds.left + bounds.width / 2)
    const y = event.clientY - (bounds.top + bounds.height / 2)
    const angle = (Math.atan2(y, x) * 180) / Math.PI
    const offset = (((angle - START_ANGLE) % 360) + 360) % 360
    let progress = offset / SWEEP
    // The gap below the dial is outside the arc. A press there snaps to the nearest end;
    // a drag holds the end closest to the current value so it never jumps from max to min.
    if (offset > SWEEP) {
      if (dragging) progress = currentValue - min > (max - min) / 2 ? 1 : 0
      else progress = offset < SWEEP + (360 - SWEEP) / 2 ? 1 : 0
    }
    update(min + progress * (max - min))
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event)
    if (event.defaultPrevented || !interactive) return
    let nextValue: number | undefined
    if (event.key === "ArrowUp" || event.key === "ArrowRight") nextValue = currentValue + step
    if (event.key === "ArrowDown" || event.key === "ArrowLeft") nextValue = currentValue - step
    if (event.key === "PageUp") nextValue = currentValue + step * 10
    if (event.key === "PageDown") nextValue = currentValue - step * 10
    if (event.key === "Home") nextValue = min
    if (event.key === "End") nextValue = max
    if (nextValue === undefined) return
    event.preventDefault()
    update(nextValue)
  }

  return (
    <div
      {...props}
      data-slot="knob"
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={currentValue}
      aria-valuetext={valueText}
      aria-readonly={readOnly || undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        "text-primary focus-visible:ring-ring/50 relative inline-grid size-28 shrink-0 cursor-pointer touch-none place-items-center rounded-full outline-none select-none focus-visible:ring-3 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:cursor-default",
        className,
      )}
      onKeyDown={handleKeyDown}
      onPointerDown={function (event) {
        onPointerDown?.(event)
        if (event.defaultPrevented || !interactive) return
        event.currentTarget.setPointerCapture(event.pointerId)
        updateFromPointer(event, false)
      }}
      onPointerMove={function (event) {
        onPointerMove?.(event)
        if (event.defaultPrevented || !interactive) return
        if (event.currentTarget.hasPointerCapture(event.pointerId)) updateFromPointer(event, true)
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="size-full"
        aria-hidden="true"
      >
        <path
          data-slot="knob-track"
          d={describeArc(START_ANGLE, START_ANGLE + SWEEP)}
          fill="none"
          className="stroke-muted"
          strokeWidth={10}
          strokeLinecap="round"
        />
        {sweep > 0 ? (
          <path
            data-slot="knob-range"
            d={describeArc(START_ANGLE, START_ANGLE + sweep)}
            fill="none"
            stroke="currentColor"
            strokeWidth={10}
            strokeLinecap="round"
          />
        ) : null}
        {showValue ? (
          <text
            data-slot="knob-value"
            x="50"
            y="52"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-[16px] font-semibold tabular-nums"
          >
            {valueText}
          </text>
        ) : null}
      </svg>
      {name ? (
        <input
          type="hidden"
          name={name}
          value={currentValue}
          disabled={disabled}
        />
      ) : null}
    </div>
  )
}

type Props = Omit<ComponentProps<"div">, "defaultValue" | "onChange" | "children"> & {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  // Formats the visible value and its announced `aria-valuetext`.
  formatValue?: (value: number) => string
  showValue?: boolean
  readOnly?: boolean
  disabled?: boolean
  name?: string
}

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min
  return Math.min(Math.max(value, min), max)
}

function roundToStep(value: number, min: number, step: number) {
  if (step <= 0) return value
  const precision = (String(step).split(".")[1] ?? "").length
  return Number((Math.round((value - min) / step) * step + min).toFixed(precision))
}

function describeArc(startAngle: number, endAngle: number) {
  const start = polarToCartesian(startAngle)
  const end = polarToCartesian(endAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
}

function polarToCartesian(angle: number) {
  const radians = (angle * Math.PI) / 180
  return { x: 50 + RADIUS * Math.cos(radians), y: 50 + RADIUS * Math.sin(radians) }
}

export { Knob }
