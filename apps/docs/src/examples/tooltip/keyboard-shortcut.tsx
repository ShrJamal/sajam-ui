import { Button } from "@sajam/ui/button"
import { Kbd } from "@sajam/ui/kbd"
import { Tooltip } from "@sajam/ui/tooltip"
import { SearchIcon } from "lucide-react"

export default function TooltipWithShortcut() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger render={<Button variant="outline" />}>
        <SearchIcon />
        Search
      </Tooltip.Trigger>
      <Tooltip.Content>
        Search the workspace
        <Kbd.Group>
          <Kbd.Root>⌘</Kbd.Root>
          <Kbd.Root>K</Kbd.Root>
        </Kbd.Group>
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
