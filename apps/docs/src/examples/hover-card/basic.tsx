"use client"

import { Avatar } from "@sajam/ui/avatar"
import { HoverCard } from "@sajam/ui/hover-card"
import { CalendarDaysIcon } from "lucide-react"

export default function ProfileHoverCard() {
  return (
    <p className="text-muted-foreground text-sm">
      Reviewed by{" "}
      <HoverCard.Root>
        <HoverCard.Trigger
          href="#"
          onClick={function (event) {
            event.preventDefault()
          }}
          className="text-foreground font-medium underline underline-offset-4"
        >
          @amina
        </HoverCard.Trigger>
        <HoverCard.Content className="w-72">
          <div className="flex gap-3">
            <Avatar.Root>
              <Avatar.Fallback>AN</Avatar.Fallback>
            </Avatar.Root>
            <div className="grid gap-1">
              <p className="font-medium">Amina Noor</p>
              <p className="text-muted-foreground">
                Design systems lead. Maintains components and accessibility reviews.
              </p>
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <CalendarDaysIcon className="size-3.5" />
                Joined March 2024
              </p>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard.Root>
    </p>
  )
}
