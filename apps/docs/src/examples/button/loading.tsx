"use client"

import { Button } from "@sajam/ui/button"
import { useState } from "react"

// A loading button keeps focus and ignores clicks until the work finishes.
export default function ButtonLoadingExample() {
  const [saving, setSaving] = useState(false)

  return (
    <Button
      loading={saving}
      loadingLabel="Saving…"
      onClick={function () {
        setSaving(true)
        setTimeout(function () {
          setSaving(false)
        }, 2000)
      }}
    >
      Save changes
    </Button>
  )
}
