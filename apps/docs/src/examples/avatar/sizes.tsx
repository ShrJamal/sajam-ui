import { Avatar } from "@sajam/ui/avatar"

export default function AvatarSizesExample() {
  return (
    <div className="flex items-center gap-4">
      <Avatar.Root size="sm">
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback>MD</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root size="lg">
        <Avatar.Fallback>LG</Avatar.Fallback>
      </Avatar.Root>
    </div>
  )
}
