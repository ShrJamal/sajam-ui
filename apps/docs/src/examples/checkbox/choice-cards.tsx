"use client"

import { Checkbox, CheckboxGroup } from "@sajam/ui/checkbox"
import { Field } from "@sajam/ui/field"

const reports = [
  {
    value: "usage",
    title: "Usage analytics",
    description: "Anonymous data about which features you use.",
  },
  {
    value: "crashes",
    title: "Crash reports",
    description: "Diagnostics sent when something breaks.",
  },
]

// A Field.Label that wraps a control and Field.Content renders as a card.
export default function CheckboxChoiceCardsExample() {
  return (
    <Field.Root className="w-full max-w-sm">
      <Field.Set
        className="gap-3"
        render={<CheckboxGroup defaultValue={["crashes"]} />}
      >
        <Field.Legend variant="label">Diagnostics</Field.Legend>
        {reports.map(function (report) {
          return (
            <Field.Item key={report.value}>
              <Field.Label>
                <Checkbox value={report.value} />
                <Field.Content>
                  <Field.Title>{report.title}</Field.Title>
                  <Field.Description>{report.description}</Field.Description>
                </Field.Content>
              </Field.Label>
            </Field.Item>
          )
        })}
      </Field.Set>
    </Field.Root>
  )
}
