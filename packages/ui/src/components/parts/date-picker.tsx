"use client"

import { cn } from "cn"
import { CalendarIcon } from "lucide-react"
import { useId, useState, type ComponentProps, type ReactElement } from "react"
import { dateMatchModifiers, type DateRange, type Matcher } from "react-day-picker"
import { Button } from "./button.js"
import * as Calendar from "./calendar.js"
import { Input } from "./input.js"
import { Label } from "./label.js"
import * as Popover from "./popover.js"

// Matches react-day-picker's default English locale so server and client output agree.
const DEFAULT_LOCALE = "en-US"

function DatePicker(props: SingleProps): ReactElement
function DatePicker(props: RangeProps): ReactElement
function DatePicker(props: MultipleProps): ReactElement
// Pass `value` (null or [] when empty) to control the picker, or `defaultValue` to leave it uncontrolled.
function DatePicker(props: Props) {
  const {
    mode = "single",
    placeholder = "Pick a date",
    name,
    id,
    disabled,
    className,
    minDate,
    maxDate,
    formatOptions,
    calendarProps,
    showTodayButton = false,
    dialogLabel = "Choose a date",
    clearLabel = "Clear",
    todayLabel = "Today",
    doneLabel = "Done",
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
  } = props
  // Mode-specific props are undefined in the other modes.
  const { timeStep, timeLabel = "Time" } = props as SingleProps
  const { maxDates } = props as MultipleProps
  const onValueChange = props.onValueChange as ((value: Value) => void) | undefined
  const showTime = mode === "single" && Boolean((props as SingleProps).showTime)
  const showSeconds = showTime && Boolean((props as SingleProps).showSeconds)
  const timeId = useId()
  // Controlled mode is fixed on mount, so clearing to null never switches to uncontrolled.
  const [isControlled] = useState(props.value !== undefined)
  const [localValue, setLocalValue] = useState<Value>(props.defaultValue ?? emptyValue(mode))
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState<Date>()
  // A range is committed only once both ends are picked in the current session.
  const [draftRange, setDraftRange] = useState<DateRange>()
  const value = isControlled ? (props.value ?? emptyValue(mode)) : localValue
  const locale = calendarProps?.locale?.code ?? DEFAULT_LOCALE
  const formattedValue = formatValue(value, locale, formatOptions, showTime, showSeconds)
  const disabledDates: Matcher[] = [
    ...(Array.isArray(calendarProps?.disabled)
      ? calendarProps.disabled
      : calendarProps?.disabled
        ? [calendarProps.disabled]
        : []),
    ...(minDate ? [{ before: minDate }] : []),
    ...(maxDate ? [{ after: maxDate }] : []),
  ]
  const sharedCalendarProps = {
    ...calendarProps,
    disabled: disabledDates,
    startMonth: calendarProps?.startMonth ?? minDate,
    endMonth: calendarProps?.endMonth ?? maxDate,
    month,
    onMonthChange: setMonth,
    defaultMonth: value instanceof Date ? value : Array.isArray(value) ? value[0] : value?.from,
    autoFocus: true,
  }
  // Only evaluated while the popup is open, never during server rendering.
  const todayDisabled =
    open && showTodayButton ? dateMatchModifiers(startOfDay(new Date()), disabledDates) : false

  function commit(next: Value) {
    if (!isControlled) setLocalValue(next)
    onValueChange?.(next)
  }

  function changeOpen(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) {
      setDraftRange(undefined)
      setMonth(undefined)
    }
  }

  function selectToday() {
    const today = startOfDay(new Date())
    setMonth(today)
    if (mode === "range") {
      commit({ from: today, to: today })
      changeOpen(false)
    } else if (mode === "multiple") {
      const dates = Array.isArray(value) ? value : []
      const hasToday = dates.some(function (date) {
        return date.toDateString() === today.toDateString()
      })
      if (!hasToday) commit([...dates, today])
    } else {
      commit(showTime ? withTimeOf(today, value instanceof Date ? value : null) : today)
      if (!showTime) changeOpen(false)
    }
  }

  return (
    <Popover.Root
      open={open}
      onOpenChange={changeOpen}
    >
      {name ? (
        <input
          type="hidden"
          name={name}
          disabled={disabled}
          value={serializeValue(value, showTime, showSeconds)}
        />
      ) : null}
      <Popover.Trigger
        render={
          <Button
            id={id}
            type="button"
            variant="outline"
            disabled={disabled}
          />
        }
        role="combobox"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        className={cn(
          "min-w-48 justify-start font-normal",
          !formattedValue && "text-muted-foreground",
          className,
        )}
      >
        <CalendarIcon />
        <span className="truncate">{formattedValue ?? placeholder}</span>
      </Popover.Trigger>
      <Popover.Content
        align="start"
        aria-label={ariaLabelledBy ? undefined : (ariaLabel ?? dialogLabel)}
        aria-labelledby={ariaLabelledBy}
        className="w-auto gap-0 p-0"
      >
        {mode === "range" ? (
          <Calendar.Root
            {...sharedCalendarProps}
            mode="range"
            required
            resetOnSelect
            selected={draftRange ?? (value as DatePickerRange | null) ?? undefined}
            onSelect={function (range) {
              if (draftRange && range.from && range.to) {
                commit({ from: range.from, to: range.to })
                changeOpen(false)
              } else {
                setDraftRange(range)
              }
            }}
          />
        ) : mode === "multiple" ? (
          <Calendar.Root
            {...sharedCalendarProps}
            mode="multiple"
            max={maxDates}
            selected={Array.isArray(value) ? value : []}
            onSelect={function (dates) {
              commit(dates ?? [])
            }}
          />
        ) : (
          <Calendar.Root
            {...sharedCalendarProps}
            mode="single"
            selected={value instanceof Date ? value : undefined}
            onSelect={function (date) {
              const previous = value instanceof Date ? value : null
              commit(date ? (showTime ? withTimeOf(date, previous) : date) : null)
              if (!showTime) changeOpen(false)
            }}
          />
        )}
        {showTime ? (
          <div className="grid gap-2 border-t p-3">
            <Label htmlFor={timeId}>{timeLabel}</Label>
            <Input
              id={timeId}
              type="time"
              step={timeStep ?? (showSeconds ? 1 : 60)}
              disabled={!(value instanceof Date)}
              value={value instanceof Date ? formatTime(value, showSeconds) : ""}
              onChange={function (event) {
                if (!(value instanceof Date) || !event.target.value) return
                const [hours = 0, minutes = 0, seconds = 0] = event.target.value
                  .split(":")
                  .map(Number)
                const next = new Date(value)
                next.setHours(hours, minutes, showSeconds ? seconds : 0, 0)
                commit(next)
              }}
            />
          </div>
        ) : null}
        <div className="flex items-center justify-between gap-2 border-t p-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={!formattedValue && !draftRange}
            onClick={function () {
              commit(emptyValue(mode))
              changeOpen(false)
            }}
          >
            {clearLabel}
          </Button>
          <div className="flex items-center gap-1">
            {showTodayButton ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={todayDisabled}
                onClick={selectToday}
              >
                {todayLabel}
              </Button>
            ) : null}
            {mode === "multiple" || showTime ? (
              <Button
                type="button"
                size="sm"
                onClick={function () {
                  changeOpen(false)
                }}
              >
                {doneLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  )
}

type DatePickerRange = { from: Date; to: Date }

type BaseProps = {
  placeholder?: string
  name?: string
  id?: string
  disabled?: boolean
  className?: string
  minDate?: Date
  maxDate?: Date
  // Intl options for the trigger text; defaults to a medium date style.
  formatOptions?: Intl.DateTimeFormatOptions
  showTodayButton?: boolean
  calendarProps?: Pick<
    ComponentProps<typeof Calendar.Root>,
    | "disabled"
    | "locale"
    | "weekStartsOn"
    | "startMonth"
    | "endMonth"
    | "captionLayout"
    | "numberOfMonths"
    | "showWeekNumber"
    | "showOutsideDays"
    | "fixedWeeks"
  >
  dialogLabel?: string
  clearLabel?: string
  todayLabel?: string
  doneLabel?: string
  "aria-label"?: string
  "aria-labelledby"?: string
  "aria-describedby"?: string
  "aria-invalid"?: boolean
}

type SingleProps = BaseProps & {
  mode?: "single"
  value?: Date | null
  defaultValue?: Date | null
  onValueChange?: (value: Date | null) => void
  showTime?: boolean
  showSeconds?: boolean
  // Step of the time input in seconds, for example 900 for 15-minute increments.
  timeStep?: number
  timeLabel?: string
}

type RangeProps = BaseProps & {
  mode: "range"
  value?: DatePickerRange | null
  defaultValue?: DatePickerRange | null
  onValueChange?: (value: DatePickerRange | null) => void
}

type MultipleProps = BaseProps & {
  mode: "multiple"
  value?: Date[]
  defaultValue?: Date[]
  onValueChange?: (value: Date[]) => void
  maxDates?: number
}

type Props = SingleProps | RangeProps | MultipleProps
type Value = Date | Date[] | DatePickerRange | null

function emptyValue(mode: Props["mode"]): Value {
  return mode === "multiple" ? [] : null
}

function formatValue(
  value: Value,
  locale: string,
  formatOptions: Intl.DateTimeFormatOptions | undefined,
  showTime: boolean,
  showSeconds: boolean,
) {
  const formatter = new Intl.DateTimeFormat(
    locale,
    formatOptions ?? {
      dateStyle: "medium",
      timeStyle: showTime ? (showSeconds ? "medium" : "short") : undefined,
    },
  )
  if (value instanceof Date) return formatter.format(value)
  if (Array.isArray(value)) {
    if (!value.length) return null
    const dates = [...value].sort(function (a, b) {
      return a.getTime() - b.getTime()
    })
    return new Intl.ListFormat(locale, { style: "short" }).format(
      dates.map(function (date) {
        return formatter.format(date)
      }),
    )
  }
  return value ? formatter.formatRange(value.from, value.to) : null
}

function serializeValue(value: Value, showTime: boolean, showSeconds: boolean) {
  if (value instanceof Date) {
    return showTime
      ? `${formatLocalDate(value)}T${formatTime(value, showSeconds)}`
      : formatLocalDate(value)
  }
  if (Array.isArray(value)) return value.map(formatLocalDate).join(",")
  return value ? `${formatLocalDate(value.from)}/${formatLocalDate(value.to)}` : ""
}

function formatLocalDate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function formatTime(date: Date, showSeconds: boolean) {
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`
  return showSeconds ? `${time}:${pad(date.getSeconds())}` : time
}

function pad(value: number) {
  return String(value).padStart(2, "0")
}

function withTimeOf(date: Date, source: Date | null) {
  const next = new Date(date)
  next.setHours(source?.getHours() ?? 0, source?.getMinutes() ?? 0, source?.getSeconds() ?? 0, 0)
  return next
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export { DatePicker }
export type { DatePickerRange }
