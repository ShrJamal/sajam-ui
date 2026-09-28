import { Tabs } from "@sajam/ui/tabs"

// Vertical tabs use the Up and Down arrow keys.
export default function VerticalTabsExample() {
  return (
    <Tabs.Root
      defaultValue="profile"
      orientation="vertical"
      className="w-full"
    >
      <Tabs.List
        variant="line"
        aria-label="Account settings"
      >
        <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
        <Tabs.Trigger value="security">Security</Tabs.Trigger>
        <Tabs.Trigger
          value="billing"
          disabled
        >
          Billing
        </Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content
        value="profile"
        className="rounded-xl border p-4"
      >
        Update your name, photo, and contact details.
      </Tabs.Content>
      <Tabs.Content
        value="security"
        className="rounded-xl border p-4"
      >
        Manage your password and active sessions.
      </Tabs.Content>
    </Tabs.Root>
  )
}
