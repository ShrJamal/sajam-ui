"use client"

import { Inplace } from "@sajam/ui/inplace"
import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { PencilIcon } from "lucide-react"
import { useId, useState } from "react"

// Save commits the draft; Cancel or Escape restores the saved value.
export default function InplaceExample() {
  const id = useId()
  const [name, setName] = useState("Quarterly planning")
  const [draft, setDraft] = useState(name)

  return (
    <Inplace.Root
      onSave={function () {
        setName(draft)
      }}
      onCancel={function () {
        setDraft(name)
      }}
      className="w-full max-w-sm"
    >
      <Inplace.Display>
        <span className="sr-only">Edit project name: </span>
        <span className="font-medium">{name}</span>
        <PencilIcon className="text-muted-foreground ml-auto size-3.5" />
      </Inplace.Display>
      <Inplace.Content>
        <div className="grid gap-2">
          <Label htmlFor={id}>Project name</Label>
          <Input
            id={id}
            value={draft}
            onChange={function (event) {
              setDraft(event.target.value)
            }}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Inplace.Cancel size="sm">Cancel</Inplace.Cancel>
          <Inplace.Save size="sm">Save</Inplace.Save>
        </div>
      </Inplace.Content>
    </Inplace.Root>
  )
}
