"use client"

import { Menubar } from "@sajam/ui/menubar"
import { useState } from "react"

export default function ViewMenubarExample() {
  const [sidebar, setSidebar] = useState(true)
  const [statusBar, setStatusBar] = useState(false)
  const [zoom, setZoom] = useState("100")

  return (
    <Menubar.Root>
      <Menubar.Menu>
        <Menubar.Trigger>View</Menubar.Trigger>
        <Menubar.Content className="w-48">
          <Menubar.Group>
            <Menubar.GroupLabel>Layout</Menubar.GroupLabel>
            <Menubar.CheckboxItem
              checked={sidebar}
              onCheckedChange={setSidebar}
            >
              Sidebar
            </Menubar.CheckboxItem>
            <Menubar.CheckboxItem
              checked={statusBar}
              onCheckedChange={setStatusBar}
            >
              Status bar
            </Menubar.CheckboxItem>
          </Menubar.Group>
          <Menubar.Separator />
          <Menubar.RadioGroup
            value={zoom}
            onValueChange={setZoom}
          >
            <Menubar.GroupLabel>Zoom</Menubar.GroupLabel>
            <Menubar.RadioItem value="75">75%</Menubar.RadioItem>
            <Menubar.RadioItem value="100">100%</Menubar.RadioItem>
            <Menubar.RadioItem value="125">125%</Menubar.RadioItem>
          </Menubar.RadioGroup>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Window</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item>Minimize</Menubar.Item>
          <Menubar.Item>Zoom</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  )
}
