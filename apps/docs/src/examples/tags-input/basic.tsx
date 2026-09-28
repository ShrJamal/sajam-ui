"use client"

import { Label } from "@sajam/ui/label"
import { TagsInput } from "@sajam/ui/tags-input"
import { useId, useState } from "react"

export default function TagsInputBasicExample() {
  const id = useId()
  const [skills, setSkills] = useState(["React", "TypeScript"])

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor={id}>Skills</Label>
      <TagsInput
        id={id}
        value={skills}
        onValueChange={setSkills}
        placeholder="Add a skill"
      />
    </div>
  )
}
