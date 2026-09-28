"use client"

import { BlockUI } from "@sajam/ui/block-ui"
import { Button } from "@sajam/ui/button"
import { Progress } from "@sajam/ui/progress"
import { useState } from "react"

export default function CustomOverlayBlockUI() {
  const [blocked, setBlocked] = useState(false)

  return (
    <div className="grid w-full max-w-sm gap-3">
      <BlockUI
        blocked={blocked}
        className="rounded-xl"
        overlay={
          <Progress.Root
            value={null}
            className="bg-popover w-48 rounded-lg border p-3 shadow-sm"
          >
            <Progress.Label>Uploading 12 files…</Progress.Label>
          </Progress.Root>
        }
      >
        <div className="bg-card rounded-xl border p-6 text-center">
          <p className="font-medium">Release bundle</p>
          <p className="text-muted-foreground mt-1 text-sm">12 files ready to upload</p>
        </div>
      </BlockUI>
      <Button
        variant="outline"
        onClick={function () {
          setBlocked(!blocked)
        }}
      >
        {blocked ? "Finish upload" : "Start upload"}
      </Button>
    </div>
  )
}
