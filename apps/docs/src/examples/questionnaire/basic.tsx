"use client"

import { Questionnaire } from "@sajam/ui/questionnaire"
import { useState } from "react"

// `items` lists each question up front so the first one renders before hydration.
const items = [{ name: "project", required: true }]

export default function QuestionnaireExample() {
  const [answer, setAnswer] = useState<string | null>(null)

  return (
    <div className="w-full max-w-sm">
      <Questionnaire.Root
        items={items}
        onSubmit={function (event) {
          event.preventDefault()
          setAnswer(String(new FormData(event.currentTarget).get("project")))
        }}
      >
        <Questionnaire.Item
          name="project"
          required
        >
          <Questionnaire.Title>What are you building?</Questionnaire.Title>
          <Questionnaire.Description>
            Choose the best fit for your next project.
          </Questionnaire.Description>
          <Questionnaire.Choices>
            <Questionnaire.Choice value="app">An application</Questionnaire.Choice>
            <Questionnaire.Choice value="website">A website</Questionnaire.Choice>
          </Questionnaire.Choices>
        </Questionnaire.Item>
        <Questionnaire.Actions>
          <Questionnaire.Submit />
        </Questionnaire.Actions>
      </Questionnaire.Root>
      {answer ? (
        <p
          role="status"
          className="text-muted-foreground mt-4 text-sm"
        >
          Form value: project={answer}
        </p>
      ) : null}
    </div>
  )
}
