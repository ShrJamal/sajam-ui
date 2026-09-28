"use client"

import { Label } from "@sajam/ui/label"
import { TagsInput } from "@sajam/ui/tags-input"
import { useId } from "react"

export default function TagsInputStatesExample() {
  const readOnlyId = useId()
  const disabledId = useId()

  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-2">
        <Label htmlFor={readOnlyId}>Permissions</Label>
        <TagsInput
          id={readOnlyId}
          defaultValue={["Verified", "Internal"]}
          readOnly
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={disabledId}>Archived labels</Label>
        <TagsInput
          id={disabledId}
          defaultValue={["Q3 launch", "Legacy"]}
          disabled
        />
      </div>
    </div>
  )
}
