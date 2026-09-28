import { Button } from "@sajam/ui/button"
import { ButtonGroup } from "@sajam/ui/button-group"
import { ArchiveIcon, ClockIcon, FlagIcon } from "lucide-react"

export default function ButtonGroupExample() {
  return (
    <ButtonGroup.Root aria-label="Message actions">
      <Button variant="outline">
        <ArchiveIcon data-icon="inline-start" />
        Archive
      </Button>
      <Button variant="outline">
        <ClockIcon data-icon="inline-start" />
        Snooze
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Report"
      >
        <FlagIcon />
      </Button>
    </ButtonGroup.Root>
  )
}
