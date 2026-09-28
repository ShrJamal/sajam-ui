"use client"

import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

export default function LabelExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor={id}>Email</Label>
      <Input
        id={id}
        type="email"
        placeholder="you@example.com"
      />
    </div>
  )
}
