"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cn } from "cn"
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import * as React from "react"
import { Button } from "./button.js"

const StepperContext = React.createContext<ContextValue | null>(null)
const StepCompletedContext = React.createContext(false)

// A multi-step flow built on Tabs, which provides the tablist semantics and roving focus.
function StepperRoot({
  value,
  defaultValue,
  onValueChange,
  linear = false,
  orientation = "horizontal",
  className,
  ...props
}: RootProps) {
  // Whether the stepper is controlled is fixed on mount, like Base UI's own components.
  const [controlled] = React.useState(value !== undefined)
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const [steps, setSteps] = React.useState<StepRecord[]>([])
  const activeValue =
    (controlled ? value : uncontrolledValue) ??
    steps.find(function (step) {
      return !step.disabled
    })?.value

  // Steps register in document order so navigation follows the rendered sequence.
  const registerStep = React.useCallback(function (record: StepRecord) {
    setSteps(function (current) {
      return current
        .filter(function (step) {
          return step.element !== record.element
        })
        .concat(record)
        .sort(function (a, b) {
          return a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING
            ? -1
            : 1
        })
    })
    return function () {
      setSteps(function (current) {
        return current.filter(function (step) {
          return step !== record
        })
      })
    }
  }, [])

  function setValue(nextValue: string) {
    if (!controlled) setUncontrolledValue(nextValue)
    onValueChange?.(nextValue)
  }

  return (
    <StepperContext.Provider value={{ activeValue, linear, steps, registerStep, setValue }}>
      <TabsPrimitive.Root
        {...props}
        data-slot="stepper"
        orientation={orientation}
        value={activeValue ?? null}
        onValueChange={function (nextValue) {
          setValue(nextValue)
        }}
        className={cn("flex gap-6 data-horizontal:flex-col", className)}
      />
    </StepperContext.Provider>
  )
}

function StepperList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="stepper-list"
      className={cn(
        "flex min-w-0 [counter-reset:step] data-horizontal:w-full data-horizontal:items-start data-vertical:w-48 data-vertical:shrink-0 data-vertical:flex-col",
        className,
      )}
      {...props}
    />
  )
}

// In linear mode, steps after the active one stay disabled until the steps before them are completed.
function StepperStep({
  value,
  completed = false,
  disabled = false,
  className,
  ref,
  ...props
}: StepProps) {
  const { activeValue, linear, steps, registerStep } = useStepperContext()
  const elementRef = React.useRef<HTMLButtonElement | null>(null)
  const index = steps.findIndex(function (step) {
    return step.value === value
  })
  const activeIndex = steps.findIndex(function (step) {
    return step.value === activeValue
  })
  const locked =
    linear &&
    activeIndex !== -1 &&
    index > activeIndex &&
    steps.slice(activeIndex, index).some(function (step) {
      return !step.completed && !step.disabled
    })
  const mergedRef = React.useCallback(
    function (element: HTMLButtonElement | null) {
      elementRef.current = element
      if (typeof ref === "function") ref(element)
      else if (ref) ref.current = element
    },
    [ref],
  )

  React.useLayoutEffect(
    function () {
      const element = elementRef.current
      if (!element) return
      return registerStep({ value, completed, disabled, element })
    },
    [registerStep, value, completed, disabled],
  )

  return (
    <StepCompletedContext.Provider value={completed}>
      <TabsPrimitive.Tab
        {...props}
        ref={mergedRef}
        value={value}
        disabled={disabled || locked}
        data-slot="stepper-step"
        data-completed={completed || undefined}
        className={cn(
          "group/step relative flex min-w-0 gap-x-3 text-left outline-none [counter-increment:step] data-disabled:cursor-not-allowed data-disabled:*:opacity-50",
          "after:bg-border data-completed:after:bg-primary after:absolute last:after:hidden",
          "data-horizontal:flex-1 data-horizontal:flex-col data-horizontal:items-center data-horizontal:px-1 data-horizontal:text-center data-horizontal:after:top-4 data-horizontal:after:right-[calc(-50%+1.25rem)] data-horizontal:after:left-[calc(50%+1.25rem)] data-horizontal:after:h-px",
          "data-vertical:grid data-vertical:grid-cols-[auto_1fr] data-vertical:pb-6 data-vertical:after:top-10 data-vertical:after:bottom-2 data-vertical:after:left-4 data-vertical:after:w-px data-vertical:last:pb-0",
          className,
        )}
      />
    </StepCompletedContext.Provider>
  )
}

// Shows the step number, custom children, or a check mark once the step is completed.
function StepperIndicator({
  className,
  children,
  completedLabel = "Completed",
  ...props
}: IndicatorProps) {
  const completed = React.useContext(StepCompletedContext)
  let content = children ?? (
    <span
      aria-hidden="true"
      className="before:content-[counter(step)]"
    />
  )
  if (completed) {
    content = (
      <>
        <CheckIcon
          aria-hidden="true"
          className="size-4"
        />
        <span className="sr-only">{completedLabel}</span>
      </>
    )
  }

  return (
    <span
      data-slot="stepper-indicator"
      className={cn(
        "border-border bg-background text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors group-data-vertical/step:row-span-2 [&_svg:not([class*='size-'])]:size-4",
        "group-data-active/step:border-primary group-data-active/step:bg-primary group-data-active/step:text-primary-foreground group-data-completed/step:border-primary group-data-completed/step:bg-primary group-data-completed/step:text-primary-foreground",
        "group-focus-visible/step:ring-ring/50 group-focus-visible/step:ring-3",
        className,
      )}
      {...props}
    >
      {content}
    </span>
  )
}

function StepperTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="stepper-title"
      className={cn(
        "text-foreground text-sm font-medium group-data-horizontal/step:mt-2 group-data-vertical/step:col-start-2 group-data-vertical/step:pt-1.5",
        className,
      )}
      {...props}
    />
  )
}

function StepperDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="stepper-description"
      className={cn(
        "text-muted-foreground text-xs leading-relaxed group-data-vertical/step:col-start-2",
        className,
      )}
      {...props}
    />
  )
}

function StepperPanel({ className, ...props }: PanelProps) {
  return (
    <TabsPrimitive.Panel
      data-slot="stepper-panel"
      className={cn(
        "focus-visible:ring-ring/50 min-w-0 flex-1 outline-none focus-visible:ring-3",
        className,
      )}
      {...props}
    />
  )
}

// Moves to the previous enabled step without moving focus; disabled on the first step.
function StepperPrevious({
  children = "Previous",
  variant = "outline",
  disabled = false,
  focusableWhenDisabled = true,
  onClick,
  ...props
}: NavigationProps) {
  const context = useStepperContext()
  const target = findAdjacentStep(context, -1)

  return (
    <Button
      {...props}
      variant={variant}
      disabled={disabled || !target}
      focusableWhenDisabled={focusableWhenDisabled}
      onClick={function (event) {
        onClick?.(event)
        if (!event.defaultPrevented && target) context.setValue(target.value)
      }}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      {children}
    </Button>
  )
}

// Moves to the next enabled step without moving focus; disabled on the last step.
function StepperNext({
  children = "Next",
  disabled = false,
  focusableWhenDisabled = true,
  onClick,
  ...props
}: NavigationProps) {
  const context = useStepperContext()
  const target = findAdjacentStep(context, 1)

  return (
    <Button
      {...props}
      disabled={disabled || !target}
      focusableWhenDisabled={focusableWhenDisabled}
      onClick={function (event) {
        onClick?.(event)
        if (!event.defaultPrevented && target) context.setValue(target.value)
      }}
    >
      {children}
      <ChevronRightIcon data-icon="inline-end" />
    </Button>
  )
}

type StepRecord = {
  value: string
  completed: boolean
  disabled: boolean
  element: HTMLElement
}

type ContextValue = {
  activeValue: string | undefined
  linear: boolean
  steps: StepRecord[]
  registerStep: (record: StepRecord) => () => void
  setValue: (value: string) => void
}

type RootProps = Omit<TabsPrimitive.Root.Props, "value" | "defaultValue" | "onValueChange"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  linear?: boolean
}

type StepProps = Omit<TabsPrimitive.Tab.Props, "value"> & {
  value: string
  completed?: boolean
}

type IndicatorProps = React.ComponentProps<"span"> & {
  completedLabel?: string
}

type PanelProps = Omit<TabsPrimitive.Panel.Props, "value"> & {
  value: string
}

type NavigationProps = React.ComponentProps<typeof Button>

function useStepperContext() {
  const context = React.useContext(StepperContext)
  if (!context) throw new Error("Stepper parts must be used inside Stepper.Root")
  return context
}

function findAdjacentStep(context: ContextValue, direction: 1 | -1) {
  const index = context.steps.findIndex(function (step) {
    return step.value === context.activeValue
  })
  if (index === -1) return undefined
  for (let next = index + direction; next >= 0 && next < context.steps.length; next += direction) {
    if (!context.steps[next].disabled) return context.steps[next]
  }
  return undefined
}

export {
  StepperRoot as Root,
  StepperList as List,
  StepperStep as Step,
  StepperIndicator as Indicator,
  StepperTitle as Title,
  StepperDescription as Description,
  StepperPanel as Panel,
  StepperPrevious as Previous,
  StepperNext as Next,
}
