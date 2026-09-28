"use client"

import { Inplace } from "@sajam/ui/inplace"
import { Label } from "@sajam/ui/label"
import { Textarea } from "@sajam/ui/textarea"
import { LockIcon, PencilIcon } from "lucide-react"
import { useId, useState } from "react"

export default function InplaceProfileExample() {
  const id = useId()
  const [bio, setBio] = useState("Designing calm interfaces for busy teams.")
  const [draft, setDraft] = useState(bio)

  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1">
        <p className="text-muted-foreground px-3 text-xs font-medium">Bio</p>
        <Inplace.Root
          onSave={function () {
            setBio(draft)
          }}
          onCancel={function () {
            setDraft(bio)
          }}
        >
          <Inplace.Display className="items-start">
            <span className="sr-only">Edit bio: </span>
            <span>{bio}</span>
            <PencilIcon className="text-muted-foreground mt-0.5 ml-auto size-3.5 shrink-0" />
          </Inplace.Display>
          <Inplace.Content>
            <div className="grid gap-2">
              <Label htmlFor={id}>Bio</Label>
              <Textarea
                id={id}
                rows={3}
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
      </div>
      <div className="grid gap-1">
        <p className="text-muted-foreground px-3 text-xs font-medium">Workspace ID</p>
        <Inplace.Root disabled>
          <Inplace.Display>
            <span className="font-mono">org_sajam</span>
            <LockIcon className="text-muted-foreground ml-auto size-3.5" />
            <span className="sr-only">Locked by your organization</span>
          </Inplace.Display>
        </Inplace.Root>
      </div>
    </div>
  )
}
