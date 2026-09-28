"use client"

import { Popover } from "@base-ui/react/popover"
import * as React from "react"
import { Textarea } from "./textarea.js"

// A textarea that suggests mentions while the caret is inside a trigger such as "@name".
function Mention({
  value,
  defaultValue = "",
  onValueChange,
  suggestions,
  trigger = "@",
  renderSuggestion,
  onSuggestionSelect,
  listLabel = "Suggestions",
  disabled,
  readOnly,
  onKeyDown,
  onSelect,
  onBlur,
  ref,
  ...props
}: Props) {
  const listId = React.useId()
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const pendingCaretRef = React.useRef<number | null>(null)
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const [mention, setMention] = React.useState<MentionMatch | null>(null)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const text = value ?? uncontrolledValue
  const triggers = Array.isArray(trigger) ? trigger : [trigger]
  // Ignore a match that no longer exists after an external value change.
  const current =
    mention && text.startsWith(mention.trigger + mention.query, mention.start) ? mention : null
  const matches = current ? filterSuggestions(suggestions, current) : []
  const open = matches.length > 0
  const safeIndex =
    matches[activeIndex] && !matches[activeIndex].disabled
      ? activeIndex
      : matches.findIndex(function (suggestion) {
          return !suggestion.disabled
        })
  const activeSuggestion = matches[safeIndex]

  React.useImperativeHandle(ref, function () {
    return textareaRef.current as HTMLTextAreaElement
  })

  React.useLayoutEffect(
    function () {
      const caret = pendingCaretRef.current
      if (caret !== null && textareaRef.current) {
        pendingCaretRef.current = null
        textareaRef.current.setSelectionRange(caret, caret)
      }
    },
    [text],
  )

  function commit(nextValue: string) {
    if (value === undefined) {
      setUncontrolledValue(nextValue)
    }
    onValueChange?.(nextValue)
  }

  // Re-reads the mention under the caret after every edit, click, or caret movement.
  function syncMention(textarea: HTMLTextAreaElement) {
    const caret = textarea.selectionStart
    const next =
      disabled || readOnly || caret !== textarea.selectionEnd
        ? null
        : findMention(textarea.value, caret, triggers)
    if (next?.start !== current?.start || next?.query !== current?.query) {
      setActiveIndex(0)
    }
    setMention(next)
  }

  function selectSuggestion(suggestion: MentionSuggestion) {
    const textarea = textareaRef.current
    if (!textarea || suggestion.disabled) {
      return
    }

    // Read the caret again so the insertion never uses a stale position.
    const match = findMention(textarea.value, textarea.selectionStart, triggers)
    if (!match) {
      setMention(null)
      return
    }

    const source = textarea.value
    const wordEnd = match.end + (/^[\p{L}\p{N}_-]*/u.exec(source.slice(match.end))?.[0].length ?? 0)
    const after = source.slice(wordEnd)
    const inserted = `${match.trigger}${suggestion.value}${/^\s/.test(after) ? "" : " "}`
    // Place the caret after the following space so the finished mention does not reopen.
    pendingCaretRef.current = match.start + match.trigger.length + suggestion.value.length + 1
    commit(source.slice(0, match.start) + inserted + after)
    setMention(null)
    onSuggestionSelect?.(suggestion, match.trigger)
  }

  function moveActive(direction: 1 | -1) {
    for (let step = 1; step <= matches.length; step += 1) {
      const index = (safeIndex + direction * step + matches.length) % matches.length
      if (!matches[index]?.disabled) {
        setActiveIndex(index)
        document.getElementById(`${listId}-${index}`)?.scrollIntoView({ block: "nearest" })
        return
      }
    }
  }

  return (
    <>
      <Textarea
        {...props}
        ref={textareaRef}
        value={text}
        disabled={disabled}
        readOnly={readOnly}
        data-slot="mention"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-controls={open ? listId : undefined}
        aria-activedescendant={activeSuggestion ? `${listId}-${safeIndex}` : undefined}
        onChange={function (event) {
          commit(event.currentTarget.value)
          syncMention(event.currentTarget)
        }}
        onSelect={function (event) {
          onSelect?.(event)
          syncMention(event.currentTarget)
        }}
        onBlur={function (event) {
          onBlur?.(event)
          setMention(null)
        }}
        onKeyDown={function (event) {
          onKeyDown?.(event)
          if (
            !open ||
            event.defaultPrevented ||
            event.nativeEvent.isComposing ||
            event.keyCode === 229
          ) {
            return
          }

          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault()
            moveActive(event.key === "ArrowDown" ? 1 : -1)
          } else if ((event.key === "Enter" || event.key === "Tab") && activeSuggestion) {
            event.preventDefault()
            selectSuggestion(activeSuggestion)
          } else if (event.key === "Escape") {
            // Keep Escape from also closing a surrounding dialog.
            event.preventDefault()
            event.stopPropagation()
            setMention(null)
          }
        }}
      />
      <Popover.Root
        open={open}
        onOpenChange={function (nextOpen, details) {
          if (
            !nextOpen &&
            !(details.reason === "outside-press" && details.event.target === textareaRef.current)
          ) {
            setMention(null)
          }
        }}
      >
        <Popover.Portal>
          <Popover.Positioner
            anchor={textareaRef}
            side="bottom"
            align="start"
            sideOffset={4}
            className="isolate z-50"
          >
            <Popover.Popup
              id={listId}
              role="listbox"
              aria-label={listLabel}
              initialFocus={false}
              finalFocus={false}
              data-slot="mention-list"
              className="bg-popover text-popover-foreground ring-foreground/10 max-h-56 w-(--anchor-width) max-w-(--available-width) overflow-y-auto rounded-lg p-1 shadow-md ring-1 outline-none"
              onMouseDown={function (event) {
                // Keep focus and the caret in the textarea, including on scrollbar presses.
                event.preventDefault()
              }}
            >
              {matches.map(function (suggestion, index) {
                return (
                  <div
                    key={`${suggestion.trigger ?? ""}${suggestion.value}`}
                    id={`${listId}-${index}`}
                    role="option"
                    aria-selected={index === safeIndex}
                    aria-disabled={suggestion.disabled || undefined}
                    data-slot="mention-option"
                    className="aria-selected:bg-accent aria-selected:text-accent-foreground flex cursor-default flex-col rounded-md px-2 py-1.5 text-sm select-none aria-disabled:pointer-events-none aria-disabled:opacity-50"
                    onMouseMove={function () {
                      if (!suggestion.disabled && index !== safeIndex) {
                        setActiveIndex(index)
                      }
                    }}
                    onClick={function () {
                      selectSuggestion(suggestion)
                    }}
                  >
                    {renderSuggestion ? (
                      renderSuggestion(suggestion)
                    ) : (
                      <>
                        <span className="font-medium">{suggestion.label}</span>
                        {suggestion.description ? (
                          <span className="text-muted-foreground text-xs">
                            {suggestion.description}
                          </span>
                        ) : null}
                      </>
                    )}
                  </div>
                )
              })}
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </>
  )
}

type MentionSuggestion = {
  value: string
  label: string
  description?: string
  trigger?: string
  disabled?: boolean
}

type Props = Omit<
  React.ComponentProps<typeof Textarea>,
  "value" | "defaultValue" | "onChange" | "keyFilter"
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  suggestions: MentionSuggestion[]
  trigger?: string | string[]
  renderSuggestion?: (suggestion: MentionSuggestion) => React.ReactNode
  onSuggestionSelect?: (suggestion: MentionSuggestion, trigger: string) => void
  listLabel?: string
}

type MentionMatch = { start: number; end: number; query: string; trigger: string }

function filterSuggestions(suggestions: MentionSuggestion[], match: MentionMatch) {
  const query = match.query.toLowerCase()
  return suggestions.filter(function (suggestion) {
    return (
      (!suggestion.trigger || suggestion.trigger === match.trigger) &&
      (suggestion.label.toLowerCase().includes(query) ||
        suggestion.value.toLowerCase().includes(query))
    )
  })
}

// Finds the closest trigger before the caret that starts a word and has no whitespace after it.
function findMention(value: string, caret: number, triggers: string[]): MentionMatch | null {
  const beforeCaret = value.slice(0, caret)
  let best: MentionMatch | null = null
  for (const trigger of triggers) {
    const start = trigger ? beforeCaret.lastIndexOf(trigger) : -1
    if (start < 0) {
      continue
    }

    const query = beforeCaret.slice(start + trigger.length)
    if (/\s/.test(query) || (start > 0 && !/[\s([{]/.test(beforeCaret[start - 1] ?? ""))) {
      continue
    }
    if (!best || start > best.start) {
      best = { start, end: caret, query, trigger }
    }
  }
  return best
}

export { Mention, type MentionSuggestion }
