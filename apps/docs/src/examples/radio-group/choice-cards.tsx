"use client"

import { Field } from "@sajam/ui/field"
import { RadioGroup } from "@sajam/ui/radio-group"

const plans = [
  { value: "starter", title: "Starter", description: "For personal projects", price: "$0" },
  { value: "team", title: "Team", description: "For growing teams", price: "$24" },
  {
    value: "business",
    title: "Business",
    description: "Advanced security and support",
    price: "$64",
  },
]

// A Field.Label that wraps a control and Field.Content renders as a card.
export default function RadioGroupChoiceCardsExample() {
  return (
    <Field.Root className="w-full max-w-sm">
      <Field.Set
        className="gap-3"
        render={<RadioGroup.Root defaultValue="team" />}
      >
        <Field.Legend variant="label">Plan</Field.Legend>
        {plans.map(function (plan) {
          return (
            <Field.Item key={plan.value}>
              <Field.Label>
                <RadioGroup.Item value={plan.value} />
                <Field.Content>
                  <Field.Title>{plan.title}</Field.Title>
                  <Field.Description>{plan.description}</Field.Description>
                </Field.Content>
                <span className="text-sm font-semibold tabular-nums">{plan.price}</span>
              </Field.Label>
            </Field.Item>
          )
        })}
      </Field.Set>
    </Field.Root>
  )
}
