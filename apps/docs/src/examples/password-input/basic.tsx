"use client"

import { Label } from "@sajam/ui/label"
import { PasswordInput } from "@sajam/ui/password-input"
import { useId } from "react"

export default function PasswordInputBasicExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Password</Label>
      <PasswordInput
        id={id}
        autoComplete="current-password"
        placeholder="Enter your password"
      />
    </div>
  )
}
