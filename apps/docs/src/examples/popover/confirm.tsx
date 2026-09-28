"use client"

import { Button } from "@sajam/ui/button"
import { Popover } from "@sajam/ui/popover"
import { useState } from "react"

export default function ConfirmPopover() {
  const [status, setStatus] = useState("No action taken.")

  return (
    <div className="grid justify-items-center gap-3">
      <Popover.Root modal="trap-focus">
        <Popover.Trigger render={<Button variant="destructive" />}>Remove member</Popover.Trigger>
        <Popover.Content
          role="alertdialog"
          sideOffset={8}
          className="w-64"
        >
          <Popover.Header>
            <Popover.Title>Remove Leo Park?</Popover.Title>
            <Popover.Description>They lose access to every project right away.</Popover.Description>
          </Popover.Header>
          <Popover.Footer>
            <Popover.Close
              render={
                <Button
                  variant="outline"
                  size="sm"
                />
              }
              onClick={function () {
                setStatus("Removal cancelled.")
              }}
            >
              Cancel
            </Popover.Close>
            <Popover.Close
              render={
                <Button
                  variant="destructive"
                  size="sm"
                />
              }
              onClick={function () {
                setStatus("Leo Park was removed.")
              }}
            >
              Remove
            </Popover.Close>
          </Popover.Footer>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Root>
      <p
        role="status"
        className="text-muted-foreground text-sm"
      >
        {status}
      </p>
    </div>
  )
}
