import { Badge } from "@sajam/ui/badge"
import { Tabs } from "@sajam/ui/tabs"
import { BellIcon, CircleCheckIcon, MessageSquareIcon } from "lucide-react"

export default function TabsWithIconsExample() {
  return (
    <Tabs.Root
      defaultValue="inbox"
      className="w-full"
    >
      <Tabs.List
        variant="line"
        aria-label="Notifications"
      >
        <Tabs.Trigger value="inbox">
          <BellIcon />
          Inbox
          <Badge size="sm">6</Badge>
        </Tabs.Trigger>
        <Tabs.Trigger value="mentions">
          <MessageSquareIcon />
          Mentions
          <Badge
            size="sm"
            variant="secondary"
          >
            2
          </Badge>
        </Tabs.Trigger>
        <Tabs.Trigger value="resolved">
          <CircleCheckIcon />
          Resolved
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        value="inbox"
        className="rounded-xl border p-4"
      >
        Six updates need your attention.
      </Tabs.Content>
      <Tabs.Content
        value="mentions"
        className="rounded-xl border p-4"
      >
        Two teammates mentioned you in release discussions.
      </Tabs.Content>
      <Tabs.Content
        value="resolved"
        className="rounded-xl border p-4"
      >
        Resolved notifications are kept here for reference.
      </Tabs.Content>
    </Tabs.Root>
  )
}
