"use client"

import { Field } from "@base-ui/react/field"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import * as React from "react"
import { matchesKeyFilter, useKeyFilter, type KeyFilter } from "./key-filter.js"

const textareaVariants = cva(
  "flex min-h-16 w-full rounded-lg border border-input px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
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

// A native textarea that registers with Field, can grow with its content, and filters entered text.
function Textarea({
  className,
  variant,
  autoResize = false,
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

  // Field.Control renders an input by default and types its props for one; the textarea
  // props are forwarded unchanged to the rendered textarea.
  return (
    <Field.Control
      render={<textarea />}
      data-slot="textarea"
      data-variant={variant ?? "default"}
      {...(props as Field.Control.Props)}
      {...(filterHandlers as Field.Control.Props)}
      className={cn(
        textareaVariants({ variant }),
        // Browsers without `field-sizing` keep the `rows` height and scroll instead.
        autoResize && "field-sizing-content resize-none",
        className,
      )}
    />
  )
}

type Props = React.ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants> & {
    autoResize?: boolean
    keyFilter?: KeyFilter
  }

export { Textarea }
