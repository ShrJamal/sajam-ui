"use client"

import { Label } from "@sajam/ui/label"
import { NativeSelect } from "@sajam/ui/native-select"
import { useId } from "react"

export default function NativeSelectStatesExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-xs gap-5">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-disabled`}>Plan</Label>
        <NativeSelect.Root
          id={`${id}-disabled`}
          defaultValue="free"
          disabled
          className="w-full"
        >
          <NativeSelect.Option value="free">Free</NativeSelect.Option>
          <NativeSelect.Option value="pro">Pro</NativeSelect.Option>
        </NativeSelect.Root>
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-invalid`}>Role</Label>
        <NativeSelect.Root
          id={`${id}-invalid`}
          defaultValue=""
          required
          aria-invalid
          aria-describedby={`${id}-error`}
          className="w-full"
        >
          <NativeSelect.Option
            value=""
            disabled
          >
            Select a role
          </NativeSelect.Option>
          <NativeSelect.Option value="admin">Administrator</NativeSelect.Option>
          <NativeSelect.Option value="member">Member</NativeSelect.Option>
        </NativeSelect.Root>
        <p
          id={`${id}-error`}
          className="text-destructive text-xs"
        >
          Choose a role before sending the invite.
        </p>
      </div>
    </div>
  )
}
