"use client"

import { cn } from "cn"
import * as React from "react"
import { Spinner } from "./spinner.js"

// Prevents interaction with a scoped region while preserving busy-state semantics.
function BlockUI({
  blocked = false,
  label = "Loading",
  overlay,
  contentClassName,
  onBlocked,
  onUnblocked,
  className,
  children,
  ...props
}: Props) {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const overlayRef = React.useRef<HTMLDivElement>(null)
  const restoreFocusRef = React.useRef<HTMLElement | null>(null)
  // Starts unblocked so a region that mounts blocked still reports onBlocked.
  const previousBlockedRef = React.useRef(false)

  React.useLayoutEffect(() => {
    if (previousBlockedRef.current === blocked) return
    previousBlockedRef.current = blocked

    if (blocked) {
      const activeElement = document.activeElement
      if (activeElement instanceof HTMLElement && contentRef.current?.contains(activeElement)) {
        restoreFocusRef.current = activeElement
        overlayRef.current?.focus()
      }
      onBlocked?.()
      return
    }

    onUnblocked?.()
    const restoreTarget = restoreFocusRef.current
    restoreFocusRef.current = null
    if (restoreTarget?.isConnected) restoreTarget.focus()
  }, [blocked, onBlocked, onUnblocked])

  return (
    <div
      data-slot="block-ui"
      data-blocked={blocked || undefined}
      aria-busy={blocked}
      className={cn("relative", className)}
      {...props}
    >
      <div
        ref={contentRef}
        data-slot="block-ui-content"
        inert={blocked ? true : undefined}
        className={cn(blocked && "select-none", contentClassName)}
      >
        {children}
      </div>
      {blocked && (
        <div
          ref={overlayRef}
          data-slot="block-ui-overlay"
          role="status"
          tabIndex={-1}
          className="bg-background/75 absolute inset-0 z-10 grid cursor-wait place-items-center rounded-[inherit] backdrop-blur-xs outline-none"
        >
          {overlay ?? (
            <span className="bg-popover text-popover-foreground inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm shadow-sm">
              <Spinner aria-hidden="true" />
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

type Props = React.ComponentProps<"div"> & {
  blocked?: boolean
  // Visible and announced text in the default overlay. A custom overlay supplies its own text.
  label?: string
  overlay?: React.ReactNode
  contentClassName?: string
  onBlocked?: () => void
  onUnblocked?: () => void
}

export { BlockUI }
export type { Props as BlockUIProps }
