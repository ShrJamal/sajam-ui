"use client"

import { cn } from "cn"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import * as React from "react"
import * as InputGroup from "./input-group.js"

const defaultStrengthLabels = {
  empty: "Enter a password",
  weak: "Weak password",
  medium: "Medium password",
  strong: "Strong password",
}

const strengthLevels = ["empty", "weak", "medium", "strong"] as const

// A password field with a visibility toggle and an optional strength meter.
function PasswordInput({
  className,
  id,
  disabled,
  value,
  defaultValue,
  onChange,
  strength = false,
  strengthLabels,
  toggleLabel = "Show password",
  "aria-describedby": ariaDescribedBy,
  ...props
}: Props) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const strengthId = `${inputId}-strength`
  const [visible, setVisible] = React.useState(false)
  const [uncontrolledValue, setUncontrolledValue] = React.useState(String(defaultValue ?? ""))
  const password = value === undefined ? uncontrolledValue : String(value)
  const describedBy = [ariaDescribedBy, strength ? strengthId : undefined].filter(Boolean).join(" ")

  const field = (
    <InputGroup.Root className={strength ? undefined : className}>
      <InputGroup.Input
        {...props}
        id={inputId}
        type={visible ? "text" : "password"}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        aria-describedby={describedBy || undefined}
        onChange={function (event) {
          if (value === undefined) {
            setUncontrolledValue(event.currentTarget.value)
          }
          onChange?.(event)
        }}
      />
      <InputGroup.Addon align="inline-end">
        <InputGroup.Button
          size="icon-xs"
          aria-label={toggleLabel}
          aria-pressed={visible}
          aria-controls={inputId}
          disabled={disabled}
          onClick={function () {
            setVisible(!visible)
          }}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </InputGroup.Button>
      </InputGroup.Addon>
    </InputGroup.Root>
  )

  if (!strength) {
    return field
  }

  const score = typeof strength === "function" ? strength(password) : getPasswordStrength(password)
  const level = password ? Math.min(3, Math.max(1, Math.round(score))) : 0
  const labels = { ...defaultStrengthLabels, ...strengthLabels }

  return (
    <div
      data-slot="password-input"
      className={cn("grid w-full gap-2", className)}
    >
      {field}
      <div
        data-slot="password-input-strength"
        data-strength={strengthLevels[level]}
        className="grid gap-1.5"
      >
        <div
          className="grid h-1 grid-cols-3 gap-1"
          aria-hidden="true"
        >
          {[1, 2, 3].map(function (segment) {
            return (
              <span
                key={segment}
                className={cn(
                  "bg-muted rounded-full transition-colors",
                  segment <= level && level === 1 && "bg-destructive",
                  segment <= level && level === 2 && "bg-warning",
                  segment <= level && level === 3 && "bg-success",
                )}
              />
            )
          })}
        </div>
        <p
          id={strengthId}
          className="text-muted-foreground text-xs"
          aria-live="polite"
        >
          {labels[strengthLevels[level]]}
        </p>
      </div>
    </div>
  )
}

type Props = Omit<React.ComponentProps<"input">, "type"> & {
  strength?: boolean | ((password: string) => number)
  strengthLabels?: Partial<typeof defaultStrengthLabels>
  toggleLabel?: string
}

// Scores 1–3 from length, mixed case, and digits with symbols.
function getPasswordStrength(password: string) {
  let score = password.length >= 8 ? 1 : 0
  score += /[a-z]/.test(password) && /[A-Z]/.test(password) ? 1 : 0
  score += /\d/.test(password) && /[^a-z\d]/i.test(password) ? 1 : 0
  return score
}

export { PasswordInput }
