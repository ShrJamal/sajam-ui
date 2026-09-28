"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import * as React from "react"
import {
  QuestionnaireChoiceContext,
  QuestionnaireContext,
  QuestionnaireItemContext,
  useQuestionnaireChoiceContext,
  useQuestionnaireContext,
  useQuestionnaireItemContext,
} from "./context.js"
import type {
  QuestionnaireChoiceInputProps,
  QuestionnaireChoiceLabelProps,
  QuestionnaireChoiceProps,
  QuestionnaireChoiceShortcutProps,
  QuestionnaireChoiceState,
  QuestionnaireChoicesProps,
  QuestionnaireDescriptionProps,
  QuestionnaireErrorProps,
  QuestionnaireInputProps,
  QuestionnaireInputState,
  QuestionnaireItemProps,
  QuestionnaireItemState,
  QuestionnaireNavigationProps,
  QuestionnaireNavigationState,
  QuestionnaireProgressProps,
  QuestionnaireRootProps,
  QuestionnaireRootState,
  QuestionnaireTitleProps,
} from "./types.js"
import { useQuestionnaireChoice, useQuestionnaireInput } from "./use-questionnaire-answer.js"
import { useQuestionnaireItem } from "./use-questionnaire-item.js"
import { useQuestionnaireRoot } from "./use-questionnaire-root.js"

const CHECKED_ATTRIBUTES = {
  checked: (checked: boolean) => ({ [checked ? "data-checked" : "data-unchecked"]: "" }),
}

const FILLED_ATTRIBUTES = {
  filled: (filled: boolean) => ({ [filled ? "data-filled" : "data-empty"]: "" }),
}

const VISIBLE_ATTRIBUTES = {
  visible: (visible: boolean) => ({ [visible ? "data-visible" : "data-hidden"]: "" }),
}

// A form that shows one question at a time. Browser validation is off by
// default; pass noValidate={false} to also check native constraints.
function QuestionnaireRoot({
  defaultItem,
  item,
  items,
  noValidate = true,
  onItemChange,
  onReset,
  onSubmit,
  shortcuts,
  ...props
}: QuestionnaireRootProps) {
  const { context, rootProps, setForm, state } = useQuestionnaireRoot({
    defaultItem,
    item,
    items,
    noValidate,
    onItemChange,
    onReset,
    onSubmit,
    shortcuts,
  })
  const element = useRender<QuestionnaireRootState, HTMLFormElement>({
    defaultTagName: "form",
    ref: setForm,
    state,
    props: mergeProps<"form">({ ...rootProps, noValidate }, props),
  })

  return <QuestionnaireContext.Provider value={context}>{element}</QuestionnaireContext.Provider>
}

function QuestionnaireProgress({ children, render, ...props }: QuestionnaireProgressProps) {
  const { current, first, last, total } = useQuestionnaireContext("Questionnaire.Progress")
  const label = total ? `Question ${current} of ${total}` : undefined

  return useRender({
    render,
    state: { current, first, last, total },
    props: mergeProps<"div">(
      {
        "aria-label": "Questionnaire progress",
        "aria-live": "polite",
        "aria-valuemax": total || undefined,
        "aria-valuemin": total ? 1 : undefined,
        "aria-valuenow": total ? current : undefined,
        "aria-valuetext": label,
        children: children ?? label,
        role: "progressbar",
      },
      props,
    ),
  })
}

// One question. Only the active item is shown and focusable.
function QuestionnaireItem({
  "aria-describedby": ariaDescribedBy,
  "aria-keyshortcuts": ariaKeyShortcuts,
  disabled,
  invalid,
  multiple,
  name,
  onStatusChange,
  required,
  ...props
}: QuestionnaireItemProps) {
  const { context, itemProps, setElement, state } = useQuestionnaireItem({
    "aria-describedby": ariaDescribedBy,
    "aria-keyshortcuts": ariaKeyShortcuts,
    disabled,
    invalid,
    multiple,
    name,
    onStatusChange,
    required,
  })
  const element = useRender<QuestionnaireItemState, HTMLFieldSetElement>({
    defaultTagName: "fieldset",
    ref: setElement,
    state,
    props: mergeProps<"fieldset">(itemProps, props),
  })

  return (
    <QuestionnaireItemContext.Provider value={context}>{element}</QuestionnaireItemContext.Provider>
  )
}

function QuestionnaireTitle({ render, ...props }: QuestionnaireTitleProps) {
  useQuestionnaireItemContext("Questionnaire.Title")

  return useRender({ defaultTagName: "legend", render, props })
}

function QuestionnaireDescription({ id, render, ...props }: QuestionnaireDescriptionProps) {
  const { registerDescription } = useQuestionnaireItemContext("Questionnaire.Description")
  const generatedId = React.useId()
  const descriptionId = id ?? generatedId

  React.useLayoutEffect(
    () => registerDescription(descriptionId),
    [descriptionId, registerDescription],
  )

  return useRender({
    defaultTagName: "p",
    render,
    props: mergeProps<"p">({ id: descriptionId }, props),
  })
}

function QuestionnaireChoices({ render, ...props }: QuestionnaireChoicesProps) {
  const { shortcuts } = useQuestionnaireItemContext("Questionnaire.Choices")

  return useRender({ render, state: { shortcuts }, props })
}

// A labelled answer. Render ChoiceInput, ChoiceLabel, and ChoiceShortcut inside.
function QuestionnaireChoice({
  checked,
  children,
  defaultChecked,
  disabled,
  onChange,
  render,
  value,
  ...props
}: QuestionnaireChoiceProps) {
  const choice = useQuestionnaireChoice({ checked, defaultChecked, disabled, onChange, value })
  const element = useRender({
    defaultTagName: "label",
    render,
    state: choice.state,
    stateAttributesMapping: CHECKED_ATTRIBUTES,
    props: mergeProps<"label">({ children }, props),
  })

  return (
    <QuestionnaireChoiceContext.Provider value={choice}>
      {element}
    </QuestionnaireChoiceContext.Provider>
  )
}

function QuestionnaireChoiceInput({ render, ...props }: QuestionnaireChoiceInputProps) {
  const { inputProps, inputRef, state } = useQuestionnaireChoiceContext("Questionnaire.ChoiceInput")

  return useRender<QuestionnaireChoiceState, HTMLInputElement>({
    defaultTagName: "input",
    ref: inputRef,
    render,
    state,
    stateAttributesMapping: CHECKED_ATTRIBUTES,
    props: mergeProps<"input">(inputProps, props),
  })
}

function QuestionnaireChoiceLabel({ render, ...props }: QuestionnaireChoiceLabelProps) {
  useQuestionnaireChoiceContext("Questionnaire.ChoiceLabel")

  return useRender({ defaultTagName: "span", render, props })
}

function QuestionnaireChoiceShortcut({
  children,
  render,
  ...props
}: QuestionnaireChoiceShortcutProps) {
  const { shortcut } = useQuestionnaireChoiceContext("Questionnaire.ChoiceShortcut").state

  return useRender({
    defaultTagName: "span",
    render,
    state: { shortcut },
    props: mergeProps<"span">(
      { "aria-hidden": true, children: children ?? shortcut, hidden: shortcut === null },
      props,
    ),
  })
}

function QuestionnaireInput({
  defaultValue,
  disabled,
  onChange,
  render,
  type,
  value,
  ...props
}: QuestionnaireInputProps) {
  const { inputProps, inputRef, state } = useQuestionnaireInput({
    defaultValue,
    disabled,
    onChange,
    type,
    value,
  })

  return useRender<QuestionnaireInputState, HTMLInputElement>({
    defaultTagName: "input",
    ref: inputRef,
    render,
    state,
    stateAttributesMapping: FILLED_ATTRIBUTES,
    props: mergeProps<"input">(inputProps, props),
  })
}

// Announced while the item is invalid.
function QuestionnaireError({ children, id, render, ...props }: QuestionnaireErrorProps) {
  const { invalid, registerError, required } = useQuestionnaireItemContext("Questionnaire.Error")
  const generatedId = React.useId()
  const errorId = id ?? generatedId

  React.useLayoutEffect(() => registerError(errorId), [errorId, registerError])

  return useRender({
    defaultTagName: "p",
    render,
    state: { invalid },
    props: mergeProps<"p">(
      {
        children:
          children ??
          (required ? "Choose an answer to continue." : "Choose an answer or skip this question."),
        hidden: !invalid,
        id: errorId,
        role: invalid ? "alert" : undefined,
      },
      props,
    ),
  })
}

function QuestionnairePrevious({ onClick, ...props }: QuestionnaireNavigationProps) {
  const { first, goPrevious, total } = useQuestionnaireContext("Questionnaire.Previous")

  return useNavigationButton(props, {
    action: goPrevious,
    label: "Previous",
    onClick,
    visible: total > 1 && !first,
  })
}

// Shown only for optional items.
function QuestionnaireSkip({ onClick, ...props }: QuestionnaireNavigationProps) {
  const { activeItemRequired, skipCurrent } = useQuestionnaireContext("Questionnaire.Skip")

  return useNavigationButton(props, {
    action: skipCurrent,
    label: "Skip",
    onClick,
    visible: activeItemRequired === false,
  })
}

function QuestionnaireNext({ onClick, ...props }: QuestionnaireNavigationProps) {
  const { goNext, last, total } = useQuestionnaireContext("Questionnaire.Next")

  return useNavigationButton(props, {
    action: goNext,
    label: "Next",
    onClick,
    shortcut: "Enter",
    visible: total > 1 && !last,
  })
}

// Submits the form from the last item.
function QuestionnaireSubmit({ type = "submit", ...props }: QuestionnaireNavigationProps) {
  const { last, total } = useQuestionnaireContext("Questionnaire.Submit")

  return useNavigationButton(
    { ...props, type },
    { label: "Submit", shortcut: "Enter", visible: total > 0 && last },
  )
}

// Renders a navigation button that stays mounted but hidden and inert while it
// does not apply to the active item.
function useNavigationButton(
  {
    children,
    disabled = false,
    render,
    tabIndex,
    type = "button",
    ...props
  }: Omit<QuestionnaireNavigationProps, "onClick">,
  {
    action,
    label,
    onClick,
    shortcut,
    visible,
  }: {
    action?: () => void
    label: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    shortcut?: "Enter"
    visible: boolean
  },
) {
  const { activeItemStatus } = useQuestionnaireContext("Questionnaire navigation")
  const activeShortcut = visible && !disabled ? (shortcut ?? null) : null
  const state: QuestionnaireNavigationState = {
    disabled,
    shortcut: activeShortcut,
    status: activeItemStatus,
    visible,
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event)

    if (!event.defaultPrevented) {
      action?.()
    }
  }

  return useRender({
    defaultTagName: "button",
    render,
    state,
    stateAttributesMapping: VISIBLE_ATTRIBUTES,
    props: mergeProps<"button">(
      {
        "aria-hidden": !visible || undefined,
        "aria-keyshortcuts": activeShortcut ?? undefined,
        children: children ?? label,
        disabled,
        hidden: !visible,
        inert: !visible,
        onClick: action ? handleClick : onClick,
        tabIndex: visible ? tabIndex : -1,
        type,
      },
      props,
    ),
  })
}

export {
  QuestionnaireChoice,
  QuestionnaireChoiceInput,
  QuestionnaireChoiceLabel,
  QuestionnaireChoiceShortcut,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireRoot,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
}
