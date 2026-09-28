import { Accordion } from "@sajam/ui/accordion"
import { Badge } from "@sajam/ui/badge"
import { BellIcon, FolderIcon, UsersIcon } from "lucide-react"

const sections = [
  {
    value: "projects",
    title: "Projects",
    description: "Work in progress",
    count: 4,
    icon: FolderIcon,
    content: "The documentation refresh is due today and the theme builder on Friday.",
  },
  {
    value: "team",
    title: "Team",
    description: "Members and invitations",
    count: 8,
    icon: UsersIcon,
    content: "Seven active members and one pending invitation.",
  },
  {
    value: "notifications",
    title: "Notifications",
    description: "Mentions and updates",
    count: 2,
    icon: BellIcon,
    content: "You have two unread mentions in the release discussion.",
  },
]

export default function AccordionCardsExample() {
  return (
    <Accordion.Root
      defaultValue={["projects"]}
      className="w-full max-w-sm gap-2"
    >
      {sections.map(function (section) {
        const Icon = section.icon
        return (
          <Accordion.Item
            key={section.value}
            value={section.value}
            className="rounded-xl border px-3"
          >
            <Accordion.Trigger className="items-center hover:no-underline">
              <span className="flex min-w-0 flex-1 items-center gap-3">
                <span className="bg-muted grid size-8 shrink-0 place-items-center rounded-lg">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block">{section.title}</span>
                  <span className="text-muted-foreground block text-xs font-normal">
                    {section.description}
                  </span>
                </span>
                <Badge variant="secondary">{section.count}</Badge>
              </span>
            </Accordion.Trigger>
            <Accordion.Content className="text-muted-foreground ps-11">
              {section.content}
            </Accordion.Content>
          </Accordion.Item>
        )
      })}
    </Accordion.Root>
  )
}
