import { Button } from "@sajam/ui/button"
import { Card } from "@sajam/ui/card"
import { EllipsisIcon } from "lucide-react"

export default function CardHeaderActionExample() {
  return (
    <Card.Root className="w-full max-w-sm">
      <Card.Header className="border-b">
        <Card.Title>Project activity</Card.Title>
        <Card.Description>Updates from your team this week.</Card.Description>
        <Card.Action>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Project actions"
          >
            <EllipsisIcon />
          </Button>
        </Card.Action>
      </Card.Header>
      <Card.Body className="grid gap-2">
        <p>Three pull requests were merged.</p>
        <p className="text-muted-foreground">The production deployment is healthy.</p>
      </Card.Body>
    </Card.Root>
  )
}
