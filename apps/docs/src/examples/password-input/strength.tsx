"use client"

import { Label } from "@sajam/ui/label"
import { PasswordInput } from "@sajam/ui/password-input"
import { useId } from "react"

export default function PasswordInputStrengthExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>New password</Label>
      <PasswordInput
        id={id}
        autoComplete="new-password"
        placeholder="At least 8 characters"
        minLength={8}
        strength
      />
    </div>
  )
}
