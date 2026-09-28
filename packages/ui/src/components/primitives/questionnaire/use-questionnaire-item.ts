"use client"

import * as React from "react"
import { getShortcutsByChoiceValue } from "./collection.js"
import { useQuestionnaireContext } from "./context.js"
import {
  getShortcutKeys,
  isAnswerFilled,
  isEmptyTextAnswer,
  isRadio,
  isTextEntry,
  sortByDocumentOrder,
} from "./dom.js"
import type {
  AnswerControl,
  QuestionnaireItemContextValue,
  QuestionnaireItemProps,
  QuestionnaireItemState,
  QuestionnaireItemStatus,
} from "./types.js"

// Owns one question: its answers, selection, status, and validation. Registers
// itself with the root so navigation can drive it.
function useQuestionnaireItem({
  "aria-describedby": ariaDescribedBy,
  "aria-keyshortcuts": ariaKeyShortcuts,
  disabled = false,
  invalid: invalidProp = false,
  multiple = false,
  name,
  onStatusChange,
  required = false,
}: ItemParameters) {
  const {
    activeItemName,
    first,
    itemDefinitionByName,
    last,
    nativeValidation,
    registerItem,
    shortcuts,
  } = useQuestionnaireContext("Questionnaire.Item")
  const [element, setElement] = React.useState<HTMLFieldSetElement | null>(null)
  const [answerControls, setAnswerControls] = React.useState<AnswerControl[]>([])
  const [selectedAnswerIds, setSelectedAnswerIds] = React.useState<readonly string[]>([])
  const [skipped, setSkipped] = React.useState(false)
  const [validationAttempted, setValidationAttempted] = React.useState(false)
  // Bumped on form reset so answers can restore their native default state.
  const [resetVersion, setResetVersion] = React.useState(0)
  const [descriptionIds, setDescriptionIds] = React.useState<readonly string[]>([])
  const [errorIds, setErrorIds] = React.useState<readonly string[]>([])
  // Answers selected by default, restored on reset.
  const defaultAnswerIdsRef = React.useRef<readonly string[]>([])
  // Read by the stable registerSelection callback.
  const multipleRef = React.useRef(multiple)
  const previousMultipleRef = React.useRef(multiple)
  const active = !disabled && activeItemName === name
  const answers = React.useMemo(
    () => answerControls.filter((answer) => !answer.disabled),
    [answerControls],
  )
  const answered = answers.some((answer) => selectedAnswerIds.includes(answer.id))
  const status: QuestionnaireItemStatus = skipped ? "skipped" : answered ? "answered" : "unanswered"
  const previousStatusRef = React.useRef(status)
  const optionalSkip = status === "skipped" && !required
  const valid = disabled || optionalSkip || (!invalidProp && status === "answered")
  const invalid = !disabled && !optionalSkip && (invalidProp || (validationAttempted && !valid))
  const hasInputAnswer = answers.some((answer) => answer.type === "input")

  // Shortcuts come from Root.items when defined, otherwise from rendered order.
  const itemDefinition = itemDefinitionByName?.get(name)
  const shortcutByValue = React.useMemo(
    () => (itemDefinitionByName ? getShortcutsByChoiceValue(itemDefinition, shortcuts) : null),
    [itemDefinition, itemDefinitionByName, shortcuts],
  )
  const shortcutByAnswerId = React.useMemo(() => {
    const keys = getShortcutKeys(shortcutByValue ? null : shortcuts)
    const choices = answers.filter((answer) => answer.type === "choice").slice(0, keys.length)

    return new Map(choices.map((answer, index) => [answer.id, keys[index]]))
  }, [answers, shortcutByValue, shortcuts])

  const shortcutFor = React.useCallback(
    (answerId: string, value: string) =>
      (shortcutByValue ? shortcutByValue.get(value) : shortcutByAnswerId.get(answerId)) ?? null,
    [shortcutByAnswerId, shortcutByValue],
  )

  React.useLayoutEffect(() => {
    multipleRef.current = multiple
  }, [multiple])

  // Keep answers in DOM order as choices move.
  React.useLayoutEffect(() => {
    if (!element || typeof MutationObserver === "undefined") {
      return
    }

    const observer = new MutationObserver(() => setAnswerControls(sortByDocumentOrder))

    observer.observe(element, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [element])

  React.useLayoutEffect(() => {
    if (previousStatusRef.current !== status) {
      previousStatusRef.current = status
      onStatusChange?.(status)
    }
  }, [onStatusChange, status])

  // Switching from multiple to single keeps only the first selected answer.
  React.useLayoutEffect(() => {
    const wasMultiple = previousMultipleRef.current

    previousMultipleRef.current = multiple

    if (wasMultiple && !multiple) {
      setSelectedAnswerIds((current) => {
        const kept = answers.find((answer) => current.includes(answer.id))

        return kept ? [kept.id] : []
      })
    }
  }, [answers, multiple])

  const registerAnswer = React.useCallback((answer: AnswerControl) => {
    setAnswerControls((current) =>
      sortByDocumentOrder([
        ...current.filter((entry) => entry.element !== answer.element && entry.id !== answer.id),
        answer,
      ]),
    )

    return () => {
      setAnswerControls((current) => current.filter((entry) => entry !== answer))
    }
  }, [])

  const updateSelection = React.useCallback(
    (answerId: string, selected: boolean) => {
      setSelectedAnswerIds((current) => {
        if (!selected) {
          return current.filter((id) => id !== answerId)
        }

        if (!multiple) {
          return [answerId]
        }

        return current.includes(answerId) ? current : [...current, answerId]
      })
    },
    [multiple],
  )

  // A user change always clears a skip.
  const selectAnswer = React.useCallback(
    (answerId: string, selected: boolean) => {
      setSkipped(false)
      updateSelection(answerId, selected)
    },
    [updateSelection],
  )

  // A controlled value clears a skip only when it selects the answer.
  const syncControlledSelection = React.useCallback(
    (answerId: string, selected: boolean) => {
      if (selected) {
        setSkipped(false)
      }

      updateSelection(answerId, selected)
    },
    [updateSelection],
  )

  // Adds a mounting answer's default selection. A single-choice item keeps the
  // first default it receives.
  const registerSelection = React.useCallback((answerId: string, defaultSelected: boolean) => {
    if (defaultSelected) {
      defaultAnswerIdsRef.current = [...without(defaultAnswerIdsRef.current, answerId), answerId]
      setSelectedAnswerIds((current) => {
        if (!multipleRef.current) {
          return current.length ? current : [answerId]
        }

        return current.includes(answerId) ? current : [...current, answerId]
      })
    }

    return () => {
      defaultAnswerIdsRef.current = without(defaultAnswerIdsRef.current, answerId)
      setSelectedAnswerIds((current) => without(current, answerId))
    }
  }, [])

  const setAnswerDefault = React.useCallback((answerId: string, defaultSelected: boolean) => {
    const defaults = defaultAnswerIdsRef.current

    if (!defaultSelected) {
      defaultAnswerIdsRef.current = without(defaults, answerId)
    } else if (!defaults.includes(answerId)) {
      defaultAnswerIdsRef.current = [...defaults, answerId]
    }
  }, [])

  const registerDescription = React.useCallback((id: string) => trackId(setDescriptionIds, id), [])
  const registerError = React.useCallback((id: string) => trackId(setErrorIds, id), [])

  // Checks the answered state, then native constraints on filled answers when
  // the form opts into native validation.
  const validate = React.useCallback(() => {
    setValidationAttempted(true)

    if (!valid) {
      return false
    }

    const invalidAnswer = nativeValidation
      ? answers.find(
          (answer) =>
            isAnswerFilled(answer) && answer.element.willValidate && !answer.element.validity.valid,
        )
      : undefined

    if (!invalidAnswer) {
      return true
    }

    invalidAnswer.element.focus()
    invalidAnswer.element.reportValidity()

    return false
  }, [answers, nativeValidation, valid])

  const focus = React.useCallback(() => element?.focus(), [element])

  // Focuses the selected answer, else the first control, else the item.
  const focusInvalid = React.useCallback(() => {
    const target =
      element?.querySelector<HTMLElement>("input[data-filled][name]:not(:disabled)") ??
      element?.querySelector<HTMLElement>(
        "input:not([type=hidden]):not(:disabled), textarea:not(:disabled)",
      ) ??
      element

    target?.focus()
  }, [element])

  const reset = React.useCallback(() => {
    const defaults = defaultAnswerIdsRef.current

    setValidationAttempted(false)
    setSkipped(false)
    setSelectedAnswerIds(multiple ? [...defaults] : defaults.slice(0, 1))
    setResetVersion((version) => version + 1)
  }, [multiple])

  const skip = React.useCallback(() => {
    if (!required) {
      setSelectedAnswerIds([])
      setSkipped(true)
    }
  }, [required])

  const getAnswerByElement = React.useCallback(
    (target: Element) => answers.find((answer) => answer.element === target) ?? null,
    [answers],
  )

  const getAnswerByShortcut = React.useCallback(
    (shortcut: string) =>
      answers.find(
        (answer) => answer.type === "choice" && shortcutFor(answer.id, answer.value) === shortcut,
      ) ?? null,
    [answers, shortcutFor],
  )

  // ArrowUp/ArrowDown move between answers, wrapping. From the item itself they
  // start at the selected answer. Native radio groups keep their own arrow keys.
  const moveAnswerFocus = React.useCallback(
    (target: Element, direction: 1 | -1) => {
      const index = answers.findIndex((answer) => answer.element === target)
      const currentAnswer = answers[index] ?? null

      if (
        answers.length === 0 ||
        (isTextEntry(target) && !isEmptyTextAnswer(currentAnswer)) ||
        (index < 0 && target !== element)
      ) {
        return false
      }

      const nextAnswer =
        index < 0
          ? (answers.find(isAnswerFilled) ?? (direction === 1 ? answers[0] : answers.at(-1)))
          : answers[(index + direction + answers.length) % answers.length]

      if (
        !nextAnswer ||
        nextAnswer.element === target ||
        (index >= 0 && isRadio(target) && isRadio(nextAnswer.element))
      ) {
        return false
      }

      nextAnswer.element.focus()

      if (nextAnswer.type === "choice" && isRadio(nextAnswer.element)) {
        nextAnswer.element.click()
      }

      return true
    },
    [answers, element],
  )

  const choices = React.useMemo(
    () =>
      answerControls.flatMap((answer) =>
        answer.type === "choice" ? [{ disabled: answer.ownDisabled, value: answer.value }] : [],
      ),
    [answerControls],
  )

  React.useLayoutEffect(() => {
    if (!element) {
      return
    }

    return registerItem({
      choices,
      disabled,
      element,
      focus,
      focusInvalid,
      getAnswerByElement,
      getAnswerByShortcut,
      moveAnswerFocus,
      name,
      required,
      reset,
      skip,
      status,
      validate,
    })
  }, [
    choices,
    disabled,
    element,
    focus,
    focusInvalid,
    getAnswerByElement,
    getAnswerByShortcut,
    moveAnswerFocus,
    name,
    registerItem,
    required,
    reset,
    skip,
    status,
    validate,
  ])

  const context = React.useMemo<QuestionnaireItemContextValue>(
    () => ({
      disabled,
      hasInputAnswer,
      invalid,
      multiple,
      name,
      registerAnswer,
      registerDescription,
      registerError,
      registerSelection,
      required,
      resetVersion,
      selectAnswer,
      selectedAnswerIds,
      setAnswerDefault,
      shortcutFor,
      shortcuts,
      status,
      syncControlledSelection,
    }),
    [
      disabled,
      hasInputAnswer,
      invalid,
      multiple,
      name,
      registerAnswer,
      registerDescription,
      registerError,
      registerSelection,
      required,
      resetVersion,
      selectAnswer,
      selectedAnswerIds,
      setAnswerDefault,
      shortcutFor,
      shortcuts,
      status,
      syncControlledSelection,
    ],
  )
  const describedBy = joinTokens([...descriptionIds, ...(invalid ? errorIds : []), ariaDescribedBy])
  const keyShortcuts = joinTokens([
    ariaKeyShortcuts,
    active && "Meta+Enter Control+Enter",
    active && answers.length > 0 && "ArrowUp ArrowDown",
    active && !first && "ArrowLeft",
    active && !last && status !== "unanswered" && "ArrowRight",
  ])
  const state: QuestionnaireItemState = { active, disabled, invalid, multiple, required, status }

  return {
    context,
    itemProps: {
      "aria-describedby": describedBy,
      "aria-invalid": invalid || undefined,
      "aria-keyshortcuts": keyShortcuts,
      disabled,
      hidden: !active,
      inert: !active,
      tabIndex: -1,
    },
    setElement,
    state,
  }
}

type ItemParameters = Pick<
  QuestionnaireItemProps,
  | "aria-describedby"
  | "aria-keyshortcuts"
  | "disabled"
  | "invalid"
  | "multiple"
  | "name"
  | "onStatusChange"
  | "required"
>

function without(ids: readonly string[], id: string) {
  return ids.filter((entry) => entry !== id)
}

// Adds an id to a list until the returned cleanup removes it.
function trackId(setIds: React.Dispatch<React.SetStateAction<readonly string[]>>, id: string) {
  setIds((current) => (current.includes(id) ? current : [...current, id]))

  return () => setIds((current) => without(current, id))
}

function joinTokens(tokens: Array<string | false | undefined>) {
  return tokens.filter(Boolean).join(" ") || undefined
}

export { useQuestionnaireItem }
