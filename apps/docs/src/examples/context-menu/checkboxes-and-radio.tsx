"use client"

import { ContextMenu } from "@sajam/ui/context-menu"
import { useState } from "react"

export default function CanvasContextMenuExample() {
  const [grid, setGrid] = useState(true)
  const [rulers, setRulers] = useState(false)
  const [density, setDensity] = useState("comfortable")

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="bg-muted/40 text-muted-foreground grid h-40 w-full place-items-center rounded-xl border border-dashed text-sm">
        Right-click to customize the canvas
      </ContextMenu.Trigger>
      <ContextMenu.Content className="w-52">
        <ContextMenu.Group>
          <ContextMenu.GroupLabel>Canvas</ContextMenu.GroupLabel>
          <ContextMenu.CheckboxItem
            checked={grid}
            onCheckedChange={setGrid}
          >
            Show grid
          </ContextMenu.CheckboxItem>
          <ContextMenu.CheckboxItem
            checked={rulers}
            onCheckedChange={setRulers}
          >
            Show rulers
          </ContextMenu.CheckboxItem>
        </ContextMenu.Group>
        <ContextMenu.Separator />
        <ContextMenu.RadioGroup
          value={density}
          onValueChange={setDensity}
        >
          <ContextMenu.GroupLabel>Density</ContextMenu.GroupLabel>
          <ContextMenu.RadioItem value="compact">Compact</ContextMenu.RadioItem>
          <ContextMenu.RadioItem value="comfortable">Comfortable</ContextMenu.RadioItem>
          <ContextMenu.RadioItem value="spacious">Spacious</ContextMenu.RadioItem>
        </ContextMenu.RadioGroup>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}
