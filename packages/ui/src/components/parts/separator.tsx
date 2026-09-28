"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "cn"
import type * as React from "react"

const lineVariants = {
  solid: "bg-border",
  dashed: "border-border border-dashed",
  dotted: "border-border border-dotted",
}

// A horizontal or vertical rule. With children it renders a label between two rules; the
// label stays readable by assistive technology because separators hide their content.
function Separator({
  className,
  orientation = "horizontal",
  variant = "solid",
  align = "center",
  children,
  ...props
}: Props) {
  const hasLabel = children !== undefined && children !== null && children !== false
  const line = cn(
    "shrink-0 data-horizontal:h-px data-vertical:w-px",
    lineVariants[variant],
    variant !== "solid" && "data-horizontal:border-t data-vertical:border-l",
  )

  if (!hasLabel) {
    return (
      <SeparatorPrimitive
        data-slot="separator"
        orientation={orientation}
        className={cn(line, "data-horizontal:w-full data-vertical:self-stretch", className)}
        {...props}
      />
    )
  }

  return (
    <div
      data-slot="separator"
      data-orientation={orientation}
      className={cn(
        "text-muted-foreground flex shrink-0 items-center gap-3 text-xs data-horizontal:w-full data-vertical:flex-col data-vertical:self-stretch",
        className,
      )}
      {...props}
    >
      <SeparatorPrimitive
        orientation={orientation}
        className={cn(
          line,
          "data-horizontal:min-w-4 data-vertical:min-h-4",
          align === "start" ? "flex-none" : "flex-1",
        )}
      />
      <span className="shrink-0">{children}</span>
      <SeparatorPrimitive
        orientation={orientation}
        className={cn(
          line,
          "data-horizontal:min-w-4 data-vertical:min-h-4",
          align === "end" ? "flex-none" : "flex-1",
        )}
      />
    </div>
  )
}

type Props = React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
  variant?: "solid" | "dashed" | "dotted"
  align?: "start" | "center" | "end"
}

export { Separator }
