"use client"

import { cn } from "cn"
import { CheckIcon, CircleAlertIcon, CopyIcon } from "lucide-react"
import { useEffect, useRef, useState, type ComponentProps } from "react"
import { Button } from "./button.js"

// Copies a value to the clipboard and shows the result on the button for `timeout` ms.
function CopyButton({
  value,
  timeout = 2000,
  copyLabel = "Copy to clipboard",
  copiedLabel = "Copied to clipboard",
  copyErrorLabel = "Copy failed",
  variant = "ghost",
  size = "icon-sm",
  className,
  children,
  onClick,
  onCopy,
  onCopyError,
  ...props
}: Props) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Increments per attempt so a stale clipboard promise cannot overwrite a newer status.
  const attemptRef = useRef(0)
  const statusLabel =
    status === "copied" ? copiedLabel : status === "error" ? copyErrorLabel : copyLabel

  useEffect(function () {
    return function () {
      attemptRef.current += 1
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    }
  }, [])

  async function copy() {
    const attempt = attemptRef.current + 1
    attemptRef.current = attempt
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    setStatus("idle")

    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard access is unavailable")
      await navigator.clipboard.writeText(value)
    } catch (error) {
      if (attemptRef.current !== attempt) return
      setStatus("error")
      onCopyError?.(error)
      return
    }

    if (attemptRef.current !== attempt) return
    setStatus("copied")
    resetTimerRef.current = setTimeout(
      function () {
        if (attemptRef.current === attempt) setStatus("idle")
      },
      Number.isFinite(timeout) ? Math.max(0, timeout) : 2000,
    )
    onCopy?.(value)
  }

  const Icon = status === "copied" ? CheckIcon : status === "error" ? CircleAlertIcon : CopyIcon

  return (
    <>
      <Button
        data-slot="copy-button"
        data-copy-status={status}
        variant={variant}
        size={size}
        aria-label={children ? undefined : statusLabel}
        className={cn(
          "text-muted-foreground",
          status === "copied" && "text-success hover:text-success",
          status === "error" && "text-destructive hover:text-destructive",
          className,
        )}
        onClick={function (event) {
          onClick?.(event)
          if (!event.defaultPrevented) void copy()
        }}
        {...props}
      >
        <Icon
          aria-hidden="true"
          data-icon={children ? "inline-start" : undefined}
        />
        {children}
      </Button>
      <span
        className="sr-only"
        aria-live="polite"
      >
        {status === "idle" ? "" : statusLabel}
      </span>
    </>
  )
}

type Props = Omit<ComponentProps<typeof Button>, "value" | "onCopy"> & {
  value: string
  timeout?: number
  copyLabel?: string
  copiedLabel?: string
  copyErrorLabel?: string
  onCopy?: (value: string) => void
  onCopyError?: (error: unknown) => void
}

export { CopyButton }
