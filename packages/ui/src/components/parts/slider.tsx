import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { cn } from "cn"

// Renders one thumb per value: a number (or no value) gives a single thumb, an array gives a range.
function Slider<Value extends number | readonly number[]>({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  thumbLabels,
  "aria-label": ariaLabel,
  ...props
}: Props<Value>) {
  const values = value ?? defaultValue
  const thumbCount = Array.isArray(values) ? values.length : 1

  return (
    <SliderPrimitive.Root
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      aria-label={thumbLabels ? ariaLabel : undefined}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="bg-muted relative grow overflow-hidden rounded-full select-none data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-primary select-none data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            index={index}
            aria-label={thumbLabels?.[index] ?? ariaLabel}
            className="border-ring ring-ring/50 bg-background relative block size-3 shrink-0 rounded-full border transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 data-disabled:pointer-events-none"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

// `aria-label` names a single thumb; with `thumbLabels` it names the group and each thumb gets its own label.
type Props<Value extends number | readonly number[] = number | readonly number[]> =
  SliderPrimitive.Root.Props<Value> & {
    thumbLabels?: string[]
  }

export { Slider }
