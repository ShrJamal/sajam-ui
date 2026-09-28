import { ToggleGroup } from "@sajam/ui/toggle-group"

// `spacing={0}` joins the items into one segmented control.
export default function ToggleGroupJoinedExample() {
  return (
    <ToggleGroup.Root
      defaultValue={["week"]}
      variant="outline"
      spacing={0}
      aria-label="Calendar range"
    >
      <ToggleGroup.Item value="day">Day</ToggleGroup.Item>
      <ToggleGroup.Item value="week">Week</ToggleGroup.Item>
      <ToggleGroup.Item value="month">Month</ToggleGroup.Item>
      <ToggleGroup.Item
        value="year"
        disabled
      >
        Year
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}
