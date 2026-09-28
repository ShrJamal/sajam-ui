import { ToggleGroup } from "@sajam/ui/toggle-group"

const sizes = ["sm", "default", "lg"] as const

export default function ToggleGroupSizesExample() {
  return (
    <div className="grid justify-items-start gap-3">
      {sizes.map(function (size) {
        return (
          <ToggleGroup.Root
            key={size}
            size={size}
            variant="outline"
            spacing={0}
            defaultValue={["list"]}
            aria-label={`View (${size})`}
          >
            <ToggleGroup.Item value="list">List</ToggleGroup.Item>
            <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
            <ToggleGroup.Item value="board">Board</ToggleGroup.Item>
          </ToggleGroup.Root>
        )
      })}
    </div>
  )
}
