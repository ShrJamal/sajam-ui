"use client"

import { Combobox } from "@sajam/ui/combobox"
import { Label } from "@sajam/ui/label"
import { useId } from "react"

const toolGroups = [
  { value: "Design", items: ["Figma", "Framer", "Sketch"] },
  { value: "Development", items: ["VS Code", "WebStorm", "Zed"] },
  { value: "Planning", items: ["Jira", "Linear", "Notion"] },
]

export default function ComboboxGroupsExample() {
  const id = useId()

  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor={id}>Default tool</Label>
      <Combobox.Root
        items={toolGroups}
        defaultValue="Linear"
      >
        <Combobox.Input
          id={id}
          placeholder="Search tools"
          className="w-full"
        />
        <Combobox.Content>
          <Combobox.Empty>No tools found.</Combobox.Empty>
          <Combobox.List>
            {function (group: ToolGroup) {
              return (
                <Combobox.Group
                  key={group.value}
                  items={group.items}
                >
                  <Combobox.GroupLabel>{group.value}</Combobox.GroupLabel>
                  <Combobox.Collection>
                    {function (tool: string) {
                      return (
                        <Combobox.Item
                          key={tool}
                          value={tool}
                        >
                          {tool}
                        </Combobox.Item>
                      )
                    }}
                  </Combobox.Collection>
                </Combobox.Group>
              )
            }}
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Root>
    </div>
  )
}

type ToolGroup = (typeof toolGroups)[number]
