import { DropdownMenu } from "@sajam/ui/dropdown-menu"
import { Toolbar } from "@sajam/ui/toolbar"
import { ChevronDownIcon, FolderPlusIcon, UploadIcon } from "lucide-react"

// Menu triggers render through Toolbar.Button; keep a single input as the last item.
export default function ToolbarMixedControlsExample() {
  return (
    <Toolbar.Root
      aria-label="File actions"
      className="w-full max-w-sm"
    >
      <Toolbar.Button
        size="icon"
        aria-label="New folder"
      >
        <FolderPlusIcon />
      </Toolbar.Button>
      <Toolbar.Button
        size="icon"
        aria-label="Upload files"
      >
        <UploadIcon />
      </Toolbar.Button>
      <Toolbar.Separator />
      <DropdownMenu.Root>
        <Toolbar.Button render={<DropdownMenu.Trigger />}>
          Sort
          <ChevronDownIcon data-icon="inline-end" />
        </Toolbar.Button>
        <DropdownMenu.Content className="w-40">
          <DropdownMenu.RadioGroup defaultValue="name">
            <DropdownMenu.RadioItem value="name">Name</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="modified">Last modified</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="size">Size</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Toolbar.Separator />
      <Toolbar.Input
        aria-label="Filter files"
        placeholder="Filter files"
        className="flex-1"
      />
    </Toolbar.Root>
  )
}
