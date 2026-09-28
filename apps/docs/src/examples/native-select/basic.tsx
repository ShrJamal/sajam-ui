"use client"

import { Label } from "@sajam/ui/label"
import { NativeSelect } from "@sajam/ui/native-select"
import { useId } from "react"

export default function NativeSelectExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Project status</Label>
      <NativeSelect.Root
        id={id}
        name="status"
        defaultValue="active"
        className="w-full"
      >
        <NativeSelect.Option value="active">Active</NativeSelect.Option>
        <NativeSelect.Option value="paused">Paused</NativeSelect.Option>
        <NativeSelect.Option value="archived">Archived</NativeSelect.Option>
      </NativeSelect.Root>
    </div>
  )
}
