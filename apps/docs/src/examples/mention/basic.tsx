"use client"

import { Label } from "@sajam/ui/label"
import { Mention } from "@sajam/ui/mention"
import { useId, useState } from "react"

const teammates = [
  { value: "alex", label: "Alex Morgan", description: "Product design" },
  { value: "jamie", label: "Jamie Diaz", description: "Engineering" },
  { value: "sam", label: "Sam Lee", description: "Customer support" },
  { value: "priya", label: "Priya Shah", description: "Marketing" },
]

export default function MentionBasicExample() {
  const id = useId()
  const hintId = useId()
  const [comment, setComment] = useState("")

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor={id}>Comment</Label>
      <Mention
        id={id}
        name="comment"
        rows={3}
        suggestions={teammates}
        value={comment}
        onValueChange={setComment}
        placeholder="Mention a teammate with @"
        aria-describedby={hintId}
      />
      <p
        id={hintId}
        className="text-muted-foreground text-xs"
      >
        Type @, then use the arrow keys and Enter or Tab.
      </p>
    </div>
  )
}
