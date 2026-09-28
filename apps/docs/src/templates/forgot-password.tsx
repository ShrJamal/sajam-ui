import { Alert } from "@sajam/ui/alert"
import { Button } from "@sajam/ui/button"
import { Card } from "@sajam/ui/card"
import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { ArrowLeftIcon, ArrowRightIcon, KeyRoundIcon, LayersIcon } from "lucide-react"
import { useState } from "react"

// A real recovery endpoint should return the same response for all email addresses.
export default function ForgotPasswordTemplate() {
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
            <KeyRoundIcon className="size-5" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">A way back in.</h1>
          <p className="text-muted-foreground mt-3 text-sm leading-7">
            Enter the email you use for your workspace to start a password reset.
          </p>
          {submitted ? (
            <div className="mt-7 space-y-5">
              <Alert.Root role="status">
                <Alert.Title>Recovery preview complete</Alert.Title>
                <Alert.Description>
                  No email was sent. Connect a recovery endpoint to send reset links, using the same
                  confirmation for existing and unknown accounts.
                </Alert.Description>
              </Alert.Root>
              <Button
                variant="outline"
                className="w-full"
                onClick={function () {
                  setSubmitted(false)
                }}
              >
                <ArrowLeftIcon />
                Use another email
              </Button>
            </div>
          ) : (
            <form
              className="mt-7 grid gap-5"
              onSubmit={function (event) {
                event.preventDefault()
                setSubmitted(true)
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="recovery-email">Email address</Label>
                <Input
                  id="recovery-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                  className="h-11"
                />
              </div>
              <Button
                type="submit"
                className="h-11"
              >
                Request reset link <ArrowRightIcon />
              </Button>
            </form>
          )}
        </Card.Body>
      </Card.Root>
      <p className="text-muted-foreground max-w-sm text-center text-xs leading-5">
        An original Sajam UI recovery starter.
        <br />
        The preview sends no data and stores no email addresses.
      </p>
    </main>
  )
}
