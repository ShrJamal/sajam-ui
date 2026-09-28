"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { XIcon } from "lucide-react"
import type { MouseEventHandler } from "react"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-4xl border border-transparent font-medium whitespace-nowrap transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        outline: "border-border text-foreground [a]:hover:bg-muted",
        ghost: "text-muted-foreground [a]:hover:bg-muted [a]:hover:text-foreground",
        link: "text-primary underline-offset-4 [a]:hover:underline",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 [a]:hover:bg-destructive/20",
        success:
          "bg-success/10 text-success focus-visible:ring-success/20 dark:bg-success/20 [a]:hover:bg-success/20",
        warning:
          "bg-warning/10 text-warning focus-visible:ring-warning/20 dark:bg-warning/20 [a]:hover:bg-warning/20",
        info: "bg-info/10 text-info focus-visible:ring-info/20 dark:bg-info/20 [a]:hover:bg-info/20",
      },
      size: {
        sm: "h-4 gap-0.5 px-1.5 text-[0.625rem] has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 has-data-[slot=badge-remove]:pr-0.5 [&>svg]:size-2.5",
        default:
          "h-5 gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 has-data-[slot=badge-remove]:pr-0.5 [&>svg]:size-3",
        lg: "h-6 gap-1 px-2.5 text-sm has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 has-data-[slot=badge-remove]:pr-1 [&>svg]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

// A compact label. With `onRemove`, a dismiss button is appended inside the non-interactive badge.
function Badge({
  className,
  variant = "default",
  size = "default",
  onRemove,
  removeLabel = "Remove",
  children,
  render,
  ...props
}: Props) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(props, {
      className: cn(badgeVariants({ variant, size }), className),
      children: onRemove ? (
        <>
          {children}
          <button
            type="button"
            data-slot="badge-remove"
            aria-label={removeLabel}
            className="focus-visible:ring-ring inline-flex size-4 shrink-0 items-center justify-center rounded-full opacity-70 transition-opacity outline-none group-data-[size=lg]/badge:size-5 group-data-[size=sm]/badge:size-3 hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-inset [&>svg]:size-3 group-data-[size=lg]/badge:[&>svg]:size-3.5 group-data-[size=sm]/badge:[&>svg]:size-2.5"
            onClick={onRemove}
          >
            <XIcon aria-hidden="true" />
          </button>
        </>
      ) : (
        children
      ),
    }),
    render,
    state: {
      slot: "badge",
      variant,
      size,
    },
  })
}

type Props = useRender.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    // Renders a dismiss button. Don't combine with an interactive `render` element such as a link.
    onRemove?: MouseEventHandler<HTMLButtonElement>
    removeLabel?: string
  }

export { Badge, badgeVariants }
