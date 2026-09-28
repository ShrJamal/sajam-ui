"use client"

import { Button } from "@sajam/ui/button"
import { Toast } from "@sajam/ui/toast"

// Toast.toast is the shared manager. Mount one Toast.Toaster near the root of your app.
export default function ToastExample() {
  return (
    <>
      <Button
        variant="outline"
        onClick={function () {
          Toast.toast.add({
            title: "Project published",
            description: "The latest version is now live.",
            type: "success",
          })
        }}
      >
        Publish project
      </Button>
      <Toast.Toaster />
    </>
  )
}
