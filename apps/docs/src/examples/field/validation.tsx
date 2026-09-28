"use client"

import { Field } from "@sajam/ui/field"
import { Input } from "@sajam/ui/input"

// Native constraints validate on blur; each Field.Error shows for its failing validity key.
export default function FieldValidationExample() {
  return (
    <Field.Root
      validationMode="onBlur"
      className="max-w-sm"
    >
      <Field.Label>Username</Field.Label>
      <Input
        required
        minLength={3}
        placeholder="At least three characters"
      />
      <Field.Description>Letters, numbers, and dashes.</Field.Description>
      <Field.Error match="valueMissing">Enter a username.</Field.Error>
      <Field.Error match="tooShort">Use at least three characters.</Field.Error>
    </Field.Root>
  )
}
