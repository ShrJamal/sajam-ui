"use client"

import { Alert } from "@sajam/ui/alert"
import { Button } from "@sajam/ui/button"
import { InfoIcon } from "lucide-react"
import { useState } from "react"

export default function DismissibleAlert() {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return (
      <Button
        variant="outline"
        onClick={function () {
          setVisible(true)
        }}
      >
        Show alert again
      </Button>
    )
  }

  return (
    <Alert.Root
      variant="info"
      className="max-w-md"
    >
      <InfoIcon />
      <Alert.Title>Scheduled maintenance</Alert.Title>
      <Alert.Description>
        The workspace is read-only on Sunday from 02:00 to 02:30 UTC.
      </Alert.Description>
      <Alert.Action>
        <Alert.Dismiss
          onClick={function () {
            setVisible(false)
          }}
        />
      </Alert.Action>
    </Alert.Root>
  )
}
