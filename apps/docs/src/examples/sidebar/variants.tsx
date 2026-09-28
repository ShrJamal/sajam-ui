"use client"

import { Button } from "@sajam/ui/button"
import { Sidebar } from "@sajam/ui/sidebar"
import { FolderIcon, InboxIcon, LayoutDashboardIcon, SettingsIcon } from "lucide-react"
import { useState } from "react"

const variants = ["sidebar", "floating", "inset"] as const

const navigation = [
  { title: "Overview", icon: LayoutDashboardIcon },
  { title: "Projects", icon: FolderIcon },
  { title: "Inbox", icon: InboxIcon },
  { title: "Settings", icon: SettingsIcon },
]

// A right sidebar is rendered after Sidebar.Inset so its reserved space sits on the right.
export default function SidebarVariantsExample() {
  const [variant, setVariant] = useState<(typeof variants)[number]>("floating")
  const [side, setSide] = useState<"left" | "right">("left")

  const sidebar = (
    <Sidebar.Root
      variant={variant}
      side={side}
      collapsible="icon"
    >
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Menu>
            {navigation.map(function (item, index) {
              return (
                <Sidebar.MenuItem key={item.title}>
                  <Sidebar.MenuButton
                    isActive={index === 0}
                    tooltip={item.title}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
              )
            })}
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Root>
  )

  return (
    <Sidebar.Provider
      contained
      keyboardShortcut={false}
      className="h-80 rounded-xl border"
    >
      {side === "left" && sidebar}
      <Sidebar.Inset>
        <header className="flex h-12 items-center gap-2 border-b px-3">
          <Sidebar.Trigger />
          <span className="text-sm font-medium capitalize">{variant}</span>
        </header>
        <div className="flex flex-wrap content-start gap-2 p-4">
          {variants.map(function (option) {
            return (
              <Button
                key={option}
                size="sm"
                variant={option === variant ? "secondary" : "outline"}
                aria-pressed={option === variant}
                className="capitalize"
                onClick={function () {
                  setVariant(option)
                }}
              >
                {option}
              </Button>
            )
          })}
          <Button
            size="sm"
            variant="ghost"
            onClick={function () {
              setSide(side === "left" ? "right" : "left")
            }}
          >
            Move to {side === "left" ? "right" : "left"}
          </Button>
        </div>
      </Sidebar.Inset>
      {side === "right" && sidebar}
    </Sidebar.Provider>
  )
}
