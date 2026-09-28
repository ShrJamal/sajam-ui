import { Button } from "@sajam/ui/button"
import { DropdownMenu } from "@sajam/ui/dropdown-menu"
import { CopyIcon, FolderInputIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react"

export default function RowActionsMenuExample() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Actions for Launch plan"
          />
        }
      >
        <MoreHorizontalIcon />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-48">
        <DropdownMenu.Item>
          <PencilIcon />
          Rename
          <DropdownMenu.Shortcut>↵</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <CopyIcon />
          Duplicate
          <DropdownMenu.Shortcut>⌘D</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            <FolderInputIcon />
            Move to
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>Drafts</DropdownMenu.Item>
            <DropdownMenu.Item>In review</DropdownMenu.Item>
            <DropdownMenu.Item>Published</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Separator />
        <DropdownMenu.Item variant="destructive">
          <Trash2Icon />
          Delete
          <DropdownMenu.Shortcut>⌫</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
