"use client"

import { Command } from "@sajam/ui/command"
import {
  type LucideIcon,
  CalendarIcon,
  CreditCardIcon,
  FileTextIcon,
  SettingsIcon,
  UserPlusIcon,
} from "lucide-react"
import { Fragment, useState } from "react"

const commandGroups: CommandGroup[] = [
  {
    value: "Suggestions",
    items: [
      { value: "new-document", label: "New document", icon: FileTextIcon, shortcut: "⌘N" },
      { value: "invite-teammate", label: "Invite teammate", icon: UserPlusIcon, shortcut: "⌘I" },
      { value: "schedule-meeting", label: "Schedule meeting", icon: CalendarIcon },
    ],
  },
  {
    value: "Settings",
    items: [
      { value: "preferences", label: "Preferences", icon: SettingsIcon, shortcut: "⌘," },
      { value: "billing", label: "Billing", icon: CreditCardIcon, disabled: true },
    ],
  },
]

export default function CommandExample() {
  const [lastAction, setLastAction] = useState<string | null>(null)

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Command.Root
        items={commandGroups}
        className="border"
      >
        <Command.Input
          aria-label="Search commands"
          placeholder="Type a command or search…"
        />
        <Command.List>
          {function (group: CommandGroup, index: number) {
            return (
              <Fragment key={group.value}>
                {index > 0 ? <Command.Separator /> : null}
                <Command.Group items={group.items}>
                  <Command.GroupLabel>{group.value}</Command.GroupLabel>
                  <Command.Collection>
                    {function (item: CommandItem) {
                      const Icon = item.icon
                      return (
                        <Command.Item
                          key={item.value}
                          value={item}
                          disabled={item.disabled}
                          onClick={function () {
                            setLastAction(item.label)
                          }}
                        >
                          <Icon />
                          {item.label}
                          {item.shortcut ? (
                            <Command.Shortcut>{item.shortcut}</Command.Shortcut>
                          ) : null}
                        </Command.Item>
                      )
                    }}
                  </Command.Collection>
                </Command.Group>
              </Fragment>
            )
          }}
        </Command.List>
        <Command.Empty>No results found.</Command.Empty>
      </Command.Root>
      <p
        className="text-muted-foreground text-xs"
        aria-live="polite"
      >
        {lastAction ? `Ran “${lastAction}”.` : "Pick a command with the mouse or Enter."}
      </p>
    </div>
  )
}

type CommandGroup = {
  value: string
  items: CommandItem[]
}

type CommandItem = {
  value: string
  label: string
  icon: LucideIcon
  shortcut?: string
  disabled?: boolean
}
