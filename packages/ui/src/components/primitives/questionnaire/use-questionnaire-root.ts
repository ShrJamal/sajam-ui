"use client"

import * as React from "react"
import { createCollection, getCollectionWarnings, getInitialItemName } from "./collection.js"
import {
  getShortcutFromKey,
  isAnswerFilled,
  isRadio,
  isTextEntry,
  sortByDocumentOrder,
} from "./dom.js"
import type {
  ItemRegistration,
  QuestionnaireContextValue,
  QuestionnaireRootProps,
  QuestionnaireRootState,
  QuestionnaireShortcutMode,
} from "./types.js"

// Owns the active item, navigation, validation on submit, and keyboard handling
// for a questionnaire form.
function useQuestionnaireRoot({
  defaultItem,
  item: controlledItem,
  items,
  noValidate,
  onItemChange,
  onReset,
  onSubmit,
  shortcuts: shortcutMode,
}: RootParameters) {
  const collection = React.useMemo(() => createCollection(items), [items])
  const [registrations, setRegistrations] = React.useState<ItemRegistration[]>([])
  const [uncontrolledItem, setUncontrolledItem] = React.useState(() =>
    getInitialItemName(collection, defaultItem),
  )
  const [form, setForm] = React.useState<HTMLFormElement | null>(null)
  // The item to focus once it becomes active.
  const pendingFocusRef = React.useRef<PendingFocus | null>(null)
  const controlled = controlledItem !== undefined
  const activeItemName = controlled ? controlledItem : uncontrolledItem
  const previousActiveItemNameRef = React.useRef(activeItemName)
  const shortcuts = shortcutMode ?? null
  const nativeValidation = noValidate === false

  const enabledRegistrations = React.useMemo(
    () => registrations.filter((registration) => !registration.disabled),
    [registrations],
  )
  const registrationByName = React.useMemo(
    () => new Map(enabledRegistrations.map((registration) => [registration.name, registration])),
    [enabledRegistrations],
  )
  // Defined items set the order when provided; otherwise rendered items do.
  const orderedItems = collection?.enabledItems ?? enabledRegistrations
  const currentIndex = orderedItems.findIndex((item) => item.name === activeItemName)
  const activeItem =
    currentIndex >= 0 && activeItemName ? (registrationByName.get(activeItemName) ?? null) : null
  const activeDefinition = activeItemName ? collection?.itemByName.get(activeItemName) : undefined
  const activeItemRequired =
    currentIndex < 0
      ? null
      : activeDefinition
        ? Boolean(activeDefinition.required)
        : (activeItem?.required ?? false)
  const activeItemStatus =
    currentIndex < 0 ? null : (activeItem?.status ?? (activeItemName ? "unanswered" : null))
  const total = orderedItems.length
  const current = currentIndex < 0 ? 0 : currentIndex + 1
  const first = total > 0 && currentIndex === 0
  const last = total > 0 && currentIndex === total - 1
  const nextItemName = orderedItems[currentIndex + 1]?.name
  const previousItemName = currentIndex > 0 ? orderedItems[currentIndex - 1]?.name : undefined

  useDevelopmentWarnings(collection, defaultItem, form, registrations, shortcuts)

  // Keep registrations in DOM order as items move.
  React.useLayoutEffect(() => {
    if (!form || typeof MutationObserver === "undefined") {
      return
    }

    const observer = new MutationObserver(() => setRegistrations(sortByDocumentOrder))

    observer.observe(form, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [form])

  const setItem = React.useCallback(
    (name: string, focusTarget: PendingFocus["target"] = "item") => {
      if (name === activeItemName) {
        return
      }

      pendingFocusRef.current = { name, target: focusTarget }

      if (!controlled) {
        setUncontrolledItem(name)
      }

      onItemChange?.(name)
    },
    [activeItemName, controlled, onItemChange],
  )

  // Falls back to the first item when the active one is missing, and moves focus
  // to a newly activated item.
  React.useLayoutEffect(() => {
    const firstItemName = orderedItems[0]?.name

    if (firstItemName === undefined) {
      return
    }

    if (currentIndex < 0) {
      if (!controlled && activeItemName === null) {
        setUncontrolledItem(firstItemName)
      } else {
        setItem(firstItemName)
      }

      return
    }

    const pendingFocus = pendingFocusRef.current
    const activeItemChanged = previousActiveItemNameRef.current !== activeItemName

    previousActiveItemNameRef.current = activeItemName

    if (pendingFocus?.name !== activeItemName) {
      // A controlled change from outside still moves focus to the new item.
      if (controlled && activeItemChanged) {
        pendingFocusRef.current = null
        activeItem?.focus()
      }

      return
    }

    pendingFocusRef.current = null

    if (pendingFocus.target === "invalid") {
      activeItem?.focusInvalid()
    } else {
      activeItem?.focus()
    }
  }, [activeItem, activeItemName, controlled, currentIndex, orderedItems, setItem])

  const registerItem = React.useCallback((registration: ItemRegistration) => {
    setRegistrations((current) =>
      sortByDocumentOrder([
        ...current.filter(
          (entry) => entry.element !== registration.element && entry.name !== registration.name,
        ),
        registration,
      ]),
    )

    return () => {
      setRegistrations((current) => current.filter((entry) => entry !== registration))
    }
  }, [])

  const goPrevious = React.useCallback(() => {
    if (previousItemName !== undefined) {
      setItem(previousItemName)
    }
  }, [previousItemName, setItem])

  // Validates the active item before any forward move, focusing the problem.
  const validateActive = React.useCallback(() => {
    if (!activeItem) {
      return false
    }

    if (!activeItem.validate()) {
      activeItem.focusInvalid()
      return false
    }

    return true
  }, [activeItem])

  const goNext = React.useCallback(() => {
    if (nextItemName !== undefined && validateActive()) {
      setItem(nextItemName)
    }
  }, [nextItemName, setItem, validateActive])

  const skipCurrent = React.useCallback(() => {
    if (!activeItem || activeItem.required) {
      return
    }

    activeItem.skip()

    if (nextItemName !== undefined) {
      setItem(nextItemName)
    } else {
      // Submit after the skipped state has rendered.
      queueMicrotask(() => form?.requestSubmit())
    }
  }, [activeItem, form, nextItemName, setItem])

  // Cmd/Ctrl+Enter and Enter on a filled answer: next item, or submit when last.
  function confirmCurrent() {
    if (!validateActive()) {
      return
    }

    if (last) {
      form?.requestSubmit()
    } else if (nextItemName !== undefined) {
      setItem(nextItemName)
    }
  }

  function handleReset(event: React.FormEvent<HTMLFormElement>) {
    onReset?.(event)

    if (event.defaultPrevented) {
      return
    }

    registrations.forEach((registration) => registration.reset())

    const resetItemName = collection
      ? getInitialItemName(collection, defaultItem)
      : (
          enabledRegistrations.find((registration) => registration.name === defaultItem) ??
          enabledRegistrations[0]
        )?.name

    if (resetItemName) {
      setItem(resetItemName)
    }
  }

  // Blocks submission until every item validates, then opens the first invalid one.
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    const submittedItems = collection
      ? collection.enabledItems.flatMap((item) => registrationByName.get(item.name) ?? [])
      : enabledRegistrations
    const firstInvalid = submittedItems.find((registration) => !registration.validate())

    if (!firstInvalid) {
      onSubmit?.(event)
      return
    }

    event.preventDefault()
    setItem(firstInvalid.name, "invalid")

    if (firstInvalid.name === activeItemName) {
      pendingFocusRef.current = null
      firstInvalid.focusInvalid()
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLFormElement>) {
    const target = event.target

    // keyCode 229 marks keys consumed by an input method editor.
    if (
      event.defaultPrevented ||
      event.nativeEvent.isComposing ||
      event.keyCode === 229 ||
      !activeItem ||
      !(target instanceof Element)
    ) {
      return
    }

    const modified = event.metaKey || event.ctrlKey || event.altKey

    if (
      event.key === "Enter" &&
      (event.metaKey || event.ctrlKey) &&
      !event.altKey &&
      !event.shiftKey
    ) {
      event.preventDefault()

      if (!event.repeat) {
        confirmCurrent()
      }

      return
    }

    if (modified) {
      return
    }

    if (
      (event.key === "ArrowUp" || event.key === "ArrowDown") &&
      activeItem.moveAnswerFocus(target, event.key === "ArrowDown" ? 1 : -1)
    ) {
      event.preventDefault()
      return
    }

    if (
      (event.key === "ArrowLeft" || event.key === "ArrowRight") &&
      !isTextEntry(target) &&
      !isRadio(target)
    ) {
      event.preventDefault()

      if (event.repeat) {
        return
      }

      if (event.key === "ArrowLeft") {
        goPrevious()
      } else if (activeItem.status !== "unanswered") {
        goNext()
      }

      return
    }

    if (event.key === "Enter") {
      const answer = activeItem.getAnswerByElement(target)

      if (!answer) {
        return
      }

      event.preventDefault()

      if (!event.repeat && isAnswerFilled(answer)) {
        confirmCurrent()
      }

      return
    }

    const shortcut =
      shortcuts && !isTextEntry(target) ? getShortcutFromKey(event.key, shortcuts) : null
    const answer = shortcut ? activeItem.getAnswerByShortcut(shortcut) : null

    if (!answer) {
      return
    }

    event.preventDefault()

    if (event.repeat) {
      return
    }

    answer.element.focus()

    if (answer.type === "choice") {
      answer.element.click()
    }
  }

  const itemDefinitionByName = collection?.itemByName ?? null
  const context = React.useMemo<QuestionnaireContextValue>(
    () => ({
      activeItemName,
      activeItemRequired,
      activeItemStatus,
      current,
      first,
      goNext,
      goPrevious,
      itemDefinitionByName,
      last,
      nativeValidation,
      registerItem,
      shortcuts,
      skipCurrent,
      total,
    }),
    [
      activeItemName,
      activeItemRequired,
      activeItemStatus,
      current,
      first,
      goNext,
      goPrevious,
      itemDefinitionByName,
      last,
      nativeValidation,
      registerItem,
      shortcuts,
      skipCurrent,
      total,
    ],
  )
  const state: QuestionnaireRootState = { current, first, last, total }

  return {
    context,
    rootProps: {
      "data-shortcuts": shortcuts ?? undefined,
      onKeyDown: handleKeyDown,
      onReset: handleReset,
      onSubmit: handleSubmit,
    },
    setForm,
    state,
  }
}

type RootParameters = Pick<
  QuestionnaireRootProps,
  | "defaultItem"
  | "item"
  | "items"
  | "noValidate"
  | "onItemChange"
  | "onReset"
  | "onSubmit"
  | "shortcuts"
>

type PendingFocus = {
  name: string
  target: "invalid" | "item"
}

// Logs each new collection warning once, after items have registered.
function useDevelopmentWarnings(
  collection: ReturnType<typeof createCollection>,
  defaultItem: string | undefined,
  form: HTMLFormElement | null,
  registrations: readonly ItemRegistration[],
  shortcuts: QuestionnaireShortcutMode | null,
) {
  const loggedRef = React.useRef(new Set<string>())

  React.useLayoutEffect(() => {
    if (process.env.NODE_ENV === "production") {
      return
    }

    if (!collection || !form) {
      loggedRef.current.clear()
      return
    }

    let cancelled = false

    queueMicrotask(() => {
      if (cancelled) {
        return
      }

      const warnings = new Set(
        getCollectionWarnings(collection, defaultItem, registrations, shortcuts),
      )

      warnings.forEach((warning) => {
        if (!loggedRef.current.has(warning)) {
          console.warn(`[Questionnaire] ${warning}`)
        }
      })
      loggedRef.current = warnings
    })

    return () => {
      cancelled = true
    }
  }, [collection, defaultItem, form, registrations, shortcuts])
}

export { useQuestionnaireRoot }
