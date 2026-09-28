import { Avatar } from "@sajam/ui/avatar"
import { CheckIcon } from "lucide-react"

// The status is conveyed by color, so each badge carries visually hidden text.
export default function AvatarStatusBadgeExample() {
  return (
    <div className="flex items-center gap-4">
      <Avatar.Root size="lg">
        <Avatar.Fallback>MC</Avatar.Fallback>
        <Avatar.Badge className="bg-success">
          <span className="sr-only">Online</span>
        </Avatar.Badge>
      </Avatar.Root>
      <Avatar.Root size="lg">
        <Avatar.Fallback>JS</Avatar.Fallback>
        <Avatar.Badge className="bg-muted-foreground">
          <span className="sr-only">Away</span>
        </Avatar.Badge>
      </Avatar.Root>
      <Avatar.Root size="lg">
        <Avatar.Fallback>AL</Avatar.Fallback>
        <Avatar.Badge>
          <CheckIcon aria-hidden="true" />
          <span className="sr-only">Verified</span>
        </Avatar.Badge>
      </Avatar.Root>
    </div>
  )
}
