"use client"

import * as React from "react"
import { useQuestionnaireItemContext } from "./context.js"
import { getAnswerKeyShortcuts, hasText } from "./dom.js"
import type {
  QuestionnaireChoiceProps,
  QuestionnaireChoiceState,
  QuestionnaireInputProps,
  QuestionnaireInputState,
} from "./types.js"

// A radio or checkbox answer. Single-choice items render radios.
function useQuestionnaireChoice({
  checked: checkedProp,
  defaultChecked = false,
  disabled: disabledProp = false,
  onChange,
  value,
}: Pick<
  QuestionnaireChoiceProps,
  "checked" | "defaultChecked" | "disabled" | "onChange" | "value"
>) {
  const item = useQuestionnaireItemContext("Questionnaire.Choice")
  const {
    registerAnswer,
    registerSelection,
    resetVersion,
    setAnswerDefault,
    syncControlledSelection,
  } = item
  const answerId = React.useId()
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [initialDefaultChecked] = React.useState(defaultChecked)
  const controlled = checkedProp !== undefined
  const disabled = item.disabled || disabledProp
  const skipped = item.status === "skipped"
  const checked = controlled ? !skipped && checkedProp : item.selectedAnswerIds.includes(answerId)
  const type = item.multiple ? "checkbox" : "radio"
  const shortcut = item.shortcutFor(answerId, value)

  React.useLayoutEffect(
    () => registerSelection(answerId, initialDefaultChecked),
    [answerId, initialDefaultChecked, registerSelection],
  )
  React.useLayoutEffect(
    () => setAnswerDefault(answerId, defaultChecked),
    [answerId, defaultChecked, setAnswerDefault],
  )

  React.useLayoutEffect(() => {
    const input = inputRef.current

    if (!input) {
      return
    }

    return registerAnswer({
      disabled,
      element: input,
      id: answerId,
      ownDisabled: disabledProp,
      type: "choice",
      value,
    })
  }, [answerId, disabled, disabledProp, registerAnswer, value])

  // resetVersion re-applies the controlled value after a form reset.
  React.useLayoutEffect(() => {
    if (checkedProp !== undefined) {
      syncControlledSelection(answerId, checkedProp)
    }
  }, [answerId, checkedProp, resetVersion, syncControlledSelection])

  // Keep the native reset default aligned with the owned default, and restore
  // the checked state after a reset.
  React.useLayoutEffect(() => {
    const input = inputRef.current

    if (!input) {
      return
    }

    input.defaultChecked = checkedProp ?? defaultChecked

    if (resetVersion > 0) {
      input.checked = checked
    }
  }, [checked, checkedProp, defaultChecked, resetVersion])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(event)

    if (event.defaultPrevented) {
      return
    }

    if (!controlled) {
      item.selectAnswer(answerId, event.target.checked)
    } else if (skipped && checkedProp === event.target.checked) {
      // Re-selecting the controlled value un-skips the item.
      item.selectAnswer(answerId, checkedProp)
    }
  }

  const state: QuestionnaireChoiceState = {
    checked,
    disabled,
    invalid: item.invalid,
    shortcut,
    type,
  }

  return {
    inputProps: {
      "aria-invalid": item.invalid || undefined,
      "aria-keyshortcuts": getAnswerKeyShortcuts(shortcut, !disabled && checked),
      checked,
      disabled,
      id: answerId,
      name: skipped ? undefined : item.name,
      onChange: handleChange,
      // One required radio covers the group; checkboxes and text answers validate
      // through the item instead.
      required: item.required && !item.multiple && !item.hasInputAnswer,
      type,
      value,
    } satisfies React.ComponentProps<"input">,
    inputRef,
    state,
  }
}

// A free-text answer. It submits its value only while it is the item's answer.
function useQuestionnaireInput({
  defaultValue,
  disabled: disabledProp = false,
  onChange,
  type = "text",
  value,
}: Pick<QuestionnaireInputProps, "defaultValue" | "disabled" | "onChange" | "type" | "value">) {
  const item = useQuestionnaireItemContext("Questionnaire.Input")
  const {
    registerAnswer,
    registerSelection,
    resetVersion,
    setAnswerDefault,
    syncControlledSelection,
  } = item
  const answerId = React.useId()
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const defaultFilled = hasText(defaultValue)
  const [initialDefaultFilled] = React.useState(defaultFilled)
  const [uncontrolledFilled, setUncontrolledFilled] = React.useState(defaultFilled)
  const controlled = value !== undefined
  const controlledFilled = hasText(value)
  const disabled = item.disabled || disabledProp
  const filled = controlled ? controlledFilled : uncontrolledFilled
  const selected = item.selectedAnswerIds.includes(answerId)

  React.useLayoutEffect(
    () => registerSelection(answerId, initialDefaultFilled),
    [answerId, initialDefaultFilled, registerSelection],
  )
  React.useLayoutEffect(
    () => setAnswerDefault(answerId, defaultFilled),
    [answerId, defaultFilled, setAnswerDefault],
  )

  React.useLayoutEffect(() => {
    const input = inputRef.current

    if (!input) {
      return
    }

    return registerAnswer({ disabled, element: input, id: answerId, type: "input" })
  }, [answerId, disabled, registerAnswer])

  // Controlled values sync the selection; a reset restores the default fill.
  React.useLayoutEffect(() => {
    if (controlled) {
      syncControlledSelection(answerId, controlledFilled)
    } else if (resetVersion > 0) {
      setUncontrolledFilled(defaultFilled)
    }
  }, [
    answerId,
    controlled,
    controlledFilled,
    defaultFilled,
    resetVersion,
    syncControlledSelection,
    value,
  ])

  // A native reset restores the controlled value instead of clearing it.
  React.useLayoutEffect(() => {
    const input = inputRef.current

    if (input && controlled) {
      input.defaultValue = String(value)
    }
  }, [controlled, value])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(event)

    if (event.defaultPrevented || controlled) {
      return
    }

    const nextFilled = hasText(event.target.value)

    setUncontrolledFilled(nextFilled)
    item.selectAnswer(answerId, nextFilled)
  }

  const state: QuestionnaireInputState = { disabled, filled, invalid: item.invalid }

  return {
    inputProps: {
      "aria-invalid": item.invalid || undefined,
      "aria-keyshortcuts": getAnswerKeyShortcuts(null, !disabled && filled && selected),
      defaultValue: controlled ? undefined : defaultValue,
      disabled,
      // Detach an unselected input from the form so it does not submit.
      form: selected ? undefined : "",
      id: answerId,
      name: selected ? item.name : undefined,
      onChange: handleChange,
      type,
      value,
    } satisfies React.ComponentProps<"input">,
    inputRef,
    state,
  }
}

export { useQuestionnaireChoice, useQuestionnaireInput }
