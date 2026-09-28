import { Avatar } from "@sajam/ui/avatar"

export default function AvatarGroupExample() {
  return (
    <Avatar.Group>
      <Avatar.Root>
        <Avatar.Fallback>MC</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback>JS</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback>AL</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.GroupCount>
        +8<span className="sr-only"> more people</span>
      </Avatar.GroupCount>
    </Avatar.Group>
  )
}
