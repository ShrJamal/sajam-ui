"use client"

import { BlockUI } from "@sajam/ui/block-ui"
import { Button } from "@sajam/ui/button"
import { Field } from "@sajam/ui/field"
import { Input } from "@sajam/ui/input"
import { useState } from "react"

export default function BlockUIExample() {
  const [blocked, setBlocked] = useState(false)

  return (
    <div className="grid w-full max-w-sm gap-3">
      <BlockUI
        blocked={blocked}
        label="Saving report…"
        className="rounded-xl"
      >
        <div className="bg-card grid gap-3 rounded-xl border p-4">
          <Field.Root>
            <Field.Label>Report name</Field.Label>
            <Input defaultValue="Weekly activity" />
          </Field.Root>
          <p className="text-muted-foreground text-sm">The form is inert while it saves.</p>
        </div>
      </BlockUI>
      <Button
        onClick={function () {
          setBlocked(!blocked)
        }}
      >
        {blocked ? "Unblock form" : "Block form"}
      </Button>
    </div>
  )
}
