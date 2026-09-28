import { Avatar } from "@sajam/ui/avatar"

const people = [
  { name: "Maya Chen", role: "Product designer", initials: "MC" },
  { name: "Jonas Schmidt", role: "Frontend engineer", initials: "JS" },
  { name: "Amara Lewis", role: "Engineering manager", initials: "AL" },
]

// The visible name labels the person, so the avatar itself is hidden from assistive technology.
export default function AvatarWithNameExample() {
  return (
    <ul className="grid w-full max-w-xs gap-3">
      {people.map(function (person) {
        return (
          <li
            key={person.name}
            className="flex min-w-0 items-center gap-3"
          >
            <Avatar.Root aria-hidden="true">
              <Avatar.Fallback>{person.initials}</Avatar.Fallback>
            </Avatar.Root>
            <div className="grid min-w-0">
              <span className="truncate text-sm font-medium">{person.name}</span>
              <span className="text-muted-foreground truncate text-xs">{person.role}</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
