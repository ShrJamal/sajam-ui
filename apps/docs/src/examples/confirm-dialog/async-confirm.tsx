"use client"

import { Button } from "@sajam/ui/button"
import { ConfirmDialog } from "@sajam/ui/confirm-dialog"
import { Input } from "@sajam/ui/input"
import { useId, useState } from "react"

export default function AsyncConfirmDialog() {
  const inputId = useId()
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const [confirmation, setConfirmation] = useState("")
  const [status, setStatus] = useState("The workspace is active.")

  return (
    <div className="grid justify-items-center gap-3">
      <ConfirmDialog
        open={open}
        onOpenChange={function (nextOpen) {
          setOpen(nextOpen)
          if (!nextOpen) setConfirmation("")
        }}
        trigger={<Button variant="destructive">Delete workspace</Button>}
        title="Delete this workspace?"
        description="Type DELETE to confirm. Projects and members are removed permanently."
        confirmLabel="Delete workspace"
        variant="destructive"
        closeOnConfirm={false}
        loading={pending}
        loadingLabel="Deleting…"
        onConfirm={function () {
          if (confirmation !== "DELETE") return
          setPending(true)
          // Replace the timer with your request, then close when it settles.
          setTimeout(function () {
            setPending(false)
            setOpen(false)
            setConfirmation("")
            setStatus("The workspace was deleted.")
          }, 1200)
        }}
      >
        <label
          htmlFor={inputId}
          className="sr-only"
        >
          Type DELETE to confirm
        </label>
        <Input
          id={inputId}
          value={confirmation}
          onChange={function (event) {
            setConfirmation(event.target.value)
          }}
          placeholder="DELETE"
          autoComplete="off"
        />
      </ConfirmDialog>
      <p
        role="status"
        className="text-muted-foreground text-sm"
      >
        {status}
      </p>
    </div>
  )
}
