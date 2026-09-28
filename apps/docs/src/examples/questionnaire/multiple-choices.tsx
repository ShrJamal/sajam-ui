"use client"

import { Questionnaire } from "@sajam/ui/questionnaire"
import { useState } from "react"

const items = [{ name: "features" }]

export default function QuestionnaireMultipleChoicesExample() {
  const [features, setFeatures] = useState<string[] | null>(null)

  return (
    <div className="w-full max-w-sm">
      <Questionnaire.Root
        items={items}
        onSubmit={function (event) {
          event.preventDefault()
          setFeatures(new FormData(event.currentTarget).getAll("features").map(String))
        }}
      >
        <Questionnaire.Item
          name="features"
          multiple
        >
          <Questionnaire.Title>Which features matter?</Questionnaire.Title>
          <Questionnaire.Description>Select every option that applies.</Questionnaire.Description>
          <Questionnaire.Choices>
            <Questionnaire.Choice value="analytics">Analytics</Questionnaire.Choice>
            <Questionnaire.Choice value="billing">Billing</Questionnaire.Choice>
            <Questionnaire.Choice value="teams">Team management</Questionnaire.Choice>
          </Questionnaire.Choices>
        </Questionnaire.Item>
        <Questionnaire.Actions>
          <Questionnaire.Submit />
        </Questionnaire.Actions>
      </Questionnaire.Root>
      {features ? (
        <p
          role="status"
          className="text-muted-foreground mt-4 text-sm"
        >
          {features.length ? `Selected: ${features.join(", ")}` : "No features selected"}
        </p>
      ) : null}
    </div>
  )
}
