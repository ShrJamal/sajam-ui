"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { CheckIcon, CircleAlertIcon, CopyIcon } from "lucide-react"
import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react"
import { Button } from "./button.js"

const snippetVariants = cva(
  "text-foreground inline-flex min-w-0 items-center gap-2 rounded-lg px-3 py-2 font-mono text-sm",
  {
    variants: {
      variant: {
        flat: "bg-muted",
        bordered: "border-border bg-background border",
      },
      fullWidth: {
        true: "flex w-full",
        false: "max-w-full",
      },
    },
    defaultVariants: {
      variant: "flat",
      fullWidth: false,
    },
  },
)

// Shows a command or code lines with a copy button. Adapted from HeroUI's Snippet.
function Snippet({
  children,
  codeString,
  symbol = "$",
  variant = "flat",
  fullWidth = false,
  timeout = 2000,
  disableCopy = false,
  copyLabel = "Copy to clipboard",
  copiedLabel = "Copied to clipboard",
  copyErrorLabel = "Copy failed",
  className,
  onCopy,
  onCopyError,
  ...props
}: Props) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Increments per attempt so a stale clipboard promise cannot overwrite a newer status.
  const attemptRef = useRef(0)
  const lines = Array.isArray(children) ? children : [children]
  const valueToCopy = codeString ?? lines.join("\n")
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
      await navigator.clipboard.writeText(valueToCopy)
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
    onCopy?.(valueToCopy)
  }

  return (
    <div
      data-slot="snippet"
      data-copy-status={status}
      className={cn(snippetVariants({ variant, fullWidth }), className)}
      {...props}
    >
      <div className="min-w-0 flex-1 overflow-x-auto">
        {lines.map(function (line, index) {
          return (
            <pre
              key={`${index}-${line}`}
              className="whitespace-pre"
            >
              {symbol ? (
                <span
                  aria-hidden="true"
                  className="text-muted-foreground mr-2 select-none"
                >
                  {symbol}
                </span>
              ) : null}
              <code>{line}</code>
            </pre>
          )
        })}
      </div>
      {!disableCopy && (
        <>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={statusLabel}
            onClick={copy}
            className={cn(
              "text-muted-foreground",
              status === "copied" && "text-success hover:text-success",
              status === "error" && "text-destructive hover:text-destructive",
            )}
          >
            {status === "copied" ? (
              <CheckIcon
                aria-hidden="true"
                className="size-4"
              />
            ) : status === "error" ? (
              <CircleAlertIcon
                aria-hidden="true"
                className="size-4"
              />
            ) : (
              <CopyIcon
                aria-hidden="true"
                className="size-4"
              />
            )}
          </Button>
          <span
            className="sr-only"
            aria-live="polite"
          >
            {status === "idle" ? "" : statusLabel}
          </span>
        </>
      )}
    </div>
  )
}

type Props = Omit<ComponentProps<"div">, "children" | "onCopy"> &
  VariantProps<typeof snippetVariants> & {
    children: string | string[]
    // The text to copy when it differs from the displayed lines.
    codeString?: string
    symbol?: ReactNode
    timeout?: number
    // Hides the copy button.
    disableCopy?: boolean
    copyLabel?: string
    copiedLabel?: string
    copyErrorLabel?: string
    onCopy?: (value: string) => void
    onCopyError?: (error: unknown) => void
  }

export { Snippet, snippetVariants }
