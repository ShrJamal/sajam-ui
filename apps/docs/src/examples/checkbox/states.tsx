"use client"

import { Checkbox } from "@sajam/ui/checkbox"
import { Field } from "@sajam/ui/field"

export default function CheckboxStatesExample() {
  return (
    <Field.Group className="max-w-sm gap-4">
      <Field.Root
        orientation="horizontal"
        disabled
      >
        <Checkbox />
        <Field.Label>Disabled</Field.Label>
      </Field.Root>
      <Field.Root
        orientation="horizontal"
        disabled
      >
        <Checkbox defaultChecked />
        <Field.Label>Disabled and checked</Field.Label>
      </Field.Root>
      <Field.Root
        orientation="horizontal"
        invalid
      >
        <Checkbox />
        <Field.Content>
          <Field.Label>Accept the terms</Field.Label>
          <Field.Error>You must accept the terms to continue.</Field.Error>
        </Field.Content>
      </Field.Root>
    </Field.Group>
  )
}
