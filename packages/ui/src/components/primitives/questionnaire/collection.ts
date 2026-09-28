import { getShortcutKeys } from "./dom.js"
import type {
  ItemRegistration,
  QuestionnaireItemDefinition,
  QuestionnaireShortcutMode,
} from "./types.js"

type Collection = {
  enabledItems: readonly QuestionnaireItemDefinition[]
  itemByName: ReadonlyMap<string, QuestionnaireItemDefinition>
  items: readonly QuestionnaireItemDefinition[]
}

function createCollection(items: readonly QuestionnaireItemDefinition[] | undefined) {
  if (!items) {
    return null
  }

  return {
    enabledItems: items.filter((item) => !item.disabled),
    itemByName: new Map(items.map((item) => [item.name, item])),
    items,
  } satisfies Collection
}

// The defaultItem when it names an enabled item, otherwise the first enabled item.
function getInitialItemName(collection: Collection | null, defaultItem: string | undefined) {
  if (!collection) {
    return defaultItem ?? null
  }

  const definition = defaultItem ? collection.itemByName.get(defaultItem) : undefined

  return definition && !definition.disabled
    ? definition.name
    : (collection.enabledItems[0]?.name ?? null)
}

// Assigns shortcut keys to a defined item's enabled choices in declared order.
function getShortcutsByChoiceValue(
  item: QuestionnaireItemDefinition | undefined,
  mode: QuestionnaireShortcutMode | null,
) {
  const keys = getShortcutKeys(mode)
  const enabledChoices = (item?.choices ?? []).filter((choice) => !choice.disabled)

  return new Map(
    enabledChoices.slice(0, keys.length).map((choice, index) => [choice.value, keys[index]]),
  )
}

// Development warnings for definitions that disagree with themselves or with
// the rendered items.
function getCollectionWarnings(
  collection: Collection,
  defaultItem: string | undefined,
  registrations: readonly ItemRegistration[],
  shortcuts: QuestionnaireShortcutMode | null,
) {
  return [
    ...getDefinitionWarnings(collection, defaultItem),
    ...getRegistrationWarnings(collection, registrations, shortcuts),
  ]
}

function getDefinitionWarnings(collection: Collection, defaultItem: string | undefined) {
  const warnings: string[] = []
  const names = new Set<string>()

  for (const item of collection.items) {
    if (names.has(item.name)) {
      warnings.push(`Item name "${item.name}" is defined more than once.`)
    }

    names.add(item.name)

    const values = new Set<string>()

    for (const choice of item.choices ?? []) {
      if (values.has(choice.value)) {
        warnings.push(
          `Choice value "${choice.value}" is defined more than once in item "${item.name}".`,
        )
      }

      values.add(choice.value)
    }
  }

  const defaultDefinition = defaultItem ? collection.itemByName.get(defaultItem) : undefined

  if (defaultItem && (!defaultDefinition || defaultDefinition.disabled)) {
    warnings.push(
      `defaultItem "${defaultItem}" does not identify an enabled item. The first enabled item will be used instead.`,
    )
  }

  return warnings
}

function getRegistrationWarnings(
  collection: Collection,
  registrations: readonly ItemRegistration[],
  shortcuts: QuestionnaireShortcutMode | null,
) {
  const warnings: string[] = []
  const registrationByName = new Map(registrations.map((item) => [item.name, item]))

  for (const definition of collection.items) {
    const registration = registrationByName.get(definition.name)
    const name = definition.name

    if (!registration) {
      if (!definition.disabled) {
        warnings.push(`Item "${name}" is defined but has no rendered Questionnaire.Item.`)
      }

      continue
    }

    for (const key of ["disabled", "required"] as const) {
      if (registration[key] !== Boolean(definition[key])) {
        warnings.push(
          `Item "${name}" has different ${key} values in Root.items and Questionnaire.Item.`,
        )
      }
    }

    const definedChoices = definition.choices ?? []
    const renderedChoiceByValue = new Map(
      registration.choices.map((choice) => [choice.value, choice]),
    )

    for (const choice of definedChoices) {
      const rendered = renderedChoiceByValue.get(choice.value)

      if (!rendered) {
        warnings.push(
          `Choice "${choice.value}" is defined for item "${name}" but has no rendered Questionnaire.Choice.`,
        )
      } else if (rendered.disabled !== Boolean(choice.disabled)) {
        warnings.push(
          `Choice "${choice.value}" in item "${name}" has different disabled values in Root.items and Questionnaire.Choice.`,
        )
      }
    }

    if (shortcuts) {
      warnings.push(...getShortcutWarnings(name, definedChoices, registration.choices))
    }
  }

  for (const registration of registrations) {
    if (!registration.disabled && !collection.itemByName.has(registration.name)) {
      warnings.push(
        `Rendered item "${registration.name}" is missing from Root.items and is excluded from the questionnaire collection.`,
      )
    }
  }

  return warnings
}

// Shortcuts follow the declared order, so rendered choices must match it.
function getShortcutWarnings(
  name: string,
  definedChoices: NonNullable<QuestionnaireItemDefinition["choices"]>,
  renderedChoices: ItemRegistration["choices"],
) {
  const warnings: string[] = []
  const definedValues = new Set(definedChoices.map((choice) => choice.value))

  for (const choice of renderedChoices) {
    if (!definedValues.has(choice.value)) {
      warnings.push(
        `Rendered choice "${choice.value}" in item "${name}" is missing from Root.items and will not receive a shortcut.`,
      )
    }
  }

  const definedOrder = definedChoices
    .filter((choice) => !choice.disabled)
    .map((choice) => choice.value)
  const renderedOrder = renderedChoices
    .filter((choice) => !choice.disabled)
    .map((choice) => choice.value)
  const sameChoices =
    definedOrder.length > 0 &&
    definedOrder.length === renderedOrder.length &&
    definedOrder.every((value) => renderedOrder.includes(value))

  if (sameChoices && definedOrder.some((value, index) => value !== renderedOrder[index])) {
    warnings.push(
      `Choice order for item "${name}" differs between Root.items and the rendered Questionnaire.Choice elements.`,
    )
  }

  return warnings
}

export { createCollection, getCollectionWarnings, getInitialItemName, getShortcutsByChoiceValue }
