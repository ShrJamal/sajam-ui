import { ToggleGroup } from "@sajam/ui/toggle-group"

// Vertical groups move focus with the up and down arrow keys.
export default function ToggleGroupVerticalExample() {
  return (
    <ToggleGroup.Root
      orientation="vertical"
      defaultValue={["inbox"]}
      variant="outline"
      spacing={0}
      aria-label="Mailbox"
      className="w-32"
    >
      <ToggleGroup.Item value="inbox">Inbox</ToggleGroup.Item>
      <ToggleGroup.Item value="sent">Sent</ToggleGroup.Item>
      <ToggleGroup.Item value="archive">Archive</ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
