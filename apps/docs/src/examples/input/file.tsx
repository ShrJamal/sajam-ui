"use client"

import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

export default function InputFileExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor={id}>Profile photo</Label>
      <Input
        id={id}
        type="file"
        accept="image/*"
      />
    </div>
  )
}
