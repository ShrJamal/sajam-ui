import type { useRender } from "@base-ui/react/use-render"
import type * as React from "react"

type QuestionnaireItemStatus = "unanswered" | "answered" | "skipped"
type QuestionnaireShortcutMode = "letters" | "numbers"

type QuestionnaireChoiceDefinition = {
  disabled?: boolean
  value: string
}

// Declares the question order and choices up front, so progress and shortcuts
// do not depend on which items are rendered.
type QuestionnaireItemDefinition = {
  choices?: readonly QuestionnaireChoiceDefinition[]
  disabled?: boolean
  name: string
  required?: boolean
}

type QuestionnaireRootState = {
  current: number
  first: boolean
  last: boolean
  total: number
}

type QuestionnaireRootProps = Omit<
  React.ComponentPropsWithRef<"form">,
  "defaultValue" | "value"
> & {
  defaultItem?: string
  item?: string
  items?: readonly QuestionnaireItemDefinition[]
  onItemChange?: (item: string) => void
  shortcuts?: QuestionnaireShortcutMode
}

type QuestionnaireProgressProps = useRender.ComponentProps<"div", QuestionnaireRootState>

type QuestionnaireItemState = {
  active: boolean
  disabled: boolean
  invalid: boolean
  multiple: boolean
  required: boolean
  status: QuestionnaireItemStatus
}

type QuestionnaireItemProps = Omit<React.ComponentPropsWithRef<"fieldset">, "name" | "value"> & {
  invalid?: boolean
  multiple?: boolean
  name: string
  onStatusChange?: (status: QuestionnaireItemStatus) => void
  required?: boolean
}

type QuestionnaireTitleProps = useRender.ComponentProps<"legend">
type QuestionnaireDescriptionProps = useRender.ComponentProps<"p">

type QuestionnaireChoicesProps = useRender.ComponentProps<
  "div",
  { shortcuts: QuestionnaireShortcutMode | null }
>

type QuestionnaireChoiceState = {
  checked: boolean
  disabled: boolean
  invalid: boolean
  shortcut: string | null
  type: "checkbox" | "radio"
}

type QuestionnaireChoiceProps = Omit<
  useRender.ComponentProps<"label", QuestionnaireChoiceState>,
  "onChange"
> & {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value: string
}

type QuestionnaireChoiceInputProps = Omit<
  useRender.ComponentProps<"input", QuestionnaireChoiceState>,
  "checked" | "defaultChecked" | "disabled" | "name" | "onChange" | "required" | "type" | "value"
>

type QuestionnaireChoiceLabelProps = useRender.ComponentProps<"span">

type QuestionnaireChoiceShortcutProps = useRender.ComponentProps<
  "span",
  Pick<QuestionnaireChoiceState, "shortcut">
>

type QuestionnaireInputState = {
  disabled: boolean
  filled: boolean
  invalid: boolean
}

type QuestionnaireInputType =
  | "date"
  | "datetime-local"
  | "email"
  | "month"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"

type QuestionnaireInputProps = Omit<
  useRender.ComponentProps<"input", QuestionnaireInputState>,
  "form" | "name" | "type"
> & {
  type?: QuestionnaireInputType
}

type QuestionnaireErrorProps = useRender.ComponentProps<
  "p",
  Pick<QuestionnaireItemState, "invalid">
>

type QuestionnaireNavigationState = {
  disabled: boolean
  shortcut: "Enter" | null
  status: QuestionnaireItemStatus | null
  visible: boolean
}

type QuestionnaireNavigationProps = useRender.ComponentProps<"button", QuestionnaireNavigationState>

// An answer control registered with its item: a choice input or a free-text input.
type AnswerControl = {
  disabled: boolean
  element: HTMLInputElement
  id: string
} & ({ type: "choice"; ownDisabled: boolean; value: string } | { type: "input" })

// What an item exposes to the root for navigation, validation, and shortcuts.
type ItemRegistration = {
  choices: readonly Required<QuestionnaireChoiceDefinition>[]
  disabled: boolean
  element: HTMLFieldSetElement
  focus: () => void
  focusInvalid: () => void
  getAnswerByElement: (element: Element) => AnswerControl | null
  getAnswerByShortcut: (shortcut: string) => AnswerControl | null
  moveAnswerFocus: (element: Element, direction: 1 | -1) => boolean
  name: string
  required: boolean
  reset: () => void
  skip: () => void
  status: QuestionnaireItemStatus
  validate: () => boolean
}

type QuestionnaireContextValue = QuestionnaireRootState & {
  activeItemName: string | null
  // Null when no item is active.
  activeItemRequired: boolean | null
  activeItemStatus: QuestionnaireItemStatus | null
  goNext: () => void
  goPrevious: () => void
  itemDefinitionByName: ReadonlyMap<string, QuestionnaireItemDefinition> | null
  nativeValidation: boolean
  registerItem: (registration: ItemRegistration) => () => void
  shortcuts: QuestionnaireShortcutMode | null
  skipCurrent: () => void
}

type QuestionnaireItemContextValue = {
  disabled: boolean
  hasInputAnswer: boolean
  invalid: boolean
  multiple: boolean
  name: string
  registerAnswer: (answer: AnswerControl) => () => void
  registerDescription: (id: string) => () => void
  registerError: (id: string) => () => void
  registerSelection: (answerId: string, defaultSelected: boolean) => () => void
  required: boolean
  resetVersion: number
  selectAnswer: (answerId: string, selected: boolean) => void
  selectedAnswerIds: readonly string[]
  setAnswerDefault: (answerId: string, defaultSelected: boolean) => void
  shortcutFor: (answerId: string, value: string) => string | null
  shortcuts: QuestionnaireShortcutMode | null
  status: QuestionnaireItemStatus
  syncControlledSelection: (answerId: string, selected: boolean) => void
}

type QuestionnaireChoiceContextValue = {
  inputProps: React.ComponentProps<"input">
  inputRef: React.Ref<HTMLInputElement>
  state: QuestionnaireChoiceState
}

export type {
  AnswerControl,
  ItemRegistration,
  QuestionnaireChoiceContextValue,
  QuestionnaireChoiceDefinition,
  QuestionnaireChoiceInputProps,
  QuestionnaireChoiceLabelProps,
  QuestionnaireChoiceProps,
  QuestionnaireChoiceShortcutProps,
  QuestionnaireChoiceState,
  QuestionnaireChoicesProps,
  QuestionnaireContextValue,
  QuestionnaireDescriptionProps,
  QuestionnaireErrorProps,
  QuestionnaireInputProps,
  QuestionnaireInputState,
  QuestionnaireInputType,
  QuestionnaireItemContextValue,
  QuestionnaireItemDefinition,
  QuestionnaireItemProps,
  QuestionnaireItemState,
  QuestionnaireItemStatus,
  QuestionnaireNavigationProps,
  QuestionnaireNavigationState,
  QuestionnaireProgressProps,
  QuestionnaireRootProps,
  QuestionnaireRootState,
  QuestionnaireShortcutMode,
  QuestionnaireTitleProps,
}
