"use client"

import * as React from "react"
import { Input } from "./input.js"

// Formats typed and pasted text against a mask: `9` digit, `a` letter, `*` letter or digit,
// `?` marks the remaining slots optional, and `\` escapes a literal.
function InputMask({
  mask,
  value,
  defaultValue = "",
  onValueChange,
  onComplete,
  maskPlaceholder,
  clearIncomplete = false,
  inputMode,
  onFocus,
  onBlur,
  onKeyDown,
  onPaste,
  ref,
  ...props
}: Props) {
  const tokens = React.useMemo(() => parseMask(mask), [mask])
  const [uncontrolledRaw, setUncontrolledRaw] = React.useState(function () {
    return normalizeValue(defaultValue, tokens)
  })
  const [focused, setFocused] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const raw = value === undefined ? uncontrolledRaw : normalizeValue(value, tokens)
  const formatted = formatValue(raw, tokens, focused ? maskPlaceholder : undefined)
  const slots = tokens.filter(isSlot)
  const requiredCount = slots.filter(function (slot) {
    return !slot.optional
  }).length

  React.useImperativeHandle(ref, function () {
    return inputRef.current as HTMLInputElement
  })

  function update(candidate: string, caretSlot?: number) {
    // Re-align characters to their slots after edits shift them.
    const nextRaw = normalizeCharacters(candidate, slots)
    if (caretSlot !== undefined) {
      placeCaret(Math.min(caretSlot, nextRaw.length))
    }
    if (nextRaw === raw) {
      return
    }

    if (value === undefined) {
      setUncontrolledRaw(nextRaw)
    }
    const nextValue = formatValue(nextRaw, tokens, undefined, false)
    onValueChange?.(nextValue, nextRaw)
    if (requiredCount > 0 && nextRaw.length >= requiredCount) {
      onComplete?.(nextValue, nextRaw)
    }
  }

  // React rewrites the value after the event, so move the caret by slot position afterwards.
  function placeCaret(slotPosition: number) {
    const input = inputRef.current
    queueMicrotask(function () {
      if (input && input.ownerDocument.activeElement === input) {
        const caret = positionAfterSlots(input.value, tokens, slotPosition)
        input.setSelectionRange(caret, caret)
      }
    })
  }

  function getSelectedSlots(input: HTMLInputElement) {
    const start = input.selectionStart ?? input.value.length
    const end = input.selectionEnd ?? start
    return [countSlotsBefore(formatted, tokens, start), countSlotsBefore(formatted, tokens, end)]
  }

  return (
    <Input
      {...props}
      ref={inputRef}
      data-slot="input-mask"
      type="text"
      value={formatted}
      inputMode={inputMode ?? (tokens.every(isNumericToken) ? "numeric" : "text")}
      onChange={function (event) {
        const input = event.currentTarget
        const caret = input.selectionStart ?? input.value.length
        const nextRaw = normalizeValue(input.value, tokens)
        update(nextRaw, countSlotsBefore(input.value, tokens, caret))
      }}
      onKeyDown={function (event) {
        onKeyDown?.(event)
        if (
          event.defaultPrevented ||
          props.disabled ||
          props.readOnly ||
          (event.key !== "Backspace" && event.key !== "Delete")
        ) {
          return
        }

        // Delete by slot so literals such as ")" or "-" never block the caret.
        let [start, end] = getSelectedSlots(event.currentTarget)
        if (start === end) {
          if (event.key === "Backspace") {
            start = Math.max(0, start - 1)
          } else {
            end = Math.min(raw.length, end + 1)
          }
        }
        if (start === end) {
          return
        }

        event.preventDefault()
        update(raw.slice(0, start) + raw.slice(end), start)
      }}
      onPaste={function (event) {
        onPaste?.(event)
        if (event.defaultPrevented || props.disabled || props.readOnly) {
          return
        }

        event.preventDefault()
        const [start, end] = getSelectedSlots(event.currentTarget)
        const pasted = normalizeCharacters(event.clipboardData.getData("text"), slots.slice(start))
        update(raw.slice(0, start) + pasted + raw.slice(end), start + pasted.length)
      }}
      onFocus={function (event) {
        setFocused(true)
        onFocus?.(event)
      }}
      onBlur={function (event) {
        setFocused(false)
        if (clearIncomplete && raw.length < requiredCount) {
          update("")
        }
        onBlur?.(event)
      }}
    />
  )
}

type Props = Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "type" | "children"
> & {
  mask: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string, rawValue: string) => void
  onComplete?: (value: string, rawValue: string) => void
  maskPlaceholder?: string
  clearIncomplete?: boolean
}

type SlotToken = { kind: "slot"; pattern: RegExp; optional: boolean }

type MaskToken = { kind: "literal"; value: string } | SlotToken

function parseMask(mask: string): MaskToken[] {
  const tokens: MaskToken[] = []
  let optional = false
  let escaped = false

  for (const character of mask) {
    if (escaped) {
      tokens.push({ kind: "literal", value: character })
      escaped = false
    } else if (character === "\\") {
      escaped = true
    } else if (character === "?") {
      optional = true
    } else if (character === "9") {
      tokens.push({ kind: "slot", pattern: /\d/u, optional })
    } else if (character === "a") {
      tokens.push({ kind: "slot", pattern: /\p{L}/u, optional })
    } else if (character === "*") {
      tokens.push({ kind: "slot", pattern: /[\p{L}\d]/u, optional })
    } else {
      tokens.push({ kind: "literal", value: character })
    }
  }
  if (escaped) {
    tokens.push({ kind: "literal", value: "\\" })
  }
  return tokens
}

function isSlot(token: MaskToken): token is SlotToken {
  return token.kind === "slot"
}

// Extracts slot characters from formatted or raw text, skipping literals.
function normalizeValue(value: string, tokens: MaskToken[]) {
  const raw: string[] = []
  let tokenIndex = 0

  for (const character of value) {
    let consumedLiteral = false
    let token = tokens[tokenIndex]
    while (token?.kind === "literal") {
      tokenIndex += 1
      if (token.value === character) {
        consumedLiteral = true
        break
      }
      token = tokens[tokenIndex]
    }
    if (consumedLiteral) {
      continue
    }
    if (token?.kind === "slot" && token.pattern.test(character)) {
      raw.push(character)
      tokenIndex += 1
    }
  }
  return raw.join("")
}

// Keeps characters that fit the next slot in sequence and drops the rest.
function normalizeCharacters(value: string, slots: SlotToken[]) {
  const raw: string[] = []
  for (const character of value) {
    const slot = slots[raw.length]
    if (slot?.pattern.test(character)) {
      raw.push(character)
    }
  }
  return raw.join("")
}

// Display text appends literals after the last character so typing flows past them;
// emitted values stop at the last character.
function formatValue(
  raw: string,
  tokens: MaskToken[],
  placeholder?: string,
  trailingLiterals = true,
) {
  let formatted = ""
  let rawIndex = 0

  for (const token of tokens) {
    if (token.kind === "literal") {
      if (
        placeholder === undefined &&
        (raw.length === 0 || (!trailingLiterals && rawIndex === raw.length))
      ) {
        break
      }
      formatted += token.value
      continue
    }

    const character = raw[rawIndex]
    if (character !== undefined) {
      formatted += character
      rawIndex += 1
    } else if (placeholder !== undefined) {
      formatted += placeholder
    } else {
      break
    }
  }
  return formatted
}

function countSlotsBefore(value: string, tokens: MaskToken[], position: number) {
  let slots = 0
  let valueIndex = 0
  for (const token of tokens) {
    if (valueIndex >= position || valueIndex >= value.length) {
      break
    }
    if (token.kind === "literal") {
      if (value[valueIndex] === token.value) {
        valueIndex += 1
      }
    } else {
      valueIndex += 1
      slots += 1
    }
  }
  return slots
}

function positionAfterSlots(value: string, tokens: MaskToken[], slotCount: number) {
  let slots = 0
  let position = 0
  for (const token of tokens) {
    if (position >= value.length) {
      break
    }
    if (token.kind === "literal") {
      if (value[position] === token.value) {
        position += 1
      }
      continue
    }
    if (slots === slotCount) {
      return position
    }
    slots += 1
    position += 1
  }
  return position
}

function isNumericToken(token: MaskToken) {
  return token.kind === "literal" || token.pattern.test("1")
}

export { InputMask }
