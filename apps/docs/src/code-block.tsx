import { Button } from "@sajam/ui/button"
import { CheckIcon, CopyIcon } from "lucide-react"
import { useEffect, useState } from "react"

// Display the same source that powers each live example.
export function CodeBlock({ code, label = "tsx", inline = false }: Props) {
  // A single line, such as an import, sits beside its copy button without a header.
  if (inline) {
    return (
      <div className="bg-card flex items-center gap-3 rounded-lg border py-1.5 pr-1.5 pl-4">
        <pre
          className="min-w-0 flex-1 overflow-x-auto text-xs leading-6 sm:text-sm"
          tabIndex={0}
        >
          <code>{code}</code>
        </pre>
        <CopyButton
          code={code}
          label={label}
          iconOnly
        />
      </div>
    )
  }

  return (
    <div className="bg-card overflow-hidden rounded-xl border">
      <div className="flex items-center justify-between gap-3 border-b py-1.5 pr-1.5 pl-4">
        <span className="text-muted-foreground font-mono text-xs">{label}</span>
        <CopyButton
          code={code}
          label={label}
        />
      </div>
      <pre
        className="max-h-[36rem] overflow-auto p-5 text-xs leading-7 sm:text-sm"
        tabIndex={0}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

type Props = { code: string; label?: string; inline?: boolean }

// Copy text, or text loaded on click, with brief confirmation; failures show a short message.
export function CopyButton({ code, label, iconOnly = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)

  // Return to the idle label so later copies are announced again.
  useEffect(
    function () {
      if (!copied) return
      const timeout = setTimeout(function () {
        setCopied(false)
      }, 2000)
      return function () {
        clearTimeout(timeout)
      }
    },
    [copied],
  )

  return (
    <div className="flex shrink-0 items-center gap-2">
      <span
        role="status"
        className={failed ? "text-muted-foreground text-xs" : "sr-only"}
      >
        {failed ? "Copy unavailable" : copied ? "Copied to clipboard." : ""}
      </span>
      <Button
        variant="ghost"
        size={iconOnly ? "icon-sm" : "sm"}
        aria-label={iconOnly ? `Copy ${label}` : undefined}
        onClick={async function () {
          try {
            await navigator.clipboard.writeText(typeof code === "string" ? code : await code())
            setCopied(true)
            setFailed(false)
          } catch {
            setFailed(true)
          }
        }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        {!iconOnly && (copied ? "Copied" : "Copy")}
      </Button>
    </div>
  )
}

type CopyButtonProps = {
  code: string | (() => Promise<string>)
  label: string
  iconOnly?: boolean
}
