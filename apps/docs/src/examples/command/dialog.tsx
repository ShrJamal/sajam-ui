"use client"

import { Button } from "@sajam/ui/button"
import { Command } from "@sajam/ui/command"
import { FolderPlusIcon, KeyboardIcon, SettingsIcon, UserPlusIcon } from "lucide-react"
import { Fragment, useEffect, useState } from "react"

const actionGroups = [
  {
    value: "Workspace",
    items: [
      { value: "create-project", label: "Create project", icon: FolderPlusIcon },
      { value: "invite-teammate", label: "Invite teammate", icon: UserPlusIcon },
    ],
  },
  {
    value: "Preferences",
    items: [
      { value: "keyboard-shortcuts", label: "View keyboard shortcuts", icon: KeyboardIcon },
      { value: "settings", label: "Open settings", icon: SettingsIcon },
    ],
  },
]

export default function CommandDialogExample() {
  const [open, setOpen] = useState(false)
  const [lastAction, setLastAction] = useState<string | null>(null)

  useEffect(function () {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "j" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen(function (current) {
          return !current
        })
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return function () {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  function run(action: string) {
    setLastAction(action)
    setOpen(false)
  }

  return (
    <div className="grid justify-items-center gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={function () {
          setOpen(true)
        }}
      >
        Open command palette
        <span className="text-muted-foreground text-xs">⌘J</span>
      </Button>
      <p
        className="text-muted-foreground text-xs"
        aria-live="polite"
      >
        {lastAction ? `Ran “${lastAction}”.` : "Press ⌘J or Ctrl+J to toggle."}
      </p>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        title="Quick actions"
        description="Search for an action to run."
      >
        <Command.Root items={actionGroups}>
          <Command.Input
            aria-label="Search actions"
            placeholder="Search actions…"
          />
          <Command.List>
            {function (group: ActionGroup, index: number) {
              return (
                <Fragment key={group.value}>
                  {index > 0 ? <Command.Separator /> : null}
                  <Command.Group items={group.items}>
                    <Command.GroupLabel>{group.value}</Command.GroupLabel>
                    <Command.Collection>
                      {function (action: Action) {
                        const Icon = action.icon
                        return (
                          <Command.Item
                            key={action.value}
                            value={action}
                            onClick={function () {
                              run(action.label)
                            }}
                          >
                            <Icon />
                            {action.label}
                          </Command.Item>
                        )
                      }}
                    </Command.Collection>
                  </Command.Group>
                </Fragment>
              )
            }}
          </Command.List>
          <Command.Empty>No actions found.</Command.Empty>
        </Command.Root>
      </Command.Dialog>
    </div>
  )
}

type ActionGroup = (typeof actionGroups)[number]
type Action = ActionGroup["items"][number]
