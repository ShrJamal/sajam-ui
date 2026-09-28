"use client"

import { AlertDialog } from "@sajam/ui/alert-dialog"
import { Button } from "@sajam/ui/button"
import { useState } from "react"

export default function AsyncConfirmAlertDialog() {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const [status, setStatus] = useState("The key is active.")

  return (
    <div className="grid justify-items-center gap-3">
      <AlertDialog.Root
        open={open}
        onOpenChange={function (nextOpen) {
          if (!pending) setOpen(nextOpen)
        }}
      >
        <AlertDialog.Trigger render={<Button variant="outline" />}>
          Revoke API key
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Revoke this API key?</AlertDialog.Title>
            <AlertDialog.Description>
              Apps that use this key stop working immediately.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel disabled={pending}>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action
              closeOnClick={false}
              variant="destructive"
              loading={pending}
              loadingLabel="Revoking…"
              onClick={function () {
                setPending(true)
                // Replace the timer with your request, then close when it settles.
                setTimeout(function () {
                  setPending(false)
                  setOpen(false)
                  setStatus("The key was revoked.")
                }, 1200)
              }}
            >
              Revoke key
            </AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <p
        role="status"
        className="text-muted-foreground text-sm"
      >
        {status}
      </p>
    </div>
  )
}
