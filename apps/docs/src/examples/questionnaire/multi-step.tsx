"use client"

import { Questionnaire } from "@sajam/ui/questionnaire"
import { useState } from "react"

// With `shortcuts`, list each item's choices in `items` so number keys map to them in order.
const items = [
  {
    name: "project",
    required: true,
    choices: [{ value: "app" }, { value: "website" }],
  },
  {
    name: "timeline",
    required: true,
    choices: [{ value: "month" }, { value: "quarter" }],
  },
]

export default function QuestionnaireMultiStepExample() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="w-full max-w-sm">
      <Questionnaire.Root
        items={items}
        shortcuts="numbers"
        onSubmit={function (event) {
          event.preventDefault()
          setSubmitted(true)
        }}
      >
        <Questionnaire.Progress />
        <Questionnaire.Item
          name="project"
          required
        >
          <Questionnaire.Title>What are you building?</Questionnaire.Title>
          <Questionnaire.Choices>
            <Questionnaire.Choice value="app">An application</Questionnaire.Choice>
            <Questionnaire.Choice value="website">A website</Questionnaire.Choice>
          </Questionnaire.Choices>
        </Questionnaire.Item>
        <Questionnaire.Item
          name="timeline"
          required
        >
          <Questionnaire.Title>What is your timeline?</Questionnaire.Title>
          <Questionnaire.Choices>
            <Questionnaire.Choice value="month">Within a month</Questionnaire.Choice>
            <Questionnaire.Choice value="quarter">This quarter</Questionnaire.Choice>
          </Questionnaire.Choices>
        </Questionnaire.Item>
        <Questionnaire.Actions>
          <Questionnaire.Previous />
          <Questionnaire.Next />
          <Questionnaire.Submit />
        </Questionnaire.Actions>
      </Questionnaire.Root>
      {submitted ? (
        <p
          role="status"
          className="text-muted-foreground mt-4 text-sm"
        >
          Thanks, your answers were recorded.
        </p>
      ) : null}
    </div>
  )
}
