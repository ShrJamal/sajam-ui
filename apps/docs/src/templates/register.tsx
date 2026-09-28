import { Alert } from "@sajam/ui/alert"
import { Button } from "@sajam/ui/button"
import { Input } from "@sajam/ui/input"
import { Label } from "@sajam/ui/label"
import { PasswordInput } from "@sajam/ui/password-input"
import { ArrowRightIcon, CheckIcon, LayersIcon } from "lucide-react"
import { useState } from "react"

// Replace the local success state with the app's account-creation flow.
export default function RegisterTemplate() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <div className="bg-background text-foreground grid min-h-svh lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="bg-primary text-primary-foreground relative hidden flex-col justify-between overflow-hidden p-12 lg:flex">
        <div className="flex items-center gap-3 text-xl font-semibold">
          <LayersIcon className="size-7" />
          Forma
        </div>
        <div className="relative z-10 max-w-md">
          <p className="text-primary-foreground mb-6 text-xs font-medium tracking-[0.18em] uppercase">
            A fresh start
          </p>
          <h2 className="text-5xl leading-[1.12] font-medium tracking-tight">
            Small team.
            <br />
            Good ideas.
            <br />
            One workspace.
          </h2>
          <ul className="text-primary-foreground mt-10 space-y-5 text-sm">
            {[
              "Give each project a clear next step",
              "Keep your team's feedback together",
              "Build a process that fits your work",
            ].map(function (item) {
              return (
                <li
                  key={item}
                  className="flex gap-3"
                >
                  <CheckIcon className="text-primary-foreground size-4 shrink-0" />
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
        <div
          aria-hidden="true"
          className="border-primary-foreground/5 absolute top-36 -right-32 size-80 rounded-full border-[48px]"
        />
        <p className="text-primary-foreground text-xs">Your team's work starts here.</p>
      </aside>
      <main className="flex items-center justify-center px-6 py-14">
        <div className="w-full max-w-sm">
          <div className="mb-10 flex items-center gap-2 text-xl font-semibold lg:hidden">
            <LayersIcon className="text-primary" />
            Forma
          </div>
          <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
            Create your workspace
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Let's make something.</h1>
          <p className="text-muted-foreground mt-3 text-sm leading-6">
            A few details, and you're ready to begin.
          </p>
          <form
            className="mt-8 grid gap-5"
            onSubmit={function (event) {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="register-name">Your name</Label>
              <Input
                id="register-name"
                name="name"
                autoComplete="name"
                placeholder="Alex Morgan"
                minLength={2}
                required
                className="h-11"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="register-email">Work email</Label>
              <Input
                id="register-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="alex@company.com"
                required
                className="h-11"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="register-workspace">Workspace name</Label>
              <Input
                id="register-workspace"
                name="workspace"
                autoComplete="organization"
                placeholder="Your team or studio"
                minLength={2}
                required
                className="h-11"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="register-password">Password</Label>
              <PasswordInput
                id="register-password"
                name="password"
                autoComplete="new-password"
                aria-describedby="password-hint"
                minLength={8}
                required
                className="h-11"
              />
              <p
                id="password-hint"
                className="text-muted-foreground text-xs"
              >
                Use at least 8 characters.
              </p>
            </div>
            <Button
              type="submit"
              className="mt-1 h-11"
            >
              Create workspace <ArrowRightIcon />
            </Button>
            {submitted && (
              <Alert.Root role="status">
                <Alert.Title>Registration preview complete</Alert.Title>
                <Alert.Description>
                  The fields passed local validation. Connect your authentication and workspace APIs
                  to create an account.
                </Alert.Description>
              </Alert.Root>
            )}
          </form>
          <p className="text-muted-foreground mt-6 text-center text-xs leading-5">
            Demo only. No account is created and no credentials are sent or stored.
          </p>
        </div>
      </main>
    </div>
  )
}
