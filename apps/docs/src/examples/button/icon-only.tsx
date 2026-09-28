import { Button } from "@sajam/ui/button"
import { BellIcon, HeartIcon, PlusIcon, SettingsIcon } from "lucide-react"

// Icon-only buttons need an accessible name.
export default function IconOnlyButtonExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        size="icon-xs"
        variant="outline"
        aria-label="Add item"
      >
        <PlusIcon />
      </Button>
      <Button
        size="icon-sm"
        variant="outline"
        aria-label="Add to favorites"
      >
        <HeartIcon />
      </Button>
      <Button
        size="icon"
        variant="outline"
        aria-label="Notifications"
      >
        <BellIcon />
      </Button>
      <Button
        size="icon-lg"
        variant="outline"
        aria-label="Settings"
      >
        <SettingsIcon />
      </Button>
    </div>
  )
}
