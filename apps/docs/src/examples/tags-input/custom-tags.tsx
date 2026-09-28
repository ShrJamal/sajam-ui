"use client"

import { Label } from "@sajam/ui/label"
import { TagsInput } from "@sajam/ui/tags-input"
import { HashIcon } from "lucide-react"
import { useId, useState } from "react"

const limit = 4

export default function TagsInputCustomTagsExample() {
  const id = useId()
  const countId = useId()
  const [topics, setTopics] = useState(["design", "release"])

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor={id}>Topics</Label>
      <TagsInput
        id={id}
        value={topics}
        onValueChange={setTopics}
        max={limit}
        keyFilter="alphanumeric"
        placeholder="Add a topic"
        aria-describedby={countId}
        renderTag={function (topic) {
          return (
            <>
              <HashIcon aria-hidden="true" />
              {topic}
            </>
          )
        }}
      />
      <p
        id={countId}
        className="text-muted-foreground text-xs tabular-nums"
      >
        {topics.length} of {limit} topics
      </p>
    </div>
  )
}
