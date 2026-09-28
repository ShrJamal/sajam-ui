"use client"

import { Button } from "@sajam/ui/button"
import { Field } from "@sajam/ui/field"
import { Input } from "@sajam/ui/input"
import { Sheet } from "@sajam/ui/sheet"
import { Switch } from "@sajam/ui/switch"
import { Textarea } from "@sajam/ui/textarea"

export default function ProjectSettingsSheet() {
  return (
    <Sheet.Root>
      <Sheet.Trigger render={<Button variant="outline" />}>Project settings</Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>Project settings</Sheet.Title>
          <Sheet.Description>Changes apply to everyone in the workspace.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Body>
          <Field.Group className="gap-5">
            <Field.Root>
              <Field.Label>Name</Field.Label>
              <Input defaultValue="Website refresh" />
            </Field.Root>
            <Field.Root>
              <Field.Label>URL slug</Field.Label>
              <Input defaultValue="website-refresh" />
              <Field.Description>sajam.dev/projects/website-refresh</Field.Description>
            </Field.Root>
            <Field.Root>
              <Field.Label>Description</Field.Label>
              <Textarea
                rows={3}
                defaultValue="Redesign the marketing site and move it to the new component library."
              />
            </Field.Root>
            <Field.Root orientation="horizontal">
              <Field.Content>
                <Field.Label>Public project</Field.Label>
                <Field.Description>Anyone with the link can view it.</Field.Description>
              </Field.Content>
              <Switch />
            </Field.Root>
          </Field.Group>
        </Sheet.Body>
        <Sheet.Footer>
          <Sheet.Close render={<Button variant="outline" />}>Cancel</Sheet.Close>
          <Sheet.Close render={<Button />}>Save changes</Sheet.Close>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  )
}
