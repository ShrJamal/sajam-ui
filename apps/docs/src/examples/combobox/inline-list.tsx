"use client"

import { Combobox } from "@sajam/ui/combobox"
import { Label } from "@sajam/ui/label"
import { useId, useState } from "react"

const permissions = [
  "View projects",
  "Edit projects",
  "Delete projects",
  "Invite members",
  "Manage billing",
  "Export data",
  "View audit log",
]

export default function ComboboxInlineListExample() {
  const id = useId()
  const [selected, setSelected] = useState<string[]>(["View projects", "Edit projects"])

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Permissions</Label>
      <Combobox.Root
        items={permissions}
        multiple
        inline
        open
        value={selected}
        onValueChange={setSelected}
      >
        <div className="grid gap-1 rounded-lg border p-1">
          <Combobox.Input
            id={id}
            placeholder="Filter permissions"
            showTrigger={false}
            className="w-full"
          />
          <Combobox.Empty>No permissions found.</Combobox.Empty>
          <Combobox.List className="max-h-52">
            {function (permission: string) {
              return (
                <Combobox.Item
                  key={permission}
                  value={permission}
                >
                  {permission}
                </Combobox.Item>
              )
            }}
          </Combobox.List>
        </div>
      </Combobox.Root>
      <p className="text-muted-foreground text-xs">{selected.length} permissions granted</p>
    </div>
  )
}
