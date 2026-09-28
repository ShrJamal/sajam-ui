import { ContextMenu } from "@sajam/ui/context-menu"
import { CopyIcon, FolderInputIcon, PencilIcon, Trash2Icon } from "lucide-react"

export default function FileContextMenuExample() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="bg-muted/40 text-muted-foreground grid h-40 w-full place-items-center rounded-xl border border-dashed text-sm">
        Right-click or long-press here
      </ContextMenu.Trigger>
      <ContextMenu.Content className="w-52">
        <ContextMenu.Group>
          <ContextMenu.GroupLabel>launch-plan.pdf</ContextMenu.GroupLabel>
          <ContextMenu.Item>
            <PencilIcon />
            Rename
            <ContextMenu.Shortcut>↵</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Item>
            <CopyIcon />
            Duplicate
            <ContextMenu.Shortcut>⌘D</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>
              <FolderInputIcon />
              Move to
            </ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item>Drafts</ContextMenu.Item>
              <ContextMenu.Item>Shared with me</ContextMenu.Item>
              <ContextMenu.Item>Archive</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
        </ContextMenu.Group>
        <ContextMenu.Separator />
        <ContextMenu.Item variant="destructive">
          <Trash2Icon />
          Delete
          <ContextMenu.Shortcut>⌫</ContextMenu.Shortcut>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  )
}
