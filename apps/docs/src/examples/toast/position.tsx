"use client"

import { Button } from "@sajam/ui/button"
import { Toast } from "@sajam/ui/toast"
import { useState } from "react"

const positions: Toast.ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
]

export default function ToastPositionExample() {
  const [toastManager] = useState(function () {
    return Toast.createToastManager()
  })
  const [position, setPosition] = useState<Toast.ToastPosition>("top-center")

  return (
    <div className="grid w-full max-w-xs grid-cols-2 gap-2">
      {positions.map(function (option) {
        return (
          <Button
            key={option}
            variant={option === position ? "secondary" : "outline"}
            size="sm"
            className="capitalize"
            onClick={function () {
              setPosition(option)
              toastManager.add({ title: "Connection restored", description: `Shown at ${option}.` })
            }}
          >
            {option.replace("-", " ")}
          </Button>
        )
      })}
      <Toast.Toaster
        toastManager={toastManager}
        position={position}
      />
    </div>
  )
}
