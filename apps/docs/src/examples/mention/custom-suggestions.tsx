"use client"

import { Label } from "@sajam/ui/label"
import { Mention, type MentionSuggestion } from "@sajam/ui/mention"
import { useId, useState } from "react"

const reviewers = [
  { value: "morgan", label: "Morgan Chen", description: "Available" },
  { value: "taylor", label: "Taylor Reed", description: "Available" },
  { value: "riley", label: "Riley Park", description: "Out of office", disabled: true },
]

export default function MentionCustomSuggestionsExample() {
  const id = useId()
  const statusId = useId()
  const [assigned, setAssigned] = useState<string[]>([])

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor={id}>Request a review</Label>
      <Mention
        id={id}
        rows={3}
        suggestions={reviewers}
        defaultValue="Could you take a look, @"
        aria-describedby={statusId}
        renderSuggestion={renderReviewer}
        onSuggestionSelect={function (reviewer) {
          setAssigned(function (current) {
            return current.includes(reviewer.label) ? current : [...current, reviewer.label]
          })
        }}
      />
      <p
        id={statusId}
        className="text-muted-foreground text-xs"
      >
        {assigned.length > 0 ? `Reviewers: ${assigned.join(", ")}` : "No reviewers yet."}
      </p>
    </div>
  )
}

function renderReviewer(reviewer: MentionSuggestion) {
  const initials = reviewer.label
    .split(" ")
    .map(function (part) {
      return part[0]
    })
    .join("")

  return (
    <span className="flex items-center gap-2">
      <span
        className="bg-muted text-muted-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-medium"
        aria-hidden="true"
      >
        {initials}
      </span>
      <span className="grid">
        <span className="font-medium">{reviewer.label}</span>
        <span className="text-muted-foreground text-xs">{reviewer.description}</span>
      </span>
    </span>
  )
}
