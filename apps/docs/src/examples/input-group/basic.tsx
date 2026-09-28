"use client"

import { InputGroup } from "@sajam/ui/input-group"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

export default function InputGroupBasicExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor={id}>Workspace URL</Label>
      <InputGroup.Root>
        <InputGroup.Addon>
          <InputGroup.Text>https://</InputGroup.Text>
        </InputGroup.Addon>
        <InputGroup.Input
          id={id}
          placeholder="acme"
        />
        <InputGroup.Addon align="inline-end">
          <InputGroup.Text>.sajam.app</InputGroup.Text>
        </InputGroup.Addon>
      </InputGroup.Root>
    </div>
  )
}
