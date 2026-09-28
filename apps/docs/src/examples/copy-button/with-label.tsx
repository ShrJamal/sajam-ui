"use client"

import { CopyButton } from "@sajam/ui/copy-button"
import { Toast } from "@sajam/ui/toast"
import { useState } from "react"

export default function CopyButtonWithLabel() {
  // A local manager keeps these toasts separate from the app-wide toast.
  const [toastManager] = useState(function () {
    return Toast.createToastManager()
  })

  return (
    <>
      <CopyButton
        value="https://sajam.dev/invite/7f3k2"
        variant="outline"
        size="default"
        onCopy={function () {
          toastManager.success("Invite link copied")
        }}
        onCopyError={function () {
          toastManager.destructive("Could not copy the link")
        }}
      >
        Copy invite link
      </CopyButton>
      <Toast.Toaster toastManager={toastManager} />
    </>
  )
}
