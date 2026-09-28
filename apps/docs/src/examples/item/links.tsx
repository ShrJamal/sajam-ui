"use client"

import { Item } from "@sajam/ui/item"
import { BellIcon, ChevronRightIcon, CreditCardIcon, UserIcon } from "lucide-react"

const links = [
  { title: "Profile", description: "Name, photo, and email", icon: UserIcon },
  { title: "Notifications", description: "Email and push alerts", icon: BellIcon },
  { title: "Billing", description: "Plan and payment method", icon: CreditCardIcon },
]

export default function ItemLinksExample() {
  return (
    <Item.Group className="w-full max-w-sm gap-1">
      {links.map(function (link) {
        const Icon = link.icon
        return (
          <Item.Root
            key={link.title}
            size="sm"
            render={
              <a
                href="#"
                onClick={function (event) {
                  event.preventDefault()
                }}
              />
            }
          >
            <Item.Media variant="icon">
              <Icon />
            </Item.Media>
            <Item.Content>
              <Item.Title>{link.title}</Item.Title>
              <Item.Description>{link.description}</Item.Description>
            </Item.Content>
            <ChevronRightIcon
              aria-hidden="true"
              className="text-muted-foreground size-4"
            />
          </Item.Root>
        )
      })}
    </Item.Group>
  )
}
