"use client"

import { BlockUI } from "@sajam/ui/block-ui"
import { Button } from "@sajam/ui/button"
import { useState } from "react"

export default function BlockUILifecycle() {
  const [blocked, setBlocked] = useState(false)
  const [status, setStatus] = useState("Ready")

  return (
    <div className="grid w-full max-w-sm gap-3">
      <BlockUI
        blocked={blocked}
        label="Processing…"
        className="rounded-xl"
        onBlocked={function () {
          setStatus("Processing")
        }}
        onUnblocked={function () {
          setStatus("Complete")
        }}
      >
        <div className="bg-card rounded-xl border p-5">
          <p className="font-medium">Monthly report</p>
          <p className="text-muted-foreground mt-1 text-sm">Status: {status}</p>
        </div>
      </BlockUI>
      <Button
        onClick={function () {
          setBlocked(!blocked)
        }}
      >
        {blocked ? "Mark complete" : "Process report"}
      </Button>
    </div>
  )
}
