"use client"

import * as React from "react"

const keyFilterPatterns = {
  digits: /^\d*$/,
  integer: /^-?\d*$/,
  number: /^-?\d*(?:[.,]\d*)?$/,
  money: /^-?\d*(?:[.,]\d{0,2})?$/,
  hex: /^[\da-f]*$/i,
  alpha: /^\p{L}*$/u,
  alphanumeric: /^[\p{L}\d]*$/u,
  email: /^[\w.!#$%&'*+/=?^`{|}~-]*(?:@[\w.-]*)?$/,
} as const

// Shared by Input, Textarea, and TagsInput. Blocks insertions that would make the value fail
// `isAllowed`, and reverts values that slip through (autofill, drop, IME composition).
function useKeyFilter<T extends HTMLInputElement | HTMLTextAreaElement>(
  isAllowed: ((value: string) => boolean) | undefined,
  handlers: FilterHandlers<T>,
): FilterHandlers<T> {
  const acceptedValueRef = React.useRef("")
  const composingRef = React.useRef(false)

  if (!isAllowed) {
    return handlers
  }

  return {
    onFocus(event) {
      acceptedValueRef.current = event.currentTarget.value
      handlers.onFocus?.(event)
    },
    onBeforeInput(event) {
      handlers.onBeforeInput?.(event)
      if (event.defaultPrevented || composingRef.current || !event.data) {
        return
      }

      const element = event.currentTarget
      const start = element.selectionStart ?? element.value.length
      const end = element.selectionEnd ?? start
      const nextValue = element.value.slice(0, start) + event.data + element.value.slice(end)
      if (!isAllowed(nextValue)) {
        event.preventDefault()
      }
    },
    onCompositionStart(event) {
      composingRef.current = true
      acceptedValueRef.current = event.currentTarget.value
      handlers.onCompositionStart?.(event)
    },
    onCompositionEnd(event) {
      composingRef.current = false
      handlers.onCompositionEnd?.(event)
      // Composition updates reach onChange unfiltered, so revert through a real input event
      // to keep controlled state in sync.
      if (!isAllowed(event.currentTarget.value)) {
        setNativeValue(event.currentTarget, acceptedValueRef.current)
      }
    },
    onChange(event) {
      const element = event.currentTarget
      if (composingRef.current) {
        handlers.onChange?.(event)
        return
      }

      if (!isAllowed(element.value)) {
        element.value = acceptedValueRef.current
        return
      }

      acceptedValueRef.current = element.value
      handlers.onChange?.(event)
    },
  }
}

type KeyFilter = keyof typeof keyFilterPatterns | RegExp

type FilterHandlers<T extends HTMLInputElement | HTMLTextAreaElement> = {
  onBeforeInput?: React.InputEventHandler<T>
  onChange?: React.ChangeEventHandler<T, T>
  onFocus?: React.FocusEventHandler<T>
  onCompositionStart?: React.CompositionEventHandler<T>
  onCompositionEnd?: React.CompositionEventHandler<T>
}

// An empty value always passes so the field can be cleared.
function matchesKeyFilter(value: string, filter: KeyFilter) {
  if (value === "") {
    return true
  }

  const pattern = typeof filter === "string" ? keyFilterPatterns[filter] : filter
  if (pattern.global || pattern.sticky) {
    return new RegExp(pattern.source, pattern.flags.replace(/[gy]/g, "")).test(value)
  }

  return pattern.test(value)
}

function setNativeValue(element: HTMLInputElement | HTMLTextAreaElement, value: string) {
  // React ignores direct `value` writes, so use the prototype setter before dispatching.
  Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), "value")?.set?.call(
    element,
    value,
  )
  element.dispatchEvent(new Event("input", { bubbles: true }))
}

export { matchesKeyFilter, useKeyFilter, type KeyFilter }
