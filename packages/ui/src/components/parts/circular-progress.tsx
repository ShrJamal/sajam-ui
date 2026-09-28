import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const circularProgressVariants = cva(
  "origin-center stroke-current transition-[stroke-dashoffset] duration-500 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default: "text-primary",
        info: "text-info",
        success: "text-success",
        warning: "text-warning",
        destructive: "text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const sizeStyles = {
  sm: { className: "size-8", valueClassName: "text-[0.5rem]", strokeWidth: 2 },
  default: { className: "size-10", valueClassName: "text-[0.625rem]", strokeWidth: 3 },
  lg: { className: "size-14", valueClassName: "text-xs", strokeWidth: 3 },
} as const

// Adapted from HeroUI's CircularProgress. A null value renders an indeterminate spinning arc.
function CircularProgress({
  value,
  min = 0,
  max = 100,
  label,
  showValue = false,
  size = "default",
  variant = "default",
  strokeWidth,
  className,
  ...props
}: Props) {
  const range = normalizeRange(value, min, max)
  const sizeStyle = sizeStyles[size]
  const safeStrokeWidth =
    typeof strokeWidth === "number" && Number.isFinite(strokeWidth)
      ? Math.min(8, Math.max(0.5, strokeWidth))
      : sizeStyle.strokeWidth
  const radius = 16 - safeStrokeWidth
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - (range.percentage ?? 25) / 100)

  return (
    <ProgressPrimitive.Root
      value={range.value}
      min={range.min}
      max={range.max}
      data-slot="circular-progress"
      data-variant={variant}
      className={cn("flex w-fit flex-col items-center justify-center gap-1", className)}
      {...props}
    >
      <div className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          fill="none"
          data-slot="circular-progress-svg"
          className={cn(
            "relative overflow-visible",
            range.value === null && "animate-spin motion-reduce:animate-none",
            sizeStyle.className,
          )}
        >
          <circle
            cx="16"
            cy="16"
            r={radius}
            strokeWidth={safeStrokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeLinecap="round"
            className="stroke-muted"
          />
          <circle
            cx="16"
            cy="16"
            r={radius}
            strokeWidth={safeStrokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="rotate(-90 16 16)"
            className={circularProgressVariants({ variant })}
          />
        </svg>
        {showValue && range.value !== null ? (
          <ProgressPrimitive.Value
            data-slot="circular-progress-value"
            className={cn(
              "text-foreground absolute inset-0 flex items-center justify-center font-medium tabular-nums",
              sizeStyle.valueClassName,
            )}
          />
        ) : null}
      </div>
      {label ? (
        <ProgressPrimitive.Label
          data-slot="circular-progress-label"
          className="text-muted-foreground text-sm font-medium"
        >
          {label}
        </ProgressPrimitive.Label>
      ) : null}
    </ProgressPrimitive.Root>
  )
}

type Props = Omit<
  ProgressPrimitive.Root.Props,
  "children" | "className" | "max" | "min" | "value"
> & {
  value: number | null
  min?: number
  max?: number
  label?: React.ReactNode
  showValue?: boolean
  size?: keyof typeof sizeStyles
  variant?: NonNullable<VariantProps<typeof circularProgressVariants>["variant"]>
  strokeWidth?: number
  className?: string
}

type NormalizedRange = {
  value: number | null
  min: number
  max: number
  percentage: number | null
}

function normalizeRange(value: number | null, min: number, max: number): NormalizedRange {
  let safeMin = Number.isFinite(min) ? min : 0
  let safeMax = Number.isFinite(max) ? max : 100
  const span = safeMax - safeMin

  if (!Number.isFinite(span) || span <= 0) {
    safeMin = 0
    safeMax = 100
  }

  if (value === null) {
    return { value: null, min: safeMin, max: safeMax, percentage: null }
  }

  const finiteValue = Number.isFinite(value) ? value : safeMin
  const safeValue = Math.min(safeMax, Math.max(safeMin, finiteValue))

  return {
    value: safeValue,
    min: safeMin,
    max: safeMax,
    percentage: ((safeValue - safeMin) / (safeMax - safeMin)) * 100,
  }
}

export { CircularProgress }
