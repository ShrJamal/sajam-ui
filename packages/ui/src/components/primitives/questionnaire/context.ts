"use client"

import * as React from "react"
import type {
  QuestionnaireChoiceContextValue,
  QuestionnaireContextValue,
  QuestionnaireItemContextValue,
} from "./types.js"

const QuestionnaireContext = React.createContext<QuestionnaireContextValue | null>(null)
const QuestionnaireItemContext = React.createContext<QuestionnaireItemContextValue | null>(null)
const QuestionnaireChoiceContext = React.createContext<QuestionnaireChoiceContextValue | null>(null)

function useQuestionnaireContext(part: string) {
  return useRequiredContext(QuestionnaireContext, part, "Questionnaire.Root")
}

function useQuestionnaireItemContext(part: string) {
  return useRequiredContext(QuestionnaireItemContext, part, "Questionnaire.Item")
}

function useQuestionnaireChoiceContext(part: string) {
  return useRequiredContext(QuestionnaireChoiceContext, part, "Questionnaire.Choice")
}

function useRequiredContext<T>(context: React.Context<T | null>, part: string, parent: string) {
  const value = React.useContext(context)

  if (!value) {
    throw new Error(`${part} must be used within a ${parent} component.`)
  }

  return value
}

export {
  QuestionnaireChoiceContext,
  QuestionnaireContext,
  QuestionnaireItemContext,
  useQuestionnaireChoiceContext,
  useQuestionnaireContext,
  useQuestionnaireItemContext,
}
