import { Alert } from "@sajam/ui/alert"
import { Button } from "@sajam/ui/button"
import { Checkbox } from "@sajam/ui/checkbox"
import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { ArrowRightIcon, EyeIcon, EyeOffIcon, LayersIcon } from "lucide-react"
import { useState } from "react"

// Connect the submit handler to your authentication provider before production use.
export default function LoginTemplate() {
  const [visible, setVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="bg-background text-foreground grid min-h-svh lg:grid-cols-2">
      <aside className="bg-primary text-primary-foreground relative hidden flex-col justify-between overflow-hidden p-12 lg:flex">
        <div className="flex items-center gap-3 text-xl font-semibold">
          <LayersIcon className="size-7" />
          Forma
        </div>
        <div className="relative z-10 max-w-md space-y-6">
          <p className="text-primary-foreground text-xs font-medium tracking-[0.2em] uppercase">
            A little more room to think
          </p>
          <h1 className="text-5xl leading-[1.12] font-medium tracking-tight">
            Your best work
            <br />
            starts with a<br />
            clear space.
          </h1>
          <p className="text-primary-foreground max-w-xs text-sm leading-7">
            One place for your projects, your team, and the ideas you haven't built yet.
          </p>
        </div>
        <div
          aria-hidden="true"
          className="border-primary-foreground/5 absolute -right-32 bottom-40 size-96 rounded-full border-[56px]"
        />
        <p className="text-primary-foreground text-xs">Built with Sajam UI</p>
      </aside>
      <main className="flex min-h-svh items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-12 flex items-center gap-2 text-xl font-semibold lg:hidden">
            <LayersIcon className="text-primary" />
            Forma
          </div>
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.16em] uppercase">
            Welcome back
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">Make yourself at home.</h2>
          <p className="text-muted-foreground mt-3 text-sm">
            Sign in to continue to your workspace.
          </p>
          <form
            className="mt-8 grid gap-5"
            onSubmit={function (event) {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="login-email">Email address</Label>
              <Input
                id="login-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="h-11"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <Input
                  id="login-password"
                  name="password"
                  type={visible ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  minLength={8}
                  className="h-11 pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1.5 right-1.5"
                  aria-label={visible ? "Hide password" : "Show password"}
                  onClick={function () {
                    setVisible(!visible)
                  }}
                >
                  {visible ? <EyeOffIcon /> : <EyeIcon />}
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                name="remember"
              />
              <Label
                htmlFor="remember"
                className="text-muted-foreground text-sm font-normal"
              >
                Remember this device
              </Label>
            </div>
            <Button
              type="submit"
              className="h-11 w-full"
            >
              Sign in <ArrowRightIcon />
            </Button>
            {submitted && (
              <Alert.Root role="status">
                <Alert.Title>Form submitted</Alert.Title>
                <Alert.Description>
                  This is a preview. Connect your authentication provider to sign users in.
                </Alert.Description>
              </Alert.Root>
            )}
          </form>
          <p className="text-muted-foreground mt-6 text-center text-xs leading-5">
            Demo only. No credentials are sent or stored.
          </p>
        </div>
      </main>
    </div>
  )
}
