"use client"

import { Label } from "@sajam/ui/label"
import { PasswordInput } from "@sajam/ui/password-input"
import { useId } from "react"

export default function PasswordInputCustomStrengthExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Passphrase</Label>
      <PasswordInput
        id={id}
        autoComplete="new-password"
        placeholder="Four or more words"
        strength={scorePassphrase}
        strengthLabels={{
          empty: "Use four or more random words",
          weak: "Add more words",
          medium: "Almost there",
          strong: "Great passphrase",
        }}
      />
    </div>
  )
}

// Score passphrases by word count: 1 is weak, 3 is strong.
function scorePassphrase(passphrase: string) {
  return passphrase.trim().split(/\s+/).length - 1
}
