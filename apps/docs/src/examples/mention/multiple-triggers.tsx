"use client"

import { Label } from "@sajam/ui/label"
import { Mention } from "@sajam/ui/mention"
import { useId } from "react"

const suggestions = [
  { value: "alex", label: "Alex Morgan", description: "Product design", trigger: "@" },
  { value: "jamie", label: "Jamie Diaz", description: "Engineering", trigger: "@" },
  { value: "bug", label: "bug", description: "Something is not working", trigger: "#" },
  { value: "idea", label: "idea", description: "A product suggestion", trigger: "#" },
  { value: "question", label: "question", description: "Needs an answer", trigger: "#" },
]

export default function MentionMultipleTriggersExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor={id}>Project update</Label>
      <Mention
        id={id}
        rows={3}
        suggestions={suggestions}
        trigger={["@", "#"]}
        placeholder="Use @ for people and # for topics"
      />
    </div>
  )
}
