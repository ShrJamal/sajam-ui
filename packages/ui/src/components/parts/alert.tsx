import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { XIcon } from "lucide-react"
import * as React from "react"
import { Button } from "./button.js"

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        info: "border-info/30 bg-info/10 text-info dark:bg-info/15",
        success: "border-success/30 bg-success/10 text-success dark:bg-success/15",
        warning: "border-warning/30 bg-warning/10 text-warning dark:bg-warning/15",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive dark:bg-destructive/15",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

// Static by default. Pass role="alert" or role="status" when the alert appears in response to an event.
function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-variant={variant ?? "default"}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "[&_a]:hover:text-foreground font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3",
        className,
      )}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground [&_a]:hover:text-foreground text-sm text-balance md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
        className,
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

function AlertDismiss({
  label = "Dismiss alert",
  className,
  ...props
}: React.ComponentProps<typeof Button> & { label?: string }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      data-slot="alert-dismiss"
      className={cn("-mt-0.5 -mr-0.5", className)}
      {...props}
    >
      <XIcon />
    </Button>
  )
}

export {
  Alert as Root,
  AlertTitle as Title,
  AlertDescription as Description,
  AlertAction as Action,
  AlertDismiss as Dismiss,
}
