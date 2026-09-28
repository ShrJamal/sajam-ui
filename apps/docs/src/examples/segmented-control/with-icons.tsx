"use client"

import { SegmentedControl } from "@sajam/ui/segmented-control"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useState } from "react"

type Theme = "light" | "dark" | "system"

export default function SegmentedControlWithIcons() {
  const [theme, setTheme] = useState<Theme>("system")

  return (
    <div className="grid justify-items-center gap-3">
      <SegmentedControl.Root<Theme>
        value={theme}
        onValueChange={setTheme}
        aria-label="Theme"
      >
        <SegmentedControl.Item value="light">
          <SunIcon />
          Light
        </SegmentedControl.Item>
        <SegmentedControl.Item value="dark">
          <MoonIcon />
          Dark
        </SegmentedControl.Item>
        <SegmentedControl.Item value="system">
          <MonitorIcon />
          System
        </SegmentedControl.Item>
      </SegmentedControl.Root>
      <p className="text-muted-foreground text-sm">Theme: {theme}</p>
    </div>
  )
}
