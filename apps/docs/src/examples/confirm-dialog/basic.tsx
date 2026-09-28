"use client"

import { Button } from "@sajam/ui/button"
import { ConfirmDialog } from "@sajam/ui/confirm-dialog"
import { useState } from "react"

export default function ConfirmDialogExample() {
  const [status, setStatus] = useState("3 drafts")

  return (
    <div className="grid justify-items-center gap-3">
      <ConfirmDialog
        trigger={<Button variant="outline">Delete drafts</Button>}
        title="Delete all drafts?"
        description="Drafts are removed for everyone and cannot be restored."
        confirmLabel="Delete drafts"
        variant="destructive"
        onConfirm={function () {
          setStatus("No drafts")
        }}
      />
      <p
        role="status"
        className="text-muted-foreground text-sm"
      >
        {status}
      </p>
    </div>
  )
}
