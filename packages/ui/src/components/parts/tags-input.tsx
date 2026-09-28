"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cn } from "cn"
import { XIcon } from "lucide-react"
import * as React from "react"
import { matchesKeyFilter, useKeyFilter, type KeyFilter } from "./key-filter.js"

// Collects short values as removable tags. Enter or a separator adds the typed text, and
// pasted lists are split into tags.
function TagsInput({
  className,
  value,
  defaultValue = [],
  onValueChange,
  separators = [","],
  allowDuplicates = false,
  addOnBlur = false,
  max,
  keyFilter,
  renderTag,
  getRemoveLabel = defaultRemoveLabel,
  name,
  disabled,
  readOnly,
  required,
  placeholder,
  onBeforeInput,
  onChange,
  onFocus,
  onCompositionStart,
  onCompositionEnd,
  onKeyDown,
  onPaste,
  onBlur,
  ref,
  ...props
}: Props) {
  const [uncontrolledTags, setUncontrolledTags] = React.useState(defaultValue)
  const [draft, setDraft] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const tags = value ?? uncontrolledTags
  const full = max !== undefined && tags.length >= max

  React.useImperativeHandle(ref, function () {
    return inputRef.current as HTMLInputElement
  })

  function splitTags(text: string) {
    let parts = [text]
    for (const separator of [...separators, "\n"]) {
      parts = parts.flatMap(function (part) {
        return part.split(separator)
      })
    }
    return parts.map(function (part) {
      return part.trim()
    })
  }

  // Adds each valid, non-duplicate candidate up to `max`.
  function addTags(candidates: string[]) {
    const nextTags = [...tags]
    for (const candidate of candidates) {
      if (
        candidate &&
        (max === undefined || nextTags.length < max) &&
        (allowDuplicates || !nextTags.includes(candidate)) &&
        (!keyFilter || matchesKeyFilter(candidate, keyFilter))
      ) {
        nextTags.push(candidate)
      }
    }
    if (nextTags.length !== tags.length) {
      updateTags(nextTags)
    }
  }

  function updateTags(nextTags: string[]) {
    if (value === undefined) {
      setUncontrolledTags(nextTags)
    }
    onValueChange?.(nextTags)
  }

  // Commits every complete segment and keeps the text after the last separator as the draft.
  function commitText(text: string) {
    const parts = splitTags(text)
    addTags(parts.slice(0, -1))
    setDraft(parts.at(-1) ?? "")
  }

  const filterHandlers = useKeyFilter<HTMLInputElement>(
    keyFilter
      ? function (text) {
          return splitTags(text).every(function (part) {
            return matchesKeyFilter(part, keyFilter)
          })
        }
      : undefined,
    {
      onFocus,
      onCompositionStart,
      onCompositionEnd,
      onBeforeInput(event) {
        onBeforeInput?.(event)
        if (event.defaultPrevented || !hasSeparator(event.data)) {
          return
        }

        event.preventDefault()
        const input = event.currentTarget
        const start = input.selectionStart ?? draft.length
        const end = input.selectionEnd ?? start
        commitText(draft.slice(0, start) + event.data + draft.slice(end))
      },
      onChange(event) {
        onChange?.(event)
        const text = event.currentTarget.value
        if (hasSeparator(text) && !(event.nativeEvent as InputEvent).isComposing) {
          commitText(text)
        } else {
          setDraft(text)
        }
      },
    },
  )

  function hasSeparator(text: string | null) {
    return Boolean(
      text &&
      [...separators, "\n"].some(function (separator) {
        return text.includes(separator)
      }),
    )
  }

  return (
    <div
      data-slot="tags-input"
      data-disabled={disabled || undefined}
      className={cn(
        "border-input focus-within:border-ring focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40 flex min-h-8 w-full min-w-0 flex-wrap items-center gap-1 rounded-lg border bg-transparent px-1 py-[3px] text-base transition-colors focus-within:ring-3 has-aria-invalid:ring-3 md:text-sm",
        disabled && "bg-input/50 dark:bg-input/80 cursor-not-allowed opacity-50",
        className,
      )}
      onClick={function (event) {
        if (!(event.target as HTMLElement).closest("button, input")) {
          inputRef.current?.focus()
        }
      }}
    >
      {tags.map(function (tag, index) {
        return (
          <span
            key={`${tag}-${index}`}
            data-slot="tags-input-tag"
            className="bg-secondary text-secondary-foreground inline-flex h-6 max-w-full min-w-0 items-center gap-1 rounded-md px-2 text-xs font-medium [&_svg:not([class*='size-'])]:size-3"
          >
            <span className="flex min-w-0 items-center gap-1 truncate">
              {renderTag ? renderTag(tag, index) : tag}
            </span>
            {disabled || readOnly ? null : (
              <ButtonPrimitive
                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 -mr-1 inline-flex size-4 shrink-0 items-center justify-center rounded-sm outline-none focus-visible:ring-2"
                aria-label={getRemoveLabel(tag)}
                onClick={function () {
                  updateTags(
                    tags.filter(function (_, tagIndex) {
                      return tagIndex !== index
                    }),
                  )
                  inputRef.current?.focus()
                }}
              >
                <XIcon />
              </ButtonPrimitive>
            )}
          </span>
        )
      })}
      {/* Native on purpose: a Base UI Input would take a Field's name and validation meant for the tags. */}
      <input
        {...props}
        {...filterHandlers}
        ref={inputRef}
        data-slot="tags-input-field"
        type="text"
        value={draft}
        disabled={disabled}
        readOnly={readOnly || full}
        required={required && tags.length === 0}
        placeholder={tags.length === 0 ? placeholder : undefined}
        className="placeholder:text-muted-foreground h-6 min-w-16 flex-1 bg-transparent px-1.5 outline-none disabled:cursor-not-allowed"
        onKeyDown={function (event) {
          onKeyDown?.(event)
          if (event.defaultPrevented || event.nativeEvent.isComposing || disabled || readOnly) {
            return
          }

          if (event.key === "Enter" && draft.trim()) {
            event.preventDefault()
            addTags([draft.trim()])
            setDraft("")
          } else if (event.key === "Backspace" && draft === "" && tags.length > 0) {
            event.preventDefault()
            updateTags(tags.slice(0, -1))
          }
        }}
        onPaste={function (event) {
          onPaste?.(event)
          const text = event.clipboardData.getData("text")
          if (event.defaultPrevented || readOnly || full || !hasSeparator(text)) {
            return
          }

          event.preventDefault()
          const input = event.currentTarget
          const start = input.selectionStart ?? draft.length
          const end = input.selectionEnd ?? start
          addTags(splitTags(draft.slice(0, start) + text + draft.slice(end)))
          setDraft("")
        }}
        onBlur={function (event) {
          onBlur?.(event)
          if (addOnBlur && !readOnly && draft.trim()) {
            addTags([draft.trim()])
            setDraft("")
          }
        }}
      />
      {name
        ? tags.map(function (tag, index) {
            return (
              <input
                key={`${tag}-${index}`}
                type="hidden"
                name={name}
                value={tag}
                disabled={disabled}
              />
            )
          })
        : null}
    </div>
  )
}

type Props = Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "type" | "children" | "className"
> & {
  className?: string
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  separators?: string[]
  allowDuplicates?: boolean
  addOnBlur?: boolean
  max?: number
  keyFilter?: KeyFilter
  renderTag?: (tag: string, index: number) => React.ReactNode
  getRemoveLabel?: (tag: string) => string
}

function defaultRemoveLabel(tag: string) {
  return `Remove ${tag}`
}

export { TagsInput }
