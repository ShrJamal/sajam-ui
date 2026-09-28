import { SegmentedControl } from "@sajam/ui/segmented-control"

export default function SegmentedControlExample() {
  return (
    <SegmentedControl.Root
      defaultValue="month"
      aria-label="Billing period"
    >
      <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
      <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
      <SegmentedControl.Item value="year">Year</SegmentedControl.Item>
    </SegmentedControl.Root>
  )
}
