import { Button } from "@sajam/ui/button"
import { Card } from "@sajam/ui/card"
import { Dialog } from "@sajam/ui/dialog"
import { Input } from "@sajam/ui/input"

// A small signup page using the four components listed in scoped.css.
export default function Signup() {
  return (
    <main className="bg-background text-foreground grid min-h-screen place-items-center p-6">
      <Card.Root className="w-full max-w-sm">
        <Card.Header>
          <Card.Title>Join the waitlist</Card.Title>
          <Card.Description>We will email you when the first release is ready.</Card.Description>
        </Card.Header>
        <Card.Body className="grid gap-3">
          <Input
            type="email"
            placeholder="you@example.com"
            aria-label="Email"
          />
          <Dialog.Root>
            <Dialog.Trigger render={<Button />}>Join</Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>You are on the list</Dialog.Title>
                <Dialog.Description>Thanks for your interest.</Dialog.Description>
              </Dialog.Header>
            </Dialog.Content>
          </Dialog.Root>
        </Card.Body>
      </Card.Root>
    </main>
  )
}
