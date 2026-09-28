"use client"

import { Button } from "@sajam/ui/button"
import { Toast, toast } from "@sajam/ui/toast"

// toast is the shared manager. Mount one Toast.Toaster near the root of your app.
export default function ToastExample() {
  return (
    <>
      <Button
        variant="outline"
        onClick={function () {
          toast.success("Project published", {
            description: "The latest version is now live.",
          })
        }}
      >
        Publish project
      </Button>
      <Toast.Toaster />
    </>
  )
}
