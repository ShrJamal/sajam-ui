import { Badge } from "@sajam/ui/badge"
import { Button } from "@sajam/ui/button"
import { Card } from "@sajam/ui/card"
import { CheckIcon } from "lucide-react"

const features = ["Unlimited projects", "Shared component library", "Priority support"]

export default function CardPricingExample() {
  return (
    <Card.Root className="ring-primary w-full max-w-xs ring-2">
      <Card.Header>
        <Card.Title>Team</Card.Title>
        <Card.Description>For growing product teams.</Card.Description>
        <Card.Action>
          <Badge>Popular</Badge>
        </Card.Action>
      </Card.Header>
      <Card.Body className="grid gap-5">
        <p className="flex items-baseline gap-1.5">
          <span className="text-4xl font-semibold tracking-tight tabular-nums">$24</span>
          <span className="text-muted-foreground">per member / month</span>
        </p>
        <Button className="w-full">Start free trial</Button>
        <ul className="grid gap-2.5">
          {features.map(function (feature) {
            return (
              <li
                key={feature}
                className="flex items-center gap-2"
              >
                <CheckIcon
                  aria-hidden="true"
                  className="text-primary size-4 shrink-0"
                />
                {feature}
              </li>
            )
          })}
        </ul>
      </Card.Body>
    </Card.Root>
  )
}
