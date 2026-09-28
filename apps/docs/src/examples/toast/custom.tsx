"use client"

import { Button } from "@sajam/ui/button"
import { Toast } from "@sajam/ui/toast"
import { useState } from "react"

export default function CustomToast() {
  const [toastManager] = useState(function () {
    return Toast.createToastManager()
  })

  return (
    <>
      <Button
        variant="outline"
        onClick={function () {
          toastManager.add({
            title: "You're invited",
            description: "Amina added you to Website refresh.",
            timeout: 0,
            data: { invite: true },
          })
        }}
      >
        Show invitation
      </Button>
      <Toast.Toaster
        toastManager={toastManager}
        renderToast={function (toastItem, defaultContent) {
          if (!toastItem.data?.invite) return defaultContent

          return (
            <Toast.Content className="bg-primary text-primary-foreground rounded-[inherit]">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <Toast.Title />
                <Toast.Description className="text-primary-foreground/80" />
              </div>
              <Toast.Close
                render={
                  <Button
                    variant="secondary"
                    size="sm"
                  />
                }
                className="text-secondary-foreground hover:text-secondary-foreground"
              >
                Accept
              </Toast.Close>
            </Toast.Content>
          )
        }}
      />
    </>
  )
}
