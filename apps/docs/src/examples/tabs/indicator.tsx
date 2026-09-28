import { Tabs } from "@sajam/ui/tabs"

// Tabs.Indicator slides between tabs and replaces the static active background.
export default function TabsIndicatorExample() {
  return (
    <Tabs.Root
      defaultValue="overview"
      className="w-full"
    >
      <Tabs.List
        aria-label="Dashboard sections"
        className="w-full"
      >
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
        <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content
        value="overview"
        className="rounded-xl border p-4"
      >
        Key numbers for the current week.
      </Tabs.Content>
      <Tabs.Content
        value="analytics"
        className="rounded-xl border p-4"
      >
        Traffic sources and conversion trends.
      </Tabs.Content>
      <Tabs.Content
        value="reports"
        className="rounded-xl border p-4"
      >
        Scheduled exports and shared reports.
      </Tabs.Content>
    </Tabs.Root>
  )
}
