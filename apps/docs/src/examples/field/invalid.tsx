"use client"

import { Field } from "@sajam/ui/field"
import { Input } from "@sajam/ui/input"
import { useState } from "react"

const takenUsernames = ["admin", "jamal", "sajam"]

// `invalid` applies an external check, such as a server response, and shows Field.Error.
export default function FieldInvalidExample() {
  const [username, setUsername] = useState("admin")
  const taken = takenUsernames.includes(username.trim().toLowerCase())

  return (
    <Field.Root
      invalid={taken}
      className="max-w-sm"
    >
      <Field.Label>Username</Field.Label>
      <Input
        value={username}
        onChange={function (event) {
          setUsername(event.target.value)
        }}
      />
      <Field.Error>This username is already taken.</Field.Error>
    </Field.Root>
  )
}
