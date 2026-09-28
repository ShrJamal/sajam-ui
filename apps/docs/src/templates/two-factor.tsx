import { Alert } from "@sajam/ui/alert"
import { Button } from "@sajam/ui/button"
import { Card } from "@sajam/ui/card"
import { InputOTP } from "@sajam/ui/input-otp"
import { Label } from "@sajam/ui/label"
import { LayersIcon, ShieldCheckIcon } from "lucide-react"
import { useState } from "react"

// Only validate the code's format here; verification belongs on the server.
export default function TwoFactorTemplate() {
  const [code, setCode] = useState("")
  const [submitted, setSubmitted] = useState(false)
  return (
    <main className="bg-muted/30 text-foreground flex min-h-svh flex-col items-center justify-center gap-8 px-5 py-12">
      <div className="flex items-center gap-2 text-xl font-semibold">
        <LayersIcon className="text-primary" />
        Forma
      </div>
      <Card.Root className="w-full max-w-md py-8">
        <Card.Body className="px-7 sm:px-9">
          <div className="bg-muted mb-7 flex size-12 items-center justify-center rounded-xl">
            <ShieldCheckIcon className="size-5" />
          </div>
          <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
            One more step
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight">Make sure it's you.</h1>
          <p className="text-muted-foreground mt-3 text-sm leading-7">
            Enter a six-digit code from your authenticator app. In this demo, try 123456.
          </p>
          <form
            className="mt-7 grid gap-5"
            onSubmit={function (event) {
              event.preventDefault()
              if (/^\d{6}$/.test(code)) setSubmitted(true)
            }}
          >
            <div className="grid gap-3">
              <Label htmlFor="verification-code">Verification code</Label>
              <InputOTP.Root
                id="verification-code"
                name="code"
                aria-describedby="verification-hint"
                length={6}
                value={code}
                onValueChange={function (next) {
                  setCode(next)
                  setSubmitted(false)
                }}
                required
              >
                <InputOTP.Group>
                  {[0, 1, 2].map(function (index) {
                    return (
                      <InputOTP.Slot
                        key={index}
                        className="size-10"
                      />
                    )
                  })}
                </InputOTP.Group>
                <InputOTP.Separator />
                <InputOTP.Group>
                  {[3, 4, 5].map(function (index) {
                    return (
                      <InputOTP.Slot
                        key={index}
                        className="size-10"
                      />
                    )
                  })}
                </InputOTP.Group>
              </InputOTP.Root>
              <p
                id="verification-hint"
                className="text-muted-foreground text-xs"
              >
                You can paste all six digits at once.
              </p>
            </div>
            <Button
              type="submit"
              className="h-11"
              disabled={code.length !== 6}
            >
              Verify code
            </Button>
            {submitted && (
              <Alert.Root role="status">
                <Alert.Title>Code format accepted</Alert.Title>
                <Alert.Description>
                  This preview does not verify identity. Connect a server endpoint with rate limits
                  and code expiry to complete sign-in.
                </Alert.Description>
              </Alert.Root>
            )}
            <Button
              type="button"
              variant="ghost"
              disabled={!code}
              onClick={function () {
                setCode("")
                setSubmitted(false)
              }}
            >
              Clear code
            </Button>
          </form>
        </Card.Body>
      </Card.Root>
      <p className="text-muted-foreground text-center text-xs">
        Demo only. No verification code is sent or stored.
      </p>
    </main>
  )
}
