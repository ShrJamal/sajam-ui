"use client"

import { OTPField } from "@base-ui/react/otp-field"
import { cn } from "cn"
import { MinusIcon } from "lucide-react"
import * as React from "react"

// Without children, the root renders `length` slots in a single group.
function InputOTP({ className, length, children, ...props }: OTPField.Root.Props) {
  return (
    <OTPField.Root
      data-slot="input-otp"
      length={length}
      className={cn("flex items-center gap-2 has-disabled:opacity-50", className)}
      {...props}
    >
      {children ?? (
        <InputOTPGroup>
          {Array.from({ length }, function (_, index) {
            return <InputOTPSlot key={index} />
          })}
        </InputOTPGroup>
      )}
    </OTPField.Root>
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center rounded-lg", className)}
      {...props}
    />
  )
}

// Each slot is a real input; Base UI moves focus, handles paste, and filters characters.
function InputOTPSlot({ className, ...props }: OTPField.Input.Props) {
  return (
    <OTPField.Input
      data-slot="input-otp-slot"
      className={cn(
        "border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 relative size-8 min-w-0 border-y border-r bg-transparent text-center text-sm transition-[color,box-shadow] outline-none first:rounded-l-lg first:border-l last:rounded-r-lg focus-visible:z-10 focus-visible:ring-3 disabled:cursor-not-allowed",
        "aria-invalid:border-destructive data-invalid:border-destructive focus-visible:aria-invalid:ring-destructive/20 focus-visible:data-invalid:ring-destructive/20 dark:focus-visible:aria-invalid:ring-destructive/40 dark:focus-visible:data-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  )
}

function InputOTPSeparator({
  className,
  ...props
}: React.ComponentProps<typeof OTPField.Separator>) {
  return (
    <OTPField.Separator
      data-slot="input-otp-separator"
      className={cn("flex items-center [&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      <MinusIcon />
    </OTPField.Separator>
  )
}

export {
  InputOTP as Root,
  InputOTPGroup as Group,
  InputOTPSlot as Slot,
  InputOTPSeparator as Separator,
}
