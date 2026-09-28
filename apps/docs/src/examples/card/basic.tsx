import { Button } from "@sajam/ui/button"
import { Card } from "@sajam/ui/card"

export default function CardExample() {
  return (
    <Card.Root className="w-full max-w-sm">
      <Card.Header>
        <Card.Title>Invite your team</Card.Title>
        <Card.Description>Collaborate on projects in a shared workspace.</Card.Description>
      </Card.Header>
      <Card.Body className="text-muted-foreground">
        Members can comment, edit, and publish. You can change roles at any time.
      </Card.Body>
      <Card.Footer className="justify-end gap-2">
        <Button variant="ghost">Skip</Button>
        <Button>Send invites</Button>
      </Card.Footer>
    </Card.Root>
  )
}
