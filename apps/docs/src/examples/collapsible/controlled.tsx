"use client"

import { Button } from "@sajam/ui/button"
import { Collapsible } from "@sajam/ui/collapsible"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"

export default function CollapsibleControlledExample() {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="w-full max-w-xs"
    >
      <Collapsible.Trigger
        render={
          <Button
            variant="outline"
            className="w-full justify-between"
          />
        }
      >
        {open ? "Hide" : "Show"} deployment details
        <ChevronDownIcon className="transition-transform in-data-panel-open:rotate-180" />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 rounded-lg border p-3 text-sm">
          <dt className="text-muted-foreground">Release</dt>
          <dd>1.5.0</dd>
          <dt className="text-muted-foreground">Region</dt>
          <dd>Europe (Frankfurt)</dd>
          <dt className="text-muted-foreground">Status</dt>
          <dd>Healthy</dd>
        </dl>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
