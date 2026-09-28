"use client"

import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import * as React from "react"

const progressTrackVariants = cva(
  "bg-muted relative flex w-full items-center overflow-x-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-1",
        default: "h-1.5",
        lg: "h-2.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

// Indeterminate progress sweeps a third-width bar across the track with tw-animate-css utilities.
const progressIndicatorVariants = cva(
  "h-full transition-all data-indeterminate:w-1/3 data-indeterminate:translate-x-[300%] data-indeterminate:animate-in data-indeterminate:slide-in-from-left-[400%] data-indeterminate:repeat-infinite data-indeterminate:animation-duration-[1.5s] data-indeterminate:ease-in-out data-indeterminate:motion-reduce:w-full data-indeterminate:motion-reduce:translate-x-0 data-indeterminate:motion-reduce:animate-pulse data-indeterminate:rtl:-translate-x-[300%] data-indeterminate:rtl:slide-in-from-right-[400%]",
  {
    variants: {
      variant: {
        default: "bg-primary",
        info: "bg-info",
        success: "bg-success",
        warning: "bg-warning",
        destructive: "bg-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const ProgressContext = React.createContext<ProgressStyle>({})

// Renders a default track and indicator unless the children include a Progress.Track.
function Progress({ className, children, variant, size, ...props }: Props) {
  const style = React.useMemo(() => ({ variant, size }), [variant, size])
  const hasTrack = React.Children.toArray(children).some(function (child) {
    return React.isValidElement(child) && child.type === ProgressTrack
  })

  return (
    <ProgressContext.Provider value={style}>
      <ProgressPrimitive.Root
        data-slot="progress"
        data-variant={variant ?? "default"}
        className={cn("flex flex-wrap gap-3", className)}
        {...props}
      >
        {children}
        {!hasTrack && (
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        )}
      </ProgressPrimitive.Root>
    </ProgressContext.Provider>
  )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  const { size } = React.useContext(ProgressContext)

  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      className={cn(progressTrackVariants({ size }), className)}
      {...props}
    />
  )
}

function ProgressIndicator({ className, ...props }: ProgressPrimitive.Indicator.Props) {
  const { variant } = React.useContext(ProgressContext)

  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(progressIndicatorVariants({ variant }), className)}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={cn("text-muted-foreground ml-auto text-sm tabular-nums", className)}
      {...props}
    />
  )
}

type ProgressStyle = VariantProps<typeof progressTrackVariants> &
  VariantProps<typeof progressIndicatorVariants>

type Props = ProgressPrimitive.Root.Props & ProgressStyle

export {
  Progress as Root,
  ProgressTrack as Track,
  ProgressIndicator as Indicator,
  ProgressLabel as Label,
  ProgressValue as Value,
}
