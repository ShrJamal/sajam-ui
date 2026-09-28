"use client"

import { Collapsible } from "@sajam/ui/collapsible"
import { Field } from "@sajam/ui/field"
import { Input } from "@sajam/ui/input"
import { ChevronDownIcon } from "lucide-react"

export default function CollapsibleFieldsetExample() {
  return (
    <Collapsible.Root className="w-full max-w-sm">
      <Field.Set className="rounded-xl border px-4 pb-4">
        <Field.Legend className="px-1">
          <Collapsible.Trigger className="group/trigger hover:bg-muted focus-visible:ring-ring/50 -mx-1 flex items-center gap-2 rounded-md px-1 py-0.5 outline-none focus-visible:ring-3">
            Advanced settings
            <ChevronDownIcon className="text-muted-foreground size-4 transition-transform group-data-panel-open/trigger:rotate-180" />
          </Collapsible.Trigger>
        </Field.Legend>
        <Collapsible.Content>
          <Field.Group className="gap-4">
            <Field.Root>
              <Field.Label>Proxy URL</Field.Label>
              <Input placeholder="https://proxy.example.com" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Retry attempts</Field.Label>
              <Input
                type="number"
                min={0}
                defaultValue={3}
              />
            </Field.Root>
          </Field.Group>
        </Collapsible.Content>
      </Field.Set>
    </Collapsible.Root>
  )
}
