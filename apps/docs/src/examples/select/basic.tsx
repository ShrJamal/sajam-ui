import { Select } from "@sajam/ui/select"

const workspaces = [
  { label: "Personal workspace", value: "personal" },
  { label: "Acme team", value: "acme" },
  { label: "Design studio", value: "studio" },
]

export default function SelectExample() {
  return (
    <Select.Root items={workspaces}>
      <div className="grid w-full max-w-xs gap-2">
        <Select.Label>Workspace</Select.Label>
        <Select.Trigger className="w-full">
          <Select.Value placeholder="Choose a workspace" />
        </Select.Trigger>
      </div>
      <Select.Content>
        {workspaces.map(function (workspace) {
          return (
            <Select.Item
              key={workspace.value}
              value={workspace.value}
            >
              {workspace.label}
            </Select.Item>
          )
        })}
      </Select.Content>
    </Select.Root>
  )
}
