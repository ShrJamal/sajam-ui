"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { type ComponentProps, type ReactNode } from "react"
import { CopyButton } from "./copy-button.js"

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
  timeout,
  disableCopy = false,
  copyLabel,
  copiedLabel,
  copyErrorLabel,
  className,
  onCopy,
  onCopyError,
  ...props
}: Props) {
  const lines = Array.isArray(children) ? children : [children]
  const valueToCopy = codeString ?? lines.join("\n")

  return (
    <div
      data-slot="snippet"
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
        <CopyButton
          value={valueToCopy}
          timeout={timeout}
          copyLabel={copyLabel}
          copiedLabel={copiedLabel}
          copyErrorLabel={copyErrorLabel}
          onCopy={onCopy}
          onCopyError={onCopyError}
        />
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
