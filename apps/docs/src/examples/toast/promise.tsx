"use client"

import { Button } from "@sajam/ui/button"
import { Toast } from "@sajam/ui/toast"
import { useState } from "react"

export default function ToastPromise() {
  const [toastManager] = useState(function () {
    return Toast.createToastManager()
  })

  return (
    <>
      <Button
        variant="outline"
        onClick={function () {
          // Replace this timer with your request.
          const release = new Promise<string>(function (resolve) {
            setTimeout(function () {
              resolve("Version 2.4")
            }, 1500)
          })

          void toastManager.promise(release, {
            loading: { title: "Publishing release…", type: "loading" },
            success: function (version) {
              return { title: `${version} published`, type: "success" }
            },
            error: { title: "Release failed", type: "destructive" },
          })
        }}
      >
        Publish release
      </Button>
      <Toast.Toaster toastManager={toastManager} />
    </>
  )
}
