import { Avatar } from "@sajam/ui/avatar"

// An inline SVG portrait stands in for a user photo.
const portrait = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><defs><linearGradient id='g' x2='1' y2='1'><stop offset='0' stop-color='#f6d5c4'/><stop offset='1' stop-color='#c9c3f2'/></linearGradient></defs><rect width='64' height='64' fill='url(#g)'/><circle cx='32' cy='25' r='11' fill='#fff' fill-opacity='.8'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='#fff' fill-opacity='.8'/></svg>",
)}`

export default function AvatarExample() {
  return (
    <div className="flex items-center gap-4">
      <Avatar.Root>
        <Avatar.Image
          src={portrait}
          alt="Maya Chen"
        />
        <Avatar.Fallback>MC</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback>JS</Avatar.Fallback>
      </Avatar.Root>
    </div>
  )
}
