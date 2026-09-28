import { Button } from "@sajam/ui/button"
import { Empty } from "@sajam/ui/empty"
import { SearchXIcon } from "lucide-react"

export default function EmptySearchResults() {
  return (
    <Empty.Root className="max-w-sm">
      <Empty.Header>
        <Empty.Media variant="icon">
          <SearchXIcon />
        </Empty.Media>
        <Empty.Title>No matching projects</Empty.Title>
        <Empty.Description>Try a different name or clear the active filters.</Empty.Description>
      </Empty.Header>
      <Empty.Content>
        <Button variant="outline">Clear filters</Button>
      </Empty.Content>
    </Empty.Root>
  )
}
