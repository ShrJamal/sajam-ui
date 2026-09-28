"use client"

import { NumberField } from "@base-ui/react/number-field"
import { cn } from "cn"
import { ChevronDownIcon, ChevronUpIcon, MinusIcon, PlusIcon } from "lucide-react"
import type * as React from "react"

const buttonClassName =
  "flex shrink-0 items-center justify-center border-input text-muted-foreground transition-colors outline-none select-none hover:bg-muted hover:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50"

// A localized numeric field with stepper buttons. Root options go to Base UI NumberField;
// the remaining props go to the input element.
function NumberInput({
  className,
  id,
  name,
  form,
  value,
  defaultValue,
  onValueChange,
  onValueCommitted,
  min,
  max,
  step,
  smallStep,
  largeStep,
  snapOnStep,
  allowOutOfRange,
  allowWheelScrub,
  format,
  locale,
  disabled,
  readOnly,
  required,
  inputRef,
  controls = "split",
  incrementLabel = "Increase",
  decrementLabel = "Decrease",
  ...props
}: Props) {
  return (
    <NumberField.Root
      data-slot="number-input"
      id={id}
      name={name}
      form={form}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      onValueCommitted={onValueCommitted}
      min={min}
      max={max}
      step={step}
      smallStep={smallStep}
      largeStep={largeStep}
      snapOnStep={snapOnStep}
      allowOutOfRange={allowOutOfRange}
      allowWheelScrub={allowWheelScrub}
      format={format}
      locale={locale}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      inputRef={inputRef}
    >
      <NumberField.Group
        data-slot="number-input-group"
        data-controls={controls}
        className={cn(
          "border-input focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 data-disabled:bg-input/50 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40 dark:data-disabled:bg-input/80 flex h-8 w-full min-w-0 overflow-hidden rounded-lg border bg-transparent text-base transition-colors focus-within:ring-3 has-aria-invalid:ring-3 data-disabled:opacity-50 md:text-sm",
          className,
        )}
      >
        {controls === "split" ? (
          <NumberField.Decrement
            aria-label={decrementLabel}
            className={cn(buttonClassName, "w-8 border-r [&_svg]:size-3.5")}
          >
            <MinusIcon />
          </NumberField.Decrement>
        ) : null}
        <NumberField.Input
          {...props}
          data-slot="number-input-control"
          className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent px-2.5 py-1 tabular-nums outline-none disabled:cursor-not-allowed"
        />
        {controls === "split" ? (
          <NumberField.Increment
            aria-label={incrementLabel}
            className={cn(buttonClassName, "w-8 border-l [&_svg]:size-3.5")}
          >
            <PlusIcon />
          </NumberField.Increment>
        ) : null}
        {controls === "stacked" ? (
          <div className="border-input flex w-6 shrink-0 flex-col border-l">
            <NumberField.Increment
              aria-label={incrementLabel}
              className={cn(buttonClassName, "min-h-0 flex-1 border-b [&_svg]:size-3")}
            >
              <ChevronUpIcon />
            </NumberField.Increment>
            <NumberField.Decrement
              aria-label={decrementLabel}
              className={cn(buttonClassName, "min-h-0 flex-1 [&_svg]:size-3")}
            >
              <ChevronDownIcon />
            </NumberField.Decrement>
          </div>
        ) : null}
      </NumberField.Group>
    </NumberField.Root>
  )
}

type RootProps = Pick<
  NumberField.Root.Props,
  | "id"
  | "name"
  | "form"
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "onValueCommitted"
  | "min"
  | "max"
  | "step"
  | "smallStep"
  | "largeStep"
  | "snapOnStep"
  | "allowOutOfRange"
  | "allowWheelScrub"
  | "format"
  | "locale"
  | "disabled"
  | "readOnly"
  | "required"
  | "inputRef"
>

type Props = RootProps &
  Omit<React.ComponentProps<"input">, keyof RootProps | "type" | "onChange"> & {
    controls?: "split" | "stacked" | "none"
    incrementLabel?: string
    decrementLabel?: string
  }

export { NumberInput }
