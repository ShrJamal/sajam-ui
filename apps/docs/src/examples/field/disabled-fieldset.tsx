"use client"

import { Button } from "@sajam/ui/button"
import { Field } from "@sajam/ui/field"
import { Input } from "@sajam/ui/input"

// A disabled Field.Set disables every field and control inside it.
export default function DisabledFieldsetExample() {
  return (
    <Field.Set
      disabled
      className="w-full max-w-sm rounded-xl border px-4 pb-4"
    >
      <Field.Legend className="px-1">Single sign-on</Field.Legend>
      <Field.Description>Managed by your organization.</Field.Description>
      <Field.Group className="gap-4">
        <Field.Root>
          <Field.Label>Domain</Field.Label>
          <Input defaultValue="sajam.dev" />
        </Field.Root>
        <Field.Root>
          <Field.Label>Session timeout</Field.Label>
          <Input defaultValue="8 hours" />
        </Field.Root>
        <Button className="w-fit">Save changes</Button>
      </Field.Group>
    </Field.Set>
  )
}
