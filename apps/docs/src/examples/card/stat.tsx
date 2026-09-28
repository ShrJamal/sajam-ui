import { Card } from "@sajam/ui/card"
import { ArrowUpRightIcon, UsersIcon } from "lucide-react"

export default function CardStatExample() {
  return (
    <Card.Root
      size="sm"
      className="w-full max-w-60"
    >
      <Card.Header>
        <Card.Description>Active members</Card.Description>
        <Card.Action>
          <UsersIcon
            aria-hidden="true"
            className="text-muted-foreground size-4"
          />
        </Card.Action>
      </Card.Header>
      <Card.Body className="grid gap-1">
        <p className="text-3xl font-semibold tracking-tight tabular-nums">2,318</p>
        <p className="text-muted-foreground flex items-center gap-1 text-xs">
          <span className="text-success inline-flex items-center gap-0.5 font-medium">
            <ArrowUpRightIcon
              aria-hidden="true"
              className="size-3.5"
            />
            12%
          </span>
          from last month
        </p>
      </Card.Body>
    </Card.Root>
  )
}
