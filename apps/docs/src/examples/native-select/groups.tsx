"use client"

import { Label } from "@sajam/ui/label"
import { NativeSelect } from "@sajam/ui/native-select"
import { useId } from "react"

export default function NativeSelectGroupsExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Time zone</Label>
      <NativeSelect.Root
        id={id}
        name="timeZone"
        defaultValue="europe/london"
        className="w-full"
      >
        <NativeSelect.OptGroup label="Americas">
          <NativeSelect.Option value="america/new_york">New York</NativeSelect.Option>
          <NativeSelect.Option value="america/los_angeles">Los Angeles</NativeSelect.Option>
        </NativeSelect.OptGroup>
        <NativeSelect.OptGroup label="Europe">
          <NativeSelect.Option value="europe/london">London</NativeSelect.Option>
          <NativeSelect.Option value="europe/paris">Paris</NativeSelect.Option>
        </NativeSelect.OptGroup>
        <NativeSelect.OptGroup label="Asia">
          <NativeSelect.Option value="asia/singapore">Singapore</NativeSelect.Option>
          <NativeSelect.Option value="asia/tokyo">Tokyo</NativeSelect.Option>
        </NativeSelect.OptGroup>
      </NativeSelect.Root>
    </div>
  )
}
