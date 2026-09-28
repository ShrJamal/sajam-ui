"use client"

import { Button } from "@sajam/ui/button"
import { InputOTP } from "@sajam/ui/input-otp"
import { Label } from "@sajam/ui/label"
import { useId, useState } from "react"

// The demo accepts 123456; verify real codes on the server.
const demoCode = "123456"

export default function InputOTPVerificationExample() {
  const id = useId()
  const statusId = useId()
  const [code, setCode] = useState("")
  const [status, setStatus] = useState<"idle" | "invalid" | "verified">("idle")

  return (
    <div className="grid gap-3">
      <Label htmlFor={id}>Enter the code we sent you</Label>
      <InputOTP.Root
        id={id}
        length={6}
        value={code}
        aria-describedby={statusId}
        onValueChange={function (nextCode) {
          setCode(nextCode)
          setStatus("idle")
        }}
        onValueComplete={function (completedCode) {
          setStatus(completedCode === demoCode ? "verified" : "invalid")
        }}
      >
        <InputOTP.Group>
          {[0, 1, 2, 3, 4, 5].map(function (index) {
            return (
              <InputOTP.Slot
                key={index}
                aria-invalid={status === "invalid" || undefined}
              />
            )
          })}
        </InputOTP.Group>
      </InputOTP.Root>
      <p
        id={statusId}
        role="status"
        className={
          status === "invalid" ? "text-destructive text-xs" : "text-muted-foreground text-xs"
        }
      >
        {status === "invalid"
          ? "That code is incorrect. Try 123456."
          : status === "verified"
            ? "Code verified."
            : "Codes expire after 10 minutes."}
      </p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={function () {
          setCode("")
          setStatus("idle")
        }}
      >
        Resend code
      </Button>
    </div>
  )
}
