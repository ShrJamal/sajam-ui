"use client"

import { Label } from "@sajam/ui/label"
import { NativeSelect } from "@sajam/ui/native-select"
import { useId } from "react"

export default function NativeSelectSizesExample() {
  const id = useId()

  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="grid gap-2">
        <Label htmlFor={`${id}-sm`}>Small</Label>
        <NativeSelect.Root
          id={`${id}-sm`}
          size="sm"
          defaultValue="comfortable"
        >
          <NativeSelect.Option value="compact">Compact</NativeSelect.Option>
          <NativeSelect.Option value="comfortable">Comfortable</NativeSelect.Option>
        </NativeSelect.Root>
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${id}-default`}>Default</Label>
        <NativeSelect.Root
          id={`${id}-default`}
          defaultValue="comfortable"
        >
          <NativeSelect.Option value="compact">Compact</NativeSelect.Option>
          <NativeSelect.Option value="comfortable">Comfortable</NativeSelect.Option>
        </NativeSelect.Root>
      </div>
    </div>
  )
}
