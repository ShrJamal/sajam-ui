"use client"

import { Questionnaire } from "@sajam/ui/questionnaire"
import { useState } from "react"

const items = [{ name: "goal", required: true }]

export default function QuestionnaireFreeTextExample() {
  const [goal, setGoal] = useState<string | null>(null)

  return (
    <div className="w-full max-w-sm">
      <Questionnaire.Root
        items={items}
        onSubmit={function (event) {
          event.preventDefault()
          setGoal(String(new FormData(event.currentTarget).get("goal")))
        }}
      >
        <Questionnaire.Item
          name="goal"
          required
        >
          <Questionnaire.Title>What should this project accomplish?</Questionnaire.Title>
          <Questionnaire.Description>
            Describe the main outcome in one sentence.
          </Questionnaire.Description>
          <Questionnaire.Input
            type="text"
            placeholder="Launch a reusable design system"
          />
          <Questionnaire.Error>Please enter a project goal.</Questionnaire.Error>
        </Questionnaire.Item>
        <Questionnaire.Actions>
          <Questionnaire.Submit>Save response</Questionnaire.Submit>
        </Questionnaire.Actions>
      </Questionnaire.Root>
      {goal ? (
        <p
          role="status"
          className="text-muted-foreground mt-4 text-sm"
        >
          Saved: {goal}
        </p>
      ) : null}
    </div>
  )
}
