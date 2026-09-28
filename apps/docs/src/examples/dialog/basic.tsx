"use client"

import { Button } from "@sajam/ui/button"
import { Dialog } from "@sajam/ui/dialog"
import { Field } from "@sajam/ui/field"
import { Input } from "@sajam/ui/input"

export default function EditProfileDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="outline" />}>Edit profile</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>Update the details your teammates see.</Dialog.Description>
        </Dialog.Header>
        <Field.Group className="gap-4">
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input defaultValue="Amina Noor" />
          </Field.Root>
          <Field.Root>
            <Field.Label>Role</Field.Label>
            <Input defaultValue="Product designer" />
          </Field.Root>
        </Field.Group>
        <Dialog.Footer>
          <Dialog.Close render={<Button variant="outline" />}>Cancel</Dialog.Close>
          <Dialog.Close render={<Button />}>Save changes</Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}
