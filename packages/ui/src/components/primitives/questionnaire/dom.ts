import type { AnswerControl, QuestionnaireShortcutMode } from "./types.js"

const LETTER_KEYS = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index))
const NUMBER_KEYS = Array.from({ length: 9 }, (_, index) => String(index + 1))

// Input types where an empty field still lets ArrowUp/ArrowDown move between answers.
const NAVIGABLE_TEXT_TYPES = new Set(["email", "password", "search", "tel", "text", "url"])

const NON_TEXT_INPUT_TYPES = new Set(["button", "checkbox", "radio", "reset", "submit"])

function getShortcutKeys(mode: QuestionnaireShortcutMode | null) {
  return mode === "letters" ? LETTER_KEYS : mode === "numbers" ? NUMBER_KEYS : []
}

function getShortcutFromKey(key: string, mode: QuestionnaireShortcutMode) {
  const shortcut = mode === "letters" ? key.toUpperCase() : key

  return getShortcutKeys(mode).includes(shortcut) ? shortcut : null
}

// aria-keyshortcuts for an answer: its shortcut, plus Enter once it is filled.
function getAnswerKeyShortcuts(shortcut: string | null, filled: boolean) {
  return [shortcut, filled ? "Enter" : null].filter(Boolean).join(" ") || undefined
}

function hasText(value: unknown) {
  if (Array.isArray(value)) {
    return value.some(hasText)
  }

  return value !== undefined && value !== null && String(value).trim().length > 0
}

// An answer counts as filled when it would submit a value with the form.
function isAnswerFilled(answer: AnswerControl) {
  if (answer.type === "choice") {
    return answer.element.checked
  }

  return answer.element.hasAttribute("name") && hasText(answer.element.value)
}

function isEmptyTextAnswer(answer: AnswerControl | null) {
  return (
    answer?.type === "input" &&
    NAVIGABLE_TEXT_TYPES.has(answer.element.type) &&
    !hasText(answer.element.value)
  )
}

// Elements that consume arrow and letter keys for text editing.
function isTextEntry(element: Element) {
  if (element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
    return true
  }

  if (element instanceof HTMLInputElement) {
    return !NON_TEXT_INPUT_TYPES.has(element.type)
  }

  return element instanceof HTMLElement && element.isContentEditable
}

function isRadio(element: Element) {
  return element instanceof HTMLInputElement && element.type === "radio"
}

// Sorts registrations by their element's DOM position. Returns the same array
// when the order is unchanged, so state setters can skip a render.
function sortByDocumentOrder<T extends { element: Element }>(list: T[]) {
  const sorted = [...list].sort((first, second) => {
    if (first.element === second.element) {
      return 0
    }

    return first.element.compareDocumentPosition(second.element) & Node.DOCUMENT_POSITION_FOLLOWING
      ? -1
      : 1
  })

  return sorted.every((entry, index) => entry === list[index]) ? list : sorted
}

export {
  getAnswerKeyShortcuts,
  getShortcutFromKey,
  getShortcutKeys,
  hasText,
  isAnswerFilled,
  isEmptyTextAnswer,
  isRadio,
  isTextEntry,
  sortByDocumentOrder,
}
