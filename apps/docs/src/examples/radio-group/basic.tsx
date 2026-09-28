"use client"

import { Field } from "@sajam/ui/field"
import { RadioGroup } from "@sajam/ui/radio-group"

const densities = [
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
  { value: "dense", label: "Dense" },
]

export default function RadioGroupExample() {
  return (
    <Field.Root className="max-w-sm">
      <Field.Set
        className="gap-3"
        render={<RadioGroup.Root defaultValue="comfortable" />}
      >
        <Field.Legend variant="label">Display density</Field.Legend>
        {densities.map(function (density) {
          return (
            <Field.Item key={density.value}>
              <Field.Label className="font-normal">
                <RadioGroup.Item value={density.value} />
                {density.label}
              </Field.Label>
            </Field.Item>
          )
        })}
      </Field.Set>
    </Field.Root>
  )
}
