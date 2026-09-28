"use client"

import { Field } from "@sajam/ui/field"
import { Input } from "@sajam/ui/input"

// Field.Label and Field.Description are linked to the input automatically.
export default function FieldExample() {
  return (
    <Field.Root className="max-w-sm">
      <Field.Label>Display name</Field.Label>
      <Input placeholder="Jamal" />
      <Field.Description>This is how you appear to your team.</Field.Description>
    </Field.Root>
  )
}
