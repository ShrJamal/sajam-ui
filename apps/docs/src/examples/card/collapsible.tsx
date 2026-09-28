import { Button } from "@sajam/ui/button"
import { Card } from "@sajam/ui/card"
import { Collapsible } from "@sajam/ui/collapsible"
import { ChevronDownIcon } from "lucide-react"

export default function CardCollapsibleExample() {
  return (
    <Card.Root className="w-full max-w-sm">
      <Collapsible.Root defaultOpen>
        <Card.Header>
          <Card.Title>Workspace activity</Card.Title>
          <Card.Description>Updated 5 minutes ago</Card.Description>
          <Card.Action>
            <Collapsible.Trigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Toggle workspace activity"
                />
              }
            >
              <ChevronDownIcon className="transition-transform in-data-panel-open:rotate-180" />
            </Collapsible.Trigger>
          </Card.Action>
        </Card.Header>
        <Collapsible.Content>
          <Card.Body className="text-muted-foreground pt-(--card-spacing)">
            Your team completed 18 tasks and published two releases this week.
          </Card.Body>
        </Collapsible.Content>
      </Collapsible.Root>
    </Card.Root>
  )
}
