"use client"

import { Field } from "@sajam/ui/field"
import { Inplace } from "@sajam/ui/inplace"
import { Input } from "@sajam/ui/input"
import { PencilIcon } from "lucide-react"
import { useState } from "react"

const emailPattern = /^\S+@\S+\.\S+$/

// Preventing the Save click keeps the editor open until the draft is valid.
export default function InplaceValidationExample() {
  const [email, setEmail] = useState("billing@sajam.dev")
  const [draft, setDraft] = useState(email)
  const [showError, setShowError] = useState(false)
  const invalid = showError && !emailPattern.test(draft)

  return (
    <Inplace.Root
      onSave={function () {
        setEmail(draft)
      }}
      onCancel={function () {
        setDraft(email)
        setShowError(false)
      }}
      className="w-full max-w-sm"
    >
      <Inplace.Display>
        <span className="sr-only">Edit billing email: </span>
        <span className="truncate">{email}</span>
        <PencilIcon className="text-muted-foreground ml-auto size-3.5 shrink-0" />
      </Inplace.Display>
      <Inplace.Content>
        <Field.Root invalid={invalid}>
          <Field.Label>Billing email</Field.Label>
          <Input
            type="email"
            value={draft}
            onChange={function (event) {
              setDraft(event.target.value)
            }}
          />
          <Field.Error>Enter a valid email address.</Field.Error>
        </Field.Root>
        <div className="flex justify-end gap-2">
          <Inplace.Cancel size="sm">Cancel</Inplace.Cancel>
          <Inplace.Save
            size="sm"
            onClick={function (event) {
              if (emailPattern.test(draft)) return
              event.preventDefault()
              setShowError(true)
            }}
          >
            Save
          </Inplace.Save>
        </div>
      </Inplace.Content>
    </Inplace.Root>
  )
}
