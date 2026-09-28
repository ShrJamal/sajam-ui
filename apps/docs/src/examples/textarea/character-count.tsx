"use client"

import { Label } from "@sajam/ui/label"
import { Textarea } from "@sajam/ui/textarea"
import { useId, useState } from "react"

const limit = 160

export default function TextareaCharacterCountExample() {
  const id = useId()
  const countId = useId()
  const [bio, setBio] = useState("")

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor={id}>Short bio</Label>
      <Textarea
        id={id}
        rows={3}
        maxLength={limit}
        value={bio}
        onChange={function (event) {
          setBio(event.currentTarget.value)
        }}
        aria-describedby={countId}
        placeholder="Write a few words about yourself…"
      />
      <p
        id={countId}
        className="text-muted-foreground text-right text-xs tabular-nums"
      >
        {bio.length}/{limit}
      </p>
    </div>
  )
}
