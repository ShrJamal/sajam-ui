"use client"

import { Button } from "@sajam/ui/button"
import { ButtonGroup } from "@sajam/ui/button-group"
import { DropdownMenu } from "@sajam/ui/dropdown-menu"
import { CalendarClockIcon, ChevronDownIcon, CopyIcon, SendIcon, Trash2Icon } from "lucide-react"
import { useState } from "react"

// A primary action with related actions in a menu.
export default function SplitButtonExample() {
  const [status, setStatus] = useState("Draft")

  return (
    <div className="flex flex-col items-center gap-3">
      <ButtonGroup.Root aria-label="Publishing">
        <Button
          onClick={function () {
            setStatus("Published")
          }}
        >
          <SendIcon data-icon="inline-start" />
          Publish
        </Button>
        <ButtonGroup.Separator />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            render={
              <Button
                size="icon"
                aria-label="More publishing options"
              />
            }
          >
            <ChevronDownIcon />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            align="end"
            className="w-44"
          >
            <DropdownMenu.Item
              onClick={function () {
                setStatus("Scheduled for tomorrow")
              }}
            >
              <CalendarClockIcon />
              Schedule
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={function () {
                setStatus("Duplicated")
              }}
            >
              <CopyIcon />
              Duplicate
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              variant="destructive"
              onClick={function () {
                setStatus("Deleted")
              }}
            >
              <Trash2Icon />
              Delete draft
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </ButtonGroup.Root>
      <p
        aria-live="polite"
        className="text-muted-foreground text-sm"
      >
        Status: {status}
      </p>
    </div>
  )
}
