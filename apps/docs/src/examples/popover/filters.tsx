"use client"

import { Button } from "@sajam/ui/button"
import { Checkbox } from "@sajam/ui/checkbox"
import { Label } from "@sajam/ui/label"
import { Popover } from "@sajam/ui/popover"
import { ListFilterIcon } from "lucide-react"
import { useId, useState } from "react"

export default function FiltersPopover() {
  const ownedId = useId()
  const archivedId = useId()
  const [ownedByMe, setOwnedByMe] = useState(true)
  const [showArchived, setShowArchived] = useState(false)
  const activeCount = Number(ownedByMe) + Number(showArchived)

  return (
    <Popover.Root>
      <Popover.Trigger render={<Button variant="outline" />}>
        <ListFilterIcon />
        Filters{activeCount > 0 ? ` (${activeCount})` : ""}
      </Popover.Trigger>
      <Popover.Content className="w-60">
        <Popover.Header>
          <Popover.Title>Project filters</Popover.Title>
          <Popover.Description>Choose which projects appear in the list.</Popover.Description>
        </Popover.Header>
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id={ownedId}
              checked={ownedByMe}
              onCheckedChange={setOwnedByMe}
            />
            <Label htmlFor={ownedId}>Owned by me</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id={archivedId}
              checked={showArchived}
              onCheckedChange={setShowArchived}
            />
            <Label htmlFor={archivedId}>Include archived</Label>
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  )
}
