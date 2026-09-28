"use client"

import { Checkbox } from "@sajam/ui/checkbox"
import { Field } from "@sajam/ui/field"

export default function FieldHorizontalExample() {
  return (
    <Field.Root
      orientation="horizontal"
      className="max-w-sm"
    >
      <Checkbox defaultChecked />
      <Field.Content>
        <Field.Label>Share usage data</Field.Label>
        <Field.Description>
          Send anonymous reports that help us improve the product.
        </Field.Description>
      </Field.Content>
    </Field.Root>
  )
}
