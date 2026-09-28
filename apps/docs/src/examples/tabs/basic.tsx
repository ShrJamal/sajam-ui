import { Tabs } from "@sajam/ui/tabs"

export default function TabsExample() {
  return (
    <Tabs.Root
      defaultValue="overview"
      className="w-full"
    >
      <Tabs.List aria-label="Project details">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
        <Tabs.Trigger value="members">Members</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        value="overview"
        className="rounded-xl border p-4"
      >
        Review the project summary and current status.
      </Tabs.Content>
      <Tabs.Content
        value="activity"
        className="rounded-xl border p-4"
      >
        See the latest edits, comments, and releases.
      </Tabs.Content>
      <Tabs.Content
        value="members"
        className="rounded-xl border p-4"
      >
        Manage the people who can access this project.
      </Tabs.Content>
    </Tabs.Root>
  )
}
