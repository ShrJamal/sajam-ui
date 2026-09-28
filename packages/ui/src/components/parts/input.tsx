"use client"

import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import * as React from "react"
import { matchesKeyFilter, useKeyFilter, type KeyFilter } from "./key-filter.js"

const inputVariants = cva(
  "h-8 w-full min-w-0 rounded-lg border border-input px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default: "bg-transparent disabled:bg-input/50 dark:bg-input/30 dark:disabled:bg-input/80",
        filled: "border-transparent bg-muted/70 dark:bg-muted/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

// A text input with an optional filter that rejects typed, pasted, and composed text.
function Input({
  className,
  variant,
  keyFilter,
  onBeforeInput,
  onChange,
  onFocus,
  onCompositionStart,
  onCompositionEnd,
  ...props
}: Props) {
  const filterHandlers = useKeyFilter(
    keyFilter
      ? function (value) {
          return matchesKeyFilter(value, keyFilter)
        }
      : undefined,
    { onBeforeInput, onChange, onFocus, onCompositionStart, onCompositionEnd },
  )

  return (
    <InputPrimitive
      data-slot="input"
      data-variant={variant ?? "default"}
      {...props}
      {...filterHandlers}
      className={cn(inputVariants({ variant }), className)}
    />
  )
}

type Props = React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    keyFilter?: KeyFilter
  }

export { Input, type KeyFilter }
