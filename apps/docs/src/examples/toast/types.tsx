"use client"

import { Button } from "@sajam/ui/button"
import { Toast } from "@sajam/ui/toast"
import { useState } from "react"

const toasts: Toast.ToastOptions[] = [
  { type: "info", title: "Update available", description: "Refresh to load version 2.4." },
  { type: "success", title: "Changes saved", description: "Everyone sees the new layout." },
  { type: "warning", title: "Storage almost full", description: "You have 200 MB left." },
  { type: "destructive", title: "Upload failed", description: "Check your connection and retry." },
  { type: "loading", title: "Syncing files", description: "This can take a minute." },
]

export default function ToastTypes() {
  // A local manager keeps these toasts separate from the app-wide toast.
  const [toastManager] = useState(function () {
    return Toast.createToastManager()
  })

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {toasts.map(function (options) {
        return (
          <Button
            key={options.type}
            variant="outline"
            size="sm"
            className="capitalize"
            onClick={function () {
              toastManager.add(options)
            }}
          >
            {options.type}
          </Button>
        )
      })}
      <Toast.Toaster toastManager={toastManager} />
    </div>
  )
}
