import { SegmentedControl } from "@sajam/ui/segmented-control"

const sizes = ["sm", "default", "lg"] as const

export default function SegmentedControlSizes() {
  return (
    <div className="grid justify-items-center gap-3">
      {sizes.map(function (size) {
        return (
          <SegmentedControl.Root
            key={size}
            size={size}
            defaultValue="list"
            aria-label={`View (${size})`}
          >
            <SegmentedControl.Item value="list">List</SegmentedControl.Item>
            <SegmentedControl.Item value="board">Board</SegmentedControl.Item>
            <SegmentedControl.Item value="calendar">Calendar</SegmentedControl.Item>
          </SegmentedControl.Root>
        )
      })}
    </div>
  )
}
