"use client"

import { Label } from "@sajam/ui/label"
import { TagsInput } from "@sajam/ui/tags-input"
import { useId } from "react"

export default function TagsInputEmailRecipientsExample() {
  const id = useId()
  const hintId = useId()

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor={id}>Invite teammates</Label>
      <TagsInput
        id={id}
        name="recipients"
        separators={[",", ";", " "]}
        keyFilter="email"
        addOnBlur
        placeholder="name@example.com"
        aria-describedby={hintId}
      />
      <p
        id={hintId}
        className="text-muted-foreground text-xs"
      >
        Separate addresses with a comma, semicolon, or space, or paste a list.
      </p>
    </div>
  )
}
