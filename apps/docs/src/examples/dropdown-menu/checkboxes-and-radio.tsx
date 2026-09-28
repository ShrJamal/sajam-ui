"use client"

import { Button } from "@sajam/ui/button"
import { DropdownMenu } from "@sajam/ui/dropdown-menu"
import { useState } from "react"

export default function ViewOptionsMenuExample() {
  const [statusBar, setStatusBar] = useState(true)
  const [minimap, setMinimap] = useState(false)
  const [theme, setTheme] = useState("system")

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger render={<Button variant="outline" />}>
        View options
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-52">
        <DropdownMenu.Group>
          <DropdownMenu.GroupLabel>Panels</DropdownMenu.GroupLabel>
          <DropdownMenu.CheckboxItem
            checked={statusBar}
            onCheckedChange={setStatusBar}
          >
            Status bar
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            checked={minimap}
            onCheckedChange={setMinimap}
          >
            Minimap
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.RadioGroup
          value={theme}
          onValueChange={setTheme}
        >
          <DropdownMenu.GroupLabel>Theme</DropdownMenu.GroupLabel>
          <DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="system">System</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
