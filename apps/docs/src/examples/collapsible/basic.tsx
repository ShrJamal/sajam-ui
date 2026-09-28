import { Button } from "@sajam/ui/button"
import { Collapsible } from "@sajam/ui/collapsible"
import { ChevronsUpDownIcon } from "lucide-react"

const repositories = ["sajam/ui", "sajam/docs", "sajam/starters"]

export default function CollapsibleExample() {
  return (
    <Collapsible.Root className="w-full max-w-xs">
      <div className="flex items-center justify-between gap-4 ps-3">
        <p className="text-sm font-medium">3 starred repositories</p>
        <Collapsible.Trigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Show all repositories"
            />
          }
        >
          <ChevronsUpDownIcon />
        </Collapsible.Trigger>
      </div>
      <div className="mt-2 rounded-lg border px-3 py-2 font-mono text-sm">{repositories[0]}</div>
      <Collapsible.Content>
        <div className="grid gap-2 pt-2">
          {repositories.slice(1).map(function (repository) {
            return (
              <div
                key={repository}
                className="rounded-lg border px-3 py-2 font-mono text-sm"
              >
                {repository}
              </div>
            )
          })}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
