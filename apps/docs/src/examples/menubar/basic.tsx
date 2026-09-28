import { Menubar } from "@sajam/ui/menubar"

export default function EditorMenubarExample() {
  return (
    <Menubar.Root>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Content className="w-52">
          <Menubar.Item>
            New file
            <Menubar.Shortcut>⌘N</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item>
            Open…
            <Menubar.Shortcut>⌘O</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Sub>
            <Menubar.SubTrigger>Open recent</Menubar.SubTrigger>
            <Menubar.SubContent>
              <Menubar.Item>Component audit</Menubar.Item>
              <Menubar.Item>Release checklist</Menubar.Item>
            </Menubar.SubContent>
          </Menubar.Sub>
          <Menubar.Separator />
          <Menubar.Item>
            Save
            <Menubar.Shortcut>⌘S</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item disabled>Export as PDF</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content className="w-52">
          <Menubar.Item>
            Undo
            <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Item>
            Redo
            <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
          </Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>
            Find
            <Menubar.Shortcut>⌘F</Menubar.Shortcut>
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Help</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.LinkItem
            href="#documentation"
            closeOnClick
          >
            Documentation
          </Menubar.LinkItem>
          <Menubar.Item>Keyboard shortcuts</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  )
}
