"use client"

import { Alert } from "@sajam/ui/alert"
import { Button } from "@sajam/ui/button"
import { OctagonXIcon } from "lucide-react"
import { useState } from "react"

export default function AnnouncedAlert() {
  const [failed, setFailed] = useState(false)

  return (
    <div className="grid w-full max-w-md justify-items-start gap-3">
      <Button
        variant="outline"
        onClick={function () {
          setFailed(true)
        }}
      >
        Deploy project
      </Button>
      {failed ? (
        // role="alert" announces an alert that appears after an action.
        <Alert.Root
          role="alert"
          variant="destructive"
        >
          <OctagonXIcon />
          <Alert.Title>Deployment failed</Alert.Title>
          <Alert.Description>
            The build step timed out. Review the logs and try again.
          </Alert.Description>
        </Alert.Root>
      ) : null}
    </div>
  )
}
