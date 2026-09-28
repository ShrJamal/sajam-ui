import { Avatar } from "@sajam/ui/avatar"
import { Button } from "@sajam/ui/button"
import { Item } from "@sajam/ui/item"
import { PlusIcon } from "lucide-react"
import { Fragment } from "react"

const people = [
  { name: "Maya Chen", email: "maya@example.com", initials: "MC" },
  { name: "Omar Haddad", email: "omar@example.com", initials: "OH" },
  { name: "Lena Novak", email: "lena@example.com", initials: "LN" },
]

export default function ItemListExample() {
  return (
    <Item.Group className="w-full max-w-sm gap-0 rounded-xl border p-1">
      {people.map(function (person, index) {
        return (
          <Fragment key={person.email}>
            {index > 0 && <Item.Separator className="my-1" />}
            <Item.Root size="sm">
              <Item.Media>
                <Avatar.Root>
                  <Avatar.Fallback>{person.initials}</Avatar.Fallback>
                </Avatar.Root>
              </Item.Media>
              <Item.Content>
                <Item.Title>{person.name}</Item.Title>
                <Item.Description>{person.email}</Item.Description>
              </Item.Content>
              <Item.Actions>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Invite ${person.name}`}
                >
                  <PlusIcon />
                </Button>
              </Item.Actions>
            </Item.Root>
          </Fragment>
        )
      })}
    </Item.Group>
  )
}
