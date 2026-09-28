"use client"

import { HoverCard } from "@sajam/ui/hover-card"

const sides = ["top", "right", "bottom", "left"] as const

export default function HoverCardPlacement() {
  return (
    <div className="flex flex-wrap justify-center gap-4 text-sm">
      {sides.map(function (side) {
        return (
          <HoverCard.Root key={side}>
            <HoverCard.Trigger
              href="#"
              onClick={function (event) {
                event.preventDefault()
              }}
              className="font-medium capitalize underline underline-offset-4"
            >
              {side}
            </HoverCard.Trigger>
            <HoverCard.Content
              side={side}
              className="w-48"
            >
              <p className="font-medium capitalize">{side}</p>
              <p className="text-muted-foreground mt-1">Opens on the {side} of its link.</p>
            </HoverCard.Content>
          </HoverCard.Root>
        )
      })}
    </div>
  )
}
