"use client"

import { Button } from "@sajam/ui/button"
import { Field } from "@sajam/ui/field"
import { Input } from "@sajam/ui/input"
import { Sheet } from "@sajam/ui/sheet"
import { Textarea } from "@sajam/ui/textarea"

export default function FullScreenSheet() {
  return (
    <Sheet.Root>
      <Sheet.Trigger render={<Button variant="outline" />}>Compose update</Sheet.Trigger>
      <Sheet.Content className="inset-0 h-dvh w-screen max-w-none border-0 sm:max-w-none">
        <Sheet.Header>
          <Sheet.Title>Compose update</Sheet.Title>
          <Sheet.Description>A full-screen sheet leaves room for a focused task.</Sheet.Description>
        </Sheet.Header>
        <Sheet.Body>
          <Field.Group className="mx-auto w-full max-w-2xl gap-5 py-6">
            <Field.Root>
              <Field.Label>Title</Field.Label>
              <Input placeholder="What changed this week?" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Update</Field.Label>
              <Textarea
                rows={12}
                placeholder="Share progress, decisions, and anything the team should know."
              />
            </Field.Root>
          </Field.Group>
        </Sheet.Body>
        <Sheet.Footer>
          <Sheet.Close render={<Button variant="outline" />}>Discard</Sheet.Close>
          <Sheet.Close render={<Button />}>Publish</Sheet.Close>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  )
}
