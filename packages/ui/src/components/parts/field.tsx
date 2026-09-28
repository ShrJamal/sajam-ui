"use client"

import { Field as FieldPrimitive } from "@base-ui/react/field"
import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import * as React from "react"
import { Separator } from "./separator.js"

// Tracks the enclosing Field.Root so parts can honor its `invalid` prop and work outside it.
const FieldContext = React.createContext<{ invalid: boolean } | null>(null)

const PLAIN_STATE = {
  disabled: false,
  touched: false,
  dirty: false,
  valid: null,
  filled: false,
  focused: false,
} satisfies FieldPrimitive.Description.State

const fieldVariants = cva("group/field flex w-full gap-2 data-invalid:text-destructive", {
  variants: {
    orientation: {
      vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
      horizontal:
        "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      responsive:
        "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
})

// A fieldset that disables every nested field and labels itself with Field.Legend.
function FieldSet({ className, ...props }: FieldsetPrimitive.Root.Props) {
  return (
    <FieldsetPrimitive.Root
      data-slot="field-set"
      className={cn(
        "group/field-set flex min-w-0 flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className,
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: FieldsetPrimitive.Legend.Props & { variant?: "legend" | "label" }) {
  return (
    <FieldsetPrimitive.Legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className,
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className,
      )}
      {...props}
    />
  )
}

// Wires its label, description, and error to the registered control and exposes validity
// through data-invalid, data-valid, data-touched, data-dirty, data-filled, and data-focused.
function Field({
  className,
  orientation = "vertical",
  invalid,
  ...props
}: FieldPrimitive.Root.Props & VariantProps<typeof fieldVariants>) {
  const context = React.useMemo(() => ({ invalid: invalid === true }), [invalid])

  return (
    <FieldContext.Provider value={context}>
      <FieldPrimitive.Root
        data-slot="field"
        data-orientation={orientation}
        invalid={invalid}
        className={cn(fieldVariants({ orientation }), className)}
        {...props}
      />
    </FieldContext.Provider>
  )
}

// Groups one checkbox or radio with its own label and description inside a group field.
function FieldItem({ className, ...props }: FieldPrimitive.Item.Props) {
  return (
    <FieldPrimitive.Item
      data-slot="field-item"
      className={cn("flex", className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn("group/field-content flex flex-1 flex-col gap-0.5 leading-snug", className)}
      {...props}
    />
  )
}

// A label wrapping a control and Field.Content renders as a selectable choice card.
function FieldLabel({ className, ...props }: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit items-center gap-2 text-sm leading-snug font-medium select-none group-disabled/field-set:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        "has-[>[data-slot=field-content]]:has-[:focus-visible]:border-ring has-[>[data-slot=field-content]]:has-[:focus-visible]:ring-ring/50 has-[>[data-slot=field-content]]:not-data-disabled:hover:bg-muted/50 has-[>[data-slot=field-content]]:w-full has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:rounded-lg has-[>[data-slot=field-content]]:border has-[>[data-slot=field-content]]:p-2.5 has-[>[data-slot=field-content]]:has-[:focus-visible]:ring-3 has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        "has-[>[data-slot=field-content]]:has-data-checked:border-primary/30 has-[>[data-slot=field-content]]:has-data-checked:bg-primary/5 dark:has-[>[data-slot=field-content]]:has-data-checked:border-primary/20 dark:has-[>[data-slot=field-content]]:has-data-checked:bg-primary/10",
        className,
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-medium group-data-disabled/field:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

// Describes the field control; outside Field.Root (for example under a Field.Legend) it renders
// a plain paragraph.
function FieldDescription({ className, ...props }: FieldPrimitive.Description.Props) {
  const field = React.useContext(FieldContext)
  const classes = cn(
    "text-muted-foreground text-left text-sm leading-normal font-normal group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5",
    "last:mt-0 nth-last-2:-mt-1",
    "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
    className,
  )

  if (!field) {
    return (
      <PlainDescription
        className={classes}
        {...props}
      />
    )
  }

  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={classes}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className,
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

// Shows the control's validation message, or `children` when `match` names a failing validity
// key. Without `match`, children also show whenever Field.Root has `invalid`.
function FieldError({ className, match, ...props }: FieldPrimitive.Error.Props) {
  const field = React.useContext(FieldContext)

  return (
    <FieldPrimitive.Error
      data-slot="field-error"
      match={match ?? (field?.invalid && props.children != null ? true : undefined)}
      className={cn("text-destructive text-sm font-normal", className)}
      {...props}
    />
  )
}

// Unstyled native input registered with the field; use Input for the styled text control.
function FieldControl(props: FieldPrimitive.Control.Props) {
  return (
    <FieldPrimitive.Control
      data-slot="field-control"
      {...props}
    />
  )
}

// Renders custom content from the field's validity state through a children function.
const FieldValidity = FieldPrimitive.Validity

function PlainDescription({ className, render, ...props }: FieldPrimitive.Description.Props) {
  return useRender({
    defaultTagName: "p",
    render,
    state: PLAIN_STATE,
    props: {
      "data-slot": "field-description",
      className: typeof className === "function" ? className(PLAIN_STATE) : className,
      ...props,
    },
  })
}

export {
  Field as Root,
  FieldLabel as Label,
  FieldDescription as Description,
  FieldError as Error,
  FieldControl as Control,
  FieldValidity as Validity,
  FieldItem as Item,
  FieldGroup as Group,
  FieldLegend as Legend,
  FieldSeparator as Separator,
  FieldSet as Set,
  FieldContent as Content,
  FieldTitle as Title,
}
