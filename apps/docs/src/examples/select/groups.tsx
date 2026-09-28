import { Select } from "@sajam/ui/select"
import { Fragment } from "react"

const regions = [
  {
    label: "Americas",
    items: [
      { label: "New York", value: "america/new_york" },
      { label: "Chicago", value: "america/chicago" },
      { label: "Los Angeles", value: "america/los_angeles" },
    ],
  },
  {
    label: "Europe",
    items: [
      { label: "London", value: "europe/london" },
      { label: "Paris", value: "europe/paris" },
      { label: "Berlin", value: "europe/berlin" },
    ],
  },
  {
    label: "Asia",
    items: [
      { label: "Dubai", value: "asia/dubai" },
      { label: "Singapore", value: "asia/singapore" },
      { label: "Tokyo", value: "asia/tokyo" },
    ],
  },
]

export default function SelectGroupsExample() {
  return (
    <Select.Root
      items={regions}
      defaultValue="europe/london"
    >
      <div className="grid w-full max-w-xs gap-2">
        <Select.Label>Time zone</Select.Label>
        <Select.Trigger className="w-full">
          <Select.Value />
        </Select.Trigger>
      </div>
      <Select.Content>
        {regions.map(function (region, index) {
          return (
            <Fragment key={region.label}>
              {index > 0 ? <Select.Separator /> : null}
              <Select.Group>
                <Select.GroupLabel>{region.label}</Select.GroupLabel>
                {region.items.map(function (item) {
                  return (
                    <Select.Item
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </Select.Item>
                  )
                })}
              </Select.Group>
            </Fragment>
          )
        })}
      </Select.Content>
    </Select.Root>
  )
}
