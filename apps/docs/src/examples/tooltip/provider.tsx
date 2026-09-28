import { Button } from "@sajam/ui/button"
import { Tooltip } from "@sajam/ui/tooltip"
import { ArchiveIcon, CopyIcon, Share2Icon } from "lucide-react"

const actions = [
  { label: "Archive", icon: ArchiveIcon },
  { label: "Duplicate", icon: CopyIcon },
  { label: "Share", icon: Share2Icon },
]

// After the first tooltip opens, moving to a neighbour opens its tooltip instantly.
export default function TooltipGroup() {
  return (
    <Tooltip.Provider delay={500}>
      <div className="flex gap-1">
        {actions.map(function (action) {
          return (
            <Tooltip.Root key={action.label}>
              <Tooltip.Trigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={action.label}
                  />
                }
              >
                <action.icon />
              </Tooltip.Trigger>
              <Tooltip.Content>{action.label}</Tooltip.Content>
            </Tooltip.Root>
          )
        })}
      </div>
    </Tooltip.Provider>
  )
}
