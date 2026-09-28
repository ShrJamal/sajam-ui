"use client"

import { Field } from "@sajam/ui/field"
import { Input } from "@sajam/ui/input"

export default function FieldsetExample() {
  return (
    <Field.Set className="w-full max-w-sm rounded-xl border px-4 pb-4">
      <Field.Legend className="px-1">Billing address</Field.Legend>
      <Field.Description>Printed on invoices and receipts.</Field.Description>
      <Field.Group className="gap-4">
        <Field.Root>
          <Field.Label>Street</Field.Label>
          <Input
            autoComplete="street-address"
            defaultValue="12 Rue Riad Zitoun"
          />
        </Field.Root>
        <div className="grid grid-cols-2 gap-3">
          <Field.Root>
            <Field.Label>City</Field.Label>
            <Input
              autoComplete="address-level2"
              defaultValue="Marrakesh"
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Postal code</Field.Label>
            <Input
              autoComplete="postal-code"
              defaultValue="40000"
            />
          </Field.Root>
        </div>
      </Field.Group>
    </Field.Set>
  )
}
