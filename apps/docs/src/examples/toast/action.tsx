"use client"

import { Button } from "@sajam/ui/button"
import { Toast } from "@sajam/ui/toast"
import { useState } from "react"

export default function ToastWithAction() {
  const [toastManager] = useState(function () {
    return Toast.createToastManager()
  })

  return (
    <>
      <Button
        variant="outline"
        onClick={function () {
          const id = toastManager.add({
            title: "Project archived",
            description: "It moved to your archive.",
            actionProps: {
              children: "Undo",
              onClick: function () {
                toastManager.close(id)
                toastManager.add({ title: "Project restored", type: "success" })
              },
            },
          })
        }}
      >
        Archive project
      </Button>
      <Toast.Toaster toastManager={toastManager} />
    </>
  )
}
