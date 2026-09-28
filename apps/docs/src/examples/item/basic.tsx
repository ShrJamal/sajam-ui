import { Button } from "@sajam/ui/button"
import { Item } from "@sajam/ui/item"
import { ShieldCheckIcon } from "lucide-react"

export default function ItemExample() {
  return (
    <Item.Root
      variant="outline"
      className="w-full max-w-sm"
    >
      <Item.Media variant="icon">
        <ShieldCheckIcon />
      </Item.Media>
      <Item.Content>
        <Item.Title>Two-factor authentication</Item.Title>
        <Item.Description>Protect your account with a second sign-in step.</Item.Description>
      </Item.Content>
      <Item.Actions>
        <Button
          variant="outline"
          size="sm"
        >
          Enable
        </Button>
      </Item.Actions>
    </Item.Root>
  )
}
