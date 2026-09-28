import { Button } from "@sajam/ui/button"
import { Empty } from "@sajam/ui/empty"
import { FolderPlusIcon } from "lucide-react"

export default function EmptyExample() {
  return (
    <Empty.Root
      variant="outline"
      className="max-w-sm"
    >
      <Empty.Header>
        <Empty.Media variant="icon">
          <FolderPlusIcon />
        </Empty.Media>
        <Empty.Title>No projects yet</Empty.Title>
        <Empty.Description>
          Create a project to start planning work with your team.
        </Empty.Description>
      </Empty.Header>
      <Empty.Content>
        <div className="flex gap-2">
          <Button>Create project</Button>
          <Button variant="outline">Import</Button>
        </div>
      </Empty.Content>
    </Empty.Root>
  )
}
