import { Select } from "@sajam/ui/select"

const columns = [
  { label: "Name", value: "name" },
  { label: "Status", value: "status" },
  { label: "Owner", value: "owner" },
  { label: "Due date", value: "due" },
  { label: "Last updated", value: "updated" },
]

export default function SelectMultipleExample() {
  return (
    <Select.Root
      items={columns}
      multiple
      defaultValue={["name", "status", "owner"]}
    >
      <div className="grid w-full max-w-xs gap-2">
        <Select.Label>Visible columns</Select.Label>
        <Select.Trigger className="w-full">
          <Select.Value>
            {function (values: string[]) {
              if (values.length === 0) return "No columns"
              const first = columns.find(function (column) {
                return column.value === values[0]
              })
              return values.length === 1
                ? first?.label
                : `${first?.label} and ${values.length - 1} more`
            }}
          </Select.Value>
        </Select.Trigger>
      </div>
      <Select.Content alignItemWithTrigger={false}>
        {columns.map(function (column) {
          return (
            <Select.Item
              key={column.value}
              value={column.value}
            >
              {column.label}
            </Select.Item>
          )
        })}
      </Select.Content>
    </Select.Root>
  )
}
