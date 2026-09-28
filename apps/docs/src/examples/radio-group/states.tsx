"use client"

import { Field } from "@sajam/ui/field"
import { RadioGroup } from "@sajam/ui/radio-group"

export default function RadioGroupStatesExample() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <Field.Root>
        <Field.Set
          className="gap-3"
          render={<RadioGroup.Root defaultValue="team" />}
        >
          <Field.Legend variant="label">Plan</Field.Legend>
          <Field.Item>
            <Field.Label className="font-normal">
              <RadioGroup.Item value="team" />
              Team
            </Field.Label>
          </Field.Item>
          <Field.Item disabled>
            <Field.Label className="font-normal">
              <RadioGroup.Item value="enterprise" />
              Enterprise (contact sales)
            </Field.Label>
          </Field.Item>
        </Field.Set>
      </Field.Root>
      <Field.Root invalid>
        <Field.Set
          className="gap-3"
          render={<RadioGroup.Root />}
        >
          <Field.Legend variant="label">Role</Field.Legend>
          <Field.Item>
            <Field.Label className="font-normal">
              <RadioGroup.Item value="viewer" />
              Viewer
            </Field.Label>
          </Field.Item>
          <Field.Item>
            <Field.Label className="font-normal">
              <RadioGroup.Item value="editor" />
              Editor
            </Field.Label>
          </Field.Item>
        </Field.Set>
        <Field.Error>Select a role to continue.</Field.Error>
      </Field.Root>
    </div>
  )
}
