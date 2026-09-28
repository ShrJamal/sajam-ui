"use client"

import { Button } from "@sajam/ui/button"
import { Tabs } from "@sajam/ui/tabs"
import { useState } from "react"

const initialTabs = ["index.ts", "button.tsx", "styles.css", "README.md"]

// Close a tab with its close mark or by pressing Delete while the tab is focused.
export default function ClosableTabsExample() {
  const [openTabs, setOpenTabs] = useState(initialTabs)
  const [active, setActive] = useState(initialTabs[0])

  function closeTab(tab: string) {
    const index = openTabs.indexOf(tab)
    const remaining = openTabs.filter(function (item) {
      return item !== tab
    })
    setOpenTabs(remaining)
    if (tab === active) setActive(remaining[Math.min(index, remaining.length - 1)])
  }

  return (
    <div className="grid w-full gap-3">
      <Tabs.Root
        value={active}
        onValueChange={setActive}
      >
        <Tabs.List
          variant="line"
          scrollable
          aria-label="Open files"
        >
          {openTabs.map(function (tab) {
            return (
              <Tabs.Trigger
                key={tab}
                value={tab}
                closeLabel={`Close ${tab}`}
                onClose={
                  openTabs.length > 1
                    ? function () {
                        closeTab(tab)
                      }
                    : undefined
                }
              >
                {tab}
              </Tabs.Trigger>
            )
          })}
        </Tabs.List>
        {openTabs.map(function (tab) {
          return (
            <Tabs.Content
              key={tab}
              value={tab}
              className="text-muted-foreground rounded-xl border p-4"
            >
              Editing {tab}.
            </Tabs.Content>
          )
        })}
      </Tabs.Root>
      <Button
        variant="outline"
        size="sm"
        className="justify-self-start"
        disabled={openTabs.length === initialTabs.length}
        focusableWhenDisabled
        onClick={function () {
          setOpenTabs(initialTabs)
        }}
      >
        Restore tabs
      </Button>
    </div>
  )
}
