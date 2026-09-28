"use client"

import { Button } from "@sajam/ui/button"
import { Field } from "@sajam/ui/field"
import { Input } from "@sajam/ui/input"
import { Popover } from "@sajam/ui/popover"

export default function RenamePopover() {
  return (
    <Popover.Root>
      <Popover.Trigger render={<Button variant="outline" />}>Rename project</Popover.Trigger>
      <Popover.Content>
        <Popover.Header>
          <Popover.Title>Rename project</Popover.Title>
          <Popover.Description>The new name is visible to everyone.</Popover.Description>
        </Popover.Header>
        <Field.Root>
          <Field.Label className="sr-only">Project name</Field.Label>
          <Input defaultValue="Website refresh" />
        </Field.Root>
        <Popover.Footer>
          <Popover.Close
            render={
              <Button
                variant="outline"
                size="sm"
              />
            }
          >
            Cancel
          </Popover.Close>
          <Popover.Close render={<Button size="sm" />}>Save</Popover.Close>
        </Popover.Footer>
      </Popover.Content>
    </Popover.Root>
  )
}
