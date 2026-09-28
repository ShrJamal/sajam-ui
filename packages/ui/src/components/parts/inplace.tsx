"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cn } from "cn"
import * as React from "react"
import { Button } from "./button.js"

const InplaceContext = React.createContext<ContextValue | null>(null)

// Coordinates controlled or uncontrolled inline editing state.
function Inplace({
  active,
  defaultActive = false,
  disabled = false,
  onActiveChange,
  onSave,
  onCancel,
  className,
  children,
  ...props
}: RootProps) {
  const [internalActive, setInternalActive] = React.useState(defaultActive)
  const displayRef = React.useRef<HTMLButtonElement>(null)
  const isActive = active ?? internalActive
  const previousActive = React.useRef(isActive)

  React.useEffect(() => {
    if (previousActive.current && !isActive) displayRef.current?.focus()
    previousActive.current = isActive
  }, [isActive])

  function setActive(nextActive: boolean) {
    if (disabled) return
    if (active === undefined) setInternalActive(nextActive)
    onActiveChange?.(nextActive)
  }

  return (
    <InplaceContext.Provider
      value={{
        active: isActive,
        disabled,
        displayRef,
        setActive,
        save() {
          onSave?.()
          setActive(false)
        },
        cancel() {
          onCancel?.()
          setActive(false)
        },
      }}
    >
      <div
        {...props}
        data-slot="inplace"
        data-active={isActive || undefined}
        className={cn("rounded-xl", className)}
      >
        {children}
      </div>
    </InplaceContext.Provider>
  )
}

type ContextValue = {
  active: boolean
  disabled: boolean
  displayRef: React.RefObject<HTMLButtonElement | null>
  setActive: (active: boolean) => void
  save: () => void
  cancel: () => void
}

type RootProps = React.ComponentProps<"div"> & {
  active?: boolean
  defaultActive?: boolean
  disabled?: boolean
  onActiveChange?: (active: boolean) => void
  onSave?: () => void
  onCancel?: () => void
}

// Opens the inline editor from its compact display state.
function InplaceDisplay({
  className,
  disabled,
  onClick,
  ref,
  ...props
}: React.ComponentProps<"button">) {
  const context = useInplace()
  const { displayRef } = context
  const setRef = React.useCallback(
    function (node: HTMLButtonElement | null) {
      displayRef.current = node
      assignRef(ref, node)
    },
    [displayRef, ref],
  )

  if (context.active) return null

  return (
    <ButtonPrimitive
      {...props}
      ref={setRef}
      data-slot="inplace-display"
      disabled={context.disabled || disabled}
      className={cn(
        "hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 flex min-h-9 w-full items-center rounded-xl border border-transparent px-3 py-2 text-left text-sm outline-none focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={function (event) {
        onClick?.(event)
        if (!event.defaultPrevented) context.setActive(true)
      }}
    />
  )
}

// Renders editor content, focuses its first control, and cancels on Escape.
function InplaceContent({ className, onKeyDown, ref, ...props }: React.ComponentProps<"div">) {
  const context = useInplace()
  const contentRef = React.useRef<HTMLDivElement>(null)
  const setRef = React.useCallback(
    function (node: HTMLDivElement | null) {
      contentRef.current = node
      assignRef(ref, node)
    },
    [ref],
  )

  React.useEffect(() => {
    if (!context.active) return
    contentRef.current
      ?.querySelector<HTMLElement>(
        "input:not([disabled]), textarea:not([disabled]), select:not([disabled]), button:not([disabled])",
      )
      ?.focus()
  }, [context.active])

  if (!context.active) return null

  return (
    <div
      {...props}
      ref={setRef}
      data-slot="inplace-content"
      className={cn("bg-card space-y-3 rounded-xl border p-3", className)}
      onKeyDown={function (event) {
        onKeyDown?.(event)
        if (event.defaultPrevented || event.key !== "Escape") return
        // Ignore Escape from portaled popups (menus, selects) rendered inside the editor.
        if (!contentRef.current?.contains(event.target as Node)) return
        event.stopPropagation()
        context.cancel()
      }}
    />
  )
}

// Commits the current draft and closes the inline editor.
function InplaceSave({ disabled, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const context = useInplace()
  return (
    <Button
      type="button"
      {...props}
      data-slot="inplace-save"
      disabled={context.disabled || disabled}
      onClick={function (event) {
        onClick?.(event)
        if (!event.defaultPrevented) context.save()
      }}
    />
  )
}

// Discards the current draft and closes the inline editor.
function InplaceCancel({
  disabled,
  onClick,
  variant = "outline",
  ...props
}: React.ComponentProps<typeof Button>) {
  const context = useInplace()
  return (
    <Button
      type="button"
      variant={variant}
      {...props}
      data-slot="inplace-cancel"
      disabled={context.disabled || disabled}
      onClick={function (event) {
        onClick?.(event)
        if (!event.defaultPrevented) context.cancel()
      }}
    />
  )
}

function useInplace() {
  const context = React.useContext(InplaceContext)
  if (!context) throw new Error("Inplace components must be used within Inplace.Root")
  return context
}

function assignRef<T>(ref: React.Ref<T> | undefined, node: T | null) {
  if (typeof ref === "function") ref(node)
  else if (ref) ref.current = node
}

export {
  Inplace as Root,
  InplaceDisplay as Display,
  InplaceContent as Content,
  InplaceSave as Save,
  InplaceCancel as Cancel,
}
export type { RootProps }
