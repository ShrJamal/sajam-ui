import { Select } from "@sajam/ui/select"

const densities = [
  { label: "Compact", value: "compact" },
  { label: "Comfortable", value: "comfortable" },
  { label: "Spacious", value: "spacious" },
]

const sizes = [
  { label: "Small", size: "sm" },
  { label: "Default", size: "default" },
] as const

export default function SelectSizesExample() {
  return (
    <div className="flex flex-wrap items-end gap-4">
      {sizes.map(function ({ label, size }) {
        return (
          <Select.Root
            key={size}
            items={densities}
            defaultValue="comfortable"
          >
            <div className="grid gap-2">
              <Select.Label>{label}</Select.Label>
              <Select.Trigger
                size={size}
                className="w-36"
              >
                <Select.Value />
              </Select.Trigger>
            </div>
            <Select.Content>
              {densities.map(function (density) {
                return (
                  <Select.Item
                    key={density.value}
                    value={density.value}
                  >
                    {density.label}
                  </Select.Item>
                )
              })}
            </Select.Content>
          </Select.Root>
        )
      })}
    </div>
  )
}
